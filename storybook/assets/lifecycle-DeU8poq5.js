let o;function r(n){o=n}function t(){if(!o)throw new Error("Function called outside component initialization");return o}function u(n){t().$$.on_mount.push(n)}function c(n){t().$$.on_destroy.push(n)}function s(n,e){return t().$$.context.set(n,e),e}function i(n){return t().$$.context.get(n)}export{c as a,r as b,o as c,i as g,u as o,s};