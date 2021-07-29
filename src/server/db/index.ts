import * as mysql from 'mysql';
import { sqlConfig } from '../config';
import { MySQL_Res } from '../../types';

import Chirps from './queries/chirps';
import Users from './queries/users';

const pool = mysql.createPool({
    ...sqlConfig
});

export const Query = <T = MySQL_Res>(query: string, values?: Array<unknown>) => {
    const formattedQuery = mysql.format(query, values);
    console.log({ formattedQuery });

    return new Promise<T>((resolve, reject) => {
        pool.query(formattedQuery, (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        });
    });
}

export default {
    Chirps,
    Users
}