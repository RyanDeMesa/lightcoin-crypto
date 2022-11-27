class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 5000.00;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Withdrawal extends Transaction{

  get value() {
    return -this.amount
  }

  isAllowed() {
    // check if amount wanting to withdraw is less then the amount curr in account
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction{

  get value() {
    return this.amount;
  }

  isAllowed() {
    // this will always be allowed
    return true;
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('Roy');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(1000.00, myAccount);
t1.commit();

const t2 = new Withdrawal(200.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);

console.log("Account's Transaction History: ", myAccount.transactions);
