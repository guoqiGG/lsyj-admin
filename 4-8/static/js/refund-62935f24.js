var e=Object.defineProperty,l=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable,t=(l,a,u)=>a in l?e(l,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):l[a]=u,r=(e,r)=>{for(var o in r||(r={}))a.call(r,o)&&t(e,o,r[o]);if(l)for(var o of l(r))u.call(r,o)&&t(e,o,r[o]);return e};import{_ as o,t as s,d,u as n,r as i,v as c,w as p}from"./index-d3c82361.js";import{U as m,V as v}from"./@element-plus-b1a64a18.js";import{E as f}from"./element-plus-520742f9.js";import{f as b,a0 as g,j as y,$ as S,a8 as _,o as h,c as w,V as k,O as x,F as V,a4 as j,M as N,u as C,I as U,P as T,a as z,U as M,T as R,S as E,b6 as A,b5 as I}from"./@vue-476d9f53.js";import"./vue-router-3b718848.js";import"./dayjs-43ef48e6.js";import"./@kangc-16b25a8c.js";import"./vue-3198b1a1.js";import"./axios-f45f83e3.js";import"./echarts-ed669956.js";import"./zrender-93d325f0.js";import"./vuex-9b0668b4.js";import"./js-base64-8ead6284.js";import"./vuex-persistedstate-1d34ce44.js";import"./screenfull-c3c7916b.js";import"./nprogress-fdca1b68.js";import"./lodash-es-b6050654.js";import"./@vueuse-53812618.js";import"./@ctrl-eb0b847c.js";import"./async-validator-1193b133.js";import"./memoize-one-99e54574.js";import"./escape-html-4bbaf1e1.js";import"./normalize-wheel-es-eea50788.js";import"./@floating-ui-a9dc73ab.js";const L=e=>(A("data-v-00dc16f8"),e=e(),I(),e),O=R("查询"),P=R("重置"),B=R("批量上传退款"),F=R("下载批量退款模板"),D=R("导出"),q=R("批量退款"),G={style:{display:"flex","flex-direction":"row"}},$={style:{"margin-left":"20px",width:"150px"}},H=["onClick"],J=[R("退款详情")],K=["onClick"],Q=["onClick"],W={class:"pagination"},X={class:"detail_dialog"},Y={class:"orderNumber"},Z=R("订单编号："),ee={class:"num"},le=R("下单时间："),ae={class:"num"},ue={class:"orderStatus"},te={class:"big"},re={class:"order_status"},oe={class:"status_box"},se={key:0,class:"status_box",style:{color:"#f1300e"}},de=L((()=>z("p",null,"已取消",-1))),ne={key:1,class:"status_box"},ie={class:"status_box"},ce={class:"status_box"},pe={class:"orderDetail"},me={class:"left"},ve=L((()=>z("p",{class:"blod"},"配送信息",-1))),fe=R("提货人:"),be={class:"num"},ge=R("联系电话:"),ye={class:"num"},Se={class:"left"},_e=L((()=>z("p",{class:"blod"},"收货人信息",-1))),he=R("配送方式:"),we={class:"num"},ke=R("发货时间:"),xe={key:0,class:"num"},Ve=R("门店名称:"),je={class:"num"},Ne={class:"left"},Ce=L((()=>z("p",{class:"blod"},"付款信息",-1))),Ue=R("实付金额:"),Te={class:"num"},ze=L((()=>z("p",null,[R("付款方式:"),z("span",{class:"num"},"微信支付")],-1))),Me=R("付款时间:"),Re={class:"num"},Ee={class:"left"},Ae=L((()=>z("p",{class:"blod"},"买家信息",-1))),Ie=R("买家昵称:"),Le={class:"num"},Oe=R("买家留言:"),Pe={class:"num"},Be={class:"product",style:{"margin-top":"20px"}},Fe=["src"],De=R("保存"),qe=R("关闭"),Ge={class:"dialog-footer"},$e=R("拒绝"),He=R(" 同意 ");var Je=o({setup(e){const l=b(!1),a=b({userName:null,userMobile:null,leaderName:null,leaderMobile:null,goodsName:null,refundStatus:null,orderNumber:null,orderType:null,goodsId:null}),u=b({pageNo:1,pageSize:10}),t=b(0);let o=b([]);const A=async()=>{l.value=!0;const e=await s(r(r({},a.value),u.value));l.value=!1,o.value=e.data.list,t.value=e.data.total},I=e=>{u.value.pageSize=e,A()},L=e=>{u.value.pageNo=e,A()},Je=b(),Ke=b(!0),Qe=b([]),We=e=>{Qe.value=e,Qe.value&&Qe.value.length>0&&(Ke.value=!1)},Xe=b(!1),Ye=()=>{Qe.value&&Qe.value.length>0&&(Xe.value=!0)},Ze=async e=>{let l=[];Qe.value.map((e=>{e.id&&l.push(e.id)}));let a={auditStatus:1,ids:l};2===e&&(a.auditStatus=2);const u=await n(a);0===u.code?f.success("审核成功"):f.error(u.msg),Xe.value=!1,Ke.value=!0,Je.value.clearSelection(),A()},el=(e,l,a)=>{0===e.code?f.success("退款成功"):f.error(e.msg),A()},ll=(e,l,a)=>{f.error("上传失败")},al=b(!1),ul=b(),tl=b(!1),rl=b(!1),ol=b(null),sl=b({id:null,remark:null}),dl=g({remark:[{required:!0,message:"请输入退款备注",trigger:"blur"}]}),nl=async(e,l)=>{if(2===l)sl.value={},sl.value.id=e.id,rl.value=!0;else if(1===l){const l=await c({id:e.id,auditStatus:1});if(0!==l.code)return f.error(l.msg),!1;f.success("审核通过"),A()}},il=b([]),cl=async e=>{const l=await d({name:e,pageNo:1,pageSize:1e8});il.value=l.data.list},pl=async()=>{l.value=!0;const e=await p({userName:a.value.userName,userMobile:a.value.userMobile,leaderName:a.value.leaderName,leaderMobile:a.value.leaderMobile,goodsName:a.value.goodsName,refundStatus:a.value.refundStatus,orderNumber:a.value.orderNumber,orderType:a.value.orderType,goodsId:a.value.goodsId});l.value=!1;var u=new Blob([e],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"});const t="退款订单信息表",r=document.createElement("a");"download"in r?(r.download=t,r.style.display="none",r.href=URL.createObjectURL(u),document.body.appendChild(r),r.click(),URL.revokeObjectURL(r.href),document.body.removeChild(r)):navigator.msSaveBlob(u,t)};return y((()=>{A(),(async()=>{const e=await d({pageNo:1,pageSize:10});il.value=e.data.list})()})),(e,r)=>{const s=S("el-input"),d=S("el-form-item"),n=S("el-col"),p=S("el-option"),b=S("el-select"),g=S("el-button"),y=S("el-row"),ml=S("el-upload"),vl=S("el-form"),fl=S("el-card"),bl=S("el-table-column"),gl=S("el-image"),yl=S("el-table"),Sl=S("el-pagination"),_l=S("el-dialog"),hl=_("loading");return h(),w(V,null,[k(fl,null,{default:x((()=>[k(vl,{inline:!0,model:a.value,class:"demo-form-inline","lable-width":"100px"},{default:x((()=>[k(y,null,{default:x((()=>[k(n,{lg:6,md:8,sm:12},{default:x((()=>[k(d,{label:"用户名称"},{default:x((()=>[k(s,{modelValue:a.value.userName,"onUpdate:modelValue":r[0]||(r[0]=e=>a.value.userName=e),placeholder:"用户名称",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),k(n,{lg:6,md:8,sm:12},{default:x((()=>[k(d,{label:"用户手机"},{default:x((()=>[k(s,{modelValue:a.value.userMobile,"onUpdate:modelValue":r[1]||(r[1]=e=>a.value.userMobile=e),placeholder:"用户手机号",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),k(n,{lg:6,md:8,sm:12},{default:x((()=>[k(d,{label:"团长名称"},{default:x((()=>[k(s,{modelValue:a.value.leaderName,"onUpdate:modelValue":r[2]||(r[2]=e=>a.value.leaderName=e),placeholder:"团长名称",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),k(n,{lg:6,md:8,sm:12},{default:x((()=>[k(d,{label:"团长手机"},{default:x((()=>[k(s,{modelValue:a.value.leaderMobile,"onUpdate:modelValue":r[3]||(r[3]=e=>a.value.leaderMobile=e),placeholder:"团长手机号",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),k(n,{lg:6,md:8,sm:12},{default:x((()=>[k(d,{label:"退款状态"},{default:x((()=>[k(b,{modelValue:a.value.refundStatus,"onUpdate:modelValue":r[4]||(r[4]=e=>a.value.refundStatus=e),placeholder:"请选择",clearable:""},{default:x((()=>[k(p,{label:"申请中",value:"1"}),k(p,{label:"已退款",value:"2"}),k(p,{label:"已拒绝",value:"3"}),k(p,{label:"后台手动退款成功",value:"4"})])),_:1},8,["modelValue"])])),_:1})])),_:1}),k(n,{lg:6,md:8,sm:12},{default:x((()=>[k(d,{label:"订单编号"},{default:x((()=>[k(s,{modelValue:a.value.orderNumber,"onUpdate:modelValue":r[5]||(r[5]=e=>a.value.orderNumber=e),placeholder:"订单编号",clearable:""},null,8,["modelValue"])])),_:1})])),_:1}),k(n,{lg:6,md:8,sm:12},{default:x((()=>[k(d,{label:"订单类型"},{default:x((()=>[k(b,{modelValue:a.value.orderType,"onUpdate:modelValue":r[6]||(r[6]=e=>a.value.orderType=e),placeholder:"请选择",clearable:""},{default:x((()=>[k(p,{label:"配送单",value:"1"}),k(p,{label:"自提单",value:"2"})])),_:1},8,["modelValue"])])),_:1})])),_:1}),k(n,{lg:6,md:8,sm:12},{default:x((()=>[k(d,{label:"商品名称"},{default:x((()=>[k(b,{modelValue:a.value.goodsId,"onUpdate:modelValue":r[7]||(r[7]=e=>a.value.goodsId=e),filterable:"",remote:"","reserve-keyword":"",placeholder:"请输入商品名称","remote-show-suffix":"","remote-method":cl,clearable:""},{default:x((()=>[(h(!0),w(V,null,j(il.value,(e=>(h(),N(p,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),k(d,null,{default:x((()=>[k(g,{type:"primary",onClick:A},{default:x((()=>[O])),_:1}),k(g,{onClick:r[8]||(r[8]=e=>(a.value={},void A()))},{default:x((()=>[P])),_:1})])),_:1})])),_:1}),k(y,null,{default:x((()=>[k(d,null,{default:x((()=>[k(ml,{style:{margin:"0px 20px 0px 0px"},"file-list":e.fileList,"onUpdate:file-list":r[9]||(r[9]=l=>e.fileList=l),class:"upload-demo","show-file-list":!1,action:C("https://qct.hnliyue.cn/youth")+"/upload/order/refund/success",headers:{Authorization:e.token},multiple:!1,"on-success":el,"on-error":ll},{default:x((()=>[k(g,{icon:C(m),type:"primary"},{default:x((()=>[B])),_:1},8,["icon"])])),_:1},8,["file-list","action","headers"]),k(g,{icon:C(v),onClick:r[10]||(r[10]=e=>{window.location.href="https://qingchuntai2.oss-cn-beijing.aliyuncs.com/2024/02/20/%E9%80%80%E6%AC%BE%E6%89%B9%E9%87%8F%E6%93%8D%E4%BD%9C%E8%A1%A8.xlsx"})},{default:x((()=>[F])),_:1},8,["icon"])])),_:1})])),_:1})])),_:1},8,["model"])])),_:1}),k(fl,{style:{"margin-top":"10px"}},{default:x((()=>[k(g,{icon:C(v),style:{"margin-bottom":"20px"},onClick:pl},{default:x((()=>[D])),_:1},8,["icon"]),k(g,{type:"primary",class:U(Ke.value?"button_false":"button-class"),style:{"margin-bottom":"20px"},disabled:Ke.value,onClick:Ye},{default:x((()=>[q])),_:1},8,["class","disabled"]),T((h(),N(yl,{data:C(o),style:{width:"100%"},ref_key:"multipleTableRef",ref:Je,"header-cell-style":{background:"#f7f8fa",color:"#000"},onSelectionChange:We},{default:x((()=>[k(bl,{type:"selection",width:"55"}),k(bl,{label:"商品信息",width:"250"},{default:x((e=>[z("div",G,[k(gl,{style:{width:"60px",height:"60px","border-radius":"5px"},src:e.row.orderGoodsList[0].thumbail,alt:""},null,8,["src"]),z("div",$,M(e.row.orderGoodsList[0].title),1)])])),_:1}),k(bl,{prop:"orderNumber",label:"订单号",align:"center",width:"170"}),k(bl,{label:"买家信息",width:"180"},{default:x((e=>[z("div",null,"昵称："+M(e.row.userName),1),z("div",null,"手机："+M(e.row.userMobile),1)])),_:1}),k(bl,{label:"团长信息",width:"180"},{default:x((e=>[z("div",null,"姓名："+M(e.row.leaderName),1),z("div",null,"手机："+M(e.row.leaderMobile),1)])),_:1}),k(bl,{prop:"orderType",label:"订单类型",align:"center",width:"80"},{default:x((e=>[R(M(1==e.row.orderType?"快递":2==e.row.refundStatus?"自提":""),1)])),_:1}),k(bl,{prop:"refundAmount",label:"申请金额",align:"center"}),k(bl,{prop:"realRefundAmount",label:"退款金额",align:"center"}),k(bl,{prop:"refundStatus",label:"退款状态",align:"center",width:"120"},{default:x((e=>[R(M(1==e.row.refundStatus?"申请中":2==e.row.refundStatus?"已退款":3==e.row.refundStatus?"已拒绝":4==e.row.refundStatus?"后台退款成功":""),1)])),_:1}),k(bl,{prop:"remark",label:"备注",align:"center"}),k(bl,{prop:"refundReason",label:"退款原因",align:"center"},{default:x((e=>[R(M(1==e.row.refundReason?"拍错":2==e.row.refundReason?"协商一致退款":3==e.row.refundReason?"其他":""),1)])),_:1}),k(bl,{fixed:"right",label:"操作",width:"180",align:"center"},{default:x((e=>[T((h(),w("span",{class:"operation",onClick:l=>(async e=>{tl.value=!0;const l=await i(e.orderId);0===l.code&&(ul.value=l.data,tl.value=!1,al.value=!0)})(e.row)},J,8,H)),[[hl,tl.value,void 0,{fullscreen:!0,lock:!0}]]),z("span",{class:"operation",onClick:l=>nl(e.row,1)},"通过",8,K),z("span",{class:"operation",onClick:l=>nl(e.row,2)},"拒绝",8,Q)])),_:1})])),_:1},8,["data"])),[[hl,l.value]]),z("div",W,[k(Sl,{background:"",layout:"total, sizes, prev, pager, next, jumper","page-size":u.value.pageSize,"onUpdate:page-size":r[11]||(r[11]=e=>u.value.pageSize=e),"current-page":u.value.pageNo,"onUpdate:current-page":r[12]||(r[12]=e=>u.value.pageNo=e),"page-sizes":[10,20,50,100,200,500],total:t.value,onSizeChange:I,onCurrentChange:L},null,8,["page-size","current-page","total"])])])),_:1}),k(_l,{modelValue:al.value,"onUpdate:modelValue":r[13]||(r[13]=e=>al.value=e),title:"订单详情",width:"900px"},{default:x((()=>[z("div",X,[z("div",Y,[z("p",null,[Z,z("span",ee,M(ul.value.payTransId),1)]),z("p",null,[le,z("span",ae,M(ul.value.statusPayedTime),1)])]),z("div",ue,[z("p",te,M(1e3===ul.value.orderStatus?"待付款":1001===ul.value.orderStatus?"已支付":2001===ul.value.orderStatus?"待收货":2002===ul.value.orderStatus?"后台确认收货（已完成":3001===ul.value.orderStatus?"用户点击确认收货":9e3===ul.value.orderStatus?"已取消":8e3===ul.value.orderStatus?"错误":""),1)]),z("div",re,[z("div",oe,[z("p",{class:U(["yuan",ul.value.orderStatus>=1e3&&ul.value.orderStatus<=9e3?"borderColor":""])},"1 ",2),z("p",{class:U(ul.value.orderStatus>=1e3&&ul.value.orderStatus<=9e3?"color":"")},"待付款",2),z("p",{class:U(ul.value.orderStatus>=1e3&&ul.value.orderStatus<=9e3?"color":"")},M(ul.value.statusCreateTime),3)]),z("p",{class:U(["line",ul.value.orderStatus>=1001&&ul.value.orderStatus<8e3||9e3===ul.value.orderStatus?"bg_color":""])},null,2),9e3===ul.value.orderStatus?(h(),w("div",se,[z("p",{class:U(["yuan",9e3===ul.value.orderStatus?"redColor":""])},"2 ",2),de,z("p",null,M(ul.value.statusPayedTime||"暂无时间信息"),1)])):(h(),w("div",ne,[z("p",{class:U(["yuan",ul.value.orderStatus>=1001&&ul.value.orderStatus<8e3?"borderColor":""])},"2 ",2),z("p",{class:U(ul.value.orderStatus>=1001&&ul.value.orderStatus<8e3?"color":"")},"已支付",2),z("p",{class:U(ul.value.orderStatus>=1001&&ul.value.orderStatus<8e3?"color":"")},M(ul.value.statusPayedTime||"暂无时间信息"),3)])),z("p",{class:U(["line",ul.value.orderStatus>=2001&&ul.value.orderStatus<8e3?"bg_color":""])},null,2),z("div",ie,[z("p",{class:U(["yuan",ul.value.orderStatus>=2001&&ul.value.orderStatus<8e3?"borderColor":""])},"3 ",2),z("p",{class:U(ul.value.orderStatus>=2001&&ul.value.orderStatus<8e3?"color":"")},"待收货",2),z("p",{class:U(ul.value.orderStatus>=2001&&ul.value.orderStatus<8e3?"color":"")},M(ul.value.statusFinishedTime||"暂无时间信息"),3)]),z("p",{class:U(["line",(ul.value.orderStatus>=2002||ul.value.orderStatus>=3001)&&ul.value.orderStatus<8e3?"bg_color":""])},null,2),z("div",ce,[z("p",{class:U(["yuan",(ul.value.orderStatus>=2002||ul.value.orderStatus>=3001)&&ul.value.orderStatus<8e3?"borderColor":""])}," 4",2),z("p",{class:U((ul.value.orderStatus>=2002||ul.value.orderStatus>=3001)&&ul.value.orderStatus<8e3?"color":"")}," 已完成",2),z("p",{class:U((ul.value.orderStatus>=2002||ul.value.orderStatus>=3001)&&ul.value.orderStatus<8e3?"color":"")},M(ul.value.statusFinishedTime||"暂无时间信息"),3)])]),z("div",pe,[z("div",me,[ve,z("p",null,[fe,z("span",be,M(ul.value.leaderName),1)]),z("p",null,[ge,z("span",ye,M(ul.value.leaderMobile),1)])]),z("div",Se,[_e,z("p",null,[he,z("span",we,M(1===ul.value.orderType?"快递":2===ul.value.orderType?"自提":""),1)]),z("p",null,[ke,ul.value.orderStatus>="2001"&&"9000"!=ul.value.orderStatus&&"8000"!=ul.value.orderStatus?(h(),w("span",xe,M(ul.value.statusDeliveringTime),1)):E("",!0)]),z("p",null,[Ve,z("span",je,M(ul.value.leaderAddress),1)])]),z("div",Ne,[Ce,z("p",null,[Ue,z("span",Te,M(ul.value.payCallback),1)]),ze,z("p",null,[Me,z("span",Re,M(ul.value.statusPayedTime),1)])]),z("div",Ee,[Ae,z("p",null,[Ie,z("span",Le,M(ul.value.userName),1)]),z("p",null,[Oe,z("span",Pe,M(ul.value.comment),1)])])]),z("div",Be,[k(yl,{data:ul.value.orderRefundAdminList,style:{width:"100%"},"header-cell-style":{background:"#eef1f6",color:"#606266"}},{default:x((()=>[k(bl,{prop:"type",label:"商品",align:"center"},{default:x((e=>[(h(!0),w(V,null,j(e.row.imgList,(e=>(h(),w("img",{class:"product_img",style:{width:"40px",height:"40px",margin:"0px 5px"},src:e,alt:""},null,8,Fe)))),256))])),_:1}),k(bl,{prop:"goodsName",label:"商品名称",align:"center"}),k(bl,{prop:"applyRefundNum",label:"申请退款数量",align:"center"}),k(bl,{prop:"refundAmount",label:"申请金额",align:"center"}),k(bl,{prop:"realRefundAmount",label:"同意退款金额",align:"center"}),k(bl,{prop:"remark",label:"申请退款备注",align:"center"})])),_:1},8,["data"])])])])),_:1},8,["modelValue"]),k(_l,{modelValue:rl.value,"onUpdate:modelValue":r[17]||(r[17]=e=>rl.value=e),title:"审核",width:"500px",close:e.clearEditForm},{default:x((()=>[k(vl,{ref_key:"formRef",ref:ol,rules:C(dl),model:sl.value,class:"demo-form-inline","lable-width":"100px"},{default:x((()=>[k(d,{label:"拒绝原因",prop:"remark"},{default:x((()=>[k(s,{modelValue:sl.value.remark,"onUpdate:modelValue":r[14]||(r[14]=e=>sl.value.remark=e),placeholder:"拒绝原因",clearable:""},null,8,["modelValue"])])),_:1}),k(d,{class:"footer"},{default:x((()=>[k(g,{type:"primary",onClick:r[15]||(r[15]=e=>(ol.value,void ol.value.validate((async e=>{if(!e)return!1;{const e=await c({remark:sl.value.remark,id:sl.value.id,auditStatus:2});if(0!==e.code)return f.error(e.msg),!1;f.success("拒绝成功"),A(),rl.value=!1}}))))},{default:x((()=>[De])),_:1}),k(g,{onClick:r[16]||(r[16]=e=>rl.value=!1)},{default:x((()=>[qe])),_:1})])),_:1})])),_:1},8,["rules","model"])])),_:1},8,["modelValue","close"]),k(_l,{modelValue:Xe.value,"onUpdate:modelValue":r[20]||(r[20]=e=>Xe.value=e),title:"批量审核",width:"500px",center:""},{footer:x((()=>[z("div",Ge,[k(g,{onClick:r[18]||(r[18]=e=>Ze(2))},{default:x((()=>[$e])),_:1}),k(g,{type:"primary",onClick:r[19]||(r[19]=e=>Ze(1))},{default:x((()=>[He])),_:1})])])),default:x((()=>[(h(!0),w(V,null,j(Qe.value,((e,l)=>(h(),w("span",{key:l,style:{margin:"0 10px"}},M(e.userName),1)))),128))])),_:1},8,["modelValue"])],64)}}},[["__scopeId","data-v-00dc16f8"]]);export{Je as default};