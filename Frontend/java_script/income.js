document.addEventListener('DOMContentLoaded', function() {
    const incomeForm = document.getElementById('income-form');

    incomeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get values from input fields
        const monthlyIncome = parseFloat(document.getElementById('monthly-income').value) || 0;
        const otherIncome = parseFloat(document.getElementById('other-income').value) || 0;

        // Example: Print income details to console (you can replace with your logic)
        console.log(`Monthly Income: $${monthlyIncome.toFixed(2)}`);
        console.log(`Other Income: $${otherIncome.toFixed(2)}`);

        // Clear input fields (optional)
        document.getElementById('monthly-income').value = '';
        document.getElementById('other-income').value = '';

        // Optionally, you can process this data further (e.g., send to server, store in localStorage, etc.)
    });
});
