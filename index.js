class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
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
    this.time = new Date();
    this.account.addTransaction(this);
  }

}

class Withdrawal extends Transaction{

  get value() {
    return -this.amount
  }

}

class Deposit extends Transaction{

  get value() {
    return this.amount;
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('table');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(1020.00, myAccount);
t1.commit();

const t2 = new Withdrawal(150.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);

console.log("Account's Transaction History: ", myAccount.transactions);
