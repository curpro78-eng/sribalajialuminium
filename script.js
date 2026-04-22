var firebaseConfig={
  apiKey:"AIzaSyDLnKFPJ4m-f132LIzYo12qt5cgZLmIv5w",
  authDomain:"sribalajialuminiums.firebaseapp.com",
  projectId:"sribalajialuminiums",
  storageBucket:"sribalajialuminiums.firebasestorage.app",
  messagingSenderId:"37710086664",
  appId:"1:37710086664:web:edfb1068297e8329e387bd"
};
firebase.initializeApp(firebaseConfig);
var db=firebase.firestore();
var WA='919894432232';

var SEED_PRODUCTS=[
  {productName:"Aluminium Biriyani Pot – 10L",price:0,category:"Hotelware",description:"Heavy-duty aluminium biriyani pot for hotel & home use. Thick walls for even heat distribution.",aliases:["biriyani vessel","large pot","hotel pot"],available:true,sortOrder:0},
  {productName:"Aluminium Idly Plate – 4 Tier",price:0,category:"Kitchenware",description:"4-tier aluminium idly stand with plates. Makes 16 idlies per batch. Perfect for homes and hotels.",aliases:["idli plate","idly stand"],available:true,sortOrder:1},
  {productName:"Aluminium Cooking Vessel – 5L",price:0,category:"Kitchenware",description:"5L everyday cooking vessel with thick bottom and easy grip handles.",aliases:["vessel","cooking pot","patram"],available:true,sortOrder:2},
  {productName:"Aluminium Dosa Tawa – 30cm",price:0,category:"Kitchenware",description:"30cm flat dosa tawa with even heat distribution. Perfect for crispy dosas.",aliases:["tawa","dosa pan","griddle"],available:true,sortOrder:3},
  {productName:"Aluminium Pressure Cooker – 3L",price:0,category:"Kitchenware",description:"3L aluminium pressure cooker with safety valve. Reliable for daily cooking.",aliases:["pressure cooker"],available:true,sortOrder:4},
  {productName:"Aluminium Hotel Vessel – 25L",price:0,category:"Hotelware",description:"Heavy-duty 25L vessel for hotel and catering use. Bulk pricing available.",aliases:["hotel vessel","large vessel","catering"],available:true,sortOrder:5},
  {productName:"Stainless Steel Dinner Plate",price:0,category:"Kitchenware",description:"Premium stainless steel dinner plate with mirror finish. Rust-free and hygienic.",aliases:["thali","plate"],available:true,sortOrder:6},
  {productName:"Stainless Steel Tumbler – 200ml",price:0,category:"Kitchenware",description:"200ml stainless steel tumbler. Rust-free, durable, and easy to clean.",aliases:["glass","cup","tumbler"],available:true,sortOrder:7},
  {productName:"Stainless Steel Serving Bowl",price:0,category:"Hotelware",description:"Serving bowl with lid, perfect for curries. Keeps food fresh.",aliases:["bowl","katori"],available:true,sortOrder:8},
  {productName:"Stainless Steel Kitchen Set – 7 Pcs",price:0,category:"Kitchenware",description:"Complete 7-piece stainless steel kitchen set.",aliases:["kitchen set"],available:true,sortOrder:9},
  {productName:"Brass Kuthu Vilakku",price:0,category:"Pooja Articles",description:"Traditional brass kuthu vilakku for pooja. Handcrafted with beautiful traditional designs.",aliases:["vilakku","lamp","deepam","puja lamp"],available:true,sortOrder:10},
  {productName:"Brass Kalasam – Pooja Pot",price:0,category:"Pooja Articles",description:"Pure brass kalasam for pooja rituals. Traditional design with high-quality finish.",aliases:["kalasam","pooja pot"],available:true,sortOrder:11},
  {productName:"Copper Water Pot – 2L",price:0,category:"Kitchenware",description:"Pure copper water pot with Ayurvedic health benefits. Keeps water cool naturally.",aliases:["copper pot","water vessel","tamra"],available:true,sortOrder:12},
  {productName:"Copper Pooja Plate",price:0,category:"Pooja Articles",description:"Pure copper pooja plate with traditional engravings.",aliases:["copper thali","pooja plate"],available:true,sortOrder:13},
  {productName:"Prestige Pressure Cooker – 5L",price:0,category:"Appliances",description:"Prestige ISI-marked pressure cooker in stainless steel.",aliases:["prestige cooker","cooker"],available:true,sortOrder:14},
  {productName:"Preethi Mixer Grinder – 750W",price:0,category:"Appliances",description:"Preethi 750W mixer grinder with 3 jars. Powerful motor for everyday use.",aliases:["preethi mixer","mixer"],available:true,sortOrder:15},
  {productName:"Ultra Wet Grinder – 2L",price:0,category:"Appliances",description:"Ultra 2L wet grinder with atta kneader. Perfect for idly and dosa batter.",aliases:["wet grinder","grinder"],available:true,sortOrder:16},
  {productName:"New Arrival – Copper Health Tumbler",price:0,category:"New Launch",description:"Pure health-grade copper tumbler for Ayurvedic water drinking.",aliases:["copper glass","copper cup","new"],available:true,sortOrder:17},
  {productName:"New Arrival – Steel Non-Stick Tawa",price:0,category:"New Launch",description:"Brand new non-stick coated steel tawa for healthier cooking.",aliases:["non stick","tawa","new"],available:true,sortOrder:18}
];

