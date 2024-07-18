import router from '@ohos.router'
import { NameSetItem, GenderSetItem, BirthSetItem, HeightSetItem, WeightSetItem } from './InformationListItem'
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import personInfo, { StoreUtil } from '../../viewmodel/PersonInfo';
import { promptAction } from '@kit.ArkUI';
import { createWeightRange, createHeightRange, addUnit, removeUnit } from '../../viewmodel/PersonViewModel';

let name: string = ""

@Styles
function listItemStyle() {
  .backgroundColor($r('app.color.white'))
  .height(Const.DEFAULT_56)
  .borderRadius(Const.DEFAULT_10)
  .padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 })
}

@CustomDialog
struct changeName {
  controller: CustomDialogController
  onNameChange: (newName: string) => void = () => {
  } // 回调函数 Initial as an empty function

  build() {
    Column() {
      TextInput({ placeholder: "请输入你的用户名" })
        .onChange((value: string) => {
          name = value
        })
        .margin({ top: 20 })
        .width(200)
      Button('确定', { type: ButtonType.Normal, stateEffect: true })
        .onClick(() => {
          this.onNameChange(name); // 调用回调函数更新签名
        })
    }
    .height(100)
    .width(300)
  }
}

@Component
export default struct InformationList {
  // @State userInfo:object = parseRouterParams() // 新的arkts 11 已经不支持params['xxx'] 方式，因此到时候需要this.userInfo.userInfo

  dialogController: CustomDialogController = new CustomDialogController({
    builder: changeName({
      onNameChange: (newName: string) => {
        this.userInfo.userName = newName; // 更新名字
        // promptAction.showToast({
        //   message: "用户名更改并保存成功",
        //   duration: 200,
        // });
        trySaveUserInfo(this.userInfo, this.userStore, "用户名");
        // try {
        //   this.userStore.setData(this.userInfo);
        //   promptAction.showToast({
        //     message: "用户名更改并保存成功",
        //     duration: 200,
        //   });
        // } catch (error) {
        //   promptAction.showToast({
        //     message: "保存失败",
        //     duration: 200,
        //   });
        // }
        this.dialogController.close()
      }
    }),
    alignment: DialogAlignment.Default, // 可设置dialog的对齐方式，设定显示在底部或中间等，默认为底部显示
  })
  selectedDate: Date = new Date("2010-1-1")
  // @State select: number = 2
  heightRange: string[] = createHeightRange();
  gender: string[] = ['男', '女', '其他']
  weightRange: string[] = createWeightRange();
  @Link userInfo: personInfo;
  userStore: StoreUtil = new StoreUtil('userStore', 'userInfo');

  // 读取数据
  async aboutToAppear() {
    try {
      let data = await this.userStore.getData<personInfo>();
      this.userInfo = data;
      this.selectedDate.setFullYear(this.userInfo.userYear,
        this.userInfo.userMonth, this.userInfo.userDay)
    } catch (error) {
      // 处理获取数据失败的情况，使用默认值
      this.userInfo = new personInfo();
    }
  }

