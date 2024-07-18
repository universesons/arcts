import { ACHIEVEMENT_LEVEL_LIST } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import type GlobalInfo from '../viewmodel/GlobalInfo';
import GlobalInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/GlobalInfoApi";
import TaskInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/TaskInfoApi";
import type TaskInfo from '../viewmodel/TaskInfo';
import { dateToStr } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
import type { HomeStore } from '../viewmodel/HomeViewModel';
export const ACHIEVEMENT_LEVEL_KEY = 'AchievementLevelKey';
export const SMILE_LEVEL_KEY = 'SmileLevelKey';
export function getAchievementLevel() {
    GlobalInfoApi.query((res: GlobalInfo) => {
        let globalInfo: GlobalInfo = res;
        let achievementStr = globalInfo.achievements ?? '';
        let achievements = achievementStr.split(',');
        if (achievements.length > 0) {
            AppStorage.set<Number>(ACHIEVEMENT_LEVEL_KEY, Number(achievements[achievements.length - 1]));
        }
    });
}
export function getSmileLevel(homeStore: HomeStore) {
    const queryDate = homeStore.currentDate; // 获取当前日期
    const formattedDate = dateToStr(queryDate); // 使用dateToStr函数格式化日期
    TaskInfoApi.query(formattedDate, true, (res: TaskInfo) => {
    });
}
export function isReachNewAchievement(globalInfo: GlobalInfo): boolean {
    let achievementStr = globalInfo.achievements ?? '';
    let achievements = achievementStr.split(',');
    if (ACHIEVEMENT_LEVEL_LIST.indexOf(globalInfo.checkInDays) >= 0 && achievements.indexOf(String(globalInfo.checkInDays)) < 0) {
        return true;
    }
    return false;
}
