import { createConnection } from "mysql2";
import { mysqlConfig } from "../config";

export class DB {
  static async query(sql: string, params?: Array<any>) {
    const connection = DB.getConnection();
    const [result] = await connection.promise().query(sql, params);
    return result;
  }

  private static getConnection() {
    return createConnection(mysqlConfig);
  }
}
