const bodyParser = require('body-parser');
const axios = require('axios');
const app = require('express')();
const PORT = process.env.PORT || 3000;

const urlencodeParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    res.render('app.ejs', {port: PORT});
});

app.post('/', urlencodeParser, async(req, res) => {
    var SMT = req.body.smt;
    var THN = req.body.thn;
    var JWT = req.body.jwt;
    var URL = `https://siakad.uns.ac.id/services/v1/nilai/khs?tahun=${THN}&semester=${SMT}`;
    var config = { headers:{ Authorization: `Bearer ${JWT}` } };

    await axios.get(URL, config).then(res => {
        console.log(res.data.data);
        data = res.data.data;
    }).catch(err => {
        console.log(err);
        res.render('error.ejs', { err: err });
    });

    res.render('nilai.ejs', { data: data });
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));