import { DB } from "../utils";

export default class OrderService {
  static cancel(params: any) {
    return DB.query("UPDATE `order` SET status = 2 WHERE id =?", params);
  }
  static pay(params: any) {
    return DB.query("UPDATE `order` SET status = 1 WHERE id =?", params);
  }
  static remove(id: any) {
    // 逻辑删除 修改某一个字段 查询的作为条件
    return DB.query("UPDATE `order` SET is_del = 1 WHERE id = ?", [id]);
  }
  static findOrderDesc(params: any) {
    return DB.query("SELECT * FROM `order_desc` WHERE oid = ?", params);
  }
  static findAll(params: any) {
    return DB.query("SELECT * FROM `order` WHERE uid = ? AND status = ? AND is_del = 0", params);
  }
  static createOrder(params: any) {
    return DB.query("INSERT INTO `order` SET ?", params);
  }
  static createOrderDesc(params: any) {
    return DB.query("INSERT INTO order_desc SET ?", params);
  }
}
