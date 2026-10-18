
document.addEventListener("DOMContentLoaded", function () {

    // 1. Display a welcome message
    alert("Welcome to my Personal Portfolio Website!");

    // 2. Dark mode and light mode
    const themeButton = document.getElementById("theme-toggle");

    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeButton.textContent = "Light Mode";
        } else {
            themeButton.textContent = "Dark Mode";
        }
    });

    // 3. Contact form submission
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitButton = document.getElementById("submit-btn");

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "Sending your message...";
        formStatus.style.color = "inherit";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                formStatus.textContent =
                    "Thank you! Your message was sent successfully.";
                formStatus.style.color = "green";
                contactForm.reset();
            } else {
                formStatus.textContent =
                    "Your message could not be sent. Please try again.";
                formStatus.style.color = "red";
            }
        } catch (error) {
            formStatus.textContent =
                "A network error occurred. Please check your connection and try again.";
            formStatus.style.color = "red";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

});
