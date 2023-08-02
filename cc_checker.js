// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]


// const test1 = [4716690479739832093];
// const test2 = ['5400319223442830'];
// const test3 = [3, 4, 9, 0, 3, 9, 9, 2, 4, 0, 8, 2, 5, 9, 5];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]
// const batch = [test1, test2, test3]

// function that validates if a card number is valid or not
const validateCred = array => {
    // converts numbers and strings into arrays, leaves arrays as arrays
    if (typeof array === 'number') {
        array = String(array).split('')
    } else if (typeof array === 'string') {
        array = array.split('');
    } else if (Array.isArray(array) === true) {
        array = array;
    } else {
        return 'please enter a card number using numbers'
    }
    let cardCheck = [];
    let counter = 1;
    // for loop that iterates over every digit in card
    for (let i = array.length - 1; i >= 0; i--) {
        // the digit furthest to the right, and every other one i returned in its original state
        if (counter % 2 === 1) {
            cardCheck.unshift(array[i]);
        // Other digits are doubled
        } else {
            // if the doubled digit is a double digit, it is subtracted by 9 to be between 1-9
            if (array[i] * 2 > 9) {
                cardCheck.unshift((array[i] * 2) - 9);
            // if the doubled digit is still a single digit, it will only be doubled
            } else {
                cardCheck.unshift(array[i] * 2);
            }
        }
        // increments the counter for every other digit doubling
        counter++;
    }
    // function that sums the new array
    const sumCard = arr => {
        return arr.reduce((accumulator, currentValue) => accumulator + currentValue)
    }
    // if statement that checks to make sure the sum or the new array is divisible by ten (is valid)
    if (sumCard(cardCheck) % 10 === 0) {
        // valid card
        return true;
    } else {
        // invalid card
        return false;
    }

}

// function that takes an array of variables holding card numbers (batch) and returns card numbers
// that are invalid
const findInvalidCards = arr => {
    let invalidCards = [];
    for (let card of arr ) {
        // uses function from above to find the invalid cards (return false) and pushes them to
        // the invalidCards array
        if (validateCred(card) === false) {
            invalidCards.push(card);
        }
    }
    return invalidCards;
}

// takes an array of cards, finds the card numbers of invalid cards, and assigns them all to companies that
// are issuing invalid cards based on the first digit of the card number
const idInvalidCardCompanies = arr => {
    let companyList = [];
    let cardNums = findInvalidCards(arr)
    for (let card of cardNums) {
        if (card[0] === 3 && !companyList.includes('Amex (American Express)')) {
            companyList.push('Amex (American Express)');
        } else if (card[0] === 4 && !companyList.includes('Visa')) {
            companyList.push('Visa');
        } else if (card[0] === 5 && !companyList.includes('Mastercard')) {
            companyList.push('Mastercard');
        } else if (card[0] === 6 && !companyList.includes('Discover')) {
            companyList.push('Discover');
        } else if (card[0] !== 3 && card[0] !== 4 && card[0] !== 5 && card[0] !== 6){
            companyList.push('Company not found')
        }
    }
    return companyList;
}
