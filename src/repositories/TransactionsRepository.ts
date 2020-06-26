import Transaction from '../models/Transaction';
import Balance from '../models/Balance';
import CreateTransactionService from '../services/CreateTransactionService';




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
