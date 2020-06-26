
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


    const onlyIncome = this.transactions.filter((transaction)=>{
        return transaction.type == 'income'
      })
    
      const valuesIncome = onlyIncome.map(transaction=>{
        return Number(transaction.value)
      })
    
      const income = valuesIncome.reduce((total = 0,index =0)=>{
        return total + index
      })
    
    
      const onlyOutcome = this.transactions.filter((transaction)=>{
        return transaction.type == 'outcome'
      })
    
      const valuesOutcome = onlyOutcome.map(transaction=>{
        return Number(transaction.value)
      })
    
      const outcome = valuesOutcome.reduce((total = 0,index =0)=>{
        return Number(total + index)
        
      })

      return {income,outcome}
    
  }
}

export default CalculatorTotalIncomeAndOutcomeService;
