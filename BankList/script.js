'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__value">${movement.toFixed(2)}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcGlobalBalance = function (account) {
  account.globalBalance = account.movements.reduce(
    (acc, curr) => acc + curr,
    0
  );
  labelBalance.textContent = `${account.globalBalance.toFixed(2)}EUR`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}E`;

  const withdrawal = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(withdrawal).toFixed(2)}E`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}E`;
};

// getting user name
const createUserNames = function (user) {
  user.forEach(individual => {
    individual.userName = individual.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);
//Authentication and displaying corresponding account UI
const updateUI = function (curAcc) {
  displayMovements(curAcc.movements);
  calcGlobalBalance(curAcc);
  calcDisplaySummary(curAcc);
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  const transferToAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  if (
    transferAmount > 0 &&
    currentAccount.globalBalance >= transferAmount &&
    transferToAccount?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-transferAmount);
    transferToAccount.movements.push(transferAmount);
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  const closeUserName = inputCloseUsername.value;
  const closeUserPin = Number(inputClosePin.value);
  const closeAccountIndex = accounts.findIndex(
    account =>
      account.userName === closeUserName && account.pin === closeUserPin
  );
  closeAccountIndex !== -1 && accounts.splice(closeAccountIndex, 1);
  inputCloseUsername.value = inputClosePin.value = '';
  containerApp.style.opacity = '0';
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  const isThereSuficientDeposit = currentAccount.movements.some(
    mov => mov > loanAmount * 0.1
  );
  if (isThereSuficientDeposit) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);
      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
});

let isSorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !isSorted);
  isSorted = !isSorted;
});

const totalAccountDeposits = function (accounts) {
  console.log(
    accounts
      .flatMap(account => account.movements)
      .filter(deposits => deposits > 0)
      .reduce((acc, cur) => acc + cur, 0)
  );
};

const convertTitleCase = function (stringValue) {
  const exceptions = ['a', 'an', 'the'];
  console.log(
    stringValue
      .toLowerCase()
      .split(' ')
      .map(word =>
        exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join(' ')
  );
  //     .join(' ')
  // );
};

convertTitleCase("hi i'm an pavithra s");

totalAccountDeposits(accounts);
// const getMaximumDeposit = function (users) {
//   users.forEach(user => {
//     user.maximumDeposit = user.movements.reduce((acc, curr) => {
//       return acc < curr ? curr : acc;
//     }, user.movements[0]);
//   });
// };

// getMaximumDeposit(accounts);

// //getting only deposits

// const getDeposits = function (user) {
//   user.forEach(individual => {
//     individual.deposits = individual.movements.filter(movement => movement > 0);
//   });
// };

// getDeposits(accounts);

// //getting only withdrawals

// const getWithdrawals = function (user) {
//   user.forEach(individual => {
//     individual.withdrawals = individual.movements.filter(
//       movement => movement < 0
//     );
//   });
// };

// getWithdrawals(accounts);

// const getGlobalBalance = function (users) {
//   users.forEach(individual => {
//     individual.globalBalance = individual.movements.reduce(
//       (acc, cur, index, arr) => {
//         return acc + cur;
//       },
//       0
//     );
//   });
// };

// getGlobalBalance(accounts);
// console.log(accounts);

// const calcAverageHumanAge = dogsAges => {
//   return dogsAges
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age > 18)
//     .reduce((acc, cur, i, arr) => {
//       return acc + cur / arr.length;
//     }, 0);
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const recommendedFood = function (dogs) {
  dogs.forEach(dog => (dog.recFood = dog.weight ** 0.75 * 28));
};

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
recommendedFood(dogs);
console.log(dogs);
//2
const sarahDogs = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `It is eating too ${
    sarahDogs.curFood > sarahDogs.recFood ? 'much' : 'little'
  }`
);

//3
let ownersEatTooMuch, ownersEatTooLess;
ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
ownersEatTooLess = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch, ownersEatTooLess);

//4
console.log(`${ownersEatTooMuch.join(' and ')}'s eat too much`);
console.log(`${ownersEatTooLess.join(' and ')}'s eat too Less`);

//5
console.log(dogs.some(dog => dog.curFood === dog.recFood));
