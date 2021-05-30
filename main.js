"use strict";

const canv = document.getElementById("canv");
var h = canv.height = window.innerHeight;
var w = canv.width = window.innerWidth;
var ctx = canv.getContext("2d");
var virus = [];
var stars = [];
var sPo = w / 2 - 5;
var page = { x: w / 2, y: h * 2 / 3 };
var score = 0;
var health = 100;
var bScore = 0;
var bSText = "Best Score : Not Available!";
var over = false;
var inplay = false;
var viP2 = 2;
var home1 = 0;
var restart = 0;
var hang = 0;
var orType2 = "landscape primary";

virus.push(new Virus());
virus.push(new Virus());
virus.push(new Virus());

function Virus() {
	this.mr = ~~w / 16;
	this.x = ~~rand(this.mr, w - this.mr);
	this.y = ~~rand(this.mr, h - this.mr);
	this.r = 0;
	this.dr = rand(0.00001, 0.00002);
	this.viR = 0;
	this.power = 9;
	this.danger = false;
}
var upDate = function() {
	ctx.clearRect(0, 0, w, h)
	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
	if (!over && inplay) {

		for (let j = 0; j < virus.length; j++) {
			let vir = virus[j];
			vir.viR += .01;
			(vir.r >= vir.mr) ? vir.danger = true: vir.r += 0.09;
			if (vir.power <= 1) {
				virus.splice(j, 1);
				genVir();
			}
			drawVirus(vir);
			let ax = page.x - vir.x;
			let ay = page.y - vir.y;
			let po = ax ** 2 + ay ** 2;
			if (po < vir.r ** 2) { vir.power -= 2 }
			if (vir.danger) { health -= .01; }


		}
		healthDr();
		if (health <= 0) {
			over = true;
			if (score > bScore) {
				bScore = score;
				bSText = "new Score : " + bScore;
			} else {
				bSText = "Best Score : " + bScore;
			}
		}
	} else {
		if ((w / 2) + (w / 4) > page.x && page.x > (w / 2 - w / 4) && (page.y < 11 * h / 12 && page.y > 11 * (h / 12) - (h / 6))) {
			if (page.x < w / 2) {
				if (home1 <= 50) { home1++; }
			} else { if (restart <= 50) { restart++ } }
			if (home1 >= 50) { newGame(false) } else if (restart >= 50) {
				newGame(true);
			}

		} else {
			if (home1 >= 0) {
				home1--;
			}
			if (restart >= 0) {
				restart--;
			}
		}
		ctx.font = "10vW Arial";
		ctx.baseLine = "center";
		ctx.textAlign = "center"
		ctx.fillStyle = "darkRed";
		ctx.fillText("Game Over!", w / 2, h / 2);
		ctx.font = ((h / 6) - (h / 12)) / 2 + "px Arial";
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
		ctx.fillStyle = ctx.strokeStyle = "#FFF";
		ctx.fillText(bSText, 2, h / 12);
		ctx.fillText("Current Score : " + score, 2, h / 6);
		ctx.fillText("Level : " + level, 2, h / 4);
		ctx.font = "5.2vW Arial"
		ctx.textAlign = "center";
		ctx.textBaseline = "bottom";
		ctx.fillText("Home", ((w / 2 - 10) - w / 4) * 5 / 3, (11 * h / 12 - 10));
		ctx.fillText("restart", ((w / 2 + 10) + w / 4) * 5 / 6, 11 * h / 12 - 10);
		ctx.moveTo(0, h / 12);
		ctx.lineTo(w, h / 12);
		ctx.moveTo(0, h / 6);
		ctx.lineTo(w, h / 6);
		ctx.moveTo(0, h / 4);
		ctx.lineTo(w, h / 4);
		ctx.stroke();
		ctx.strokeRect(w / 2 - 4, 11 * h / 12 - 4, -w / 4 - 2, -h / 6 - 2);
		ctx.strokeRect(w / 2 + 4, 11 * h / 12 - 4, w / 4 + 2, -h / 6 - 2);
		ctx.fillStyle = "#00ffff55";
		ctx.fillRect(w / 2 - 5, 11 * h / 12 - 5, -w / 4, (-h / 6) * (~~home1 / 50));
		ctx.fillRect(w / 2 + 5, 11 * h / 12 - 5, w / 4, (-h / 6) * (~~restart / 50));}
	clickedPoint();
}

