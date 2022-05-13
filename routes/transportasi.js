//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//import model
const model = require('../models/index');
const transportasi = model.transportasi

//config storage image
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./public/image/transportation/")
    },
    filename: (req,file,cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

// Get all data transportasi
app.get("/api/v1/transportasi", (req, res) => {
    transportasi
        .findAll()
        .then(result => {
            res.json({transportasi: result})
        })
        .catch(error => {
            res.json({message: error.message})
        })
    })

// Upload data
app.post("/api/v1/transportasi/add", upload.single("gambar"), async (req, res) =>{
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            jenis: req.body.jenis,
            nama: req.body.nama,
            gambar: req.file.filename,
            harga: req.body.harga,
            ruteAwal: req.body.ruteAwal,
            ruteAkhir: req.body.ruteAkhir,
        }
        transportasi
        .create(data)
        .then(result => {
            res
                .status(200)
                .json({
                    message: "data has been inserted"
                })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }
})

module.exports = app