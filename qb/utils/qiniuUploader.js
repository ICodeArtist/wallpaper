!function() {
    function n(n) {
        l = {
            qiniuRegion: "",
            qiniuImageURLPrefix: "",
            qiniuUploadToken: "",
            qiniuUploadTokenURL: "",
            qiniukey: "",
            xmlshuzi: "",
            qiniuUploadTokenFunction: null
        }, i(n);
    }
    function i(n) {
        n.region ? l.qiniuRegion = n.region : console.error("qiniu uploader need your bucket region"), 
        n.uptoken ? l.qiniuUploadToken = n.uptoken : n.uptokenURL ? l.qiniuUploadTokenURL = n.uptokenURL : n.uptokenFunc && (l.qiniuUploadTokenFunction = n.uptokenFunc), 
        n.qiniukey && (l.qiniukey = n.qiniukey), n.xmlshuzi && (l.xmlshuzi = n.xmlshuzi), 
        n.domain && (l.qiniuImageURLPrefix = n.domain);
    }
    function e(n, i, e, o) {
        var a = u(l.qiniuRegion);
        n.split("//")[1];
        o && o.key && o.key;
        var t = {
            token: l.qiniuUploadToken,
            key: l.qiniukey
        };
        wx.uploadFile({
            url: a,
            filePath: n,
            name: "file",
            formData: t,
            success: function(n) {
                var e = n.data, o = JSON.parse(e), u = l.qiniuImageURLPrefix + "/" + o.key;
                o.imageURL = u, console.log(o), i && i(o);
            },
            fail: function(n) {
                console.log(n), e && e(n);
            }
        });
    }
    function o(n) {
        wx.request({
            url: l.qiniuUploadTokenURL,
            success: function(i) {
                var e = i.data;
                l.qiniuUploadToken = e, n && n();
            },
            fail: function(n) {
                console.log(n);
            }
        });
    }
    function u(n) {
        var i = null;
        switch (n) {
          case "ECN":
            i = "https://up.qbox.me";
            break;

          case "NCN":
            i = "https://up-z1.qbox.me";
            break;

          case "SCN":
            i = "https://up-z2.qbox.me";
            break;

          case "NA":
            i = "https://up-na0.qbox.me";
            break;

          default:
            console.error("please make the region is with one of [ECN, SCN, NCN, NA]");
        }
        return i;
    }
    var l = {
        qiniuRegion: "",
        qiniuImageURLPrefix: "",
        qiniuUploadToken: "",
        qiniuUploadTokenURL: "",
        qiniukey: "",
        xmlshuzi: "",
        qiniuUploadTokenFunction: null
    };
    module.exports = {
        init: n,
        upload: function(i, u, a, t) {
            if (null != i) if (t && n(t), l.qiniuUploadToken) e(i, u, a, t); else if (l.qiniuUploadTokenURL) o(function() {
                e(i, u, a, t);
            }); else {
                if (!l.qiniuUploadTokenFunction) return void console.error("qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]");
                l.qiniuUploadToken = l.qiniuUploadTokenFunction();
            } else console.error("qiniu uploader need filePath to upload");
        }
    };
}();