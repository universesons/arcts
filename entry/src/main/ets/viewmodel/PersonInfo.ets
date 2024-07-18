import { CommonConstants as Const } from '../common/constants/CommonConstants';
import dataStorage from '@ohos.data.storage';
import featureAbility from '@ohos.ability.featureAbility';

import preferences from '@ohos.data.preferences'


export default class personInfo {
  userName: string; // 用户名
  userSignature: string; // 用户个性签名
  userAvatar: string; // 用户头像
  userSex: string; // 用户性别
  userYear: number; // 出生年
  userMonth: number; // 出生月
  userDay: number; // 出生日
  userHeight: string; // 身高 单位:厘米
  userWeight: string; // 体重 单位:千克
  userLevel: string; // 用户等级

  constructor(
    userName: string = Const.NICK_NAME,
    userSignature: string = Const.SIGNATURE,
    userAvatar: string = "", // 默认头像为空字符串，可以根据需要修改
    userSex: string = "男", // 默认性别为男
    userYear: number = 2004, // 默认出生年
    userMonth: number = 4, // 默认出生月
    userDay: number = 11, // 默认出生日
    userHeight: string = "170", // 默认身高为170厘米
    userWeight: string = "60", // 默认体重为60千克
    userLevel: string = "5"
  ) {
    this.userName = userName;
    this.userSignature = userSignature;
    this.userAvatar = userAvatar;
    this.userSex = userSex;
    this.userYear = userYear;
    this.userMonth = userMonth;
    this.userDay = userDay;
    this.userHeight = userHeight;
    this.userWeight = userWeight;
    this.userLevel = userLevel;
  }
}

export class StoreUtil {
  readonly storeName: string;
  readonly key: string;

  constructor(storeName: string, key: string) {
    this.storeName = storeName;
    this.key = key;
  }

  getStore() {
    return preferences.getPreferences(getContext(this), this.storeName);
  }

  async getData<T extends personInfo>(): Promise<T> {
    const store = await this.getStore();
    const data = await store.get(this.key, "{}") as string;
    if (data === "{}") {
      let person:personInfo = new personInfo()
      return person as T;
    }
    return JSON.parse(data) as T;
  }

  async setData<T>(data: T): Promise<void> {
    const store = await this.getStore();
    await store.put(this.key, JSON.stringify(data));
    await store.flush();
  }

  async delData() {
    const store = await this.getStore();
    await store.delete(this.key);
    await store.flush();
  }
}