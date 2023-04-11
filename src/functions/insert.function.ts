import { bulkInsertMssql } from "@core/functions/bulk-insert-mssql.function";
import sql from "mssql";

export function insert(table: string, data: any[]) {
    return bulkInsertMssql(sql, table, data);
}