import{_ as h,u as _,b,a as v,r as P,o as $,c as V,f as o,g as r,w as i,h as a,b2 as S,a5 as y,E as k,i as m,a2 as q,p as x,m as B}from"./index-BvrlI3rd.js";/* empty css              */import{F}from"./index-B85MVH_x.js";import{N as I}from"./index-NAKdCZg-.js";import{F as L}from"./index-Dp4oRVwc.js";import{B as N}from"./index-CBKMO47e.js";import"./use-route-BBWwet07.js";import"./use-id-n9qlotU8.js";import"./use-placeholder-DFyJNJBY.js";const U=n=>(x("data-v-38592a90"),n=n(),B(),n),C={class:"box"},T={class:"mx-3 mt-10"},E={class:"ml-3 pt-1 font-semibold text-3xl",style:{color:"#141A52"}},j={class:"mx-4 item"},A={class:"mx-4 item"},D={class:"mx-4 item"},Q={class:"mx-3 mt-20 flex justify-center items-center rounded-md"},R=U(()=>o("div",{class:"h-5"},null,-1)),z={__name:"index",setup(n){_(),b();const u=v(),p=()=>history.back(),t=P({newpassword:"",mer_phone:"",oldpassword:"",renewpassword:""}),c=async e=>{const s=await S(e);s.code===1?(y(s.msg),u.push("/login")):k(s.msg)};return(e,s)=>{const g=I,d=F,w=N,f=L;return $(),V("div",C,[o("header",null,[r(g,{"left-text":e.$t("goback"),"left-arrow":"",onClickLeft:p},null,8,["left-text"])]),o("main",null,[r(f,{onSubmit:s[3]||(s[3]=l=>c(a(t))),class:""},{default:i(()=>[o("div",T,[o("span",E,m(e.$t("forgetPwd.changeLoginPassword")),1)]),o("div",j,[r(d,{"label-width":"7.5rem",class:"rounded-lg",required:"",modelValue:a(t).mer_phone,"onUpdate:modelValue":s[0]||(s[0]=l=>a(t).mer_phone=l),label:e.$t("forgetPwd.tel"),"input-align":"right",placeholder:e.$t("forgetPwd.telmessage"),rules:[{required:!0,message:e.$t("forgetPwd.telmessage")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",A,[r(d,{"label-width":"10rem",class:"rounded-lg",required:"",modelValue:a(t).newpassword,"onUpdate:modelValue":s[1]||(s[1]=l=>a(t).newpassword=l),label:e.$t("forgetPwd.pwd"),"input-align":"right",placeholder:e.$t("forgetPwd.inputpwd"),rules:[{required:!0,message:e.$t("forgetPwd.inputpwd")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",D,[r(d,{"label-width":"10rem",class:"rounded-lg",required:"",modelValue:a(t).renewpassword,"onUpdate:modelValue":s[2]||(s[2]=l=>a(t).renewpassword=l),label:e.$t("forgetPwd.againpwd"),"input-align":"right",placeholder:e.$t("forgetPwd.againinput"),rules:[{required:!0,message:e.$t("forgetPwd.message")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",Q,[r(w,{"native-type":"submit",class:"btn"},{default:i(()=>[q(m(e.$t("forgetPwd.submit")),1)]),_:1})]),R]),_:1})])])}}},Z=h(z,[["__scopeId","data-v-38592a90"]]);export{Z as default};
