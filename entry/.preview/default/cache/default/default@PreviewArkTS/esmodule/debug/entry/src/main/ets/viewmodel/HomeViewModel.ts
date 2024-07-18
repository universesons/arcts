import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import { isReachNewAchievement, ACHIEVEMENT_LEVEL_KEY } from "@bundle:com.example.healthy_life/entry/ets/model/AchieveModel";
import { TaskMapById, ACHIEVEMENT_LEVEL_LIST } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import type { ITaskItem } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import TaskInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
import DayInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/DayInfo";
import { dateToStr, weekDateFormat } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
import { WeekDateModel, initializeOnStartUp, getPreviousWeek, WEEK_DAY_NUM } from "@bundle:com.example.healthy_life/entry/ets/model/WeekCalendarModel";
import DatabaseApi from "@bundle:com.example.healthy_life/entry/ets/model/DatabaseModel";
import TaskInfoTableApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/TaskInfoApi";
import DayInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/DayInfoApi";
import GlobalInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/GlobalInfoApi";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import type GlobalInfo from './GlobalInfo';
import type WeekCalendarInfo from './WeekCalendarInfo';
import type AchievementInfo from './AchievementInfo';
@Observed
export class HomeStore {
    public currentDate: Date;
    public dateArr: Array<WeekDateModel> = []; // data source list
    public selectedDay: number; // selected day of on week
    public showDate: number;
    public dateTitle: string;
    public selectedDayInfo: WeekDateModel = new WeekDateModel('', '', new Date()); // task info on selected day
    constructor(currentDate: Date) {
        this.currentDate = currentDate;
        this.showDate = currentDate.getTime();
        this.dateTitle = weekDateFormat(currentDate.getTime());
        this.selectedDay = (new Date().getDay() + WEEK_DAY_NUM - 1) % WEEK_DAY_NUM;
    }
    public initData() {
        let weekCalendarInfo: WeekCalendarInfo = initializeOnStartUp(this.currentDate);
        this.dateArr = weekCalendarInfo.arr;
        Logger.info('this.currentDate', this.currentDate.toDateString());
        Logger.info('initWeekData dateArr', JSON.stringify(weekCalendarInfo.strArr));
        // get data form db
        DatabaseApi.query(dateToStr(new Date()), (taskList: TaskInfo[], dayInfo: DayInfo) => {
            Logger.info('Current Day Task Info: ', JSON.stringify(taskList));
            DayInfoApi.queryList(weekCalendarInfo.strArr, (res: DayInfo[]) => {
                let tempList = res.concat(dayInfo);
                Logger.info('initDayInfoList: ', JSON.stringify(res));
                for (let i = 0; i < this.dateArr.length; i++) {
                    let tempDayInfo = tempList.find((item: DayInfo) => item.date === this.dateArr[i].dateStr) || new DayInfo(this.dateArr[i].dateStr, 0, 0);
                    weekCalendarInfo.arr[i].dayInfo = tempDayInfo;
                    if (this.dateArr[i].dateStr === dateToStr(new Date(this.showDate))) {
                        // get tasks of showDate
                        weekCalendarInfo.arr[i].taskList = taskList;
                    }
                }
                this.dateArr = weekCalendarInfo.arr;
                setTimeout(() => {
                    this.setSelectedShowDate(this.showDate);
                }, 0);
            });
        });
    }
    public getPreWeekData(date: Date, callback: Function) {
        let weekCalendarInfo: WeekCalendarInfo = getPreviousWeek(date);
        // get data form db
        DayInfoApi.queryList(weekCalendarInfo.strArr, (res: DayInfo[]) => {
            Logger.info('getPreWeekData->DayInfoList: ', JSON.stringify(res));
            if (res.length > 0) {
                for (let i = 0; i < weekCalendarInfo.arr.length; i++) {
                    let dayInfo = res.find((item) => item.date === weekCalendarInfo.arr[i].dateStr);
                    if (dayInfo) {
                        weekCalendarInfo.arr[i].dayInfo = dayInfo;
                    }
                }
            }
            this.dateArr = weekCalendarInfo.arr.concat(...this.dateArr);
            callback();
        });
    }
    // check is current day
    public checkCurrentDay(): boolean {
        return dateToStr(new Date()) === this.selectedDayInfo?.dateStr;
    }
    public updateSelectedDayInfo(selectedDayInfo: WeekDateModel) {
        Logger.debug('updateSelectedDayInfo', JSON.stringify(selectedDayInfo));
        if (selectedDayInfo.taskList?.length === 0) {
            // get data form db
            TaskInfoTableApi.query(selectedDayInfo.dateStr, true, (res: TaskInfo[]) => {
                Logger.info('Selected TaskInfoList: ', JSON.stringify(res));
                selectedDayInfo.taskList = res;
                this.dateArr = this.dateArr.map((item: WeekDateModel) => {
                    if (item.dateStr === selectedDayInfo.dateStr) {
                        let taskListStr = JSON.stringify(res);
                        item.taskList = JSON.parse(taskListStr);
                        return item;
                    }
                    else {
                        return item;
                    }
                });
                this.selectedDayInfo = selectedDayInfo;
            });
        }
        else {
            this.selectedDayInfo = selectedDayInfo;
        }
        Logger.info("selectedDayTaskInfo: ", JSON.stringify(selectedDayInfo.taskList));
    }
    // 更新任务
    public updateTaskInfoList(editedTaskInfo: ITaskItem) {
        if (editedTaskInfo?.taskID) {
            // edited task
            // 将刚才新建好的任务的属性拽出来
            let taskID = editedTaskInfo.taskID;
            let targetValue = editedTaskInfo.targetValue;
            let isAlarm = editedTaskInfo.isAlarm;
            let frequency = editedTaskInfo.frequency;
            let startTime = editedTaskInfo.startTime;
            let endTime = editedTaskInfo.endTime;
            let isOpen = editedTaskInfo.isOpen;
            // 开一个新的任务对象，这里应该将IsDone设置为false，有趣的是，在调试的时候  传的参数并没有isDone,先改成false，后续看看需不需要更新
            let task = new TaskInfo(0, dateToStr(new Date()), taskID, targetValue, isAlarm, startTime, endTime, frequency, false, '', isOpen);
            // 遍历包含任务信息的日期数组，找到与任务日期匹配的项
            this.dateArr = this.dateArr.map((item: WeekDateModel) => {
                if (task.date === item.dateStr) {
                    Logger.info('item', JSON.stringify(item));
                    let taskList: TaskInfo[] = item.taskList;
                    const dayInfo: DayInfo = item.dayInfo;
                    if (editedTaskInfo.isOpen) {
                        // add task
                        // 从任务列表中删除具有相同 taskID 的任务，然后将新任务添加到任务列表中，并按 taskID 排序。统计已完成的任务数量（count），并更新 dayInfo.finTaskNum。
                        taskList = taskList.filter((taskItem) => taskItem.taskID != taskID)
                            .concat(task)
                            .sort((a, b) => a.taskID - b.taskID);
                        let count: number = 0;
                        taskList.forEach((taskItem: TaskInfo) => {
                            if (taskItem.isDone) {
                                count++;
                            }
                        });
                        if (count > dayInfo.finTaskNum) {
                            dayInfo.finTaskNum = count;
                        }
                    }
                    else {
                        // delete task
                        // 查找任务列表中具有相同 taskID 的任务索引。
                        // 如果该任务已完成，则减少 dayInfo.finTaskNum。
                        // 从任务列表中删除该任务。
                        let taskIndex = taskList.findIndex((taskItem) => taskItem.taskID === taskID);
                        Logger.info('taskList[taskIndex]', JSON.stringify(taskList[taskIndex]));
                        if (taskList[taskIndex]?.isDone) {
                            dayInfo.finTaskNum -= 1;
                        }
                        taskList = taskList.filter((taskItem) => taskItem.taskID != taskID);
                    }
                    dayInfo.targetTaskNum = taskList.length;
                    if (dayInfo.finTaskNum > dayInfo.targetTaskNum) {
                        dayInfo.finTaskNum = dayInfo.targetTaskNum;
                    }
                    DayInfoApi.updateData(dayInfo, () => {
                    });
                    Logger.debug("tempDayInfo", JSON.stringify(dayInfo));
                    let weekDateModelStr = JSON.stringify(item);
                    let currentDayInfo: WeekDateModel = JSON.parse(weekDateModelStr);
                    currentDayInfo.date = item.date;
                    currentDayInfo.taskList = taskList;
                    currentDayInfo.dayInfo = dayInfo;
                    if (this.checkCurrentDay()) {
                        this.selectedDayInfo = currentDayInfo;
                    }
                    return currentDayInfo;
                }
                return item;
            }).slice(0);
        }
    }
    public setSelectedShowDate(showDateTime: number) {
        if (showDateTime > new Date().getTime()) {
            return;
        }
        this.showDate = showDateTime;
        this.dateTitle = weekDateFormat(this.showDate);
        let selectedInfo = this.dateArr.find((item: WeekDateModel) => item.dateStr === dateToStr(new Date(showDateTime)));
        if (selectedInfo) {
            this.updateSelectedDayInfo(selectedInfo);
        }
        Logger.info('dateTitle', this.dateTitle);
    }
    public getDonePercent(): string {
        let dayInfo = this.selectedDayInfo?.dayInfo;
        Logger.debug("dayInfo", JSON.stringify(dayInfo));
        if (dayInfo && (dayInfo?.finTaskNum || 0) > 0) {
            if (dayInfo.finTaskNum > dayInfo.targetTaskNum) {
                return `${Const.DEFAULT_100}`;
            }
            return `${Math.ceil(dayInfo.finTaskNum / dayInfo.targetTaskNum * Const.DEFAULT_100)}`;
        }
        return '0';
    }
    public getTaskListOfDay(): TaskInfo[] {
        Logger.info('getTaskListOfDay', JSON.stringify(this.selectedDayInfo));
        if (this.selectedDayInfo && this.selectedDayInfo.taskList.length > 0) {
            return this.selectedDayInfo.taskList;
        }
        return [];
    }
    public async taskClock(taskInfo: TaskInfo) {
        // 更新任务状态
        let taskItem = await this.updateTask(taskInfo);
        let dateStr = this.selectedDayInfo?.dateStr;
        if (!taskItem) {
            return {
                achievementLevel: 0,
                showAchievement: false
            } as AchievementInfo;
        }
        this.selectedDayInfo.taskList = this.selectedDayInfo.taskList.map((item) => {
            return item.taskID === taskItem?.taskID ? taskItem : item;
        });
        let achievementLevel: number = 0;
        if (taskItem.isDone) {
            // 更新每日任务完成情况数据
            let dayInfo = await this.updateDayInfo();
            // 当日任务完成数量等于总任务数量时 累计连续打卡一天
            if (dayInfo && dayInfo?.finTaskNum === dayInfo?.targetTaskNum) {
                // 更新成就勋章数据 判断是否弹出获得勋章弹出及勋章类型
                achievementLevel = await this.updateAchievement(this.selectedDayInfo.dayInfo);
            }
        }
        this.dateArr = this.dateArr.map((item: WeekDateModel) => dateStr === item.dateStr ? this.selectedDayInfo : item);
        return {
            achievementLevel: achievementLevel,
            showAchievement: ACHIEVEMENT_LEVEL_LIST.includes(achievementLevel) //看这个列表是否有这个等级，有的话就要show
        } as AchievementInfo;
    }
    updateTask(task: TaskInfo): Promise<TaskInfo> {
        return new Promise((resolve, reject) => {
            let taskID = task.taskID;
            let targetValue = task.targetValue;
            let finValue = task.finValue;
            // 拿到任务名称，任务目标，以及当前目标之后，开一个新的task对象来进行更新
            let updateTask = new TaskInfo(task.id, task.date, taskID, targetValue, task.isAlarm, task.startTime, task.endTime, task.frequency, task.isDone, finValue, task.isOpen);
            let step = TaskMapById[taskID - 1].step; // 找到每次增加的步长
            let hasExceed = updateTask.isDone;
            if (step === 0) {
                // 如果step 是0 那就表示一步到位 只有 完成和没完成两种
                updateTask.isDone = true;
                if (taskID === 4) {
                    let value = Number(finValue) + Number(targetValue); //补充微笑的finvalue可以超过targetvalue的逻辑
                    updateTask.finValue = `${value}`;
                }
                else {
                    updateTask.finValue = targetValue;
                }
            }
            else {
                // 2024-07-17 下面， 只有一个eatApple是按照步数来的
                let value = Number(finValue) + step;
                updateTask.isDone = updateTask.isDone || value >= Number(targetValue);
                updateTask.finValue = updateTask.isDone ? targetValue : `${value}`;
            }
            TaskInfoTableApi.updateDataByDate(updateTask, (res: number) => {
                if (!res || hasExceed) {
                    Logger.error('taskClock-updateTask', JSON.stringify(res));
                    reject(res);
                }
                resolve(updateTask);
            });
        });
    }
    updateDayInfo(): Promise<DayInfo> {
        let dayInfo: DayInfo = this.selectedDayInfo.dayInfo;
        dayInfo.finTaskNum += 1;
        dayInfo.targetTaskNum = this.selectedDayInfo.taskList.length;
        return new Promise((resolve, reject) => {
            DayInfoApi.updateData(dayInfo, (res: number) => {
                if (!res) {
                    Logger.error('taskClock-updateDayInfo', JSON.stringify(res));
                    reject(res);
                }
                Logger.info('taskClock-updateDayInfo', JSON.stringify(dayInfo));
                // 同步界面数据
                let dayInfoStr = JSON.stringify(dayInfo);
                this.selectedDayInfo.dayInfo = JSON.parse(dayInfoStr);
                resolve(dayInfo);
            });
        });
    }
    updateAchievement(dayInfo: DayInfo): Promise<number> {
        Logger.debug('taskClock-updateAchievement', JSON.stringify(dayInfo));
        return new Promise((resolve, reject) => {
            let preDay = new Date();
            preDay.setDate(preDay.getDate() - 1);
            preDay = new Date(preDay);
            let preDayStr = dateToStr(preDay);
            Logger.info('taskClock-updateAchievement-1', `${preDayStr}`);
            DayInfoApi.query(preDayStr, (res: DayInfo) => {
                Logger.info('taskClock-updateAchievement-2', JSON.stringify(res));
                let isReset = res?.date === '' || res?.targetTaskNum > res?.finTaskNum;
                GlobalInfoApi.query((res: GlobalInfo) => {
                    Logger.info('taskClock-globalInfoApi', JSON.stringify(res));
                    let achievementInfo = res;
                    isReset ? (achievementInfo.checkInDays = 1) : (achievementInfo.checkInDays += 1);
                    let isNewAchieve = isReachNewAchievement(achievementInfo);
                    if (isNewAchieve) {
                        AppStorage.setOrCreate(ACHIEVEMENT_LEVEL_KEY, achievementInfo.checkInDays);
                        achievementInfo.achievements = achievementInfo.achievements + ',' + achievementInfo.checkInDays;
                    }
                    GlobalInfoApi.updateData(achievementInfo, (res: number) => {
                        if (!res) {
                            Logger.error('taskClock-updateAchievement', JSON.stringify(res));
                            reject(res);
                        }
                        Logger.debug('taskClock-updateAchievement', JSON.stringify(achievementInfo));
                        isNewAchieve ? resolve(achievementInfo.checkInDays) : resolve(0);
                    });
                });
            });
        });
    }
}
