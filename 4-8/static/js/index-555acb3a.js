var e=Object.defineProperty,l=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable,r=(l,a,t)=>a in l?e(l,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[a]=t,u=(e,u)=>{for(var s in u||(u={}))a.call(u,s)&&r(e,s,u[s]);if(l)for(var s of l(u))t.call(u,s)&&r(e,s,u[s]);return e};import{_ as s,l as o,o as d,d as n,n as i,q as p,r as c,s as v}from"./index-d3c82361.js";import{d as m}from"./dayjs-43ef48e6.js";import{a as b}from"./vue-router-3b718848.js";import{U as f,V as g}from"./@element-plus-b1a64a18.js";import{E as y}from"./element-plus-520742f9.js";import{f as S,j as h,h as w,$ as _,a8 as x,o as N,c as k,V,O as j,F as I,a4 as U,M as C,u as T,I as M,P as D,a as z,U as P,S as Y,T as E,b6 as A,b5 as O}from"./@vue-476d9f53.js";import"./axios-f45f83e3.js";import"./echarts-ed669956.js";import"./zrender-93d325f0.js";import"./vuex-9b0668b4.js";import"./js-base64-8ead6284.js";import"./vuex-persistedstate-1d34ce44.js";import"./screenfull-c3c7916b.js";import"./nprogress-fdca1b68.js";import"./@kangc-16b25a8c.js";import"./vue-3198b1a1.js";import"./lodash-es-b6050654.js";import"./@vueuse-53812618.js";import"./@ctrl-eb0b847c.js";import"./async-validator-1193b133.js";import"./memoize-one-99e54574.js";import"./escape-html-4bbaf1e1.js";import"./normalize-wheel-es-eea50788.js";import"./@floating-ui-a9dc73ab.js";const q=e=>(A("data-v-38a790a4"),e=e(),O(),e),B=E("查询"),H=E("重置"),L=E("批量上传发货"),F=E("下载批量发货模板"),G=E("批量上传收货"),R=E("下载批量收货模板"),J=E("批量发货"),$=E("批量收货"),K=E("导出"),Q={class:"order"},W={class:"time"},X={class:"leader"},Z={class:"goodsInfo"},ee={class:"left",style:{width:"130px"}},le={class:"goodsName",style:{"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"}},ae={class:"price"},te={class:"price-title"},re={class:"buyer"},ue={class:"top"},se={class:"leader"},oe=["onClick"],de=["onClick"],ne=["onClick"],ie=[E("查看详情")],pe={class:"pagination"},ce={class:"detail_dialog"},ve={class:"orderNumber"},me=E("订单编号："),be={class:"num"},fe=E("下单时间："),ge={key:0,class:"num"},ye={class:"orderStatus"},Se={class:"big"},he={class:"order_status"},we={class:"status_box"},_e={key:0,class:"status_box",style:{color:"#f1300e"}},xe=q((()=>z("p",null,"已取消",-1))),Ne={key:1,class:"status_box"},ke={class:"status_box"},Ve={class:"status_box"},je={class:"orderDetail"},Ie={class:"left"},Ue=q((()=>z("p",{class:"blod"},"配送信息",-1))),Ce=E("提货人:"),Te={class:"num"},Me=E("联系电话:"),De={class:"num"},ze={class:"left"},Pe=q((()=>z("p",{class:"blod"},"收货人信息",-1))),Ye=E("配送方式:"),Ee={class:"num"},Ae={key:0},Oe=E(" 发货时间:"),qe={class:"num"},Be=E("门店名称:"),He={class:"num"},Le={class:"left"},Fe=q((()=>z("p",{class:"blod"},"付款信息",-1))),Ge=E("实付金额:"),Re={class:"num"},Je=q((()=>z("p",null,[E("付款方式:"),z("span",{class:"num"},"微信支付")],-1))),$e=E("付款时间:"),Ke={class:"num"},Qe={class:"left"},We=q((()=>z("p",{class:"blod"},"买家信息",-1))),Xe=E("买家昵称:"),Ze={class:"num"},el=E("买家留言:"),ll={class:"num"},al={key:0,style:{color:"#101010","font-size":"16px","font-weight":"600"}},tl={key:1,class:"product",style:{"margin-top":"20px"}},rl=["src"],ul={key:2,style:{color:"#101010","font-size":"16px","font-weight":"600"}},sl={key:3,class:"product",style:{"margin-top":"20px"}};var ol=s({setup(e){const l=b(),a="https://qct.hnliyue.cn/youth",t=S(),r={orderNumber:null,pUid:null,userName:null,leaderName:null,leaderMobile:null,userMobile:null,goodsName:null,orderType:null,orderStatus:null,refundStatus:null,startDate:null,endDate:null,time:null,userId:null,goodsId:null},s=S(!1),E=S(u({},r)),A=S({pageNo:1,pageSize:20}),O=S(0);let q=S([]);const ol=async()=>{s.value=!0;const e=await d(u({orderNumber:E.value.orderNumber,pUid:E.value.pUid,userName:E.value.userName,leaderName:E.value.leaderName,leaderMobile:E.value.leaderMobile,userMobile:E.value.userMobile,goodsName:E.value.goodsName,orderType:E.value.orderType,orderStatus:E.value.orderStatus,refundStatus:E.value.refundStatus,startDate:E.value.startDate,endDate:E.value.endDate,userId:E.value.userId,goodsId:E.value.goodsId},A.value));s.value=!1,q.value=e.data.list,O.value=e.data.total},dl=e=>{A.value.pageSize=e,ol()},nl=e=>{A.value.pageNo=e,ol()},il=S(!0),pl=S(),cl=S([]),vl=e=>{cl.value=e,cl.value&&cl.value.length>0?il.value=!1:il.value=!0},ml=async(e,l)=>{let a=[];"single"===l?a.push(e):cl.value&&cl.value.length>0&&cl.value.map((e=>{a.push(e.orderId)}));const t=await i(JSON.stringify({orderIds:a}));0===t.code?(y.success("发货成功"),il.value=!0,pl.value.clearSelection(),ol()):y.error(t.msg)},bl=async(e,l)=>{let a=[];"single"===l?a.push(e):cl.value&&cl.value.length>0&&cl.value.map((e=>{a.push(e.orderId)}));const t=await p(JSON.stringify({orderIds:a}));0===t.code?(y.success("收货成功"),il.value=!0,pl.value.clearSelection(),ol()):y.error(t.msg)},fl=(e,l,a)=>{0===e.code?y.success("上传成功"):y.error(e.msg),ol()},gl=(e,l,a)=>{y.error("上传失败")},yl=(e,l,a)=>{0===e.code?y.success("上传成功"):y.error(e.msg),ol()},Sl=(e,l,a)=>{y.error("上传失败")},hl=e=>{let l;l="send"===e?"https://qingchuntai2.oss-cn-beijing.aliyuncs.com/2024/02/20/%E6%89%B9%E9%87%8F%E5%8F%91%E8%B4%A7.xlsx":"https://qingchuntai2.oss-cn-beijing.aliyuncs.com/2024/02/20/%E6%89%B9%E9%87%8F%E6%94%B6%E8%B4%A7%E6%93%8D%E4%BD%9C%E8%A1%A8.xlsx",window.location.href=l},wl=S(!1),_l=S(),xl=S(!1),Nl=S([]),kl=async e=>{const l=await n({name:e,pageNo:1,pageSize:1e8});Nl.value=l.data.list},Vl=async()=>{s.value=!0;const e=await v({orderNumber:E.value.orderNumber,pUid:E.value.pUid,userName:E.value.userName,leaderName:E.value.leaderName,leaderMobile:E.value.leaderMobile,userMobile:E.value.userMobile,goodsName:E.value.goodsName,orderType:E.value.orderType,orderStatus:E.value.orderStatus,refundStatus:E.value.refundStatus,startDate:E.value.startDate,endDate:E.value.endDate,userId:E.value.userId,goodsId:E.value.goodsId});s.value=!1;var l=new Blob([e],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"});const a="订单信息表",t=document.createElement("a");"download"in t?(t.download=a,t.style.display="none",t.href=URL.createObjectURL(l),document.body.appendChild(t),t.click(),URL.revokeObjectURL(t.href),document.body.removeChild(t)):navigator.msSaveBlob(l,a)};return h((()=>{(async()=>{const e=await o({pageNo:1,pageSize:1e4});t.value=e.data.list})(),l.query.userId&&(E.value.userId=l.query.userId),l.query.orderId&&(E.value.orderNumber=l.query.orderId),ol(),(async()=>{const e=await n({pageNo:1,pageSize:10});Nl.value=e.data.list})()})),w(E.value,((e,l)=>{E.value.startDate=m(e.time[0]).format("YYYY-MM-DD HH:mm:ss"),E.value.endDate=m(e.time[1]).format("YYYY-MM-DD HH:mm:ss")}),{deep:!0}),(e,l)=>{const o=_("el-input"),d=_("el-form-item"),n=_("el-col"),i=_("el-option"),p=_("el-select"),v=_("el-date-picker"),m=_("el-button"),b=_("el-row"),y=_("el-upload"),S=_("el-form"),h=_("el-card"),w=_("el-table-column"),cl=_("el-image"),jl=_("el-table"),Il=_("el-pagination"),Ul=_("el-dialog"),Cl=x("loading");return N(),k(I,null,[V(h,null,{default:j((()=>[V(S,{inline:!0,model:E.value,class:"demo-form-inline","lable-width":"100px"},{default:j((()=>[V(b,null,{default:j((()=>[V(n,{lg:6,md:8,sm:12},{default:j((()=>[V(d,{label:"订单编号"},{default:j((()=>[V(o,{modelValue:E.value.orderNumber,"onUpdate:modelValue":l[0]||(l[0]=e=>E.value.orderNumber=e),placeholder:"订单编号",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),V(n,{lg:6,md:8,sm:12},{default:j((()=>[V(d,{label:"用户名称"},{default:j((()=>[V(o,{modelValue:E.value.userName,"onUpdate:modelValue":l[1]||(l[1]=e=>E.value.userName=e),placeholder:"用户名称",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),V(n,{lg:6,md:8,sm:12},{default:j((()=>[V(d,{label:"用户号码"},{default:j((()=>[V(o,{modelValue:E.value.userMobile,"onUpdate:modelValue":l[2]||(l[2]=e=>E.value.userMobile=e),placeholder:"用户手机号",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),V(n,{lg:6,md:8,sm:12},{default:j((()=>[V(d,{label:"团长名称"},{default:j((()=>[V(o,{modelValue:E.value.leaderName,"onUpdate:modelValue":l[3]||(l[3]=e=>E.value.leaderName=e),placeholder:"团长名称",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),V(n,{lg:6,md:8,sm:12},{default:j((()=>[V(d,{label:"团长号码"},{default:j((()=>[V(o,{modelValue:E.value.leaderMobile,"onUpdate:modelValue":l[4]||(l[4]=e=>E.value.leaderMobile=e),placeholder:"团长手机号",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),V(n,{lg:6,md:8,sm:12},{default:j((()=>[V(d,{label:"订单类型"},{default:j((()=>[V(p,{modelValue:E.value.orderType,"onUpdate:modelValue":l[5]||(l[5]=e=>E.value.orderType=e),placeholder:"请选择",clearable:""},{default:j((()=>[V(i,{label:"自提",value:"1"}),V(i,{label:"快递",value:"2"})])),_:1},8,["modelValue"])])),_:1})])),_:1}),V(n,{lg:6,md:8,sm:12},{default:j((()=>[V(d,{label:"订单状态"},{default:j((()=>[V(p,{modelValue:E.value.orderStatus,"onUpdate:modelValue":l[6]||(l[6]=e=>E.value.orderStatus=e),placeholder:"请选择",clearable:""},{default:j((()=>[V(i,{label:"待付款",value:"1000"}),V(i,{label:"待发货",value:"1001"}),V(i,{label:"待收货",value:"2001"}),V(i,{label:"后台确认收货(已完成)",value:"2002"}),V(i,{label:"用户确认收货(已完成)",value:"3001"}),V(i,{label:"已取消",value:"9000"}),V(i,{label:"错误",value:"8000"})])),_:1},8,["modelValue"])])),_:1})])),_:1}),V(n,{lg:6,md:8,sm:12},{default:j((()=>[V(d,{label:"退款状态"},{default:j((()=>[V(p,{modelValue:E.value.refundStatus,"onUpdate:modelValue":l[7]||(l[7]=e=>E.value.refundStatus=e),placeholder:"请选择",clearable:""},{default:j((()=>[V(i,{label:"未申请退款",value:"0"}),V(i,{label:"申请退款",value:"1"}),V(i,{label:"退款中",value:"2"}),V(i,{label:"退款失败",value:"3"}),V(i,{label:"退款成功",value:"4"}),V(i,{label:"后台手动退款成功",value:"5"})])),_:1},8,["modelValue"])])),_:1})])),_:1}),V(n,{lg:6,md:8,sm:12},{default:j((()=>[V(d,{label:"所属团长"},{default:j((()=>[V(p,{modelValue:E.value.pUid,"onUpdate:modelValue":l[8]||(l[8]=e=>E.value.pUid=e),filterable:"",placeholder:"请选择所属团长",style:{width:"90%"},clearable:""},{default:j((()=>[(N(!0),k(I,null,U(t.value,(e=>(N(),C(i,{key:e.puid,label:e.leaderName,value:e.puid},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),V(n,{lg:6,md:8,sm:12},{default:j((()=>[V(d,{label:"商品名称"},{default:j((()=>[V(p,{modelValue:E.value.goodsId,"onUpdate:modelValue":l[9]||(l[9]=e=>E.value.goodsId=e),filterable:"",remote:"","reserve-keyword":"",placeholder:"请输入商品名称","remote-show-suffix":"","remote-method":kl,clearable:""},{default:j((()=>[(N(!0),k(I,null,U(Nl.value,(e=>(N(),C(i,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),V(n,{lg:12,md:12,sm:24},{default:j((()=>[V(d,{label:"时间 "},{default:j((()=>[V(v,{modelValue:E.value.time,"onUpdate:modelValue":l[10]||(l[10]=e=>E.value.time=e),type:"daterange","start-placeholder":"开始时间","end-placeholder":"结束时间",format:"YYYY-MM-DD HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss","default-time":""},null,8,["modelValue"])])),_:1})])),_:1}),V(d,null,{default:j((()=>[V(m,{type:"primary",onClick:ol},{default:j((()=>[B])),_:1}),V(m,{onClick:l[11]||(l[11]=e=>(E.value=u({},r),void ol()))},{default:j((()=>[H])),_:1})])),_:1})])),_:1}),V(b,null,{default:j((()=>[V(d,null,{default:j((()=>[V(y,{style:{margin:"0px 20px 0px 0px"},"file-list":e.fileList,"onUpdate:file-list":l[12]||(l[12]=l=>e.fileList=l),class:"upload-demo","show-file-list":!1,action:T(a)+"/upload/order/delivery",headers:{Authorization:e.token},multiple:!1,"on-success":fl,"on-error":gl},{default:j((()=>[V(m,{icon:T(f),type:"primary"},{default:j((()=>[L])),_:1},8,["icon"])])),_:1},8,["file-list","action","headers"]),V(m,{icon:T(g),onClick:l[13]||(l[13]=e=>hl("send"))},{default:j((()=>[F])),_:1},8,["icon"]),V(y,{style:{margin:"0px 20px 0px 20px"},"file-list":e.fileList,"onUpdate:file-list":l[14]||(l[14]=l=>e.fileList=l),class:"upload-demo","show-file-list":!1,action:T(a)+"/upload/order/take/delivery",headers:{Authorization:e.token},multiple:!1,"on-success":yl,"on-error":Sl},{default:j((()=>[V(m,{icon:T(f),type:"primary"},{default:j((()=>[G])),_:1},8,["icon"])])),_:1},8,["file-list","action","headers"]),V(m,{icon:T(g),onClick:l[15]||(l[15]=e=>hl("receive"))},{default:j((()=>[R])),_:1},8,["icon"])])),_:1})])),_:1})])),_:1},8,["model"])])),_:1}),V(h,{style:{"margin-top":"10px"}},{default:j((()=>[V(m,{type:"primary",class:M(il.value?"button_false":"button-class"),style:{"margin-bottom":"20px"},disabled:il.value,onClick:ml},{default:j((()=>[J])),_:1},8,["class","disabled"]),V(m,{type:"primary",class:M(il.value?"button_false":"button-class"),style:{"margin-bottom":"20px"},disabled:il.value,onClick:bl},{default:j((()=>[$])),_:1},8,["class","disabled"]),V(m,{icon:T(g),style:{"margin-bottom":"20px"},onClick:Vl},{default:j((()=>[K])),_:1},8,["icon"]),D((N(),C(jl,{data:T(q),style:{width:"100%"},ref_key:"multipleTableRef",ref:pl,"header-cell-style":{background:"#f7f8fa",color:"#000"},onSelectionChange:vl,border:""},{default:j((()=>[V(w,{type:"selection",width:"55",align:"center"}),V(w,{label:"订单信息",width:"235"},{default:j((e=>[z("div",Q,[z("div",null,"订单编号："+P(e.row.orderId),1),z("div",W,"下单时间："+P(e.row.statusPayedTime),1)])])),_:1}),V(w,{label:"支付单号",align:"center",width:"200"},{default:j((e=>[z("div",X,[z("div",null,P(e.row.payTransId),1)])])),_:1}),V(w,{label:"商品信息",width:"250"},{default:j((e=>[z("div",Z,[V(cl,{style:{width:"60px",height:"60px","border-radius":"5px"},src:e.row.thumbail,lazy:""},null,8,["src"]),z("div",ee,[z("div",le,P(e.row.goodsName),1),z("div",{class:M(["info","自提"==e.row.orderTypeStr?"blue":""])},P(e.row.orderTypeStr),3)])])])),_:1}),V(w,{label:"单价(元)/数量",align:"center",width:"100"},{default:j((e=>[z("div",ae,[z("div",te,P(e.row.amount),1),z("div",null,"共 "+P(e.row.goodsCount)+" 件",1)])])),_:1}),V(w,{label:"买家/收货人",align:"center",width:"150"},{default:j((e=>[z("div",re,[z("div",null,P(e.row.userName),1),z("div",ue,P(e.row.userMobile),1)])])),_:1}),V(w,{label:"团长",width:"200"},{default:j((e=>[z("div",se,[z("div",null," 团长："+P(e.row.leaderName),1),z("div",null," 手机："+P(e.row.leaderMobile),1),z("div",null," 地址："+P(e.row.address),1)])])),_:1}),V(w,{prop:"orderStatus",label:"订单状态",align:"center",width:"120"},{default:j((e=>[z("div",null,P(1e3===e.row.orderStatus?"待付款":1001===e.row.orderStatus?"已支付":2001===e.row.orderStatus?"待收货":2002===e.row.orderStatus?"后台确认收货":3001===e.row.orderStatus?"用户确认收货":9e3===e.row.orderStatus?"已取消":8e3===e.row.orderStatus?"错误":""),1)])),_:1}),V(w,{prop:"refundStatus",label:"订单退款状态",align:"center",width:"120"},{default:j((e=>[z("div",null,P(0===e.row.refundStatus?"未申请退款":1===e.row.refundStatus?"申请退款":2===e.row.refundStatus?"退款中":3===e.row.refundStatus?"退款失败":4===e.row.refundStatus?"退款成功":5===e.row.orderStatus?"后台手动退款成功":""),1)])),_:1}),V(w,{fixed:"right",label:"操作",width:"180",align:"center"},{default:j((e=>[1001===e.row.orderStatus?(N(),k("span",{key:0,class:"operation",onClick:l=>ml(e.row.orderId,"single")},"发货",8,oe)):Y("",!0),2001===e.row.orderStatus?(N(),k("span",{key:1,class:"operation",onClick:l=>bl(e.row.orderId,"single")},"收货",8,de)):Y("",!0),D((N(),k("span",{class:"operation",onClick:l=>(async e=>{xl.value=!0;const l=await c(e);0===l.code&&(_l.value=l.data,_l.value.orderGoods[0].couponAmt=_l.value.couponAmt,xl.value=!1,wl.value=!0)})(e.row.id)},ie,8,ne)),[[Cl,xl.value,void 0,{fullscreen:!0,lock:!0}]])])),_:1})])),_:1},8,["data"])),[[Cl,s.value]]),z("div",pe,[V(Il,{background:"",layout:"total, sizes, prev, pager, next, jumper","page-size":A.value.pageSize,"onUpdate:page-size":l[16]||(l[16]=e=>A.value.pageSize=e),"current-page":A.value.pageNo,"onUpdate:current-page":l[17]||(l[17]=e=>A.value.pageNo=e),"page-sizes":[10,20,50,100,200,500],total:O.value,onSizeChange:dl,onCurrentChange:nl},null,8,["page-size","current-page","total"])])])),_:1}),V(Ul,{modelValue:wl.value,"onUpdate:modelValue":l[18]||(l[18]=e=>wl.value=e),title:"订单详情",width:"900px"},{default:j((()=>[z("div",ce,[z("div",ve,[z("p",null,[me,z("span",be,P(_l.value.orderNumber),1)]),z("p",null,[fe,_l.value.statusPayedTime?(N(),k("span",ge,P(_l.value.statusPayedTime),1)):Y("",!0)])]),z("div",ye,[z("p",Se,P(1e3===_l.value.orderStatus?"待付款":1001===_l.value.orderStatus?"已支付":2001===_l.value.orderStatus?"待收货":2002===_l.value.orderStatus?"后台确认收货（已完成":3001===_l.value.orderStatus?"用户点击确认收货":9e3===_l.value.orderStatus?"已取消":8e3===_l.value.orderStatus?"错误":""),1)]),z("div",he,[z("div",we,[z("p",{class:M(["yuan",_l.value.orderStatus>=1e3&&_l.value.orderStatus<=9e3?"borderColor":""])},"1 ",2),z("p",{class:M(_l.value.orderStatus>=1e3&&_l.value.orderStatus<=9e3?"color":"")},"待付款",2),z("p",{class:M(_l.value.orderStatus>=1e3&&_l.value.orderStatus<=9e3?"color":"")},P(_l.value.statusCreateTime),3)]),z("p",{class:M(["line",_l.value.orderStatus>=1001&&_l.value.orderStatus<8e3||9e3===_l.value.orderStatus?"bg_color":""])},null,2),9e3===_l.value.orderStatus?(N(),k("div",_e,[z("p",{class:M(["yuan",9e3===_l.value.orderStatus?"redColor":""])},"2 ",2),xe,z("p",null,P(_l.value.statusPayedTime||"暂无时间信息"),1)])):(N(),k("div",Ne,[z("p",{class:M(["yuan",_l.value.orderStatus>=1001&&_l.value.orderStatus<8e3?"borderColor":""])},"2 ",2),z("p",{class:M(_l.value.orderStatus>=1001&&_l.value.orderStatus<8e3?"color":"")},"已支付",2),z("p",{class:M(_l.value.orderStatus>=1001&&_l.value.orderStatus<8e3?"color":"")},P(_l.value.statusPayedTime||"暂无时间信息"),3)])),z("p",{class:M(["line",_l.value.orderStatus>=2001&&_l.value.orderStatus<8e3?"bg_color":""])},null,2),z("div",ke,[z("p",{class:M(["yuan",_l.value.orderStatus>=2001&&_l.value.orderStatus<8e3?"borderColor":""])},"3 ",2),z("p",{class:M(_l.value.orderStatus>=2001&&_l.value.orderStatus<8e3?"color":"")},"待收货",2),z("p",{class:M(_l.value.orderStatus>=2001&&_l.value.orderStatus<8e3?"color":"")},P(_l.value.statusFinishedTime||"暂无时间信息"),3)]),z("p",{class:M(["line",(_l.value.orderStatus>=2002||_l.value.orderStatus>=3001)&&_l.value.orderStatus<8e3?"bg_color":""])},null,2),z("div",Ve,[z("p",{class:M(["yuan",(_l.value.orderStatus>=2002||_l.value.orderStatus>=3001)&&_l.value.orderStatus<8e3?"borderColor":""])}," 4",2),z("p",{class:M((_l.value.orderStatus>=2002||_l.value.orderStatus>=3001)&&_l.value.orderStatus<8e3?"color":"")}," 已完成",2),z("p",{class:M((_l.value.orderStatus>=2002||_l.value.orderStatus>=3001)&&_l.value.orderStatus<8e3?"color":"")},P(_l.value.statusFinishedTime||"暂无时间信息"),3)])]),z("div",je,[z("div",Ie,[Ue,z("p",null,[Ce,z("span",Te,P(_l.value.leaderName),1)]),z("p",null,[Me,z("span",De,P(_l.value.leaderMobile),1)])]),z("div",ze,[Pe,z("p",null,[Ye,z("span",Ee,P(1===_l.value.orderType?"快递":2===_l.value.orderType?"自提":""),1)]),_l.value.orderStatus>="2001"&&"9000"!=_l.value.orderStatus&&"8000"!=_l.value.orderStatus?(N(),k("p",Ae,[Oe,z("span",qe,P(_l.value.statusDeliveringTime),1)])):Y("",!0),z("p",null,[Be,z("span",He,P(_l.value.leaderAddress),1)])]),z("div",Le,[Fe,z("p",null,[Ge,z("span",Re,P(_l.value.payCallback),1)]),Je,z("p",null,[$e,z("span",Ke,P(_l.value.statusPayedTime),1)])]),z("div",Qe,[We,z("p",null,[Xe,z("span",Ze,P(_l.value.userName),1)]),z("p",null,[el,z("span",ll,P(_l.value.comment),1)])])]),_l.value.orderGoods&&_l.value.orderGoods.length>0?(N(),k("p",al," 商品明细")):Y("",!0),_l.value.orderGoods&&_l.value.orderGoods.length>0?(N(),k("div",tl,[V(jl,{data:_l.value.orderGoods,style:{width:"100%"},"header-cell-style":{background:"#eef1f6",color:"#606266"}},{default:j((()=>[V(w,{prop:"type",label:"商品",align:"center"},{default:j((e=>[z("img",{style:{width:"40px",height:"40px",margin:"0px 5px"},src:e.row.thumbail,alt:""},null,8,rl)])),_:1}),V(w,{prop:"salePrice",label:"单价",align:"center"}),V(w,{prop:"number",label:"数量",align:"center"}),V(w,{prop:"couponAmt",label:"优惠金额",align:"center"}),V(w,{prop:"amount",label:"总价",align:"center"})])),_:1},8,["data"])])):Y("",!0),_l.value.orderSettlePuts&&_l.value.orderSettlePuts.length>0?(N(),k("p",ul,"结算佣金")):Y("",!0),_l.value.orderSettlePuts&&_l.value.orderSettlePuts.length>0?(N(),k("div",sl,[V(jl,{data:_l.value.orderSettlePuts,style:{width:"100%"},"header-cell-style":{background:"#eef1f6",color:"#606266"}},{default:j((()=>[V(w,{prop:"settleAmount",label:"结算佣金",align:"center"}),V(w,{prop:"status",label:"结算状态",align:"center"},{default:j((e=>[z("span",null,P(0===e.row.status?"未结算":1===e.row.status?"已结算":2===e.row.status?"已退回":""),1)])),_:1}),V(w,{prop:"settleType",label:"结算类型",align:"center"},{default:j((e=>[z("span",null,P(1===e.row.settleType?"邀请购买":2===e.row.settleType?"团长自购":""),1)])),_:1}),V(w,{prop:"updateTime",label:"更新时间",align:"center"}),V(w,{prop:"remark",label:"备注",align:"center"})])),_:1},8,["data"])])):Y("",!0)])])),_:1},8,["modelValue"])],64)}}},[["__scopeId","data-v-38a790a4"]]);export{ol as default};