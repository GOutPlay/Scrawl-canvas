/*! scrawl-canvas 2014-08-18 */
var scrawl=function(a){"use strict";return a.newWheel=function(b){return new a.Wheel(b)},a.workwheel={v1:a.newVector()},a.Wheel=function(b){return b=a.safeObject(b),a.Sprite.call(this,b),a.Position.prototype.set.call(this,b),this.radius=b.radius||a.d.Wheel.radius,this.width=2*this.radius,this.height=this.width,this.checkHitUsingRadius=a.isa(b.checkHitUsingRadius,"bool")?b.checkHitUsingRadius:a.d.Wheel.checkHitUsingRadius,this.closed=a.isa(b.closed,"bool")?b.closed:a.d.Wheel.closed,this.includeCenter=a.isa(b.includeCenter,"bool")?b.includeCenter:a.d.Wheel.includeCenter,this.clockwise=a.isa(b.clockwise,"bool")?b.clockwise:a.d.Wheel.clockwise,this.registerInLibrary(),a.pushUnique(a.group[this.group].sprites,this.name),this},a.Wheel.prototype=Object.create(a.Sprite.prototype),a.Wheel.prototype.type="Wheel",a.Wheel.prototype.classname="spritenames",a.d.Wheel={startAngle:0,endAngle:360,clockwise:!1,closed:!0,includeCenter:!1,checkHitUsingRadius:!0,checkHitRadius:0},a.mergeInto(a.d.Wheel,a.d.Sprite),a.Wheel.prototype.set=function(b){return a.Sprite.prototype.set.call(this,b),this.radius=b.radius||this.radius,this.width=2*this.radius,this.height=this.width,this},a.Wheel.prototype.setDelta=function(b){a.Sprite.prototype.setDelta.call(this,b),b=a.isa(b,"obj")?b:{};var c={};return a.xt(b.radius)&&(this.radius+=b.radius,this.width=2*this.radius,this.height=this.width),a.xt(b.startAngle)&&(c.startAngle=this.get("startAngle")+b.startAngle),a.xt(b.endAngle)&&(c.endAngle=this.get("endAngle")+b.endAngle),this.set(c),this},a.Wheel.prototype.checkHit=function(b){b=a.safeObject(b);var c,d,e,f,g,h=a.xt(b.tests)?b.tests:[b.x||!1,b.y||!1],i=!1;if(this.checkHitUsingRadius)for(d=this.checkHitRadius?this.checkHitRadius:this.radius*this.scale,f=0,g=h.length;g>f&&(this.resetWork(),c=a.workwheel.v1.set({x:h[f],y:h[f+1]}),c.vectorSubtract(this.work.start).scalarDivide(this.scale).rotate(-this.roll),c.x=this.flipReverse?-c.x:c.x,c.y=this.flipUpend?-c.y:c.y,c.vectorAdd(this.getPivotOffsetVector(this.handle)),!(i=c.getMagnitude()<=d?!0:!1));f+=2);else for(e=a.cvx,this.buildPath(e),f=0,g=h.length;g>f&&!(i=e.isPointInPath(h[f],h[f+1]));f+=2);return i?{x:h[f],y:h[f+1]}:!1},a.Wheel.prototype.getPivotOffsetVector=function(){return this.getCenteredPivotOffsetVector()},a.Wheel.prototype.buildPath=function(b){var c=this.prepareStamp(),d=this.get("startAngle"),e=this.get("endAngle");return this.rotateCell(b),b.beginPath(),b.arc(c.x,c.y,this.radius*this.scale,d*a.radian,e*a.radian,this.clockwise),this.includeCenter&&b.lineTo(c.x,c.y),this.closed&&b.closePath(),this},a.Wheel.prototype.clip=function(a){return this.buildPath(a),a.clip(),this},a.Wheel.prototype.clear=function(b,c){return b.globalCompositeOperation="destination-out",this.buildPath(b),b.stroke(),b.fill(),b.globalCompositeOperation=a.ctx[c].get("globalCompositeOperation"),this},a.Wheel.prototype.clearWithBackground=function(b,c){var d=a.cell[c],e=d.get("backgroundColor"),f=a.ctx[c],g=f.get("fillStyle"),h=f.get("strokeStyle"),i=f.get("globalAlpha");return b.fillStyle=e,b.strokeStyle=e,b.globalAlpha=1,this.buildPath(b),b.stroke(),b.fill(),b.fillStyle=g,b.strokeStyle=h,b.globalAlpha=i,this},a.Wheel.prototype.draw=function(b,c){return a.cell[c].setEngine(this),this.buildPath(b),b.stroke(),this},a.Wheel.prototype.fill=function(b,c){return a.cell[c].setEngine(this),this.buildPath(b),b.fill(),this},a.Wheel.prototype.drawFill=function(b,c){return a.cell[c].setEngine(this),this.buildPath(b),b.stroke(),this.clearShadow(b,c),b.fill(),this},a.Wheel.prototype.fillDraw=function(b,c){return a.cell[c].setEngine(this),this.buildPath(b),b.fill(),this.clearShadow(b,c),b.stroke(),this},a.Wheel.prototype.sinkInto=function(b,c){return a.cell[c].setEngine(this),this.buildPath(b),b.fill(),b.stroke(),this},a.Wheel.prototype.floatOver=function(b,c){return a.cell[c].setEngine(this),this.buildPath(b),b.stroke(),b.fill(),this},a.Wheel.prototype.buildCollisionVectors=function(b){var c,d,e,f,g=[];if(a.xt(a.workcols)){d=a.workcols.v1.set({x:this.radius,y:0}),c=a.xt(b)?this.parseCollisionPoints(b):this.collisionPoints;for(var h=0,i=c.length;i>h;h++)if(a.isa(c[h],"num")&&c[h]>1){e=a.workcols.v2.set(d),f=360/Math.floor(c[h]);for(var j=0;j<c[h];j++)e.rotate(f),g.push(e.x),g.push(e.y)}else if(a.isa(c[h],"str"))switch(e=a.workcols.v2.set(d),c[h]){case"start":g.push(0),g.push(0);break;case"N":e.rotate(-90),g.push(e.x),g.push(e.y);break;case"NE":e.rotate(-45),g.push(e.x),g.push(e.y);break;case"E":g.push(e.x),g.push(e.y);break;case"SE":e.rotate(45),g.push(e.x),g.push(e.y);break;case"S":e.rotate(90),g.push(e.x),g.push(e.y);break;case"SW":e.rotate(135),g.push(e.x),g.push(e.y);break;case"W":e.rotate(180),g.push(e.x),g.push(e.y);break;case"NW":e.rotate(-135),g.push(e.x),g.push(e.y);break;case"center":g.push(0),g.push(0)}else a.isa(c[h],"vector")&&(g.push(c[h].x),g.push(c[h].y))}return this.collisionVectors=g,this},a}(scrawl);