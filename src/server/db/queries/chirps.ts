import { Chirps } from '../../../types';
import { Query } from '../index';

const all = async () => Query<Chirps[]>(`
    SELECT c.*, u.name
        FROM Chirps c
        INNER JOIN Users u
        ON c.userid = u.id
    `);
const one = async (id: number) => Query<Chirps[]>(`
    SELECT c.*, u.name
    FROM Chirps c
    INNER JOIN Users u
    ON c.userid = u.id
    WHERE c.id = ?
    `, [id]);
const create = (chirp: Chirps) => Query('INSERT INTO Chirps SET ?', [chirp]);
const update = (content: Chirps['content'], id: Chirps['id']) => Query('UPDATE Chirps SET content=? WHERE id=?', [content, id]);
const destroy = (id: Chirps['id']) => Query('DELETE FROM Chirps WHERE id=?', [id]);

export default {
    all,
    one,
    create,
    update,
    destroy
}