var HERO_SLIDES=[
//   {emoji:"🪣",title:"Premium Aluminium Collection",bg:"linear-gradient(135deg,#1a0a00,#3d1f00,#2a1200)"},
//   {emoji:"🥘",title:"Stainless Steel Kitchenware",bg:"linear-gradient(135deg,#0a0f1a,#1a2535,#0f1a28)"},
//   {emoji:"🔶",title:"Traditional Brass & Copper",bg:"linear-gradient(135deg,#1a0e00,#3d2800,#2a1800)"},
//   {emoji:"⚡",title:"Top Brand Appliances",bg:"linear-gradient(135deg,#001a0a,#003d1a,#001f10)"},
//   {emoji:"🏨",title:"Hotel & Catering Supply",bg:"linear-gradient(135deg,#1a0500,#3d0f00,#2a0800)"}
];

var allProducts=[],activeCat='All',searchQuery='',cart=[],curSlide=0,slTimer=null,modalQty=1,modalProdId=null;

var EM={Aluminium:'🍳','Stainless Steel':'🔘',Brass:'🔶',Copper:'🟤','Appliances & Brands':'⚡','Water Bottles':'💧',Household:'🏠',Kitchenware:'🥘',Hotelware:'🏨','Pooja Articles':'🪔','New Launch':'🆕',Cutlery:'🍴',Appliances:'⚡'};
var BC={Aluminium:'b-al','Stainless Steel':'b-ss',Brass:'b-br',Copper:'b-cu','Appliances & Brands':'b-ap','Water Bottles':'b-cu',Household:'b-br',Kitchenware:'b-kw',Hotelware:'b-hw','Pooja Articles':'b-pa','New Launch':'b-nl',Cutlery:'b-ss',Appliances:'b-ap'};

function formatCategoryLabel(p) {
  var cat = p.category || '';
  if ((cat === 'Appliances & Brands' || cat === 'Appliances') && p.applianceType) {
    return '⚡ ' + p.applianceType + (p.brand ? (' - ' + (p.brand.includes(' ') ? p.brand.split(' ')[1] : p.brand)) : '');
  }
  var e = EM[p.category] || '🪣';
  return e + ' ' + cat;
}

try{cart=JSON.parse(localStorage.getItem('sba_v5')||'[]')}catch(e){cart=[]}

window.addEventListener('scroll',function(){
  var y=window.scrollY;
  document.getElementById('hdr').classList.toggle('scrolled',y>10);
  document.getElementById('backTop').classList.toggle('visible',y>500);
});

function sTo(id){var el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'})}
function eh(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

/* ── Mobile Nav ── */
function toggleMob(){
  var mn=document.getElementById('mobNav'),hm=document.getElementById('hmb');
  mn.classList.toggle('open');hm.classList.toggle('open');
  document.body.style.overflow=mn.classList.contains('open')?'hidden':'';
  if(mn.classList.contains('open')){
    setTimeout(function(){document.getElementById('mobSearchInp').focus()},400);
  }
}
function navGo(id){sTo(id);if(document.getElementById('mobNav').classList.contains('open'))toggleMob()}
function navFilter(cat){filterCat(cat);if(document.getElementById('mobNav').classList.contains('open'))toggleMob()}
function navFilterBrand(brand){filterBrand(brand);if(document.getElementById('mobNav').classList.contains('open'))toggleMob()}

/* Mobile accordion */
function toggleAcc(hdr){
  var body=hdr.nextElementSibling;
  var isOpen=body.classList.contains('open');
  // Close all
  document.querySelectorAll('.mob-acc-body.open').forEach(function(b){b.classList.remove('open')});
  document.querySelectorAll('.mob-acc-hdr.open').forEach(function(h){h.classList.remove('open')});
  if(!isOpen){body.classList.add('open');hdr.classList.add('open')}
}

/* ── Reveal ── */
function initReveal(){
  var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('vis');io.unobserve(x.target)}})},{threshold:.08});
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(function(el){io.observe(el)});
}

