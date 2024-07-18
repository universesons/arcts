import CardInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/CardInfo";
import { ACHIEVEMENT_LEVEL_LIST, AchievementMap, SMILE_LEVEL_LIST } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
export function getBadgeCardItems(successiveDays: number): Array<CardInfo> {
    //获取奖章卡片信息
    let badgeMileStones = ACHIEVEMENT_LEVEL_LIST;
    let cardItems: Array<CardInfo> = [];
    for (let i = 0; i < badgeMileStones.length; i++) {
        let onOrOff = successiveDays >= badgeMileStones[i] ? 'on' : 'off';
        let titleContent = String(badgeMileStones[i]);
        let cardInfo: CardInfo = new CardInfo();
        cardInfo.titleContent = titleContent;
        cardInfo.achievement = getAchievement(`${onOrOff}_${badgeMileStones[i]}`);
        cardItems.push(cardInfo);
    }
    return cardItems;
}
//修改补充获取微笑勋章的图片，勋章名称信息
export function getSmileCardItems(smileTimes: number): Array<CardInfo> {
    //获取奖章卡片信息
    let badgeMileStones = SMILE_LEVEL_LIST;
    let cardItems: Array<CardInfo> = [];
    for (let i = 0; i < badgeMileStones.length; i++) {
        let onOrOff = smileTimes >= badgeMileStones[i] ? 'on' : 'off'; //smileTarget是每天微笑次数
        let titleContent = String(badgeMileStones[i] - 1);
        let cardInfo: CardInfo = new CardInfo(); //用来返回
        cardInfo.titleContent = titleContent;
        cardInfo.achievement = getAchievement(`smile_${onOrOff}_${badgeMileStones[i]}`); //调用函数获取成就勋章图片
        cardItems.push(cardInfo);
    }
    return cardItems;
}
function getAchievement(key: string) {
    let result = { "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
    switch (key) {
        case 'smile_off_1':
            result = AchievementMap.smile_off_1;
            break;
        case 'smile_on_1':
            result = AchievementMap.smile_on_1;
            break;
        case 'smile_off_2':
            result = AchievementMap.smile_off_2;
            break;
        case 'smile_on_2':
            result = AchievementMap.smile_on_2;
            break;
        case 'smile_off_3':
            result = AchievementMap.smile_off_3;
            break;
        case 'smile_on_3':
            result = AchievementMap.smile_on_3;
            break;
        // case 'smile_off_4':
        //   result = AchievementMap.smile_off_4;
        //   break;
        // case 'smile_on_4':
        //   result = AchievementMap.smile_on_4;
        //   break;
        case 'off_3':
            result = AchievementMap.off_3;
            break;
        case 'on_3':
            result = AchievementMap.on_3;
            break;
        case 'off_7':
            result = AchievementMap.off_7;
            break;
        case 'on_7':
            result = AchievementMap.on_7;
            break;
        case 'off_30':
            result = AchievementMap.off_30;
            break;
        case 'on_30':
            result = AchievementMap.on_30;
            break;
        case 'off_50':
            result = AchievementMap.off_50;
            break;
        case 'on_50':
            result = AchievementMap.on_50;
            break;
        case 'off_73':
            result = AchievementMap.off_73;
            break;
        case 'on_73':
            result = AchievementMap.on_73;
            break;
        case 'off_99':
            result = AchievementMap.off_99;
            break;
        case 'on_99':
            result = AchievementMap.on_99;
            break;
        default:
            break;
    }
    return result;
}
