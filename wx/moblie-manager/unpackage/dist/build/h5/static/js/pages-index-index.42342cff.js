(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"898c":function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("v-uni-view",[t("v-uni-view",{staticClass:"grace-padding grace-bg-white grace-common-mt grace-common-border"},[t("v-uni-view",{staticClass:"grace-form"},[t("v-uni-form",{on:{submit:function(r){r=e.$handleEvent(r),e.formSubmit(r)}}},[t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-view",{staticClass:"grace-label"},[e._v("账号")]),t("v-uni-input",{staticClass:"input",attrs:{name:"username",type:"number"}})],1),t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-view",{staticClass:"grace-label"},[e._v("到期日期")]),t("v-uni-view",{staticClass:"grace-form-r"},[t("v-uni-picker",{attrs:{value:e.dateValue,mode:"date",name:"bd",start:"2019-01-01",end:"2039-01-01",fields:"day"},on:{change:function(r){r=e.$handleEvent(r),e.bindDateChange(r)}}},[t("v-uni-text",[e._v(e._s(e.dateValue))])],1)],1)],1),t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-view",{staticClass:"grace-label"},[e._v("订购")]),t("v-uni-view",{staticClass:"grace-label-x"},[t("v-uni-checkbox-group",{attrs:{name:"dg"}},[t("v-uni-label",[t("v-uni-checkbox",{attrs:{value:"1"}}),e._v("壁画")],1),t("v-uni-label",[t("v-uni-checkbox",{attrs:{value:"2"}}),e._v("墙布")],1),t("v-uni-label",[t("v-uni-checkbox",{attrs:{value:"3"}}),e._v("窗帘")],1)],1)],1)],1),t("v-uni-view",{staticStyle:{padding:"22upx 0"}},[t("v-uni-button",{staticStyle:{width:"100%"},attrs:{formType:"submit",type:"primary"}},[e._v("提交")])],1)],1)],1)],1)],1)},a=[],i=t("c657"),s={data:function(){return{dateValue:"2019-01-01"}},methods:{bindDateChange:function(e){this.dateValue=e.detail.value,console.log(e.detail.value)},formSubmit:function(e){var r=[{name:"username",checkType:"phoneno",errorMsg:"账号为正确手机号"},{name:"bd",checkType:"notsame",checkRule:"请选择",errorMsg:"到期日期"},{name:"dg",checkType:"notnull",checkRule:"",errorMsg:"请选择订购"}],t=e.detail.value,n=i.check(t,r);n?(uni.showLoading({title:"提交中",mask:!0}),uni.request({url:"https://www.wxori.top/api/manager/setbuy",data:t,method:"post",header:{"content-type":"application/x-www-form-urlencoded"},success:function(e){uni.showToast({title:e.data.msg,icon:e.data.icon})},fail:function(){uni.showToast({title:"错误",icon:"none"})}})):uni.showToast({title:i.error,icon:"none"})}}},u=s,c=t("2877"),o=Object(c["a"])(u,n,a,!1,null,null,null);o.options.__file="index.vue";r["default"]=o.exports},c657:function(e,r){e.exports={error:"",check:function(e,r){for(var t=0;t<r.length;t++){if(!r[t].checkType)return!0;if(!r[t].name)return!0;if(!r[t].errorMsg)return!0;if(!e[r[t].name])return this.error=r[t].errorMsg,!1;switch(r[t].checkType){case"string":var n=new RegExp(".{"+r[t].checkRule+"}");if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"int":n=new RegExp("^(-[1-9]|[1-9])[0-9]{"+r[t].checkRule+"}$");if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"between":if(!this.isNumber(e[r[t].name]))return this.error=r[t].errorMsg,!1;var a=r[t].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[r[t].name]>a[1]||e[r[t].name]<a[0])return this.error=r[t].errorMsg,!1;break;case"betweenD":n=/^-?[1-9][0-9]?$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;a=r[t].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[r[t].name]>a[1]||e[r[t].name]<a[0])return this.error=r[t].errorMsg,!1;break;case"betweenF":n=/^-?[0-9][0-9]?.+[0-9]+$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;a=r[t].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[r[t].name]>a[1]||e[r[t].name]<a[0])return this.error=r[t].errorMsg,!1;break;case"same":if(e[r[t].name]!=r[t].checkRule)return this.error=r[t].errorMsg,!1;break;case"notsame":if(e[r[t].name]==r[t].checkRule)return this.error=r[t].errorMsg,!1;break;case"email":n=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"phoneno":n=/^1[0-9]{10,10}$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"zipcode":n=/^[0-9]{6}$/;if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"reg":n=new RegExp(r[t].checkRule);if(!n.test(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"in":if(-1==r[t].checkRule.indexOf(e[r[t].name]))return this.error=r[t].errorMsg,!1;break;case"notnull":if(null==e[r[t].name]||e[r[t].name].length<1)return this.error=r[t].errorMsg,!1;break}}return!0},isNumber:function(e){var r=/^-?[1-9][0-9]?.?[0-9]*$/;return r.test(e)}}}}]);