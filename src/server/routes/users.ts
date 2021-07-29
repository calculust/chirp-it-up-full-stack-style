import * as express from 'express';
import db from '../db';

let router = express.Router();

// GET - Get User Data by Name
router.get('/:name', async (req, res) => {
    try {
        res.json((await db.Users.getByName(req.params.name))[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// POST - Create User
router.post('/', async (req, res) => {
    try {
        const newuser = req.body;
        const db_response = await db.Users.create(newuser);
        res.json({
            message: "The new user was added successfully!",
            insertId: db_response.insertId
        });
    } catch (e) {
        console.log(e.sqlMessage);
        res.status(500).json({ e });
    }
});

export default router;