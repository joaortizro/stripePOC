const stripe = Stripe('pk_test_51Lk7XsJP7vwCwKXOBSerpCeQRlgu4yA9J8V13k2vHk1ZUdSVLL3tEafypsK6DrlyiKy0DBbfBpfU7xRMeMbFmq8x00mjWNklmG');

let elements

initialize();
checkStatus();

document
    .querySelector("#payment-form")
    .addEventListener("submit", handleSubmit);



async function initialize() {
    const response = await fetch("/secret")

    const { clientSecret } = await response.json();
    console.log("🚀 , file: setupfuture.js:18 , initialize , clientSecret", clientSecret)

    const appearance = {
        theme: 'night'
    };

    elements = stripe.elements({ appearance, clientSecret });

    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
}

async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const response = await stripe.confirmSetup({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
            return_url: 'http://localhost:3000/setupfuture',
        }
    });
    console.log("🚀 , file: setupfuture.js , line 39 , handleSubmit , response", response)

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (response.error.type === "card_error" || response.error.type === "validation_error") {
        showMessage(error.message);
    } else {
        showMessage("An unexpected error occurred.");
    }

    setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
        'setup_intent_client_secret'
    );
    console.log("🚀 , file: setupfuture.js , line 59 , checkStatus , clientSecret", clientSecret)
    if (!clientSecret) {
        return;
    }

    // Retrieve the SetupIntent
    const { setupIntent } = await stripe.retrieveSetupIntent(clientSecret)
    console.log("🚀 , file: setupfuture.js , line 65 , checkStatus , setupIntent", setupIntent)
    switch (setupIntent.status) {
        case 'succeeded': {
            showMessage('Success! Your payment method has been saved.')
            break;
        }

        case 'processing': {
            showMessage ("Processing payment details. We'll update you when processing is complete.");
            break;
        }

        case 'requires_payment_method': {
            showMessage('Failed to process payment details. Please try another payment method.');

            // Redirect your user back to your payment page to attempt collecting
            // payment again

            break;
        }
        default:
            showMessage ('something went wrong');
            break;
    }
}
// ------- UI helpers -------

function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageText.textContent = "";
    }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}