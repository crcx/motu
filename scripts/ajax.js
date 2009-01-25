function $__(e){if(typeof e=='string')e=document.getElementById(e);return e};
function collect(a,f){var n=[];for(var i=0;i<a.length;i++){var v=f(a[i]);if(v!=null)n.push(v)}return n};
ajax={};
ajax.x=function(){try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(e){try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(e){return new XMLHttpRequest()}}};
ajax.nocache = function(t){t.setRequestHeader("Cache-Control", "no-cache");t.setRequestHeader("If-Modified-Since", "Wed, 31 Dec 1980 00:00:00 GMT");t.setRequestHeader("Expires", "Wed, 31 Dec 1980 00:00:00 GMT");}
ajax.serialize=function(f){var g=function(n){return f.getElementsByTagName(n)};var nv=function(e){if(e.name)return encodeURIComponent(e.name)+'='+encodeURIComponent(e.value);else return ''};var i=collect(g('input'),function(i){if((i.type!='radio'&&i.type!='checkbox')||i.checked)return nv(i)});var s=collect(g('select'),nv);var t=collect(g('textarea'),nv);return i.concat(s).concat(t).join('&');};
ajax.send=function(u,f,m,a,nc){var x=ajax.x();x.open(m,u,true);x.onreadystatechange=function(){if(x.readyState==4)f(x.responseText)};if(m=='POST')x.setRequestHe
ader('Content-type','application/x-www-form-urlencoded');if(nc)ajax.nocache(x);x.send(a)};
ajax.get=function(url,func,nc){ajax.send(url,func,'GET',null,nc)};
ajax.gets=function(url,elm){var x=ajax.x();x.open('GET',url,false);x.send(null);return x.responseText};
ajax.linker=function(tg,typ,src){var csc=document.createElement('script');csc.type='text/javascript';csc.src=src;document.getElementsByTagName('head').item(0).appendChild(csc);}
ajax.post=function(url,func,args){ajax.send(url,func,'POST',args)};
ajax.run=function(t){var sc=t.getElementsByTagName('script');if(sc.length>0){for(var i=0;i<sc.length;i++){eval(sc.item(i).innerHTML);if(sc.item(i).src)ajax.linker('script','text/javascript',sc.item(i).src);};};}
ajax.update=function(url,elm,nc){var e=$__(elm);var f=function(r){e.innerHTML=r;ajax.run(e);};ajax.get(url,f,nc);};
ajax.submit=function(url,elm,frm){var e=$__(elm);var f=function(r){e.innerHTML=r;ajax.run(e);};ajax.post(url,f,ajax.serialize(frm))};
ajax.json=function(url){var jstr=ajax.gets(url);return eval('('+jstr+')');};
ajax.interval=function(url,elm,s){f = function() {ajax.update(url,elm,true);};return setInterval(f,s);};
ajax.timeout=function(url,elm,s){f = function() {ajax.update(url,elm,true);};return setTimeout(f,s);};
