function t(){}const n=t=>t;function e(t,n){for(const e in n)t[e]=n[e];return t}function o(t){return t()}function r(){return Object.create(null)}function s(t){t.forEach(o)}function u(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function i(t,n,e){if(t){const o=a(t,n,e);return t[0](o)}}function a(t,n,o){return t[1]?e({},e(n.$$scope.ctx,t[1](o?o(n):{}))):n.$$scope.ctx}function f(t,n,o,r){return t[1]?e({},e(n.$$scope.changed||{},t[1](r?r(o):{}))):n.$$scope.changed||{}}function l(t){const n={};for(const e in t)"$"!==e[0]&&(n[e]=t[e]);return n}const d="undefined"!=typeof window;let p=d?()=>window.performance.now():()=>Date.now(),$=d?t=>requestAnimationFrame(t):t;const m=new Set;let h,g=!1;function y(){m.forEach(t=>{t[0](p())||(m.delete(t),t[1]())}),(g=m.size>0)&&$(y)}function b(t,n){t.appendChild(n)}function w(t,n,e){t.insertBefore(n,e||null)}function _(t){t.parentNode.removeChild(t)}function x(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function v(t){return document.createElement(t)}function E(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function A(t){return document.createTextNode(t)}function C(){return A(" ")}function k(){return A("")}function N(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function j(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function O(t){return Array.from(t.childNodes)}function P(t,n,e,o){for(let o=0;o<t.length;o+=1){const r=t[o];if(r.nodeName===n){for(let t=0;t<r.attributes.length;t+=1){const n=r.attributes[t];e[n.name]||r.removeAttribute(n.name)}return t.splice(o,1)[0]}}return o?E(n):v(n)}function R(t,n){for(let e=0;e<t.length;e+=1){const o=t[e];if(3===o.nodeType)return o.data=""+n,t.splice(e,1)[0]}return A(n)}function S(t){return R(t," ")}function L(t,n){n=""+n,t.data!==n&&(t.data=n)}function q(t,n,e,o){t.style.setProperty(n,e,o?"important":"")}function z(t,n,e){t.classList[e?"add":"remove"](n)}let F,M=0,T={};function B(t,n,e,o,r,s,u,c=0){const i=16.666/o;let a="{\n";for(let t=0;t<=1;t+=i){const o=n+(e-n)*s(t);a+=100*t+`%{${u(o,1-o)}}\n`}const f=a+`100% {${u(e,1-e)}}\n}`,l=`__svelte_${function(t){let n=5381,e=t.length;for(;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0}(f)}_${c}`;if(!T[l]){if(!h){const t=v("style");document.head.appendChild(t),h=t.sheet}T[l]=!0,h.insertRule(`@keyframes ${l} ${f}`,h.cssRules.length)}const d=t.style.animation||"";return t.style.animation=`${d?`${d}, `:""}${l} ${o}ms linear ${r}ms 1 both`,M+=1,l}function D(t,n){t.style.animation=(t.style.animation||"").split(", ").filter(n?t=>t.indexOf(n)<0:t=>-1===t.indexOf("__svelte")).join(", "),n&&!--M&&$(()=>{if(M)return;let t=h.cssRules.length;for(;t--;)h.deleteRule(t);T={}})}function G(t){F=t}function H(){if(!F)throw new Error("Function called outside component initialization");return F}function I(t){H().$$.on_mount.push(t)}function J(t){H().$$.on_destroy.push(t)}function K(t,n){H().$$.context.set(t,n)}const Q=[],U=[],V=[],W=[],X=Promise.resolve();let Y,Z=!1;function tt(t){V.push(t)}function nt(){const t=new Set;do{for(;Q.length;){const t=Q.shift();G(t),et(t.$$)}for(;U.length;)U.pop()();for(let n=0;n<V.length;n+=1){const e=V[n];t.has(e)||(e(),t.add(e))}V.length=0}while(Q.length);for(;W.length;)W.pop()();Z=!1}function et(t){null!==t.fragment&&(t.update(t.dirty),s(t.before_update),t.fragment&&t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(tt))}function ot(t,n,e){t.dispatchEvent(function(t,n){const e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,n),e}(`${n?"intro":"outro"}${e}`))}const rt=new Set;let st;function ut(){st={r:0,c:[],p:st}}function ct(){st.r||s(st.c),st=st.p}function it(t,n){t&&t.i&&(rt.delete(t),t.i(n))}function at(t,n,e,o){if(t&&t.o){if(rt.has(t))return;rt.add(t),st.c.push(()=>{rt.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}const ft={duration:0};function lt(e,o,r,c){let i=o(e,r),a=c?0:1,f=null,l=null,d=null;function h(){d&&D(e,d)}function b(t,n){const e=t.b-a;return n*=Math.abs(e),{a:a,b:t.b,d:e,duration:n,start:t.start,end:t.start+n,group:t.group}}function w(o){const{delay:r=0,duration:u=300,easing:c=n,tick:w=t,css:_}=i||ft,x={start:p()+r,b:o};o||(x.group=st,st.r+=1),f?l=x:(_&&(h(),d=B(e,a,o,u,r,c,_)),o&&w(0,1),f=b(x,u),tt(()=>ot(e,o,"start")),function(t){let n;g||(g=!0,$(y)),new Promise(e=>{m.add(n=[t,e])})}(t=>{if(l&&t>l.start&&(f=b(l,u),l=null,ot(e,f.b,"start"),_&&(h(),d=B(e,a,f.b,f.duration,0,c,i.css))),f)if(t>=f.end)w(a=f.b,1-a),ot(e,f.b,"end"),l||(f.b?h():--f.group.r||s(f.group.c)),f=null;else if(t>=f.start){const n=t-f.start;a=f.a+f.d*c(n/f.duration),w(a,1-a)}return!(!f&&!l)}))}return{run(t){u(i)?(Y||(Y=Promise.resolve()).then(()=>{Y=null}),Y).then(()=>{i=i(),w(t)}):w(t)},end(){h(),f=l=null}}}const dt="undefined"!=typeof window?window:global;function pt(t,n){const e={},o={},r={$$scope:1};let s=t.length;for(;s--;){const u=t[s],c=n[s];if(c){for(const t in u)t in c||(o[t]=1);for(const t in c)r[t]||(e[t]=c[t],r[t]=1);t[s]=c}else for(const t in u)r[t]=1}for(const t in o)t in e||(e[t]=void 0);return e}function $t(t){return"object"==typeof t&&null!==t?t:{}}function mt(t){t&&t.c()}function ht(t,n){t&&t.l(n)}function gt(t,n,e){const{fragment:r,on_mount:c,on_destroy:i,after_update:a}=t.$$;r&&r.m(n,e),tt(()=>{const n=c.map(o).filter(u);i?i.push(...n):s(n),t.$$.on_mount=[]}),a.forEach(tt)}function yt(t,n){const e=t.$$;null!==e.fragment&&(s(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx={})}function bt(t,n){t.$$.dirty||(Q.push(t),Z||(Z=!0,X.then(nt)),t.$$.dirty=r()),t.$$.dirty[n]=!0}function wt(n,e,o,u,c,i){const a=F;G(n);const f=e.props||{},l=n.$$={fragment:null,ctx:null,props:i,update:t,not_equal:c,bound:r(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:r(),dirty:null};let d=!1;l.ctx=o?o(n,f,(t,e,o=e)=>(l.ctx&&c(l.ctx[t],l.ctx[t]=o)&&(l.bound[t]&&l.bound[t](o),d&&bt(n,t)),e)):f,l.update(),d=!0,s(l.before_update),l.fragment=!!u&&u(l.ctx),e.target&&(e.hydrate?l.fragment&&l.fragment.l(O(e.target)):l.fragment&&l.fragment.c(),e.intro&&it(n.$$.fragment),gt(n,e.target,e.anchor),nt()),G(a)}class _t{$destroy(){yt(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}export{$t as A,yt as B,K as C,ut as D,ct as E,E as F,l as G,N as H,u as I,x as J,dt as K,z as L,n as M,q as N,tt as O,lt as P,I as Q,J as R,_t as S,U as T,P as a,O as b,i as c,_ as d,v as e,w as f,f as g,a as h,wt as i,at as j,A as k,R as l,b as m,t as n,L as o,C as p,k as q,S as r,c as s,it as t,j as u,e as v,mt as w,ht as x,gt as y,pt as z};