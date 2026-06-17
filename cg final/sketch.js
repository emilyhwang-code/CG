const WiW = window.innerWidth, WiH = window.innerHeight
const cnvW = WiW, cnvH = WiH, currentImagesNbr = 352
const totalSlices = 1000
let listSlices = []
let stackSize

function preload() {
  for (let i = 0; i < totalSlices; i++) {
    let imgIndex = (i % currentImagesNbr) + 1
    listSlices[i] = loadImage('./img/tesseract' + imgIndex + '.jpg')
  }
}

let cnv
function setup() {
  cnv = createCanvas(cnvW, cnvH, WEBGL)
  angleMode(DEGREES)
  imageMode(CENTER)
  rectMode(CENTER)
  pixelDensity(1)
  stackSize = floor(totalSlices / 4)
  ortho(-width, width, -height, height, -100000, 100000)
}

let spacing = 50

function draw() {
  background(0)
  blendMode(LIGHTEST)
  orbitControl(2, 2, 2)


  let positions = [
    [0, -1800],
    [0, 1800],
    [-1800, 0],
    [1800, 0]
  ]

  push()
  rotateX(90)
  translate(0, 0, -3000)  // pushes the whole scene away from you

  if (listSlices.length == totalSlices) {
    for (let s = 0; s < 4; s++) {
      push()
      translate(positions[s][0], positions[s][1], -(stackSize / 2) * spacing)

      for (let i = 0; i < stackSize; i++) {
        let imgIndex = s * stackSize + i
        if (imgIndex >= listSlices.length) break

        push()
        stroke('white')
        noFill()
        rect(0, 0, listSlices[imgIndex].width * 1.5, listSlices[imgIndex].height * 1.5)
        translate(0, 0, i * spacing)
        if (floor(map(mouseX, 0, cnvW - 150, 0, stackSize)) == i) {
          tint(255, 255)
        } else {
          tint(255, 127)
        }
        image(listSlices[imgIndex], 0, 0, listSlices[imgIndex].width * 1.5, listSlices[imgIndex].height * 1.5)
        pop()
      }
      pop()
    }
  }
  pop()
}

function mousePressed() {
  let music = document.getElementById('bgMusic')
  music.play()
}