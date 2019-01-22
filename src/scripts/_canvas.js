// canvas



// const canvasOuter = $('.intro-section');


// const bcanvas = $('#banner-canvas')[0];
// let w = bcanvas.width = canvasOuter.width();
// let h = bcanvas.height = window.innerHeight;
// let c = bcanvas.getContext("2d");

// function updateTheCavas() {
// 	$(window).resize(function () {

// 	})
// }




let Banner = {
	// properties
	numbOfParticles: 200,
	radius: 3,
	paticles: [],
	canvasOuter: $('.intro-section'),
	bcanvas: $('#banner-canvas')[0],
	w: null,
	h: null,
	c: null,
	frame: null,
	// methods
	resizeCavas: function () {
		let _this =  this;
		$(window).resize(function() {
			_this.updateSizeCanvas();
		})
	},
	updateSizeCanvas: function(){
		this.w = this.bcanvas.width = this.canvasOuter.width();
		this.h = this.bcanvas.height = window.innerHeight;
	},
	animate: function () {
		let animateFunc = (this.animate).bind(this);
		this.frame = requestAnimationFrame(animateFunc);
		this.c.clearRect(0, 0, this.w, this.h);
		this.paticles.forEach(paticle => {
			paticle.move(this.w, this.h, this.c);
		})
	},
	setup: function () {
		this.resizeCavas();
		this.updateSizeCanvas();
			// init
			this.c = this.bcanvas.getContext("2d");
		const numb = this.numbOfParticles

		// create particles
		for (let index = 0; index < numb; index++) {
			let x = safeRandomPosition(this.w, this.radius);
			let y = safeRandomPosition(this.h, this.radius);
			let p = new Circle(x, y, this.radius);
			this.paticles.push(p);
		}
		// run
		this.animate();
	}
}



Banner.setup();


function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = '';

	// velocity
	this.dx = (Math.random() - 0.5) * 20;
	this.dy = (Math.random() - 0.5) * 20;
	this.randomColor = function () {
		const colors = ['#7ed6df', '#f6e58d', '#badc58', '#c7ecee', '#eb2f06'];
		this.color = colors[parseInt(Math.random() * colors.length)];
	}
	this.updatePosition = function (w, h) {
		if (this.x + this.radius > w || this.x - this.radius < 0) {
			this.randomColor();
			this.dx = -this.dx;
		}
		if (this.y + this.radius > h || this.y - this.radius < 0) {
			this.randomColor();
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
	}

	this.render = function (c) {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.strokeStyle = this.color || 'white';
		c.stroke();
	}
	this.move = function (w, h, c) {
		this.updatePosition(w, h);
		this.render(c);
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


