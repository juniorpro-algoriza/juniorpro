export const sleep = (seconds: number) => {
  return new Promise((resovle) => {
    setTimeout(() => {
      resovle(true);
    }, seconds * 1000);
  });
};
