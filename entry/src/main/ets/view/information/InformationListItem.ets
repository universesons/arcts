import { CommonConstants as Const } from '../../common/constants/CommonConstants';

@Styles
function listItemStyle() {
  .backgroundColor($r('app.color.white'))
  .height(Const.DEFAULT_56)
  .borderRadius(Const.DEFAULT_10)
  .padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 })
}

@Component
export struct NameSetItem {
  @Prop userName: string = ""

  build() {
    Row() {
      Row() {
        Text('昵称')
          .fontSize(20)
          .fontColor($r('app.color.titleColor'))
      }
      Text(this.userName).fontSize(20)
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ left: 12, right: 12 })
  }
}

@Component
export struct GenderSetItem {
  userSex: string = "";

  build() {
    Row() {
      Row() {
        Text('性别')
          .fontSize(20)
          .fontColor($r('app.color.titleColor'))
      }
      Text(this.userSex).fontSize(20)
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ left: 12, right: 12 })
  }
}

@Component
export struct BirthSetItem {
  @Prop userYear: number; // 出生年
  @Prop userMonth: number; // 出生月
  @Prop userDay: number; // 出生日

  build() {
    Row() {
      Row() {
        Text('出生日期')
          .fontSize(20)
          .fontColor($r('app.color.titleColor'))
      }
      Text(this.userYear + "/" + (this.userMonth+1) + "/" + this.userDay).fontSize(20)
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ left: 12, right: 12 })
  }
}

@Component
export struct HeightSetItem {
  @Prop userHeight: string; // 身高 单位:厘米

  build() {
    Row() {
      Row() {
        Text('身高')
          .fontSize(20)
          .fontColor($r('app.color.titleColor'))
      }
      Text(this.userHeight + " " + Const.HEIGHT_UNIT).fontSize(20)
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ left: 12, right: 12 })
  }
}

@Component
export struct WeightSetItem {
  @Prop userWeight: string;

  build() {
    Row() {
      Row() {
        Text('体重')
          .fontSize(20)
          .fontColor($r('app.color.titleColor'))
      }
      Text(this.userWeight + " " + Const.WEIGHT_UNIT).fontSize(20)
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ left: 12, right: 12 })
  }
}




