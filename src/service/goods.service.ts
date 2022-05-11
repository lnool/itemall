import { DB } from "../utils/db";

export default class GoodsService {
  static findAll(params: any[]) {
    return DB.query("select * from goods where type = ? limit ?,?", params);
  }

  static findOne(id: number) {
    return DB.query("select * from goods where id=?", [id]);
  }

  static findDetail(iid: any) {
    return DB.query("select * from detail where iid=?", [iid]);
  }
}
