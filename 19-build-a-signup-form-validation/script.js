const signup = document.getElementById('signupForm');

signup.addEventListener('submit', (e) => {
  e.preventDefault();

  let username = document.getElementById('user');
  let email = document.getElementById('email');
  let password = document.getElementById('pass');
  let msg = document.getElementById('error-msg');

  if (username.value.length < 3) {
    msg.innerText = 'Username must be at least 3 characters!';
    msg.style.color = 'red';
  } else if (!email.value.includes('@')) {
    msg.innerText = 'Please enter a valid email!';
    msg.style.color = 'red';
  } else if (password.value.length < 6) {
    msg.innerText = 'Password must be at least 6 characters!';
    msg.style.color = 'red';
  } else {
    msg.innerText = 'Registration Successful ✅';
    msg.style.color = 'green';
  }
});
