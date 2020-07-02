// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface RequestDTO{
  title: string

  value: number

  type: 'income'|'outcome'

  category: string
}

class CreateTransactionService {
  public async execute({category,title,type,value}: RequestDTO): Promise<Transaction> {
    // TODO
    const transactionsRepository = getRepository(Transaction)

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

    const transaction = transactionsRepository.create({title,type,value,category_id})
    await transactionsRepository.save(transaction)
    return transaction
  }
}

export default CreateTransactionService;
