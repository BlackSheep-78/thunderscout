document.getElementById("searchBtn").addEventListener("click", () => {
    let email = document.getElementById("emailInput").value;
    if (email) {
        browser.runtime.sendMessage({ action: "searchEmails", email: email }).then(response => {
            let results = document.getElementById("results");
            results.innerHTML = "";
            response.emails.forEach(msg => {
                let li = document.createElement("li");
                li.textContent = msg.subject;
                results.appendChild(li);
            });
        });
    }
});
