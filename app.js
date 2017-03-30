const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;


function randTime(min, max) {
  return Math.round(Math.random() * (max - min) +  min);
}

function randHoles(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    console.log('same hole');
    return randHoles(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randTime(20, 1000);
  const hole = randHoles(holes);

  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp) peep();
  },time)
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000);
}

 function bonk(e) {
   if(!e.isTrusted) return; //cheater
   score++;
   this.classList.remove('up');
   scoreBoard.textContent = score;
 }


moles.forEach(mole => mole.addEventListener('click', bonk));
