const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const brushSizeInput = document.getElementById("size");
const colorInput = document.getElementById("color");
const brushButton = document.getElementById("brush");
const eraserButton = document.getElementById("eraser");
const clearButton = document.getElementById("clear");
const mouseBrush = document.getElementById("mouse-brush");

let painting = false;
let erasing = false;

// Brush size (limité entre 1 et 10)
let brushSize = 5;
brushSizeInput.addEventListener("input", (event) => {
    brushSize = Math.max(1, event.target.value);
});

// Current color
let currentColor = "#000000";
colorInput.addEventListener("input", (event) => {
    currentColor = event.target.value;
});

// Brush
brushButton.addEventListener("click", () => {
    erasing = false;
    brushButton.classList.add("btn-active");
    eraserButton.classList.remove("btn-active");
    canvas.style.cursor = "none"; // Désactiver le curseur natif
    mouseBrush.classList.add("brush-cursor");
    mouseBrush.classList.remove("eraser-cursor");
});

// Eraser
eraserButton.addEventListener("click", () => {
    erasing = true;
    eraserButton.classList.add("btn-active");
    brushButton.classList.remove("btn-active");
    canvas.style.cursor = "none"; // Désactiver le curseur natif
    mouseBrush.classList.remove("brush-cursor");
});

// Clear
clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Mouse events
canvas.addEventListener("mousedown", (event) => {
    painting = true;
    if (!erasing) draw(event);
});

canvas.addEventListener("mouseup", () => {
    painting = false;
    ctx.beginPath();
    mouseBrush.style.display = "none"; // Cacher le pinceau lorsque le dessin est terminé
});

canvas.addEventListener("mousemove", (event) => {
    if (painting && !erasing) {
        draw(event);
    } else if (erasing) {
        erase(event);
    }
    updateMouseBrush(event);
});

function draw(event) {
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor;

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function erase(event) {
    ctx.clearRect(event.clientX - canvas.offsetLeft - brushSize / 2, 0, brushSize, canvas.height);
}

// Met à jour la position de la gomme
function updateMouseBrush(event) {
    mouseBrush.style.left = (event.clientX - mouseBrush.offsetWidth / 2) + "px"; // Centré horizontalement
    mouseBrush.style.top = (event.clientY - mouseBrush.offsetHeight / 2) + "px"; // Centré verticalement
    mouseBrush.style.height = "20px"; // Hauteur de la gomme, ajustable
    mouseBrush.style.display = "block"; // Afficher la gomme
}

// Cacher le pinceau lorsque la souris quitte le canevas
canvas.addEventListener("mouseleave", () => {
    mouseBrush.style.display = "none";
});
