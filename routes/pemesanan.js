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
const pemesanan = model.pemesanan
const transportasi = model.transportasi

// Get all data pemesanan
app.get("/api/v1/", (req, res) => {
    pemesanan
        .findAll({
            // include:[{model:transportasi}]
        })
        .then(result => {
            res.json({pemesanan: result})
        })
        .catch(error => {
            res.json({message: error.message})
        })
})

app.get("/api/v1/:id", (req, res) => {
    pemesanan
        .findOne({
            where:{id : req.params.id},
            include:[{model:transportasi}]
        })
        .then(result => {
            res.json({pemesanan: result})
        })
        .catch(error => {
            res.json({message: error.message})
        })
})

// add pemesanan
app.post("/api/v1/:id", async (req, res) =>{
        // initial variable
        let data = {
            id_transportasi: req.params.id,
            nama: req.body.nama,
            pembayaran: req.body.pembayaran,
            tanggal_keberangkatan: req.body.tanggal_keberangkatan,
            kursi: req.body.kursi,
        };
    
        pemesanan
            .create(data)
            .then((result) => {
                res
                    .status(200)
                    .json({message: "Data has been created", data: result});
            })
            .catch((error) => {
                res.json({message: error.message});
            });
})

module.exports = app