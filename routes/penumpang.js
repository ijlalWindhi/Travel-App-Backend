//import library
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const penumpang = model.penumpang

// auth
const auth = require('../auth');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "skuytravel"

// Get all data penumpang
app.get("/api/v1/", auth, (req, res) => {
    penumpang
        .findAll()
        .then(result => {
            res.json({penumpang: result})
        })
        .catch(error => {
            res.json({message: error.message})
        })
    })

// Register
app.post("/api/v1/register", async (req, res) => {
    // initial variable
    let data = {
        username: req.body.username,
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
        telp: req.body.telp
    };

    // bcrypt password
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    penumpang
        .create(data)
        .then((result) => {
            res
                .status(200)
                .json({message: "Data has been created", data: result});
        })
        .catch((error) => {
            res.json({message: error.message});
        });
});
// Login
app.post("/api/v1/login", async (req, res) => {
    const user = await penumpang.findOne({where : {nama: req.body.nama}});
    if (user) {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            // token
            let payload = JSON.stringify(user)
            let token = jwt.sign(payload, SECRET_KEY)
            
            res.json({  status: "success",
                        message: "Valid password",
                        token: token});
        } else {
            res.json({status: "error",message: "Invalid Password"});
        }
    } else {
        res.json({message: "User does not exist"});
    }
});

// Delete data penumpang
app.delete("/api/v1/:id", (req, res) => {
    let param = {
        id: req.params.id
    }
    penumpang
        .destroy({where: param})
        .then(result => {
            res.json({message: "data has been deleted"})
        })
        .catch(error => {
            res.json({message: error.message})
        })
    })

// Edit data penumpang
app.put("/api/v1/:id", (req, res) => {
    let param = {
        id: req.params.id
    }
    let data = {
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
        telp: req.body.telp
    }
    penumpang
        .update(data, {where: param})
        .then(result => {
            res.json({message: "data has been updated"})
        })
        .catch(error => {
            res.json({message: error.message})
        })
    })

module.exports = app