  build() {
    Column() {
      // Text(this.userInfo.userSignature || "签名没读取到")
      List() {
        ListItem() {
          // 名称
          NameSetItem({ userName: this.userInfo.userName })
        }
        .listItemStyle()
        // .height(80)
        // .borderRadius(12)
        .onClick(() => {
          this.dialogController.open(); // 弹出对话框
        })
        .backgroundColor($r('app.color.white'))
        .width('100%')
        .height('20%')

        ListItem() {
          // 性别
          Row() {
            Row() {
              Text('性别')
                .fontSize(20)
                .fontColor($r('app.color.titleColor'))
            }

            Text(this.userInfo.userSex).fontSize(20)
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)
          .padding({ left: 12, right: 12 })

        }
        .listItemStyle()
        .onClick(() => {
          TextPickerDialog.show({
            range: this.gender,
            // selected: this.select,
            onAccept: (value: TextPickerResult) => {
              // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
              // this.select = value.index
              this.userInfo.userSex = value.value.toString();
              trySaveUserInfo(this.userInfo, this.userStore, "性别");
              console.info("TextPickerDialog:onAccept()" + JSON.stringify(value))
            },
            onCancel: () => {
              console.info("TextPickerDialog:onCancel()")
            },
            onChange: (value: TextPickerResult) => {
              console.info("TextPickerDialog:onChange()" + JSON.stringify(value))
            }
          })
        })
        .backgroundColor($r('app.color.white'))
        .width('100%')
        .height('20%')

        // 出生日期
        ListItem() {
          BirthSetItem({
            userYear: this.userInfo.userYear, userMonth: this.userInfo.userMonth,
            userDay: this.userInfo.userDay
          })
        }
        .listItemStyle()
        .onClick(() => {
          DatePickerDialog.show({
            start: new Date("2000-1-1"),
            end: new Date("2100-12-31"),
            selected: this.selectedDate,
            onAccept: (value: DatePickerResult) => {
              // 通过Date的setFullYear方法设置按下确定按钮时的日期，这样当弹窗再次弹出时显示选中的是上一次确定的日期
              console.info("DatePickerDialog:onAccept()" + JSON.stringify(this.selectedDate))
              this.selectedDate.setFullYear(value.year, value.month, value.day)
              this.userInfo.userYear = value.year ?? 2000
              this.userInfo.userMonth = value.month ?? 1
              this.userInfo.userDay = value.day ?? 1
              trySaveUserInfo(this.userInfo, this.userStore, "日期");
              console.info("DatePickerDialog:onAccept()" + JSON.stringify(value))
            },
            onCancel: () => {
              console.info("DatePickerDialog:onCancel()")
            },
            onChange: (value: DatePickerResult) => {
              console.info("DatePickerDialog:onChange()" + JSON.stringify(value))
            }
          })
        })
        .backgroundColor($r('app.color.white'))
        .width('100%')
        .height('20%')

        // 身高
        ListItem() {
          HeightSetItem({ userHeight: this.userInfo.userHeight })
        }
        .listItemStyle()
        .onClick(() => {
          TextPickerDialog.show({
            range: this.heightRange,
            selected: findIndexFromRange(addUnit(this.userInfo.userHeight, Const.HEIGHT_UNIT),
              this.heightRange),
            onAccept: (value: TextPickerResult) => {
              // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
              // this.select = value.index
              this.userInfo.userHeight = removeUnit(value.value.toString(), Const.HEIGHT_UNIT);
              trySaveUserInfo(this.userInfo, this.userStore, "身高");
              console.info("TextPickerDialog:onAccept()" + JSON.stringify(value))
            },
            onCancel: () => {
              console.info("TextPickerDialog:onCancel()")
            },
            onChange: (value: TextPickerResult) => {
              console.info("TextPickerDialog:onChange()" + JSON.stringify(value))
            }
          })
        })
        .backgroundColor($r('app.color.white'))
        .width('100%')
        .height('20%')

        // 体重
        ListItem() {
          WeightSetItem({ userWeight: this.userInfo.userWeight })
        }
        .listItemStyle()
        .onClick(() => {
          TextPickerDialog.show({
            range: this.weightRange,
            selected: findIndexFromRange(addUnit(this.userInfo.userWeight, Const.WEIGHT_UNIT),
              this.weightRange),
            onAccept: (value: TextPickerResult) => {
              // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
              this.userInfo.userWeight = removeUnit(value.value.toString(), Const.WEIGHT_UNIT);
              trySaveUserInfo(this.userInfo, this.userStore, "身高");
              console.info("TextPickerDialog:onAccept()" + JSON.stringify(value))
            },
            onCancel: () => {
              console.info("TextPickerDialog:onCancel()")
            },
            onChange: (value: TextPickerResult) => {
              console.info("TextPickerDialog:onChange()" + JSON.stringify(value))
            }
          })
        })
        .backgroundColor($r('app.color.white'))
        .width('100%')
        .height('20%')
      }
      .height('50%')

    }
  }
}

function trySaveUserInfo(userInfo: personInfo, userStore: StoreUtil, promptStr: string) {
  try {
    userStore.setData(userInfo);
    promptAction.showToast({
      message: promptStr + "更改并保存成功",
      duration: 200,
    });
  } catch (error) {
    promptAction.showToast({
      message: promptStr + "保存失败",
      duration: 200,
    });
  }
}

function findIndexFromRange(target: string, range: string[], defaultIndex?: number): number {
  let result = range.indexOf(target)
  if (defaultIndex == undefined) {
    defaultIndex = range.length / 2
  }
  return result == -1 ? defaultIndex : result;
}