import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();


transactionsRouter.get('/', async (request, response) => {
  // TODO
  const transactionsRepository = getCustomRepository(TransactionsRepository)
  
  const transactions = await transactionsRepository.find()
  
  const balance = await transactionsRepository.getBalance()

  return response.json( {transactions,balance})
});

transactionsRouter.post('/', async (request, response) => {
  // TODO
  const { title,value, type, category } = request.body

  const createTransactionService = new CreateTransactionService

  const transaction =  await createTransactionService.execute({title, value,type,category})

  return response.json(transaction) 
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
  const {id} = request.params
  
  const transactionsRepository = getCustomRepository(TransactionsRepository)

  const resultDelete = await transactionsRepository.delete(id)
  console.log(resultDelete)
  if(!resultDelete.affected){

    throw new AppError("Id not found");

  }

  return response.status(204).send()

});

transactionsRouter.post('/import', async (request, response) => {
  // TODO

});

export default transactionsRouter;
