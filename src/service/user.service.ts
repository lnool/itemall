// 导入腾讯云SDK
import * as tencentcloud from "tencentcloud-sdk-nodejs";
import { DB } from "../utils";

export default class UserService {
  static findUserByPhone(phone: string) {
    return DB.query("SELECT * FROM user WHERE phone = ?", [phone]);
  }
  static register(body: any) {
    return DB.query("INSERT INTO user SET ?", body);
  }
  static async sendCode(phone: string, code: string) {
    // 获取腾讯云客户端
    const SmsClient = tencentcloud.sms.v20210111.Client;

    // 获取腾讯云参数
    const clientConfig = {
      credential: {
        // secretId
        secretId: "AKIDNWR8ZkG88tOkslDqUyFH6HEpH6j9kWu5",
        // secretKey
        secretKey: "66cljT0pQ3Q2A5jChYBXfYszviNoyvc6",
      },
      region: "ap-guangzhou",
      profile: {
        httpProfile: {
          endpoint: "sms.tencentcloudapi.com",
        },
      },
    };
    // 创建客户端
    const client = new SmsClient(clientConfig);
    // 创建请求参数
    const params = {
      // 手机号码
      PhoneNumberSet: [`+86${phone}`],
      // SmsSDK的应用id
      SmsSdkAppId: "1400495284",
      // 模板名称
      SignName: "雨道小程序",
      // 模板id
      TemplateId: "894268",
      // 验证码
      TemplateParamSet: [code],
    };
    // 发送短信
    const {
      SendStatusSet: [SendStatus],
    } = await client.SendSms(params);
    return SendStatus.Fee > 0;
  }
}
