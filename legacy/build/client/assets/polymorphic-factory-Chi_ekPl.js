import{r as y,j as k}from"./index-VXuqoyi4.js";function B(r){return Object.keys(r)}function _(r){return r&&typeof r=="object"&&!Array.isArray(r)}function tr(r,e){const t={...r},n=e;return _(r)&&_(e)&&Object.keys(e).forEach(i=>{_(n[i])&&i in r?t[i]=tr(t[i],n[i]):t[i]=n[i]}),t}function Dr(r){return r.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}function F(r){return r==="0rem"?"0rem":`calc(${r} * var(--mantine-scale))`}function nr(r,{shouldScale:e=!1}={}){function t(n){if(n===0||n==="0")return`0${r}`;if(typeof n=="number"){const i=`${n/16}${r}`;return e?F(i):i}if(typeof n=="string"){if(n===""||n.startsWith("calc(")||n.startsWith("clamp(")||n.includes("rgba("))return n;if(n.includes(","))return n.split(",").map(a=>t(a)).join(",");if(n.includes(" "))return n.split(" ").map(a=>t(a)).join(" ");if(n.includes(r))return e?F(n):n;const i=n.replace("px","");if(!Number.isNaN(Number(i))){const a=`${Number(i)/16}${r}`;return e?F(a):a}}return n}return t}const o=nr("rem",{shouldScale:!0}),qe=nr("em");function V(r){return Object.keys(r).reduce((e,t)=>(r[t]!==void 0&&(e[t]=r[t]),e),{})}function ar(r){return typeof r=="number"?!0:typeof r=="string"?r.startsWith("calc(")||r.startsWith("var(")||r.includes(" ")&&r.trim()!==""?!0:/[0-9]/.test(r.trim().replace("-","")[0]):!1}function R(r,e="size",t=!0){if(r!==void 0)return ar(r)?t?o(r):r:`var(--${e}-${r})`}function Ze(r){return R(r,"mantine-spacing")}function Je(r){return r===void 0?"var(--mantine-radius-default)":R(r,"mantine-radius")}function rt(r){return R(r,"mantine-font-size")}function et(r){return R(r,"mantine-line-height",!1)}function tt(r){if(r)return R(r,"mantine-shadow",!1)}function nt(r){return r}function ir(r){var e,t,n="";if(typeof r=="string"||typeof r=="number")n+=r;else if(typeof r=="object")if(Array.isArray(r)){var i=r.length;for(e=0;e<i;e++)r[e]&&(t=ir(r[e]))&&(n&&(n+=" "),n+=t)}else for(t in r)r[t]&&(n&&(n+=" "),n+=t);return n}function E(){for(var r,e,t=0,n="",i=arguments.length;t<i;t++)(r=arguments[t])&&(e=ir(r))&&(n&&(n+=" "),n+=e);return n}const Gr={};function Ur(r){const e={};return r.forEach(t=>{Object.entries(t).forEach(([n,i])=>{e[n]?e[n]=E(e[n],i):e[n]=i})}),e}function D({theme:r,classNames:e,props:t,stylesCtx:n}){const a=(Array.isArray(e)?e:[e]).map(s=>typeof s=="function"?s(r,t,n):s||Gr);return Ur(a)}function P({theme:r,styles:e,props:t,stylesCtx:n}){return(Array.isArray(e)?e:[e]).reduce((a,s)=>typeof s=="function"?{...a,...s(r,t,n)}:{...a,...s},{})}const Yr=y.createContext(null);function x(){const r=y.useContext(Yr);if(!r)throw new Error("[@mantine/core] MantineProvider was not found in tree");return r}function at(){return x().cssVariablesResolver}function Xr(){return x().classNamesPrefix}function Kr(){return x().getStyleNonce}function Qr(){return x().withStaticClasses}function qr(){return x().headless}function Zr(){var r;return(r=x().stylesTransform)==null?void 0:r.sx}function Jr(){var r;return(r=x().stylesTransform)==null?void 0:r.styles}function re(r){return/^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(r)}function ee(r){let e=r.replace("#","");if(e.length===3){const s=e.split("");e=[s[0],s[0],s[1],s[1],s[2],s[2]].join("")}if(e.length===8){const s=parseInt(e.slice(6,8),16)/255;return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16),a:s}}const t=parseInt(e,16),n=t>>16&255,i=t>>8&255,a=t&255;return{r:n,g:i,b:a,a:1}}function te(r){const[e,t,n,i]=r.replace(/[^0-9,./]/g,"").split(/[/,]/).map(Number);return{r:e,g:t,b:n,a:i||1}}function ne(r){const e=/^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i,t=r.match(e);if(!t)return{r:0,g:0,b:0,a:1};const n=parseInt(t[1],10),i=parseInt(t[2],10)/100,a=parseInt(t[3],10)/100,s=t[5]?parseFloat(t[5]):void 0,f=(1-Math.abs(2*a-1))*i,c=n/60,l=f*(1-Math.abs(c%2-1)),p=a-f/2;let u,d,m;return c>=0&&c<1?(u=f,d=l,m=0):c>=1&&c<2?(u=l,d=f,m=0):c>=2&&c<3?(u=0,d=f,m=l):c>=3&&c<4?(u=0,d=l,m=f):c>=4&&c<5?(u=l,d=0,m=f):(u=f,d=0,m=l),{r:Math.round((u+p)*255),g:Math.round((d+p)*255),b:Math.round((m+p)*255),a:s||1}}function G(r){return re(r)?ee(r):r.startsWith("rgb")?te(r):r.startsWith("hsl")?ne(r):{r:0,g:0,b:0,a:1}}function A(r,e){if(r.startsWith("var("))return`color-mix(in srgb, ${r}, black ${e*100}%)`;const{r:t,g:n,b:i,a}=G(r),s=1-e,f=c=>Math.round(c*s);return`rgba(${f(t)}, ${f(n)}, ${f(i)}, ${a})`}function ae(r,e){return typeof r.primaryShade=="number"?r.primaryShade:e==="dark"?r.primaryShade.dark:r.primaryShade.light}function L(r){return r<=.03928?r/12.92:((r+.055)/1.055)**2.4}function ie(r){const e=r.match(/oklch\((.*?)%\s/);return e?parseFloat(e[1]):null}function oe(r){if(r.startsWith("oklch("))return(ie(r)||0)/100;const{r:e,g:t,b:n}=G(r),i=e/255,a=t/255,s=n/255,f=L(i),c=L(a),l=L(s);return .2126*f+.7152*c+.0722*l}function M(r,e=.179){return r.startsWith("var(")?!1:oe(r)>e}function j({color:r,theme:e,colorScheme:t}){if(typeof r!="string")throw new Error(`[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof r}`);if(r==="bright")return{color:r,value:t==="dark"?e.white:e.black,shade:void 0,isThemeColor:!1,isLight:M(t==="dark"?e.white:e.black,e.luminanceThreshold),variable:"--mantine-color-bright"};if(r==="dimmed")return{color:r,value:t==="dark"?e.colors.dark[2]:e.colors.gray[7],shade:void 0,isThemeColor:!1,isLight:M(t==="dark"?e.colors.dark[2]:e.colors.gray[6],e.luminanceThreshold),variable:"--mantine-color-dimmed"};if(r==="white"||r==="black")return{color:r,value:r==="white"?e.white:e.black,shade:void 0,isThemeColor:!1,isLight:M(r==="white"?e.white:e.black,e.luminanceThreshold),variable:`--mantine-color-${r}`};const[n,i]=r.split("."),a=i?Number(i):void 0,s=n in e.colors;if(s){const f=a!==void 0?e.colors[n][a]:e.colors[n][ae(e,t||"light")];return{color:n,value:f,shade:a,isThemeColor:s,isLight:M(f,e.luminanceThreshold),variable:i?`--mantine-color-${n}-${a}`:`--mantine-color-${n}-filled`}}return{color:r,value:r,isThemeColor:s,isLight:M(r,e.luminanceThreshold),shade:a,variable:void 0}}function Y(r,e){const t=j({color:r||e.primaryColor,theme:e});return t.variable?`var(${t.variable})`:r}function X(r,e){const t={from:(r==null?void 0:r.from)||e.defaultGradient.from,to:(r==null?void 0:r.to)||e.defaultGradient.to,deg:(r==null?void 0:r.deg)||e.defaultGradient.deg||0},n=Y(t.from,e),i=Y(t.to,e);return`linear-gradient(${t.deg}deg, ${n} 0%, ${i} 100%)`}function b(r,e){if(typeof r!="string"||e>1||e<0)return"rgba(0, 0, 0, 1)";if(r.startsWith("var(")){const a=(1-e)*100;return`color-mix(in srgb, ${r}, transparent ${a}%)`}if(r.startsWith("oklch"))return r.includes("/")?r.replace(/\/\s*[\d.]+\s*\)/,`/ ${e})`):r.replace(")",` / ${e})`);const{r:t,g:n,b:i}=G(r);return`rgba(${t}, ${n}, ${i}, ${e})`}const it=b,se=({color:r,theme:e,variant:t,gradient:n,autoContrast:i})=>{const a=j({color:r,theme:e}),s=typeof i=="boolean"?i:e.autoContrast;if(t==="filled"){const f=s&&a.isLight?"var(--mantine-color-black)":"var(--mantine-color-white)";return a.isThemeColor?a.shade===void 0?{background:`var(--mantine-color-${r}-filled)`,hover:`var(--mantine-color-${r}-filled-hover)`,color:f,border:`${o(1)} solid transparent`}:{background:`var(--mantine-color-${a.color}-${a.shade})`,hover:`var(--mantine-color-${a.color}-${a.shade===9?8:a.shade+1})`,color:f,border:`${o(1)} solid transparent`}:{background:r,hover:A(r,.1),color:f,border:`${o(1)} solid transparent`}}if(t==="light"){if(a.isThemeColor){if(a.shade===void 0)return{background:`var(--mantine-color-${r}-light)`,hover:`var(--mantine-color-${r}-light-hover)`,color:`var(--mantine-color-${r}-light-color)`,border:`${o(1)} solid transparent`};const f=e.colors[a.color][a.shade];return{background:b(f,.1),hover:b(f,.12),color:`var(--mantine-color-${a.color}-${Math.min(a.shade,6)})`,border:`${o(1)} solid transparent`}}return{background:b(r,.1),hover:b(r,.12),color:r,border:`${o(1)} solid transparent`}}if(t==="outline")return a.isThemeColor?a.shade===void 0?{background:"transparent",hover:`var(--mantine-color-${r}-outline-hover)`,color:`var(--mantine-color-${r}-outline)`,border:`${o(1)} solid var(--mantine-color-${r}-outline)`}:{background:"transparent",hover:b(e.colors[a.color][a.shade],.05),color:`var(--mantine-color-${a.color}-${a.shade})`,border:`${o(1)} solid var(--mantine-color-${a.color}-${a.shade})`}:{background:"transparent",hover:b(r,.05),color:r,border:`${o(1)} solid ${r}`};if(t==="subtle"){if(a.isThemeColor){if(a.shade===void 0)return{background:"transparent",hover:`var(--mantine-color-${r}-light-hover)`,color:`var(--mantine-color-${r}-light-color)`,border:`${o(1)} solid transparent`};const f=e.colors[a.color][a.shade];return{background:"transparent",hover:b(f,.12),color:`var(--mantine-color-${a.color}-${Math.min(a.shade,6)})`,border:`${o(1)} solid transparent`}}return{background:"transparent",hover:b(r,.12),color:r,border:`${o(1)} solid transparent`}}return t==="transparent"?a.isThemeColor?a.shade===void 0?{background:"transparent",hover:"transparent",color:`var(--mantine-color-${r}-light-color)`,border:`${o(1)} solid transparent`}:{background:"transparent",hover:"transparent",color:`var(--mantine-color-${a.color}-${Math.min(a.shade,6)})`,border:`${o(1)} solid transparent`}:{background:"transparent",hover:"transparent",color:r,border:`${o(1)} solid transparent`}:t==="white"?a.isThemeColor?a.shade===void 0?{background:"var(--mantine-color-white)",hover:A(e.white,.01),color:`var(--mantine-color-${r}-filled)`,border:`${o(1)} solid transparent`}:{background:"var(--mantine-color-white)",hover:A(e.white,.01),color:`var(--mantine-color-${a.color}-${a.shade})`,border:`${o(1)} solid transparent`}:{background:"var(--mantine-color-white)",hover:A(e.white,.01),color:r,border:`${o(1)} solid transparent`}:t==="gradient"?{background:X(n,e),hover:X(n,e),color:"var(--mantine-color-white)",border:"none"}:t==="default"?{background:"var(--mantine-color-default)",hover:"var(--mantine-color-default-hover)",color:"var(--mantine-color-default-color)",border:`${o(1)} solid var(--mantine-color-default-border)`}:{}},fe={dark:["#C9C9C9","#b8b8b8","#828282","#696969","#424242","#3b3b3b","#2e2e2e","#242424","#1f1f1f","#141414"],gray:["#f8f9fa","#f1f3f5","#e9ecef","#dee2e6","#ced4da","#adb5bd","#868e96","#495057","#343a40","#212529"],red:["#fff5f5","#ffe3e3","#ffc9c9","#ffa8a8","#ff8787","#ff6b6b","#fa5252","#f03e3e","#e03131","#c92a2a"],pink:["#fff0f6","#ffdeeb","#fcc2d7","#faa2c1","#f783ac","#f06595","#e64980","#d6336c","#c2255c","#a61e4d"],grape:["#f8f0fc","#f3d9fa","#eebefa","#e599f7","#da77f2","#cc5de8","#be4bdb","#ae3ec9","#9c36b5","#862e9c"],violet:["#f3f0ff","#e5dbff","#d0bfff","#b197fc","#9775fa","#845ef7","#7950f2","#7048e8","#6741d9","#5f3dc4"],indigo:["#edf2ff","#dbe4ff","#bac8ff","#91a7ff","#748ffc","#5c7cfa","#4c6ef5","#4263eb","#3b5bdb","#364fc7"],blue:["#e7f5ff","#d0ebff","#a5d8ff","#74c0fc","#4dabf7","#339af0","#228be6","#1c7ed6","#1971c2","#1864ab"],cyan:["#e3fafc","#c5f6fa","#99e9f2","#66d9e8","#3bc9db","#22b8cf","#15aabf","#1098ad","#0c8599","#0b7285"],teal:["#e6fcf5","#c3fae8","#96f2d7","#63e6be","#38d9a9","#20c997","#12b886","#0ca678","#099268","#087f5b"],green:["#ebfbee","#d3f9d8","#b2f2bb","#8ce99a","#69db7c","#51cf66","#40c057","#37b24d","#2f9e44","#2b8a3e"],lime:["#f4fce3","#e9fac8","#d8f5a2","#c0eb75","#a9e34b","#94d82d","#82c91e","#74b816","#66a80f","#5c940d"],yellow:["#fff9db","#fff3bf","#ffec99","#ffe066","#ffd43b","#fcc419","#fab005","#f59f00","#f08c00","#e67700"],orange:["#fff4e6","#ffe8cc","#ffd8a8","#ffc078","#ffa94d","#ff922b","#fd7e14","#f76707","#e8590c","#d9480f"]},K="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",or={scale:1,fontSmoothing:!0,focusRing:"auto",white:"#fff",black:"#000",colors:fe,primaryShade:{light:6,dark:8},primaryColor:"blue",variantColorResolver:se,autoContrast:!1,luminanceThreshold:.3,fontFamily:K,fontFamilyMonospace:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",respectReducedMotion:!1,cursorType:"default",defaultGradient:{from:"blue",to:"cyan",deg:45},defaultRadius:"sm",activeClassName:"mantine-active",focusClassName:"",headings:{fontFamily:K,fontWeight:"700",textWrap:"wrap",sizes:{h1:{fontSize:o(34),lineHeight:"1.3"},h2:{fontSize:o(26),lineHeight:"1.35"},h3:{fontSize:o(22),lineHeight:"1.4"},h4:{fontSize:o(18),lineHeight:"1.45"},h5:{fontSize:o(16),lineHeight:"1.5"},h6:{fontSize:o(14),lineHeight:"1.5"}}},fontSizes:{xs:o(12),sm:o(14),md:o(16),lg:o(18),xl:o(20)},lineHeights:{xs:"1.4",sm:"1.45",md:"1.55",lg:"1.6",xl:"1.65"},radius:{xs:o(2),sm:o(4),md:o(8),lg:o(16),xl:o(32)},spacing:{xs:o(10),sm:o(12),md:o(16),lg:o(20),xl:o(32)},breakpoints:{xs:"36em",sm:"48em",md:"62em",lg:"75em",xl:"88em"},shadows:{xs:`0 ${o(1)} ${o(3)} rgba(0, 0, 0, 0.05), 0 ${o(1)} ${o(2)} rgba(0, 0, 0, 0.1)`,sm:`0 ${o(1)} ${o(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${o(10)} ${o(15)} ${o(-5)}, rgba(0, 0, 0, 0.04) 0 ${o(7)} ${o(7)} ${o(-5)}`,md:`0 ${o(1)} ${o(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${o(20)} ${o(25)} ${o(-5)}, rgba(0, 0, 0, 0.04) 0 ${o(10)} ${o(10)} ${o(-5)}`,lg:`0 ${o(1)} ${o(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${o(28)} ${o(23)} ${o(-7)}, rgba(0, 0, 0, 0.04) 0 ${o(12)} ${o(12)} ${o(-7)}`,xl:`0 ${o(1)} ${o(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${o(36)} ${o(28)} ${o(-7)}, rgba(0, 0, 0, 0.04) 0 ${o(17)} ${o(17)} ${o(-7)}`},other:{},components:{}},ce="[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color",Q="[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";function z(r){return r<0||r>9?!1:parseInt(r.toString(),10)===r}function q(r){if(!(r.primaryColor in r.colors))throw new Error(ce);if(typeof r.primaryShade=="object"&&(!z(r.primaryShade.dark)||!z(r.primaryShade.light)))throw new Error(Q);if(typeof r.primaryShade=="number"&&!z(r.primaryShade))throw new Error(Q)}function le(r,e){var n;if(!e)return q(r),r;const t=tr(r,e);return e.fontFamily&&!((n=e.headings)!=null&&n.fontFamily)&&(t.headings.fontFamily=e.fontFamily),q(t),t}const U=y.createContext(null),ue=()=>y.useContext(U)||or;function I(){const r=y.useContext(U);if(!r)throw new Error("@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app");return r}function de({theme:r,children:e,inherit:t=!0}){const n=ue(),i=y.useMemo(()=>le(t?n:or,r),[r,n,t]);return k.jsx(U.Provider,{value:i,children:e})}de.displayName="@mantine/core/MantineThemeProvider";const pe={always:"mantine-focus-always",auto:"mantine-focus-auto",never:"mantine-focus-never"};function me({theme:r,options:e,unstyled:t}){return E((e==null?void 0:e.focusable)&&!t&&(r.focusClassName||pe[r.focusRing]),(e==null?void 0:e.active)&&!t&&r.activeClassName)}function ge({selector:r,stylesCtx:e,options:t,props:n,theme:i}){return D({theme:i,classNames:t==null?void 0:t.classNames,props:(t==null?void 0:t.props)||n,stylesCtx:e})[r]}function Z({selector:r,stylesCtx:e,theme:t,classNames:n,props:i}){return D({theme:t,classNames:n,props:i,stylesCtx:e})[r]}function ye({rootSelector:r,selector:e,className:t}){return r===e?t:void 0}function be({selector:r,classes:e,unstyled:t}){return t?void 0:e[r]}function he({themeName:r,classNamesPrefix:e,selector:t,withStaticClass:n}){return n===!1?[]:r.map(i=>`${e}-${i}-${t}`)}function $e({themeName:r,theme:e,selector:t,props:n,stylesCtx:i}){return r.map(a=>{var s,f;return(f=D({theme:e,classNames:(s=e.components[a])==null?void 0:s.classNames,props:n,stylesCtx:i}))==null?void 0:f[t]})}function ve({options:r,classes:e,selector:t,unstyled:n}){return r!=null&&r.variant&&!n?e[`${t}--${r.variant}`]:void 0}function Se({theme:r,options:e,themeName:t,selector:n,classNamesPrefix:i,classNames:a,classes:s,unstyled:f,className:c,rootSelector:l,props:p,stylesCtx:u,withStaticClasses:d,headless:m,transformedStyles:h}){return E(me({theme:r,options:e,unstyled:f||m}),$e({theme:r,themeName:t,selector:n,props:p,stylesCtx:u}),ve({options:e,classes:s,selector:n,unstyled:f}),Z({selector:n,stylesCtx:u,theme:r,classNames:a,props:p}),Z({selector:n,stylesCtx:u,theme:r,classNames:h,props:p}),ge({selector:n,stylesCtx:u,options:e,props:p,theme:r}),ye({rootSelector:l,selector:n,className:c}),be({selector:n,classes:s,unstyled:f||m}),d&&!m&&he({themeName:t,classNamesPrefix:i,selector:n,withStaticClass:e==null?void 0:e.withStaticClass}),e==null?void 0:e.className)}function Ce({theme:r,themeName:e,props:t,stylesCtx:n,selector:i}){return e.map(a=>{var s;return P({theme:r,styles:(s=r.components[a])==null?void 0:s.styles,props:t,stylesCtx:n})[i]}).reduce((a,s)=>({...a,...s}),{})}function W({style:r,theme:e}){return Array.isArray(r)?[...r].reduce((t,n)=>({...t,...W({style:n,theme:e})}),{}):typeof r=="function"?r(e):r??{}}function xe(r){return r.reduce((e,t)=>(t&&Object.keys(t).forEach(n=>{e[n]={...e[n],...V(t[n])}}),e),{})}function we({vars:r,varsResolver:e,theme:t,props:n,stylesCtx:i,selector:a,themeName:s,headless:f}){var c;return(c=xe([f?{}:e==null?void 0:e(t,n,i),...s.map(l=>{var p,u,d;return(d=(u=(p=t.components)==null?void 0:p[l])==null?void 0:u.vars)==null?void 0:d.call(u,t,n,i)}),r==null?void 0:r(t,n,i)]))==null?void 0:c[a]}function ke({theme:r,themeName:e,selector:t,options:n,props:i,stylesCtx:a,rootSelector:s,styles:f,style:c,vars:l,varsResolver:p,headless:u,withStylesTransform:d}){return{...!d&&Ce({theme:r,themeName:e,props:i,stylesCtx:a,selector:t}),...!d&&P({theme:r,styles:f,props:i,stylesCtx:a})[t],...!d&&P({theme:r,styles:n==null?void 0:n.styles,props:(n==null?void 0:n.props)||i,stylesCtx:a})[t],...we({theme:r,props:i,stylesCtx:a,vars:l,varsResolver:p,selector:t,themeName:e,headless:u}),...s===t?W({style:c,theme:r}):null,...W({style:n==null?void 0:n.style,theme:r})}}function Te({props:r,stylesCtx:e,themeName:t}){const n=I(),i=Jr();return{getTransformedStyles:s=>i?[...s.map(c=>i(c,{props:r,theme:n,ctx:e})),...t.map(c=>{var l;return i((l=n.components[c])==null?void 0:l.styles,{props:r,theme:n,ctx:e})})].filter(Boolean):[],withStylesTransform:!!i}}function ot({name:r,classes:e,props:t,stylesCtx:n,className:i,style:a,rootSelector:s="root",unstyled:f,classNames:c,styles:l,vars:p,varsResolver:u}){const d=I(),m=Xr(),h=Qr(),w=qr(),$=(Array.isArray(r)?r:[r]).filter(v=>v),{withStylesTransform:T,getTransformedStyles:S}=Te({props:t,stylesCtx:n,themeName:$});return(v,g)=>({className:Se({theme:d,options:g,themeName:$,selector:v,classNamesPrefix:m,classNames:c,classes:e,unstyled:f,className:i,rootSelector:s,props:t,stylesCtx:n,withStaticClasses:h,headless:w,transformedStyles:S([g==null?void 0:g.styles,l])}),style:ke({theme:d,themeName:$,selector:v,options:g,props:t,stylesCtx:n,rootSelector:s,styles:l,style:a,vars:p,varsResolver:u,headless:w,withStylesTransform:T})})}function st(r,e,t){var s;const n=I(),i=(s=n.components[r])==null?void 0:s.defaultProps,a=typeof i=="function"?i(n):i;return{...e,...a,...V(t)}}function J(r){return B(r).reduce((e,t)=>r[t]!==void 0?`${e}${Dr(t)}:${r[t]};`:e,"").trim()}function Me({selector:r,styles:e,media:t}){const n=e?J(e):"",i=Array.isArray(t)?t.map(a=>`@media${a.query}{${r}{${J(a.styles)}}}`):[];return`${n?`${r}{${n}}`:""}${i.join("")}`.trim()}function Re({selector:r,styles:e,media:t}){const n=Kr();return k.jsx("style",{"data-mantine-styles":"inline",nonce:n==null?void 0:n(),dangerouslySetInnerHTML:{__html:Me({selector:r,styles:e,media:t})}})}function Ne(r){const{m:e,mx:t,my:n,mt:i,mb:a,ml:s,mr:f,me:c,ms:l,p,px:u,py:d,pt:m,pb:h,pl:w,pr:$,pe:T,ps:S,bg:v,c:g,opacity:C,ff:N,fz:dr,fw:pr,lts:mr,ta:gr,lh:yr,fs:br,tt:hr,td:$r,w:vr,miw:Sr,maw:Cr,h:xr,mih:wr,mah:kr,bgsz:Tr,bgp:Mr,bgr:Rr,bga:Nr,pos:Ar,top:Er,left:jr,bottom:Ir,right:_r,inset:Fr,display:Lr,flex:zr,hiddenFrom:Hr,visibleFrom:Pr,lightHidden:Wr,darkHidden:Or,sx:Br,...Vr}=r;return{styleProps:V({m:e,mx:t,my:n,mt:i,mb:a,ml:s,mr:f,me:c,ms:l,p,px:u,py:d,pt:m,pb:h,pl:w,pr:$,pe:T,ps:S,bg:v,c:g,opacity:C,ff:N,fz:dr,fw:pr,lts:mr,ta:gr,lh:yr,fs:br,tt:hr,td:$r,w:vr,miw:Sr,maw:Cr,h:xr,mih:wr,mah:kr,bgsz:Tr,bgp:Mr,bgr:Rr,bga:Nr,pos:Ar,top:Er,left:jr,bottom:Ir,right:_r,inset:Fr,display:Lr,flex:zr,hiddenFrom:Hr,visibleFrom:Pr,lightHidden:Wr,darkHidden:Or,sx:Br}),rest:Vr}}const Ae={m:{type:"spacing",property:"margin"},mt:{type:"spacing",property:"marginTop"},mb:{type:"spacing",property:"marginBottom"},ml:{type:"spacing",property:"marginLeft"},mr:{type:"spacing",property:"marginRight"},ms:{type:"spacing",property:"marginInlineStart"},me:{type:"spacing",property:"marginInlineEnd"},mx:{type:"spacing",property:"marginInline"},my:{type:"spacing",property:"marginBlock"},p:{type:"spacing",property:"padding"},pt:{type:"spacing",property:"paddingTop"},pb:{type:"spacing",property:"paddingBottom"},pl:{type:"spacing",property:"paddingLeft"},pr:{type:"spacing",property:"paddingRight"},ps:{type:"spacing",property:"paddingInlineStart"},pe:{type:"spacing",property:"paddingInlineEnd"},px:{type:"spacing",property:"paddingInline"},py:{type:"spacing",property:"paddingBlock"},bg:{type:"color",property:"background"},c:{type:"textColor",property:"color"},opacity:{type:"identity",property:"opacity"},ff:{type:"fontFamily",property:"fontFamily"},fz:{type:"fontSize",property:"fontSize"},fw:{type:"identity",property:"fontWeight"},lts:{type:"size",property:"letterSpacing"},ta:{type:"identity",property:"textAlign"},lh:{type:"lineHeight",property:"lineHeight"},fs:{type:"identity",property:"fontStyle"},tt:{type:"identity",property:"textTransform"},td:{type:"identity",property:"textDecoration"},w:{type:"spacing",property:"width"},miw:{type:"spacing",property:"minWidth"},maw:{type:"spacing",property:"maxWidth"},h:{type:"spacing",property:"height"},mih:{type:"spacing",property:"minHeight"},mah:{type:"spacing",property:"maxHeight"},bgsz:{type:"size",property:"backgroundSize"},bgp:{type:"identity",property:"backgroundPosition"},bgr:{type:"identity",property:"backgroundRepeat"},bga:{type:"identity",property:"backgroundAttachment"},pos:{type:"identity",property:"position"},top:{type:"identity",property:"top"},left:{type:"size",property:"left"},bottom:{type:"size",property:"bottom"},right:{type:"size",property:"right"},inset:{type:"size",property:"inset"},display:{type:"identity",property:"display"},flex:{type:"identity",property:"flex"}};function sr(r,e){const t=j({color:r,theme:e});return t.color==="dimmed"?"var(--mantine-color-dimmed)":t.color==="bright"?"var(--mantine-color-bright)":t.variable?`var(${t.variable})`:t.color}function Ee(r,e){const t=j({color:r,theme:e});return t.isThemeColor&&t.shade===void 0?`var(--mantine-color-${t.color}-text)`:sr(r,e)}const rr={text:"var(--mantine-font-family)",mono:"var(--mantine-font-family-monospace)",monospace:"var(--mantine-font-family-monospace)",heading:"var(--mantine-font-family-headings)",headings:"var(--mantine-font-family-headings)"};function je(r){return typeof r=="string"&&r in rr?rr[r]:r}const Ie=["h1","h2","h3","h4","h5","h6"];function _e(r,e){return typeof r=="string"&&r in e.fontSizes?`var(--mantine-font-size-${r})`:typeof r=="string"&&Ie.includes(r)?`var(--mantine-${r}-font-size)`:typeof r=="number"||typeof r=="string"?o(r):r}function Fe(r){return r}const Le=["h1","h2","h3","h4","h5","h6"];function ze(r,e){return typeof r=="string"&&r in e.lineHeights?`var(--mantine-line-height-${r})`:typeof r=="string"&&Le.includes(r)?`var(--mantine-${r}-line-height)`:r}function He(r){return typeof r=="number"?o(r):r}function Pe(r,e){if(typeof r=="number")return o(r);if(typeof r=="string"){const t=r.replace("-","");if(!(t in e.spacing))return o(r);const n=`--mantine-spacing-${t}`;return r.startsWith("-")?`calc(var(${n}) * -1)`:`var(${n})`}return r}const H={color:sr,textColor:Ee,fontSize:_e,spacing:Pe,identity:Fe,size:He,lineHeight:ze,fontFamily:je};function er(r){return r.replace("(min-width: ","").replace("em)","")}function We({media:r,...e}){const n=Object.keys(r).sort((i,a)=>Number(er(i))-Number(er(a))).map(i=>({query:i,styles:r[i]}));return{...e,media:n}}function Oe(r){if(typeof r!="object"||r===null)return!1;const e=Object.keys(r);return!(e.length===1&&e[0]==="base")}function Be(r){return typeof r=="object"&&r!==null?"base"in r?r.base:void 0:r}function Ve(r){return typeof r=="object"&&r!==null?B(r).filter(e=>e!=="base"):[]}function De(r,e){return typeof r=="object"&&r!==null&&e in r?r[e]:r}function Ge({styleProps:r,data:e,theme:t}){return We(B(r).reduce((n,i)=>{if(i==="hiddenFrom"||i==="visibleFrom"||i==="sx")return n;const a=e[i],s=Array.isArray(a.property)?a.property:[a.property],f=Be(r[i]);if(!Oe(r[i]))return s.forEach(l=>{n.inlineStyles[l]=H[a.type](f,t)}),n;n.hasResponsiveStyles=!0;const c=Ve(r[i]);return s.forEach(l=>{f&&(n.styles[l]=H[a.type](f,t)),c.forEach(p=>{const u=`(min-width: ${t.breakpoints[p]})`;n.media[u]={...n.media[u],[l]:H[a.type](De(r[i],p),t)}})}),n},{hasResponsiveStyles:!1,styles:{},inlineStyles:{},media:{}}))}function Ue(){return`__m__-${y.useId().replace(/:/g,"")}`}function fr(r){return r.startsWith("data-")?r:`data-${r}`}function Ye(r){return Object.keys(r).reduce((e,t)=>{const n=r[t];return n===void 0||n===""||n===!1||n===null||(e[fr(t)]=r[t]),e},{})}function cr(r){return r?typeof r=="string"?{[fr(r)]:!0}:Array.isArray(r)?[...r].reduce((e,t)=>({...e,...cr(t)}),{}):Ye(r):null}function O(r,e){return Array.isArray(r)?[...r].reduce((t,n)=>({...t,...O(n,e)}),{}):typeof r=="function"?r(e):r??{}}function Xe({theme:r,style:e,vars:t,styleProps:n}){const i=O(e,r),a=O(t,r);return{...i,...a,...n}}const lr=y.forwardRef(({component:r,style:e,__vars:t,className:n,variant:i,mod:a,size:s,hiddenFrom:f,visibleFrom:c,lightHidden:l,darkHidden:p,renderRoot:u,...d},m)=>{const h=I(),w=r||"div",{styleProps:$,rest:T}=Ne(d),S=Zr(),v=S==null?void 0:S($.sx),g=Ue(),C=Ge({styleProps:$,theme:h,data:Ae}),N={ref:m,style:Xe({theme:h,style:e,vars:t,styleProps:C.inlineStyles}),className:E(n,v,{[g]:C.hasResponsiveStyles,"mantine-light-hidden":l,"mantine-dark-hidden":p,[`mantine-hidden-from-${f}`]:f,[`mantine-visible-from-${c}`]:c}),"data-variant":i,"data-size":ar(s)?void 0:s||void 0,...cr(a),...T};return k.jsxs(k.Fragment,{children:[C.hasResponsiveStyles&&k.jsx(Re,{selector:`.${g}`,styles:C.styles,media:C.media}),typeof u=="function"?u(N):k.jsx(w,{...N})]})});lr.displayName="@mantine/core/Box";const ft=lr;function ur(r){return r}function ct(r){const e=y.forwardRef(r);return e.extend=ur,e}function lt(r){const e=y.forwardRef(r);return e.extend=ur,e}export{Ne as A,ft as B,D as C,or as D,P as E,et as F,X as G,Re as I,Yr as M,Kr as a,it as b,at as c,tr as d,qe as e,de as f,ae as g,st as h,ct as i,ot as j,B as k,nt as l,E as m,Je as n,tt as o,j as p,lt as q,o as r,R as s,rt as t,I as u,Ze as v,V as w,Ue as x,x as y,Y as z};