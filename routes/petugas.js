//import library
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const petugas = model.petugas

// auth
// const auth = require('../auth');

// Get all data petugas
app.get("/api/v1/", (req,res) => {
    petugas.findAll()
        .then(result => {
            res.json({
                petugas : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

// Post data petugas
app.post("/api/v1/register", async (req,res) => {
    const data = {
        nama : req.body.nama,
        username : req.body.username,
        password : req.body.password
    }
    
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    petugas.create(data)
        .then(result => {
            res.json({
                message: "data has been created"
            })
        })
        .catch(error => {

            res.json({
                message: error.message
            })
        })
})

// Login
app.post("/api/v1/login", async (req, res) => {
    const user = await petugas.findOne({where : {nama: req.body.nama}});
    if (user) {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            // token
            // let payload = JSON.stringify(user)
            // let token = jwt.sign(payload, SECRET_KEY)
            
            res.json({  status: "success",
                        message: "Valid password",
                    });
        } else {
            res.json({status: "error",message: "Invalid Password"});
        }
    } else {
        res.json({message: "User does not exist"});
    }
});

// Delete data petugas
app.delete("/:id", (req,res) => {
    let param = {
        id : req.params.id
    }
    petugas.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

// Edit data petugas
app.put("/:id", (req,res) => {
    let param = {
        id : req.params.id
    }
    let data = {
        nama : req.body.nama,
        username : req.body.username,
        password : req.body.password
    }
    petugas.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app

