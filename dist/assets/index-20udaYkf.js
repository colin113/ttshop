import{_ as re,u as ie,a as de,r,b as ue,aa as A,q as me,o as x,c as q,f as o,i,g as a,h as s,w as u,bP as D,s as E,bs as z,A as S,F as ce,bQ as ge,a5 as b,E as p,aP as pe,a2 as g,p as fe,m as he,bR as ve,b1 as N}from"./index-BvrlI3rd.js";import{A as be}from"./index-C2xjknpb.js";import"./index-CqHXZlWv.js";import"./index-tn7Hb5pv.js";import{U as _e}from"./index-DZDlgZf7.js";import{N as we}from"./index-NAKdCZg-.js";import{F as $e}from"./index-B85MVH_x.js";/* empty css              */import{_ as ye,a as Ve}from"./logo-Bw7xjJCN.js";import{B as ke}from"./index-CBKMO47e.js";import{F as xe}from"./index-Dp4oRVwc.js";import"./use-placeholder-DFyJNJBY.js";import"./use-route-BBWwet07.js";import"./use-id-n9qlotU8.js";const qe="/assets/front-CMcjP2e_.png",Se="/assets/back-eUex8Gvd.png",f=_=>(fe("data-v-0eaadfcd"),_=_(),he(),_),Ue={class:"page text-white"},Ce={class:"mx-3 flex justify-between items-center mt-3"},Fe={class:"ml-3 pt-1 font-semibold text-3xl text-black",style:{color:"#fff"}},Pe={class:"ml-3 pt-0.5"},Ae=f(()=>o("div",{class:"flex justify-center items-center flex-col mt-40"},[o("img",{style:{width:"5rem"},src:Ve,alt:""}),o("div",{class:"mt-2"},[o("span",{class:"font-semibold text-3xl text-white"},"TikTok Mall")])],-1)),Ee={key:0,class:"mt-32"},Ne={class:"pt-10 px-10"},Re={class:"pt-6 px-10"},Ie={key:0,class:"h-3/5 rounded-t-2xl fixed bottom-0",style:{width:"100vw",height:"60%"}},Le={class:"mx-3"},Te={class:"text-white mb-3"},je=f(()=>o("span",{style:{color:"var(--van-field-required-mark-color)"}},"*",-1)),De={class:"mx-3"},ze={class:"text-white my-3"},Be=f(()=>o("span",{style:{color:"var(--van-field-required-mark-color)"}},"*",-1)),Me={class:"flex mx-3 justify-between mt-6"},Ge={class:"text-white"},He={class:"bg-black mx-3 h-16 flex justify-center items-center text-white mt-10"},Oe={key:0,class:"bg-white overflow-y-auto rounded-t-2xl fixed bottom-0 pb-6",style:{width:"100vw",height:"100%","border-radius":"0","background-color":"#F8F8F8"}},Qe={class:"mx-3"},Je={class:"ml-3 pt-1 font-semibold text-3xl text-black",style:{color:"#141A52"}},Ke={class:"mx-3 item-ts",style:{height:"6.57rem"}},We={class:"text-black mb-3"},Xe=f(()=>o("span",{style:{color:"var(--van-field-required-mark-color)"}},"*",-1)),Ye={class:"right"},Ze={class:"mx-3 item h42"},el={class:"mx-3 item h42"},ll={class:"mx-3 item h42"},ol={class:"mx-3 item h42"},tl={class:"mx-3 item h42"},sl={class:"mx-3 item flex-column",style:{"padding-bottom":".5rem"}},al={class:"text-black my-3"},nl=f(()=>o("span",{style:{color:"var(--van-field-required-mark-color)"}},"*",-1)),rl={class:"text-black flex justify-between imgs"},il={class:"flex flex-col justify-center items-center"},dl=f(()=>o("img",{src:qe,style:{height:"6rem",width:"10rem"}},null,-1)),ul={class:"mt-3"},ml={class:"text-gray-600",style:{color:"#AEAEAE"}},cl={class:"flex flex-col justify-center items-center"},gl=f(()=>o("img",{src:Se,style:{height:"6rem",width:"10rem"}},null,-1)),pl={class:"mt-3"},fl={class:"text-gray-600",style:{color:"#AEAEAE"}},hl={class:"mx-3 item h42"},vl={class:"mx-3 item h42"},bl={class:"mx-3 item h42"},_l={class:"mx-3 item h42"},wl={class:"flex text-black mx-3 mt-3",style:{padding:"0 1rem","padding-bottom":"1rem"}},$l={class:""},yl={class:"mx-3 rounded-lg justify-center items-center text-white mt-6",style:{padding:"0 1rem"}},Vl={__name:"index",setup(_){const{locale:B,t:R}=ie(),M=de(),I=new URLSearchParams(window.location.search).get("mer"),G=()=>{h.value=!0},U=r([]),C=r([{chinese_name:"英语",createtime:1712824643,file_name:"en",id:2,is_default:1,language_name:"English",status:1},{id:1,language_name:"中文",chinese_name:"中文",file_name:"zh-CN",status:1,is_default:0,createtime:1712824643}]),L=r([]),H=()=>{L.value=C.value.map(l=>({name:l.language_name,file_name:l.file_name})),U.value=L.value,console.log(U.value),localStorage.getItem("hasExecutedFunction")||(console.log(C.value),C.value.forEach(l=>{l.is_default==1&&(localStorage.setItem("lang",l.file_name),location.reload())}),localStorage.setItem("hasExecutedFunction","true"))},T=r({lang:""}),h=r(!1),O=e=>{h.value=!1,T.value.lang=e.file_name,B.value=e.file_name,localStorage.setItem("lang",e.file_name),ge(T.value).then(l=>{l.code===1?(console.log(1),b(l.msg)):p(l.msg)}),location.reload()},Q=ue().loginAction,v=r({account:"",password:""}),c=r(R("")),J=async()=>{await Q(v.value)},n=r({mer_avatar:"",mer_name:"",mer_address:"",real_name:"",country:"",images:"",mer_email:"",mer_phone:"",password:"",repassword:"",code:"",mer:""});I&&(n.value.mer=I);const K=async()=>{if(!w.value)return p("Please upload the front of your ID photo");if(!F.value)return p("Please upload the back of your ID photo");const e=await ve(n.value);e.code===1?(b(e.msg),c.value=R("login.login")):p(e.msg)},w=r(""),F=r("");r("");const W=r(null),$=r([]),X=A(()=>!$.value.length),Y=r(null),y=r([]),Z=A(()=>!y.value.length),ee=r(null),V=r([]),le=A(()=>!V.value.length),oe=e=>{const l=new FormData;l.append("file",e.file),N(l).then(d=>{d.code===1?(n.value.mer_avatar=d.data.fullurl,b(d.msg)):p(d.msg)})},te=e=>{const l=new FormData;l.append("file",e.file),N(l).then(d=>{d.code===1?(b(d.msg),w.value=d.data.fullurl,console.log(w.value)):p(d.msg)})},se=e=>{const l=new FormData;l.append("file",e.file),N(l).then(d=>{d.code===1?(b(d.msg),F.value=d.data.fullurl,n.value.images=w.value+","+F.value):p(d.msg)})};return me(()=>{H()}),(e,l)=>{const d=pe,k=ke,m=$e,j=xe,ae=we,P=_e,ne=be;return x(),q(ce,null,[o("img",{src:ye,class:"bg",onClick:l[0]||(l[0]=t=>c.value="")}),o("div",Ue,[o("header",null,[o("div",Ce,[o("span",Fe,i(e.$t("login.login")),1),o("span",Pe,[a(d,{name:"earth",size:"1.6rem",color:"#fff",onClick:l[1]||(l[1]=t=>G())})])])]),o("main",null,[Ae,s(c)?E("",!0):(x(),q("div",Ee,[o("div",Ne,[a(k,{class:"btn",style:{height:"48px",color:"#009996"},round:"",block:"",color:"#fff",onClick:l[2]||(l[2]=D(t=>c.value=e.$t("login.register"),["stop"]))},{default:u(()=>[g(i(e.$t("login.register")),1)]),_:1})]),o("div",Re,[a(k,{class:"btn",style:{height:"48px",color:"#fff"},round:"",block:"",color:"#009996",onClick:l[3]||(l[3]=D(t=>c.value=e.$t("login.login"),["stop"]))},{default:u(()=>[g(i(e.$t("login.login")),1)]),_:1})])])),a(z,{name:"van-slide-up"},{default:u(()=>[s(c)===e.$t("login.login")?(x(),q("div",Ie,[a(j,{onSubmit:l[8]||(l[8]=t=>J()),class:"mx-3 mt-6 login"},{default:u(()=>[o("div",Le,[o("div",Te,[je,g(i(e.$t("login.phoneNumber")),1)]),o("div",null,[a(m,{class:"rounded-lg","preview-size":"4rem",style:{color:"#fff"},placeholder:e.$t("login.enterPhoneNumberOrEmail"),modelValue:s(v).account,"onUpdate:modelValue":l[4]||(l[4]=t=>s(v).account=t),required:"",rules:[{required:!0,message:e.$t("login.enterPhoneNumberOrEmail")}]},null,8,["placeholder","modelValue","rules"])])]),o("div",De,[o("div",ze,[Be,g(i(e.$t("login.Password")),1)]),o("div",null,[a(m,{class:"border border-gray-500 border-dotted rounded-lg",placeholder:e.$t("login.enterPassword"),modelValue:s(v).password,"onUpdate:modelValue":l[5]||(l[5]=t=>s(v).password=t),required:"",type:"password",rules:[{required:!0,message:e.$t("login.enterPassword")}]},null,8,["placeholder","modelValue","rules"])])]),o("div",Me,[o("div",null,[o("span",Ge,i(e.$t("login.noAccount")),1),o("span",{class:"pl-1.5 text-blue-500",style:{color:"#009996"},onClick:l[6]||(l[6]=t=>c.value=e.$t("login.register"))},i(e.$t("login.clickToRegister")),1)]),o("div",null,[o("span",{class:"text-blue-500",style:{color:"#009996"},onClick:l[7]||(l[7]=t=>s(M).push("/forgetPwd"))},i(e.$t("login.forgotPassword")),1)])]),o("div",He,[a(k,{style:{"background-color":"#009996"},"native-type":"submit",onClick:e.toHome},{default:u(()=>[g(i(e.$t("login.login")),1)]),_:1},8,["onClick"])])]),_:1})])):E("",!0)]),_:1}),a(z,{name:"van-slide-up"},{default:u(()=>[s(c)===e.$t("login.register")?(x(),q("div",Oe,[a(ae,{style:{color:"#000 !important","background-color":"#F8F8F8 !important"},"left-text":e.$t("goback"),placeholder:"",fixed:"","left-arrow":"",onClickLeft:l[9]||(l[9]=t=>c.value="")},null,8,["left-text"]),o("div",Qe,[o("span",Je,i(e.$t("login.TiTok_Mall")),1)]),o("div",null,[a(j,{onSubmit:l[23]||(l[23]=t=>K()),class:"mx-3 mt-6"},{default:u(()=>[o("div",Ke,[o("div",We,[Xe,g(i(e.$t("login.storeLogo")),1)]),o("div",Ye,[a(P,{ref_key:"uploadRef1",ref:W,modelValue:s($),"onUpdate:modelValue":l[10]||(l[10]=t=>S($)?$.value=t:null),"show-upload":s(X),"max-count":1,"preview-size":"4rem","upload-icon":"plus","after-read":oe},{"preview-cover":u(({file:t})=>[]),_:1},8,["modelValue","show-upload"])])]),o("div",Ze,[a(m,{class:"rounded-lg",required:"",modelValue:s(n).mer_name,"onUpdate:modelValue":l[11]||(l[11]=t=>s(n).mer_name=t),label:e.$t("login.storeName"),"input-align":"right","label-width":"7rem",placeholder:e.$t("login.enterStorename"),rules:[{required:!0,message:e.$t("login.enterStorename")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",el,[a(m,{"label-width":"8rem",class:"rounded-lg",required:"",modelValue:s(n).mer_address,"onUpdate:modelValue":l[12]||(l[12]=t=>s(n).mer_address=t),label:e.$t("login.storeAddress"),"input-align":"right",placeholder:e.$t("login.enterStoreAddress"),rules:[{required:!0,message:e.$t("login.enterStoreAddress")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",ll,[a(m,{"label-width":"7rem",class:"rounded-lg",required:"",modelValue:s(n).country,"onUpdate:modelValue":l[13]||(l[13]=t=>s(n).country=t),label:e.$t("login.country"),"input-align":"right",placeholder:e.$t("login.enterCountry"),rules:[{required:!0,message:e.$t("login.enterCountry")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",ol,[a(m,{"label-width":"9rem",class:"rounded-lg",required:"",modelValue:s(n).mer_phone,"onUpdate:modelValue":l[14]||(l[14]=t=>s(n).mer_phone=t),label:e.$t("login.phoneNumber"),"input-align":"right",placeholder:e.$t("login.uploadPhoneNumber"),rules:[{required:!0,message:e.$t("login.uploadPhoneNumber")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",tl,[a(m,{"label-width":"7rem",class:"rounded-lg",required:"",modelValue:s(n).real_name,"onUpdate:modelValue":l[15]||(l[15]=t=>s(n).real_name=t),label:e.$t("login.realName"),"input-align":"right",placeholder:e.$t("login.enterRealName"),rules:[{required:!0,message:e.$t("login.enterRealName")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",sl,[o("div",al,[nl,g(" "+i(e.$t("login.idCardUpload")),1)]),o("div",rl,[o("div",il,[a(P,{ref_key:"uploadRef2",ref:Y,modelValue:s(y),"onUpdate:modelValue":l[16]||(l[16]=t=>S(y)?y.value=t:null),"show-upload":s(Z),"max-count":1,"upload-icon":"plus","after-read":te,"preview-size":["10rem","6rem"]},{"preview-cover":u(({file:t})=>[]),default:u(()=>[dl]),_:1},8,["modelValue","show-upload"]),o("div",ul,[o("span",ml,i(e.$t("login.idCardFront")),1)])]),o("div",cl,[a(P,{ref_key:"uploadRef3",ref:ee,modelValue:s(V),"onUpdate:modelValue":l[17]||(l[17]=t=>S(V)?V.value=t:null),"show-upload":s(le),"max-count":1,"upload-icon":"plus","preview-size":["10rem","6rem"],"after-read":se},{"preview-cover":u(({file:t})=>[]),default:u(()=>[gl]),_:1},8,["modelValue","show-upload"]),o("div",pl,[o("span",fl,i(e.$t("login.idCardback")),1)])])])]),o("div",hl,[a(m,{"label-width":"7rem",class:"rounded-lg",required:"",modelValue:s(n).mer_email,"onUpdate:modelValue":l[18]||(l[18]=t=>s(n).mer_email=t),label:e.$t("login.email"),"input-align":"right",placeholder:e.$t("login.enterEmail"),rules:[{required:!0,message:e.$t("login.enterEmail")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",vl,[a(m,{"label-width":"10rem",class:"rounded-lg",required:"",modelValue:s(n).password,"onUpdate:modelValue":l[19]||(l[19]=t=>s(n).password=t),label:e.$t("login.loginPassword"),"input-align":"right",placeholder:e.$t("login.enterLoginPassword"),rules:[{required:!0,message:e.$t("login.enterLoginPassword")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",bl,[a(m,{"label-width":"11.5rem",class:"rounded-lg",required:"",modelValue:s(n).repassword,"onUpdate:modelValue":l[20]||(l[20]=t=>s(n).repassword=t),label:e.$t("login.confirmLoginPassword"),"input-align":"right",placeholder:e.$t("login.enterPasswordAgain"),rules:[{required:!0,message:e.$t("login.enterPasswordAgain")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",_l,[a(m,{"label-width":"8rem",class:"rounded-lg",required:"",modelValue:s(n).mer,"onUpdate:modelValue":l[21]||(l[21]=t=>s(n).mer=t),label:e.$t("login.invitationCode"),"input-align":"right",placeholder:e.$t("login.enterInvitationCode"),rules:[{required:!0,message:e.$t("login.enterInvitationCode")}]},null,8,["modelValue","label","placeholder","rules"])]),o("div",wl,[o("span",$l,i(e.$t("login.alreadyHaveAccount")),1),o("span",{class:"text-blue-500 pl-3",onClick:l[22]||(l[22]=t=>c.value=e.$t("login.login"))},i(e.$t("login.backToLogin")),1)]),o("div",yl,[a(k,{"native-type":"submit",style:{"background-color":"#009996",height:"4rem","border-radius":"6px 6px 6px 6px"}},{default:u(()=>[g(i(e.$t("login.register")),1)]),_:1})])]),_:1})])])):E("",!0)]),_:1})])]),a(ne,{show:s(h),"onUpdate:show":l[24]||(l[24]=t=>S(h)?h.value=t:null),actions:s(U),onSelect:O},null,8,["show","actions"])],64)}}},Dl=re(Vl,[["__scopeId","data-v-0eaadfcd"]]);export{Dl as default};
