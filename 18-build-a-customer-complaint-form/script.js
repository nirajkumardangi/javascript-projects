// Get all form elements
const form = document.getElementById('form');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const orderNoInput = document.getElementById('order-no');
const productCodeInput = document.getElementById('product-code');
const quantityInput = document.getElementById('quantity');

const complaintsGroup = document.getElementById('complaints-group');
const complaintCheckboxes = complaintsGroup.querySelectorAll(
  'input[type="checkbox"]'
);
const otherComplaintCheckbox = document.getElementById('other-complaint');
const complaintDescription = document.getElementById('complaint-description');

const solutionsGroup = document.getElementById('solutions-group');
const solutionRadios = solutionsGroup.querySelectorAll('input[type="radio"]');
const otherSolutionRadio = document.getElementById('other-solution');
const solutionDescription = document.getElementById('solution-description');

// Helper regex patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const orderNoPattern = /^2024\d{6}$/;
const productCodePattern = /^[A-Za-z]{2}\d{2}-[A-Za-z]\d{3}-[A-Za-z]{2}\d$/;

// Validate the form and return an object
function validateForm() {
  const validation = {};

  validation['full-name'] = fullNameInput.value.trim() !== '';
  validation['email'] = emailPattern.test(emailInput.value.trim());
  validation['order-no'] = orderNoPattern.test(orderNoInput.value.trim());
  validation['product-code'] = productCodePattern.test(
    productCodeInput.value.trim()
  );
  validation['quantity'] =
    Number.isInteger(+quantityInput.value) && +quantityInput.value > 0;

  // At least one complaint checkbox checked
  validation['complaints-group'] = Array.from(complaintCheckboxes).some(
    (cb) => cb.checked
  );

  // Complaint description if Other is checked
  validation['complaint-description'] =
    !otherComplaintCheckbox.checked ||
    complaintDescription.value.trim().length >= 20;

  // At least one solution radio checked
  validation['solutions-group'] = Array.from(solutionRadios).some(
    (rb) => rb.checked
  );

  // Solution description if Other is selected
  validation['solution-description'] =
    !otherSolutionRadio.checked ||
    solutionDescription.value.trim().length >= 20;

  return validation;
}

// Check if all fields are valid
function isValid(validationObject) {
  return Object.values(validationObject).every((value) => value === true);
}

// Utility function to update field border color
function updateFieldBorder(element, isValidField) {
  element.style.borderColor = isValidField ? 'green' : 'red';
}

// Attach change event listeners to update field border dynamically
fullNameInput.addEventListener('change', () =>
  updateFieldBorder(fullNameInput, fullNameInput.value.trim() !== '')
);
emailInput.addEventListener('change', () =>
  updateFieldBorder(emailInput, emailPattern.test(emailInput.value.trim()))
);
orderNoInput.addEventListener('change', () =>
  updateFieldBorder(
    orderNoInput,
    orderNoPattern.test(orderNoInput.value.trim())
  )
);
productCodeInput.addEventListener('change', () =>
  updateFieldBorder(
    productCodeInput,
    productCodePattern.test(productCodeInput.value.trim())
  )
);
quantityInput.addEventListener('change', () =>
  updateFieldBorder(
    quantityInput,
    Number.isInteger(+quantityInput.value) && +quantityInput.value > 0
  )
);

// Complaints group change
complaintCheckboxes.forEach((cb) =>
  cb.addEventListener('change', () => {
    const valid = Array.from(complaintCheckboxes).some((c) => c.checked);
    complaintsGroup.style.borderColor = valid ? 'green' : 'red';
    if (otherComplaintCheckbox.checked) {
      updateFieldBorder(
        complaintDescription,
        complaintDescription.value.trim().length >= 20
      );
    }
  })
);

complaintDescription.addEventListener('change', () => {
  if (otherComplaintCheckbox.checked) {
    updateFieldBorder(
      complaintDescription,
      complaintDescription.value.trim().length >= 20
    );
  }
});

// Solutions group change
solutionRadios.forEach((rb) =>
  rb.addEventListener('change', () => {
    const valid = Array.from(solutionRadios).some((r) => r.checked);
    solutionsGroup.style.borderColor = valid ? 'green' : 'red';
    if (otherSolutionRadio.checked) {
      updateFieldBorder(
        solutionDescription,
        solutionDescription.value.trim().length >= 20
      );
    }
  })
);

solutionDescription.addEventListener('change', () => {
  if (otherSolutionRadio.checked) {
    updateFieldBorder(
      solutionDescription,
      solutionDescription.value.trim().length >= 20
    );
  }
});

// Submit event
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const validation = validateForm();

  // Update all field borders
  updateFieldBorder(fullNameInput, validation['full-name']);
  updateFieldBorder(emailInput, validation['email']);
  updateFieldBorder(orderNoInput, validation['order-no']);
  updateFieldBorder(productCodeInput, validation['product-code']);
  updateFieldBorder(quantityInput, validation['quantity']);

  complaintsGroup.style.borderColor = validation['complaints-group']
    ? 'green'
    : 'red';
  if (otherComplaintCheckbox.checked) {
    updateFieldBorder(
      complaintDescription,
      validation['complaint-description']
    );
  }

  solutionsGroup.style.borderColor = validation['solutions-group']
    ? 'green'
    : 'red';
  if (otherSolutionRadio.checked) {
    updateFieldBorder(solutionDescription, validation['solution-description']);
  }

  if (isValid(validation)) {
    alert('Form submitted successfully!');
    form.reset();
    // Reset border colors
    form
      .querySelectorAll('input, textarea, fieldset')
      .forEach((el) => (el.style.borderColor = ''));
  } else {
    alert('Please correct the highlighted fields before submitting.');
  }
});