function healthDr(p) {
	ctx.beginPath();
	ctx.textAlign = "center";
	ctx.fillStyle = (health < 21) ? "#ff000055" : "#00ffff40";
	ctx.fillRect(w / 4, h - 50, (w / 2) * health / 100, 40);
	ctx.fillStyle = "#00ffff40";
	ctx.fillRect(w / 6, 10, (4 * w / 6) * viP / ((level * level) + 1), 30);
	ctx.fillStyle = ctx.strokeStyle = "#ffffff";
	ctx.font = "30px Arial";
	ctx.textBaseline = "bottom";
	ctx.fillText("Health : " + (~~health), w / 2, h - 15);
	ctx.strokeRect(w / 4 - 4, h - 54, w / 2 + 8, 48);
	ctx.strokeRect(w / 6, 10, 4 * w / 6, 30);
	ctx.font = "20px Arial";
	ctx.fillText("Level : " + level, w / 2, 35);
	ctx.fillText("Score : " + score, w / 2, 70);}
function option(){
	let con = confirm("Wellcome everyone!\n\nIf you are not able to Rotate Device\nOr getting an error Then Click\n\nOk\n\nelse Click\n\nCancel\n\n\n")
	if(con){orType2 = screen.orientation.type;}}
var rotate = function() {
	if (hang < 1){
		setTimeout(option,2000);
	}
	hang++
	ctx.clearRect(0, 0, w, h);
	ctx.beginPath();
	ctx.fillStyle = "#be0000";
	ctx.font = w * 9 / 10 + "px arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("⛔", w / 2, h / 2);
	ctx.font = w / 10 + "px cursive";
	ctx.fillText("Rotate Please", w / 2, h / 2 - w / 36);
	ctx.closePath();
	clickedPoint();
}

function home() {
	ctx.clearRect(0, 0, w, h);

	ctx.fillStyle = "#44B933f0";
	ctx.font = "3.5vW Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("by Monu Sharma", w / 2, h - 30);
	ctx.fillText(bSText, w / 2, 5);
	ctx.font = "10vW Arial";
	ctx.textBaseline = "bottom";
	ctx.fillText("KILL VIRUSES", w / 2, h / 2 - 10);
	ctx.strokeStyle = "#44B933F0";
	ctx.fillRect(w / 4 + 1, h / 2 + 1, sPo, 60 - 2);
	ctx.strokeRect(w / 4 - 1, h / 2 - 1, w / 2 + 2, 62);
	ctx.font = "40px Arial";
	ctx.textAlign = "center";
	ctx.fillStyle = "#ffffff77";
	ctx.fillText("START", w / 2, h / 2 + 50);
	if (sPo < ~~w / 2 - 1 && w / 4 - 2 < page.x && page.x < 3 * w / 4 && h / 2 < page.y && page.y < h / 2 + 62) {
		sPo++;
		if (sPo > ~~w / 2 - 2) { inplay = true; }
	} else {
		(sPo > -1) ? sPo-- : inplay = false;
	}
	clickedPoint();
}

for (var i = 0; i < 100; i++) { stars.push(new star()); }

