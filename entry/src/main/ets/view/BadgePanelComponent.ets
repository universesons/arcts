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

import { BadgeCard } from './BadgeCardComponent'
import { getAchievementLevel } from '../model/AchieveModel'
import { getBadgeCardItems, getSmileCardItems } from '../viewmodel/AchievementViewModel'
import Logger from '../common/utils/Logger'
import { ACHIEVEMENT_LEVEL_KEY } from '../model/AchieveModel'
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import CardInfo from '../viewmodel/CardInfo'
import { webview } from '@kit.ArkWeb';
import { SmileBadgeCard } from './SmileBadgeCardComponent'
import { HomeStore } from '../viewmodel/HomeViewModel';
import { dateToStr } from '../common/utils/Utils';
import TaskInfoApi from '../common/database/tables/TaskInfoApi';
import TaskInfo from '../viewmodel/TaskInfo'

@Component
export struct BadgePanel {
  @StorageProp(ACHIEVEMENT_LEVEL_KEY) successiveDays: number = 0;
  @State smileTimes: number = 0; //lzj
  private homeStore: HomeStore = new HomeStore(new Date());

  //需要补充一个量，存储每天微笑的次数，初始化为0，除以每天的任务目标就可以判断

  aboutToAppear() {
    Logger.debug('BadgePanel', 'aboutToAppear');
    getAchievementLevel();
    this.homeStore.initData(); // 初始化HomeStore数据
    this.getSmileTimes(); // 获取微笑次数
  }

  build() {
    //构建勋章面板，使用Flex组件
    Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
      //循环遍历每个勋章卡片，item是一个卡片的结构体，存着标题和图片
      ForEach(getBadgeCardItems(this.successiveDays), (item: CardInfo) => {
        BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
      })
      //微笑勋章组件
      ForEach(getSmileCardItems(this.smileTimes), (item: CardInfo) => {
        SmileBadgeCard({ content: item.titleContent, imgSrc: item.achievement })
      })

    }
    .width(Const.FULL_WIDTH)
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
        } else {
          console.error('finValue 不能为 0');
        }

        this.smileTimes = completionTimes;

      } else {
        console.log('没有找到符合条件的任务信息');
      }
    });
  }
}