/* ── Hero Slides ── */
function initHeroSlides(){
  var slides=document.querySelectorAll('.hero-slide');
  if(!slides.length) return;
  var ind=document.getElementById('slideIndicators');
  if(ind){
    ind.innerHTML=Array.from(slides).map(function(s,i){return '<div class="slide-dot'+(i===0?' active':'')+'" onclick="goSlide('+i+')"></div>'}).join('');
  }
  clearInterval(slTimer);
  slTimer=setInterval(function(){goSlide((curSlide+1)%slides.length)},3500);
}
function goSlide(n){
  var slides=document.querySelectorAll('.hero-slide');
  if(!slides.length)return;
  if(slides[curSlide]) slides[curSlide].classList.remove('active');
  var dots=document.querySelectorAll('.slide-dot');
  if(dots[curSlide]) dots[curSlide].classList.remove('active');
  curSlide=n%slides.length;
  if(slides[curSlide]) slides[curSlide].classList.add('active');
  if(dots[curSlide]) dots[curSlide].classList.add('active');
}

/* ── Load Products ── */
function loadProducts(){
  db.collection('products').orderBy('sortOrder','asc').get()
    .then(function(snap){
      if(snap.empty){
        var batch=db.batch();
        SEED_PRODUCTS.forEach(function(p){var r=db.collection('products').doc();batch.set(r,Object.assign({},p,{createdAt:firebase.firestore.FieldValue.serverTimestamp(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()}))});
        batch.commit().catch(function(){});
        allProducts=SEED_PRODUCTS.map(function(p,i){return Object.assign({id:'s'+i},p)});
      }else{
        allProducts=snap.docs.map(function(d){return Object.assign({id:d.id},d.data())}).filter(function(p){return p.available!==false});
      }
      renderProds();
      db.collection('products').onSnapshot(function(s){
        if(!s.empty){allProducts=s.docs.map(function(d){return Object.assign({id:d.id},d.data())}).filter(function(p){return p.available!==false});renderProds()}
      });
    }).catch(function(){
      allProducts=SEED_PRODUCTS.map(function(p,i){return Object.assign({id:'s'+i},p)});
      renderProds();
    });
}

/* ── Filter by brand (searches product names/descriptions) ── */
function filterBrand(brand){
  activeCat='All';
  searchQuery=brand;
  document.querySelectorAll('.fb').forEach(function(t){t.classList.remove('act')});
  document.querySelector('.fb[data-cat="All"]').classList.add('act');
  updateSectionHeader();
  renderProds();
  var sec=document.getElementById('products-grid-sec');
  if(sec)setTimeout(function(){sec.scrollIntoView({behavior:'smooth',block:'start'})},50);
}

/* ── Filter & Sort ── */
function getFilteredProds(){
  var list=allProducts.filter(function(p){
    var catMatch=false;
    if(activeCat==='All') catMatch=true;
    else if(activeCat==='Kitchenware') catMatch=p.category==='Kitchenware'||p.category==='Aluminium'||p.category==='Stainless Steel'||p.category==='Copper';
    else if(activeCat==='Hotelware') catMatch=p.category==='Hotelware';
    else if(activeCat==='Pooja Articles') catMatch=p.category==='Pooja Articles'||p.category==='Brass';
    else if(activeCat==='Aluminium') catMatch=p.category==='Aluminium'||(p.productName||'').toLowerCase().includes('aluminium');
    else if(activeCat==='Stainless Steel') catMatch=p.category==='Stainless Steel'||(p.productName||'').toLowerCase().includes('stainless') || (p.productName||'').toLowerCase().includes('steel');
    else if(activeCat==='Cutlery') catMatch=p.category==='Cutlery'||(p.productName||'').toLowerCase().includes('cutlery');
    else if(activeCat==='Household') catMatch=p.category==='Household'||p.category==='Brass'||(p.productName||'').toLowerCase().includes('household');
    else if(activeCat==='Water Bottles') catMatch=p.category==='Water Bottles'||(p.productName||'').toLowerCase().includes('bottle');
    else if(activeCat==='Appliances & Brands') catMatch=p.category==='Appliances & Brands'||p.category==='Appliances';
    else if(activeCat==='Health Utensils') catMatch=p.category==='Health Utensils'||(p.productName||'').toLowerCase().includes('health');
    else catMatch=p.category===activeCat;
    if(!catMatch)return false;
    if(searchQuery&&searchQuery.length>0){
      var q=searchQuery.toLowerCase();
      return (p.productName||'').toLowerCase().includes(q)
        ||(p.category||'').toLowerCase().includes(q)
        ||((p.aliases||[]).some(function(a){return a.toLowerCase().includes(q)}))
        ||(p.description||'').toLowerCase().includes(q)
        ||((p.brand||'').toLowerCase().includes(q));
    }
    return true;
  });
  var sort=document.getElementById('ss').value;
  if(sort==='na')list=[].concat(list).sort(function(a,b){return(a.productName||'').localeCompare(b.productName||'')});
  else if(sort==='nd')list=[].concat(list).sort(function(a,b){return(b.productName||'').localeCompare(a.productName||'')});
  else if(sort==='pa')list=[].concat(list).sort(function(a,b){return(a.price||0)-(b.price||0)});
  else if(sort==='pd')list=[].concat(list).sort(function(a,b){return(b.price||0)-(a.price||0)});
  return list;
}

function filterCat(cat){
  activeCat=cat;
  searchQuery='';
  var di=document.getElementById('deskSearchInp');
  if(di)di.value='';
  closeDeskDD();
  document.querySelectorAll('.fb').forEach(function(t){t.classList.toggle('act',t.dataset.cat===cat)});
  updateSectionHeader();
  renderProds();
  var sec=document.getElementById('products-grid-sec');
  if(sec)setTimeout(function(){sec.scrollIntoView({behavior:'smooth',block:'start'})},50);
}

function updateSectionHeader(){
  var ey=document.getElementById('prodSecEyebrow');
  var ti=document.getElementById('prodSecTitle');
  if(searchQuery){
    ey.textContent='Search Results';
    ti.innerHTML='Premium <span class="gold">Utensils</span> & Kitchenware';
  } else {
    ey.textContent='Our Collection';
    ti.innerHTML='Premium <span class="gold">Utensils</span> & Kitchenware';
  }
}

/* ── Render Products ── */
function renderProds(){
  var list=getFilteredProds();
  var g=document.getElementById('pgrid');
  updateSectionHeader();

  var isSearching = (searchQuery && searchQuery.length > 0);
  document.getElementById('hero').style.display = isSearching ? 'none' : 'flex';
  document.getElementById('about-sec').style.display = isSearching ? 'none' : 'block';
  document.getElementById('map-sec').style.display = isSearching ? 'none' : 'block';

  if(!list.length){
    if(searchQuery){
      g.innerHTML='<div class="no-results"><div class="no-results-em">🔍</div><p style="font-weight:700;margin-bottom:8px">No results for "'+eh(searchQuery)+'"</p><p style="font-size:.82rem">Try a different search or <button onclick="clearSearch()" style="background:none;border:none;color:var(--g3);font-weight:700;cursor:pointer;font-size:.82rem;text-decoration:underline">clear search</button></p></div>';
    } else {
      g.innerHTML='<div class="no-results"><div class="no-results-em">🔍</div><p>No products found in this category</p></div>';
    }
    return;
  }

  var bannerHtml='';

  g.innerHTML=bannerHtml+list.map(function(p,i){
    var em=EM[p.category]||'🪣';
    var bc=BC[p.category]||'b-al';
    var imgH=p.imageUrl
      ?'<img src="'+p.imageUrl+'" alt="'+eh(p.productName)+'" loading="lazy" onerror="this.parentNode.innerHTML=\'<div class=pcard-ph><span class=pcard-ph-em>'+em+'</span><span class=pcard-ph-lbl>'+eh(p.category||'')+'</span></div>\'">'
      :'<div class="pcard-ph"><span class="pcard-ph-em">'+em+'</span><span class="pcard-ph-lbl">'+eh(p.category||'')+'</span></div>';
    var prH=p.price>0
      ?'<div class="pcard-price"><sup>₹</sup>'+p.price.toLocaleString('en-IN')+'</div>'
      :'<div class="pcard-price req">📞 Price on Request</div>';
    var inCart=cart.find(function(c){return c.id===p.id});
    return '<div class="pcard" style="animation-delay:'+i*.04+'s">'
      +'<div class="pcard-img" onclick="openProdModal(\''+p.id+'\')">'
      +imgH
      +'<div class="pcard-img-overlay"><span>👁️ View Details</span></div>'
      +'<span class="pcat-badge '+bc+'">'+eh(p.category||'')+'</span>'
      +'</div>'
      +'<div class="pcard-body">'
      +'<div class="pcard-name">'+eh(p.productName)+'</div>'
      +'<div class="pcard-cat">'+eh(formatCategoryLabel(p))+'</div>'
      +prH
      +'<div class="pcard-actions">'
      +'<button class="btn-view" onclick="openProdModal(\''+p.id+'\')">👁️ View</button>'
      +'<button class="btn-acart'+(inCart?' added':'')+'" id="cab-'+p.id+'" onclick="quickAddCart(\''+p.id+'\')">'+(inCart?'✓ Added':'🛒 Cart')+'</button>'
      +'</div></div></div>';
  }).join('');
  initReveal();
}

function clearSearch(){
  searchQuery='';
  var di=document.getElementById('deskSearchInp');
  if(di)di.value='';
  var dClr = document.getElementById('deskSearchClear');
  if(dClr) dClr.style.display='none';
  clearMobSearch();
  closeDeskDD();
  updateSectionHeader();
  renderProds();
}

/* ── Search ── */
function liveSearch(q,src){
  searchQuery=q||'';
  if(src==='desk'){
    var dClr = document.getElementById('deskSearchClear');
    if(dClr) dClr.style.display = q.length>0?'block':'none';
    if(q.length<2){closeDeskDD();if(q.length===0){searchQuery='';renderProds();}return;}
    renderDeskDropdown(q);
  }
  renderProds();
  if(q.length>=2){
    var sec=document.getElementById('products-grid-sec');
    if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});
  }
}

