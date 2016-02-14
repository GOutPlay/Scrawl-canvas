/*! scrawl-canvas 2016-02-14 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"color"))var scrawl=function(a){"use strict";return a.newColor=function(b){return a.makeColor(b)},a.makeColor=function(b){return new a.Color(b)},a.Color=function(b){return b=a.safeObject(b),a.Base.call(this,b),this.set(b),a.xt(b.color)&&this.convert(b.color),b.random&&this.generateRandomColor(b),this.checkValues(),a.design[this.name]=this,a.pushUnique(a.designnames,this.name),this},a.Color.prototype=Object.create(a.Base.prototype),a.Color.prototype.type="Color",a.Color.prototype.classname="designnames",a.work.d.Color={r:0,g:0,b:0,a:1,rShift:0,gShift:0,bShift:0,aShift:0,rMax:255,gMax:255,bMax:255,aMax:1,rMin:0,gMin:0,bMin:0,aMin:0,rBounce:!1,gBounce:!1,bBounce:!1,aBounce:!1,autoUpdate:!1},a.mergeInto(a.work.d.Color,a.work.d.Base),a.Color.prototype.get=function(b){return a.xt(b)?"random"===b?(this.generateRandomColor(),this.get()):a.Base.prototype.get.call(this,b):"rgba("+(this.r||0)+", "+(this.g||0)+", "+(this.b||0)+", "+a.xtGet(this.a,1)+")"},a.Color.prototype.clone=function(b){var c,d,e;return b=a.safeObject(b),c=this.parse(),d=a.mergeOver(c,b),e=a.makeColor(d),b.random&&(delete e.r,delete e.g,delete e.b,delete e.a,e.generateRandomColor(b)),e},a.Color.prototype.getData=function(){return this.get("autoUpdate")&&this.update(),this.checkValues(),this.get()},a.Color.prototype.generateRandomColor=function(b){var c=a.xtGet;return b=a.safeObject(b),this.rMax=c(b.rMax,this.rMax,255),this.gMax=c(b.gMax,this.gMax,255),this.bMax=c(b.bMax,this.bMax,255),this.aMax=c(b.aMax,this.aMax,1),this.rMin=c(b.rMin,this.rMin,0),this.gMin=c(b.gMin,this.gMin,0),this.bMin=c(b.bMin,this.bMin,0),this.aMin=c(b.aMin,this.aMin,0),this.r=b.r||Math.round(Math.random()*(this.rMax-this.rMin)+this.rMin),this.g=b.g||Math.round(Math.random()*(this.gMax-this.gMin)+this.gMin),this.b=b.b||Math.round(Math.random()*(this.bMax-this.bMin)+this.bMin),this.a=b.a||Math.random()*(this.aMax-this.aMin)+this.aMin,this.checkValues(),this},a.Color.prototype.checkValues=function(){var a=Math.floor(this.r)||0,b=Math.floor(this.g)||0,c=Math.floor(this.b)||0,d=this.a||1;return this.r=a>255?255:0>a?0:a,this.g=b>255?255:0>b?0:b,this.b=c>255?255:0>c?0:c,this.a=d>1?1:0>d?0:d,this},a.Color.prototype.set=function(b){return a.Base.prototype.set.call(this,b),b=a.safeObject(b),b.random?this.generateRandomColor(b):b.color?this.convert(b.color):this.checkValues(),this},a.Color.prototype.update=function(){var b,c,d,e,f,g,h,i=["r","g","b","a"],j=a.isBetween;for(b=0,c=i.length;c>b;b++)d=this[i[b]],e=this[i[b]+"Shift"],f=this[i[b]+"Min"],g=this[i[b]+"Max"],h=this[i[b]+"Bounce"],e&&(j(d+e,g,f,!0)||(h?e=-e:(d=d>(g+f)/2?g:f,e=0)),this[i[b]]=d+e,this[i[b]+"Shift"]=e);return this},a.Color.prototype.setDelta=function(b){return b=a.isa(b,"obj")?b:{},a.Base.prototype.set.call(this,{r:(this.r||0)+(b.r||0),g:(this.g||0)+(b.g||0),b:(this.b||0)+(b.b||0),a:(this.a||1)+(b.a||0)}),this.checkValues(),this},a.Color.prototype.convert=function(b){var c,d,e,f,g,h=!0;return b=a.isa(b,"str")?b:"",b.length>0&&(b.toLowerCase(),c=0,d=0,e=0,f=1,"#"===b[0]?b.length<5?(c=this.toDecimal(b[1]+b[1]),d=this.toDecimal(b[2]+b[2]),e=this.toDecimal(b[3]+b[3])):b.length<8&&(c=this.toDecimal(b[1]+b[2]),d=this.toDecimal(b[3]+b[4]),e=this.toDecimal(b[5]+b[6])):/rgb\(/.test(b)?(g=b.match(/([0-9.]+\b)/g),/%/.test(b)?(c=Math.round(g[0]/100*255),d=Math.round(g[1]/100*255),e=Math.round(g[2]/100*255)):(c=Math.round(g[0]),d=Math.round(g[1]),e=Math.round(g[2]))):/rgba\(/.test(b)?(g=b.match(/([0-9.]+\b)/g),c=g[0],d=g[1],e=g[2],f=g[3]):(g=this.colorLibrary[b],g&&(h=!1,g.call(this))),h&&(this.r=c,this.g=d,this.b=e,this.a=f),this.checkValues()),this},a.Color.prototype.colorLibrary={black:function(){this.r=0,this.g=0,this.b=0,this.a=1},silver:function(){this.r=parseInt("c0",16),this.g=parseInt("c0",16),this.b=parseInt("c0",16),this.a=1},gray:function(){this.r=127,this.g=127,this.b=127,this.a=1},white:function(){this.r=255,this.g=255,this.b=255,this.a=1},maroon:function(){this.r=127,this.g=0,this.b=0,this.a=1},red:function(){this.r=255,this.g=0,this.b=0,this.a=1},purple:function(){this.r=127,this.g=0,this.b=127,this.a=1},fuchsia:function(){this.r=255,this.g=0,this.b=255,this.a=1},green:function(){this.r=0,this.g=127,this.b=0,this.a=1},lime:function(){this.r=0,this.g=255,this.b=0,this.a=1},olive:function(){this.r=127,this.g=127,this.b=0,this.a=1},yellow:function(){this.r=255,this.g=255,this.b=0,this.a=1},navy:function(){this.r=0,this.g=0,this.b=127,this.a=1},blue:function(){this.r=0,this.g=0,this.b=255,this.a=1},teal:function(){this.r=0,this.g=127,this.b=127,this.a=1},aqua:function(){this.r=0,this.g=255,this.b=255,this.a=1},orange:function(){this.r=255,this.g=parseInt("a5",16),this.b=0,this.a=1},aliceblue:function(){this.r=parseInt("f0",16),this.g=parseInt("f8",16),this.b=255,this.a=1},antiquewhite:function(){this.r=parseInt("fa",16),this.g=parseInt("eb",16),this.b=parseInt("d7",16),this.a=1},aquamarine:function(){this.r=parseInt("7f",16),this.g=255,this.b=parseInt("d4",16),this.a=1},azure:function(){this.r=parseInt("f0",16),this.g=255,this.b=255,this.a=1},beige:function(){this.r=parseInt("f5",16),this.g=parseInt("f5",16),this.b=parseInt("dc",16),this.a=1},bisque:function(){this.r=255,this.g=parseInt("e4",16),this.b=parseInt("c4",16),this.a=1},blanchedalmond:function(){this.r=255,this.g=parseInt("e4",16),this.b=parseInt("c4",16),this.a=1},blueviolet:function(){this.r=parseInt("8a",16),this.g=parseInt("2b",16),this.b=parseInt("e2",16),this.a=1},brown:function(){this.r=parseInt("a5",16),this.g=parseInt("2a",16),this.b=parseInt("2a",16),this.a=1},burlywood:function(){this.r=parseInt("de",16),this.g=parseInt("b8",16),this.b=parseInt("87",16),this.a=1},cadetblue:function(){this.r=parseInt("5f",16),this.g=parseInt("9e",16),this.b=parseInt("a0",16),this.a=1},chartreuse:function(){this.r=parseInt("7f",16),this.g=255,this.b=0,this.a=1},chocolate:function(){this.r=parseInt("d2",16),this.g=parseInt("69",16),this.b=parseInt("1e",16),this.a=1},coral:function(){this.r=255,this.g=parseInt("7f",16),this.b=parseInt("50",16),this.a=1},cornflowerblue:function(){this.r=parseInt("64",16),this.g=parseInt("95",16),this.b=parseInt("ed",16),this.a=1},cornsilk:function(){this.r=255,this.g=parseInt("f8",16),this.b=parseInt("dc",16),this.a=1},crimson:function(){this.r=parseInt("dc",16),this.g=parseInt("14",16),this.b=parseInt("3c",16),this.a=1},darkblue:function(){this.r=0,this.g=0,this.b=parseInt("8b",16),this.a=1},darkcyan:function(){this.r=0,this.g=parseInt("8b",16),this.b=parseInt("8b",16),this.a=1},darkgoldenrod:function(){this.r=parseInt("b8",16),this.g=parseInt("86",16),this.b=parseInt("0b",16),this.a=1},darkgray:function(){this.r=parseInt("a9",16),this.g=parseInt("a9",16),this.b=parseInt("a9",16),this.a=1},darkgreen:function(){this.r=0,this.g=parseInt("64",16),this.b=0,this.a=1},darkgrey:function(){this.r=parseInt("a9",16),this.g=parseInt("a9",16),this.b=parseInt("a9",16),this.a=1},darkkhaki:function(){this.r=parseInt("bd",16),this.g=parseInt("b7",16),this.b=parseInt("6b",16),this.a=1},darkmagenta:function(){this.r=parseInt("8b",16),this.g=0,this.b=parseInt("8b",16),this.a=1},darkolivegreen:function(){this.r=parseInt("55",16),this.g=parseInt("6b",16),this.b=parseInt("2f",16),this.a=1},darkorange:function(){this.r=255,this.g=parseInt("8c",16),this.b=0,this.a=1},darkorchid:function(){this.r=parseInt("99",16),this.g=parseInt("32",16),this.b=parseInt("cc",16),this.a=1},darkred:function(){this.r=parseInt("8b",16),this.g=0,this.b=0,this.a=1},darksalmon:function(){this.r=parseInt("e9",16),this.g=parseInt("96",16),this.b=parseInt("7a",16),this.a=1},darkseagreen:function(){this.r=parseInt("8f",16),this.g=parseInt("bc",16),this.b=parseInt("8f",16),this.a=1},darkslateblue:function(){this.r=parseInt("48",16),this.g=parseInt("3d",16),this.b=parseInt("8b",16),this.a=1},darkslategray:function(){this.r=parseInt("2f",16),this.g=parseInt("4f",16),this.b=parseInt("4f",16),this.a=1},darkslategrey:function(){this.r=parseInt("2f",16),this.g=parseInt("4f",16),this.b=parseInt("4f",16),this.a=1},darkturquoise:function(){this.r=0,this.g=parseInt("ce",16),this.b=parseInt("d1",16),this.a=1},darkviolet:function(){this.r=parseInt("94",16),this.g=0,this.b=parseInt("d3",16),this.a=1},deeppink:function(){this.r=255,this.g=parseInt("14",16),this.b=parseInt("93",16),this.a=1},deepskyblue:function(){this.r=0,this.g=parseInt("bf",16),this.b=255,this.a=1},dimgray:function(){this.r=parseInt("69",16),this.g=parseInt("69",16),this.b=parseInt("69",16),this.a=1},dimgrey:function(){this.r=parseInt("69",16),this.g=parseInt("69",16),this.b=parseInt("69",16),this.a=1},dodgerblue:function(){this.r=parseInt("1e",16),this.g=parseInt("90",16),this.b=255,this.a=1},firebrick:function(){this.r=parseInt("b2",16),this.g=parseInt("22",16),this.b=parseInt("22",16),this.a=1},floralwhite:function(){this.r=255,this.g=parseInt("fa",16),this.b=parseInt("f0",16),this.a=1},forestgreen:function(){this.r=parseInt("22",16),this.g=parseInt("8b",16),this.b=parseInt("22",16),this.a=1},gainsboro:function(){this.r=parseInt("dc",16),this.g=parseInt("dc",16),this.b=parseInt("dc",16),this.a=1},ghostwhite:function(){this.r=parseInt("f8",16),this.g=parseInt("f8",16),this.b=255,this.a=1},gold:function(){this.r=255,this.g=parseInt("d7",16),this.b=0,this.a=1},goldenrod:function(){this.r=parseInt("da",16),this.g=parseInt("a5",16),this.b=parseInt("20",16),this.a=1},greenyellow:function(){this.r=parseInt("ad",16),this.g=255,this.b=parseInt("2f",16),this.a=1},grey:function(){this.r=127,this.g=127,this.b=127,this.a=1},honeydew:function(){this.r=parseInt("f0",16),this.g=255,this.b=parseInt("f0",16),this.a=1},hotpink:function(){this.r=255,this.g=parseInt("69",16),this.b=parseInt("b4",16),this.a=1},indianred:function(){this.r=parseInt("cd",16),this.g=parseInt("5c",16),this.b=parseInt("5c",16),this.a=1},indigo:function(){this.r=parseInt("4b",16),this.g=0,this.b=parseInt("82",16),this.a=1},ivory:function(){this.r=255,this.g=255,this.b=parseInt("f0",16),this.a=1},khaki:function(){this.r=parseInt("f0",16),this.g=parseInt("e6",16),this.b=parseInt("8c",16),this.a=1},lavender:function(){this.r=parseInt("e6",16),this.g=parseInt("e6",16),this.b=parseInt("fa",16),this.a=1},lavenderblush:function(){this.r=255,this.g=parseInt("f0",16),this.b=parseInt("f5",16),this.a=1},lawngreen:function(){this.r=parseInt("7c",16),this.g=parseInt("fc",16),this.b=0,this.a=1},lemonchiffon:function(){this.r=255,this.g=parseInt("fa",16),this.b=parseInt("cd",16),this.a=1},lightblue:function(){this.r=parseInt("ad",16),this.g=parseInt("d8",16),this.b=parseInt("e6",16),this.a=1},lightcoral:function(){this.r=parseInt("f0",16),this.g=127,this.b=127,this.a=1},lightcyan:function(){this.r=parseInt("e0",16),this.g=255,this.b=255,this.a=1},lightgoldenrodyellow:function(){this.r=parseInt("fa",16),this.g=parseInt("fa",16),this.b=parseInt("d2",16),this.a=1},lightgray:function(){this.r=parseInt("d3",16),this.g=parseInt("d3",16),this.b=parseInt("d3",16),this.a=1},lightgreen:function(){this.r=parseInt("90",16),this.g=parseInt("ee",16),this.b=parseInt("90",16),this.a=1},lightgrey:function(){this.r=parseInt("d3",16),this.g=parseInt("d3",16),this.b=parseInt("d3",16),this.a=1},lightpink:function(){this.r=255,this.g=parseInt("b6",16),this.b=parseInt("c1",16),this.a=1},lightsalmon:function(){this.r=255,this.g=parseInt("a0",16),this.b=parseInt("7a",16),this.a=1},lightseagreen:function(){this.r=parseInt("20",16),this.g=parseInt("b2",16),this.b=parseInt("aa",16),this.a=1},lightskyblue:function(){this.r=parseInt("87",16),this.g=parseInt("ce",16),this.b=parseInt("fa",16),this.a=1},lightslategray:function(){this.r=parseInt("77",16),this.g=parseInt("88",16),this.b=parseInt("99",16),this.a=1},lightslategrey:function(){this.r=parseInt("77",16),this.g=parseInt("88",16),this.b=parseInt("99",16),this.a=1},lightsteelblue:function(){this.r=parseInt("b0",16),this.g=parseInt("c4",16),this.b=parseInt("de",16),this.a=1},lightyellow:function(){this.r=255,this.g=255,this.b=parseInt("e0",16),this.a=1},limegreen:function(){this.r=parseInt("32",16),this.g=parseInt("cd",16),this.b=parseInt("32",16),this.a=1},linen:function(){this.r=parseInt("fa",16),this.g=parseInt("f0",16),this.b=parseInt("e6",16),this.a=1},mediumaquamarine:function(){this.r=parseInt("66",16),this.g=parseInt("cd",16),this.b=parseInt("aa",16),this.a=1},mediumblue:function(){this.r=0,this.g=0,this.b=parseInt("cd",16),this.a=1},mediumorchid:function(){this.r=parseInt("ba",16),this.g=parseInt("55",16),this.b=parseInt("d3",16),this.a=1},mediumpurple:function(){this.r=parseInt("93",16),this.g=parseInt("70",16),this.b=parseInt("db",16),this.a=1},mediumseagreen:function(){this.r=parseInt("3c",16),this.g=parseInt("b3",16),this.b=parseInt("71",16),this.a=1},mediumslateblue:function(){this.r=parseInt("7b",16),this.g=parseInt("68",16),this.b=parseInt("ee",16),this.a=1},mediumspringgreen:function(){this.r=0,this.g=parseInt("fa",16),this.b=parseInt("9a",16),this.a=1},mediumturquoise:function(){this.r=parseInt("48",16),this.g=parseInt("d1",16),this.b=parseInt("cc",16),this.a=1},mediumvioletred:function(){this.r=parseInt("c7",16),this.g=parseInt("15",16),this.b=parseInt("85",16),this.a=1},midnightblue:function(){this.r=parseInt("19",16),this.g=parseInt("19",16),this.b=parseInt("70",16),this.a=1},mintcream:function(){this.r=parseInt("f5",16),this.g=255,this.b=parseInt("fa",16),this.a=1},mistyrose:function(){this.r=255,this.g=parseInt("e4",16),this.b=parseInt("e1",16),this.a=1},moccasin:function(){this.r=255,this.g=parseInt("e4",16),this.b=parseInt("b5",16),this.a=1},navajowhite:function(){this.r=255,this.g=parseInt("de",16),this.b=parseInt("ad",16),this.a=1},oldlace:function(){this.r=parseInt("fd",16),this.g=parseInt("f5",16),this.b=parseInt("e6",16),this.a=1},olivedrab:function(){this.r=parseInt("6b",16),this.g=parseInt("8e",16),this.b=parseInt("23",16),this.a=1},orangered:function(){this.r=255,this.g=parseInt("45",16),this.b=0,this.a=1},orchid:function(){this.r=parseInt("da",16),this.g=parseInt("70",16),this.b=parseInt("d6",16),this.a=1},palegoldenrod:function(){this.r=parseInt("ee",16),this.g=parseInt("e8",16),this.b=parseInt("aa",16),this.a=1},palegreen:function(){this.r=parseInt("98",16),this.g=parseInt("fb",16),this.b=parseInt("98",16),this.a=1},paleturquoise:function(){this.r=parseInt("af",16),this.g=parseInt("ee",16),this.b=parseInt("ee",16),this.a=1},palevioletred:function(){this.r=parseInt("db",16),this.g=parseInt("70",16),this.b=parseInt("93",16),this.a=1},papayawhip:function(){this.r=255,this.g=parseInt("ef",16),this.b=parseInt("d5",16),this.a=1},peachpuff:function(){this.r=255,this.g=parseInt("da",16),this.b=parseInt("b9",16),this.a=1},peru:function(){this.r=parseInt("cd",16),this.g=parseInt("85",16),this.b=parseInt("3f",16),this.a=1},pink:function(){this.r=255,this.g=parseInt("c0",16),this.b=parseInt("cb",16),this.a=1},plum:function(){this.r=parseInt("dd",16),this.g=parseInt("a0",16),this.b=parseInt("dd",16),this.a=1},powderblue:function(){this.r=parseInt("b0",16),this.g=parseInt("e0",16),this.b=parseInt("e6",16),this.a=1},rosybrown:function(){this.r=parseInt("bc",16),this.g=parseInt("8f",16),this.b=parseInt("8f",16),this.a=1},royalblue:function(){this.r=parseInt("41",16),this.g=parseInt("69",16),this.b=parseInt("e1",16),this.a=1},saddlebrown:function(){this.r=parseInt("8b",16),this.g=parseInt("45",16),this.b=parseInt("13",16),this.a=1},salmon:function(){this.r=parseInt("fa",16),this.g=127,this.b=parseInt("72",16),this.a=1},sandybrown:function(){this.r=parseInt("f4",16),this.g=parseInt("a4",16),this.b=parseInt("60",16),this.a=1},seagreen:function(){this.r=parseInt("2e",16),this.g=parseInt("8b",16),this.b=parseInt("57",16),this.a=1},seashell:function(){this.r=255,this.g=parseInt("f5",16),this.b=parseInt("ee",16),this.a=1},sienna:function(){this.r=parseInt("a0",16),this.g=parseInt("52",16),this.b=parseInt("2d",16),this.a=1},skyblue:function(){this.r=parseInt("87",16),this.g=parseInt("ce",16),this.b=parseInt("eb",16),this.a=1},slateblue:function(){this.r=parseInt("6a",16),this.g=parseInt("5a",16),this.b=parseInt("cd",16),this.a=1},slategray:function(){this.r=parseInt("70",16),this.g=127,this.b=parseInt("90",16),this.a=1},slategrey:function(){this.r=parseInt("70",16),this.g=127,this.b=parseInt("90",16),this.a=1},snow:function(){this.r=255,this.g=parseInt("fa",16),this.b=parseInt("fa",16),this.a=1},springgreen:function(){this.r=0,this.g=255,this.b=parseInt("7f",16),this.a=1},steelblue:function(){this.r=parseInt("46",16),this.g=parseInt("82",16),this.b=parseInt("b4",16),this.a=1},tan:function(){this.r=parseInt("d2",16),this.g=parseInt("b4",16),this.b=parseInt("8c",16),this.a=1},thistle:function(){this.r=parseInt("d8",16),this.g=parseInt("bf",16),this.b=parseInt("d8",16),this.a=1},tomato:function(){this.r=255,this.g=parseInt("63",16),this.b=parseInt("47",16),this.a=1},transparent:function(){this.r=0,this.g=0,this.b=0,this.a=1},turquoise:function(){this.r=parseInt("40",16),this.g=parseInt("e0",16),this.b=parseInt("d0",16),this.a=1},violet:function(){this.r=parseInt("ee",16),this.g=parseInt("82",16),this.b=parseInt("ee",16),this.a=1},wheat:function(){this.r=parseInt("f5",16),this.g=parseInt("de",16),this.b=parseInt("b3",16),this.a=1},whitesmoke:function(){this.r=parseInt("f5",16),this.g=parseInt("f5",16),this.b=parseInt("f5",16),this.a=1},yellowgreen:function(){this.r=parseInt("9a",16),this.g=parseInt("cd",16),this.b=parseInt("32",16),this.a=1},rebeccapurple:function(){this.r=parseInt("66",16),this.g=parseInt("33",16),this.b=parseInt("99",16),this.a=1}},a.Color.prototype.toHex=function(a){return a.toString(16)},a.Color.prototype.toDecimal=function(a){return parseInt(a,16)},a.Color.prototype.remove=function(){return delete a.dsn[this.name],delete a.design[this.name],a.removeItem(a.designnames,this.name),!0},a}(scrawl);