import { DB } from "../utils";

export default class HomeService {
  static findRecommend() {
    return DB.query("select * from recommend");
  }
  static findBanner() {
    return DB.query("select * from banner");
  }
}
