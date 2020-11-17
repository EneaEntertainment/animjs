/*!
*
* AnimJS (@enea-entertainment/animjs)
*
* @version  : 0.1.1
* @author   : Enea Entertainment
* @homepage : http://www.enea.sk/
* @license  : MIT
*
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).anim={})}(this,(function(t){"use strict";function e(t){this.wrapped=t}function n(t){var n,i;function r(n,i){try{var u=t[n](i),o=u.value,s=o instanceof e;Promise.resolve(s?o.wrapped:o).then((function(t){s?r("return"===n?"return":"next",t):a(u.done?"return":"normal",t)}),(function(t){r("throw",t)}))}catch(t){a("throw",t)}}function a(t,e){switch(t){case"return":n.resolve({value:e,done:!0});break;case"throw":n.reject(e);break;default:n.resolve({value:e,done:!1})}(n=n.next)?r(n.key,n.arg):i=null}this._invoke=function(t,e){return new Promise((function(a,u){var o={key:t,arg:e,resolve:a,reject:u,next:null};i?i=i.next=o:(n=i=o,r(t,e))}))},"function"!=typeof t.return&&(this.return=void 0)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function a(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}function o(t){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function c(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function h(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?c(t):e}function f(t){var e=l();return function(){var n,i=o(t);if(e){var r=o(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return h(this,n)}}function p(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=o(t)););return t}function v(t,e,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var i=p(t,e);if(i){var r=Object.getOwnPropertyDescriptor(i,e);return r.get?r.get.call(n):r.value}})(t,e,n||t)}function d(t,e){if(t){if("string"==typeof t)return y(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(t,e):void 0}}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}"function"==typeof Symbol&&Symbol.asyncIterator&&(n.prototype[Symbol.asyncIterator]=function(){return this}),n.prototype.next=function(t){return this._invoke("next",t)},n.prototype.throw=function(t){return this._invoke("throw",t)},n.prototype.return=function(t){return this._invoke("return",t)};var k=Math.PI/2,b=function(){function t(){i(this,t)}return a(t,null,[{key:"linear",value:function(t){return t}},{key:"backIn",value:function(t){var e=1.70158;return t*t*((e+1)*t-e)}},{key:"backOut",value:function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1}},{key:"backInOut",value:function(t){var e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}},{key:"bounceIn",value:function(e){return 1-t.bounceOut(1-e)}},{key:"bounceOut",value:function(t){var e=t*t;return t<4/11?7.5625*e:t<8/11?9.075*e-9.9*t+3.4:t<.9?4356/361*e-35442/1805*t+16061/1805:10.8*t*t-20.52*t+10.72}},{key:"bounceInOut",value:function(e){return e<.5?.5*(1-t.bounceOut(1-2*e)):.5*t.bounceOut(2*e-1)+.5}},{key:"circIn",value:function(t){return 1-Math.sqrt(1-t*t)}},{key:"circOut",value:function(t){return Math.sqrt(1- --t*t)}},{key:"circInOut",value:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},{key:"cubicIn",value:function(t){return t*t*t}},{key:"cubicOut",value:function(t){var e=t-1;return e*e*e+1}},{key:"cubicInOut",value:function(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}},{key:"elasticIn",value:function(t){return Math.sin(13*t*k)*Math.pow(2,10*(t-1))}},{key:"elasticOut",value:function(t){return Math.sin(-13*(t+1)*k)*Math.pow(2,-10*t)+1}},{key:"elasticInOut",value:function(t){return t<.5?.5*Math.sin(13*k*2*t)*Math.pow(2,10*(2*t-1)):.5*Math.sin(-13*k*(2*t-1+1))*Math.pow(2,-10*(2*t-1))+1}},{key:"expoIn",value:function(t){return 0===t?t:Math.pow(2,10*(t-1))}},{key:"expoOut",value:function(t){return 1===t?t:1-Math.pow(2,-10*t)}},{key:"expoInOut",value:function(t){return 0===t||1===t?t:t<.5?.5*Math.pow(2,20*t-10):-.5*Math.pow(2,10-20*t)+1}},{key:"quadIn",value:function(t){return t*t}},{key:"quadOut",value:function(t){return-t*(t-2)}},{key:"quadInOut",value:function(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)}},{key:"quartIn",value:function(t){return Math.pow(t,4)}},{key:"quartOut",value:function(t){return Math.pow(t-1,3)*(1-t)+1}},{key:"quartInOut",value:function(t){return t<.5?8*Math.pow(t,4):-8*Math.pow(t-1,4)+1}},{key:"quintIn",value:function(t){return t*t*t*t*t}},{key:"quintOut",value:function(t){return--t*t*t*t*t+1}},{key:"quintInOut",value:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},{key:"sineIn",value:function(t){var e=Math.cos(t*Math.PI*.5);return Math.abs(e)<1e-14?1:1-e}},{key:"sineOut",value:function(t){return Math.sin(t*k)}},{key:"sineInOut",value:function(t){return-.5*(Math.cos(Math.PI*t)-1)}}]),t}();function g(t){if("string"==typeof t||t instanceof String){if(b.hasOwnProperty(t))return b[t];var e=function(t,e){for(var n=(e=(e=e.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),i=0,r=n.length;i<r;++i){var a=n[i];if(!(a in t))return null;t=t[a]}return t}(b,t);if("function"==typeof e)return e;throw"Unknown easing: ".concat(t)}return t}b.none=b.linear,b.back={in:b.backIn,out:b.backOut,inOut:b.backInOut},b.bounce={in:b.bounceIn,out:b.bounceOut,inOut:b.bounceInOut},b.circ={in:b.circIn,out:b.circOut,inOut:b.circInOut},b.cubic={in:b.cubicIn,out:b.cubicOut,inOut:b.cubicInOut},b.elastic={in:b.elasticIn,out:b.elasticOut,inOut:b.elasticInOut},b.expo={in:b.expoIn,out:b.expoOut,inOut:b.expoInOut},b.quad={in:b.quadIn,out:b.quadOut,inOut:b.quadInOut},b.quart={in:b.quartIn,out:b.quartOut,inOut:b.quartInOut},b.quint={in:b.quintIn,out:b.quintOut,inOut:b.quintInOut},b.sine={in:b.sineIn,out:b.sineOut,inOut:b.sineInOut};var w=function(){function t(e){i(this,t),this.name=e,this.items=[]}return a(t,[{key:"dispatch",value:function(t,e,n){for(var i=0;i<this.items.length;i++)this.items[i][this.name](t,e,n)}},{key:"add",value:function(t,e){t[this.name]&&(this.detach(t),void 0===e?this.items.push(t):this.items.splice(e,0,t))}},{key:"detach",value:function(t){var e=this.items.indexOf(t);-1!==e&&this.items.splice(e,1)}},{key:"detachAll",value:function(){this.items.length=0}},{key:"destroy",value:function(){this.detachAll(),this.name=null,this.items=null}}]),t}(),m={delay:0,duration:1,yoyo:!1,repeat:0,repeatDelay:0,paused:!1,protected:!1,ease:"none"},O=function(){function t(e){var n,r,a,u,o,s;i(this,t),this.active=!0,this.cancelling=!1,this.paused=null!==(n=null==e?void 0:e.paused)&&void 0!==n?n:m.paused,this.protected=null!==(r=null==e?void 0:e.protected)&&void 0!==r?r:m.protected,this.started=!1,this.time=0,this._isReversed=!1,this.delay=null!==(a=null==e?void 0:e.delay)&&void 0!==a?a:m.delay,this.duration=null!==(u=null==e?void 0:e.duration)&&void 0!==u?u:m.duration,this.repeat=null!==(o=null==e?void 0:e.repeat)&&void 0!==o?o:m.repeat,this.repeatDelay=null!==(s=null==e?void 0:e.repeatDelay)&&void 0!==s?s:m.repeatDelay,this.repeat<0&&(this.repeat=1e10),this.progressDuration=this.duration+this.delay,this.totalDuration=this.duration*(this.repeat+1)+this.repeat*this.repeatDelay+this.delay,this.baseStart=new w("onBaseStart"),this.baseUpdate=new w("onBaseUpdate"),this.baseRepeat=new w("onBaseRepeat"),this.baseComplete=new w("onBaseComplete")}return a(t,[{key:"tick",value:function(t){if(this.active&&!this.paused&&!this.cancelling){this.time+=t;var e=this.time-this.delay,n=e/this.duration;e>0&&(this.started||(this.started=!0,this.baseStart.dispatch(this)),n<0?n=0:n>1&&(n=1),this.baseUpdate.dispatch(this,n,t)),this.time>=this.progressDuration&&(this.repeat>0?(this.repeat--,this.baseRepeat.dispatch(this),this.time-=this.duration+this.repeatDelay):(this.active=!1,this.cancelling=!0,this.baseComplete.dispatch(this)))}}},{key:"seek",value:function(t){this.time=Math.max(0,Math.min(t,this.progressDuration));var e=Math.max(0,this.time-this.delay)/this.duration;this.baseUpdate.dispatch(this,e,0)}},{key:"kill",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.protected&&!t||(this.cancelling=!0)}},{key:"destroy",value:function(){this.active=null,this.cancelling=null,this.paused=null,this.protected=null,this.started=null,this.time=null,this._isReversed=null,this.delay=null,this.duration=null,this.repeat=null,this.repeatDelay=null,this.progressDuration=null,this.totalDuration=null,this.baseStart.destroy(),this.baseStart=null,this.baseUpdate.destroy(),this.baseUpdate=null,this.baseRepeat.destroy(),this.baseRepeat=null,this.baseComplete.destroy(),this.baseComplete=null}}]),t}(),I=Object.prototype.propertyIsEnumerable,M=S(new O);function S(t){var e=Object.getOwnPropertyNames(t);return Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(t))),e.filter((function(e){return I.call(t,e)}))}function x(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,e="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",i=n.length,r=0;r<t;r++)e+=n.charAt(Math.floor(Math.random()*i));return e}var q=function(){},R=function(t){u(n,t);var e=f(n);function n(t){var r,a,u,o,s,l,h,f,p=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return i(this,n),(f=e.call(this,p)).target=t,f.data=p,f.values=void 0,f.yoyo=null!==(r=null==p?void 0:p.yoyo)&&void 0!==r?r:m.yoyo,f.ease=g(null!==(a=null==p?void 0:p.ease)&&void 0!==a?a:m.ease),f.yoyoEase=g(null!==(u=null==p?void 0:p.yoyoEase)&&void 0!==u?u:f.ease),f.easing=f.ease,f.onStart=null!==(o=null==p?void 0:p.onStart)&&void 0!==o?o:q,f.onUpdate=null!==(s=null==p?void 0:p.onUpdate)&&void 0!==s?s:q,f.onRepeat=null!==(l=null==p?void 0:p.onRepeat)&&void 0!==l?l:q,f.onComplete=null!==(h=null==p?void 0:p.onComplete)&&void 0!==h?h:q,f.baseStart.add(c(f)),f.baseUpdate.add(c(f)),f.baseRepeat.add(c(f)),f.baseComplete.add(c(f)),f}return a(n,[{key:"prepare",value:function(){this.values=function(t,e){var n=[],i=S(e);for(var r in e)if(i.indexOf(r)>=0&&r in t&&-1===M.indexOf(r)){var a=t[r],u=e[r];n.push({key:r,start:a,end:u})}return n}(this.target,this.data),this._isReversed&&(this.setEndValues(),this.swapValues())}},{key:"onBaseStart",value:function(){this.onStart()}},{key:"onBaseUpdate",value:function(t,e){for(var n=this.easing(e),i=0,r=this.values.length;i<r;i++){var a=this.values[i],u=a.key;this.target[u]=a.start*(1-n)+a.end*n}this.onUpdate(e,n)}},{key:"onBaseRepeat",value:function(){this.setEndValues(),this.onRepeat(),this.easing=this.repeat%2==0?this.yoyoEase:this.ease,this.swapValues()}},{key:"onBaseComplete",value:function(){this.setEndValues(),this.onComplete()}},{key:"swapValues",value:function(){for(var t=0,e=this.values.length;t<e;t++){var n=this.values[t],i=n.start;n.start=n.end,n.end=i}}},{key:"setEndValues",value:function(){for(var t=0,e=this.values.length;t<e;t++){var n=this.values[t],i=n.key;this.target[i]=n.end}}},{key:"kill",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.protected&&!t||(this.yoyo=null,this.ease=null,this.yoyoEase=null,this.easing=null,this.onStart=null,this.onUpdate=null,this.onRepeat=null,this.onComplete=null,v(o(n.prototype),"kill",this).call(this))}}]),n}(O),j={killTweensOf:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=0;n<this.tweens.length;n++){var i=this.tweens[n];i.target===t&&i.kill(e)}},killAll:function(){for(var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.tweens.length-1;e>=0;e--){var n=this.tweens[e];n.kill(t)}}},C=function(){},D=function(t){u(n,t);var e=f(n);function n(){var t,r,a,u,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i(this,n),o.duration=0,(u=e.call(this,o)).onStart=null!==(t=null==o?void 0:o.onStart)&&void 0!==t?t:C,u.onUpdate=null!==(r=null==o?void 0:o.onUpdate)&&void 0!==r?r:C,u.onComplete=null!==(a=null==o?void 0:o.onComplete)&&void 0!==a?a:C,u.tweens=[],u.groups=new Map,u.activeGroup=0,u.baseStart.add(c(u)),u.baseUpdate.add(c(u)),u.baseComplete.add(c(u)),u}return a(n,[{key:"to",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:x(),i=new R(t,e);return this.addTween(i,n),i}},{key:"from",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:x(),i=new R(t,e);return i._isReversed=!0,this.addTween(i,n),i}},{key:"fromTo",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;for(var i in e)t[i]=e[i];var r=new R(t,n);return r.prepare(),this.tweens.push(r),r}},{key:"createGroup",value:function(t){this.groups.set(t,{duration:0,tweens:[]})}},{key:"addTween",value:function(t,e){var n=this;this.groups.has(e)||this.createGroup(e);var i=this.groups.get(e);i.duration=Math.max(i.duration,t.totalDuration),i.tweens.push(t),this.getKeyIndex(e)===this.activeGroup?(this.duration=Math.max(this.duration,i.duration),this.progressDuration=this.duration+this.delay,t.prepare(),this.tweens.push(t)):t.active=!1,this.totalDuration=0,this.groups.forEach((function(t){n.totalDuration+=t.duration}))}},{key:"getKeyIndex",value:function(t){var e,n=0,i=function(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=d(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,o=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return u=t.done,t},e:function(t){o=!0,a=t},f:function(){try{u||null==n.return||n.return()}finally{if(o)throw a}}}}(this.groups.keys());try{for(i.s();!(e=i.n()).done;){if(e.value===t)break;n++}}catch(t){i.e(t)}finally{i.f()}return n}},{key:"onBaseStart",value:function(){this.onStart()}},{key:"onBaseUpdate",value:function(t,e,n){for(var i=0,r=this.tweens.length;i<r;i++){this.tweens[i].tick(n)}this.onUpdate(e)}},{key:"setActiveGroup",value:function(){var t=Array.from(this.groups)[this.activeGroup][1];this.active=!0,this.cancelling=!1,this.time=0,this.duration=t.duration,this.delay=0,this.progressDuration=this.duration,this.tweens=t.tweens;for(var e=0;e<this.tweens.length;e++){var n=this.tweens[e];n.prepare(),n.active=!0}}},{key:"onBaseComplete",value:function(){this.activeGroup++,this.activeGroup>=this.groups.size?this.onComplete():this.setActiveGroup()}},{key:"kill",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!this.protected||e){var i=0;this.groups&&(this.groups.forEach((function(e){var n=e.tweens;if(i!==t.activeGroup){i++;for(var r=0;r<n.length;r++){var a=n[r];a.destroy(),a=null}n=[]}})),this.killAll(!0),this.groups=null),v(o(n.prototype),"kill",this).call(this)}}}]),n}(O);Object.assign(D.prototype,j);var P=function(){function t(){i(this,t),this.tweens=[]}return a(t,[{key:"to",value:function(t,e){var n=new R(t,e);return n.prepare(),this.tweens.push(n),n}},{key:"from",value:function(t,e){var n=new R(t,e);return n._isReversed=!0,n.prepare(),this.tweens.push(n),n}},{key:"fromTo",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;for(var i in e)t[i]=e[i];var r=new R(t,n);return r.prepare(),this.tweens.push(r),r}},{key:"timeline",value:function(t,e){var n=new D(t,e);return this.tweens.push(n),n}},{key:"delay",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t,n={duration:e||m.duration,delay:0},i=new O(n);return this.tweens.push(i),"function"==typeof t?(i.onBaseComplete=t,i.baseComplete.add(i),i):new Promise((function(t){i.onBaseComplete=t,i.baseComplete.add(i)}))}},{key:"tick",value:function(t){for(var e=0;e<this.tweens.length;e++){this.tweens[e].tick(t)}for(var n=this.tweens.length-1;n>=0;n--){var i=this.tweens[n];i.cancelling&&(this.tweens.splice(n,1),i.destroy(),i=null)}}}]),t}();Object.assign(P.prototype,j);var U=new P;U.defaults=m,t.Easing=b,t.anim=U,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=anim.js.map
