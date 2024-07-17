import { oneWeekDictFunc } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
/**
 * TaskInfo
 *
 * @param id
 * @param date
 * @param taskID
 * @param targetValue
 * @param isAlarm
 * @param startTime
 * @param endTime
 * @param frequency
 * @param isDone
 * @param doneValue
 * @param isOpen
 */
export default class TaskInfo {
    id: number;
    date: string;
    taskID: number; //用来确定任务种类
    targetValue: string; // 目标次数
    isAlarm: boolean; // 是否开启了提醒
    startTime: string; // 开始时间
    endTime: string; // 结束时间
    frequency: string; // 提醒频率
    isDone: boolean; // 是否完成
    finValue: string; // 当前的进度值
    isOpen: boolean; // 是否开启
    constructor(id: number, date: string, taskID: number, targetValue: string, isAlarm: boolean, startTime: string, endTime: string, frequency: string, isDone: boolean, finValue: string, isOpen = false) {
        this.id = id;
        this.date = date;
        this.taskID = taskID;
        this.targetValue = targetValue;
        this.isAlarm = isAlarm;
        this.startTime = startTime;
        this.endTime = endTime;
        this.frequency = frequency;
        this.isDone = isDone;
        this.finValue = finValue;
        this.isOpen = isOpen;
    }
}
export enum taskType {
    'getup' = 1,
    'drinkWater' = 2,
    'eatApple' = 3,
    'smile' = 4,
    'brushTeeth' = 5,
    'sleepEarly' = 6,
    'run' = 7
}
export const oneWeek = oneWeekDictFunc();
