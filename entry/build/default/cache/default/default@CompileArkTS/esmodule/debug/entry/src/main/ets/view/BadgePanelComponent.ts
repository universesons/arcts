if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BadgePanel_Params {
    successiveDays?: number;
    smileTimes?: number;
    homeStore?: HomeStore;
}
import { BadgeCard } from "@bundle:com.example.healthy_life/entry/ets/view/BadgeCardComponent";
import { getAchievementLevel } from "@bundle:com.example.healthy_life/entry/ets/model/AchieveModel";
import { getBadgeCardItems, getSmileCardItems } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/AchievementViewModel";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import { ACHIEVEMENT_LEVEL_KEY } from "@bundle:com.example.healthy_life/entry/ets/model/AchieveModel";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import type CardInfo from '../viewmodel/CardInfo';
import { SmileBadgeCard } from "@bundle:com.example.healthy_life/entry/ets/view/SmileBadgeCardComponent";
import { HomeStore } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/HomeViewModel";
import { dateToStr } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
import TaskInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/TaskInfoApi";
import type TaskInfo from '../viewmodel/TaskInfo';
export class BadgePanel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__successiveDays = this.createStorageProp(ACHIEVEMENT_LEVEL_KEY, 0, "successiveDays");
        this.__smileTimes = new ObservedPropertySimplePU(0, this, "smileTimes");
        this.homeStore = new HomeStore(new Date());
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BadgePanel_Params) {
        if (params.smileTimes !== undefined) {
            this.smileTimes = params.smileTimes;
        }
        if (params.homeStore !== undefined) {
            this.homeStore = params.homeStore;
        }
    }
    updateStateVars(params: BadgePanel_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__successiveDays.purgeDependencyOnElmtId(rmElmtId);
        this.__smileTimes.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__successiveDays.aboutToBeDeleted();
        this.__smileTimes.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __successiveDays: ObservedPropertyAbstractPU<number>;
    get successiveDays() {
        return this.__successiveDays.get();
    }
    set successiveDays(newValue: number) {
        this.__successiveDays.set(newValue);
    }
    private __smileTimes: ObservedPropertySimplePU<number>; //lzj
    get smileTimes() {
        return this.__smileTimes.get();
    }
    set smileTimes(newValue: number) {
        this.__smileTimes.set(newValue);
    }
    private homeStore: HomeStore;
    //需要补充一个量，存储每天微笑的次数，初始化为0，除以每天的任务目标就可以判断
    aboutToAppear() {
        Logger.debug('BadgePanel', 'aboutToAppear');
        getAchievementLevel();
        this.homeStore.initData(); // 初始化HomeStore数据
        this.getSmileTimes(); // 获取微笑次数
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //构建勋章面板，使用Flex组件
            Flex.create({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap });
            //构建勋章面板，使用Flex组件
            Flex.width(Const.FULL_WIDTH);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //循环遍历每个勋章卡片，item是一个卡片的结构体，存着标题和图片
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new BadgeCard(this, { content: item.titleContent, imgSrc: item.achievement }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/BadgePanelComponent.ets", line: 50 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    content: item.titleContent,
                                    imgSrc: item.achievement
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                content: item.titleContent
                            });
                        }
                    }, { name: "BadgeCard" });
                }
            };
            this.forEachUpdateFunction(elmtId, getBadgeCardItems(this.successiveDays), forEachItemGenFunction);
        }, ForEach);
        //循环遍历每个勋章卡片，item是一个卡片的结构体，存着标题和图片
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //微笑勋章组件
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SmileBadgeCard(this, { content: item.titleContent, imgSrc: item.achievement }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/BadgePanelComponent.ets", line: 54 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    content: item.titleContent,
                                    imgSrc: item.achievement
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                content: item.titleContent
                            });
                        }
                    }, { name: "SmileBadgeCard" });
                }
            };
            this.forEachUpdateFunction(elmtId, getSmileCardItems(this.smileTimes), forEachItemGenFunction);
        }, ForEach);
        //微笑勋章组件
        ForEach.pop();
        //构建勋章面板，使用Flex组件
        Flex.pop();
    }
    getSmileTimes() {
        const queryDate = this.homeStore.currentDate; // 获取当前日期
        const formattedDate = dateToStr(queryDate); // 使用dateToStr函数格式化日期
        TaskInfoApi.query(formattedDate, true, (result: TaskInfo[]) => {
            // 查找taskID为4的任务信息
            const task = result.find(task => task.taskID === 4);
            if (task) {
                const targetValue = parseFloat(task.targetValue);
                const finValue = parseFloat(task.finValue);
                let completionTimes = 0;
                // 确保 finValue 不为 0
                if (finValue !== 0) {
                    completionTimes = finValue / targetValue;
                }
                else {
                    console.error('finValue 不能为 0');
                }
                this.smileTimes = completionTimes;
            }
            else {
                console.log('没有找到符合条件的任务信息');
            }
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
}
