import AchievementMapInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/AchievementMapInfo";
import TaskInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
export interface ITaskItem {
    taskID: number;
    taskName: Resource;
    isOpen: boolean;
    unit: string;
    icon: Resource;
    dialogBg: Resource;
    targetValue: string;
    isAlarm: boolean;
    startTime: string;
    endTime: string;
    frequency: string;
    isInit: boolean;
    step: number;
}
export interface RemindContentItem {
    title: string;
    content: string;
}
export interface FrequencyContentType {
    id: number;
    label: string;
    isChecked: boolean;
}
export const TaskList: TaskInfo[] = [
    new TaskInfo(0, '', 1, '7:00', true, '', ';', '', false, '', true),
    new TaskInfo(1, '', 2, '1.5', true, '', ';', '', false, '', true),
    new TaskInfo(2, '', 3, '3', true, '08: 00', '', '', false, '', true),
    new TaskInfo(3, '', 4, '1', true, '', ';', '', false, '', true),
    new TaskInfo(4, '', 5, '21:30', true, '', ';', '', false, '', true),
    new TaskInfo(5, '', 6, '22:00', true, '', ';', '', false, '', true),
    new TaskInfo(6, '', 7, '1', true, '', ';', '', false, '', true)
];
let achievementMap = new AchievementMapInfo();
export const AchievementMap = achievementMap;
export const TaskMapById: Array<ITaskItem> = [
    {
        taskID: 1,
        taskName: { "id": 16777280, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777420, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777400, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '08: 00',
        isOpen: false,
        unit: '',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 2,
        taskName: { "id": 16777286, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777423, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777398, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '0.25',
        isOpen: false,
        unit: 'L',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 3,
        taskName: { "id": 16777276, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777418, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777399, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '1',
        isOpen: false,
        unit: '个',
        step: 1,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 4,
        taskName: { "id": 16777284, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777422, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777402, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '1',
        isOpen: false,
        unit: '次',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 5,
        taskName: { "id": 16777277, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777419, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777397, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '1',
        isOpen: false,
        unit: '次',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 6,
        taskName: { "id": 16777281, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        icon: { "id": 16777421, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777401, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '20: 00',
        isOpen: false,
        unit: '',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    },
    {
        taskID: 7,
        taskName: { "id": 16777283, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        // TODO： 修改 icon 和卡片背景
        icon: { "id": 16777420, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        dialogBg: { "id": 16777400, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        targetValue: '1',
        isOpen: false,
        unit: '公里',
        step: 0,
        isInit: true,
        isAlarm: false,
        startTime: '08: 00',
        endTime: '00: 00',
        frequency: '1, 2, 3, 4, 5, 6, 7'
    }
];
export const TaskItem = new TaskInfo(1, '', 0, '7:00', true, 'string', 'string;', '', true, '6:58', false);
export const RemindContentMap: Array<RemindContentItem> = [
    {
        title: Const.GET_UP_TASK_NAME,
        content: Const.GET_UP_CONTENT
    },
    {
        title: Const.DRINK_TASK_NAME,
        content: Const.DRINK_CONTENT
    },
    {
        title: Const.EAT_APPLE_TASK_NAME,
        content: Const.EAT_APPLE_CONTENT
    },
    {
        title: Const.SMILE_TASK_NAME,
        content: Const.SMILE_CONTENT
    },
    {
        title: Const.BRUSH_TEETH_TASK_NAME,
        content: Const.BRUSH_TEETH_CONTENT
    },
    {
        title: Const.SLEEP_TASK_NAME,
        content: Const.SLEEP_CONTENT
    },
    {
        title: Const.RUN_TASK_NAME,
        content: Const.RUN_CONTENT
    }
];
export const ACHIEVEMENT_LEVEL_LIST = [3, 7, 30, 50, 73, 99];
