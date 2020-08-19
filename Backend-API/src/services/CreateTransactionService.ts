// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getRepository, getCustomRepository, TransactionRepository } from 'typeorm';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface RequestDTO{
  title: string

  value: number

  type: 'income'|'outcome'

  category: string
}

class CreateTransactionService {
  public async execute({category,title,type,value}: RequestDTO): Promise<Transaction> {
    // TODO
    const transactionsRepository = getCustomRepository(TransactionsRepository)

    const categoreisRepository = getRepository(Category)

    const checkExistCategory = await categoreisRepository.findOne({where:{ title: category}})

    let category_id:string 

    if(!checkExistCategory){
      const newCategory = await categoreisRepository.create({title: category})
      await categoreisRepository.save(newCategory)
      category_id = newCategory.id

    }else{

      category_id = checkExistCategory.id
    }
    const currentBalance = await transactionsRepository.getBalance()

    if(type == 'outcome' && currentBalance.total - value < 0 ){

      throw new AppError("you don't have balance for this outcome",400);
            

    }

    const transaction = transactionsRepository.create({title,type,value,category_id})
    await transactionsRepository.save(transaction)
    return transaction
  }
}

export default CreateTransactionService;
