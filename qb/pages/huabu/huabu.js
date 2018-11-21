Page({
    data: {
        gaodu: ""
    },
    save: function() {
        var a = this;
        wx.saveImageToPhotosAlbum({
            filePath: a.data.path,
            success: function(a) {}
        });
    },
    onLoad: function(a) {
        var t = a.path, o = a.gaodu;
        this.setData({
            path: t,
            gaodu: o
        });
    },
    onShareAppMessage: function() {}
});