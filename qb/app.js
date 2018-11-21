App({
    onLaunch: function() {
        var e = this, n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n), wx.cloud ? wx.cloud.init({
            env: "room2-9fd8fd",
            traceUser: !0
        }) : console.error("请使用 2.2.3 或以上的基础库以使用云能力"), wx.login({
            success: function(e) {}
        }), wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(n) {
                        e.globalData.userInfo = n.userInfo, e.userInfoReadyCallback && e.userInfoReadyCallback(n);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null
    }
});