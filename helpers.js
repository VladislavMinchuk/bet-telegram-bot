const parseTableDate = (tableArr) => {
  return tableArr.map((item) => {
    const string = item.replace('(adsbygoogle = window.adsbygoogle || []).push({}', '');
    const itemArr = string.split('\n');
    let tip = itemArr[8];
    if (tip?.length > 3) tip = tip.split(' ')[1];
    
    const matchObj = {
      time: itemArr[0],
      teams: itemArr[1].trim(),
      tip
    };

    const predictionRawData = itemArr.filter((i) => i.includes('1: ') || i.includes('2: '))
    const predictionFormatData = predictionRawData.map((i) => i.split(':')[1]);

    matchObj.p1 = parseInt(predictionFormatData[0]);
    matchObj.p2 = parseInt(predictionFormatData[1]);
    matchObj.odd1 = parseFloat(predictionFormatData[2]);
    matchObj.odd2 = parseFloat(predictionFormatData[3]);

    return matchObj;
  })
  .filter((i) => i.time);
};

const checkPairs = (pairsArr) => {
  const tips = ['1', '2'];
  const minOdds1 = 2.1;
  const minOdds2 = 3.0;
  const maxPredict = 19;
  const minPredict2 = 61;

  const result = pairsArr.filter(({ p1, p2, odd1, odd2, tip }) => {
    if (
      tips.includes(tip) &&
      ((odd1 >= minOdds1 && odd2 >= minOdds2) || (odd1 >= minOdds2 && odd2 >= minOdds1)) &&
      ((p1 <= maxPredict && p2 >= minPredict2) || (p1 >= minPredict2 && p2 <= maxPredict))
    ) {
      return true;
    }

    return false;
  });

  return result;
};

/**
 * @param {Array} res
 */
const parseResToString = (res) => {
  return res.map((item) => {
    let str = '';

    for (const key in item) {
      if (Object.hasOwnProperty.call(item, key)) {
        const element = item[key];
        str += `${key}: ${element}\n`;
      }
    }

    return `${str}\n`;
  });
};

module.exports = { parseTableDate, checkPairs, parseResToString };
