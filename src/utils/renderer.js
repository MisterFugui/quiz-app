// src/utils/renderer.js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const RENDERER = {
  POINT_INTERVAL: 6,
  SPRING_CONSTANT: 0.02,
  SPRING_FRICTION: 0.92,
  WAVE_SPREAD: 0.25,
  FISH_COUNT: 2,
  MAX_INTERVAL_COUNT: 80,
  INIT_HEIGHT_RATE: 0.5,
  THRESHOLD: 50,

  init() {
    this.container = document.getElementById('flying-fish-container');
    this.canvas    = document.createElement('canvas');
    this.ctx       = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);

    window.addEventListener('resize', debounce(() => this.setup(), 200));
    this.container.addEventListener('click', () => this.reverseVertical());
    this.container.addEventListener('mouseenter', e => this.prevAxis = this.getMouseAxis(e));
    this.container.addEventListener('mousemove',  e => this.onMouseMove(e));

    this.setup();
    this.renderLoop();
  },

  setup() {
    this.width  = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.canvas.width  = this.width;
    this.canvas.height = this.height;

    this.points        = [];
    this.fishes        = [];
    this.intervalCount = this.MAX_INTERVAL_COUNT;
    this.reverse       = false;

    this.createSurfacePoints();
    this.fishes.push(new FISH(this));
  },

  createSurfacePoints() {
    const cnt = Math.round(this.width / this.POINT_INTERVAL);
    this.pointInterval = this.width / (cnt - 1);
    for (let i = 0; i < cnt; i++) {
      const pt = new SURFACE_POINT(this, i * this.pointInterval);
      if (i > 0) {
        pt.setPrevious(this.points[i-1]);
        this.points[i-1].setNext(pt);
      }
      this.points.push(pt);
    }
  },

  getMouseAxis(e) {
    const r = this.container.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  },

  onMouseMove(e) {
    const a = this.getMouseAxis(e);
    if (this.prevAxis) {
      this.generateEpicenter(a.x, a.y, a.y - this.prevAxis.y);
    }
    this.prevAxis = a;
  },

  generateEpicenter(x, y, v) {
    if (y < this.height/2 - this.THRESHOLD || y > this.height/2 + this.THRESHOLD) return;
    const idx = Math.round(x / this.pointInterval);
    if (idx >= 0 && idx < this.points.length) {
      this.points[idx].interfere(y, v);
    }
  },

  reverseVertical() {
    this.reverse = !this.reverse;
    this.fishes.forEach(f => f.reverseVertical());
  },

  control() {
    this.points.forEach(pt => pt.updateSelf());
    this.points.forEach(pt => pt.updateNeighbors());
    const maxFish = this.FISH_COUNT * (this.width/500) * (this.height/500);
    if (this.fishes.length < maxFish && --this.intervalCount <= 0) {
      this.intervalCount = this.MAX_INTERVAL_COUNT;
      this.fishes.push(new FISH(this));
    }
  },

  renderLoop() {
    requestAnimationFrame(() => this.renderLoop());
    this.control();
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.fishes.forEach(f => f.render(this.ctx));

    // —— 底部水域原色渐变 ——
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'xor';
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    grad.addColorStop(0,   'rgba(255,255,255,0)');
    grad.addColorStop(0.7, 'rgba(245,245,245,0.2)');
    grad.addColorStop(1,   'rgba(230,230,230,0.4)');
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.reverse ? 0 : this.height);
    this.points.forEach(pt => pt.render(this.ctx));
    this.ctx.lineTo(this.width, this.reverse ? 0 : this.height);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }
};

