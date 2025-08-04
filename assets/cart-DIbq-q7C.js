import{u as I}from"./header-Bhw5Jc_z.js";/* empty css                   */import{s as y}from"./notifications-Cp4frmnl.js";import{i as F}from"./floatingButton-Dc_GnVWf.js";I();document.addEventListener("DOMContentLoaded",()=>{const d=document.getElementById("cart-items"),h=document.getElementById("subtotal"),$=document.getElementById("discount"),E=document.getElementById("tax"),C=document.getElementById("total"),s=document.getElementById("promo-code"),b=document.getElementById("add-promo"),m=document.getElementById("remove-promo"),L=document.getElementById("checkout-button"),u=document.getElementById("favorites-items");F({mainButtonSelector:"#checkout-button",floatingButtonClass:"floating-button",onClick:()=>{window.location.href="checkout.html"}}),L.addEventListener("click",()=>{window.location.href="checkout.html"});let a=JSON.parse(localStorage.getItem("cart"))||[],p=localStorage.getItem("promoCode")||"",v=0;const c=()=>{if(d.innerHTML="",a.length===0){d.innerHTML="<p>Your cart is empty</p>";return}a.forEach((t,e)=>{const o=document.createElement("div");o.className="cart-item";const n=t.quantity>3?.1:0,i=t.price*(1-n);o.innerHTML=`
      <img src="${t.image}" alt="${t.name}" class="cart-item__image">
      <div class="cart-item__info">
        <h3 class="cart-item__title">${t.name}</h3>
        <p class="cart-item__description">${t.description}</p>
        <span class="cart-item__category">${t.category}</span>
        ${n>0?'<span class="cart-item__discount">10% discount applied</span>':""}
      </div>
      <div class="cart-item__controls">
        <span class="cart-item__price">$${(i*t.quantity).toFixed(2)}</span>
        <div class="quantity-controls">
          <button class="quantity-button" data-index="${e}" data-action="decrease">-</button>
          <input type="number" class="quantity-input" value="${t.quantity}" min="1" max="99" data-index="${e}">
          <button class="quantity-button" data-index="${e}" data-action="increase">+</button>
        </div>
        <button class="cart-item__remove" data-index="${e}">Remove</button>
      </div>
    `,d.appendChild(o)}),x()},_=()=>{u.innerHTML="";const t=JSON.parse(localStorage.getItem("favorites"))||[],e=JSON.parse(localStorage.getItem("cart"))||[];if(t.length===0){u.innerHTML="<p>Your favorites list is empty</p>";return}t.forEach((o,n)=>{const i=document.createElement("div");i.className="favorite-item";const f=e.some(r=>r.id===o.id);i.innerHTML=`
        <img src="${o.image}" alt="${o.name}" class="favorite-item__image">
        <div class="favorite-item__info">
          <h3 class="favorite-item__title">${o.name}</h3>
          <p class="favorite-item__description">${o.description}</p>
          <span class="favorite-item__category">${o.category}</span>
          <span class="favorite-item__price">$${o.price.toFixed(2)}</span>
          ${f?'<span class="favorite-item__in-cart">(In cart)</span>':""}
        </div>
        <div class="favorite-item__actions">
          <button class="button favorite-item__visit" data-index="${n}" onclick="location.href='./product/${o.name.replace(/^the\s+/i,"").toLowerCase().replace(/\s+/g,"-")}.html'">Visit Page</button>
          <button class="favorite-item__remove" data-index="${n}">Remove</button>
        </div>
      `,u.appendChild(i)})},x=()=>{const t=a.reduce((r,l)=>l.quantity>3?r+l.price*l.quantity*.1:r,0),e=a.reduce((r,l)=>r+l.price*l.quantity,0),o=e*v,n=t+o,i=(e-n)*.07,f=e-n+i;h.textContent=`$${e.toFixed(2)}`,$.textContent=`-$${n.toFixed(2)}`,E.textContent=`$${i.toFixed(2)}`,C.textContent=`$${f.toFixed(2)}`,localStorage.setItem("cart",JSON.stringify(a))},S=(t,e)=>{e==="increase"?a[t].quantity+=1:e==="decrease"&&a[t].quantity>1&&(a[t].quantity-=1),c()},q=(t,e)=>{const o=parseInt(e,10);!isNaN(o)&&o>=1&&o<=99&&(a[t].quantity=o,c())},k=t=>{a.splice(t,1),localStorage.setItem("cart",JSON.stringify(a)),c(),I()},B=()=>{v=0,p="",s.value="",localStorage.removeItem("promoCode"),c(),m.style.display="none",y("Promo code removed!")},g=()=>{const t=s.value.trim();t==="FLY10"?(v=.1,p=t,localStorage.setItem("promoCode",t),c(),m.style.display="block",y("Promo code applied!")):(v=0,s.value="",s.placeholder="Invalid code",y("Invalid code!"),setTimeout(()=>{s.placeholder="Enter promo code"},2e3))};m.addEventListener("click",B);const N=t=>{let e=JSON.parse(localStorage.getItem("favorites"))||[];t>=0&&t<e.length&&(e.splice(t,1),localStorage.setItem("favorites",JSON.stringify(e))),_()};d.addEventListener("click",t=>{if(t.target.classList.contains("quantity-button")){const e=parseInt(t.target.dataset.index,10),o=t.target.dataset.action;S(e,o)}else if(t.target.classList.contains("cart-item__remove")){const e=parseInt(t.target.dataset.index,10);k(e)}}),d.addEventListener("change",t=>{if(t.target.classList.contains("quantity-input")){const e=parseInt(t.target.dataset.index,10);q(e,t.target.value)}}),b.addEventListener("click",g),s.addEventListener("keypress",t=>{t.key==="Enter"&&g()}),u.addEventListener("click",t=>{if(t.target.classList.contains("favorite-item__remove")){const e=parseInt(t.target.dataset.index,10);N(e)}}),p&&(s.value=p,g(),m.style.display="block"),_(),c()});
