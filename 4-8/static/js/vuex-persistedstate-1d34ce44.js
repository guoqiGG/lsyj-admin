var r=function(r){return!(t=r,!t||"object"!=typeof t||function(r){var t=Object.prototype.toString.call(r);return"[object RegExp]"===t||"[object Date]"===t||r.$$typeof===e}(r));var t},e="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function t(r,e){return!1!==e.clone&&e.isMergeableObject(r)?u(Array.isArray(r)?[]:{},r,e):r}function n(r,e,n){return r.concat(e).map((function(r){return t(r,n)}))}function o(r){return Object.keys(r).concat((e=r,Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter((function(r){return e.propertyIsEnumerable(r)})):[]));var e}function c(r,e){try{return e in r}catch(t){return!1}}function u(e,a,i){(i=i||{}).arrayMerge=i.arrayMerge||n,i.isMergeableObject=i.isMergeableObject||r,i.cloneUnlessOtherwiseSpecified=t;var f,s,y,l,b=Array.isArray(a);return b===Array.isArray(e)?b?i.arrayMerge(e,a,i):(f=e,s=a,l={},(y=i).isMergeableObject(f)&&o(f).forEach((function(r){l[r]=t(f[r],y)})),o(s).forEach((function(r){var e,n;c(e=f,n=r)&&(!Object.hasOwnProperty.call(e,n)||!Object.propertyIsEnumerable.call(e,n))||(l[r]=c(f,r)&&y.isMergeableObject(s[r])?function(r,e){if(!e.customMerge)return u;var t=e.customMerge(r);return"function"==typeof t?t:u}(r,y)(f[r],s[r],y):t(s[r],y))})),l):t(a,i)}u.all=function(r,e){if(!Array.isArray(r))throw new Error("first argument should be an array");return r.reduce((function(r,t){return u(r,t,e)}),{})};var a=u;function i(r){var e=(r=r||{}).storage||window&&window.localStorage,t=r.key||"vuex";function n(r,e){var t=e.getItem(r);try{return"string"==typeof t?JSON.parse(t):"object"==typeof t?t:void 0}catch(n){}}function o(){return!0}function c(r,e,t){return t.setItem(r,JSON.stringify(e))}function u(r,e){return Array.isArray(e)?e.reduce((function(e,t){return n=e,o=t,u=r,c=void 0===(u=((a=t).split?a.split("."):a).reduce((function(r,e){return r&&r[e]}),u))?void 0:u,!/^(__proto__|constructor|prototype)$/.test(o)&&((o=o.split?o.split("."):o.slice(0)).slice(0,-1).reduce((function(r,e){return r[e]=r[e]||{}}),n)[o.pop()]=c),n;var n,o,c,u,a}),{}):r}function i(r){return function(e){return r.subscribe(e)}}(r.assertStorage||function(){e.setItem("@@",1),e.removeItem("@@")})(e);var f,s=function(){return(r.getState||n)(t,e)};return r.fetchBeforeUse&&(f=s()),function(n){r.fetchBeforeUse||(f=s()),"object"==typeof f&&null!==f&&(n.replaceState(r.overwrite?f:a(n.state,f,{arrayMerge:r.arrayMerger||function(r,e){return e},clone:!1})),(r.rehydrated||function(){})(n)),(r.subscriber||i)(n)((function(n,a){(r.filter||o)(n)&&(r.setState||c)(t,(r.reducer||u)(a,r.paths),e)}))}}export{i as a};