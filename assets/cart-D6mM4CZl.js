import{u as h}from"./header-DPdgbyRo.js";/* empty css                   */import{s as f}from"./notifications-Cp4frmnl.js";import{i as F}from"./floatingButton-BUkTu4AU.js";h();document.addEventListener("DOMContentLoaded",()=>{const d=document.getElementById("cart-items"),$=document.getElementById("subtotal"),I=document.getElementById("discount"),E=document.getElementById("tax"),b=document.getElementById("total"),s=document.getElementById("promo-code"),C=document.getElementById("add-promo"),m=document.getElementById("remove-promo"),q=document.getElementById("checkout-button"),u=document.getElementById("favorites-items");F({mainButtonSelector:"#checkout-button",floatingButtonClass:"floating-button",onClick:()=>{window.location.href="checkout.html"}}),q.addEventListener("click",()=>{window.location.href="checkout.html"});let o=JSON.parse(localStorage.getItem("cart"))||[],p=localStorage.getItem("promoCode")||"",v=0;const c=()=>{if(d.innerHTML="",o.length===0){d.innerHTML="<p>Your cart is empty</p>";return}o.forEach((t,e)=>{const a=document.createElement("div");a.className="cart-item";const n=t.quantity>3?.1:0,i=t.price*(1-n);a.innerHTML=`
      <img src="${t.image}" alt="${t.name}" height="180px" width="180px" loading="lazy" class="cart-item__image">
      <div class="cart-item__info">
        <h2 class="cart-item__title">${t.name}</h2>
        <p class="cart-item__description">${t.description}</p>
        <span class="cart-item__category">${t.category}</span>
        ${n>0?'<span class="cart-item__discount">10% discount applied</span>':""}
      </div>
      <div class="cart-item__controls">
        <span class="cart-item__price">$${(i*t.quantity).toFixed(2)}</span>
        <div class="quantity-controls">
          <label for="quantity-${e}" class="visually-hidden">Quantity for ${t.name}</label>
          <button class="quantity-button" data-index="${e}" data-action="decrease" aria-label="Decrease quantity">-</button>
          <input id="quantity-${e}" type="number" class="quantity-input" value="${t.quantity}" min="1" max="99" data-index="${e}">
          <button class="quantity-button" data-index="${e}" data-action="increase" aria-label="Increase quantity">+</button>
        </div>
        <button class="cart-item__remove" data-index="${e}">Remove</button>
      </div>
    `,d.appendChild(a)}),L()},_=()=>{u.innerHTML="";const t=JSON.parse(localStorage.getItem("favorites"))||[],e=JSON.parse(localStorage.getItem("cart"))||[];if(t.length===0){u.innerHTML="<p>Your favorites list is empty</p>";return}t.forEach((a,n)=>{const i=document.createElement("div");i.className="favorite-item";const y=e.some(r=>r.id===a.id);i.innerHTML=`
        <img src="${a.image}" alt="${a.name}" class="favorite-item__image">
        <div class="favorite-item__info">
          <h3 class="favorite-item__title">${a.name}</h3>
          <p class="favorite-item__description">${a.description}</p>
          <span class="favorite-item__category">${a.category}</span>
          <span class="favorite-item__price">$${a.price.toFixed(2)}</span>
          ${y?'<span class="favorite-item__in-cart">(In cart)</span>':""}
        </div>
        <div class="favorite-item__actions">
          <button class="button favorite-item__visit" data-index="${n}" onclick="location.href='./product/${a.name.replace(/^the\s+/i,"").toLowerCase().replace(/\s+/g,"-")}.html'">Visit Page</button>
          <button class="favorite-item__remove" data-index="${n}">Remove</button>
        </div>
      `,u.appendChild(i)})},L=()=>{const t=o.reduce((r,l)=>l.quantity>3?r+l.price*l.quantity*.1:r,0),e=o.reduce((r,l)=>r+l.price*l.quantity,0),a=e*v,n=t+a,i=(e-n)*.07,y=e-n+i;$.textContent=`$${e.toFixed(2)}`,I.textContent=`-$${n.toFixed(2)}`,E.textContent=`$${i.toFixed(2)}`,b.textContent=`$${y.toFixed(2)}`,localStorage.setItem("cart",JSON.stringify(o))},x=(t,e)=>{e==="increase"?o[t].quantity+=1:e==="decrease"&&o[t].quantity>1&&(o[t].quantity-=1),c()},S=(t,e)=>{const a=parseInt(e,10);!isNaN(a)&&a>=1&&a<=99&&(o[t].quantity=a,c())},k=t=>{o.splice(t,1),localStorage.setItem("cart",JSON.stringify(o)),c(),h()},B=()=>{v=0,p="",s.value="",localStorage.removeItem("promoCode"),c(),m.style.display="none",f("Promo code removed!")},g=()=>{const t=s.value.trim();t==="FLY10"?(v=.1,p=t,localStorage.setItem("promoCode",t),c(),m.style.display="block",f("Promo code applied!")):(v=0,s.value="",s.placeholder="Invalid code",f("Invalid code!"),setTimeout(()=>{s.placeholder="Enter promo code"},2e3))};m.addEventListener("click",B);const N=t=>{let e=JSON.parse(localStorage.getItem("favorites"))||[];t>=0&&t<e.length&&(e.splice(t,1),localStorage.setItem("favorites",JSON.stringify(e))),_()};d.addEventListener("click",t=>{if(t.target.classList.contains("quantity-button")){const e=parseInt(t.target.dataset.index,10),a=t.target.dataset.action;x(e,a)}else if(t.target.classList.contains("cart-item__remove")){const e=parseInt(t.target.dataset.index,10);k(e)}}),d.addEventListener("change",t=>{if(t.target.classList.contains("quantity-input")){const e=parseInt(t.target.dataset.index,10);S(e,t.target.value)}}),C.addEventListener("click",g),s.addEventListener("keypress",t=>{t.key==="Enter"&&g()}),u.addEventListener("click",t=>{if(t.target.classList.contains("favorite-item__remove")){const e=parseInt(t.target.dataset.index,10);N(e)}}),p&&(s.value=p,g(),m.style.display="block"),_(),c()});
