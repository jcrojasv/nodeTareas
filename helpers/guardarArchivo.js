const fs = require('fs');


const fileName = './db/data.json';

const guardarData = (data) => {
  fs.writeFileSync(fileName, JSON.stringify(data));
};

const leerData = () => {

  if (!fs.existsSync(fileName)) {
    return null;
  }
  const info = fs.readFileSync(fileName, { encoding: 'utf-8' });
  const data = JSON.parse(info);

  return data;
}

module.exports = {
  guardarData,
  leerData
}
