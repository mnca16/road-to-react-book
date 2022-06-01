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
