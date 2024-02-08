document.addEventListener('DOMContentLoaded', function() {
    const passwordForm = document.getElementById('password-form');
    const checkButton = document.getElementById('check-button');
    const resultText = document.getElementById('result');

    passwordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        resultText.innerText = 'Checking...';

        const passwordInput = document.getElementById('password');
        const password = passwordInput.value;

        const response = await fetch(`/check_password?password=${encodeURIComponent(password)}`);
        const data = await response.json();

        if (data.count > 0) {
            resultText.innerText = `${password} was found ${data.count} times. You should change your password.`;
        } else {
            resultText.innerText = `${password} was NOT found. Carry on!`;
        }
    });
});