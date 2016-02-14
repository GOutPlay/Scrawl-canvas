/*! scrawl-canvas 2016-02-14 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"quaternion"))var scrawl=function(a){"use strict";return a.newQuaternion=function(b){return a.makeQuaternion(b)},a.makeQuaternion=function(b){return b=a.safeObject(b),a.xto(b.pitch,b.yaw,b.roll)?a.Quaternion.prototype.makeFromEuler(b):new a.Quaternion(b)},a.Quaternion=function(b){var c,d=a.safeObject;return b=d(b),c=d(b.v),this.name=b.name||"generic",this.n=b.n||1,this.v=a.makeVector({x:c.x||b.x||0,y:c.y||b.y||0,z:c.z||b.z||0}),this},a.Quaternion.prototype=Object.create(Object.prototype),a.Quaternion.prototype.type="Quaternion",a.work.d.Quaternion={name:"generic",n:1,v:{x:0,y:0,z:0}},a.Quaternion.prototype.zero=function(){var a=this.v;return this.n=1,a.x=0,a.y=0,a.z=0,this},a.Quaternion.prototype.getMagnitude=function(){var a=this.v;return Math.sqrt(this.n*this.n+a.x*a.x+a.y*a.y+a.z*a.z)},a.Quaternion.prototype.normalize=function(){var a=this.getMagnitude(),b=this.v;return 0!==a&&(this.n/=a,b.x/=a,b.y/=a,b.z/=a),this},a.Quaternion.prototype.checkNormal=function(b){var c;return b=a.xt(b)?b:0,c=this.getMagnitude(),c>=1-b&&1+b>=c?!0:!1},a.Quaternion.prototype.getVector=function(){return this.v},a.Quaternion.prototype.getScalar=function(){return this.n},a.Quaternion.prototype.quaternionAdd=function(b){var c,d;return a.isa_quaternion(b)?(c=this.v,d=b.v,this.n+=b.n||0,c.x+=d.x||0,c.y+=d.y||0,c.z+=d.z||0,this):this},a.Quaternion.prototype.quaternionSubtract=function(b){var c,d;return a.isa_quaternion(b)?(c=this.v,d=b.v,this.n-=b.n||0,c.x-=d.x||0,c.y-=d.y||0,c.z-=d.z||0,this):this},a.Quaternion.prototype.scalarMultiply=function(a){var b;return a.toFixed?(b=this.v,this.n*=a,b.x*=a,b.y*=a,b.z*=a,this):this},a.Quaternion.prototype.scalarDivide=function(a){var b;return a.toFixed&&0!==a?(b=this.v,this.n/=a,b.x/=a,b.y/=a,b.z/=a,this):this},a.Quaternion.prototype.conjugate=function(){var a=this.v;return a.x=-a.x,a.y=-a.y,a.z=-a.z,this},a.Quaternion.prototype.set=function(b){var c,d,e,f,g,h=a.xt,i=this.v;return b=a.safeObject(b),a.isa_quaternion(b)?this.setFromQuaternion(b):a.isa_vector(b)?this.setFromVector(b):a.xto(b.pitch,b.yaw,b.roll)?this.setFromEuler(b):(g=h(b.vector)||h(b.v)?b.vector||b.v:!1,f=h(b.scalar)||h(b.n)?b.scalar||b.n||0:!1,c=g?g.x||0:b.x,d=g?g.y||0:b.y,e=g?g.z||0:b.z,this.n=f.toFixed?f:this.n,i.x=c.toFixed?c:i.x,i.y=d.toFixed?d:i.y,i.z=e.toFixed?e:i.z,this)},a.Quaternion.prototype.setFromQuaternion=function(b){var c,d;return a.isa_quaternion(b)?(c=this.v,d=b.v,this.n=b.n,c.x=d.x,c.y=d.y,c.z=d.z,this):this},a.Quaternion.prototype.setFromVector=function(b){var c;return a.isa_vector(b)?(c=this.v,this.n=0,c.x=b.x,c.y=b.y,c.z=b.z,this):this},a.Quaternion.prototype.quaternionMultiply=function(b){var c,d,e,f,g,h,i,j,k,l;return a.isa_quaternion(b)?(k=this.v,l=b.v,f=this.n,c=k.x,d=k.y,e=k.z,j=b.n,g=l.x,h=l.y,i=l.z,this.n=f*j-c*g-d*h-e*i,k.x=f*g+c*j+d*i-e*h,k.y=f*h+d*j+e*g-c*i,k.z=f*i+e*j+c*h-d*g,this):this},a.Quaternion.prototype.vectorMultiply=function(b){var c,d,e,f,g,h,i,j;return a.isa_vector(b)?(j=this.v,f=this.n,c=j.x,d=j.y,e=j.z,g=b.x,h=b.y,i=b.z,this.n=-(c*g+d*h+e*i),j.x=f*g+d*i-e*h,j.y=f*h+e*g-c*i,j.z=f*i+c*h-d*g,this):this},a.Quaternion.prototype.getAngle=function(b){var c;return b=a.xt(b)?b:!1,c=2*Math.acos(this.n),b?c*(1/a.work.radian):c},a.Quaternion.prototype.getAxis=function(){var b,c=a.work.v;return c.set(this.v),b=this.getMagnitude(),0!==b?c.scalarDivide(b):c},a.Quaternion.prototype.quaternionRotate=function(b){var c=a.work.workquat.q4,d=a.work.workquat.q5;return a.isa_quaternion(b)?(c.set(b),d.set(this),this.set(c.quaternionMultiply(d))):this},a.Quaternion.prototype.vectorRotate=function(b){return a.isa_vector(b)?b.rotate3d(this):!1},a.Quaternion.prototype.makeFromEuler=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p=a.work.radian,q=Math.cos,r=Math.sin;return b=a.safeObject(b),c=(b.pitch||b.x||0)*p,d=(b.yaw||b.y||0)*p,e=(b.roll||b.z||0)*p,f=q(d/2),g=q(e/2),h=q(c/2),i=r(d/2),j=r(e/2),k=r(c/2),l=f*g*h-i*j*k,m=i*j*h+f*g*k,n=i*g*h+f*j*k,o=f*j*h-i*g*k,new a.Quaternion({n:l,x:m,y:n,z:o})},a.Quaternion.prototype.setFromEuler=function(b){var c,d,e,f,g,h,i,j,k,l=a.work.radian,m=Math.cos,n=Math.sin,o=this.v;return b=a.safeObject(b),c=(b.pitch||b.x||0)*l,d=(b.yaw||b.y||0)*l,e=(b.roll||b.z||0)*l,f=m(d/2),g=m(e/2),h=m(c/2),i=n(d/2),j=n(e/2),k=n(c/2),this.n=f*g*h-i*j*k,o.x=i*j*h+f*g*k,o.y=i*g*h+f*j*k,o.z=f*j*h-i*g*k,this},a.Quaternion.prototype.getEulerAngles=function(){var b,c,d,e,f,g,h,i,j={pitch:0,yaw:0,roll:0},k=this.v,l=a.work.radian,m=Math.atan2,n=Math.PI,o=a.isBetween;return b=this.n*this.n,c=k.x*k.x,d=k.y*k.y,e=k.z*k.z,f=b+c+d+e,g=k.x*k.y+k.z*this.n,g>.499999*f?(j.yaw=2*m(k.x,this.n)/l,j.roll=n/2/l,j.pitch=0,j):-.499999*f>g?(j.yaw=-2*m(k.x,this.n)/l,j.roll=-n/2/l,j.pitch=0,j):(h=2*k.y*this.n-2*k.x*k.z,i=c-d-e+b,j.yaw=m(h,i)/l,j.roll=Math.asin(2*g/f)/l,h=2*k.x*this.n-2*k.y*k.z,i=d-c-e+b,j.pitch=m(h,i)/l,o(j.yaw,-1e-5,1e-5)&&(j.yaw=0),o(j.roll,-1e-5,1e-5)&&(j.roll=0),o(j.pitch,-1e-5,1e-5)&&(j.pitch=0),j)},a.Quaternion.prototype.getEulerRoll=function(){var b,c,d,e=this.v,f=(this.n,a.work.radian),g=Math.PI,h=Math.pow,i=a.isBetween;return b=h(this.n,2)+h(e.x,2)+h(e.y,2)+h(e.z,2),c=e.x*e.y+e.z*this.n,c>.499999*b?d=g/2/f:-.499999*b>c?d=-g/2/f:(d=Math.asin(2*c/b)/f,"Element.button2.rotation"===this.name&&console.log(d)),i(d,-1e-5,1e-5)?0:parseFloat(d.toFixed(4))},a.work.workquat={q1:a.makeQuaternion({name:"scrawl.workquat.q1"}),q2:a.makeQuaternion({name:"scrawl.workquat.q2"}),q3:a.makeQuaternion({name:"scrawl.workquat.q3"}),q4:a.makeQuaternion({name:"scrawl.workquat.q4"}),q5:a.makeQuaternion({name:"scrawl.workquat.q5"})},a}(scrawl);