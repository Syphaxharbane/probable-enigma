let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) existing.quantity++;
  else cart.push({ name, price, quantity: 1 });
  renderCart();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const items = document.getElementById("cartItems");
  const count = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotal");

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  count.textContent = totalQuantity;
  totalEl.textContent = total.toLocaleString("fr-FR") + " DA";

  if (!cart.length) {
    items.innerHTML = '<p class="empty">Votre panier est vide.</p>';
    return;
  }

  items.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <small>${item.quantity} × ${item.price.toLocaleString("fr-FR")} DA</small>
      </div>
      <button class="remove" onclick="removeFromCart(${index})">Supprimer</button>
    </div>
  `).join("");
}

function openCart() {
  document.getElementById("cart").classList.add("show");
  document.getElementById("overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cart").classList.remove("show");
  document.getElementById("overlay").classList.remove("show");
}

function placeOrder() {
  if (!cart.length) {
    alert("Votre panier est vide.");
    return;
  }

  const lines = cart.map(item =>
    `• ${item.name} — ${item.quantity} × ${item.price.toLocaleString("fr-FR")} DA`
  ).join("\n");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const message =
    `Bonjour LSAS Maakni 👋\n\n` +
    `Je souhaite commander :\n${lines}\n\n` +
    `Total : ${total.toLocaleString("fr-FR")} DA`;

  const whatsappNumber = "213540243897";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
