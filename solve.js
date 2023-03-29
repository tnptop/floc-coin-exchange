'use strict'

const input = [1, 5, 7, 9, 11]
const target = 6

const _sum = (arr) => arr.reduce((p, c) => p + c)

const exchangeCoin = (coinList, target) => {
  // sort the coins in the descending order
  const coins = coinList.sort((a, b) => b - a)

  // go through possible subset iteratively
  // if all combinations within the iteration failed,
  // exclude the leftmost coin from the calculation
  for (let i = 0; i < coins.length; i++) {
    // extract the first coin from the pool
    const [firstCoin, ...coinPool] = coins.slice(i)

    // check for all subsets of the coin pool
    while (coinPool.length > 0) {
      const potentialCoins = [firstCoin]

      // go through each coins in the current subset
      for (const coin of coinPool) {
        // add the current coin to the result
        potentialCoins.push(coin)

        // calculate the sum of the current coin list
        const currentSum = _sum(potentialCoins)

        // exclude the current coin if the sum exceed the target
        if (currentSum > target) {
          potentialCoins.pop()
        }

        // return the coins if it's the exact match
        // note that this algorithm is greedy -- if there is two or more solution with the same amount of coins
        // the program will prioritise the larger coins in the solution
        if (currentSum === target) {
          return [potentialCoins.length, potentialCoins]
        }

        // if the sum is still less than the target, move on to the next coin
      }

      // remove the largest coin from the pool after exhausting all the combinations
      coinPool.shift()
    }
  }

  // no subset that matches the criterion found
  return -1
}

console.log(exchangeCoin(input, target))
