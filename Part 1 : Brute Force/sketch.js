var cities = [];
var totalCities = 7;
var recordDistance;
var bestEver; // will cities with best possible permutation

function setup() {
  canvas = createCanvas(500, 600); // creating a canvas of 500x600 pixels

  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height)); // it creates an object in p5.js which will help us to get x,y location and other stuff about a point
    cities[i] = v; // representing each city as object/point in canvas
  }

  var d = calcDistance(cities);
  recordDistance = d; // setting recordDistance as initial distance between cities.
  bestEver = cities.slice(); // creating copy of cities array
}

function draw() {
  background(0); // gives black background to canvas

  fill(255); // to make the cities white
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8); // representing each city as a circle of 8x8 pixels
  }

  // drawing path between cities
  beginShape();
  stroke(256); // white color
  strokeWeight(2); // thickness
  noFill();

  for (var i = 0; i < cities.length; i++) {
    vertex(cities[i].x, cities[i].y); // representing line between 2 cities
  }
  endShape();

  // if we found a new bestEver then draw that path again with diff color to highlight it
  beginShape();
  stroke(255, 0, 255); // purple color
  strokeWeight(4); // thickness
  noFill();

  for (var i = 0; i < cities.length; i++) {
    vertex(bestEver[i].x, bestEver[i].y); // representing line between 2 cities
  }
  endShape();

  var i = floor(random(cities.length));
  var j = floor(random(cities.length));

  swap(cities, i, j); // swap random city i with random city j

  var d = calcDistance(cities);
  if (d < recordDistance) {
    // checking after each swap whether we are getting a better distance as solution to our TSP with given cities.
    recordDistance = d;
    bestEver = cities.slice();

    console.log(recordDistance); // printing the distance each time in console.
  }
}

function swap(a, i, j) {
  // this function will swap [i]th element and jth element in given array.
  // used to shuffle the given array to create different possibilities

  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points) {
  // this will calculate the distance betweem all points with given points. i,e total sum of all possible edges in the graph
  // here points is the array of points
  var sum = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    //distance measured in pixels
    sum += d;
  }

  return sum;
}
