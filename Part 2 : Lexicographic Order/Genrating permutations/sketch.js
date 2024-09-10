var cities = [1, 2, 3, 4]; // do not put 0 in this

function setup() {
  createCanvas(500, 600); // creating a canvas of 500x600 pixels
}

function draw() {
  console.log(cities);

  // Generating permutation : https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  // Step 1

  var max_i = -1;
  for (var i = 0; i < cities.length - 1; i++) {
    if (cities[i] < cities[i + 1]) {
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
  for (var j = 0; j < cities.length; j++) {
    if (cities[max_i] < cities[j]) {
      max_j = j;
    }
  }

  // Step 3
  swap(cities, max_i, max_j);

  //STEP 4: reverse from max_i + 1 to the end
  var tempArray = cities.splice(max_i + 1); //Inserts a value or an array of values into an existing array.
  tempArray.reverse();
  cities = cities.concat(tempArray);

  // Printing the current Permutation
  background(0); // makes backgound black
  textSize(70);
  var s = "";
  for (var i = 0; i < cities.length; i++) {
    s += cities[i];
  }
  fill(255); // fill the string with white color
  text(s, 20, height / 2);
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
