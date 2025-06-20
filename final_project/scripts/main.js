// Animated hamburger menu starts here

let hamburgerdiv = document.querySelector(".hamburger")
let backdropdiv = document.querySelector(".backdrop")
let navCon = document.querySelector(".mobile-nav-container ")


function toggleclass() {
    hamburgerdiv.classList.toggle('crossburger')
    navCon.classList.toggle('show-mobile-navcontainer')
    backdropdiv.classList.toggle('showbackdrop')
}

hamburgerdiv.addEventListener("click", toggleclass)
backdropdiv.addEventListener("click", toggleclass)
// Animated hamburger menu ends here

// Window onscroll implementation starts here

window.addEventListener("scroll", () => {
    let nav = document.querySelector(".header-nav");
    let scrollValue = document.documentElement.scrollTop;
    if (scrollValue > 1) {
        nav.classList.add("header-nav-sticky")
    }
    else {
        nav.classList.remove("header-nav-sticky")
    }
})

// Window onscroll implementation ends here

// Shop implementation starts here

const products = [
  {
    id: "1",
    age: "new",
    discount: 0,
    discountExpiresInDays: 23,
    rating: 5,
    title: "Banana la fruit",
    price: "4,000.00",
    miniImage: "./images/banana.png",
    mainImage: "./images/banana.png",
    category: "fruits",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque."
  },
  {
    id: "2",
    age: "new",
    discount: 50,
    discountExpiresInDays: 23,
    rating: 5,
    title: "Magic pizito la porche",
    price: "2,000.00",
    miniImage: "./images/magic-pizito.png",
    mainImage: "./images/magic-pizito.png",
    category: "wholegrain",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque."
  }
  ,{
    id: "3",
    age: "new",
    discount: 50,
    discountExpiresInDays: 23,
    rating: 5,
    title: "Konoha soup",
    price: "4,000.00",
    miniImage: "./images/konoha-soup.png",
    mainImage: "./images/konoha-soup.png",
    category: "solids",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque."
  }
  ,{
    id: "4",
    age: "new",
    discount: 50,
    discountExpiresInDays: 23,
    rating: 5,
    title: "Jellof rice and beef",
    price: "4,000.00",
    miniImage: "./images/jellof.png",
    mainImage: "./images/jellof.png",
    category: "solids",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque."
  }
  ,{
    id: "5",
    age: "new",
    discount: 50,
    discountExpiresInDays: 23,
    rating: 5,
    title: "Rsengan piza la",
    price: "4,000.00",
    miniImage: "./images/rasengan-piza.png",
    mainImage: "./images/rasengan-piza.png",
    category: "vegetarian",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque."
  }
  ,{
    id: "6",
    age: "new",
    discount: 50,
    discountExpiresInDays: 23,
    rating: 5,
    title: "La Burger cuisine",
    price: "4,000.00",
    miniImage: "./images/burger.png",
    mainImage: "./images/burger.png",
    category: "solids",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque."
  }
  ,{
    id: "7",
    age: "new",
    discount: 50,
    discountExpiresInDays: 23,
    rating: 5,
    title: "overcooked ramen",
    price: "4,000.00",
    miniImage: "./images/spa-ramen.png",
    mainImage: "./images/spa-ramen.png",
    category: "vegetarian",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ad et est, fugiat repudiandae neque illo delectus commodi magnam explicabo autem voluptates eaque velit vero facere mollitia. Placeat rem, molestiae error obcaecati enim doloribus impedit aliquam, maiores qui minus neque."
  }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  displayProducts(products);
  updateCartCount();
  renderCartItems();
});

function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
    <div class="products-card">
      <div class="product-card-header">
        <div class="discounts">
          <span class="products-age-type">${product.age}</span>
          <span class="products-discount-amount">
            -${product.discount}%
          </span>
        </div>
        <span>
          <i class="fa-regular fa-heart"></i>
        </span>
      </div>
            
      <div class="products-card-image-container " onclick="viewProduct('${product.id}')">
        <figure>
          <img
            src=${product.miniImage}
            alt="${product.title}"
          />
        </figure>
      </div>
      <div class="products-card-image-details ">
        <div class="product-title-container">
          <span class="products-title">
            ${product.title.length > 15 ? product.title.substring(0, 15) + "..." : product.title}
          </span>
        </div>
        <span class="products-price">₦ ${product.price}</span>
        <span class="products-rating">
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <LuStarHalf />
        </span>
          <button
          onclick="addToCart('${product.id}')"
            class="products-addtocart-action"
          >
            Add To Cart
          </button> 
      </div>
    </div>
    `;
    productList.appendChild(productCard);
  });
}

function filterProducts(category) {
  if (category === 'all') {
    displayProducts(products);
  } else {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
  }
}

function addToCart(id) {
  const product = products.find(product => product.id === id);
  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
  renderCartItems();
  saveCart();
}

function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  modal.classList.toggle('open');
}

function renderCartItems() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach(product => {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <figure>
          <img
            src=${product.mainImage}
            alt="${product.title}"
          />
        </figure>
      <div>
        <h4>${product.title}</h4>
        <p>₦ ${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        <button onclick="updateQuantity('${product.id}', 'decrease')">-</button>
        <button onclick="updateQuantity('${product.id}', 'increase')">+</button>
        <button onclick="removeFromCart('${product.id}')">Remove</button>
      </div>

    `;
    cartItems.appendChild(cartItem);
  });
}

function updateQuantity(id, action) {
  const cartItem = cart.find(item => item.id === id);
  if (action === 'increase') {
    cartItem.quantity += 1;
  } else if (action === 'decrease' && cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  }
  updateCartCount();
  renderCartItems();
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  renderCartItems();
  saveCart();
}

function viewProduct(id) {
  const product = products.find(product => product.id === id);
  const productList = document.getElementById('product-list');
  productList.innerHTML = `
  <h2>${product.title}</h2>
    <div class="full-product-details">
      <figure>
          <img
            src=${product.mainImage}
            alt="${product.title}"
          />
        </figure>
      <p>₦${product.price}</p>
      <p>${product.desc}</p>
      <button class="btn btn-main" onclick="addToCart('${product.id}')">Add to Cart</button>
      <button class="btn btn-main" onclick="displayProducts(products)">Back to Products</button>
    </div>
  `;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


// Shop implementation ends here