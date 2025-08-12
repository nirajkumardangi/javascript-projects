// Access elements and save to required variables
const regexPattern = document.getElementById('pattern');
const stringToTest = document.getElementById('test-string');
const testButton = document.getElementById('test-btn');
const testResult = document.getElementById('result');
const caseInsensitiveFlag = document.getElementById('i');
const globalFlag = document.getElementById('g');

// Function to get selected flags
function getFlags() {
  let flags = '';
  if (caseInsensitiveFlag.checked) flags += 'i';
  if (globalFlag.checked) flags += 'g';
  return flags;
}

// Event listener for testing the regex
testButton.addEventListener('click', function () {
  const patternValue = regexPattern.value;
  const flags = getFlags();
  let regex;

  try {
    regex = new RegExp(patternValue, flags);
  } catch (e) {
    // Invalid regex
    testResult.textContent = 'Invalid regex';
    return;
  }

  const originalText = stringToTest.textContent; // Save original for processing
  const matches = originalText.match(regex);

  if (matches) {
    // Highlight matches
    stringToTest.innerHTML = originalText.replace(regex, (match) => {
      return `<span class="highlight">${match}</span>`;
    });

    // Display matches in #result
    if (flags.includes('g')) {
      testResult.textContent = matches.join(', ');
    } else {
      testResult.textContent = matches[0];
    }
  } else {
    // No match
    testResult.textContent = 'no match';
    stringToTest.innerHTML = originalText; // Ensure text remains unchanged
  }
});
