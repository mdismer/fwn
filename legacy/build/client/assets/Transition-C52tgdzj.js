import{r as e,j as g,n as $}from"./index-VXuqoyi4.js";import{q as v,h as D,j,B,r as s,u as L}from"./polymorphic-factory-Chi_ekPl.js";function M(t,n){try{return t.addEventListener("change",n),()=>t.removeEventListener("change",n)}catch{return t.addListener(n),()=>t.removeListener(n)}}function U(t,n){return typeof window<"u"&&"matchMedia"in window?window.matchMedia(t).matches:!1}function I(t,n,{getInitialValueInEffect:r}={getInitialValueInEffect:!0}){const[i,o]=e.useState(r?n:U(t)),a=e.useRef();return e.useEffect(()=>{if("matchMedia"in window)return a.current=window.matchMedia(t),o(a.current.matches),M(a.current,c=>o(c.matches))},[t]),i}const z=typeof document<"u"?e.useLayoutEffect:e.useEffect;function _(t,n){const r=e.useRef(!1);e.useEffect(()=>()=>{r.current=!1},[]),e.useEffect(()=>{if(r.current)return t();r.current=!0},n)}function N(t,n){return I("(prefers-reduced-motion: reduce)",t,n)}var R={root:"m_87cf2631"};const A={__staticSelector:"UnstyledButton"},F=v((t,n)=>{const r=D("UnstyledButton",A,t),{className:i,component:o="button",__staticSelector:a,unstyled:c,classNames:u,styles:y,style:l,...f}=r,p=j({name:a,props:r,classes:R,className:i,style:l,classNames:u,styles:y,unstyled:c});return g.jsx(B,{...p("root",{focusable:!0}),component:o,ref:n,type:o==="button"?"button":void 0,...f})});F.classes=R;F.displayName="@mantine/core/UnstyledButton";const d=t=>({in:{opacity:1,transform:"scale(1)"},out:{opacity:0,transform:`scale(.9) translateY(${s(t==="bottom"?10:-10)})`},transitionProperty:"transform, opacity"}),x={fade:{in:{opacity:1},out:{opacity:0},transitionProperty:"opacity"},"fade-up":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:`translateY(${s(30)}`},transitionProperty:"opacity, transform"},"fade-down":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:`translateY(${s(-30)}`},transitionProperty:"opacity, transform"},"fade-left":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:`translateX(${s(30)}`},transitionProperty:"opacity, transform"},"fade-right":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:`translateX(${s(-30)}`},transitionProperty:"opacity, transform"},scale:{in:{opacity:1,transform:"scale(1)"},out:{opacity:0,transform:"scale(0)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"scale-y":{in:{opacity:1,transform:"scaleY(1)"},out:{opacity:0,transform:"scaleY(0)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"scale-x":{in:{opacity:1,transform:"scaleX(1)"},out:{opacity:0,transform:"scaleX(0)"},common:{transformOrigin:"left"},transitionProperty:"transform, opacity"},"skew-up":{in:{opacity:1,transform:"translateY(0) skew(0deg, 0deg)"},out:{opacity:0,transform:`translateY(${s(-20)}) skew(-10deg, -5deg)`},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"skew-down":{in:{opacity:1,transform:"translateY(0) skew(0deg, 0deg)"},out:{opacity:0,transform:`translateY(${s(20)}) skew(-10deg, -5deg)`},common:{transformOrigin:"bottom"},transitionProperty:"transform, opacity"},"rotate-left":{in:{opacity:1,transform:"translateY(0) rotate(0deg)"},out:{opacity:0,transform:`translateY(${s(20)}) rotate(-5deg)`},common:{transformOrigin:"bottom"},transitionProperty:"transform, opacity"},"rotate-right":{in:{opacity:1,transform:"translateY(0) rotate(0deg)"},out:{opacity:0,transform:`translateY(${s(20)}) rotate(5deg)`},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"slide-down":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:"translateY(-100%)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"slide-up":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:"translateY(100%)"},common:{transformOrigin:"bottom"},transitionProperty:"transform, opacity"},"slide-left":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(100%)"},common:{transformOrigin:"left"},transitionProperty:"transform, opacity"},"slide-right":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(-100%)"},common:{transformOrigin:"right"},transitionProperty:"transform, opacity"},pop:{...d("bottom"),common:{transformOrigin:"center center"}},"pop-bottom-left":{...d("bottom"),common:{transformOrigin:"bottom left"}},"pop-bottom-right":{...d("bottom"),common:{transformOrigin:"bottom right"}},"pop-top-left":{...d("top"),common:{transformOrigin:"top left"}},"pop-top-right":{...d("top"),common:{transformOrigin:"top right"}}},E={entering:"in",entered:"in",exiting:"out",exited:"out","pre-exiting":"out","pre-entering":"out"};function V({transition:t,state:n,duration:r,timingFunction:i}){const o={transitionDuration:`${r}ms`,transitionTimingFunction:i};return typeof t=="string"?t in x?{transitionProperty:x[t].transitionProperty,...o,...x[t].common,...x[t][E[n]]}:{}:{transitionProperty:t.transitionProperty,...o,...t.common,...t[E[n]]}}function k({duration:t,exitDuration:n,timingFunction:r,mounted:i,onEnter:o,onExit:a,onEntered:c,onExited:u}){const y=L(),l=N(),f=y.respectReducedMotion?l:!1,[p,h]=e.useState(f?0:t),[O,w]=e.useState(i?"entered":"exited"),S=e.useRef(-1),T=e.useRef(-1),X=m=>{const P=m?o:a,Y=m?c:u;window.clearTimeout(S.current);const b=f?0:m?t:n;h(b),b===0?(typeof P=="function"&&P(),typeof Y=="function"&&Y(),w(m?"entered":"exited")):T.current=requestAnimationFrame(()=>{$.flushSync(()=>{w(m?"pre-entering":"pre-exiting")}),T.current=requestAnimationFrame(()=>{typeof P=="function"&&P(),w(m?"entering":"exiting"),S.current=window.setTimeout(()=>{typeof Y=="function"&&Y(),w(m?"entered":"exited")},b)})})};return _(()=>{X(i)},[i]),e.useEffect(()=>()=>{window.clearTimeout(S.current),cancelAnimationFrame(T.current)},[]),{transitionDuration:p,transitionStatus:O,transitionTimingFunction:r||"ease"}}function C({keepMounted:t,transition:n="fade",duration:r=250,exitDuration:i=r,mounted:o,children:a,timingFunction:c="ease",onExit:u,onEntered:y,onEnter:l,onExited:f}){const{transitionDuration:p,transitionStatus:h,transitionTimingFunction:O}=k({mounted:o,exitDuration:i,duration:r,timingFunction:c,onExit:u,onEntered:y,onEnter:l,onExited:f});return p===0?o?g.jsx(g.Fragment,{children:a({})}):t?a({display:"none"}):null:h==="exited"?t?a({display:"none"}):null:g.jsx(g.Fragment,{children:a(V({transition:n,duration:p,state:h,timingFunction:O}))})}C.displayName="@mantine/core/Transition";export{C as T,F as U,_ as a,z as u};
