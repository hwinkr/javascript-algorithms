const isPrime = (number) => {
  if (number < 2) return false;
  for (let i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
    if (!(number % i)) return false;
  }

  return true;
};

function solution(n, k) {
  const kBinary = n
    .toString(k)
    .split("0")
    .map((s) => Number(s));
  return kBinary.filter((number) => isPrime(number)).length;
}
