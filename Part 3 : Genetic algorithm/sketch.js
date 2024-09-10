var cities = [];
var totalCities = 15;
var populationSize = 300;

var population = []; // it will contain multiple orders/permutations of cities. i,e a population of orders.
var fitness = []; // it will give a score to each order in population. fitness[i] = fitness score of population[i]

var recordDistance = Infinity;
var bestEverPermutation;
var currentBestPermutationForCurrentPopulation;

function setup() {
  createCanvas(800, 800);

  var order = []; // order/permutation of cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height / 2)); // creates object for each city
    cities[i] = v;
    order[i] = i; // initial permutation in sorted order
  }

  for (var i = 0; i < populationSize; i++) {
    // let initially we set population size = 10. Will increase for more accuracy.

    population[i] = shuffle(order); // inbuilt shuffle function that shuffles array elements.
    // here in each population index we are storing a shuffled form of order randomly.
    // population as a whole will contain multiple permutations of order of cities.
  }

  //console.log(population);

  for (var i = 0; i < population.length; i++) {
    var d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEverPermutation = population[i]; // best ever Permutation will depend on best permutation we find from population.
    }

    fitness[i] = d; // initially let fitness is equal to total distance of order.
  }
}

function draw() {
  background(0);
  //frameRate(6); // to view each draw slowly

  calculateFitness();
  normalizeFitness();
  nextGenerationOfPopulation();

  // printing the bestEver array route each time
  stroke(255); // white color
  strokeWeight(3);
  noFill();
  beginShape();
  for (var i = 0; i < bestEverPermutation.length; i++) {
    vertex(cities[bestEverPermutation[i]].x, cities[bestEverPermutation[i]].y); // representing line between 2 cities
    ellipse(
      cities[bestEverPermutation[i]].x,
      cities[bestEverPermutation[i]].y,
      16,
      16
    ); // representing each city as a circle of 16x16 pixels
  }
  endShape();

  // printing the currentBestPermutationForCurrentPopulation
  translate(0, height / 2);
  stroke(255);
  strokeWeight(3);
  noFill();
  beginShape();
  for (var i = 0; i < currentBestPermutationForCurrentPopulation.length; i++) {
    vertex(
      cities[currentBestPermutationForCurrentPopulation[i]].x,
      cities[currentBestPermutationForCurrentPopulation[i]].y
    );
    ellipse(
      cities[currentBestPermutationForCurrentPopulation[i]].x,
      cities[currentBestPermutationForCurrentPopulation[i]].y,
      16,
      16
    );
  }
  endShape();
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  var sum = 0;
  // adjacent cities are connected
  for (var i = 0; i < order.length - 1; i++) {
    var cityA = points[order[i]];
    var cityB = points[order[i + 1]];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}
