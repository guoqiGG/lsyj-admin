var e=Object.defineProperty,l=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable,t=(l,a,u)=>a in l?e(l,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):l[a]=u,d=(e,d)=>{for(var o in d||(d={}))a.call(d,o)&&t(e,o,d[o]);if(l)for(var o of l(d))u.call(d,o)&&t(e,o,d[o]);return e};import{_ as o,e as n,p as r,d as i,J as p,K as s}from"./index-d3c82361.js";import"./dayjs-43ef48e6.js";import{T as m}from"./@element-plus-b1a64a18.js";import{E as c}from"./element-plus-520742f9.js";import{f as v,a0 as y,j as b,$ as f,a8 as g,o as V,c as h,V as _,O as x,F as w,u as j,P as k,M as T,T as C,U as D,a as U,S as z,a4 as N,b6 as q,b5 as A}from"./@vue-476d9f53.js";import"./vue-router-3b718848.js";import"./axios-f45f83e3.js";import"./echarts-ed669956.js";import"./zrender-93d325f0.js";import"./vuex-9b0668b4.js";import"./js-base64-8ead6284.js";import"./vuex-persistedstate-1d34ce44.js";import"./screenfull-c3c7916b.js";import"./nprogress-fdca1b68.js";import"./@kangc-16b25a8c.js";import"./vue-3198b1a1.js";import"./lodash-es-b6050654.js";import"./@vueuse-53812618.js";import"./@ctrl-eb0b847c.js";import"./async-validator-1193b133.js";import"./memoize-one-99e54574.js";import"./escape-html-4bbaf1e1.js";import"./normalize-wheel-es-eea50788.js";import"./@floating-ui-a9dc73ab.js";const S=e=>(q("data-v-4ca698d1"),e=e(),A(),e),I=C("查询"),O=C("重置"),E=C("新增"),M=["onClick"],Y=S((()=>U("span",{class:"operation"},"删除",-1))),P={class:"pagination"},J=C("上架"),L=C("下架"),F=C("领取后几天"),K=C("固定时间"),R={key:6,style:{"margin-left":"25px","border-bottom":"2px dashed #E6E6E6"}},$=S((()=>U("p",{style:{margin:"5px 0px"}},"不可用商品",-1))),B={style:{display:"flex","flex-wrap":"wrap"}},G=["src"],H={key:7,style:{"margin-left":"25px"}},Q=S((()=>U("p",{style:{margin:"5px 0px"}},"可用商品",-1))),W={style:{display:"flex","flex-wrap":"wrap"}},X=["src"],Z=C("保存"),ee=C("关闭");var le=o({setup(e){const l={name:null,puid:null,status:null},a=v(!1),u=v(d({},l)),t=v({pageNo:1,pageSize:10}),o=v(0);let q=v([]);const A=async()=>{a.value=!0;const e=await n(d(d({},u.value),t.value));a.value=!1,q.value=e.data.list,o.value=e.data.total},S=e=>{t.value.pageSize=e,A()},le=e=>{t.value.pageNo=e,A()},ae=v([]),ue=v([]),te=v(!1),de=v(!1),oe=v(null),ne=v({id:null,name:null,amount:null,fullAmount:null,status:1,deadlineType:1,deadlineDay:null,deadlineTime:null,type:[],sortValue:null,productValue1:null,productValue2:null}),re=[{label:"指定分类不可用",value:1},{label:"指定商品不可用",value:2},{label:"指定商品可用",value:3},{label:"满多少可用",value:4}],ie=y({name:[{required:!0,message:"请输入优惠券名称",trigger:"blur"}],amount:[{required:!0,message:"请输入优惠金额",trigger:"blur"}],fullAmount:[{required:!0,message:"请输入满足金额",trigger:"blur"}],status:[{required:!0,message:"请选择投放状态",trigger:"blur"}],deadlineType:[{required:!0,message:"请选择生效类型",trigger:"blur"}],deadlineDay:[{required:!0,message:"请输入生效天数",trigger:"blur"}],deadlineTime:[{required:!0,message:"请选择生效时间",trigger:"blur"}],type:[{required:!0,message:"请选择适用商品",trigger:"blur"}],sortValue:[{required:!0,message:"请选择不可用分类",trigger:"blur"}],productValue1:[{required:!0,message:"请选择不可用商品",trigger:"blur"}],productValue2:[{required:!0,message:"请选择可用商品",trigger:"blur"}]});return b((()=>{A(),(async()=>{const e=await r({pageNo:1,pageSize:1e4});ae.value=e.data.list})(),(async()=>{let e=(await i({pageNo:1,pageSize:1e4})).data.list;e.forEach((e=>{e.label=e.name})),ue.value=e})()})),(e,n)=>{const r=f("el-input"),i=f("el-form-item"),y=f("el-col"),b=f("el-option"),pe=f("el-select"),se=f("el-button"),me=f("el-row"),ce=f("el-form"),ve=f("el-card"),ye=f("el-table-column"),be=f("el-popconfirm"),fe=f("el-table"),ge=f("el-pagination"),Ve=f("el-radio"),he=f("el-radio-group"),_e=f("el-date-picker"),xe=f("el-checkbox"),we=f("el-checkbox-group"),je=f("el-dialog"),ke=g("loading");return V(),h(w,null,[_(ve,null,{default:x((()=>[_(ce,{inline:!0,model:u.value,class:"demo-form-inline","lable-width":"100px"},{default:x((()=>[_(me,null,{default:x((()=>[_(y,{lg:6,md:8,sm:12},{default:x((()=>[_(i,{label:"优惠券名"},{default:x((()=>[_(r,{modelValue:u.value.name,"onUpdate:modelValue":n[0]||(n[0]=e=>u.value.name=e),placeholder:"优惠券名",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),_(y,{lg:6,md:8,sm:12},{default:x((()=>[_(i,{label:"优惠券状态"},{default:x((()=>[_(pe,{style:{width:"92%"},modelValue:u.value.status,"onUpdate:modelValue":n[1]||(n[1]=e=>u.value.status=e),placeholder:"请选择",clearable:""},{default:x((()=>[_(b,{label:"上架",value:"1"}),_(b,{label:"下架",value:"2"})])),_:1},8,["modelValue"])])),_:1})])),_:1}),_(i,null,{default:x((()=>[_(se,{type:"primary",onClick:A},{default:x((()=>[I])),_:1}),_(se,{onClick:n[2]||(n[2]=e=>(u.value=d({},l),void A()))},{default:x((()=>[O])),_:1})])),_:1})])),_:1})])),_:1},8,["model"])])),_:1}),_(ve,{style:{"margin-top":"10px"}},{default:x((()=>[_(se,{type:"primary",icon:j(m),class:"add",onClick:n[3]||(n[3]=e=>(te.value=!0,de.value=!1,void(ne.value={name:"",amount:null,fullAmount:null,status:1,deadlineType:1,deadlineDay:null,deadlineTime:null,type:[1],sortValue:null,productValue1:null,productValue2:null})))},{default:x((()=>[E])),_:1},8,["icon"]),k((V(),T(fe,{data:j(q),style:{width:"100%"},class:"add_dialog","header-cell-style":{background:"#f7f8fa",color:"#000"}},{default:x((()=>[_(ye,{prop:"name",label:"优惠券名",align:"center"}),_(ye,{prop:"status",label:"状态",align:"center"},{default:x((e=>[C(D(1==e.row.status?"上架":2==e.row.status?"下架":""),1)])),_:1}),_(ye,{prop:"deadlineType",label:"生效类型",align:"center"},{default:x((e=>[C(D(1==e.row.deadlineType?e.row.deadlineDay+"天":2==e.row.deadlineType?e.row.deadlineTime:""),1)])),_:1}),_(ye,{prop:"createTime",label:"开始时间",align:"center"}),_(ye,{prop:"updateTime",label:"更新时间",align:"center"}),_(ye,{prop:"amount",label:"优惠券金额",align:"center"}),_(ye,{fixed:"right",label:"操作",width:"180",align:"center"},{default:x((l=>[U("span",{class:"operation",onClick:e=>(e=>{de.value=!0,ne.value.couponId=e.id,ne.value.name=e.name,ne.value.amount=e.amount,ne.value.status=e.status,ne.value.deadlineType=e.deadlineType,ne.value.deadlineDay=e.deadlineDay,ne.value.deadlineTime=e.deadlineTime,ne.value.type=[],ne.value.sortValue=[],ne.value.productValue1=[],ne.value.productValue2=[];let l=0,a=0,u=0,t=0;ne.value.fullAmount=e.fullAmount,e.couponConstraintList.map(((e,d)=>{1===e.type&&(ne.value.sortValue.push(Number(e.conditionValue)),l+=1),2===e.type&&(ne.value.productValue1.push({id:Number(e.conditionValue),name:e.goodsName,label:e.goodsName,thumbail:e.thumbail}),a+=1),3===e.type&&(ne.value.productValue2.push({id:Number(e.conditionValue),name:e.goodsName,label:e.goodsName,thumbail:e.thumbail}),u+=1),4===e.type&&(ne.value.fullAmount=e.conditionValue,t+=1)})),l>0&&ne.value.type.push(1),a>0&&ne.value.type.push(2),u>0&&ne.value.type.push(3),t>0&&ne.value.type.push(4),te.value=!0})(l.row)},"修改",8,M),_(be,{"confirm-button-text":"确定","cancel-button-text":"取消","cancel-button-type":"info","icon-color":"#626AEF",title:"确定要删除吗?",onConfirm:e=>(async e=>{const l=await p({coupon:{id:e.id,isDeleted:1}});if(0!==l.code)return c.error(l.msg),!1;c.success("删除成功"),A()})(l.row),onCancel:e.cancelEvent},{reference:x((()=>[Y])),_:2},1032,["onConfirm","onCancel"])])),_:1})])),_:1},8,["data"])),[[ke,a.value]]),U("div",P,[_(ge,{background:"",layout:"total, sizes, prev, pager, next, jumper","page-size":t.value.pageSize,"onUpdate:page-size":n[4]||(n[4]=e=>t.value.pageSize=e),"current-page":t.value.pageNo,"onUpdate:current-page":n[5]||(n[5]=e=>t.value.pageNo=e),"page-sizes":[10,20,50,100,200,500],total:o.value,onSizeChange:S,onCurrentChange:le},null,8,["page-size","current-page","total"])])])),_:1}),_(je,{modelValue:te.value,"onUpdate:modelValue":n[19]||(n[19]=e=>te.value=e),title:de.value?"编辑优惠券":"新增优惠券",width:"600px"},{default:x((()=>[_(ce,{ref_key:"formRef",ref:oe,model:ne.value,rules:j(ie),class:"add_dialog","lable-width":"100px"},{default:x((()=>{var e,l,a,u;return[_(i,{label:"优惠券名称",prop:"name"},{default:x((()=>[_(r,{modelValue:ne.value.name,"onUpdate:modelValue":n[6]||(n[6]=e=>ne.value.name=e),placeholder:"优惠券名称",clearable:""},null,8,["modelValue"])])),_:1}),_(i,{label:"优惠金额",prop:"amount"},{default:x((()=>[_(r,{type:"number",modelValue:ne.value.amount,"onUpdate:modelValue":n[7]||(n[7]=e=>ne.value.amount=e),modelModifiers:{number:!0},placeholder:"优惠金额",clearable:""},null,8,["modelValue"])])),_:1}),_(i,{label:"投放状态",prop:"status"},{default:x((()=>[_(he,{modelValue:ne.value.status,"onUpdate:modelValue":n[8]||(n[8]=e=>ne.value.status=e)},{default:x((()=>[_(Ve,{label:1},{default:x((()=>[J])),_:1}),_(Ve,{label:2},{default:x((()=>[L])),_:1})])),_:1},8,["modelValue"])])),_:1}),_(i,{label:"生效类型",prop:"deadlineType"},{default:x((()=>[_(he,{modelValue:ne.value.deadlineType,"onUpdate:modelValue":n[9]||(n[9]=e=>ne.value.deadlineType=e),class:"ml-4"},{default:x((()=>[_(Ve,{label:1},{default:x((()=>[F])),_:1}),_(Ve,{label:2},{default:x((()=>[K])),_:1})])),_:1},8,["modelValue"])])),_:1}),1===ne.value.deadlineType?(V(),T(i,{key:0,label:"生效天数",prop:"deadlineDay"},{default:x((()=>[_(r,{type:"number",modelValue:ne.value.deadlineDay,"onUpdate:modelValue":n[10]||(n[10]=e=>ne.value.deadlineDay=e),modelModifiers:{number:!0},placeholder:"生效天数",clearable:""},null,8,["modelValue"])])),_:1})):z("",!0),2===ne.value.deadlineType?(V(),T(i,{key:1,label:"生效时间",prop:"deadlineTime"},{default:x((()=>[_(_e,{modelValue:ne.value.deadlineTime,"onUpdate:modelValue":n[11]||(n[11]=e=>ne.value.deadlineTime=e),type:"date",placeholder:"生效时间",format:"YYYY-MM-DD","value-format":"YYYY-MM-DD"},null,8,["modelValue"])])),_:1})):z("",!0),_(i,{label:"适用商品",prop:"type"},{default:x((()=>[_(we,{modelValue:ne.value.type,"onUpdate:modelValue":n[12]||(n[12]=e=>ne.value.type=e)},{default:x((()=>[(V(),h(w,null,N(re,(e=>_(xe,{key:e.value,label:e.value},{default:x((()=>[C(D(e.label),1)])),_:2},1032,["label"]))),64))])),_:1},8,["modelValue"])])),_:1}),ne.value.type&&(null==(e=ne.value.type)?void 0:e.includes(1))?(V(),T(i,{key:2,label:"不可用分类",prop:"sortValue"},{default:x((()=>[_(pe,{modelValue:ne.value.sortValue,"onUpdate:modelValue":n[13]||(n[13]=e=>ne.value.sortValue=e),multiple:"",placeholder:"请选择不可用分类",style:{width:"240px"}},{default:x((()=>[(V(!0),h(w,null,N(ae.value,(e=>(V(),T(b,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})):z("",!0),ne.value.type&&(null==(l=ne.value.type)?void 0:l.includes(2))?(V(),T(i,{key:3,label:"不可用商品",prop:"productValue1"},{default:x((()=>[_(pe,{modelValue:ne.value.productValue1,"onUpdate:modelValue":n[14]||(n[14]=e=>ne.value.productValue1=e),multiple:"","value-key":"id",placeholder:"请选择不可用商品",style:{width:"240px"}},{default:x((()=>[(V(!0),h(w,null,N(ue.value,(e=>(V(),T(b,{key:e.id,label:e.name,value:e},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})):z("",!0),ne.value.type&&(null==(a=ne.value.type)?void 0:a.includes(3))?(V(),T(i,{key:4,label:"可用商品",prop:"productValue2"},{default:x((()=>[_(pe,{modelValue:ne.value.productValue2,"onUpdate:modelValue":n[15]||(n[15]=e=>ne.value.productValue2=e),multiple:"","value-key":"id",placeholder:"请选择可用商品",style:{width:"240px"}},{default:x((()=>[(V(!0),h(w,null,N(ue.value,(e=>(V(),T(b,{label:e.name,key:e.id,value:e},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})):z("",!0),ne.value.type&&(null==(u=ne.value.type)?void 0:u.includes(4))?(V(),T(i,{key:5,label:"满足金额",prop:"fullAmount"},{default:x((()=>[_(r,{type:"number",modelValue:ne.value.fullAmount,"onUpdate:modelValue":n[16]||(n[16]=e=>ne.value.fullAmount=e),modelModifiers:{number:!0},placeholder:"请输入满足金额",clearable:""},null,8,["modelValue"])])),_:1})):z("",!0),ne.value.productValue1&&ne.value.productValue1.length>0?(V(),h("div",R,[$,U("div",B,[(V(!0),h(w,null,N(ne.value.productValue1,((e,l)=>(V(),h("div",{class:"m-4",style:{width:"80px",margin:"0px 10px 10px 0px","text-align":"center"},key:e.id},[U("p",null,D(e?e.name:"no select"),1),U("img",{src:e.thumbail,alt:"",style:{width:"80px",height:"80px"}},null,8,G)])))),128))])])):z("",!0),ne.value.productValue2&&ne.value.productValue2.length>0?(V(),h("div",H,[Q,U("div",W,[(V(!0),h(w,null,N(ne.value.productValue2,((e,l)=>(V(),h("div",{class:"m-4",style:{width:"80px",margin:"0px 10px 10px 0px","text-align":"center"},key:e.id},[U("p",null,D(e?e.name:"no select"),1),U("img",{src:e.thumbail,alt:"",style:{width:"80px",height:"80px"}},null,8,X)])))),128))])])):z("",!0),_(i,{class:"footer"},{default:x((()=>[_(se,{type:"primary",onClick:n[17]||(n[17]=e=>(oe.value,void oe.value.validate((async e=>{var l,a,u,t;if(!e)return c.error("表单验证失败"),!1;{const e=v();let d={type:1,isDeleted:0,id:ne.value.couponId,couponId:ne.value.couponId,name:ne.value.name,amount:ne.value.amount,status:ne.value.status,deadlineType:ne.value.deadlineType,deadlineDay:ne.value.deadlineDay,deadlineTime:ne.value.deadlineTime},o=[];if((null==(l=ne.value.type)?void 0:l.includes(1))&&ne.value.sortValue.map((e=>{let l={type:1,conditionValue:e};o.push(l)})),(null==(a=ne.value.type)?void 0:a.includes(2))&&ne.value.productValue1.map((e=>{let l={type:2,conditionValue:e.id};o.push(l)})),(null==(u=ne.value.type)?void 0:u.includes(3))&&ne.value.productValue2.map((e=>{let l={type:3,conditionValue:e.id};o.push(l)})),null==(t=ne.value.type)?void 0:t.includes(4)){let e={type:4,conditionValue:ne.value.fullAmount};o.push(e)}o.id=ne.value.couponId;let n={coupon:d,couponConstraintList:[...o]};ne.value.couponId?(n.couponConstraintList.id=ne.value.couponId,e.value=await p(JSON.stringify(n))):e.value=await s(JSON.stringify(n)),0==e.value.code&&(te.value=!1,c.success("提交成功"),A())}}))))},{default:x((()=>[Z])),_:1}),_(se,{onClick:n[18]||(n[18]=e=>te.value=!1)},{default:x((()=>[ee])),_:1})])),_:1})]})),_:1},8,["model","rules"])])),_:1},8,["modelValue","title"])],64)}}},[["__scopeId","data-v-4ca698d1"]]);export{le as default};
