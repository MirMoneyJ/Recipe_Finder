// Script
function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (!isComplexPassword(password)) {
        alert("Password must contain at least one capital letter and one symbol");
        return;
    }

    try {
        fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (response.ok) {
                alert(`User registered: ${username}`);
            } else {
                return response.text().then(errorMessage => {
                    alert(`Error: ${errorMessage}`);
                });
            }
        })
        .catch(error => {
            console.error('Error registering user:', error);
            alert('An error occurred while registering. Please try again.');
        });
    } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred while registering. Please try again.');
    }
}

function isComplexPassword(password) {
    let hasCapitalLetters = false; 
    let hasSymbol = false;

    for(let i = 0; i < password.length; i++) {
        const char = password[i];

        if(char === char.toUpperCase() && char !== char.toLowerCase()) {
            hasCapitalLetters = true;
        } else if ("!@#$%^&*()_+-=[]{}|;:'\",.<>/?".includes(char)) {
            hasSymbol = true;
        }
    }
    return hasCapitalLetters && hasSymbol;
}

