browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "searchEmails") {
        let senderEmail = request.email;
        
        browser.messages.list({ from: senderEmail }).then(result => {
            console.log("Emails from " + senderEmail + ":", result.messages);
            
            // (Optional) Show a notification with the number of emails found
            browser.notifications.create({
                "type": "basic",
                "title": "ThunderScout",
                "message": `Found ${result.messages.length} emails from ${senderEmail}`
            });

            sendResponse({ emails: result.messages });
        });

        return true;
    }
});
