import{r as e,s as t,w as n,g as o,e as i,f as r,h as u,u as a,i as l,j as s,n as c}from"./@vue-476d9f53.js";var v=Object.defineProperty,d=Object.defineProperties,f=Object.getOwnPropertyDescriptors,p=Object.getOwnPropertySymbols,w=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable,h=(e,t,n)=>t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;function b(o,i){var r;const u=t();var a,l;return n((()=>{u.value=o()}),(a=((e,t)=>{for(var n in t||(t={}))w.call(t,n)&&h(e,n,t[n]);if(p)for(var n of p(t))m.call(t,n)&&h(e,n,t[n]);return e})({},i),l={flush:null!=(r=null==i?void 0:i.flush)?r:"sync"},d(a,f(l)))),e(u)}function g(e){return!!o()&&(i(e),!0)}const y="undefined"!=typeof window,O=e=>"boolean"==typeof e,T=e=>"number"==typeof e,j=()=>{};function P(e,t){return function(...n){e((()=>t.apply(this,n)),{fn:t,thisArg:this,args:n})}}function x(e,t=200,n={}){return P(function(e,t={}){let n,o;return i=>{const r=a(e),u=a(t.maxWait);if(n&&clearTimeout(n),r<=0||void 0!==u&&u<=0)return o&&(clearTimeout(o),o=null),i();u&&!o&&(o=setTimeout((()=>{n&&clearTimeout(n),o=null,i()}),u)),n=setTimeout((()=>{o&&clearTimeout(o),o=null,i()}),r)}}(t,n),e)}function S(e,t=200,n={}){if(t<=0)return e;const o=r(e.value),i=x((()=>{o.value=e.value}),t,n);return u(e,(()=>i())),o}function _(e,t=200,n=!0,o=!0){return P(function(e,t=!0,n=!0){let o,i=0,r=!n;const u=()=>{o&&(clearTimeout(o),o=void 0)};return l=>{const s=a(e),c=Date.now()-i;if(u(),s<=0)return i=Date.now(),l();c>s&&(i=Date.now(),r?r=!1:l()),t&&(o=setTimeout((()=>{i=Date.now(),n||(r=!0),u(),l()}),s)),n||o||(o=setTimeout((()=>r=!0),s))}}(t,n,o),e)}function z(e,t=!0){l()?s(e):t?e():c(e)}function D(e,t,n={}){const{immediate:o=!0}=n,i=r(!1);let u=null;function l(){u&&(clearTimeout(u),u=null)}function s(){i.value=!1,l()}function c(...n){l(),i.value=!0,u=setTimeout((()=>{i.value=!1,u=null,e(...n)}),a(t))}return o&&(i.value=!0,y&&c()),g(s),{isPending:i,start:c,stop:s}}function E(e){var t;const n=a(e);return null!=(t=null==n?void 0:n.$el)?t:n}const R=y?window:void 0,W=y?window.document:void 0;function k(...e){let t,n,o,i;if("string"==typeof e[0]?([n,o,i]=e,t=R):[t,n,o,i]=e,!t)return j;let r=j;const a=u((()=>E(t)),(e=>{r(),e&&(e.addEventListener(n,o,i),r=()=>{e.removeEventListener(n,o,i),r=j})}),{immediate:!0,flush:"post"}),l=()=>{a(),r()};return g(l),l}function H(e,t,n={}){const{window:o=R,ignore:i,capture:u=!0}=n;if(!o)return;const a=r(!0);let l;const s=n=>{o.clearTimeout(l);const r=E(e),u=n.composedPath();r&&r!==n.target&&!u.includes(r)&&a.value&&(i&&i.length>0&&i.some((e=>{const t=E(e);return t&&(n.target===t||u.includes(t))}))||t(n))},c=[k(o,"click",s,{passive:!0,capture:u}),k(o,"pointerdown",(t=>{const n=E(e);a.value=!!n&&!t.composedPath().includes(n)}),{passive:!0}),k(o,"pointerup",(e=>{l=o.setTimeout((()=>s(e)),50)}),{passive:!0})];return()=>c.forEach((e=>e()))}const I="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},L="__vueuse_ssr_handlers__";function A({document:e=W}={}){if(!e)return r("visible");const t=r(e.visibilityState);return k(e,"visibilitychange",(()=>{t.value=e.visibilityState})),t}I[L]=I[L]||{},I[L];var B,C,F=Object.getOwnPropertySymbols,$=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;function G(e,t,n={}){const o=n,{window:i=R}=o,r=((e,t)=>{var n={};for(var o in e)$.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&F)for(var o of F(e))t.indexOf(o)<0&&q.call(e,o)&&(n[o]=e[o]);return n})(o,["window"]);let a;const l=i&&"ResizeObserver"in i,s=()=>{a&&(a.disconnect(),a=void 0)},c=u((()=>E(e)),(e=>{s(),l&&i&&e&&(a=new ResizeObserver(t),a.observe(e,r))}),{immediate:!0,flush:"post"}),v=()=>{s(),c()};return g(v),{isSupported:l,stop:v}}function J(e,t={}){const{reset:n=!0,windowResize:o=!0,windowScroll:i=!0,immediate:a=!0}=t,l=r(0),s=r(0),c=r(0),v=r(0),d=r(0),f=r(0),p=r(0),w=r(0);function m(){const t=E(e);if(!t)return void(n&&(l.value=0,s.value=0,c.value=0,v.value=0,d.value=0,f.value=0,p.value=0,w.value=0));const o=t.getBoundingClientRect();l.value=o.height,s.value=o.bottom,c.value=o.left,v.value=o.right,d.value=o.top,f.value=o.width,p.value=o.x,w.value=o.y}return G(e,m),u((()=>E(e)),(e=>!e&&m())),i&&k("scroll",m,{passive:!0}),o&&k("resize",m,{passive:!0}),z((()=>{a&&m()})),{height:l,bottom:s,left:c,right:v,top:d,width:f,x:p,y:w,update:m}}function K({window:e=R}={}){if(!e)return r(!1);const t=r(e.document.hasFocus());return k(e,"blur",(()=>{t.value=!1})),k(e,"focus",(()=>{t.value=!0})),t}function M({window:e=R,initialWidth:t=1/0,initialHeight:n=1/0}={}){const o=r(t),i=r(n),u=()=>{e&&(o.value=e.innerWidth,i.value=e.innerHeight)};return u(),z(u),k("resize",u,{passive:!0}),{width:o,height:i}}y&&(null==window?void 0:window.navigator)&&(null==(B=null==window?void 0:window.navigator)?void 0:B.platform)&&/iP(ad|hone|od)/.test(null==(C=null==window?void 0:window.navigator)?void 0:C.platform);export{T as a,O as b,E as c,M as d,J as e,G as f,_ as g,D as h,y as i,A as j,K as k,b as l,H as o,S as r,g as t,k as u};
