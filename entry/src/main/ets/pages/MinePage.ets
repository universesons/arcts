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

import { ListInfo } from '../view/ListInfo';
import { UserBaseInfo } from '../view/UserBaseInfo';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import personInfo from '../viewmodel/PersonInfo';

@Component
export struct MineIndex {
  @State userInfo: personInfo = new personInfo(); // 按照默认值初始化一个person
  // @State nickname: string = Const.NICK_NAME;
  // @State signature: string = Const.SIGNATURE;

  build() {
    Column() {
      UserBaseInfo({
        userInfo : this.userInfo // 直接将整个类下传，方便进一步整理
      });

      ListInfo();
    }
    .height(Const.FULL_HEIGHT)
    .backgroundColor($r('app.color.mineBgColor'))
  }
}