function getSearchResults(q){
  if(!q||q.length<1)return[];
  q=q.toLowerCase();
  return allProducts.filter(function(p){
    return(p.productName||'').toLowerCase().includes(q)
      ||(p.category||'').toLowerCase().includes(q)
      ||((p.aliases||[]).some(function(a){return a.toLowerCase().includes(q)}))
      ||(p.description||'').toLowerCase().includes(q)
      ||((p.brand||'').toLowerCase().includes(q));
  }).slice(0,8);
}

/* Desktop dropdown — shows only product cards */
function renderDeskDropdown(q){
  var dd=document.getElementById('deskSearchDD');
  var results=getSearchResults(q);
  if(!results.length){
    dd.innerHTML='<div class="sd-empty">No products found for "'+eh(q)+'"</div>';
    dd.classList.add('open');return;
  }
  dd.innerHTML=results.slice(0,6).map(function(p){
    var e=EM[p.category]||'🪣';
    var img=p.imageUrl
      ?'<div class="sd-item-img"><img src="'+p.imageUrl+'" alt="'+eh(p.productName)+'"></div>'
      :'<div class="sd-item-img">'+e+'</div>';
    return '<div class="sd-item" onclick="pickSearchResult(\''+p.id+'\')">'+img+'<div><div class="sd-item-name">'+eh(p.productName)+'</div><div class="sd-item-cat">'+eh(formatCategoryLabel(p))+'</div></div></div>';
  }).join('')
  +'<div class="sd-see-all" onclick="closeDeskDD()">See all '+results.length+' results below ↓</div>';
  dd.classList.add('open');
}

