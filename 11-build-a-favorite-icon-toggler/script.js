const btns = document.querySelectorAll('.favorite-icon');

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('filled')) {
      btn.classList.add('filled');
      btn.innerHTML = '&#10084';
    } else {
      btn.classList.remove('filled');
      btn.innerHTML = '&#9825';
    }
  });
});
