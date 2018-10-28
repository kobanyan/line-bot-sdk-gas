import * as Line from '@line/bot-sdk';
import * as LineBotSDK from '../Client';

export function doPost(e: any) {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const event = JSON.parse(e.postData.contents).events[0];
  const replyToken = event.replyToken;
  const messageText = event.message.text;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.replyMessage(replyToken, { type: 'text', text: messageText });
}

export function pushTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const userId1 = PropertiesService.getScriptProperties().getProperty('USER_ID_1')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.pushMessage(userId1, [{ type: 'text', text: 'a' }, { type: 'text', text: 'b' }]);
}

export function multicastTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const userId1 = PropertiesService.getScriptProperties().getProperty('USER_ID_1')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.multicast(
    [userId1],
    [{ type: 'text', text: 'multicast test L1' }, { type: 'text', text: 'multicast test L2' }]
  );
}

export function getProfileTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const userId1 = PropertiesService.getScriptProperties().getProperty('USER_ID_1')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const profile = lc.getProfile(userId1);
  Logger.log(profile);
}

export function getRoomMemberProfileTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const roomId = PropertiesService.getScriptProperties().getProperty('ROOM_ID')!;
  const userId1 = PropertiesService.getScriptProperties().getProperty('USER_ID_1')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const profile = lc.getRoomMemberProfile(roomId, userId1);
  Logger.log(profile);
}

export function getGroupMemberIdsTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const groupId = PropertiesService.getScriptProperties().getProperty('GROUP_ID')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const memberIds = lc.getGroupMemberIds(groupId);
  Logger.log(memberIds);
}

export function getRoomMemberIdsTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const roomId = PropertiesService.getScriptProperties().getProperty('ROOM_ID')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const memberIds = lc.getRoomMemberIds(roomId);
  Logger.log(memberIds);
}

export function getMessageContentTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const messageId = PropertiesService.getScriptProperties().getProperty('MESSAGE_ID')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const message = lc.getMessageContent(messageId);
  DriveApp.createFile(message);
}

export function leaveGroupTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const groupId = PropertiesService.getScriptProperties().getProperty('GROUP_ID')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.leaveGroup(groupId);
}

export function leaveRoomTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const roomId = PropertiesService.getScriptProperties().getProperty('ROOM_ID')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.leaveRoom(roomId);
}

export function getRichMenuTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const richMenuId = PropertiesService.getScriptProperties().getProperty('RICHMENU_ID')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const richMenu = lc.getRichMenu(richMenuId);
  Logger.log(richMenu);
}

export function createRichMenuTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const richMenu: Line.RichMenu = {
    areas: [
      {
        action: {
          text: 'up',
          type: 'message',
        },
        bounds: {
          height: 321,
          width: 321,
          x: 551,
          y: 325,
        },
      },
      {
        action: {
          text: 'right',
          type: 'message',
        },
        bounds: {
          height: 321,
          width: 321,
          x: 876,
          y: 651,
        },
      },
      {
        action: {
          text: 'down',
          type: 'message',
        },
        bounds: {
          height: 321,
          width: 321,
          x: 551,
          y: 972,
        },
      },
      {
        action: {
          text: 'left',
          type: 'message',
        },
        bounds: {
          height: 321,
          width: 321,
          x: 225,
          y: 651,
        },
      },
      {
        action: {
          text: 'btn b',
          type: 'message',
        },
        bounds: {
          height: 367,
          width: 367,
          x: 1433,
          y: 657,
        },
      },
      {
        action: {
          text: 'btn a',
          type: 'message',
        },
        bounds: {
          height: 367,
          width: 367,
          x: 1907,
          y: 657,
        },
      },
    ],
    chatBarText: 'Controller',
    name: 'Controller',
    selected: false,
    size: {
      height: 1686,
      width: 2500,
    },
  };
  const richMenuId = lc.createRichMenu(richMenu);
  Logger.log(richMenuId);
}

export function deleteRichMenuTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const richMenuId = PropertiesService.getScriptProperties().getProperty('RICHMENU_ID')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.deleteRichMenu(richMenuId);
}

export function getRichMenuIdOfUserTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const userId1 = PropertiesService.getScriptProperties().getProperty('USER_ID_1')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const richMenuId = lc.getRichMenuIdOfUser(userId1);
  Logger.log(richMenuId);
}

export function linkRichMenuToUserTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const userId1 = PropertiesService.getScriptProperties().getProperty('USER_ID_1')!;
  const richMenuId = PropertiesService.getScriptProperties().getProperty('RICHMENU_ID')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.linkRichMenuToUser(userId1, richMenuId);
}

export function unlinkRichMenuFromUserTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const userId1 = PropertiesService.getScriptProperties().getProperty('USER_ID_1')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.unlinkRichMenuFromUser(userId1);
}

export function getRichMenuImageTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const richMenuId = PropertiesService.getScriptProperties().getProperty('RICHMENU_ID')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const image = lc.getRichMenuImage(richMenuId);
  DriveApp.createFile(image);
}

export function setRichMenuImageTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const richMenuId = PropertiesService.getScriptProperties().getProperty('RICHMENU_ID')!;
  const fileId = PropertiesService.getScriptProperties().getProperty('FILE_ID')!;
  const image = DriveApp.getFileById(fileId);
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.setRichMenuImage(richMenuId, image.getBlob(), 'image/jpeg');
}

export function getRichMenuListTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const richMenuList = lc.getRichMenuList();
  Logger.log(richMenuList[0]);
}

export function setDefaultRichMenuImageTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const richMenuId = PropertiesService.getScriptProperties().getProperty('RICHMENU_ID')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.setDefaultRichMenu(richMenuId);
}

export function getDefaultRichMenuTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  const richMenuId = lc.getDefaultRichMenuId();
  Logger.log(richMenuId);
}

export function deleteDefaultRichMenuTest() {
  const channelAccessToken = PropertiesService.getScriptProperties().getProperty('ACCESS_TOKEN')!;
  const lc = new LineBotSDK.Client({ channelAccessToken });
  lc.deleteDefaultRichMenu();
}
