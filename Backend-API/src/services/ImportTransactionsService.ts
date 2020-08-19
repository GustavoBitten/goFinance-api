import Transaction from '../models/Transaction';
import path from 'path'
import fs from 'fs'
import csvParse from 'csv-parse'


class ImportTransactionsService {
  async execute(nameCsvFile:string): Promise<typeof parseDataCsv> {

    async function loadCSV(filePath: string): Promise<any[]> {
      const readCSVStream = fs.createReadStream(csvFilePath);
      
      const parseStream = csvParse({ 
        from_line: 2,
        ltrim: true,
        rtrim: true,
      });
      
      const parseCSV = readCSVStream.pipe(parseStream);
      const lines: any[] = [];
      
      parseCSV.on('data', line => {
        lines.push(line);
      });
      
      await new Promise(resolve => {
        parseCSV.on('end', resolve);
      });
      
      return lines;
    }
    
const csvFilePath = path.resolve(__dirname,'..','..','tmp',nameCsvFile)

const data = await loadCSV(csvFilePath)

        const parseDataCsv = data.map((transaction)=>{
          return {
            title:transaction[0],
            type:transaction[1],
            value:transaction[2],
            category:transaction[3],
          }
        })

    return parseDataCsv
  }
}

export default ImportTransactionsService;
