import{a4 as S,a5 as W,a6 as X,a7 as w,a8 as k,g as b,a9 as v,_ as y,aa as m,v as ee,ab as re,ac as ne,K as ie,B as G,x as N,z as Z,E as H,ad as se,ae as te,A as ae,Q as C,af as M,C as q,ag as j,y as Q,ah as fe,ai as ue,b as B,L as le,aj as ce,ak as de,f as U,al as oe,am as V,an as _e,ao as ve,$ as J,l as pe,ap as he,aq as be,a1 as Pe,ar as $,as as D,at as we}from"./CQzTuCO3.js";function I(e,r=null,f){if(typeof e!="object"||e===null||S in e)return e;const s=ne(e);if(s!==W&&s!==X)return e;var n=new Map,l=ie(e),p=w(0);l&&n.set("length",w(e.length));var P;return new Proxy(e,{defineProperty(c,i,t){(!("value"in t)||t.configurable===!1||t.enumerable===!1||t.writable===!1)&&re();var u=n.get(i);return u===void 0?(u=w(t.value),n.set(i,u)):y(u,I(t.value,P)),!0},deleteProperty(c,i){var t=n.get(i);if(t===void 0)i in c&&n.set(i,w(v));else{if(l&&typeof i=="string"){var u=n.get("length"),a=Number(i);Number.isInteger(a)&&a<u.v&&y(u,a)}y(t,v),z(p)}return!0},get(c,i,t){var _;if(i===S)return e;var u=n.get(i),a=i in c;if(u===void 0&&(!a||(_=m(c,i))!=null&&_.writable)&&(u=w(I(a?c[i]:v,P)),n.set(i,u)),u!==void 0){var d=b(u);return d===v?void 0:d}return Reflect.get(c,i,t)},getOwnPropertyDescriptor(c,i){var t=Reflect.getOwnPropertyDescriptor(c,i);if(t&&"value"in t){var u=n.get(i);u&&(t.value=b(u))}else if(t===void 0){var a=n.get(i),d=a==null?void 0:a.v;if(a!==void 0&&d!==v)return{enumerable:!0,configurable:!0,value:d,writable:!0}}return t},has(c,i){var d;if(i===S)return!0;var t=n.get(i),u=t!==void 0&&t.v!==v||Reflect.has(c,i);if(t!==void 0||ee!==null&&(!u||(d=m(c,i))!=null&&d.writable)){t===void 0&&(t=w(u?I(c[i],P):v),n.set(i,t));var a=b(t);if(a===v)return!1}return u},set(c,i,t,u){var x;var a=n.get(i),d=i in c;if(l&&i==="length")for(var _=t;_<a.v;_+=1){var g=n.get(_+"");g!==void 0?y(g,v):_ in c&&(g=w(v),n.set(_+"",g))}a===void 0?(!d||(x=m(c,i))!=null&&x.writable)&&(a=w(void 0),y(a,I(t,P)),n.set(i,a)):(d=a.v!==v,y(a,I(t,P)));var h=Reflect.getOwnPropertyDescriptor(c,i);if(h!=null&&h.set&&h.set.call(u,t),!d){if(l&&typeof i=="string"){var E=n.get("length"),O=Number(i);Number.isInteger(O)&&O>=E.v&&y(E,O+1)}z(p)}return!0},ownKeys(c){b(p);var i=Reflect.ownKeys(c).filter(a=>{var d=n.get(a);return d===void 0||d.v!==v});for(var[t,u]of n)u.v!==v&&!(t in c)&&i.push(t);return i},setPrototypeOf(){k()}})}function z(e,r=1){y(e,e.v+r)}function me(e,r,f=!1){N&&Z();var s=e,n=null,l=null,p=v,P=f?H:0,c=!1;const i=(u,a=!0)=>{c=!0,t(a,u)},t=(u,a)=>{if(p===(p=u))return;let d=!1;if(N){const _=s.data===se;!!p===_&&(s=te(),ae(s),C(!1),d=!0)}p?(n?M(n):a&&(n=q(()=>a(s))),l&&j(l,()=>{l=null})):(l?M(l):a&&(l=q(()=>a(s))),n&&j(n,()=>{n=null})),d&&C(!0)};G(()=>{c=!1,r(i),c||t(null,null)},P),N&&(s=Q)}function Ee(e,r,f){N&&Z();var s=e,n,l;G(()=>{n!==(n=r())&&(l&&(j(l),l=null),n&&(l=q(()=>f(s,n))))},H),N&&(s=Q)}function F(e,r){return e===r||(e==null?void 0:e[S])===r}function Oe(e={},r,f,s){return fe(()=>{var n,l;return ue(()=>{n=l,l=[],B(()=>{e!==f(...l)&&(r(e,...l),n&&F(f(...n),e)&&r(null,...n))})}),()=>{le(()=>{l&&F(f(...l),e)&&r(null,...l)})}}),e}let T=!1;function ye(e){var r=T;try{return T=!1,[e(),T]}finally{T=r}}const ge={get(e,r){if(!e.exclude.includes(r))return e.props[r]},set(e,r){return!1},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function Ae(e,r,f){return new Proxy({props:e,exclude:r},ge)}const xe={get(e,r){if(!e.exclude.includes(r))return b(e.version),r in e.special?e.special[r]():e.props[r]},set(e,r,f){return r in e.special||(e.special[r]=Ie({get[r](){return e.props[r]}},r,V)),e.special[r](f),$(e.version),!0},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},deleteProperty(e,r){return e.exclude.includes(r)||(e.exclude.push(r),$(e.version)),!0},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function De(e,r){return new Proxy({props:e,exclude:r,special:{},version:w(0)},xe)}const Re={get(e,r){let f=e.props.length;for(;f--;){let s=e.props[f];if(D(s)&&(s=s()),typeof s=="object"&&s!==null&&r in s)return s[r]}},set(e,r,f){let s=e.props.length;for(;s--;){let n=e.props[s];D(n)&&(n=n());const l=m(n,r);if(l&&l.set)return l.set(f),!0}return!1},getOwnPropertyDescriptor(e,r){let f=e.props.length;for(;f--;){let s=e.props[f];if(D(s)&&(s=s()),typeof s=="object"&&s!==null&&r in s){const n=m(s,r);return n&&!n.configurable&&(n.configurable=!0),n}}},has(e,r){if(r===S||r===J)return!1;for(let f of e.props)if(D(f)&&(f=f()),f!=null&&r in f)return!0;return!1},ownKeys(e){const r=[];for(let f of e.props){D(f)&&(f=f());for(const s in f)r.includes(s)||r.push(s)}return r}};function Ne(...e){return new Proxy({props:e},Re)}function Ie(e,r,f,s){var Y;var n=(f&be)!==0,l=!pe||(f&he)!==0,p=(f&ve)!==0,P=(f&we)!==0,c=!1,i;p?[i,c]=ye(()=>e[r]):i=e[r];var t=S in e||J in e,u=p&&(((Y=m(e,r))==null?void 0:Y.set)??(t&&r in e&&(o=>e[r]=o)))||void 0,a=s,d=!0,_=!1,g=()=>(_=!0,d&&(d=!1,P?a=B(s):a=s),a);i===void 0&&s!==void 0&&(u&&l&&ce(),i=g(),u&&u(i));var h;if(l)h=()=>{var o=e[r];return o===void 0?g():(d=!0,_=!1,o)};else{var E=(n?U:oe)(()=>e[r]);E.f|=de,h=()=>{var o=b(E);return o!==void 0&&(a=void 0),o===void 0?a:o}}if((f&V)===0)return h;if(u){var O=e.$$legacy;return function(o,R){return arguments.length>0?((!l||!R||O||c)&&u(R?h():o),o):h()}}var x=!1,L=Pe(i),A=U(()=>{var o=h(),R=b(L);return x?(x=!1,R):L.v=o});return n||(A.equals=_e),function(o,R){if(arguments.length>0){const K=R?b(A):l&&p?I(o):o;return A.equals(K)||(x=!0,y(L,K),_&&a!==void 0&&(a=K),B(()=>b(A))),o}return b(A)}}export{I as a,Oe as b,Ee as c,me as i,De as l,Ie as p,Ae as r,Ne as s};
