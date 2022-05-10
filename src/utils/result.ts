export class Result {
  // 状态码：表示请求状态
  private code: number;
  // 响应的数据
  private data: any;
  // 响应的时间
  private timestamp: Date;

  constructor(code: number, data: any) {
    this.code = code;
    this.data = data;
    this.timestamp = new Date();
  }

  static success(data: any) {
    return new Result(200, data);
  }

  static fail(code: number, data: string) {
    return new Result(code, data);
  }
}
