(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();function h(){const o=(JSON.parse(localStorage.getItem("cart"))||[]).reduce((a,e)=>a+e.quantity,0),s=document.querySelector(".header__cart-count");s&&(s.textContent=o,s.style.display=o>0?"flex":"none")}function S(r){let o=JSON.parse(localStorage.getItem("cart"))||[];const s=o.findIndex(a=>a.id===r.id);s>=0?o[s].quantity+=r.quantity:o.push(r),localStorage.setItem("cart",JSON.stringify(o)),h()}document.addEventListener("DOMContentLoaded",()=>{h();const r=document.querySelector(".header__burger"),o=document.querySelector(".header__mobile-nav"),s=document.querySelector(".header__mobile-nav-list");function a(){r.setAttribute("aria-expanded","true"),r.classList.add("active"),o.classList.add("active"),s.classList.add("active"),document.body.style.overflow="hidden"}function e(){r.setAttribute("aria-expanded","false"),r.classList.remove("active"),o.classList.remove("active"),s.classList.remove("active"),document.body.style.overflow=""}r.addEventListener("click",()=>{r.getAttribute("aria-expanded")==="true"?e():a()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&e()})});document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("search-modal"),o=document.getElementById("search-modal-input"),s=document.getElementById("search-modal-form"),a=document.getElementById("search-modal-close"),e=document.getElementById("popular-products"),n=document.getElementById("search-suggestions");let d=[],l=[];const g=async()=>{try{d=await(await fetch(u()+"/products.json")).json(),l=d.filter(i=>i.popular),y()}catch(t){console.error("Error loading products:",t)}},u=()=>window.location.pathname.includes("/product/")?"../":"./",y=()=>{l.length&&(e.innerHTML=l.map(t=>`
      <a href="${u()}${t.url}" class="search-modal__popular-item" tabindex="0">
        ${t.name}
      </a>
    `).join(""))},v=()=>{r.removeAttribute("aria-hidden"),r.removeAttribute("inert"),r.setAttribute("aria-modal","true"),document.body.style.overflow="hidden",o.focus()},f=()=>{r.setAttribute("inert",""),r.setAttribute("aria-modal","false"),document.body.style.overflow="",o.value="",n.innerHTML=""},p=t=>{if(!t.trim()){n.innerHTML="";return}const i=d.filter(c=>c.name.toLowerCase().includes(t.toLowerCase()));i.length?n.innerHTML=i.map(c=>`
        <a href="${u()}${c.url}" class="search-suggestion" tabindex="0">
          ${b(c.name,t)}
        </a>
      `).join(""):n.innerHTML=`
        <div class="search-suggestion search-suggestion--empty">
          No products found
        </div>
      `},b=(t,i)=>{const c=new RegExp(i,"gi");return t.replace(c,m=>`<strong>${m}</strong>`)},L=((t,i)=>{let c;return(...m)=>{clearTimeout(c),c=setTimeout(()=>t.apply(void 0,m),i)}})(p,300);document.querySelectorAll(".header__search, .header__search-input, #header-search-button").forEach(t=>{t.addEventListener("click",v)}),o.addEventListener("input",t=>{L(t.target.value)}),s.addEventListener("submit",t=>{t.preventDefault(),o.value.trim()&&p(o.value.trim())}),a.addEventListener("click",f),document.addEventListener("keydown",t=>{t.key==="Escape"&&r.getAttribute("aria-hidden")==="false"&&f()}),g()});console.log(`
 █████╗ ██╗     ██╗     ███████╗██╗   ██╗ █████╗ ██╗     ██╗ ██████╗ ███╗   ██╗
██╔══██╗██║     ██║     ██╔════╝██║   ██║██╔══██╗██║     ██║██╔═══██╗████╗  ██║
███████║██║     ██║     █████╗  ██║   ██║███████║██║     ██║██║   ██║██╔██╗ ██║
██╔══██║██║     ██║     ██╔══╝  ╚██╗ ██╔╝██╔══██║██║     ██║██║   ██║██║╚██╗██║
██║  ██║███████╗███████╗███████╗ ╚████╔╝ ██║  ██║███████╗██║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝

https://github.com/allevalion/Fold
`);export{S as a,h as u};
