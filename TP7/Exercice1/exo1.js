function effacer(ctx, largeur, hauteur){
  ctx.clearRect(0, 0, largeur, hauteur);
}

function dessinerCible(canvas){
  const ctx = canvas.getContext("2d");
  effacer(ctx, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const rayons = [130, 110, 90, 70, 50, 30];
  for(let i = 0; i < rayons.length; i++){
    ctx.beginPath();
    ctx.arc(cx, cy, rayons[i], 0, Math.PI * 2);
    ctx.fillStyle = (i % 2 === 0) ? "#000" : "#fff";
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fillStyle = "#d40000";
  ctx.fill();
}

function dessinerGrille(ctx, x, y, colonnes, lignes, tailleCase){
  ctx.strokeStyle = "#cfcfcf";
  ctx.lineWidth = 1;

  for(let c = 0; c <= colonnes; c++){
    ctx.beginPath();
    ctx.moveTo(x + c * tailleCase, y);
    ctx.lineTo(x + c * tailleCase, y + lignes * tailleCase);
    ctx.stroke();
  }

  for(let l = 0; l <= lignes; l++){
    ctx.beginPath();
    ctx.moveTo(x, y + l * tailleCase);
    ctx.lineTo(x + colonnes * tailleCase, y + l * tailleCase);
    ctx.stroke();
  }
}

function fairePoint(gx, gy, taille){
  return function(col, lig){
    return { x: gx + col * taille, y: gy + lig * taille };
  };
}

function dessinerPoule(canvas){
  const ctx = canvas.getContext("2d");
  effacer(ctx, canvas.width, canvas.height);

  const taille = 26;
  const colonnes = 10;
  const lignes = 10;

  const gx = (canvas.width  - colonnes * taille) / 2;
  const gy = (canvas.height - lignes   * taille) / 2;

  dessinerGrille(ctx, gx, gy, colonnes, lignes, taille);
  const P = fairePoint(gx, gy, taille);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const contour = [
    P(1.6, 3.0),
    P(3.0, 2.4),
    P(4.6, 2.4),
    P(5.4, 3.2),
    P(6.0, 3.8),
    P(7.8, 3.8),
    P(8.8, 2.8),
    P(8.8, 4.3),
    P(9.5, 4.3),
    P(8.9, 5.0),
    P(9.6, 5.6),
    P(8.9, 6.2),
    P(7.7, 7.4),
    P(6.0, 7.4),
    P(5.2, 6.6),
    P(5.2, 5.3),
    P(4.2, 4.1),
    P(3.0, 3.1)
  ];

  ctx.beginPath();
  ctx.moveTo(contour[0].x, contour[0].y);
  for(let i = 1; i < contour.length; i++){
    ctx.lineTo(contour[i].x, contour[i].y);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(P(4.2, 2.4).x, P(4.2, 2.4).y);
  ctx.lineTo(P(4.35, 1.9).x, P(4.35, 1.9).y);
  ctx.lineTo(P(4.5, 2.4).x, P(4.5, 2.4).y);
  ctx.lineTo(P(4.65, 1.9).x, P(4.65, 1.9).y);
  ctx.lineTo(P(4.8, 2.4).x, P(4.8, 2.4).y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(P(3.7, 2.8).x, P(3.7, 2.8).y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();

  function patte(col){
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(P(col, 7.4).x, P(col, 7.4).y);
    ctx.lineTo(P(col, 8.6).x, P(col, 8.6).y);
    ctx.stroke();

    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(P(col, 8.6).x, P(col, 8.6).y);
    ctx.lineTo(P(col - 0.45, 8.95).x, P(col - 0.45, 8.95).y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(P(col, 8.6).x, P(col, 8.6).y);
    ctx.lineTo(P(col + 0.45, 8.95).x, P(col + 0.45, 8.95).y);
    ctx.stroke();
  }

  patte(6.2);
  patte(7.4);
}

function dessinerDamier(canvas){
  const ctx = canvas.getContext("2d");
  effacer(ctx, canvas.width, canvas.height);

  const n = 10;
  const marge = 18;
  const taille = Math.floor((canvas.width - marge * 2) / n);

  const largeur = n * taille;
  const x0 = Math.floor((canvas.width - largeur) / 2);
  const y0 = Math.floor((canvas.height - largeur) / 2);

  for(let ligne = 0; ligne < n; ligne++){
    for(let col = 0; col < n; col++){
      ctx.fillStyle = ((ligne + col) % 2 === 0) ? "#000" : "#fff";
      ctx.fillRect(x0 + col * taille, y0 + ligne * taille, taille, taille);
    }
  }

  ctx.strokeStyle = "#777";
  ctx.lineWidth = 2;
  ctx.strokeRect(x0, y0, largeur, largeur);
}

function dessinerCourbes(canvas){
  const ctx = canvas.getContext("2d");
  effacer(ctx, canvas.width, canvas.height);

  const marge = 16;
  const taille = canvas.width - marge * 2;

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.strokeRect(marge, marge, taille, taille);

  const pas = 10;
  for(let i = 0; i <= taille; i += pas){
    ctx.beginPath();
    ctx.moveTo(marge, marge + i);
    ctx.lineTo(marge + i, marge + taille);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(marge + i, marge);
    ctx.lineTo(marge + taille, marge + i);
    ctx.stroke();
  }
}

let indexFigure = 0;
const figures = [dessinerCible, dessinerPoule, dessinerDamier, dessinerCourbes];

function afficherCarrousel(){
  const canvas = document.getElementById("carrousel");
  const ctx = canvas.getContext("2d");
  effacer(ctx, canvas.width, canvas.height);
  figures[indexFigure](canvas);
}

dessinerCible(document.getElementById("cible"));
dessinerPoule(document.getElementById("poule"));
dessinerDamier(document.getElementById("damier"));
dessinerCourbes(document.getElementById("courbes"));

afficherCarrousel();

document.getElementById("boutonSuivant").addEventListener("click", function(){
  indexFigure++;
  if(indexFigure >= figures.length){
    indexFigure = 0;
  }
  afficherCarrousel();
});
