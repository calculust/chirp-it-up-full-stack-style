import { Users } from '../../../types';
import { Query } from '../index';

const getByName = async (name: string) => Query<Users[]>('SELECT * FROM Users WHERE name=?', [name]);
const create = (user: Users) => Query('INSERT INTO Users SET ?', [user]);

export default {
    getByName,
    create
}