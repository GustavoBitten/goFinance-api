import { Router } from 'express';

 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';
 import TotalExtract from '../models/TotalExtract'


 interface RequestDTO{
  title: string
  value: number
  type: 'income' | 'outcome'

}

interface Balance{
  income: number
  outcome:number
  total: number
}

const transactionRouter = Router();

 const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {

    
    const transactions = transactionsRepository.all()

    const balance = transactionsRepository.getBalance()

    const totalExtract = new TotalExtract({balance,transactions} )
    
    return response.json(totalExtract)
    
    
    
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    TransactionsRepository
    
    const {title,value,type} = request.body
    
    const createTransactionService = new CreateTransactionService(transactionsRepository)
    
    const transaction = createTransactionService.execute({title,value,type})

    return response.json(transaction)

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
