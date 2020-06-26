import Transaction from '../models/Transaction';
import Balance from '../models/Balance';
import CreateTransactionService from '../services/CreateTransactionService';
import CalculatorTotalIncomeAndOutcomeService from '../services/CalculatorTotalIncomeAndOutcomeService';




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
  
  public all(): Transaction[] {

    return this.transactions

  }
  
  public getBalance(): Balance {

    
    const calculatorTotalIncomeAndOutcomeService = new CalculatorTotalIncomeAndOutcomeService(this.transactions)

    const {income,outcome } = calculatorTotalIncomeAndOutcomeService.execute()
    const balance = new Balance({income,outcome} )
    
    
    return balance


  } 
  
  public create({title,value,type}: RequestDTO): Transaction {
    
    
    const trasaction = new Transaction({title,type,value})

    this.transactions.push(trasaction)

    // TODO
    return trasaction
  }
}

export default TransactionsRepository;
