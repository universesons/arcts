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

import { ratio2percent } from '../common/utils/Utils'
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { SMILE_LEVEL_BADGE } from '../model/TaskInitList';

@Component
  //用来添加微笑勋章卡片
export struct SmileBadgeCard {
  @Prop content: string = '';
  imgSrc: Resource = $r('app.string.empty');

  build() {
    Column({ space: Const.DEFAULT_18 }) {
      Image(this.imgSrc)
        .width(Const.FULL_WIDTH)
        .height(Const.ACHIEVE_CARD_IMG_HEIGHT)
        .objectFit(ImageFit.Contain)
      //想要实现的效果，content内容是1，2，3，4就是一次完成，两次完成，三次完成，四次完成，然后把这个可以通过一个列表赋值一个标题
      Text(SMILE_LEVEL_BADGE[this.content])
        .lineHeight($r('app.float.default_16'))
        .fontSize($r('app.float.default_12'))
        .fontColor($r('app.color.white'))
    }
    .width(ratio2percent(Const.ACHIEVE_SPLIT_RATIO))
    .padding({ top: Const.ACHIEVE_CARD_TOP, bottom: Const.ACHIEVE_CARD_BOTTOM })
  }
}
