if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TaskIndex_Params {
    taskList?: ITaskItem[];
}
import type { ITaskItem } from '../model/TaskInitList';
import TaskList from "@bundle:com.example.healthy_life/entry/ets/view/task/TaskListComponent";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import { getAllTask, taskIndexDataInit, taskOriginData } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel";
import type TaskInfo from '../viewmodel/TaskInfo';
class TaskIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__taskList = new ObservedPropertyObjectPU(taskOriginData, this, "taskList");
        this.addProvidedVar("taskList", this.__taskList, false);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskIndex_Params) {
        if (params.taskList !== undefined) {
            this.taskList = params.taskList;
        }
    }
    updateStateVars(params: TaskIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__taskList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__taskList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __taskList: ObservedPropertyObjectPU<ITaskItem[]>;
    get taskList() {
        return this.__taskList.get();
    }
    set taskList(newValue: ITaskItem[]) {
        this.__taskList.set(newValue);
    }
    onPageShow() {
        getAllTask().then((res: TaskInfo[]) => {
            let deepCopyDataStr = JSON.stringify(this.taskList);
            let deepCopyData: ITaskItem[] = JSON.parse(deepCopyDataStr);
            this.taskList = taskIndexDataInit(deepCopyData, res);
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/TaskListPage.ets(37:5)");
            Row.backgroundColor({ "id": 16777342, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Row.height(Const.THOUSANDTH_1000);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create({ moduleName: "entry", pagePath: "entry/src/main/ets/pages/TaskListPage" });
            Navigation.debugLine("entry/src/main/ets/pages/TaskListPage.ets(38:7)");
            Navigation.size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 });
            Navigation.title(Const.ADD_TASK_TITLE);
            Navigation.titleMode(NavigationTitleMode.Mini);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/TaskListPage.ets(39:9)");
            Column.width(Const.THOUSANDTH_1000);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TaskList(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/TaskListPage.ets", line: 40 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "TaskList" });
        }
        Column.pop();
        Navigation.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "TaskIndex";
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "TaskIndex", new TaskIndex(undefined, {}));
    previewComponent();
}
else {
    registerNamedRoute(() => new TaskIndex(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/TaskListPage", pageFullPath: "entry/src/main/ets/pages/TaskListPage", integratedHsp: "false" });
}
