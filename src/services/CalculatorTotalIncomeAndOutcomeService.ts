
  import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ResponseDTO{
  income: number
  outcome: number

}

class CalculatorTotalIncomeAndOutcomeService {
  private transactions: Transaction[];

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  public execute(): ResponseDTO {

    
    const income = this.transactions
        .filter((transaction)=>transaction.type == 'income')
        .map(transaction=> Number(transaction.value))
        .reduce((total = 0,index =0)=>total + index)

    const outcome = this.transactions
        .filter((transaction)=>transaction.type == 'outcome')
        .map(transaction=> Number(transaction.value))
        .reduce((total = 0,index =0)=>total + index)

      
      
      
        return {income,outcome}
    
  }
}

export default CalculatorTotalIncomeAndOutcomeService;
