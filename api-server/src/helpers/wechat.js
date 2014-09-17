// Generated by LiveScript 1.2.0
(function(){
  var encrypt, xml2js, parseJson, parseXml, wechat;
  encrypt = require('./encrypt');
  xml2js = require('xml2js');
  parseJson = function(xml, events){
    var msg;
    console.log(events);
    msg = {};
    xml2js.parseString(xml, function(err, result){
      var data;
      data = result.xml;
      msg.ToUserName = data.ToUserName[0];
      msg.FromUserName = data.FromUserName[0];
      msg.CreateTime = data.CreateTime[0];
      msg.MsgType = data.MsgType[0];
      if ('function' === typeof events.all) {
        events.all(msg);
      }
      switch (msg.MsgType) {
      case 'text':
        msg.Content = data.Content[0];
        msg.MsgId = data.MsgId[0];
        if ('function' === typeof events.text) {
          events.text(msg);
        }
        break;
      case 'image':
        msg.PicUrl = data.PicUrl[0];
        msg.MsgId = data.MsgId[0];
        msg.MediaId = data.MediaId[0];
        if ('function' === typeof events.image) {
          events.image(msg);
        }
        break;
      case 'voice':
        msg.MediaId = data.MediaId[0];
        msg.Format = data.Format[0];
        msg.MsgId = data.MsgId[0];
        if ('function' === typeof events.voice) {
          events.voice(msg);
        }
        break;
      case 'video':
        msg.MediaId = data.MediaId[0];
        msg.ThumbMediaId = data.ThumbMediaId[0];
        msg.MsgId = data.MsgId[0];
        if ('function' === typeof events.video) {
          events.video(msg);
        }
        break;
      case 'location':
        msg.Location_X = data.Location_X[0];
        msg.Location_Y = data.Location_Y[0];
        msg.Scale = data.Scale[0];
        msg.Label = data.Label[0];
        msg.MsgId = data.MsgId[0];
        if ('function' === typeof events.location) {
          events.location(msg);
        }
        break;
      case 'link':
        msg.Title = data.Title[0];
        msg.Description = data.Description[0];
        msg.Url = data.Url[0];
        msg.MsgId = data.MsgId[0];
        if ('function' === typeof events.link) {
          events.link(msg);
        }
        break;
      case 'event':
        msg.Event = data.Event[0];
        msg.EventKey = data.EventKey[0];
        if ('function' === typeof events.event) {
          events.event(msg);
        }
      }
    });
    return msg;
  };
  parseXml = function(data){
    var MsgType, msg, ArticlesStr, ArticleCount, i$, ref$, len$, i;
    MsgType = "";
    if (!data.MsgType) {
      if (data.hasOwnProperty('Content')) {
        MsgType = "text";
      }
      if (data.hasOwnProperty('MusicUrl')) {
        MsgType = "music";
      }
      if (data.hasOwnProperty('Articles')) {
        MsgType = "news";
      }
    } else {
      MsgType = data.MsgType;
    }
    msg = "<xml>\n<ToUserName><![CDATA[" + (data.ToUserName || '') + "]]></ToUserName>\n<FromUserName><![CDATA[" + (data.FromUserName || '') + "]]></FromUserName>\n<CreateTime>" + ('' + Date.now() / 1000) + "\"</CreateTime>\n<MsgType><![CDATA[" + (MsgType || '') + "]]></MsgType>";
    switch (MsgType) {
    case 'text':
      msg += "<Content><![CDATA[" + (data.Content || '') + "]]></Content>\n</xml>";
      break;
    case 'image':
      msg += "<Image>\n<MediaId><![CDATA[" + (data.MediaId || '') + "]]></MediaId>\n</Image>\n</xml>";
      break;
    case 'voice':
      msg += "<Voice>\n<MediaId><![CDATA[" + (data.MediaId || '') + "]]></MediaId>\n<Title><![CDATA[" + (data.Title || '') + "]]></Title>\n<Description><![CDATA[" + (data.Description || '') + "]]></Description>\n</Voice>\n</xml>";
      break;
    case 'video':
      msg += "<Video>\n<MediaId><![CDATA[" + (data.MediaId || '') + "]]></MediaId>\n</Video>\n</xml>";
      break;
    case 'music':
      msg += "<Music>\n<Title><![CDATA[" + (data.Title || '') + "]]></Title>\n<Description><![CDATA[" + (data.Description || '') + "]]></Description>\n<MusicUrl><![CDATA[" + (data.MusicUrl || '') + "]]></MusicUrl>\n<HQMusicUrl><![CDATA[" + (data.HQMusicUrl || data.MusicUrl || '') + "]]></HQMusicUrl>\n<ThumbMediaId><![CDATA[" + (data.ThumbMediaId || '') + "]]></ThumbMediaId>\n</Music>\n</xml>";
      break;
    case 'news':
      ArticlesStr = '';
      ArticleCount = data.Articles.length;
      for (i$ = 0, len$ = (ref$ = data.Articles).length; i$ < len$; ++i$) {
        i = ref$[i$];
        ArticlesStr += "<item>\n<Title><![CDATA[" + (data.Articles[i].Title || '') + "]]></Title>\n<Description><![CDATA[" + (data.Articles[i].Description || '') + "]]></Description>\n<PicUrl><![CDATA[" + (data.Articles[i].PicUrl || '') + "]]></PicUrl>\n<Url><![CDATA[" + (data.Articles[i].Url || '') + "]]></Url>\n</item>";
      }
      msg += "<ArticleCount>" + ArticleCount + "</ArticleCount><Articles>" + ArticlesStr + "</Articles></xml>";
    }
    return msg;
  };
  wechat = (function(){
    wechat.displayName = 'wechat';
    var prototype = wechat.prototype, constructor = wechat;
    function wechat(token){
      this.token = token;
      this.video = bind$(this, 'video', prototype);
      this.voice = bind$(this, 'voice', prototype);
      this.event = bind$(this, 'event', prototype);
      this.link = bind$(this, 'link', prototype);
      this.location = bind$(this, 'location', prototype);
      this.image = bind$(this, 'image', prototype);
      this.text = bind$(this, 'text', prototype);
      this.all = bind$(this, 'all', prototype);
      this.events = {};
    }
    prototype.checkSignature = function(parms){
      var strHash;
      if (!this.token || !parms || !parms.timestamp || !parms.nonce || !parms.signature) {
        return false;
      }
      strHash = encrypt.sha1Hash([this.token, parms.timestamp, parms.nonce].sort().join(''));
      if (strHash === parms.signature) {
        return true;
      } else {
        return false;
      }
    };
    prototype.all = function(next){
      this.events.all = next;
      return this;
    };
    prototype.text = function(next){
      this.events.text = next;
      return this;
    };
    prototype.image = function(next){
      this.events.image = next;
      return this;
    };
    prototype.location = function(next){
      this.events.location = next;
      return this;
    };
    prototype.link = function(next){
      this.events.link = next;
      return this;
    };
    prototype.event = function(next){
      this.events.event = next;
      return this;
    };
    prototype.voice = function(next){
      this.events.voice = next;
      return this;
    };
    prototype.video = function(next){
      this.events.video = next;
      return this;
    };
    prototype.getMsg = function(req, next){
      var xml;
      xml = '';
      req.on('data', function(chunk){
        return xml += chunk;
      });
      return req.on('end', function(){
        return next(parseJson(xml, this.events));
      });
    };
    prototype.parseMsg = function(data){
      return parseXml(data);
    };
    return wechat;
  }());
  module.exports = function(token){
    return new wechat(token);
  };
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);