function pickSearchResult(id){
  closeDeskDD();
  var mdd=document.getElementById('mobSearchDD');
  if(mdd){mdd.classList.remove('open');mdd.innerHTML='';}
  var p=allProducts.find(function(x){return x.id===id});
  if(p){
    searchQuery=p.productName;
    var di=document.getElementById('deskSearchInp');
    if(di) di.value=p.productName;
    var dClr = document.getElementById('deskSearchClear');
    if(dClr) dClr.style.display='block';
    var mi=document.getElementById('mobSearchInpSticky');
    if(mi) mi.value=p.productName;
    var mClr = document.getElementById('mobSearchClear');
    if(mClr) mClr.style.display='block';
    renderProds();
    var sec=document.getElementById('products-grid-sec');
    if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});
  }
}
function closeDeskDD(){var dd=document.getElementById('deskSearchDD');if(dd){dd.classList.remove('open');dd.innerHTML=''}}

/* Mobile search results — products only */
function renderMobSearchResults(results,q){
  var panel=document.getElementById('mobSearchResults');
  var area=document.getElementById('mobLinksArea');
  if(!results||!results.length){
    panel.classList.remove('show');panel.innerHTML='';
    area.style.display='';return;
  }
  area.style.display='none';
  panel.classList.add('show');
  panel.innerHTML='<div style="padding:10px 18px 4px;font-size:.72rem;font-weight:700;color:var(--text-light);text-transform:uppercase;letter-spacing:.08em">'+results.length+' products found</div>'
    +results.map(function(p){
      var e=EM[p.category]||'🪣';
      var img=p.imageUrl
        ?'<div class="sd-item-img"><img src="'+p.imageUrl+'" alt="'+eh(p.productName)+'"></div>'
        :'<div class="sd-item-img" style="font-size:1.4rem">'+e+'</div>';
      return '<div class="sd-item" style="padding:12px 18px" onclick="mobPickResult(\''+p.id+'\')">'+img
        +'<div style="flex:1;min-width:0"><div class="sd-item-name">'+eh(p.productName)+'</div><div class="sd-item-cat">'+eh(formatCategoryLabel(p))+'</div></div>'
        +'<span style="font-size:.72rem;color:var(--g3);font-weight:700;flex-shrink:0">View →</span></div>';
    }).join('')
    +'<div class="sd-see-all" onclick="mobSeeAll()" style="margin:0">See all in collection →</div>';
}

