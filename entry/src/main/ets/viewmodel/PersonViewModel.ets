
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import Logger from '../common/utils/Logger';
import reminder from '../service/ReminderAgent';

export function removeUnit(str: string, unit: string): string {
  // 正则表达式，用于匹配单位，并确保它是字符串的末尾部分
  const unitRegex = new RegExp(`${unit}$`);
  // 使用 replace 方法删除单位
  return str.replace(unitRegex, '').trim();
}

export function addUnit(str: string, unit: string): string {
  return str + " " + unit;
}

export const createHeightRange = () => {
  const heightRangeArr: Array<string> = [];
  heightRangeArr.push(addUnit("小于 " + Const.HEIGHT_MIN_RANGE, Const.HEIGHT_UNIT))
  for (let i = Const.HEIGHT_MIN_RANGE; i <= Const.HEIGHT_MAX_RANGE; i += Const.HEIGHT_STEP) {
    heightRangeArr.push(addUnit(`${i}`, Const.HEIGHT_UNIT))
  }
  heightRangeArr.push(addUnit("大于 " + Const.HEIGHT_MAX_RANGE, Const.HEIGHT_UNIT))
  return heightRangeArr;
}

export const createWeightRange = () => {
  const weightRangeArr: Array<string> = [];
  weightRangeArr.push(addUnit("小于 " + Const.WEIGHT_MIN_RANGE, Const.WEIGHT_UNIT))
  for (let i = Const.WEIGHT_MIN_RANGE; i <= Const.WEIGHT_MAX_RANGE; i += Const.WEIGHT_STEP) {
    weightRangeArr.push(addUnit(`${i}`, Const.WEIGHT_UNIT))
  }
  weightRangeArr.push(addUnit("大于 " + Const.WEIGHT_MAX_RANGE, Const.WEIGHT_UNIT))
  return weightRangeArr;
}