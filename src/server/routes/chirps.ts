import * as express from 'express';
import db from '../db';

let router = express.Router();

// GET - All Chrips
router.get('/', async (req, res) => {
    try {
        res.json(await db.Chirps.all());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// GET - Single Chirp
router.get('/:id', async (req, res) => {
    try {
        res.json((await db.Chirps.one(Number(req.params.id)))[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// POST - Create Chrip
router.post('/', async (req, res) => {
    try {
        const newchirpdata = req.body;
        const userdata = await db.Users.getByName(newchirpdata.name);
        if(userdata.length > 0) { // If user exists
            const newchirp = {
                userid: userdata[0].id,
                content: newchirpdata.content,
                location: "test location"
            }
            const db_response = await db.Chirps.create(newchirp);
            res.json({
                message: "The new chirp was added successfully!",
                insertId: db_response.insertId
            });
        } else { // If user DOES NOT exist
            const newuserdata = {
                name: newchirpdata.name,
                email: "tempemail",
                password: "temppassword"
            }
            const new_user_db_response = await db.Users.create(newuserdata);
            
            const newchirp = {
                userid: new_user_db_response.insertId,
                content: newchirpdata.content,
                location: "test location"
            }
            const db_response = await db.Chirps.create(newchirp);
            res.json({
                message: "The new chirp was added successfully!",
                insertId: db_response.insertId
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ e });
    }
});

// PUT - Edit Chirp
router.put('/', async (req, res) => {
    try {
        const { content, id } = req.body;
        const db_response = await db.Chirps.update(content, id);
        if (db_response.affectedRows === 1) {
            res.json({ message: "The chirp was updated successfully!" });
        } else {
            res.status(404).json({ message: `The post with id#${id} was not found` });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ e });
    }
});

// DELETE - Destroy Chirp
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db.Chirps.destroy(id);
        res.json({ message: "The chirp was deleted successfully." });
    } catch (e) {
        console.log(e.sqlMessage);
        res.status(500).json({ e });
    }
});

export default router;