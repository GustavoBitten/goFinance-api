import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';


interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface RequestDTO{
  title: string
  value: number
  type: 'income' | 'outcome'

}


class TransactionsRepository {
  private transactions: Transaction[];
  
  constructor() {
    this.transactions = [];
  }
  
  /* public all(): Transaction[] {
    // TODO
  }
  
  public getBalance(): Balance {
    // TODO
  } */
  
  public create({title,value,type}: RequestDTO): Transaction {
    
    
    const trasaction = new Transaction({title,type,value})

    // TODO
    return trasaction
  }
}

export default TransactionsRepository;
