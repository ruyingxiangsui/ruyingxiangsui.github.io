define("a/card.js",["biz_common/dom/event.js","biz_common/utils/report.js","appmsg/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js","biz_wap/jsapi/cardticket.js"],function(e,t,a,i){
"use strict";
function s(e,t){
p("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function o(e){
var t=e.adData,a=e.pos_type||0,i=t.tid,p=t.type,r=t.url,d=t.rl,l={};
e.report_param=e.report_param||"";
var m=e.btn;
if(m){
n.on(m,"click",function(n){
if(!l[i]){
l[i]=!0;
var m,j,u,f,b=!!n&&n.target;
b&&(m=_.getX(b,"js_ad_link")+n.offsetX,j=_.getY(b,"js_ad_link")+n.offsetY,u=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
f=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
c({
type:p,
report_type:2,
click_pos:0,
url:encodeURIComponent(r),
tid:i,
rl:encodeURIComponent(d),
__biz:biz,
pos_type:a,
pt:105,
pos_x:m,
pos_y:j,
ad_w:u||0,
ad_h:f||0
},function(){
l[i]=!1,s(37,e),o.openCardDetail(t.card_id,t.card_ext,e);
});
}
return!1;
});
}
}
var n=e("biz_common/dom/event.js"),p=e("biz_common/utils/report.js"),r=e("appmsg/a_report.js"),c=r.AdClickReport,_=(e("biz_wap/utils/ajax.js"),
e("biz_wap/utils/position.js")),d=(e("biz_wap/jsapi/core.js"),e("biz_wap/jsapi/cardticket.js"));
return o.openCardDetail=function(e,t,a){
d.openCardDetail({
card_id:e,
card_ext:t,
success:function(){
!!a&&s(38,a);
},
error:function(){
!!a&&s(39,a),i("调起卡券错误");
},
access_denied:function(){
!!a&&s(40,a),i("异常错误[access_denied]");
}
});
},o;
});define("biz_wap/utils/position.js",[],function(){
"use strict";
function e(t,f){
var s=t.offsetLeft;
if(t.offsetParent&&t.offsetParent.className){
var a=t.offsetParent.className;
-1==a.indexOf(f)&&(s+=e(t.offsetParent,f));
}
return s;
}
function t(e,f){
var s=e.offsetTop;
if(e.offsetParent&&e.offsetParent.className){
var a=e.offsetParent.className;
-1==a.indexOf(f)&&(s+=t(e.offsetParent,f));
}
return s;
}
return{
getX:e,
getY:t
};
});define("appmsg/a_report.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js"],function(t){
"use strict";
function o(t,o){
var a="https:"==top.location.protocol?1500:1200,e="/mp/advertisement_report?r="+Math.random()+"&",c=[],u=!1;
for(var _ in t)t.hasOwnProperty(_)&&c.push(_+"="+t[_]);
e+=c.join("&"),t.tid&&s.gtVersion("6.3.22",!0)&&p.invoke("adDataReport",{
ad_info:"trace_id="+t.tid+"&product_type="+t.pt+"&jump_url="+t.url
},function(){}),i({
url:e,
mayAbort:!0,
type:"GET",
success:function(){
r&&r(56+n);
},
error:function(){
r&&r(57+n);
},
complete:function(){
u||(u=!0,!!o&&o());
},
async:!0
}),setTimeout(function(){
u||(u=!0,window.__ajaxtest="1",!!o&&o());
},a);
}
var i=t("biz_wap/utils/ajax.js"),r=window.__report,a=top.location.protocol,n="https:"==a?5:0,p=t("biz_wap/jsapi/core.js"),s=t("biz_wap/utils/mmversion.js");
return{
AdClickReport:o
};
});define("biz_common/utils/respTypes.js",[],function(require,exports,module){
"use strict";
var logList=[],log=function(r){
logList.push(r);
},printLog=function(){
for(var r=0,e=logList.length;e>r;++r)console.log("[RespType]"+logList[r]);
},isArray=function(r){
return"[object Array]"==Object.prototype.toString.call(r);
},getValueType=function(r){
return isArray(r)?"array":typeof r;
},parseRtDesc=function(r,e){
var t="mix",o=!1,c=e;
if(e){
var n="_R",s=e.indexOf(n),i=e.length-n.length;
o=-1!=s&&s==i,c=o?e.substring(0,i):e;
}
return"string"==typeof r?t=r:isArray(r)?t="array":"object"==typeof r&&(t="object"),
{
key:c,
type:t,
isRequired:o
};
},checkForArrayRtDesc=function(r,e){
if(!isArray(r))return!1;
for(var t=0,o=r.length;o>t;++t){
for(var c,n=r[t],s=0,i=!1;c=e[s++];)if(checkForRtDesc(n,c)){
i=!0;
break;
}
if(!i&&s>0)return!1;
}
return!0;
},checkForStringRtDesc=function(r,e){
var t=getValueType(r),o=parseRtDesc(e),c=o.type==t;
return c||log("miss match type : "+t+" !== "+o.type),c;
},checkForObjectRtDesc=function(r,e){
if("object"!=typeof r||isArray(r))return log("must be object"),!1;
var t=r,o=r;
for(var c in e)if(e.hasOwnProperty(c)){
var n=e[c],s=parseRtDesc(n,c),i=s.key;
o=t[i];
var u=getValueType(o);
if(s.isRequired&&void 0===o)return log("is required @key="+i),!1;
if(void 0!==o){
if(u!=s.type&&"mix"!=s.type)return log("miss match type : "+u+" !== "+s.type+" @key="+i),
!1;
if(("array"==u||"object"==u)&&"mix"!=s.type&&!checkForRtDesc(o,n))return!1;
}
}
return!0;
},checkForRtDesc=function(r,e){
return isArray(e)?checkForArrayRtDesc(r,e):"object"==typeof e?checkForObjectRtDesc(r,e):"string"==typeof e?checkForStringRtDesc(r,e):!1;
},check=function(json,rtDescs){
if("string"==typeof json)try{
json=eval("("+json+")");
}catch(e){
return log("parse json error"),!1;
}
if("object"!=typeof json)return log("must be object"),!1;
isArray(rtDesc)||(rtDescs=[rtDescs]);
for(var rtDesc,i=0;rtDesc=rtDescs[i++];)if(checkForRtDesc(json,rtDesc))return!0;
return!1;
};
return{
check:function(r,e){
logList=[];
try{
var t=check(r,e);
return t||printLog(),t;
}catch(o){
return logList.push("[rtException]"+o.toString()),printLog(),!1;
}
},
getMsg:function(){
return logList.join(";");
}
};
});define("appmsg/my_comment_tpl.html.js",[],function(){
return'<!-- 发表留言 -->\n<div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n    <div class="discuss_container_inner">\n        <h2 class="rich_media_title"><#=window.msg_title.htmlDecode()#></h2>\n        <span id="log"></span>\n        <div class="frm_textarea_box_wrp">\n            <span class="frm_textarea_box">\n                <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                <div class="emotion_tool">\n                    <span class="emotion_switch" style="display:none;"></span>\n                    <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                        <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                        <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                    </span>\n                    <div class="emotion_panel" id="js_emotion_panel">\n                        <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                            <i class="emotion_panel_arrow arrow_out"></i>\n                            <i class="emotion_panel_arrow arrow_in"></i>\n                        </span>\n                        <div class="emotion_list_wrp" id="js_slide_wrapper">\n                            <!--<ul class="emotion_list"></ul>-->\n                            <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                        </div>\n                        <ul class="emotion_navs" id="js_navbar">\n                            <!--<li class="emotion_nav"></li>-->\n                        </ul>\n                    </div>\n                </div>\n            </span>\n        </div>\n        <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="javascript:;">提交</a></div>\n        <div class="discuss_list_wrp" style="display:none">\n            <div class="rich_tips with_line title_tips discuss_title_line">\n                <span class="tips">我的留言</span>\n            </div>\n            <ul class="discuss_list" id="js_cmt_mylist"></ul>\n        </div>\n        <div class="rich_tips tips_global loading_tips" id="js_mycmt_loading">\n            <img src="<#=window.icon_loading_white#>" class="rich_icon icon_loading_white" alt="">\n            <span class="tips">加载中</span>\n        </div>\n        <div class="wx_poptips" id="js_cmt_toast" style="display:none;">\n            <img alt="" class="icon_toast" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMTUxMzkxZS1jYWVhLTRmZTMtYTY2NS0xNTRkNDJiOGQyMWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QzM2RTg3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QzM2RTc3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWMyOGVjZTMtNzllZS00ODlhLWIxZTYtYzNmM2RjNzg2YjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNTEzOTFlLWNhZWEtNGZlMy1hNjY1LTE1NGQ0MmI4ZDIxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmvxj1gAAAVrSURBVHja7J15rF1TFMbXk74q1ZKHGlMkJVIhIgg1FH+YEpEQJCKmGBpThRoSs5jVVNrSQUvEEENIhGiiNf9BiERICCFIRbUiDa2qvudbOetF3Tzv7XWGffa55/uS7593977n3vO7e5+199p7v56BgQGh0tcmvAUERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERVAUQVEERVAUQbVYk+HdvZVG8b5F0xj4RvhouB+eCy8KrdzDJc1RtAX8ILxvx98V1GyCSkN98Cx4z/95/Wn4fj6j6tUEeN4wkFSnw1MJqj5NhBfAuwaUHREUg4lqNMmePVsHll/HFhVfe1t3FwpJI8DXCCquDrCWNN4B6Tb4M3Z98aTPmTvh0YHl18PXw29yZiKejoPvcUD6E74yFBJbVDk6Bb7K8aP/Hb4c/tRzEYIqprPhSxzlf4Uvhb/0Xoig8qnHAJ3lqPMzfDH8XZ4LEpRf2sVdA5/sqPO9Qfop70UJyn+/boaPddT5yrq7VUUvTIVJI7q74MMddXR8NB1eXcYvhBpZm0s2w72/o86HFoKvLau/pYaXzjLMdUJ6y0LwtWV9CIIaXtvA8+G9HHV03u5q+K+yH47U0NoRngPv7KjzHDwTLj0bS1BDazfJJlcnOOostC6ysnCT+q80G/sIvFVgeW09D8FPVT0uoP7VfvAD8NjA8pqmuAN+OcYAjso0RbIZ8DGB5TVNcRO8JMaHY9SXSdfa3eeANJimWBLrA7JFiZwIXye+NMUV8CcxP2SRFjXefok7NRjSGZJlWUPvw2/wtNiQirSoXWyMsR28wR7AzzYM0oXw+Y7yK+CLJGeaoqjyrJSdZJD6Ov4+z5y6NJc0Az7NUecHydIUy+v60KNyQHoM3nKI1y7YCFiq0i7uBvgER52vDdKqWn9djhY1Dn4G3n6Ecqm2rF74dvgoR53S0hQxW9RJAZAGW5bSn58QJA27dQ7uIEedjywEX5NKVxCqsY6y+qA+LxFI4+yZ6oH0trWkNan80jygtIUsc5SflgAsDXgehfdx1KkkTRE76tN+Xue2jnTU0Ru1oIbvpt30bBtKhOp5yaaRkts0lic8V1i6dPcIRx2d/l8Y8XtNNEg7OOo8bl1kmmOKnDsO88CaYzejau0hWZqiL7C83oCH4SeTHvwV2BqqsHRVztSEYOmWF80NeXZT6Hd4KflResE9vCnBOlCyGfDNAstHTVPUDWoQ1t3iW+9WNizvlhfd4aerXd+ThqiMfNR6+9LvOOro5OY5JX2H4+F7HZD+kGzlamMgldWiirQsjcwWFbjmqZJteekJLK9pisvgL6RhKvuciZiwzrWWGapfrPy30kBVcSBIrw0aD3PU0XB6cehntq7rTMf7/2iQlktDVdXJLXlg6VjmiYBn6rWSTRCH6hvJ0hQrpcGq8oidsmHpTP8t8DGO9/vcWt9qabiqPgup1yKyQwvC2tSefZ73SSpNkUJ4PlLorlHZ+446nc8f3fIyywlJhwrTuwVSjBa1ccvSxN0hjjoK5xVrYZMd9V6XbFfgBukixTwGLg8sDam3dZR/wZ6L/dJlin1en8LS+bgpFbz3Ygvzu1J1HKxYNqxGpCmaCEo12rrBorD6LRp8UbpcdR5VWhTW35KlKd6QFqjuM2XzwlpnMxTvSkuUwuG/Xlg6NtPjbT6WFimF/VG6LEvXgn8QGDjMbBukVECFwhpoS+CQatfX2Q1q6H7wENHdrfCr0lKleEB9JyxNneus+VJpsVL9TwI6W65LovWIGl3KtVJaLv7LBwYTFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFFWq/hFgADUMN4RzT6/OAAAAAElFTkSuQmCC">\n            <p class="toast_content">已留言</p>\n        </div>\n    </div>\n</div>\n';
});define("appmsg/cmt_tpl.html.js",[],function(){
return'<li class="discuss_item" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\'>\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content">\n        <#=content#>\n        </div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>               \n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" href="javascript:;" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n        <# } #>\n    </p>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="nickname">作者回复</div>\n            <div class="discuss_message">\n                <div class="discuss_message_content">\n                <#=reply.reply_list[0].content#>\n                </div>\n            </div>\n            <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p>\n        </div>\n    <# } #>\n        \n</li>';
});define("sougou/a_tpl.html.js",[],function(){
return'<h3 class="rich_media_area_title">相关文章</h3>\n<ul class="relate_article_list">\n    <# for(var i in list){#>\n    <li class="relate_article_item">\n        <a class="relate_article_link sg_link" href="<#=list[i].url#>" target="_blank"><#=list[i].title#></a>\n    </li>\n    <#}#>\n</ul>\n';
});define("appmsg/emotion/emotion.js",["appmsg/emotion/dom.js","appmsg/emotion/slide.js","appmsg/emotion/common.js","appmsg/emotion/nav.js","appmsg/emotion/textarea.js","appmsg/emotion/map.js"],function(t,n){
"use strict";
function i(){
var t={};
j.each(b,function(n,i){
t[n]=i+1;
}),b=t;
}
function e(){
w.WIDTH=h=j("#js_article").width()||j("#js_cmt_mine").width(),w.pageCount=_=o(),
a(),s(),r();
}
function o(){
d=h-2*N,v=parseInt(d/k),f=3*v-1;
var t=parseInt(M/f);
return M%f!==0&&t++,t;
}
function a(){
var t=j("#js_slide_wrapper"),n=w.wrapperWidth=_*h;
t.css({
width:n+"px"
});
}
function s(){
for(var t=j("#js_slide_wrapper").el[0],n=(h-v*k)/2,i=0,e=_;e>i;i++){
var o=document.createElement("ul");
o.setAttribute("class","emotion_list"),t.appendChild(o),j(o).css({
width:h+"px",
"float":"left",
"padding-left":n+"px",
"padding-right":"0"
}),c(o,i);
}
}
function r(){
for(var t=j("#js_navbar"),n=0,i=_;i>n;n++){
var e=j(j.el("li"));
e.attr("class","emotion_nav js_emotion_nav"),T.push(e),t.append(e);
}
w.navs=T;
}
function c(t){
for(var n=0,i=f;i>n;n++){
var e=document.createElement("li");
if(S++,S>M)break;
e=p(S),j(t).append(e);
}
var o=m();
j(t).append(o);
}
function p(t){
var n=j(j.el("li")),i=j(j.el("i")),e=27===t?-1:1;
i.attr("class","icon_emotion icon"+t),i.css({
"background-position":(1-t)*C-e+"px -1px"
}),n.attr("class","emotion_item js_emotion_item"),n.attr("data-index",t);
var o=k+"px";
return n.css({
width:o,
height:o
}),n.append(i),n;
}
function m(){
var t=j(j.el("li")),n=j(j.el("i"));
t.attr("class","emotion_item del js_emotion_item"),t.attr("data-index",-1),n.attr("class","icon_emotion del");
var i=k+"px";
return t.css({
width:i,
height:i
}),t.append(n),t;
}
function l(){
function t(){
o.show(),O.show(),e.blur(),j.later(function(){
e.blur();
});
}
function n(){
o.hide(),O.hide(),e.focus(),j.later(function(){
e.focus();
});
}
O=j("#js_emotion_panel");
var i=j("#js_cmt_input"),e=i.el[0],o=j("#js_emotion_panel_arrow_wrp");
O.hide(),j("#js_emotion_switch").on("tap",function(i){
i.preventDefault(),i.stopPropagation(),E=!E,E?t():n();
}),i.on("tap",function(){
O.hide(),E=!1;
});
}
function u(){
function t(t){
if(!w.isMoved){
var n=j(t.currentTarget),i=+n.attr("data-index");
I.inputEmotion(i);
}
}
j("li.js_emotion_item").on("click",t),j("li.js_emotion_item").on("touchend",t);
}
var d,_,f,v,h,j=t("appmsg/emotion/dom.js"),g=t("appmsg/emotion/slide.js"),w=t("appmsg/emotion/common.js"),x=t("appmsg/emotion/nav.js"),I=t("appmsg/emotion/textarea.js"),n=(j.each,
{}),E=!1,O=null,b=t("appmsg/emotion/map.js"),T=[],N=15,M=w.EMOTIONS_COUNT,k=w.EMOTION_LI_SIZE,C=w.EMOTION_SIZE;
n.init=function(){
l(),e(),g.init(),x.activeNav(0),u(),I.init(),i();
};
var S=0;
return n.encode=function(t){
var n=/\/([\u4e00-\u9fa5\w]{1,3})/g,i=t.match(n);
return i?(j.each(i,function(n){
var i=n.replace("/",""),e=[i.slice(0,1),i.slice(0,2),i.slice(0,3)];
j.each(e,function(n){
if(void 0!==b[n]){
var i=b[n],e='<i class="icon_emotion_single icon'+i+'"></i>';
t=t.replace("/"+n,e);
}
});
}),t):t;
},n.hidePannel=function(){
O.hide();
},n;
});define("biz_common/utils/wxgspeedsdk.js",[],function(){
"use strict";
function e(e){
if(!e.pid||!e.speeds)return-1;
if(!e.speeds.length>0){
var n=e.speeds;
e.speeds=[],e.speeds.push(n);
}
for(var t=d(e),o=0;o<e.speeds.length;o++){
var r=e.speeds[o];
r.time=parseInt(r.time),r.sid>20&&r.time>0&&i(t,r.sid,r.time);
}
}
function n(){
s(function(){
setTimeout(function(){
for(var e in p)r({
pid_uin_rid:e,
speeds:p[e]
},u);
p={};
},100);
});
}
function t(e){
s(function(){
if(!e.pid||!e.time)return-1;
var n=d(e);
i(n,9,e.time);
});
}
function o(e){
s(function(){
var n=d(e);
p[n]||(p[n]=[]);
var t=window.performance||window.msPerformance||window.webkitPerformance;
if(t&&t.timing){
var o=t.timing;
i(n,1,o.domainLookupEnd-o.domainLookupStart),i(n,2,"https:"==location.protocol&&0!=o.secureConnectionStart?o.connectEnd-o.secureConnectionStart:0),
i(n,3,o.connectEnd-o.connectStart),i(n,4,o.responseStart-o.requestStart),i(n,5,o.responseEnd-o.responseStart),
i(n,6,o.domContentLoadedEventStart-o.domLoading),i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),
i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart),function(){
setTimeout(function(){
o.loadEventEnd&&(i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart));
},0);
}(p),p[n][9]||i(n,9,o.domContentLoadedEventStart-o.navigationStart),i(n,10,o.domainLookupStart-o.navigationStart),
i(n,11,o.domLoading-o.responseStart);
}
});
}
function i(e,n,t){
p[e]=p[e]||[],p[e][n]=p[e][n]||[],0>t||(21>n?p[e][n][0]=t:p[e][n].push(t));
}
function d(e){
return e&&e.pid?e.pid+"_"+(e.uin||0)+"_"+(e.rid||0):void(console&&console.error("Must provide a pid"));
}
function r(e,n){
var t=e.pid_uin_rid.split("_");
if(3!=t.length)return void(console&&console.error("pid,uin,rid, invalid args"));
for(var o="pid="+t[0]+"&uin="+t[1]+"&rid="+t[2],i=n+o+"&speeds=",d="",r=[],s=1;s<e.speeds.length;s++)if(e.speeds[s]){
for(var a=0;a<e.speeds[s].length;a++){
var p=s+"_"+e.speeds[s][a];
i.length+d.length+p.length<1024?d=d+p+";":(d.length&&r.push(i+d.substring(0,d.length-1)),
d=p+";");
}
s==e.speeds.length-1&&r.push(i+d.substring(0,d.length-1));
}
for(var s=0;s<r.length;s++)(new Image).src=r[s];
}
function s(e){
"complete"==document.readyState?e():c.push(e);
}
function a(){
for(var e in c)c[e]();
c=[];
}
var p={},u="https://badjs.weixinbridge.com/frontend/reportspeed?",c=[];
return window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
{
saveSpeeds:e,
send:n,
setFirstViewTime:t,
setBasicTime:o
};
});define("biz_common/utils/report.js",[],function(){
"use strict";
return function(n){
var e=new Image;
e.src=n;
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t,n){
var o=new Date;
return o.setDate(o.getDate()+(n||1)),n=o.toGMTString(),document.cookie=e+"="+t+";expires="+n,
!0;
}
};
return e;
});define("appmsg/topic_tpl.html.js",[],function(){
return'<span class="db topic_wrp">\n    <span class="topic_thumb" style="background-image:url({img_url});"></span>\n    <span class="topic_content">\n        <strong class="topic_title">{title}</strong>\n        <span class="topic_desc">{author}</span>\n        <span class="topic_info">\n            <span class="topic_info_extra"><span class="icon_topic"></span>话题</span>\n            <span class="topic_info_primary">相关文章{msg_num}篇</span>\n        </span>\n    </span>\n</span>\n';
});define("pages/voice_tpl.html.js",[],function(){
return'<span id="voice_main_<#=voiceid#>_<#=posIndex#>" class="db audio_area <#if(!musicSupport){#> unsupport<#}#>">\n    <span class="tc tips_global unsupport_tips" <#if(show_not_support!==true){#>style="display:none;"<#}#>>\n    当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放    </span>\n    <span class="audio_wrp db">\n        <span id="voice_play_<#=voiceid#>_<#=posIndex#>" class="audio_play_area">\n            <i class="icon_audio_default"></i>\n            <i class="icon_audio_playing"></i>\n            <img src="<#=window.icon_audio_unread#>" alt="" class="pic_audio_default">\n        </span>\n        <span class="audio_length tips_global"><#=duration_str#></span>\n        <span class="db audio_info_area">\n            <strong class="db audio_title"><#=title#></strong>\n            <span class="audio_source tips_global"><#if(window.nickname){#>来自<#=window.nickname#><#}#></span>\n        </span>\n        <span id="voice_progress_<#=voiceid#>_<#=posIndex#>" class="progress_bar" style="width:0px;"></span>\n    </span>\n</span>\n';
});define("pages/voice_component.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/loadscript.js","pages/music_player.js","biz_common/dom/class.js","pages/report.js","biz_common/utils/monitor.js"],function(t,e,o,r){
"use strict";
function i(t){
this._o={
type:0,
comment_id:"",
src:"",
mid:"",
songId:"",
autoPlay:!1,
duration:0,
debug:!1,
needVioceMutex:!0,
appPlay:!0,
title:"",
singer:"",
epname:"",
coverImgUrl:"",
webUrl:[location.protocol,"//mp.weixin.qq.com/s?referFrom=#referFrom#&songid=#songId#&__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join(""),
playingCss:"",
playCssDom:"",
playArea:"",
progress:"",
detailUrl:"",
detailArea:""
},this._init(t);
}
function n(t,e,o,r){
I.num++,e.musicSupport=I.musicSupport,e.show_not_support=!1,I.musicSupport||1!=I.num||(e.show_not_support=!0);
var i=document.createElement("div"),n="";
n=r?y.render(t,e):y.tmpl(t,e),i.innerHTML=n;
var s=o.parentNode;
s&&(s.lastChild===o?s.appendChild(i.children[0]):s.insertBefore(i.children[0],o.nextSibling));
}
function s(){
"undefined"==typeof window.reportVoiceid&&(window.reportVoiceid=[]),"undefined"==typeof window.reportMid&&(window.reportMid=[]);
}
function p(){
m.on(window,"unload",a);
}
function a(){
for(var t in I.reportData)g.musicreport({
data:I.reportData[t]
});
}
function c(t){
f.setSum(I.reportId,18,1),f.send();
var e=+new Date,o="//open.music.qq.com/fcgi-bin/fcg_music_get_song_info_weixin.fcg?song_id=#songid#&mid=#mid#&format=json&app_id=100311669&app_key=55d6cdaee6fb3a41275a48067f8d7638&device_id=weixin&file_type=mp3&qqmusic_fromtag=50&callback=get_song_info_back";
o=o.replace("#mid#",t.mid).replace("#songid#",t.id),_({
url:o,
timeout:3e4,
callbackName:"get_song_info_back",
callback:function(o){
var r=+new Date-e;
if(!o||"undefined"==typeof o.ret){
var i=1;
return d({
type:"error",
time:r,
code:i
}),void("function"==typeof t.onError&&t.onError({
errcode:i
}));
}
var n;
n=0==o.ret?1:1001==o.ret?0:1002==o.ret?2:1003==o.ret?3:1004==o.ret?4:5,d({
type:"success",
time:r,
code:n
}),t.onSuc({
status:n
});
},
onerror:function(o){
var r=+new Date-e,i=4;
switch(1*o){
case 400:
i=2;
break;

case 500:
i=3;
break;

default:
i=4;
}
d({
type:"error",
time:r,
code:i
}),"function"==typeof t.onError&&t.onError({
errcode:i
});
}
});
}
function d(t){
var e=Math.max(t.time,0);
if(e=Math.min(e,6e4),t.time>=0&&t.time<200?f.setSum(I.reportId,24,1):t.time>=200&&t.time<500?f.setSum(I.reportId,25,1):t.time>=500&&t.time<1e3?f.setSum(I.reportId,26,1):t.time>=1e3&&t.time<2e3?f.setSum(I.reportId,27,1):t.time>=2e3&&t.time<1e4?f.setSum(I.reportId,28,1):t.time>=1e4&&f.setSum(I.reportId,29,1),
f.setAvg(I.reportId,23,e),"error"==t.type){
switch(1*t.code){
case 1:
f.setSum(I.reportId,9,1);
break;

case 2:
f.setSum(I.reportId,10,1);
break;

case 3:
f.setSum(I.reportId,11,1);
break;

case 4:
f.setSum(I.reportId,12,1);
}
f.setSum(I.reportId,19,1);
}else if("success"==t.type){
switch(1*t.code){
case 0:
f.setSum(I.reportId,8,1);
break;

case 1:
f.setSum(I.reportId,17,1);
break;

case 2:
f.setSum(I.reportId,13,1);
break;

case 3:
f.setSum(I.reportId,14,1);
break;

case 4:
f.setSum(I.reportId,15,1);
break;

case 5:
f.setSum(I.reportId,16,1),f.setSum(I.reportId,17,1);
}
f.setSum(I.reportId,20,1);
}
f.send();
}
function u(t){
return new i(t);
}
var m=t("biz_common/dom/event.js"),y=t("biz_common/tmpl.js"),_=t("pages/loadscript.js"),h=t("pages/music_player.js"),l=t("biz_common/dom/class.js"),g=t("pages/report.js"),f=t("biz_common/utils/monitor.js"),I={
reportId:"28306",
musicSupport:h.getSurportType(),
reportData:{},
posIndex:{},
qqMusiceSongId:"http://thirdparty.gtimg.com/#songId#.m4a?fromtag=38&songid=#songId#",
qqMusiceMid:"http://thirdparty.gtimg.com/C100#mid#.m4a?fromtag=38&songid=#songId#",
num:0
};
return s(),p(),i.prototype._init=function(t){
this._extend(t),this._g={
copyright:-1,
check_copyright:!1
},this._initSrc(),this._initQQmusicLyric(),this._initReportData(),this._initPlayer(),
this._playEvent();
},i.prototype._initSrc=function(){
var t=this._o;
t.src||(0==t.type||1==t.type)&&(t.mid?t.src=I.qqMusiceMid.replace("#mid#",t.mid).replace(/#songId#/g,t.songId||""):t.songId&&(t.src=I.qqMusiceSongId.replace(/#songId#/g,t.songId||"")));
},i.prototype._initQQmusicLyric=function(){
var t=this._o;
t.webUrl=0==t.type||1==t.type?t.webUrl.replace("#songId#",t.songId||"").replace("#referFrom#","music.qq.com"):t.webUrl.replace("#songId#","").replace("#referFrom#","");
},i.prototype._initReportData=function(){
var t=this._o;
2==t.type||3==t.type?window.reportVoiceid.push(t.songId):(0==t.type||1==t.type)&&window.reportMid.push(t.songId),
"undefined"==typeof I.reportData[t.type]&&(I.reportData[t.type]=g.getMusicReportData(t),
I.posIndex[t.type]=0),this._g.posIndex=I.posIndex[t.type]++;
var e=I.reportData[t.type];
e.musicid.push(t.songId),e.commentid.push(t.comment_id),e.hasended.push(0),e.mtitle.push(t.title),
e.detail_click.push(0),e.duration.push(parseInt(1e3*t.duration)),e.errorcode.push(0),
e.play_duration.push(0);
},i.prototype._initPlayer=function(){
I.musicSupport&&(this._o.onStatusChange=this._statusChangeCallBack(),this._o.onTimeupdate=this._timeupdateCallBack(),
this._o.onError=this._errorCallBack(),this.player=new h.init(this._o));
},i.prototype._playEvent=function(){
var t=this,e=this._o,o=this._g;
if(I.musicSupport){
var r=0;
2==e.type||3==e.type?r=3:(0==e.type||1==e.type)&&(r=1),m.tap(e.playArea,function(){
return l.hasClass(e.playCssDom,e.playingCss)?(t.player.stop(),g.report({
type:r,
comment_id:e.comment_id,
voiceid:e.songId,
action:5
})):3==r?t._playMusic(3):1==r&&t._checkCopyright(function(){
t._playMusic(1);
}),!1;
});
}
e.detailUrl&&e.detailArea&&m.tap(e.detailArea,function(){
t._checkCopyright(function(){
I.reportData[e.type].detail_click[o.posIndex]=1,window.location.href=e.detailUrl;
});
});
},i.prototype._checkCopyright=function(t){
var e=this,o=this._o,r=this._g;
return this._musicCopyrightWarnning()===!1?void("function"==typeof t&&t()):void(r.check_copyright||(r.check_copyright=!0,
c({
id:o.songId,
mid:o.mid,
onSuc:function(o){
r.check_copyright=!1,r.copyright=1*o.status,e._musicCopyrightWarnning()===!1&&"function"==typeof t&&t();
},
onError:function(){
r.check_copyright=!1;
}
})));
},i.prototype._musicCopyrightWarnning=function(){
var t=this._g;
return 1*t.copyright===-1?!0:1*t.copyright===0?(r("该歌曲版权已过期，无法播放"),!0):1*t.copyright===2?(r("抱歉，应版权方要求，当前国家或地区暂不提供此歌曲服务"),
!0):1*t.copyright===3?(r("该歌曲版权已过期，无法播放"),!0):1*t.copyright===4?(r("抱歉，歌曲信息不正确"),
!0):!1;
},i.prototype._playMusic=function(t){
var e=this._o,o=this._g;
this.player.play(0),I.reportData[e.type].hasended[o.posIndex]=1,g.report({
type:t,
comment_id:e.comment_id,
voiceid:e.songId,
action:4
});
},i.prototype._extend=function(t){
for(var e in t)this._o[e]=t[e];
},i.prototype._statusChangeCallBack=function(){
var t=this;
return function(e,o){
t._updatePlayerCss(this,o);
};
},i.prototype._timeupdateCallBack=function(){
var t=this,e=this._o,o=this._g;
return function(r,i){
t._updateProgress(this,i),0!=i&&(I.reportData[e.type].play_duration[o.posIndex]=parseInt(1e3*i));
};
},i.prototype._errorCallBack=function(){
var t=this,e=this._o,o=this._g;
return function(r,i){
I.reportData[e.type].errorcode[o.posIndex]=i,t._updatePlayerCss(this,3);
};
},i.prototype._updatePlayerCss=function(t,e){
var o=this._o,r=o.playCssDom,i=o.progress;
2==e||3==e?(l.removeClass(r,o.playingCss),!!i&&(i.style.width=0)):1==e&&l.addClass(r,o.playingCss);
},i.prototype._updateProgress=function(t,e){
var o=this._o,r=o.progress,i=t.getDuration();
i&&r&&(r.style.width=this._countProgress(i,e));
},i.prototype._countProgress=function(t,e){
return e/t*100+"%";
},{
init:u,
renderPlayer:n
};
});define("pages/qqmusic_tpl.html.js",[],function(){
return'<span id="qqmusic_main_<#=comment_id#>_<#=posIndex#>" class="db qqmusic_area <#if(!musicSupport){#> unsupport<#}#>">\n    <span class="tc tips_global unsupport_tips" <#if(show_not_support!==true){#>style="display:none;"<#}#>>\n    当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放    </span>\n    <span class="db qqmusic_wrp">\n        <span class="db qqmusic_bd">\n            <span id="qqmusic_play_<#=musicid#>_<#=posIndex#>" class="play_area">\n                <i class="icon_qqmusic_switch"></i>\n                <img src="<#=window.icon_qqmusic_default#>" alt="" class="pic_qqmusic_default">\n                <img src="<#=music_img#>" data-autourl="<#=audiourl#>" data-musicid="<#=musicid#>" class="qqmusic_thumb" alt="">\n            </span>\n            <!--\n            <%@if($show_comment.DATA$=1)%>\n            <span id="qqmusic_love_icon_<#=musicid#>_<#=posIndex#>" class="qqmusic_love">\n                <i class="icon_love"></i>\n                <span id="love_text_<#=comment_id#>_<#=posIndex#>" class="love_num">赞</span>\n            </span>\n            <%@endif%>\n            -->\n            <a id="qqmusic_home_<#=musicid#>_<#=posIndex#>" href="javascript:void(0);" class="access_area">\n                <span class="qqmusic_songname"><#=music_name#></span>\n                <span class="qqmusic_singername"><#=singer#></span>\n                <span class="qqmusic_source"><img src="<#=window.icon_qqmusic_source#>" alt=""></span>\n            </a>\n        </span>\n    </span>       \n</span>\n';
});define("new_video/ctl.js",["biz_wap/utils/ajax.js"],function(i){
"use strict";
var e=top.window.user_uin,t=Math.floor(top.window.user_uin/100)%20;
e||(t=-1);
var o=function(){
return t>=0;
};
top.window.__webviewid||(top.window.__webviewid=+new Date+"_"+Math.ceil(1e3*Math.random()));
var d=function(){
var i=top.window.mid,t=top.window.idx,o="";
o=i&&t?i+"_"+t:"";
var d=top.window.__webviewid,r=[e,o,d].join("_");
return r;
},r=function(e){
if(20>t)try{
var r=e.vid||"",w={};
w.__biz=top.window.biz||"",w.vid=r,w.clienttime=+new Date;
var n=top.window.mid,a=top.window.idx,p="";
n&&a?(w.type=1,p=n+"_"+a):(w.type=2,p=r),w.id=p,w.webviewid=d(),w.step=e.step||0,
w.orderid=e.orderid||0,w.ad_source=e.ad_source||0,w.traceid=e.traceid||0,w.ext1=e.ext1||"",
w.ext2=e.ext2||"",w.r=Math.random(),w.devicetype=top.window.devicetype,w.version=top.window.clientversion,
w.is_gray=o()?1:0;
var _=i("biz_wap/utils/ajax.js");
_({
url:"/mp/ad_video_report?action=user_action",
type:"post",
data:w
});
}catch(v){}
};
return{
report:r,
getWebviewid:d,
showAd:o
};
});