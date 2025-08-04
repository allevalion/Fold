import{u as f}from"./header-BNmznXph.js";/* empty css                   */import{s as q}from"./notifications-Cp4frmnl.js";f();document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("cart-items"),_=document.getElementById("subtotal"),y=document.getElementById("discount"),$=document.getElementById("tax"),I=document.getElementById("total"),i=document.getElementById("promo-code"),h=document.querySelector(".promo-code__button"),E=document.getElementById("checkout-button"),l=document.getElementById("favorites-items");let n=JSON.parse(localStorage.getItem("cart"))||[],m=localStorage.getItem("promoCode")||"",u=0;const r=()=>{if(c.innerHTML="",n.length===0){c.innerHTML="<p>Your cart is empty</p>";return}n.forEach((t,e)=>{const a=document.createElement("div");a.className="cart-item";const o=t.quantity>3?.1:0,s=t.price*(1-o);a.innerHTML=`
        <img src="${t.image}" alt="${t.name}" class="cart-item__image">
        <div class="cart-item__info">
          <h3 class="cart-item__title">${t.name}</h3>
          <p class="cart-item__description">${t.description}</p>
          <span class="cart-item__category">${t.category}</span>
          ${o>0?'<span class="cart-item__discount">10% discount applied</span>':""}
        </div>
        <div class="cart-item__controls">
          <span class="cart-item__price">$${(s*t.quantity).toFixed(2)}</span>
          <div class="quantity-controls">
            <button class="quantity-button" data-index="${e}" data-action="decrease">-</button>
            <input type="number" class="quantity-input" value="${t.quantity}" min="1" max="99" data-index="${e}">
            <button class="quantity-button" data-index="${e}" data-action="increase">+</button>
          </div>
          <button class="cart-item__remove" data-index="${e}">Remove</button>
        </div>
      `,c.appendChild(a)}),C()},g=()=>{l.innerHTML="";const t=JSON.parse(localStorage.getItem("favorites"))||[],e=JSON.parse(localStorage.getItem("cart"))||[];if(t.length===0){l.innerHTML="<p>Your favorites list is empty</p>";return}t.forEach((a,o)=>{const s=document.createElement("div");s.className="favorite-item";const d=e.some(v=>v.id===a.id);s.innerHTML=`
        <img src="${a.image}" alt="${a.name}" class="favorite-item__image">
        <div class="favorite-item__info">
          <h3 class="favorite-item__title">${a.name}</h3>
          <p class="favorite-item__description">${a.description}</p>
          <span class="favorite-item__category">${a.category}</span>
          <span class="favorite-item__price">$${a.price.toFixed(2)}</span>
          ${d?'<span class="favorite-item__in-cart">(In cart)</span>':""}
        </div>
        <div class="favorite-item__actions">
          <button class="button favorite-item__visit" data-index="${o}" onclick="location.href='./product/${a.name.replace(/^the\s+/i,"").toLowerCase().replace(/\s+/g,"-")}.html'">Visit Page</button>
          <button class="favorite-item__remove" data-index="${o}">Remove</button>
        </div>
      `,l.appendChild(s)})},C=()=>{const t=n.reduce((s,d)=>{const v=d.quantity>3?.1:0;return s+d.price*d.quantity*(1-v)},0),e=t*u,a=(t-e)*.07,o=t-e+a;_.textContent=`$${t.toFixed(2)}`,y.textContent=`-$${e.toFixed(2)}`,$.textContent=`$${a.toFixed(2)}`,I.textContent=`$${o.toFixed(2)}`,localStorage.setItem("cart",JSON.stringify(n))},b=(t,e)=>{e==="increase"?n[t].quantity+=1:e==="decrease"&&n[t].quantity>1&&(n[t].quantity-=1),r()},x=(t,e)=>{const a=parseInt(e,10);!isNaN(a)&&a>=1&&a<=99&&(n[t].quantity=a,r())},L=t=>{n.splice(t,1),localStorage.setItem("cart",JSON.stringify(n)),r(),f()},p=()=>{const t=i.value.trim();t==="FLY10"?(u=.1,m=t,localStorage.setItem("promoCode",t),r()):(u=0,i.value="",i.placeholder="Invalid code",q("Invalid code!"),setTimeout(()=>{i.placeholder="Enter promo code"},2e3))},S=t=>{let e=JSON.parse(localStorage.getItem("favorites"))||[];t>=0&&t<e.length&&(e.splice(t,1),localStorage.setItem("favorites",JSON.stringify(e))),g()};c.addEventListener("click",t=>{if(t.target.classList.contains("quantity-button")){const e=parseInt(t.target.dataset.index,10),a=t.target.dataset.action;b(e,a)}else if(t.target.classList.contains("cart-item__remove")){const e=parseInt(t.target.dataset.index,10);L(e)}}),c.addEventListener("change",t=>{if(t.target.classList.contains("quantity-input")){const e=parseInt(t.target.dataset.index,10);x(e,t.target.value)}}),h.addEventListener("click",p),i.addEventListener("keypress",t=>{t.key==="Enter"&&p()}),E.addEventListener("click",()=>{window.location.href="checkout.html"}),l.addEventListener("click",t=>{if(t.target.classList.contains("favorite-item__remove")){const e=parseInt(t.target.dataset.index,10);S(e)}}),m&&(i.value=m,p()),g(),r()});
