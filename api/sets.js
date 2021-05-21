const https = require('https');
const API_KEY = process.env.API_KEY;
const HEADER = process.env.API_HEADER;
const HOST = process.env.API_HOST;
const BASE_URL = "/v2/"
const SETS = BASE_URL + "sets"
const CARDS = BASE_URL + "cards"

module.exports = (req, res) => {
    const setsReq = https.request({
        hostname: HOST,
        port: 443,
        method: 'GET',
        path: SETS,
        timeout: 2000,
        headers: {
            [HEADER]: API_KEY
        }
    }, resp => {
        let data = '';
        resp.on("data", d => {
            data += d;
        })
        resp.on('end', () => {
            payload = JSON.parse(data).data;
            // payload = payload.filter(set => set.total > 50);
            // payload = payload.map(function (set) {
            //     return {
            //         id: set.id,
            //         name: set.name,
            //         series: set.series,
            //         total: set.total,
            //         images: set.images
            //     }
            // });
            // payload = payload.reduce((groups, set) => {
            //     let group = groups[set.series];
            //     group.push(set);
            //     groups[set.series] = group;
            //     return groups
            // });
            res.status(200).send(payload);
        })
    }).on("error", err => {
        console.log(err);
        res.status(500).send();
    });
    setsReq.end();
}