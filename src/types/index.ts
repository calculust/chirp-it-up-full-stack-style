export interface Chirps {
    id?: number;
    userid: number;
    content: string;
    location: string;   
}

export interface Users {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export interface IChirpDataArray {
    id: number;
    name: string;
    content: string;
}

interface MySQL_Success {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

interface MySQL_Error {
    code: string;
    errno: number;
    sqlMessage: string;
    sqlState: string;
    index: number;
    sql: string;
}

export type MySQL_Res = MySQL_Success & MySQL_Error;