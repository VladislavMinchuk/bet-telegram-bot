const HTML = require('node-html-parser');

const getTableData = (page) => {
  const table = HTML.parse(page).querySelector('.content_table');
  return table.structuredText.split(');');
}

module.exports = { getTableData };
