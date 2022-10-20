const https = require('https');
const { parseTableDate, checkPairs } = require('./helpers');
const { getTableData } = require('./page-parser');
const currentPage = 'https://www.zulubet.com/';
const oldPage = 'https://www.zulubet.com/tips-18-10-2022.html';

const getZuluReq = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = [];
      console.log('Status Code:', res.statusCode);

      res.on('data', chunk => { data.push(chunk); });

      res.on('end', () => {
        const page = Buffer.concat(data).toString();

        resolve(page);
      });
    })
    .on('error', err => {
      console.log('Error: ', err.message);
      reject(err);
    });
  });
};

const getCurrentZuluPage = async () => {
  const page = await getZuluReq(currentPage);
  const tableArr = getTableData(page);
  const parseData = parseTableDate(tableArr);
  const result = checkPairs(parseData);

  return result;
};

const getOldZuluPage = async () => {
  const page = await getZuluReq(oldPage);
  const tableArr = getTableData(page);
  const parseData = parseTableDate(tableArr);
  const result = checkPairs(parseData);

  return result;
};


module.exports = { getCurrentZuluPage, getOldZuluPage };
