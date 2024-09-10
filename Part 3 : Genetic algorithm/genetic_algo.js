function calculateFitness() {
  // fitness score for each order in population

  var currentRecord = Infinity; // best distance for current population
  for (var i = 0; i < population.length; i++) {
    var d = calcDistance(cities, population[i]);
    // the lower the distance d the better the fitness score should be. As the order produces better solution to TSP
    if (d < recordDistance) {
      recordDistance = d;
      bestEverPermutation = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBestPermutationForCurrentPopulation = population[i];
    }

    fitness[i] = 1 / (pow(d, 8) + 1);

    // fitness[i] will have a value between (0,1] which will correspond to quality of the given order.
    // 1/(d + 1) was used initially but 1/(pow(d,8) + 1) gives a better result overtime
  }
}

function normalizeFitness() {
  // A population contains several orders and each has it's own fitness score.
  // we are normalizing those fitness scores so that all fitness scores sum to 1.
  // will give Normalized behaviour.

  let sum = 0;
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }
}

function nextGenerationOfPopulation() {
  // given current population. This function will generate the next generation of this population.
  // i.e take orders from current population (good orders will have high probability of getting selected). Then merge those orders to generate new orders.
  // Multiple new orders generated will help to create new population.
  // That new population is called next generation.

  var newPopulation = [];

  for (var i = 0; i < population.length; i++) {
    // picking 2 orders from current population
    var orderA = pickOne(population, fitness);
    var orderB = pickOne(population, fitness);

    // creating a new order from those 2 orders
    var order = crossOver(orderA, orderB);

    // mutating the picked order
    mutate(order, 0.01);

    // assigning that order to the new population
    newPopulation[i] = order;
  }

  population = newPopulation;
}

function pickOne(list, prob) {
  // given list of orders and their fitness score which is their probabilites of being good.
  // this function will pick an order based on fitness score

  var index = 0;
  var r = random(1); // select random value between 0 and 1

  // popular method to pick a value based upon probability
  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;

  return list[index].slice(); // returning a copy of that order
}

function crossOver(orderA, orderB) {
  // given 2 orders of cities we want to make an order which is crossOver of both these orders.
  // i.e contains some part of orderA and other part of orderB

  /* condition for order in TSP ::
          order in TSP must consider all the cities exactly 1 time.
          Typically we take one half of new order same as of orderA and other half of new order as of orderB.
          But here the values might not be distinct
  
          Here we take a random subarray of orderA. and put it in the beggining of new order.
          Then we iterate through all values in orderB and whichever is absent in newOrder we go on adding it, in same sequence.
    */

  var start = floor(random(orderA.length));
  var end = floor(random(start + 1, orderA.length));
  // start and end represent the random subarray of orderA

  var neworder = orderA.slice(start, end);

  for (let i = 0; i < orderB.length; i++) {
    var city = orderB[i];
    if (!neworder.includes(city)) {
      neworder.push(city);
    }
  }

  return neworder;
}

function mutate(order, mutationRate) {
  // given an order of cities, this function will mutate (change the permutation of) this order.
  // mutationRate will tell the intensity of mutation. i.e if mutationRate is high(near to 1) then we will interchange the values in order heavily i.e perform the change in permutation many times.
  // else if mutationRate is low(near 0) we will perform mutation less times.

  for (let i = 0; i < totalCities; i++) {
    if (random(1) < mutationRate) {
      // mutationRate controlling intensity of mutation
      const indexA = floor(random(order.length));
      const indexB = (indexA + 1) % totalCities;

      // pick 2 adjacent indices and swap them
      swap(order, indexA, indexB);
    }
  }
}
