import fs from 'fs';
import url from 'url';
import Excel from 'exceljs';
import errorHandler from '../helpers/dbErrorHandler';
import BuyRequest from '../models/buyrequest.model';
import SellRequest from '../models/sellrequest.model';

const list = async (req, res) => {
  const { requestType } = req.query;
  const page = req.query.page ? req.query.page : 1;
  const resultsPerPage = req.query.limit ? req.query.limit : 10;

  let uri = '/';
  try {
    switch (requestType) {
      case 'buy':
        uri = '/api/buyrequests';
        break;
      case 'sell':
        uri = '/api/sellrequests';
        break;
      default:
        throw new Error('Unrecognised trade type');
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
  return res.redirect(301, url.format(
    {
      pathname: `${uri}`,
      query: {
        page: `${page}`,
        limit: `${resultsPerPage}`,
      },
    },
  ));
};
const loadTradeRequest = (tradeType, startCol, endCol) => {
  const filePath = './server/public/excel/TradeRequestsTemplate.xlsx';
  const excel = fs.realpathSync(filePath, { encoding: 'utf8' });
  const workbook = new Excel.Workbook();
  return workbook.xlsx.readFile(excel)
    .then(() => {
      const tradeRequests = [];
      const worksheet = workbook.getWorksheet('IPHONES');
      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        const currentRow = worksheet.getRow(rowNumber);
        if (rowNumber >= 3) {
          const deviceRequestDetails = {};
          if (tradeType === 'buy') {
            deviceRequestDetails.requestType = 'Buy Request';
          } else if (tradeType === 'sell') {
            deviceRequestDetails.requestType = 'Sell Request';
          }
          for (let i = startCol; i <= endCol; i += 1) {
            const cell = currentRow.getCell(i);
            const cellValue = cell ? cell.toString() : '';
            if (cell.isMerged && cellValue.includes('iPhone')) {
              deviceRequestDetails.deviceName = cellValue;
              const pricing = [];
              const unlockedRowNumber = rowNumber + 2;
              for (let j = unlockedRowNumber; j < unlockedRowNumber + 5; j += 1) {
                const unlockedRow = worksheet.getRow(j);
                const unlockedRowValue = unlockedRow ? unlockedRow.getCell(tradeType === 'buy' ? 1 : 12).toString() : '';
                if (unlockedRowValue.includes('locked')) {
                  let storageSize;
                  let newCondition;
                  let a1Condition;
                  let a2Condition;
                  let b1Condition;
                  let b2Condition;
                  let cCondition;
                  let cbCondition;
                  let cdCondition;
                  for (let k = startCol; k <= endCol; k += 1) {
                    switch (k) {
                      case (tradeType === 'buy' ? 2 : 13):
                        storageSize = unlockedRow.getCell(k);
                        break;
                      case (tradeType === 'buy' ? 3 : 14):
                        newCondition = unlockedRow.getCell(k);
                        break;
                      case (tradeType === 'buy' ? 4 : 15):
                        a1Condition = unlockedRow.getCell(k);
                        break;
                      case (tradeType === 'buy' ? 5 : 16):
                        a2Condition = unlockedRow.getCell(k);
                        break;
                      case (tradeType === 'buy' ? 6 : 17):
                        b1Condition = unlockedRow.getCell(k);
                        break;
                      case (tradeType === 'buy' ? 7 : 18):
                        b2Condition = unlockedRow.getCell(k);
                        break;
                      case (tradeType === 'buy' ? 8 : 19):
                        cCondition = unlockedRow.getCell(k);
                        break;
                      case (tradeType === 'buy' ? 9 : 20):
                        cbCondition = unlockedRow.getCell(k);
                        break;
                      case (tradeType === 'buy' ? 10 : 21):
                        cdCondition = unlockedRow.getCell(k);
                        break;
                      default:
                        break;
                    }
                  }
                  pricing.push(
                    {
                      storageSize: `${storageSize}`,
                      new: parseInt(newCondition, 10),
                      a1: parseInt(a1Condition, 10),
                      a2: parseInt(a2Condition, 10),
                      b1: parseInt(b1Condition, 10),
                      b2: parseInt(b2Condition, 10),
                      c: parseInt(cCondition, 10),
                      'c/b': parseInt(cbCondition, 10),
                      'c/d': parseInt(cdCondition, 10),
                    },
                  );
                }
              }
              deviceRequestDetails.pricing = pricing;
              const request = tradeType === 'buy' ? new BuyRequest(deviceRequestDetails) : new SellRequest(deviceRequestDetails);
              tradeRequests.push(request);
              break;
            }
          }
        }
      });
      return tradeRequests;
    }).catch((err) => { throw new Error(err); });
};

const loadRequests = async (req, res) => {
  try {
    let buyRequests = [];
    let sellRequests = [];
    buyRequests = await loadTradeRequest('buy', 2, 10);
    BuyRequest.create(buyRequests);
    sellRequests = await loadTradeRequest('sell', 12, 21);
    SellRequest.create(sellRequests);
    return res.json({ success: true, message: 'data successfully loaded', data: [...sellRequests, ...buyRequests] });
  } catch (err) {
    return res.status(400).json({
      susccess: false,
      message: err.message,
    });
  }
};

export default { list, loadRequests };
