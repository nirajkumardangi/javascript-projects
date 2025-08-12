const FOOD_DATA = [
  {
    image: {
      thumbnail: './assets/images/image-waffle-thumbnail.jpg',
      mobile: './assets/images/image-waffle-mobile.jpg',
      tablet: './assets/images/image-waffle-tablet.jpg',
      desktop: './assets/images/image-waffle-desktop.jpg',
    },
    name: 'Waffle with Berries',
    category: 'Waffle',
    price: 6.5,
  },
  {
    image: {
      thumbnail: './assets/images/image-creme-brulee-thumbnail.jpg',
      mobile: './assets/images/image-creme-brulee-mobile.jpg',
      tablet: './assets/images/image-creme-brulee-tablet.jpg',
      desktop: './assets/images/image-creme-brulee-desktop.jpg',
    },
    name: 'Vanilla Bean Crème Brûlée',
    category: 'Crème Brûlée',
    price: 7.0,
  },
  {
    image: {
      thumbnail: './assets/images/image-macaron-thumbnail.jpg',
      mobile: './assets/images/image-macaron-mobile.jpg',
      tablet: './assets/images/image-macaron-tablet.jpg',
      desktop: './assets/images/image-macaron-desktop.jpg',
    },
    name: 'Macaron Mix of Five',
    category: 'Macaron',
    price: 8.0,
  },
  {
    image: {
      thumbnail: './assets/images/image-tiramisu-thumbnail.jpg',
      mobile: './assets/images/image-tiramisu-mobile.jpg',
      tablet: './assets/images/image-tiramisu-tablet.jpg',
      desktop: './assets/images/image-tiramisu-desktop.jpg',
    },
    name: 'Classic Tiramisu',
    category: 'Tiramisu',
    price: 5.5,
  },
  {
    image: {
      thumbnail: './assets/images/image-baklava-thumbnail.jpg',
      mobile: './assets/images/image-baklava-mobile.jpg',
      tablet: './assets/images/image-baklava-tablet.jpg',
      desktop: './assets/images/image-baklava-desktop.jpg',
    },
    name: 'Pistachio Baklava',
    category: 'Baklava',
    price: 4.0,
  },
  {
    image: {
      thumbnail: './assets/images/image-meringue-thumbnail.jpg',
      mobile: './assets/images/image-meringue-mobile.jpg',
      tablet: './assets/images/image-meringue-tablet.jpg',
      desktop: './assets/images/image-meringue-desktop.jpg',
    },
    name: 'Lemon Meringue Pie',
    category: 'Pie',
    price: 5.0,
  },
  {
    image: {
      thumbnail: './assets/images/image-cake-thumbnail.jpg',
      mobile: './assets/images/image-cake-mobile.jpg',
      tablet: './assets/images/image-cake-tablet.jpg',
      desktop: './assets/images/image-cake-desktop.jpg',
    },
    name: 'Red Velvet Cake',
    category: 'Cake',
    price: 4.5,
  },
  {
    image: {
      thumbnail: './assets/images/image-brownie-thumbnail.jpg',
      mobile: './assets/images/image-brownie-mobile.jpg',
      tablet: './assets/images/image-brownie-tablet.jpg',
      desktop: './assets/images/image-brownie-desktop.jpg',
    },
    name: 'Salted Caramel Brownie',
    category: 'Brownie',
    price: 4.5,
  },
  {
    image: {
      thumbnail: './assets/images/image-panna-cotta-thumbnail.jpg',
      mobile: './assets/images/image-panna-cotta-mobile.jpg',
      tablet: './assets/images/image-panna-cotta-tablet.jpg',
      desktop: './assets/images/image-panna-cotta-desktop.jpg',
    },
    name: 'Vanilla Panna Cotta',
    category: 'Panna Cotta',
    price: 6.5,
  },
];

const cart = [];
const menuGrid = document.querySelector('.menu-grid');
const cartContainer = document.querySelector('.cart');

// Generate menu items
function renderMenu() {
  const fragment = document.createDocumentFragment();

  FOOD_DATA.forEach((item, index) => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.dataset.index = index;

    menuItem.innerHTML = `
          <picture>
            <source srcset="${item.image.mobile}" media="(max-width: 480px)">
            <source srcset="${item.image.tablet}" media="(max-width: 768px)">
            <source srcset="${item.image.desktop}" media="(min-width: 769px)">
            <img src="${item.image.desktop}" alt="${item.name}" />
          </picture>
          <button class='add-to-cart' data-name="${item.name}" data-price="${
      item.price
    }" data-image="${item.image.desktop}">
            <img src="./assets/images/icon-add-to-cart.svg" alt="cart-icon" class="add-to-cart-icon" />
          </button>
          <p class="category">${item.category}</p>
          <h2>${item.name}</h2>
          <p class="price">${item.price.toFixed(2)}</p>
        `;

    fragment.appendChild(menuItem);
  });

  menuGrid.appendChild(fragment);
}

