const axios = require('axios').default;
const fs = require('fs');

module.exports = async (FILE, MIN, MAX) => 
{
    let data = [];
    for (let i = MIN; i <= MAX; i++) {
        console.log('extract from index ' + i);
        try {
            const response = await axios({
                method: 'get',
                url: `https://konzern.oebb.at/konzern-apps/lok/index/1144.${ String(i).padStart(4, '0') }`,
                responseType: 'application/json'
            });
            const newData = JSON.parse(JSON.stringify(response.data));
            data = data.concat(newData);
        }

        catch(error) {
            console.log(`error at index ${i}\n ${error}`);
        }
    }
    const jsonData = JSON.stringify(data, null, '\t');
    fs.writeFile(FILE, jsonData, (err) => console.log);
    console.log('Data written to file ' + FILE);
}