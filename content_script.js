document.addEventListener("DOMContentLoaded", function () {
    console.log("content_script.js loaded");

    // Delay execution slightly to ensure email content is fully loaded
    setTimeout(function () {
        // Log the email body to understand its structure
        let emailBody = document.body;
        console.log("Email body structure:", emailBody);

        // Look for the sender's email in the span with class 'recipient-single-line'
        let senderElement = emailBody.querySelector(".recipient-single-line");
        if (senderElement) {
            // Extract the email address by parsing the content of the span
            let senderEmailMatch = senderElement.textContent.match(/<([^>]+)>/);  // Extract the email inside <>
            if (senderEmailMatch && senderEmailMatch[1]) {
                let senderEmail = senderEmailMatch[1];
                console.log("Sender email found:", senderEmail);

                // Create the button and add event listener
                let button = document.createElement("button");
                button.textContent = "Find All from Sender";
                button.style.marginLeft = "10px";
                button.style.padding = "5px";
                button.style.border = "1px solid #ccc";
                button.style.cursor = "pointer";

                button.addEventListener("click", function () {
                    browser.runtime.sendMessage({ action: "searchEmails", email: senderEmail });
                });

                // Try appending the button to a suitable container
                let container = senderElement.closest('div');
                if (container) {
                    console.log("Appending button to container...");
                    container.appendChild(button);
                } else {
                    console.log("Failed to find the container to append the button.");
                }
            } else {
                console.log("No valid email found in sender text.");
            }
        } else {
            console.log("Sender element not found.");
        }
    }, 500); // Adding a slight delay to ensure email content is fully loaded
});
