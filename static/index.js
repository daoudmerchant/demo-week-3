// PRIME FACTORS

const errors = [
  {
    check: (num) => typeof num !== "number",
    msg: "Must be a number",
  },
  {
    check: (num) => num === 0,
    msg: "Number must not be 0",
  },
  {
    check: (num) => num < 1,
    msg: "Number cannot be negative",
  },
];

const primeFactor = (num) => {
  for (let { check, msg } of errors) {
    if (check(num)) return new Error(msg);
  }
  if (num === 1) return [];

  let factors = [];
  let divisor = 2;

  while (num > 1) {
    if (num % divisor === 0) {
      factors.push(divisor);
      num /= divisor;
    } else {
      divisor++;
    }
  }
  return factors;
};

// FIZZBUZZ

const evaluate = (value) => {
  if (typeof value !== "number") {
    return "Please provide a number. Try again";
  }
  if (value < 1) {
    return "Please provide a positive number. Try again";
  }
  if (value > 100) {
    return "Please provide a number below 100";
  }
  let text = "";
  if (value % 3 === 0) {
    text += "Fizz";
  }
  if (value % 5 === 0) {
    text += "Buzz";
  }
  return text || value;
};

const fizzBuzz = (array) => {
  if (!Array.isArray(array)) {
    return new Error("Must be an array!");
  }
  return array.map(evaluate);
};

// DOM queries

const getDomElements = (id) => ({
  button: document.querySelector(`button.${id}`),
  section: document.querySelector(`#${id}`),
  form: document.querySelector(`#${id} form`),
  input: document.querySelector(`#${id} input`),
  error: document.querySelector(`#${id} .error`),
  output: document.querySelector(`#${id} .output`),
});

const fizz = getDomElements("fizzbuzz");
const prime = getDomElements("primefactors");

const addViewToggle = (proj1, proj2) => {
  const addListeners = (a, b) => {
    a.button.addEventListener("click", () => {
      b.section.classList.add("fadeout");
      setTimeout(() => {
        b.section.classList.add("hidden");
        a.section.classList.remove("hidden");
      }, 300);
      setTimeout(() => {
        a.section.classList.remove("fadeout");
      }, 400);
    });
  };
  addListeners(proj1, proj2);
  addListeners(proj2, proj1);
};

addViewToggle(fizz, prime);

const addFormFunctionality = (proj, callFunc, getText) => {
  proj.form.addEventListener("submit", (e) => {
    e.preventDefault();
    proj.error.innerHTML = "";
    const input = +proj.input.value;
    const value = Number.isFinite(input) ? input : proj.input.value;
    const result = callFunc(value);
    if (result instanceof Error) {
      proj.output.innerHTML = "";
      proj.error.innerHTML = `<p>${result.toString()}</p>`;
      return;
    }
    const text = getText(result);
    proj.output.innerHTML = text;
  });
};

const formatPrimeFactors = (factorArr) => {
  if (!factorArr.length) return "<p>There are no prime factors!</p>";
  return `The prime factors are ${factorArr
    .join(", ")
    .replace(/, (?!.*, )/, " and ")}.`;
};

addFormFunctionality(prime, primeFactor, formatPrimeFactors);

const callFizzBuzzWithArray = (input) => {
  console.log("Calling");
  if (typeof input !== "number") return fizzBuzz(input);
  const numArray = new Array(input).fill().map((a, i) => i + 1);
  return fizzBuzz(numArray);
};

const formatFizzBuzz = (fizzBuzzArray) =>
  fizzBuzzArray.map((string) => `<p>${string}</p>`).join("");

addFormFunctionality(fizz, callFizzBuzzWithArray, formatFizzBuzz);

// //doesnt work when element in the array is non-number (eg. "string")
// fizz.form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const stringToArray = fizz.input.value.split(",");
//   const newArray = stringToArray.map((item) => +item);
//   const output = fizzBuzz(newArray);
//   fizz.output.innerHTML = `<p>${output.join("<br>")}</p>`;
//   fizz.input.value = "";
// });
