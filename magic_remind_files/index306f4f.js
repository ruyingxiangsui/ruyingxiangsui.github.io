define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/a_tpl.html.js","appmsg/img_copyright_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","rt/appmsg/getappmsgext.rt.js","pages/version4video.js","appmsg/cdn_img_lib.js","biz_common/utils/url/parse.js","appmsg/a.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js","appmsg/iframe.js"],function(require,exports,module,alert){
"use strict";
function saveCopy(e){
var i={};
for(var t in e)if(e.hasOwnProperty(t)){
var r=e[t],a=typeof r;
r="string"==a?r.htmlDecode():r,"object"==a&&(r=saveCopy(r)),i[t]=r;
}
return i;
}
function img_copyright(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var i={},t=e.img_copy_info.list,r=window.__appmsgCgiData.copyright_stat,a=window.__appmsgCgiData.source_biz,n=0,o=t.length;o>n;n++){
var s=t[n];
if(2==s.type){
if(2==r&&a==s.source_uin)continue;
i[s.img_url]={
source_nickname:s.source_nickname,
source_uin:s.source_uin,
source_encode_biz:s.source_encode_biz||""
};
}
}
for(var p=document.getElementsByTagName("img"),n=0,o=p.length;o>n;n++){
var s=p[n],d=s.getAttribute("data-src")||s.getAttribute("data-backsrc")||"";
if(i[d]){
var m=document.createElement("div");
m.innerHTML=TMPL.tmpl(img_copyright_tpl,i[d]);
{
var _=m.children[0],c=s.parentNode,l=c.insertBefore(_,s),f=l.childNodes[0];
(function(e){
DomEvent.on(l,"click",function(){
var i="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?location.href=i:JSAPI.invoke("openUrlWithExtraWebview",{
url:i,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=i);
});
});
})(i[d]);
}
l.insertBefore(s,f);
}
}
}
}
function fillVedio(e){
if(vedio_iframes&&vedio_iframes.length>0)for(var i,t,r,a=0,n=vedio_iframes.length;n>a;++a)i=vedio_iframes[a],
t=i.iframe,r=i.src,e&&(r=r.replace(/\&encryptVer=[^\&]*/gi,""),r=r.replace(/\&platform=[^\&]*/gi,""),
r=r.replace(/\&cKey=[^\&]*/gi,""),r=r+"&encryptVer=6.0&platform=61001&cKey="+e),
t.setAttribute("src",r);
}
function fillData(e){
var i=e.adRenderData||{
advertisement_num:0
};
if(!i.flag&&i.advertisement_num>0){
var t=i.advertisement_num,r=i.advertisement_info;
window.adDatas.num=t;
for(var a=0;t>a;++a){
var n=null,o=r[a];
if(o.is_cpm=o.is_cpm||0,o.biz_info=o.biz_info||{},o.app_info=o.app_info||{},o.pos_type=o.pos_type||0,
o.logo=o.logo||"",100==o.pt)n={
usename:o.biz_info.user_name,
pt:o.pt,
url:o.url,
traceid:o.traceid,
adid:o.aid,
ticket:o.ticket,
is_appmsg:!0
};else if(102==o.pt)n={
appname:o.app_info.app_name,
versioncode:o.app_info.version_code,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
md5sum:o.app_info.app_md5,
signature:o.app_info.version_code,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(101==o.pt)n={
appname:o.app_info.app_name,
app_id:o.app_info.app_id,
icon_url:o.app_info.icon_url,
appinfo_url:o.app_info.appinfo_url,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(103==o.pt||104==o.pt||2==o.pt&&o.app_info){
var s=o.app_info.down_count||0,p=o.app_info.app_size||0,d=o.app_info.app_name||"",m=o.app_info.category,_=["万","百万","亿"];
if(s>=1e4){
s/=1e4;
for(var c=0;s>=10&&2>c;)s/=100,c++;
s=s.toFixed(1)+_[c]+"次";
}else s=s.toFixed(1)+"次";
p>=1024?(p/=1024,p=p>=1024?(p/1024).toFixed(2)+"MB":p.toFixed(2)+"KB"):p=p.toFixed(2)+"B",
m=m?m[0]||"其他":"其他";
for(var l=["-","(",":",'"',"'","：","（","—","－","“","‘"],f=-1,u=0,g=l.length;g>u;++u){
var w=l[u],h=d.indexOf(w);
-1!=h&&(-1==f||f>h)&&(f=h);
}
-1!=f&&(d=d.substring(0,f)),o.app_info._down_count=s,o.app_info._app_size=p,o.app_info._category=m,
o.app_info.app_name=d,n={
appname:o.app_info.app_name,
app_rating:o.app_info.app_rating||0,
app_id:o.app_info.app_id,
channel_id:o.app_info.channel_id,
md5sum:o.app_info.app_md5,
rl:o.rl,
pkgname:o.app_info.apk_name,
url_scheme:o.app_info.url_scheme,
androiddownurl:o.app_info.apk_url,
versioncode:o.app_info.version_code,
appinfo_url:o.app_info.appinfo_url,
traceid:o.traceid,
pt:o.pt,
url:o.url,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}else if(105==o.pt){
var v=o.card_info.card_id||"",y=o.card_info.card_ext||"";
y=y.htmlDecode();
try{
y=JSON.parse(y),y.outer_str=o.card_info.card_outer_id||"",y=JSON.stringify(y);
}catch(b){
y="{}";
}
n={
card_id:v,
card_ext:y,
pt:o.pt,
ticket:o.ticket||"",
url:o.url,
rl:o.rl,
tid:o.traceid,
traceid:o.traceid,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}else if(106==o.pt){
var x=o.mp_shop_info.pid||"",j=o.mp_shop_info.outer_id||"";
n={
pid:x,
outer_id:j,
pt:o.pt,
url:o.url,
rl:o.rl,
tid:o.traceid,
traceid:o.traceid,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}
var k=o.image_url;
require("appmsg/cdn_img_lib.js");
var q=require("biz_common/utils/url/parse.js");
k&&k.isCDN()&&(k=k.replace(/\/0$/,"/640"),k=k.replace(/\/0\?/,"/640?"),o.image_url=q.addParam(k,"wxfrom","50",!0)),
adDatas.ads["pos_"+o.pos_type]={
a_info:o,
adData:n
};
}
var z=function(e){
var i=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(i=e);
10>=i&&(I.style.display="block",DomEvent.off(window,"scroll",z));
},E=document.getElementById("js_bottom_ad_area"),I=document.getElementById("js_top_ad_area"),D=adDatas.ads;
for(var O in D)if(0==O.indexOf("pos_")){
var n=D[O],o=!!n&&n.a_info;
if(n&&o)if(0==o.pos_type)E.innerHTML=TMPL.tmpl(a_tpl,o);else if(1==o.pos_type){
I.style.display="none",I.innerHTML=TMPL.tmpl(a_tpl,o),DomEvent.on(window,"scroll",z);
var M=0;
window.localStorage&&(M=1*localStorage.getItem(O)||0),window.scrollTo(0,M),z(M);
}
}
require("appmsg/a.js");
}
var S=e.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=S),S.show&&(!function(){
var e=document.getElementById("js_read_area3"),i=document.getElementById("like3");
e.style.display="block",i.style.display="inline",S.liked=window.is_temp_url?window.liked:S.liked,
S.liked&&Class.addClass(i,"praised"),i.setAttribute("like",S.liked?"1":"0");
var t=document.getElementById("likeNum3"),r=document.getElementById("readNum3"),a=window.is_temp_url?window.read_num:S.read_num,n=window.is_temp_url?window.like_num:S.like_num;
a||(a=1),n||(n="赞"),parseInt(a)>1e5?a="100000+":"",parseInt(n)>1e5?n="100000+":"",
r&&(r.innerHTML=a),t&&(t.innerHTML=n);
}(),require("appmsg/like.js")),1==e.comment_enabled&&(window.can_fans_comment_only=e.only_fans_can_comment,
require("appmsg/comment.js")),-1==ua.indexOf("WindowsWechat")&&-1!=ua.indexOf("MicroMessenger")&&e.reward&&(rewardEntry=require("appmsg/reward_entry.js"),
rewardEntry.handle(e.reward,getCountPerLine()));
}
function getAsyncData(){
var is_need_ticket="";
vedio_iframes&&vedio_iframes.length>0&&(is_need_ticket="&is_need_ticket=1");
var is_need_ad=1,_adInfo=null;
if(window.localStorage)try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key);
}catch(e){
is_need_ad=1,_adInfo=null;
}
(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx)&&(is_need_ad=0);
var screen_num=Math.ceil(document.body.scrollHeight/(document.documentElement.clientHeight||window.innerHeight)),both_ad=screen_num>=2?1:0;
ajax({
url:"/mp/getappmsgext?__biz="+biz+"&appmsg_type="+appmsg_type+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+is_need_ticket+"&is_need_ad="+is_need_ad+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+both_ad+"&reward_uin_count="+(is_need_reward?3*getCountPerLine():0)+(window.send_time?"&send_time="+send_time:""),
data:{
is_only_read:is_only_read,
req_id:window.req_id||"",
is_temp_url:window.is_temp_url||0
},
type:"POST",
dataType:"json",
rtId:"27613",
rtKey:"50",
rtDesc:rtGetAppmsgExt,
async:!0,
success:function(e){
if(e)try{
if(e&&e.base_resp&&e.base_resp.wxtoken&&(window.wxtoken=e.base_resp.wxtoken),window.fromWeixinCached&&require("appmsg/iframe.js"),
fillVedio(e.appmsgticket?e.appmsgticket.ticket:""),img_copyright(e),e.ret)return;
var i={};
if(0==is_need_ad)i=_adInfo,i||(i={
advertisement_num:0
});else{
if(e.advertisement_num>0&&e.advertisement_info){
var t=e.advertisement_info;
i.advertisement_info=saveCopy(t);
}
i.advertisement_num=e.advertisement_num;
}
1==is_need_ad&&(window._adRenderData=i),window.wx_user_can_reward=e.user_can_reward,
fillData({
adRenderData:i,
appmsgstat:e.appmsgstat,
comment_enabled:e.comment_enabled,
only_fans_can_comment:e.only_fans_can_comment,
reward:{
reward_total:e.reward_total_count,
reward_head_imgs:e.reward_head_imgs||[],
can_reward:e.can_reward,
timestamp:e.timestamp
}
});
}catch(r){
var a=new Image;
return a.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(r.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(r));
}
},
error:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function getCountPerLine(){
return DomEvent.on(window,"resize",function(){
onResize(),rewardEntry&&rewardEntry.render(getCountPerLine());
}),onResize();
}
function onResize(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
var i=document.getElementById("page-content").getBoundingClientRect();
i.width&&(e=i.width);
}catch(t){}
var r=30,a=34,n=Math.floor(.9*(e-r)/a);
return document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=n*a+"px"),
getCountPerLine=function(){
return n;
},n;
}
require("biz_common/utils/string/html.js");
var a_tpl=require("appmsg/a_tpl.html.js"),img_copyright_tpl=require("appmsg/img_copyright_tpl.html.js"),iswifi=!1,ua=navigator.userAgent,in_mm=-1!=ua.indexOf("MicroMessenger"),inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat"),DomEvent=require("biz_common/dom/event.js"),offset=200,ajax=require("biz_wap/utils/ajax.js"),Class=require("biz_common/dom/class.js"),JSAPI=require("biz_wap/jsapi/core.js"),TMPL=require("biz_common/tmpl.js"),LS=require("biz_wap/utils/storage.js"),rtGetAppmsgExt=require("rt/appmsg/getappmsgext.rt.js"),rewardEntry,adLS=new LS("ad"),iframes=document.getElementsByTagName("iframe"),iframe,js_content=document.getElementById("js_content"),vedio_iframes=[],w=js_content.offsetWidth,h=3*w/4;
window.logs.video_cnt=0;
for(var i=0,len=iframes.length;len>i;++i){
iframe=iframes[i];
var src=iframe.getAttribute("data-src")||"",realsrc=iframe.getAttribute("src")||src;
if(realsrc){
var Version4video=require("pages/version4video.js");
if(!Version4video.isShowMpVideo()&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html")||0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))||0==realsrc.indexOf("http://z.weishi.com/weixin/player.html")){
-1==realsrc.indexOf("http://z.weishi.com/weixin/player.html")&&-1==src.indexOf("http://z.weixin.com/weixin/player.html")&&(src=src.replace(/^https:/,location.protocol),
src=src.replace(/^http:/,location.protocol),src=src.replace(/preview.html/,"player.html"),
realsrc=realsrc.replace(/^https:/,location.protocol),realsrc=realsrc.replace(/^http:/,location.protocol),
realsrc=realsrc.replace(/preview.html/,"player.html")),realsrc=realsrc.replace(/width=\d+/g,"width="+w),
realsrc=realsrc.replace(/height=\d+/g,"height="+h),in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html"))||in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))?vedio_iframes.push({
iframe:iframe,
src:realsrc
}):iframe.setAttribute("src",realsrc),iframe.width=w,iframe.height=h,iframe.style.setProperty&&(iframe.style.setProperty("width",w+"px","important"),
iframe.style.setProperty("height",h+"px","important")),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;
continue;
}
}
}
window.adDatas={
ads:{},
num:0
};
var js_toobar=document.getElementById("js_toobar3"),innerHeight=window.innerHeight||document.documentElement.clientHeight,onScroll=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,i=js_toobar.offsetTop;
e+innerHeight+offset>=i&&(getAsyncData(),DomEvent.off(window,"scroll",onScroll));
};
iswifi?(DomEvent.on(window,"scroll",onScroll),onScroll()):getAsyncData();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=e+40,n=this.offset||20,r=0;
if("wifi"==window.networkType){
var s={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(s=this.lazyloadHeightWhenWifi()),n=Math.max(s.bottom*e,n),
r=Math.max(s.top*e,r);
}
for(var l=+new Date,d=[],u=this.sw,f=this,w=-1,p=0,g=t.length;g>p;p++)!function(t,e){
var s=t.el.offsetTop,l=t.src;
if(l){
l.indexOf("wx_fmt=gif")>-1&&w++;
var f=r,p=n;
-1!=l.indexOf("wx_fmt=gif")&&c&&(f=0,p=20),!t.show&&(i>=s&&i<=s+t.height+f||s>i&&i+o+p>s)&&(e.inImgRead&&(i>=s&&i<=s+t.height||s>i&&i+o>s)&&e.inImgRead(l,networkType),
e.changeSrc&&(l=e.changeSrc(t.el,l,w)),t.el.onerror=function(){
var t=this;
!!e.onerror&&e.onerror(l,t);
},t.el.onload=function(){
var t=this;
h(t,"height","auto","important"),t.getAttribute("_width")?h(t,"width",t.getAttribute("_width"),"important"):h(t,"width","auto","important"),
!!e.onload&&e.onload(l,t);
},m(t.el,"src",l),d.push(l),t.show=!0,h(t.el,"visibility","visible","important")),
a.isWp&&1*t.el.width>u&&(t.el.width=u);
}
}(t[p],f);
d.length>0&&this.detect&&this.detect({
time:l,
loadList:d,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",a=o.offsetWidth,r=0,s=this.imgOccupied||!1;
o.currentStyle?r=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(r=getComputedStyle(o).width),
this.sw=1*r.replace("px","");
for(var d=0,c=t.length;c>d;d++){
var u=t.item(d),f=m(u,n);
if(f){
var w=100;
if(u.dataset&&u.dataset.ratio){
var p=1*u.dataset.ratio,g=1*u.dataset.w||a;
"number"==typeof p&&p>0?(g=a>=g?g:a,w=g*p,s||(u.style.width&&u.setAttribute("_width",u.style.width),
h(u,"width",g+"px","important"),h(u,"visibility","visible","important"),u.setAttribute("src",l))):h(u,"visibility","hidden","important");
}else h(u,"visibility","hidden","important");
s||h(u,"height",w+"px","important"),e.push({
el:u,
src:f,
height:w,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
var e=this,o=e.timer;
clearTimeout(o),e.timer=setTimeout(function(){
i.call(e,t);
},300);
}
function n(t){
r.on(window,"scroll",function(i){
o.call(t,i);
}),setTimeout(function(){
e.call(t,{});
},0),r.on(document,"touchmove",function(i){
o.call(t,i);
}),o.call(t,{});
}
var a=t("biz_wap/utils/mmversion.js"),r=t("biz_common/dom/event.js"),s=t("biz_common/dom/attr.js"),m=s.attr,h=s.setProperty,l=t("biz_common/ui/imgonepx.js"),d=new Date,c=(d.getHours(),
!0);
return n;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:void setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0):!0;
},function(e){
r=e;
};
});define("appmsg/share.js",["biz_common/utils/string/html.js","appmsg/cdn_img_lib.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function i(e,i){
var n="";
""!=tid&&(n="tid="+tid+"&aid=54");
var t=e.split("?")[1]||"";
if(t=t.split("#")[0],""!=t){
var o=[t,"scene="+i,"srcid="+srcid];
return""!=n&&o.push(n),t=o.join("&"),e.split("?")[0]+"?"+t+"#"+(e.split("#")[1]||"");
}
}
function n(e,i,n){
var t=e.split("?").pop();
if(t=t.split("#").shift(),""!=t){
var o=[t,"action=share","action_type="+n,"scene="+window.source,"req_id="+(window.req_id||""),"vid="+("undefined"!=typeof window.reportVid?window.reportVid.join(";"):""),"musicid="+("undefined"!=typeof window.reportMid?window.reportMid.join(";"):""),"voiceid="+("undefined"!=typeof window.reportVoiceid?window.reportVoiceid.join(";"):"")].join("&");
m({
url:"/mp/appmsgreport",
type:"POST",
data:o
});
}
}
function t(e,i){
return e.isCDN()&&(e=o.addParam(e,"wxfrom",i,!0)),e;
}
e("biz_common/utils/string/html.js"),e("appmsg/cdn_img_lib.js");
var o=(e("biz_common/dom/event.js"),e("biz_common/utils/url/parse.js")),s=e("biz_wap/utils/mmversion.js"),m=e("biz_wap/utils/ajax.js"),r=e("biz_wap/jsapi/core.js");
r.call("hideToolbar"),r.call("showOptionMenu");
var a=msg_title.htmlDecode(),d=(msg_source_url.htmlDecode(),""),u=msg_cdn_url||round_head_img,c=msg_link.htmlDecode(),a=msg_title.htmlDecode(),l=msg_desc.htmlDecode();
l=l||c,l=l.replace(/<br\/>/g,"\n"),idx>1&&document.getElementById("js_content")&&1446652800>ct&&(l=document.getElementById("js_content").innerHTML.replace(/<\/?[^>]*\/?>/g,"").htmlDecode().replace(/^(\s*)|(\s*)$/g,"").substr(0,54)),
u.isCDN()&&(u=u.replace(/\/0$/,"/300"),u=u.replace(/\/0\?/,"/300?")),"1"==is_limit_user&&r.call("hideOptionMenu"),
window.is_temp_url&&r.invoke("hideMenuItems",{
menuList:["menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:qzone","menuitem:share:weibo","menuItem:share:WeiboApp","menuItem:share:QZone","menuitem:facebook","menuItem:copyUrl","menuItem:share:email","menuitem:copy_url"]
},function(){}),r.on("menu:share:appmessage",function(e){
var o=1,s=t(u,"1");
e&&"favorite"==e.scene&&(o=24,s=t(u,"4")),r.invoke("sendAppMessage",{
appid:d,
img_url:s,
img_width:"640",
img_height:"640",
link:i(c,o),
desc:l,
title:a
},function(){
n(c,fakeid,o);
});
}),r.on("menu:share:timeline",function(){
var e=u;
s.isIOS||(e=t(u,"2")),n(c,fakeid,2),r.invoke("shareTimeline",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(c,2),
desc:l,
title:a
},function(){});
});
r.on("menu:share:weiboApp",function(){
r.invoke("shareWeiboApp",{
img_url:u,
link:i(c,3),
title:a
},function(){
n(c,fakeid,3);
});
}),r.on("menu:share:facebook",function(){
n(c,fakeid,4),r.invoke("shareFB",{
img_url:u,
img_width:"640",
img_height:"640",
link:i(c,4),
desc:l,
title:a
},function(){});
}),r.on("menu:share:QZone",function(){
var e=t(u,"6");
n(c,fakeid,5),r.invoke("shareQZone",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(c,22),
desc:l,
title:a
},function(){});
}),r.on("menu:share:qq",function(){
var e=t(u,"7");
n(c,fakeid,5),r.invoke("shareQQ",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(c,23),
desc:l,
title:a
},function(){});
}),r.on("menu:share:email",function(){
n(c,fakeid,5),r.invoke("sendEmail",{
content:i(c,5),
title:a
},function(){});
});
});define("appmsg/cdn_img_lib.js",[],function(){
"use strict";
String.prototype.http2https=function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/");
},String.prototype.https2http=function(){
return this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
},String.prototype.isCDN=function(){
return 0==this.indexOf("http://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qlogo.cn/");
},String.prototype.nogif=function(){
return this.indexOf("wx_fmt=gif")>-1||this.indexOf("/mmbiz_gif/")>-1?this.replace("/0?","/s640?").replace("wx_fmt=gif",""):this;
};
});define("biz_common/utils/url/parse.js",[],function(){
"use strict";
function r(r){
var e=r.length,n=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?e:t,n=-1==n?t:n;
var a=r.substr(0,n),i=r.substr(n+1,t-n-1),s=r.substr(t+1);
return{
host:a,
query_str:i,
hash:s
};
}
function e(e,n){
var t=r(e),a=t.query_str,i=[];
for(var s in n)n.hasOwnProperty(s)&&i.push(s+"="+encodeURIComponent(n[s]));
return i.length>0&&(a+=(""!=a?"&":"")+i.join("&")),t.host+(""!=a?"?"+a:"")+(""!=t.hash?"#"+t.hash:"");
}
function n(r,e,n,t){
r=r||location.href;
var a=r.indexOf("&"),i=r.length,s=r.replace(/^[\w\d]+:[\/\\]+/g,"").split("").reverse();
Array.prototype.indexOf||(Array.prototype.indexOf=function(r,e){
var n;
if(null==this)throw new TypeError('"this" is null or not defined');
var t=Object(this),a=t.length>>>0;
if(0===a)return-1;
var i=+e||0;
if(1/0===Math.abs(i)&&(i=0),i>=a)return-1;
for(n=Math.max(i>=0?i:a-Math.abs(i),0);a>n;){
if(n in t&&t[n]===r)return n;
n++;
}
return-1;
});
var o=i-1-s.indexOf("/");
-1!=a&&-1==r.indexOf("?")&&a>o&&(r=r.replace("&","?"));
var u=new RegExp("([\\?&]"+e+"=)[^&#]*");
if(!r.match(u)){
var h=r.indexOf("?");
return-1==h?r+"?"+e+"="+n:h==r.length-1?r+e+"="+n:r+"&"+e+"="+n;
}
return t===!0?r.replace(u,"$1"+n):r;
}
return{
parseUrl:r,
join:e,
addParam:n
};
});define("appmsg/test.js",[],function(){
"use strict";
var t=[],e=function(){
"undefined"==typeof getComputedStyle&&document.body.currentStyle&&(window.getComputedStyle=function(t){
return t.currentStyle;
});
},n=function(){
for(var e="/mp/jsmonitor?idkey=",n=[],r=0,i=t.length;i>r;++r){
var o=t[r],d=o.idkey.toString()+"_"+o.order.toString()+"_"+o.num.toString();
n.push(d);
}
e+=n.join(";"),t.length>0&&((new Image).src=e);
},r=function(){
try{
e(),i(),o(),n();
}catch(t){
console.log(t);
}
},i=function(){
var e=10,n=top.window.user_uin||0,r=0!==n&&Math.floor(n/100)%1e3<e;
if(r){
var i=document.getElementsByTagName("img"),o=i.length,d=document.getElementById("img-content"),a=d.offsetWidth,u=0,g=0,s=getComputedStyle(d);
u=parseInt(s.paddingLeft)+parseInt(s.paddingRight),a-=u,a||(a=window.innerWidth-30);
for(var f=0;o>f;++f){
var p=i[f].getAttribute("data-src");
if(p){
var m=1*i[f].getAttribute("data-w")||a,c=1*i[f].getAttribute("data-ratio");
c&&c>0&&m>a&&g++;
}
}
g>0&&t.push({
idkey:28307,
order:22,
num:g
});
}
},o=function(){
var e=1,n=top.window.user_uin||0,r=0!==n&&Math.floor(n/100)%1e3<e;
if(r){
var i=new Date,o=document.getElementsByTagName("img"),d=o.length,a=0;
window&&window.innerWidth||(a=1);
for(var u=0;d>u;++u){
var g=o[u].getAttribute("data-src"),s=1*o[u].getAttribute("data-ratio");
if(g&&s){
var f=o[u].parentNode,p=getComputedStyle(f);
f.offsetWidth-parseInt(p.paddingLeft)-parseInt(p.paddingRight)-parseInt(p.borderLeftWidth)-parseInt(p.borderRightWidth);
}
}
var m=new Date,c=m-i;
t.push({
idkey:28307,
order:23,
num:c
}),t.push({
idkey:28307,
order:25,
num:1
}),a&&t.push({
idkey:28307,
order:24,
num:1
});
}
};
return r;
});define("biz_wap/utils/mmversion.js",[],function(){
"use strict";
function n(){
var n=/MicroMessenger\/([\d\.]+)/i,t=s.match(n);
return t&&t[1]?t[1]:!1;
}
function t(t,r,i){
var e=n();
if(e){
e=e.split("."),t=t.split("."),/\d+/g.test(e[e.length-1])||e.pop();
for(var o,s,u=f["cp"+r],c=0,a=Math.max(e.length,t.length);a>c;++c){
o=e[c]||0,s=t[c]||0,o=parseInt(o)||0,s=parseInt(s)||0;
var p=f.cp0(o,s);
if(!p)return u(o,s);
}
return i||0==r?!0:!1;
}
}
function r(n){
return t(n,0);
}
function i(n,r){
return t(n,1,r);
}
function e(n,r){
return t(n,-1,r);
}
function o(){
return u?"ios":a?"android":"unknown";
}
var s=navigator.userAgent,u=/(iPhone|iPad|iPod|iOS)/i.test(s),c=/Windows\sPhone/i.test(s),a=/(Android)/i.test(s),f={
"cp-1":function(n,t){
return t>n;
},
cp0:function(n,t){
return n==t;
},
cp1:function(n,t){
return n>t;
}
};
return{
get:n,
cpVersion:t,
eqVersion:r,
gtVersion:i,
ltVersion:e,
getPlatform:o,
isWp:c,
isIOS:u,
isAndroid:a
};
});define("appmsg/max_age.js",["biz_wap/utils/ajax.js"],function(e){
"use strict";
function a(){
window.location.href.indexOf("clearStorage=1")>=0&&(localStorage.removeItem("max-age-storage-test"),
console.log("清除 localStorage"));
var e=1,a=top.window.user_uin||0,t=0!==a&&Math.floor(a/100)%1e3<e;
if(t&&(o({
type:"GET",
url:"/mp/reportcache?type=1&random="+Math.random()
}),(new Image).src="/mp/reportcache?type=2&uin="+uin,localStorage&&null==localStorage.getItem("max-age-storage-test"))){
console.log("localstorage为空");
try{
localStorage.setItem("max-age-storage-test",!0),console.log("localStorage设置成功");
}catch(r){}
o({
type:"GET",
url:"/mp/reportcache?type=3&random="+Math.random()
});
}
}
var o=e("biz_wap/utils/ajax.js");
return a;
});define("biz_common/dom/attr.js",[],function(){
"use strict";
function t(t,e,n){
return"undefined"==typeof n?t.getAttribute(e):t.setAttribute(e,n);
}
function e(t,e,n,r){
t.style.setProperty?(r=r||null,t.style.setProperty(e,n,r)):"undefined"!=typeof t.style.cssText&&(r=r?"!"+r:"",
t.style.cssText+=";"+e+":"+n+r+";");
}
return{
attr:t,
setProperty:e
};
});define("appmsg/log.js",["biz_wap/utils/log.js"],function(i){
"use strict";
var s=i("biz_wap/utils/log.js");
return function(i,t){
s(i,t);
};
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
};
});define("biz_wap/utils/device.js",[],function(){
"use strict";
function s(s){
{
var e=s.match(/MQQBrowser\/(\d+\.\d+)/i),r=s.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i)||s.match(/V1_AND_SQ_([\d\.]+)/),i=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)||s.match(/MicroMessenger\/((\d+)\.(\d+))/),t=s.match(/Mac\sOS\sX\s(\d+\.\d+)/),n=s.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),a=s.match(/MiuiBrowser\/(\d+\.\d+)/i),d=s.match(/MI-ONE/),h=s.match(/MI PAD/),w=s.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/)||s.match(/\sUC\s/),c=s.match(/IEMobile(\/|\s+)(\d+\.\d+)/)||s.match(/WPDesktop/),b=s.match(/(ipod).*\s([\d_]+)/i),u=s.match(/(ipad).*\s([\d_]+)/i),p=s.match(/(iphone)\sos\s([\d_]+)/i),v=s.match(/Chrome\/(\d+\.\d+)/),m=s.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/),f=s.match(/(android)\s([\d\.]+)/i);
s.indexOf("HTC")>-1;
}
if(o.browser=o.browser||{},o.os=o.os||{},window.ActiveXObject){
var l=6;
(window.XMLHttpRequest||s.indexOf("MSIE 7.0")>-1)&&(l=7),(window.XDomainRequest||s.indexOf("Trident/4.0")>-1)&&(l=8),
s.indexOf("Trident/5.0")>-1&&(l=9),s.indexOf("Trident/6.0")>-1&&(l=10),o.browser.ie=!0,
o.browser.version=l;
}else s.indexOf("Trident/7.0")>-1&&(o.browser.ie=!0,o.browser.version=11);
f&&(this.os.android=!0,this.os.version=f[2]),b&&(this.os.ios=this.os.ipod=!0,this.os.version=b[2].replace(/_/g,".")),
u&&(this.os.ios=this.os.ipad=!0,this.os.version=u[2].replace(/_/g,".")),p&&(this.os.iphone=this.os.ios=!0,
this.os.version=p[2].replace(/_/g,".")),n&&(this.os.windows=!0,this.os.version=n[2]),
t&&(this.os.Mac=!0,this.os.version=t[1]),s.indexOf("lepad_hls")>0&&(this.os.LePad=!0),
h&&(this.os.MIPAD=!0),e&&(this.browser.MQQ=!0,this.browser.version=e[1]),r&&(this.browser.MQQClient=!0,
this.browser.version=r[1]),i&&(this.browser.WeChat=!0,this.browser.version=i[1]),
a&&(this.browser.MIUI=!0,this.browser.version=a[1]),w&&(this.browser.UC=!0,this.browser.version=w[1]||0/0),
c&&(this.browser.IEMobile=!0,this.browser.version=c[2]),m&&(this.browser.AndriodBrowser=!0),
d&&(this.browser.M1=!0),v&&(this.browser.Chrome=!0,this.browser.version=v[1]),this.os.windows&&(this.os.win64="undefined"!=typeof navigator.platform&&"win64"==navigator.platform.toLowerCase()?!0:!1);
var M={
iPad7:"iPad; CPU OS 7",
LePad:"lepad_hls",
XiaoMi:"MI-ONE",
SonyDTV:"SonyDTV",
SamSung:"SAMSUNG",
HTC:"HTC",
VIVO:"vivo"
};
for(var g in M)this.os[g]=-1!==s.indexOf(M[g]);
o.os.phone=o.os.phone||/windows phone/i.test(s),this.os.getNumVersion=function(){
return parseFloat(o.os.version,"10");
},this.os.hasTouch="ontouchstart"in window,this.os.hasTouch&&this.os.ios&&this.os.getNumVersion()<6&&(this.os.hasTouch=!1),
o.browser.WeChat&&o.browser.version<5&&(this.os.hasTouch=!1),o.browser.getNumVersion=function(){
return parseFloat(o.browser.version,"10");
},o.browser.isFFCanOcx=function(){
return o.browser.firefox&&o.browser.getNumVersion()>=3?!0:!1;
},o.browser.isCanOcx=function(){
return!(!o.os.windows||!o.browser.ie&&!o.browser.isFFCanOcx()&&!o.browser.webkit);
},o.browser.isNotIESupport=function(){
return!!o.os.windows&&(!!o.browser.webkit||o.browser.isFFCanOcx());
},o.userAgent={},o.userAgent.browserVersion=o.browser.version,o.userAgent.osVersion=o.os.version,
delete o.userAgent.version;
}
var o={};
s.call(o,window.navigator.userAgent);
var e=function(){
var s=window.navigator.userAgent,e=null;
if(o.os.android){
if(o.browser.MQQ&&o.browser.getNumVersion()>=4.2)return!0;
if(-1!=s.indexOf("MI2"))return!0;
if(o.os.version>="4"&&(e=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/))&&e[1]>=4.2)return!0;
if(o.os.version>="4.1")return!0;
}
return!1;
}(),r=function(){
var s=document.createElement("video");
if("function"==typeof s.canPlayType){
if("probably"==s.canPlayType('video/mp4; codecs="mp4v.20.8"'))return!0;
if("probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E"')||"probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))return!0;
}
return!1;
}();
return o.canSupportVideo=r||e,o.canSupportVideoMp4=r,o.canSupportH5Video=e,o;
});define("biz_wap/jsapi/a8key.js",["biz_wap/jsapi/core.js"],function(n){
"use strict";
var e,i=n("biz_wap/jsapi/core.js"),o=!1,t={},a=function(){
"undefined"!=typeof window.pass_ticket&&window.pass_ticket?(t.onAlreadyHasA8Key&&t.onAlreadyHasA8Key.call(A),
u()):0==window.isInWeixinApp()?(t.onOutOfWeixinApp&&t.onOutOfWeixinApp.call(A),u()):(o=1,
i.ready(c));
},c=function(){
window.isWeixinCached?w(u):(t.onNoCacheFuncWeixin&&t.onNoCacheFuncWeixin.call(A),
u());
},w=function(n){
if(t.onJSAPIGetA8KeyStart&&t.onJSAPIGetA8KeyStart.call(A),window.getA8KeyUrl)t.onJSAPIGetA8KeyEnd&&t.onJSAPIGetA8KeyEnd.call(A),
n(window.getA8KeyUrl);else{
var e=!1,o=setTimeout(function(){
e=!0,t.onJSAPIGetA8KeyTimeout&&t.onJSAPIGetA8KeyTimeout.call(A),n("");
},1500);
i.on("onGetA8KeyUrl",function(i){
o&&clearTimeout(o),e||(t.onJSAPIGetA8KeyEnd&&t.onJSAPIGetA8KeyEnd.call(A,i),n(i.url));
});
}
},u=function(n){
var i=!1;
if(n){
var o=getQueryFromURL(n);
window.uin=o.uin||window.uin,window.key=o.key||window.key,window.pass_ticket=o.pass_ticket||window.pass_ticket,
i=!0;
}
e&&e(i);
},A={
isPageCached:o
};
return A.config=function(n){
return t=n||{},A;
},A.onReady=function(n){
e=n,a();
},A;
});define("appmsg/index.js",["biz_wap/jsapi/a8key.js","biz_wap/utils/device.js","biz_common/dom/class.js","appmsg/log.js","biz_common/dom/attr.js","appmsg/max_age.js","biz_wap/utils/mmversion.js","appmsg/test.js","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/cache.js","appmsg/copyright_report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/wxtopic.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","appmsg/report.js","appmsg/fereport.js","biz_wap/safe/mutation_observer_report.js","sougou/index.js"],function(e){
"use strict";
function o(){
function o(e,o){
var t={
lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
},n=new Image;
n.onload=function(){
var t=n.width>0&&n.height>0;
o(e,t);
},n.onerror=function(){
o(e,!1);
},n.src="data:image/webp;base64,"+t[e];
}
function t(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e.timing){
var o=e.timing;
a("[Appmsg] dns:"+(o.domainLookupEnd-o.domainLookupStart)+"^^^ ssl:"+(0==o.secureConnectionStart?0:o.connectEnd-o.secureConnectionStart)+"^^^ tcp:"+(o.connectEnd-o.connectStart)+"^^^ request:"+(o.responseStart-o.requestStart)+"^^^ getPackageTime:"+(o.responseEnd-o.responseStart)+"^^^ domCententLoaded:"+(o.domContentLoadedEventStart-o.domLoading)+"^^^ domComplete:"+(o.domComplete-o.domLoading)+"^^^ firstViewTime:"+(real_show_page_time-o.navigationStart)+"^^^ interactiveTime:"+(page_endtime-o.navigationStart)),
setTimeout(function(){
o.loadEventEnd&&a("[Appmsg] onload:"+(o.loadEventEnd-o.loadEventStart));
},100);
}
}
var r=document.getElementsByTagName("body");
if(!r||!r[0])return!1;
r=r[0],function(){
var e=(new Date).getHours(),o=function(e,o){
o=o||"",window.isSg?(o=["uin:sougou","resp:"+o].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+o+"&r="+Math.random()+"&from=sougou"):(o=["uin:"+top.window.user_uin,"resp:"+o].join("|"),
(new Image).src="/mp/jsreport?key="+e+"&content="+o+"&r="+Math.random());
},t=function(e,o,t){
var n=e+"_"+o;
t=t||1,window.logs.idkeys[n]||(window.logs.idkeys[n]={
val:0
}),window.logs.idkeys[n].val+=t;
},n=e>=11&&17>=e&&Math.random()<1,i=function(e,t){
n&&o(e,t);
};
window.__report=o,window.__commonVideoReport=i,window.__addIdKeyReport=t;
}();
var p=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&top.location.href&&p.test(top.location.href))&&!window.isSg)throw new Error("in iframe");
}catch(m){
var l="",g=new Image;
g.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+l+"&r="+Math.random()).substr(0,1024);
}
window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached&&location.replace(location.href.replace(/#rd$/,"#wechat_redirect"));
var w=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var u=e("biz_wap/utils/mmversion.js"),_=!u.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
if(e("appmsg/share.js"),window.isSg||"mp.weixin.qq.com"==location.host){
var f=e("biz_common/log/jserr.js");
f({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
window.logs.webplog={
lossy:0,
lossless:0,
alpha:0,
animation:0,
total:0
};
var A=-1!=navigator.userAgent.indexOf("TBS/"),h=function(e,t){
o(e,function(e,o){
if(window.logs.webplog[e]=o?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
A&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var a=n.lossy&n.lossless&n.alpha;
t(!!a);
}
});
},y=function(e){
h("lossy",e),h("lossless",e),h("alpha",e),h("animation",e);
};
window.webp=!1,y(function(o){
function t(e,o,t){
if(5>t)return e;
var n=1e3*window.svr_time||+new Date;
n=new Date(n);
var i=n.getHours(),a=(60*i+n.getMinutes(),e),r=document.createElement("span");
r.className="gif_img_wrp",r.innerHTML='<span class="gif_img_tips" style="display:none;"><i class="gif_img_play_arrow"></i>动图</span><span class="gif_img_tips loading" style="display:none;"><i class="weui_loading gif_img_loading"></i>加载中</span>';
var s="click",c=function(){
if(r){
r.children.item(0).style.display="none",r.children.item(1).style.display="";
var e=o.onload;
o.onload=function(){
r&&(r.children.item(1).style.display="none",b.off(r,s,c),r=null),e&&e.apply(o,arguments);
};
var t=o.onerror;
o.onerror=function(){
r&&(r.children.item(0).style.display="",r.children.item(1).style.display="none",
b.off(r,s,c),r=null),t&&t.apply(o,arguments);
},o.src=a,o.loadGif=!0,window.__addIdKeyReport("28307",15);
}
};
return o.autoTap=function(){
o.src=a,o.loadGif=!0,o.autoTap=null,b.off(r,s,c),window.__addIdKeyReport("28307",26);
},(window.user_uin&&50>(user_uin/100|0)%100||location.href.indexOf("gif=1")>-1)&&(e=e.replace("/0?","/s640?"),
e=e.replace("wx_fmt=gif",""),o.gray=!0,o.parentNode.insertBefore(r,o),r.appendChild(o),
b.on(r,s,c),window.__addIdKeyReport("28307",16)),e;
}
window.webp=o,o&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var n=document.getElementById("js_cover");
if(n){
var i=n.getAttribute("data-src");
if(i){
if(i.isCDN()){
var r=new Date;
for(r.setFullYear(2014,9,1);-1!=i.indexOf("?tp=webp");)i=i.replace("?tp=webp","");
for(;-1!=i.indexOf("&tp=webp");)i=i.replace("&tp=webp","");
1e3*ct>=r.getTime()&&""!=img_format&&"gif"!=img_format&&(i=i.replace(/\/0$/,"/640"),
i=i.replace(/\/0\?/,"/640?"),n.dataset&&(n.dataset.s="300,640")),o&&(i=w.addParam(i,"tp","webp",!0)),
i=w.addParam(i,"wxfrom","5",!0),is_https_res?i=i.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(i=i.https2http());
}
setTimeout(function(){
n.onload=function(){
s(n,"height","auto","important"),s(n,"visibility","visible","important");
},n.setAttribute("src",i);
},0),window.logs.img.read[i]=!0,window.logs.img.load[i]=!0,n.removeAttribute("data-src");
}
}
var c=e("biz_wap/ui/lazyload_img.js"),d=1;
window.logs.outer_pic=0,new c({
attrKey:"data-src",
imgOccupied:!0,
lazyloadHeightWhenWifi:function(){
var e,o=1,t=1;
e=window.svr_time?new Date(1e3*window.svr_time):new Date;
var n=e.getHours();
return n>=20&&23>n&&(o=.5,t=0),{
bottom:o,
top:t
};
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,o,n){
if(!o)return"";
for(var i=o;-1!=i.indexOf("?tp=webp");)i=i.replace("?tp=webp","");
for(;-1!=i.indexOf("&tp=webp");)i=i.replace("&tp=webp","");
if(o.isCDN())(e.dataset&&e.dataset.s||-1!=o.indexOf("wx_fmt=")&&-1==o.indexOf("wx_fmt=gif"))&&(i=i.replace(/\/0$/,"/640"),
i=i.replace(/\/0\?/,"/640?")),window.webp&&(i=w.addParam(i,"tp","webp",!0)),i=w.addParam(i,"wxfrom","5",!0),
is_https_res?i=i.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(i=i.https2http());else try{
var r=new RegExp("^http(s)?://((mmbiz.qpic.cn/.*)|(m.qpic.cn/.*)|(mmsns.qpic.cn/.*)|(shp.qpic.cn/.*)|(wx.qlogo.cn/.*)|(mmbiz.qlogo.cn/.*)|((a|b)[0-9]*.photo.store.qq.com/.*)|(mp.weixin.qq.com/.*)|(res.wx.qq.com/.*))");
r.test(o)||(window.__addIdKeyReport("28307",9),window.logs.outer_pic++);
}catch(s){}
var c=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
return i=i.replace(c,"http://m.qpic.cn"),i=w.addParam(i,"wx_lazy","1",!0),(o.indexOf("wx_fmt=gif")>-1||o.indexOf("/mmbiz_gif/")>-1)&&(i=t(i,e,n)),
window.logs.img.load[i]=!0,a("[Appmsg] image_load_event_change_src. originsrc:"+o+"  ^^^ newsrc : "+i),
i;
},
onerror:function(e,o){
var t=o?o.__retryload||0:0;
if(e&&!(t>d)&&(window.__addIdKeyReport("28307",4),window.__addIdKeyReport("28307",6+2*t),
d>t&&(t++,o.__retryload=t,o.src=w.addParam(e,"retryload",t,!0)),e.isCDN())){
a("[Appmsg] image_load_event_on_error. src:"+e);
var n=10;
/tp\=webp/.test(e)&&(n=11);
var i=new Image;
i.src="http://mp.weixin.qq.com/mp/jsreport?key="+n+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,o){
o.gray&&!o.loadGif&&(o.naturalWidth<120||o.naturalHeight<120?o.autoTap&&o.autoTap():o.parentNode.children&&o.parentNode.children.item(0)&&(o.parentNode.children.item(0).style.display=""));
var t=o?o.__retryload||0:0;
t>d||(a("[Appmsg] image_load_event_onload_image. src:"+e+"  ^^^  retryloadtimes: "+t),
window.__addIdKeyReport("28307",3),window.__addIdKeyReport("28307",5+2*t));
},
detect:function(e){
if(e&&e.time&&e.loadList){
var o=e.time,t=e.loadList;
window.logs.img.download[o]=t;
}
},
container:document.getElementById("page-content")
});
}),e("appmsg/async.js"),window.isSg||e("appmsg/cache.js");
var v=e("appmsg/copyright_report.js"),b=e("biz_common/dom/event.js"),j=e("biz_wap/jsapi/core.js");
!function(){
var e=document.getElementById("post-user"),o=document.getElementById("copyright_info"),t=[];
if(e){
var n="57";
"26"==window.source&&(n="95"),"28"==window.source&&(n="96"),"29"==window.source&&(n="39"),
"15"==window.source&&(n="121"),t.push({
dom:e,
username:user_name_new||user_name,
scene:n
});
}
o&&source_encode_biz&&t.push({
dom:o,
source_encode_biz:source_encode_biz,
scene:"110"
});
for(var i=0,r=t.length;r>i;i++)!function(e){
b.on(e.dom,"click",function(){
if("copyright_info"==e.dom.id&&source_encode_biz){
v.card_click_report({
scene:"0"
});
var o="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene="+e.scene+"#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?location.href=o:j.invoke("openUrlWithExtraWebview",{
url:o,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=o);
});
}else a("[Appmsg] profile_click_before_loadprofile: username:"+e.username+", scene:"+e.scene),
j.invoke("profile",{
username:e.username,
scene:e.scene
},function(o){
window.__addIdKeyReport("28307","1"),a("[Appmsg] profile_click_after_loadprofile: username:"+e.username+", scene:"+e.scene+", res.err_msg:"+o.err_msg);
});
return!1;
}),u.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(t[i]);
}(),function(){
location.href.match(/fontScale=\d+/)&&u.isIOS&&j.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
var x=e("appmsg/outer_link.js");
if(new x({
container:document.getElementById("js_content"),
changeHref:function(e,o){
if(e&&0==e.indexOf("http://mp.weixin.qq.com/s"))e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),
e=e.replace(/[\?&]scene=21/,""),e+="&scene=21#wechat_redirect";else{
if(18==ban_scene)return"/mp/ban?action=check&__biz="+biz+"&mid="+mid+"&idx="+idx+"&scene="+ban_scene+"#wechat_redirect";
if(0!=e.indexOf("http://mp.weixinbridge.com/mp/wapredirect"))return"http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+o+"&scene=0";
}
return e;
}
}),!_){
var q=e("appmsg/review_image.js"),E=document.getElementById("js_cover"),I=[];
E&&I.push(E),new q({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:I
});
}
!function(){
try{
var e=document.getElementById("js_content");
if(!e||!e.querySelectorAll)return;
for(var o=e.querySelectorAll("*"),t="list-paddingleft-2,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double".split(","),n=function(e){
if(e&&e.className){
for(var o=e.className.split(/\s+/),n=[],i=0,a=o.length;a>i;++i){
var r=o[i];
r&&-1!=t.indexOf(r)&&n.push(r);
}
e.className=n.join(" ");
}
},i=0,a=o.length;a>i;++i){
var r=o[i];
r.tagName&&"iframe"!=r.tagName.toLowerCase()&&n(r);
}
}catch(s){}
}(),window.fromWeixinCached||e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),
e("appmsg/wxtopic.js"),e("appmsg/cdn_speed_report.js"),e("appmsg/page_pos.js"),setTimeout(function(){
if(window.article_improve_combo_css){
var e=document.createElement("link");
e.rel="stylesheet",e.type="text/css",e.async=!0,e.href=window.article_improve_combo_css;
var o=document.getElementsByTagName("head")[0];
o.appendChild(e);
}
},0),setTimeout(function(){
b.tap(document.getElementById("copyright_logo"),function(){
location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),c(),d(),e("appmsg/report_and_source.js"),function(){
if(_){
i.addClass(r,"not_in_mm");
var e=document.createElement("link");
e.rel="stylesheet",e.type="text/css",e.async=!0,e.href=not_in_mm_css;
var o=document.getElementsByTagName("head")[0];
o.appendChild(e);
var t=document.getElementById("js_pc_qr_code_img");
if(t){
var n=10000004,a=document.referrer;
if(0==a.indexOf("http://weixin.sogou.com")?n=10000001:0==a.indexOf("https://wx.qq.com")&&(n=10000003),
window.isSg)t.setAttribute("src",sg_qr_code);else{
t.setAttribute("src","/mp/qrcode?scene="+n+"&size=102&__biz="+biz);
var s=new Image;
s.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+n+"&r="+Math.random();
}
document.getElementById("js_pc_qr_code").style.display="block";
}
var c=document.getElementById("js_profile_qrcode"),d=document.getElementById("js_profile_arrow_wrp"),p=document.getElementById("post-user");
if(c&&p&&d){
var m=function(){
var e=10000005,o=document.referrer;
0==o.indexOf("http://weixin.sogou.com")?e=10000006:0==o.indexOf("https://wx.qq.com")&&(e=10000007);
var t=document.getElementById("js_profile_qrcode_img");
if(t)if(window.isSg)t.setAttribute("src",sg_qr_code);else{
t.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random();
}
return c.style.display="block",d.style.left=p.offsetLeft-c.offsetLeft+p.offsetWidth/2-8+"px",
!1;
};
b.on(p,"click",m),b.on(c,"click",m),b.on(document,"click",function(e){
var o=e.target||e.srcElement;
o!=p&&o!=c&&(c.style.display="none");
});
}
}else{
var l=document.getElementById("js_report_article3");
!!l&&(l.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,o=document.getElementById("img-content");
if(e&&o&&o.getBoundingClientRect){
var t=o.getBoundingClientRect().height;
window.scrollTo(0,t);
}
}(),e("appmsg/report.js");
for(var o=document.getElementsByTagName("map"),t=0,n=o.length;n>t;++t)o[t].parentNode.removeChild(o[t]);
if(v.card_pv_report(),Math.random()<.01)try{
var a="https://js.aq.qq.com/js/aq_common.js",s=document.createElement("script");
s.src=a;
var p=document.getElementsByTagName("head")[0];
p.appendChild(s);
}catch(m){}
var l=document.getElementById("js_close_temp");
b.on(l,"click",function(){
l.parentNode.parentNode.removeChild(l.parentNode),i.removeClass(document.getElementById("js_article"),"preview_appmsg");
});
},1e3),function(){
if(n.os.ios&&"onorientationchange"in window){
var e=[],o="onorientationchange"in window?"orientationchange":"resize",t=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:t(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var i=(new Date).getHours();
b.on(window,o,function(){
var o=e.length-2,n=t();
if(o>=0){
var a=e[o],r=a.ori;
r!==n||e[e.length-1].istouchmove||(i>=11&&17>=i&&window.__report(63),window.scrollTo(0,a.scroll));
}
e.push({
ori:n,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
}),b.on(window,"scroll",function(){
var o=e.length-1;
e[o].ori==t()&&(e[o].scroll=window.pageYOffset||document.documentElement.scrollTop,
e[o].istouchmove=!0);
});
}
}(),a("[Appmsg] href:"+location.href+"^^^ ua:"+window.navigator.userAgent),window.addEventListener?window.addEventListener("load",t,!1):window.attachEvent&&window.attachEvent("onload",t),
e("appmsg/fereport.js"),function(){
document.getElementsByTagName("body")[0].addEventListener("copy",function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_18_1",
u.isIOS&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_19_1"),
u.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_20_1");
},!1);
}(),function(){
window.__observer&&window.__observer_data&&e("biz_wap/safe/mutation_observer_report.js");
}(),"undefined"!=typeof isSg&&e("sougou/index.js");
}
var t=e("biz_wap/jsapi/a8key.js"),n=e("biz_wap/utils/device.js"),i=e("biz_common/dom/class.js"),a=e("appmsg/log.js"),r=e("biz_common/dom/attr.js"),s=r.setProperty,c=e("appmsg/max_age.js"),d=(e("biz_wap/utils/mmversion.js"),
e("appmsg/test.js"));
t.config({
onOutOfWeixinApp:function(){
console.log("onOutOfWeixinApp");
},
onNoCacheFuncWeixin:function(){
console.log("isWeixinCached == false");
},
onAlreadyHasA8Key:function(){
console.log("URL已有A8Key");
},
onJSAPIGetA8KeyStart:function(){
console.log("onJSAPIGetA8KeyStart");
},
onJSAPIGetA8KeyEnd:function(){
console.log("onJSAPIGetA8KeyEnd");
},
onJSAPIGetA8KeyTimeout:function(){
console.log("onJSAPIGetA8KeyTimeout");
}
}),t.onReady(function(){
window.logs.pagetime.jsapi_ready_time=+new Date,window.logs.idkeys={},console.log("进入index.js init"),
o();
});
});