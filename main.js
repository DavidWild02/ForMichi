const axios = require('axios').default;
const fs = require('fs');

module.exports = async (FILE, MIN, MAX, ID_TRAINS) => 
{
    let data = [];
    for (const id of ID_TRAINS) {
        for (let i = MIN; i <= MAX; i++) {
            console.log('extract from index ' + i + ' from train ' + id);
            try {
                const response = await axios({
                    method: 'get',
                    url: `https://konzern.oebb.at/konzern-apps/lok/index/${id}.${ String(i).padStart(4, '0') }`,
                    responseType: 'application/json'
                });
                const newData = JSON.parse(JSON.stringify(response.data));
                data = data.concat(newData);
            }
    
            catch(error) {
                console.log(`error at index ${id}.${i}\n ${error}`);
            }
        }
    }
    const jsonData = JSON.stringify(data, null, '\t');
    fs.writeFile(FILE, jsonData, (err) => console.log);
    console.log('Data written to file ' + FILE);
}