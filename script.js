const billInput = document.querySelector('[data-bill]');
const peopleInput = document.querySelector('[data-people-number]');
const resetInput = document.querySelector('[data-reset]');
const tipInputs = document.querySelectorAll('[data-tip-button]');

const tipPriceOutput = document.querySelector('[data-tip-price]');
const totalPriceOutput = document.querySelector('[data-total-price]');


let tipPercent = 0.15;
let bill = billInput.value;
let peopleNumber = peopleInput.value;
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
});

const onTipSelected = (tipInput) => {
    tipInputs.forEach(input => input.classList.remove('active'));
    tipInput.classList.add('active');
    tipPercent = tipInput.getAttribute('data-tip-button') / 100;
    updateGraphics();
}

tipInputs.forEach(tipInput => tipInput.addEventListener('click', () => onTipSelected(tipInput)))


function updateGraphics() {
    const tipAmount = bill * tipPercent / peopleNumber;
    const totalAmount = tipAmount + bill / peopleNumber;
    tipPriceOutput.innerHTML = formatter.format(tipAmount);
    totalPriceOutput.innerHTML = formatter.format(totalAmount);
    billInput.value = bill;
    peopleInput.value = peopleNumber;
}

const onReset = () => {
    bill = 0;
    peopleNumber = 1;
    updateGraphics();
}

function updateBill(value) {
    bill = value == '' ? 0 : value;
}

function updatePeopleNumber(value) {
    peopleNumber = value == '' ? 1 : value;
}

billInput.addEventListener('change', event => {
    updateBill(event.target.value);
    updateGraphics();

});
peopleInput.addEventListener('change', event => {
    updatePeopleNumber(event.target.value);
    updateGraphics();
});

billInput.addEventListener('keydown', event => {
    updateBill(event.target.value);
    updateGraphics();

});
peopleInput.addEventListener('keydown', event => {
    updatePeopleNumber(event.target.value);
    updateGraphics();
});
resetInput.addEventListener('click', onReset);
