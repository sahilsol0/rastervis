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
  let dx = x2 - x1;
  let dy = y2 - y1;
  steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);

  xinc = dx / steps;
  yinc = dy / steps;

  let x = x1;
  let y = y1;
  let newli;
  algoContent.innerHTML = "";
  algoContent.innerHTML = `x0,y0 = <b class= "highlighted3">(${x1},${y1})</b>, x1,y1 = <b class ="highlighted2"> (${x2},${y2})</b>, | dx = ${dx}, dy = ${dy} | steps = ${steps} | xinc = ${xinc.toFixed(3)}, yinc = ${yinc.toFixed(3)}`;
  newli = document.createElement(`li`);
  newli.innerHTML = ` ${x.toFixed(3)}+${xinc.toFixed(3)} = ${(x + xinc).toFixed(3)}, ${y.toFixed(3)}+${yinc.toFixed(3)} = ${(y + yinc).toFixed(3)} | <b class = 'highlighted1'>(${Math.round(x)},${Math.round(y)})</b>`;
  algoContent.appendChild(newli);
  newli.lastChild.classList.add("highlighted3");//adds a highlight color for easy understanding
  let ol = algoContent.appendChild(document.createElement("ol"));
  for (let i = 1; i < steps; i++) {
    await sleep(delay);
    drawPoint(Math.round(x + xinc), Math.round(y + yinc), color[2]);
    newli = document.createElement(`li`);
    newli.innerHTML = ` ${x.toFixed(3)}+${xinc.toFixed(3)} = <b>${(x + xinc).toFixed(3)}</b>, ${y.toFixed(3)}+${yinc.toFixed(3)} = <b>${(y + yinc).toFixed(3)}</b> | <b class = 'highlighted1'>(${Math.round(x + xinc)},${Math.round(y + yinc)})</b>`;
    ol.appendChild(newli);
    x += xinc;
    y += yinc;
  }
  newli = document.createElement(`li`);
  newli.innerHTML = ` ${x.toFixed(3)}+${xinc.toFixed(3)} = <b>${(x + xinc).toFixed(3)}</b>, ${y.toFixed(3)}+${yinc.toFixed(3)} = <b>${(y + yinc).toFixed(3)}</b> | <b class = 'highlighted1'>(${Math.round(x + xinc)},${Math.round(y + yinc)})</b>`;
  ol.appendChild(newli);
  ol.lastChild.lastChild.classList.add("highlighted2");
}

async function midPtLine(x1,y1,x2,y2) {
  let deltaX = x2 - x1
  let deltaY = y2 - y1

  let p = 2 * deltaY - deltaX
  
  let deltaP = 2 * (deltaY - deltaX)
  let x = x1
  let y = y1

  drawPoint(x,y,color[2])
  while (x != x2 || y != y2 ) {
    if (p < 0) {
      x++
      p += 2 * deltaY
    } else {
      x++
      y++
      p += deltaP
    }
    await sleep(delay)
    drawPoint(x,y,color[2])
    console.log(x,y,p);
  }
}

async function bresenhamLine(x1,y1,x2,y2) {

  let slope = (y2-y1)/(x2-x1)
  console.log(slope);
  if (slope <= 1 && slope >= 0) {
    let deltaX = x2 - x1
    let deltaY = y2 - y1
    let doubleDeltaY = 2 * deltaY
    let doubleDeltaYX = doubleDeltaY - 2 * deltaX
    
    let p = doubleDeltaY - deltaX
    let y = y1
    
    console.log(deltaX, deltaY, doubleDeltaY, doubleDeltaYX);
    algoContent.innerHTML = ''
    algoContent.innerHTML = `Constants needed: <li>∆x = ${deltaX}</li><li>∆y = ${deltaY}</li><li>2∆y = ${doubleDeltaY}</li><li>2∆xy = ${doubleDeltaYX}</li>`
    
    for (let x = x1+1; x < x2; x++) {
      if (p < 0) {
        p += doubleDeltaY
      } else {
        y++
        p += doubleDeltaYX
      }
      await sleep(delay)
      drawPoint(x,y,color[2])
    }
  } else {
    algoContent.innerHTML = "Slope m > 1 or m < 0...Bresenham line algorithm won't work!!!"
    
  }

  
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
  inpPoint = inpPoint.map(Number)
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

midpointbtn.addEventListener('click', async(e)=>{
  disableAllBtn(true)
  await midPtLine(inpPoint[0], inpPoint[1], inpPoint[2], inpPoint[3]);
  disableAllBtn(false)
})

bresenhambtn.addEventListener('click', async(e)=>{
  disableAllBtn(true)
  await bresenhamLine(inpPoint[0], inpPoint[1], inpPoint[2], inpPoint[3]);
  disableAllBtn(false)
})
