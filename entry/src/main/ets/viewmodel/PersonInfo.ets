import { CommonConstants as Const } from '../common/constants/CommonConstants';
import dataStorage from '@ohos.data.storage';
import featureAbility from '@ohos.ability.featureAbility';



export default class personInfo {
  userName: string; // 用户名
  userSignature: string; // 用户个性签名
  userAvatar: string; // 用户头像
  userSex: number; // 用户性别，0表示女，1表示男
  userYear: number; // 出生年
  userMonth: number; // 出生月
  userDay: number; // 出生日
  userHeight: number; // 身高 单位:厘米
  userWeight: number; // 体重 单位 千克
  userLevel:number; // 用户等级

  constructor(
    userName: string = Const.NICK_NAME,
    userSignature: string = Const.SIGNATURE,
    userAvatar: string = "", // 默认头像为空字符串，可以根据需要修改
    userSex: number = 1, // 默认性别为男
    userYear: number = 2004, // 默认出生年
    userMonth: number = 4, // 默认出生月
    userDay: number = 11, // 默认出生日
    userHeight: number = 170, // 默认身高为170厘米
    userWeight: number = 60, // 默认体重为60千克
    userLevel: number = 5
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

    private init(){
      featureAbility.getContext().getFilesDir((error, path) =>{

      })
    }


}
