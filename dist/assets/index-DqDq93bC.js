import{_ as h,b,r as f,o as _,c as v,f as a,g as r,w as d,h as t,F as L,b2 as V,a5 as P,E as $,a2 as y,i as k}from"./index-BvrlI3rd.js";/* empty css              */import{F}from"./index-B85MVH_x.js";import{N as B}from"./index-NAKdCZg-.js";import{F as S}from"./index-Dp4oRVwc.js";import{B as N}from"./index-CBKMO47e.js";import"./use-route-BBWwet07.js";import"./use-id-n9qlotU8.js";import"./use-placeholder-DFyJNJBY.js";const U={class:"px-4"},q={class:"bg-white mh rounded-[0.5rem]"},C={class:"bg-white mt-3 mh rounded-[0.5rem]"},T={class:"bg-white mt-3 mh rounded-[0.5rem]"},x={class:"btn mt-3 flex justify-center rounded-md h-[8rem] bg-white"},E={__name:"index",setup(j){const i=b(),m=()=>history.back(),s=f({newpassword:"",mer_phone:"",renewpassword:"",oldpassword:""}),p=async e=>{const o=await V(e);o.code===1?(P(o.msg),i.nologin()):$(o.msg)},u=e=>{if(e!==s.value.newpassword)return!1};return(e,o)=>{const w=B,l=F,c=N,g=S;return _(),v(L,null,[a("header",null,[r(w,{title:e.$t("changeLoginPassword.changeLoginPassword"),border:!1,"left-text":e.$t("goback"),"left-arrow":"",onClickLeft:m},null,8,["title","left-text"])]),a("main",null,[r(g,{onSubmit:o[3]||(o[3]=n=>p(t(s))),class:"mt-10"},{default:d(()=>[a("div",U,[a("div",q,[r(l,{class:"mh rounded-[0.5rem]",label:e.$t("changeLoginPassword.oldpwd"),"label-width":"11rem","input-align":"right",placeholder:e.$t("changeLoginPassword.inputpwd"),type:"password",modelValue:t(s).oldpassword,"onUpdate:modelValue":o[0]||(o[0]=n=>t(s).oldpassword=n),required:""},null,8,["label","placeholder","modelValue"])]),a("div",C,[r(l,{class:"mh rounded-[0.5rem]",label:e.$t("changeLoginPassword.newpwd"),"label-width":"11rem","input-align":"right",placeholder:e.$t("changeLoginPassword.inputpwd"),type:"password",modelValue:t(s).newpassword,"onUpdate:modelValue":o[1]||(o[1]=n=>t(s).newpassword=n),required:""},null,8,["label","placeholder","modelValue"])]),a("div",T,[r(l,{class:"mh rounded-[0.5rem]",label:e.$t("changeLoginPassword.newpwd"),"label-width":"11rem","input-align":"right",placeholder:e.$t("changeLoginPassword.againinput"),type:"password",modelValue:t(s).renewpassword,"onUpdate:modelValue":o[2]||(o[2]=n=>t(s).renewpassword=n),required:"",rules:[{validator:u,message:"两次密码输入不一致"}]},null,8,["label","placeholder","modelValue","rules"])])]),a("div",x,[r(c,{block:"",color:"#009996","native-type":"submit"},{default:d(()=>[y(k(e.$t("changeLoginPassword.submit")),1)]),_:1})])]),_:1})])],64)}}},M=h(E,[["__scopeId","data-v-41e34e67"]]);export{M as default};
