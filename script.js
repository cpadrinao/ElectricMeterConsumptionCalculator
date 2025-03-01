/*
    Owned by: Crisler Annilov B. Padrinao
              Computer Science Student
              University Of Nueva Caceres
*/

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculatorform").addEventListener("submit", validateAndRedirect);
});

// Validate form inputs and redirect if valid
function validateAndRedirect(event) {
    event.preventDefault();

    let isValid = true;

    const meterNum = document.getElementById("meternum").value;
    const prevRead = document.getElementById("prevreadinput").value;
    const currRead = document.getElementById("currentreadinput").value;
    const costPerKwh = document.getElementById("costinput").value;

    clearErrors();

    const letterCount = (meterNum.match(/[A-Za-z]/g) || []).length;
    const numberCount = (meterNum.match(/[0-9]/g) || []).length;
    if (letterCount !== 4 || numberCount !== 4 || meterNum.length !== 8) {
        showError("meternum", "Must contain exactly 4 letters and 4 numbers (e.g., abcd1234).");
        isValid = false;
    }

    if (!/^[0-9]{1,5}$/.test(prevRead) || Number(prevRead) < 0) {
        showError("prevreadinput", "Must be a 5-digit positive number.");
        isValid = false;
    }

    if (!/^[0-9]{1,5}$/.test(currRead) || Number(currRead) < Number(prevRead)) {
        showError("currentreadinput", "Must be <= 5-digit number or >= to previous reading.");
        isValid = false;
    }

    if (isNaN(costPerKwh) || Number(costPerKwh) <= 0) {
        showError("costinput", "Must be a number greater than 0.");
        isValid = false;
    }

    if (isValid) {
        const consumption = Number(currRead) - Number(prevRead);
        const totalCost = consumption * Number(costPerKwh);

        localStorage.setItem("meterNumber", meterNum);
        localStorage.setItem("previousReading", prevRead);
        localStorage.setItem("currentReading", currRead);
        localStorage.setItem("monthlyConsumption", consumption);
        localStorage.setItem("totalCost", totalCost.toFixed(2));

        window.location.href = "Calculating.html";
    }
}

// Display error message for invalid inputs
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    input.classList.add("is-invalid");
    let error = document.createElement("div");
    error.className = "invalid-feedback";
    error.innerText = message;
    input.parentNode.appendChild(error);
}

// Clear all error messages and styles
function clearErrors() {
    document.querySelectorAll(".is-invalid").forEach(input => input.classList.remove("is-invalid"));
    document.querySelectorAll(".invalid-feedback").forEach(error => error.remove());
}

// Redirect from Calculating.html to Results.html after 5 seconds
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("Calculating.html")) {
        setTimeout(() => {
            window.location.href = "Results.html";
        }, 5000);
    }
});

// Load and display results on Results.html
if (window.location.pathname.includes("Results.html")) {
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("meterNumber").innerText = localStorage.getItem("meterNumber");
        document.getElementById("previousReading").innerText = localStorage.getItem("previousReading");
        document.getElementById("currentReading").innerText = localStorage.getItem("currentReading");
        document.getElementById("monthlyConsumption").innerText = localStorage.getItem("monthlyConsumption");
        document.getElementById("totalCost").innerText = `PHP ${localStorage.getItem("totalCost")}`;
    });
}

// Handle back button click to show LastPage.html for 5 seconds, then return to electric.html
document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", function () {
            window.location.href = "LastPage.html";
        });
    }

    if (window.location.pathname.includes("LastPage.html")) {
        setTimeout(() => {
            window.location.href = "index.html";
        }, 5000);
    }
});
