//This is going to be clousers in plain JavaScript

//Factory Functions

function createTaxCalculator(tax) {
  function calculateTax(amount) {
    return amount * tax;
  }

  return calculateTax;
}

const calculateVaAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateVaAmount(100));
console.log(calculateVaAmount(200));

//Practice make your on example of this, if we call calculateTaximcome
//do they overwrite the previous argument? 100 or 200

//Closures
