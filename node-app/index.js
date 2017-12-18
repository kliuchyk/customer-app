const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongojs = require('mongojs');
const db = mongojs('customerapp', ['customerapp']);
const ObjectId = mongojs.ObjectId;

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator middleware
app.use(expressValidator());

// Global Variabls
app.use((req, res, next) => {
    res.locals.errors = null;
    next();
});

app.get('/', (req, res) => {
    // find everything
    db.customerapp.find(function (err, docs) {
        console.log(docs);
        res.render('index', {
            title: 'Customer',
            users: docs
        });
    });    
});

app.post('/users/add', (req, res) => {

    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.render('index', {
            title: 'Customer',
            users: users,
            errors: errors
        });
    } else {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }

        db.customerapp.insert(newUser, (err, result) => {
            if (err) {
                console.log(err)
            }

            res.redirect('/');
        });

    }
});

app.delete('/users/delete/:id', (req, res) => {
    db.customerapp.remove({ _id: ObjectId(req.params.id)}, function(err, results) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server is running...');
});