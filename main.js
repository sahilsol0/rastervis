const grid = document.getElementById("grid");
const randomBtn = document.getElementById("random-btn");
const points = document.getElementById("points");
const speed = document.getElementById("speed");
const algoContent = document.getElementById("algo-content");
const ddabtn = document.getElementById('ddabtn');
const midpointbtn = document.getElementById('midbtn');
const bresenhambtn = document.getElementById('bresenhambtn');

let HEIGHT = 30;
let cell, inpPoint;
let delay = 800 / speed.value;

const color = ["#FF7D00", "#15616D", "#FFECD1", "#001524"];

grid.style.display = "grid";

function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function sleep(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function disableAllBtn(bool){
  randomBtn.disabled = bool;
  points.disabled = bool;
  ddabtn.disabled = bool;
  midpointbtn.disabled = bool;
  bresenhambtn.disabled = bool;
}

function drawPoint(x, y, color) {
  let c = document.getElementById("cell(" + x + "," + y + ")");
  c.style.background = color;
}

function drawGrid(height, cell, grid) {
  grid.innerHTML = "";
  const cellSize = parseInt(grid.offsetWidth.width / height);
  grid.style.gridTemplateColumns = `repeat(${height},1fr)`;
  for (let i = height - 1; i >= 0; i--) {
    for (let j = 0; j < height; j++) {
      cell = document.createElement("div");
      cell.style.height = `${cellSize}px`;
      cell.style.width = `${cellSize}px`;
      cell.classList.add("cells");
      cell.setAttribute("id", `cell(${j},${i})`);
      cell.style.background = color[3];
      grid.appendChild(cell);
    }
  }
}

async function ddaLine(x1, y1, x2, y2) {
  let dx = parseInt(x2) - parseInt(x1);
  let dy = parseInt(y2) - parseInt(y1);
  steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);

  xinc = dx / steps;
  yinc = dy / steps;

  let x = parseInt(x1);
  let y = parseInt(y1);
  let newli;
  algoContent.innerHTML = "";
  algoContent.innerHTML = `x0,y0 = <b class= "highlighted3">(${x1},${y1})</b>, x1,y1 = <b class ="highlighted2"> (${x2},${y2})</b>, | dx = ${dx}, dy = ${dy} | steps = ${steps} | xinc = ${xinc.toFixed(3)}, yinc = ${yinc.toFixed(3)}`;
  newli = document.createElement(`li`);
  newli.innerHTML = `${x.toFixed(3)}+${xinc.toFixed(3)} = ${(x + xinc).toFixed(3)}, ${y.toFixed(3)}+${yinc.toFixed(3)} = ${(y + yinc).toFixed(3)} | <b class = 'highlighted1'>(${Math.round(x)},${Math.round(y)})</b>`;
  algoContent.appendChild(newli);
  newli.lastChild.classList.add("highlighted3");//adds a highlight color for easy understanding
  let ol = algoContent.appendChild(document.createElement("ol"));
  for (let i = 1; i < steps; i++) {
    await sleep(delay);
    drawPoint(Math.round(x + xinc), Math.round(y + yinc), color[2]);
    newli = document.createElement(`li`);
    newli.innerHTML = `${x.toFixed(3)}+${xinc.toFixed(3)} = <b>${(x + xinc).toFixed(3)}</b>, ${y.toFixed(3)}+${yinc.toFixed(3)} = <b>${(y + yinc).toFixed(3)}</b> | <b class = 'highlighted1'>(${Math.round(x + xinc)},${Math.round(y + yinc)})</b>`;
    ol.appendChild(newli);
    x += xinc;
    y += yinc;
  }
  newli = document.createElement(`li`);
  newli.innerHTML = `${x.toFixed(3)}+${xinc.toFixed(3)} = <b>${(x + xinc).toFixed(3)}</b>, ${y.toFixed(3)}+${yinc.toFixed(3)} = <b>${(y + yinc).toFixed(3)}</b> | <b class = 'highlighted1'>(${Math.round(x + xinc)},${Math.round(y + yinc)})</b>`;
  ol.appendChild(newli);
  ol.lastChild.lastChild.classList.add("highlighted2");
}

function midPtLine(x1,y1,x2,y2) {
  
}

drawGrid(HEIGHT, cell, grid);

randomBtn.addEventListener("click",(e) => {
  grid.childNodes.forEach((node) => {
    node.style.background = color[3];
  });
  inpPoint = [
    randomIntInRange(0, HEIGHT),
    randomIntInRange(0, HEIGHT),
    randomIntInRange(0, HEIGHT),
    randomIntInRange(0, HEIGHT),
  ];
  drawPoint(inpPoint[0], inpPoint[1], color[0]);
  drawPoint(inpPoint[2], inpPoint[3], color[1]);
});

points.addEventListener("change", (e) => {
  grid.childNodes.forEach((node) => {
    node.style.background = color[3];
  });
  inpPoint = e.target.value.split(",");
  drawPoint(inpPoint[0], inpPoint[1], color[0]);
  drawPoint(inpPoint[2], inpPoint[3], color[1]);
});

speed.addEventListener("change", (e) => {
  delay = Math.floor(800 / e.target.value);
});

ddabtn.addEventListener('click', async(e)=>{
  disableAllBtn(true)
  await ddaLine(inpPoint[0], inpPoint[1], inpPoint[2], inpPoint[3]);
  disableAllBtn(false)
})