/**
 * Checks if a whole number greater than 1 is a prime number.
 * @param {number} num - The number to check.
 * @returns {boolean} True if prime, false otherwise.
 */
function isPrime(num) {
  // Prime numbers must be whole numbers greater than 1
  if (num <= 1 || !Number.isInteger(num)) {
    return false;
  }
  
  // 2 is the only even prime number
  if (num === 2) {
    return true;
  }
  
  // Exclude all other even numbers
  if (num % 2 === 0) {
    return false;
  }
  
  // Check odd divisors up to the square root of the number
  const boundary = Math.sqrt(num);
  for (let i = 3; i <= boundary; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }
  
  return true;
}

// Export isPrime as a named property of module.exports
module.exports = {
  isPrime: isPrime
};
