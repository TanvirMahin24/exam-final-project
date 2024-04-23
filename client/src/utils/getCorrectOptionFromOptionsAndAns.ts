export const getCorrectOptionFromOptionsAndAns = (
  ops: string[],
  ans: string | null
): string => {
  let correct = "";
  let alph = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "j"];
  ops.map((op, i) => {
    if (op === ans) {
      correct = alph[i];
    }
  });

  return correct;
};
