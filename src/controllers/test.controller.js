const db = require('../models');
const fetch = require('node-fetch');

async function fetchText() {
    let response = await fetch('https://taylorswiftapi.herokuapp.com/get');

    if (response.status === 200) {
        let data = await response.text();
        let parsed_data = JSON.parse(data);
        let quote = parsed_data['quote'];
        let song = parsed_data['song'];
        let album = parsed_data['album'];
        return (`"${quote}" - ${song} (${album})`);
    }
}


exports.test = async (req, res, next) => {
    
    res.send(`
    ===========================================================
    TEST BOOP IN POSTMAN.
    -----------------------------------------------------------
    This is a successful boop! Here's a T. Swift lyric for you:

    ${await fetchText()}
    ===========================================================
    `);
}

exports.populate_admin = (req, res, next) => {
    db.User
        .create({
            user_id: 'df46833f-337e-45b9-9a69-2623aa42b189',
            first_name: 'Albert Angelo',
            last_name: 'Lupo',
            full_name: 'Albert Angelo Lupo',
            password: 'Admin_111',
            user_type: 'Admin',
            email_address: 'blaterwolf@gmail.com',
            contact_number: '09235156125',
            verified: true,
            created_by: 'df46833f-337e-45b9-9a69-2623aa42b189',
            verified_by: 'df46833f-337e-45b9-9a69-2623aa42b189',
            status: 'Active'
        })
        .then((data) => {
            let s_data = {
                error: false,
                data: data,
            }
            // >> Success Message!
            res.send(`
            ========================================================================
            Success! Admin - Albert is populated.
            ------------------------------------------------------------------------
            Your request has been sent to the database, here's a song lyric for you:
            
            "Don't blame me, love made me crazy." - Don't Blame Me, Taylor Swift
            
            Info:
            ${JSON.stringify(s_data)}
            ========================================================================
            `);
        })
        .catch((err) => {
            let f_data = {
                error: true,
                data: [],
                message: err.errors.map((e) => e.message),
            }
            res.status(500).send(`
            ========================================================================
            Error! Something happened.
            ------------------------------------------------------------------------
            Your request failed, here's a song lyric for you though:
            
            "Call me in the morning, I'll be on the way" - Montero, Lil Nas X
            
            Info:
            ${JSON.stringify(f_data, null, 4)}
            ========================================================================
            `)
        });
}

exports.populate_librarians = (req, res, next) => {

    // ! Alamin yung about sa automatic pag-fill ng full_name.
    db.User
        .create({
            user_id: 'b89d075f-6830-4c88-8891-e3407a3813b0',
            first_name: 'Shane Jean',
            last_name: 'Razal',
            password: 'Librarian_111',
            user_type: 'Librarian',
            email_address: 'shanerazal@gmail.com',
            contact_number: '09123456789',
            verified: true,
            created_by: 'df46833f-337e-45b9-9a69-2623aa42b189',
            verified_by: 'df46833f-337e-45b9-9a69-2623aa42b189',
            status: 'Active'
        })
        .then((data) => {
            let s_data = {
                error: false,
                data: data,
            }
            // >> Success Message!
            res.send(`
            ========================================================================
            Success! A librarian has been populated.
            ------------------------------------------------------------------------
            Your request has been sent to the database, here's a song lyric for you:
            
            "Don't blame me, love made me crazy." - Don't Blame Me, Taylor Swift
            
            Info:
            ${JSON.stringify(s_data)}
            ========================================================================
            `);
        })
        .catch((err) => {
            let f_data = {
                error: true,
                data: [],
                message: err.errors.map((e) => e.message),
            }
            res.status(500).send(`
            ========================================================================
            Error! Something happened.
            ------------------------------------------------------------------------
            Your request failed, here's a song lyric for you though:
            
            "Call me in the morning, I'll be on the way" - Montero, Lil Nas X
            
            Info:
            ${JSON.stringify(f_data, null, 4)}
            ========================================================================
            `)
        });
}

exports.populate_residents = (req, res, next) => {
}

exports.user_table = (req, res, next) => {
    db.User.findAll()
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: ['Retrieved Successfully']
            });
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message),
            });
        })
}

exports.one_user = (req, res, next) => {
    db.User.findOne({
        where: {
            email_address: req.body.email_address,
            status: 'Active'
        }
    })
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: ['Retrieved Successfully']
        });
    })
    .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message),
        });
    })
}