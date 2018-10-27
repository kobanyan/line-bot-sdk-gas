# line-bot-sdk-gas

Google Apps Script SDK for LINE Messaging API

[Node.js用](https://github.com/line/line-bot-sdk-nodejs)) と同じインターフェイスで LINE Messaging API を Google Apps Script で利用できるようにしたライブラリです。

## API ID

`M9SALMELLb5j80Xc6lwp2BSX4BxE72EjN`

## 使い方

```js
const lineClient = new LineBotSDK.Client({
  channelAccessToken: 'アクセストークン',
});
lineClient.replyMessage(replyToken, { type: 'text', messages: 'こんにちは' });
```

## メソッド

チェックが入っていないメソッド(リッチメニュー関連)は未実装です。

- [x] constructor(config: Line.ClientConfig);
- [x] pushMessage(to: string, messages: Line.Message | Line.Message[]): void
- [x] replyMessage(replyToken: string, messages: Line.Message | Line.Message[]): void
- [x] multicast(to: string[], messages: Line.Message | Line.Message[]): void
- [x] getProfile(userId: string): Line.Profile;
- [x] getGroupMemberProfile(groupId: string, userId: string): Line.Profile;
- [x] getRoomMemberProfile(roomId: string, userId: string): Line.Profile;
- [x] getGroupMemberIds(groupId: string): string[];
- [x] getRoomMemberIds(roomId: string): string[];
- [x] getMessageContent(messageId: string): GoogleAppsScript.Base.Blob;
- [x] leaveGroup(groupId: string): void
- [x] leaveRoom(roomId: string): void
- [ ] getRichMenu(richMenuId: string): Line.RichMenuResponse;
- [ ] createRichMenu(richMenu: Line.RichMenu): string;
- [ ] deleteRichMenu(richMenuId: string): void
- [ ] getRichMenuIdOfUser(userId: string): string;
- [ ] linkRichMenuToUser(userId: string, richMenuId: string): void
- [ ] unlinkRichMenuFromUser(userId: string): void
- [ ] getRichMenuImage(richMenuId: string): GoogleAppsScript.Base.Blob;
- [ ] setRichMenuImage(richMenuId: string, data: Buffer | GoogleAppsScript.Base.Blob, contentType?: string): void
- [ ] getRichMenuList(): Line.RichMenuResponse[];
- [ ] setDefaultRichMenu(richMenuId: string): {};
- [ ] getDefaultRichMenuId(): string;
- [ ] deleteDefaultRichMenu(): {};

## オリジナルのメソッド

- getProfileWithEventSource(eventSource: Line.EventSource): Line.Profile;  
`getProfile`/`getGroupMemberProfile`/`getRoomMemberProfile` の使い分けをせずとも、 `EventSource` を渡せば、対応する Profile を返すようにしたものです。
- leaveWithEventSource(eventSource: Line.EventSource): void;  
`leaveGroup`/`leaveRoom` の使い分けをせずとも、 `EventSource` を渡せば、退出できるようにしたものです。
