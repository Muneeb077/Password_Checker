document.addEventListener('DOMContentLoaded', function() {
    const passwordForm = document.getElementById('password-form');
    const checkButton = document.getElementById('check-button');
    const resultText = document.getElementById('result');

    passwordForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        resultText.innerText = 'Checking...';

        const passwordInput = document.getElementById('password');
        const password = passwordInput.value;

        const response = await fetch(`/check_password?password=${password}`);
        const data = await response.text();  // Change this line

        if (data.includes('found')) {  // Update this condition
            resultText.innerText = `${password} was found. You should change your password.`;
        } else {
            resultText.innerText = `${password} was NOT found. Carry on!`;
        }
    });
});
//        const passwordInput = document.getElementById('password');
//        const password = passwordInput.value;
//
//        const response = await fetch(`/check_password?password=${password}`);
//        const data = await response.json();
//
//        if (data.result) {
//            resultText.innerText = `${password} was found ${data.count} times. You should change your password.`;
//        } else {
//            resultText.innerText = `${password} was NOT found. Carry on!`;
//        }
//    });
//});
