import { DB } from "../utils";

export default class CategoryService {
  static findSubCategory(maitKey: any) {
    return DB.query("select * from subcategory where maitKey=?", [maitKey]);
  }
  static findAll() {
    return DB.query("select * from category");
  }
}
