// helpers
function getCart(){ return JSON.parse(localStorage.getItem('cart'))||[] }
function setCart(c){ localStorage.setItem('cart',JSON.stringify(c)); updateCartCount(); }

// عدّاد الهيدر
function updateCartCount(){
  const count = getCart().reduce((s,p)=>s+p.qty,0);
  document.querySelectorAll('#cartCount').forEach(el=>el.textContent=count);
}

// إضافة منتج
function addToCart(id,name,price,q=1){
  const cart = getCart();
  const found = cart.find(p=>p.id==id);
  if(found) found.qty += q;
  else cart.push({id,name,price,qty:q});
  setCart(cart);
  alert('أُضيف للسلة!');
}

// عرض السلة
function renderCart(){
  const cart = getCart();
  const tbody = document.querySelector('#cartTable tbody');
  const empty = document.getElementById('cartEmpty');
  const table = document.getElementById('cartTable');
  const totalEl = document.getElementById('totalPrice');

  if(!cart.length){ empty.style.display='block'; table.style.display='none'; return; }

  empty.style.display='none'; table.style.display='table'; tbody.innerHTML='';
  let total=0;
  cart.forEach((p,i)=>{
    const sub = p.price*p.qty;
    total+=sub;
    tbody.innerHTML+=`
      <tr>
        <td>${p.name}</td>
        <td>${p.price} ريال</td>
        <td>
          <div class="qty-controls">
            <button onclick="changeQty(${i},-1)">-</button>
            <span>${p.qty}</span>
            <button onclick="changeQty(${i},1)">+</button>
          </div>
        </td>
        <td>${sub.toFixed(2)} ريال</td>
        <td><button onclick="removeItem(${i})">🗑️</button></td>
      </tr>`;
  });
  totalEl.textContent=total.toFixed(2);
}

// تغيير كمية
function changeQty(i,delta){
  const cart=getCart();
  cart[i].qty+=delta;
  if(cart[i].qty<=0) cart.splice(i,1);
  setCart(cart); renderCart();
}

// حذف مفرد
function removeItem(i){ const c=getCart(); c.splice(i,1); setCart(c); renderCart(); }

// إفراغ السلة
function clearCart(){ if(confirm('أفراغ السلة؟')){ setCart([]); renderCart(); } }

// تحديث العداد عند تحميل أي صفحة
updateCartCount();