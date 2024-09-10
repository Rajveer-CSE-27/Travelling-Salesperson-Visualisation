var cities = [];
var totalCities = 6;
var order = [];
var totalPermutations;
var cnt = 0; // to keep track of %of task completed

var recordDistance;
var bestEverPermutation;

function setup() {
  createCanvas(500, 600);
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height / 2)); // creates object for each city
    cities[i] = v;
    order[i] = i; // let initial permutation be sorted order.
  }

  var d = calcDistance(cities, order); // calculating total distance by connecting adjacent cities according to permutation given by order array
  recordDistance = d;
  bestEverPermutation = order.slice(); //creating copy of order array

  totalPermutations = factorial(totalCities);
  console.log(totalPermutations); // for very big numbers this will not work properly.
}

function draw() {
  background(0);
  //frameRate(6); // to view each draw slowly.

  fill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8); // representing each city as a circle of 8x8 pixels
  }

  // printing the bestEver array route each time
  stroke(255, 0, 255); // purple color
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++) {
    vertex(cities[bestEverPermutation[i]].x, cities[bestEverPermutation[i]].y); // representing line between 2 cities
  }
  endShape();

  // printing the current order array route each time
  translate(0, height / 2 - 80); // use other half of canvas
  stroke(255); // white color
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++) {
    vertex(cities[order[i]].x, cities[order[i]].y);
  }
  endShape();

  var d = calcDistance(cities, order);
  if (d < recordDistance) {
    // if found smaller distance then updating best Ever Permutation
    recordDistance = d;
    bestEverPermutation = order.slice();
  }

  // displaying the current permutaion
  textSize(30);
  fill(255);
  var s = "";
  for (var i = 0; i < order.length; i++) {
    s += order[i];
  }

  text(s + " : current Permutation", 20, height / 2 + 20); // location of canvas

  // displaying the percentage completed upto 3 decimals
  textSize(30);
  fill(255);
  var percent = 100 * (cnt / totalPermutations);
  text(nf(percent, 0, 3 /* 3 decimals */) + "% completed", 20, height / 2 + 70);

  nextPermutation(); // generate the next permutation for next draw call
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

function factorial(n) {
  // to calculate total Permutations
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function nextPermutation() {
  cnt++;

  // Generating permutation : https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  // Step 1

  var max_i = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      max_i = i;
    }
  }

  if (max_i == -1) {
    // then this permutation is the largest
    noLoop(); // Stops the code in draw() from running repeatedly.
    console.log("Finished all permutations");
  }

  // Step 2
  var max_j = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[max_i] < order[j]) {
      max_j = j;
    }
  }

  // Step 3
  swap(order, max_i, max_j);

  //STEP 4: reverse from max_i + 1 to the end
  var tempArray = order.splice(max_i + 1); //Inserts a value or an array of values into an existing array.
  tempArray.reverse();
  order = order.concat(tempArray);
}