function mobDoSearch(){
  var q=document.getElementById('mobSearchInp').value;
  if(!q)return;
  toggleMob();
  setTimeout(function(){
    var sec=document.getElementById('products-grid-sec');
    if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});
  },400);
}
function mobPickResult(id){
  var p=allProducts.find(function(x){return x.id===id});
  if(p){
    searchQuery=p.productName;
    var di=document.getElementById('deskSearchInp');
    if(di) di.value=p.productName;
    var dClr = document.getElementById('deskSearchClear');
    if(dClr) dClr.style.display='block';
    var mi=document.getElementById('mobSearchInpSticky');
    if(mi) mi.value=p.productName;
    var mClr = document.getElementById('mobSearchClear');
    if(mClr) mClr.style.display='block';
    renderProds();
    toggleMob();
    setTimeout(function(){
      var sec=document.getElementById('products-grid-sec');
      if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});
    },400);
  }
}
function mobSeeAll(){
  toggleMob();
  setTimeout(function(){
    var sec=document.getElementById('products-grid-sec');
    if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});
  },400);
}
function clearMobSearch(){
  var mobInp = document.getElementById('mobSearchInpSticky');
  if(mobInp) mobInp.value='';
  var mobClr = document.getElementById('mobSearchClear');
  if(mobClr) mobClr.style.display='none';
  var dd = document.getElementById('mobSearchDD');
  if(dd){dd.classList.remove('open');dd.innerHTML='';}
  searchQuery='';
  renderProds();
}

function mobStickySearch(q){
  searchQuery=q||'';
  var clr=document.getElementById('mobSearchClear');
  if(clr)clr.style.display=q.length>0?'block':'none';
  if(q.length<2){
    var dd=document.getElementById('mobSearchDD');
    if(dd){dd.classList.remove('open');dd.innerHTML='';}
    if(q.length===0){searchQuery='';renderProds();}
    return;
  }
  var dd=document.getElementById('mobSearchDD');
  if(!dd) return;
  var results=getSearchResults(q);
  if(!results.length){
    dd.innerHTML='<div class="sd-empty">No products found for "'+eh(q)+'"</div>';
    dd.classList.add('open');
  } else {
    dd.innerHTML=results.slice(0,6).map(function(p){
      var e=EM[p.category]||'🪣';
      var img=p.imageUrl
        ?'<div class="sd-item-img"><img src="'+p.imageUrl+'" alt="'+eh(p.productName)+'"></div>'
        :'<div class="sd-item-img">'+e+'</div>';
      return '<div class="sd-item" onclick="pickSearchResult(\''+p.id+'\')">'+img+'<div><div class="sd-item-name">'+eh(p.productName)+'</div><div class="sd-item-cat">'+eh(formatCategoryLabel(p))+'</div></div></div>';
    }).join('')+'<div class="sd-see-all" onclick="document.getElementById(\'mobSearchDD\').classList.remove(\'open\')">See all results below ↓</div>';
    dd.classList.add('open');
  }
  renderProds();
}

function handleSearchKey(e,src){
  if(e.key==='Enter'){
    closeDeskDD();
    if(src==='mob'){mobDoSearch();}
    else{var sec=document.getElementById('products-grid-sec');if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});}
  }
  if(e.key==='Escape')closeDeskDD();
}
function triggerSearchAll(src){
  if(src==='desk'){
    closeDeskDD();
    var sec=document.getElementById('products-grid-sec');
    if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});
  }
}

document.addEventListener('click',function(e){
  var ds=document.getElementById('deskSearch');
  if(ds&&!ds.contains(e.target))closeDeskDD();
  
  var isDropBtn = e.target.closest('.drop-wrap > .nl, .drop-wrap > button.nl');
  var isFlyoutBtn = e.target.closest('.has-flyout > .di');
  
  if(isDropBtn){
    e.preventDefault();
    var wrap = isDropBtn.closest('.drop-wrap');
    var wasOpen = wrap.classList.contains('open');
    document.querySelectorAll('.drop-wrap.open').forEach(function(w){w.classList.remove('open')});
    if(!wasOpen) wrap.classList.add('open');
  } else if (isFlyoutBtn) {
    e.preventDefault();
    var fly = isFlyoutBtn.closest('.has-flyout');
    var wasOpen = fly.classList.contains('open');
    document.querySelectorAll('.has-flyout.open').forEach(function(w){w.classList.remove('open')});
    if(!wasOpen) fly.classList.add('open');
  } else {
    if(!e.target.closest('.simple-dd, .mega-dd')) {
      document.querySelectorAll('.drop-wrap.open, .has-flyout.open').forEach(function(w){w.classList.remove('open')});
    }
  }
});

