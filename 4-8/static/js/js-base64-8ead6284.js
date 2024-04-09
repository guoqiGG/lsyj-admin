const t="function"==typeof atob,e="function"==typeof btoa,r="function"==typeof Buffer,o="function"==typeof TextDecoder?new TextDecoder:void 0,n="function"==typeof TextEncoder?new TextEncoder:void 0,a=Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),c=(t=>{let e={};return a.forEach(((t,r)=>e[t]=r)),e})(),i=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,f=String.fromCharCode.bind(String),u="function"==typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):t=>new Uint8Array(Array.prototype.slice.call(t,0)),s=t=>t.replace(/=/g,"").replace(/[+\/]/g,(t=>"+"==t?"-":"_")),l=t=>t.replace(/[^A-Za-z0-9\+\/]/g,""),d=t=>{let e,r,o,n,c="";const i=t.length%3;for(let f=0;f<t.length;){if((r=t.charCodeAt(f++))>255||(o=t.charCodeAt(f++))>255||(n=t.charCodeAt(f++))>255)throw new TypeError("invalid character found");e=r<<16|o<<8|n,c+=a[e>>18&63]+a[e>>12&63]+a[e>>6&63]+a[63&e]}return i?c.slice(0,i-3)+"===".substring(i):c},h=e?t=>btoa(t):r?t=>Buffer.from(t,"binary").toString("base64"):d,A=r?t=>Buffer.from(t).toString("base64"):t=>{let e=[];for(let r=0,o=t.length;r<o;r+=4096)e.push(f.apply(null,t.subarray(r,r+4096)));return h(e.join(""))},p=(t,e=!1)=>e?s(A(t)):A(t),y=t=>{if(t.length<2)return(e=t.charCodeAt(0))<128?t:e<2048?f(192|e>>>6)+f(128|63&e):f(224|e>>>12&15)+f(128|e>>>6&63)+f(128|63&e);var e=65536+1024*(t.charCodeAt(0)-55296)+(t.charCodeAt(1)-56320);return f(240|e>>>18&7)+f(128|e>>>12&63)+f(128|e>>>6&63)+f(128|63&e)},b=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,g=t=>t.replace(b,y),x=r?t=>Buffer.from(t,"utf8").toString("base64"):n?t=>A(n.encode(t)):t=>h(g(t)),B=(t,e=!1)=>e?s(x(t)):x(t),C=t=>B(t,!0),m=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,U=t=>{switch(t.length){case 4:var e=((7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3))-65536;return f(55296+(e>>>10))+f(56320+(1023&e));case 3:return f((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return f((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},F=t=>t.replace(m,U),S=t=>{if(t=t.replace(/\s+/g,""),!i.test(t))throw new TypeError("malformed base64.");t+="==".slice(2-(3&t.length));let e,r,o,n="";for(let a=0;a<t.length;)e=c[t.charAt(a++)]<<18|c[t.charAt(a++)]<<12|(r=c[t.charAt(a++)])<<6|(o=c[t.charAt(a++)]),n+=64===r?f(e>>16&255):64===o?f(e>>16&255,e>>8&255):f(e>>16&255,e>>8&255,255&e);return n},w=t?t=>atob(l(t)):r?t=>Buffer.from(t,"base64").toString("binary"):S,E=r?t=>u(Buffer.from(t,"base64")):t=>u(w(t).split("").map((t=>t.charCodeAt(0)))),v=t=>E(R(t)),D=r?t=>Buffer.from(t,"base64").toString("utf8"):o?t=>o.decode(E(t)):t=>F(w(t)),R=t=>l(t.replace(/[-_]/g,(t=>"-"==t?"+":"/"))),z=t=>D(R(t)),T=t=>({value:t,enumerable:!1,writable:!0,configurable:!0}),Z=function(){const t=(t,e)=>Object.defineProperty(String.prototype,t,T(e));t("fromBase64",(function(){return z(this)})),t("toBase64",(function(t){return B(this,t)})),t("toBase64URI",(function(){return B(this,!0)})),t("toBase64URL",(function(){return B(this,!0)})),t("toUint8Array",(function(){return v(this)}))},I=function(){const t=(t,e)=>Object.defineProperty(Uint8Array.prototype,t,T(e));t("toBase64",(function(t){return p(this,t)})),t("toBase64URI",(function(){return p(this,!0)})),t("toBase64URL",(function(){return p(this,!0)}))},P={version:"3.7.5",VERSION:"3.7.5",atob:w,atobPolyfill:S,btoa:h,btoaPolyfill:d,fromBase64:z,toBase64:B,encode:B,encodeURI:C,encodeURL:C,utob:g,btou:F,decode:z,isValid:t=>{if("string"!=typeof t)return!1;const e=t.replace(/\s+/g,"").replace(/={0,2}$/,"");return!/[^\s0-9a-zA-Z\+/]/.test(e)||!/[^\s0-9a-zA-Z\-_]/.test(e)},fromUint8Array:p,toUint8Array:v,extendString:Z,extendUint8Array:I,extendBuiltins:()=>{Z(),I()}};export{P as g};
