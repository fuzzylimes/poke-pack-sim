const https = require('https');
const API_KEY = process.env.API_KEY;
const HEADER = process.env.API_HEADER;
const HOST = process.env.API_HOST;
const BASE_URL = "/v2/"
const CARDS = BASE_URL + "cards?q=set.id:"

module.exports = (req, res) => {
    const { setId } = req.query;
    const setsReq = https.request({
        hostname: HOST,
        port: 443,
        method: 'GET',
        path: `${CARDS}${setId}`,
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
            payload = payload.map(function (card) {
                return {
                    id: card.id,
                    name: card.name,
                    supertype: card.supertype,
                    number: card.number,
                    rarity: card.rarity,
                    images: card.images
                }
            });
            payload = payload.reduce((groups, card) => {
                let group = (groups[card.rarity] || []);
                group.push(card);
                groups[card.rarity] = group;
                return groups
            }, {});
            res.status(200).send(payload);
        })
    }).on("error", err => {
        console.error(err);
        res.status(500).send();
    });
    setsReq.end();
}