/* ── Lightbox ── */
function openLightbox(src,name){
  document.getElementById('lightboxImg').src=src;
  document.getElementById('lightboxCaption').textContent=name||'';
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}

/* ── Product Modal ── */
function openProdModal(id){
  var p=allProducts.find(function(x){return x.id===id});
  if(!p)return;
  modalProdId=id;modalQty=1;
  var em=EM[p.category]||'🪣';
  var bc=BC[p.category]||'b-al';
  var imgH,hasImg=!!p.imageUrl;
  if(hasImg){
    imgH='<img src="'+p.imageUrl+'" alt="'+eh(p.productName)+'" style="width:100%;height:100%;object-fit:cover">'
       +'<div class="modal-img-zoom-hint">🔍 Click to enlarge</div>';
  } else {
    imgH='<div class="modal-img-ph"><span style="font-size:5rem">'+em+'</span><span style="font-size:.8rem;color:var(--text-light)">'+eh(p.category||'')+'</span></div>';
  }
  var prH=p.price>0?'<div class="modal-price">₹'+p.price.toLocaleString('en-IN')+'</div>':'<div class="modal-price req">📞 Price on Request — Call for Quote</div>';
  var waMsg='Vanakkam%20Sri%20Balaji%20Aluminium%20%F0%9F%99%8F%0AInterested%20in%3A%20'+encodeURIComponent(p.productName);
  var clickFn=hasImg?'openLightbox(\''+p.imageUrl.replace(/'/g,"\\'")+'\',"'+eh(p.productName)+'")':'';
  document.getElementById('modalBody').innerHTML=
    '<div class="modal-img-wrap" '+(hasImg?'onclick="'+clickFn+'"':'')+'>'+imgH+'</div>'
    +'<div class="modal-info">'
    +'<span class="modal-cat-badge '+bc+'">'+eh(formatCategoryLabel(p))+'</span>'
    +'<div class="modal-name">'+eh(p.productName)+'</div>'
    +prH
    +(p.description?'<div class="modal-desc">'+eh(p.description)+'</div>':'')
    +'<div class="modal-qty"><span class="modal-qty-lbl">Qty</span><div class="qty-ctrl"><button class="qty-b" onclick="mQty(-1)">−</button><span class="qty-n" id="mQtyN">1</span><button class="qty-b" onclick="mQty(1)">+</button></div></div>'
    +'<div class="modal-btns">'
    +'<button class="btn-acart-lg" onclick="addFromModal(\''+id+'\')">🛒 Add</button>'
    +'<a href="https://wa.me/'+WA+'?text='+waMsg+'" target="_blank" class="btn-wa-lg"><svg viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em" style="transform:translateY(1px)"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg> WhatsApp</a>'
    +'<a href="tel:+919443274173" class="btn-call-lg">📞 Call</a>'
    +'</div></div>';
  document.getElementById('prodModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeProdModal(){document.getElementById('prodModal').classList.remove('open');document.body.style.overflow=''}
function closeModalBg(e){if(e.target===document.getElementById('prodModal'))closeProdModal()}
function mQty(d){modalQty=Math.max(1,modalQty+d);document.getElementById('mQtyN').textContent=modalQty}

function addFromModal(id){
  var p=allProducts.find(function(x){return x.id===id});if(!p)return;
  var existing=cart.find(function(c){return c.id===id});
  if(existing)existing.qty+=modalQty;
  else cart.push({id:id,name:p.productName,price:p.price||0,image:p.imageUrl||'',category:p.category||'',qty:modalQty});
  saveCart();
  var btn=document.querySelector('.btn-acart-lg');
  if(btn){btn.textContent='✓ Added to Cart!';btn.style.background='linear-gradient(135deg,#16a34a,#22c55e)'}
  var cb=document.getElementById('cab-'+id);
  if(cb){cb.textContent='✓ Added';cb.classList.add('added')}
  showToast('🛒 '+p.productName.slice(0,30)+(p.productName.length>30?'…':'')+' × '+modalQty+' added!');
}
function quickAddCart(id){
  var p=allProducts.find(function(x){return x.id===id});if(!p)return;
  var existing=cart.find(function(c){return c.id===id});
  if(existing)existing.qty++;
  else cart.push({id:id,name:p.productName,price:p.price||0,image:p.imageUrl||'',category:p.category||'',qty:1});
  saveCart();
  var cb=document.getElementById('cab-'+id);
  if(cb){cb.textContent='✓ Added';cb.classList.add('added')}
  showToast('🛒 '+p.productName.slice(0,28)+(p.productName.length>28?'…':'')+' added!');
}

/* ── Cart ── */
function saveCart(){localStorage.setItem('sba_v5',JSON.stringify(cart));updateBadge()}
function updateBadge(){
  var t=cart.reduce(function(s,i){return s+i.qty},0);
  var b=document.getElementById('cbadge');
  b.textContent=t;
  t>0?b.classList.add('show'):b.classList.remove('show');
}
function openCart(){renderCart();document.getElementById('cartPanel').classList.add('open');document.getElementById('cartOv').classList.add('open');document.body.style.overflow='hidden'}
function closeCart(){document.getElementById('cartPanel').classList.remove('open');document.getElementById('cartOv').classList.remove('open');document.body.style.overflow=''}
function cqCart(id,d){
  var item=cart.find(function(c){return c.id===id});if(!item)return;
  item.qty+=d;
  if(item.qty<=0){
    cart=cart.filter(function(c){return c.id!==id});
    var cb=document.getElementById('cab-'+id);
    if(cb){cb.textContent='🛒 Cart';cb.classList.remove('added')}
  }
  saveCart();renderCart();
}
function removeFromCart(id){
  cart=cart.filter(function(c){return c.id!==id});
  saveCart();renderCart();
  var cb=document.getElementById('cab-'+id);
  if(cb){cb.textContent='🛒 Cart';cb.classList.remove('added')}
}
function clearCart(){
  cart=[];
  saveCart();renderCart();
  document.querySelectorAll('.btn-acart').forEach(function(cb){
    cb.textContent='🛒 Cart';cb.classList.remove('added');
  });
}
function renderCart(){
  var c=document.getElementById('cpItems'),f=document.getElementById('cpFoot');
  if(!cart.length){
    c.innerHTML='<div class="cp-empty"><div class="cp-empty-icon">🛒</div><p style="font-weight:700;color:var(--text-mid)">Cart is empty</p><p style="font-size:.76rem;margin-top:4px">Browse and add items</p></div>';
    f.style.display='none';return;
  }
  f.style.display='block';
  c.innerHTML=cart.map(function(item){
    var e=EM[item.category]||'🪣';
    var ph=item.image
      ?'<div class="ci-ph"><img src="'+item.image+'" alt="'+eh(item.name)+'" onerror="this.outerHTML=\'<span style=font-size:1.3rem>'+e+'</span>\'"></div>'
      :'<div class="ci-ph"><span style="font-size:1.3rem">'+e+'</span></div>';
    var pr=item.price>0?'₹'+(item.price*item.qty).toLocaleString('en-IN'):'Qty: '+item.qty;
    return'<div class="ci">'+ph+'<div class="ci-info"><div class="ci-name">'+eh(item.name)+'</div><div class="ci-price">'+pr+'</div></div>'
      +'<div class="ci-qty"><button class="cqb" onclick="cqCart(\''+item.id+'\',-1)">−</button><span class="cqn">'+item.qty+'</span><button class="cqb" onclick="cqCart(\''+item.id+'\',1)">+</button></div>'
      +'<button class="ci-del" onclick="removeFromCart(\''+item.id+'\')">🗑</button></div>';
  }).join('');
  var total=cart.reduce(function(s,i){return s+(i.price*i.qty)},0);
  var qty=cart.reduce(function(s,i){return s+i.qty},0);
  document.getElementById('cpTotal').textContent=total>0?'₹'+total.toLocaleString('en-IN'):'—';
  document.getElementById('cpSub').textContent=qty+' item'+(qty>1?'s':'')+' in cart';
}
function checkoutWA(){
  if(!cart.length)return;
  var msg='Vanakkam Sri Balaji Aluminium 🙏\n\nMy Order:\n';
  cart.forEach(function(item,i){msg+=(i+1)+'. '+item.name+' – Qty: '+item.qty+(item.price>0?' (₹'+(item.price*item.qty).toLocaleString('en-IN')+')':'')+'\n'});
  var total=cart.reduce(function(s,i){return s+(i.price*i.qty)},0);
  msg+='\nTotal Items: '+cart.reduce(function(s,i){return s+i.qty},0);
  if(total>0)msg+='\nEstimated Total: ₹'+total.toLocaleString('en-IN');
  msg+='\n\nPlease confirm availability. Thank you! 😊';
  window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank');
}

function handleWAClick(e, defaultUrl){
  if(cart.length > 0) {
    if(e) e.preventDefault();
    checkoutWA();
  } else if(defaultUrl && (!e || e.target.tagName !== 'A')) {
    if(e) e.preventDefault();
    window.open(defaultUrl, '_blank');
  }
}

function showToast(msg){
  var t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show')},2800);
}

document.addEventListener('DOMContentLoaded',function(){
  updateBadge();
  initHeroSlides();
  loadProducts();
  initReveal();
});
