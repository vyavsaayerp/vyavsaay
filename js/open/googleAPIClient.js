var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){var g=window,h=document,m=g.location,n=function(){},q=/\[native code\]/,u=function(a,b,c){return a[b]=a[b]||c},w=function(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1},aa=function(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a.length;d++){var e=a[d];e!=c&&b.push(e);c=e}return b},x=function(){var a;if((a=Object.create)&&q.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a},A=u(g,"gapi",{});var B;B=u(g,"___jsl",x());u(B,"I",0);u(B,"hel",10);var C=function(){var a=m.href,b;if(B.dpo)b=B.h;else{b=B.h;var c=/([#].*&|[#])jsh=([^&#]*)/g,d=/([?#].*&|[?#])jsh=([^&#]*)/g;if(a=a&&(c.exec(a)||d.exec(a)))try{b=decodeURIComponent(a[2])}catch(e){}}return b},ba=function(a){var b=u(B,"PQ",[]);B.PQ=[];var c=b.length;if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)},D=function(a){return u(u(B,"H",x()),a,x())};var F=u(B,"perf",x()),G=u(F,"g",x()),ca=u(F,"i",x());u(F,"r",[]);x();x();var J=function(a,b,c){var d=F.r;"function"===typeof d?d(a,b,c):d.push([a,b,c])},L=function(a,b,c){b&&0<b.length&&(b=K(b),c&&0<c.length&&(b+="___"+K(c)),28<b.length&&(b=b.substr(0,28)+(b.length-28)),c=b,b=u(ca,"_p",x()),u(b,c,x())[a]=(new Date).getTime(),J(a,"_p",c))},K=function(a){return a.join("__").replace(/\./g,"_").replace(/\-/g,"_").replace(/\,/g,"_")};var M=x(),N=[],O=function(a){throw Error("Bad hint"+(a?": "+a:""));};N.push(["jsl",function(a){for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b];"object"==typeof c?B[b]=u(B,b,[]).concat(c):u(B,b,c)}if(b=a.u)a=u(B,"us",[]),a.push(b),(b=/^https:(.*)$/.exec(b))&&a.push("http:"+b[1])}]);var da=/^(\/[a-zA-Z0-9_\-]+)+$/,ea=/^[a-zA-Z0-9\-_\.,!]+$/,fa=/^gapi\.loaded_[0-9]+$/,ga=/^[a-zA-Z0-9,._-]+$/,ka=function(a,b,c,d){var e=a.split(";"),f=e.shift(),l=M[f],k=null;l?k=l(e,b,c,d):O("no hint processor for: "+f);k||O("failed to generate load url");b=k;c=b.match(ha);(d=b.match(ia))&&1===d.length&&ja.test(b)&&c&&1===c.length||O("failed sanity: "+a);return k},ma=function(a,b,c,d){a=la(a);fa.test(c)||O("invalid_callback");b=P(b);d=d&&d.length?P(d):null;var e=function(a){return encodeURIComponent(a).replace(/%2C/g,
",")};return[encodeURIComponent(a.g).replace(/%2C/g,",").replace(/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.a?"/am="+e(a.a):"",a.c?"/rs="+e(a.c):"",a.f?"/t="+e(a.f):"","/cb=",e(c)].join("")},la=function(a){"/"!==a.charAt(0)&&O("relative path");for(var b=a.substring(1).split("/"),c=[];b.length;){a=b.shift();if(!a.length||0==a.indexOf("."))O("empty/relative directory");else if(0<a.indexOf("=")){b.unshift(a);break}c.push(a)}a={};for(var d=0,e=b.length;d<e;++d){var f=
b[d].split("="),l=decodeURIComponent(f[0]),k=decodeURIComponent(f[1]);2==f.length&&l&&k&&(a[l]=a[l]||k)}b="/"+c.join("/");da.test(b)||O("invalid_prefix");c=Q(a,"k",!0);d=Q(a,"am");e=Q(a,"rs");a=Q(a,"t");return{g:b,version:c,a:d,c:e,f:a}},P=function(a){for(var b=[],c=0,d=a.length;c<d;++c){var e=a[c].replace(/\./g,"_").replace(/-/g,"_");ga.test(e)&&b.push(e)}return b.join(",")},Q=function(a,b,c){a=a[b];!a&&c&&O("missing: "+b);if(a){if(ea.test(a))return a;O("invalid: "+b)}return null},ja=/^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
ia=/\/cb=/g,ha=/\/\//g,na=function(){var a=C();if(!a)throw Error("Bad hint");return a};M.m=function(a,b,c,d){(a=a[0])||O("missing_hint");return"https://apis.google.com"+ma(a,b,c,d)};var R=decodeURI("%73cript"),S=/^[-+_0-9\/A-Za-z]+={0,2}$/,T=function(a,b){for(var c=[],d=0;d<a.length;++d){var e=a[d];e&&0>w.call(b,e)&&c.push(e)}return c},U=function(){var a=B.nonce;if(void 0!==a)return a&&a===String(a)&&a.match(S)?a:B.nonce=null;var b=u(B,"us",[]);if(!b||!b.length)return B.nonce=null;for(var c=h.getElementsByTagName(R),d=0,e=c.length;d<e;++d){var f=c[d];if(f.src&&(a=String(f.getAttribute("nonce")||"")||null)){for(var l=0,k=b.length;l<k&&b[l]!==f.src;++l);if(l!==k&&a&&a===String(a)&&
a.match(S))return B.nonce=a}}return null},oa=function(a){if("loading"!=h.readyState)W(a);else{var b=U(),c="";null!==b&&(c=' nonce="'+b+'"');h.write("<"+R+' src="'+encodeURI(a)+'"'+c+"></"+R+">")}},W=function(a){var b=h.createElement(R);b.setAttribute("src",a);a=U();null!==a&&b.setAttribute("nonce",a);b.async="true";(a=h.getElementsByTagName(R)[0])?a.parentNode.insertBefore(b,a):(h.head||h.body||h.documentElement).appendChild(b)},pa=function(a,b){var c=b&&b._c;if(c)for(var d=0;d<N.length;d++){var e=
N[d][0],f=N[d][1];f&&Object.prototype.hasOwnProperty.call(c,e)&&f(c[e],a,b)}},qa=function(a,b,c){X(function(){var c;c=b===C()?u(A,"_",x()):x();c=u(D(b),"_",c);a(c)},c)},Z=function(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);pa(a,c);b=a?a.split(":"):[];var d=c.h||na(),e=u(B,"ah",x());if(e["::"]&&b.length){a=[];for(var f=null;f=b.shift();){var l=f.split("."),l=e[f]||e[l[1]&&"ns:"+l[0]||""]||d,k=a.length&&a[a.length-1]||null,v=k;k&&k.hint==l||(v={hint:l,b:[]},a.push(v));v.b.push(f)}var y=
a.length;if(1<y){var z=c.callback;z&&(c.callback=function(){0==--y&&z()})}for(;b=a.shift();)Y(b.b,c,b.hint)}else Y(b||[],c,d)},Y=function(a,b,c){a=aa(a)||[];var d=b.callback,e=b.config,f=b.timeout,l=b.ontimeout,k=b.onerror,v=void 0;"function"==typeof k&&(v=k);var y=null,z=!1;if(f&&!l||!f&&l)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var k=u(D(c),"r",[]).sort(),H=u(D(c),"L",[]).sort(),E=[].concat(k),V=function(a,b){if(z)return 0;g.clearTimeout(y);H.push.apply(H,
p);var d=((A||{}).config||{}).update;d?d(e):e&&u(B,"cu",[]).push(e);if(b){L("me0",a,E);try{qa(b,c,v)}finally{L("me1",a,E)}}return 1};0<f&&(y=g.setTimeout(function(){z=!0;l()},f));var p=T(a,H);if(p.length){var p=T(a,k),r=u(B,"CP",[]),t=r.length;r[t]=function(a){if(!a)return 0;L("ml1",p,E);var b=function(b){r[t]=null;V(p,a)&&ba(function(){d&&d();b()})},c=function(){var a=r[t+1];a&&a()};0<t&&r[t-1]?r[t]=function(){b(c)}:b(c)};if(p.length){var I="loaded_"+B.I++;A[I]=function(a){r[t](a);A[I]=null};a=ka(c,
p,"gapi."+I,k);k.push.apply(k,p);L("ml0",p,E);b.sync||g.___gapisync?oa(a):W(a)}else r[t](n)}else V(p)&&d&&d()};var X=function(a,b){if(B.hee&&0<B.hel)try{return a()}catch(c){b&&b(c),B.hel--,Z("debug_error",function(){try{window.___jsl.hefn(c)}catch(d){throw c;}})}else try{return a()}catch(c){throw b&&b(c),c;}};A.load=function(a,b){return X(function(){return Z(a,b)})};G.bs0=window.gapi._bs||(new Date).getTime();J("bs0");G.bs1=(new Date).getTime();J("bs1");delete window.gapi._bs;})();
gapi.load("client",{callback:window["gapi_onload"],_c:{"jsl":{"ci":{"deviceType":"desktop","oauth-flow":{"authUrl":"https://accounts.google.com/o/oauth2/auth","proxyUrl":"https://accounts.google.com/o/oauth2/postmessageRelay","disableOpt":true,"idpIframeUrl":"https://accounts.google.com/o/oauth2/iframe","usegapi":false},"debug":{"reportExceptionRate":0.05,"forceIm":false,"rethrowException":false,"host":"https://apis.google.com"},"lexps":[81,97,99,122,123,30,79,127],"enableMultilogin":true,"googleapis.config":{"auth":{"useFirstPartyAuthV2":true}},"isPlusUser":true,"inline":{"css":1},"disableRealtimeCallback":false,"drive_share":{"skipInitCommand":true},"csi":{"rate":0.01},"client":{"headers":{"request":["Accept","Accept-Language","Authorization","Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","GData-Version","Host","If-Match","If-Modified-Since","If-None-Match","If-Unmodified-Since","Origin","OriginToken","Pragma","Range","Slug","Transfer-Encoding","Want-Digest","X-ClientDetails","X-GData-Client","X-GData-Key","X-Goog-AuthUser","X-Goog-PageId","X-Goog-Encode-Response-If-Executable","X-Goog-Correlation-Id","X-Goog-Request-Info","X-Goog-Experiments","x-goog-iam-authority-selector","x-goog-iam-authorization-token","X-Goog-Spatula","X-Goog-Upload-Command","X-Goog-Upload-Content-Disposition","X-Goog-Upload-Content-Length","X-Goog-Upload-Content-Type","X-Goog-Upload-File-Name","X-Goog-Upload-Offset","X-Goog-Upload-Protocol","X-Goog-Visitor-Id","X-HTTP-Method-Override","X-JavaScript-User-Agent","X-Pan-Versionid","X-Origin","X-Referer","X-Upload-Content-Length","X-Upload-Content-Type","X-Use-HTTP-Status-Code-Override","X-Ios-Bundle-Identifier","X-Android-Package","X-YouTube-VVT","X-YouTube-Page-CL","X-YouTube-Page-Timestamp"],"response":["Digest","Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","ETag","Expires","Last-Modified","Location","Pragma","Range","Server","Transfer-Encoding","WWW-Authenticate","Vary","Unzipped-Content-MD5","X-Goog-Generation","X-Goog-Metageneration","X-Goog-Safety-Content-Type","X-Goog-Safety-Encoding","X-Google-Trace","X-Goog-Upload-Chunk-Granularity","X-Goog-Upload-Control-URL","X-Goog-Upload-Size-Received","X-Goog-Upload-Status","X-Goog-Upload-URL","X-Goog-Diff-Download-Range","X-Goog-Hash","X-Goog-Updated-Authorization","X-Server-Object-Version","X-Guploader-Customer","X-Guploader-Upload-Result","X-Guploader-Uploadid","X-Google-Gfe-Backend-Request-Cost"]},"rms":"migrated","cors":false},"isLoggedIn":true,"signInDeprecation":{"rate":0.0},"include_granted_scopes":true,"llang":"en","iframes":{"youtube":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1","methods":["scroll","openwindow"]},"ytsubscribe":{"url":"https://www.youtube.com/subscribe_embed?usegapi\u003d1"},"plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"},"rbr_s":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"},"udc_webconsentflow":{"params":{"url":""},"url":"https://www.google.com/settings/webconsent?usegapi\u003d1"},":source:":"3p","playemm":{"url":"https://play.google.com/work/embedded/search?usegapi\u003d1\u0026usegapi\u003d1"},"savetoandroidpay":{"url":"https://clients5.google.com/s2w/o/savetowallet"},"blogger":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1","methods":["scroll","openwindow"]},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"},"partnersbadge":{"url":"https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1"},"surveyoptin":{"url":"https://www.google.com/shopping/customerreviews/optin?usegapi\u003d1"},":socialhost:":"https://apis.google.com","shortlists":{"url":""},"hangout":{"url":"https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"},"plus_followers":{"params":{"url":""},"url":":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"},"post":{"params":{"url":""},"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"},":gplus_url:":"https://plus.google.com","signin":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1","methods":["onauth"]},"rbr_i":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"},"donation":{"url":"https://onetoday.google.com/home/donationWidget?usegapi\u003d1"},"share":{"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"},"plusone":{"params":{"count":"","size":"","url":""},"url":":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"},"comments":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1","methods":["scroll","openwindow"]},":im_socialhost:":"https://plus.googleapis.com","backdrop":{"url":"https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1"},"visibility":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"},"autocomplete":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/autocomplete"},"additnow":{"url":"https://apis.google.com/additnow/additnow.html?usegapi\u003d1","methods":["launchurl"]},":signuphost:":"https://plus.google.com","ratingbadge":{"url":"https://www.google.com/shopping/customerreviews/badge?usegapi\u003d1"},"appcirclepicker":{"url":":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},"follow":{"url":":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"},"community":{"url":":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"},"sharetoclassroom":{"url":"https://www.gstatic.com/classroom/sharewidget/widget_stable.html?usegapi\u003d1"},"ytshare":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"},"plus":{"url":":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"},"family_creation":{"params":{"url":""},"url":"https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1"},"commentcount":{"url":":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"},"configurator":{"url":":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"},"zoomableimage":{"url":"https://ssl.gstatic.com/microscope/embed/"},"savetowallet":{"url":"https://clients5.google.com/s2w/o/savetowallet"},"person":{"url":":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"},"savetodrive":{"url":"https://drive.google.com/savetodrivebutton?usegapi\u003d1","methods":["save"]},"page":{"url":":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"},"card":{"url":":socialhost:/:session_prefix:_/hovercard/card"}}},"h":"m;/_/scs/apps-static/_/js/k\u003doz.gapi.en.Ofp6ZP138mM.O/m\u003d__features__/am\u003dAQ/rt\u003dj/d\u003d1/rs\u003dAGLTcCOYADERqYFAfwlSUB2zpqq8lD4zzg","u":"https://apis.google.com/js/client.js","hee":true,"fp":"00cc757c252570297b0cb09277dd6dd317d29836","dpo":false},"fp":"00cc757c252570297b0cb09277dd6dd317d29836","annotation":["interactivepost","recobar","signin2","autocomplete","profile"],"bimodal":["signin","share"]}});
