const firebaseConfig={
  apiKey:"AIzaSyDLnKFPJ4m-f132LIzYo12qt5cgZLmIv5w",
  authDomain:"sribalajialuminiums.firebaseapp.com",
  projectId:"sribalajialuminiums",
  storageBucket:"sribalajialuminiums.firebasestorage.app",
  messagingSenderId:"37710086664",
  appId:"1:37710086664:web:edfb1068297e8329e387bd"
};
firebase.initializeApp(firebaseConfig);
var db=firebase.firestore(),auth=firebase.auth();
var col=db.collection('products');
var allProds=[],filteredProds=[],deleteTarget=null,editImgData=null,addImgData=null,dragSrcIdx=null;
var EM={"New Launch":"🆕","Kitchenware":"🍳","Hotelware":"🏨","Pooja Articles":"🪔","Appliances":"⚡"};

/* AUTH */
auth.onAuthStateChanged(function(user){
  document.getElementById('pageLoader').style.display='none';
  if(user){
    document.getElementById('loginScreen').style.display='none';
    document.getElementById('adminApp').style.display='block';
    document.getElementById('userEmail').textContent=user.email;
    document.getElementById('userAv').textContent=user.email[0].toUpperCase();
    loadProducts();
  }else{
    document.getElementById('loginScreen').style.display='flex';
    document.getElementById('adminApp').style.display='none';
  }
});

function doLogin(){
  var email=document.getElementById('lEmail').value.trim();
  var pass=document.getElementById('lPass').value;
  var btn=document.getElementById('loginBtn');var err=document.getElementById('loginErr');
  err.style.display='none';btn.textContent='⏳ Signing in…';btn.disabled=true;
  auth.signInWithEmailAndPassword(email,pass)
    .catch(function(e){err.textContent='❌ Invalid email or password. Please try again.';err.style.display='block'})
    .finally(function(){btn.textContent='🔐 Sign In to Admin Panel';btn.disabled=false});
}
function doLogout(){auth.signOut()}
document.getElementById('lPass').addEventListener('keydown',function(e){if(e.key==='Enter')doLogin()});

