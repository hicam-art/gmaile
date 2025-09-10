let products = [];

async function load(){
  const res = await fetch('../data/products.json');
  products = await res.json();
  renderTable();
}
load();

function renderTable(){
  const tbody = document.querySelector('#productsTable tbody');
  tbody.innerHTML = products.map((p,i)=>`
    <tr>
      <td>${i+1}</td>
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td><img src="${p.image}" alt=""></td>
      <td>
        <button onclick="editProduct(${i})">تعديل</button>
        <button onclick="deleteProduct(${i})">حذف</button>
      </td>
    </tr>`).join('');
}

function editProduct(i){
  document.getElementById('editId').value = i;
  document.getElementById('name').value   = products[i].name;
  document.getElementById('price').value  = products[i].price;
  document.getElementById('image').value  = products[i].image;
  document.getElementById('desc').value   = products[i].desc;
  document.getElementById('saveBtn').textContent = 'تحديث المنتج';
}

function deleteProduct(i){
  if(confirm('متأكد من الحذف؟')){
    products.splice(i,1);
    saveToJSON();
  }
}

function resetForm(){
  document.getElementById('productForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('saveBtn').textContent = 'حفظ المنتج';
}

document.getElementById('productForm').addEventListener('submit', e=>{
  e.preventDefault();
  const id = document.getElementById('editId').value;
  const item = {
    id: Date.now(),               // ID فريت لحين التعديل
    name: document.getElementById('name').value.trim(),
    price: parseFloat(document.getElementById('price').value),
    image: document.getElementById('image').value.trim(),
    desc: document.getElementById('desc').value.trim()
  };

  if(id==='') products.push(item);
  else products[parseInt(id)] = {...products[parseInt(id)], ...item};

  saveToJSON();
});

function saveToJSON(){
  // نحفظ نسخة محلية داخل مجلد data
  const blob = new Blob([JSON.stringify(products,null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'products.json';
  a.click();
  alert('تم تحميل ملف products.json الجديد! ضعه داخل مجلد data واستبدل القديم.');
  renderTable();
  resetForm();
}