import{_ as f,r as i,o as b,c as P,f as t,g as l,w as m,h as n,F as y,b3 as _,a5 as v,E as V,A as $,a2 as k,i as F}from"./index-BvrlI3rd.js";/* empty css              */import{F as B}from"./index-B85MVH_x.js";import{N}from"./index-NAKdCZg-.js";import{F as x}from"./index-Dp4oRVwc.js";import{B as S}from"./index-CBKMO47e.js";import"./use-route-BBWwet07.js";import"./use-id-n9qlotU8.js";import"./use-placeholder-DFyJNJBY.js";const q={class:"px-4"},C={class:"bg-white mt-3 mh rounded-[0.5rem]"},T={class:"bg-white mt-3 mh rounded-[0.5rem]"},U={class:"bg-white mt-3 mh rounded-[0.5rem]"},E={class:"btn mt-3 flex justify-center rounded-md h-[8rem] bg-white"},L={__name:"index",setup(j){const u=()=>history.back(),o=i({old:"",new:"",is_verify:"1"}),r=i(""),p=async e=>{const a=await _(e);a.code===1?v(a.msg):V(a.msg)},c=e=>{if(e!==o.value.new)return!1};return(e,a)=>{const h=N,d=B,w=S,g=x;return b(),P(y,null,[t("header",null,[l(h,{title:e.$t("changePayPassword.changePayPassword"),"left-text":e.$t("goback"),"left-arrow":"",onClickLeft:u},null,8,["title","left-text"])]),t("main",null,[l(g,{onSubmit:a[3]||(a[3]=s=>p(n(o))),class:"mt-10"},{default:m(()=>[t("div",q,[t("div",C,[l(d,{class:"mh rounded-[0.5rem]",label:e.$t("changePayPassword.oldpwd"),"label-width":"11rem","input-align":"right",placeholder:e.$t("changePayPassword.inputpwd"),type:"password",modelValue:n(o).old,"onUpdate:modelValue":a[0]||(a[0]=s=>n(o).old=s),required:"",maxlength:"6"},null,8,["label","placeholder","modelValue"])]),t("div",T,[l(d,{class:"mh rounded-[0.5rem]",label:e.$t("changePayPassword.newpwd"),"label-width":"11rem","input-align":"right",placeholder:e.$t("changePayPassword.inputpwd"),type:"password",modelValue:n(o).new,"onUpdate:modelValue":a[1]||(a[1]=s=>n(o).new=s),required:"",maxlength:"6"},null,8,["label","placeholder","modelValue"])]),t("div",U,[l(d,{class:"mh rounded-[0.5rem]",label:e.$t("changePayPassword.againinput"),"label-width":"12.5rem","input-align":"right",placeholder:e.$t("changePayPassword.againinput"),type:"password",modelValue:n(r),"onUpdate:modelValue":a[2]||(a[2]=s=>$(r)?r.value=s:null),required:"",rules:[{validator:c,message:e.$t("changePayPassword.message")}],maxlength:"6"},null,8,["label","placeholder","modelValue","rules"])])]),t("div",E,[l(w,{block:"",color:"#009996","native-type":"submit"},{default:m(()=>[k(F(e.$t("changePayPassword.submit")),1)]),_:1})])]),_:1})])],64)}}},K=f(L,[["__scopeId","data-v-ffb9f70d"]]);export{K as default};
