
const WORDS = [ "game", "day", "java", "script", "rainbow", "program", 
"bunny", "youtube", "github", "computer", "database" , "network", "kurdistan", "ranya", "mergasor", "oop",
 "compiler", "system", "html", "css", "nodejs", "happy", "sad", "teacher", "people", "student", "mouse", 
 "keyboard", "screen", "mobile", "picture", "father", "mother", "brother", "sister"];

var focus; // Astroid the player is currently typing out
var field = [];

var score = 0;

var ship; // color of ship
var backgroundImg;
var stoneImg;
var roboto;

var mode;

function setup() {

  mode=0;
  createCanvas(450, 600);
  canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid #26e3c2; border-radius: 20px; box-shadow: 0 0 10px #26e3c2;";
 
  reloadBtn = createButton('Restart', 'value'); //Creates <button>
  reloadBtn.position(850, 750); //Sets Location Of Button
  reloadBtn.addClass('startBtn');
  reloadBtn.mousePressed(resetGame);

  reloadBtn = createButton('Start', 'value'); //Creates <button>
  reloadBtn.position(980, 750); //Sets Location Of Button
  reloadBtn.addClass('startBtn');
  reloadBtn.mousePressed(startGame);

  ship = loadImage('assets/spaceship.png');
  backgroundImg = loadImage('assets/background.png');
  
  const rndInt = Math.floor(Math.random() * 10) + 1;
  stoneImg = loadImage('assets/Meteors/Meteor_'+rndInt+'.png');
 
  field.push(new Asteroid(random(width - 150) + 75, 0, random(WORDS), stoneImg));
  roboto = loadFont('/assets/font/roboto.ttf');

  focus = null;
}

function resetGame(){
  location.reload();
}

function startGame(){
  mode=1;
}


function draw() {


  if(mode === 0){

    textSize(34);
    text('Press start button', 90, 300);
    fill(38, 227, 194);

  }else if(mode === 1){
    
    background(0);
      
    drawBase();
    drawLazer();
    drawScore();

    handleField();
  }
  
}

function keyPressed() {
  if (keyCode === enter) {
    mode = 1;
  }
}

/**
 * updates & draws Astroids
 * manages field array
 * increments score
 * manages focus
 * creates Asteroids
 */
function handleField() {

	for (var i = field.length - 1; i >= 0; i--) {

    field[i].update();

    if (field[i].intact) {
			// astroid is still on-screen

			field[i].draw();
		} else {
			// Astroid has been destroyed

      score += field[i].text.length;
      field.splice(i, 1); // delete from array
      focus = null;
    }
  }


	/* attempt new Astroid */
  if (frameCount % 60 === 0) { // every second

		if (random() > map(score, 0, 1000, 0.8, 0.01)) { // more difficult as game progresses
      const rndInt = Math.floor(Math.random() * 10) + 1;
      stoneImg = loadImage('assets/Meteors/Meteor_'+rndInt+'.png');
      
			field.push(new Asteroid(random(width - 150) + 75, 0, random(WORDS), stoneImg));
		}
	}
}

/**
 * handles user input
 */
function keyPressed() {

  if (focus) {
		// if we have honed in on a specific Asteroid

    focus.erode(keyCode);
  } else {
		// find the astroid to target

    focus = findAsteroid(keyCode, field);

    if (focus) {
      focus.erode(keyCode);
    }
  }
}

/**
 * draws planet as a rectangle
 * draws "ground control" as a triangle
 */
function drawBase() {

  /* planet */
  // fill(planetMantle);
  // stroke(planetCrust);
  // strokeWeight(5);
  // rect(0, height - 15, width, height);
  background(backgroundImg);
  /* ground control */
  image(ship,200,500,50, 50);
  //stroke(255);
  // beginShape();
  // vertex(width / 2 - 20, height);
  // vertex(width / 2, height - 50);
  // vertex(width / 2 + 20, height);
  endShape(CLOSE);
}

/**
 * draws "lazer" between ground control and Asteroid
 */
function drawLazer() {

  if (!focus)
    return;

  stroke(randomColor());
  strokeWeight(focus.completedText.length); // width of line depends on progress

	// point of ground control
  line(width / 2, height - 100, focus.position.x, focus.position.y);

  fill(255);
  noStroke();
  textAlign(LEFT);
  textSize(30);
  text(focus.completedText, 10, height - 40);
}

/**
 * draws the score
 */
function drawScore() {

  textAlign(RIGHT);
  noStroke();
  textSize(30);
  fill(255);
  text(score, 40, height / 9);
  textFont(roboto);
}

/**
 * Generates a random color
 */
function randomColor() {

  return color(random(255), random(255), random(255));
}


/**
 * stops loop, draws game over message
 */
function endGame() {

  noLoop();

	fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(70);
	text("Game Over", width / 2, height / 2);
}