// Add to cart functionality
function addToCart(name, price, image) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.totalPrice = existingItem.quantity * existingItem.price;
  } else {
    cart.push({
      name,
      price: parseFloat(price),
      image,
      quantity: 1,
      totalPrice: parseFloat(price),
    });
  }

  updateCartUI();
  updateButtonStates();
}

// Remove from cart
function removeFromCart(name) {
  const index = cart.findIndex((item) => item.name === name);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  updateCartUI();
  updateButtonStates();
}

// Update quantity
function updateQuantity(name, change) {
  const item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      item.totalPrice = item.quantity * item.price;
      updateCartUI();
      updateButtonStates();
    }
  }
}

// Update button states
function updateButtonStates() {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach((button) => {
    const name = button.dataset.name;
    const cartItem = cart.find((item) => item.name === name);

    if (cartItem) {
      button.classList.add('in-cart');
      button.innerHTML = `
            <div class="qty-controls">
              <button class="qty-btn" onclick="updateQuantity('${name}', -1)">−</button>
              <span class="qty-count">${cartItem.quantity}</span>
              <button class="qty-btn" onclick="updateQuantity('${name}', 1)">+</button>
            </div>
          `;
    } else {
      button.classList.remove('in-cart');
      button.innerHTML = `
            <h3>Add to cart</h3>
          `;
    }
  });
}

// Update cart UI
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  document.getElementById(
    'cart-item-count'
  ).textContent = `Your Cart (${totalItems})`;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
          <h2 id="cart-item-count">Your Cart (0)</h2>
          <div class="cart-empty">
            <img src="./assets/images/illustration-empty-cart.svg" alt="Empty cart">
            <p>Your added items will appear here</p>
          </div>
        `;
  } else {
    cartContainer.innerHTML = `
          <h2 id="cart-item-count">Your Cart (${totalItems})</h2>
          ${cart
            .map(
              (item) => `
            <div class="cart-item">
              <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">
                  <span class="cart-item-quantity">${item.quantity}x</span>
                  <span class="cart-item-price">@ $${item.price.toFixed(
                    2
                  )}</span>
                  <span class="cart-item-total">$${item.totalPrice.toFixed(
                    2
                  )}</span>
                </div>
              </div>
              <button class="remove-item" onclick="removeFromCart('${
                item.name
              }')">×</button>
            </div>
          `
            )
            .join('')}
          <div class="order-total">
            <span>Order Total</span>
            <span>$${totalAmount.toFixed(2)}</span>
          </div>
          <button class="confirm-order" onclick="showOrderConfirmation()">Confirm Order</button>
        `;
  }
}

// Show order confirmation popup
function showOrderConfirmation() {
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const popup = document.createElement('div');
  popup.className = 'popup-overlay';
  popup.innerHTML = `
    <div class="popup-box">
      <div class="popup-header">
        <div>
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
        </div>
      </div>
      ${cart
        .map(
          (item) => `
        <div class="popup-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="popup-item-info">
            <div class="popup-item-name">${item.name}</div>
            <div class="popup-item-details">
              <span class="popup-item-quantity">${item.quantity}x</span>
              <span class="popup-item-price">@ $${item.price.toFixed(2)}</span>
            </div>
          </div>
          <div class="popup-item-total">$${item.totalPrice.toFixed(2)}</div>
        </div>
      `
        )
        .join('')}
      <div class="popup-total">
        <span>Order Total</span>
        <span>$${totalAmount.toFixed(2)}</span>
      </div>
      <button class="start-new-order">Start New Order</button>
    </div>
  `;

  // Append to body
  document.body.appendChild(popup);

  // Add click event for "Start New Order" button
  popup.querySelector('.start-new-order').addEventListener('click', () => {
    startNewOrder();
    document.body.removeChild(popup);
  });
}

// Render menu on page load
renderMenu();
updateButtonStates();
updateCartUI();

// Event delegation for Add to Cart and quantity buttons
menuGrid.addEventListener('click', function (e) {
  const addBtn = e.target.closest('.add-to-cart');
  if (addBtn) {
    const name = addBtn.dataset.name;
    const price = addBtn.dataset.price;
    const image = addBtn.dataset.image;
    // If not in cart, add to cart
    if (!addBtn.classList.contains('in-cart')) {
      addToCart(name, price, image);
    }
  }
  // Quantity controls
  if (e.target.classList.contains('qty-btn')) {
    const parentBtn = e.target.closest('.add-to-cart');
    const name = parentBtn.dataset.name;
    if (e.target.textContent.trim() === '+') {
      updateQuantity(name, 1);
    } else {
      updateQuantity(name, -1);
    }
  }
});

// Event delegation for remove item and confirm order in cart
cartContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('remove-item')) {
    const name = e.target
      .closest('.cart-item')
      .querySelector('.cart-item-name').textContent;
    removeFromCart(name);
  }
  if (e.target.classList.contains('confirm-order')) {
    showOrderConfirmation();
  }
});

// Add missing startNewOrder function
function startNewOrder() {
  cart.length = 0;
  updateCartUI();
  updateButtonStates();
}
