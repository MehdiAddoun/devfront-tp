const canvas = document.getElementById("zoneJeu");
const contexte = canvas.getContext("2d");

const imageFond = new Image();
imageFond.src = "images/fond.png";

const imageMario = new Image();
imageMario.src = "images/mario.png";

let decalageFond = 0;
const vitesseFond = 2;

const tailleTuile = 92;

let imageMarioIndex = 0;
let tempsDerniereImage = 0;
const delaiImage = 90;

const largeurMario = 80;
const hauteurMario = 80;
const marioX = 220;
const marioY = 300;

function dessinerFond(){
  contexte.drawImage(imageFond, decalageFond, 0);
  contexte.drawImage(imageFond, decalageFond + canvas.width, 0);
}

function dessinerMario(){
  const sourceX = imageMarioIndex * tailleTuile;
  const sourceY = 0;

  contexte.imageSmoothingEnabled = false;
  contexte.drawImage(
    imageMario,
    sourceX, sourceY, tailleTuile, tailleTuile,
    marioX, marioY, largeurMario, hauteurMario
  );
}

function boucle(temps){
  if(!imageFond.complete || !imageMario.complete){
    requestAnimationFrame(boucle);
    return;
  }

  decalageFond -= vitesseFond;
  if(decalageFond <= -canvas.width){
    decalageFond = 0;
  }

  if(temps - tempsDerniereImage > delaiImage){
    imageMarioIndex = (imageMarioIndex + 1) % 5;
    tempsDerniereImage = temps;
  }

  contexte.clearRect(0, 0, canvas.width, canvas.height);
  dessinerFond();
  dessinerMario();

  requestAnimationFrame(boucle);
}

requestAnimationFrame(boucle);