// 弹簧点
function SURFACE_POINT(renderer, x) {
  this.renderer = renderer; this.x = x; this.init();
}
SURFACE_POINT.prototype = {
  SPRING_CONSTANT: 0.02,
  SPRING_FRICTION: 0.92,
  WAVE_SPREAD: 0.25,
  ACCELERATION_RATE: 0.01,
  init() {
    this.initHeight = this.renderer.height * this.renderer.INIT_HEIGHT_RATE;
    this.height     = this.initHeight;
    this.fy         = 0;
    this.force      = { previous:0, next:0 };
  },
  setPrevious(p){ this.previous = p },
  setNext(n){ this.next = n },
  interfere(y,v){
    this.fy = this.renderer.height * this.ACCELERATION_RATE
            * Math.sign(this.initHeight - y)
            * Math.abs(v);
  },
  updateSelf(){
    this.fy += this.SPRING_CONSTANT*(this.initHeight - this.height);
    this.fy *= this.SPRING_FRICTION;
    this.height += this.fy;
  },
  updateNeighbors(){
    if(this.previous) this.force.previous = this.WAVE_SPREAD*(this.height - this.previous.height);
    if(this.next)     this.force.next     = this.WAVE_SPREAD*(this.height - this.next.height);
  },
  render(ctx){
    if(this.previous){
      this.previous.height += this.force.previous;
      this.previous.fy     += this.force.previous;
    }
    if(this.next){
      this.next.height += this.force.next;
      this.next.fy     += this.force.next;
    }
    ctx.lineTo(this.x, this.renderer.height - this.height);
  }
};

// 飞鱼
function FISH(renderer){
  this.renderer = renderer;
  this.GRAVITY  = 0.4;
  this.init();
}
FISH.prototype = {
  init(){
    this.direction = Math.random()<0.5;
    this.x = this.direction
           ? this.renderer.width  + this.renderer.THRESHOLD
           : -this.renderer.THRESHOLD;
    this.vx = (4+Math.random()*6)*(this.direction?-1:1);

    if(this.renderer.reverse){
      this.y  = this.randomBetween(this.renderer.height*0.1, this.renderer.height*0.4);
      this.vy = 2 + Math.random()*3;
      this.ay = 0.05 + Math.random()*0.15;
    } else {
      this.y  = this.randomBetween(this.renderer.height*0.6, this.renderer.height*0.9);
      this.vy = -(2 + Math.random()*3);
      this.ay = -(0.05 + Math.random()*0.15);
    }
    this.previousY = this.y;
    this.theta     = 0; this.phi = 0; this.isOut = false;
  },
  randomBetween(a,b){ return a + (b-a)*Math.random() },
  reverseVertical(){ this.ay *= -1 },
  controlStatus(){
    this.previousY = this.y;
    this.x += this.vx; this.y += this.vy; this.vy += this.ay;

    const b = this.renderer.height * this.renderer.INIT_HEIGHT_RATE;
    if((this.renderer.reverse && this.y>b) || (!this.renderer.reverse && this.y<b)){
      this.vy += this.renderer.reverse?-this.GRAVITY:this.GRAVITY;
      this.isOut = true;
    } else if(this.isOut){
      this.ay *= -1; this.isOut = false;
    }
    this.theta = (this.theta+Math.PI/20)%(2*Math.PI);
    this.phi   = (this.phi  +Math.PI/30)%(2*Math.PI);

    this.renderer.generateEpicenter(
      this.x + (this.direction?-this.renderer.THRESHOLD:this.renderer.THRESHOLD),
      this.y,
      this.y-this.previousY
    );

    if(this.x < -this.renderer.THRESHOLD ||
       this.x > this.renderer.width+this.renderer.THRESHOLD) {
      this.init();
    }
  },
  render(ctx){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(Math.PI+Math.atan2(this.vy,this.vx));
    ctx.scale(1,this.direction?1:-1);
    ctx.fillStyle='hsl(0,0%,95%)';
    ctx.beginPath();
    ctx.moveTo(-30,0);
    ctx.bezierCurveTo(-20,15,15,10,40,0);
    ctx.bezierCurveTo(15,-10,-20,-15,-30,0);
    ctx.fill();
    ctx.restore();

    this.controlStatus();
  }
};

export default RENDERER;
