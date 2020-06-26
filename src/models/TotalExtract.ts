
import Transaction from './Transaction';
import Balance from './Balance';

class TotalExtract{
    transactions: Transaction[]

    balance:Balance

    constructor({transactions,balance}: TotalExtract){
      this.transactions = transactions
      this.balance = balance
    }
   }

export default TotalExtract