// canvas



const canvasOuter = $('.intro-section');


const bcanvas = $('#banner-canvas')[0];
let w = bcanvas.width = canvasOuter.width();
let h = bcanvas.height = window.innerHeight;
let c = bcanvas.getContext("2d");


// c.beginPath();
// c.ellipse(w/2, h/2 + 100, 100, 50, Math.PI/4, 0, 2 * Math.PI);
// c.stroke();

let circles = [];

function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = '';

	// velocity
	this.dx = (Math.random() - 0.5) * 30;
	this.dy = (Math.random() - 0.5) * 30;
	this.randomColor = function() {
		const colors = ['#7ed6df', '#f6e58d', '#badc58', '#c7ecee', '#eb2f06'];
		this.color = colors[parseInt(Math.random()* colors.length)];
	}
	this.updatePosition = function () {
		if (this.x + this.radius > w || this.x - this.radius < 0) {
			this.randomColor();
			this.dx = -this.dx;
		}
		if (this.y + this.radius > h || this.y - this.radius < 0) {
			this.randomColor();
			this.dy = -this.dy;
		}
		// dx += ax;
		// dy += ay;

		this.x += this.dx;
		this.y += this.dy;
	}
	// #7ed6df
	// #f6e58d
	// #badc58
	// #c7ecee
	// #eb2f06
	this.render = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.strokeStyle = this.color || 'white';
		c.stroke();
	}
	this.move = function(){
		this.updatePosition();
		this.render();
	}
}

function safeRandomPosition(range, padding) {
	let pos = parseInt(Math.random() * range);
	if (pos > range - padding) {
		pos = range - padding;
	} else if (pos < padding) {
		pos = padding;
	}
	return pos;
}

for (let index = 0; index < 80; index++) {
	let radius = 10
	let x = safeRandomPosition(w, radius);
	let y = safeRandomPosition(h, radius);
	let c = new Circle(x, y, radius);
	// c.render();
	circles.push(c);
}

let frame;
function ani(){
	frame = requestAnimationFrame(ani);
	c.clearRect(0, 0, w, h);
	circles.forEach(c=>{
		c.move();
	})
}

ani();
