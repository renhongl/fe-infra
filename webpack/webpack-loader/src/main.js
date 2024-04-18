console.log("hello world");

function a() {
  const a = 1;
  const b = 2;
  console.log(a + b);
}

a();

const sum = (...args) => {
  return args.reduce((p, c) => p + c, 0);
};

console.log(sum(1, 2, 3));