/* NAVIGATION */
function showPanel(name,el){
  document.querySelectorAll('.panel').forEach(function(p){p.classList.remove('active')});
  document.getElementById('panel-'+name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(function(n){n.classList.remove('active')});
  if(el)el.classList.add('active');
  else{var map={dashboard:0,addProduct:1,products:2};var navs=document.querySelectorAll('.nav-item');if(navs[map[name]])navs[map[name]].classList.add('active')}
  var titles={dashboard:'Dashboard',addProduct:'Add New Product',products:'Manage Products'};
  document.getElementById('topTitle').textContent=titles[name]||'';
  if(name==='products')renderTable();
  if(window.innerWidth<=900)document.getElementById('sidebar').classList.remove('open');
}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open')}
document.addEventListener('click',function(e){var sb=document.getElementById('sidebar');if(sb&&sb.classList.contains('open')&&!sb.contains(e.target)){var tog=document.querySelector('.sb-toggle');if(tog&&!tog.contains(e.target))sb.classList.remove('open')}});

/* LOAD PRODUCTS */
function loadProducts(){
  col.orderBy('sortOrder','asc').onSnapshot(function(s){
    allProds=s.docs.map(function(d){return Object.assign({id:d.id},d.data())});
    filteredProds=[].concat(allProds);
    updateStats();renderRecent();
    if(document.getElementById('panel-products').classList.contains('active'))renderTable();
  },function(){
    col.onSnapshot(function(s){
      allProds=s.docs.map(function(d){return Object.assign({id:d.id},d.data())});
      filteredProds=[].concat(allProds);
      updateStats();renderRecent();
    });
  });
}

function updateStats(){
  document.getElementById('stTotal').textContent=allProds.length;
  document.getElementById('stAvail').textContent=allProds.filter(function(p){return p.available!==false}).length;
  document.getElementById('stUnavail').textContent=allProds.filter(function(p){return p.available===false}).length;
  var cats=new Set(allProds.map(function(p){return p.category}).filter(Boolean));
  document.getElementById('stCats').textContent=cats.size;
}

function renderRecent(){
  var container=document.getElementById('recentList');
  var items=allProds; // SHOW ALL
  if(!items.length){container.innerHTML='<div style="color:var(--muted2);font-style:italic">No products yet.</div>';return}
  container.innerHTML=items.map(function(p){
    var e=EM[p.category]||'🪣';
    var img=p.imageUrl ? '<img class="ri-img" src="'+p.imageUrl+'" alt="">' : '<div class="ri-ph">'+e+'</div>';
    return'<div class="recent-item">'+img+'<div class="ri-name">'+eh(p.productName)+'</div><span class="cat-pill">'+eh(p.category||'')+'</span><span class="ri-price">'+(p.price>0?'₹'+p.price:'On Request')+'</span><span class="status-badge '+(p.available!==false?'avail':'unavail')+'">'+(p.available!==false?'✅ Active':'❌ Hidden')+'</span></div>';
  }).join('');
}

/* TABLE */
function filterTable(){
  var q=(document.getElementById('admSearch').value||'').toLowerCase();
  var cat=document.getElementById('admCatFilter').value;
  filteredProds=allProds.filter(function(p){
    var mq=!q||(p.productName||'').toLowerCase().includes(q)||(p.category||'').toLowerCase().includes(q);
    var mc=!cat||p.category===cat;return mq&&mc;
  });renderTable();
}

function renderTable(){
  var tb=document.getElementById('prodTableBody');
  if(!filteredProds.length){tb.innerHTML='<tr><td class="empty-row" colspan="8">No products found.</td></tr>';return}
  tb.innerHTML=filteredProds.map(function(p,idx){
    var e=EM[p.category]||'🪣';
    var img=p.imageUrl?'<img class="timg" src="'+p.imageUrl+'" alt="">':'<div class="tiph">'+e+'</div>';
    return'<tr draggable="true" data-id="'+p.id+'" data-idx="'+idx+'"'
      +' ondragstart="dragStart(event,'+idx+')" ondragover="dragOver(event,'+idx+')" ondrop="dragDrop(event,'+idx+')" ondragleave="dragLeave(event)">'
      +'<td><input class="sno-inp" type="number" value="'+(idx+1)+'" min="1" max="'+filteredProds.length+'" onchange="jumpSno(this,\''+p.id+'\','+idx+')" title="Enter position to jump"></td>'
      +'<td><span class="drag-handle">⠿</span></td>'
      +'<td>'+img+'</td>'
      +'<td style="font-weight:600;max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+eh(p.productName||'')+'</td>'
      +'<td><span class="cat-pill">'+e+' '+eh(p.category||'')+'</span></td>'
      +'<td style="font-weight:700;color:var(--gold3)">'+(p.price>0?'₹'+p.price.toLocaleString('en-IN'):'On Request')+'</td>'
      +'<td><span class="status-badge '+(p.available!==false?'avail':'unavail')+'">'+(p.available!==false?'✅ Active':'❌ Hidden')+'</span></td>'
      +'<td><div class="tbl-actions"><button class="btn btn-warn btn-sm" onclick="openEdit(\''+p.id+'\')">✏️ Edit</button><button class="btn btn-danger btn-sm" onclick="askDelete(\''+p.id+'\',\''+ea(p.productName||'')+'\')">🗑️</button></div></td>'
      +'</tr>';
  }).join('');
}

/* DRAG SORT */
function jumpSno(input,id,curIdx){var newPos=parseInt(input.value)-1;if(isNaN(newPos)||newPos<0||newPos>=filteredProds.length){input.value=curIdx+1;return}var item=filteredProds.splice(curIdx,1)[0];filteredProds.splice(newPos,0,item);saveSortOrder(filteredProds)}
function dragStart(e,idx){dragSrcIdx=idx;e.currentTarget.classList.add('dragging');e.dataTransfer.effectAllowed='move'}
function dragOver(e,idx){e.preventDefault();e.dataTransfer.dropEffect='move';document.querySelectorAll('#prodTableBody tr').forEach(function(r){r.classList.remove('drag-over')});if(dragSrcIdx!==idx)e.currentTarget.classList.add('drag-over')}
function dragLeave(e){e.currentTarget.classList.remove('drag-over')}
function dragDrop(e,idx){e.preventDefault();document.querySelectorAll('#prodTableBody tr').forEach(function(r){r.classList.remove('drag-over','dragging')});if(dragSrcIdx===idx)return;var moved=filteredProds.splice(dragSrcIdx,1)[0];filteredProds.splice(idx,0,moved);saveSortOrder(filteredProds)}
function saveSortOrder(list){var batch=db.batch();list.forEach(function(p,i){batch.update(col.doc(p.id),{sortOrder:i})});batch.commit().then(function(){showToast('✅ Order saved!','ok');renderTable()}).catch(function(){showToast('❌ Error saving order','err')})}

/* IMAGE COMPRESSION */
function compressImage(file,maxPx,quality){
  maxPx=maxPx||900;quality=quality||0.8;
  return new Promise(function(resolve){
    var reader=new FileReader();
    reader.onload=function(e){
      var img=new Image();
      img.onload=function(){
        var canvas=document.createElement('canvas');
        var w=img.width,h=img.height;
        if(w>maxPx||h>maxPx){if(w>h){h=Math.round(h/w*maxPx);w=maxPx}else{w=Math.round(w/h*maxPx);h=maxPx}}
        canvas.width=w;canvas.height=h;
        var ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,w,h);
        resolve(canvas.toDataURL('image/jpeg',quality));
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function handleImg(input,prevId,areaId){
  if(!input.files[0])return;
  compressImage(input.files[0]).then(function(data){
    if(prevId==='imgPrev')addImgData=data;else editImgData=data;
    var prev=document.getElementById(prevId);prev.src=data;prev.style.display='block';
    if(areaId){var area=document.getElementById(areaId);if(area){var p=area.querySelector('p');if(p)p.innerHTML='<strong style="color:var(--gold3)">✅ Image ready!</strong> <small>Compressed and ready to save</small>'}}
  });
}

/* ADD */
function submitProduct(e){
  e.preventDefault();
  var btn=document.getElementById('saveBtn');btn.textContent='⏳ Saving…';btn.disabled=true;
  var aliases=document.getElementById('pAliases').value.split(',').map(function(s){return s.trim()}).filter(Boolean);
  var data={productName:document.getElementById('pName').value.trim(),category:document.getElementById('pCat').value,price:parseFloat(document.getElementById('pPrice').value)||0,description:document.getElementById('pDesc').value.trim(),aliases:aliases,imageUrl:addImgData||'',available:document.getElementById('pAvail').checked,sortOrder:parseInt(document.getElementById('pSort').value)||allProds.length,createdAt:firebase.firestore.FieldValue.serverTimestamp(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
  col.add(data).then(function(){showToast('✅ Product added successfully!','ok');resetAddForm()}).catch(function(e){showToast('❌ Error: '+e.message,'err')}).finally(function(){btn.textContent='💾 Save Product';btn.disabled=false});
}
function resetAddForm(){document.getElementById('addForm').reset();document.getElementById('imgPrev').style.display='none';addImgData=null;var p=document.querySelector('#uploadArea p');if(p)p.innerHTML='<strong>Click to upload image</strong><br><small>JPG, PNG, WebP – auto-compressed</small>'}

/* EDIT */
function openEdit(id){
  var p=allProds.find(function(x){return x.id===id});if(!p)return;
  document.getElementById('editId').value=id;
  document.getElementById('eName').value=p.productName||'';
  document.getElementById('eCat').value=p.category||'Kitchenware';
  document.getElementById('ePrice').value=p.price||0;
  document.getElementById('eSort').value=p.sortOrder||0;
  document.getElementById('eDesc').value=p.description||'';
  document.getElementById('eAliases').value=(p.aliases||[]).join(', ');
  document.getElementById('eAvail').checked=p.available!==false;
  editImgData=null;
  var prev=document.getElementById('eImgPrev');
  if(p.imageUrl){prev.src=p.imageUrl;prev.style.display='block'}else prev.style.display='none';
  document.getElementById('editModal').classList.add('open');
}
function closeEdit(){document.getElementById('editModal').classList.remove('open');editImgData=null}
function saveEdit(e){
  e.preventDefault();
  var id=document.getElementById('editId').value;
  var aliases=document.getElementById('eAliases').value.split(',').map(function(s){return s.trim()}).filter(Boolean);
  var data={productName:document.getElementById('eName').value.trim(),category:document.getElementById('eCat').value,price:parseFloat(document.getElementById('ePrice').value)||0,description:document.getElementById('eDesc').value.trim(),aliases:aliases,available:document.getElementById('eAvail').checked,sortOrder:parseInt(document.getElementById('eSort').value)||0,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
  if(editImgData)data.imageUrl=editImgData;
  col.doc(id).update(data).then(function(){closeEdit();showToast('✅ Product updated!','ok')}).catch(function(e){showToast('❌ Error: '+e.message,'err')});
}

/* DELETE */
function askDelete(id,name){deleteTarget=id;document.getElementById('confirmText').textContent='Delete "'+name+'"? This cannot be undone.';document.getElementById('confirmModal').classList.add('open')}
function closeConfirm(){document.getElementById('confirmModal').classList.remove('open');deleteTarget=null}
function doDelete(){if(!deleteTarget)return;col.doc(deleteTarget).delete().then(function(){closeConfirm();showToast('🗑️ Product deleted.','ok')}).catch(function(e){showToast('❌ Error: '+e.message,'err')})}

/* TOAST */
function showToast(msg,type){var t=document.getElementById('admToast');t.textContent=msg;t.className='adm-toast show '+(type||'');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show')},3200)}

/* CLOSE MODALS */
document.getElementById('editModal').addEventListener('click',function(e){if(e.target===this)closeEdit()});
document.getElementById('confirmModal').addEventListener('click',function(e){if(e.target===this)closeConfirm()});

/* UTILS */
function eh(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function ea(s){return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;')}
