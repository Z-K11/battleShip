export function numberisor(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const uniqueRandomiser = () => {
  const generated = new Set();

  return () => {
    if (generated.size > 100) return undefined;
    else {
      let num = numberisor(0, 100);
      while (generated.has(num)) num = numberisor(0, 100);
      generated.add(num);
      return num;
    }
  };
};

export const uniqueRangedNumberGenerator = uniqueRandomiser();
