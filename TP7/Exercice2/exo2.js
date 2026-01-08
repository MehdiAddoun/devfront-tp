const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const x = 150;
const y = 200;
const rayon = 90;

const ouverture = Math.PI / 5;
const angleDebut = ouverture;
const angleFin = Math.PI * 2 - ouverture;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.arc(x, y, rayon, angleDebut, angleFin);
ctx.closePath();
ctx.fillStyle = "#f2c400";
ctx.fill();

ctx.beginPath();
ctx.arc(x - 10, y - 40, 14, 0, Math.PI * 2);
ctx.fillStyle = "#fff";
ctx.fill();

ctx.beginPath();
ctx.arc(x - 6, y - 40, 6, 0, Math.PI * 2);
ctx.fillStyle = "#000";
ctx.fill();

ctx.beginPath();
ctx.arc(250, 200, 9, 0, Math.PI * 2);
ctx.fillStyle = "#fff";
ctx.fill();

ctx.beginPath();
ctx.arc(295, 200, 9, 0, Math.PI * 2);
ctx.fillStyle = "#fff";
ctx.fill();
