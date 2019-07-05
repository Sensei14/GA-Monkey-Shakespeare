var target;
var popSize = 200;
var population;
var mutationRate = 0.01
var start = false;

function go() {
  target = targetText.value()
  population = new Population(target, popSize, mutationRate);
  start = true;
}

function setup() {
  noCanvas()
  allPhrases = createP("All phrases:");
  allPhrases.position(400, 10);
  targetP = createP("Target: ")
  targetP.position(10, 10);
  targetP.class("target")
  bestP = createP("Best: ")
  bestP.position(10, 40)
  bestP.class("best")
  generationP = createP("Generation: ")
  generationP.position(10, 70);
  generationP.class("info")
  populationP = createP("Population: ")
  populationP.position(10, 100);
  populationP.class("info")
  inputP = createP("Type the TARGET")
  inputP.position(10, 160);
  targetText = createInput()
  targetText.position(10, 200);
  button = createButton("START")
  button.position(10, 220)
  button.mousePressed(go)

}

function draw() {
  if (start) {
    population.calcFitness();
    population.evaluate();
    if (population.isFinished()) {
      // noLoop(); 
      start = false;
    }
    display();
    population.selection();
    population.evolve();
  }
}

function display() {
  let best = population.getBest()
  let generation = population.getGeneration();
  targetP.html(`Target: ${target}`)
  bestP.html(`Best: ${best}`)
  generationP.html(`Generation: ${generation}`);
  populationP.html(`Population: ${popSize}`);
  allPhrases.html("All phrases:<br>" + population.allPhrases())
}