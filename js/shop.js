
let products = [];

async function loadProducts(){
  const res = await fetch('data/products.json');
  products = await res.json();
  renderProducts(products);
}
loadProducts();

function renderProducts(list){
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  list.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p class="price">${p.price} ريال</p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">أضف للسلة</button>
      </div>`;
  });
}

// فلترة بسيطة
document.getElementById('searchBox').addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});

// ترتيب السعر
document.getElementById('sortSelect').addEventListener('change', e => {
  const sorted = [...products];
  if(e.target.value === 'asc')  sorted.sort((a,b)=> a.price - b.price);
  if(e.target.value === 'desc') sorted.sort((a,b)=> b.price - a.price);
  renderProducts(sorted);
});