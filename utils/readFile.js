const fs = require('fs');

const readFile = (url) => {
  try {
    const data = fs.readFileSync(url, 'utf-8');
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    return [];
  }
};

module.exports = readFile;
