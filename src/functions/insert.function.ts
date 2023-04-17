import { bulkInsertMysql } from "@core/functions/bulk-insert-mysql.function";
import mysql from "mysql2";

export async function insert<T>(table: string, data: any[]) {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    await bulkInsertMysql(pool, table, data);
    pool.end();
}