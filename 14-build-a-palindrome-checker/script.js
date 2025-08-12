// Get elements
const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');

// Function to check palindrome
function isPalindrome(str) {
  // Remove all non-alphanumeric chars and lowercase the string
  const cleaned = str.replace(/[^a-z0-9]/gi, '').toLowerCase();

  // Reverse the cleaned string
  const reversed = cleaned.split('').reverse().join('');

  // Check if palindrome
  return cleaned === reversed;
}

// Event listener for the button
checkBtn.addEventListener('click', () => {
  const inputText = textInput.value;

  if (!inputText) {
    alert('Please input a value.');
    return;
  }

  const palindrome = isPalindrome(inputText);

  if (palindrome) {
    result.textContent = `${inputText} is a palindrome.`;
  } else {
    result.textContent = `${inputText} is not a palindrome.`;
  }
});
