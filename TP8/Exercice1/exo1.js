const canvas = document.getElementById("zoneJeu");
const contexte = canvas.getContext("2d");

const imagePelouse = new Image();
imagePelouse.src = "images/pelouse.png";

const imageSprites = new Image();
imageSprites.src = "images/sprites.png";

let positionX = 240;
let positionY = 240;

const largeurPersonnage = 48;
const hauteurPersonnage = 48;

const tailleTuile = 128;

let ligneDirection = 0;

let colonneImage = 0;

const pasDeplacement = 12;

function dessinerFond(){
  for(let y = 0; y < canvas.height; y += imagePelouse.height){
    for(let x = 0; x < canvas.width; x += imagePelouse.width){
      contexte.drawImage(imagePelouse, x, y);
    }
  }
}

function dessinerPersonnage(){
  const sourceX = colonneImage * tailleTuile;
  const sourceY = ligneDirection * tailleTuile;

  contexte.imageSmoothingEnabled = false;
  contexte.drawImage(
    imageSprites,
    sourceX, sourceY, tailleTuile, tailleTuile,
    positionX, positionY, largeurPersonnage, hauteurPersonnage
  );
}

function dessiner(){
  if(!imagePelouse.complete || !imageSprites.complete){
    return;
  }

  contexte.clearRect(0, 0, canvas.width, canvas.height);
  dessinerFond();
  dessinerPersonnage();
}

function bloquerDansCanvas(){
  if(positionX < 0) positionX = 0;
  if(positionY < 0) positionY = 0;

  const maxX = canvas.width - largeurPersonnage;
  const maxY = canvas.height - hauteurPersonnage;

  if(positionX > maxX) positionX = maxX;
  if(positionY > maxY) positionY = maxY;
}

window.addEventListener("keydown", function(e){
  if(!imageSprites.complete) return;

  let aBouge = false;

  if(e.key === "ArrowUp"){
    ligneDirection = 1;
    positionY -= pasDeplacement;
    aBouge = true;
  }else if(e.key === "ArrowDown"){
    ligneDirection = 0;
    positionY += pasDeplacement;
    aBouge = true;
  }else if(e.key === "ArrowLeft"){
    ligneDirection = 3;
    positionX -= pasDeplacement;
    aBouge = true;
  }else if(e.key === "ArrowRight"){
    ligneDirection = 2;
    positionX += pasDeplacement;
    aBouge = true;
  }

  if(aBouge){
    e.preventDefault();
    bloquerDansCanvas();
    colonneImage = (colonneImage + 1) % 4;
    dessiner();
  }
}, { passive:false });

imagePelouse.onload = dessiner;
imageSprites.onload = dessiner;
