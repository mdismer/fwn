import{j as S}from"./index-VXuqoyi4.js";import{q as j,h as z,j as F,B as N,l as R,t as _,F as B,G,z as P}from"./polymorphic-factory-Chi_ekPl.js";var n={root:"m_b6d8b162"};function q(t){if(t==="start")return"start";if(t==="end"||t)return"end"}const C={inherit:!1},E=R((t,{variant:r,lineClamp:e,gradient:o,size:s,color:a})=>({root:{"--text-fz":_(s),"--text-lh":B(s),"--text-gradient":r==="gradient"?G(o,t):void 0,"--text-line-clamp":typeof e=="number"?e.toString():void 0,"--text-color":a?P(a,t):void 0}})),i=j((t,r)=>{const e=z("Text",C,t),{lineClamp:o,truncate:s,inline:a,inherit:l,gradient:H,span:c,__staticSelector:d,vars:m,className:p,style:u,classNames:x,styles:f,unstyled:g,variant:v,mod:y,size:h,...T}=e,b=F({name:["Text",d],props:e,classes:n,className:p,style:u,classNames:x,styles:f,unstyled:g,vars:m,varsResolver:E});return S.jsx(N,{...b("root",{focusable:!0}),ref:r,component:c?"span":"p",variant:v,mod:[{"data-truncate":q(s),"data-line-clamp":typeof o=="number","data-inline":a,"data-inherit":l},y],size:h,...T})});i.classes=n;i.displayName="@mantine/core/Text";export{i as T};
