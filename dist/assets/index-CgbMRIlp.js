import{_ as le,u as se,a as re,z as ne,r as o,aa as ce,d as ie,o as y,c as $,f as a,g as r,w as i,F as j,a$ as ue,aX as de,E as V,b0 as me,b4 as z,a5 as x,ai as ve,h as he,i as n,a2 as P,j as pe,p as ge,m as _e,b1 as fe,L as we}from"./index-BvrlI3rd.js";import{_ as be,S as ke}from"./index-Ii4UgScz.js";/* empty css              */import{I as ye}from"./index-CqHXZlWv.js";import"./index-tn7Hb5pv.js";import{U as $e}from"./index-DZDlgZf7.js";import{F as Ve}from"./index-B85MVH_x.js";import{N as xe}from"./index-NAKdCZg-.js";import{F as Se}from"./index-Dp4oRVwc.js";import{B as Fe}from"./index-CBKMO47e.js";/* empty css              */import"./use-route-BBWwet07.js";import"./use-id-n9qlotU8.js";import"./use-placeholder-DFyJNJBY.js";const S=p=>(ge("data-v-2460d9ee"),p=p(),_e(),p),Ne=S(()=>a("view",{class:"bg"},null,-1)),Re={class:"mx-3"},Te={class:"flex mb-3 rounded justify-center w-[100%]"},Ue={class:"imgs bg-white"},Be={class:"",style:{height:"calc(100vh - var(--van-nav-bar-height) - 8rem - (100vw - 3rem))"}},De={class:"bg-white mt-3 mh rounded-[0.5rem]"},Ie={class:"bg-white mt-3 mh rounded-[0.5rem]"},Ce={class:"flex text-[#009996] justify-between mt-5 text-sm"},Le={class:"bg-white rounded-[0.5rem] flex justify-between items-center p-3 mt-5"},qe={class:"mt-3 text-base"},je=S(()=>a("span",{class:"text-[#ee0a24] mr-[2px]"},"*",-1)),ze=S(()=>a("div",{class:"h-10"},null,-1)),Pe={class:"btn mt-3 flex justify-center rounded-md h-[8rem] bg-white"},Ee={class:"coins-container"},Ae={class:"title-row"},Me={class:"tip-row"},Xe=["onClick"],Ge={class:"name-row"},He={class:"other-row"},Je={class:"other-row"},Ke={__name:"index",setup(p){const{t:c}=se(),F=re(),E=ne(),u=o("");u.value=E.query.recharge_type;const N=o(""),R=()=>{F.back()},T=o(null),U=o(""),A=(e,t,s,v)=>{T.value.show=!1,U.value=e,b.value=t,B.value=s,D.value=v},g=o(""),_=o(""),b=o(""),k=o(""),B=o(""),D=o(""),d=o([]),M=async()=>{var t,s,v;const e=await ue({type:u.value});d.value=e.data,N.value=e.data.url,d.value.length>0&&(b.value=(t=d.value[0])==null?void 0:t.blockchain,B.value=(s=d.value[0])==null?void 0:s.name,D.value=(v=d.value[0])==null?void 0:v.account)},I=o(0),C=o(0),X=o(null),f=o([]),G=ce(()=>!f.value.length),w=o(""),H=e=>{const t=new FormData;t.append("file",e.file),L(),fe(t).then(s=>{s.code===1?(w.value=s.data.fullurl,x(s.msg)):V(s.msg),z()})},J=()=>{w.value="",f.value=[]},K=async()=>{const e=await de({});I.value=e.data.rate},h=o(null),m=o({image:"",price:0,recharge_type:u.value,currency_type:"USD",network:"",blockchain:"",real_name:"",bank_card:"",bank_name:"",order:""}),O=e=>{h.value=Number(e.target.value),m.value.price=h.value,C.value=(h.value/I.value).toFixed(2)},Q=()=>{if(w.value==""){V(c("walletrecharge.uprechargevoucher"));return}L(),m.value.network=U.value,m.value.blockchain=b.value,m.value.image=w.value,m.value.order=k.value,me(m.value).then(e=>{z(),e.code===1?u.value=="2"?x(e.msg):(x(e.msg),setTimeout(R,1e3)):V(e.msg)})},W=e=>/^[1-9]\d*$/.test(e),L=()=>{ve({message:"",forbidClick:!0,duration:0})};return ie(()=>{M(),K(),u.value=="0"?(g.value=c("recharge.chainDeposit"),_.value=c("withdraw.amount")):u.value=="2"?(g.value=c("recharge.zfbDeposit"),_.value=c("walletrecharge.number")):(g.value=c("recharge.wxDeposit"),_.value=c("walletrecharge.number"))}),(e,t)=>{const s=xe,v=we,Y=ye,q=Ve,Z=$e,ee=Fe,ae=Se,te=ke;return y(),$(j,null,[Ne,a("header",null,[r(s,{title:g.value,border:!1,"left-text":e.$t("goback"),"left-arrow":"",onClickLeft:R},{right:i(()=>[a("span",{onClick:t[0]||(t[0]=l=>he(F).push("/rechargeRecord")),class:"text-white"},n(e.$t("walletrecharge.rechargerecord")),1)]),_:1},8,["title","left-text"])]),a("main",Re,[a("div",Te,[a("div",Ue,[r(Y,{src:N.value,class:"imgs2"},{loading:i(()=>[r(v,{type:"spinner",size:"20"})]),_:1},8,["src"])])]),r(ae,{onSubmit:t[4]||(t[4]=l=>Q()),class:"px-3"},{default:i(()=>[a("div",Be,[a("div",De,[r(q,{class:"mh rounded-[0.5rem]",label:_.value,"label-width":"8rem","input-align":"right",placeholder:e.$t("walletrecharge.inputmoney"),modelValue:h.value,"onUpdate:modelValue":t[1]||(t[1]=l=>h.value=l),required:"",onInput:O,rules:[{required:!0,message:e.$t("walletrecharge.inputmoney")},{validator:W,message:e.$t("walletrecharge.nozero")}]},null,8,["label","placeholder","modelValue","rules"])]),a("div",Ie,[r(q,{class:"mh rounded-[0.5rem]",label:e.$t("rechargerecord.orderNumber"),"label-width":"8rem","input-align":"right",placeholder:e.$t("rechargerecord.orderNumber"),modelValue:k.value,"onUpdate:modelValue":t[2]||(t[2]=l=>k.value=l),required:"",rules:[{required:!0,message:e.$t("rechargerecord.orderNumber")}]},null,8,["label","placeholder","modelValue","rules"])]),a("div",Ce,[a("span",null,n(e.$t("withdraw.actualAmountReceived"))+n(C.value)+" $ ",1)]),a("div",Le,[a("h5",qe,[je,P(n(e.$t("walletrecharge.uprechargevoucher")),1)]),r(Z,{ref_key:"uploadRef1",ref:X,onDelete:J,modelValue:f.value,"onUpdate:modelValue":t[3]||(t[3]=l=>f.value=l),"after-read":H,"max-count":1,"show-upload":G.value,"upload-icon":"plus"},{"preview-cover":i(({file:l})=>[]),_:1},8,["modelValue","show-upload"])]),ze]),a("div",Pe,[r(ee,{block:"",color:"#009996","native-type":"submit"},{default:i(()=>[P(n(e.$t("walletrecharge.submit")),1)]),_:1})])]),_:1})]),r(be,{ref_key:"floatingPanel",ref:T,height:"800px"},{default:i(()=>[a("div",Ee,[a("div",Ae,n(e.$t("walletrecharge.title2")),1),a("div",Me,n(e.$t("walletrecharge.title3")),1),r(te,{direction:"vertical",size:"1rem"},{default:i(()=>[(y(!0),$(j,null,pe(d.value,(l,oe)=>(y(),$("div",{class:"coin-card",key:oe,onClick:Oe=>A(l.network,l.blockchain,l.name,l.account)},[a("div",Ge,n(l.network),1),a("div",He,n(e.$t("walletrecharge.title4"))+" 0.00000001 USDT",1),a("div",Je,n(e.$t("walletrecharge.title5")),1)],8,Xe))),128))]),_:1})])]),_:1},512)],64)}}},ua=le(Ke,[["__scopeId","data-v-2460d9ee"]]);export{ua as default};
