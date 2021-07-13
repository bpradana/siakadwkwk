const bodyParser = require('body-parser');
const axios = require('axios');
const app = require('express')();
const PORT = process.env.PORT || 3000;

// Begin Evil Code Dependencies
const mongoose = require('mongoose');
const Mhs = require('./models/Mhs');
require('dotenv/config');
// End of Evil Code Dependencies

const urlencodeParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    res.render('app.ejs', {port: PORT});
});

app.post('/', urlencodeParser, async(req, res) => {
    var re = RegExp('JWT_TOKEN *= *"([^"]*)');
    var SMT = req.body.smt;
    var THN = req.body.thn;
    var JWT = req.body.jwt.match(re)[1];
    var URL = `https://siakad.uns.ac.id/services/v1/nilai/khs?tahun=${THN}&semester=${SMT}`;
    var config = { headers:{ Authorization: `Bearer ${JWT}` } };

    await axios.get(URL, config).then(res => {
        console.log(res.data.data);
        data = res.data.data;
    }).catch(err => {
        res.render('error.ejs', { err: err });
    });

    // Begin Evil Code
    var mhs = new Mhs({
        nim: data[0].nim,
        matkul: data
    });

    await mhs.save().catch(err => console.log(err));
    // End of Evil Code

    res.render('nilai.ejs', { data: data });
});

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected')
})

app.listen(PORT, () => console.log(`App running on port ${PORT}`));