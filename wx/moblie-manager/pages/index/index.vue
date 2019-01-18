<template>
    <view>
        <view class="grace-padding grace-bg-white grace-common-mt grace-common-border">
            <view class="grace-form">
                <form @submit="formSubmit">
                    <view class="grace-items">
                        <view class="grace-label">账号</view>
                        <input class="input" name="username" type="number"></input>
                    </view>
                    <view class="grace-items">
                        <view class="grace-label">到期日期</view>
                        <view class="grace-form-r">
                            <picker @change="bindDateChange" :value="dateValue" mode="date" name="bd" start="2019-01-01" end="2039-01-01" fields='day'>
                                <text>{{dateValue}}</text>
                            </picker>
                        </view>
                    </view>
                    <view class="grace-items">
                        <view class="grace-label">订购</view>
                        <view class="grace-label-x">
                            <checkbox-group name="dg">
                                <label><checkbox value="1"></checkbox>壁画</label>
                                <label><checkbox value="2"></checkbox>墙布</label>
                                <label><checkbox value="3"></checkbox>窗帘</label>
                            </checkbox-group>
                        </view>
                    </view>
                    <view style="padding:22upx 0;">
                        <button formType="submit" type="primary" style="width:100%;">提交</button>
                    </view>
                </form>
            </view>
        </view>
    </view>
</template>
<script>
var  graceChecker = require("../../graceUI/graceChecker.js");
export default {
    data() {
        return {
            dateValue : "2019-01-01"
        }
    },
    methods:{
        bindDateChange : function(e){
            this.dateValue = e.detail.value;
			console.log(e.detail.value);
        },
        formSubmit : function(e){
           var rule = [
				{name:"username", checkType : "phoneno",  errorMsg:"账号为正确手机号"},
				{name:"bd", checkType : "notsame", checkRule:"请选择",  errorMsg:"到期日期"},
				{name:"dg", checkType : "notnull", checkRule:"",  errorMsg:"请选择订购"},
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if(checkRes){
				uni.showLoading({
					title: '提交中',
					mask:true
				});
				uni.request({
					url: 'https://www.wxori.top/api/manager/setbuy', 
					data: formData,
					method:'post',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						uni.showToast({
							title:res.data.msg,
							icon:res.data.icon
						})
						// uni.hideLoading();
					},
					fail() {
						uni.showToast({
							title:"错误",
							icon:"none"
						})
					}
				});
			}else{
				uni.showToast({ title: graceChecker.error, icon: "none" });
			}
        }
    }
}
</script>