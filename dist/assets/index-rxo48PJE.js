import{ba as L,N as B,O as C,az as R,ao as w,R as N,r as g,S as _,aa as j,V as x,bb as q,q as y,aq as A,W as O,g as r,X as U,ac as m,bc as V,L as z,$ as F}from"./index-BvrlI3rd.js";const H=Symbol(),I=()=>L(H,null),[K,o,M]=B("list"),W={error:Boolean,offset:C(300),loading:Boolean,disabled:Boolean,finished:Boolean,scroller:Object,errorText:String,direction:R("down"),loadingText:String,finishedText:String,immediateCheck:w};var X=N({name:K,props:W,emits:["load","update:error","update:loading"],setup(e,{emit:c,slots:a}){const l=g(e.loading),u=g(),h=g(),s=I(),T=_(u),v=j(()=>e.scroller||T.value),n=()=>{U(()=>{if(l.value||e.finished||e.disabled||e.error||(s==null?void 0:s.value)===!1)return;const{direction:t}=e,d=+e.offset,i=m(v);if(!i.height||V(u))return;let f=!1;const b=m(h);t==="up"?f=i.top-b.top<=d:f=b.bottom-i.bottom<=d,f&&(l.value=!0,c("update:loading",!0),c("load"))})},S=()=>{if(e.finished){const t=a.finished?a.finished():e.finishedText;if(t)return r("div",{class:o("finished-text")},[t])}},k=()=>{c("update:error",!1),n()},P=()=>{if(e.error){const t=a.error?a.error():e.errorText;if(t)return r("div",{role:"button",class:o("error-text"),tabindex:0,onClick:k},[t])}},E=()=>{if(l.value&&!e.finished&&!e.disabled)return r("div",{class:o("loading")},[a.loading?a.loading():r(z,{class:o("loading-icon")},{default:()=>[e.loadingText||M("loading")]})])};return x(()=>[e.loading,e.finished,e.error],n),s&&x(s,t=>{t&&n()}),q(()=>{l.value=e.loading}),y(()=>{e.immediateCheck&&n()}),A({check:n}),O("scroll",n,{target:v,passive:!0}),()=>{var t;const d=(t=a.default)==null?void 0:t.call(a),i=r("div",{ref:h,class:o("placeholder")},null);return r("div",{ref:u,role:"feed",class:o(),"aria-busy":l.value},[e.direction==="down"?d:i,E(),S(),P(),e.direction==="up"?d:i])}}});const $=F(X);export{$ as L,H as T};
