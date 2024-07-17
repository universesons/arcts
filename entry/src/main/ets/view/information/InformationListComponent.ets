import router from '@ohos.router'
import { NameSetItem, GenderSetItem, BirthSetItem, HeightSetItem, WeightSetItem } from './InformationListItem'
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import personInfo, { StoreUtil } from '../../viewmodel/PersonInfo';
import { promptAction } from '@kit.ArkUI';

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

@Entry
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
        this.dialogController.close()
        try {
          this.userStore.setData(this.userInfo);
          promptAction.showToast({
            message: "用户名更改并保存成功",
            duration: 200,
          });
        } catch (error) {
          promptAction.showToast({
            message: "保存失败",
            duration: 200,
          });
        }
        this.dialogController.close()
      }
    }),
    alignment: DialogAlignment.Default, // 可设置dialog的对齐方式，设定显示在底部或中间等，默认为底部显示
  })
  selectedDate: Date = new Date("2010-1-1")
  // @State select: number = 2
  heights: string[] =
    ['0cm', '1cm', '2cm', '3cm', '4cm', '5cm', '6cm', '7cm', '8cm', '9cm', '10cm', '11cm', '12cm', '13cm', '14cm',
      '15cm', '16cm', '17cm', '18cm', '19cm', '20cm', '21cm', '22cm', '23cm', '24cm', '25cm', '26cm', '27cm', '28cm',
      '29cm', '30cm', '31cm', '32cm', '33cm', '34cm', '35cm', '36cm', '37cm', '38cm', '39cm', '40cm', '41cm', '42cm',
      '43cm', '44cm', '45cm', '46cm', '47cm', '48cm', '49cm', '50cm', '51cm', '52cm', '53cm', '54cm', '55cm', '56cm',
      '57cm', '58cm', '59cm', '60cm', '61cm', '62cm', '63cm', '64cm', '65cm', '66cm', '67cm', '68cm', '69cm', '70cm',
      '71cm', '72cm', '73cm', '74cm', '75cm', '76cm', '77cm', '78cm', '79cm', '80cm', '81cm', '82cm', '83cm', '84cm',
      '85cm', '86cm', '87cm', '88cm', '89cm', '90cm', '91cm', '92cm', '93cm', '94cm', '95cm', '96cm', '97cm', '98cm',
      '99cm', '100cm', '101cm', '102cm', '103cm', '104cm', '105cm', '106cm', '107cm', '108cm', '109cm', '110cm',
      '111cm', '112cm', '113cm', '114cm', '115cm', '116cm', '117cm', '118cm', '119cm', '120cm', '121cm', '122cm',
      '123cm', '124cm', '125cm', '126cm', '127cm', '128cm', '129cm', '130cm', '131cm', '132cm', '133cm', '134cm',
      '135cm', '136cm', '137cm', '138cm', '139cm', '140cm', '141cm', '142cm', '143cm', '144cm', '145cm', '146cm',
      '147cm', '148cm', '149cm', '150cm', '151cm', '152cm', '153cm', '154cm', '155cm', '156cm', '157cm', '158cm',
      '159cm', '160cm', '161cm', '162cm', '163cm', '164cm', '165cm', '166cm', '167cm', '168cm', '169cm', '170cm',
      '171cm', '172cm', '173cm', '174cm', '175cm', '176cm', '177cm', '178cm', '179cm', '180cm', '181cm', '182cm',
      '183cm', '184cm', '185cm', '186cm', '187cm', '188cm', '189cm', '190cm', '191cm', '192cm', '193cm', '194cm',
      '195cm', '196cm', '197cm', '198cm', '199cm', '200cm', '201cm', '202cm', '203cm', '204cm', '205cm', '206cm',
      '207cm', '208cm', '209cm', '210cm', '211cm', '212cm', '213cm', '214cm', '215cm', '216cm', '217cm', '218cm',
      '219cm', '220cm']
  gender: string[] = ['男', '女']
  weight: string[] =
    ['1kg', '2kg', '3kg', '4kg', '5kg', '6kg', '7kg', '8kg', '9kg', '10kg', '11kg', '12kg', '13kg', '14kg', '15kg',
      '16kg', '17kg', '18kg', '19kg', '20kg', '21kg', '22kg', '23kg', '24kg', '25kg', '26kg', '27kg', '28kg', '29kg',
      '30kg', '31kg', '32kg', '33kg', '34kg', '35kg', '36kg', '37kg', '38kg', '39kg', '40kg', '41kg', '42kg', '43kg',
      '44kg', '45kg', '46kg', '47kg', '48kg', '49kg', '50kg', '51kg', '52kg', '53kg', '54kg', '55kg', '56kg', '57kg',
      '58kg', '59kg', '60kg', '61kg', '62kg', '63kg', '64kg', '65kg', '66kg', '67kg', '68kg', '69kg', '70kg', '71kg',
      '72kg', '73kg', '74kg', '75kg', '76kg', '77kg', '78kg', '79kg', '80kg', '81kg', '82kg', '83kg', '84kg', '85kg',
      '86kg', '87kg', '88kg', '89kg', '90kg', '91kg', '92kg', '93kg', '94kg', '95kg', '96kg', '97kg', '98kg', '99kg',
      '100kg', '101kg', '102kg', '103kg', '104kg', '105kg', '106kg', '107kg', '108kg', '109kg', '110kg', '111kg',
      '112kg', '113kg', '114kg', '115kg', '116kg', '117kg', '118kg', '119kg', '120kg', '121kg', '122kg', '123kg',
      '124kg', '125kg', '126kg', '127kg', '128kg', '129kg', '130kg', '131kg', '132kg', '133kg', '134kg', '135kg',
      '136kg', '137kg', '138kg', '139kg', '140kg', '141kg', '142kg', '143kg', '144kg', '145kg', '146kg', '147kg',
      '148kg', '149kg', '150kg', '151kg', '152kg', '153kg', '154kg', '155kg', '156kg', '157kg', '158kg', '159kg',
      '160kg', '161kg', '162kg', '163kg', '164kg', '165kg', '166kg', '167kg', '168kg', '169kg', '170kg', '171kg',
      '172kg', '173kg', '174kg', '175kg', '176kg', '177kg', '178kg', '179kg', '180kg', '181kg', '182kg', '183kg',
      '184kg', '185kg', '186kg', '187kg', '188kg', '189kg', '190kg', '191kg', '192kg', '193kg', '194kg', '195kg',
      '196kg', '197kg', '198kg', '199kg', '200kg', '201kg', '202kg', '203kg', '204kg', '205kg', '206kg', '207kg',
      '208kg', '209kg', '210kg', '211kg', '212kg', '213kg', '214kg', '215kg', '216kg', '217kg', '218kg', '219kg',
      '220kg', '221kg', '222kg', '223kg', '224kg', '225kg', '226kg', '227kg', '228kg', '229kg', '230kg', '231kg',
      '232kg', '233kg', '234kg', '235kg', '236kg', '237kg', '238kg', '239kg', '240kg', '241kg', '242kg', '243kg',
      '244kg', '245kg', '246kg', '247kg', '248kg', '249kg', '250kg']
  @State userInfo: personInfo = new personInfo();
  userStore: StoreUtil = new StoreUtil('userStore', 'userInfo');

  // 读取数据
  async aboutToAppear() {
    try {
      let data = await this.userStore.getData<personInfo>();
      this.userInfo = data;
    } catch (error) {
      // 处理获取数据失败的情况，使用默认值
      this.userInfo = new personInfo();
    }
  }

  build() {
    Column() {
      // Text(this.userInfo.userSignature || "签名没读取到")
      Text('个人信息编辑')
      List() {
        ListItem() {
          // 名称
          NameSetItem({userName: this.userInfo.userName})
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

        ListItem() {
          BirthSetItem({userYear: this.userInfo.userYear, userMonth: this.userInfo.userMonth,
                        userDay: this.userInfo.userDay})
        }
        .listItemStyle()
        .onClick(() => {
          DatePickerDialog.show({
            start: new Date("2000-1-1"),
            end: new Date("2100-12-31"),
            selected: this.selectedDate,
            onAccept: (value: DatePickerResult) => {
              // 通过Date的setFullYear方法设置按下确定按钮时的日期，这样当弹窗再次弹出时显示选中的是上一次确定的日期
              this.selectedDate.setFullYear(value.year, value.month, value.day)
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

        ListItem() {
          HeightSetItem({userHeight: this.userInfo.userHeight})
        }
        .listItemStyle()
        .onClick(() => {
          TextPickerDialog.show({
            range: this.heights,
            // selected: this.select,
            onAccept: (value: TextPickerResult) => {
              // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
              // this.select = value.index
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

        ListItem() {
          WeightSetItem({userWeight: this.userInfo.userWeight})
        }
        .listItemStyle()
        .onClick(() => {
          TextPickerDialog.show({
            range: this.weight,
            // selected: this.select,
            onAccept: (value: TextPickerResult) => {
              // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
              // this.select = value.index
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