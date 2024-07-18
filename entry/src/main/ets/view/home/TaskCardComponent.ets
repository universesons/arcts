/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TaskMapById } from '../../model/TaskInitList';
import HealthText from '../../view/HealthTextComponent';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import TaskInfo from '../../viewmodel/TaskInfo';
import taskType from '../../viewmodel/TaskInfo';

@Styles
function allSize() {
  .width(Const.THOUSANDTH_1000)
  .height(Const.THOUSANDTH_1000)
}

@Extend(Text)
function labelTextStyle() {
  .fontSize($r('app.float.default_16'))
  .fontWeight(Const.FONT_WEIGHT_500)
  .opacity(Const.OPACITY_6)
  .fontFamily($r('app.string.HarmonyHeiTi'))
}

@Component
export struct TaskCard {
  @Prop taskInfoStr: string = '';
  clickAction: Function = (isClick: boolean) => {
    // 点击`打卡`按钮之后，表示已经完成
    this.taskInfo.isDone = true;
  };
  @State taskInfo: TaskInfo = new TaskInfo(-1, '', -1, '', false, '', '', '', false, '', false);
  @State name: string = '';
  @State taskId:number= this.taskInfo.taskID;
  @State currentValue: string = ''; // 用户的某一个任务的当前值
  aboutToAppear() {
    this.taskInfo = JSON.parse(this.taskInfoStr);
  }

  @Builder
  targetValueBuilder() {
    if (this.taskInfo.isDone) {
      // 修改问题1： 当不打卡的时候，是未完成
      Row() {
        HealthText({
          title: '', titleResource:
          $r(this.taskInfo.isDone ? 'app.string.task_done' : 'app.string.task_undone')
        }).margin({right: 10})
        if (this.taskInfo.taskID === 4) {
          Text((() => {
            return (Number(this.taskInfo.finValue) /
            Number(this.taskInfo.targetValue) * 100) + '%';
          })())
            .labelTextStyle()
            .fontWeight(Const.FONT_WEIGHT_400)
        }
      }
    } else {
      Row() {
        HealthText({
          // 根据任务类型对最初的初始值进行渲染
          // title: this.taskInfo.finValue || `--`,
          title: (() => {
            // 先判断是不是早睡早起，如果是早睡早起，说明度量是时间，用--，否则用`0`
            const currentValue = (this.taskInfo.taskID === 1 || this.taskInfo.taskID === 6 ) ? (this.taskInfo.finValue || '--') : (this.taskInfo.finValue || '0');
            return currentValue;
          })(),
          fontSize: $r('app.float.default_24')
        })
        Text(` / ${this.taskInfo.targetValue} ${TaskMapById[this.taskInfo.taskID - 1].unit}`)
          .labelTextStyle()
          .fontWeight(Const.FONT_WEIGHT_400)
      }
    }
  }

  build() {
    Row() {
      Row({ space: Const.DEFAULT_6 }) {
        Image(TaskMapById[this.taskInfo.taskID - 1].icon)
          .width($r('app.float.default_36')).height($r('app.float.default_36'))
          .objectFit(ImageFit.Contain)
        HealthText({
          title: '',
          titleResource: TaskMapById[this.taskInfo.taskID - 1].taskName,
          fontFamily: $r('app.string.HarmonyHeiTi')
        })
      }

      this.targetValueBuilder();
    }
    .allSize()
    .justifyContent(FlexAlign.SpaceBetween)
    .borderRadius($r('app.float.default_24'))
    .padding({ left: Const.THOUSANDTH_50, right: Const.THOUSANDTH_33 })
    .backgroundColor($r('app.color.white'))
    .onClick(() => this.clickAction(true))
    .gesture(LongPressGesture().onAction(() => this.clickAction(false)))
  }
}