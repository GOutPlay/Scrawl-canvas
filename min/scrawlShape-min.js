/*! scrawl-canvas 2017-01-29 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"shape"))var scrawl=function(a){"use strict";return a.makeShape=function(b){return new a.Shape(b)},a.Shape=function(b){return b=a.safeObject(b),a.Entity.call(this,b),a.Position.prototype.set.call(this,b),this.isLine=a.isa_bool(b.isLine)?b.isLine:!0,this.dataSet=a.xt(this.data)?this.buildDataSet(this.data):"",this.winding=a.xtGet(b.winding,"nonzero"),this.registerInLibrary(),a.pushUnique(a.group[this.group].entitys,this.name),this},a.Shape.prototype=Object.create(a.Entity.prototype),a.Shape.prototype.type="Shape",a.Shape.prototype.classname="entitynames",a.work.d.Shape={dataSet:!1,isLine:!0,method:"draw",winding:"nonzero"},a.mergeInto(a.work.d.Shape,a.work.d.Entity),a.Shape.prototype.set=function(b){return a.Entity.prototype.set.call(this,b),b=a.safeObject(b),a.xt(b.data&&b.data.substring)&&(this.dataSet=this.buildDataSet(this.data)),this},a.Shape.prototype.buildDataSet=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o=["M","L","C","Q","S","T"],p=[],q=[],r=[];p.length=0,d=999999,e=999999,f=-999999,g=-999999,h=this.start.x,i=this.start.y,j=b.match(/([A-Za-z][0-9. ,\-]*)/g);var s=function(a,b){d=d>a?a:d,e=e>b?b:e,f=a>f?a:f,g=b>g?b:g};for(k=0,l=j.length;l>k;k++){if(c=j[k][0],q=j[k].match(/(-?[0-9.]+\b)/g)){for(m=0,n=q.length;n>m;m++)q[m]=parseFloat(q[m]);switch(c){case"H":for(m=0,n=q.length;n>m;m++)h=q[m],s(h,i);break;case"V":for(m=0,n=q.length;n>m;m++)i=q[m],s(h,i);break;case"M":for(m=0,n=q.length;n>m;m+=2)h=q[m],i=q[m+1],s(h,i);break;case"L":case"T":for(m=0,n=q.length;n>m;m+=2)h=q[m],i=q[m+1],s(h,i);break;case"Q":case"S":for(m=0,n=q.length;n>m;m+=4)h=q[m+2],i=q[m+3],s(h,i);break;case"C":for(m=0,n=q.length;n>m;m+=6)h=q[m+4],i=q[m+5],s(h,i);break;case"h":for(m=0,n=q.length;n>m;m++)h+=q[m],s(h,i);break;case"v":for(m=0,n=q.length;n>m;m++)i+=q[m],s(h,i);break;case"m":case"l":case"t":for(m=0,n=q.length;n>m;m+=2)h+=q[m],i+=q[m+1],s(h,i);break;case"q":case"s":for(m=0,n=q.length;n>m;m+=4)h+=q[m+2],i+=q[m+3],s(h,i);break;case"c":for(m=0,n=q.length;n>m;m+=6)h+=q[m+4],i+=q[m+5],s(h,i)}}p.push({c:c,p:q})}for(k=0,l=p.length;l>k;k++){if(a.contains(o,p[k].c))for(m=0,n=p[k].p.length;n>m;m+=2)p[k].p[m]-=d,p[k].p[m+1]-=e;if("H"===p[k].c)for(m=0,n=p[k].p.length;n>m;m++)p[k].p[m]-=d;if("V"===p[k].c)for(m=0,n=p[k].p.length;n>m;m++)p[k].p[m]-=e}for(this.width=f-d,this.height=g-e,k=0,l=p.length;l>k;k++)r.push(p[k]);return r},a.Shape.prototype.doOutline=function(a,b){return b.setEngine(this),!this.dataSet&&this.data&&this.buildDataSet(this.data),this.completeOutline(a,b)},a.Shape.prototype.completeOutline=function(b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p=["M"],q=["C","c","S","s"],r=["Q","q","T","t"],s={M:function(a){for(i=m.p[0],j=m.p[1],k=i,l=j,b.moveTo(i*a.scale,j*a.scale),f=2,g=m.p.length;g>f;f+=2)i=m.p[f],j=m.p[f+1],k=i,l=j,b.lineTo(i*a.scale,j*a.scale)},m:function(a){for(i+=m.p[0],j+=m.p[1],k=i,l=j,b.moveTo(i*a.scale,j*a.scale),f=2,g=m.p.length;g>f;f+=2)i+=m.p[f],j+=m.p[f+1],k=i,l=j,b.lineTo(i*a.scale,j*a.scale)},Z:function(){b.closePath()},z:function(){b.closePath()},L:function(a){for(f=0,g=m.p.length;g>f;f+=2)i=m.p[f],j=m.p[f+1],k=i,l=j,b.lineTo(i*a.scale,j*a.scale)},l:function(a){for(f=0,g=m.p.length;g>f;f+=2)i+=m.p[f],j+=m.p[f+1],k=i,l=j,b.lineTo(i*a.scale,j*a.scale)},H:function(a){for(f=0,g=m.p.length;g>f;f++)i=m.p[f],k=i,b.lineTo(i*a.scale,j*a.scale)},h:function(a){for(f=0,g=m.p.length;g>f;f++)i+=m.p[f],k=i,b.lineTo(i*a.scale,j*a.scale)},V:function(a){for(f=0,g=m.p.length;g>f;f++)j=m.p[f],l=j,b.lineTo(i*a.scale,j*a.scale)},v:function(a){for(f=0,g=m.p.length;g>f;f++)j+=m.p[f],l=j,b.lineTo(i*a.scale,j*a.scale)},C:function(a){for(f=0,g=m.p.length;g>f;f+=6)b.bezierCurveTo(m.p[f]*a.scale,m.p[f+1]*a.scale,m.p[f+2]*a.scale,m.p[f+3]*a.scale,m.p[f+4]*a.scale,m.p[f+5]*a.scale),k=m.p[f+2],l=m.p[f+3],i=m.p[f+4],j=m.p[f+5]},c:function(a){for(f=0,g=m.p.length;g>f;f+=6)b.bezierCurveTo((i+m.p[f])*a.scale,(j+m.p[f+1])*a.scale,(i+m.p[f+2])*a.scale,(j+m.p[f+3])*a.scale,(i+m.p[f+4])*a.scale,(j+m.p[f+5])*a.scale),k=i+m.p[f+2],l=j+m.p[f+3],i+=m.p[f+4],j+=m.p[f+5]},S:function(c){for(f=0,g=m.p.length;g>f;f+=4)d>0&&a.contains(q,c.dataSet[d-1].c)?(n=i+(i-k),o=j+(j-l)):(n=i,o=j),b.bezierCurveTo(n*c.scale,o*c.scale,m.p[f]*c.scale,m.p[f+1]*c.scale,m.p[f+2]*c.scale,m.p[f+3]*c.scale),k=m.p[f],l=m.p[f+1],i=m.p[f+2],j=m.p[f+3]},s:function(c){for(f=0,g=m.p.length;g>f;f+=4)d>0&&a.contains(q,c.dataSet[d-1].c)?(n=i+(i-k),o=j+(j-l)):(n=i,o=j),b.bezierCurveTo(n*c.scale,o*c.scale,(i+m.p[f])*c.scale,(j+m.p[f+1])*c.scale,(i+m.p[f+2])*c.scale,(j+m.p[f+3])*c.scale),k=i+m.p[f],l=j+m.p[f+1],i+=m.p[f+2],j+=m.p[f+3]},Q:function(a){for(f=0,g=m.p.length;g>f;f+=4)b.quadraticCurveTo(m.p[f]*a.scale,m.p[f+1]*a.scale,m.p[f+2]*a.scale,m.p[f+3]*a.scale),k=m.p[f],l=m.p[f+1],i=m.p[f+2],j=m.p[f+3]},q:function(a){for(f=0,g=m.p.length;g>f;f+=4)b.quadraticCurveTo((i+m.p[f])*a.scale,(j+m.p[f+1])*a.scale,(i+m.p[f+2])*a.scale,(j+m.p[f+3])*a.scale),k=i+m.p[f],l=j+m.p[f+1],i+=m.p[f+2],j+=m.p[f+3]},T:function(c){for(f=0,g=m.p.length;g>f;f+=2)d>0&&a.contains(r,c.dataSet[d-1].c)?(n=i+(i-k),o=j+(j-l)):(n=i,o=j),b.quadraticCurveTo(n*c.scale,o*c.scale,m.p[f]*c.scale,m.p[f+1]*c.scale),k=n,l=o,i=m.p[f],j=m.p[f+1]},t:function(c){for(f=0,g=m.p.length;g>f;f+=2)d>0&&a.contains(r,c.dataSet[d-1].c)?(n=i+(i-k),o=j+(j-l)):(n=i,o=j),b.quadraticCurveTo(n*c.scale,o*c.scale,(i+m.p[f])*c.scale,(j+m.p[f+1])*c.scale),k=n,l=o,i+=m.p[f],j+=m.p[f+1]}};if(this.dataSet)for(h=this.currentHandle,i=0,j=0,k=0,l=0,this.rotateCell(b,c),b.translate(h.x,h.y),b.beginPath(),a.contains(p,this.dataSet[0].c)||b.moveTo(i,j),d=0,e=this.dataSet.length;e>d;d++)m=this.dataSet[d],s[m.c](this);return this},a.Shape.prototype.clip=function(a,b,c){return a.save(),this.doOutline(a,c),a.clip(this.winding),this},a.Shape.prototype.clear=function(a,b,c){return this.clip(a,b,c),a.clearRect(0,0,c.get("actualWidth"),c.get(".actualHeight")),a.restore(),this},a.Shape.prototype.clearWithBackground=function(b,c,d){return this.clip(b,c,d),b.fillStyle=d.backgroundColor,b.fillRect(0,0,cellactualWidth,d.actualHeight),b.fillStyle=a.ctx[c].get("fillStyle"),b.restore(),this},a.Shape.prototype.draw=function(a,b,c){return this.doOutline(a,c),a.stroke(),this},a.Shape.prototype.fill=function(a,b,c){return this.doOutline(a,c),a.fill(this.winding),this},a.Shape.prototype.drawFill=function(a,b,c){return this.doOutline(a,c),a.stroke(),this.clearShadow(a,c),a.fill(this.winding),this},a.Shape.prototype.fillDraw=function(a,b,c){return this.doOutline(a,c),a.fill(this.winding),this.clearShadow(a,c),a.stroke(),this},a.Shape.prototype.sinkInto=function(a,b,c){return this.doOutline(a,c),a.fill(this.winding),a.stroke(),this},a.Shape.prototype.floatOver=function(a,b,c){return this.doOutline(a,c),a.stroke(),a.fill(this.winding),this},a.Shape.prototype.none=function(a,b,c){return this.doOutline(a,c),this},a.Shape.prototype.checkHit=function(b){var c,d,e,f,g=a.work.cvx;for(b=a.safeObject(b),c=a.xt(b.tests)?[].concat(b.tests):[b.x||!1,b.y||!1],d=!1,g.mozFillRule=this.winding,g.msFillRule=this.winding,this.completeOutline(g,a.group[this.group].cell),e=0,f=c.length;f>e;e+=2)if(d=g.isPointInPath(c[e],c[e+1],this.winding)){b.x=c[e],b.y=c[e+1];break}return d?b:!1},a.Shape.prototype.buildCollisionVectors=function(b){var c,d,e,f,g,h;if(this.isLine)a.Entity.prototype.buildCollisionVectors.call(this,b);else for(e=a.xt(b)?this.parseCollisionPoints(b):this.collisionPoints,f=this.getOffsetStartVector().reverse(),g=this.width/2,h=this.height/2,this.collisionVectors.length=0,c=0,d=e.length;d>c;c++)if(e[c].substring)switch(e[c]){case"start":this.collisionVectors.push(0),this.collisionVectors.push(0);break;case"N":this.collisionVectors.push(-f.x),this.collisionVectors.push(-h-f.y);break;case"NE":this.collisionVectors.push(g-f.x),this.collisionVectors.push(-h-f.y);break;case"E":this.collisionVectors.push(g-f.x),this.collisionVectors.push(-f.y);break;case"SE":this.collisionVectors.push(g-f.x),this.collisionVectors.push(h-f.y);break;case"S":this.collisionVectors.push(-f.x),this.collisionVectors.push(h-f.y);break;case"SW":this.collisionVectors.push(-g-f.x),this.collisionVectors.push(h-f.y);break;case"W":this.collisionVectors.push(-g-f.x),this.collisionVectors.push(-f.y);break;case"NW":this.collisionVectors.push(-g-f.x),this.collisionVectors.push(-h-f.y);break;case"center":this.collisionVectors.push(-f.x),this.collisionVectors.push(-f.y)}else a.isa_vector(e[c])&&(this.collisionVectors.push(e[c].x),this.collisionVectors.push(e[c].y));return this},a}(scrawl);