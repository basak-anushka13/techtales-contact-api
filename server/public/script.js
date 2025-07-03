// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
      name: document.querySelector("#name").value.trim(),
      email: document.querySelector("#email").value.trim(),
      message: document.querySelector("#message").value.trim(),
    };

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Message sent successfully!");
        form.reset(); // Clear the form
      } else {
        alert(data.error || "Something went wrong. Try again later.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Server is not responding. Please try again later.");
    }
  });
});
