/*!
*
* AnimJS (@enea-entertainment/animjs)
*
* @version  : 0.2.2
* @author   : Enea Entertainment
* @homepage : http://www.enea.sk/
* @license  : MIT
*
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).anim={})}(this,(function(t){"use strict";function e(t){this.wrapped=t}function n(t){var n,i;function r(n,i){try{var o=t[n](i),u=o.value,s=u instanceof e;Promise.resolve(s?u.wrapped:u).then((function(t){s?r("return"===n?"return":"next",t):a(o.done?"return":"normal",t)}),(function(t){r("throw",t)}))}catch(t){a("throw",t)}}function a(t,e){switch(t){case"return":n.resolve({value:e,done:!0});break;case"throw":n.reject(e);break;default:n.resolve({value:e,done:!1})}(n=n.next)?r(n.key,n.arg):i=null}this._invoke=function(t,e){return new Promise((function(a,o){var u={key:t,arg:e,resolve:a,reject:o,next:null};i?i=i.next=u:(n=i=u,r(t,e))}))},"function"!=typeof t.return&&(this.return=void 0)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function a(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function h(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function c(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?h(t):e}function f(t){var e=l();return function(){var n,i=u(t);if(e){var r=u(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return c(this,n)}}function v(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=u(t)););return t}function p(t,e,n){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var i=v(t,e);if(i){var r=Object.getOwnPropertyDescriptor(i,e);return r.get?r.get.call(n):r.value}})(t,e,n||t)}function d(t,e){if(t){if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(t,e):void 0}}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}"function"==typeof Symbol&&Symbol.asyncIterator&&(n.prototype[Symbol.asyncIterator]=function(){return this}),n.prototype.next=function(t){return this._invoke("next",t)},n.prototype.throw=function(t){return this._invoke("throw",t)},n.prototype.return=function(t){return this._invoke("return",t)};var b=Math.PI/2,k=function(){function t(){i(this,t)}return a(t,null,[{key:"linear",value:function(t){return t}},{key:"backIn",value:function(t){var e=1.70158;return t*t*((e+1)*t-e)}},{key:"backOut",value:function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1}},{key:"backInOut",value:function(t){var e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}},{key:"bounceIn",value:function(e){return 1-t.bounceOut(1-e)}},{key:"bounceOut",value:function(t){var e=t*t;return t<4/11?7.5625*e:t<8/11?9.075*e-9.9*t+3.4:t<.9?4356/361*e-35442/1805*t+16061/1805:10.8*t*t-20.52*t+10.72}},{key:"bounceInOut",value:function(e){return e<.5?.5*(1-t.bounceOut(1-2*e)):.5*t.bounceOut(2*e-1)+.5}},{key:"circIn",value:function(t){return 1-Math.sqrt(1-t*t)}},{key:"circOut",value:function(t){return Math.sqrt(1- --t*t)}},{key:"circInOut",value:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},{key:"cubicIn",value:function(t){return t*t*t}},{key:"cubicOut",value:function(t){var e=t-1;return e*e*e+1}},{key:"cubicInOut",value:function(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}},{key:"elasticIn",value:function(t){return Math.sin(13*t*b)*Math.pow(2,10*(t-1))}},{key:"elasticOut",value:function(t){return Math.sin(-13*(t+1)*b)*Math.pow(2,-10*t)+1}},{key:"elasticInOut",value:function(t){return t<.5?.5*Math.sin(13*b*2*t)*Math.pow(2,10*(2*t-1)):.5*Math.sin(-13*b*(2*t-1+1))*Math.pow(2,-10*(2*t-1))+1}},{key:"expoIn",value:function(t){return 0===t?t:Math.pow(2,10*(t-1))}},{key:"expoOut",value:function(t){return 1===t?t:1-Math.pow(2,-10*t)}},{key:"expoInOut",value:function(t){return 0===t||1===t?t:t<.5?.5*Math.pow(2,20*t-10):-.5*Math.pow(2,10-20*t)+1}},{key:"quadIn",value:function(t){return t*t}},{key:"quadOut",value:function(t){return-t*(t-2)}},{key:"quadInOut",value:function(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)}},{key:"quartIn",value:function(t){return Math.pow(t,4)}},{key:"quartOut",value:function(t){return Math.pow(t-1,3)*(1-t)+1}},{key:"quartInOut",value:function(t){return t<.5?8*Math.pow(t,4):-8*Math.pow(t-1,4)+1}},{key:"quintIn",value:function(t){return t*t*t*t*t}},{key:"quintOut",value:function(t){return--t*t*t*t*t+1}},{key:"quintInOut",value:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},{key:"sineIn",value:function(t){var e=Math.cos(t*Math.PI*.5);return Math.abs(e)<1e-14?1:1-e}},{key:"sineOut",value:function(t){return Math.sin(t*b)}},{key:"sineInOut",value:function(t){return-.5*(Math.cos(Math.PI*t)-1)}}]),t}();function g(t){if("string"==typeof t||t instanceof String){if(k.hasOwnProperty(t))return k[t];var e=function(t,e){for(var n=(e=(e=e.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),i=0,r=n.length;i<r;++i){var a=n[i];if(!(a in t))return null;t=t[a]}return t}(k,t);if("function"==typeof e)return e;throw"Unknown easing: ".concat(t)}return t}k.none=k.linear,k.back={in:k.backIn,out:k.backOut,inOut:k.backInOut},k.bounce={in:k.bounceIn,out:k.bounceOut,inOut:k.bounceInOut},k.circ={in:k.circIn,out:k.circOut,inOut:k.circInOut},k.cubic={in:k.cubicIn,out:k.cubicOut,inOut:k.cubicInOut},k.elastic={in:k.elasticIn,out:k.elasticOut,inOut:k.elasticInOut},k.expo={in:k.expoIn,out:k.expoOut,inOut:k.expoInOut},k.quad={in:k.quadIn,out:k.quadOut,inOut:k.quadInOut},k.quart={in:k.quartIn,out:k.quartOut,inOut:k.quartInOut},k.quint={in:k.quintIn,out:k.quintOut,inOut:k.quintInOut},k.sine={in:k.sineIn,out:k.sineOut,inOut:k.sineInOut};var w=function(){function t(e){i(this,t),this.name=e,this.items=[]}return a(t,[{key:"dispatch",value:function(t,e,n){for(var i=0;i<this.items.length;i++)this.items[i][this.name](t,e,n)}},{key:"add",value:function(t,e){t[this.name]&&(this.detach(t),void 0===e?this.items.push(t):this.items.splice(e,0,t))}},{key:"detach",value:function(t){var e=this.items.indexOf(t);-1!==e&&this.items.splice(e,1)}},{key:"detachAll",value:function(){this.items.length=0}},{key:"destroy",value:function(){this.detachAll(),this.name=null,this.items=null}}]),t}(),m={delay:0,duration:1,yoyo:!1,repeat:0,repeatDelay:0,paused:!1,protected:!1,ease:"none"},O=function(){function t(e){var n,r,a,o,u,s;i(this,t),this.active=!0,this.cancelling=!1,this.paused=null!==(n=null==e?void 0:e.paused)&&void 0!==n?n:m.paused,this.protected=null!==(r=null==e?void 0:e.protected)&&void 0!==r?r:m.protected,this.started=!1,this.time=0,this._isReversed=!1,this.delay=null!==(a=null==e?void 0:e.delay)&&void 0!==a?a:m.delay,this.duration=null!==(o=null==e?void 0:e.duration)&&void 0!==o?o:m.duration,this.repeat=null!==(u=null==e?void 0:e.repeat)&&void 0!==u?u:m.repeat,this.repeatDelay=null!==(s=null==e?void 0:e.repeatDelay)&&void 0!==s?s:m.repeatDelay,this.repeat<0&&(this.repeat=1e10),this.loop=this.repeat,this.progressDuration=this.duration+this.delay,this.totalDuration=this.duration*(this.repeat+1)+this.repeat*this.repeatDelay+this.delay,this.baseStart=new w("onBaseStart"),this.baseUpdate=new w("onBaseUpdate"),this.baseRepeat=new w("onBaseRepeat"),this.baseDirection=new w("onBaseDirection"),this.baseComplete=new w("onBaseComplete")}return a(t,[{key:"restart",value:function(){this.cancelling||(this.time=0,this.active=!0,this.started=!1,this.loop=this.repeat,this.seek(0))}},{key:"tick",value:function(t){if(this.active&&!this.paused&&!this.cancelling){this.time+=t;var e=this.time-this.delay,n=e/this.duration;if(e>0&&(this.started||(this.started=!0,this.baseStart.dispatch(this)),n=Math.max(0,Math.min(n,1)),this.baseUpdate.dispatch(this,n,t)),this.time>=this.progressDuration)if(this.loop>0){this.loop--;var i=this.repeat-this.loop,r=i%2==1;this.baseRepeat.dispatch(this,i),this.baseDirection.dispatch(this,r),this.time-=this.duration+this.repeatDelay}else this.active=!1,this.cancelling=!0,this.baseComplete.dispatch(this)}}},{key:"seek",value:function(t){t=Math.max(0,Math.min(t,this.totalDuration))-this.delay;for(var e=0;t>this.duration;)t-=this.duration+this.repeatDelay,e++;var n=e%2==1;this.baseDirection.dispatch(this,n),this.time=t+this.delay;var i=t/this.duration;i=Math.max(0,Math.min(i,1)),this.baseUpdate.dispatch(this,i,0)}},{key:"kill",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.protected&&!t||(this.cancelling=!0)}},{key:"destroy",value:function(){this.active=null,this.cancelling=null,this.paused=null,this.protected=null,this.started=null,this.time=null,this._isReversed=null,this.delay=null,this.duration=null,this.repeat=null,this.repeatDelay=null,this.progressDuration=null,this.totalDuration=null,this.baseStart.destroy(),this.baseStart=null,this.baseUpdate.destroy(),this.baseUpdate=null,this.baseRepeat.destroy(),this.baseRepeat=null,this.baseDirection.destroy(),this.baseDirection=null,this.baseComplete.destroy(),this.baseComplete=null}}]),t}(),I=Object.prototype.propertyIsEnumerable,M=D(new O),S=Object.prototype.toString;function D(t){var e=Object.getOwnPropertyNames(t);return Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(t))),e.filter((function(e){return I.call(t,e)}))}function x(t){return"number"==typeof t&&isFinite(t)}function R(t){return t.BYTES_PER_ELEMENT&&"[object ArrayBuffer]"===S.call(t.buffer)||Array.isArray(t)}function q(t,e){for(var n=t.slice(),i=0;i<Math.min(t.length,e.length);i++)n[i]=e[i];return n}function j(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",i=n.length,r=0;r<t;r++)e+=n.charAt(Math.floor(Math.random()*i));return e}var C=function(){},E=function(t){o(n,t);var e=f(n);function n(t){var r,a,o,u,s,l,c,f,v=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return i(this,n),(f=e.call(this,v)).target=t,f.data=v,f.values=void 0,f.yoyo=null!==(r=null==v?void 0:v.yoyo)&&void 0!==r?r:m.yoyo,f.ease=g(null!==(a=null==v?void 0:v.ease)&&void 0!==a?a:m.ease),f.yoyoEase=g(null!==(o=null==v?void 0:v.yoyoEase)&&void 0!==o?o:f.ease),f.easing=f.ease,f.onStart=null!==(u=null==v?void 0:v.onStart)&&void 0!==u?u:C,f.onUpdate=null!==(s=null==v?void 0:v.onUpdate)&&void 0!==s?s:C,f.onRepeat=null!==(l=null==v?void 0:v.onRepeat)&&void 0!==l?l:C,f.onComplete=null!==(c=null==v?void 0:v.onComplete)&&void 0!==c?c:C,f.baseStart.add(h(f)),f.baseUpdate.add(h(f)),f.baseRepeat.add(h(f)),f.baseDirection.add(h(f)),f.baseComplete.add(h(f)),f}return a(n,[{key:"prepare",value:function(){this.values=function(t,e){var n=[],i=D(e);for(var r in e)if(i.indexOf(r)>=0&&r in t&&-1===M.indexOf(r)){var a=t[r],o=e[r];x(a)&&x(o)?n.push({key:r,start:a,end:o}):R(a)&&R(o)&&n.push({key:r,start:a.slice(),end:q(a,o)})}return n}(this.target,this.data),this._isReversed&&(this.setEndValues(),this.swapValues()),this.values.length>0&&(this.values[0].sStart=this.values[0].start)}},{key:"onBaseStart",value:function(){this.onStart()}},{key:"onBaseUpdate",value:function(t,e){for(var n=this.easing(e),i=0,r=this.values.length;i<r;i++){var a=this.values[i],o=a.key;if(x(a.start))this.target[o]=a.start*(1-n)+a.end*n;else for(var u=0,s=a.end.length;u<s;u++){var l=a.start[u],h=a.end[u];this.target[o][u]=l*(1-n)+h*n}}this.onUpdate(this.target,e)}},{key:"onBaseRepeat",value:function(t,e){this.setEndValues(),this.onRepeat(e)}},{key:"onBaseDirection",value:function(t,e){if(this.yoyo){var n=this.values[0].start,i=this.values[0].sStart;n===i&&!e||n!==i&&e||(this.easing=e?this.yoyoEase:this.ease,this.swapValues())}}},{key:"onBaseComplete",value:function(){this.setEndValues(),this.onComplete()}},{key:"swapValues",value:function(){for(var t=0,e=this.values.length;t<e;t++){var n=this.values[t],i=n.start;n.start=n.end,n.end=i}}},{key:"setEndValues",value:function(){for(var t=0,e=this.values.length;t<e;t++){var n=this.values[t],i=n.key;this.target[i]=n.end}}},{key:"kill",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.protected&&!t||(this.yoyo=null,this.ease=null,this.yoyoEase=null,this.easing=null,this.onStart=null,this.onUpdate=null,this.onRepeat=null,this.onComplete=null,p(u(n.prototype),"kill",this).call(this))}}]),n}(O),P={killTweensOf:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=0;n<this.tweens.length;n++){var i=this.tweens[n];i.target===t&&i.kill(e)}},killAll:function(){for(var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.tweens.length-1;e>=0;e--){var n=this.tweens[e];n.kill(t)}}},_=function(){},U=function(t){o(n,t);var e=f(n);function n(){var t,r,a,o,u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i(this,n),u.duration=0,(o=e.call(this,u)).onStart=null!==(t=null==u?void 0:u.onStart)&&void 0!==t?t:_,o.onUpdate=null!==(r=null==u?void 0:u.onUpdate)&&void 0!==r?r:_,o.onComplete=null!==(a=null==u?void 0:u.onComplete)&&void 0!==a?a:_,o.tweens=[],o.groups=new Map,o.activeGroup=0,o.baseStart.add(h(o)),o.baseUpdate.add(h(o)),o.baseComplete.add(h(o)),o}return a(n,[{key:"to",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:j(),i=new E(t,e);return this.addTween(i,n),i}},{key:"from",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:j(),i=new E(t,e);return i._isReversed=!0,this.addTween(i,n),i}},{key:"fromTo",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;for(var i in e)t[i]=e[i];var r=new E(t,n);return r.prepare(),this.tweens.push(r),r}},{key:"seek",value:function(){}},{key:"restart",value:function(){}},{key:"createGroup",value:function(t){this.groups.set(t,{duration:0,tweens:[]})}},{key:"addTween",value:function(t,e){var n=this;this.groups.has(e)||this.createGroup(e);var i=this.groups.get(e);i.duration=Math.max(i.duration,t.totalDuration),i.tweens.push(t),this.getKeyIndex(e)===this.activeGroup?(this.duration=Math.max(this.duration,i.duration),this.progressDuration=this.duration+this.delay,t.prepare(),this.tweens.push(t)):t.active=!1,this.totalDuration=0,this.groups.forEach((function(t){n.totalDuration+=t.duration}))}},{key:"getKeyIndex",value:function(t){var e,n=0,i=function(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=d(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return o=t.done,t},e:function(t){u=!0,a=t},f:function(){try{o||null==n.return||n.return()}finally{if(u)throw a}}}}(this.groups.keys());try{for(i.s();!(e=i.n()).done;){if(e.value===t)break;n++}}catch(t){i.e(t)}finally{i.f()}return n}},{key:"onBaseStart",value:function(){this.onStart()}},{key:"onBaseUpdate",value:function(t,e,n){for(var i=0,r=this.tweens.length;i<r;i++){this.tweens[i].tick(n)}this.onUpdate(this.activeGroup,e)}},{key:"setActiveGroup",value:function(){var t=Array.from(this.groups)[this.activeGroup][1];this.active=!0,this.cancelling=!1,this.time=0,this.duration=t.duration,this.delay=0,this.progressDuration=this.duration,this.tweens=t.tweens;for(var e=0;e<this.tweens.length;e++){var n=this.tweens[e];n.prepare(),n.active=!0}}},{key:"onBaseComplete",value:function(){this.activeGroup++,this.activeGroup>=this.groups.size?this.onComplete():this.setActiveGroup()}},{key:"kill",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!this.protected||e){var i=0;this.groups&&(this.groups.forEach((function(e){var n=e.tweens;if(i!==t.activeGroup){i++;for(var r=0;r<n.length;r++){var a=n[r];a.destroy(),a=null}n=[]}})),this.killAll(!0),this.groups=null),p(u(n.prototype),"kill",this).call(this)}}}]),n}(O);Object.assign(U.prototype,P);var A=function(){function t(){i(this,t),this.tweens=[]}return a(t,[{key:"to",value:function(t,e){var n=new E(t,e);return n.prepare(),this.tweens.push(n),n}},{key:"from",value:function(t,e){var n=new E(t,e);return n._isReversed=!0,n.prepare(),this.tweens.push(n),n}},{key:"fromTo",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;for(var i in e)t[i]=e[i];var r=new E(t,n);return r.prepare(),this.tweens.push(r),r}},{key:"timeline",value:function(t,e){var n=new U(t,e);return this.tweens.push(n),n}},{key:"delay",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,n={duration:e||m.duration,delay:0},i=new O(n);return this.tweens.push(i),"function"==typeof t?(i.onBaseComplete=t,i.baseComplete.add(i),i):new Promise((function(t){i.onBaseComplete=t,i.baseComplete.add(i)}))}},{key:"tick",value:function(t){for(var e=0;e<this.tweens.length;e++){this.tweens[e].tick(t)}for(var n=this.tweens.length-1;n>=0;n--){var i=this.tweens[n];i.cancelling&&(this.tweens.splice(n,1),i.destroy(),i=null)}}}]),t}();Object.assign(A.prototype,P);var B=new A;B.defaults=m,t.Easing=k,t.anim=B,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=anim.js.map
