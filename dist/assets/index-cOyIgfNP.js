(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Qu=[];function eh(r,e,t,n){Qu.push({klass:r,typeName:e,serializer:t,deserializer:n})}eh(Map,"Map",r=>{let e=[];for(let[t,n]of r.entries())e.push([Xr(t),Xr(n)]);return e},r=>{const e=new Map;for(let[t,n]of r)e.set(Yr(t),Yr(n));return e});eh(Set,"Set",r=>{let e=[];for(let t of r.values())e.push(Xr(t));return e},r=>{const e=new Set;for(let t of r)e.add(Yr(t));return console.log(e),e});function Xr(r){if(typeof r=="number"||typeof r=="string"||typeof r=="boolean"||r===null)return r;if(r===void 0)return{__type:"undefined"};if(Array.isArray(r))return r.map(Xr);if(typeof r=="object"){for(let t of Qu)if(r instanceof t.klass)return{__type:t.typeName,data:t.serializer(r)};const e={};for(let t of Object.keys(r))e[t]=Xr(r[t]);return e}else throw new Error("Failed to serialize unknown type.")}function Yr(r){if(typeof r=="number"||typeof r=="string"||typeof r=="boolean"||r===null)return r;if(Array.isArray(r))return r.map(Yr);if(typeof r=="object")if(r.__type){if(r.__type==="undefined")return;for(let e of Qu)if(r.__type===e.typeName)return e.deserializer(r.data)}else{const e={};for(let t of Object.keys(r))e[t]=Yr(r[t]);return e}else throw new Error("Failed to deserialize unknown type.")}function Xm(r){const e={};for(let t of Object.keys(r))e[t]=Xr(r[t]);return e}function Ym(r,e){for(const[t,n]of Object.entries(r))e[t]=Yr(r[t])}class mv{serialize(){return Xm(this)}deserialize(e){Ym(e,this)}}class gv{predictNext(){return this}serialize(){return Xm(this)}deserialize(e){Ym(e,this)}}class Xo{constructor(e,t,n){Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"isLocal",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"isHost",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.id=e,this.isLocal=t,this.isHost=n}isLocalPlayer(){return this.isLocal}isRemotePlayer(){return!this.isLocal}isServer(){return this.isHost}isClient(){return!this.isHost}getID(){return this.id}}function Fi(r,e){let t=r.get(e);if(t!==void 0)return t;throw new Error(`Key ${String(e)} not in Map ${r.toString()}`)}function fi(r){return JSON.parse(JSON.stringify(r))}function Vl(r){let e=r.shift();if(e!==void 0)return e;throw new Error(`Shift returned undefined from Array ${r.toString()}`)}class Pn{constructor(e=0,t=0){Object.defineProperty(this,"x",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"y",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.x=e,this.y=t}multiplyScalar(e){return new Pn(this.x*e,this.y*e)}add(e){return new Pn(this.x+e.x,this.y+e.y)}subtract(e){return new Pn(this.x-e.x,this.y-e.y)}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){const e=this.length();return e===0?new Pn(0,0):new Pn(this.x/e,this.y/e)}}eh(Pn,"netplayjs.Vec2",r=>[r.x,r.y],r=>new Pn(r[0],r[1]));class Ca extends gv{constructor(){super(...arguments),Object.defineProperty(this,"keysPressed",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"keysHeld",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"keysReleased",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"mouseButtons",{enumerable:!0,configurable:!0,writable:!0,value:new Set}),Object.defineProperty(this,"mousePosition",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"touches",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"gamepads",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"touchControls",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}arrowKeys(){return new Pn((this.keysHeld.ArrowLeft?-1:0)+(this.keysHeld.ArrowRight?1:0),(this.keysHeld.ArrowDown?-1:0)+(this.keysHeld.ArrowUp?1:0))}wasd(){return new Pn((this.keysHeld.a?-1:0)+(this.keysHeld.d?1:0),(this.keysHeld.s?-1:0)+(this.keysHeld.w?1:0))}}class _v{getCanvasScale(){const e=this.canvas.getBoundingClientRect();return{x:this.canvasSize.width/e.width,y:this.canvasSize.height/e.height}}projectClientPosition(e,t){const n=this.canvas.getBoundingClientRect(),i=this.getCanvasScale();return{x:(e-n.left)*i.x,y:(t-n.top)*i.y}}constructor(e=document.body,t,n,i=!1,s=!1,o={}){Object.defineProperty(this,"canvas",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"canvasSize",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"keysPressed",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"keysHeld",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"keysReleased",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"mouseButtonsHeld",{enumerable:!0,configurable:!0,writable:!0,value:new Set}),Object.defineProperty(this,"mousePosition",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"mouseDelta",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"touches",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"touchControls",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"previousGamepadState",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.canvas=t,this.canvasSize=n,this.touchControls=o,e.addEventListener("keydown",a=>{a.repeat||(this.keysHeld[a.key]=!0,this.keysPressed[a.key]=!0)},!1),e.addEventListener("keyup",a=>{this.keysHeld[a.key]=!1,this.keysReleased[a.key]=!0},!1),t.addEventListener("mouseenter",a=>this.updateMousePosition(a),!1),t.addEventListener("mousemove",a=>this.updateMousePosition(a),!1),t.addEventListener("mouseleave",a=>{this.mousePosition=null},!1),t.addEventListener("touchstart",a=>this.updateTouches(a),!1),t.addEventListener("touchmove",a=>this.updateTouches(a),!1),t.addEventListener("touchend",a=>this.updateTouches(a),!1),t.addEventListener("mousedown",a=>{this.mouseButtonsHeld.add(a.button),i&&t.requestPointerLock()}),window.addEventListener("mouseup",a=>{this.mouseButtonsHeld.delete(a.button)}),t.addEventListener("contextmenu",a=>{s&&a.preventDefault()})}updateMousePosition(e){if(document.pointerLockElement===this.canvas)if(!this.mousePosition)this.mousePosition=this.projectClientPosition(e.clientX,e.clientY);else{const t=this.getCanvasScale();this.mousePosition.x+=e.movementX*t.x,this.mousePosition.y+=e.movementY*t.y}else this.mousePosition=this.projectClientPosition(e.clientX,e.clientY)}updateTouches(e){this.touches.length=e.targetTouches.length;for(let t=0;t<e.targetTouches.length;++t)this.touches[t]=this.projectClientPosition(e.targetTouches[t].clientX,e.targetTouches[t].clientY)}getInput(){let e=new Ca;for(let t in this.keysPressed)this.keysPressed[t]&&(e.keysPressed[t]=!0,e.keysHeld[t]=!0);for(let t in this.keysHeld)this.keysHeld[t]&&(e.keysHeld[t]=!0);for(let t in this.keysReleased)this.keysReleased[t]&&(e.keysReleased[t]=!0);this.mousePosition&&(e.mousePosition=fi(this.mousePosition)),e.touches=fi(this.touches),e.mouseButtons=new Set(this.mouseButtonsHeld);for(let[t,n]of Object.entries(this.touchControls))e.touchControls=e.touchControls||{},e.touchControls[t]=fi(n.getValue());return navigator.getGamepads&&navigator.getGamepads().forEach((t,n)=>{if(!t)return null;const i=this.previousGamepadState.get(n)||{buttons:t.buttons.map(()=>!1)},s=t.buttons.map((o,a)=>{const l=o.pressed,c=!i.buttons[a]&&l,u=i.buttons[a]&&!l;return{held:l,pressed:c,released:u}});e.gamepads.push({axes:fi(t.axes),buttons:s}),this.previousGamepadState.set(n,{buttons:t.buttons.map(o=>o.pressed)})}),this.keysPressed={},this.keysReleased={},e}}var Kr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Km(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Zm={exports:{}};(function(r){(function(e,t){r.exports?r.exports=t():e.log=t()})(Kr,function(){var e=function(){},t="undefined",n=typeof window!==t&&typeof window.navigator!==t&&/Trident\/|MSIE /.test(window.navigator.userAgent),i=["trace","debug","info","warn","error"];function s(m,p){var y=m[p];if(typeof y.bind=="function")return y.bind(m);try{return Function.prototype.bind.call(y,m)}catch{return function(){return Function.prototype.apply.apply(y,[m,arguments])}}}function o(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function a(m){return m==="debug"&&(m="log"),typeof console===t?!1:m==="trace"&&n?o:console[m]!==void 0?s(console,m):console.log!==void 0?s(console,"log"):e}function l(m,p){for(var y=0;y<i.length;y++){var w=i[y];this[w]=y<m?e:this.methodFactory(w,m,p)}this.log=this.debug}function c(m,p,y){return function(){typeof console!==t&&(l.call(this,p,y),this[m].apply(this,arguments))}}function u(m,p,y){return a(m)||c.apply(this,arguments)}function h(m,p,y){var w=this,v,x="loglevel";typeof m=="string"?x+=":"+m:typeof m=="symbol"&&(x=void 0);function b(_){var C=(i[_]||"silent").toUpperCase();if(!(typeof window===t||!x)){try{window.localStorage[x]=C;return}catch{}try{window.document.cookie=encodeURIComponent(x)+"="+C+";"}catch{}}}function M(){var _;if(!(typeof window===t||!x)){try{_=window.localStorage[x]}catch{}if(typeof _===t)try{var C=window.document.cookie,E=C.indexOf(encodeURIComponent(x)+"=");E!==-1&&(_=/^([^;]+)/.exec(C.slice(E))[1])}catch{}return w.levels[_]===void 0&&(_=void 0),_}}w.name=m,w.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},w.methodFactory=y||u,w.getLevel=function(){return v},w.setLevel=function(_,C){if(typeof _=="string"&&w.levels[_.toUpperCase()]!==void 0&&(_=w.levels[_.toUpperCase()]),typeof _=="number"&&_>=0&&_<=w.levels.SILENT){if(v=_,C!==!1&&b(_),l.call(w,_,m),typeof console===t&&_<w.levels.SILENT)return"No console available for logging"}else throw"log.setLevel() called with invalid level: "+_},w.setDefaultLevel=function(_){M()||w.setLevel(_,!1)},w.enableAll=function(_){w.setLevel(w.levels.TRACE,_)},w.disableAll=function(_){w.setLevel(w.levels.SILENT,_)};var T=M();T==null&&(T=p??"WARN"),w.setLevel(T,!1)}var f=new h,d={};f.getLogger=function(p){if(typeof p!="symbol"&&typeof p!="string"||p==="")throw new TypeError("You must supply a name when creating a logger.");var y=d[p];return y||(y=d[p]=new h(p,f.getLevel(),f.methodFactory)),y};var g=typeof window!==t?window.log:void 0;return f.noConflict=function(){return typeof window!==t&&window.log===f&&(window.log=g),f},f.getLoggers=function(){return d},f.default=f,f})})(Zm);var mi=Zm.exports,Gl={};/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 *//*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */function Jm(){var r=[].slice.call(arguments);function e(t,n){Object.keys(n).forEach(function(i){~r.indexOf(i)||(t[i]=n[i])})}return function(){for(var n=[].slice.call(arguments),i=0,s={};i<n.length;i++)e(s,n[i]);return s}}/*!
 * Primary Exports
 */var Qm=Zi;function Zi(r,e,t){var n=Jm("name","message","stack","constructor","toJSON"),i=n(e||{});this.message=r||"Unspecified AssertionError",this.showDiff=!1;for(var s in i)this[s]=i[s];if(t=t||Zi,Error.captureStackTrace)Error.captureStackTrace(this,t);else try{throw new Error}catch(o){this.stack=o.stack}}/*!
 * Inherit from Error.prototype
 */Zi.prototype=Object.create(Error.prototype);/*!
 * Statically set name
 */Zi.prototype.name="AssertionError";/*!
 * Ensure correct constructor
 */Zi.prototype.constructor=Zi;Zi.prototype.toJSON=function(r){var e=Jm("constructor","toJSON","stack"),t=e({name:this.name},this);return r!==!1&&this.stack&&(t.stack=this.stack),t};var Ze={};function eg(r,e){return typeof r>"u"||r===null?!1:e in Object(r)}function yv(r){var e=r.replace(/([^\\])\[/g,"$1.["),t=e.match(/(\\\.|[^.]+?)+/g);return t.map(function(i){if(i==="constructor"||i==="__proto__"||i==="prototype")return{};var s=/^\[(\d+)\]$/,o=s.exec(i),a=null;return o?a={i:parseFloat(o[1])}:a={p:i.replace(/\\([.[\]])/g,"$1")},a})}function yf(r,e,t){var n=r,i=null;t=typeof t>"u"?e.length:t;for(var s=0;s<t;s++){var o=e[s];n&&(typeof o.p>"u"?n=n[o.i]:n=n[o.p],s===t-1&&(i=n))}return i}function vv(r,e){var t=yv(e),n=t[t.length-1],i={parent:t.length>1?yf(r,t,t.length-1):r,name:n.p||n.i,value:yf(r,t)};return i.exists=eg(i.parent,i.name),i}var xv={hasProperty:eg,getPathInfo:vv};/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Tn=function(e,t,n){var i=e.__flags||(e.__flags=Object.create(null));if(arguments.length===3)i[t]=n;else return i[t]};/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *//*!
 * Module dependencies
 */var bv=Tn,wv=function(e,t){var n=bv(e,"negate"),i=t[0];return n?!i:i},tg={exports:{}};(function(r,e){(function(t,n){r.exports=n()})(Kr,function(){var t=typeof Promise=="function",n=typeof self=="object"?self:Kr,i=typeof Symbol<"u",s=typeof Map<"u",o=typeof Set<"u",a=typeof WeakMap<"u",l=typeof WeakSet<"u",c=typeof DataView<"u",u=i&&typeof Symbol.iterator<"u",h=i&&typeof Symbol.toStringTag<"u",f=o&&typeof Set.prototype.entries=="function",d=s&&typeof Map.prototype.entries=="function",g=f&&Object.getPrototypeOf(new Set().entries()),m=d&&Object.getPrototypeOf(new Map().entries()),p=u&&typeof Array.prototype[Symbol.iterator]=="function",y=p&&Object.getPrototypeOf([][Symbol.iterator]()),w=u&&typeof String.prototype[Symbol.iterator]=="function",v=w&&Object.getPrototypeOf(""[Symbol.iterator]()),x=8,b=-1;function M(T){var _=typeof T;if(_!=="object")return _;if(T===null)return"null";if(T===n)return"global";if(Array.isArray(T)&&(h===!1||!(Symbol.toStringTag in T)))return"Array";if(typeof window=="object"&&window!==null){if(typeof window.location=="object"&&T===window.location)return"Location";if(typeof window.document=="object"&&T===window.document)return"Document";if(typeof window.navigator=="object"){if(typeof window.navigator.mimeTypes=="object"&&T===window.navigator.mimeTypes)return"MimeTypeArray";if(typeof window.navigator.plugins=="object"&&T===window.navigator.plugins)return"PluginArray"}if((typeof window.HTMLElement=="function"||typeof window.HTMLElement=="object")&&T instanceof window.HTMLElement){if(T.tagName==="BLOCKQUOTE")return"HTMLQuoteElement";if(T.tagName==="TD")return"HTMLTableDataCellElement";if(T.tagName==="TH")return"HTMLTableHeaderCellElement"}}var C=h&&T[Symbol.toStringTag];if(typeof C=="string")return C;var E=Object.getPrototypeOf(T);return E===RegExp.prototype?"RegExp":E===Date.prototype?"Date":t&&E===Promise.prototype?"Promise":o&&E===Set.prototype?"Set":s&&E===Map.prototype?"Map":l&&E===WeakSet.prototype?"WeakSet":a&&E===WeakMap.prototype?"WeakMap":c&&E===DataView.prototype?"DataView":s&&E===m?"Map Iterator":o&&E===g?"Set Iterator":p&&E===y?"Array Iterator":w&&E===v?"String Iterator":E===null?"Object":Object.prototype.toString.call(T).slice(x,b)}return M})})(tg);var nl=tg.exports;/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Sv=Qm,Wl=Tn,Mv=nl,Ev=function(e,t){var n=Wl(e,"message"),i=Wl(e,"ssfi");n=n?n+": ":"",e=Wl(e,"object"),t=t.map(function(a){return a.toLowerCase()}),t.sort();var s=t.map(function(a,l){var c=~["a","e","i","o","u"].indexOf(a.charAt(0))?"an":"a",u=t.length>1&&l===t.length-1?"or ":"";return u+c+" "+a}).join(", "),o=Mv(e).toLowerCase();if(!t.some(function(a){return o===a}))throw new Sv(n+"object tested must be "+s+", but "+o+" given",void 0,i)};/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var ng=function(e,t){return t.length>4?t[4]:e._obj},pu={exports:{}},Tv=Function.prototype.toString,Cv=/\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;function Av(r){if(typeof r!="function")return null;var e="";if(typeof Function.prototype.name>"u"&&typeof r.name>"u"){var t=Tv.call(r).match(Cv);t&&(e=t[1])}else e=r.name;return e}var ig=Av;/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var rg=function(e){var t=Object.getOwnPropertyNames(e);function n(s){t.indexOf(s)===-1&&t.push(s)}for(var i=Object.getPrototypeOf(e);i!==null;)Object.getOwnPropertyNames(i).forEach(n),i=Object.getPrototypeOf(i);return t};/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Iv=function(e){var t=[];for(var n in e)t.push(n);return t},_s={includeStack:!1,showDiff:!0,truncateThreshold:40,useProxy:!0,proxyExcludedKeys:["then","catch","inspect","toJSON"]};(function(r,e){var t=ig,n=rg,i=Iv,s=_s;r.exports=o;function o(b,M,T,_){var C={showHidden:M,seen:[],stylize:function(E){return E}};return l(C,b,typeof T>"u"?2:T)}var a=function(b){return typeof HTMLElement=="object"?b instanceof HTMLElement:b&&typeof b=="object"&&"nodeType"in b&&b.nodeType===1&&typeof b.nodeName=="string"};function l(b,M,T){if(M&&typeof M.inspect=="function"&&M.inspect!==e.inspect&&!(M.constructor&&M.constructor.prototype===M)){var _=M.inspect(T,b);return typeof _!="string"&&(_=l(b,_,T)),_}var C=c(b,M);if(C)return C;if(a(M)){if("outerHTML"in M)return M.outerHTML;try{if(document.xmlVersion){var E=new XMLSerializer;return E.serializeToString(M)}else{var D="http://www.w3.org/1999/xhtml",z=document.createElementNS(D,"_");z.appendChild(M.cloneNode(!1));var N=z.innerHTML.replace("><",">"+M.innerHTML+"<");return z.innerHTML="",N}}catch{}}var F=i(M),H=b.showHidden?n(M):F,Y,J;if(H.length===0||v(M)&&(H.length===1&&H[0]==="stack"||H.length===2&&H[0]==="description"&&H[1]==="stack")){if(typeof M=="function")return Y=t(M),J=Y?": "+Y:"",b.stylize("[Function"+J+"]","special");if(y(M))return b.stylize(RegExp.prototype.toString.call(M),"regexp");if(w(M))return b.stylize(Date.prototype.toUTCString.call(M),"date");if(v(M))return u(M)}var S="",P=!1,k=!1,R=["{","}"];if(m(M)&&(k=!0,R=["[","]"]),p(M)&&(P=!0,R=["[","]"]),typeof M=="function"&&(Y=t(M),J=Y?": "+Y:"",S=" [Function"+J+"]"),y(M)&&(S=" "+RegExp.prototype.toString.call(M)),w(M)&&(S=" "+Date.prototype.toUTCString.call(M)),v(M))return u(M);if(H.length===0&&(!P||M.length==0))return R[0]+S+R[1];if(T<0)return y(M)?b.stylize(RegExp.prototype.toString.call(M),"regexp"):b.stylize("[Object]","special");b.seen.push(M);var O;if(P)O=h(b,M,T,F,H);else{if(k)return f(M);O=H.map(function(j){return d(b,M,T,F,j,P)})}return b.seen.pop(),g(O,S,R)}function c(b,M){switch(typeof M){case"undefined":return b.stylize("undefined","undefined");case"string":var T="'"+JSON.stringify(M).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return b.stylize(T,"string");case"number":return M===0&&1/M===-1/0?b.stylize("-0","number"):b.stylize(""+M,"number");case"boolean":return b.stylize(""+M,"boolean");case"symbol":return b.stylize(M.toString(),"symbol")}if(M===null)return b.stylize("null","null")}function u(b){return"["+Error.prototype.toString.call(b)+"]"}function h(b,M,T,_,C){for(var E=[],D=0,z=M.length;D<z;++D)Object.prototype.hasOwnProperty.call(M,String(D))?E.push(d(b,M,T,_,String(D),!0)):E.push("");return C.forEach(function(N){N.match(/^\d+$/)||E.push(d(b,M,T,_,N,!0))}),E}function f(b){for(var M="[ ",T=0;T<b.length;++T){if(M.length>=s.truncateThreshold-7){M+="...";break}M+=b[T]+", "}return M+=" ]",M.indexOf(",  ]")!==-1&&(M=M.replace(",  ]"," ]")),M}function d(b,M,T,_,C,E){var D,z=Object.getOwnPropertyDescriptor(M,C),N;if(z&&(z.get?z.set?N=b.stylize("[Getter/Setter]","special"):N=b.stylize("[Getter]","special"):z.set&&(N=b.stylize("[Setter]","special"))),_.indexOf(C)<0&&(D="["+C+"]"),N||(b.seen.indexOf(M[C])<0?(T===null?N=l(b,M[C],null):N=l(b,M[C],T-1),N.indexOf(`
`)>-1&&(E?N=N.split(`
`).map(function(F){return"  "+F}).join(`
`).substr(2):N=`
`+N.split(`
`).map(function(F){return"   "+F}).join(`
`))):N=b.stylize("[Circular]","special")),typeof D>"u"){if(E&&C.match(/^\d+$/))return N;D=JSON.stringify(""+C),D.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(D=D.substr(1,D.length-2),D=b.stylize(D,"name")):(D=D.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),D=b.stylize(D,"string"))}return D+": "+N}function g(b,M,T){var _=b.reduce(function(C,E){return C+E.length+1},0);return _>60?T[0]+(M===""?"":M+`
 `)+" "+b.join(`,
  `)+" "+T[1]:T[0]+M+" "+b.join(", ")+" "+T[1]}function m(b){return typeof b=="object"&&/\w+Array]$/.test(x(b))}function p(b){return Array.isArray(b)||typeof b=="object"&&x(b)==="[object Array]"}function y(b){return typeof b=="object"&&x(b)==="[object RegExp]"}function w(b){return typeof b=="object"&&x(b)==="[object Date]"}function v(b){return typeof b=="object"&&x(b)==="[object Error]"}function x(b){return Object.prototype.toString.call(b)}})(pu,pu.exports);var th=pu.exports;/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *//*!
 * Module dependencies
 */var Pv=th,vf=_s,sg=function(e){var t=Pv(e),n=Object.prototype.toString.call(e);if(vf.truncateThreshold&&t.length>=vf.truncateThreshold){if(n==="[object Function]")return!e.name||e.name===""?"[Function]":"[Function: "+e.name+"]";if(n==="[object Array]")return"[ Array("+e.length+") ]";if(n==="[object Object]"){var i=Object.keys(e),s=i.length>2?i.splice(0,2).join(", ")+", ...":i.join(", ");return"{ Object ("+s+") }"}else return t}else return t};/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *//*!
 * Module dependencies
 */var jl=Tn,Rv=ng,ql=sg,Dv=function(e,t){var n=jl(e,"negate"),i=jl(e,"object"),s=t[3],o=Rv(e,t),a=n?t[2]:t[1],l=jl(e,"message");return typeof a=="function"&&(a=a()),a=a||"",a=a.replace(/#\{this\}/g,function(){return ql(i)}).replace(/#\{act\}/g,function(){return ql(o)}).replace(/#\{exp\}/g,function(){return ql(s)}),l?l+": "+a:a};/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var fr=function(e,t,n){var i=e.__flags||(e.__flags=Object.create(null));t.__flags||(t.__flags=Object.create(null)),n=arguments.length===3?n:!0;for(var s in i)(n||s!=="object"&&s!=="ssfi"&&s!=="lockSsfi"&&s!="message")&&(t.__flags[s]=i[s])},nh={exports:{}};/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var xf=nl;function og(){this._key="chai/deep-eql__"+Math.random()+Date.now()}og.prototype={get:function(e){return e[this._key]},set:function(e,t){Object.isExtensible(e)&&Object.defineProperty(e,this._key,{value:t,configurable:!0})}};var ih=typeof WeakMap=="function"?WeakMap:og;/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/function bf(r,e,t){if(!t||Zr(r)||Zr(e))return null;var n=t.get(r);if(n){var i=n.get(e);if(typeof i=="boolean")return i}return null}/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/function Yo(r,e,t,n){if(!(!t||Zr(r)||Zr(e))){var i=t.get(r);i?i.set(e,n):(i=new ih,i.set(e,n),t.set(r,i))}}/*!
 * Primary Export
 */nh.exports=il;nh.exports.MemoizeMap=ih;function il(r,e,t){if(t&&t.comparator)return wf(r,e,t);var n=ag(r,e);return n!==null?n:wf(r,e,t)}function ag(r,e){return r===e?r!==0||1/r===1/e:r!==r&&e!==e?!0:Zr(r)||Zr(e)?!1:null}/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/function wf(r,e,t){t=t||{},t.memoize=t.memoize===!1?!1:t.memoize||new ih;var n=t&&t.comparator,i=bf(r,e,t.memoize);if(i!==null)return i;var s=bf(e,r,t.memoize);if(s!==null)return s;if(n){var o=n(r,e);if(o===!1||o===!0)return Yo(r,e,t.memoize,o),o;var a=ag(r,e);if(a!==null)return a}var l=xf(r);if(l!==xf(e))return Yo(r,e,t.memoize,!1),!1;Yo(r,e,t.memoize,!0);var c=Lv(r,e,l,t);return Yo(r,e,t.memoize,c),c}function Lv(r,e,t,n){switch(t){case"String":case"Number":case"Boolean":case"Date":return il(r.valueOf(),e.valueOf());case"Promise":case"Symbol":case"function":case"WeakMap":case"WeakSet":case"Error":return r===e;case"Arguments":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"Array":return $i(r,e,n);case"RegExp":return Nv(r,e);case"Generator":return Ov(r,e,n);case"DataView":return $i(new Uint8Array(r.buffer),new Uint8Array(e.buffer),n);case"ArrayBuffer":return $i(new Uint8Array(r),new Uint8Array(e),n);case"Set":return Sf(r,e,n);case"Map":return Sf(r,e,n);default:return Uv(r,e,n)}}/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */function Nv(r,e){return r.toString()===e.toString()}/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function Sf(r,e,t){if(r.size!==e.size)return!1;if(r.size===0)return!0;var n=[],i=[];return r.forEach(function(o,a){n.push([o,a])}),e.forEach(function(o,a){i.push([o,a])}),$i(n.sort(),i.sort(),t)}/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function $i(r,e,t){var n=r.length;if(n!==e.length)return!1;if(n===0)return!0;for(var i=-1;++i<n;)if(il(r[i],e[i],t)===!1)return!1;return!0}/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function Ov(r,e,t){return $i(mu(r),mu(e),t)}/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */function Fv(r){return typeof Symbol<"u"&&typeof r=="object"&&typeof Symbol.iterator<"u"&&typeof r[Symbol.iterator]=="function"}/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */function Mf(r){if(Fv(r))try{return mu(r[Symbol.iterator]())}catch{return[]}return[]}/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */function mu(r){for(var e=r.next(),t=[e.value];e.done===!1;)e=r.next(),t.push(e.value);return t}/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */function Ef(r){var e=[];for(var t in r)e.push(t);return e}/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function kv(r,e,t,n){var i=t.length;if(i===0)return!0;for(var s=0;s<i;s+=1)if(il(r[t[s]],e[t[s]],n)===!1)return!1;return!0}/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function Uv(r,e,t){var n=Ef(r),i=Ef(e);if(n.length&&n.length===i.length)return n.sort(),i.sort(),$i(n,i)===!1?!1:kv(r,e,n,t);var s=Mf(r),o=Mf(e);return s.length&&s.length===o.length?(s.sort(),o.sort(),$i(s,o,t)):n.length===0&&s.length===0&&i.length===0&&o.length===0}/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */function Zr(r){return r===null||typeof r!="object"}var Bv=nh.exports,zv=_s;/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var rl=function(){return zv.useProxy&&typeof Proxy<"u"&&typeof Reflect<"u"};/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var $l,Tf;function Hv(){if(Tf)return $l;Tf=1;var r=dr(),e=Tn,t=rl,n=fr;return $l=function(s,o,a){a=a===void 0?function(){}:a,Object.defineProperty(s,o,{get:function l(){!t()&&!e(this,"lockSsfi")&&e(this,"ssfi",l);var c=a.call(this);if(c!==void 0)return c;var u=new r.Assertion;return n(this,u),u},configurable:!0})},$l}var Vv=Object.getOwnPropertyDescriptor(function(){},"length");/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var sl=function(e,t,n){return Vv.configurable&&Object.defineProperty(e,"length",{get:function(){throw Error(n?"Invalid Chai property: "+t+'.length. Due to a compatibility issue, "length" cannot directly follow "'+t+'". Use "'+t+'.lengthOf" instead.':"Invalid Chai property: "+t+'.length. See docs for proper usage of "'+t+'".')}}),e},Gv=_s,Cf=Tn,Wv=rg,jv=rl;/*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Af=["__flags","__methods","_obj","assert"],ol=function(e,t){return jv()?new Proxy(e,{get:function n(i,s){if(typeof s=="string"&&Gv.proxyExcludedKeys.indexOf(s)===-1&&!Reflect.has(i,s)){if(t)throw Error("Invalid Chai property: "+t+"."+s+'. See docs for proper usage of "'+t+'".');var o=null,a=4;throw Wv(i).forEach(function(l){if(!Object.prototype.hasOwnProperty(l)&&Af.indexOf(l)===-1){var c=qv(s,l,a);c<a&&(o=l,a=c)}}),Error(o!==null?"Invalid Chai property: "+s+'. Did you mean "'+o+'"?':"Invalid Chai property: "+s)}return Af.indexOf(s)===-1&&!Cf(i,"lockSsfi")&&Cf(i,"ssfi",n),Reflect.get(i,s)}}):e};function qv(r,e,t){if(Math.abs(r.length-e.length)>=t)return t;for(var n=[],i=0;i<=r.length;i++)n[i]=Array(e.length+1).fill(0),n[i][0]=i;for(var s=0;s<e.length;s++)n[0][s]=s;for(var i=1;i<=r.length;i++)for(var o=r.charCodeAt(i-1),s=1;s<=e.length;s++){if(Math.abs(i-s)>=t){n[i][s]=t;continue}n[i][s]=Math.min(n[i-1][s]+1,n[i][s-1]+1,n[i-1][s-1]+(o===e.charCodeAt(s-1)?0:1))}return n[r.length][e.length]}/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Xl,If;function $v(){if(If)return Xl;If=1;var r=sl,e=dr(),t=Tn,n=ol,i=fr;return Xl=function(o,a,l){var c=function(){t(this,"lockSsfi")||t(this,"ssfi",c);var u=l.apply(this,arguments);if(u!==void 0)return u;var h=new e.Assertion;return i(this,h),h};r(c,a,!1),o[a]=n(c,a)},Xl}/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Yl,Pf;function Xv(){if(Pf)return Yl;Pf=1;var r=dr(),e=Tn,t=rl,n=fr;return Yl=function(s,o,a){var l=Object.getOwnPropertyDescriptor(s,o),c=function(){};l&&typeof l.get=="function"&&(c=l.get),Object.defineProperty(s,o,{get:function u(){!t()&&!e(this,"lockSsfi")&&e(this,"ssfi",u);var h=e(this,"lockSsfi");e(this,"lockSsfi",!0);var f=a(c).call(this);if(e(this,"lockSsfi",h),f!==void 0)return f;var d=new r.Assertion;return n(this,d),d},configurable:!0})},Yl}/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Kl,Rf;function Yv(){if(Rf)return Kl;Rf=1;var r=sl,e=dr(),t=Tn,n=ol,i=fr;return Kl=function(o,a,l){var c=o[a],u=function(){throw new Error(a+" is not a function")};c&&typeof c=="function"&&(u=c);var h=function(){t(this,"lockSsfi")||t(this,"ssfi",h);var f=t(this,"lockSsfi");t(this,"lockSsfi",!0);var d=l(u).apply(this,arguments);if(t(this,"lockSsfi",f),d!==void 0)return d;var g=new e.Assertion;return i(this,g),g};r(h,a,!1),o[a]=n(h,a)},Kl}/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Zl,Df;function Kv(){if(Df)return Zl;Df=1;/*!
 * Module dependencies
 */var r=sl,e=dr(),t=Tn,n=ol,i=fr;/*!
 * Module variables
 */var s=typeof Object.setPrototypeOf=="function",o=function(){},a=Object.getOwnPropertyNames(o).filter(function(u){var h=Object.getOwnPropertyDescriptor(o,u);return typeof h!="object"?!0:!h.configurable}),l=Function.prototype.call,c=Function.prototype.apply;return Zl=function(h,f,d,g){typeof g!="function"&&(g=function(){});var m={method:d,chainingBehavior:g};h.__methods||(h.__methods={}),h.__methods[f]=m,Object.defineProperty(h,f,{get:function(){m.chainingBehavior.call(this);var y=function(){t(this,"lockSsfi")||t(this,"ssfi",y);var x=m.method.apply(this,arguments);if(x!==void 0)return x;var b=new e.Assertion;return i(this,b),b};if(r(y,f,!0),s){var w=Object.create(this);w.call=l,w.apply=c,Object.setPrototypeOf(y,w)}else{var v=Object.getOwnPropertyNames(h);v.forEach(function(x){if(a.indexOf(x)===-1){var b=Object.getOwnPropertyDescriptor(h,x);Object.defineProperty(y,x,b)}})}return i(this,y),n(y)},configurable:!0})},Zl}/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Jl,Lf;function Zv(){if(Lf)return Jl;Lf=1;var r=dr(),e=fr;return Jl=function(n,i,s,o){var a=n.__methods[i],l=a.chainingBehavior;a.chainingBehavior=function(){var h=o(l).call(this);if(h!==void 0)return h;var f=new r.Assertion;return e(this,f),f};var c=a.method;a.method=function(){var h=s(c).apply(this,arguments);if(h!==void 0)return h;var f=new r.Assertion;return e(this,f),f}},Jl}/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *//*!
 * Module dependencies
 */var Nf=th,Jv=function(e,t){return Nf(e)<Nf(t)?-1:1};/*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var lg=function(e){return typeof Object.getOwnPropertySymbols!="function"?[]:Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})};/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 *//*!
 * Module dependencies
 */var Qv=lg,ex=function(e){return Object.keys(e).concat(Qv(e))};function tx(r,e){return e instanceof Error&&r===e}function nx(r,e){return e instanceof Error?r.constructor===e.constructor||r instanceof e.constructor:e.prototype instanceof Error||e===Error?r.constructor===e||r instanceof e:!1}function ix(r,e){var t=typeof r=="string"?r:r.message;return e instanceof RegExp?e.test(t):typeof e=="string"?t.indexOf(e)!==-1:!1}var rx=/\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;function Ql(r){var e="";if(typeof r.name>"u"){var t=String(r).match(rx);t&&(e=t[1])}else e=r.name;return e}function sx(r){var e=r;return r instanceof Error?e=Ql(r.constructor):typeof r=="function"&&(e=Ql(r).trim()||Ql(new r)),e}function ox(r){var e="";return r&&r.message?e=r.message:typeof r=="string"&&(e=r),e}var ax={compatibleInstance:tx,compatibleConstructor:nx,compatibleMessage:ix,getMessage:ox,getConstructorName:sx};/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */function lx(r){return r!==r}var cx=Number.isNaN||lx,ux=nl,Of=Tn;function hx(r){var e=ux(r),t=["Array","Object","function"];return t.indexOf(e)!==-1}var fx=function(e,t){var n=Of(e,"operator"),i=Of(e,"negate"),s=t[3],o=i?t[2]:t[1];if(n)return n;if(typeof o=="function"&&(o=o()),o=o||"",!!o&&!/\shave\s/.test(o)){var a=hx(s);return/\snot\s/.test(o)?a?"notDeepStrictEqual":"notStrictEqual":a?"deepStrictEqual":"strictEqual"}};/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var Ff;function dx(){if(Ff)return Ze;Ff=1;/*!
 * Dependencies that are used for multiple exports are required here only once
 */var r=xv;/*!
 * test utility
 */Ze.test=wv;/*!
 * type utility
 */Ze.type=nl;/*!
 * expectTypes utility
 */Ze.expectTypes=Ev;/*!
 * message utility
 */Ze.getMessage=Dv;/*!
 * actual utility
 */Ze.getActual=ng;/*!
 * Inspect util
 */Ze.inspect=th;/*!
 * Object Display util
 */Ze.objDisplay=sg;/*!
 * Flag utility
 */Ze.flag=Tn;/*!
 * Flag transferring utility
 */Ze.transferFlags=fr;/*!
 * Deep equal utility
 */Ze.eql=Bv;/*!
 * Deep path info
 */Ze.getPathInfo=r.getPathInfo;/*!
 * Check if a property exists
 */Ze.hasProperty=r.hasProperty;/*!
 * Function name
 */Ze.getName=ig;/*!
 * add Property
 */Ze.addProperty=Hv();/*!
 * add Method
 */Ze.addMethod=$v();/*!
 * overwrite Property
 */Ze.overwriteProperty=Xv();/*!
 * overwrite Method
 */Ze.overwriteMethod=Yv();/*!
 * Add a chainable method
 */Ze.addChainableMethod=Kv();/*!
 * Overwrite chainable method
 */Ze.overwriteChainableMethod=Zv();/*!
 * Compare by inspect method
 */Ze.compareByInspect=Jv;/*!
 * Get own enumerable property symbols method
 */Ze.getOwnEnumerablePropertySymbols=lg;/*!
 * Get own enumerable properties method
 */Ze.getOwnEnumerableProperties=ex;/*!
 * Checks error against a given set of criteria
 */Ze.checkError=ax;/*!
 * Proxify util
 */Ze.proxify=ol;/*!
 * addLengthGuard util
 */Ze.addLengthGuard=sl;/*!
 * isProxyEnabled helper
 */Ze.isProxyEnabled=rl;/*!
 * isNaN method
 */Ze.isNaN=cx;/*!
 * getOperator method
 */return Ze.getOperator=fx,Ze}/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var yr=_s,px=function(r,e){/*!
 * Module dependencies.
 */var t=r.AssertionError,n=e.flag;/*!
 * Module export.
 */r.Assertion=i;/*!
 * Assertion Constructor
 *
 * Creates object for chaining.
 *
 * `Assertion` objects contain metadata in the form of flags. Three flags can
 * be assigned during instantiation by passing arguments to this constructor:
 *
 * - `object`: This flag contains the target of the assertion. For example, in
 *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
 *   contain `numKittens` so that the `equal` assertion can reference it when
 *   needed.
 *
 * - `message`: This flag contains an optional custom error message to be
 *   prepended to the error message that's generated by the assertion when it
 *   fails.
 *
 * - `ssfi`: This flag stands for "start stack function indicator". It
 *   contains a function reference that serves as the starting point for
 *   removing frames from the stack trace of the error that's created by the
 *   assertion when it fails. The goal is to provide a cleaner stack trace to
 *   end users by removing Chai's internal functions. Note that it only works
 *   in environments that support `Error.captureStackTrace`, and only when
 *   `Chai.config.includeStack` hasn't been set to `false`.
 *
 * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
 *   should retain its current value, even as assertions are chained off of
 *   this object. This is usually set to `true` when creating a new assertion
 *   from within another assertion. It's also temporarily set to `true` before
 *   an overwritten assertion gets called by the overwriting assertion.
 *
 * @param {Mixed} obj target of the assertion
 * @param {String} msg (optional) custom error message
 * @param {Function} ssfi (optional) starting point for removing stack frames
 * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
 * @api private
 */function i(s,o,a,l){return n(this,"ssfi",a||i),n(this,"lockSsfi",l),n(this,"object",s),n(this,"message",o),e.proxify(this)}Object.defineProperty(i,"includeStack",{get:function(){return console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),yr.includeStack},set:function(s){console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),yr.includeStack=s}}),Object.defineProperty(i,"showDiff",{get:function(){return console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),yr.showDiff},set:function(s){console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),yr.showDiff=s}}),i.addProperty=function(s,o){e.addProperty(this.prototype,s,o)},i.addMethod=function(s,o){e.addMethod(this.prototype,s,o)},i.addChainableMethod=function(s,o,a){e.addChainableMethod(this.prototype,s,o,a)},i.overwriteProperty=function(s,o){e.overwriteProperty(this.prototype,s,o)},i.overwriteMethod=function(s,o){e.overwriteMethod(this.prototype,s,o)},i.overwriteChainableMethod=function(s,o,a){e.overwriteChainableMethod(this.prototype,s,o,a)},i.prototype.assert=function(s,o,a,l,c,u){var h=e.test(this,arguments);if(u!==!1&&(u=!0),l===void 0&&c===void 0&&(u=!1),yr.showDiff!==!0&&(u=!1),!h){o=e.getMessage(this,arguments);var f=e.getActual(this,arguments),d={actual:f,expected:l,showDiff:u},g=e.getOperator(this,arguments);throw g&&(d.operator=g),new t(o,d,yr.includeStack?this.assert:n(this,"ssfi"))}};/*!
 * ### ._obj
 *
 * Quick reference to stored `actual` value for plugin developers.
 *
 * @api private
 */Object.defineProperty(i.prototype,"_obj",{get:function(){return n(this,"object")},set:function(s){n(this,"object",s)}})};/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var mx=function(r,e){var t=r.Assertion,n=r.AssertionError,i=e.flag;["to","be","been","is","and","has","have","with","that","which","at","of","same","but","does","still"].forEach(function(S){t.addProperty(S)}),t.addProperty("not",function(){i(this,"negate",!0)}),t.addProperty("deep",function(){i(this,"deep",!0)}),t.addProperty("nested",function(){i(this,"nested",!0)}),t.addProperty("own",function(){i(this,"own",!0)}),t.addProperty("ordered",function(){i(this,"ordered",!0)}),t.addProperty("any",function(){i(this,"any",!0),i(this,"all",!1)}),t.addProperty("all",function(){i(this,"all",!0),i(this,"any",!1)});function s(S,P){P&&i(this,"message",P),S=S.toLowerCase();var k=i(this,"object"),R=~["a","e","i","o","u"].indexOf(S.charAt(0))?"an ":"a ";this.assert(S===e.type(k).toLowerCase(),"expected #{this} to be "+R+S,"expected #{this} not to be "+R+S)}t.addChainableMethod("an",s),t.addChainableMethod("a",s);function o(S,P){return e.isNaN(S)&&e.isNaN(P)||S===P}function a(){i(this,"contains",!0)}function l(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=e.type(k).toLowerCase(),O=i(this,"message"),j=i(this,"negate"),G=i(this,"ssfi"),B=i(this,"deep"),W=B?"deep ":"";O=O?O+": ":"";var ae=!1;switch(R){case"string":ae=k.indexOf(S)!==-1;break;case"weakset":if(B)throw new n(O+"unable to use .deep.include with WeakSet",void 0,G);ae=k.has(S);break;case"map":var le=B?e.eql:o;k.forEach(function(q){ae=ae||le(q,S)});break;case"set":B?k.forEach(function(q){ae=ae||e.eql(q,S)}):ae=k.has(S);break;case"array":B?ae=k.some(function(q){return e.eql(q,S)}):ae=k.indexOf(S)!==-1;break;default:if(S!==Object(S))throw new n(O+"the given combination of arguments ("+R+" and "+e.type(S).toLowerCase()+") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a "+e.type(S).toLowerCase(),void 0,G);var se=Object.keys(S),Z=null,ne=0;if(se.forEach(function(q){var K=new t(k);if(e.transferFlags(this,K,!0),i(K,"lockSsfi",!0),!j||se.length===1){K.property(q,S[q]);return}try{K.property(q,S[q])}catch(oe){if(!e.checkError.compatibleConstructor(oe,n))throw oe;Z===null&&(Z=oe),ne++}},this),j&&se.length>1&&ne===se.length)throw Z;return}this.assert(ae,"expected #{this} to "+W+"include "+e.inspect(S),"expected #{this} to not "+W+"include "+e.inspect(S))}t.addChainableMethod("include",l,a),t.addChainableMethod("contain",l,a),t.addChainableMethod("contains",l,a),t.addChainableMethod("includes",l,a),t.addProperty("ok",function(){this.assert(i(this,"object"),"expected #{this} to be truthy","expected #{this} to be falsy")}),t.addProperty("true",function(){this.assert(i(this,"object")===!0,"expected #{this} to be true","expected #{this} to be false",!i(this,"negate"))}),t.addProperty("false",function(){this.assert(i(this,"object")===!1,"expected #{this} to be false","expected #{this} to be true",!!i(this,"negate"))}),t.addProperty("null",function(){this.assert(i(this,"object")===null,"expected #{this} to be null","expected #{this} not to be null")}),t.addProperty("undefined",function(){this.assert(i(this,"object")===void 0,"expected #{this} to be undefined","expected #{this} not to be undefined")}),t.addProperty("NaN",function(){this.assert(e.isNaN(i(this,"object")),"expected #{this} to be NaN","expected #{this} not to be NaN")}),t.addProperty("exist",function(){var S=i(this,"object");this.assert(S!=null,"expected #{this} to exist","expected #{this} to not exist")}),t.addProperty("empty",function(){var S=i(this,"object"),P=i(this,"ssfi"),k=i(this,"message"),R;switch(k=k?k+": ":"",e.type(S).toLowerCase()){case"array":case"string":R=S.length;break;case"map":case"set":R=S.size;break;case"weakmap":case"weakset":throw new n(k+".empty was passed a weak collection",void 0,P);case"function":var O=k+".empty was passed a function "+e.getName(S);throw new n(O.trim(),void 0,P);default:if(S!==Object(S))throw new n(k+".empty was passed non-string primitive "+e.inspect(S),void 0,P);R=Object.keys(S).length}this.assert(R===0,"expected #{this} to be empty","expected #{this} not to be empty")});function c(){var S=i(this,"object"),P=e.type(S);this.assert(P==="Arguments","expected #{this} to be arguments but got "+P,"expected #{this} to not be arguments")}t.addProperty("arguments",c),t.addProperty("Arguments",c);function u(S,P){P&&i(this,"message",P);var k=i(this,"object");if(i(this,"deep")){var R=i(this,"lockSsfi");i(this,"lockSsfi",!0),this.eql(S),i(this,"lockSsfi",R)}else this.assert(S===k,"expected #{this} to equal #{exp}","expected #{this} to not equal #{exp}",S,this._obj,!0)}t.addMethod("equal",u),t.addMethod("equals",u),t.addMethod("eq",u);function h(S,P){P&&i(this,"message",P),this.assert(e.eql(S,i(this,"object")),"expected #{this} to deeply equal #{exp}","expected #{this} to not deeply equal #{exp}",S,this._obj,!0)}t.addMethod("eql",h),t.addMethod("eqls",h);function f(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=i(this,"doLength"),O=i(this,"message"),j=O?O+": ":"",G=i(this,"ssfi"),B=e.type(k).toLowerCase(),W=e.type(S).toLowerCase(),ae,le=!0;if(R&&B!=="map"&&B!=="set"&&new t(k,O,G,!0).to.have.property("length"),!R&&B==="date"&&W!=="date")ae=j+"the argument to above must be a date";else if(W!=="number"&&(R||B==="number"))ae=j+"the argument to above must be a number";else if(!R&&B!=="date"&&B!=="number"){var se=B==="string"?"'"+k+"'":k;ae=j+"expected "+se+" to be a number or a date"}else le=!1;if(le)throw new n(ae,void 0,G);if(R){var Z="length",ne;B==="map"||B==="set"?(Z="size",ne=k.size):ne=k.length,this.assert(ne>S,"expected #{this} to have a "+Z+" above #{exp} but got #{act}","expected #{this} to not have a "+Z+" above #{exp}",S,ne)}else this.assert(k>S,"expected #{this} to be above #{exp}","expected #{this} to be at most #{exp}",S)}t.addMethod("above",f),t.addMethod("gt",f),t.addMethod("greaterThan",f);function d(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=i(this,"doLength"),O=i(this,"message"),j=O?O+": ":"",G=i(this,"ssfi"),B=e.type(k).toLowerCase(),W=e.type(S).toLowerCase(),ae,le=!0;if(R&&B!=="map"&&B!=="set"&&new t(k,O,G,!0).to.have.property("length"),!R&&B==="date"&&W!=="date")ae=j+"the argument to least must be a date";else if(W!=="number"&&(R||B==="number"))ae=j+"the argument to least must be a number";else if(!R&&B!=="date"&&B!=="number"){var se=B==="string"?"'"+k+"'":k;ae=j+"expected "+se+" to be a number or a date"}else le=!1;if(le)throw new n(ae,void 0,G);if(R){var Z="length",ne;B==="map"||B==="set"?(Z="size",ne=k.size):ne=k.length,this.assert(ne>=S,"expected #{this} to have a "+Z+" at least #{exp} but got #{act}","expected #{this} to have a "+Z+" below #{exp}",S,ne)}else this.assert(k>=S,"expected #{this} to be at least #{exp}","expected #{this} to be below #{exp}",S)}t.addMethod("least",d),t.addMethod("gte",d);function g(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=i(this,"doLength"),O=i(this,"message"),j=O?O+": ":"",G=i(this,"ssfi"),B=e.type(k).toLowerCase(),W=e.type(S).toLowerCase(),ae,le=!0;if(R&&B!=="map"&&B!=="set"&&new t(k,O,G,!0).to.have.property("length"),!R&&B==="date"&&W!=="date")ae=j+"the argument to below must be a date";else if(W!=="number"&&(R||B==="number"))ae=j+"the argument to below must be a number";else if(!R&&B!=="date"&&B!=="number"){var se=B==="string"?"'"+k+"'":k;ae=j+"expected "+se+" to be a number or a date"}else le=!1;if(le)throw new n(ae,void 0,G);if(R){var Z="length",ne;B==="map"||B==="set"?(Z="size",ne=k.size):ne=k.length,this.assert(ne<S,"expected #{this} to have a "+Z+" below #{exp} but got #{act}","expected #{this} to not have a "+Z+" below #{exp}",S,ne)}else this.assert(k<S,"expected #{this} to be below #{exp}","expected #{this} to be at least #{exp}",S)}t.addMethod("below",g),t.addMethod("lt",g),t.addMethod("lessThan",g);function m(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=i(this,"doLength"),O=i(this,"message"),j=O?O+": ":"",G=i(this,"ssfi"),B=e.type(k).toLowerCase(),W=e.type(S).toLowerCase(),ae,le=!0;if(R&&B!=="map"&&B!=="set"&&new t(k,O,G,!0).to.have.property("length"),!R&&B==="date"&&W!=="date")ae=j+"the argument to most must be a date";else if(W!=="number"&&(R||B==="number"))ae=j+"the argument to most must be a number";else if(!R&&B!=="date"&&B!=="number"){var se=B==="string"?"'"+k+"'":k;ae=j+"expected "+se+" to be a number or a date"}else le=!1;if(le)throw new n(ae,void 0,G);if(R){var Z="length",ne;B==="map"||B==="set"?(Z="size",ne=k.size):ne=k.length,this.assert(ne<=S,"expected #{this} to have a "+Z+" at most #{exp} but got #{act}","expected #{this} to have a "+Z+" above #{exp}",S,ne)}else this.assert(k<=S,"expected #{this} to be at most #{exp}","expected #{this} to be above #{exp}",S)}t.addMethod("most",m),t.addMethod("lte",m),t.addMethod("within",function(S,P,k){k&&i(this,"message",k);var R=i(this,"object"),O=i(this,"doLength"),j=i(this,"message"),G=j?j+": ":"",B=i(this,"ssfi"),W=e.type(R).toLowerCase(),ae=e.type(S).toLowerCase(),le=e.type(P).toLowerCase(),se,Z=!0,ne=ae==="date"&&le==="date"?S.toUTCString()+".."+P.toUTCString():S+".."+P;if(O&&W!=="map"&&W!=="set"&&new t(R,j,B,!0).to.have.property("length"),!O&&W==="date"&&(ae!=="date"||le!=="date"))se=G+"the arguments to within must be dates";else if((ae!=="number"||le!=="number")&&(O||W==="number"))se=G+"the arguments to within must be numbers";else if(!O&&W!=="date"&&W!=="number"){var q=W==="string"?"'"+R+"'":R;se=G+"expected "+q+" to be a number or a date"}else Z=!1;if(Z)throw new n(se,void 0,B);if(O){var K="length",oe;W==="map"||W==="set"?(K="size",oe=R.size):oe=R.length,this.assert(oe>=S&&oe<=P,"expected #{this} to have a "+K+" within "+ne,"expected #{this} to not have a "+K+" within "+ne)}else this.assert(R>=S&&R<=P,"expected #{this} to be within "+ne,"expected #{this} to not be within "+ne)});function p(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=i(this,"ssfi"),O=i(this,"message");try{var j=k instanceof S}catch(B){throw B instanceof TypeError?(O=O?O+": ":"",new n(O+"The instanceof assertion needs a constructor but "+e.type(S)+" was given.",void 0,R)):B}var G=e.getName(S);G===null&&(G="an unnamed constructor"),this.assert(j,"expected #{this} to be an instance of "+G,"expected #{this} to not be an instance of "+G)}t.addMethod("instanceof",p),t.addMethod("instanceOf",p);function y(S,P,k){k&&i(this,"message",k);var R=i(this,"nested"),O=i(this,"own"),j=i(this,"message"),G=i(this,"object"),B=i(this,"ssfi"),W=typeof S;if(j=j?j+": ":"",R){if(W!=="string")throw new n(j+"the argument to property must be a string when using nested syntax",void 0,B)}else if(W!=="string"&&W!=="number"&&W!=="symbol")throw new n(j+"the argument to property must be a string, number, or symbol",void 0,B);if(R&&O)throw new n(j+'The "nested" and "own" flags cannot be combined.',void 0,B);if(G==null)throw new n(j+"Target cannot be null or undefined.",void 0,B);var ae=i(this,"deep"),le=i(this,"negate"),se=R?e.getPathInfo(G,S):null,Z=R?se.value:G[S],ne="";ae&&(ne+="deep "),O&&(ne+="own "),R&&(ne+="nested "),ne+="property ";var q;O?q=Object.prototype.hasOwnProperty.call(G,S):R?q=se.exists:q=e.hasProperty(G,S),(!le||arguments.length===1)&&this.assert(q,"expected #{this} to have "+ne+e.inspect(S),"expected #{this} to not have "+ne+e.inspect(S)),arguments.length>1&&this.assert(q&&(ae?e.eql(P,Z):P===Z),"expected #{this} to have "+ne+e.inspect(S)+" of #{exp}, but got #{act}","expected #{this} to not have "+ne+e.inspect(S)+" of #{act}",P,Z),i(this,"object",Z)}t.addMethod("property",y);function w(S,P,k){i(this,"own",!0),y.apply(this,arguments)}t.addMethod("ownProperty",w),t.addMethod("haveOwnProperty",w);function v(S,P,k){typeof P=="string"&&(k=P,P=null),k&&i(this,"message",k);var R=i(this,"object"),O=Object.getOwnPropertyDescriptor(Object(R),S);O&&P?this.assert(e.eql(P,O),"expected the own property descriptor for "+e.inspect(S)+" on #{this} to match "+e.inspect(P)+", got "+e.inspect(O),"expected the own property descriptor for "+e.inspect(S)+" on #{this} to not match "+e.inspect(P),P,O,!0):this.assert(O,"expected #{this} to have an own property descriptor for "+e.inspect(S),"expected #{this} to not have an own property descriptor for "+e.inspect(S)),i(this,"object",O)}t.addMethod("ownPropertyDescriptor",v),t.addMethod("haveOwnPropertyDescriptor",v);function x(){i(this,"doLength",!0)}function b(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=e.type(k).toLowerCase(),O=i(this,"message"),j=i(this,"ssfi"),G="length",B;switch(R){case"map":case"set":G="size",B=k.size;break;default:new t(k,O,j,!0).to.have.property("length"),B=k.length}this.assert(B==S,"expected #{this} to have a "+G+" of #{exp} but got #{act}","expected #{this} to not have a "+G+" of #{act}",S,B)}t.addChainableMethod("length",b,x),t.addChainableMethod("lengthOf",b,x);function M(S,P){P&&i(this,"message",P);var k=i(this,"object");this.assert(S.exec(k),"expected #{this} to match "+S,"expected #{this} not to match "+S)}t.addMethod("match",M),t.addMethod("matches",M),t.addMethod("string",function(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=i(this,"message"),O=i(this,"ssfi");new t(k,R,O,!0).is.a("string"),this.assert(~k.indexOf(S),"expected #{this} to contain "+e.inspect(S),"expected #{this} to not contain "+e.inspect(S))});function T(S){var P=i(this,"object"),k=e.type(P),R=e.type(S),O=i(this,"ssfi"),j=i(this,"deep"),G,B="",W,ae=!0,le=i(this,"message");le=le?le+": ":"";var se=le+"when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";if(k==="Map"||k==="Set")B=j?"deeply ":"",W=[],P.forEach(function(pe,ce){W.push(ce)}),R!=="Array"&&(S=Array.prototype.slice.call(arguments));else{switch(W=e.getOwnEnumerableProperties(P),R){case"Array":if(arguments.length>1)throw new n(se,void 0,O);break;case"Object":if(arguments.length>1)throw new n(se,void 0,O);S=Object.keys(S);break;default:S=Array.prototype.slice.call(arguments)}S=S.map(function(pe){return typeof pe=="symbol"?pe:String(pe)})}if(!S.length)throw new n(le+"keys required",void 0,O);var Z=S.length,ne=i(this,"any"),q=i(this,"all"),K=S;if(!ne&&!q&&(q=!0),ne&&(ae=K.some(function(pe){return W.some(function(ce){return j?e.eql(pe,ce):pe===ce})})),q&&(ae=K.every(function(pe){return W.some(function(ce){return j?e.eql(pe,ce):pe===ce})}),i(this,"contains")||(ae=ae&&S.length==W.length)),Z>1){S=S.map(function(pe){return e.inspect(pe)});var oe=S.pop();q&&(G=S.join(", ")+", and "+oe),ne&&(G=S.join(", ")+", or "+oe)}else G=e.inspect(S[0]);G=(Z>1?"keys ":"key ")+G,G=(i(this,"contains")?"contain ":"have ")+G,this.assert(ae,"expected #{this} to "+B+G,"expected #{this} to not "+B+G,K.slice(0).sort(e.compareByInspect),W.sort(e.compareByInspect),!0)}t.addMethod("keys",T),t.addMethod("key",T);function _(S,P,k){k&&i(this,"message",k);var R=i(this,"object"),O=i(this,"ssfi"),j=i(this,"message"),G=i(this,"negate")||!1;new t(R,j,O,!0).is.a("function"),(S instanceof RegExp||typeof S=="string")&&(P=S,S=null);var B;try{R()}catch(pe){B=pe}var W=S===void 0&&P===void 0,ae=!!(S&&P),le=!1,se=!1;if(W||!W&&!G){var Z="an error";S instanceof Error?Z="#{exp}":S&&(Z=e.checkError.getConstructorName(S)),this.assert(B,"expected #{this} to throw "+Z,"expected #{this} to not throw an error but #{act} was thrown",S&&S.toString(),B instanceof Error?B.toString():typeof B=="string"?B:B&&e.checkError.getConstructorName(B))}if(S&&B){if(S instanceof Error){var ne=e.checkError.compatibleInstance(B,S);ne===G&&(ae&&G?le=!0:this.assert(G,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(B&&!G?" but #{act} was thrown":""),S.toString(),B.toString()))}var q=e.checkError.compatibleConstructor(B,S);q===G&&(ae&&G?le=!0:this.assert(G,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(B?" but #{act} was thrown":""),S instanceof Error?S.toString():S&&e.checkError.getConstructorName(S),B instanceof Error?B.toString():B&&e.checkError.getConstructorName(B)))}if(B&&P!==void 0&&P!==null){var K="including";P instanceof RegExp&&(K="matching");var oe=e.checkError.compatibleMessage(B,P);oe===G&&(ae&&G?se=!0:this.assert(G,"expected #{this} to throw error "+K+" #{exp} but got #{act}","expected #{this} to throw error not "+K+" #{exp}",P,e.checkError.getMessage(B)))}le&&se&&this.assert(G,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(B?" but #{act} was thrown":""),S instanceof Error?S.toString():S&&e.checkError.getConstructorName(S),B instanceof Error?B.toString():B&&e.checkError.getConstructorName(B)),i(this,"object",B)}t.addMethod("throw",_),t.addMethod("throws",_),t.addMethod("Throw",_);function C(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=i(this,"itself"),O=typeof k=="function"&&!R?k.prototype[S]:k[S];this.assert(typeof O=="function","expected #{this} to respond to "+e.inspect(S),"expected #{this} to not respond to "+e.inspect(S))}t.addMethod("respondTo",C),t.addMethod("respondsTo",C),t.addProperty("itself",function(){i(this,"itself",!0)});function E(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=S(k);this.assert(R,"expected #{this} to satisfy "+e.objDisplay(S),"expected #{this} to not satisfy"+e.objDisplay(S),!i(this,"negate"),R)}t.addMethod("satisfy",E),t.addMethod("satisfies",E);function D(S,P,k){k&&i(this,"message",k);var R=i(this,"object"),O=i(this,"message"),j=i(this,"ssfi");if(new t(R,O,j,!0).is.a("number"),typeof S!="number"||typeof P!="number"){O=O?O+": ":"";var G=P===void 0?", and a delta is required":"";throw new n(O+"the arguments to closeTo or approximately must be numbers"+G,void 0,j)}this.assert(Math.abs(R-S)<=P,"expected #{this} to be close to "+S+" +/- "+P,"expected #{this} not to be close to "+S+" +/- "+P)}t.addMethod("closeTo",D),t.addMethod("approximately",D);function z(S,P,k,R,O){if(!R){if(S.length!==P.length)return!1;P=P.slice()}return S.every(function(j,G){if(O)return k?k(j,P[G]):j===P[G];if(!k){var B=P.indexOf(j);return B===-1?!1:(R||P.splice(B,1),!0)}return P.some(function(W,ae){return k(j,W)?(R||P.splice(ae,1),!0):!1})})}t.addMethod("members",function(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=i(this,"message"),O=i(this,"ssfi");new t(k,R,O,!0).to.be.an("array"),new t(S,R,O,!0).to.be.an("array");var j=i(this,"contains"),G=i(this,"ordered"),B,W,ae;j?(B=G?"an ordered superset":"a superset",W="expected #{this} to be "+B+" of #{exp}",ae="expected #{this} to not be "+B+" of #{exp}"):(B=G?"ordered members":"members",W="expected #{this} to have the same "+B+" as #{exp}",ae="expected #{this} to not have the same "+B+" as #{exp}");var le=i(this,"deep")?e.eql:void 0;this.assert(z(S,k,le,j,G),W,ae,S,k,!0)});function N(S,P){P&&i(this,"message",P);var k=i(this,"object"),R=i(this,"message"),O=i(this,"ssfi"),j=i(this,"contains");new t(S,R,O,!0).to.be.an("array"),j?this.assert(S.some(function(G){return k.indexOf(G)>-1}),"expected #{this} to contain one of #{exp}","expected #{this} to not contain one of #{exp}",S,k):this.assert(S.indexOf(k)>-1,"expected #{this} to be one of #{exp}","expected #{this} to not be one of #{exp}",S,k)}t.addMethod("oneOf",N);function F(S,P,k){k&&i(this,"message",k);var R=i(this,"object"),O=i(this,"message"),j=i(this,"ssfi");new t(R,O,j,!0).is.a("function");var G;P?(new t(S,O,j,!0).to.have.property(P),G=S[P]):(new t(S,O,j,!0).is.a("function"),G=S()),R();var B=P==null?S():S[P],W=P==null?G:"."+P;i(this,"deltaMsgObj",W),i(this,"initialDeltaValue",G),i(this,"finalDeltaValue",B),i(this,"deltaBehavior","change"),i(this,"realDelta",B!==G),this.assert(G!==B,"expected "+W+" to change","expected "+W+" to not change")}t.addMethod("change",F),t.addMethod("changes",F);function H(S,P,k){k&&i(this,"message",k);var R=i(this,"object"),O=i(this,"message"),j=i(this,"ssfi");new t(R,O,j,!0).is.a("function");var G;P?(new t(S,O,j,!0).to.have.property(P),G=S[P]):(new t(S,O,j,!0).is.a("function"),G=S()),new t(G,O,j,!0).is.a("number"),R();var B=P==null?S():S[P],W=P==null?G:"."+P;i(this,"deltaMsgObj",W),i(this,"initialDeltaValue",G),i(this,"finalDeltaValue",B),i(this,"deltaBehavior","increase"),i(this,"realDelta",B-G),this.assert(B-G>0,"expected "+W+" to increase","expected "+W+" to not increase")}t.addMethod("increase",H),t.addMethod("increases",H);function Y(S,P,k){k&&i(this,"message",k);var R=i(this,"object"),O=i(this,"message"),j=i(this,"ssfi");new t(R,O,j,!0).is.a("function");var G;P?(new t(S,O,j,!0).to.have.property(P),G=S[P]):(new t(S,O,j,!0).is.a("function"),G=S()),new t(G,O,j,!0).is.a("number"),R();var B=P==null?S():S[P],W=P==null?G:"."+P;i(this,"deltaMsgObj",W),i(this,"initialDeltaValue",G),i(this,"finalDeltaValue",B),i(this,"deltaBehavior","decrease"),i(this,"realDelta",G-B),this.assert(B-G<0,"expected "+W+" to decrease","expected "+W+" to not decrease")}t.addMethod("decrease",Y),t.addMethod("decreases",Y);function J(S,P){P&&i(this,"message",P);var k=i(this,"deltaMsgObj"),R=i(this,"initialDeltaValue"),O=i(this,"finalDeltaValue"),j=i(this,"deltaBehavior"),G=i(this,"realDelta"),B;j==="change"?B=Math.abs(O-R)===Math.abs(S):B=G===Math.abs(S),this.assert(B,"expected "+k+" to "+j+" by "+S,"expected "+k+" to not "+j+" by "+S)}t.addMethod("by",J),t.addProperty("extensible",function(){var S=i(this,"object"),P=S===Object(S)&&Object.isExtensible(S);this.assert(P,"expected #{this} to be extensible","expected #{this} to not be extensible")}),t.addProperty("sealed",function(){var S=i(this,"object"),P=S===Object(S)?Object.isSealed(S):!0;this.assert(P,"expected #{this} to be sealed","expected #{this} to not be sealed")}),t.addProperty("frozen",function(){var S=i(this,"object"),P=S===Object(S)?Object.isFrozen(S):!0;this.assert(P,"expected #{this} to be frozen","expected #{this} to not be frozen")}),t.addProperty("finite",function(S){var P=i(this,"object");this.assert(typeof P=="number"&&isFinite(P),"expected #{this} to be a finite number","expected #{this} to not be a finite number")})};/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var gx=function(r,e){r.expect=function(t,n){return new r.Assertion(t,n)},r.expect.fail=function(t,n,i,s){throw arguments.length<2&&(i=t,t=void 0),i=i||"expect.fail()",new r.AssertionError(i,{actual:t,expected:n,operator:s},r.expect.fail)}};/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var _x=function(r,e){var t=r.Assertion;function n(){function i(){return this instanceof String||this instanceof Number||this instanceof Boolean||typeof Symbol=="function"&&this instanceof Symbol||typeof BigInt=="function"&&this instanceof BigInt?new t(this.valueOf(),null,i):new t(this,null,i)}function s(a){Object.defineProperty(this,"should",{value:a,enumerable:!0,configurable:!0,writable:!0})}Object.defineProperty(Object.prototype,"should",{set:s,get:i,configurable:!0});var o={};return o.fail=function(a,l,c,u){throw arguments.length<2&&(c=a,a=void 0),c=c||"should.fail()",new r.AssertionError(c,{actual:a,expected:l,operator:u},o.fail)},o.equal=function(a,l,c){new t(a,c).to.equal(l)},o.Throw=function(a,l,c,u){new t(a,u).to.Throw(l,c)},o.exist=function(a,l){new t(a,l).to.exist},o.not={},o.not.equal=function(a,l,c){new t(a,c).to.not.equal(l)},o.not.Throw=function(a,l,c,u){new t(a,u).to.not.Throw(l,c)},o.not.exist=function(a,l){new t(a,l).to.not.exist},o.throw=o.Throw,o.not.throw=o.not.Throw,o}r.should=n,r.Should=n};/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var yx=function(r,e){/*!
 * Chai dependencies.
 */var t=r.Assertion,n=e.flag;/*!
 * Module export.
 */var i=r.assert=function(s,o){var a=new t(null,null,r.assert,!0);a.assert(s,o,"[ negation message unavailable ]")};i.fail=function(s,o,a,l){throw arguments.length<2&&(a=s,s=void 0),a=a||"assert.fail()",new r.AssertionError(a,{actual:s,expected:o,operator:l},i.fail)},i.isOk=function(s,o){new t(s,o,i.isOk,!0).is.ok},i.isNotOk=function(s,o){new t(s,o,i.isNotOk,!0).is.not.ok},i.equal=function(s,o,a){var l=new t(s,a,i.equal,!0);l.assert(o==n(l,"object"),"expected #{this} to equal #{exp}","expected #{this} to not equal #{act}",o,s,!0)},i.notEqual=function(s,o,a){var l=new t(s,a,i.notEqual,!0);l.assert(o!=n(l,"object"),"expected #{this} to not equal #{exp}","expected #{this} to equal #{act}",o,s,!0)},i.strictEqual=function(s,o,a){new t(s,a,i.strictEqual,!0).to.equal(o)},i.notStrictEqual=function(s,o,a){new t(s,a,i.notStrictEqual,!0).to.not.equal(o)},i.deepEqual=i.deepStrictEqual=function(s,o,a){new t(s,a,i.deepEqual,!0).to.eql(o)},i.notDeepEqual=function(s,o,a){new t(s,a,i.notDeepEqual,!0).to.not.eql(o)},i.isAbove=function(s,o,a){new t(s,a,i.isAbove,!0).to.be.above(o)},i.isAtLeast=function(s,o,a){new t(s,a,i.isAtLeast,!0).to.be.least(o)},i.isBelow=function(s,o,a){new t(s,a,i.isBelow,!0).to.be.below(o)},i.isAtMost=function(s,o,a){new t(s,a,i.isAtMost,!0).to.be.most(o)},i.isTrue=function(s,o){new t(s,o,i.isTrue,!0).is.true},i.isNotTrue=function(s,o){new t(s,o,i.isNotTrue,!0).to.not.equal(!0)},i.isFalse=function(s,o){new t(s,o,i.isFalse,!0).is.false},i.isNotFalse=function(s,o){new t(s,o,i.isNotFalse,!0).to.not.equal(!1)},i.isNull=function(s,o){new t(s,o,i.isNull,!0).to.equal(null)},i.isNotNull=function(s,o){new t(s,o,i.isNotNull,!0).to.not.equal(null)},i.isNaN=function(s,o){new t(s,o,i.isNaN,!0).to.be.NaN},i.isNotNaN=function(s,o){new t(s,o,i.isNotNaN,!0).not.to.be.NaN},i.exists=function(s,o){new t(s,o,i.exists,!0).to.exist},i.notExists=function(s,o){new t(s,o,i.notExists,!0).to.not.exist},i.isUndefined=function(s,o){new t(s,o,i.isUndefined,!0).to.equal(void 0)},i.isDefined=function(s,o){new t(s,o,i.isDefined,!0).to.not.equal(void 0)},i.isFunction=function(s,o){new t(s,o,i.isFunction,!0).to.be.a("function")},i.isNotFunction=function(s,o){new t(s,o,i.isNotFunction,!0).to.not.be.a("function")},i.isObject=function(s,o){new t(s,o,i.isObject,!0).to.be.a("object")},i.isNotObject=function(s,o){new t(s,o,i.isNotObject,!0).to.not.be.a("object")},i.isArray=function(s,o){new t(s,o,i.isArray,!0).to.be.an("array")},i.isNotArray=function(s,o){new t(s,o,i.isNotArray,!0).to.not.be.an("array")},i.isString=function(s,o){new t(s,o,i.isString,!0).to.be.a("string")},i.isNotString=function(s,o){new t(s,o,i.isNotString,!0).to.not.be.a("string")},i.isNumber=function(s,o){new t(s,o,i.isNumber,!0).to.be.a("number")},i.isNotNumber=function(s,o){new t(s,o,i.isNotNumber,!0).to.not.be.a("number")},i.isFinite=function(s,o){new t(s,o,i.isFinite,!0).to.be.finite},i.isBoolean=function(s,o){new t(s,o,i.isBoolean,!0).to.be.a("boolean")},i.isNotBoolean=function(s,o){new t(s,o,i.isNotBoolean,!0).to.not.be.a("boolean")},i.typeOf=function(s,o,a){new t(s,a,i.typeOf,!0).to.be.a(o)},i.notTypeOf=function(s,o,a){new t(s,a,i.notTypeOf,!0).to.not.be.a(o)},i.instanceOf=function(s,o,a){new t(s,a,i.instanceOf,!0).to.be.instanceOf(o)},i.notInstanceOf=function(s,o,a){new t(s,a,i.notInstanceOf,!0).to.not.be.instanceOf(o)},i.include=function(s,o,a){new t(s,a,i.include,!0).include(o)},i.notInclude=function(s,o,a){new t(s,a,i.notInclude,!0).not.include(o)},i.deepInclude=function(s,o,a){new t(s,a,i.deepInclude,!0).deep.include(o)},i.notDeepInclude=function(s,o,a){new t(s,a,i.notDeepInclude,!0).not.deep.include(o)},i.nestedInclude=function(s,o,a){new t(s,a,i.nestedInclude,!0).nested.include(o)},i.notNestedInclude=function(s,o,a){new t(s,a,i.notNestedInclude,!0).not.nested.include(o)},i.deepNestedInclude=function(s,o,a){new t(s,a,i.deepNestedInclude,!0).deep.nested.include(o)},i.notDeepNestedInclude=function(s,o,a){new t(s,a,i.notDeepNestedInclude,!0).not.deep.nested.include(o)},i.ownInclude=function(s,o,a){new t(s,a,i.ownInclude,!0).own.include(o)},i.notOwnInclude=function(s,o,a){new t(s,a,i.notOwnInclude,!0).not.own.include(o)},i.deepOwnInclude=function(s,o,a){new t(s,a,i.deepOwnInclude,!0).deep.own.include(o)},i.notDeepOwnInclude=function(s,o,a){new t(s,a,i.notDeepOwnInclude,!0).not.deep.own.include(o)},i.match=function(s,o,a){new t(s,a,i.match,!0).to.match(o)},i.notMatch=function(s,o,a){new t(s,a,i.notMatch,!0).to.not.match(o)},i.property=function(s,o,a){new t(s,a,i.property,!0).to.have.property(o)},i.notProperty=function(s,o,a){new t(s,a,i.notProperty,!0).to.not.have.property(o)},i.propertyVal=function(s,o,a,l){new t(s,l,i.propertyVal,!0).to.have.property(o,a)},i.notPropertyVal=function(s,o,a,l){new t(s,l,i.notPropertyVal,!0).to.not.have.property(o,a)},i.deepPropertyVal=function(s,o,a,l){new t(s,l,i.deepPropertyVal,!0).to.have.deep.property(o,a)},i.notDeepPropertyVal=function(s,o,a,l){new t(s,l,i.notDeepPropertyVal,!0).to.not.have.deep.property(o,a)},i.ownProperty=function(s,o,a){new t(s,a,i.ownProperty,!0).to.have.own.property(o)},i.notOwnProperty=function(s,o,a){new t(s,a,i.notOwnProperty,!0).to.not.have.own.property(o)},i.ownPropertyVal=function(s,o,a,l){new t(s,l,i.ownPropertyVal,!0).to.have.own.property(o,a)},i.notOwnPropertyVal=function(s,o,a,l){new t(s,l,i.notOwnPropertyVal,!0).to.not.have.own.property(o,a)},i.deepOwnPropertyVal=function(s,o,a,l){new t(s,l,i.deepOwnPropertyVal,!0).to.have.deep.own.property(o,a)},i.notDeepOwnPropertyVal=function(s,o,a,l){new t(s,l,i.notDeepOwnPropertyVal,!0).to.not.have.deep.own.property(o,a)},i.nestedProperty=function(s,o,a){new t(s,a,i.nestedProperty,!0).to.have.nested.property(o)},i.notNestedProperty=function(s,o,a){new t(s,a,i.notNestedProperty,!0).to.not.have.nested.property(o)},i.nestedPropertyVal=function(s,o,a,l){new t(s,l,i.nestedPropertyVal,!0).to.have.nested.property(o,a)},i.notNestedPropertyVal=function(s,o,a,l){new t(s,l,i.notNestedPropertyVal,!0).to.not.have.nested.property(o,a)},i.deepNestedPropertyVal=function(s,o,a,l){new t(s,l,i.deepNestedPropertyVal,!0).to.have.deep.nested.property(o,a)},i.notDeepNestedPropertyVal=function(s,o,a,l){new t(s,l,i.notDeepNestedPropertyVal,!0).to.not.have.deep.nested.property(o,a)},i.lengthOf=function(s,o,a){new t(s,a,i.lengthOf,!0).to.have.lengthOf(o)},i.hasAnyKeys=function(s,o,a){new t(s,a,i.hasAnyKeys,!0).to.have.any.keys(o)},i.hasAllKeys=function(s,o,a){new t(s,a,i.hasAllKeys,!0).to.have.all.keys(o)},i.containsAllKeys=function(s,o,a){new t(s,a,i.containsAllKeys,!0).to.contain.all.keys(o)},i.doesNotHaveAnyKeys=function(s,o,a){new t(s,a,i.doesNotHaveAnyKeys,!0).to.not.have.any.keys(o)},i.doesNotHaveAllKeys=function(s,o,a){new t(s,a,i.doesNotHaveAllKeys,!0).to.not.have.all.keys(o)},i.hasAnyDeepKeys=function(s,o,a){new t(s,a,i.hasAnyDeepKeys,!0).to.have.any.deep.keys(o)},i.hasAllDeepKeys=function(s,o,a){new t(s,a,i.hasAllDeepKeys,!0).to.have.all.deep.keys(o)},i.containsAllDeepKeys=function(s,o,a){new t(s,a,i.containsAllDeepKeys,!0).to.contain.all.deep.keys(o)},i.doesNotHaveAnyDeepKeys=function(s,o,a){new t(s,a,i.doesNotHaveAnyDeepKeys,!0).to.not.have.any.deep.keys(o)},i.doesNotHaveAllDeepKeys=function(s,o,a){new t(s,a,i.doesNotHaveAllDeepKeys,!0).to.not.have.all.deep.keys(o)},i.throws=function(s,o,a,l){(typeof o=="string"||o instanceof RegExp)&&(a=o,o=null);var c=new t(s,l,i.throws,!0).to.throw(o,a);return n(c,"object")},i.doesNotThrow=function(s,o,a,l){(typeof o=="string"||o instanceof RegExp)&&(a=o,o=null),new t(s,l,i.doesNotThrow,!0).to.not.throw(o,a)},i.operator=function(s,o,a,l){var c;switch(o){case"==":c=s==a;break;case"===":c=s===a;break;case">":c=s>a;break;case">=":c=s>=a;break;case"<":c=s<a;break;case"<=":c=s<=a;break;case"!=":c=s!=a;break;case"!==":c=s!==a;break;default:throw l=l&&l+": ",new r.AssertionError(l+'Invalid operator "'+o+'"',void 0,i.operator)}var u=new t(c,l,i.operator,!0);u.assert(n(u,"object")===!0,"expected "+e.inspect(s)+" to be "+o+" "+e.inspect(a),"expected "+e.inspect(s)+" to not be "+o+" "+e.inspect(a))},i.closeTo=function(s,o,a,l){new t(s,l,i.closeTo,!0).to.be.closeTo(o,a)},i.approximately=function(s,o,a,l){new t(s,l,i.approximately,!0).to.be.approximately(o,a)},i.sameMembers=function(s,o,a){new t(s,a,i.sameMembers,!0).to.have.same.members(o)},i.notSameMembers=function(s,o,a){new t(s,a,i.notSameMembers,!0).to.not.have.same.members(o)},i.sameDeepMembers=function(s,o,a){new t(s,a,i.sameDeepMembers,!0).to.have.same.deep.members(o)},i.notSameDeepMembers=function(s,o,a){new t(s,a,i.notSameDeepMembers,!0).to.not.have.same.deep.members(o)},i.sameOrderedMembers=function(s,o,a){new t(s,a,i.sameOrderedMembers,!0).to.have.same.ordered.members(o)},i.notSameOrderedMembers=function(s,o,a){new t(s,a,i.notSameOrderedMembers,!0).to.not.have.same.ordered.members(o)},i.sameDeepOrderedMembers=function(s,o,a){new t(s,a,i.sameDeepOrderedMembers,!0).to.have.same.deep.ordered.members(o)},i.notSameDeepOrderedMembers=function(s,o,a){new t(s,a,i.notSameDeepOrderedMembers,!0).to.not.have.same.deep.ordered.members(o)},i.includeMembers=function(s,o,a){new t(s,a,i.includeMembers,!0).to.include.members(o)},i.notIncludeMembers=function(s,o,a){new t(s,a,i.notIncludeMembers,!0).to.not.include.members(o)},i.includeDeepMembers=function(s,o,a){new t(s,a,i.includeDeepMembers,!0).to.include.deep.members(o)},i.notIncludeDeepMembers=function(s,o,a){new t(s,a,i.notIncludeDeepMembers,!0).to.not.include.deep.members(o)},i.includeOrderedMembers=function(s,o,a){new t(s,a,i.includeOrderedMembers,!0).to.include.ordered.members(o)},i.notIncludeOrderedMembers=function(s,o,a){new t(s,a,i.notIncludeOrderedMembers,!0).to.not.include.ordered.members(o)},i.includeDeepOrderedMembers=function(s,o,a){new t(s,a,i.includeDeepOrderedMembers,!0).to.include.deep.ordered.members(o)},i.notIncludeDeepOrderedMembers=function(s,o,a){new t(s,a,i.notIncludeDeepOrderedMembers,!0).to.not.include.deep.ordered.members(o)},i.oneOf=function(s,o,a){new t(s,a,i.oneOf,!0).to.be.oneOf(o)},i.changes=function(s,o,a,l){arguments.length===3&&typeof o=="function"&&(l=a,a=null),new t(s,l,i.changes,!0).to.change(o,a)},i.changesBy=function(s,o,a,l,c){if(arguments.length===4&&typeof o=="function"){var u=l;l=a,c=u}else arguments.length===3&&(l=a,a=null);new t(s,c,i.changesBy,!0).to.change(o,a).by(l)},i.doesNotChange=function(s,o,a,l){return arguments.length===3&&typeof o=="function"&&(l=a,a=null),new t(s,l,i.doesNotChange,!0).to.not.change(o,a)},i.changesButNotBy=function(s,o,a,l,c){if(arguments.length===4&&typeof o=="function"){var u=l;l=a,c=u}else arguments.length===3&&(l=a,a=null);new t(s,c,i.changesButNotBy,!0).to.change(o,a).but.not.by(l)},i.increases=function(s,o,a,l){return arguments.length===3&&typeof o=="function"&&(l=a,a=null),new t(s,l,i.increases,!0).to.increase(o,a)},i.increasesBy=function(s,o,a,l,c){if(arguments.length===4&&typeof o=="function"){var u=l;l=a,c=u}else arguments.length===3&&(l=a,a=null);new t(s,c,i.increasesBy,!0).to.increase(o,a).by(l)},i.doesNotIncrease=function(s,o,a,l){return arguments.length===3&&typeof o=="function"&&(l=a,a=null),new t(s,l,i.doesNotIncrease,!0).to.not.increase(o,a)},i.increasesButNotBy=function(s,o,a,l,c){if(arguments.length===4&&typeof o=="function"){var u=l;l=a,c=u}else arguments.length===3&&(l=a,a=null);new t(s,c,i.increasesButNotBy,!0).to.increase(o,a).but.not.by(l)},i.decreases=function(s,o,a,l){return arguments.length===3&&typeof o=="function"&&(l=a,a=null),new t(s,l,i.decreases,!0).to.decrease(o,a)},i.decreasesBy=function(s,o,a,l,c){if(arguments.length===4&&typeof o=="function"){var u=l;l=a,c=u}else arguments.length===3&&(l=a,a=null);new t(s,c,i.decreasesBy,!0).to.decrease(o,a).by(l)},i.doesNotDecrease=function(s,o,a,l){return arguments.length===3&&typeof o=="function"&&(l=a,a=null),new t(s,l,i.doesNotDecrease,!0).to.not.decrease(o,a)},i.doesNotDecreaseBy=function(s,o,a,l,c){if(arguments.length===4&&typeof o=="function"){var u=l;l=a,c=u}else arguments.length===3&&(l=a,a=null);return new t(s,c,i.doesNotDecreaseBy,!0).to.not.decrease(o,a).by(l)},i.decreasesButNotBy=function(s,o,a,l,c){if(arguments.length===4&&typeof o=="function"){var u=l;l=a,c=u}else arguments.length===3&&(l=a,a=null);new t(s,c,i.decreasesButNotBy,!0).to.decrease(o,a).but.not.by(l)};/*!
 * ### .ifError(object)
 *
 * Asserts if value is not a false value, and throws if it is a true value.
 * This is added to allow for chai to be a drop-in replacement for Node's
 * assert class.
 *
 *     var err = new Error('I am a custom error');
 *     assert.ifError(err); // Rethrows err!
 *
 * @name ifError
 * @param {Object} object
 * @namespace Assert
 * @api public
 */i.ifError=function(s){if(s)throw s},i.isExtensible=function(s,o){new t(s,o,i.isExtensible,!0).to.be.extensible},i.isNotExtensible=function(s,o){new t(s,o,i.isNotExtensible,!0).to.not.be.extensible},i.isSealed=function(s,o){new t(s,o,i.isSealed,!0).to.be.sealed},i.isNotSealed=function(s,o){new t(s,o,i.isNotSealed,!0).to.not.be.sealed},i.isFrozen=function(s,o){new t(s,o,i.isFrozen,!0).to.be.frozen},i.isNotFrozen=function(s,o){new t(s,o,i.isNotFrozen,!0).to.not.be.frozen},i.isEmpty=function(s,o){new t(s,o,i.isEmpty,!0).to.be.empty},i.isNotEmpty=function(s,o){new t(s,o,i.isNotEmpty,!0).to.not.be.empty};/*!
 * Aliases.
 */(function s(o,a){return i[a]=i[o],s})("isOk","ok")("isNotOk","notOk")("throws","throw")("throws","Throw")("isExtensible","extensible")("isNotExtensible","notExtensible")("isSealed","sealed")("isNotSealed","notSealed")("isFrozen","frozen")("isNotFrozen","notFrozen")("isEmpty","empty")("isNotEmpty","notEmpty")};/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var kf;function dr(){return kf||(kf=1,function(r){var e=[];/*!
 * Chai version
 */r.version="4.3.0";/*!
 * Assertion Error
 */r.AssertionError=Qm;/*!
 * Utils for plugins (not exported)
 */var t=dx();r.use=function(c){return~e.indexOf(c)||(c(r,t),e.push(c)),r};/*!
 * Utility Functions
 */r.util=t;/*!
 * Configuration
 */var n=_s;r.config=n;/*!
 * Primary `Assertion` prototype
 */var i=px;r.use(i);/*!
 * Core Assertions
 */var s=mx;r.use(s);/*!
 * Expect interface
 */var o=gx;r.use(o);/*!
 * Should interface
 */var a=_x;r.use(a);/*!
 * Assert interface
 */var l=yx;r.use(l)}(Gl)),Gl}var vx=dr();const ni=Km(vx);ni.expect;ni.version;ni.AssertionError;ni.util;ni.config;ni.use;ni.should;const La=ni.assert;ni.core;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ec;const Na=window,Jr=Na.trustedTypes,Uf=Jr?Jr.createPolicy("lit-html",{createHTML:r=>r}):void 0,gu="$lit$",hi=`lit$${(Math.random()+"").slice(9)}$`,cg="?"+hi,xx=`<${cg}>`,Ji=document,uo=()=>Ji.createComment(""),ho=r=>r===null||typeof r!="object"&&typeof r!="function",ug=Array.isArray,bx=r=>ug(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",tc=`[ 	
\f\r]`,Ps=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bf=/-->/g,zf=/>/g,Pi=RegExp(`>|${tc}(?:([^\\s"'>=/]+)(${tc}*=${tc}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Hf=/'/g,Vf=/"/g,hg=/^(?:script|style|textarea|title)$/i,wx=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),bn=wx(1),fo=Symbol.for("lit-noChange"),Lt=Symbol.for("lit-nothing"),Gf=new WeakMap,Hi=Ji.createTreeWalker(Ji,129,null,!1);function fg(r,e){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Uf!==void 0?Uf.createHTML(e):e}const Sx=(r,e)=>{const t=r.length-1,n=[];let i,s=e===2?"<svg>":"",o=Ps;for(let a=0;a<t;a++){const l=r[a];let c,u,h=-1,f=0;for(;f<l.length&&(o.lastIndex=f,u=o.exec(l),u!==null);)f=o.lastIndex,o===Ps?u[1]==="!--"?o=Bf:u[1]!==void 0?o=zf:u[2]!==void 0?(hg.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=Pi):u[3]!==void 0&&(o=Pi):o===Pi?u[0]===">"?(o=i??Ps,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?Pi:u[3]==='"'?Vf:Hf):o===Vf||o===Hf?o=Pi:o===Bf||o===zf?o=Ps:(o=Pi,i=void 0);const d=o===Pi&&r[a+1].startsWith("/>")?" ":"";s+=o===Ps?l+xx:h>=0?(n.push(c),l.slice(0,h)+gu+l.slice(h)+hi+d):l+hi+(h===-2?(n.push(void 0),a):d)}return[fg(r,s+(r[t]||"<?>")+(e===2?"</svg>":"")),n]};class po{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,o=0;const a=e.length-1,l=this.parts,[c,u]=Sx(e,t);if(this.el=po.createElement(c,n),Hi.currentNode=this.el.content,t===2){const h=this.el.content,f=h.firstChild;f.remove(),h.append(...f.childNodes)}for(;(i=Hi.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes()){const h=[];for(const f of i.getAttributeNames())if(f.endsWith(gu)||f.startsWith(hi)){const d=u[o++];if(h.push(f),d!==void 0){const g=i.getAttribute(d.toLowerCase()+gu).split(hi),m=/([.?@])?(.*)/.exec(d);l.push({type:1,index:s,name:m[2],strings:g,ctor:m[1]==="."?Ex:m[1]==="?"?Cx:m[1]==="@"?Ax:al})}else l.push({type:6,index:s})}for(const f of h)i.removeAttribute(f)}if(hg.test(i.tagName)){const h=i.textContent.split(hi),f=h.length-1;if(f>0){i.textContent=Jr?Jr.emptyScript:"";for(let d=0;d<f;d++)i.append(h[d],uo()),Hi.nextNode(),l.push({type:2,index:++s});i.append(h[f],uo())}}}else if(i.nodeType===8)if(i.data===cg)l.push({type:2,index:s});else{let h=-1;for(;(h=i.data.indexOf(hi,h+1))!==-1;)l.push({type:7,index:s}),h+=hi.length-1}s++}}static createElement(e,t){const n=Ji.createElement("template");return n.innerHTML=e,n}}function Qr(r,e,t=r,n){var i,s,o,a;if(e===fo)return e;let l=n!==void 0?(i=t._$Co)===null||i===void 0?void 0:i[n]:t._$Cl;const c=ho(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((s=l==null?void 0:l._$AO)===null||s===void 0||s.call(l,!1),c===void 0?l=void 0:(l=new c(r),l._$AT(r,t,n)),n!==void 0?((o=(a=t)._$Co)!==null&&o!==void 0?o:a._$Co=[])[n]=l:t._$Cl=l),l!==void 0&&(e=Qr(r,l._$AS(r,e.values),l,n)),e}class Mx{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:n},parts:i}=this._$AD,s=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:Ji).importNode(n,!0);Hi.currentNode=s;let o=Hi.nextNode(),a=0,l=0,c=i[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Oo(o,o.nextSibling,this,e):c.type===1?u=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(u=new Ix(o,this,e)),this._$AV.push(u),c=i[++l]}a!==(c==null?void 0:c.index)&&(o=Hi.nextNode(),a++)}return Hi.currentNode=Ji,s}v(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class Oo{constructor(e,t,n,i){var s;this.type=2,this._$AH=Lt,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cp=(s=i==null?void 0:i.isConnected)===null||s===void 0||s}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Qr(this,e,t),ho(e)?e===Lt||e==null||e===""?(this._$AH!==Lt&&this._$AR(),this._$AH=Lt):e!==this._$AH&&e!==fo&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):bx(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==Lt&&ho(this._$AH)?this._$AA.nextSibling.data=e:this.$(Ji.createTextNode(e)),this._$AH=e}g(e){var t;const{values:n,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=po.createElement(fg(i.h,i.h[0]),this.options)),i);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===s)this._$AH.v(n);else{const o=new Mx(s,this),a=o.u(this.options);o.v(n),this.$(a),this._$AH=o}}_$AC(e){let t=Gf.get(e.strings);return t===void 0&&Gf.set(e.strings,t=new po(e)),t}T(e){ug(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const s of e)i===t.length?t.push(n=new Oo(this.k(uo()),this.k(uo()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class al{constructor(e,t,n,i,s){this.type=1,this._$AH=Lt,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Lt}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,i){const s=this.strings;let o=!1;if(s===void 0)e=Qr(this,e,t,0),o=!ho(e)||e!==this._$AH&&e!==fo,o&&(this._$AH=e);else{const a=e;let l,c;for(e=s[0],l=0;l<s.length-1;l++)c=Qr(this,a[n+l],t,l),c===fo&&(c=this._$AH[l]),o||(o=!ho(c)||c!==this._$AH[l]),c===Lt?e=Lt:e!==Lt&&(e+=(c??"")+s[l+1]),this._$AH[l]=c}o&&!i&&this.j(e)}j(e){e===Lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ex extends al{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Lt?void 0:e}}const Tx=Jr?Jr.emptyScript:"";class Cx extends al{constructor(){super(...arguments),this.type=4}j(e){e&&e!==Lt?this.element.setAttribute(this.name,Tx):this.element.removeAttribute(this.name)}}class Ax extends al{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){var n;if((e=(n=Qr(this,e,t,0))!==null&&n!==void 0?n:Lt)===fo)return;const i=this._$AH,s=e===Lt&&i!==Lt||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==Lt&&(i===Lt||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,n;typeof this._$AH=="function"?this._$AH.call((n=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&n!==void 0?n:this.element,e):this._$AH.handleEvent(e)}}class Ix{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Qr(this,e)}}const Wf=Na.litHtmlPolyfillSupport;Wf==null||Wf(po,Oo),((ec=Na.litHtmlVersions)!==null&&ec!==void 0?ec:Na.litHtmlVersions=[]).push("2.8.0");const dg=(r,e,t)=>{var n,i;const s=(n=void 0)!==null&&n!==void 0?n:e;let o=s._$litPart$;if(o===void 0){const a=(i=void 0)!==null&&i!==void 0?i:null;s._$litPart$=o=new Oo(e.insertBefore(uo(),a),a,void 0,{})}return o._$AI(r),o},Px=()=>{};var jf={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pg={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de=function(r,e){if(!r)throw ys(e)},ys=function(r){return new Error("Firebase Database ("+pg.SDK_VERSION+") INTERNAL ASSERT FAILED: "+r)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Rx=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){const s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=r[t++],o=r[t++],a=r[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[n++]=String.fromCharCode(55296+(l>>10)),e[n++]=String.fromCharCode(56320+(l&1023))}else{const s=r[t++],o=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},rh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const s=r[i],o=i+1<r.length,a=o?r[i+1]:0,l=i+2<r.length,c=l?r[i+2]:0,u=s>>2,h=(s&3)<<4|a>>4;let f=(a&15)<<2|c>>6,d=c&63;l||(d=64,o||(f=64)),n.push(t[u],t[h],t[f],t[d])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(mg(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Rx(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const s=t[r.charAt(i++)],a=i<r.length?t[r.charAt(i)]:0;++i;const c=i<r.length?t[r.charAt(i)]:64;++i;const h=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||a==null||c==null||h==null)throw new Dx;const f=s<<2|a>>4;if(n.push(f),c!==64){const d=a<<4&240|c>>2;if(n.push(d),h!==64){const g=c<<6&192|h;n.push(g)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Dx extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const gg=function(r){const e=mg(r);return rh.encodeByteArray(e,!0)},Oa=function(r){return gg(r).replace(/\./g,"")},_u=function(r){try{return rh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lx(r){return _g(void 0,r)}function _g(r,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:r===void 0&&(r={});break;case Array:r=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Nx(t)||(r[t]=_g(r[t],e[t]));return r}function Nx(r){return r!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ox(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fx=()=>Ox().__FIREBASE_DEFAULTS__,kx=()=>{if(typeof process>"u"||typeof jf>"u")return;const r=jf.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Ux=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&_u(r[1]);return e&&JSON.parse(e)},yg=()=>{try{return Px()||Fx()||kx()||Ux()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Bx=r=>{var e,t;return(t=(e=yg())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},zx=r=>{const e=Bx(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},vg=()=>{var r;return(r=yg())==null?void 0:r.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Hx(r){return(await fetch(r,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vx(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",i=r.iat||0,s=r.sub||r.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...r};return[Oa(JSON.stringify(t)),Oa(JSON.stringify(o)),""].join(".")}const Js={};function Gx(){const r={prod:[],emulator:[]};for(const e of Object.keys(Js))Js[e]?r.emulator.push(e):r.prod.push(e);return r}function Wx(r){let e=document.getElementById(r),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",r),t=!0),{created:t,element:e}}let qf=!1;function jx(r,e){if(typeof window>"u"||typeof document>"u"||!sh(window.location.host)||Js[r]===e||Js[r]||qf)return;Js[r]=e;function t(f){return`__firebase__banner__${f}`}const n="__firebase__banner",s=Gx().prod.length>0;function o(){const f=document.getElementById(n);f&&f.remove()}function a(f){f.style.display="flex",f.style.background="#7faaf0",f.style.position="fixed",f.style.bottom="5px",f.style.left="5px",f.style.padding=".5em",f.style.borderRadius="5px",f.style.alignItems="center"}function l(f,d){f.setAttribute("width","24"),f.setAttribute("id",d),f.setAttribute("height","24"),f.setAttribute("viewBox","0 0 24 24"),f.setAttribute("fill","none"),f.style.marginLeft="-6px"}function c(){const f=document.createElement("span");return f.style.cursor="pointer",f.style.marginLeft="16px",f.style.fontSize="24px",f.innerHTML=" &times;",f.onclick=()=>{qf=!0,o()},f}function u(f,d){f.setAttribute("id",d),f.innerText="Learn more",f.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",f.setAttribute("target","__blank"),f.style.paddingLeft="5px",f.style.textDecoration="underline"}function h(){const f=Wx(n),d=t("text"),g=document.getElementById(d)||document.createElement("span"),m=t("learnmore"),p=document.getElementById(m)||document.createElement("a"),y=t("preprendIcon"),w=document.getElementById(y)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(f.created){const v=f.element;a(v),u(p,m);const x=c();l(w,y),v.append(w,g,p,x),document.body.appendChild(v)}s?(g.innerText="Preview backend disconnected.",w.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(w.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,g.innerText="Preview backend running in this workspace."),g.setAttribute("id",d)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qx(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(qx())}function $x(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Xx(){return pg.NODE_ADMIN===!0}function Yx(){try{return typeof indexedDB=="object"}catch{return!1}}function Kx(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zx="FirebaseError";class Fo extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Zx,Object.setPrototypeOf(this,Fo.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,bg.prototype.create)}}class bg{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Jx(s,n):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Fo(i,a,n)}}function Jx(r,e){return r.replace(Qx,(t,n)=>{const i=e[n];return i!=null?String(i):`<${n}?>`})}const Qx=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mo(r){return JSON.parse(r)}function Ot(r){return JSON.stringify(r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg=function(r){let e={},t={},n={},i="";try{const s=r.split(".");e=mo(_u(s[0])||""),t=mo(_u(s[1])||""),i=s[2],n=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:n,signature:i}},e0=function(r){const e=wg(r),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},t0=function(r){const e=wg(r).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cn(r,e){return Object.prototype.hasOwnProperty.call(r,e)}function Qi(r,e){if(Object.prototype.hasOwnProperty.call(r,e))return r[e]}function yu(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Fa(r,e,t){const n={};for(const i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=e.call(t,r[i],i,r));return n}function ka(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const i of t){if(!n.includes(i))return!1;const s=r[i],o=e[i];if($f(s)&&$f(o)){if(!ka(s,o))return!1}else if(s!==o)return!1}for(const i of n)if(!t.includes(i))return!1;return!0}function $f(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n0(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)n[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)n[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const f=n[h-3]^n[h-8]^n[h-14]^n[h-16];n[h]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^s&(o^a),u=1518500249):(c=s^o^a,u=1859775393):h<60?(c=s&o|a&(s|o),u=2400959708):(c=s^o^a,u=3395469782);const f=(i<<5|i>>>27)+c+l+u+n[h]&4294967295;l=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const n=t-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=n;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<t;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let n=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[n]=this.chain_[i]>>s&255,++n;return e}}function es(r,e){return`${r} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r0=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);if(i>=55296&&i<=56319){const s=i-55296;n++,de(n<r.length,"Surrogate pair missing trail surrogate.");const o=r.charCodeAt(n)-56320;i=65536+(s<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},ll=function(r){let e=0;for(let t=0;t<r.length;t++){const n=r.charCodeAt(t);n<128?e++:n<2048?e+=2:n>=55296&&n<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(r){return r&&r._delegate?r._delegate:r}class go{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ki="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s0{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Rn;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(n)return null;throw i}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(a0(e))try{this.getOrInitializeService({instanceIdentifier:ki})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=ki){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ki){return this.instances.has(e)}getOptions(e=ki){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);n===a&&o.resolve(i)}return i}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(n)??new Set;i.add(e),this.onInitCallbacks.set(n,i);const s=this.instances.get(n);return s&&e(s,n),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:o0(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=ki){return this.component?this.component.multipleInstances?e:ki:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function o0(r){return r===ki?void 0:r}function a0(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l0{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new s0(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ot;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(ot||(ot={}));const c0={debug:ot.DEBUG,verbose:ot.VERBOSE,info:ot.INFO,warn:ot.WARN,error:ot.ERROR,silent:ot.SILENT},u0=ot.INFO,h0={[ot.DEBUG]:"log",[ot.VERBOSE]:"log",[ot.INFO]:"info",[ot.WARN]:"warn",[ot.ERROR]:"error"},f0=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),i=h0[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Sg{constructor(e){this.name=e,this._logLevel=u0,this._logHandler=f0,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ot))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?c0[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ot.DEBUG,...e),this._logHandler(this,ot.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ot.VERBOSE,...e),this._logHandler(this,ot.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ot.INFO,...e),this._logHandler(this,ot.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ot.WARN,...e),this._logHandler(this,ot.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ot.ERROR,...e),this._logHandler(this,ot.ERROR,...e)}}const d0=(r,e)=>e.some(t=>r instanceof t);let Xf,Yf;function p0(){return Xf||(Xf=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function m0(){return Yf||(Yf=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Mg=new WeakMap,vu=new WeakMap,Eg=new WeakMap,nc=new WeakMap,oh=new WeakMap;function g0(r){const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",o)},s=()=>{t(gi(r.result)),i()},o=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Mg.set(t,r)}).catch(()=>{}),oh.set(e,r),e}function _0(r){if(vu.has(r))return;const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",o),r.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",o),r.addEventListener("abort",o)});vu.set(r,e)}let xu={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return vu.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Eg.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return gi(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function y0(r){xu=r(xu)}function v0(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(ic(this),e,...t);return Eg.set(n,e.sort?e.sort():[e]),gi(n)}:m0().includes(r)?function(...e){return r.apply(ic(this),e),gi(Mg.get(this))}:function(...e){return gi(r.apply(ic(this),e))}}function x0(r){return typeof r=="function"?v0(r):(r instanceof IDBTransaction&&_0(r),d0(r,p0())?new Proxy(r,xu):r)}function gi(r){if(r instanceof IDBRequest)return g0(r);if(nc.has(r))return nc.get(r);const e=x0(r);return e!==r&&(nc.set(r,e),oh.set(e,r)),e}const ic=r=>oh.get(r);function b0(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){const o=indexedDB.open(r,e),a=gi(o);return n&&o.addEventListener("upgradeneeded",l=>{n(gi(o.result),l.oldVersion,l.newVersion,gi(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const w0=["get","getKey","getAll","getAllKeys","count"],S0=["put","add","delete","clear"],rc=new Map;function Kf(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(rc.get(e))return rc.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=S0.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||w0.includes(t)))return;const s=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return n&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return rc.set(e,s),s}y0(r=>({...r,get:(e,t,n)=>Kf(e,t)||r.get(e,t,n),has:(e,t)=>!!Kf(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M0{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(E0(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function E0(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const bu="@firebase/app",Zf="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei=new Sg("@firebase/app"),T0="@firebase/app-compat",C0="@firebase/analytics-compat",A0="@firebase/analytics",I0="@firebase/app-check-compat",P0="@firebase/app-check",R0="@firebase/auth",D0="@firebase/auth-compat",L0="@firebase/database",N0="@firebase/data-connect",O0="@firebase/database-compat",F0="@firebase/functions",k0="@firebase/functions-compat",U0="@firebase/installations",B0="@firebase/installations-compat",z0="@firebase/messaging",H0="@firebase/messaging-compat",V0="@firebase/performance",G0="@firebase/performance-compat",W0="@firebase/remote-config",j0="@firebase/remote-config-compat",q0="@firebase/storage",$0="@firebase/storage-compat",X0="@firebase/firestore",Y0="@firebase/ai",K0="@firebase/firestore-compat",Z0="firebase",J0="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu="[DEFAULT]",Q0={[bu]:"fire-core",[T0]:"fire-core-compat",[A0]:"fire-analytics",[C0]:"fire-analytics-compat",[P0]:"fire-app-check",[I0]:"fire-app-check-compat",[R0]:"fire-auth",[D0]:"fire-auth-compat",[L0]:"fire-rtdb",[N0]:"fire-data-connect",[O0]:"fire-rtdb-compat",[F0]:"fire-fn",[k0]:"fire-fn-compat",[U0]:"fire-iid",[B0]:"fire-iid-compat",[z0]:"fire-fcm",[H0]:"fire-fcm-compat",[V0]:"fire-perf",[G0]:"fire-perf-compat",[W0]:"fire-rc",[j0]:"fire-rc-compat",[q0]:"fire-gcs",[$0]:"fire-gcs-compat",[X0]:"fire-fst",[K0]:"fire-fst-compat",[Y0]:"fire-vertex","fire-js":"fire-js",[Z0]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ua=new Map,eb=new Map,Su=new Map;function Jf(r,e){try{r.container.addComponent(e)}catch(t){ei.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Ba(r){const e=r.name;if(Su.has(e))return ei.debug(`There were multiple attempts to register component ${e}.`),!1;Su.set(e,r);for(const t of Ua.values())Jf(t,r);for(const t of eb.values())Jf(t,r);return!0}function tb(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function nb(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ib={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},_i=new bg("app","Firebase",ib);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new go("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw _i.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sb=J0;function Tg(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:wu,automaticDataCollectionEnabled:!0,...e},i=n.name;if(typeof i!="string"||!i)throw _i.create("bad-app-name",{appName:String(i)});if(t||(t=vg()),!t)throw _i.create("no-options");const s=Ua.get(i);if(s){if(ka(t,s.options)&&ka(n,s.config))return s;throw _i.create("duplicate-app",{appName:i})}const o=new l0(i);for(const l of Su.values())o.addComponent(l);const a=new rb(t,n,o);return Ua.set(i,a),a}function ob(r=wu){const e=Ua.get(r);if(!e&&r===wu&&vg())return Tg();if(!e)throw _i.create("no-app",{appName:r});return e}function Hr(r,e,t){let n=Q0[r]??r;t&&(n+=`-${t}`);const i=n.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${n}" with version "${e}":`];i&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ei.warn(o.join(" "));return}Ba(new go(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ab="firebase-heartbeat-database",lb=1,_o="firebase-heartbeat-store";let sc=null;function Cg(){return sc||(sc=b0(ab,lb,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(_o)}catch(t){console.warn(t)}}}}).catch(r=>{throw _i.create("idb-open",{originalErrorMessage:r.message})})),sc}async function cb(r){try{const t=(await Cg()).transaction(_o),n=await t.objectStore(_o).get(Ag(r));return await t.done,n}catch(e){if(e instanceof Fo)ei.warn(e.message);else{const t=_i.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ei.warn(t.message)}}}async function Qf(r,e){try{const n=(await Cg()).transaction(_o,"readwrite");await n.objectStore(_o).put(e,Ag(r)),await n.done}catch(t){if(t instanceof Fo)ei.warn(t.message);else{const n=_i.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ei.warn(n.message)}}}function Ag(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ub=1024,hb=30;class fb{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new pb(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ed();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>hb){const o=mb(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){ei.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ed(),{heartbeatsToSend:n,unsentEntries:i}=db(this._heartbeatsCache.heartbeats),s=Oa(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return ei.warn(t),""}}}function ed(){return new Date().toISOString().substring(0,10)}function db(r,e=ub){const t=[];let n=r.slice();for(const i of r){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),td(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),td(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class pb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Yx()?Kx().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await cb(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Qf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Qf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function td(r){return Oa(JSON.stringify({version:2,heartbeats:r})).length}function mb(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gb(r){Ba(new go("platform-logger",e=>new M0(e),"PRIVATE")),Ba(new go("heartbeat",e=>new fb(e),"PRIVATE")),Hr(bu,Zf,r),Hr(bu,Zf,"esm2020"),Hr("fire-js","")}gb("");var nd={};const id="@firebase/database",rd="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ig="";function _b(r){Ig=r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yb{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ot(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:mo(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vb{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Cn(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg=function(r){try{if(typeof window<"u"&&typeof window[r]<"u"){const e=window[r];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new yb(e)}}catch{}return new vb},Vi=Pg("localStorage"),xb=Pg("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=new Sg("@firebase/database"),Rg=function(){let r=1;return function(){return r++}}(),Dg=function(r){const e=r0(r),t=new i0;t.update(e);const n=t.digest();return rh.encodeByteArray(n)},ko=function(...r){let e="";for(let t=0;t<r.length;t++){const n=r[t];Array.isArray(n)||n&&typeof n=="object"&&typeof n.length=="number"?e+=ko.apply(null,n):typeof n=="object"?e+=Ot(n):e+=n,e+=" "}return e};let Qs=null,sd=!0;const bb=function(r,e){de(!0,"Can't turn on custom loggers persistently."),Vr.logLevel=ot.VERBOSE,Qs=Vr.log.bind(Vr)},Ft=function(...r){if(sd===!0&&(sd=!1,Qs===null&&xb.get("logging_enabled")===!0&&bb()),Qs){const e=ko.apply(null,r);Qs(e)}},Uo=function(r){return function(...e){Ft(r,...e)}},Mu=function(...r){const e="FIREBASE INTERNAL ERROR: "+ko(...r);Vr.error(e)},ti=function(...r){const e=`FIREBASE FATAL ERROR: ${ko(...r)}`;throw Vr.error(e),new Error(e)},Jt=function(...r){const e="FIREBASE WARNING: "+ko(...r);Vr.warn(e)},wb=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Jt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},cl=function(r){return typeof r=="number"&&(r!==r||r===Number.POSITIVE_INFINITY||r===Number.NEGATIVE_INFINITY)},Sb=function(r){if(document.readyState==="complete")r();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,r())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ts="[MIN_NAME]",er="[MAX_NAME]",pr=function(r,e){if(r===e)return 0;if(r===ts||e===er)return-1;if(e===ts||r===er)return 1;{const t=od(r),n=od(e);return t!==null?n!==null?t-n===0?r.length-e.length:t-n:-1:n!==null?1:r<e?-1:1}},Mb=function(r,e){return r===e?0:r<e?-1:1},Rs=function(r,e){if(e&&r in e)return e[r];throw new Error("Missing required key ("+r+") in object: "+Ot(e))},ah=function(r){if(typeof r!="object"||r===null)return Ot(r);const e=[];for(const n in r)e.push(n);e.sort();let t="{";for(let n=0;n<e.length;n++)n!==0&&(t+=","),t+=Ot(e[n]),t+=":",t+=ah(r[e[n]]);return t+="}",t},Lg=function(r,e){const t=r.length;if(t<=e)return[r];const n=[];for(let i=0;i<t;i+=e)i+e>t?n.push(r.substring(i,t)):n.push(r.substring(i,i+e));return n};function Gt(r,e){for(const t in r)r.hasOwnProperty(t)&&e(t,r[t])}const Ng=function(r){de(!cl(r),"Invalid JSON number");const e=11,t=52,n=(1<<e-1)-1;let i,s,o,a,l;r===0?(s=0,o=0,i=1/r===-1/0?1:0):(i=r<0,r=Math.abs(r),r>=Math.pow(2,1-n)?(a=Math.min(Math.floor(Math.log(r)/Math.LN2),n),s=a+n,o=Math.round(r*Math.pow(2,t-a)-Math.pow(2,t))):(s=0,o=Math.round(r/Math.pow(2,1-n-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(s%2?1:0),s=Math.floor(s/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let f=parseInt(u.substr(l,8),2).toString(16);f.length===1&&(f="0"+f),h=h+f}return h.toLowerCase()},Eb=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Tb=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Cb(r,e){let t="Unknown Error";r==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":r==="permission_denied"?t="Client doesn't have permission to access the desired data.":r==="unavailable"&&(t="The service is unavailable");const n=new Error(r+" at "+e._path.toString()+": "+t);return n.code=r.toUpperCase(),n}const Ab=new RegExp("^-?(0*)\\d{1,10}$"),Ib=-2147483648,Pb=2147483647,od=function(r){if(Ab.test(r)){const e=Number(r);if(e>=Ib&&e<=Pb)return e}return null},vs=function(r){try{r()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Jt("Exception was thrown by user callback.",t),e},Math.floor(0))}},Rb=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},eo=function(r,e){const t=setTimeout(r,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Db{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,nb(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(n=>this.appCheck=n)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,n)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Jt(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lb{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Ft("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,n)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Jt(e)}}class Aa{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Aa.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh="5",Og="v",Fg="s",kg="r",Ug="f",Bg=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,zg="ls",Hg="p",Eu="ac",Vg="websocket",Gg="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{constructor(e,t,n,i,s=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=n,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Vi.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Vi.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Nb(r){return r.host!==r.internalHost||r.isCustomHost()||r.includeNamespaceInQueryParams}function jg(r,e,t){de(typeof e=="string","typeof type must == string"),de(typeof t=="object","typeof params must == object");let n;if(e===Vg)n=(r.secure?"wss://":"ws://")+r.internalHost+"/.ws?";else if(e===Gg)n=(r.secure?"https://":"http://")+r.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Nb(r)&&(t.ns=r.namespace);const i=[];return Gt(t,(s,o)=>{i.push(s+"="+o)}),n+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ob{constructor(){this.counters_={}}incrementCounter(e,t=1){Cn(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Lx(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oc={},ac={};function ch(r){const e=r.toString();return oc[e]||(oc[e]=new Ob),oc[e]}function Fb(r,e){const t=r.toString();return ac[t]||(ac[t]=e()),ac[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kb{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const n=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<n.length;++i)n[i]&&vs(()=>{this.onMessage_(n[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="start",Ub="close",Bb="pLPCommand",zb="pRTLPCB",qg="id",$g="pw",Xg="ser",Hb="cb",Vb="seg",Gb="ts",Wb="d",jb="dframe",Yg=1870,Kg=30,qb=Yg-Kg,$b=25e3,Xb=3e4;class Fr{constructor(e,t,n,i,s,o,a){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Uo(e),this.stats_=ch(t),this.urlFn=l=>(this.appCheckToken&&(l[Eu]=this.appCheckToken),jg(t,Gg,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new kb(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Xb)),Sb(()=>{if(this.isClosed_)return;this.scriptTagHolder=new uh((...s)=>{const[o,a,l,c,u]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ad)this.id=a,this.password=l;else if(o===Ub)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const n={};n[ad]="t",n[Xg]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(n[Hb]=this.scriptTagHolder.uniqueCallbackIdentifier),n[Og]=lh,this.transportSessionId&&(n[Fg]=this.transportSessionId),this.lastSessionId&&(n[zg]=this.lastSessionId),this.applicationId&&(n[Hg]=this.applicationId),this.appCheckToken&&(n[Eu]=this.appCheckToken),typeof location<"u"&&location.hostname&&Bg.test(location.hostname)&&(n[kg]=Ug);const i=this.urlFn(n);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Fr.forceAllow_=!0}static forceDisallow(){Fr.forceDisallow_=!0}static isAvailable(){return Fr.forceAllow_?!0:!Fr.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Eb()&&!Tb()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Ot(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=gg(t),i=Lg(n,qb);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const n={};n[jb]="t",n[qg]=e,n[$g]=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Ot(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class uh{constructor(e,t,n,i){this.onDisconnect=n,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Rg(),window[Bb+this.uniqueCallbackIdentifier]=e,window[zb+this.uniqueCallbackIdentifier]=t,this.myIFrame=uh.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Ft("frame writing exception"),a.stack&&Ft(a.stack),Ft(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ft("No IE domain setting required")}catch{const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[qg]=this.myID,e[$g]=this.myPW,e[Xg]=this.currentSerial;let t=this.urlFn(e),n="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Kg+n.length<=Yg;){const o=this.pendingSegs.shift();n=n+"&"+Vb+i+"="+o.seg+"&"+Gb+i+"="+o.ts+"&"+Wb+i+"="+o.d,i++}return t=t+n,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(n,Math.floor($b)),s=()=>{clearTimeout(i),n()};this.addTag(e,s)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const i=n.readyState;(!i||i==="loaded"||i==="complete")&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{Ft("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yb=16384,Kb=45e3;let za=null;typeof MozWebSocket<"u"?za=MozWebSocket:typeof WebSocket<"u"&&(za=WebSocket);class Sn{constructor(e,t,n,i,s,o,a){this.connId=e,this.applicationId=n,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Uo(this.connId),this.stats_=ch(t),this.connURL=Sn.connectionURL_(t,o,a,i,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,i,s){const o={};return o[Og]=lh,typeof location<"u"&&location.hostname&&Bg.test(location.hostname)&&(o[kg]=Ug),t&&(o[Fg]=t),n&&(o[zg]=n),i&&(o[Eu]=i),s&&(o[Hg]=s),jg(e,Vg,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Vi.set("previous_websocket_failure",!0);try{let n;Xx(),this.mySock=new za(this.connURL,[],n)}catch(n){this.log_("Error instantiating WebSocket.");const i=n.message||n.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=n=>{this.handleIncomingFrame(n)},this.mySock.onerror=n=>{this.log_("WebSocket error.  Closing connection.");const i=n.message||n.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Sn.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&za!==null&&!Sn.forceDisallow_}static previouslyFailed(){return Vi.isInMemoryStorage||Vi.get("previous_websocket_failure")===!0}markConnectionHealthy(){Vi.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const n=mo(t);this.onMessage(n)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(de(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const n=this.extractFrameCount_(t);n!==null&&this.appendFrame_(n)}}send(e){this.resetKeepAlive();const t=Ot(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=Lg(t,Yb);n.length>1&&this.sendString_(String(n.length));for(let i=0;i<n.length;i++)this.sendString_(n[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Kb))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Sn.responsesRequiredToBeHealthy=2;Sn.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{static get ALL_TRANSPORTS(){return[Fr,Sn]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Sn&&Sn.isAvailable();let n=t&&!Sn.previouslyFailed();if(e.webSocketOnly&&(t||Jt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[Sn];else{const i=this.transports_=[];for(const s of yo.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);yo.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}yo.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zb=6e4,Jb=5e3,Qb=10*1024,ew=100*1024,lc="t",ld="d",tw="s",cd="r",nw="e",ud="o",hd="a",fd="n",dd="p",iw="h";class rw{constructor(e,t,n,i,s,o,a,l,c,u){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Uo("c:"+this.id+":"),this.transportManager_=new yo(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,n)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=eo(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>ew?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Qb?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(lc in e){const t=e[lc];t===hd?this.upgradeIfSecondaryHealthy_():t===cd?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===ud&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Rs("t",e),n=Rs("d",e);if(t==="c")this.onSecondaryControl_(n);else if(t==="d")this.pendingDataMessages.push(n);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:dd,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:hd,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:fd,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Rs("t",e),n=Rs("d",e);t==="c"?this.onControl_(n):t==="d"&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Rs(lc,e);if(ld in e){const n=e[ld];if(t===iw){const i={...n};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===fd){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===tw?this.onConnectionShutdown_(n):t===cd?this.onReset_(n):t===nw?Mu("Server Error: "+n):t===ud?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Mu("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),lh!==n&&Jt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),eo(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Zb))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):eo(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Jb))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:dd,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Vi.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{put(e,t,n,i){}merge(e,t,n,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jg=class{constructor(e){this.allowedEvents_=e,this.listeners_={},de(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const n=[...this.listeners_[e]];for(let i=0;i<n.length;i++)n[i].callback.apply(n[i].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const i=this.getInitialEvent(e);i&&t.apply(n,i)}off(e,t,n){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===t&&(!n||n===i[s].context)){i.splice(s,1);return}}validateEventType_(e){de(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha extends Jg{static getInstance(){return new Ha}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!xg()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return de(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd=32,md=768;let nt=class{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let n=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[n]=this.pieces_[i],n++);this.pieces_.length=n,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}};function Ye(){return new nt("")}function Fe(r){return r.pieceNum_>=r.pieces_.length?null:r.pieces_[r.pieceNum_]}function xi(r){return r.pieces_.length-r.pieceNum_}function rt(r){let e=r.pieceNum_;return e<r.pieces_.length&&e++,new nt(r.pieces_,e)}function hh(r){return r.pieceNum_<r.pieces_.length?r.pieces_[r.pieces_.length-1]:null}function sw(r){let e="";for(let t=r.pieceNum_;t<r.pieces_.length;t++)r.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(r.pieces_[t])));return e||"/"}function vo(r,e=0){return r.pieces_.slice(r.pieceNum_+e)}function Qg(r){if(r.pieceNum_>=r.pieces_.length)return null;const e=[];for(let t=r.pieceNum_;t<r.pieces_.length-1;t++)e.push(r.pieces_[t]);return new nt(e,0)}function yt(r,e){const t=[];for(let n=r.pieceNum_;n<r.pieces_.length;n++)t.push(r.pieces_[n]);if(e instanceof nt)for(let n=e.pieceNum_;n<e.pieces_.length;n++)t.push(e.pieces_[n]);else{const n=e.split("/");for(let i=0;i<n.length;i++)n[i].length>0&&t.push(n[i])}return new nt(t,0)}function Ue(r){return r.pieceNum_>=r.pieces_.length}function Kt(r,e){const t=Fe(r),n=Fe(e);if(t===null)return e;if(t===n)return Kt(rt(r),rt(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+r+")")}function ow(r,e){const t=vo(r,0),n=vo(e,0);for(let i=0;i<t.length&&i<n.length;i++){const s=pr(t[i],n[i]);if(s!==0)return s}return t.length===n.length?0:t.length<n.length?-1:1}function fh(r,e){if(xi(r)!==xi(e))return!1;for(let t=r.pieceNum_,n=e.pieceNum_;t<=r.pieces_.length;t++,n++)if(r.pieces_[t]!==e.pieces_[n])return!1;return!0}function dn(r,e){let t=r.pieceNum_,n=e.pieceNum_;if(xi(r)>xi(e))return!1;for(;t<r.pieces_.length;){if(r.pieces_[t]!==e.pieces_[n])return!1;++t,++n}return!0}class aw{constructor(e,t){this.errorPrefix_=t,this.parts_=vo(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=ll(this.parts_[n]);e_(this)}}function lw(r,e){r.parts_.length>0&&(r.byteLength_+=1),r.parts_.push(e),r.byteLength_+=ll(e),e_(r)}function cw(r){const e=r.parts_.pop();r.byteLength_-=ll(e),r.parts_.length>0&&(r.byteLength_-=1)}function e_(r){if(r.byteLength_>md)throw new Error(r.errorPrefix_+"has a key path longer than "+md+" bytes ("+r.byteLength_+").");if(r.parts_.length>pd)throw new Error(r.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+pd+") or object contains a cycle "+Ui(r))}function Ui(r){return r.parts_.length===0?"":"in property '"+r.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh extends Jg{static getInstance(){return new dh}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const n=!document[e];n!==this.visible_&&(this.visible_=n,this.trigger("visible",n))},!1)}getInitialEvent(e){return de(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ds=1e3,uw=60*5*1e3,gd=30*1e3,hw=1.3,fw=3e4,dw="server_kill",_d=3;class Jn extends Zg{constructor(e,t,n,i,s,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Jn.nextPersistentConnectionId_++,this.log_=Uo("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ds,this.maxReconnectDelay_=uw,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");dh.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ha.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const i=++this.requestNumber_,s={r:i,a:e,b:t};this.log_(Ot(s)),de(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),n&&(this.requestCBHash_[i]=n)}get(e){this.initConnection_();const t=new Rn,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),t.promise}listen(e,t,n,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),de(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),de(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:n};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)})}sendListen_(e){const t=e.query,n=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+n+" for "+i);const s={p:n},o="q";e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const l=a.d,c=a.s;Jn.warnOnListenWarnings_(l,t),(this.listens.get(n)&&this.listens.get(n).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(n,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Cn(e,"w")){const n=Qi(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',s=t._path.toString();Jt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||t0(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=gd)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=e0(e)?"auth":"gauth",n={cred:e};this.authOverride_===null?n.noauth=!0:typeof this.authOverride_=="object"&&(n.authvar=this.authOverride_),this.sendRequest(t,n,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,n=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)})}unlisten(e,t){const n=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+i),de(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(n,i)&&this.connected_&&this.sendUnlisten_(n,i,e._queryObject,t)}sendUnlisten_(e,t,n,i){this.log_("Unlisten on "+e+" for "+t);const s={p:e},o="n";i&&(s.q=n,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,i){const s={p:t,d:n};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,n,i){this.putInternal("p",e,t,n,i)}merge(e,t,n,i){this.putInternal("m",e,t,n,i)}putInternal(e,t,n,i,s){this.initConnection_();const o={p:t,d:n};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,s=>{this.log_(t+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,n=>{if(n.s!=="ok"){const s=n.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ot(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Mu("Unrecognized action received from server: "+Ot(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){de(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ds,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ds,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>fw&&(this.reconnectDelay_=Ds),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*hw)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Jn.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,n())},c=function(h){de(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,f]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?Ft("getToken() completed but was canceled"):(Ft("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=f&&f.token,a=new rw(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,d=>{Jt(d+" ("+this.repoInfo_.toString()+")"),this.interrupt(dw)},s))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&Jt(h),l())}}}interrupt(e){Ft("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ft("Resuming connection for reason: "+e),delete this.interruptReasons_[e],yu(this.interruptReasons_)&&(this.reconnectDelay_=Ds,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;t?n=t.map(s=>ah(s)).join("$"):n="default";const i=this.removeListen_(e,n);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const n=new nt(e).toString();let i;if(this.listens.has(n)){const s=this.listens.get(n);i=s.get(t),s.delete(t),s.size===0&&this.listens.delete(n)}else i=void 0;return i}onAuthRevoked_(e,t){Ft("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=_d&&(this.reconnectDelay_=gd,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Ft("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=_d&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Ig.replace(/\./g,"-")]=1,xg()?e["framework.cordova"]=1:$x()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ha.getInstance().currentlyOnline();return yu(this.interruptReasons_)&&e}}Jn.nextPersistentConnectionId_=0;Jn.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new Be(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new Be(ts,e),i=new Be(ts,t);return this.compare(n,i)!==0}minPost(){return Be.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ko;class t_ extends ul{static get __EMPTY_NODE(){return Ko}static set __EMPTY_NODE(e){Ko=e}compare(e,t){return pr(e.name,t.name)}isDefinedOn(e){throw ys("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return Be.MIN}maxPost(){return new Be(er,Ko)}makePost(e,t){return de(typeof e=="string","KeyIndex indexValue must always be a string."),new Be(e,Ko)}toString(){return".key"}}const Gr=new t_;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,t,n,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?n(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Rt{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=n??Rt.RED,this.left=i??Zt.EMPTY_NODE,this.right=s??Zt.EMPTY_NODE}copy(e,t,n,i,s){return new Rt(e??this.key,t??this.value,n??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,t,n),null):s===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Zt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,i;if(n=this,t(e,n.key)<0)!n.left.isEmpty()&&!n.left.isRed_()&&!n.left.left.isRed_()&&(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),!n.right.isEmpty()&&!n.right.isRed_()&&!n.right.left.isRed_()&&(n=n.moveRedRight_()),t(e,n.key)===0){if(n.right.isEmpty())return Zt.EMPTY_NODE;i=n.right.min_(),n=n.copy(i.key,i.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Rt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Rt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Rt.RED=!0;Rt.BLACK=!1;class pw{copy(e,t,n,i,s){return this}insert(e,t,n){return new Rt(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Zt{constructor(e,t=Zt.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Zt(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Rt.BLACK,null,null))}remove(e){return new Zt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Rt.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),t===0)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,i=null;for(;!n.isEmpty();)if(t=this.comparator_(e,n.key),t===0){if(n.left.isEmpty())return i?i.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}else t<0?n=n.left:t>0&&(i=n,n=n.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Zo(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Zo(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Zo(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Zo(this.root_,null,this.comparator_,!0,e)}}Zt.EMPTY_NODE=new pw;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mw(r,e){return pr(r.name,e.name)}function ph(r,e){return pr(r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tu;function gw(r){Tu=r}const n_=function(r){return typeof r=="number"?"number:"+Ng(r):"string:"+r},i_=function(r){if(r.isLeafNode()){const e=r.val();de(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Cn(e,".sv"),"Priority must be a string or number.")}else de(r===Tu||r.isEmpty(),"priority of unexpected type.");de(r===Tu||r.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yd;class Pt{static set __childrenNodeConstructor(e){yd=e}static get __childrenNodeConstructor(){return yd}constructor(e,t=Pt.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,de(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),i_(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Pt(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Pt.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return Ue(e)?this:Fe(e)===".priority"?this.priorityNode_:Pt.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Pt.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=Fe(e);return n===null?t:t.isEmpty()&&n!==".priority"?this:(de(n!==".priority"||xi(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(n,Pt.__childrenNodeConstructor.EMPTY_NODE.updateChild(rt(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+n_(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Ng(this.value_):e+=this.value_,this.lazyHash_=Dg(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Pt.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Pt.__childrenNodeConstructor?-1:(de(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,i=Pt.VALUE_TYPE_ORDER.indexOf(t),s=Pt.VALUE_TYPE_ORDER.indexOf(n);return de(i>=0,"Unknown leaf type: "+t),de(s>=0,"Unknown leaf type: "+n),i===s?n==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Pt.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r_,s_;function _w(r){r_=r}function yw(r){s_=r}class vw extends ul{compare(e,t){const n=e.node.getPriority(),i=t.node.getPriority(),s=n.compareTo(i);return s===0?pr(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return Be.MIN}maxPost(){return new Be(er,new Pt("[PRIORITY-POST]",s_))}makePost(e,t){const n=r_(e);return new Be(t,new Pt("[PRIORITY-POST]",n))}toString(){return".priority"}}const ft=new vw;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xw=Math.log(2);class bw{constructor(e){const t=s=>parseInt(Math.log(s)/xw,10),n=s=>parseInt(Array(s+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=n(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Va=function(r,e,t,n){r.sort(e);const i=function(l,c){const u=c-l;let h,f;if(u===0)return null;if(u===1)return h=r[l],f=t?t(h):h,new Rt(f,h.node,Rt.BLACK,null,null);{const d=parseInt(u/2,10)+l,g=i(l,d),m=i(d+1,c);return h=r[d],f=t?t(h):h,new Rt(f,h.node,Rt.BLACK,g,m)}},s=function(l){let c=null,u=null,h=r.length;const f=function(g,m){const p=h-g,y=h;h-=g;const w=i(p+1,y),v=r[p],x=t?t(v):v;d(new Rt(x,v.node,m,null,w))},d=function(g){c?(c.left=g,c=g):(u=g,c=g)};for(let g=0;g<l.count;++g){const m=l.nextBitIsOne(),p=Math.pow(2,l.count-(g+1));m?f(p,Rt.BLACK):(f(p,Rt.BLACK),f(p,Rt.RED))}return u},o=new bw(r.length),a=s(o);return new Zt(n||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cc;const vr={};class Kn{static get Default(){return de(vr&&ft,"ChildrenNode.ts has not been loaded"),cc=cc||new Kn({".priority":vr},{".priority":ft}),cc}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Qi(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Zt?t:null}hasIndex(e){return Cn(this.indexSet_,e.toString())}addIndex(e,t){de(e!==Gr,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let i=!1;const s=t.getIterator(Be.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),n.push(o),o=s.getNext();let a;i?a=Va(n,e.getCompare()):a=vr;const l=e.toString(),c={...this.indexSet_};c[l]=e;const u={...this.indexes_};return u[l]=a,new Kn(u,c)}addToIndexes(e,t){const n=Fa(this.indexes_,(i,s)=>{const o=Qi(this.indexSet_,s);if(de(o,"Missing index implementation for "+s),i===vr)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(Be.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Va(a,o.getCompare())}else return vr;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new Be(e.name,a))),l.insert(e,e.node)}});return new Kn(n,this.indexSet_)}removeFromIndexes(e,t){const n=Fa(this.indexes_,i=>{if(i===vr)return i;{const s=t.get(e.name);return s?i.remove(new Be(e.name,s)):i}});return new Kn(n,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ls;class Ae{static get EMPTY_NODE(){return Ls||(Ls=new Ae(new Zt(ph),null,Kn.Default))}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&i_(this.priorityNode_),this.children_.isEmpty()&&de(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ls}updatePriority(e){return this.children_.isEmpty()?this:new Ae(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Ls:t}}getChild(e){const t=Fe(e);return t===null?this:this.getImmediateChild(t).getChild(rt(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(de(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const n=new Be(e,t);let i,s;t.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(n,this.children_)):(i=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(n,this.children_));const o=i.isEmpty()?Ls:this.priorityNode_;return new Ae(i,o,s)}}updateChild(e,t){const n=Fe(e);if(n===null)return t;{de(Fe(e)!==".priority"||xi(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(n).updateChild(rt(e),t);return this.updateImmediateChild(n,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,i=0,s=!0;if(this.forEachChild(ft,(o,a)=>{t[o]=a.val(e),n++,s&&Ae.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*n){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+n_(this.getPriority().val())+":"),this.forEachChild(ft,(t,n)=>{const i=n.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":Dg(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const i=this.resolveIndex_(n);if(i){const s=i.getPredecessorKey(new Be(e,t));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const n=t.minKey();return n&&n.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new Be(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const n=t.maxKey();return n&&n.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new Be(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,Be.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,Be.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Bo?-1:0}withIndex(e){if(e===Gr||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new Ae(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Gr||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const n=this.getIterator(ft),i=t.getIterator(ft);let s=n.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=n.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Gr?null:this.indexMap_.get(e.toString())}}Ae.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ww extends Ae{constructor(){super(new Zt(ph),Ae.EMPTY_NODE,Kn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return Ae.EMPTY_NODE}isEmpty(){return!1}}const Bo=new ww;Object.defineProperties(Be,{MIN:{value:new Be(ts,Ae.EMPTY_NODE)},MAX:{value:new Be(er,Bo)}});t_.__EMPTY_NODE=Ae.EMPTY_NODE;Pt.__childrenNodeConstructor=Ae;gw(Bo);yw(Bo);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sw=!0;function _t(r,e=null){if(r===null)return Ae.EMPTY_NODE;if(typeof r=="object"&&".priority"in r&&(e=r[".priority"]),de(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof r=="object"&&".value"in r&&r[".value"]!==null&&(r=r[".value"]),typeof r!="object"||".sv"in r){const t=r;return new Pt(t,_t(e))}if(!(r instanceof Array)&&Sw){const t=[];let n=!1;if(Gt(r,(o,a)=>{if(o.substring(0,1)!=="."){const l=_t(a);l.isEmpty()||(n=n||!l.getPriority().isEmpty(),t.push(new Be(o,l)))}}),t.length===0)return Ae.EMPTY_NODE;const s=Va(t,mw,o=>o.name,ph);if(n){const o=Va(t,ft.getCompare());return new Ae(s,_t(e),new Kn({".priority":o},{".priority":ft}))}else return new Ae(s,_t(e),Kn.Default)}else{let t=Ae.EMPTY_NODE;return Gt(r,(n,i)=>{if(Cn(r,n)&&n.substring(0,1)!=="."){const s=_t(i);(s.isLeafNode()||!s.isEmpty())&&(t=t.updateImmediateChild(n,s))}}),t.updatePriority(_t(e))}}_w(_t);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mw extends ul{constructor(e){super(),this.indexPath_=e,de(!Ue(e)&&Fe(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),i=this.extractChild(t.node),s=n.compareTo(i);return s===0?pr(e.name,t.name):s}makePost(e,t){const n=_t(e),i=Ae.EMPTY_NODE.updateChild(this.indexPath_,n);return new Be(t,i)}maxPost(){const e=Ae.EMPTY_NODE.updateChild(this.indexPath_,Bo);return new Be(er,e)}toString(){return vo(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ew extends ul{compare(e,t){const n=e.node.compareTo(t.node);return n===0?pr(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return Be.MIN}maxPost(){return Be.MAX}makePost(e,t){const n=_t(e);return new Be(t,n)}toString(){return".value"}}const Tw=new Ew;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function o_(r){return{type:"value",snapshotNode:r}}function ns(r,e){return{type:"child_added",snapshotNode:e,childName:r}}function xo(r,e){return{type:"child_removed",snapshotNode:e,childName:r}}function bo(r,e,t){return{type:"child_changed",snapshotNode:e,childName:r,oldSnap:t}}function Cw(r,e){return{type:"child_moved",snapshotNode:e,childName:r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(e){this.index_=e}updateChild(e,t,n,i,s,o){de(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(n.getChild(i))&&a.isEmpty()===n.isEmpty()||(o!=null&&(n.isEmpty()?e.hasChild(t)?o.trackChildChange(xo(t,a)):de(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ns(t,n)):o.trackChildChange(bo(t,n,a))),e.isLeafNode()&&n.isEmpty())?e:e.updateImmediateChild(t,n).withIndex(this.index_)}updateFullNode(e,t,n){return n!=null&&(e.isLeafNode()||e.forEachChild(ft,(i,s)=>{t.hasChild(i)||n.trackChildChange(xo(i,s))}),t.isLeafNode()||t.forEachChild(ft,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||n.trackChildChange(bo(i,s,o))}else n.trackChildChange(ns(i,s))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?Ae.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(e){this.indexedFilter_=new mh(e.getIndex()),this.index_=e.getIndex(),this.startPost_=wo.getStartPost_(e),this.endPost_=wo.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,i,s,o){return this.matches(new Be(t,n))||(n=Ae.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,i,s,o)}updateFullNode(e,t,n){t.isLeafNode()&&(t=Ae.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(Ae.EMPTY_NODE);const s=this;return t.forEachChild(ft,(o,a)=>{s.matches(new Be(o,a))||(i=i.updateImmediateChild(o,Ae.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aw{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const n=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?n<=0:n<0},this.withinEndPost=t=>{const n=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?n<=0:n<0},this.rangedFilter_=new wo(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,i,s,o){return this.rangedFilter_.matches(new Be(t,n))||(n=Ae.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,i,s,o):this.fullLimitUpdateChild_(e,t,n,s,o)}updateFullNode(e,t,n){let i;if(t.isLeafNode()||t.isEmpty())i=Ae.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=Ae.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(Ae.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,Ae.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,i,s){let o;if(this.reverse_){const h=this.index_.getCompare();o=(f,d)=>h(d,f)}else o=this.index_.getCompare();const a=e;de(a.numChildren()===this.limit_,"");const l=new Be(t,n),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(t)){const h=a.getImmediateChild(t);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===t||a.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const d=f==null?1:o(f,l);if(u&&!n.isEmpty()&&d>=0)return s!=null&&s.trackChildChange(bo(t,n,h)),a.updateImmediateChild(t,n);{s!=null&&s.trackChildChange(xo(t,h));const m=a.updateImmediateChild(t,Ae.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(s!=null&&s.trackChildChange(ns(f.name,f.node)),m.updateImmediateChild(f.name,f.node)):m}}else return n.isEmpty()?e:u&&o(c,l)>=0?(s!=null&&(s.trackChildChange(xo(c.name,c.node)),s.trackChildChange(ns(t,n))),a.updateImmediateChild(t,n).updateImmediateChild(c.name,Ae.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ft}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return de(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return de(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ts}hasEnd(){return this.endSet_}getIndexEndValue(){return de(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return de(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:er}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return de(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ft}copy(){const e=new gh;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Iw(r){return r.loadsAllData()?new mh(r.getIndex()):r.hasLimit()?new Aw(r):new wo(r)}function vd(r){const e={};if(r.isDefault())return e;let t;if(r.index_===ft?t="$priority":r.index_===Tw?t="$value":r.index_===Gr?t="$key":(de(r.index_ instanceof Mw,"Unrecognized index type!"),t=r.index_.toString()),e.orderBy=Ot(t),r.startSet_){const n=r.startAfterSet_?"startAfter":"startAt";e[n]=Ot(r.indexStartValue_),r.startNameSet_&&(e[n]+=","+Ot(r.indexStartName_))}if(r.endSet_){const n=r.endBeforeSet_?"endBefore":"endAt";e[n]=Ot(r.indexEndValue_),r.endNameSet_&&(e[n]+=","+Ot(r.indexEndName_))}return r.limitSet_&&(r.isViewFromLeft()?e.limitToFirst=r.limit_:e.limitToLast=r.limit_),e}function xd(r){const e={};if(r.startSet_&&(e.sp=r.indexStartValue_,r.startNameSet_&&(e.sn=r.indexStartName_),e.sin=!r.startAfterSet_),r.endSet_&&(e.ep=r.indexEndValue_,r.endNameSet_&&(e.en=r.indexEndName_),e.ein=!r.endBeforeSet_),r.limitSet_){e.l=r.limit_;let t=r.viewFrom_;t===""&&(r.isViewFromLeft()?t="l":t="r"),e.vf=t}return r.index_!==ft&&(e.i=r.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga extends Zg{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(de(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,n,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=i,this.log_=Uo("p:rest:"),this.listens_={}}listen(e,t,n,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=Ga.getListenId_(e,n),a={};this.listens_[o]=a;const l=vd(e._queryParams);this.restRequest_(s+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(s,h,!1,n),Qi(this.listens_,o)===a){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,t){const n=Ga.getListenId_(e,t);delete this.listens_[n]}get(e){const t=vd(e._queryParams),n=e._path.toString(),i=new Rn;return this.restRequest_(n+".json",t,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(n,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(t.auth=i.accessToken),s&&s.token&&(t.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+n0(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(n&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=mo(a.responseText)}catch{Jt("Failed to parse JSON response for "+o+": "+a.responseText)}n(null,l)}else a.status!==401&&a.status!==404&&Jt("Got unsuccessful REST response for "+o+" Status: "+a.status),n(a.status);n=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(){this.rootNode_=Ae.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wa(){return{value:null,children:new Map}}function xs(r,e,t){if(Ue(e))r.value=t,r.children.clear();else if(r.value!==null)r.value=r.value.updateChild(e,t);else{const n=Fe(e);r.children.has(n)||r.children.set(n,Wa());const i=r.children.get(n);e=rt(e),xs(i,e,t)}}function Cu(r,e){if(Ue(e))return r.value=null,r.children.clear(),!0;if(r.value!==null){if(r.value.isLeafNode())return!1;{const t=r.value;return r.value=null,t.forEachChild(ft,(n,i)=>{xs(r,new nt(n),i)}),Cu(r,e)}}else if(r.children.size>0){const t=Fe(e);return e=rt(e),r.children.has(t)&&Cu(r.children.get(t),e)&&r.children.delete(t),r.children.size===0}else return!0}function Au(r,e,t){r.value!==null?t(e,r.value):Rw(r,(n,i)=>{const s=new nt(e.toString()+"/"+n);Au(i,s,t)})}function Rw(r,e){r.children.forEach((t,n)=>{e(n,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dw{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&Gt(this.last_,(n,i)=>{t[n]=t[n]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd=10*1e3,Lw=30*1e3,Nw=5*60*1e3;class Ow{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Dw(e);const n=bd+(Lw-bd)*Math.random();eo(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;Gt(e,(i,s)=>{s>0&&Cn(this.statsToReport_,i)&&(t[i]=s,n=!0)}),n&&this.server_.reportStats(t),eo(this.reportStats_.bind(this),Math.floor(Math.random()*2*Nw))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Mn;(function(r){r[r.OVERWRITE=0]="OVERWRITE",r[r.MERGE=1]="MERGE",r[r.ACK_USER_WRITE=2]="ACK_USER_WRITE",r[r.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Mn||(Mn={}));function a_(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function _h(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function yh(r){return{fromUser:!1,fromServer:!0,queryId:r,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=Mn.ACK_USER_WRITE,this.source=a_()}operationForChild(e){if(Ue(this.path)){if(this.affectedTree.value!=null)return de(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new nt(e));return new ja(Ye(),t,this.revert)}}else return de(Fe(this.path)===e,"operationForChild called for unrelated child."),new ja(rt(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,t){this.source=e,this.path=t,this.type=Mn.LISTEN_COMPLETE}operationForChild(e){return Ue(this.path)?new So(this.source,Ye()):new So(this.source,rt(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=Mn.OVERWRITE}operationForChild(e){return Ue(this.path)?new tr(this.source,Ye(),this.snap.getImmediateChild(e)):new tr(this.source,rt(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=Mn.MERGE}operationForChild(e){if(Ue(this.path)){const t=this.children.subtree(new nt(e));return t.isEmpty()?null:t.value?new tr(this.source,Ye(),t.value):new Mo(this.source,Ye(),t)}else return de(Fe(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Mo(this.source,rt(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(Ue(e))return this.isFullyInitialized()&&!this.filtered_;const t=Fe(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fw{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function kw(r,e,t,n){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&r.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(Cw(o.childName,o.snapshotNode))}),Ns(r,i,"child_removed",e,n,t),Ns(r,i,"child_added",e,n,t),Ns(r,i,"child_moved",s,n,t),Ns(r,i,"child_changed",e,n,t),Ns(r,i,"value",e,n,t),i}function Ns(r,e,t,n,i,s){const o=n.filter(a=>a.type===t);o.sort((a,l)=>Bw(r,a,l)),o.forEach(a=>{const l=Uw(r,a,s);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,r.query_))})})}function Uw(r,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,r.index_)),e}function Bw(r,e,t){if(e.childName==null||t.childName==null)throw ys("Should only compare child_ events.");const n=new Be(e.childName,e.snapshotNode),i=new Be(t.childName,t.snapshotNode);return r.index_.compare(n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hl(r,e){return{eventCache:r,serverCache:e}}function to(r,e,t,n){return hl(new nr(e,t,n),r.serverCache)}function l_(r,e,t,n){return hl(r.eventCache,new nr(e,t,n))}function Iu(r){return r.eventCache.isFullyInitialized()?r.eventCache.getNode():null}function ir(r){return r.serverCache.isFullyInitialized()?r.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let uc;const zw=()=>(uc||(uc=new Zt(Mb)),uc);class lt{static fromObject(e){let t=new lt(null);return Gt(e,(n,i)=>{t=t.set(new nt(n),i)}),t}constructor(e,t=zw()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:Ye(),value:this.value};if(Ue(e))return null;{const n=Fe(e),i=this.children.get(n);if(i!==null){const s=i.findRootMostMatchingPathAndValue(rt(e),t);return s!=null?{path:yt(new nt(n),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(Ue(e))return this;{const t=Fe(e),n=this.children.get(t);return n!==null?n.subtree(rt(e)):new lt(null)}}set(e,t){if(Ue(e))return new lt(t,this.children);{const n=Fe(e),s=(this.children.get(n)||new lt(null)).set(rt(e),t),o=this.children.insert(n,s);return new lt(this.value,o)}}remove(e){if(Ue(e))return this.children.isEmpty()?new lt(null):new lt(null,this.children);{const t=Fe(e),n=this.children.get(t);if(n){const i=n.remove(rt(e));let s;return i.isEmpty()?s=this.children.remove(t):s=this.children.insert(t,i),this.value===null&&s.isEmpty()?new lt(null):new lt(this.value,s)}else return this}}get(e){if(Ue(e))return this.value;{const t=Fe(e),n=this.children.get(t);return n?n.get(rt(e)):null}}setTree(e,t){if(Ue(e))return t;{const n=Fe(e),s=(this.children.get(n)||new lt(null)).setTree(rt(e),t);let o;return s.isEmpty()?o=this.children.remove(n):o=this.children.insert(n,s),new lt(this.value,o)}}fold(e){return this.fold_(Ye(),e)}fold_(e,t){const n={};return this.children.inorderTraversal((i,s)=>{n[i]=s.fold_(yt(e,i),t)}),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,Ye(),t)}findOnPath_(e,t,n){const i=this.value?n(t,this.value):!1;if(i)return i;if(Ue(e))return null;{const s=Fe(e),o=this.children.get(s);return o?o.findOnPath_(rt(e),yt(t,s),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,Ye(),t)}foreachOnPath_(e,t,n){if(Ue(e))return this;{this.value&&n(t,this.value);const i=Fe(e),s=this.children.get(i);return s?s.foreachOnPath_(rt(e),yt(t,i),n):new lt(null)}}foreach(e){this.foreach_(Ye(),e)}foreach_(e,t){this.children.inorderTraversal((n,i)=>{i.foreach_(yt(e,n),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,n)=>{n.value&&e(t,n.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e){this.writeTree_=e}static empty(){return new En(new lt(null))}}function no(r,e,t){if(Ue(e))return new En(new lt(t));{const n=r.writeTree_.findRootMostValueAndPath(e);if(n!=null){const i=n.path;let s=n.value;const o=Kt(i,e);return s=s.updateChild(o,t),new En(r.writeTree_.set(i,s))}else{const i=new lt(t),s=r.writeTree_.setTree(e,i);return new En(s)}}}function wd(r,e,t){let n=r;return Gt(t,(i,s)=>{n=no(n,yt(e,i),s)}),n}function Sd(r,e){if(Ue(e))return En.empty();{const t=r.writeTree_.setTree(e,new lt(null));return new En(t)}}function Pu(r,e){return mr(r,e)!=null}function mr(r,e){const t=r.writeTree_.findRootMostValueAndPath(e);return t!=null?r.writeTree_.get(t.path).getChild(Kt(t.path,e)):null}function Md(r){const e=[],t=r.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(ft,(n,i)=>{e.push(new Be(n,i))}):r.writeTree_.children.inorderTraversal((n,i)=>{i.value!=null&&e.push(new Be(n,i.value))}),e}function yi(r,e){if(Ue(e))return r;{const t=mr(r,e);return t!=null?new En(new lt(t)):new En(r.writeTree_.subtree(e))}}function Ru(r){return r.writeTree_.isEmpty()}function is(r,e){return c_(Ye(),r.writeTree_,e)}function c_(r,e,t){if(e.value!=null)return t.updateChild(r,e.value);{let n=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(de(s.value!==null,"Priority writes must always be leaf nodes"),n=s.value):t=c_(yt(r,i),s,t)}),!t.getChild(r).isEmpty()&&n!==null&&(t=t.updateChild(yt(r,".priority"),n)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(r,e){return d_(e,r)}function Hw(r,e,t,n,i){de(n>r.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),r.allWrites.push({path:e,snap:t,writeId:n,visible:i}),i&&(r.visibleWrites=no(r.visibleWrites,e,t)),r.lastWriteId=n}function Vw(r,e){for(let t=0;t<r.allWrites.length;t++){const n=r.allWrites[t];if(n.writeId===e)return n}return null}function Gw(r,e){const t=r.allWrites.findIndex(a=>a.writeId===e);de(t>=0,"removeWrite called with nonexistent writeId.");const n=r.allWrites[t];r.allWrites.splice(t,1);let i=n.visible,s=!1,o=r.allWrites.length-1;for(;i&&o>=0;){const a=r.allWrites[o];a.visible&&(o>=t&&Ww(a,n.path)?i=!1:dn(n.path,a.path)&&(s=!0)),o--}if(i){if(s)return jw(r),!0;if(n.snap)r.visibleWrites=Sd(r.visibleWrites,n.path);else{const a=n.children;Gt(a,l=>{r.visibleWrites=Sd(r.visibleWrites,yt(n.path,l))})}return!0}else return!1}function Ww(r,e){if(r.snap)return dn(r.path,e);for(const t in r.children)if(r.children.hasOwnProperty(t)&&dn(yt(r.path,t),e))return!0;return!1}function jw(r){r.visibleWrites=u_(r.allWrites,qw,Ye()),r.allWrites.length>0?r.lastWriteId=r.allWrites[r.allWrites.length-1].writeId:r.lastWriteId=-1}function qw(r){return r.visible}function u_(r,e,t){let n=En.empty();for(let i=0;i<r.length;++i){const s=r[i];if(e(s)){const o=s.path;let a;if(s.snap)dn(t,o)?(a=Kt(t,o),n=no(n,a,s.snap)):dn(o,t)&&(a=Kt(o,t),n=no(n,Ye(),s.snap.getChild(a)));else if(s.children){if(dn(t,o))a=Kt(t,o),n=wd(n,a,s.children);else if(dn(o,t))if(a=Kt(o,t),Ue(a))n=wd(n,Ye(),s.children);else{const l=Qi(s.children,Fe(a));if(l){const c=l.getChild(rt(a));n=no(n,Ye(),c)}}}else throw ys("WriteRecord should have .snap or .children")}}return n}function h_(r,e,t,n,i){if(!n&&!i){const s=mr(r.visibleWrites,e);if(s!=null)return s;{const o=yi(r.visibleWrites,e);if(Ru(o))return t;if(t==null&&!Pu(o,Ye()))return null;{const a=t||Ae.EMPTY_NODE;return is(o,a)}}}else{const s=yi(r.visibleWrites,e);if(!i&&Ru(s))return t;if(!i&&t==null&&!Pu(s,Ye()))return null;{const o=function(c){return(c.visible||i)&&(!n||!~n.indexOf(c.writeId))&&(dn(c.path,e)||dn(e,c.path))},a=u_(r.allWrites,o,e),l=t||Ae.EMPTY_NODE;return is(a,l)}}}function $w(r,e,t){let n=Ae.EMPTY_NODE;const i=mr(r.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(ft,(s,o)=>{n=n.updateImmediateChild(s,o)}),n;if(t){const s=yi(r.visibleWrites,e);return t.forEachChild(ft,(o,a)=>{const l=is(yi(s,new nt(o)),a);n=n.updateImmediateChild(o,l)}),Md(s).forEach(o=>{n=n.updateImmediateChild(o.name,o.node)}),n}else{const s=yi(r.visibleWrites,e);return Md(s).forEach(o=>{n=n.updateImmediateChild(o.name,o.node)}),n}}function Xw(r,e,t,n,i){de(n||i,"Either existingEventSnap or existingServerSnap must exist");const s=yt(e,t);if(Pu(r.visibleWrites,s))return null;{const o=yi(r.visibleWrites,s);return Ru(o)?i.getChild(t):is(o,i.getChild(t))}}function Yw(r,e,t,n){const i=yt(e,t),s=mr(r.visibleWrites,i);if(s!=null)return s;if(n.isCompleteForChild(t)){const o=yi(r.visibleWrites,i);return is(o,n.getNode().getImmediateChild(t))}else return null}function Kw(r,e){return mr(r.visibleWrites,e)}function Zw(r,e,t,n,i,s,o){let a;const l=yi(r.visibleWrites,e),c=mr(l,Ye());if(c!=null)a=c;else if(t!=null)a=is(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),f=s?a.getReverseIteratorFrom(n,o):a.getIteratorFrom(n,o);let d=f.getNext();for(;d&&u.length<i;)h(d,n)!==0&&u.push(d),d=f.getNext();return u}else return[]}function Jw(){return{visibleWrites:En.empty(),allWrites:[],lastWriteId:-1}}function qa(r,e,t,n){return h_(r.writeTree,r.treePath,e,t,n)}function xh(r,e){return $w(r.writeTree,r.treePath,e)}function Ed(r,e,t,n){return Xw(r.writeTree,r.treePath,e,t,n)}function $a(r,e){return Kw(r.writeTree,yt(r.treePath,e))}function Qw(r,e,t,n,i,s){return Zw(r.writeTree,r.treePath,e,t,n,i,s)}function bh(r,e,t){return Yw(r.writeTree,r.treePath,e,t)}function f_(r,e){return d_(yt(r.treePath,e),r.writeTree)}function d_(r,e){return{treePath:r,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;de(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),de(n!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(n);if(i){const s=i.type;if(t==="child_added"&&s==="child_removed")this.changeMap.set(n,bo(n,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&s==="child_added")this.changeMap.delete(n);else if(t==="child_removed"&&s==="child_changed")this.changeMap.set(n,xo(n,i.oldSnap));else if(t==="child_changed"&&s==="child_added")this.changeMap.set(n,ns(n,e.snapshotNode));else if(t==="child_changed"&&s==="child_changed")this.changeMap.set(n,bo(n,e.snapshotNode,i.oldSnap));else throw ys("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}}const p_=new tS;class wh{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const n=this.optCompleteServerCache_!=null?new nr(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return bh(this.writes_,e,n)}}getChildAfterChild(e,t,n){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ir(this.viewCache_),s=Qw(this.writes_,i,t,1,n,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nS(r){return{filter:r}}function iS(r,e){de(e.eventCache.getNode().isIndexed(r.filter.getIndex()),"Event snap not indexed"),de(e.serverCache.getNode().isIndexed(r.filter.getIndex()),"Server snap not indexed")}function rS(r,e,t,n,i){const s=new eS;let o,a;if(t.type===Mn.OVERWRITE){const c=t;c.source.fromUser?o=Du(r,e,c.path,c.snap,n,i,s):(de(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!Ue(c.path),o=Xa(r,e,c.path,c.snap,n,i,a,s))}else if(t.type===Mn.MERGE){const c=t;c.source.fromUser?o=oS(r,e,c.path,c.children,n,i,s):(de(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Lu(r,e,c.path,c.children,n,i,a,s))}else if(t.type===Mn.ACK_USER_WRITE){const c=t;c.revert?o=cS(r,e,c.path,n,i,s):o=aS(r,e,c.path,c.affectedTree,n,i,s)}else if(t.type===Mn.LISTEN_COMPLETE)o=lS(r,e,t.path,n,s);else throw ys("Unknown operation type: "+t.type);const l=s.getChanges();return sS(e,o,l),{viewCache:o,changes:l}}function sS(r,e,t){const n=e.eventCache;if(n.isFullyInitialized()){const i=n.getNode().isLeafNode()||n.getNode().isEmpty(),s=Iu(r);(t.length>0||!r.eventCache.isFullyInitialized()||i&&!n.getNode().equals(s)||!n.getNode().getPriority().equals(s.getPriority()))&&t.push(o_(Iu(e)))}}function m_(r,e,t,n,i,s){const o=e.eventCache;if($a(n,t)!=null)return e;{let a,l;if(Ue(t))if(de(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=ir(e),u=c instanceof Ae?c:Ae.EMPTY_NODE,h=xh(n,u);a=r.filter.updateFullNode(e.eventCache.getNode(),h,s)}else{const c=qa(n,ir(e));a=r.filter.updateFullNode(e.eventCache.getNode(),c,s)}else{const c=Fe(t);if(c===".priority"){de(xi(t)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const h=Ed(n,t,u,l);h!=null?a=r.filter.updatePriority(u,h):a=o.getNode()}else{const u=rt(t);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const f=Ed(n,t,o.getNode(),l);f!=null?h=o.getNode().getImmediateChild(c).updateChild(u,f):h=o.getNode().getImmediateChild(c)}else h=bh(n,c,e.serverCache);h!=null?a=r.filter.updateChild(o.getNode(),c,h,u,i,s):a=o.getNode()}}return to(e,a,o.isFullyInitialized()||Ue(t),r.filter.filtersNodes())}}function Xa(r,e,t,n,i,s,o,a){const l=e.serverCache;let c;const u=o?r.filter:r.filter.getIndexedFilter();if(Ue(t))c=u.updateFullNode(l.getNode(),n,null);else if(u.filtersNodes()&&!l.isFiltered()){const d=l.getNode().updateChild(t,n);c=u.updateFullNode(l.getNode(),d,null)}else{const d=Fe(t);if(!l.isCompleteForPath(t)&&xi(t)>1)return e;const g=rt(t),p=l.getNode().getImmediateChild(d).updateChild(g,n);d===".priority"?c=u.updatePriority(l.getNode(),p):c=u.updateChild(l.getNode(),d,p,g,p_,null)}const h=l_(e,c,l.isFullyInitialized()||Ue(t),u.filtersNodes()),f=new wh(i,h,s);return m_(r,h,t,i,f,a)}function Du(r,e,t,n,i,s,o){const a=e.eventCache;let l,c;const u=new wh(i,e,s);if(Ue(t))c=r.filter.updateFullNode(e.eventCache.getNode(),n,o),l=to(e,c,!0,r.filter.filtersNodes());else{const h=Fe(t);if(h===".priority")c=r.filter.updatePriority(e.eventCache.getNode(),n),l=to(e,c,a.isFullyInitialized(),a.isFiltered());else{const f=rt(t),d=a.getNode().getImmediateChild(h);let g;if(Ue(f))g=n;else{const m=u.getCompleteChild(h);m!=null?hh(f)===".priority"&&m.getChild(Qg(f)).isEmpty()?g=m:g=m.updateChild(f,n):g=Ae.EMPTY_NODE}if(d.equals(g))l=e;else{const m=r.filter.updateChild(a.getNode(),h,g,f,u,o);l=to(e,m,a.isFullyInitialized(),r.filter.filtersNodes())}}}return l}function Td(r,e){return r.eventCache.isCompleteForChild(e)}function oS(r,e,t,n,i,s,o){let a=e;return n.foreach((l,c)=>{const u=yt(t,l);Td(e,Fe(u))&&(a=Du(r,a,u,c,i,s,o))}),n.foreach((l,c)=>{const u=yt(t,l);Td(e,Fe(u))||(a=Du(r,a,u,c,i,s,o))}),a}function Cd(r,e,t){return t.foreach((n,i)=>{e=e.updateChild(n,i)}),e}function Lu(r,e,t,n,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;Ue(t)?c=n:c=new lt(null).setTree(t,n);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,f)=>{if(u.hasChild(h)){const d=e.serverCache.getNode().getImmediateChild(h),g=Cd(r,d,f);l=Xa(r,l,new nt(h),g,i,s,o,a)}}),c.children.inorderTraversal((h,f)=>{const d=!e.serverCache.isCompleteForChild(h)&&f.value===null;if(!u.hasChild(h)&&!d){const g=e.serverCache.getNode().getImmediateChild(h),m=Cd(r,g,f);l=Xa(r,l,new nt(h),m,i,s,o,a)}}),l}function aS(r,e,t,n,i,s,o){if($a(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(n.value!=null){if(Ue(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Xa(r,e,t,l.getNode().getChild(t),i,s,a,o);if(Ue(t)){let c=new lt(null);return l.getNode().forEachChild(Gr,(u,h)=>{c=c.set(new nt(u),h)}),Lu(r,e,t,c,i,s,a,o)}else return e}else{let c=new lt(null);return n.foreach((u,h)=>{const f=yt(t,u);l.isCompleteForPath(f)&&(c=c.set(u,l.getNode().getChild(f)))}),Lu(r,e,t,c,i,s,a,o)}}function lS(r,e,t,n,i){const s=e.serverCache,o=l_(e,s.getNode(),s.isFullyInitialized()||Ue(t),s.isFiltered());return m_(r,o,t,n,p_,i)}function cS(r,e,t,n,i,s){let o;if($a(n,t)!=null)return e;{const a=new wh(n,e,i),l=e.eventCache.getNode();let c;if(Ue(t)||Fe(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=qa(n,ir(e));else{const h=e.serverCache.getNode();de(h instanceof Ae,"serverChildren would be complete if leaf node"),u=xh(n,h)}u=u,c=r.filter.updateFullNode(l,u,s)}else{const u=Fe(t);let h=bh(n,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=r.filter.updateChild(l,u,h,rt(t),a,s):e.eventCache.getNode().hasChild(u)?c=r.filter.updateChild(l,u,Ae.EMPTY_NODE,rt(t),a,s):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=qa(n,ir(e)),o.isLeafNode()&&(c=r.filter.updateFullNode(c,o,s)))}return o=e.serverCache.isFullyInitialized()||$a(n,Ye())!=null,to(e,c,o,r.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uS{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,i=new mh(n.getIndex()),s=Iw(n);this.processor_=nS(s);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(Ae.EMPTY_NODE,o.getNode(),null),c=s.updateFullNode(Ae.EMPTY_NODE,a.getNode(),null),u=new nr(l,o.isFullyInitialized(),i.filtersNodes()),h=new nr(c,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=hl(h,u),this.eventGenerator_=new Fw(this.query_)}get query(){return this.query_}}function hS(r){return r.viewCache_.serverCache.getNode()}function fS(r,e){const t=ir(r.viewCache_);return t&&(r.query._queryParams.loadsAllData()||!Ue(e)&&!t.getImmediateChild(Fe(e)).isEmpty())?t.getChild(e):null}function Ad(r){return r.eventRegistrations_.length===0}function dS(r,e){r.eventRegistrations_.push(e)}function Id(r,e,t){const n=[];if(t){de(e==null,"A cancel should cancel all event registrations.");const i=r.query._path;r.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(t,i);o&&n.push(o)})}if(e){let i=[];for(let s=0;s<r.eventRegistrations_.length;++s){const o=r.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(r.eventRegistrations_.slice(s+1));break}}r.eventRegistrations_=i}else r.eventRegistrations_=[];return n}function Pd(r,e,t,n){e.type===Mn.MERGE&&e.source.queryId!==null&&(de(ir(r.viewCache_),"We should always have a full cache before handling merges"),de(Iu(r.viewCache_),"Missing event cache, even though we have a server cache"));const i=r.viewCache_,s=rS(r.processor_,i,e,t,n);return iS(r.processor_,s.viewCache),de(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),r.viewCache_=s.viewCache,g_(r,s.changes,s.viewCache.eventCache.getNode(),null)}function pS(r,e){const t=r.viewCache_.eventCache,n=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(ft,(s,o)=>{n.push(ns(s,o))}),t.isFullyInitialized()&&n.push(o_(t.getNode())),g_(r,n,t.getNode(),e)}function g_(r,e,t,n){const i=n?[n]:r.eventRegistrations_;return kw(r.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ya;class mS{constructor(){this.views=new Map}}function gS(r){de(!Ya,"__referenceConstructor has already been defined"),Ya=r}function _S(){return de(Ya,"Reference.ts has not been loaded"),Ya}function yS(r){return r.views.size===0}function Sh(r,e,t,n){const i=e.source.queryId;if(i!==null){const s=r.views.get(i);return de(s!=null,"SyncTree gave us an op for an invalid query."),Pd(s,e,t,n)}else{let s=[];for(const o of r.views.values())s=s.concat(Pd(o,e,t,n));return s}}function vS(r,e,t,n,i){const s=e._queryIdentifier,o=r.views.get(s);if(!o){let a=qa(t,i?n:null),l=!1;a?l=!0:n instanceof Ae?(a=xh(t,n),l=!1):(a=Ae.EMPTY_NODE,l=!1);const c=hl(new nr(a,l,!1),new nr(n,i,!1));return new uS(e,c)}return o}function xS(r,e,t,n,i,s){const o=vS(r,e,n,i,s);return r.views.has(e._queryIdentifier)||r.views.set(e._queryIdentifier,o),dS(o,t),pS(o,t)}function bS(r,e,t,n){const i=e._queryIdentifier,s=[];let o=[];const a=bi(r);if(i==="default")for(const[l,c]of r.views.entries())o=o.concat(Id(c,t,n)),Ad(c)&&(r.views.delete(l),c.query._queryParams.loadsAllData()||s.push(c.query));else{const l=r.views.get(i);l&&(o=o.concat(Id(l,t,n)),Ad(l)&&(r.views.delete(i),l.query._queryParams.loadsAllData()||s.push(l.query)))}return a&&!bi(r)&&s.push(new(_S())(e._repo,e._path)),{removed:s,events:o}}function __(r){const e=[];for(const t of r.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Wr(r,e){let t=null;for(const n of r.views.values())t=t||fS(n,e);return t}function y_(r,e){if(e._queryParams.loadsAllData())return fl(r);{const n=e._queryIdentifier;return r.views.get(n)}}function v_(r,e){return y_(r,e)!=null}function bi(r){return fl(r)!=null}function fl(r){for(const e of r.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ka;function wS(r){de(!Ka,"__referenceConstructor has already been defined"),Ka=r}function SS(){return de(Ka,"Reference.ts has not been loaded"),Ka}let MS=1;class Rd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new lt(null),this.pendingWriteTree_=Jw(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Mh(r,e,t,n,i){return Hw(r.pendingWriteTree_,e,t,n,i),i?zo(r,new tr(a_(),e,t)):[]}function Gi(r,e,t=!1){const n=Vw(r.pendingWriteTree_,e);if(Gw(r.pendingWriteTree_,e)){let s=new lt(null);return n.snap!=null?s=s.set(Ye(),!0):Gt(n.children,o=>{s=s.set(new nt(o),!0)}),zo(r,new ja(n.path,s,t))}else return[]}function dl(r,e,t){return zo(r,new tr(_h(),e,t))}function ES(r,e,t){const n=lt.fromObject(t);return zo(r,new Mo(_h(),e,n))}function TS(r,e){return zo(r,new So(_h(),e))}function CS(r,e,t){const n=Eh(r,t);if(n){const i=Th(n),s=i.path,o=i.queryId,a=Kt(s,e),l=new So(yh(o),a);return Ch(r,s,l)}else return[]}function Nu(r,e,t,n,i=!1){const s=e._path,o=r.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||v_(o,e))){const l=bS(o,e,t,n);yS(o)&&(r.syncPointTree_=r.syncPointTree_.remove(s));const c=l.removed;if(a=l.events,!i){const u=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,h=r.syncPointTree_.findOnPath(s,(f,d)=>bi(d));if(u&&!h){const f=r.syncPointTree_.subtree(s);if(!f.isEmpty()){const d=PS(f);for(let g=0;g<d.length;++g){const m=d[g],p=m.query,y=w_(r,m);r.listenProvider_.startListening(io(p),Za(r,p),y.hashFn,y.onComplete)}}}!h&&c.length>0&&!n&&(u?r.listenProvider_.stopListening(io(e),null):c.forEach(f=>{const d=r.queryToTagMap.get(ml(f));r.listenProvider_.stopListening(io(f),d)}))}RS(r,c)}return a}function AS(r,e,t,n){const i=Eh(r,n);if(i!=null){const s=Th(i),o=s.path,a=s.queryId,l=Kt(o,e),c=new tr(yh(a),l,t);return Ch(r,o,c)}else return[]}function IS(r,e,t,n){const i=Eh(r,n);if(i){const s=Th(i),o=s.path,a=s.queryId,l=Kt(o,e),c=lt.fromObject(t),u=new Mo(yh(a),l,c);return Ch(r,o,u)}else return[]}function Dd(r,e,t,n=!1){const i=e._path;let s=null,o=!1;r.syncPointTree_.foreachOnPath(i,(f,d)=>{const g=Kt(f,i);s=s||Wr(d,g),o=o||bi(d)});let a=r.syncPointTree_.get(i);a?(o=o||bi(a),s=s||Wr(a,Ye())):(a=new mS,r.syncPointTree_=r.syncPointTree_.set(i,a));let l;s!=null?l=!0:(l=!1,s=Ae.EMPTY_NODE,r.syncPointTree_.subtree(i).foreachChild((d,g)=>{const m=Wr(g,Ye());m&&(s=s.updateImmediateChild(d,m))}));const c=v_(a,e);if(!c&&!e._queryParams.loadsAllData()){const f=ml(e);de(!r.queryToTagMap.has(f),"View does not exist, but we have a tag");const d=DS();r.queryToTagMap.set(f,d),r.tagToQueryMap.set(d,f)}const u=vh(r.pendingWriteTree_,i);let h=xS(a,e,t,u,s,l);if(!c&&!o&&!n){const f=y_(a,e);h=h.concat(LS(r,e,f))}return h}function pl(r,e,t){const i=r.pendingWriteTree_,s=r.syncPointTree_.findOnPath(e,(o,a)=>{const l=Kt(o,e),c=Wr(a,l);if(c)return c});return h_(i,e,s,t,!0)}function zo(r,e){return x_(e,r.syncPointTree_,null,vh(r.pendingWriteTree_,Ye()))}function x_(r,e,t,n){if(Ue(r.path))return b_(r,e,t,n);{const i=e.get(Ye());t==null&&i!=null&&(t=Wr(i,Ye()));let s=[];const o=Fe(r.path),a=r.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,u=f_(n,o);s=s.concat(x_(a,l,c,u))}return i&&(s=s.concat(Sh(i,r,n,t))),s}}function b_(r,e,t,n){const i=e.get(Ye());t==null&&i!=null&&(t=Wr(i,Ye()));let s=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=f_(n,o),u=r.operationForChild(o);u&&(s=s.concat(b_(u,a,l,c)))}),i&&(s=s.concat(Sh(i,r,n,t))),s}function w_(r,e){const t=e.query,n=Za(r,t);return{hashFn:()=>(hS(e)||Ae.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return n?CS(r,t._path,n):TS(r,t._path);{const s=Cb(i,t);return Nu(r,t,null,s)}}}}function Za(r,e){const t=ml(e);return r.queryToTagMap.get(t)}function ml(r){return r._path.toString()+"$"+r._queryIdentifier}function Eh(r,e){return r.tagToQueryMap.get(e)}function Th(r){const e=r.indexOf("$");return de(e!==-1&&e<r.length-1,"Bad queryKey."),{queryId:r.substr(e+1),path:new nt(r.substr(0,e))}}function Ch(r,e,t){const n=r.syncPointTree_.get(e);de(n,"Missing sync point for query tag that we're tracking");const i=vh(r.pendingWriteTree_,e);return Sh(n,t,i,null)}function PS(r){return r.fold((e,t,n)=>{if(t&&bi(t))return[fl(t)];{let i=[];return t&&(i=__(t)),Gt(n,(s,o)=>{i=i.concat(o)}),i}})}function io(r){return r._queryParams.loadsAllData()&&!r._queryParams.isDefault()?new(SS())(r._repo,r._path):r}function RS(r,e){for(let t=0;t<e.length;++t){const n=e[t];if(!n._queryParams.loadsAllData()){const i=ml(n),s=r.queryToTagMap.get(i);r.queryToTagMap.delete(i),r.tagToQueryMap.delete(s)}}}function DS(){return MS++}function LS(r,e,t){const n=e._path,i=Za(r,e),s=w_(r,t),o=r.listenProvider_.startListening(io(e),i,s.hashFn,s.onComplete),a=r.syncPointTree_.subtree(n);if(i)de(!bi(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!Ue(c)&&u&&bi(u))return[fl(u).query];{let f=[];return u&&(f=f.concat(__(u).map(d=>d.query))),Gt(h,(d,g)=>{f=f.concat(g)}),f}});for(let c=0;c<l.length;++c){const u=l[c];r.listenProvider_.stopListening(io(u),Za(r,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Ah(t)}node(){return this.node_}}class Ih{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=yt(this.path_,e);return new Ih(this.syncTree_,t)}node(){return pl(this.syncTree_,this.path_)}}const NS=function(r){return r=r||{},r.timestamp=r.timestamp||new Date().getTime(),r},Ld=function(r,e,t){if(!r||typeof r!="object")return r;if(de(".sv"in r,"Unexpected leaf node or priority contents"),typeof r[".sv"]=="string")return OS(r[".sv"],e,t);if(typeof r[".sv"]=="object")return FS(r[".sv"],e);de(!1,"Unexpected server value: "+JSON.stringify(r,null,2))},OS=function(r,e,t){switch(r){case"timestamp":return t.timestamp;default:de(!1,"Unexpected server value: "+r)}},FS=function(r,e,t){r.hasOwnProperty("increment")||de(!1,"Unexpected server value: "+JSON.stringify(r,null,2));const n=r.increment;typeof n!="number"&&de(!1,"Unexpected increment value: "+n);const i=e.node();if(de(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return n;const o=i.getValue();return typeof o!="number"?n:o+n},kS=function(r,e,t,n){return Rh(e,new Ih(t,r),n)},Ph=function(r,e,t){return Rh(r,new Ah(e),t)};function Rh(r,e,t){const n=r.getPriority().val(),i=Ld(n,e.getImmediateChild(".priority"),t);let s;if(r.isLeafNode()){const o=r,a=Ld(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new Pt(a,_t(i)):r}else{const o=r;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new Pt(i))),o.forEachChild(ft,(a,l)=>{const c=Rh(l,e.getImmediateChild(a),t);c!==l&&(s=s.updateImmediateChild(a,c))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(e="",t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}}function gl(r,e){let t=e instanceof nt?e:new nt(e),n=r,i=Fe(t);for(;i!==null;){const s=Qi(n.node.children,i)||{children:{},childCount:0};n=new Dh(i,n,s),t=rt(t),i=Fe(t)}return n}function gr(r){return r.node.value}function Lh(r,e){r.node.value=e,Ou(r)}function S_(r){return r.node.childCount>0}function US(r){return gr(r)===void 0&&!S_(r)}function _l(r,e){Gt(r.node.children,(t,n)=>{e(new Dh(t,r,n))})}function M_(r,e,t,n){t&&e(r),_l(r,i=>{M_(i,e,!0)})}function BS(r,e,t){let n=r.parent;for(;n!==null;){if(e(n))return!0;n=n.parent}return!1}function Ho(r){return new nt(r.parent===null?r.name:Ho(r.parent)+"/"+r.name)}function Ou(r){r.parent!==null&&zS(r.parent,r.name,r)}function zS(r,e,t){const n=US(t),i=Cn(r.node.children,e);n&&i?(delete r.node.children[e],r.node.childCount--,Ou(r)):!n&&!i&&(r.node.children[e]=t.node,r.node.childCount++,Ou(r))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HS=/[\[\].#$\/\u0000-\u001F\u007F]/,VS=/[\[\].#$\u0000-\u001F\u007F]/,hc=10*1024*1024,Nh=function(r){return typeof r=="string"&&r.length!==0&&!HS.test(r)},E_=function(r){return typeof r=="string"&&r.length!==0&&!VS.test(r)},GS=function(r){return r&&(r=r.replace(/^\/*\.info(\/|$)/,"/")),E_(r)},Oh=function(r){return r===null||typeof r=="string"||typeof r=="number"&&!cl(r)||r&&typeof r=="object"&&Cn(r,".sv")},Ja=function(r,e,t,n){n&&e===void 0||Vo(es(r,"value"),e,t)},Vo=function(r,e,t){const n=t instanceof nt?new aw(t,r):t;if(e===void 0)throw new Error(r+"contains undefined "+Ui(n));if(typeof e=="function")throw new Error(r+"contains a function "+Ui(n)+" with contents = "+e.toString());if(cl(e))throw new Error(r+"contains "+e.toString()+" "+Ui(n));if(typeof e=="string"&&e.length>hc/3&&ll(e)>hc)throw new Error(r+"contains a string greater than "+hc+" utf8 bytes "+Ui(n)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(Gt(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!Nh(o)))throw new Error(r+" contains an invalid key ("+o+") "+Ui(n)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);lw(n,o),Vo(r,a,n),cw(n)}),i&&s)throw new Error(r+' contains ".value" child '+Ui(n)+" in addition to actual children.")}},WS=function(r,e){let t,n;for(t=0;t<e.length;t++){n=e[t];const s=vo(n);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!Nh(s[o]))throw new Error(r+"contains an invalid key ("+s[o]+") in path "+n.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(ow);let i=null;for(t=0;t<e.length;t++){if(n=e[t],i!==null&&dn(i,n))throw new Error(r+"contains a path "+i.toString()+" that is ancestor of another path "+n.toString());i=n}},jS=function(r,e,t,n){const i=es(r,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const s=[];Gt(e,(o,a)=>{const l=new nt(o);if(Vo(i,a,yt(t,l)),hh(l)===".priority"&&!Oh(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(l)}),WS(i,s)},qS=function(r,e,t){if(cl(e))throw new Error(es(r,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Oh(e))throw new Error(es(r,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},T_=function(r,e,t,n){if(!E_(t))throw new Error(es(r,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},$S=function(r,e,t,n){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),T_(r,e,t)},Wi=function(r,e){if(Fe(e)===".info")throw new Error(r+" failed = Can't modify data under /.info/")},XS=function(r,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Nh(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!GS(t))throw new Error(es(r,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YS{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Fh(r,e){let t=null;for(let n=0;n<e.length;n++){const i=e[n],s=i.getPath();t!==null&&!fh(s,t.path)&&(r.eventLists_.push(t),t=null),t===null&&(t={events:[],path:s}),t.events.push(i)}t&&r.eventLists_.push(t)}function C_(r,e,t){Fh(r,t),A_(r,n=>fh(n,e))}function Nn(r,e,t){Fh(r,t),A_(r,n=>dn(n,e)||dn(e,n))}function A_(r,e){r.recursionDepth_++;let t=!0;for(let n=0;n<r.eventLists_.length;n++){const i=r.eventLists_[n];if(i){const s=i.path;e(s)?(KS(r.eventLists_[n]),r.eventLists_[n]=null):t=!1}}t&&(r.eventLists_=[]),r.recursionDepth_--}function KS(r){for(let e=0;e<r.events.length;e++){const t=r.events[e];if(t!==null){r.events[e]=null;const n=t.getEventRunner();Qs&&Ft("event: "+t.toString()),vs(n)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZS="repo_interrupt",JS=25;class QS{constructor(e,t,n,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new YS,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Wa(),this.transactionQueueTree_=new Dh,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function eM(r,e,t){if(r.stats_=ch(r.repoInfo_),r.forceRestClient_||Rb())r.server_=new Ga(r.repoInfo_,(n,i,s,o)=>{Nd(r,n,i,s,o)},r.authTokenProvider_,r.appCheckProvider_),setTimeout(()=>Od(r,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ot(t)}catch(n){throw new Error("Invalid authOverride provided: "+n)}}r.persistentConnection_=new Jn(r.repoInfo_,e,(n,i,s,o)=>{Nd(r,n,i,s,o)},n=>{Od(r,n)},n=>{tM(r,n)},r.authTokenProvider_,r.appCheckProvider_,t),r.server_=r.persistentConnection_}r.authTokenProvider_.addTokenChangeListener(n=>{r.server_.refreshAuthToken(n)}),r.appCheckProvider_.addTokenChangeListener(n=>{r.server_.refreshAppCheckToken(n.token)}),r.statsReporter_=Fb(r.repoInfo_,()=>new Ow(r.stats_,r.server_)),r.infoData_=new Pw,r.infoSyncTree_=new Rd({startListening:(n,i,s,o)=>{let a=[];const l=r.infoData_.getNode(n._path);return l.isEmpty()||(a=dl(r.infoSyncTree_,n._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),kh(r,"connected",!1),r.serverSyncTree_=new Rd({startListening:(n,i,s,o)=>(r.server_.listen(n,s,i,(a,l)=>{const c=o(a,l);Nn(r.eventQueue_,n._path,c)}),[]),stopListening:(n,i)=>{r.server_.unlisten(n,i)}})}function I_(r){const t=r.infoData_.getNode(new nt(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function yl(r){return NS({timestamp:I_(r)})}function Nd(r,e,t,n,i){r.dataUpdateCount++;const s=new nt(e);t=r.interceptServerDataCallback_?r.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(n){const l=Fa(t,c=>_t(c));o=IS(r.serverSyncTree_,s,l,i)}else{const l=_t(t);o=AS(r.serverSyncTree_,s,l,i)}else if(n){const l=Fa(t,c=>_t(c));o=ES(r.serverSyncTree_,s,l)}else{const l=_t(t);o=dl(r.serverSyncTree_,s,l)}let a=s;o.length>0&&(a=bl(r,s)),Nn(r.eventQueue_,a,o)}function Od(r,e){kh(r,"connected",e),e===!1&&iM(r)}function tM(r,e){Gt(e,(t,n)=>{kh(r,t,n)})}function kh(r,e,t){const n=new nt("/.info/"+e),i=_t(t);r.infoData_.updateSnapshot(n,i);const s=dl(r.infoSyncTree_,n,i);Nn(r.eventQueue_,n,s)}function Uh(r){return r.nextWriteId_++}function nM(r,e,t,n,i){vl(r,"set",{path:e.toString(),value:t,priority:n});const s=yl(r),o=_t(t,n),a=pl(r.serverSyncTree_,e),l=Ph(o,a,s),c=Uh(r),u=Mh(r.serverSyncTree_,e,l,c,!0);Fh(r.eventQueue_,u),r.server_.put(e.toString(),o.val(!0),(f,d)=>{const g=f==="ok";g||Jt("set at "+e+" failed: "+f);const m=Gi(r.serverSyncTree_,c,!g);Nn(r.eventQueue_,e,m),rs(r,i,f,d)});const h=N_(r,e);bl(r,h),Nn(r.eventQueue_,h,[])}function iM(r){vl(r,"onDisconnectEvents");const e=yl(r),t=Wa();Au(r.onDisconnect_,Ye(),(i,s)=>{const o=kS(i,s,r.serverSyncTree_,e);xs(t,i,o)});let n=[];Au(t,Ye(),(i,s)=>{n=n.concat(dl(r.serverSyncTree_,i,s));const o=N_(r,i);bl(r,o)}),r.onDisconnect_=Wa(),Nn(r.eventQueue_,Ye(),n)}function rM(r,e,t){r.server_.onDisconnectCancel(e.toString(),(n,i)=>{n==="ok"&&Cu(r.onDisconnect_,e),rs(r,t,n,i)})}function Fd(r,e,t,n){const i=_t(t);r.server_.onDisconnectPut(e.toString(),i.val(!0),(s,o)=>{s==="ok"&&xs(r.onDisconnect_,e,i),rs(r,n,s,o)})}function sM(r,e,t,n,i){const s=_t(t,n);r.server_.onDisconnectPut(e.toString(),s.val(!0),(o,a)=>{o==="ok"&&xs(r.onDisconnect_,e,s),rs(r,i,o,a)})}function oM(r,e,t,n){if(yu(t)){Ft("onDisconnect().update() called with empty data.  Don't do anything."),rs(r,n,"ok",void 0);return}r.server_.onDisconnectMerge(e.toString(),t,(i,s)=>{i==="ok"&&Gt(t,(o,a)=>{const l=_t(a);xs(r.onDisconnect_,yt(e,o),l)}),rs(r,n,i,s)})}function aM(r,e,t){let n;Fe(e._path)===".info"?n=Dd(r.infoSyncTree_,e,t):n=Dd(r.serverSyncTree_,e,t),C_(r.eventQueue_,e._path,n)}function P_(r,e,t){let n;Fe(e._path)===".info"?n=Nu(r.infoSyncTree_,e,t):n=Nu(r.serverSyncTree_,e,t),C_(r.eventQueue_,e._path,n)}function lM(r){r.persistentConnection_&&r.persistentConnection_.interrupt(ZS)}function vl(r,...e){let t="";r.persistentConnection_&&(t=r.persistentConnection_.id+":"),Ft(t,...e)}function rs(r,e,t,n){e&&vs(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let s=i;n&&(s+=": "+n);const o=new Error(s);o.code=i,e(o)}})}function cM(r,e,t,n,i,s){vl(r,"transaction on "+e);const o={path:e,update:t,onComplete:n,status:null,order:Rg(),applyLocally:s,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Bh(r,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Vo("transaction failed: Data returned ",l,o.path),o.status=0;const c=gl(r.transactionQueueTree_,e),u=gr(c)||[];u.push(o),Lh(c,u);let h;typeof l=="object"&&l!==null&&Cn(l,".priority")?(h=Qi(l,".priority"),de(Oh(h),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):h=(pl(r.serverSyncTree_,e)||Ae.EMPTY_NODE).getPriority().val();const f=yl(r),d=_t(l,h),g=Ph(d,a,f);o.currentOutputSnapshotRaw=d,o.currentOutputSnapshotResolved=g,o.currentWriteId=Uh(r);const m=Mh(r.serverSyncTree_,e,g,o.currentWriteId,o.applyLocally);Nn(r.eventQueue_,e,m),xl(r,r.transactionQueueTree_)}}function Bh(r,e,t){return pl(r.serverSyncTree_,e,t)||Ae.EMPTY_NODE}function xl(r,e=r.transactionQueueTree_){if(e||wl(r,e),gr(e)){const t=D_(r,e);de(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&uM(r,Ho(e),t)}else S_(e)&&_l(e,t=>{xl(r,t)})}function uM(r,e,t){const n=t.map(c=>c.currentWriteId),i=Bh(r,e,n);let s=i;const o=i.hash();for(let c=0;c<t.length;c++){const u=t[c];de(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=Kt(e,u.path);s=s.updateChild(h,u.currentOutputSnapshotRaw)}const a=s.val(!0),l=e;r.server_.put(l.toString(),a,c=>{vl(r,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let f=0;f<t.length;f++)t[f].status=2,u=u.concat(Gi(r.serverSyncTree_,t[f].currentWriteId)),t[f].onComplete&&h.push(()=>t[f].onComplete(null,!0,t[f].currentOutputSnapshotResolved)),t[f].unwatcher();wl(r,gl(r.transactionQueueTree_,e)),xl(r,r.transactionQueueTree_),Nn(r.eventQueue_,e,u);for(let f=0;f<h.length;f++)vs(h[f])}else{if(c==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{Jt("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=c}bl(r,e)}},o)}function bl(r,e){const t=R_(r,e),n=Ho(t),i=D_(r,t);return hM(r,i,n),n}function hM(r,e,t){if(e.length===0)return;const n=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=Kt(t,l.path);let u=!1,h;if(de(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,i=i.concat(Gi(r.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=JS)u=!0,h="maxretry",i=i.concat(Gi(r.serverSyncTree_,l.currentWriteId,!0));else{const f=Bh(r,l.path,o);l.currentInputSnapshot=f;const d=e[a].update(f.val());if(d!==void 0){Vo("transaction failed: Data returned ",d,l.path);let g=_t(d);typeof d=="object"&&d!=null&&Cn(d,".priority")||(g=g.updatePriority(f.getPriority()));const p=l.currentWriteId,y=yl(r),w=Ph(g,f,y);l.currentOutputSnapshotRaw=g,l.currentOutputSnapshotResolved=w,l.currentWriteId=Uh(r),o.splice(o.indexOf(p),1),i=i.concat(Mh(r.serverSyncTree_,l.path,w,l.currentWriteId,l.applyLocally)),i=i.concat(Gi(r.serverSyncTree_,p,!0))}else u=!0,h="nodata",i=i.concat(Gi(r.serverSyncTree_,l.currentWriteId,!0))}Nn(r.eventQueue_,t,i),i=[],u&&(e[a].status=2,function(f){setTimeout(f,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?n.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):n.push(()=>e[a].onComplete(new Error(h),!1,null))))}wl(r,r.transactionQueueTree_);for(let a=0;a<n.length;a++)vs(n[a]);xl(r,r.transactionQueueTree_)}function R_(r,e){let t,n=r.transactionQueueTree_;for(t=Fe(e);t!==null&&gr(n)===void 0;)n=gl(n,t),e=rt(e),t=Fe(e);return n}function D_(r,e){const t=[];return L_(r,e,t),t.sort((n,i)=>n.order-i.order),t}function L_(r,e,t){const n=gr(e);if(n)for(let i=0;i<n.length;i++)t.push(n[i]);_l(e,i=>{L_(r,i,t)})}function wl(r,e){const t=gr(e);if(t){let n=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[n]=t[i],n++);t.length=n,Lh(e,t.length>0?t:void 0)}_l(e,n=>{wl(r,n)})}function N_(r,e){const t=Ho(R_(r,e)),n=gl(r.transactionQueueTree_,e);return BS(n,i=>{fc(r,i)}),fc(r,n),M_(n,i=>{fc(r,i)}),t}function fc(r,e){const t=gr(e);if(t){const n=[];let i=[],s=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(de(s===o-1,"All SENT items should be at beginning of queue."),s=o,t[o].status=3,t[o].abortReason="set"):(de(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(Gi(r.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&n.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?Lh(e,void 0):t.length=s+1,Nn(r.eventQueue_,Ho(e),i);for(let o=0;o<n.length;o++)vs(n[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fM(r){let e="";const t=r.split("/");for(let n=0;n<t.length;n++)if(t[n].length>0){let i=t[n];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function dM(r){const e={};r.charAt(0)==="?"&&(r=r.substring(1));for(const t of r.split("&")){if(t.length===0)continue;const n=t.split("=");n.length===2?e[decodeURIComponent(n[0])]=decodeURIComponent(n[1]):Jt(`Invalid query segment '${t}' in query '${r}'`)}return e}const kd=function(r,e){const t=pM(r),n=t.namespace;t.domain==="firebase.com"&&ti(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!n||n==="undefined")&&t.domain!=="localhost"&&ti("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||wb();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Wg(t.host,t.secure,n,i,e,"",n!==t.subdomain),path:new nt(t.pathString)}},pM=function(r){let e="",t="",n="",i="",s="",o=!0,a="https",l=443;if(typeof r=="string"){let c=r.indexOf("//");c>=0&&(a=r.substring(0,c-1),r=r.substring(c+2));let u=r.indexOf("/");u===-1&&(u=r.length);let h=r.indexOf("?");h===-1&&(h=r.length),e=r.substring(0,Math.min(u,h)),u<h&&(i=fM(r.substring(u,h)));const f=dM(r.substring(Math.min(r.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const d=e.slice(0,c);if(d.toLowerCase()==="localhost")t="localhost";else if(d.split(".").length<=2)t=d;else{const g=e.indexOf(".");n=e.substring(0,g).toLowerCase(),t=e.substring(g+1),s=n}"ns"in f&&(s=f.ns)}return{host:e,port:l,domain:t,subdomain:n,secure:o,scheme:a,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ud="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",mM=function(){let r=0;const e=[];return function(t){const n=t===r;r=t;let i;const s=new Array(8);for(i=7;i>=0;i--)s[i]=Ud.charAt(t%64),t=Math.floor(t/64);de(t===0,"Cannot push at time == 0");let o=s.join("");if(n){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=Ud.charAt(e[i]);return de(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(e,t,n,i){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ot(this.snapshot.exportVal())}}class F_{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return de(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gM{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new Rn;return rM(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Wi("OnDisconnect.remove",this._path);const e=new Rn;return Fd(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Wi("OnDisconnect.set",this._path),Ja("OnDisconnect.set",e,this._path,!1);const t=new Rn;return Fd(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){Wi("OnDisconnect.setWithPriority",this._path),Ja("OnDisconnect.setWithPriority",e,this._path,!1),qS("OnDisconnect.setWithPriority",t);const n=new Rn;return sM(this._repo,this._path,e,t,n.wrapCallback(()=>{})),n.promise}update(e){Wi("OnDisconnect.update",this._path),jS("OnDisconnect.update",e,this._path);const t=new Rn;return oM(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(e,t,n,i){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=i}get key(){return Ue(this._path)?null:hh(this._path)}get ref(){return new On(this._repo,this._path)}get _queryIdentifier(){const e=xd(this._queryParams),t=ah(e);return t==="{}"?"default":t}get _queryObject(){return xd(this._queryParams)}isEqual(e){if(e=Si(e),!(e instanceof zh))return!1;const t=this._repo===e._repo,n=fh(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&n&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+sw(this._path)}}class On extends zh{constructor(e,t){super(e,t,new gh,!1)}get parent(){const e=Qg(this._path);return e===null?null:new On(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ss{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new nt(e),n=os(this.ref,e);return new ss(this._node.getChild(t),n,ft)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(n,i)=>e(new ss(i,os(this.ref,n),ft)))}hasChild(e){const t=new nt(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function $n(r,e){return r=Si(r),r._checkNotDeleted("ref"),e!==void 0?os(r._root,e):r._root}function os(r,e){return r=Si(r),Fe(r._path)===null?$S("child","path",e):T_("child","path",e),new On(r._repo,yt(r._path,e))}function _M(r){return r=Si(r),new gM(r._repo,r._path)}function yM(r,e){r=Si(r),Wi("push",r._path),Ja("push",e,r._path,!0);const t=I_(r._repo),n=mM(t),i=os(r,n),s=os(r,n);let o;return e!=null?o=U_(s,e).then(()=>s):o=Promise.resolve(s),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function U_(r,e){r=Si(r),Wi("set",r._path),Ja("set",e,r._path,!1);const t=new Rn;return nM(r._repo,r._path,e,null,t.wrapCallback(()=>{})),t.promise}class Sl{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const n=t._queryParams.getIndex();return new O_("value",this,new ss(e.snapshotNode,new On(t._repo,t._path),n))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new F_(this,e,t):null}matches(e){return e instanceof Sl?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Hh{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new F_(this,e,t):null}createEvent(e,t){de(e.childName!=null,"Child events should have a childName.");const n=os(new On(t._repo,t._path),e.childName),i=t._queryParams.getIndex();return new O_(e.type,this,new ss(e.snapshotNode,n,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Hh?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function B_(r,e,t,n,i){const s=new k_(t,void 0),o=e==="value"?new Sl(s):new Hh(e,s);return aM(r._repo,r,o),()=>P_(r._repo,r,o)}function Ia(r,e,t,n){return B_(r,"value",e)}function vM(r,e,t,n){return B_(r,"child_added",e)}function dc(r,e,t){let n=null;const i=t?new k_(t):null;n=new Sl(i),P_(r._repo,r,n)}gS(On);wS(On);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xM="FIREBASE_DATABASE_EMULATOR_HOST",Fu={};let bM=!1;function wM(r,e,t,n){const i=e.lastIndexOf(":"),s=e.substring(0,i),o=sh(s);r.repoInfo_=new Wg(e,o,r.repoInfo_.namespace,r.repoInfo_.webSocketOnly,r.repoInfo_.nodeAdmin,r.repoInfo_.persistenceKey,r.repoInfo_.includeNamespaceInQueryParams,!0,t),n&&(r.authTokenProvider_=n)}function SM(r,e,t,n,i){let s=n||r.options.databaseURL;s===void 0&&(r.options.projectId||ti("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ft("Using default host for project ",r.options.projectId),s=`${r.options.projectId}-default-rtdb.firebaseio.com`);let o=kd(s,i),a=o.repoInfo,l;typeof process<"u"&&nd&&(l=nd[xM]),l?(s=`http://${l}?ns=${a.namespace}`,o=kd(s,i),a=o.repoInfo):o.repoInfo.secure;const c=new Lb(r.name,r.options,e);XS("Invalid Firebase Database URL",o),Ue(o.path)||ti("Database URL must point to the root of a Firebase Database (not including a child path).");const u=EM(a,r,c,new Db(r,t));return new TM(u,r)}function MM(r,e){const t=Fu[e];(!t||t[r.key]!==r)&&ti(`Database ${e}(${r.repoInfo_}) has already been deleted.`),lM(r),delete t[r.key]}function EM(r,e,t,n){let i=Fu[e.name];i||(i={},Fu[e.name]=i);let s=i[r.toURLString()];return s&&ti("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new QS(r,bM,t,n),i[r.toURLString()]=s,s}class TM{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(eM(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new On(this._repo,Ye())),this._rootInternal}_delete(){return this._rootInternal!==null&&(MM(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ti("Cannot call "+e+" on a deleted database.")}}function CM(r=ob(),e){const t=tb(r,"database").getImmediate({identifier:e});if(!t._instanceStarted){const n=zx("database");n&&AM(t,...n)}return t}function AM(r,e,t,n={}){r=Si(r),r._checkNotDeleted("useEmulator");const i=`${e}:${t}`,s=r._repoInternal;if(r._instanceStarted){if(i===r._repoInternal.repoInfo_.host&&ka(n,s.repoInfo_.emulatorOptions))return;ti("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(s.repoInfo_.nodeAdmin)n.mockUserToken&&ti('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Aa(Aa.OWNER);else if(n.mockUserToken){const a=typeof n.mockUserToken=="string"?n.mockUserToken:Vx(n.mockUserToken,r.app.options.projectId);o=new Aa(a)}sh(e)&&(Hx(e),jx("Database",!0)),wM(s,i,n,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IM(r){_b(sb),Ba(new go("database",(e,{instanceIdentifier:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return SM(n,i,s,t)},"PUBLIC").setMultipleInstances(!0)),Hr(id,rd,r),Hr(id,rd,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PM={".sv":"timestamp"};function Bd(){return PM}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RM{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function pc(r,e,t){if(r=Si(r),Wi("Reference.transaction",r._path),r.key===".length"||r.key===".keys")throw"Reference.transaction failed: "+r.key+" is a read-only object.";const n=!0,i=new Rn,s=(a,l,c)=>{let u=null;a?i.reject(a):(u=new ss(c,new On(r._repo,r._path),ft),i.resolve(new RM(l,u)))},o=Ia(r,()=>{});return cM(r._repo,r._path,e,s,o,n),i.promise}Jn.prototype.simpleListen=function(r,e){this.sendRequest("q",{p:r},e)};Jn.prototype.echo=function(r,e){this.sendRequest("echo",{d:r},e)};IM();var DM="firebase",LM="12.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Hr(DM,LM,"app");const NM={apiKey:"AIzaSyAPvMietdRlqWwCu94qOoPWY-E20G9ljnk",authDomain:"v1game-234c2.firebaseapp.com",databaseURL:"https://v1game-234c2-default-rtdb.europe-west1.firebasedatabase.app",projectId:"v1game-234c2",storageBucket:"v1game-234c2.firebasestorage.app",messagingSenderId:"434032925258",appId:"1:434032925258:web:6f7c8a6da0a42c88d8a4b3",measurementId:"G-FWQ7NDF130"},OM=Tg(NM),Xn=CM(OM);class Go{static generate(e){let t=e%this.MODULUS;return t=t*this.PRIME%this.MODULUS,(t+this.OFFSET).toString()}}Object.defineProperty(Go,"MODULUS",{enumerable:!0,configurable:!0,writable:!0,value:888889});Object.defineProperty(Go,"OFFSET",{enumerable:!0,configurable:!0,writable:!0,value:111111});Object.defineProperty(Go,"PRIME",{enumerable:!0,configurable:!0,writable:!0,value:568303});Object.defineProperty(Go,"XOR_MASK",{enumerable:!0,configurable:!0,writable:!0,value:123456});class Qa{constructor(){this.listeners=[],this.listenersOncer=[],this.on=e=>(this.listeners.push(e),{dispose:()=>this.off(e)}),this.once=e=>{this.listenersOncer.push(e)},this.off=e=>{var t=this.listeners.indexOf(e);t>-1&&this.listeners.splice(t,1)},this.emit=e=>{if(this.listeners.forEach(t=>t(e)),this.listenersOncer.length>0){const t=this.listenersOncer;this.listenersOncer=[],t.forEach(n=>n(e))}},this.pipe=e=>this.on(t=>e.emit(t))}}var z_={exports:{}};(function(r){var e=Object.prototype.hasOwnProperty,t="~";function n(){}Object.create&&(n.prototype=Object.create(null),new n().__proto__||(t=!1));function i(l,c,u){this.fn=l,this.context=c,this.once=u||!1}function s(l,c,u,h,f){if(typeof u!="function")throw new TypeError("The listener must be a function");var d=new i(u,h||l,f),g=t?t+c:c;return l._events[g]?l._events[g].fn?l._events[g]=[l._events[g],d]:l._events[g].push(d):(l._events[g]=d,l._eventsCount++),l}function o(l,c){--l._eventsCount===0?l._events=new n:delete l._events[c]}function a(){this._events=new n,this._eventsCount=0}a.prototype.eventNames=function(){var c=[],u,h;if(this._eventsCount===0)return c;for(h in u=this._events)e.call(u,h)&&c.push(t?h.slice(1):h);return Object.getOwnPropertySymbols?c.concat(Object.getOwnPropertySymbols(u)):c},a.prototype.listeners=function(c){var u=t?t+c:c,h=this._events[u];if(!h)return[];if(h.fn)return[h.fn];for(var f=0,d=h.length,g=new Array(d);f<d;f++)g[f]=h[f].fn;return g},a.prototype.listenerCount=function(c){var u=t?t+c:c,h=this._events[u];return h?h.fn?1:h.length:0},a.prototype.emit=function(c,u,h,f,d,g){var m=t?t+c:c;if(!this._events[m])return!1;var p=this._events[m],y=arguments.length,w,v;if(p.fn){switch(p.once&&this.removeListener(c,p.fn,void 0,!0),y){case 1:return p.fn.call(p.context),!0;case 2:return p.fn.call(p.context,u),!0;case 3:return p.fn.call(p.context,u,h),!0;case 4:return p.fn.call(p.context,u,h,f),!0;case 5:return p.fn.call(p.context,u,h,f,d),!0;case 6:return p.fn.call(p.context,u,h,f,d,g),!0}for(v=1,w=new Array(y-1);v<y;v++)w[v-1]=arguments[v];p.fn.apply(p.context,w)}else{var x=p.length,b;for(v=0;v<x;v++)switch(p[v].once&&this.removeListener(c,p[v].fn,void 0,!0),y){case 1:p[v].fn.call(p[v].context);break;case 2:p[v].fn.call(p[v].context,u);break;case 3:p[v].fn.call(p[v].context,u,h);break;case 4:p[v].fn.call(p[v].context,u,h,f);break;default:if(!w)for(b=1,w=new Array(y-1);b<y;b++)w[b-1]=arguments[b];p[v].fn.apply(p[v].context,w)}}return!0},a.prototype.on=function(c,u,h){return s(this,c,u,h,!1)},a.prototype.once=function(c,u,h){return s(this,c,u,h,!0)},a.prototype.removeListener=function(c,u,h,f){var d=t?t+c:c;if(!this._events[d])return this;if(!u)return o(this,d),this;var g=this._events[d];if(g.fn)g.fn===u&&(!f||g.once)&&(!h||g.context===h)&&o(this,d);else{for(var m=0,p=[],y=g.length;m<y;m++)(g[m].fn!==u||f&&!g[m].once||h&&g[m].context!==h)&&p.push(g[m]);p.length?this._events[d]=p.length===1?p[0]:p:o(this,d)}return this},a.prototype.removeAllListeners=function(c){var u;return c?(u=t?t+c:c,this._events[u]&&o(this,u)):(this._events=new n,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=t,a.EventEmitter=a,r.exports=a})(z_);var FM=z_.exports;const kM=Km(FM);var mc={},gc={},_c={},Ml={},yc={},UM=vc(typeof Buffer<"u"&&Buffer)||vc(Kr.Buffer)||vc(typeof window<"u"&&window.Buffer)||Kr.Buffer;function vc(r){return r&&r.isBuffer&&r}var BM={}.toString,Vh=Array.isArray||function(r){return BM.call(r)=="[object Array]"},xc={exports:{}},zd;function zM(){if(zd)return xc.exports;zd=1;var r=gn(),e=xc.exports=t(0);e.alloc=t,e.concat=r.concat,e.from=n;function t(i){return new Array(i)}function n(i){if(!r.isBuffer(i)&&r.isView(i))i=r.Uint8Array.from(i);else if(r.isArrayBuffer(i))i=new Uint8Array(i);else{if(typeof i=="string")return r.from.call(e,i);if(typeof i=="number")throw new TypeError('"value" argument must not be a number')}return Array.prototype.slice.call(i)}return xc.exports}var bc={exports:{}},Hd;function HM(){if(Hd)return bc.exports;Hd=1;var r=gn(),e=r.global,t=bc.exports=r.hasBuffer?n(0):[];t.alloc=r.hasBuffer&&e.alloc||n,t.concat=r.concat,t.from=i;function n(s){return new e(s)}function i(s){if(!r.isBuffer(s)&&r.isView(s))s=r.Uint8Array.from(s);else if(r.isArrayBuffer(s))s=new Uint8Array(s);else{if(typeof s=="string")return r.from.call(t,s);if(typeof s=="number")throw new TypeError('"value" argument must not be a number')}return e.from&&e.from.length!==1?e.from(s):new e(s)}return bc.exports}var wc={exports:{}},Vd;function VM(){if(Vd)return wc.exports;Vd=1;var r=gn(),e=wc.exports=r.hasArrayBuffer?t(0):[];e.alloc=t,e.concat=r.concat,e.from=n;function t(i){return new Uint8Array(i)}function n(i){if(r.isView(i)){var s=i.byteOffset,o=i.byteLength;i=i.buffer,i.byteLength!==o&&(i.slice?i=i.slice(s,s+o):(i=new Uint8Array(i),i.byteLength!==o&&(i=Array.prototype.slice.call(i,s,s+o))))}else{if(typeof i=="string")return r.from.call(e,i);if(typeof i=="number")throw new TypeError('"value" argument must not be a number')}return new Uint8Array(i)}return wc.exports}var xr={},El={};El.copy=jM;El.toString=WM;El.write=GM;function GM(r,e){for(var t=this,n=e||(e|=0),i=r.length,s=0,o=0;o<i;)s=r.charCodeAt(o++),s<128?t[n++]=s:s<2048?(t[n++]=192|s>>>6,t[n++]=128|s&63):s<55296||s>57343?(t[n++]=224|s>>>12,t[n++]=128|s>>>6&63,t[n++]=128|s&63):(s=(s-55296<<10|r.charCodeAt(o++)-56320)+65536,t[n++]=240|s>>>18,t[n++]=128|s>>>12&63,t[n++]=128|s>>>6&63,t[n++]=128|s&63);return n-e}function WM(r,e,t){var n=this,i=e|0;t||(t=n.length);for(var s="",o=0;i<t;){if(o=n[i++],o<128){s+=String.fromCharCode(o);continue}(o&224)===192?o=(o&31)<<6|n[i++]&63:(o&240)===224?o=(o&15)<<12|(n[i++]&63)<<6|n[i++]&63:(o&248)===240&&(o=(o&7)<<18|(n[i++]&63)<<12|(n[i++]&63)<<6|n[i++]&63),o>=65536?(o-=65536,s+=String.fromCharCode((o>>>10)+55296,(o&1023)+56320)):s+=String.fromCharCode(o)}return s}function jM(r,e,t,n){var i;t||(t=0),!n&&n!==0&&(n=this.length),e||(e=0);var s=n-t;if(r===this&&t<e&&e<n)for(i=s-1;i>=0;i--)r[i+e]=this[i+t];else for(i=0;i<s;i++)r[i+e]=this[i+t];return s}var Gd;function Gh(){if(Gd)return xr;Gd=1;var r=El;xr.copy=s,xr.slice=o,xr.toString=a,xr.write=l("write");var e=gn(),t=e.global,n=e.hasBuffer&&"TYPED_ARRAY_SUPPORT"in t,i=n&&!t.TYPED_ARRAY_SUPPORT;function s(c,u,h,f){var d=e.isBuffer(this),g=e.isBuffer(c);if(d&&g)return this.copy(c,u,h,f);if(!i&&!d&&!g&&e.isView(this)&&e.isView(c)){var m=h||f!=null?o.call(this,h,f):this;return c.set(m,u),m.length}else return r.copy.call(this,c,u,h,f)}function o(c,u){var h=this.slice||!i&&this.subarray;if(h)return h.call(this,c,u);var f=e.alloc.call(this,u-c);return s.call(this,f,0,c,u),f}function a(c,u,h){var f=!n&&e.isBuffer(this)?this.toString:r.toString;return f.apply(this,arguments)}function l(c){return u;function u(){var h=this[c]||r[c];return h.apply(this,arguments)}}return xr}var Wd;function gn(){return Wd||(Wd=1,function(r){var e=r.global=UM,t=r.hasBuffer=e&&!!e.isBuffer,n=r.hasArrayBuffer=typeof ArrayBuffer<"u",i=r.isArray=Vh;r.isArrayBuffer=n?m:w;var s=r.isBuffer=t?e.isBuffer:w,o=r.isView=n?ArrayBuffer.isView||v("ArrayBuffer","buffer"):w;r.alloc=f,r.concat=d,r.from=h;var a=r.Array=zM(),l=r.Buffer=HM(),c=r.Uint8Array=VM(),u=r.prototype=Gh();function h(x){return typeof x=="string"?p.call(this,x):y(this).from(x)}function f(x){return y(this).alloc(x)}function d(x,b){b||(b=0,Array.prototype.forEach.call(x,C));var M=this!==r&&this||x[0],T=f.call(M,b),_=0;return Array.prototype.forEach.call(x,E),T;function C(D){b+=D.length}function E(D){_+=u.copy.call(D,T,_)}}var g=v("ArrayBuffer");function m(x){return x instanceof ArrayBuffer||g(x)}function p(x){var b=x.length*3,M=f.call(this,b),T=u.write.call(M,x);return b!==T&&(M=u.slice.call(M,0,T)),M}function y(x){return s(x)?l:o(x)?c:i(x)?a:t?l:n?c:a}function w(){return!1}function v(x,b){return x="[object "+x+"]",function(M){return M!=null&&{}.toString.call(b?M[b]:M)===x}}}(yc)),yc}Ml.ExtBuffer=ku;var qM=gn();function ku(r,e){if(!(this instanceof ku))return new ku(r,e);this.buffer=qM.from(r),this.type=e}var Sc={},jd;function $M(){if(jd)return Sc;jd=1,Sc.setExtPackers=s;var r=gn(),e=r.global,t=r.Uint8Array.from,n,i={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};function s(u){u.addExtPacker(14,Error,[c,o]),u.addExtPacker(1,EvalError,[c,o]),u.addExtPacker(2,RangeError,[c,o]),u.addExtPacker(3,ReferenceError,[c,o]),u.addExtPacker(4,SyntaxError,[c,o]),u.addExtPacker(5,TypeError,[c,o]),u.addExtPacker(6,URIError,[c,o]),u.addExtPacker(10,RegExp,[l,o]),u.addExtPacker(11,Boolean,[a,o]),u.addExtPacker(12,String,[a,o]),u.addExtPacker(13,Date,[Number,o]),u.addExtPacker(15,Number,[a,o]),typeof Uint8Array<"u"&&(u.addExtPacker(17,Int8Array,t),u.addExtPacker(18,Uint8Array,t),u.addExtPacker(19,Int16Array,t),u.addExtPacker(20,Uint16Array,t),u.addExtPacker(21,Int32Array,t),u.addExtPacker(22,Uint32Array,t),u.addExtPacker(23,Float32Array,t),typeof Float64Array<"u"&&u.addExtPacker(24,Float64Array,t),typeof Uint8ClampedArray<"u"&&u.addExtPacker(25,Uint8ClampedArray,t),u.addExtPacker(26,ArrayBuffer,t),u.addExtPacker(29,DataView,t)),r.hasBuffer&&u.addExtPacker(27,e,r.from)}function o(u){return n||(n=iy().encode),n(u)}function a(u){return u.valueOf()}function l(u){u=RegExp.prototype.toString.call(u).split("/"),u.shift();var h=[u.pop()];return h.unshift(u.join("/")),h}function c(u){var h={};for(var f in i)h[f]=u[f];return h}return Sc}var H_={},Tl={};(function(r){(function(e){var t="undefined",n=t!==typeof Buffer&&Buffer,i=t!==typeof Uint8Array&&Uint8Array,s=t!==typeof ArrayBuffer&&ArrayBuffer,o=[0,0,0,0,0,0,0,0],a=Array.isArray||M,l=4294967296,c=16777216,u;h("Uint64BE",!0,!0),h("Int64BE",!0,!1),h("Uint64LE",!1,!0),h("Int64LE",!1,!1);function h(T,_,C){var E=_?0:4,D=_?4:0,z=_?0:3,N=_?1:2,F=_?2:1,H=_?3:0,Y=_?w:x,J=_?v:b,S=R.prototype,P="is"+T,k="_"+P;return S.buffer=void 0,S.offset=0,S[k]=!0,S.toNumber=B,S.toString=W,S.toJSON=B,S.toArray=f,n&&(S.toBuffer=d),i&&(S.toArrayBuffer=g),R[P]=O,e[T]=R,R;function R(se,Z,ne,q){return this instanceof R?j(this,se,Z,ne,q):new R(se,Z,ne,q)}function O(se){return!!(se&&se[k])}function j(se,Z,ne,q,K){if(i&&s&&(Z instanceof s&&(Z=new i(Z)),q instanceof s&&(q=new i(q))),!Z&&!ne&&!q&&!u){se.buffer=y(o,0);return}if(!m(Z,ne)){var oe=u||Array;K=ne,q=Z,ne=0,Z=new oe(8)}se.buffer=Z,se.offset=ne|=0,t!==typeof q&&(typeof q=="string"?G(Z,ne,q,K||10):m(q,K)?p(Z,ne,q,K):typeof K=="number"?(ae(Z,ne+E,q),ae(Z,ne+D,K)):q>0?Y(Z,ne,q):q<0?J(Z,ne,q):p(Z,ne,o,0))}function G(se,Z,ne,q){var K=0,oe=ne.length,pe=0,ce=0;ne[0]==="-"&&K++;for(var Re=K;K<oe;){var we=parseInt(ne[K++],q);if(!(we>=0))break;ce=ce*q+we,pe=pe*q+Math.floor(ce/l),ce%=l}Re&&(pe=~pe,ce?ce=l-ce:pe++),ae(se,Z+E,pe),ae(se,Z+D,ce)}function B(){var se=this.buffer,Z=this.offset,ne=le(se,Z+E),q=le(se,Z+D);return C||(ne|=0),ne?ne*l+q:q}function W(se){var Z=this.buffer,ne=this.offset,q=le(Z,ne+E),K=le(Z,ne+D),oe="",pe=!C&&q&2147483648;for(pe&&(q=~q,K=l-K),se=se||10;;){var ce=q%se*l+K;if(q=Math.floor(q/se),K=Math.floor(ce/se),oe=(ce%se).toString(se)+oe,!q&&!K)break}return pe&&(oe="-"+oe),oe}function ae(se,Z,ne){se[Z+H]=ne&255,ne=ne>>8,se[Z+F]=ne&255,ne=ne>>8,se[Z+N]=ne&255,ne=ne>>8,se[Z+z]=ne&255}function le(se,Z){return se[Z+z]*c+(se[Z+N]<<16)+(se[Z+F]<<8)+se[Z+H]}}function f(T){var _=this.buffer,C=this.offset;return u=null,T!==!1&&C===0&&_.length===8&&a(_)?_:y(_,C)}function d(T){var _=this.buffer,C=this.offset;if(u=n,T!==!1&&C===0&&_.length===8&&Buffer.isBuffer(_))return _;var E=new n(8);return p(E,0,_,C),E}function g(T){var _=this.buffer,C=this.offset,E=_.buffer;if(u=i,T!==!1&&C===0&&E instanceof s&&E.byteLength===8)return E;var D=new i(8);return p(D,0,_,C),D.buffer}function m(T,_){var C=T&&T.length;return _|=0,C&&_+8<=C&&typeof T[_]!="string"}function p(T,_,C,E){_|=0,E|=0;for(var D=0;D<8;D++)T[_++]=C[E++]&255}function y(T,_){return Array.prototype.slice.call(T,_,_+8)}function w(T,_,C){for(var E=_+8;E>_;)T[--E]=C&255,C/=256}function v(T,_,C){var E=_+8;for(C++;E>_;)T[--E]=-C&255^255,C/=256}function x(T,_,C){for(var E=_+8;_<E;)T[_++]=C&255,C/=256}function b(T,_,C){var E=_+8;for(C++;_<E;)T[_++]=-C&255^255,C/=256}function M(T){return!!T&&Object.prototype.toString.call(T)=="[object Array]"}})(typeof r.nodeName!="string"?r:Kr||{})})(Tl);var V_={},Cl={};Cl.read=function(r,e,t,n,i){var s,o,a=i*8-n-1,l=(1<<a)-1,c=l>>1,u=-7,h=t?i-1:0,f=t?-1:1,d=r[e+h];for(h+=f,s=d&(1<<-u)-1,d>>=-u,u+=a;u>0;s=s*256+r[e+h],h+=f,u-=8);for(o=s&(1<<-u)-1,s>>=-u,u+=n;u>0;o=o*256+r[e+h],h+=f,u-=8);if(s===0)s=1-c;else{if(s===l)return o?NaN:(d?-1:1)*(1/0);o=o+Math.pow(2,n),s=s-c}return(d?-1:1)*o*Math.pow(2,s-n)};Cl.write=function(r,e,t,n,i,s){var o,a,l,c=s*8-i-1,u=(1<<c)-1,h=u>>1,f=i===23?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:s-1,g=n?1:-1,m=e<0||e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,o=u):(o=Math.floor(Math.log(e)/Math.LN2),e*(l=Math.pow(2,-o))<1&&(o--,l*=2),o+h>=1?e+=f/l:e+=f*Math.pow(2,1-h),e*l>=2&&(o++,l/=2),o+h>=u?(a=0,o=u):o+h>=1?(a=(e*l-1)*Math.pow(2,i),o=o+h):(a=e*Math.pow(2,h-1)*Math.pow(2,i),o=0));i>=8;r[t+d]=a&255,d+=g,a/=256,i-=8);for(o=o<<i|a,c+=i;c>0;r[t+d]=o&255,d+=g,o/=256,c-=8);r[t+d-g]|=m*128};var Wh={},XM=Wh.uint8=new Array(256);for(var Jo=0;Jo<=255;Jo++)XM[Jo]=YM(Jo);function YM(r){return function(e){var t=e.reserve(1);e.buffer[t]=r}}var G_=Cl,W_=Tl,KM=W_.Uint64BE,ZM=W_.Int64BE,j_=Wh.uint8,Al=gn(),ht=Al.global,JM=Al.hasBuffer&&"TYPED_ARRAY_SUPPORT"in ht,QM=JM&&!ht.TYPED_ARRAY_SUPPORT,qd=Al.hasBuffer&&ht.prototype||{};V_.getWriteToken=eE;function eE(r){return r&&r.uint8array?tE():QM||Al.hasBuffer&&r&&r.safe?nE():q_()}function tE(){var r=q_();return r[202]=et(202,4,Y_),r[203]=et(203,8,K_),r}function q_(){var r=j_.slice();return r[196]=Os(196),r[197]=Ri(197),r[198]=Di(198),r[199]=Os(199),r[200]=Ri(200),r[201]=Di(201),r[202]=et(202,4,qd.writeFloatBE||Y_,!0),r[203]=et(203,8,qd.writeDoubleBE||K_,!0),r[204]=Os(204),r[205]=Ri(205),r[206]=Di(206),r[207]=et(207,8,$_),r[208]=Os(208),r[209]=Ri(209),r[210]=Di(210),r[211]=et(211,8,X_),r[217]=Os(217),r[218]=Ri(218),r[219]=Di(219),r[220]=Ri(220),r[221]=Di(221),r[222]=Ri(222),r[223]=Di(223),r}function nE(){var r=j_.slice();return r[196]=et(196,1,ht.prototype.writeUInt8),r[197]=et(197,2,ht.prototype.writeUInt16BE),r[198]=et(198,4,ht.prototype.writeUInt32BE),r[199]=et(199,1,ht.prototype.writeUInt8),r[200]=et(200,2,ht.prototype.writeUInt16BE),r[201]=et(201,4,ht.prototype.writeUInt32BE),r[202]=et(202,4,ht.prototype.writeFloatBE),r[203]=et(203,8,ht.prototype.writeDoubleBE),r[204]=et(204,1,ht.prototype.writeUInt8),r[205]=et(205,2,ht.prototype.writeUInt16BE),r[206]=et(206,4,ht.prototype.writeUInt32BE),r[207]=et(207,8,$_),r[208]=et(208,1,ht.prototype.writeInt8),r[209]=et(209,2,ht.prototype.writeInt16BE),r[210]=et(210,4,ht.prototype.writeInt32BE),r[211]=et(211,8,X_),r[217]=et(217,1,ht.prototype.writeUInt8),r[218]=et(218,2,ht.prototype.writeUInt16BE),r[219]=et(219,4,ht.prototype.writeUInt32BE),r[220]=et(220,2,ht.prototype.writeUInt16BE),r[221]=et(221,4,ht.prototype.writeUInt32BE),r[222]=et(222,2,ht.prototype.writeUInt16BE),r[223]=et(223,4,ht.prototype.writeUInt32BE),r}function Os(r){return function(e,t){var n=e.reserve(2),i=e.buffer;i[n++]=r,i[n]=t}}function Ri(r){return function(e,t){var n=e.reserve(3),i=e.buffer;i[n++]=r,i[n++]=t>>>8,i[n]=t}}function Di(r){return function(e,t){var n=e.reserve(5),i=e.buffer;i[n++]=r,i[n++]=t>>>24,i[n++]=t>>>16,i[n++]=t>>>8,i[n]=t}}function et(r,e,t,n){return function(i,s){var o=i.reserve(e+1);i.buffer[o++]=r,t.call(i.buffer,s,o,n)}}function $_(r,e){new KM(this,e,r)}function X_(r,e){new ZM(this,e,r)}function Y_(r,e){G_.write(this,r,e,!1,23,4)}function K_(r,e){G_.write(this,r,e,!1,52,8)}var iE=Vh,Z_=Tl,rE=Z_.Uint64BE,sE=Z_.Int64BE,$d=gn(),Xd=Gh(),oE=V_,aE=Wh.uint8,lE=Ml.ExtBuffer,cE=typeof Uint8Array<"u",uE=typeof Map<"u",bs=[];bs[1]=212;bs[2]=213;bs[4]=214;bs[8]=215;bs[16]=216;H_.getWriteType=hE;function hE(r){var e=oE.getWriteToken(r),t=r&&r.useraw,n=cE&&r&&r.binarraybuffer,i=n?$d.isArrayBuffer:$d.isBuffer,s=n?b:x,o=uE&&r&&r.usemap,a=o?_:T,l={boolean:c,function:w,number:u,object:t?y:p,string:m(t?g:d),symbol:w,undefined:w};return l;function c(E,D){var z=D?195:194;e[z](E,D)}function u(E,D){var z=D|0,N;if(D!==z){N=203,e[N](E,D);return}else-32<=z&&z<=127?N=z&255:0<=z?N=z<=255?204:z<=65535?205:206:N=-128<=z?208:-32768<=z?209:210;e[N](E,z)}function h(E,D){var z=207;e[z](E,D.toArray())}function f(E,D){var z=211;e[z](E,D.toArray())}function d(E){return E<32?1:E<=255?2:E<=65535?3:5}function g(E){return E<32?1:E<=65535?3:5}function m(E){return D;function D(z,N){var F=N.length,H=5+F*3;z.offset=z.reserve(H);var Y=z.buffer,J=E(F),S=z.offset+J;F=Xd.write.call(Y,N,S);var P=E(F);if(J!==P){var k=S+P-J,R=S+F;Xd.copy.call(Y,Y,k,S,R)}var O=P===1?160+F:P<=3?215+P:219;e[O](z,F),z.offset+=F}}function p(E,D){if(D===null)return w(E,D);if(i(D))return s(E,D);if(iE(D))return v(E,D);if(rE.isUint64BE(D))return h(E,D);if(sE.isInt64BE(D))return f(E,D);var z=E.codec.getExtPacker(D);if(z&&(D=z(D)),D instanceof lE)return M(E,D);a(E,D)}function y(E,D){if(i(D))return C(E,D);p(E,D)}function w(E,D){var z=192;e[z](E,D)}function v(E,D){var z=D.length,N=z<16?144+z:z<=65535?220:221;e[N](E,z);for(var F=E.codec.encode,H=0;H<z;H++)F(E,D[H])}function x(E,D){var z=D.length,N=z<255?196:z<=65535?197:198;e[N](E,z),E.send(D)}function b(E,D){x(E,new Uint8Array(D))}function M(E,D){var z=D.buffer,N=z.length,F=bs[N]||(N<255?199:N<=65535?200:201);e[F](E,N),aE[D.type](E),E.send(z)}function T(E,D){var z=Object.keys(D),N=z.length,F=N<16?128+N:N<=65535?222:223;e[F](E,N);var H=E.codec.encode;z.forEach(function(Y){H(E,Y),H(E,D[Y])})}function _(E,D){if(!(D instanceof Map))return T(E,D);var z=D.size,N=z<16?128+z:z<=65535?222:223;e[N](E,z);var F=E.codec.encode;D.forEach(function(H,Y,J){F(E,Y),F(E,H)})}function C(E,D){var z=D.length,N=z<32?160+z:z<=65535?218:219;e[N](E,z),E.send(D)}}var Mi={},fE=Vh;Mi.createCodec=J_;Mi.install=pE;Mi.filter=_E;var dE=gn();function as(r){if(!(this instanceof as))return new as(r);this.options=r,this.init()}as.prototype.init=function(){var r=this.options;return r&&r.uint8array&&(this.bufferish=dE.Uint8Array),this};function pE(r){for(var e in r)as.prototype[e]=mE(as.prototype[e],r[e])}function mE(r,e){return r&&e?t:r||e;function t(){return r.apply(this,arguments),e.apply(this,arguments)}}function gE(r){return r=r.slice(),function(t){return r.reduce(e,t)};function e(t,n){return n(t)}}function _E(r){return fE(r)?gE(r):r}function J_(r){return new as(r)}Mi.preset=J_({preset:!0});var Yd;function jh(){if(Yd)return _c;Yd=1;var r=Ml.ExtBuffer,e=$M(),t=H_,n=Mi;n.install({addExtPacker:o,getExtPacker:a,init:s}),_c.preset=s.call(n.preset);function i(l){var c=t.getWriteType(l);return u;function u(h,f){var d=c[typeof f];if(!d)throw new Error('Unsupported type "'+typeof f+'": '+f);d(h,f)}}function s(){var l=this.options;return this.encode=i(l),l&&l.preset&&e.setExtPackers(this),this}function o(l,c,u){u=n.filter(u);var h=c.name;if(h&&h!=="Object"){var f=this.extPackers||(this.extPackers={});f[h]=g}else{var d=this.extEncoderList||(this.extEncoderList=[]);d.unshift([c,g])}function g(m){return u&&(m=u(m)),new r(m,l)}}function a(l){var c=this.extPackers||(this.extPackers={}),u=l.constructor,h=u&&u.name&&c[u.name];if(h)return h;for(var f=this.extEncoderList||(this.extEncoderList=[]),d=f.length,g=0;g<d;g++){var m=f[g];if(u===m[0])return m[1]}}return _c}var Il={};Il.FlexDecoder=ls;Il.FlexEncoder=cs;var ro=gn(),yE=2048,vE=65536,Kd="BUFFER_SHORTAGE";function ls(){if(!(this instanceof ls))return new ls}function cs(){if(!(this instanceof cs))return new cs}ls.mixin=ty(xE());ls.mixin(ls.prototype);cs.mixin=ty(bE());cs.mixin(cs.prototype);function xE(){return{bufferish:ro,write:r,fetch:SE,flush:e,push:ey,pull:ME,read:Q_,reserve:t,offset:0};function r(n){var i=this.offset?ro.prototype.slice.call(this.buffer,this.offset):this.buffer;this.buffer=i?n?this.bufferish.concat([i,n]):i:n,this.offset=0}function e(){for(;this.offset<this.buffer.length;){var n=this.offset,i;try{i=this.fetch()}catch(s){if(s&&s.message!=Kd)throw s;this.offset=n;break}this.push(i)}}function t(n){var i=this.offset,s=i+n;if(s>this.buffer.length)throw new Error(Kd);return this.offset=s,i}}function bE(){return{bufferish:ro,write:wE,fetch:r,flush:e,push:ey,pull:t,read:Q_,reserve:n,send:i,maxBufferSize:vE,minBufferSize:yE,offset:0,start:0};function r(){var s=this.start;if(s<this.offset){var o=this.start=this.offset;return ro.prototype.slice.call(this.buffer,s,o)}}function e(){for(;this.start<this.offset;){var s=this.fetch();s&&this.push(s)}}function t(){var s=this.buffers||(this.buffers=[]),o=s.length>1?this.bufferish.concat(s):s[0];return s.length=0,o}function n(s){var o=s|0;if(this.buffer){var a=this.buffer.length,l=this.offset|0,c=l+o;if(c<a)return this.offset=c,l;this.flush(),s=Math.max(s,Math.min(a*2,this.maxBufferSize))}return s=Math.max(s,this.minBufferSize),this.buffer=this.bufferish.alloc(s),this.start=0,this.offset=o,0}function i(s){var o=s.length;if(o>this.minBufferSize)this.flush(),this.push(s);else{var a=this.reserve(o);ro.prototype.copy.call(s,this.buffer,a)}}}function wE(){throw new Error("method not implemented: write()")}function SE(){throw new Error("method not implemented: fetch()")}function Q_(){var r=this.buffers&&this.buffers.length;return r?(this.flush(),this.pull()):this.fetch()}function ey(r){var e=this.buffers||(this.buffers=[]);e.push(r)}function ME(){var r=this.buffers||(this.buffers=[]);return r.shift()}function ty(r){return e;function e(t){for(var n in r)t[n]=r[n];return t}}var Zd;function ny(){if(Zd)return gc;Zd=1,gc.EncodeBuffer=t;var r=jh().preset,e=Il.FlexEncoder;e.mixin(t.prototype);function t(n){if(!(this instanceof t))return new t(n);if(n&&(this.options=n,n.codec)){var i=this.codec=n.codec;i.bufferish&&(this.bufferish=i.bufferish)}}return t.prototype.codec=r,t.prototype.write=function(n){this.codec.encode(this,n)},gc}var Jd;function iy(){if(Jd)return mc;Jd=1,mc.encode=e;var r=ny().EncodeBuffer;function e(t,n){var i=new r(n);return i.write(t),i.read()}return mc}var Mc={},Ec={},Tc={},Cc={},Qd;function EE(){if(Qd)return Cc;Qd=1,Cc.setExtUnpackers=i;var r=gn(),e=r.global,t,n={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};function i(u){u.addExtUnpacker(14,[s,a(Error)]),u.addExtUnpacker(1,[s,a(EvalError)]),u.addExtUnpacker(2,[s,a(RangeError)]),u.addExtUnpacker(3,[s,a(ReferenceError)]),u.addExtUnpacker(4,[s,a(SyntaxError)]),u.addExtUnpacker(5,[s,a(TypeError)]),u.addExtUnpacker(6,[s,a(URIError)]),u.addExtUnpacker(10,[s,o]),u.addExtUnpacker(11,[s,l(Boolean)]),u.addExtUnpacker(12,[s,l(String)]),u.addExtUnpacker(13,[s,l(Date)]),u.addExtUnpacker(15,[s,l(Number)]),typeof Uint8Array<"u"&&(u.addExtUnpacker(17,l(Int8Array)),u.addExtUnpacker(18,l(Uint8Array)),u.addExtUnpacker(19,[c,l(Int16Array)]),u.addExtUnpacker(20,[c,l(Uint16Array)]),u.addExtUnpacker(21,[c,l(Int32Array)]),u.addExtUnpacker(22,[c,l(Uint32Array)]),u.addExtUnpacker(23,[c,l(Float32Array)]),typeof Float64Array<"u"&&u.addExtUnpacker(24,[c,l(Float64Array)]),typeof Uint8ClampedArray<"u"&&u.addExtUnpacker(25,l(Uint8ClampedArray)),u.addExtUnpacker(26,c),u.addExtUnpacker(29,[c,l(DataView)])),r.hasBuffer&&u.addExtUnpacker(27,l(e))}function s(u){return t||(t=fy().decode),t(u)}function o(u){return RegExp.apply(null,u)}function a(u){return function(h){var f=new u;for(var d in n)f[d]=h[d];return f}}function l(u){return function(h){return new u(h)}}function c(u){return new Uint8Array(u).buffer}return Cc}var Pl={},ry=Cl,sy=Tl,oy=sy.Uint64BE,ay=sy.Int64BE;Pl.getReadFormat=AE;Pl.readUint8=ly;var qh=gn(),Rl=Gh(),TE=typeof Map<"u",CE=!0;function AE(r){var e=qh.hasArrayBuffer&&r&&r.binarraybuffer,t=r&&r.int64,n=TE&&r&&r.usemap,i={map:n?PE:IE,array:RE,str:DE,bin:e?NE:LE,ext:OE,uint8:ly,uint16:kE,uint32:BE,uint64:Qo(8,t?GE:HE),int8:FE,int16:UE,int32:zE,int64:Qo(8,t?WE:VE),float32:Qo(4,jE),float64:Qo(8,qE)};return i}function IE(r,e){var t={},n,i=new Array(e),s=new Array(e),o=r.codec.decode;for(n=0;n<e;n++)i[n]=o(r),s[n]=o(r);for(n=0;n<e;n++)t[i[n]]=s[n];return t}function PE(r,e){var t=new Map,n,i=new Array(e),s=new Array(e),o=r.codec.decode;for(n=0;n<e;n++)i[n]=o(r),s[n]=o(r);for(n=0;n<e;n++)t.set(i[n],s[n]);return t}function RE(r,e){for(var t=new Array(e),n=r.codec.decode,i=0;i<e;i++)t[i]=n(r);return t}function DE(r,e){var t=r.reserve(e),n=t+e;return Rl.toString.call(r.buffer,"utf-8",t,n)}function LE(r,e){var t=r.reserve(e),n=t+e,i=Rl.slice.call(r.buffer,t,n);return qh.from(i)}function NE(r,e){var t=r.reserve(e),n=t+e,i=Rl.slice.call(r.buffer,t,n);return qh.Uint8Array.from(i).buffer}function OE(r,e){var t=r.reserve(e+1),n=r.buffer[t++],i=t+e,s=r.codec.getExtUnpacker(n);if(!s)throw new Error("Invalid ext type: "+(n&&"0x"+n.toString(16)));var o=Rl.slice.call(r.buffer,t,i);return s(o)}function ly(r){var e=r.reserve(1);return r.buffer[e]}function FE(r){var e=r.reserve(1),t=r.buffer[e];return t&128?t-256:t}function kE(r){var e=r.reserve(2),t=r.buffer;return t[e++]<<8|t[e]}function UE(r){var e=r.reserve(2),t=r.buffer,n=t[e++]<<8|t[e];return n&32768?n-65536:n}function BE(r){var e=r.reserve(4),t=r.buffer;return t[e++]*16777216+(t[e++]<<16)+(t[e++]<<8)+t[e]}function zE(r){var e=r.reserve(4),t=r.buffer;return t[e++]<<24|t[e++]<<16|t[e++]<<8|t[e]}function Qo(r,e){return function(t){var n=t.reserve(r);return e.call(t.buffer,n,CE)}}function HE(r){return new oy(this,r).toNumber()}function VE(r){return new ay(this,r).toNumber()}function GE(r){return new oy(this,r)}function WE(r){return new ay(this,r)}function jE(r){return ry.read(this,r,!1,23,4)}function qE(r){return ry.read(this,r,!1,52,8)}var cy={},$E=Pl;cy.getReadToken=XE;function XE(r){var e=$E.getReadFormat(r);return r&&r.useraw?YE(e):uy(e)}function uy(r){var e,t=new Array(256);for(e=0;e<=127;e++)t[e]=Fs(e);for(e=128;e<=143;e++)t[e]=qn(e-128,r.map);for(e=144;e<=159;e++)t[e]=qn(e-144,r.array);for(e=160;e<=191;e++)t[e]=qn(e-160,r.str);for(t[192]=Fs(null),t[193]=null,t[194]=Fs(!1),t[195]=Fs(!0),t[196]=tn(r.uint8,r.bin),t[197]=tn(r.uint16,r.bin),t[198]=tn(r.uint32,r.bin),t[199]=tn(r.uint8,r.ext),t[200]=tn(r.uint16,r.ext),t[201]=tn(r.uint32,r.ext),t[202]=r.float32,t[203]=r.float64,t[204]=r.uint8,t[205]=r.uint16,t[206]=r.uint32,t[207]=r.uint64,t[208]=r.int8,t[209]=r.int16,t[210]=r.int32,t[211]=r.int64,t[212]=qn(1,r.ext),t[213]=qn(2,r.ext),t[214]=qn(4,r.ext),t[215]=qn(8,r.ext),t[216]=qn(16,r.ext),t[217]=tn(r.uint8,r.str),t[218]=tn(r.uint16,r.str),t[219]=tn(r.uint32,r.str),t[220]=tn(r.uint16,r.array),t[221]=tn(r.uint32,r.array),t[222]=tn(r.uint16,r.map),t[223]=tn(r.uint32,r.map),e=224;e<=255;e++)t[e]=Fs(e-256);return t}function YE(r){var e,t=uy(r).slice();for(t[217]=t[196],t[218]=t[197],t[219]=t[198],e=160;e<=191;e++)t[e]=qn(e-160,r.bin);return t}function Fs(r){return function(){return r}}function tn(r,e){return function(t){var n=r(t);return e(t,n)}}function qn(r,e){return function(t){return e(t,r)}}var ep;function $h(){if(ep)return Tc;ep=1;var r=Ml.ExtBuffer,e=EE(),t=Pl.readUint8,n=cy,i=Mi;i.install({addExtUnpacker:a,getExtUnpacker:l,init:o}),Tc.preset=o.call(i.preset);function s(c){var u=n.getReadToken(c);return h;function h(f){var d=t(f),g=u[d];if(!g)throw new Error("Invalid type: "+(d&&"0x"+d.toString(16)));return g(f)}}function o(){var c=this.options;return this.decode=s(c),c&&c.preset&&e.setExtUnpackers(this),this}function a(c,u){var h=this.extUnpackers||(this.extUnpackers=[]);h[c]=i.filter(u)}function l(c){var u=this.extUnpackers||(this.extUnpackers=[]);return u[c]||h;function h(f){return new r(f,c)}}return Tc}var tp;function hy(){if(tp)return Ec;tp=1,Ec.DecodeBuffer=t;var r=$h().preset,e=Il.FlexDecoder;e.mixin(t.prototype);function t(n){if(!(this instanceof t))return new t(n);if(n&&(this.options=n,n.codec)){var i=this.codec=n.codec;i.bufferish&&(this.bufferish=i.bufferish)}}return t.prototype.codec=r,t.prototype.fetch=function(){return this.codec.decode(this)},Ec}var np;function fy(){if(np)return Mc;np=1,Mc.decode=e;var r=hy().DecodeBuffer;function e(t,n){var i=new r(n);return i.write(t),i.read()}return Mc}var dy={exports:{}};/**
 * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @constructor
 * @see https://github.com/kawanet/event-lite
 * @see http://kawanet.github.io/event-lite/EventLite.html
 * @example
 * var EventLite = require("event-lite");
 *
 * function MyClass() {...}             // your class
 *
 * EventLite.mixin(MyClass.prototype);  // import event methods
 *
 * var obj = new MyClass();
 * obj.on("foo", function() {...});     // add event listener
 * obj.once("bar", function() {...});   // add one-time event listener
 * obj.emit("foo");                     // dispatch event
 * obj.emit("bar");                     // dispatch another event
 * obj.off("foo");                      // remove event listener
 */(function(r){function e(){if(!(this instanceof e))return new e}(function(t){r.exports=t;var n="listeners",i={on:o,once:a,off:l,emit:c};s(t.prototype),t.mixin=s;function s(h){for(var f in i)h[f]=i[f];return h}function o(h,f){return u(this,h).push(f),this}function a(h,f){var d=this;return g.originalListener=f,u(d,h).push(g),d;function g(){l.call(d,h,g),f.apply(this,arguments)}}function l(h,f){var d=this,g;if(!arguments.length)delete d[n];else if(f){if(g=u(d,h,!0),g){if(g=g.filter(m),!g.length)return l.call(d,h);d[n][h]=g}}else if(g=d[n],g&&(delete g[h],!Object.keys(g).length))return l.call(d);return d;function m(p){return p!==f&&p.originalListener!==f}}function c(h,f){var d=this,g=u(d,h,!0);if(!g)return!1;var m=arguments.length;if(m===1)g.forEach(y);else if(m===2)g.forEach(w);else{var p=Array.prototype.slice.call(arguments,1);g.forEach(v)}return!!g.length;function y(x){x.call(d)}function w(x){x.call(d,f)}function v(x){x.apply(d,p)}}function u(h,f,d){if(!(d&&!h[n])){var g=h[n]||(h[n]={});return g[f]||(g[f]=[])}}})(e)})(dy);var py=dy.exports,KE=py,my=ny().EncodeBuffer;function us(r){if(!(this instanceof us))return new us(r);my.call(this,r)}us.prototype=new my;KE.mixin(us.prototype);us.prototype.encode=function(r){this.write(r),this.emit("data",this.read())};us.prototype.end=function(r){arguments.length&&this.encode(r),this.flush(),this.emit("end")};var ZE=py,gy=hy().DecodeBuffer;function rr(r){if(!(this instanceof rr))return new rr(r);gy.call(this,r)}rr.prototype=new gy;ZE.mixin(rr.prototype);rr.prototype.decode=function(r){arguments.length&&this.write(r),this.flush()};rr.prototype.push=function(r){this.emit("data",r)};rr.prototype.end=function(r){this.decode(r),this.emit("end")};$h();jh();Mi.createCodec;$h();jh();Mi.preset;var JE=iy().encode,QE=fy().decode;class ip{constructor(e=5*1e3){Object.defineProperty(this,"windowDuration",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"window",{enumerable:!0,configurable:!0,writable:!0,value:[]}),this.windowDuration=e}updateWindow(){const e=performance.now()-this.windowDuration;for(;this.window.length>0&&this.window[0].timestamp<e;)this.window.shift()}onMessage(e){this.window.push({timestamp:performance.now(),bytes:e}),this.updateWindow()}getPacketsPerSecond(){return this.updateWindow(),1e3*this.window.length/this.windowDuration}getAveragePacketSize(){return this.updateWindow(),this.window.reduce((t,n)=>t+n.bytes,0)/this.window.length}getBytesPerSecond(){return this.updateWindow(),1e3*this.window.reduce((t,n)=>t+n.bytes,0)/this.windowDuration}formatStats(){return`${this.getPacketsPerSecond().toFixed(2)} msgs/sec, ${this.getAveragePacketSize().toFixed(2)} bytes/msg, ${this.getBytesPerSecond()} bytes/sec`}}class e1 extends kM{constructor(e,t,n,i,s=[{urls:"stun:stun.l.google.com:19302"}]){if(super(),Object.defineProperty(this,"myId",{enumerable:!0,configurable:!0,writable:!0,value:e}),Object.defineProperty(this,"peerId",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"roomRef",{enumerable:!0,configurable:!0,writable:!0,value:n}),Object.defineProperty(this,"peerConnection",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"dataChannel",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"sendStats",{enumerable:!0,configurable:!0,writable:!0,value:new ip}),Object.defineProperty(this,"receiveStats",{enumerable:!0,configurable:!0,writable:!0,value:new ip}),Object.defineProperty(this,"onClose",{enumerable:!0,configurable:!0,writable:!0,value:new Qa}),this.peerConnection=new RTCPeerConnection({iceServers:s}),this.peerConnection.onicecandidate=a=>{a.candidate&&this.sendSignal("candidate",a.candidate.toJSON())},this.peerConnection.onconnectionstatechange=()=>{mi.debug(`ConnectionStateChange: ${this.peerConnection.connectionState}`),(this.peerConnection.connectionState==="disconnected"||this.peerConnection.connectionState==="failed")&&this.close()},i){const a=this.peerConnection.createDataChannel("game-data",{ordered:!0});this.setupDataChannel(a),this.peerConnection.onnegotiationneeded=async()=>{const l=await this.peerConnection.createOffer();await this.peerConnection.setLocalDescription(l),this.sendSignal("offer",{type:l.type,sdp:l.sdp})}}else this.peerConnection.ondatachannel=a=>{this.setupDataChannel(a.channel)};const o=$n(Xn,`${this.roomRef.key}/signals/${this.myId}`);vM(o,async a=>{const l=a.val();if(l.sender===this.peerId)if(mi.debug(`Received signal: ${l.type}`),l.type==="offer"){await this.peerConnection.setRemoteDescription(new RTCSessionDescription(l.payload));const c=await this.peerConnection.createAnswer();await this.peerConnection.setLocalDescription(c),this.sendSignal("answer",{type:c.type,sdp:c.sdp})}else l.type==="answer"?await this.peerConnection.setRemoteDescription(new RTCSessionDescription(l.payload)):l.type==="candidate"&&await this.peerConnection.addIceCandidate(new RTCIceCandidate(l.payload))})}setupDataChannel(e){this.dataChannel=e,this.dataChannel.binaryType="arraybuffer",this.dataChannel.onopen=()=>this.emit("open"),this.dataChannel.onmessage=t=>{this.receiveStats.onMessage(t.data.byteLength);const n=QE(new Uint8Array(t.data));this.emit("data",n)},this.dataChannel.onclose=()=>{mi.debug("Data channel closed..."),this.close()}}sendSignal(e,t){const n=$n(Xn,`${this.roomRef.key}/signals/${this.peerId}`);yM(n,{sender:this.myId,type:e,payload:t})}send(e){var t;if(((t=this.dataChannel)==null?void 0:t.readyState)==="open"){const n=JE(e);this.sendStats.onMessage(n.byteLength),this.dataChannel.send(n)}}close(){var e;this.peerConnection.close(),(e=this.dataChannel)==null||e.close(),this.onClose.emit()}}class t1{constructor(){Object.defineProperty(this,"myId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"serverTimeOffset",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"onMatchFound",{enumerable:!0,configurable:!0,writable:!0,value:new Qa}),Object.defineProperty(this,"matchmakeInterval",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.myId=Math.random().toString(36).substring(2,15);const e=$n(Xn,".info/serverTimeOffset");Ia(e,t=>{this.serverTimeOffset=t.val()||0})}async createPrivateRoom(){const e=$n(Xn,"meta/games_count");let t=0;const n=await pc(e,a=>(a||0)+1);if(n.committed)t=n.snapshot.val();else throw new Error("Failed to generate Room ID");const i=Go.generate(t),s=$n(Xn,`rooms/${i}`);await U_(s,{host:this.myId,client:null,created:Bd()}),_M(s).remove(),mi.info(`Created private room ${i}. Waiting...`);const o=Ia(s,a=>{const l=a.val();l&&l.client&&(dc(s,"value",o),this.connect(i,l.client,!0))});return i}async joinPrivateRoom(e){const t=$n(Xn,`rooms/${e}`),n=await pc(t,i=>{if(i&&i.host&&!i.client)return i.client=this.myId,i});if(n.committed){const i=n.snapshot.val();this.connect(e,i.host,!1)}else throw new Error("Room not found or full")}startPublicMatchmaking(){const e=$n(Xn,"matchmake"),t=async()=>{const n=await pc(e,i=>{const s=Date.now();if(i===null||i.timestamp&&s+this.serverTimeOffset-i.timestamp>15e3)return{host:this.myId,client:null,timestamp:Bd()};if(i.host&&!i.client&&i.host!==this.myId)return{...i,client:this.myId}});if(n.committed){const i=n.snapshot.val();if(i&&i.client===this.myId&&i.host!==this.myId){const s=i.host;this.stopPublicMatchmaking(),this.connect(`public_${s}`,s,!1);return}if(i&&i.host===this.myId&&!i.client){this.listenForChallenger(e);return}}};t(),this.matchmakeInterval=setInterval(t,1e4)}listenForChallenger(e){const t=Ia(e,n=>{const i=n.val();i&&i.host===this.myId&&i.client?(dc(e,"value",t),this.stopPublicMatchmaking(),this.connect(`public_${this.myId}`,i.client,!0)):(!i||i.host!==this.myId)&&dc(e,"value",t)})}stopPublicMatchmaking(){this.matchmakeInterval&&clearInterval(this.matchmakeInterval)}connect(e,t,n){let i;e.startsWith("public_")?i=$n(Xn,`rooms_public/${e}`):i=$n(Xn,`rooms/${e}`);const s=new e1(this.myId,t,i,n);s.on("open",()=>{this.onMatchFound.emit({connection:s,isHost:n,roomId:e})})}}class n1{constructor(){Object.defineProperty(this,"root",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"matchmaker",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"onClientStart",{enumerable:!0,configurable:!0,writable:!0,value:new Qa}),Object.defineProperty(this,"onHostStart",{enumerable:!0,configurable:!0,writable:!0,value:new Qa}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:{view:"home"}}),this.root=document.createElement("div"),this.setupStyles(),document.body.appendChild(this.root),this.matchmaker=new t1,this.matchmaker.onMatchFound.on(e=>{this.root.style.display="none",e.isHost?this.onHostStart.emit(e.connection):this.onClientStart.emit(e.connection)}),this.render()}setupStyles(){this.root.style.position="absolute",this.root.style.width="100%",this.root.style.height="100%",this.root.style.backgroundColor="rgba(255, 255, 255, 0.95)",this.root.style.zIndex="100",this.root.style.display="flex",this.root.style.justifyContent="center",this.root.style.alignItems="center",this.root.style.fontFamily="sans-serif"}async createPrivate(){this.state={view:"hosting"},this.render();try{const e=await this.matchmaker.createPrivateRoom();this.state.roomId=e,this.render()}catch{this.state={view:"error",errorMsg:"Could not create room."},this.render()}}async joinPrivate(e){if(e.length===6){this.state={view:"joining"},this.render();try{await this.matchmaker.joinPrivateRoom(e)}catch{this.state={view:"error",errorMsg:"Room not found or full."},this.render()}}}startPublic(){this.state={view:"matchmaking"},this.render(),this.matchmaker.startPublicMatchmaking()}reset(){this.matchmaker.stopPublicMatchmaking(),this.state={view:"home"},this.render()}render(){dg((()=>{switch(this.state.view){case"home":return bn`
            <div style="display:flex; flex-direction:column; gap:20px; text-align:center;">
              <h1>Passe Trappe</h1>
              <button @click=${()=>this.startPublic()} style="padding:15px; font-size:1.2em; cursor:pointer;">
                Find Public Match
              </button>
              <hr style="width:100%"/>
              <button @click=${()=>this.createPrivate()} style="padding:10px; font-size:1em; cursor:pointer;">
                Create Private Room
              </button>
              <div style="display:flex; gap:5px;">
                <input id="roomInput" type="text" maxlength="6" placeholder="111111" style="padding:10px; font-size:1em; width:100px; text-align:center; letter-spacing: 2px;">
                <button @click=${()=>{const t=document.getElementById("roomInput").value;this.joinPrivate(t)}} style="padding:10px; cursor:pointer;">Join</button>
              </div>
            </div>
          `;case"hosting":return bn`
            <div style="text-align:center;">
              <h2>Waiting for Player...</h2>
              ${this.state.roomId?bn`<div style="font-size:3em; letter-spacing:5px; font-weight:bold; margin:20px;">${this.state.roomId}</div>`:bn`<p>Generating Code...</p>`}
              <p>Share this code with a friend.</p>
              <button @click=${()=>this.reset()}>Cancel</button>
            </div>
          `;case"matchmaking":return bn`
            <div style="text-align:center;">
              <h2>Looking for opponent...</h2>
              <div class="spinner"></div> 
              <p>Please wait...</p>
              <button @click=${()=>this.reset()}>Cancel</button>
            </div>
          `;case"joining":return bn`<h2>Connecting to Room...</h2>`;case"error":return bn`
            <div style="text-align:center; color: red;">
              <h2>Error</h2>
              <p>${this.state.errorMsg}</p>
              <button @click=${()=>this.reset()}>Back</button>
            </div>
          `}})(),this.root)}}class i1{constructor(e){Object.defineProperty(this,"discount",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"est_average",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"est_variance",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"initialized",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.discount=e,this.est_average=0,this.est_variance=0,this.initialized=!1}update(e){if(!this.initialized)this.est_average=e,this.initialized=!0;else{let t=e-this.est_average;this.est_variance=(1-this.discount)*(this.est_variance+this.discount*t*t),this.est_average=this.discount*e+(1-this.discount)*this.est_average}}average(){return this.est_average}variance(){return this.est_variance}stddev(){return Math.sqrt(this.est_variance)}}const r1=100;class s1{isChannelOrdered(e){return e.ordered}isChannelReliable(e){return e.maxPacketLifeTime===null&&e.maxRetransmits===null}checkChannel(e){La.isTrue(this.isChannelOrdered(e),"Data Channel must be ordered."),La.isTrue(this.isChannelReliable(e),"Channel must be reliable.")}constructor(e){Object.defineProperty(this,"gameClass",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"canvas",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"stats",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"inputReader",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"playerPausedIndicator",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"pingMeasure",{enumerable:!0,configurable:!0,writable:!0,value:new i1(.2)}),Object.defineProperty(this,"rtcStats",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.gameClass=e,this.canvas=document.createElement("canvas");const t=e.highDPI&&window.devicePixelRatio?window.devicePixelRatio:1;if(this.canvas.width=e.canvasSize.width*t,this.canvas.height=e.canvasSize.height*t,this.canvas.style.backgroundColor="black",this.canvas.style.position="absolute",this.canvas.style.zIndex="0",this.canvas.style.boxShadow="0px 0px 10px black",this.resize(),window.addEventListener("resize",()=>this.resize()),document.body.appendChild(this.canvas),this.stats=document.createElement("div"),this.stats.style.zIndex="1",this.stats.style.position="absolute",this.stats.style.backgroundColor="rgba(0, 0, 0, 0.5)",this.stats.style.color="white",this.stats.style.padding="5px",this.stats.style.display="none",document.body.appendChild(this.stats),this.playerPausedIndicator=(()=>{const n=document.createElement("div");return n.style.zIndex="1",n.style.position="absolute",n.style.backgroundColor="rgba(0, 0, 0, 0.5)",n.style.color="white",n.style.padding="10px",n.style.left="50%",n.style.top="50%",n.style.transform="translate(-50%, -50%)",n.style.boxSizing="border-box",n.style.fontFamily="sans-serif",n.innerHTML=`
      <p align="center" style="margin: 3px">The other player has minimized or hidden their tab.</p>
      <p align="center" style="margin: 3px">The game may run slowly until they return.</p>
      `,n.style.display="none",document.body.appendChild(n),n})(),this.gameClass.touchControls&&window.navigator.userAgent.toLowerCase().includes("mobile"))for(let[n,i]of Object.entries(this.gameClass.touchControls))i.show();this.inputReader=new _v(document.body,this.canvas,this.gameClass.canvasSize,this.gameClass.pointerLock||!1,this.gameClass.preventContextMenu||!1,this.gameClass.touchControls||{})}calculateLayout(e,t){const n=e.width/t.width,i=e.height/t.height,s=t.width*i>=e.width,o=s?n:i;let a=t.width*o,l=t.height*o,c=0,u=0;return s?u=e.height/2-l/2:c=e.width/2-a/2,{width:a,height:l,left:c,top:u}}resize(){const e=this.calculateLayout({width:window.innerWidth,height:window.innerHeight},this.gameClass.canvasSize);mi.debug("Calculating new layout: %o",e),this.canvas.style.width=`${e.width}px`,this.canvas.style.height=`${e.height}px`,this.canvas.style.top=`${e.top}px`,this.canvas.style.left=`${e.left}px`}async start(){const e=new n1;e.onClientStart.once(t=>{const n=[new Xo(0,!1,!0),new Xo(1,!0,!1)];this.watchRTCStats(t.peerConnection),this.startPing(t),this.startVisibilityWatcher(t),this.startClient(n,t)}),e.onHostStart.once(t=>{const n=[new Xo(0,!0,!0),new Xo(1,!1,!1)];this.watchRTCStats(t.peerConnection),this.startPing(t),this.startVisibilityWatcher(t),this.startHost(n,t)})}startVisibilityWatcher(e){e.send({type:"visibility-state",value:document.visibilityState}),document.addEventListener("visibilitychange",()=>{mi.debug(`My visibility state changed to: ${document.visibilityState}.`),e.send({type:"visibility-state",value:document.visibilityState})}),e.on("data",t=>{t.type==="visibility-state"&&(t.value==="hidden"?this.playerPausedIndicator.style.display="inherit":this.playerPausedIndicator.style.display="none")})}startPing(e){setInterval(()=>{e.send({type:"ping-req",sent_time:performance.now()})},r1),e.on("data",t=>{t.type=="ping-req"?e.send({type:"ping-resp",sent_time:t.sent_time}):t.type=="ping-resp"&&this.pingMeasure.update(performance.now()-t.sent_time)})}renderRTCStats(e){return bn`
      <details>
        <summary>WebRTC Stats</summary>
        ${[...e.values()].map(t=>bn`<div style="margin-left: 10px;">
            <details>
              <summary>${t.type}</summary>
              ${Object.entries(t).map(([n,i])=>{if(n!=="type")return bn`<div style="margin-left: 10px;">${n}: ${t[n]}</div>`})}
            </details>
          </div>`)}
      </details>
    `}async watchRTCStats(e){const t=await e.getStats();this.rtcStats=this.renderRTCStats(t),setTimeout(async()=>{await this.watchRTCStats(e)},1e3)}}class rp{constructor(e,t,n){Object.defineProperty(this,"frame",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"inputs",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.frame=e,this.state=t,this.inputs=n}isPlayerInputPredicted(e){return Fi(this.inputs,e).isPrediction}anyInputPredicted(){for(const[e,{isPrediction:t}]of this.inputs.entries())if(t)return!0;return!1}allInputsSynced(){return!this.anyInputPredicted()}}class sp{onStateSync(e,t){for(;this.history.length>1&&this.history[0].frame<e;)Vl(this.history);this.history[0].state=t,this.state.deserialize(t);for(let n=1;n<this.history.length;++n){let i=this.history[n];this.state.tick(this.getStateInputs(i.inputs)),i.state=fi(this.state.serialize())}}onRemoteInput(e,t,n){let i=Fi(this.highestFrameReceived,t)+1;if(this.highestFrameReceived.set(t,i),e>this.history[this.history.length-1].frame){Fi(this.future,t).push({frame:e,input:n});return}let s=null;for(let a=0;a<this.history.length;++a)if(this.history[a].isPlayerInputPredicted(t)){s=a;break}let o=this.history[s-1];this.state.deserialize(o.state);for(let a=s;a<this.history.length;++a){let l=this.history[a],c=Fi(l.inputs,t);if(a===s)c.isPrediction=!1,c.input=n;else{let u=this.history[a-1],h=Fi(u.inputs,t);c.input=h.input.predictNext()}this.state.tick(this.getStateInputs(l.inputs)),l.state=fi(this.state.serialize())}if(this.isHost)for(;this.history.length>=2&&(this.history[0],this.history[1].allInputsSynced());){let l=Vl(this.history);this.broadcastState(l.frame,l.state)}}constructor(e,t,n,i,s,o,a,l,c,u){if(Object.defineProperty(this,"history",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"maxPredictedFrames",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"future",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"highestFrameReceived",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"isHost",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"broadcastInput",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"broadcastState",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"pingMeasure",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"timestep",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"pollInput",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"players",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.isHost=e,this.state=t,this.players=n,this.maxPredictedFrames=s,this.broadcastInput=c,this.pingMeasure=o,this.timestep=a,this.pollInput=l,e)if(u)this.broadcastState=u;else throw new Error("Expected a broadcast state function.");let h=new Map;for(const[f,d]of i.entries())h.set(f,{input:d,isPrediction:!1});this.history=[new rp(0,fi(this.state.serialize()),h)],this.future=new Map,this.highestFrameReceived=new Map;for(let f of this.players)this.future.set(f,[]),this.highestFrameReceived.set(f,0)}currentFrame(){return this.history[this.history.length-1].frame}largestFutureSize(){return Math.max(...Array.from(this.future.values()).map(e=>e.length))}predictedFrames(){for(let e=0;e<this.history.length;++e)if(!this.history[e].allInputsSynced())return this.history.length-e;return 0}shouldStall(){return this.predictedFrames()>this.maxPredictedFrames}tick(){if(this.shouldStall())return;const e=this.history[this.history.length-1],t=new Map;for(const[n,i]of e.inputs.entries())if(n.isLocalPlayer()){let s=this.pollInput();t.set(n,{input:s,isPrediction:!1}),this.broadcastInput(e.frame+1,s)}else if(Fi(this.future,n).length>0){let s=Vl(Fi(this.future,n));t.set(n,{input:s.input,isPrediction:!1})}else t.set(n,{input:i.input.predictNext(),isPrediction:!0});this.state.tick(this.getStateInputs(t)),this.history.push(new rp(e.frame+1,fi(this.state.serialize()),t))}getStateInputs(e){let t=new Map;for(const[n,{input:i}]of e.entries())t.set(n,i);return t}start(){setInterval(()=>{let e=1;this.largestFutureSize()>0&&(e=2);for(let t=0;t<e;++t)this.tick()},this.timestep)}}class o1 extends s1{constructor(e){super(e),Object.defineProperty(this,"game",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"rollbackNetcode",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}getInitialInputs(e){let t=new Map;for(let n of e)t.set(n,new Ca);return t}startHost(e,t){var n;La(((n=t.dataChannel)==null?void 0:n.readyState)==="open","DataChannel must be open."),mi.info("Starting a rollback host."),this.game=new this.gameClass(this.canvas,e),this.rollbackNetcode=new sp(!0,this.game,e,this.getInitialInputs(e),10,this.pingMeasure,this.gameClass.timestep,()=>this.inputReader.getInput(),(i,s)=>{t.send({type:"input",frame:i,input:s.serialize()})},(i,s)=>{t.send({type:"state",frame:i,state:s})}),t.on("data",i=>{if(i.type==="input"){let s=new Ca;s.deserialize(i.input),this.rollbackNetcode.onRemoteInput(i.frame,e[1],s)}}),console.log("Client has connected... Starting game..."),this.startGameLoop()}startClient(e,t){var n;La(((n=t.dataChannel)==null?void 0:n.readyState)==="open","DataChannel must be open."),mi.info("Starting a rollback client."),this.game=new this.gameClass(this.canvas,e),this.rollbackNetcode=new sp(!1,this.game,e,this.getInitialInputs(e),10,this.pingMeasure,this.gameClass.timestep,()=>this.inputReader.getInput(),(i,s)=>{t.send({type:"input",frame:i,input:s.serialize()})}),t.on("data",i=>{if(i.type==="input"){let s=new Ca;s.deserialize(i.input),this.rollbackNetcode.onRemoteInput(i.frame,e[0],s)}else i.type==="state"&&this.rollbackNetcode.onStateSync(i.frame,i.state)}),console.log("Successfully connected to server... Starting game..."),this.startGameLoop()}startGameLoop(){this.stats.style.display="inherit",this.rollbackNetcode.start();let e=t=>{this.game.draw(this.canvas);const n=bn`
        <div>Netcode Algorithm: Rollback</div>
        <div>Ping: ${this.pingMeasure.average().toFixed(2)} ms +/- ${this.pingMeasure.stddev().toFixed(2)} ms</div>
        <div>History Size: ${this.rollbackNetcode.history.length}</div>
        <div>Frame Number: ${this.rollbackNetcode.currentFrame()}</div>
        <div>Largest Future Size: ${this.rollbackNetcode.largestFutureSize()}</div>
        <div>Predicted Frames: ${this.rollbackNetcode.predictedFrames()}</div>
        <div title="If true, then the other player is running slow, so we wait for them.">Stalling: ${this.rollbackNetcode.shouldStall()}</div>
        ${this.rtcStats}`;dg(n,this.stats),requestAnimationFrame(e)};requestAnimationFrame(e)}}class a1 extends mv{}/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xh="148",l1=0,op=1,c1=2,_y=1,yy=2,Ys=3,wi=0,pn=1,Dl=2,ea=3,vi=0,jr=1,ap=2,lp=3,cp=4,u1=5,Or=100,h1=101,f1=102,up=103,hp=104,d1=200,p1=201,m1=202,g1=203,vy=204,xy=205,_1=206,y1=207,v1=208,x1=209,b1=210,w1=0,S1=1,M1=2,Uu=3,E1=4,T1=5,C1=6,A1=7,by=0,I1=1,P1=2,Qn=0,R1=1,D1=2,L1=3,wy=4,N1=5,Sy=300,hs=301,fs=302,Bu=303,zu=304,Ll=306,Dn=1e3,hn=1001,el=1002,Dt=1003,Hu=1004,Pa=1005,Yt=1006,My=1007,sr=1008,or=1009,O1=1010,F1=1011,Ey=1012,k1=1013,ji=1014,di=1015,Eo=1016,U1=1017,B1=1018,qr=1020,z1=1021,H1=1022,fn=1023,V1=1024,G1=1025,Xi=1026,ds=1027,W1=1028,j1=1029,q1=1030,$1=1031,X1=1033,Ac=33776,Ic=33777,Pc=33778,Rc=33779,fp=35840,dp=35841,pp=35842,mp=35843,Y1=36196,gp=37492,_p=37496,yp=37808,vp=37809,xp=37810,bp=37811,wp=37812,Sp=37813,Mp=37814,Ep=37815,Tp=37816,Cp=37817,Ap=37818,Ip=37819,Pp=37820,Rp=37821,Dp=36492,To=2300,ps=2301,Dc=2302,Lp=2400,Np=2401,Op=2402,K1=2500,Z1=1,Ty=2,ar=3e3,Je=3001,J1=3200,Q1=3201,Cy=0,eT=1,An="srgb",Co="srgb-linear",Lc=7680,tT=519,Vu=35044,Fp="300 es",Gu=1035;class ws{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kp=1234567;const so=Math.PI/180,Ao=180/Math.PI;function mn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[r&255]+Bt[r>>8&255]+Bt[r>>16&255]+Bt[r>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function Nt(r,e,t){return Math.max(e,Math.min(t,r))}function Yh(r,e){return(r%e+e)%e}function nT(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function iT(r,e,t){return r!==e?(t-r)/(e-r):0}function oo(r,e,t){return(1-t)*r+t*e}function rT(r,e,t,n){return oo(r,e,1-Math.exp(-t*n))}function sT(r,e=1){return e-Math.abs(Yh(r,e*2)-e)}function oT(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function aT(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function lT(r,e){return r+Math.floor(Math.random()*(e-r+1))}function cT(r,e){return r+Math.random()*(e-r)}function uT(r){return r*(.5-Math.random())}function hT(r){r!==void 0&&(kp=r);let e=kp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function fT(r){return r*so}function dT(r){return r*Ao}function Wu(r){return(r&r-1)===0&&r!==0}function Ay(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function tl(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function pT(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),f=o((e-n)/2),d=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*h,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*h,a*c);break;case"ZXZ":r.set(l*h,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*g,l*d,a*c);break;case"YXY":r.set(l*d,a*u,l*g,a*c);break;case"ZYZ":r.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Zn(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function it(r,e){switch(e.constructor){case Float32Array:return r;case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var Iy=Object.freeze({__proto__:null,DEG2RAD:so,RAD2DEG:Ao,generateUUID:mn,clamp:Nt,euclideanModulo:Yh,mapLinear:nT,inverseLerp:iT,lerp:oo,damp:rT,pingpong:sT,smoothstep:oT,smootherstep:aT,randInt:lT,randFloat:cT,randFloatSpread:uT,seededRandom:hT,degToRad:fT,radToDeg:dT,isPowerOfTwo:Wu,ceilPowerOfTwo:Ay,floorPowerOfTwo:tl,setQuaternionFromProperEuler:pT,normalize:it,denormalize:Zn});class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class sn{constructor(){sn.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],m=i[0],p=i[3],y=i[6],w=i[1],v=i[4],x=i[7],b=i[2],M=i[5],T=i[8];return s[0]=o*m+a*w+l*b,s[3]=o*p+a*v+l*M,s[6]=o*y+a*x+l*T,s[1]=c*m+u*w+h*b,s[4]=c*p+u*v+h*M,s[7]=c*y+u*x+h*T,s[2]=f*m+d*w+g*b,s[5]=f*p+d*v+g*M,s[8]=f*y+d*x+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return e[0]=h*m,e[1]=(i*c-u*n)*m,e[2]=(a*n-i*o)*m,e[3]=f*m,e[4]=(u*t-i*l)*m,e[5]=(i*s-a*t)*m,e[6]=d*m,e[7]=(n*l-c*t)*m,e[8]=(o*t-n*s)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Nc.makeScale(e,t)),this}rotate(e){return this.premultiply(Nc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Nc.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Nc=new sn;function Py(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Io(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Yi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ra(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Oc={[An]:{[Co]:Yi},[Co]:{[An]:Ra}},jt={legacyMode:!0,get workingColorSpace(){return Co},set workingColorSpace(r){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(r,e,t){if(this.legacyMode||e===t||!e||!t)return r;if(Oc[e]&&Oc[e][t]!==void 0){const n=Oc[e][t];return r.r=n(r.r),r.g=n(r.g),r.b=n(r.b),r}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)}},Ry={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},St={r:0,g:0,b:0},_n={h:0,s:0,l:0},ta={h:0,s:0,l:0};function Fc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}function na(r,e){return e.r=r.r,e.g=r.g,e.b=r.b,e}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=An){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,jt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=jt.workingColorSpace){return this.r=e,this.g=t,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=jt.workingColorSpace){if(e=Yh(e,1),t=Nt(t,0,1),n=Nt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Fc(o,s,e+1/3),this.g=Fc(o,s,e),this.b=Fc(o,s,e-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(e,t=An){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,jt.toWorkingColorSpace(this,t),n(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,jt.toWorkingColorSpace(this,t),n(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){const l=parseFloat(s[1])/360,c=parseFloat(s[2])/100,u=parseFloat(s[3])/100;return n(s[4]),this.setHSL(l,c,u,t)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,jt.toWorkingColorSpace(this,t),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,jt.toWorkingColorSpace(this,t),this}return e&&e.length>0?this.setColorName(e,t):this}setColorName(e,t=An){const n=Ry[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yi(e.r),this.g=Yi(e.g),this.b=Yi(e.b),this}copyLinearToSRGB(e){return this.r=Ra(e.r),this.g=Ra(e.g),this.b=Ra(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=An){return jt.fromWorkingColorSpace(na(this,St),e),Nt(St.r*255,0,255)<<16^Nt(St.g*255,0,255)<<8^Nt(St.b*255,0,255)<<0}getHexString(e=An){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=jt.workingColorSpace){jt.fromWorkingColorSpace(na(this,St),t);const n=St.r,i=St.g,s=St.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=jt.workingColorSpace){return jt.fromWorkingColorSpace(na(this,St),t),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=An){return jt.fromWorkingColorSpace(na(this,St),e),e!==An?`color(${e} ${St.r} ${St.g} ${St.b})`:`rgb(${St.r*255|0},${St.g*255|0},${St.b*255|0})`}offsetHSL(e,t,n){return this.getHSL(_n),_n.h+=e,_n.s+=t,_n.l+=n,this.setHSL(_n.h,_n.s,_n.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_n),e.getHSL(ta);const n=oo(_n.h,ta.h,t),i=oo(_n.s,ta.s,t),s=oo(_n.l,ta.l,t);return this.setHSL(n,i,s),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}Ne.NAMES=Ry;let br;class Dy{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{br===void 0&&(br=Io("canvas")),br.width=e.width,br.height=e.height;const n=br.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=br}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Io("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Yi(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Yi(t[n]/255)*255):t[n]=Yi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Ly{constructor(e=null){this.isSource=!0,this.uuid=mn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(kc(i[o].image)):s.push(kc(i[o]))}else s=kc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function kc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Dy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mT=0;class kt extends ws{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=hn,i=hn,s=Yt,o=sr,a=fn,l=or,c=kt.DEFAULT_ANISOTROPY,u=ar){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mT++}),this.uuid=mn(),this.name="",this.source=new Ly(e),this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new sn,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Dn:e.x=e.x-Math.floor(e.x);break;case hn:e.x=e.x<0?0:1;break;case el:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Dn:e.y=e.y-Math.floor(e.y);break;case hn:e.y=e.y<0?0:1;break;case el:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=Sy;kt.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,n=0,i=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],m=l[2],p=l[6],y=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-m)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+m)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+y-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,x=(d+1)/2,b=(y+1)/2,M=(u+f)/4,T=(h+m)/4,_=(g+p)/4;return v>x&&v>b?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=M/n,s=T/n):x>b?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=M/i,s=_/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=T/s,i=_/s),this.set(n,i,s,t),this}let w=Math.sqrt((p-g)*(p-g)+(h-m)*(h-m)+(f-u)*(f-u));return Math.abs(w)<.001&&(w=1),this.x=(p-g)/w,this.y=(h-m)/w,this.z=(f-u)/w,this.w=Math.acos((c+d+y-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class lr extends ws{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const i={width:e,height:t,depth:1};this.texture=new kt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Yt,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ly(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ny extends kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gT extends kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ei{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],g=s[o+2],m=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=m;return}if(h!==m||l!==f||c!==d||u!==g){let p=1-a;const y=l*f+c*d+u*g+h*m,w=y>=0?1:-1,v=1-y*y;if(v>Number.EPSILON){const b=Math.sqrt(v),M=Math.atan2(b,y*w);p=Math.sin(p*M)/b,a=Math.sin(a*M)/b}const x=a*w;if(l=l*p+f*x,c=c*p+d*x,u=u*p+g*x,h=h*p+m*x,p===1-a){const b=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=b,c*=b,u*=b,h*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*d-c*f,e[t+1]=l*g+u*f+c*h-a*d,e[t+2]=c*g+u*d+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(s/2),f=l(n/2),d=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Nt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Up.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Up.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=l*t+o*i-a*n,u=l*n+a*t-s*i,h=l*i+s*n-o*t,f=-s*t-o*n-a*i;return this.x=c*l+f*-s+u*-a-h*-o,this.y=u*l+f*-o+h*-s-c*-a,this.z=h*l+f*-a+c*-o-u*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Uc.copy(this).projectOnVector(e),this.sub(Uc)}reflect(e){return this.sub(Uc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Uc=new U,Up=new Ei;class Ss{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.length;l<c;l+=3){const u=e[l],h=e[l+1],f=e[l+2];u<t&&(t=u),h<n&&(n=h),f<i&&(i=f),u>s&&(s=u),h>o&&(o=h),f>a&&(a=f)}return this.min.set(t,n,i),this.max.set(s,o,a),this}setFromBufferAttribute(e){let t=1/0,n=1/0,i=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.count;l<c;l++){const u=e.getX(l),h=e.getY(l),f=e.getZ(l);u<t&&(t=u),h<n&&(n=h),f<i&&(i=f),u>s&&(s=u),h>o&&(o=h),f>a&&(a=f)}return this.min.set(t,n,i),this.max.set(s,o,a),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0)if(t&&n.attributes!=null&&n.attributes.position!==void 0){const s=n.attributes.position;for(let o=0,a=s.count;o<a;o++)Li.fromBufferAttribute(s,o).applyMatrix4(e.matrixWorld),this.expandByPoint(Li)}else n.boundingBox===null&&n.computeBoundingBox(),Bc.copy(n.boundingBox),Bc.applyMatrix4(e.matrixWorld),this.union(Bc);const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Li),Li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ks),ia.subVectors(this.max,ks),wr.subVectors(e.a,ks),Sr.subVectors(e.b,ks),Mr.subVectors(e.c,ks),ii.subVectors(Sr,wr),ri.subVectors(Mr,Sr),Ni.subVectors(wr,Mr);let t=[0,-ii.z,ii.y,0,-ri.z,ri.y,0,-Ni.z,Ni.y,ii.z,0,-ii.x,ri.z,0,-ri.x,Ni.z,0,-Ni.x,-ii.y,ii.x,0,-ri.y,ri.x,0,-Ni.y,Ni.x,0];return!zc(t,wr,Sr,Mr,ia)||(t=[1,0,0,0,1,0,0,0,1],!zc(t,wr,Sr,Mr,ia))?!1:(ra.crossVectors(ii,ri),t=[ra.x,ra.y,ra.z],zc(t,wr,Sr,Mr,ia))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return Li.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(Li).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const zn=[new U,new U,new U,new U,new U,new U,new U,new U],Li=new U,Bc=new Ss,wr=new U,Sr=new U,Mr=new U,ii=new U,ri=new U,Ni=new U,ks=new U,ia=new U,ra=new U,Oi=new U;function zc(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Oi.fromArray(r,s);const a=i.x*Math.abs(Oi.x)+i.y*Math.abs(Oi.y)+i.z*Math.abs(Oi.z),l=e.dot(Oi),c=t.dot(Oi),u=n.dot(Oi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const _T=new Ss,Us=new U,Hc=new U;class Ms{constructor(e=new U,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):_T.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Us.subVectors(e,this.center);const t=Us.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Us,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Hc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Us.copy(e.center).add(Hc)),this.expandByPoint(Us.copy(e.center).sub(Hc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Hn=new U,Vc=new U,sa=new U,si=new U,Gc=new U,oa=new U,Wc=new U;class Nl{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hn.copy(this.direction).multiplyScalar(t).add(this.origin),Hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Vc.copy(e).add(t).multiplyScalar(.5),sa.copy(t).sub(e).normalize(),si.copy(this.origin).sub(Vc);const s=e.distanceTo(t)*.5,o=-this.direction.dot(sa),a=si.dot(this.direction),l=-si.dot(sa),c=si.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const m=1/u;h*=m,f*=m,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(h).add(this.origin),i&&i.copy(sa).multiplyScalar(f).add(Vc),d}intersectSphere(e,t){Hn.subVectors(e.center,this.origin);const n=Hn.dot(this.direction),i=Hn.dot(Hn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return a<0&&l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Hn)!==null}intersectTriangle(e,t,n,i,s){Gc.subVectors(t,e),oa.subVectors(n,e),Wc.crossVectors(Gc,oa);let o=this.direction.dot(Wc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;si.subVectors(this.origin,e);const l=a*this.direction.dot(oa.crossVectors(si,oa));if(l<0)return null;const c=a*this.direction.dot(Gc.cross(si));if(c<0||l+c>o)return null;const u=-a*si.dot(Wc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ze{constructor(){ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,i,s,o,a,l,c,u,h,f,d,g,m,p){const y=this.elements;return y[0]=e,y[4]=t,y[8]=n,y[12]=i,y[1]=s,y[5]=o,y[9]=a,y[13]=l,y[2]=c,y[6]=u,y[10]=h,y[14]=f,y[3]=d,y[7]=g,y[11]=m,y[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Er.setFromMatrixColumn(e,0).length(),s=1/Er.setFromMatrixColumn(e,1).length(),o=1/Er.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,g=a*u,m=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+g*c,t[5]=f-m*c,t[9]=-a*l,t[2]=m-f*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,g=c*u,m=c*h;t[0]=f+m*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=m+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,g=c*u,m=c*h;t[0]=f-m*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=m-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,g=a*u,m=a*h;t[0]=l*u,t[4]=g*c-d,t[8]=f*c+m,t[1]=l*h,t[5]=m*c+f,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,g=a*l,m=a*c;t[0]=l*u,t[4]=m-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+g,t[10]=f-m*h}else if(e.order==="XZY"){const f=o*l,d=o*c,g=a*l,m=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+m,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=m*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yT,e,vT)}lookAt(e,t,n){const i=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),oi.crossVectors(n,nn),oi.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),oi.crossVectors(n,nn)),oi.normalize(),aa.crossVectors(nn,oi),i[0]=oi.x,i[4]=aa.x,i[8]=nn.x,i[1]=oi.y,i[5]=aa.y,i[9]=nn.y,i[2]=oi.z,i[6]=aa.z,i[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],m=n[6],p=n[10],y=n[14],w=n[3],v=n[7],x=n[11],b=n[15],M=i[0],T=i[4],_=i[8],C=i[12],E=i[1],D=i[5],z=i[9],N=i[13],F=i[2],H=i[6],Y=i[10],J=i[14],S=i[3],P=i[7],k=i[11],R=i[15];return s[0]=o*M+a*E+l*F+c*S,s[4]=o*T+a*D+l*H+c*P,s[8]=o*_+a*z+l*Y+c*k,s[12]=o*C+a*N+l*J+c*R,s[1]=u*M+h*E+f*F+d*S,s[5]=u*T+h*D+f*H+d*P,s[9]=u*_+h*z+f*Y+d*k,s[13]=u*C+h*N+f*J+d*R,s[2]=g*M+m*E+p*F+y*S,s[6]=g*T+m*D+p*H+y*P,s[10]=g*_+m*z+p*Y+y*k,s[14]=g*C+m*N+p*J+y*R,s[3]=w*M+v*E+x*F+b*S,s[7]=w*T+v*D+x*H+b*P,s[11]=w*_+v*z+x*Y+b*k,s[15]=w*C+v*N+x*J+b*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],m=e[7],p=e[11],y=e[15];return g*(+s*l*h-i*c*h-s*a*f+n*c*f+i*a*d-n*l*d)+m*(+t*l*d-t*c*f+s*o*f-i*o*d+i*c*u-s*l*u)+p*(+t*c*h-t*a*d-s*o*h+n*o*d+s*a*u-n*c*u)+y*(-i*a*u-t*l*h+t*a*f+i*o*h-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],m=e[13],p=e[14],y=e[15],w=h*p*c-m*f*c+m*l*d-a*p*d-h*l*y+a*f*y,v=g*f*c-u*p*c-g*l*d+o*p*d+u*l*y-o*f*y,x=u*m*c-g*h*c+g*a*d-o*m*d-u*a*y+o*h*y,b=g*h*l-u*m*l-g*a*f+o*m*f+u*a*p-o*h*p,M=t*w+n*v+i*x+s*b;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=w*T,e[1]=(m*f*s-h*p*s-m*i*d+n*p*d+h*i*y-n*f*y)*T,e[2]=(a*p*s-m*l*s+m*i*c-n*p*c-a*i*y+n*l*y)*T,e[3]=(h*l*s-a*f*s-h*i*c+n*f*c+a*i*d-n*l*d)*T,e[4]=v*T,e[5]=(u*p*s-g*f*s+g*i*d-t*p*d-u*i*y+t*f*y)*T,e[6]=(g*l*s-o*p*s-g*i*c+t*p*c+o*i*y-t*l*y)*T,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*d+t*l*d)*T,e[8]=x*T,e[9]=(g*h*s-u*m*s-g*n*d+t*m*d+u*n*y-t*h*y)*T,e[10]=(o*m*s-g*a*s+g*n*c-t*m*c-o*n*y+t*a*y)*T,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*d-t*a*d)*T,e[12]=b*T,e[13]=(u*m*i-g*h*i+g*n*f-t*m*f-u*n*p+t*h*p)*T,e[14]=(g*a*i-o*m*i-g*n*l+t*m*l+o*n*p-t*a*p)*T,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*f+t*a*f)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,g=s*h,m=o*u,p=o*h,y=a*h,w=l*c,v=l*u,x=l*h,b=n.x,M=n.y,T=n.z;return i[0]=(1-(m+y))*b,i[1]=(d+x)*b,i[2]=(g-v)*b,i[3]=0,i[4]=(d-x)*M,i[5]=(1-(f+y))*M,i[6]=(p+w)*M,i[7]=0,i[8]=(g+v)*T,i[9]=(p-w)*T,i[10]=(1-(f+m))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Er.set(i[0],i[1],i[2]).length();const o=Er.set(i[4],i[5],i[6]).length(),a=Er.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],yn.copy(this);const c=1/s,u=1/o,h=1/a;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=u,yn.elements[5]*=u,yn.elements[6]*=u,yn.elements[8]*=h,yn.elements[9]*=h,yn.elements[10]*=h,t.setFromRotationMatrix(yn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o){const a=this.elements,l=2*s/(t-e),c=2*s/(n-i),u=(t+e)/(t-e),h=(n+i)/(n-i),f=-(o+s)/(o-s),d=-2*o*s/(o-s);return a[0]=l,a[4]=0,a[8]=u,a[12]=0,a[1]=0,a[5]=c,a[9]=h,a[13]=0,a[2]=0,a[6]=0,a[10]=f,a[14]=d,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,n,i,s,o){const a=this.elements,l=1/(t-e),c=1/(n-i),u=1/(o-s),h=(t+e)*l,f=(n+i)*c,d=(o+s)*u;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-h,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-f,a[2]=0,a[6]=0,a[10]=-2*u,a[14]=-d,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Er=new U,yn=new ze,yT=new U(0,0,0),vT=new U(1,1,1),oi=new U,aa=new U,nn=new U,Bp=new ze,zp=new Ei;class Wo{constructor(e=0,t=0,n=0,i=Wo.DefaultOrder){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(Nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Nt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Nt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zp.setFromEuler(this),this.setFromQuaternion(zp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}Wo.DefaultOrder="XYZ";Wo.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class Kh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let xT=0;const Hp=new U,Tr=new Ei,Vn=new ze,la=new U,Bs=new U,bT=new U,wT=new Ei,Vp=new U(1,0,0),Gp=new U(0,1,0),Wp=new U(0,0,1),ST={type:"added"},jp={type:"removed"};class dt extends ws{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xT++}),this.uuid=mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DefaultUp.clone();const e=new U,t=new Wo,n=new Ei,i=new U(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ze},normalMatrix:{value:new sn}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=dt.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=dt.DefaultMatrixWorldAutoUpdate,this.layers=new Kh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Tr.setFromAxisAngle(e,t),this.quaternion.multiply(Tr),this}rotateOnWorldAxis(e,t){return Tr.setFromAxisAngle(e,t),this.quaternion.premultiply(Tr),this}rotateX(e){return this.rotateOnAxis(Vp,e)}rotateY(e){return this.rotateOnAxis(Gp,e)}rotateZ(e){return this.rotateOnAxis(Wp,e)}translateOnAxis(e,t){return Hp.copy(e).applyQuaternion(this.quaternion),this.position.add(Hp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vp,e)}translateY(e){return this.translateOnAxis(Gp,e)}translateZ(e){return this.translateOnAxis(Wp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?la.copy(e):la.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Bs,la,this.up):Vn.lookAt(la,Bs,this.up),this.quaternion.setFromRotationMatrix(Vn),i&&(Vn.extractRotation(i.matrixWorld),Tr.setFromRotationMatrix(Vn),this.quaternion.premultiply(Tr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(ST)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jp)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(jp)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectsByProperty(e,t);o.length>0&&(n=n.concat(o))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,e,bT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,wT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}dt.DefaultUp=new U(0,1,0);dt.DefaultMatrixAutoUpdate=!0;dt.DefaultMatrixWorldAutoUpdate=!0;const vn=new U,Gn=new U,jc=new U,Wn=new U,Cr=new U,Ar=new U,qp=new U,qc=new U,$c=new U,Xc=new U;class Yn{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),vn.subVectors(e,t),i.cross(vn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){vn.subVectors(i,t),Gn.subVectors(n,t),jc.subVectors(e,t);const o=vn.dot(vn),a=vn.dot(Gn),l=vn.dot(jc),c=Gn.dot(Gn),u=Gn.dot(jc),h=o*c-a*a;if(h===0)return s.set(-2,-1,-1);const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Wn),Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getUV(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Wn),l.set(0,0),l.addScaledVector(s,Wn.x),l.addScaledVector(o,Wn.y),l.addScaledVector(a,Wn.z),l}static isFrontFacing(e,t,n,i){return vn.subVectors(n,t),Gn.subVectors(e,t),vn.cross(Gn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),vn.cross(Gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return Yn.getUV(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Cr.subVectors(i,n),Ar.subVectors(s,n),qc.subVectors(e,n);const l=Cr.dot(qc),c=Ar.dot(qc);if(l<=0&&c<=0)return t.copy(n);$c.subVectors(e,i);const u=Cr.dot($c),h=Ar.dot($c);if(u>=0&&h<=u)return t.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Cr,o);Xc.subVectors(e,s);const d=Cr.dot(Xc),g=Ar.dot(Xc);if(g>=0&&d<=g)return t.copy(s);const m=d*c-l*g;if(m<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ar,a);const p=u*g-d*h;if(p<=0&&h-u>=0&&d-g>=0)return qp.subVectors(s,i),a=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(qp,a);const y=1/(p+m+f);return o=m*y,a=f*y,t.copy(n).addScaledVector(Cr,o).addScaledVector(Ar,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let MT=0;class Ln extends ws{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:MT++}),this.uuid=mn(),this.name="",this.type="Material",this.blending=jr,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=vy,this.blendDst=xy,this.blendEquation=Or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Uu,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tT,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Lc,this.stencilZFail=Lc,this.stencilZPass=Lc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const i=this[t];if(i===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==jr&&(n.blending=this.blending),this.side!==wi&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class qi extends Ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=by,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new U,ca=new ue;class Vt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vu,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ca.fromBufferAttribute(this,t),ca.applyMatrix3(e),this.setXY(t,ca.x,ca.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array),s=it(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vu&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Oy extends Vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Fy extends Vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wt extends Vt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ET=0;const an=new ze,Yc=new dt,Ir=new U,rn=new Ss,zs=new Ss,It=new U;class Xt extends ws{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ET++}),this.uuid=mn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Py(e)?Fy:Oy)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new sn().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,n){return an.makeTranslation(e,t,n),this.applyMatrix4(an),this}scale(e,t,n){return an.makeScale(e,t,n),this.applyMatrix4(an),this}lookAt(e){return Yc.lookAt(e),Yc.updateMatrix(),this.applyMatrix4(Yc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ir).negate(),this.translate(Ir.x,Ir.y,Ir.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new wt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ss);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];rn.setFromBufferAttribute(s),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ms);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];zs.setFromBufferAttribute(a),this.morphTargetsRelative?(It.addVectors(rn.min,zs.min),rn.expandByPoint(It),It.addVectors(rn.max,zs.max),rn.expandByPoint(It)):(rn.expandByPoint(zs.min),rn.expandByPoint(zs.max))}rn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)It.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(It));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)It.fromBufferAttribute(a,c),l&&(Ir.fromBufferAttribute(e,c),It.add(Ir)),i=Math.max(i,n.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let E=0;E<a;E++)c[E]=new U,u[E]=new U;const h=new U,f=new U,d=new U,g=new ue,m=new ue,p=new ue,y=new U,w=new U;function v(E,D,z){h.fromArray(i,E*3),f.fromArray(i,D*3),d.fromArray(i,z*3),g.fromArray(o,E*2),m.fromArray(o,D*2),p.fromArray(o,z*2),f.sub(h),d.sub(h),m.sub(g),p.sub(g);const N=1/(m.x*p.y-p.x*m.y);isFinite(N)&&(y.copy(f).multiplyScalar(p.y).addScaledVector(d,-m.y).multiplyScalar(N),w.copy(d).multiplyScalar(m.x).addScaledVector(f,-p.x).multiplyScalar(N),c[E].add(y),c[D].add(y),c[z].add(y),u[E].add(w),u[D].add(w),u[z].add(w))}let x=this.groups;x.length===0&&(x=[{start:0,count:n.length}]);for(let E=0,D=x.length;E<D;++E){const z=x[E],N=z.start,F=z.count;for(let H=N,Y=N+F;H<Y;H+=3)v(n[H+0],n[H+1],n[H+2])}const b=new U,M=new U,T=new U,_=new U;function C(E){T.fromArray(s,E*3),_.copy(T);const D=c[E];b.copy(D),b.sub(T.multiplyScalar(T.dot(D))).normalize(),M.crossVectors(_,D);const N=M.dot(u[E])<0?-1:1;l[E*4]=b.x,l[E*4+1]=b.y,l[E*4+2]=b.z,l[E*4+3]=N}for(let E=0,D=x.length;E<D;++E){const z=x[E],N=z.start,F=z.count;for(let H=N,Y=N+F;H<Y;H+=3)C(n[H+0]),C(n[H+1]),C(n[H+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new U,s=new U,o=new U,a=new U,l=new U,c=new U,u=new U,h=new U;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),m=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),o.fromBufferAttribute(t,p),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,p),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let m=0,p=l.length;m<p;m++){a.isInterleavedBufferAttribute?d=l[m]*a.data.stride+a.offset:d=l[m]*u;for(let y=0;y<u;y++)f[g++]=c[d++]}return new Vt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const $p=new ze,Pr=new Nl,Kc=new Ms,Hs=new U,Vs=new U,Gs=new U,Zc=new U,ua=new U,ha=new ue,fa=new ue,da=new ue,Jc=new U,pa=new U;class mt extends dt{constructor(e=new Xt,t=new qi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){ua.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Zc.fromBufferAttribute(h,e),o?ua.addScaledVector(Zc,u):ua.addScaledVector(Zc.sub(t),u))}t.add(ua)}return this.isSkinnedMesh&&this.boneTransform(e,t),t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Kc.copy(n.boundingSphere),Kc.applyMatrix4(s),e.ray.intersectsSphere(Kc)===!1)||($p.copy(s).invert(),Pr.copy(e.ray).applyMatrix4($p),n.boundingBox!==null&&Pr.intersectsBox(n.boundingBox)===!1))return;let o;const a=n.index,l=n.attributes.position,c=n.attributes.uv,u=n.attributes.uv2,h=n.groups,f=n.drawRange;if(a!==null)if(Array.isArray(i))for(let d=0,g=h.length;d<g;d++){const m=h[d],p=i[m.materialIndex],y=Math.max(m.start,f.start),w=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,x=w;v<x;v+=3){const b=a.getX(v),M=a.getX(v+1),T=a.getX(v+2);o=ma(this,p,e,Pr,c,u,b,M,T),o&&(o.faceIndex=Math.floor(v/3),o.face.materialIndex=m.materialIndex,t.push(o))}}else{const d=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let m=d,p=g;m<p;m+=3){const y=a.getX(m),w=a.getX(m+1),v=a.getX(m+2);o=ma(this,i,e,Pr,c,u,y,w,v),o&&(o.faceIndex=Math.floor(m/3),t.push(o))}}else if(l!==void 0)if(Array.isArray(i))for(let d=0,g=h.length;d<g;d++){const m=h[d],p=i[m.materialIndex],y=Math.max(m.start,f.start),w=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,x=w;v<x;v+=3){const b=v,M=v+1,T=v+2;o=ma(this,p,e,Pr,c,u,b,M,T),o&&(o.faceIndex=Math.floor(v/3),o.face.materialIndex=m.materialIndex,t.push(o))}}else{const d=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=d,p=g;m<p;m+=3){const y=m,w=m+1,v=m+2;o=ma(this,i,e,Pr,c,u,y,w,v),o&&(o.faceIndex=Math.floor(m/3),t.push(o))}}}}function TT(r,e,t,n,i,s,o,a){let l;if(e.side===pn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===wi,a),l===null)return null;pa.copy(a),pa.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(pa);return c<t.near||c>t.far?null:{distance:c,point:pa.clone(),object:r}}function ma(r,e,t,n,i,s,o,a,l){r.getVertexPosition(o,Hs),r.getVertexPosition(a,Vs),r.getVertexPosition(l,Gs);const c=TT(r,e,t,n,Hs,Vs,Gs,Jc);if(c){i&&(ha.fromBufferAttribute(i,o),fa.fromBufferAttribute(i,a),da.fromBufferAttribute(i,l),c.uv=Yn.getUV(Jc,Hs,Vs,Gs,ha,fa,da,new ue)),s&&(ha.fromBufferAttribute(s,o),fa.fromBufferAttribute(s,a),da.fromBufferAttribute(s,l),c.uv2=Yn.getUV(Jc,Hs,Vs,Gs,ha,fa,da,new ue));const u={a:o,b:a,c:l,normal:new U,materialIndex:0};Yn.getNormal(Hs,Vs,Gs,u.normal),c.face=u}return c}class Es extends Xt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new wt(c,3)),this.setAttribute("normal",new wt(u,3)),this.setAttribute("uv",new wt(h,2));function g(m,p,y,w,v,x,b,M,T,_,C){const E=x/T,D=b/_,z=x/2,N=b/2,F=M/2,H=T+1,Y=_+1;let J=0,S=0;const P=new U;for(let k=0;k<Y;k++){const R=k*D-N;for(let O=0;O<H;O++){const j=O*E-z;P[m]=j*w,P[p]=R*v,P[y]=F,c.push(P.x,P.y,P.z),P[m]=0,P[p]=0,P[y]=M>0?1:-1,u.push(P.x,P.y,P.z),h.push(O/T),h.push(1-k/_),J+=1}}for(let k=0;k<_;k++)for(let R=0;R<T;R++){const O=f+R+H*k,j=f+R+H*(k+1),G=f+(R+1)+H*(k+1),B=f+(R+1)+H*k;l.push(O,j,B),l.push(j,G,B),S+=6}a.addGroup(d,S,C),d+=S,f+=J}}static fromJSON(e){return new Es(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ms(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function $t(r){const e={};for(let t=0;t<r.length;t++){const n=ms(r[t]);for(const i in n)e[i]=n[i]}return e}function CT(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function ky(r){return r.getRenderTarget()===null&&r.outputEncoding===Je?An:Co}const AT={clone:ms,merge:$t};var IT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,PT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class cr extends Ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=IT,this.fragmentShader=PT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ms(e.uniforms),this.uniformsGroups=CT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Uy extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ht extends Uy{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ao*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(so*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ao*2*Math.atan(Math.tan(so*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(so*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Rr=-90,Dr=1;class RT extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new Ht(Rr,Dr,e,t);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const s=new Ht(Rr,Dr,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const o=new Ht(Rr,Dr,e,t);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(0,1,0),this.add(o);const a=new Ht(Rr,Dr,e,t);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(0,-1,0),this.add(a);const l=new Ht(Rr,Dr,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new Ht(Rr,Dr,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,s,o,a,l,c]=this.children,u=e.getRenderTarget(),h=e.toneMapping,f=e.xr.enabled;e.toneMapping=Qn,e.xr.enabled=!1;const d=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,s),e.setRenderTarget(n,2),e.render(t,o),e.setRenderTarget(n,3),e.render(t,a),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=d,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(u),e.toneMapping=h,e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class By extends kt{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:hs,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class DT extends lr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new By(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Yt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Es(5,5,5),s=new cr({name:"CubemapFromEquirect",uniforms:ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:pn,blending:vi});s.uniforms.tEquirect.value=t;const o=new mt(i,s),a=t.minFilter;return t.minFilter===sr&&(t.minFilter=Yt),new RT(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const Qc=new U,LT=new U,NT=new sn;class ci{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Qc.subVectors(n,t).cross(LT.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const n=e.delta(Qc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(n).multiplyScalar(s).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||NT.getNormalMatrix(e),i=this.coplanarPoint(Qc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Lr=new Ms,ga=new U;class Zh{constructor(e=new ci,t=new ci,n=new ci,i=new ci,s=new ci,o=new ci){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],s=n[1],o=n[2],a=n[3],l=n[4],c=n[5],u=n[6],h=n[7],f=n[8],d=n[9],g=n[10],m=n[11],p=n[12],y=n[13],w=n[14],v=n[15];return t[0].setComponents(a-i,h-l,m-f,v-p).normalize(),t[1].setComponents(a+i,h+l,m+f,v+p).normalize(),t[2].setComponents(a+s,h+c,m+d,v+y).normalize(),t[3].setComponents(a-s,h-c,m-d,v-y).normalize(),t[4].setComponents(a-o,h-u,m-g,v-w).normalize(),t[5].setComponents(a+o,h+u,m+g,v+w).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Lr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Lr)}intersectsSprite(e){return Lr.center.set(0,0,0),Lr.radius=.7071067811865476,Lr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Lr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(ga.x=i.normal.x>0?e.max.x:e.min.x,ga.y=i.normal.y>0?e.max.y:e.min.y,ga.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ga)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function zy(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function OT(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,u){const h=c.array,f=c.usage,d=r.createBuffer();r.bindBuffer(u,d),r.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=5126;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(h instanceof Int16Array)g=5122;else if(h instanceof Uint32Array)g=5125;else if(h instanceof Int32Array)g=5124;else if(h instanceof Int8Array)g=5120;else if(h instanceof Uint8Array)g=5121;else if(h instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,h){const f=u.array,d=u.updateRange;r.bindBuffer(h,c),d.count===-1?r.bufferSubData(h,0,f):(t?r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):r.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(r.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h===void 0?n.set(c,i(c,u)):h.version<c.version&&(s(h.buffer,c,u),h.version=c.version)}return{get:o,remove:a,update:l}}class Ol extends Xt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,f=t/l,d=[],g=[],m=[],p=[];for(let y=0;y<u;y++){const w=y*f-o;for(let v=0;v<c;v++){const x=v*h-s;g.push(x,-w,0),m.push(0,0,1),p.push(v/a),p.push(1-y/l)}}for(let y=0;y<l;y++)for(let w=0;w<a;w++){const v=w+c*y,x=w+c*(y+1),b=w+1+c*(y+1),M=w+1+c*y;d.push(v,x,M),d.push(x,b,M)}this.setIndex(d),this.setAttribute("position",new wt(g,3)),this.setAttribute("normal",new wt(m,3)),this.setAttribute("uv",new wt(p,2))}static fromJSON(e){return new Ol(e.width,e.height,e.widthSegments,e.heightSegments)}}var FT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,kT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,UT=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,BT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,HT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,VT="vec3 transformed = vec3( position );",GT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,WT=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,jT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$T=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,XT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,YT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,KT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ZT=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,JT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,QT=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,eC=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,tC=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,nC=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,iC=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,rC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sC=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,oC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,aC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lC="gl_FragColor = linearToOutputTexel( gl_FragColor );",cC=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,uC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,hC=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fC=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dC=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,mC=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gC=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_C=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yC=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vC=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xC=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,bC=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wC=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,SC=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,MC=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,EC=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,TC=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,CC=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,AC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,IC=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,PC=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,RC=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,DC=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,LC=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,NC=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,OC=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,FC=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kC=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,UC=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,BC=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zC=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,HC=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,VC=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,GC=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,WC=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jC=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qC=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,$C=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,XC=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,YC=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,KC=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ZC=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,JC=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QC=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,eA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,tA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,nA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,iA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,rA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,oA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,aA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dA=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,pA=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,mA=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,gA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_A=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,vA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,bA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,SA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,MA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,EA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,TA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,CA=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,AA=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,IA=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,PA=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,RA=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,DA=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,LA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const NA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,OA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,FA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,UA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,zA=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,HA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,VA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,GA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,WA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,qA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$A=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,XA=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,YA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,QA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eI=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,tI=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,nI=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iI=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rI=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sI=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oI=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aI=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lI=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cI=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uI=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hI=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,fI=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dI=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Oe={alphamap_fragment:FT,alphamap_pars_fragment:kT,alphatest_fragment:UT,alphatest_pars_fragment:BT,aomap_fragment:zT,aomap_pars_fragment:HT,begin_vertex:VT,beginnormal_vertex:GT,bsdfs:WT,iridescence_fragment:jT,bumpmap_pars_fragment:qT,clipping_planes_fragment:$T,clipping_planes_pars_fragment:XT,clipping_planes_pars_vertex:YT,clipping_planes_vertex:KT,color_fragment:ZT,color_pars_fragment:JT,color_pars_vertex:QT,color_vertex:eC,common:tC,cube_uv_reflection_fragment:nC,defaultnormal_vertex:iC,displacementmap_pars_vertex:rC,displacementmap_vertex:sC,emissivemap_fragment:oC,emissivemap_pars_fragment:aC,encodings_fragment:lC,encodings_pars_fragment:cC,envmap_fragment:uC,envmap_common_pars_fragment:hC,envmap_pars_fragment:fC,envmap_pars_vertex:dC,envmap_physical_pars_fragment:EC,envmap_vertex:pC,fog_vertex:mC,fog_pars_vertex:gC,fog_fragment:_C,fog_pars_fragment:yC,gradientmap_pars_fragment:vC,lightmap_fragment:xC,lightmap_pars_fragment:bC,lights_lambert_fragment:wC,lights_lambert_pars_fragment:SC,lights_pars_begin:MC,lights_toon_fragment:TC,lights_toon_pars_fragment:CC,lights_phong_fragment:AC,lights_phong_pars_fragment:IC,lights_physical_fragment:PC,lights_physical_pars_fragment:RC,lights_fragment_begin:DC,lights_fragment_maps:LC,lights_fragment_end:NC,logdepthbuf_fragment:OC,logdepthbuf_pars_fragment:FC,logdepthbuf_pars_vertex:kC,logdepthbuf_vertex:UC,map_fragment:BC,map_pars_fragment:zC,map_particle_fragment:HC,map_particle_pars_fragment:VC,metalnessmap_fragment:GC,metalnessmap_pars_fragment:WC,morphcolor_vertex:jC,morphnormal_vertex:qC,morphtarget_pars_vertex:$C,morphtarget_vertex:XC,normal_fragment_begin:YC,normal_fragment_maps:KC,normal_pars_fragment:ZC,normal_pars_vertex:JC,normal_vertex:QC,normalmap_pars_fragment:eA,clearcoat_normal_fragment_begin:tA,clearcoat_normal_fragment_maps:nA,clearcoat_pars_fragment:iA,iridescence_pars_fragment:rA,output_fragment:sA,packing:oA,premultiplied_alpha_fragment:aA,project_vertex:lA,dithering_fragment:cA,dithering_pars_fragment:uA,roughnessmap_fragment:hA,roughnessmap_pars_fragment:fA,shadowmap_pars_fragment:dA,shadowmap_pars_vertex:pA,shadowmap_vertex:mA,shadowmask_pars_fragment:gA,skinbase_vertex:_A,skinning_pars_vertex:yA,skinning_vertex:vA,skinnormal_vertex:xA,specularmap_fragment:bA,specularmap_pars_fragment:wA,tonemapping_fragment:SA,tonemapping_pars_fragment:MA,transmission_fragment:EA,transmission_pars_fragment:TA,uv_pars_fragment:CA,uv_pars_vertex:AA,uv_vertex:IA,uv2_pars_fragment:PA,uv2_pars_vertex:RA,uv2_vertex:DA,worldpos_vertex:LA,background_vert:NA,background_frag:OA,backgroundCube_vert:FA,backgroundCube_frag:kA,cube_vert:UA,cube_frag:BA,depth_vert:zA,depth_frag:HA,distanceRGBA_vert:VA,distanceRGBA_frag:GA,equirect_vert:WA,equirect_frag:jA,linedashed_vert:qA,linedashed_frag:$A,meshbasic_vert:XA,meshbasic_frag:YA,meshlambert_vert:KA,meshlambert_frag:ZA,meshmatcap_vert:JA,meshmatcap_frag:QA,meshnormal_vert:eI,meshnormal_frag:tI,meshphong_vert:nI,meshphong_frag:iI,meshphysical_vert:rI,meshphysical_frag:sI,meshtoon_vert:oI,meshtoon_frag:aI,points_vert:lI,points_frag:cI,shadow_vert:uI,shadow_frag:hI,sprite_vert:fI,sprite_frag:dI},ge={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new sn},uv2Transform:{value:new sn},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new sn}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new sn}}},In={basic:{uniforms:$t([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:$t([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:$t([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:$t([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:$t([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:$t([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:$t([ge.points,ge.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:$t([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:$t([ge.common,ge.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:$t([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:$t([ge.sprite,ge.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new sn},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:$t([ge.common,ge.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:$t([ge.lights,ge.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};In.physical={uniforms:$t([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new ue(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const _a={r:0,b:0,g:0};function pI(r,e,t,n,i,s,o){const a=new Ne(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function g(p,y){let w=!1,v=y.isScene===!0?y.background:null;v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v));const x=r.xr,b=x.getSession&&x.getSession();b&&b.environmentBlendMode==="additive"&&(v=null),v===null?m(a,l):v&&v.isColor&&(m(v,1),w=!0),(r.autoClear||w)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Ll)?(u===void 0&&(u=new mt(new Es(1,1,1),new cr({name:"BackgroundCubeMaterial",uniforms:ms(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,T,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.toneMapped=v.encoding!==Je,(h!==v||f!==v.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new mt(new Ol(2,2),new cr({name:"BackgroundMaterial",uniforms:ms(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=v.encoding!==Je,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,d=r.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function m(p,y){p.getRGB(_a,ky(r)),n.buffers.color.setClear(_a.r,_a.g,_a.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(p,y=1){a.set(p),l=y,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,m(a,l)},render:g}}function mI(r,e,t,n){const i=r.getParameter(34921),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=p(null);let c=l,u=!1;function h(F,H,Y,J,S){let P=!1;if(o){const k=m(J,Y,H);c!==k&&(c=k,d(c.object)),P=y(F,J,Y,S),P&&w(F,J,Y,S)}else{const k=H.wireframe===!0;(c.geometry!==J.id||c.program!==Y.id||c.wireframe!==k)&&(c.geometry=J.id,c.program=Y.id,c.wireframe=k,P=!0)}S!==null&&t.update(S,34963),(P||u)&&(u=!1,_(F,H,Y,J),S!==null&&r.bindBuffer(34963,t.get(S).buffer))}function f(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function d(F){return n.isWebGL2?r.bindVertexArray(F):s.bindVertexArrayOES(F)}function g(F){return n.isWebGL2?r.deleteVertexArray(F):s.deleteVertexArrayOES(F)}function m(F,H,Y){const J=Y.wireframe===!0;let S=a[F.id];S===void 0&&(S={},a[F.id]=S);let P=S[H.id];P===void 0&&(P={},S[H.id]=P);let k=P[J];return k===void 0&&(k=p(f()),P[J]=k),k}function p(F){const H=[],Y=[],J=[];for(let S=0;S<i;S++)H[S]=0,Y[S]=0,J[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:Y,attributeDivisors:J,object:F,attributes:{},index:null}}function y(F,H,Y,J){const S=c.attributes,P=H.attributes;let k=0;const R=Y.getAttributes();for(const O in R)if(R[O].location>=0){const G=S[O];let B=P[O];if(B===void 0&&(O==="instanceMatrix"&&F.instanceMatrix&&(B=F.instanceMatrix),O==="instanceColor"&&F.instanceColor&&(B=F.instanceColor)),G===void 0||G.attribute!==B||B&&G.data!==B.data)return!0;k++}return c.attributesNum!==k||c.index!==J}function w(F,H,Y,J){const S={},P=H.attributes;let k=0;const R=Y.getAttributes();for(const O in R)if(R[O].location>=0){let G=P[O];G===void 0&&(O==="instanceMatrix"&&F.instanceMatrix&&(G=F.instanceMatrix),O==="instanceColor"&&F.instanceColor&&(G=F.instanceColor));const B={};B.attribute=G,G&&G.data&&(B.data=G.data),S[O]=B,k++}c.attributes=S,c.attributesNum=k,c.index=J}function v(){const F=c.newAttributes;for(let H=0,Y=F.length;H<Y;H++)F[H]=0}function x(F){b(F,0)}function b(F,H){const Y=c.newAttributes,J=c.enabledAttributes,S=c.attributeDivisors;Y[F]=1,J[F]===0&&(r.enableVertexAttribArray(F),J[F]=1),S[F]!==H&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](F,H),S[F]=H)}function M(){const F=c.newAttributes,H=c.enabledAttributes;for(let Y=0,J=H.length;Y<J;Y++)H[Y]!==F[Y]&&(r.disableVertexAttribArray(Y),H[Y]=0)}function T(F,H,Y,J,S,P){n.isWebGL2===!0&&(Y===5124||Y===5125)?r.vertexAttribIPointer(F,H,Y,S,P):r.vertexAttribPointer(F,H,Y,J,S,P)}function _(F,H,Y,J){if(n.isWebGL2===!1&&(F.isInstancedMesh||J.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const S=J.attributes,P=Y.getAttributes(),k=H.defaultAttributeValues;for(const R in P){const O=P[R];if(O.location>=0){let j=S[R];if(j===void 0&&(R==="instanceMatrix"&&F.instanceMatrix&&(j=F.instanceMatrix),R==="instanceColor"&&F.instanceColor&&(j=F.instanceColor)),j!==void 0){const G=j.normalized,B=j.itemSize,W=t.get(j);if(W===void 0)continue;const ae=W.buffer,le=W.type,se=W.bytesPerElement;if(j.isInterleavedBufferAttribute){const Z=j.data,ne=Z.stride,q=j.offset;if(Z.isInstancedInterleavedBuffer){for(let K=0;K<O.locationSize;K++)b(O.location+K,Z.meshPerAttribute);F.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let K=0;K<O.locationSize;K++)x(O.location+K);r.bindBuffer(34962,ae);for(let K=0;K<O.locationSize;K++)T(O.location+K,B/O.locationSize,le,G,ne*se,(q+B/O.locationSize*K)*se)}else{if(j.isInstancedBufferAttribute){for(let Z=0;Z<O.locationSize;Z++)b(O.location+Z,j.meshPerAttribute);F.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Z=0;Z<O.locationSize;Z++)x(O.location+Z);r.bindBuffer(34962,ae);for(let Z=0;Z<O.locationSize;Z++)T(O.location+Z,B/O.locationSize,le,G,B*se,B/O.locationSize*Z*se)}}else if(k!==void 0){const G=k[R];if(G!==void 0)switch(G.length){case 2:r.vertexAttrib2fv(O.location,G);break;case 3:r.vertexAttrib3fv(O.location,G);break;case 4:r.vertexAttrib4fv(O.location,G);break;default:r.vertexAttrib1fv(O.location,G)}}}}M()}function C(){z();for(const F in a){const H=a[F];for(const Y in H){const J=H[Y];for(const S in J)g(J[S].object),delete J[S];delete H[Y]}delete a[F]}}function E(F){if(a[F.id]===void 0)return;const H=a[F.id];for(const Y in H){const J=H[Y];for(const S in J)g(J[S].object),delete J[S];delete H[Y]}delete a[F.id]}function D(F){for(const H in a){const Y=a[H];if(Y[F.id]===void 0)continue;const J=Y[F.id];for(const S in J)g(J[S].object),delete J[S];delete Y[F.id]}}function z(){N(),u=!0,c!==l&&(c=l,d(c.object))}function N(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:z,resetDefaultState:N,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:D,initAttributes:v,enableAttribute:x,disableUnusedAttributes:M}}function gI(r,e,t,n){const i=n.isWebGL2;let s;function o(c){s=c}function a(c,u){r.drawArrays(s,c,u),t.update(u,s,1)}function l(c,u,h){if(h===0)return;let f,d;if(i)f=r,d="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),d="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[d](s,c,u,h),t.update(u,s,h)}this.setMode=o,this.render=a,this.renderInstances=l}function _I(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(T){if(T==="highp"){if(r.getShaderPrecisionFormat(35633,36338).precision>0&&r.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(35633,36337).precision>0&&r.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&r instanceof WebGL2ComputeRenderingContext;let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=r.getParameter(34930),f=r.getParameter(35660),d=r.getParameter(3379),g=r.getParameter(34076),m=r.getParameter(34921),p=r.getParameter(36347),y=r.getParameter(36348),w=r.getParameter(36349),v=f>0,x=o||e.has("OES_texture_float"),b=v&&x,M=o?r.getParameter(36183):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:p,maxVaryings:y,maxFragmentUniforms:w,vertexTextures:v,floatFragmentTextures:x,floatVertexTextures:b,maxSamples:M}}function yI(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new ci,a=new sn,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f,d){const g=h.length!==0||f||n!==0||i;return i=f,t=u(h,d,0),n=h.length,g},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1,c()},this.setState=function(h,f,d){const g=h.clippingPlanes,m=h.clipIntersection,p=h.clipShadows,y=r.get(h);if(!i||g===null||g.length===0||s&&!p)s?u(null):c();else{const w=s?0:n,v=w*4;let x=y.clippingState||null;l.value=x,x=u(g,f,v,d);for(let b=0;b!==v;++b)x[b]=t[b];y.clippingState=x,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const m=h!==null?h.length:0;let p=null;if(m!==0){if(p=l.value,g!==!0||p===null){const y=d+m*4,w=f.matrixWorldInverse;a.getNormalMatrix(w),(p===null||p.length<y)&&(p=new Float32Array(y));for(let v=0,x=d;v!==m;++v,x+=4)o.copy(h[v]).applyMatrix4(w,a),o.normal.toArray(p,x),p[x+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,p}}function vI(r){let e=new WeakMap;function t(o,a){return a===Bu?o.mapping=hs:a===zu&&(o.mapping=fs),o}function n(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===Bu||a===zu)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new DT(l.height/2);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Jh extends Uy{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const kr=4,Xp=[.125,.215,.35,.446,.526,.582],zi=20,eu=new Jh,Yp=new Ne;let tu=null;const Bi=(1+Math.sqrt(5))/2,Nr=1/Bi,Kp=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Bi,Nr),new U(0,Bi,-Nr),new U(Nr,0,Bi),new U(-Nr,0,Bi),new U(Bi,Nr,0),new U(-Bi,Nr,0)];class Zp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){tu=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=em(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(tu),e.scissorTest=!1,ya(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===hs||e.mapping===fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tu=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:Eo,format:fn,encoding:ar,depthBuffer:!1},i=Jp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jp(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=xI(s)),this._blurMaterial=bI(s,e,t)}return i}_compileMaterial(e){const t=new mt(this._lodPlanes[0],e);this._renderer.compile(t,eu)}_sceneToCubeUV(e,t,n,i){const a=new Ht(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Yp),u.toneMapping=Qn,u.autoClear=!1;const d=new qi({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1}),g=new mt(new Es,d);let m=!1;const p=e.background;p?p.isColor&&(d.color.copy(p),e.background=null,m=!0):(d.color.copy(Yp),m=!0);for(let y=0;y<6;y++){const w=y%3;w===0?(a.up.set(0,l[y],0),a.lookAt(c[y],0,0)):w===1?(a.up.set(0,0,l[y]),a.lookAt(0,c[y],0)):(a.up.set(0,l[y],0),a.lookAt(0,0,c[y]));const v=this._cubeSize;ya(i,w*v,y>2?v:0,v,v),u.setRenderTarget(i),m&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===hs||e.mapping===fs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=em()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qp());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new mt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ya(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,eu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Kp[(i-1)%Kp.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new mt(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*zi-1),m=s/g,p=isFinite(s)?1+Math.floor(u*m):zi;p>zi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${zi}`);const y=[];let w=0;for(let T=0;T<zi;++T){const _=T/m,C=Math.exp(-_*_/2);y.push(C),T===0?w+=C:T<p&&(w+=2*C)}for(let T=0;T<y.length;T++)y[T]=y[T]/w;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=y,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const x=this._sizeLods[i],b=3*x*(i>v-kr?i-v+kr:0),M=4*(this._cubeSize-x);ya(t,b,M,3*x,2*x),l.setRenderTarget(t),l.render(h,eu)}}function xI(r){const e=[],t=[],n=[];let i=r;const s=r-kr+1+Xp.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-kr?l=Xp[o-r+kr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,m=3,p=2,y=1,w=new Float32Array(m*g*d),v=new Float32Array(p*g*d),x=new Float32Array(y*g*d);for(let M=0;M<d;M++){const T=M%3*2/3-1,_=M>2?0:-1,C=[T,_,0,T+2/3,_,0,T+2/3,_+1,0,T,_,0,T+2/3,_+1,0,T,_+1,0];w.set(C,m*g*M),v.set(f,p*g*M);const E=[M,M,M,M,M,M];x.set(E,y*g*M)}const b=new Xt;b.setAttribute("position",new Vt(w,m)),b.setAttribute("uv",new Vt(v,p)),b.setAttribute("faceIndex",new Vt(x,y)),e.push(b),i>kr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Jp(r,e,t){const n=new lr(r,e,t);return n.texture.mapping=Ll,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ya(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function bI(r,e,t){const n=new Float32Array(zi),i=new U(0,1,0);return new cr({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Qh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Qp(){return new cr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function em(){return new cr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Qh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function wI(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Bu||l===zu,u=l===hs||l===fs;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new Zp(r)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new Zp(r));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function SI(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function MI(r,e,t,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],34962);const d=h.morphAttributes;for(const g in d){const m=d[g];for(let p=0,y=m.length;p<y;p++)e.update(m[p],34962)}}function c(h){const f=[],d=h.index,g=h.attributes.position;let m=0;if(d!==null){const w=d.array;m=d.version;for(let v=0,x=w.length;v<x;v+=3){const b=w[v+0],M=w[v+1],T=w[v+2];f.push(b,M,M,T,T,b)}}else{const w=g.array;m=g.version;for(let v=0,x=w.length/3-1;v<x;v+=3){const b=v+0,M=v+1,T=v+2;f.push(b,M,M,T,T,b)}}const p=new(Py(f)?Fy:Oy)(f,1);p.version=m;const y=s.get(h);y&&e.remove(y),s.set(h,p)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function EI(r,e,t,n){const i=n.isWebGL2;let s;function o(f){s=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function u(f,d){r.drawElements(s,d,a,f*l),t.update(d,s,1)}function h(f,d,g){if(g===0)return;let m,p;if(i)m=r,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,d,a,f*l,g),t.update(d,s,g)}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h}function TI(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case 4:t.triangles+=a*(s/3);break;case 1:t.lines+=a*(s/2);break;case 3:t.lines+=a*(s-1);break;case 2:t.lines+=a*s;break;case 0:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function CI(r,e){return r[0]-e[0]}function AI(r,e){return Math.abs(e[1])-Math.abs(r[1])}function II(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new st,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h,f){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const m=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,p=m!==void 0?m.length:0;let y=s.get(u);if(y===void 0||y.count!==p){let Y=function(){F.dispose(),s.delete(u),u.removeEventListener("dispose",Y)};var g=Y;y!==void 0&&y.texture.dispose();const x=u.morphAttributes.position!==void 0,b=u.morphAttributes.normal!==void 0,M=u.morphAttributes.color!==void 0,T=u.morphAttributes.position||[],_=u.morphAttributes.normal||[],C=u.morphAttributes.color||[];let E=0;x===!0&&(E=1),b===!0&&(E=2),M===!0&&(E=3);let D=u.attributes.position.count*E,z=1;D>e.maxTextureSize&&(z=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const N=new Float32Array(D*z*4*p),F=new Ny(N,D,z,p);F.type=di,F.needsUpdate=!0;const H=E*4;for(let J=0;J<p;J++){const S=T[J],P=_[J],k=C[J],R=D*z*4*J;for(let O=0;O<S.count;O++){const j=O*H;x===!0&&(o.fromBufferAttribute(S,O),N[R+j+0]=o.x,N[R+j+1]=o.y,N[R+j+2]=o.z,N[R+j+3]=0),b===!0&&(o.fromBufferAttribute(P,O),N[R+j+4]=o.x,N[R+j+5]=o.y,N[R+j+6]=o.z,N[R+j+7]=0),M===!0&&(o.fromBufferAttribute(k,O),N[R+j+8]=o.x,N[R+j+9]=o.y,N[R+j+10]=o.z,N[R+j+11]=k.itemSize===4?o.w:1)}}y={count:p,texture:F,size:new ue(D,z)},s.set(u,y),u.addEventListener("dispose",Y)}let w=0;for(let x=0;x<d.length;x++)w+=d[x];const v=u.morphTargetsRelative?1:1-w;f.getUniforms().setValue(r,"morphTargetBaseInfluence",v),f.getUniforms().setValue(r,"morphTargetInfluences",d),f.getUniforms().setValue(r,"morphTargetsTexture",y.texture,t),f.getUniforms().setValue(r,"morphTargetsTextureSize",y.size)}else{const m=d===void 0?0:d.length;let p=n[u.id];if(p===void 0||p.length!==m){p=[];for(let b=0;b<m;b++)p[b]=[b,0];n[u.id]=p}for(let b=0;b<m;b++){const M=p[b];M[0]=b,M[1]=d[b]}p.sort(AI);for(let b=0;b<8;b++)b<m&&p[b][1]?(a[b][0]=p[b][0],a[b][1]=p[b][1]):(a[b][0]=Number.MAX_SAFE_INTEGER,a[b][1]=0);a.sort(CI);const y=u.morphAttributes.position,w=u.morphAttributes.normal;let v=0;for(let b=0;b<8;b++){const M=a[b],T=M[0],_=M[1];T!==Number.MAX_SAFE_INTEGER&&_?(y&&u.getAttribute("morphTarget"+b)!==y[T]&&u.setAttribute("morphTarget"+b,y[T]),w&&u.getAttribute("morphNormal"+b)!==w[T]&&u.setAttribute("morphNormal"+b,w[T]),i[b]=_,v+=_):(y&&u.hasAttribute("morphTarget"+b)===!0&&u.deleteAttribute("morphTarget"+b),w&&u.hasAttribute("morphNormal"+b)===!0&&u.deleteAttribute("morphNormal"+b),i[b]=0)}const x=u.morphTargetsRelative?1:1-v;f.getUniforms().setValue(r,"morphTargetBaseInfluence",x),f.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function PI(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);return i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Hy=new kt,Vy=new Ny,Gy=new gT,Wy=new By,tm=[],nm=[],im=new Float32Array(16),rm=new Float32Array(9),sm=new Float32Array(4);function Ts(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=tm[i];if(s===void 0&&(s=new Float32Array(i),tm[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Mt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Et(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Fl(r,e){let t=nm[e];t===void 0&&(t=new Int32Array(e),nm[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function RI(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function DI(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2fv(this.addr,e),Et(t,e)}}function LI(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;r.uniform3fv(this.addr,e),Et(t,e)}}function NI(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4fv(this.addr,e),Et(t,e)}}function OI(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(Mt(t,n))return;sm.set(n),r.uniformMatrix2fv(this.addr,!1,sm),Et(t,n)}}function FI(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(Mt(t,n))return;rm.set(n),r.uniformMatrix3fv(this.addr,!1,rm),Et(t,n)}}function kI(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(Mt(t,n))return;im.set(n),r.uniformMatrix4fv(this.addr,!1,im),Et(t,n)}}function UI(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function BI(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2iv(this.addr,e),Et(t,e)}}function zI(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;r.uniform3iv(this.addr,e),Et(t,e)}}function HI(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4iv(this.addr,e),Et(t,e)}}function VI(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function GI(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;r.uniform2uiv(this.addr,e),Et(t,e)}}function WI(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;r.uniform3uiv(this.addr,e),Et(t,e)}}function jI(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;r.uniform4uiv(this.addr,e),Et(t,e)}}function qI(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||Hy,i)}function $I(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Gy,i)}function XI(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Wy,i)}function YI(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Vy,i)}function KI(r){switch(r){case 5126:return RI;case 35664:return DI;case 35665:return LI;case 35666:return NI;case 35674:return OI;case 35675:return FI;case 35676:return kI;case 5124:case 35670:return UI;case 35667:case 35671:return BI;case 35668:case 35672:return zI;case 35669:case 35673:return HI;case 5125:return VI;case 36294:return GI;case 36295:return WI;case 36296:return jI;case 35678:case 36198:case 36298:case 36306:case 35682:return qI;case 35679:case 36299:case 36307:return $I;case 35680:case 36300:case 36308:case 36293:return XI;case 36289:case 36303:case 36311:case 36292:return YI}}function ZI(r,e){r.uniform1fv(this.addr,e)}function JI(r,e){const t=Ts(e,this.size,2);r.uniform2fv(this.addr,t)}function QI(r,e){const t=Ts(e,this.size,3);r.uniform3fv(this.addr,t)}function eP(r,e){const t=Ts(e,this.size,4);r.uniform4fv(this.addr,t)}function tP(r,e){const t=Ts(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function nP(r,e){const t=Ts(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function iP(r,e){const t=Ts(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function rP(r,e){r.uniform1iv(this.addr,e)}function sP(r,e){r.uniform2iv(this.addr,e)}function oP(r,e){r.uniform3iv(this.addr,e)}function aP(r,e){r.uniform4iv(this.addr,e)}function lP(r,e){r.uniform1uiv(this.addr,e)}function cP(r,e){r.uniform2uiv(this.addr,e)}function uP(r,e){r.uniform3uiv(this.addr,e)}function hP(r,e){r.uniform4uiv(this.addr,e)}function fP(r,e,t){const n=this.cache,i=e.length,s=Fl(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Hy,s[o])}function dP(r,e,t){const n=this.cache,i=e.length,s=Fl(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Gy,s[o])}function pP(r,e,t){const n=this.cache,i=e.length,s=Fl(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Wy,s[o])}function mP(r,e,t){const n=this.cache,i=e.length,s=Fl(t,i);Mt(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Vy,s[o])}function gP(r){switch(r){case 5126:return ZI;case 35664:return JI;case 35665:return QI;case 35666:return eP;case 35674:return tP;case 35675:return nP;case 35676:return iP;case 5124:case 35670:return rP;case 35667:case 35671:return sP;case 35668:case 35672:return oP;case 35669:case 35673:return aP;case 5125:return lP;case 36294:return cP;case 36295:return uP;case 36296:return hP;case 35678:case 36198:case 36298:case 36306:case 35682:return fP;case 35679:case 36299:case 36307:return dP;case 35680:case 36300:case 36308:case 36293:return pP;case 36289:case 36303:case 36311:case 36292:return mP}}class _P{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=KI(t.type)}}class yP{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=gP(t.type)}}class vP{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const nu=/(\w+)(\])?(\[|\.)?/g;function om(r,e){r.seq.push(e),r.map[e.id]=e}function xP(r,e,t){const n=r.name,i=n.length;for(nu.lastIndex=0;;){const s=nu.exec(n),o=nu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){om(t,c===void 0?new _P(a,r,e):new yP(a,r,e));break}else{let h=t.map[a];h===void 0&&(h=new vP(a),om(t,h)),t=h}}}class Da{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);xP(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function am(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}let bP=0;function wP(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function SP(r){switch(r){case ar:return["Linear","( value )"];case Je:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function lm(r,e,t){const n=r.getShaderParameter(e,35713),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+wP(r.getShaderSource(e),o)}else return i}function MP(r,e){const t=SP(e);return"vec4 "+r+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function EP(r,e){let t;switch(e){case R1:t="Linear";break;case D1:t="Reinhard";break;case L1:t="OptimizedCineon";break;case wy:t="ACESFilmic";break;case N1:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function TP(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ks).join(`
`)}function CP(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function AP(r,e){const t={},n=r.getProgramParameter(e,35721);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===35674&&(a=2),s.type===35675&&(a=3),s.type===35676&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Ks(r){return r!==""}function cm(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function um(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const IP=/^[ \t]*#include +<([\w\d./]+)>/gm;function ju(r){return r.replace(IP,PP)}function PP(r,e){const t=Oe[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return ju(t)}const RP=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hm(r){return r.replace(RP,DP)}function DP(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function fm(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function LP(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===_y?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===yy?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ys&&(e="SHADOWMAP_TYPE_VSM"),e}function NP(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case hs:case fs:e="ENVMAP_TYPE_CUBE";break;case Ll:e="ENVMAP_TYPE_CUBE_UV";break}return e}function OP(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case fs:e="ENVMAP_MODE_REFRACTION";break}return e}function FP(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case by:e="ENVMAP_BLENDING_MULTIPLY";break;case I1:e="ENVMAP_BLENDING_MIX";break;case P1:e="ENVMAP_BLENDING_ADD";break}return e}function kP(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function UP(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=LP(t),c=NP(t),u=OP(t),h=FP(t),f=kP(t),d=t.isWebGL2?"":TP(t),g=CP(s),m=i.createProgram();let p,y,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=[g].filter(Ks).join(`
`),p.length>0&&(p+=`
`),y=[d,g].filter(Ks).join(`
`),y.length>0&&(y+=`
`)):(p=[fm(t),"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),y=[d,fm(t),"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qn?"#define TONE_MAPPING":"",t.toneMapping!==Qn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Qn?EP("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.encodings_pars_fragment,MP("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),o=ju(o),o=cm(o,t),o=um(o,t),a=ju(a),a=cm(a,t),a=um(a,t),o=hm(o),a=hm(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,y=["#define varying in",t.glslVersion===Fp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const v=w+p+o,x=w+y+a,b=am(i,35633,v),M=am(i,35632,x);if(i.attachShader(m,b),i.attachShader(m,M),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m),r.debug.checkShaderErrors){const C=i.getProgramInfoLog(m).trim(),E=i.getShaderInfoLog(b).trim(),D=i.getShaderInfoLog(M).trim();let z=!0,N=!0;if(i.getProgramParameter(m,35714)===!1){z=!1;const F=lm(i,b,"vertex"),H=lm(i,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,35715)+`

Program Info Log: `+C+`
`+F+`
`+H)}else C!==""?console.warn("THREE.WebGLProgram: Program Info Log:",C):(E===""||D==="")&&(N=!1);N&&(this.diagnostics={runnable:z,programLog:C,vertexShader:{log:E,prefix:p},fragmentShader:{log:D,prefix:y}})}i.deleteShader(b),i.deleteShader(M);let T;this.getUniforms=function(){return T===void 0&&(T=new Da(i,m)),T};let _;return this.getAttributes=function(){return _===void 0&&(_=AP(i,m)),_},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.name=t.shaderName,this.id=bP++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=M,this}let BP=0;class zP{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new HP(e),t.set(e,n)),n}}class HP{constructor(e){this.id=BP++,this.code=e,this.usedTimes=0}}function VP(r,e,t,n,i,s,o){const a=new Kh,l=new zP,c=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_,C,E,D,z){const N=D.fog,F=z.geometry,H=_.isMeshStandardMaterial?D.environment:null,Y=(_.isMeshStandardMaterial?t:e).get(_.envMap||H),J=Y&&Y.mapping===Ll?Y.image.height:null,S=g[_.type];_.precision!==null&&(d=i.getMaxPrecision(_.precision),d!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const P=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,k=P!==void 0?P.length:0;let R=0;F.morphAttributes.position!==void 0&&(R=1),F.morphAttributes.normal!==void 0&&(R=2),F.morphAttributes.color!==void 0&&(R=3);let O,j,G,B;if(S){const ne=In[S];O=ne.vertexShader,j=ne.fragmentShader}else O=_.vertexShader,j=_.fragmentShader,l.update(_),G=l.getVertexShaderID(_),B=l.getFragmentShaderID(_);const W=r.getRenderTarget(),ae=_.alphaTest>0,le=_.clearcoat>0,se=_.iridescence>0;return{isWebGL2:u,shaderID:S,shaderName:_.type,vertexShader:O,fragmentShader:j,defines:_.defines,customVertexShaderID:G,customFragmentShaderID:B,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,instancing:z.isInstancedMesh===!0,instancingColor:z.isInstancedMesh===!0&&z.instanceColor!==null,supportsVertexTextures:f,outputEncoding:W===null?r.outputEncoding:W.isXRRenderTarget===!0?W.texture.encoding:ar,map:!!_.map,matcap:!!_.matcap,envMap:!!Y,envMapMode:Y&&Y.mapping,envMapCubeUVHeight:J,lightMap:!!_.lightMap,aoMap:!!_.aoMap,emissiveMap:!!_.emissiveMap,bumpMap:!!_.bumpMap,normalMap:!!_.normalMap,objectSpaceNormalMap:_.normalMapType===eT,tangentSpaceNormalMap:_.normalMapType===Cy,decodeVideoTexture:!!_.map&&_.map.isVideoTexture===!0&&_.map.encoding===Je,clearcoat:le,clearcoatMap:le&&!!_.clearcoatMap,clearcoatRoughnessMap:le&&!!_.clearcoatRoughnessMap,clearcoatNormalMap:le&&!!_.clearcoatNormalMap,iridescence:se,iridescenceMap:se&&!!_.iridescenceMap,iridescenceThicknessMap:se&&!!_.iridescenceThicknessMap,displacementMap:!!_.displacementMap,roughnessMap:!!_.roughnessMap,metalnessMap:!!_.metalnessMap,specularMap:!!_.specularMap,specularIntensityMap:!!_.specularIntensityMap,specularColorMap:!!_.specularColorMap,opaque:_.transparent===!1&&_.blending===jr,alphaMap:!!_.alphaMap,alphaTest:ae,gradientMap:!!_.gradientMap,sheen:_.sheen>0,sheenColorMap:!!_.sheenColorMap,sheenRoughnessMap:!!_.sheenRoughnessMap,transmission:_.transmission>0,transmissionMap:!!_.transmissionMap,thicknessMap:!!_.thicknessMap,combine:_.combine,vertexTangents:!!_.normalMap&&!!F.attributes.tangent,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUvs:!!_.map||!!_.bumpMap||!!_.normalMap||!!_.specularMap||!!_.alphaMap||!!_.emissiveMap||!!_.roughnessMap||!!_.metalnessMap||!!_.clearcoatMap||!!_.clearcoatRoughnessMap||!!_.clearcoatNormalMap||!!_.iridescenceMap||!!_.iridescenceThicknessMap||!!_.displacementMap||!!_.transmissionMap||!!_.thicknessMap||!!_.specularIntensityMap||!!_.specularColorMap||!!_.sheenColorMap||!!_.sheenRoughnessMap,uvsVertexOnly:!(_.map||_.bumpMap||_.normalMap||_.specularMap||_.alphaMap||_.emissiveMap||_.roughnessMap||_.metalnessMap||_.clearcoatNormalMap||_.iridescenceMap||_.iridescenceThicknessMap||_.transmission>0||_.transmissionMap||_.thicknessMap||_.specularIntensityMap||_.specularColorMap||_.sheen>0||_.sheenColorMap||_.sheenRoughnessMap)&&!!_.displacementMap,fog:!!N,useFog:_.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:!!_.flatShading,sizeAttenuation:_.sizeAttenuation,logarithmicDepthBuffer:h,skinning:z.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:R,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:r.shadowMap.enabled&&E.length>0,shadowMapType:r.shadowMap.type,toneMapping:_.toneMapped?r.toneMapping:Qn,physicallyCorrectLights:r.physicallyCorrectLights,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Dl,flipSided:_.side===pn,useDepthPacking:!!_.depthPacking,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:_.extensions&&_.extensions.derivatives,extensionFragDepth:_.extensions&&_.extensions.fragDepth,extensionDrawBuffers:_.extensions&&_.extensions.drawBuffers,extensionShaderTextureLOD:_.extensions&&_.extensions.shaderTextureLOD,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:_.customProgramCacheKey()}}function p(_){const C=[];if(_.shaderID?C.push(_.shaderID):(C.push(_.customVertexShaderID),C.push(_.customFragmentShaderID)),_.defines!==void 0)for(const E in _.defines)C.push(E),C.push(_.defines[E]);return _.isRawShaderMaterial===!1&&(y(C,_),w(C,_),C.push(r.outputEncoding)),C.push(_.customProgramCacheKey),C.join()}function y(_,C){_.push(C.precision),_.push(C.outputEncoding),_.push(C.envMapMode),_.push(C.envMapCubeUVHeight),_.push(C.combine),_.push(C.vertexUvs),_.push(C.fogExp2),_.push(C.sizeAttenuation),_.push(C.morphTargetsCount),_.push(C.morphAttributeCount),_.push(C.numDirLights),_.push(C.numPointLights),_.push(C.numSpotLights),_.push(C.numSpotLightMaps),_.push(C.numHemiLights),_.push(C.numRectAreaLights),_.push(C.numDirLightShadows),_.push(C.numPointLightShadows),_.push(C.numSpotLightShadows),_.push(C.numSpotLightShadowsWithMaps),_.push(C.shadowMapType),_.push(C.toneMapping),_.push(C.numClippingPlanes),_.push(C.numClipIntersection),_.push(C.depthPacking)}function w(_,C){a.disableAll(),C.isWebGL2&&a.enable(0),C.supportsVertexTextures&&a.enable(1),C.instancing&&a.enable(2),C.instancingColor&&a.enable(3),C.map&&a.enable(4),C.matcap&&a.enable(5),C.envMap&&a.enable(6),C.lightMap&&a.enable(7),C.aoMap&&a.enable(8),C.emissiveMap&&a.enable(9),C.bumpMap&&a.enable(10),C.normalMap&&a.enable(11),C.objectSpaceNormalMap&&a.enable(12),C.tangentSpaceNormalMap&&a.enable(13),C.clearcoat&&a.enable(14),C.clearcoatMap&&a.enable(15),C.clearcoatRoughnessMap&&a.enable(16),C.clearcoatNormalMap&&a.enable(17),C.iridescence&&a.enable(18),C.iridescenceMap&&a.enable(19),C.iridescenceThicknessMap&&a.enable(20),C.displacementMap&&a.enable(21),C.specularMap&&a.enable(22),C.roughnessMap&&a.enable(23),C.metalnessMap&&a.enable(24),C.gradientMap&&a.enable(25),C.alphaMap&&a.enable(26),C.alphaTest&&a.enable(27),C.vertexColors&&a.enable(28),C.vertexAlphas&&a.enable(29),C.vertexUvs&&a.enable(30),C.vertexTangents&&a.enable(31),C.uvsVertexOnly&&a.enable(32),_.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.skinning&&a.enable(4),C.morphTargets&&a.enable(5),C.morphNormals&&a.enable(6),C.morphColors&&a.enable(7),C.premultipliedAlpha&&a.enable(8),C.shadowMapEnabled&&a.enable(9),C.physicallyCorrectLights&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.specularIntensityMap&&a.enable(15),C.specularColorMap&&a.enable(16),C.transmission&&a.enable(17),C.transmissionMap&&a.enable(18),C.thicknessMap&&a.enable(19),C.sheen&&a.enable(20),C.sheenColorMap&&a.enable(21),C.sheenRoughnessMap&&a.enable(22),C.decodeVideoTexture&&a.enable(23),C.opaque&&a.enable(24),_.push(a.mask)}function v(_){const C=g[_.type];let E;if(C){const D=In[C];E=AT.clone(D.uniforms)}else E=_.uniforms;return E}function x(_,C){let E;for(let D=0,z=c.length;D<z;D++){const N=c[D];if(N.cacheKey===C){E=N,++E.usedTimes;break}}return E===void 0&&(E=new UP(r,C,_,s),c.push(E)),E}function b(_){if(--_.usedTimes===0){const C=c.indexOf(_);c[C]=c[c.length-1],c.pop(),_.destroy()}}function M(_){l.remove(_)}function T(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:x,releaseProgram:b,releaseShaderCache:M,programs:c,dispose:T}}function GP(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function WP(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function dm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function pm(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,g,m,p){let y=r[e];return y===void 0?(y={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:m,group:p},r[e]=y):(y.id=h.id,y.object=h,y.geometry=f,y.material=d,y.groupOrder=g,y.renderOrder=h.renderOrder,y.z=m,y.group=p),e++,y}function a(h,f,d,g,m,p){const y=o(h,f,d,g,m,p);d.transmission>0?n.push(y):d.transparent===!0?i.push(y):t.push(y)}function l(h,f,d,g,m,p){const y=o(h,f,d,g,m,p);d.transmission>0?n.unshift(y):d.transparent===!0?i.unshift(y):t.unshift(y)}function c(h,f){t.length>1&&t.sort(h||WP),n.length>1&&n.sort(f||dm),i.length>1&&i.sort(f||dm)}function u(){for(let h=e,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function jP(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new pm,r.set(n,[o])):i>=s.length?(o=new pm,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function qP(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Ne};break;case"SpotLight":t={position:new U,direction:new U,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new U,halfWidth:new U,halfHeight:new U};break}return r[e.id]=t,t}}}function $P(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let XP=0;function YP(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function KP(r,e){const t=new qP,n=$P(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)i.probe.push(new U);const s=new U,o=new ze,a=new ze;function l(u,h){let f=0,d=0,g=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let m=0,p=0,y=0,w=0,v=0,x=0,b=0,M=0,T=0,_=0;u.sort(YP);const C=h!==!0?Math.PI:1;for(let D=0,z=u.length;D<z;D++){const N=u[D],F=N.color,H=N.intensity,Y=N.distance,J=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)f+=F.r*H*C,d+=F.g*H*C,g+=F.b*H*C;else if(N.isLightProbe)for(let S=0;S<9;S++)i.probe[S].addScaledVector(N.sh.coefficients[S],H);else if(N.isDirectionalLight){const S=t.get(N);if(S.color.copy(N.color).multiplyScalar(N.intensity*C),N.castShadow){const P=N.shadow,k=n.get(N);k.shadowBias=P.bias,k.shadowNormalBias=P.normalBias,k.shadowRadius=P.radius,k.shadowMapSize=P.mapSize,i.directionalShadow[m]=k,i.directionalShadowMap[m]=J,i.directionalShadowMatrix[m]=N.shadow.matrix,x++}i.directional[m]=S,m++}else if(N.isSpotLight){const S=t.get(N);S.position.setFromMatrixPosition(N.matrixWorld),S.color.copy(F).multiplyScalar(H*C),S.distance=Y,S.coneCos=Math.cos(N.angle),S.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),S.decay=N.decay,i.spot[y]=S;const P=N.shadow;if(N.map&&(i.spotLightMap[T]=N.map,T++,P.updateMatrices(N),N.castShadow&&_++),i.spotLightMatrix[y]=P.matrix,N.castShadow){const k=n.get(N);k.shadowBias=P.bias,k.shadowNormalBias=P.normalBias,k.shadowRadius=P.radius,k.shadowMapSize=P.mapSize,i.spotShadow[y]=k,i.spotShadowMap[y]=J,M++}y++}else if(N.isRectAreaLight){const S=t.get(N);S.color.copy(F).multiplyScalar(H),S.halfWidth.set(N.width*.5,0,0),S.halfHeight.set(0,N.height*.5,0),i.rectArea[w]=S,w++}else if(N.isPointLight){const S=t.get(N);if(S.color.copy(N.color).multiplyScalar(N.intensity*C),S.distance=N.distance,S.decay=N.decay,N.castShadow){const P=N.shadow,k=n.get(N);k.shadowBias=P.bias,k.shadowNormalBias=P.normalBias,k.shadowRadius=P.radius,k.shadowMapSize=P.mapSize,k.shadowCameraNear=P.camera.near,k.shadowCameraFar=P.camera.far,i.pointShadow[p]=k,i.pointShadowMap[p]=J,i.pointShadowMatrix[p]=N.shadow.matrix,b++}i.point[p]=S,p++}else if(N.isHemisphereLight){const S=t.get(N);S.skyColor.copy(N.color).multiplyScalar(H*C),S.groundColor.copy(N.groundColor).multiplyScalar(H*C),i.hemi[v]=S,v++}}w>0&&(e.isWebGL2||r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=g;const E=i.hash;(E.directionalLength!==m||E.pointLength!==p||E.spotLength!==y||E.rectAreaLength!==w||E.hemiLength!==v||E.numDirectionalShadows!==x||E.numPointShadows!==b||E.numSpotShadows!==M||E.numSpotMaps!==T)&&(i.directional.length=m,i.spot.length=y,i.rectArea.length=w,i.point.length=p,i.hemi.length=v,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=M+T-_,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=_,E.directionalLength=m,E.pointLength=p,E.spotLength=y,E.rectAreaLength=w,E.hemiLength=v,E.numDirectionalShadows=x,E.numPointShadows=b,E.numSpotShadows=M,E.numSpotMaps=T,i.version=XP++)}function c(u,h){let f=0,d=0,g=0,m=0,p=0;const y=h.matrixWorldInverse;for(let w=0,v=u.length;w<v;w++){const x=u[w];if(x.isDirectionalLight){const b=i.directional[f];b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(y),f++}else if(x.isSpotLight){const b=i.spot[g];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(y),b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(y),g++}else if(x.isRectAreaLight){const b=i.rectArea[m];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(y),a.identity(),o.copy(x.matrixWorld),o.premultiply(y),a.extractRotation(o),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),m++}else if(x.isPointLight){const b=i.point[d];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(y),d++}else if(x.isHemisphereLight){const b=i.hemi[p];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(y),p++}}}return{setup:l,setupView:c,state:i}}function mm(r,e){const t=new KP(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function ZP(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new mm(r,e),t.set(s,[l])):o>=a.length?(l=new mm(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class JP extends Ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=J1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class QP extends Ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new U,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const eR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function nR(r,e,t){let n=new Zh;const i=new ue,s=new ue,o=new st,a=new JP({depthPacking:Q1}),l=new QP,c={},u=t.maxTextureSize,h={0:pn,1:wi,2:Dl},f=new cr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:eR,fragmentShader:tR}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Xt;g.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new mt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_y,this.render=function(x,b,M){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||x.length===0)return;const T=r.getRenderTarget(),_=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),E=r.state;E.setBlending(vi),E.buffers.color.setClear(1,1,1,1),E.buffers.depth.setTest(!0),E.setScissorTest(!1);for(let D=0,z=x.length;D<z;D++){const N=x[D],F=N.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",N,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);const H=F.getFrameExtents();if(i.multiply(H),s.copy(F.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/H.x),i.x=s.x*H.x,F.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/H.y),i.y=s.y*H.y,F.mapSize.y=s.y)),F.map===null){const J=this.type!==Ys?{minFilter:Dt,magFilter:Dt}:{};F.map=new lr(i.x,i.y,J),F.map.texture.name=N.name+".shadowMap",F.camera.updateProjectionMatrix()}r.setRenderTarget(F.map),r.clear();const Y=F.getViewportCount();for(let J=0;J<Y;J++){const S=F.getViewport(J);o.set(s.x*S.x,s.y*S.y,s.x*S.z,s.y*S.w),E.viewport(o),F.updateMatrices(N,J),n=F.getFrustum(),v(b,M,F.camera,N,this.type)}F.isPointLightShadow!==!0&&this.type===Ys&&y(F,M),F.needsUpdate=!1}p.needsUpdate=!1,r.setRenderTarget(T,_,C)};function y(x,b){const M=e.update(m);f.defines.VSM_SAMPLES!==x.blurSamples&&(f.defines.VSM_SAMPLES=x.blurSamples,d.defines.VSM_SAMPLES=x.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),x.mapPass===null&&(x.mapPass=new lr(i.x,i.y)),f.uniforms.shadow_pass.value=x.map.texture,f.uniforms.resolution.value=x.mapSize,f.uniforms.radius.value=x.radius,r.setRenderTarget(x.mapPass),r.clear(),r.renderBufferDirect(b,null,M,f,m,null),d.uniforms.shadow_pass.value=x.mapPass.texture,d.uniforms.resolution.value=x.mapSize,d.uniforms.radius.value=x.radius,r.setRenderTarget(x.map),r.clear(),r.renderBufferDirect(b,null,M,d,m,null)}function w(x,b,M,T,_,C){let E=null;const D=M.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(D!==void 0)E=D;else if(E=M.isPointLight===!0?l:a,r.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const z=E.uuid,N=b.uuid;let F=c[z];F===void 0&&(F={},c[z]=F);let H=F[N];H===void 0&&(H=E.clone(),F[N]=H),E=H}return E.visible=b.visible,E.wireframe=b.wireframe,C===Ys?E.side=b.shadowSide!==null?b.shadowSide:b.side:E.side=b.shadowSide!==null?b.shadowSide:h[b.side],E.alphaMap=b.alphaMap,E.alphaTest=b.alphaTest,E.map=b.map,E.clipShadows=b.clipShadows,E.clippingPlanes=b.clippingPlanes,E.clipIntersection=b.clipIntersection,E.displacementMap=b.displacementMap,E.displacementScale=b.displacementScale,E.displacementBias=b.displacementBias,E.wireframeLinewidth=b.wireframeLinewidth,E.linewidth=b.linewidth,M.isPointLight===!0&&E.isMeshDistanceMaterial===!0&&(E.referencePosition.setFromMatrixPosition(M.matrixWorld),E.nearDistance=T,E.farDistance=_),E}function v(x,b,M,T,_){if(x.visible===!1)return;if(x.layers.test(b.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&_===Ys)&&(!x.frustumCulled||n.intersectsObject(x))){x.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,x.matrixWorld);const D=e.update(x),z=x.material;if(Array.isArray(z)){const N=D.groups;for(let F=0,H=N.length;F<H;F++){const Y=N[F],J=z[Y.materialIndex];if(J&&J.visible){const S=w(x,J,T,M.near,M.far,_);r.renderBufferDirect(M,null,D,S,x,Y)}}}else if(z.visible){const N=w(x,z,T,M.near,M.far,_);r.renderBufferDirect(M,null,D,N,x,null)}}const E=x.children;for(let D=0,z=E.length;D<z;D++)v(E[D],b,M,T,_)}}function iR(r,e,t){const n=t.isWebGL2;function i(){let V=!1;const ee=new st;let he=null;const ve=new st(0,0,0,0);return{setMask:function(be){he!==be&&!V&&(r.colorMask(be,be,be,be),he=be)},setLocked:function(be){V=be},setClear:function(be,Ke,Ct,Ut,Ti){Ti===!0&&(be*=Ut,Ke*=Ut,Ct*=Ut),ee.set(be,Ke,Ct,Ut),ve.equals(ee)===!1&&(r.clearColor(be,Ke,Ct,Ut),ve.copy(ee))},reset:function(){V=!1,he=null,ve.set(-1,0,0,0)}}}function s(){let V=!1,ee=null,he=null,ve=null;return{setTest:function(be){be?ae(2929):le(2929)},setMask:function(be){ee!==be&&!V&&(r.depthMask(be),ee=be)},setFunc:function(be){if(he!==be){switch(be){case w1:r.depthFunc(512);break;case S1:r.depthFunc(519);break;case M1:r.depthFunc(513);break;case Uu:r.depthFunc(515);break;case E1:r.depthFunc(514);break;case T1:r.depthFunc(518);break;case C1:r.depthFunc(516);break;case A1:r.depthFunc(517);break;default:r.depthFunc(515)}he=be}},setLocked:function(be){V=be},setClear:function(be){ve!==be&&(r.clearDepth(be),ve=be)},reset:function(){V=!1,ee=null,he=null,ve=null}}}function o(){let V=!1,ee=null,he=null,ve=null,be=null,Ke=null,Ct=null,Ut=null,Ti=null;return{setTest:function(ut){V||(ut?ae(2960):le(2960))},setMask:function(ut){ee!==ut&&!V&&(r.stencilMask(ut),ee=ut)},setFunc:function(ut,Un,on){(he!==ut||ve!==Un||be!==on)&&(r.stencilFunc(ut,Un,on),he=ut,ve=Un,be=on)},setOp:function(ut,Un,on){(Ke!==ut||Ct!==Un||Ut!==on)&&(r.stencilOp(ut,Un,on),Ke=ut,Ct=Un,Ut=on)},setLocked:function(ut){V=ut},setClear:function(ut){Ti!==ut&&(r.clearStencil(ut),Ti=ut)},reset:function(){V=!1,ee=null,he=null,ve=null,be=null,Ke=null,Ct=null,Ut=null,Ti=null}}}const a=new i,l=new s,c=new o,u=new WeakMap,h=new WeakMap;let f={},d={},g=new WeakMap,m=[],p=null,y=!1,w=null,v=null,x=null,b=null,M=null,T=null,_=null,C=!1,E=null,D=null,z=null,N=null,F=null;const H=r.getParameter(35661);let Y=!1,J=0;const S=r.getParameter(7938);S.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(S)[1]),Y=J>=1):S.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(S)[1]),Y=J>=2);let P=null,k={};const R=r.getParameter(3088),O=r.getParameter(2978),j=new st().fromArray(R),G=new st().fromArray(O);function B(V,ee,he){const ve=new Uint8Array(4),be=r.createTexture();r.bindTexture(V,be),r.texParameteri(V,10241,9728),r.texParameteri(V,10240,9728);for(let Ke=0;Ke<he;Ke++)r.texImage2D(ee+Ke,0,6408,1,1,0,6408,5121,ve);return be}const W={};W[3553]=B(3553,3553,1),W[34067]=B(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ae(2929),l.setFunc(Uu),ce(!1),Re(op),ae(2884),oe(vi);function ae(V){f[V]!==!0&&(r.enable(V),f[V]=!0)}function le(V){f[V]!==!1&&(r.disable(V),f[V]=!1)}function se(V,ee){return d[V]!==ee?(r.bindFramebuffer(V,ee),d[V]=ee,n&&(V===36009&&(d[36160]=ee),V===36160&&(d[36009]=ee)),!0):!1}function Z(V,ee){let he=m,ve=!1;if(V)if(he=g.get(ee),he===void 0&&(he=[],g.set(ee,he)),V.isWebGLMultipleRenderTargets){const be=V.texture;if(he.length!==be.length||he[0]!==36064){for(let Ke=0,Ct=be.length;Ke<Ct;Ke++)he[Ke]=36064+Ke;he.length=be.length,ve=!0}}else he[0]!==36064&&(he[0]=36064,ve=!0);else he[0]!==1029&&(he[0]=1029,ve=!0);ve&&(t.isWebGL2?r.drawBuffers(he):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(he))}function ne(V){return p!==V?(r.useProgram(V),p=V,!0):!1}const q={[Or]:32774,[h1]:32778,[f1]:32779};if(n)q[up]=32775,q[hp]=32776;else{const V=e.get("EXT_blend_minmax");V!==null&&(q[up]=V.MIN_EXT,q[hp]=V.MAX_EXT)}const K={[d1]:0,[p1]:1,[m1]:768,[vy]:770,[b1]:776,[v1]:774,[_1]:772,[g1]:769,[xy]:771,[x1]:775,[y1]:773};function oe(V,ee,he,ve,be,Ke,Ct,Ut){if(V===vi){y===!0&&(le(3042),y=!1);return}if(y===!1&&(ae(3042),y=!0),V!==u1){if(V!==w||Ut!==C){if((v!==Or||M!==Or)&&(r.blendEquation(32774),v=Or,M=Or),Ut)switch(V){case jr:r.blendFuncSeparate(1,771,1,771);break;case ap:r.blendFunc(1,1);break;case lp:r.blendFuncSeparate(0,769,0,1);break;case cp:r.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case jr:r.blendFuncSeparate(770,771,1,771);break;case ap:r.blendFunc(770,1);break;case lp:r.blendFuncSeparate(0,769,0,1);break;case cp:r.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}x=null,b=null,T=null,_=null,w=V,C=Ut}return}be=be||ee,Ke=Ke||he,Ct=Ct||ve,(ee!==v||be!==M)&&(r.blendEquationSeparate(q[ee],q[be]),v=ee,M=be),(he!==x||ve!==b||Ke!==T||Ct!==_)&&(r.blendFuncSeparate(K[he],K[ve],K[Ke],K[Ct]),x=he,b=ve,T=Ke,_=Ct),w=V,C=!1}function pe(V,ee){V.side===Dl?le(2884):ae(2884);let he=V.side===pn;ee&&(he=!he),ce(he),V.blending===jr&&V.transparent===!1?oe(vi):oe(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.premultipliedAlpha),l.setFunc(V.depthFunc),l.setTest(V.depthTest),l.setMask(V.depthWrite),a.setMask(V.colorWrite);const ve=V.stencilWrite;c.setTest(ve),ve&&(c.setMask(V.stencilWriteMask),c.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),c.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Te(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ae(32926):le(32926)}function ce(V){E!==V&&(V?r.frontFace(2304):r.frontFace(2305),E=V)}function Re(V){V!==l1?(ae(2884),V!==D&&(V===op?r.cullFace(1029):V===c1?r.cullFace(1028):r.cullFace(1032))):le(2884),D=V}function we(V){V!==z&&(Y&&r.lineWidth(V),z=V)}function Te(V,ee,he){V?(ae(32823),(N!==ee||F!==he)&&(r.polygonOffset(ee,he),N=ee,F=he)):le(32823)}function at(V){V?ae(3089):le(3089)}function Qe(V){V===void 0&&(V=33984+H-1),P!==V&&(r.activeTexture(V),P=V)}function L(V,ee,he){he===void 0&&(P===null?he=33984+H-1:he=P);let ve=k[he];ve===void 0&&(ve={type:void 0,texture:void 0},k[he]=ve),(ve.type!==V||ve.texture!==ee)&&(P!==he&&(r.activeTexture(he),P=he),r.bindTexture(V,ee||W[V]),ve.type=V,ve.texture=ee)}function A(){const V=k[P];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Q(){try{r.compressedTexImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function fe(){try{r.compressedTexImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function me(){try{r.texSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function _e(){try{r.texSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function De(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ye(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function re(){try{r.texStorage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Se(){try{r.texStorage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ie(){try{r.texImage2D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function xe(){try{r.texImage3D.apply(r,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ce(V){j.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),j.copy(V))}function Me(V){G.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),G.copy(V))}function $e(V,ee){let he=h.get(ee);he===void 0&&(he=new WeakMap,h.set(ee,he));let ve=he.get(V);ve===void 0&&(ve=r.getUniformBlockIndex(ee,V.name),he.set(V,ve))}function ct(V,ee){const ve=h.get(ee).get(V);u.get(ee)!==ve&&(r.uniformBlockBinding(ee,ve,V.__bindingPointIndex),u.set(ee,ve))}function Tt(){r.disable(3042),r.disable(2884),r.disable(2929),r.disable(32823),r.disable(3089),r.disable(2960),r.disable(32926),r.blendEquation(32774),r.blendFunc(1,0),r.blendFuncSeparate(1,0,1,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(513),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(519,0,4294967295),r.stencilOp(7680,7680,7680),r.clearStencil(0),r.cullFace(1029),r.frontFace(2305),r.polygonOffset(0,0),r.activeTexture(33984),r.bindFramebuffer(36160,null),n===!0&&(r.bindFramebuffer(36009,null),r.bindFramebuffer(36008,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},P=null,k={},d={},g=new WeakMap,m=[],p=null,y=!1,w=null,v=null,x=null,b=null,M=null,T=null,_=null,C=!1,E=null,D=null,z=null,N=null,F=null,j.set(0,0,r.canvas.width,r.canvas.height),G.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:ae,disable:le,bindFramebuffer:se,drawBuffers:Z,useProgram:ne,setBlending:oe,setMaterial:pe,setFlipSided:ce,setCullFace:Re,setLineWidth:we,setPolygonOffset:Te,setScissorTest:at,activeTexture:Qe,bindTexture:L,unbindTexture:A,compressedTexImage2D:Q,compressedTexImage3D:fe,texImage2D:Ie,texImage3D:xe,updateUBOMapping:$e,uniformBlockBinding:ct,texStorage2D:re,texStorage3D:Se,texSubImage2D:me,texSubImage3D:_e,compressedTexSubImage2D:De,compressedTexSubImage3D:ye,scissor:Ce,viewport:Me,reset:Tt}}function rR(r,e,t,n,i,s,o){const a=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,u=i.maxTextureSize,h=i.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let m;const p=new WeakMap;let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(L,A){return y?new OffscreenCanvas(L,A):Io("canvas")}function v(L,A,Q,fe){let me=1;if((L.width>fe||L.height>fe)&&(me=fe/Math.max(L.width,L.height)),me<1||A===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){const _e=A?tl:Math.floor,De=_e(me*L.width),ye=_e(me*L.height);m===void 0&&(m=w(De,ye));const re=Q?w(De,ye):m;return re.width=De,re.height=ye,re.getContext("2d").drawImage(L,0,0,De,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+De+"x"+ye+")."),re}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function x(L){return Wu(L.width)&&Wu(L.height)}function b(L){return a?!1:L.wrapS!==hn||L.wrapT!==hn||L.minFilter!==Dt&&L.minFilter!==Yt}function M(L,A){return L.generateMipmaps&&A&&L.minFilter!==Dt&&L.minFilter!==Yt}function T(L){r.generateMipmap(L)}function _(L,A,Q,fe,me=!1){if(a===!1)return A;if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let _e=A;return A===6403&&(Q===5126&&(_e=33326),Q===5131&&(_e=33325),Q===5121&&(_e=33321)),A===33319&&(Q===5126&&(_e=33328),Q===5131&&(_e=33327),Q===5121&&(_e=33323)),A===6408&&(Q===5126&&(_e=34836),Q===5131&&(_e=34842),Q===5121&&(_e=fe===Je&&me===!1?35907:32856),Q===32819&&(_e=32854),Q===32820&&(_e=32855)),(_e===33325||_e===33326||_e===33327||_e===33328||_e===34842||_e===34836)&&e.get("EXT_color_buffer_float"),_e}function C(L,A,Q){return M(L,Q)===!0||L.isFramebufferTexture&&L.minFilter!==Dt&&L.minFilter!==Yt?Math.log2(Math.max(A.width,A.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?A.mipmaps.length:1}function E(L){return L===Dt||L===Hu||L===Pa?9728:9729}function D(L){const A=L.target;A.removeEventListener("dispose",D),N(A),A.isVideoTexture&&g.delete(A)}function z(L){const A=L.target;A.removeEventListener("dispose",z),H(A)}function N(L){const A=n.get(L);if(A.__webglInit===void 0)return;const Q=L.source,fe=p.get(Q);if(fe){const me=fe[A.__cacheKey];me.usedTimes--,me.usedTimes===0&&F(L),Object.keys(fe).length===0&&p.delete(Q)}n.remove(L)}function F(L){const A=n.get(L);r.deleteTexture(A.__webglTexture);const Q=L.source,fe=p.get(Q);delete fe[A.__cacheKey],o.memory.textures--}function H(L){const A=L.texture,Q=n.get(L),fe=n.get(A);if(fe.__webglTexture!==void 0&&(r.deleteTexture(fe.__webglTexture),o.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let me=0;me<6;me++)r.deleteFramebuffer(Q.__webglFramebuffer[me]),Q.__webglDepthbuffer&&r.deleteRenderbuffer(Q.__webglDepthbuffer[me]);else{if(r.deleteFramebuffer(Q.__webglFramebuffer),Q.__webglDepthbuffer&&r.deleteRenderbuffer(Q.__webglDepthbuffer),Q.__webglMultisampledFramebuffer&&r.deleteFramebuffer(Q.__webglMultisampledFramebuffer),Q.__webglColorRenderbuffer)for(let me=0;me<Q.__webglColorRenderbuffer.length;me++)Q.__webglColorRenderbuffer[me]&&r.deleteRenderbuffer(Q.__webglColorRenderbuffer[me]);Q.__webglDepthRenderbuffer&&r.deleteRenderbuffer(Q.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let me=0,_e=A.length;me<_e;me++){const De=n.get(A[me]);De.__webglTexture&&(r.deleteTexture(De.__webglTexture),o.memory.textures--),n.remove(A[me])}n.remove(A),n.remove(L)}let Y=0;function J(){Y=0}function S(){const L=Y;return L>=l&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+l),Y+=1,L}function P(L){const A=[];return A.push(L.wrapS),A.push(L.wrapT),A.push(L.wrapR||0),A.push(L.magFilter),A.push(L.minFilter),A.push(L.anisotropy),A.push(L.internalFormat),A.push(L.format),A.push(L.type),A.push(L.generateMipmaps),A.push(L.premultiplyAlpha),A.push(L.flipY),A.push(L.unpackAlignment),A.push(L.encoding),A.join()}function k(L,A){const Q=n.get(L);if(L.isVideoTexture&&at(L),L.isRenderTargetTexture===!1&&L.version>0&&Q.__version!==L.version){const fe=L.image;if(fe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(Q,L,A);return}}t.bindTexture(3553,Q.__webglTexture,33984+A)}function R(L,A){const Q=n.get(L);if(L.version>0&&Q.__version!==L.version){le(Q,L,A);return}t.bindTexture(35866,Q.__webglTexture,33984+A)}function O(L,A){const Q=n.get(L);if(L.version>0&&Q.__version!==L.version){le(Q,L,A);return}t.bindTexture(32879,Q.__webglTexture,33984+A)}function j(L,A){const Q=n.get(L);if(L.version>0&&Q.__version!==L.version){se(Q,L,A);return}t.bindTexture(34067,Q.__webglTexture,33984+A)}const G={[Dn]:10497,[hn]:33071,[el]:33648},B={[Dt]:9728,[Hu]:9984,[Pa]:9986,[Yt]:9729,[My]:9985,[sr]:9987};function W(L,A,Q){if(Q?(r.texParameteri(L,10242,G[A.wrapS]),r.texParameteri(L,10243,G[A.wrapT]),(L===32879||L===35866)&&r.texParameteri(L,32882,G[A.wrapR]),r.texParameteri(L,10240,B[A.magFilter]),r.texParameteri(L,10241,B[A.minFilter])):(r.texParameteri(L,10242,33071),r.texParameteri(L,10243,33071),(L===32879||L===35866)&&r.texParameteri(L,32882,33071),(A.wrapS!==hn||A.wrapT!==hn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(L,10240,E(A.magFilter)),r.texParameteri(L,10241,E(A.minFilter)),A.minFilter!==Dt&&A.minFilter!==Yt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const fe=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===Dt||A.minFilter!==Pa&&A.minFilter!==sr||A.type===di&&e.has("OES_texture_float_linear")===!1||a===!1&&A.type===Eo&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(r.texParameterf(L,fe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function ae(L,A){let Q=!1;L.__webglInit===void 0&&(L.__webglInit=!0,A.addEventListener("dispose",D));const fe=A.source;let me=p.get(fe);me===void 0&&(me={},p.set(fe,me));const _e=P(A);if(_e!==L.__cacheKey){me[_e]===void 0&&(me[_e]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,Q=!0),me[_e].usedTimes++;const De=me[L.__cacheKey];De!==void 0&&(me[L.__cacheKey].usedTimes--,De.usedTimes===0&&F(A)),L.__cacheKey=_e,L.__webglTexture=me[_e].texture}return Q}function le(L,A,Q){let fe=3553;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(fe=35866),A.isData3DTexture&&(fe=32879);const me=ae(L,A),_e=A.source;t.bindTexture(fe,L.__webglTexture,33984+Q);const De=n.get(_e);if(_e.version!==De.__version||me===!0){t.activeTexture(33984+Q),r.pixelStorei(37440,A.flipY),r.pixelStorei(37441,A.premultiplyAlpha),r.pixelStorei(3317,A.unpackAlignment),r.pixelStorei(37443,0);const ye=b(A)&&x(A.image)===!1;let re=v(A.image,ye,!1,u);re=Qe(A,re);const Se=x(re)||a,Ie=s.convert(A.format,A.encoding);let xe=s.convert(A.type),Ce=_(A.internalFormat,Ie,xe,A.encoding,A.isVideoTexture);W(fe,A,Se);let Me;const $e=A.mipmaps,ct=a&&A.isVideoTexture!==!0,Tt=De.__version===void 0||me===!0,V=C(A,re,Se);if(A.isDepthTexture)Ce=6402,a?A.type===di?Ce=36012:A.type===ji?Ce=33190:A.type===qr?Ce=35056:Ce=33189:A.type===di&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===Xi&&Ce===6402&&A.type!==Ey&&A.type!==ji&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=ji,xe=s.convert(A.type)),A.format===ds&&Ce===6402&&(Ce=34041,A.type!==qr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=qr,xe=s.convert(A.type))),Tt&&(ct?t.texStorage2D(3553,1,Ce,re.width,re.height):t.texImage2D(3553,0,Ce,re.width,re.height,0,Ie,xe,null));else if(A.isDataTexture)if($e.length>0&&Se){ct&&Tt&&t.texStorage2D(3553,V,Ce,$e[0].width,$e[0].height);for(let ee=0,he=$e.length;ee<he;ee++)Me=$e[ee],ct?t.texSubImage2D(3553,ee,0,0,Me.width,Me.height,Ie,xe,Me.data):t.texImage2D(3553,ee,Ce,Me.width,Me.height,0,Ie,xe,Me.data);A.generateMipmaps=!1}else ct?(Tt&&t.texStorage2D(3553,V,Ce,re.width,re.height),t.texSubImage2D(3553,0,0,0,re.width,re.height,Ie,xe,re.data)):t.texImage2D(3553,0,Ce,re.width,re.height,0,Ie,xe,re.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){ct&&Tt&&t.texStorage3D(35866,V,Ce,$e[0].width,$e[0].height,re.depth);for(let ee=0,he=$e.length;ee<he;ee++)Me=$e[ee],A.format!==fn?Ie!==null?ct?t.compressedTexSubImage3D(35866,ee,0,0,0,Me.width,Me.height,re.depth,Ie,Me.data,0,0):t.compressedTexImage3D(35866,ee,Ce,Me.width,Me.height,re.depth,0,Me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ct?t.texSubImage3D(35866,ee,0,0,0,Me.width,Me.height,re.depth,Ie,xe,Me.data):t.texImage3D(35866,ee,Ce,Me.width,Me.height,re.depth,0,Ie,xe,Me.data)}else{ct&&Tt&&t.texStorage2D(3553,V,Ce,$e[0].width,$e[0].height);for(let ee=0,he=$e.length;ee<he;ee++)Me=$e[ee],A.format!==fn?Ie!==null?ct?t.compressedTexSubImage2D(3553,ee,0,0,Me.width,Me.height,Ie,Me.data):t.compressedTexImage2D(3553,ee,Ce,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ct?t.texSubImage2D(3553,ee,0,0,Me.width,Me.height,Ie,xe,Me.data):t.texImage2D(3553,ee,Ce,Me.width,Me.height,0,Ie,xe,Me.data)}else if(A.isDataArrayTexture)ct?(Tt&&t.texStorage3D(35866,V,Ce,re.width,re.height,re.depth),t.texSubImage3D(35866,0,0,0,0,re.width,re.height,re.depth,Ie,xe,re.data)):t.texImage3D(35866,0,Ce,re.width,re.height,re.depth,0,Ie,xe,re.data);else if(A.isData3DTexture)ct?(Tt&&t.texStorage3D(32879,V,Ce,re.width,re.height,re.depth),t.texSubImage3D(32879,0,0,0,0,re.width,re.height,re.depth,Ie,xe,re.data)):t.texImage3D(32879,0,Ce,re.width,re.height,re.depth,0,Ie,xe,re.data);else if(A.isFramebufferTexture){if(Tt)if(ct)t.texStorage2D(3553,V,Ce,re.width,re.height);else{let ee=re.width,he=re.height;for(let ve=0;ve<V;ve++)t.texImage2D(3553,ve,Ce,ee,he,0,Ie,xe,null),ee>>=1,he>>=1}}else if($e.length>0&&Se){ct&&Tt&&t.texStorage2D(3553,V,Ce,$e[0].width,$e[0].height);for(let ee=0,he=$e.length;ee<he;ee++)Me=$e[ee],ct?t.texSubImage2D(3553,ee,0,0,Ie,xe,Me):t.texImage2D(3553,ee,Ce,Ie,xe,Me);A.generateMipmaps=!1}else ct?(Tt&&t.texStorage2D(3553,V,Ce,re.width,re.height),t.texSubImage2D(3553,0,0,0,Ie,xe,re)):t.texImage2D(3553,0,Ce,Ie,xe,re);M(A,Se)&&T(fe),De.__version=_e.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function se(L,A,Q){if(A.image.length!==6)return;const fe=ae(L,A),me=A.source;t.bindTexture(34067,L.__webglTexture,33984+Q);const _e=n.get(me);if(me.version!==_e.__version||fe===!0){t.activeTexture(33984+Q),r.pixelStorei(37440,A.flipY),r.pixelStorei(37441,A.premultiplyAlpha),r.pixelStorei(3317,A.unpackAlignment),r.pixelStorei(37443,0);const De=A.isCompressedTexture||A.image[0].isCompressedTexture,ye=A.image[0]&&A.image[0].isDataTexture,re=[];for(let ee=0;ee<6;ee++)!De&&!ye?re[ee]=v(A.image[ee],!1,!0,c):re[ee]=ye?A.image[ee].image:A.image[ee],re[ee]=Qe(A,re[ee]);const Se=re[0],Ie=x(Se)||a,xe=s.convert(A.format,A.encoding),Ce=s.convert(A.type),Me=_(A.internalFormat,xe,Ce,A.encoding),$e=a&&A.isVideoTexture!==!0,ct=_e.__version===void 0||fe===!0;let Tt=C(A,Se,Ie);W(34067,A,Ie);let V;if(De){$e&&ct&&t.texStorage2D(34067,Tt,Me,Se.width,Se.height);for(let ee=0;ee<6;ee++){V=re[ee].mipmaps;for(let he=0;he<V.length;he++){const ve=V[he];A.format!==fn?xe!==null?$e?t.compressedTexSubImage2D(34069+ee,he,0,0,ve.width,ve.height,xe,ve.data):t.compressedTexImage2D(34069+ee,he,Me,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?t.texSubImage2D(34069+ee,he,0,0,ve.width,ve.height,xe,Ce,ve.data):t.texImage2D(34069+ee,he,Me,ve.width,ve.height,0,xe,Ce,ve.data)}}}else{V=A.mipmaps,$e&&ct&&(V.length>0&&Tt++,t.texStorage2D(34067,Tt,Me,re[0].width,re[0].height));for(let ee=0;ee<6;ee++)if(ye){$e?t.texSubImage2D(34069+ee,0,0,0,re[ee].width,re[ee].height,xe,Ce,re[ee].data):t.texImage2D(34069+ee,0,Me,re[ee].width,re[ee].height,0,xe,Ce,re[ee].data);for(let he=0;he<V.length;he++){const be=V[he].image[ee].image;$e?t.texSubImage2D(34069+ee,he+1,0,0,be.width,be.height,xe,Ce,be.data):t.texImage2D(34069+ee,he+1,Me,be.width,be.height,0,xe,Ce,be.data)}}else{$e?t.texSubImage2D(34069+ee,0,0,0,xe,Ce,re[ee]):t.texImage2D(34069+ee,0,Me,xe,Ce,re[ee]);for(let he=0;he<V.length;he++){const ve=V[he];$e?t.texSubImage2D(34069+ee,he+1,0,0,xe,Ce,ve.image[ee]):t.texImage2D(34069+ee,he+1,Me,xe,Ce,ve.image[ee])}}}M(A,Ie)&&T(34067),_e.__version=me.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function Z(L,A,Q,fe,me){const _e=s.convert(Q.format,Q.encoding),De=s.convert(Q.type),ye=_(Q.internalFormat,_e,De,Q.encoding);n.get(A).__hasExternalTextures||(me===32879||me===35866?t.texImage3D(me,0,ye,A.width,A.height,A.depth,0,_e,De,null):t.texImage2D(me,0,ye,A.width,A.height,0,_e,De,null)),t.bindFramebuffer(36160,L),Te(A)?f.framebufferTexture2DMultisampleEXT(36160,fe,me,n.get(Q).__webglTexture,0,we(A)):(me===3553||me>=34069&&me<=34074)&&r.framebufferTexture2D(36160,fe,me,n.get(Q).__webglTexture,0),t.bindFramebuffer(36160,null)}function ne(L,A,Q){if(r.bindRenderbuffer(36161,L),A.depthBuffer&&!A.stencilBuffer){let fe=33189;if(Q||Te(A)){const me=A.depthTexture;me&&me.isDepthTexture&&(me.type===di?fe=36012:me.type===ji&&(fe=33190));const _e=we(A);Te(A)?f.renderbufferStorageMultisampleEXT(36161,_e,fe,A.width,A.height):r.renderbufferStorageMultisample(36161,_e,fe,A.width,A.height)}else r.renderbufferStorage(36161,fe,A.width,A.height);r.framebufferRenderbuffer(36160,36096,36161,L)}else if(A.depthBuffer&&A.stencilBuffer){const fe=we(A);Q&&Te(A)===!1?r.renderbufferStorageMultisample(36161,fe,35056,A.width,A.height):Te(A)?f.renderbufferStorageMultisampleEXT(36161,fe,35056,A.width,A.height):r.renderbufferStorage(36161,34041,A.width,A.height),r.framebufferRenderbuffer(36160,33306,36161,L)}else{const fe=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let me=0;me<fe.length;me++){const _e=fe[me],De=s.convert(_e.format,_e.encoding),ye=s.convert(_e.type),re=_(_e.internalFormat,De,ye,_e.encoding),Se=we(A);Q&&Te(A)===!1?r.renderbufferStorageMultisample(36161,Se,re,A.width,A.height):Te(A)?f.renderbufferStorageMultisampleEXT(36161,Se,re,A.width,A.height):r.renderbufferStorage(36161,re,A.width,A.height)}}r.bindRenderbuffer(36161,null)}function q(L,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,L),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),k(A.depthTexture,0);const fe=n.get(A.depthTexture).__webglTexture,me=we(A);if(A.depthTexture.format===Xi)Te(A)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,fe,0,me):r.framebufferTexture2D(36160,36096,3553,fe,0);else if(A.depthTexture.format===ds)Te(A)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,fe,0,me):r.framebufferTexture2D(36160,33306,3553,fe,0);else throw new Error("Unknown depthTexture format")}function K(L){const A=n.get(L),Q=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!A.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");q(A.__webglFramebuffer,L)}else if(Q){A.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)t.bindFramebuffer(36160,A.__webglFramebuffer[fe]),A.__webglDepthbuffer[fe]=r.createRenderbuffer(),ne(A.__webglDepthbuffer[fe],L,!1)}else t.bindFramebuffer(36160,A.__webglFramebuffer),A.__webglDepthbuffer=r.createRenderbuffer(),ne(A.__webglDepthbuffer,L,!1);t.bindFramebuffer(36160,null)}function oe(L,A,Q){const fe=n.get(L);A!==void 0&&Z(fe.__webglFramebuffer,L,L.texture,36064,3553),Q!==void 0&&K(L)}function pe(L){const A=L.texture,Q=n.get(L),fe=n.get(A);L.addEventListener("dispose",z),L.isWebGLMultipleRenderTargets!==!0&&(fe.__webglTexture===void 0&&(fe.__webglTexture=r.createTexture()),fe.__version=A.version,o.memory.textures++);const me=L.isWebGLCubeRenderTarget===!0,_e=L.isWebGLMultipleRenderTargets===!0,De=x(L)||a;if(me){Q.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)Q.__webglFramebuffer[ye]=r.createFramebuffer()}else{if(Q.__webglFramebuffer=r.createFramebuffer(),_e)if(i.drawBuffers){const ye=L.texture;for(let re=0,Se=ye.length;re<Se;re++){const Ie=n.get(ye[re]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&L.samples>0&&Te(L)===!1){const ye=_e?A:[A];Q.__webglMultisampledFramebuffer=r.createFramebuffer(),Q.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,Q.__webglMultisampledFramebuffer);for(let re=0;re<ye.length;re++){const Se=ye[re];Q.__webglColorRenderbuffer[re]=r.createRenderbuffer(),r.bindRenderbuffer(36161,Q.__webglColorRenderbuffer[re]);const Ie=s.convert(Se.format,Se.encoding),xe=s.convert(Se.type),Ce=_(Se.internalFormat,Ie,xe,Se.encoding,L.isXRRenderTarget===!0),Me=we(L);r.renderbufferStorageMultisample(36161,Me,Ce,L.width,L.height),r.framebufferRenderbuffer(36160,36064+re,36161,Q.__webglColorRenderbuffer[re])}r.bindRenderbuffer(36161,null),L.depthBuffer&&(Q.__webglDepthRenderbuffer=r.createRenderbuffer(),ne(Q.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(36160,null)}}if(me){t.bindTexture(34067,fe.__webglTexture),W(34067,A,De);for(let ye=0;ye<6;ye++)Z(Q.__webglFramebuffer[ye],L,A,36064,34069+ye);M(A,De)&&T(34067),t.unbindTexture()}else if(_e){const ye=L.texture;for(let re=0,Se=ye.length;re<Se;re++){const Ie=ye[re],xe=n.get(Ie);t.bindTexture(3553,xe.__webglTexture),W(3553,Ie,De),Z(Q.__webglFramebuffer,L,Ie,36064+re,3553),M(Ie,De)&&T(3553)}t.unbindTexture()}else{let ye=3553;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(a?ye=L.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ye,fe.__webglTexture),W(ye,A,De),Z(Q.__webglFramebuffer,L,A,36064,ye),M(A,De)&&T(ye),t.unbindTexture()}L.depthBuffer&&K(L)}function ce(L){const A=x(L)||a,Q=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let fe=0,me=Q.length;fe<me;fe++){const _e=Q[fe];if(M(_e,A)){const De=L.isWebGLCubeRenderTarget?34067:3553,ye=n.get(_e).__webglTexture;t.bindTexture(De,ye),T(De),t.unbindTexture()}}}function Re(L){if(a&&L.samples>0&&Te(L)===!1){const A=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],Q=L.width,fe=L.height;let me=16384;const _e=[],De=L.stencilBuffer?33306:36096,ye=n.get(L),re=L.isWebGLMultipleRenderTargets===!0;if(re)for(let Se=0;Se<A.length;Se++)t.bindFramebuffer(36160,ye.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+Se,36161,null),t.bindFramebuffer(36160,ye.__webglFramebuffer),r.framebufferTexture2D(36009,36064+Se,3553,null,0);t.bindFramebuffer(36008,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,ye.__webglFramebuffer);for(let Se=0;Se<A.length;Se++){_e.push(36064+Se),L.depthBuffer&&_e.push(De);const Ie=ye.__ignoreDepthValues!==void 0?ye.__ignoreDepthValues:!1;if(Ie===!1&&(L.depthBuffer&&(me|=256),L.stencilBuffer&&(me|=1024)),re&&r.framebufferRenderbuffer(36008,36064,36161,ye.__webglColorRenderbuffer[Se]),Ie===!0&&(r.invalidateFramebuffer(36008,[De]),r.invalidateFramebuffer(36009,[De])),re){const xe=n.get(A[Se]).__webglTexture;r.framebufferTexture2D(36009,36064,3553,xe,0)}r.blitFramebuffer(0,0,Q,fe,0,0,Q,fe,me,9728),d&&r.invalidateFramebuffer(36008,_e)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),re)for(let Se=0;Se<A.length;Se++){t.bindFramebuffer(36160,ye.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(36160,36064+Se,36161,ye.__webglColorRenderbuffer[Se]);const Ie=n.get(A[Se]).__webglTexture;t.bindFramebuffer(36160,ye.__webglFramebuffer),r.framebufferTexture2D(36009,36064+Se,3553,Ie,0)}t.bindFramebuffer(36009,ye.__webglMultisampledFramebuffer)}}function we(L){return Math.min(h,L.samples)}function Te(L){const A=n.get(L);return a&&L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function at(L){const A=o.render.frame;g.get(L)!==A&&(g.set(L,A),L.update())}function Qe(L,A){const Q=L.encoding,fe=L.format,me=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Gu||Q!==ar&&(Q===Je?a===!1?e.has("EXT_sRGB")===!0&&fe===fn?(L.format=Gu,L.minFilter=Yt,L.generateMipmaps=!1):A=Dy.sRGBToLinear(A):(fe!==fn||me!==or)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",Q)),A}this.allocateTextureUnit=S,this.resetTextureUnits=J,this.setTexture2D=k,this.setTexture2DArray=R,this.setTexture3D=O,this.setTextureCube=j,this.rebindTextures=oe,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=K,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=Te}function sR(r,e,t){const n=t.isWebGL2;function i(s,o=null){let a;if(s===or)return 5121;if(s===U1)return 32819;if(s===B1)return 32820;if(s===O1)return 5120;if(s===F1)return 5122;if(s===Ey)return 5123;if(s===k1)return 5124;if(s===ji)return 5125;if(s===di)return 5126;if(s===Eo)return n?5131:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===z1)return 6406;if(s===fn)return 6408;if(s===V1)return 6409;if(s===G1)return 6410;if(s===Xi)return 6402;if(s===ds)return 34041;if(s===H1)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===Gu)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===W1)return 6403;if(s===j1)return 36244;if(s===q1)return 33319;if(s===$1)return 33320;if(s===X1)return 36249;if(s===Ac||s===Ic||s===Pc||s===Rc)if(o===Je)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Ac)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ic)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Pc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Rc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Ac)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ic)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Pc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Rc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===fp||s===dp||s===pp||s===mp)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===fp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===dp)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===pp)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===mp)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Y1)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===gp||s===_p)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===gp)return o===Je?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===_p)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===yp||s===vp||s===xp||s===bp||s===wp||s===Sp||s===Mp||s===Ep||s===Tp||s===Cp||s===Ap||s===Ip||s===Pp||s===Rp)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===yp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===vp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===xp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===bp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===wp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Sp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Mp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ep)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Tp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Cp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ap)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ip)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Pp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Rp)return o===Je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Dp)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Dp)return o===Je?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===qr?n?34042:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class oR extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class pi extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const aR={type:"move"};class iu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const m of e.hand.values()){const p=t.getJointPose(m,n),y=this._getHandJoint(c,m);p!==null&&(y.matrix.fromArray(p.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.jointRadius=p.radius),y.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(aR)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new pi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class lR extends kt{constructor(e,t,n,i,s,o,a,l,c,u){if(u=u!==void 0?u:Xi,u!==Xi&&u!==ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Xi&&(n=ji),n===void 0&&u===ds&&(n=qr),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Dt,this.minFilter=l!==void 0?l:Dt,this.flipY=!1,this.generateMipmaps=!1}}class cR extends ws{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=null,c=null,u=null,h=null,f=null,d=null;const g=t.getContextAttributes();let m=null,p=null;const y=[],w=[],v=new Set,x=new Map,b=new Ht;b.layers.enable(1),b.viewport=new st;const M=new Ht;M.layers.enable(2),M.viewport=new st;const T=[b,M],_=new oR;_.layers.enable(1),_.layers.enable(2);let C=null,E=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(R){let O=y[R];return O===void 0&&(O=new iu,y[R]=O),O.getTargetRaySpace()},this.getControllerGrip=function(R){let O=y[R];return O===void 0&&(O=new iu,y[R]=O),O.getGripSpace()},this.getHand=function(R){let O=y[R];return O===void 0&&(O=new iu,y[R]=O),O.getHandSpace()};function D(R){const O=w.indexOf(R.inputSource);if(O===-1)return;const j=y[O];j!==void 0&&j.dispatchEvent({type:R.type,data:R.inputSource})}function z(){i.removeEventListener("select",D),i.removeEventListener("selectstart",D),i.removeEventListener("selectend",D),i.removeEventListener("squeeze",D),i.removeEventListener("squeezestart",D),i.removeEventListener("squeezeend",D),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",N);for(let R=0;R<y.length;R++){const O=w[R];O!==null&&(w[R]=null,y[R].disconnect(O))}C=null,E=null,e.setRenderTarget(m),f=null,h=null,u=null,i=null,p=null,k.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(R){s=R,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(R){a=R,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(R){l=R},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u},this.getFrame=function(){return d},this.getSession=function(){return i},this.setSession=async function(R){if(i=R,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",D),i.addEventListener("selectstart",D),i.addEventListener("selectend",D),i.addEventListener("squeeze",D),i.addEventListener("squeezestart",D),i.addEventListener("squeezeend",D),i.addEventListener("end",z),i.addEventListener("inputsourceschange",N),g.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const O={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:g.alpha,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,O),i.updateRenderState({baseLayer:f}),p=new lr(f.framebufferWidth,f.framebufferHeight,{format:fn,type:or,encoding:e.outputEncoding,stencilBuffer:g.stencil})}else{let O=null,j=null,G=null;g.depth&&(G=g.stencil?35056:33190,O=g.stencil?ds:Xi,j=g.stencil?qr:ji);const B={colorFormat:32856,depthFormat:G,scaleFactor:s};u=new XRWebGLBinding(i,t),h=u.createProjectionLayer(B),i.updateRenderState({layers:[h]}),p=new lr(h.textureWidth,h.textureHeight,{format:fn,type:or,depthTexture:new lR(h.textureWidth,h.textureHeight,j,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:g.stencil,encoding:e.outputEncoding,samples:g.antialias?4:0});const W=e.properties.get(p);W.__ignoreDepthValues=h.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(1),l=null,o=await i.requestReferenceSpace(a),k.setContext(i),k.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function N(R){for(let O=0;O<R.removed.length;O++){const j=R.removed[O],G=w.indexOf(j);G>=0&&(w[G]=null,y[G].disconnect(j))}for(let O=0;O<R.added.length;O++){const j=R.added[O];let G=w.indexOf(j);if(G===-1){for(let W=0;W<y.length;W++)if(W>=w.length){w.push(j),G=W;break}else if(w[W]===null){w[W]=j,G=W;break}if(G===-1)break}const B=y[G];B&&B.connect(j)}}const F=new U,H=new U;function Y(R,O,j){F.setFromMatrixPosition(O.matrixWorld),H.setFromMatrixPosition(j.matrixWorld);const G=F.distanceTo(H),B=O.projectionMatrix.elements,W=j.projectionMatrix.elements,ae=B[14]/(B[10]-1),le=B[14]/(B[10]+1),se=(B[9]+1)/B[5],Z=(B[9]-1)/B[5],ne=(B[8]-1)/B[0],q=(W[8]+1)/W[0],K=ae*ne,oe=ae*q,pe=G/(-ne+q),ce=pe*-ne;O.matrixWorld.decompose(R.position,R.quaternion,R.scale),R.translateX(ce),R.translateZ(pe),R.matrixWorld.compose(R.position,R.quaternion,R.scale),R.matrixWorldInverse.copy(R.matrixWorld).invert();const Re=ae+pe,we=le+pe,Te=K-ce,at=oe+(G-ce),Qe=se*le/we*Re,L=Z*le/we*Re;R.projectionMatrix.makePerspective(Te,at,Qe,L,Re,we)}function J(R,O){O===null?R.matrixWorld.copy(R.matrix):R.matrixWorld.multiplyMatrices(O.matrixWorld,R.matrix),R.matrixWorldInverse.copy(R.matrixWorld).invert()}this.updateCamera=function(R){if(i===null)return;_.near=M.near=b.near=R.near,_.far=M.far=b.far=R.far,(C!==_.near||E!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),C=_.near,E=_.far);const O=R.parent,j=_.cameras;J(_,O);for(let B=0;B<j.length;B++)J(j[B],O);_.matrixWorld.decompose(_.position,_.quaternion,_.scale),R.matrix.copy(_.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale);const G=R.children;for(let B=0,W=G.length;B<W;B++)G[B].updateMatrixWorld(!0);j.length===2?Y(_,b,M):_.projectionMatrix.copy(b.projectionMatrix)},this.getCamera=function(){return _},this.getFoveation=function(){if(h!==null)return h.fixedFoveation;if(f!==null)return f.fixedFoveation},this.setFoveation=function(R){h!==null&&(h.fixedFoveation=R),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=R)},this.getPlanes=function(){return v};let S=null;function P(R,O){if(c=O.getViewerPose(l||o),d=O,c!==null){const j=c.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let G=!1;j.length!==_.cameras.length&&(_.cameras.length=0,G=!0);for(let B=0;B<j.length;B++){const W=j[B];let ae=null;if(f!==null)ae=f.getViewport(W);else{const se=u.getViewSubImage(h,W);ae=se.viewport,B===0&&(e.setRenderTargetTextures(p,se.colorTexture,h.ignoreDepthValues?void 0:se.depthStencilTexture),e.setRenderTarget(p))}let le=T[B];le===void 0&&(le=new Ht,le.layers.enable(B),le.viewport=new st,T[B]=le),le.matrix.fromArray(W.transform.matrix),le.projectionMatrix.fromArray(W.projectionMatrix),le.viewport.set(ae.x,ae.y,ae.width,ae.height),B===0&&_.matrix.copy(le.matrix),G===!0&&_.cameras.push(le)}}for(let j=0;j<y.length;j++){const G=w[j],B=y[j];G!==null&&B!==void 0&&B.update(G,O,l||o)}if(S&&S(R,O),O.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:O.detectedPlanes});let j=null;for(const G of v)O.detectedPlanes.has(G)||(j===null&&(j=[]),j.push(G));if(j!==null)for(const G of j)v.delete(G),x.delete(G),n.dispatchEvent({type:"planeremoved",data:G});for(const G of O.detectedPlanes)if(!v.has(G))v.add(G),x.set(G,O.lastChangedTime),n.dispatchEvent({type:"planeadded",data:G});else{const B=x.get(G);G.lastChangedTime>B&&(x.set(G,G.lastChangedTime),n.dispatchEvent({type:"planechanged",data:G}))}}d=null}const k=new zy;k.setAnimationLoop(P),this.setAnimationLoop=function(R){S=R},this.dispose=function(){}}}function uR(r,e){function t(m,p){p.color.getRGB(m.fogColor.value,ky(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,y,w,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?i(m,p):p.isMeshToonMaterial?(i(m,p),u(m,p)):p.isMeshPhongMaterial?(i(m,p),c(m,p)):p.isMeshStandardMaterial?(i(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(i(m,p),d(m,p)):p.isMeshDepthMaterial?i(m,p):p.isMeshDistanceMaterial?(i(m,p),g(m,p)):p.isMeshNormalMaterial?i(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?a(m,p,y,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function i(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.bumpMap&&(m.bumpMap.value=p.bumpMap,m.bumpScale.value=p.bumpScale,p.side===pn&&(m.bumpScale.value*=-1)),p.displacementMap&&(m.displacementMap.value=p.displacementMap,m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap),p.normalMap&&(m.normalMap.value=p.normalMap,m.normalScale.value.copy(p.normalScale),p.side===pn&&m.normalScale.value.negate()),p.specularMap&&(m.specularMap.value=p.specularMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=r.physicallyCorrectLights!==!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity);let w;p.map?w=p.map:p.specularMap?w=p.specularMap:p.displacementMap?w=p.displacementMap:p.normalMap?w=p.normalMap:p.bumpMap?w=p.bumpMap:p.roughnessMap?w=p.roughnessMap:p.metalnessMap?w=p.metalnessMap:p.alphaMap?w=p.alphaMap:p.emissiveMap?w=p.emissiveMap:p.clearcoatMap?w=p.clearcoatMap:p.clearcoatNormalMap?w=p.clearcoatNormalMap:p.clearcoatRoughnessMap?w=p.clearcoatRoughnessMap:p.iridescenceMap?w=p.iridescenceMap:p.iridescenceThicknessMap?w=p.iridescenceThicknessMap:p.specularIntensityMap?w=p.specularIntensityMap:p.specularColorMap?w=p.specularColorMap:p.transmissionMap?w=p.transmissionMap:p.thicknessMap?w=p.thicknessMap:p.sheenColorMap?w=p.sheenColorMap:p.sheenRoughnessMap&&(w=p.sheenRoughnessMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),m.uvTransform.value.copy(w.matrix));let v;p.aoMap?v=p.aoMap:p.lightMap&&(v=p.lightMap),v!==void 0&&(v.isWebGLRenderTarget&&(v=v.texture),v.matrixAutoUpdate===!0&&v.updateMatrix(),m.uv2Transform.value.copy(v.matrix))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function a(m,p,y,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=w*.5,p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v;p.map?v=p.map:p.alphaMap&&(v=p.alphaMap),v!==void 0&&(v.matrixAutoUpdate===!0&&v.updateMatrix(),m.uvTransform.value.copy(v.matrix))}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map),p.alphaMap&&(m.alphaMap.value=p.alphaMap),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let y;p.map?y=p.map:p.alphaMap&&(y=p.alphaMap),y!==void 0&&(y.matrixAutoUpdate===!0&&y.updateMatrix(),m.uvTransform.value.copy(y.matrix))}function c(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.roughness.value=p.roughness,m.metalness.value=p.metalness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap)),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),m.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===pn&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap)),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap)}function d(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){m.referencePosition.value.copy(p.referencePosition),m.nearDistance.value=p.nearDistance,m.farDistance.value=p.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function hR(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(35375):0;function l(w,v){const x=v.program;n.uniformBlockBinding(w,x)}function c(w,v){let x=i[w.id];x===void 0&&(g(w),x=u(w),i[w.id]=x,w.addEventListener("dispose",p));const b=v.program;n.updateUBOMapping(w,b);const M=e.render.frame;s[w.id]!==M&&(f(w),s[w.id]=M)}function u(w){const v=h();w.__bindingPointIndex=v;const x=r.createBuffer(),b=w.__size,M=w.usage;return r.bindBuffer(35345,x),r.bufferData(35345,b,M),r.bindBuffer(35345,null),r.bindBufferBase(35345,v,x),x}function h(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){const v=i[w.id],x=w.uniforms,b=w.__cache;r.bindBuffer(35345,v);for(let M=0,T=x.length;M<T;M++){const _=x[M];if(d(_,M,b)===!0){const C=_.__offset,E=Array.isArray(_.value)?_.value:[_.value];let D=0;for(let z=0;z<E.length;z++){const N=E[z],F=m(N);typeof N=="number"?(_.__data[0]=N,r.bufferSubData(35345,C+D,_.__data)):N.isMatrix3?(_.__data[0]=N.elements[0],_.__data[1]=N.elements[1],_.__data[2]=N.elements[2],_.__data[3]=N.elements[0],_.__data[4]=N.elements[3],_.__data[5]=N.elements[4],_.__data[6]=N.elements[5],_.__data[7]=N.elements[0],_.__data[8]=N.elements[6],_.__data[9]=N.elements[7],_.__data[10]=N.elements[8],_.__data[11]=N.elements[0]):(N.toArray(_.__data,D),D+=F.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(35345,C,_.__data)}}r.bindBuffer(35345,null)}function d(w,v,x){const b=w.value;if(x[v]===void 0){if(typeof b=="number")x[v]=b;else{const M=Array.isArray(b)?b:[b],T=[];for(let _=0;_<M.length;_++)T.push(M[_].clone());x[v]=T}return!0}else if(typeof b=="number"){if(x[v]!==b)return x[v]=b,!0}else{const M=Array.isArray(x[v])?x[v]:[x[v]],T=Array.isArray(b)?b:[b];for(let _=0;_<M.length;_++){const C=M[_];if(C.equals(T[_])===!1)return C.copy(T[_]),!0}}return!1}function g(w){const v=w.uniforms;let x=0;const b=16;let M=0;for(let T=0,_=v.length;T<_;T++){const C=v[T],E={boundary:0,storage:0},D=Array.isArray(C.value)?C.value:[C.value];for(let z=0,N=D.length;z<N;z++){const F=D[z],H=m(F);E.boundary+=H.boundary,E.storage+=H.storage}if(C.__data=new Float32Array(E.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=x,T>0){M=x%b;const z=b-M;M!==0&&z-E.boundary<0&&(x+=b-M,C.__offset=x)}x+=E.storage}return M=x%b,M>0&&(x+=b-M),w.__size=x,w.__cache={},this}function m(w){const v={boundary:0,storage:0};return typeof w=="number"?(v.boundary=4,v.storage=4):w.isVector2?(v.boundary=8,v.storage=8):w.isVector3||w.isColor?(v.boundary=16,v.storage=12):w.isVector4?(v.boundary=16,v.storage=16):w.isMatrix3?(v.boundary=48,v.storage=48):w.isMatrix4?(v.boundary=64,v.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),v}function p(w){const v=w.target;v.removeEventListener("dispose",p);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function y(){for(const w in i)r.deleteBuffer(i[w]);o=[],i={},s={}}return{bind:l,update:c,dispose:y}}function fR(){const r=Io("canvas");return r.style.display="block",r}function jy(r={}){this.isWebGLRenderer=!0;const e=r.canvas!==void 0?r.canvas:fR(),t=r.context!==void 0?r.context:null,n=r.depth!==void 0?r.depth:!0,i=r.stencil!==void 0?r.stencil:!0,s=r.antialias!==void 0?r.antialias:!1,o=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,a=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,l=r.powerPreference!==void 0?r.powerPreference:"default",c=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1;let u;t!==null?u=t.getContextAttributes().alpha:u=r.alpha!==void 0?r.alpha:!1;let h=null,f=null;const d=[],g=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=ar,this.physicallyCorrectLights=!1,this.toneMapping=Qn,this.toneMappingExposure=1;const m=this;let p=!1,y=0,w=0,v=null,x=-1,b=null;const M=new st,T=new st;let _=null,C=e.width,E=e.height,D=1,z=null,N=null;const F=new st(0,0,C,E),H=new st(0,0,C,E);let Y=!1;const J=new Zh;let S=!1,P=!1,k=null;const R=new ze,O=new ue,j=new U,G={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function B(){return v===null?D:1}let W=t;function ae(I,X){for(let te=0;te<I.length;te++){const $=I[te],ie=e.getContext($,X);if(ie!==null)return ie}return null}try{const I={alpha:!0,depth:n,stencil:i,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:a,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Xh}`),e.addEventListener("webglcontextlost",Ce,!1),e.addEventListener("webglcontextrestored",Me,!1),e.addEventListener("webglcontextcreationerror",$e,!1),W===null){const X=["webgl2","webgl","experimental-webgl"];if(m.isWebGL1Renderer===!0&&X.shift(),W=ae(X,I),W===null)throw ae(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let le,se,Z,ne,q,K,oe,pe,ce,Re,we,Te,at,Qe,L,A,Q,fe,me,_e,De,ye,re,Se;function Ie(){le=new SI(W),se=new _I(W,le,r),le.init(se),ye=new sR(W,le,se),Z=new iR(W,le,se),ne=new TI,q=new GP,K=new rR(W,le,Z,q,se,ye,ne),oe=new vI(m),pe=new wI(m),ce=new OT(W,se),re=new mI(W,le,ce,se),Re=new MI(W,ce,ne,re),we=new PI(W,Re,ce,ne),me=new II(W,se,K),A=new yI(q),Te=new VP(m,oe,pe,le,se,re,A),at=new uR(m,q),Qe=new jP,L=new ZP(le,se),fe=new pI(m,oe,pe,Z,we,u,o),Q=new nR(m,we,se),Se=new hR(W,ne,se,Z),_e=new gI(W,le,ne,se),De=new EI(W,le,ne,se),ne.programs=Te.programs,m.capabilities=se,m.extensions=le,m.properties=q,m.renderLists=Qe,m.shadowMap=Q,m.state=Z,m.info=ne}Ie();const xe=new cR(m,W);this.xr=xe,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const I=le.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){const I=le.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(I){I!==void 0&&(D=I,this.setSize(C,E,!1))},this.getSize=function(I){return I.set(C,E)},this.setSize=function(I,X,te){if(xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}C=I,E=X,e.width=Math.floor(I*D),e.height=Math.floor(X*D),te!==!1&&(e.style.width=I+"px",e.style.height=X+"px"),this.setViewport(0,0,I,X)},this.getDrawingBufferSize=function(I){return I.set(C*D,E*D).floor()},this.setDrawingBufferSize=function(I,X,te){C=I,E=X,D=te,e.width=Math.floor(I*te),e.height=Math.floor(X*te),this.setViewport(0,0,I,X)},this.getCurrentViewport=function(I){return I.copy(M)},this.getViewport=function(I){return I.copy(F)},this.setViewport=function(I,X,te,$){I.isVector4?F.set(I.x,I.y,I.z,I.w):F.set(I,X,te,$),Z.viewport(M.copy(F).multiplyScalar(D).floor())},this.getScissor=function(I){return I.copy(H)},this.setScissor=function(I,X,te,$){I.isVector4?H.set(I.x,I.y,I.z,I.w):H.set(I,X,te,$),Z.scissor(T.copy(H).multiplyScalar(D).floor())},this.getScissorTest=function(){return Y},this.setScissorTest=function(I){Z.setScissorTest(Y=I)},this.setOpaqueSort=function(I){z=I},this.setTransparentSort=function(I){N=I},this.getClearColor=function(I){return I.copy(fe.getClearColor())},this.setClearColor=function(){fe.setClearColor.apply(fe,arguments)},this.getClearAlpha=function(){return fe.getClearAlpha()},this.setClearAlpha=function(){fe.setClearAlpha.apply(fe,arguments)},this.clear=function(I=!0,X=!0,te=!0){let $=0;I&&($|=16384),X&&($|=256),te&&($|=1024),W.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Ce,!1),e.removeEventListener("webglcontextrestored",Me,!1),e.removeEventListener("webglcontextcreationerror",$e,!1),Qe.dispose(),L.dispose(),q.dispose(),oe.dispose(),pe.dispose(),we.dispose(),re.dispose(),Se.dispose(),Te.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",ve),xe.removeEventListener("sessionend",be),k&&(k.dispose(),k=null),Ke.stop()};function Ce(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),p=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),p=!1;const I=ne.autoReset,X=Q.enabled,te=Q.autoUpdate,$=Q.needsUpdate,ie=Q.type;Ie(),ne.autoReset=I,Q.enabled=X,Q.autoUpdate=te,Q.needsUpdate=$,Q.type=ie}function $e(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function ct(I){const X=I.target;X.removeEventListener("dispose",ct),Tt(X)}function Tt(I){V(I),q.remove(I)}function V(I){const X=q.get(I).programs;X!==void 0&&(X.forEach(function(te){Te.releaseProgram(te)}),I.isShaderMaterial&&Te.releaseShaderCache(I))}this.renderBufferDirect=function(I,X,te,$,ie,Ee){X===null&&(X=G);const Le=ie.isMesh&&ie.matrixWorld.determinant()<0,ke=hv(I,X,te,$,ie);Z.setMaterial($,Le);let He=te.index,Xe=1;$.wireframe===!0&&(He=Re.getWireframeAttribute(te),Xe=2);const Ve=te.drawRange,Ge=te.attributes.position;let vt=Ve.start*Xe,Qt=(Ve.start+Ve.count)*Xe;Ee!==null&&(vt=Math.max(vt,Ee.start*Xe),Qt=Math.min(Qt,(Ee.start+Ee.count)*Xe)),He!==null?(vt=Math.max(vt,0),Qt=Math.min(Qt,He.count)):Ge!=null&&(vt=Math.max(vt,0),Qt=Math.min(Qt,Ge.count));const Bn=Qt-vt;if(Bn<0||Bn===1/0)return;re.setup(ie,$,ke,te,He);let Ci,xt=_e;if(He!==null&&(Ci=ce.get(He),xt=De,xt.setIndex(Ci)),ie.isMesh)$.wireframe===!0?(Z.setLineWidth($.wireframeLinewidth*B()),xt.setMode(1)):xt.setMode(4);else if(ie.isLine){let We=$.linewidth;We===void 0&&(We=1),Z.setLineWidth(We*B()),ie.isLineSegments?xt.setMode(1):ie.isLineLoop?xt.setMode(2):xt.setMode(3)}else ie.isPoints?xt.setMode(0):ie.isSprite&&xt.setMode(4);if(ie.isInstancedMesh)xt.renderInstances(vt,Bn,ie.count);else if(te.isInstancedBufferGeometry){const We=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,Ul=Math.min(te.instanceCount,We);xt.renderInstances(vt,Bn,Ul)}else xt.render(vt,Bn)},this.compile=function(I,X){function te($,ie,Ee){$.transparent===!0&&$.side===ea?($.side=pn,$.needsUpdate=!0,on($,ie,Ee),$.side=wi,$.needsUpdate=!0,on($,ie,Ee),$.side=ea):on($,ie,Ee)}f=L.get(I),f.init(),g.push(f),I.traverseVisible(function($){$.isLight&&$.layers.test(X.layers)&&(f.pushLight($),$.castShadow&&f.pushShadow($))}),f.setupLights(m.physicallyCorrectLights),I.traverse(function($){const ie=$.material;if(ie)if(Array.isArray(ie))for(let Ee=0;Ee<ie.length;Ee++){const Le=ie[Ee];te(Le,I,$)}else te(ie,I,$)}),g.pop(),f=null};let ee=null;function he(I){ee&&ee(I)}function ve(){Ke.stop()}function be(){Ke.start()}const Ke=new zy;Ke.setAnimationLoop(he),typeof self<"u"&&Ke.setContext(self),this.setAnimationLoop=function(I){ee=I,xe.setAnimationLoop(I),I===null?Ke.stop():Ke.start()},xe.addEventListener("sessionstart",ve),xe.addEventListener("sessionend",be),this.render=function(I,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(p===!0)return;I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(X),X=xe.getCamera()),I.isScene===!0&&I.onBeforeRender(m,I,X,v),f=L.get(I,g.length),f.init(),g.push(f),R.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),J.setFromProjectionMatrix(R),P=this.localClippingEnabled,S=A.init(this.clippingPlanes,P,X),h=Qe.get(I,d.length),h.init(),d.push(h),Ct(I,X,0,m.sortObjects),h.finish(),m.sortObjects===!0&&h.sort(z,N),S===!0&&A.beginShadows();const te=f.state.shadowsArray;if(Q.render(te,I,X),S===!0&&A.endShadows(),this.info.autoReset===!0&&this.info.reset(),fe.render(h,I),f.setupLights(m.physicallyCorrectLights),X.isArrayCamera){const $=X.cameras;for(let ie=0,Ee=$.length;ie<Ee;ie++){const Le=$[ie];Ut(h,I,Le,Le.viewport)}}else Ut(h,I,X);v!==null&&(K.updateMultisampleRenderTarget(v),K.updateRenderTargetMipmap(v)),I.isScene===!0&&I.onAfterRender(m,I,X),re.resetDefaultState(),x=-1,b=null,g.pop(),g.length>0?f=g[g.length-1]:f=null,d.pop(),d.length>0?h=d[d.length-1]:h=null};function Ct(I,X,te,$){if(I.visible===!1)return;if(I.layers.test(X.layers)){if(I.isGroup)te=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(X);else if(I.isLight)f.pushLight(I),I.castShadow&&f.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||J.intersectsSprite(I)){$&&j.setFromMatrixPosition(I.matrixWorld).applyMatrix4(R);const Le=we.update(I),ke=I.material;ke.visible&&h.push(I,Le,ke,te,j.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(I.isSkinnedMesh&&I.skeleton.frame!==ne.render.frame&&(I.skeleton.update(),I.skeleton.frame=ne.render.frame),!I.frustumCulled||J.intersectsObject(I))){$&&j.setFromMatrixPosition(I.matrixWorld).applyMatrix4(R);const Le=we.update(I),ke=I.material;if(Array.isArray(ke)){const He=Le.groups;for(let Xe=0,Ve=He.length;Xe<Ve;Xe++){const Ge=He[Xe],vt=ke[Ge.materialIndex];vt&&vt.visible&&h.push(I,Le,vt,te,j.z,Ge)}}else ke.visible&&h.push(I,Le,ke,te,j.z,null)}}const Ee=I.children;for(let Le=0,ke=Ee.length;Le<ke;Le++)Ct(Ee[Le],X,te,$)}function Ut(I,X,te,$){const ie=I.opaque,Ee=I.transmissive,Le=I.transparent;f.setupLightsView(te),Ee.length>0&&Ti(ie,X,te),$&&Z.viewport(M.copy($)),ie.length>0&&ut(ie,X,te),Ee.length>0&&ut(Ee,X,te),Le.length>0&&ut(Le,X,te),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function Ti(I,X,te){const $=se.isWebGL2;k===null&&(k=new lr(1,1,{generateMipmaps:!0,type:le.has("EXT_color_buffer_half_float")?Eo:or,minFilter:sr,samples:$&&s===!0?4:0})),m.getDrawingBufferSize(O),$?k.setSize(O.x,O.y):k.setSize(tl(O.x),tl(O.y));const ie=m.getRenderTarget();m.setRenderTarget(k),m.clear();const Ee=m.toneMapping;m.toneMapping=Qn,ut(I,X,te),m.toneMapping=Ee,K.updateMultisampleRenderTarget(k),K.updateRenderTargetMipmap(k),m.setRenderTarget(ie)}function ut(I,X,te){const $=X.isScene===!0?X.overrideMaterial:null;for(let ie=0,Ee=I.length;ie<Ee;ie++){const Le=I[ie],ke=Le.object,He=Le.geometry,Xe=$===null?Le.material:$,Ve=Le.group;ke.layers.test(te.layers)&&Un(ke,X,te,He,Xe,Ve)}}function Un(I,X,te,$,ie,Ee){I.onBeforeRender(m,X,te,$,ie,Ee),I.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),ie.onBeforeRender(m,X,te,$,I,Ee),ie.transparent===!0&&ie.side===ea?(ie.side=pn,ie.needsUpdate=!0,m.renderBufferDirect(te,X,$,ie,I,Ee),ie.side=wi,ie.needsUpdate=!0,m.renderBufferDirect(te,X,$,ie,I,Ee),ie.side=ea):m.renderBufferDirect(te,X,$,ie,I,Ee),I.onAfterRender(m,X,te,$,ie,Ee)}function on(I,X,te){X.isScene!==!0&&(X=G);const $=q.get(I),ie=f.state.lights,Ee=f.state.shadowsArray,Le=ie.state.version,ke=Te.getParameters(I,ie.state,Ee,X,te),He=Te.getProgramCacheKey(ke);let Xe=$.programs;$.environment=I.isMeshStandardMaterial?X.environment:null,$.fog=X.fog,$.envMap=(I.isMeshStandardMaterial?pe:oe).get(I.envMap||$.environment),Xe===void 0&&(I.addEventListener("dispose",ct),Xe=new Map,$.programs=Xe);let Ve=Xe.get(He);if(Ve!==void 0){if($.currentProgram===Ve&&$.lightsStateVersion===Le)return mf(I,ke),Ve}else ke.uniforms=Te.getUniforms(I),I.onBuild(te,ke,m),I.onBeforeCompile(ke,m),Ve=Te.acquireProgram(ke,He),Xe.set(He,Ve),$.uniforms=ke.uniforms;const Ge=$.uniforms;(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Ge.clippingPlanes=A.uniform),mf(I,ke),$.needsLights=dv(I),$.lightsStateVersion=Le,$.needsLights&&(Ge.ambientLightColor.value=ie.state.ambient,Ge.lightProbe.value=ie.state.probe,Ge.directionalLights.value=ie.state.directional,Ge.directionalLightShadows.value=ie.state.directionalShadow,Ge.spotLights.value=ie.state.spot,Ge.spotLightShadows.value=ie.state.spotShadow,Ge.rectAreaLights.value=ie.state.rectArea,Ge.ltc_1.value=ie.state.rectAreaLTC1,Ge.ltc_2.value=ie.state.rectAreaLTC2,Ge.pointLights.value=ie.state.point,Ge.pointLightShadows.value=ie.state.pointShadow,Ge.hemisphereLights.value=ie.state.hemi,Ge.directionalShadowMap.value=ie.state.directionalShadowMap,Ge.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,Ge.spotShadowMap.value=ie.state.spotShadowMap,Ge.spotLightMatrix.value=ie.state.spotLightMatrix,Ge.spotLightMap.value=ie.state.spotLightMap,Ge.pointShadowMap.value=ie.state.pointShadowMap,Ge.pointShadowMatrix.value=ie.state.pointShadowMatrix);const vt=Ve.getUniforms(),Qt=Da.seqWithValue(vt.seq,Ge);return $.currentProgram=Ve,$.uniformsList=Qt,Ve}function mf(I,X){const te=q.get(I);te.outputEncoding=X.outputEncoding,te.instancing=X.instancing,te.skinning=X.skinning,te.morphTargets=X.morphTargets,te.morphNormals=X.morphNormals,te.morphColors=X.morphColors,te.morphTargetsCount=X.morphTargetsCount,te.numClippingPlanes=X.numClippingPlanes,te.numIntersection=X.numClipIntersection,te.vertexAlphas=X.vertexAlphas,te.vertexTangents=X.vertexTangents,te.toneMapping=X.toneMapping}function hv(I,X,te,$,ie){X.isScene!==!0&&(X=G),K.resetTextureUnits();const Ee=X.fog,Le=$.isMeshStandardMaterial?X.environment:null,ke=v===null?m.outputEncoding:v.isXRRenderTarget===!0?v.texture.encoding:ar,He=($.isMeshStandardMaterial?pe:oe).get($.envMap||Le),Xe=$.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,Ve=!!$.normalMap&&!!te.attributes.tangent,Ge=!!te.morphAttributes.position,vt=!!te.morphAttributes.normal,Qt=!!te.morphAttributes.color,Bn=$.toneMapped?m.toneMapping:Qn,Ci=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,xt=Ci!==void 0?Ci.length:0,We=q.get($),Ul=f.state.lights;if(S===!0&&(P===!0||I!==b)){const en=I===b&&$.id===x;A.setState($,I,en)}let At=!1;$.version===We.__version?(We.needsLights&&We.lightsStateVersion!==Ul.state.version||We.outputEncoding!==ke||ie.isInstancedMesh&&We.instancing===!1||!ie.isInstancedMesh&&We.instancing===!0||ie.isSkinnedMesh&&We.skinning===!1||!ie.isSkinnedMesh&&We.skinning===!0||We.envMap!==He||$.fog===!0&&We.fog!==Ee||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==A.numPlanes||We.numIntersection!==A.numIntersection)||We.vertexAlphas!==Xe||We.vertexTangents!==Ve||We.morphTargets!==Ge||We.morphNormals!==vt||We.morphColors!==Qt||We.toneMapping!==Bn||se.isWebGL2===!0&&We.morphTargetsCount!==xt)&&(At=!0):(At=!0,We.__version=$.version);let Ai=We.currentProgram;At===!0&&(Ai=on($,X,ie));let gf=!1,Is=!1,Bl=!1;const Wt=Ai.getUniforms(),Ii=We.uniforms;if(Z.useProgram(Ai.program)&&(gf=!0,Is=!0,Bl=!0),$.id!==x&&(x=$.id,Is=!0),gf||b!==I){if(Wt.setValue(W,"projectionMatrix",I.projectionMatrix),se.logarithmicDepthBuffer&&Wt.setValue(W,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),b!==I&&(b=I,Is=!0,Bl=!0),$.isShaderMaterial||$.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshStandardMaterial||$.envMap){const en=Wt.map.cameraPosition;en!==void 0&&en.setValue(W,j.setFromMatrixPosition(I.matrixWorld))}($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Wt.setValue(W,"isOrthographic",I.isOrthographicCamera===!0),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial||$.isShadowMaterial||ie.isSkinnedMesh)&&Wt.setValue(W,"viewMatrix",I.matrixWorldInverse)}if(ie.isSkinnedMesh){Wt.setOptional(W,ie,"bindMatrix"),Wt.setOptional(W,ie,"bindMatrixInverse");const en=ie.skeleton;en&&(se.floatVertexTextures?(en.boneTexture===null&&en.computeBoneTexture(),Wt.setValue(W,"boneTexture",en.boneTexture,K),Wt.setValue(W,"boneTextureSize",en.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const zl=te.morphAttributes;if((zl.position!==void 0||zl.normal!==void 0||zl.color!==void 0&&se.isWebGL2===!0)&&me.update(ie,te,$,Ai),(Is||We.receiveShadow!==ie.receiveShadow)&&(We.receiveShadow=ie.receiveShadow,Wt.setValue(W,"receiveShadow",ie.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Ii.envMap.value=He,Ii.flipEnvMap.value=He.isCubeTexture&&He.isRenderTargetTexture===!1?-1:1),Is&&(Wt.setValue(W,"toneMappingExposure",m.toneMappingExposure),We.needsLights&&fv(Ii,Bl),Ee&&$.fog===!0&&at.refreshFogUniforms(Ii,Ee),at.refreshMaterialUniforms(Ii,$,D,E,k),Da.upload(W,We.uniformsList,Ii,K)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Da.upload(W,We.uniformsList,Ii,K),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Wt.setValue(W,"center",ie.center),Wt.setValue(W,"modelViewMatrix",ie.modelViewMatrix),Wt.setValue(W,"normalMatrix",ie.normalMatrix),Wt.setValue(W,"modelMatrix",ie.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const en=$.uniformsGroups;for(let Hl=0,pv=en.length;Hl<pv;Hl++)if(se.isWebGL2){const _f=en[Hl];Se.update(_f,Ai),Se.bind(_f,Ai)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ai}function fv(I,X){I.ambientLightColor.needsUpdate=X,I.lightProbe.needsUpdate=X,I.directionalLights.needsUpdate=X,I.directionalLightShadows.needsUpdate=X,I.pointLights.needsUpdate=X,I.pointLightShadows.needsUpdate=X,I.spotLights.needsUpdate=X,I.spotLightShadows.needsUpdate=X,I.rectAreaLights.needsUpdate=X,I.hemisphereLights.needsUpdate=X}function dv(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(I,X,te){q.get(I.texture).__webglTexture=X,q.get(I.depthTexture).__webglTexture=te;const $=q.get(I);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=te===void 0,$.__autoAllocateDepthBuffer||le.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(I,X){const te=q.get(I);te.__webglFramebuffer=X,te.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(I,X=0,te=0){v=I,y=X,w=te;let $=!0,ie=null,Ee=!1,Le=!1;if(I){const He=q.get(I);He.__useDefaultFramebuffer!==void 0?(Z.bindFramebuffer(36160,null),$=!1):He.__webglFramebuffer===void 0?K.setupRenderTarget(I):He.__hasExternalTextures&&K.rebindTextures(I,q.get(I.texture).__webglTexture,q.get(I.depthTexture).__webglTexture);const Xe=I.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Le=!0);const Ve=q.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(ie=Ve[X],Ee=!0):se.isWebGL2&&I.samples>0&&K.useMultisampledRTT(I)===!1?ie=q.get(I).__webglMultisampledFramebuffer:ie=Ve,M.copy(I.viewport),T.copy(I.scissor),_=I.scissorTest}else M.copy(F).multiplyScalar(D).floor(),T.copy(H).multiplyScalar(D).floor(),_=Y;if(Z.bindFramebuffer(36160,ie)&&se.drawBuffers&&$&&Z.drawBuffers(I,ie),Z.viewport(M),Z.scissor(T),Z.setScissorTest(_),Ee){const He=q.get(I.texture);W.framebufferTexture2D(36160,36064,34069+X,He.__webglTexture,te)}else if(Le){const He=q.get(I.texture),Xe=X||0;W.framebufferTextureLayer(36160,36064,He.__webglTexture,te||0,Xe)}x=-1},this.readRenderTargetPixels=function(I,X,te,$,ie,Ee,Le){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=q.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke){Z.bindFramebuffer(36160,ke);try{const He=I.texture,Xe=He.format,Ve=He.type;if(Xe!==fn&&ye.convert(Xe)!==W.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ge=Ve===Eo&&(le.has("EXT_color_buffer_half_float")||se.isWebGL2&&le.has("EXT_color_buffer_float"));if(Ve!==or&&ye.convert(Ve)!==W.getParameter(35738)&&!(Ve===di&&(se.isWebGL2||le.has("OES_texture_float")||le.has("WEBGL_color_buffer_float")))&&!Ge){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=I.width-$&&te>=0&&te<=I.height-ie&&W.readPixels(X,te,$,ie,ye.convert(Xe),ye.convert(Ve),Ee)}finally{const He=v!==null?q.get(v).__webglFramebuffer:null;Z.bindFramebuffer(36160,He)}}},this.copyFramebufferToTexture=function(I,X,te=0){const $=Math.pow(2,-te),ie=Math.floor(X.image.width*$),Ee=Math.floor(X.image.height*$);K.setTexture2D(X,0),W.copyTexSubImage2D(3553,te,0,0,I.x,I.y,ie,Ee),Z.unbindTexture()},this.copyTextureToTexture=function(I,X,te,$=0){const ie=X.image.width,Ee=X.image.height,Le=ye.convert(te.format),ke=ye.convert(te.type);K.setTexture2D(te,0),W.pixelStorei(37440,te.flipY),W.pixelStorei(37441,te.premultiplyAlpha),W.pixelStorei(3317,te.unpackAlignment),X.isDataTexture?W.texSubImage2D(3553,$,I.x,I.y,ie,Ee,Le,ke,X.image.data):X.isCompressedTexture?W.compressedTexSubImage2D(3553,$,I.x,I.y,X.mipmaps[0].width,X.mipmaps[0].height,Le,X.mipmaps[0].data):W.texSubImage2D(3553,$,I.x,I.y,Le,ke,X.image),$===0&&te.generateMipmaps&&W.generateMipmap(3553),Z.unbindTexture()},this.copyTextureToTexture3D=function(I,X,te,$,ie=0){if(m.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ee=I.max.x-I.min.x+1,Le=I.max.y-I.min.y+1,ke=I.max.z-I.min.z+1,He=ye.convert($.format),Xe=ye.convert($.type);let Ve;if($.isData3DTexture)K.setTexture3D($,0),Ve=32879;else if($.isDataArrayTexture)K.setTexture2DArray($,0),Ve=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(37440,$.flipY),W.pixelStorei(37441,$.premultiplyAlpha),W.pixelStorei(3317,$.unpackAlignment);const Ge=W.getParameter(3314),vt=W.getParameter(32878),Qt=W.getParameter(3316),Bn=W.getParameter(3315),Ci=W.getParameter(32877),xt=te.isCompressedTexture?te.mipmaps[0]:te.image;W.pixelStorei(3314,xt.width),W.pixelStorei(32878,xt.height),W.pixelStorei(3316,I.min.x),W.pixelStorei(3315,I.min.y),W.pixelStorei(32877,I.min.z),te.isDataTexture||te.isData3DTexture?W.texSubImage3D(Ve,ie,X.x,X.y,X.z,Ee,Le,ke,He,Xe,xt.data):te.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),W.compressedTexSubImage3D(Ve,ie,X.x,X.y,X.z,Ee,Le,ke,He,xt.data)):W.texSubImage3D(Ve,ie,X.x,X.y,X.z,Ee,Le,ke,He,Xe,xt),W.pixelStorei(3314,Ge),W.pixelStorei(32878,vt),W.pixelStorei(3316,Qt),W.pixelStorei(3315,Bn),W.pixelStorei(32877,Ci),ie===0&&$.generateMipmaps&&W.generateMipmap(Ve),Z.unbindTexture()},this.initTexture=function(I){I.isCubeTexture?K.setTextureCube(I,0):I.isData3DTexture?K.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?K.setTexture2DArray(I,0):K.setTexture2D(I,0),Z.unbindTexture()},this.resetState=function(){y=0,w=0,v=null,Z.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class dR extends jy{}dR.prototype.isWebGL1Renderer=!0;class pR extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class mR{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Vu,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const qt=new U;class ef{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Zn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Zn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Zn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Zn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),i=it(i,this.array),s=it(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ef(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const gm=new U,_m=new st,ym=new st,gR=new U,vm=new ze;class _R extends mt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new ze,this.bindMatrixInverse=new ze}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new st,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const n=this.skeleton,i=this.geometry;_m.fromBufferAttribute(i.attributes.skinIndex,e),ym.fromBufferAttribute(i.attributes.skinWeight,e),gm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=ym.getComponent(s);if(o!==0){const a=_m.getComponent(s);vm.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(gR.copy(gm).applyMatrix4(vm),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class qy extends dt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class yR extends kt{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Dt,u=Dt,h,f){super(null,o,a,l,c,u,i,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xm=new ze,vR=new ze;class tf{constructor(e=[],t=[]){this.uuid=mn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:vR;xm.multiplyMatrices(a,t[s]),xm.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new tf(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Ay(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new yR(t,e,e,fn,di);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new qy),this.bones.push(o),this.boneInverses.push(new ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class bm extends Vt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const wm=new ze,Sm=new ze,va=[],xR=new ze,Ws=new mt;class bR extends mt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bm(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1;for(let i=0;i<n;i++)this.setMatrixAt(i,xR)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ws.geometry=this.geometry,Ws.material=this.material,Ws.material!==void 0)for(let s=0;s<i;s++){this.getMatrixAt(s,wm),Sm.multiplyMatrices(n,wm),Ws.matrixWorld=Sm,Ws.raycast(e,va);for(let o=0,a=va.length;o<a;o++){const l=va[o];l.instanceId=s,l.object=this,t.push(l)}va.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new bm(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class $y extends Ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Mm=new U,Em=new U,Tm=new ze,ru=new Nl,xa=new Ms;class nf extends dt{constructor(e=new Xt,t=new $y){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Mm.fromBufferAttribute(t,i-1),Em.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Mm.distanceTo(Em);e.setAttribute("lineDistance",new wt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xa.copy(n.boundingSphere),xa.applyMatrix4(i),xa.radius+=s,e.ray.intersectsSphere(xa)===!1)return;Tm.copy(i).invert(),ru.copy(e.ray).applyMatrix4(Tm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new U,u=new U,h=new U,f=new U,d=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const y=Math.max(0,o.start),w=Math.min(g.count,o.start+o.count);for(let v=y,x=w-1;v<x;v+=d){const b=g.getX(v),M=g.getX(v+1);if(c.fromBufferAttribute(p,b),u.fromBufferAttribute(p,M),ru.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const _=e.ray.origin.distanceTo(f);_<e.near||_>e.far||t.push({distance:_,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const y=Math.max(0,o.start),w=Math.min(p.count,o.start+o.count);for(let v=y,x=w-1;v<x;v+=d){if(c.fromBufferAttribute(p,v),u.fromBufferAttribute(p,v+1),ru.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const M=e.ray.origin.distanceTo(f);M<e.near||M>e.far||t.push({distance:M,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Cm=new U,Am=new U;class wR extends nf{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Cm.fromBufferAttribute(t,i),Am.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Cm.distanceTo(Am);e.setAttribute("lineDistance",new wt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class SR extends nf{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Xy extends Ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Im=new ze,qu=new Nl,ba=new Ms,wa=new U;class MR extends dt{constructor(e=new Xt,t=new Xy){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ba.copy(n.boundingSphere),ba.applyMatrix4(i),ba.radius+=s,e.ray.intersectsSphere(ba)===!1)return;Im.copy(i).invert(),qu.copy(e.ray).applyMatrix4(Im);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,m=d;g<m;g++){const p=c.getX(g);wa.fromBufferAttribute(h,p),Pm(wa,p,l,i,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,m=d;g<m;g++)wa.fromBufferAttribute(h,g),Pm(wa,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Pm(r,e,t,n,i,s,o){const a=qu.distanceSqToPoint(r);if(a<t){const l=new U;qu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Fn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=t||(o.isVector2?new ue:new U);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new U,i=[],s=[],o=[],a=new U,l=new ze;for(let d=0;d<=e;d++){const g=d/e;i[d]=this.getTangentAt(g,new U)}s[0]=new U,o[0]=new U;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Nt(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(i[d],s[d])}if(t===!0){let d=Math.acos(Nt(s[0].dot(s[e]),-1,1));d/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class rf extends Fn{constructor(e=0,t=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const n=t||new ue,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ER extends rf{constructor(e,t,n,i,s,o){super(e,t,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function sf(){let r=0,e=0,t=0,n=0;function i(s,o,a,l){r=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let f=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return r+e*s+t*o+n*a}}}const Sa=new U,su=new sf,ou=new sf,au=new sf;class Yy extends Fn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new U){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%s]:(Sa.subVectors(i[0],i[1]).add(i[0]),c=Sa);const h=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s?u=i[(a+2)%s]:(Sa.subVectors(i[s-1],i[s-2]).add(i[s-1]),u=Sa),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(u),d);m<1e-4&&(m=1),g<1e-4&&(g=m),p<1e-4&&(p=m),su.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,m,p),ou.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,m,p),au.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,m,p)}else this.curveType==="catmullrom"&&(su.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),ou.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),au.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(su.calc(l),ou.calc(l),au.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new U().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Rm(r,e,t,n,i){const s=(n-e)*.5,o=(i-t)*.5,a=r*r,l=r*a;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*a+s*r+t}function TR(r,e){const t=1-r;return t*t*e}function CR(r,e){return 2*(1-r)*r*e}function AR(r,e){return r*r*e}function ao(r,e,t,n){return TR(r,e)+CR(r,t)+AR(r,n)}function IR(r,e){const t=1-r;return t*t*t*e}function PR(r,e){const t=1-r;return 3*t*t*r*e}function RR(r,e){return 3*(1-r)*r*r*e}function DR(r,e){return r*r*r*e}function lo(r,e,t,n,i){return IR(r,e)+PR(r,t)+RR(r,n)+DR(r,i)}class Ky extends Fn{constructor(e=new ue,t=new ue,n=new ue,i=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ue){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(lo(e,i.x,s.x,o.x,a.x),lo(e,i.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class LR extends Fn{constructor(e=new U,t=new U,n=new U,i=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new U){const n=t,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(lo(e,i.x,s.x,o.x,a.x),lo(e,i.y,s.y,o.y,a.y),lo(e,i.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class of extends Fn{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t){const n=t||new ue;return n.copy(this.v2).sub(this.v1).normalize(),n}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class NR extends Fn{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zy extends Fn{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(ao(e,i.x,s.x,o.x),ao(e,i.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jy extends Fn{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){const n=t,i=this.v0,s=this.v1,o=this.v2;return n.set(ao(e,i.x,s.x,o.x),ao(e,i.y,s.y,o.y),ao(e,i.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qy extends Fn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const n=t,i=this.points,s=(i.length-1)*e,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Rm(a,l.x,c.x,u.x,h.x),Rm(a,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ue().fromArray(i))}return this}}var af=Object.freeze({__proto__:null,ArcCurve:ER,CatmullRomCurve3:Yy,CubicBezierCurve:Ky,CubicBezierCurve3:LR,EllipseCurve:rf,LineCurve:of,LineCurve3:NR,QuadraticBezierCurve:Zy,QuadraticBezierCurve3:Jy,SplineCurve:Qy});class OR extends Fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new of(t,e))}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new af[i.type]().fromJSON(i))}return this}}class Dm extends OR{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new of(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new Zy(this.currentPoint.clone(),new ue(e,t),new ue(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,o){const a=new Ky(this.currentPoint.clone(),new ue(e,t),new ue(n,i),new ue(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Qy(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,s,o),this}absarc(e,t,n,i,s,o){return this.absellipse(e,t,n,n,i,s,o),this}ellipse(e,t,n,i,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,i,s,o,a,l),this}absellipse(e,t,n,i,s,o,a,l){const c=new rf(e,t,n,i,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class lf extends Xt{constructor(e=[new ue(0,-.5),new ue(.5,0),new ue(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Nt(i,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],u=1/t,h=new U,f=new ue,d=new U,g=new U,m=new U;let p=0,y=0;for(let w=0;w<=e.length-1;w++)switch(w){case 0:p=e[w+1].x-e[w].x,y=e[w+1].y-e[w].y,d.x=y*1,d.y=-p,d.z=y*0,m.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(m.x,m.y,m.z);break;default:p=e[w+1].x-e[w].x,y=e[w+1].y-e[w].y,d.x=y*1,d.y=-p,d.z=y*0,g.copy(d),d.x+=m.x,d.y+=m.y,d.z+=m.z,d.normalize(),l.push(d.x,d.y,d.z),m.copy(g)}for(let w=0;w<=t;w++){const v=n+w*u*i,x=Math.sin(v),b=Math.cos(v);for(let M=0;M<=e.length-1;M++){h.x=e[M].x*x,h.y=e[M].y,h.z=e[M].x*b,o.push(h.x,h.y,h.z),f.x=w/t,f.y=M/(e.length-1),a.push(f.x,f.y);const T=l[3*M+0]*x,_=l[3*M+1],C=l[3*M+0]*b;c.push(T,_,C)}}for(let w=0;w<t;w++)for(let v=0;v<e.length-1;v++){const x=v+w*e.length,b=x,M=x+e.length,T=x+e.length+1,_=x+1;s.push(b,M,_),s.push(T,_,M)}this.setIndex(s),this.setAttribute("position",new wt(o,3)),this.setAttribute("uv",new wt(a,2)),this.setAttribute("normal",new wt(c,3))}static fromJSON(e){return new lf(e.points,e.segments,e.phiStart,e.phiLength)}}class cf extends Xt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const m=[],p=n/2;let y=0;w(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new wt(h,3)),this.setAttribute("normal",new wt(f,3)),this.setAttribute("uv",new wt(d,2));function w(){const x=new U,b=new U;let M=0;const T=(t-e)/n;for(let _=0;_<=s;_++){const C=[],E=_/s,D=E*(t-e)+e;for(let z=0;z<=i;z++){const N=z/i,F=N*l+a,H=Math.sin(F),Y=Math.cos(F);b.x=D*H,b.y=-E*n+p,b.z=D*Y,h.push(b.x,b.y,b.z),x.set(H,T,Y).normalize(),f.push(x.x,x.y,x.z),d.push(N,1-E),C.push(g++)}m.push(C)}for(let _=0;_<i;_++)for(let C=0;C<s;C++){const E=m[C][_],D=m[C+1][_],z=m[C+1][_+1],N=m[C][_+1];u.push(E,D,N),u.push(D,z,N),M+=6}c.addGroup(y,M,0),y+=M}function v(x){const b=g,M=new ue,T=new U;let _=0;const C=x===!0?e:t,E=x===!0?1:-1;for(let z=1;z<=i;z++)h.push(0,p*E,0),f.push(0,E,0),d.push(.5,.5),g++;const D=g;for(let z=0;z<=i;z++){const F=z/i*l+a,H=Math.cos(F),Y=Math.sin(F);T.x=C*Y,T.y=p*E,T.z=C*H,h.push(T.x,T.y,T.z),f.push(0,E,0),M.x=H*.5+.5,M.y=Y*.5*E+.5,d.push(M.x,M.y),g++}for(let z=0;z<i;z++){const N=b+z,F=D+z;x===!0?u.push(F,F+1,N):u.push(F+1,F,N),_+=3}c.addGroup(y,_,x===!0?1:2),y+=_}}static fromJSON(e){return new cf(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ev extends Dm{constructor(e){super(e),this.uuid=mn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Dm().fromJSON(i))}return this}}const FR={triangulate:function(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=tv(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,h,f,d;if(n&&(s=HR(r,e,s,t)),r.length>80*t){a=c=r[0],l=u=r[1];for(let g=t;g<i;g+=t)h=r[g],f=r[g+1],h<a&&(a=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);d=Math.max(c-a,u-l),d=d!==0?32767/d:0}return Po(s,o,t,a,l,d,0),o}};function tv(r,e,t,n,i){let s,o;if(i===JR(r,e,t,n)>0)for(s=e;s<t;s+=n)o=Lm(s,r[s],r[s+1],o);else for(s=t-n;s>=e;s-=n)o=Lm(s,r[s],r[s+1],o);return o&&kl(o,o.next)&&(Do(o),o=o.next),o}function ur(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(kl(t,t.next)||pt(t.prev,t,t.next)===0)){if(Do(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Po(r,e,t,n,i,s,o){if(!r)return;!o&&s&&qR(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?UR(r,n,i,s):kR(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(c.i/t|0),Do(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=BR(ur(r),e,t),Po(r,e,t,n,i,s,2)):o===2&&zR(r,e,t,n,i,s):Po(ur(r),e,t,n,i,s,1);break}}}function kR(r){const e=r.prev,t=r,n=r.next;if(pt(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=i<s?i<o?i:o:s<o?s:o,h=a<l?a<c?a:c:l<c?l:c,f=i>s?i>o?i:o:s>o?s:o,d=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&Ur(i,a,s,l,o,c,g.x,g.y)&&pt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function UR(r,e,t,n){const i=r.prev,s=r,o=r.next;if(pt(i,s,o)>=0)return!1;const a=i.x,l=s.x,c=o.x,u=i.y,h=s.y,f=o.y,d=a<l?a<c?a:c:l<c?l:c,g=u<h?u<f?u:f:h<f?h:f,m=a>l?a>c?a:c:l>c?l:c,p=u>h?u>f?u:f:h>f?h:f,y=$u(d,g,e,t,n),w=$u(m,p,e,t,n);let v=r.prevZ,x=r.nextZ;for(;v&&v.z>=y&&x&&x.z<=w;){if(v.x>=d&&v.x<=m&&v.y>=g&&v.y<=p&&v!==i&&v!==o&&Ur(a,u,l,h,c,f,v.x,v.y)&&pt(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=d&&x.x<=m&&x.y>=g&&x.y<=p&&x!==i&&x!==o&&Ur(a,u,l,h,c,f,x.x,x.y)&&pt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=y;){if(v.x>=d&&v.x<=m&&v.y>=g&&v.y<=p&&v!==i&&v!==o&&Ur(a,u,l,h,c,f,v.x,v.y)&&pt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=w;){if(x.x>=d&&x.x<=m&&x.y>=g&&x.y<=p&&x!==i&&x!==o&&Ur(a,u,l,h,c,f,x.x,x.y)&&pt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function BR(r,e,t){let n=r;do{const i=n.prev,s=n.next.next;!kl(i,s)&&nv(i,n,n.next,s)&&Ro(i,s)&&Ro(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Do(n),Do(n.next),n=r=s),n=n.next}while(n!==r);return ur(n)}function zR(r,e,t,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&YR(o,a)){let l=iv(o,a);o=ur(o,o.next),l=ur(l,l.next),Po(o,e,t,n,i,s,0),Po(l,e,t,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function HR(r,e,t,n){const i=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*n,l=s<o-1?e[s+1]*n:r.length,c=tv(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(XR(c));for(i.sort(VR),s=0;s<i.length;s++)t=GR(i[s],t);return t}function VR(r,e){return r.x-e.x}function GR(r,e){const t=WR(r,e);if(!t)return e;const n=iv(t,r);return ur(n,n.next),ur(t,t.next)}function WR(r,e){let t=e,n=-1/0,i;const s=r.x,o=r.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const f=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=s&&f>n&&(n=f,i=t.x<t.next.x?t:t.next,f===s))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let u=1/0,h;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&Ur(o<c?s:n,o,l,c,o<c?n:s,o,t.x,t.y)&&(h=Math.abs(o-t.y)/(s-t.x),Ro(t,r)&&(h<u||h===u&&(t.x>i.x||t.x===i.x&&jR(i,t)))&&(i=t,u=h)),t=t.next;while(t!==a);return i}function jR(r,e){return pt(r.prev,r,e.prev)<0&&pt(e.next,r,r.next)<0}function qR(r,e,t,n){let i=r;do i.z===0&&(i.z=$u(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,$R(i)}function $R(r){let e,t,n,i,s,o,a,l,c=1;do{for(t=r,r=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(o>1);return r}function $u(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function XR(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Ur(r,e,t,n,i,s,o,a){return(i-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(i-o)*(n-a)}function YR(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!KR(r,e)&&(Ro(r,e)&&Ro(e,r)&&ZR(r,e)&&(pt(r.prev,r,e.prev)||pt(r,e.prev,e))||kl(r,e)&&pt(r.prev,r,r.next)>0&&pt(e.prev,e,e.next)>0)}function pt(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function kl(r,e){return r.x===e.x&&r.y===e.y}function nv(r,e,t,n){const i=Ea(pt(r,e,t)),s=Ea(pt(r,e,n)),o=Ea(pt(t,n,r)),a=Ea(pt(t,n,e));return!!(i!==s&&o!==a||i===0&&Ma(r,t,e)||s===0&&Ma(r,n,e)||o===0&&Ma(t,r,n)||a===0&&Ma(t,e,n))}function Ma(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Ea(r){return r>0?1:r<0?-1:0}function KR(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&nv(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function Ro(r,e){return pt(r.prev,r,r.next)<0?pt(r,e,r.next)>=0&&pt(r,r.prev,e)>=0:pt(r,e,r.prev)<0||pt(r,r.next,e)<0}function ZR(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function iv(r,e){const t=new Xu(r.i,r.x,r.y),n=new Xu(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Lm(r,e,t,n){const i=new Xu(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Do(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Xu(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function JR(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class co{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return co.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];Nm(e),Om(n,e);let o=e.length;t.forEach(Nm);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Om(n,t[l]);const a=FR.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Nm(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Om(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class uf extends Xt{constructor(e=new ev([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new wt(i,3)),this.setAttribute("uv",new wt(s,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,m=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const y=t.extrudePath,w=t.UVGenerator!==void 0?t.UVGenerator:QR;let v,x=!1,b,M,T,_;y&&(v=y.getSpacedPoints(u),x=!0,f=!1,b=y.computeFrenetFrames(u,!1),M=new U,T=new U,_=new U),f||(p=0,d=0,g=0,m=0);const C=a.extractPoints(c);let E=C.shape;const D=C.holes;if(!co.isClockWise(E)){E=E.reverse();for(let q=0,K=D.length;q<K;q++){const oe=D[q];co.isClockWise(oe)&&(D[q]=oe.reverse())}}const N=co.triangulateShape(E,D),F=E;for(let q=0,K=D.length;q<K;q++){const oe=D[q];E=E.concat(oe)}function H(q,K,oe){return K||console.error("THREE.ExtrudeGeometry: vec does not exist"),K.clone().multiplyScalar(oe).add(q)}const Y=E.length,J=N.length;function S(q,K,oe){let pe,ce,Re;const we=q.x-K.x,Te=q.y-K.y,at=oe.x-q.x,Qe=oe.y-q.y,L=we*we+Te*Te,A=we*Qe-Te*at;if(Math.abs(A)>Number.EPSILON){const Q=Math.sqrt(L),fe=Math.sqrt(at*at+Qe*Qe),me=K.x-Te/Q,_e=K.y+we/Q,De=oe.x-Qe/fe,ye=oe.y+at/fe,re=((De-me)*Qe-(ye-_e)*at)/(we*Qe-Te*at);pe=me+we*re-q.x,ce=_e+Te*re-q.y;const Se=pe*pe+ce*ce;if(Se<=2)return new ue(pe,ce);Re=Math.sqrt(Se/2)}else{let Q=!1;we>Number.EPSILON?at>Number.EPSILON&&(Q=!0):we<-Number.EPSILON?at<-Number.EPSILON&&(Q=!0):Math.sign(Te)===Math.sign(Qe)&&(Q=!0),Q?(pe=-Te,ce=we,Re=Math.sqrt(L)):(pe=we,ce=Te,Re=Math.sqrt(L/2))}return new ue(pe/Re,ce/Re)}const P=[];for(let q=0,K=F.length,oe=K-1,pe=q+1;q<K;q++,oe++,pe++)oe===K&&(oe=0),pe===K&&(pe=0),P[q]=S(F[q],F[oe],F[pe]);const k=[];let R,O=P.concat();for(let q=0,K=D.length;q<K;q++){const oe=D[q];R=[];for(let pe=0,ce=oe.length,Re=ce-1,we=pe+1;pe<ce;pe++,Re++,we++)Re===ce&&(Re=0),we===ce&&(we=0),R[pe]=S(oe[pe],oe[Re],oe[we]);k.push(R),O=O.concat(R)}for(let q=0;q<p;q++){const K=q/p,oe=d*Math.cos(K*Math.PI/2),pe=g*Math.sin(K*Math.PI/2)+m;for(let ce=0,Re=F.length;ce<Re;ce++){const we=H(F[ce],P[ce],pe);ae(we.x,we.y,-oe)}for(let ce=0,Re=D.length;ce<Re;ce++){const we=D[ce];R=k[ce];for(let Te=0,at=we.length;Te<at;Te++){const Qe=H(we[Te],R[Te],pe);ae(Qe.x,Qe.y,-oe)}}}const j=g+m;for(let q=0;q<Y;q++){const K=f?H(E[q],O[q],j):E[q];x?(T.copy(b.normals[0]).multiplyScalar(K.x),M.copy(b.binormals[0]).multiplyScalar(K.y),_.copy(v[0]).add(T).add(M),ae(_.x,_.y,_.z)):ae(K.x,K.y,0)}for(let q=1;q<=u;q++)for(let K=0;K<Y;K++){const oe=f?H(E[K],O[K],j):E[K];x?(T.copy(b.normals[q]).multiplyScalar(oe.x),M.copy(b.binormals[q]).multiplyScalar(oe.y),_.copy(v[q]).add(T).add(M),ae(_.x,_.y,_.z)):ae(oe.x,oe.y,h/u*q)}for(let q=p-1;q>=0;q--){const K=q/p,oe=d*Math.cos(K*Math.PI/2),pe=g*Math.sin(K*Math.PI/2)+m;for(let ce=0,Re=F.length;ce<Re;ce++){const we=H(F[ce],P[ce],pe);ae(we.x,we.y,h+oe)}for(let ce=0,Re=D.length;ce<Re;ce++){const we=D[ce];R=k[ce];for(let Te=0,at=we.length;Te<at;Te++){const Qe=H(we[Te],R[Te],pe);x?ae(Qe.x,Qe.y+v[u-1].y,v[u-1].x+oe):ae(Qe.x,Qe.y,h+oe)}}}G(),B();function G(){const q=i.length/3;if(f){let K=0,oe=Y*K;for(let pe=0;pe<J;pe++){const ce=N[pe];le(ce[2]+oe,ce[1]+oe,ce[0]+oe)}K=u+p*2,oe=Y*K;for(let pe=0;pe<J;pe++){const ce=N[pe];le(ce[0]+oe,ce[1]+oe,ce[2]+oe)}}else{for(let K=0;K<J;K++){const oe=N[K];le(oe[2],oe[1],oe[0])}for(let K=0;K<J;K++){const oe=N[K];le(oe[0]+Y*u,oe[1]+Y*u,oe[2]+Y*u)}}n.addGroup(q,i.length/3-q,0)}function B(){const q=i.length/3;let K=0;W(F,K),K+=F.length;for(let oe=0,pe=D.length;oe<pe;oe++){const ce=D[oe];W(ce,K),K+=ce.length}n.addGroup(q,i.length/3-q,1)}function W(q,K){let oe=q.length;for(;--oe>=0;){const pe=oe;let ce=oe-1;ce<0&&(ce=q.length-1);for(let Re=0,we=u+p*2;Re<we;Re++){const Te=Y*Re,at=Y*(Re+1),Qe=K+pe+Te,L=K+ce+Te,A=K+ce+at,Q=K+pe+at;se(Qe,L,A,Q)}}}function ae(q,K,oe){l.push(q),l.push(K),l.push(oe)}function le(q,K,oe){Z(q),Z(K),Z(oe);const pe=i.length/3,ce=w.generateTopUV(n,i,pe-3,pe-2,pe-1);ne(ce[0]),ne(ce[1]),ne(ce[2])}function se(q,K,oe,pe){Z(q),Z(K),Z(pe),Z(K),Z(oe),Z(pe);const ce=i.length/3,Re=w.generateSideWallUV(n,i,ce-6,ce-3,ce-2,ce-1);ne(Re[0]),ne(Re[1]),ne(Re[3]),ne(Re[1]),ne(Re[2]),ne(Re[3])}function Z(q){i.push(l[q*3+0]),i.push(l[q*3+1]),i.push(l[q*3+2])}function ne(q){s.push(q.x),s.push(q.y)}}}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return eD(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new af[i.type]().fromJSON(i)),new uf(n,e.options)}}const QR={generateTopUV:function(r,e,t,n,i){const s=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],u=e[i*3+1];return[new ue(s,o),new ue(a,l),new ue(c,u)]},generateSideWallUV:function(r,e,t,n,i,s){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[i*3],d=e[i*3+1],g=e[i*3+2],m=e[s*3],p=e[s*3+1],y=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new ue(o,1-l),new ue(c,1-h),new ue(f,1-g),new ue(m,1-y)]:[new ue(a,1-l),new ue(u,1-h),new ue(d,1-g),new ue(p,1-y)]}};function eD(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class hf extends Xt{constructor(e=new Jy(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new U,l=new U,c=new ue;let u=new U;const h=[],f=[],d=[],g=[];m(),this.setIndex(g),this.setAttribute("position",new wt(h,3)),this.setAttribute("normal",new wt(f,3)),this.setAttribute("uv",new wt(d,2));function m(){for(let v=0;v<t;v++)p(v);p(s===!1?t:0),w(),y()}function p(v){u=e.getPointAt(v/t,u);const x=o.normals[v],b=o.binormals[v];for(let M=0;M<=i;M++){const T=M/i*Math.PI*2,_=Math.sin(T),C=-Math.cos(T);l.x=C*x.x+_*b.x,l.y=C*x.y+_*b.y,l.z=C*x.z+_*b.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,h.push(a.x,a.y,a.z)}}function y(){for(let v=1;v<=t;v++)for(let x=1;x<=i;x++){const b=(i+1)*(v-1)+(x-1),M=(i+1)*v+(x-1),T=(i+1)*v+x,_=(i+1)*(v-1)+x;g.push(b,M,_),g.push(M,T,_)}}function w(){for(let v=0;v<=t;v++)for(let x=0;x<=i;x++)c.x=v/t,c.y=x/i,d.push(c.x,c.y)}}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new hf(new af[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class wn extends Ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cy,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _r extends wn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Nt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function ai(r,e,t){return rv(r)?new r.constructor(r.subarray(e,t!==void 0?t:r.length)):r.slice(e,t)}function Ta(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function rv(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function tD(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Fm(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function sv(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class jo{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class nD extends jo{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Lp,endingEnd:Lp}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Np:s=e,a=2*t-n;break;case Op:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Np:o=e,l=2*n-t;break;case Op:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(i-t),m=g*g,p=m*g,y=-f*p+2*f*m-f*g,w=(1+f)*p+(-1.5-2*f)*m+(-.5+f)*g+1,v=(-1-d)*p+(1.5+d)*m+.5*g,x=d*p-d*m;for(let b=0;b!==a;++b)s[b]=y*o[u+b]+w*o[c+b]+v*o[l+b]+x*o[h+b];return s}}class iD extends jo{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*h+o[l+f]*u;return s}}class rD extends jo{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class kn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ta(t,this.TimeBufferType),this.values=Ta(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ta(e.times,Array),values:Ta(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new rD(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new iD(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nD(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case To:t=this.InterpolantFactoryMethodDiscrete;break;case ps:t=this.InterpolantFactoryMethodLinear;break;case Dc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return To;case this.InterpolantFactoryMethodLinear:return ps;case this.InterpolantFactoryMethodSmooth:return Dc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=ai(n,s,o),this.values=ai(this.values,s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&rv(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=ai(this.times),t=ai(this.values),n=this.getValueSize(),i=this.getInterpolation()===Dc,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const h=a*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){const m=t[h+g];if(m!==t[f+g]||m!==t[d+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=ai(e,0,o),this.values=ai(t,0,o*n)):(this.times=e,this.values=t),this}clone(){const e=ai(this.times,0),t=ai(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}kn.prototype.TimeBufferType=Float32Array;kn.prototype.ValueBufferType=Float32Array;kn.prototype.DefaultInterpolation=ps;class Cs extends kn{}Cs.prototype.ValueTypeName="bool";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=To;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;class ov extends kn{}ov.prototype.ValueTypeName="color";class Lo extends kn{}Lo.prototype.ValueTypeName="number";class sD extends jo{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Ei.slerpFlat(s,0,o,c-a,o,c,l);return s}}class hr extends kn{InterpolantFactoryMethodLinear(e){return new sD(this.times,this.values,this.getValueSize(),e)}}hr.prototype.ValueTypeName="quaternion";hr.prototype.DefaultInterpolation=ps;hr.prototype.InterpolantFactoryMethodSmooth=void 0;class As extends kn{}As.prototype.ValueTypeName="string";As.prototype.ValueBufferType=Array;As.prototype.DefaultInterpolation=To;As.prototype.InterpolantFactoryMethodLinear=void 0;As.prototype.InterpolantFactoryMethodSmooth=void 0;class No extends kn{}No.prototype.ValueTypeName="vector";class oD{constructor(e,t=-1,n,i=K1){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=mn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(lD(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(kn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=tD(l);l=Fm(l,1,u),c=Fm(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Lo(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let f=i[h];f||(i[h]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,g,m){if(d.length!==0){const p=[],y=[];sv(d,p,y,g),p.length!==0&&m.push(new h(f,p,y))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const f=c[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let m=0;m<f[g].morphTargets.length;m++)d[f[g].morphTargets[m]]=-1;for(const m in d){const p=[],y=[];for(let w=0;w!==f[g].morphTargets.length;++w){const v=f[g];p.push(v.time),y.push(v.morphTarget===m?1:0)}i.push(new Lo(".morphTargetInfluence["+m+"]",p,y))}l=d.length*o}else{const d=".bones["+t[h].name+"]";n(No,d+".position",f,"pos",i),n(hr,d+".quaternion",f,"rot",i),n(No,d+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function aD(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Lo;case"vector":case"vector2":case"vector3":case"vector4":return No;case"color":return ov;case"quaternion":return hr;case"bool":case"boolean":return Cs;case"string":return As}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function lD(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=aD(r.type);if(r.times===void 0){const t=[],n=[];sv(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const gs={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class cD{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const d=c[h],g=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const uD=new cD;class qo{constructor(e){this.manager=e!==void 0?e:uD,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const jn={};class hD extends Error{constructor(e,t){super(e),this.response=t}}class av extends qo{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=gs.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(jn[e]!==void 0){jn[e].push({onLoad:t,onProgress:n,onError:i});return}jn[e]=[],jn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=jn[e],h=c.body.getReader(),f=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),d=f?parseInt(f):0,g=d!==0;let m=0;const p=new ReadableStream({start(y){w();function w(){h.read().then(({done:v,value:x})=>{if(v)y.close();else{m+=x.byteLength;const b=new ProgressEvent("progress",{lengthComputable:g,loaded:m,total:d});for(let M=0,T=u.length;M<T;M++){const _=u[M];_.onProgress&&_.onProgress(b)}y.enqueue(x),w()}})}}});return new Response(p)}else throw new hD(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{gs.add(e,c);const u=jn[e];delete jn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=jn[e];if(u===void 0)throw this.manager.itemError(e),c;delete jn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class fD extends qo{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=gs.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Io("img");function l(){u(),gs.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class dD extends qo{constructor(e){super(e)}load(e,t,n,i){const s=new kt,o=new fD(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class $o extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class pD extends $o{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DefaultUp),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const lu=new ze,km=new U,Um=new U;class ff{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zh,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;km.setFromMatrixPosition(e.matrixWorld),t.position.copy(km),Um.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Um),t.updateMatrixWorld(),lu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(lu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class mD extends ff{constructor(){super(new Ht(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ao*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class gD extends $o{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DefaultUp),this.updateMatrix(),this.target=new dt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new mD}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Bm=new ze,js=new U,cu=new U;class _D extends ff{constructor(){super(new Ht(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),js.setFromMatrixPosition(e.matrixWorld),n.position.copy(js),cu.copy(n.position),cu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(cu),n.updateMatrixWorld(),i.makeTranslation(-js.x,-js.y,-js.z),Bm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bm)}}class yD extends $o{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new _D}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class vD extends ff{constructor(){super(new Jh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class lv extends $o{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DefaultUp),this.updateMatrix(),this.target=new dt,this.shadow=new vD}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class xD extends $o{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ki{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class bD extends qo{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=gs.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){gs.add(e,l),t&&t(l),s.manager.itemEnd(e)}).catch(function(l){i&&i(l),s.manager.itemError(e),s.manager.itemEnd(e)}),s.manager.itemStart(e)}}const df="\\[\\]\\.:\\/",wD=new RegExp("["+df+"]","g"),pf="[^"+df+"]",SD="[^"+df.replace("\\.","")+"]",MD=/((?:WC+[\/:])*)/.source.replace("WC",pf),ED=/(WCOD+)?/.source.replace("WCOD",SD),TD=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pf),CD=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pf),AD=new RegExp("^"+MD+ED+TD+CD+"$"),ID=["material","materials","bones","map"];class PD{constructor(e,t,n){const i=n||tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class tt{constructor(e,t,n){this.path=t,this.parsedPath=n||tt.parseTrackName(t),this.node=tt.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new tt.Composite(e,t,n):new tt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wD,"")}static parseTrackName(e){const t=AD.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);ID.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=tt.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}tt.Composite=PD;tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};tt.prototype.GetterByBindingType=[tt.prototype._getValue_direct,tt.prototype._getValue_array,tt.prototype._getValue_arrayElement,tt.prototype._getValue_toArray];tt.prototype.SetterByBindingTypeAndVersioning=[[tt.prototype._setValue_direct,tt.prototype._setValue_direct_setNeedsUpdate,tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_array,tt.prototype._setValue_array_setNeedsUpdate,tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_arrayElement,tt.prototype._setValue_arrayElement_setNeedsUpdate,tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_fromArray,tt.prototype._setValue_fromArray_setNeedsUpdate,tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class RD{constructor(e,t,n=0,i=1/0){this.ray=new Nl(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Kh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Yu(e,this,n,t),n.sort(zm),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Yu(e[i],this,n,t);return n.sort(zm),n}}function zm(r,e){return r.distance-e.distance}function Yu(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,o=i.length;s<o;s++)Yu(i[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xh);class DD extends qo{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new kD(t)}),this.register(function(t){return new WD(t)}),this.register(function(t){return new jD(t)}),this.register(function(t){return new BD(t)}),this.register(function(t){return new zD(t)}),this.register(function(t){return new HD(t)}),this.register(function(t){return new VD(t)}),this.register(function(t){return new FD(t)}),this.register(function(t){return new GD(t)}),this.register(function(t){return new UD(t)}),this.register(function(t){return new ND(t)}),this.register(function(t){return new qD(t)}),this.register(function(t){return new $D(t)})}load(e,t,n,i){const s=this;let o;this.resourcePath!==""?o=this.resourcePath:this.path!==""?o=this.path:o=Ki.extractUrlBase(e),this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new av(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={};if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(Ki.decodeText(new Uint8Array(e,0,4))===cv){try{o[qe.KHR_BINARY_GLTF]=new XD(e)}catch(u){i&&i(u);return}s=JSON.parse(o[qe.KHR_BINARY_GLTF].content)}else s=JSON.parse(Ki.decodeText(new Uint8Array(e)));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new aL(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){const u=this.pluginCallbacks[c](l);a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let c=0;c<s.extensionsUsed.length;++c){const u=s.extensionsUsed[c],h=s.extensionsRequired||[];switch(u){case qe.KHR_MATERIALS_UNLIT:o[u]=new OD;break;case qe.KHR_DRACO_MESH_COMPRESSION:o[u]=new YD(s,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:o[u]=new KD;break;case qe.KHR_MESH_QUANTIZATION:o[u]=new ZD;break;default:h.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function LD(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class ND{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Ne(16777215);l.color!==void 0&&u.fromArray(l.color);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new lv(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new yD(u),c.distance=h;break;case"spot":c=new gD(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,ui(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class OD{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return qi}extendParams(e,t,n){const i=[];e.color=new Ne(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.fromArray(o),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Je))}return Promise.all(i)}}class FD{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class kD{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(a,a)}return Promise.all(s)}}class UD{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class BD{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];return o.sheenColorFactor!==void 0&&t.sheenColor.fromArray(o.sheenColorFactor),o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Je)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class zD{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class HD{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ne(a[0],a[1],a[2]),Promise.all(s)}}class VD{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class GD{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ne(a[0],a[1],a[2]),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Je)),Promise.all(s)}}class WD{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class jD{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class qD{constructor(e){this.name=qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}}class $D{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==un.TRIANGLES&&c.mode!==un.TRIANGLE_STRIP&&c.mode!==un.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],f=c[0].count,d=[];for(const g of h){const m=new ze,p=new U,y=new Ei,w=new U(1,1,1),v=new bR(g.geometry,g.material,f);for(let x=0;x<f;x++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&y.fromBufferAttribute(l.ROTATION,x),l.SCALE&&w.fromBufferAttribute(l.SCALE,x),v.setMatrixAt(x,m.compose(p,y,w));for(const x in l)x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,l[x]);dt.prototype.copy.call(v,g),v.frustumCulled=!1,this.parser.assignFinalMaterial(v),d.push(v)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const cv="glTF",qs=12,Hm={JSON:1313821514,BIN:5130562};class XD{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,qs);if(this.header={magic:Ki.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==cv)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-qs,i=new DataView(e,qs);let s=0;for(;s<n;){const o=i.getUint32(s,!0);s+=4;const a=i.getUint32(s,!0);if(s+=4,a===Hm.JSON){const l=new Uint8Array(e,qs+s,o);this.content=Ki.decodeText(l)}else if(a===Hm.BIN){const l=qs+s;this.body=e.slice(l,l+o)}s+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class YD{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const h=Ku[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=Ku[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],d=$r[f.componentType];c[h]=d.name,l[h]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h){i.decodeDracoFile(u,function(f){for(const d in f.attributes){const g=f.attributes[d],m=l[d];m!==void 0&&(g.normalized=m)}h(f)},a,c)})})}}class KD{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class ZD{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}}class uv extends jo{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,g=e*c,m=g-c,p=-2*d+3*f,y=d-f,w=1-p,v=y-f+h;for(let x=0;x!==a;x++){const b=o[m+x+a],M=o[m+x+l]*u,T=o[g+x+a],_=o[g+x]*u;s[x]=w*b+v*M+p*T+y*_}return s}}const JD=new Ei;class QD extends uv{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return JD.fromArray(s).normalize().toArray(s),s}}const un={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},$r={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Vm={9728:Dt,9729:Yt,9984:Hu,9985:My,9986:Pa,9987:sr},Gm={33071:hn,33648:el,10497:Dn},uu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ku={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},li={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},eL={CUBICSPLINE:void 0,LINEAR:ps,STEP:To},hu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function tL(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new wn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:wi})),r.DefaultMaterial}function $s(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ui(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function nL(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):r.attributes.position;o.push(f)}if(i){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=h),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function iL(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function rL(r){const e=r.extensions&&r.extensions[qe.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+Wm(e.attributes):t=r.indices+":"+Wm(r.attributes)+":"+r.mode,t}function Wm(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Zu(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function sL(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const oL=new ze;class aL{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new LD,this.associations=new Map,this.primitiveCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new dD(this.options.manager):this.textureLoader=new bD(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new av(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};$s(s,a,i),ui(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Ki.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=uu[i.type],a=$r[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Vt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=uu[i.type],c=$r[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let m,p;if(d&&d!==h){const y=Math.floor(f/d),w="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+y+":"+i.count;let v=t.cache.get(w);v||(m=new c(a,y*d,i.count*d/u),v=new mR(m,d/u),t.cache.add(w,v)),p=new ef(v,l,f%d/u,g)}else a===null?m=new c(i.count*l):m=new c(a,f,i.count*l),p=new Vt(m,l,g);if(i.sparse!==void 0){const y=uu.SCALAR,w=$r[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,b=new w(o[1],v,i.sparse.count*y),M=new c(o[2],x,i.sparse.count*l);a!==null&&(p=new Vt(p.array.slice(),p.itemSize,p.normalized));for(let T=0,_=b.length;T<_;T++){const C=b[T];if(p.setX(C,M[T*l]),l>=2&&p.setY(C,M[T*l+1]),l>=3&&p.setZ(C,M[T*l+2]),l>=4&&p.setW(C,M[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"";const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=Vm[f.magFilter]||Yt,u.minFilter=Vm[f.minFilter]||sr,u.wrapS=Gm[f.wrapS]||Dn,u.wrapT=Gm[f.wrapT]||Dn,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;const f=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(m){const p=new kt(m);p.needsUpdate=!0,f(p)}),t.load(Ki.resolveURL(h,s.path),g,void 0,d)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),h.userData.mimeType=o.mimeType||sL(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord!=0&&!(t==="aoMap"&&n.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+n.texCoord+" for texture "+t+" not yet supported."),s.extensions[qe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.encoding=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Xy,Ln.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new $y,Ln.prototype.copy.call(l,n),l.color.copy(n.color),this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}n.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=n}getMaterialType(){return wn}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[qe.KHR_MATERIALS_UNLIT]){const h=i[qe.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,s,t))}else{const h=s.pbrMetallicRoughness||{};if(a.color=new Ne(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.fromArray(f),a.opacity=f[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,Je)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Dl);const u=s.alphaMode||hu.OPAQUE;if(u===hu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===hu.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==qi&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new ue(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;a.normalScale.set(h,h)}return s.occlusionTexture!==void 0&&o!==qi&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==qi&&(a.emissive=new Ne().fromArray(s.emissiveFactor)),s.emissiveTexture!==void 0&&o!==qi&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Je)),Promise.all(c).then(function(){const h=new o(a);return s.name&&(h.name=s.name),ui(h,s),t.associations.set(h,{materials:e}),s.extensions&&$s(i,h,s),h})}createUniqueName(e){const t=tt.sanitizeNodeName(e||"");let n=t;for(let i=1;this.nodeNamesUsed[n];++i)n=t+"_"+i;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return jm(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=rL(c),h=i[u];if(h)o.push(h.promise);else{let f;c.extensions&&c.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=jm(new Xt,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?tL(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let d=0,g=u.length;d<g;d++){const m=u[d],p=o[d];let y;const w=c[d];if(p.mode===un.TRIANGLES||p.mode===un.TRIANGLE_STRIP||p.mode===un.TRIANGLE_FAN||p.mode===void 0)y=s.isSkinnedMesh===!0?new _R(m,w):new mt(m,w),y.isSkinnedMesh===!0&&!y.geometry.attributes.skinWeight.normalized&&y.normalizeSkinWeights(),p.mode===un.TRIANGLE_STRIP?y.geometry=qm(y.geometry,Z1):p.mode===un.TRIANGLE_FAN&&(y.geometry=qm(y.geometry,Ty));else if(p.mode===un.LINES)y=new wR(m,w);else if(p.mode===un.LINE_STRIP)y=new nf(m,w);else if(p.mode===un.LINE_LOOP)y=new SR(m,w);else if(p.mode===un.POINTS)y=new MR(m,w);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(y.geometry.morphAttributes).length>0&&iL(y,s),y.name=t.createUniqueName(s.name||"mesh_"+e),ui(y,s),p.extensions&&$s(i,y,p),t.assignFinalMaterial(y),h.push(y)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return h[0];const f=new pi;t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ht(Iy.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Jh(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ui(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this.getDependency("node",t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const h=o[c];if(h){a.push(h);const f=new ze;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new tf(a,l)})}loadAnimation(e){const n=this.json.animations[e],i=[],s=[],o=[],a=[],l=[];for(let c=0,u=n.channels.length;c<u;c++){const h=n.channels[c],f=n.samplers[h.sampler],d=h.target,g=d.node,m=n.parameters!==void 0?n.parameters[f.input]:f.input,p=n.parameters!==void 0?n.parameters[f.output]:f.output;i.push(this.getDependency("node",g)),s.push(this.getDependency("accessor",m)),o.push(this.getDependency("accessor",p)),a.push(f),l.push(d)}return Promise.all([Promise.all(i),Promise.all(s),Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],f=c[2],d=c[3],g=c[4],m=[];for(let y=0,w=u.length;y<w;y++){const v=u[y],x=h[y],b=f[y],M=d[y],T=g[y];if(v===void 0)continue;v.updateMatrix();let _;switch(li[T.path]){case li.weights:_=Lo;break;case li.rotation:_=hr;break;case li.position:case li.scale:default:_=No;break}const C=v.name?v.name:v.uuid,E=M.interpolation!==void 0?eL[M.interpolation]:ps,D=[];li[T.path]===li.weights?v.traverse(function(N){N.morphTargetInfluences&&D.push(N.name?N.name:N.uuid)}):D.push(C);let z=b.array;if(b.normalized){const N=Zu(z.constructor),F=new Float32Array(z.length);for(let H=0,Y=z.length;H<Y;H++)F[H]=z[H]*N;z=F}for(let N=0,F=D.length;N<F;N++){const H=new _(D[N]+"."+li[T.path],x.array,z,E);M.interpolation==="CUBICSPLINE"&&(H.createInterpolant=function(J){const S=this instanceof hr?QD:uv;return new S(this.times,this.values,this.getValueSize()/3,J)},H.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),m.push(H)}}const p=n.name?n.name:"animation_"+e;return new oD(p,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this.extensions,i=this,s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"";return function(){const a=[],l=i._invokeOne(function(f){return f.createNodeMesh&&f.createNodeMesh(e)});l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(f){return i._getNodeRef(i.cameraCache,s.camera,f)})),i._invokeAll(function(f){return f.createNodeAttachment&&f.createNodeAttachment(e)}).forEach(function(f){a.push(f)});const c=[],u=s.children||[];for(let f=0,d=u.length;f<d;f++)c.push(i.getDependency("node",u[f]));const h=s.skin===void 0?Promise.resolve(null):i.getDependency("skin",s.skin);return Promise.all([Promise.all(a),Promise.all(c),h])}().then(function(a){const l=a[0],c=a[1],u=a[2];let h;if(s.isBone===!0?h=new qy:l.length>1?h=new pi:l.length===1?h=l[0]:h=new dt,h!==l[0])for(let f=0,d=l.length;f<d;f++)h.add(l[f]);if(s.name&&(h.userData.name=s.name,h.name=o),ui(h,s),s.extensions&&$s(n,h,s),s.matrix!==void 0){const f=new ze;f.fromArray(s.matrix),h.applyMatrix4(f)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,oL)});for(let f=0,d=c.length;f<d;f++)h.add(c[f]);return h})}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new pi;n.name&&(s.name=i.createUniqueName(n.name)),ui(s,n),n.extensions&&$s(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)s.add(l[u]);const c=u=>{const h=new Map;for(const[f,d]of i.associations)(f instanceof Ln||f instanceof kt)&&h.set(f,d);return u.traverse(f=>{const d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=c(s),s})}}function lL(r,e,t){const n=e.attributes,i=new Ss;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new U(l[0],l[1],l[2]),new U(c[0],c[1],c[2])),a.normalized){const u=Zu($r[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new U,l=new U;for(let c=0,u=s.length;c<u;c++){const h=s[c];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){const m=Zu($r[f.componentType]);l.multiplyScalar(m)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Ms;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function jm(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Ku[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return ui(r,e),lL(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?nL(r,e.targets,t):r})}function qm(r,e){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Ty)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s}const Xs=new U;function ln(r,e,t,n,i,s){const o=2*Math.PI*i/4,a=Math.max(s-2*i,0),l=Math.PI/4;Xs.copy(e),Xs[n]=0,Xs.normalize();const c=.5*o/(o+a),u=1-Xs.angleTo(r)/l;return Math.sign(Xs[t])===1?u*c:a/(o+a)+c+c*(1-u)}class fu extends Es{constructor(e=1,t=1,n=1,i=2,s=.1){if(i=i*2+1,s=Math.min(e/2,t/2,n/2,s),super(1,1,1,i,i,i),i===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new U,l=new U,c=new U(e,t,n).divideScalar(2).subScalar(s),u=this.attributes.position.array,h=this.attributes.normal.array,f=this.attributes.uv.array,d=u.length/6,g=new U,m=.5/i;for(let p=0,y=0;p<u.length;p+=3,y+=2)switch(a.fromArray(u,p),l.copy(a),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=c.x*Math.sign(a.x)+l.x*s,u[p+1]=c.y*Math.sign(a.y)+l.y*s,u[p+2]=c.z*Math.sign(a.z)+l.z*s,h[p+0]=l.x,h[p+1]=l.y,h[p+2]=l.z,Math.floor(p/d)){case 0:g.set(1,0,0),f[y+0]=ln(g,l,"z","y",s,n),f[y+1]=1-ln(g,l,"y","z",s,t);break;case 1:g.set(-1,0,0),f[y+0]=1-ln(g,l,"z","y",s,n),f[y+1]=1-ln(g,l,"y","z",s,t);break;case 2:g.set(0,1,0),f[y+0]=1-ln(g,l,"x","z",s,e),f[y+1]=ln(g,l,"z","x",s,n);break;case 3:g.set(0,-1,0),f[y+0]=1-ln(g,l,"x","z",s,e),f[y+1]=1-ln(g,l,"z","x",s,n);break;case 4:g.set(0,0,1),f[y+0]=1-ln(g,l,"x","y",s,e),f[y+1]=1-ln(g,l,"y","x",s,t);break;case 5:g.set(0,0,-1),f[y+0]=ln(g,l,"x","y",s,e),f[y+1]=1-ln(g,l,"y","x",s,t);break}}}const xn={STIFFNESS:200,POWER_CURVE:11,CENTERING:.01,DAMPING:.998,ANCHOR_Z:7.8,MAX_STRETCH:1.5},Pe={WIDTH:10,HEIGHT:20.8,SLAT_WIDTH:.6,BASE_THICKNESS:.2,SLAT_HEIGHT:.8,BEVEL_SIZE:.05,TUNNEL_WIDTH:1.8,TUNNEL_HEIGHT:.5},je={RADIUS:.65,HEIGHT:.3},gt={RADIUS:.1,HEIGHT:.5,COLOR:12632256,OFFSET_X:3.9,OFFSET_Z:xn.ANCHOR_Z},Br=[{x:-3.9,y:-7.8},{x:gt.OFFSET_X,y:-7.8},{x:-3.9,y:gt.OFFSET_Z},{x:gt.OFFSET_X,y:gt.OFFSET_Z}],Zs={FRICTION:.93,SUBSTEPS:10,TIMESTEP:1e3/60},zt={BAND_THICKNESS:.04,BAND_HEIGHT_SCALE:4,BAND_COLOR:14596231,BAND_SEGMENTS:200,CANVAS_WIDTH:600,CANVAS_HEIGHT:900};class cL{constructor(e){this.bandMeshes=[],this.scene=e,this.initVisuals()}initVisuals(){const e=new wn({color:zt.BAND_COLOR,roughness:.8});for(let t=0;t<2;t++){const n=new Xt,i=new mt(n,e);i.scale.set(1,zt.BAND_HEIGHT_SCALE,1),i.castShadow=!0,i.receiveShadow=!0,this.scene.add(i),this.bandMeshes.push(i)}}update(e){this.updateRubberBandMesh(0,this.getBandHull(0,e)),this.updateRubberBandMesh(1,this.getBandHull(1,e))}getBandHull(e,t){const n=e===0,i=gt.RADIUS+zt.BAND_THICKNESS/2,s=n?-7.8+i:gt.OFFSET_Z-i,o=gt.RADIUS+zt.BAND_THICKNESS,a=je.RADIUS+zt.BAND_THICKNESS,l=[],c=gt.OFFSET_X-je.RADIUS,u=.01;for(const v of t)n?v.y-je.RADIUS<s-u&&Math.abs(v.x)<c&&l.push({x:v.x,y:v.y,r:a,isNail:!1}):v.y+je.RADIUS>s+u&&Math.abs(v.x)<c&&l.push({x:v.x,y:v.y,r:a,isNail:!1});const h=n?Br[0]:Br[2],f=n?Br[1]:Br[3],d={x:h.x,y:h.y,r:o,isNail:!0},g={x:f.x,y:f.y,r:o,isNail:!0},m=[d,...l,g];m.sort((v,x)=>v.x-x.x);const p=[],y=v=>n?v.isNail?v.y+v.r:v.y-v.r:v.isNail?v.y-v.r:v.y+v.r,w=(v,x,b)=>{const M=y(v),T=y(x),_=y(b);return(x.x-v.x)*(_-M)-(T-M)*(b.x-v.x)};for(const v of m){for(;p.length>=2;){const x=w(p[p.length-2],p[p.length-1],v);if(n)if(x<=0)p.pop();else break;else if(x>=0)p.pop();else break}p.push(v)}return p}getTangents(e,t,n,i,s){const o=new ue().subVectors(n,e),a=o.length();if(s==="internal"&&a<=t+i)return[];if(s==="external"&&a<=Math.abs(t-i))return[];const l=Math.atan2(o.y,o.x),c=Math.acos(s==="internal"?(t+i)/a:(t-i)/a),u={start:{x:e.x+t*Math.cos(l+(s==="internal"?-c:c)),y:e.y+t*Math.sin(l+(s==="internal"?-c:c)),ang:l+(s==="internal"?-c:c)},end:{x:n.x+i*Math.cos(l+(s==="internal"?-c+Math.PI:c)),y:n.y+i*Math.sin(l+(s==="internal"?-c+Math.PI:c)),ang:l+(s==="internal"?-c+Math.PI:c)}},h={start:{x:e.x+t*Math.cos(l+(s==="internal"?c:-c)),y:e.y+t*Math.sin(l+(s==="internal"?c:-c)),ang:l+(s==="internal"?c:-c)},end:{x:n.x+i*Math.cos(l+(s==="internal"?c+Math.PI:-c)),y:n.y+i*Math.sin(l+(s==="internal"?c+Math.PI:-c)),ang:l+(s==="internal"?c+Math.PI:-c)}};return[u,h]}updateRubberBandMesh(e,t){const n=this.bandMeshes[e],i=[],s=(m,p)=>{const y=i[i.length-1];y&&Math.abs(y.x-m)<.001&&Math.abs(y.z-p)<.001||i.push(new U(m,0,p))},a=e===0?1:-1,l=m=>m.isNail?a:-a,c=(m,p,y,w,v)=>{let x=y,b=w;const M=Math.PI*2;for(;x<0;)x+=M;for(;x>=M;)x-=M;for(;b<0;)b+=M;for(;b>=M;)b-=M;let T=b-x;v===1?T>0&&(T-=M):T<0&&(T+=M);const C=12;for(let E=0;E<=C;E++){const D=E/C,z=x+T*D;s(m.x+p*Math.cos(z),m.y+p*Math.sin(z))}},u=Math.PI,h=0;let f=u;for(let m=0;m<t.length-1;m++){const p=t[m],y=t[m+1],w=new ue(p.x,p.y),v=new ue(y.x,y.y),x=l(p),b=l(y),M=x===b?"external":"internal",T=this.getTangents(w,p.r,v,y.r,M);let _=null;if(T.length>0){const C=E=>{const D=E.start.y-w.y,z=E.end.y-v.y,N=D*x>=-.001,F=z*b>=-.001;return(N?1:0)+(F?1:0)};T.sort((E,D)=>C(D)-C(E)),_=T[0]}else _={start:{x:w.x,y:w.y,ang:0},end:{x:v.x,y:v.y,ang:0}};_&&(c(w,p.r,f,_.start.ang,x),s(_.start.x,_.start.y),s(_.end.x,_.end.y),f=_.end.ang)}const d=t[t.length-1];c(new ue(d.x,d.y),d.r,f,h,l(d)),i.length<2&&(s(t[0].x,t[0].y),s(t[t.length-1].x,t[t.length-1].y));const g=new Yy(i,!1,"catmullrom",.05);n.geometry&&n.geometry.dispose(),n.geometry=new hf(g,zt.BAND_SEGMENTS,zt.BAND_THICKNESS,8,!1),n.position.y=.15}}class uL{constructor(e,t){this.puliMeshes=new Map,this.scene=new pR,this.scene.background=new Ne(2236962);const n=29,i=45,s=2,o=Iy.degToRad(i),a=n*Math.cos(o),l=n*Math.sin(o);this.camera0=new Ht(40,zt.CANVAS_WIDTH/zt.CANVAS_HEIGHT,.1,100),this.camera0.position.set(0,a,-(l+s)),this.camera0.lookAt(0,0,-s),this.camera0.updateMatrixWorld(),this.camera1=new Ht(40,zt.CANVAS_WIDTH/zt.CANVAS_HEIGHT,.1,100),this.camera1.position.set(0,a,l+s),this.camera1.lookAt(0,0,s),this.camera1.updateMatrixWorld(),this.camera=t===0?this.camera0:this.camera1,this.renderer=new jy({canvas:e,antialias:!0}),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=yy,this.renderer.toneMapping=wy,this.renderer.toneMappingExposure=1,this.buildBoard(),this.setupLights(),this.rubberBand=new cL(this.scene)}createPulis(e){const t=new wn({color:2047086,roughness:.6,metalness:0,vertexColors:!0}),n=new wn({color:9182488,roughness:.6,metalness:0,vertexColors:!0}),i=[],s=je.RADIUS,o=je.HEIGHT,a=.15;i.push(new ue(0,0)),i.push(new ue(s-.05,0)),i.push(new ue(s,.05)),i.push(new ue(s,o-.05)),i.push(new ue(s-.05,o)),i.push(new ue(.35,o));const l=.35,c=.05,u=12;for(let m=0;m<=u;m++){const p=m/u,y=l-p*(l-c),w=a+(o-a)*Math.pow(1-p,2);i.push(new ue(y,w))}i.push(new ue(0,a));const h=new lf(i,64),f=h.attributes.position.count,d=new Float32Array(f*3),g=h.attributes.position;for(let m=0;m<f;m++){const p=g.getX(m),y=g.getZ(m),w=g.getY(m),v=Math.sqrt(p*p+y*y);let x=1;if(v<l&&w<o-.01){const b=(v-c)/(l-c);let M=Math.max(0,Math.min(1,b));x=.95+.05*Math.pow(M,.5)}d[m*3]=x,d[m*3+1]=x,d[m*3+2]=x}h.setAttribute("color",new Vt(d,3));for(let m of e){const p=m.owner===1?n:t,y=new mt(h,p);y.castShadow=!0,y.receiveShadow=!0,this.scene.add(y),this.puliMeshes.set(m.id,y)}}draw(e){for(const t of e){const n=this.puliMeshes.get(t.id);n&&n.position.set(t.x,.1,t.y)}this.rubberBand.update(e),this.renderer.render(this.scene,this.camera)}buildBoard(){const e=new pi,t=Pe.BASE_THICKNESS/2+Pe.SLAT_HEIGHT/2,n=new fu(Pe.WIDTH,Pe.BASE_THICKNESS,Pe.HEIGHT,4,Pe.BEVEL_SIZE),i=new wn({color:16777215,roughness:.5}),s=new mt(n,i);s.receiveShadow=!0,s.castShadow=!0,e.add(s);const o=[];let a=null;new DD().load("assets/wood.glb",Y=>{let J=null;if(Y.scene.traverse(S=>{if(S.isMesh&&!J){const k=S.material,R=Array.isArray(k)?k[0]:k;R instanceof wn&&(J=R)}}),J&&J.map){const S=J,P=S.map;if(P){for(const R of o){const O=S.clone(),j=P.clone();j.wrapS=Dn,j.wrapT=Dn,j.repeat.set(R.w*.2,R.d*.2),j.needsUpdate=!0,O.map=j,R.mesh.material=O}if(a){const R=S.clone(),O=P.clone();O.wrapS=Dn,O.wrapT=Dn,O.center.set(.5,.5),O.repeat.set(.5,.3),O.needsUpdate=!0,R.map=O,a.material=R}}}});const c=4861471,u=new wn({color:c,roughness:.4}),h=new fu(Pe.WIDTH,Pe.SLAT_HEIGHT,Pe.SLAT_WIDTH,4,Pe.BEVEL_SIZE),f=new mt(h,u);f.position.set(0,t,-20.8/2+Pe.SLAT_WIDTH/2),f.castShadow=!0,f.receiveShadow=!0,e.add(f),o.push({mesh:f,w:Pe.WIDTH,d:Pe.SLAT_WIDTH});const d=new mt(h,u);d.position.set(0,t,Pe.HEIGHT/2-Pe.SLAT_WIDTH/2),d.castShadow=!0,d.receiveShadow=!0,e.add(d),o.push({mesh:d,w:Pe.WIDTH,d:Pe.SLAT_WIDTH});const g=Pe.HEIGHT-2*Pe.SLAT_WIDTH,m=new fu(Pe.SLAT_WIDTH,Pe.SLAT_HEIGHT,g,4,Pe.BEVEL_SIZE),p=new mt(m,u);p.position.set(-10/2+Pe.SLAT_WIDTH/2,t,0),p.castShadow=!0,p.receiveShadow=!0,e.add(p),o.push({mesh:p,w:Pe.SLAT_WIDTH,d:g});const y=new mt(m,u);y.position.set(Pe.WIDTH/2-Pe.SLAT_WIDTH/2,t,0),y.castShadow=!0,y.receiveShadow=!0,e.add(y),o.push({mesh:y,w:Pe.SLAT_WIDTH,d:g});const w=Pe.SLAT_HEIGHT-2*Pe.BEVEL_SIZE,v=Pe.SLAT_WIDTH-2*Pe.BEVEL_SIZE,b=Pe.WIDTH-2*Pe.SLAT_WIDTH-2*Pe.BEVEL_SIZE,M=new ev,T=b/2,_=Pe.TUNNEL_WIDTH/2;M.moveTo(0,0),M.lineTo(T-_,0),M.lineTo(T-_,Pe.TUNNEL_HEIGHT),M.lineTo(T+_,Pe.TUNNEL_HEIGHT),M.lineTo(T+_,0),M.lineTo(b,0),M.lineTo(b,w),M.lineTo(0,w),M.lineTo(0,0);const C={steps:1,depth:v,bevelEnabled:!0,bevelThickness:Pe.BEVEL_SIZE,bevelSize:Pe.BEVEL_SIZE,bevelSegments:4},E=new uf(M,C);E.center(),a=new mt(E,u),a.position.set(0,t,0),a.castShadow=!0,a.receiveShadow=!0,e.add(a);const D=new cf(gt.RADIUS,gt.RADIUS,gt.HEIGHT,16),z=new wn({color:gt.COLOR,roughness:.4,metalness:.7});for(const Y of Br){const J=new mt(D,z);J.position.set(Y.x,Pe.BASE_THICKNESS/2+gt.HEIGHT/2,Y.y),J.castShadow=!0,J.receiveShadow=!0,e.add(J)}const N=new Ol(100,100),F=new wn({color:1710618,roughness:1}),H=new mt(N,F);H.rotation.x=-Math.PI/2,H.position.y=-.11,H.receiveShadow=!0,this.scene.add(H),this.scene.add(e)}setupLights(){const e=new xD(16777215,.5);this.scene.add(e);const t=new pD(16777215,4473924,.6);this.scene.add(t);const n=new lv(16777215,1.5);n.position.set(0,20,0),n.castShadow=!0,n.shadow.mapSize.width=2048,n.shadow.mapSize.height=2048,this.scene.add(n)}}const cn=gt.OFFSET_X-gt.RADIUS-je.RADIUS-.15,du=gt.OFFSET_Z-je.RADIUS;class $m{static applyInput(e,t,n,i,s,o){let a=t+i,l=n+s;const c=gt.RADIUS+zt.BAND_THICKNESS/2;if(o===0){const w=-7.8+c+je.RADIUS-xn.MAX_STRETCH;l<w&&(l=w),l<-du&&(a<-cn&&(a=-cn),a>cn&&(a=cn))}else{const w=gt.OFFSET_Z-c-je.RADIUS+xn.MAX_STRETCH;l>w&&(l=w),l>du&&(a<-cn&&(a=-cn),a>cn&&(a=cn))}let u=a-e.x,h=l-e.y;const f=60,d=60;let g=u*f,m=h*f;const p=g*g+m*m;if(p>d*d){const y=d/Math.sqrt(p);g*=y,m*=y}e.vx=g,e.vy=m}static simulate(e,t,n){const i=n/Zs.SUBSTEPS;for(let s of e)t.has(s.id)||(s.vx*=Zs.FRICTION,s.vy*=Zs.FRICTION);for(let s=0;s<Zs.SUBSTEPS;s++)for(let o=0;o<e.length;o++){let a=e[o],l=0,c=0,u=!1;const h=gt.RADIUS+zt.BAND_THICKNESS/2,f=-7.8+h,d=gt.OFFSET_Z-h,g=gt.OFFSET_X-je.RADIUS;if(a.y-je.RADIUS<f&&Math.abs(a.x)<g){u=!0;const T=Math.abs(a.y-je.RADIUS-f),_=Math.pow(T,xn.POWER_CURVE)*xn.STIFFNESS;c+=_,l+=(0-a.x)*_*xn.CENTERING}else if(a.y+je.RADIUS>d&&Math.abs(a.x)<g){u=!0;const T=Math.abs(a.y+je.RADIUS-d),_=Math.pow(T,xn.POWER_CURVE)*xn.STIFFNESS;c-=_,l+=(0-a.x)*_*xn.CENTERING}u&&!t.has(a.id)&&(a.vx+=l*i,a.vy+=c*i,a.vx*=xn.DAMPING,a.vy*=xn.DAMPING),a.x+=a.vx*i,a.y+=a.vy*i;const m=Pe.WIDTH/2-Pe.SLAT_WIDTH,p=Pe.HEIGHT/2-Pe.SLAT_WIDTH,w=t.has(a.id)?0:-.5;a.x<-m+je.RADIUS&&(a.x=-m+je.RADIUS,a.vx*=w),a.x>m-je.RADIUS&&(a.x=m-je.RADIUS,a.vx*=w),a.y<-p+je.RADIUS&&(a.y=-p+je.RADIUS,a.vy*=w),a.y>p-je.RADIUS&&(a.y=p-je.RADIUS,a.vy*=w),Math.abs(a.y)>du&&(a.x>cn&&(a.x=cn,a.vx>0&&(a.vx*=w)),a.x<-cn&&(a.x=-cn,a.vx<0&&(a.vx*=w)));for(const T of Br){const _=a.x-T.x,C=a.y-T.y,E=_*_+C*C,D=je.RADIUS+gt.RADIUS+zt.BAND_THICKNESS+.02;if(E<D*D){const z=Math.sqrt(E),N=_/z,F=C/z,H=D-z;a.x+=N*H,a.y+=F*H;const Y=a.vx*N+a.vy*F;if(Y<0){const J=Y,S=a.vx-J*N,P=a.vy-J*F;a.vx=S+J*N*w,a.vy=P+J*F*w}}}const v=Pe.SLAT_WIDTH/2,x=Pe.TUNNEL_WIDTH/2,b=Pe.WIDTH/2,M=[{x1:x,x2:b,y1:-v,y2:v},{x1:-b,x2:-x,y1:-v,y2:v}];for(const T of M){const _=Math.max(T.x1,Math.min(T.x2,a.x)),C=Math.max(T.y1,Math.min(T.y2,a.y)),E=a.x-_,D=a.y-C,z=E*E+D*D;if(z<je.RADIUS*je.RADIUS){const N=Math.sqrt(z);let F=0,H=0,Y=0;if(N>1e-4)Y=je.RADIUS-N,F=E/N,H=D/N;else{const S=Math.abs(a.x-T.x1),P=Math.abs(a.x-T.x2),k=Math.abs(a.y-T.y2),R=Math.abs(a.y-T.y1),O=Math.min(S,P,k,R);O===k?(F=0,H=1,Y=je.RADIUS+k):O===R?(F=0,H=-1,Y=je.RADIUS+R):O===S?(F=-1,H=0,Y=je.RADIUS+S):(F=1,H=0,Y=je.RADIUS+P)}a.x+=F*Y,a.y+=H*Y;const J=a.vx*F+a.vy*H;if(J<0){const S=J,P=a.vx-S*F,k=a.vy-S*H;a.vx=P+S*F*w,a.vy=k+S*H*w}}}for(let T=o+1;T<e.length;T++){let _=e[T];const C=_.x-a.x,E=_.y-a.y,D=C*C+E*E,z=je.RADIUS*2;if(D<z*z){const N=Math.sqrt(D),F=z-N,H=C/N,Y=E/N,J=H*F*.5,S=Y*F*.5;a.x-=J,a.y-=S,_.x+=J,_.y+=S;const P=_.vx-a.vx,k=_.vy-a.vy,R=P*H+k*Y;if(R<0){const O=R;a.vx+=O*H,a.vy+=O*Y,_.vx-=O*H,_.vy-=O*Y}}}}}}const zr=class zr extends a1{constructor(e,t){super(),this.pulis=[],this.heldPulis={},this.heldOffsets={},this.localPlayerId=0;for(let n of t)if(n.isLocalPlayer()){this.localPlayerId=n.getID();break}this.initGameState(t),this.scene=new uL(e,this.localPlayerId),this.scene.createPulis(this.pulis)}initGameState(e){let t=0;for(let o of e)this.heldPulis[o.getID()]=null,this.heldOffsets[o.getID()]=null;const n=[-3.4,-1.7,1.7,3.4],i=4.8,s=1.6;for(let o=0;o<3;o++)for(let a=0;a<4;a++)this.pulis.push({id:t++,owner:0,x:n[a],y:-(i-o*s),vx:0,vy:0});for(let o=0;o<3;o++)for(let a=0;a<4;a++)this.pulis.push({id:t++,owner:1,x:n[a],y:i-o*s,vx:0,vy:0})}serialize(){return{pulis:this.pulis,heldPulis:this.heldPulis,heldOffsets:this.heldOffsets}}deserialize(e){this.pulis=e.pulis,this.heldPulis=e.heldPulis,this.heldOffsets=e.heldOffsets}tick(e){const t=zr.timestep/1e3;for(const[i,s]of e.entries()){const o=i.getID();let a=null,l=null;const c=s.mouseButtons.has(0)||s.touches&&s.touches.length>0;let u=null,h=null;if(s.touches&&s.touches.length>0?(u=s.touches[0].x,h=s.touches[0].y):s.mousePosition&&(u=s.mousePosition.x,h=s.mousePosition.y),u!==null&&h!==null){const d=this.scene.renderer.domElement,g=new ue(u/d.width*2-1,-(h/d.height)*2+1),m=new RD,p=o===0?this.scene.camera0:this.scene.camera1;m.setFromCamera(g,p);const y=new ci(new U(0,1,0),0),w=new U;m.ray.intersectPlane(y,w)&&(a=w.x,l=w.z)}let f=this.heldPulis[o];if(c&&a!==null&&l!==null){if(f==null){let d=1/0,g=null;for(let m of this.pulis){if(o===0&&m.y>0||o===1&&m.y<0)continue;const p=m.x-a,y=m.y-l,w=Math.sqrt(p*p+y*y);w<je.RADIUS*1.5&&w<d&&(d=w,g=m)}g&&(this.heldPulis[o]=g.id,f=g.id,this.heldOffsets[o]={x:g.x-a,y:g.y-l})}if(f!==null){const d=this.pulis.find(m=>m.id===f),g=this.heldOffsets[o];d&&g&&$m.applyInput(d,a,l,g.x,g.y,o)}}else this.heldPulis[o]=null,this.heldOffsets[o]=null}const n=new Set(Object.values(this.heldPulis).filter(i=>i!==null));$m.simulate(this.pulis,n,t)}draw(){this.scene.draw(this.pulis)}};zr.timestep=Zs.TIMESTEP,zr.canvasSize={width:zt.CANVAS_WIDTH,height:zt.CANVAS_HEIGHT},zr.deterministic=!0;let Ju=zr;new o1(Ju).start();
