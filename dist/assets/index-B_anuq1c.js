import{_ as k,u as w,a as j,r as l,d as L,o as a,c as u,f as e,g as p,h as o,s as f,w as x,A as B,F as m,aR as N,j as C,i as s}from"./index-BvrlI3rd.js";import{L as I}from"./index-rxo48PJE.js";import{E as S}from"./index-CqtRLwuI.js";import{N as A}from"./index-NAKdCZg-.js";import{i as E}from"./404-no-order-Bq2DJ-by.js";import"./use-id-n9qlotU8.js";import"./use-placeholder-DFyJNJBY.js";const V={key:0},F={class:"p-3"},z={class:"flex justify-between py-1"},D={class:"flex justify-between py-1"},M={class:"flex justify-between py-1"},Q={class:"flex justify-between py-1"},T={class:"flex justify-between py-1"},U={class:"flex justify-between py-1"},G={key:0},H={key:1},J={key:2},K={__name:"index",setup(O){const{t:h}=w(),y=j(),g=()=>{y.back()},c=l({page:"1",limit:"5"}),i=l([]),r=l(!1),v=l(!1),_=async()=>{const t=await N(c.value);r.value=!1;let d=parseInt(c.value.page);d++,c.value.page=d.toString(),i.value.push(...t.data),t.data.length<5&&(v.value=!0)};return L(()=>{_()}),(t,d)=>{const R=A,q=S,$=I;return a(),u(m,null,[e("header",null,[p(R,{title:t.$t("refundRequest.refundRequest"),border:!1,"left-text":"","left-arrow":"",onClickLeft:g},null,8,["title"])]),e("section",null,[o(i).length<=0?(a(),u("div",V,[p(q,{description:t.$t("refundRequest.empty"),image:o(E),"image-size":"17rem"},null,8,["description","image"])])):f("",!0),p($,{loading:o(r),"onUpdate:loading":d[0]||(d[0]=n=>B(r)?r.value=n:null),finished:o(v),"finished-text":o(i).length>0?o(h)("refundRequest.err"):"",onLoad:_,"immediate-check":!1},{default:x(()=>[(a(!0),u(m,null,C(o(i),(n,b)=>(a(),u("div",{class:"bg-white mx-3 rounded-md mt-3",key:b},[e("div",F,[e("div",z,[e("div",null,s(t.$t("refundRequest.applyTime")),1),e("div",null,s(n.createtime),1)]),e("div",D,[e("div",null,s(t.$t("refundRequest.refundId")),1),e("div",null,s(n.refund_sn),1)]),e("div",M,[e("div",null,s(t.$t("refundRequest.refundAmount")),1),e("div",null,s(n.amount),1)]),e("div",Q,[e("div",null,s(t.$t("refundRequest.refundReason")),1),e("div",null,s(n.refund_explain),1)]),e("div",T,[e("div",null,s(t.$t("refundRequest.goodsStatus")),1),e("div",null,s(n.receiving_status=t.$t("refundRequest.arrived")),1)]),e("div",U,[e("div",null,s(t.$t("refundRequest.refundStatus")),1),n.status===0?(a(),u("div",G,s(t.$t("refundRequest.pendingApproval")),1)):f("",!0),n.status===1?(a(),u("div",H,s(t.$t("refundRequest.approved")),1)):f("",!0),n.status===-1?(a(),u("div",J,s(t.$t("refundRequest.rejected")),1)):f("",!0)])])]))),128))]),_:1},8,["loading","finished","finished-text"])])],64)}}},se=k(K,[["__scopeId","data-v-fe183922"]]);export{se as default};
