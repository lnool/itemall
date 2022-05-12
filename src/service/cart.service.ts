import { DB } from "../utils";

export default class CartService {
  static remove(params: any[]) {
    // params = 1,2,3
    return DB.query(`DELETE FROM cart WHERE id IN(${params})`);
  }
  static findAll(params: any[]) {
    return DB.query("SELECT * FROM cart WHERE uid = ?", params);
  }
  static update(params: Array<any>) {
    return DB.query("UPDATE cart SET ? WHERE id = ?", params);
  }
  static findExists(params: Array<any>) {
    return DB.query("SELECT * FROM cart WHERE uid = ? AND gid = ?", params);
  }
  static create(body: any) {
    return DB.query("INSERT INTO cart SET ?", body);
  }
}
