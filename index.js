//import
const express = require('express');
const cors = require('cors');
const path = require('path')

//implementasi
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))

//endpoint
const petugas = require('./routes/petugas')
app.use("/petugas", petugas)
const penumpang = require('./routes/penumpang')
app.use("/penumpang", penumpang)
const transportasi = require('./routes/transportasi')
app.use("/transportasi", transportasi)
const pemesanan = require('./routes/pemesanan')
app.use("/pemesanan", pemesanan)

//run server
app.listen(8080, () => {
    console.log('server run on port 8080')
})