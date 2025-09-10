(async ()=>{
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('pid'));
  if(!id){ location.href='shop.html'; return; }

  const res = await fetch('../data/products.json');
  const list = await res.json();
  const p = list.find(item=>item.id===id);
  if(!p){ location.href='shop.html'; return; }

  document.getElementById('productBox').innerHTML = `
    <div class="product-image">
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div class="product-info">
      <h2>${p.name}</h2>
      <div class="price">${p.price} ريال</div>
      <p>${p.desc}</p>
      <button onclick="addToCart(${p.id},'${p.name}',${p.price})">أضف للسلة</button>
    </div>`;
})();