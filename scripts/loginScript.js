// scripts/loginScript.js
function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Perform validation if needed

    try {
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Authentication failed');
            }
        })
        .then(data => {
            alert(`Welcome, ${data.username}!`);
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('Username or password incorrect');
        });
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred while logging in. Please try again.');
    }
}
