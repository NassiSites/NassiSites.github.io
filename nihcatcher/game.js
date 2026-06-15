const game = document.getElementById("game");

const cup = document.getElementById("cup");

const scoreEl = document.getElementById("score");
const comboEl = document.getElementById("combo");
const levelEl = document.getElementById("level");

const catchSound = new Audio("sounds/catch.mp3");
const missSound = new Audio("sounds/miss.mp3");

catchSound.volume = 0.5;
missSound.volume = 0.5;

let score = 0;
let combo = 0;
let level = 1;

let cupX = window.innerWidth / 2;

const images = [
"assets/object1.jpg",
"assets/object2.webp",
"assets/ayla.png"
];

document.addEventListener("mousemove", e => {

cupX = e.clientX;

cup.style.left = cupX + "px";

});

document.addEventListener("touchmove", e => {

cupX = e.touches[0].clientX;

cup.style.left = cupX + "px";

});

function createParticle(x,y){

for(let i=0;i<12;i++){

const p=document.createElement("div");

p.className="catch-effect";

p.style.left=x+"px";
p.style.top=y+"px";

game.appendChild(p);

setTimeout(()=>{
p.remove();
},700);

}

}

function spawnObject(){

const obj=document.createElement("div");

obj.className="object";

obj.style.backgroundImage=
`url(${images[Math.floor(Math.random()*3)]})`;

obj.style.left=
Math.random()*
(window.innerWidth-100)+"px";

obj.style.top="-80px";

game.appendChild(obj);

let y=-80;

let speed=
2+
(level*0.8);

const fall=setInterval(()=>{

y+=speed;

obj.style.top=y+"px";

const cupRect=cup.getBoundingClientRect();
const objRect=obj.getBoundingClientRect();

if(

objRect.bottom > cupRect.top &&
objRect.left < cupRect.right &&
objRect.right > cupRect.left

){

catchSound.currentTime = 0;
catchSound.play();

score += 10 + combo;

combo++;

if(combo % 10 === 0){

level++;

}

scoreEl.textContent=score;
comboEl.textContent=combo+"x";
levelEl.textContent=level;

createParticle(
objRect.left,
objRect.top
);

obj.remove();

clearInterval(fall);

}

if(y > window.innerHeight){
    
missSound.currentTime = 0;
missSound.play();

combo = 0;

comboEl.textContent="0x";

obj.remove();

clearInterval(fall);

}

},16);

}

setInterval(()=>{

spawnObject();

},700);

document.addEventListener("click", () => {

catchSound.play().then(()=>{
    catchSound.pause();
    catchSound.currentTime = 0;
});

}, { once:true });