import{j as y}from"./index-VXuqoyi4.js";import{r as z,i as S,h as x,j as $,B as T,l as j}from"./polymorphic-factory-Chi_ekPl.js";const w=["h1","h2","h3","h4","h5","h6"];function W(e,i){const t=i!==void 0?i:`h${e}`;return w.includes(t)?{fontSize:`var(--mantine-${t}-font-size)`,fontWeight:`var(--mantine-${t}-font-weight)`,lineHeight:`var(--mantine-${t}-line-height)`}:{fontSize:z(t),fontWeight:`var(--mantine-h${e}-font-weight)`,lineHeight:`var(--mantine-h${e}-line-height)`}}var r={root:"m_8a5d1357"};const b={order:1},H=j((e,{order:i,size:t,lineClamp:s,textWrap:o})=>{const n=W(i,t);return{root:{"--title-fw":n.fontWeight,"--title-lh":n.lineHeight,"--title-fz":n.fontSize,"--title-line-clamp":typeof s=="number"?s.toString():void 0,"--title-text-wrap":o}}}),l=S((e,i)=>{const t=x("Title",b,e),{classNames:s,className:o,style:n,styles:h,unstyled:m,order:a,vars:c,size:f,variant:p,lineClamp:u,textWrap:N,mod:g,...v}=t,d=$({name:"Title",props:t,classes:r,className:o,style:n,classNames:s,styles:h,unstyled:m,vars:c,varsResolver:H});return[1,2,3,4,5,6].includes(a)?y.jsx(T,{...d("root"),component:`h${a}`,variant:p,ref:i,mod:[{order:a,"data-line-clamp":typeof u=="number"},g],size:f,...v}):null});l.classes=r;l.displayName="@mantine/core/Title";export{l as T};