function star() {
	this.x = ~~rand(0, w);
	this.y = ~~rand(0, h);
	this.r = ~~rand(0.1, 5);
	this.draw = function() {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y - this.r);
		ctx.lineTo(this.x - this.r / 4, this.y - this.r / 4);
		ctx.lineTo(this.x - this.r, this.y);
		ctx.lineTo(this.x - this.r / 4, this.y + this.r / 4);
		ctx.lineTo(this.x, this.y + this.r);
		ctx.lineTo(this.x + this.r / 4, this.y + this.r / 4);
		ctx.lineTo(this.x + this.r, this.y);
		ctx.lineTo(this.x + this.r / 4, this.y - this.r / 4);
		ctx.lineTo(this.x, this.y - this.r);
		ctx.closePath();
		ctx.fillStyle = "#ffffff77";
		ctx.fill();
	}

}

function newGame(b) {
	virus = [new Virus(), new Virus(), new Virus(), new Virus()];
	viP = 0;
	score = 0;
	level = 1;
	health = 100;
	over = false;
	inplay = b;

}

function drawVirus(p) {
	ctx.beginPath();
	ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
	ctx.fill();
	for (var s = 0; s < 9; s++) {
		var a = (Math.PI * 2 / 9) * s + p.viR;

		ctx.moveTo(p.x + Math.sin(a + .1) * p.r, p.y + Math.cos(a + .1) * p.r);
		ctx.lineTo(p.x + Math.sin(a) * p.r * 1.4, p.y + Math.cos(a) * p.r * 1.4);
		ctx.quadraticCurveTo(p.x + Math.sin(a + .15) * p.r * 2, p.y + Math.cos(a + .15) * p.r * 2, p.x + Math.sin(a + .3) * p.r * 1.4, p.y + Math.cos(a + .3) * p.r * 1.4);
		ctx.lineTo(p.x + Math.sin(a + .2) * p.r, p.y + Math.cos(a + .2) * p.r);
	}
	let grd = ctx.createRadialGradient(p.x, p.y, p.r / 2, p.x, p.y, p.r * 2);
	var c1s = "#0000ff" + p.power + "9";
	(p.danger) ? c1s = "#ff0000" + p.power + "9": c1s;;
	grd.addColorStop(0, c1s);
	grd.addColorStop(1, "#f40000" + p.power + "9");
	ctx.fillStyle = grd;
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(p.x + p.r / 2.3, p.y - p.r / 3, p.r / 4, -Math.PI, Math.PI);
	ctx.arc(p.x - p.r / 2.3, p.y - p.r / 3, p.r / 4, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(p.x, p.y, p.r / 2.3, 0.25 * Math.PI, .75 * Math.PI);
	ctx.stroke();
}


function animate() {
	let orType = screen.orientation.type;
	if (!(orType == orType2)) { rotate(); } else {
		(inplay) ? upDate(): home();
	}
	window.requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
	window.location.reload(true);
});
window.addEventListener("touchstart", (e) => {
//	e.preventDefault();
	points(e.touches[0]);
}, false);
window.addEventListener("touchend", (e) => {
//	e.preventDefault();

}, false);
window.addEventListener("touchmove", (e) => {
//	e.preventDefault();
	points(e.touches[0]);
}, false);
window.addEventListener("mousemove", (e) => {
	points(e);
}, false);
var points = function(e) {
	page = { x: e.pageX, y: e.pageY }
}

function clickedPoint() {
	ctx.beginPath();
	ctx.lineCap = ctx.lineJoin = "round";
	ctx.moveTo(page.x, page.y - 15);
	ctx.lineTo(page.x, page.y + 15);
	ctx.lineTo(page.x, page.y);
	ctx.lineTo(page.x - 15, page.y);
	ctx.lineTo(page.x + 15, page.y);
	ctx.strokeStyle = "white";
	ctx.arc(page.x, page.y, 10, 0, 2 * Math.PI);
	ctx.stroke();
}
var viP = 0,
	level = 1,
	viP2;

function genVir(p) {
	var viP2 = level * level;
	if (viP > viP2) {

		viP = 0;
		level++;

		virus.push(new Virus());
	} else {
		viP++;
	}
	score += level;
	setTimeout(() => { virus.push(new Virus()) }, 4000 / level);
}

function rand(min, max) { return Math.random() * (max - min + 1) + min; }
