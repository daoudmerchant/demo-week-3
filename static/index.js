// PRIME FACTORS

const errors = [{
    check: num => typeof num !== "number",
    msg: "Must be a number"
},
{
    check: num => num === 0,
    msg: "Number must not be 0"
},
{
    check: num => num < 1,
    msg: "Number cannot be negative"
}]

const primeFactor = (num) => {
    for (let {check, msg} of errors) {
        if (check(num)) return new Error(msg)
    }
    if (num === 1) return [];

    let factors = [];
    let divisor = 2;

    while (num > 1) {
        if (num % divisor === 0) {
            factors.push(divisor);
            num /= divisor
        } else {
            divisor++
        }
    }
    return factors;
}

// FIZZBUZZ

const evaluate = value => {
    if (typeof value !== 'number') {
      return 'Please provide a number. Try again';
    }
    if (value < 1) {
      return 'Please provide a positive number. Try again';
    }
    if (value > 100) {
      return 'Please provide a number below 100';
    }
    let text = '';
    if (value % 3 === 0) {
      text += 'Fizz';
    }
    if (value % 5 === 0) {
      text += 'Buzz';
    }
    return text || value;
  };
  
  const fizzBuzz = array => {
    if (!Array.isArray(array)) {
      return new Error("Must be an array!");
    }
    return array.map(evaluate);
  };

// DOM queries

const getDomElements = id => ({
    button: document.querySelector(`button.${id}`),
    section: document.querySelector(`#${id}`),
    form: document.querySelector(`#${id} form`),
    input: document.querySelector(`#${id} input`),
    error: document.querySelector(`#${id} .error`),
    output: document.querySelector(`#${id} .output`)
})

const fizz = getDomElements("fizzbuzz");
const prime = getDomElements("primefactors")

fizz.button.addEventListener("click", () => {
    prime.section.classList.add("hidden");
    fizz.section.classList.remove("hidden");
})

prime.button.addEventListener("click", () => {
    fizz.section.classList.add("hidden");
    prime.section.classList.remove("hidden");
})

const phraseFactors = arr => {
    return arr.join(", ").replace(/, (?!.*, )/, " and ")
}

prime.form.addEventListener("submit", e => {
    e.preventDefault();
    prime.error.innerHTML = ""
    const numberInput = +prime.input.value;
    const param = Number.isFinite(numberInput) ? numberInput : prime.input.value;
    const factors = primeFactor(param)
    if (factors instanceof Error) {
        prime.error.innerHTML = `<p>${factors.toString()}</p>`;
        prime.output.innerHTML = "";
        return;
    }
    const sentence = `The prime factors are ${phraseFactors(factors)}`;
    prime.output.innerHTML = `<p>${sentence}</p>`
    prime.input.value = "";
    prime.error.innerHTML = "";
})