# line-bot-sdk-gas

Google Apps Script SDK for LINE Messaging API

[Node.js用](https://github.com/line/line-bot-sdk-nodejs) と同じインターフェイスで LINE Messaging API を Google Apps Script で利用できるようにしたライブラリです。

## スクリプト ID

`1EvYoqrPLkKgsV8FDgSjnHjW1jLp3asOSfDGEtLFO86pPSIm9PbuCQU7b`

## API ID(クラシックエディタ用)

`M9SALMELLb5j80Xc6lwp2BSX4BxE72EjN`

## 呼び出し方

```js
const lineClient = new LineBotSDK.Client({
  channelAccessToken: 'アクセストークン',
});
lineClient.replyMessage(replyToken, { type: 'text', text: 'こんにちは' });
```

## メソッド

詳細な使い方は本家と同じインターフェイスにしてある(Node と GAS での若干のクラスの差異がある部分(Readable | Buffer -> Blob)を除く)ので [Messaging APIリファレンス](https://developers.line.me/ja/reference/messaging-api/) をご参照ください。

- constructor(config: Line.ClientConfig);
- pushMessage(to: string, messages: Line.Message | Line.Message[], notificationDisabled?: boolean | undefined): Line.MessageAPIResponseBase
- replyMessage(replyToken: string, messages: Line.Message | Line.Message[], notificationDisabled?: boolean | undefined): Line.MessageAPIResponseBase
- multicast(to: string[], messages: Line.Message | Line.Message[], notificationDisabled?: boolean | undefined): Line.MessageAPIResponseBase
- getProfile(userId: string): Line.Profile;
- getGroupMemberProfile(groupId: string, userId: string): Line.Profile;
- getRoomMemberProfile(roomId: string, userId: string): Line.Profile;
- getGroupMemberIds(groupId: string): string[];
- getRoomMemberIds(roomId: string): string[];
- getMessageContent(messageId: string): GoogleAppsScript.Base.Blob;
- leaveGroup(groupId: string): any
- leaveRoom(roomId: string): any
- getRichMenu(richMenuId: string): Line.RichMenuResponse;
- createRichMenu(richMenu: Line.RichMenu): string;
- deleteRichMenu(richMenuId: string): any
- getRichMenuIdOfUser(userId: string): string;
- linkRichMenuToUser(userId: string, richMenuId: string): any
- unlinkRichMenuFromUser(userId: string): any
- getRichMenuImage(richMenuId: string): GoogleAppsScript.Base.Blob;
- setRichMenuImage(richMenuId: string, data: GoogleAppsScript.Base.Blob, contentType?: string): any
- getRichMenuList(): Line.RichMenuResponse[];
- setDefaultRichMenu(richMenuId: string): any;
- getDefaultRichMenuId(): string;
- deleteDefaultRichMenu(): any;

## オリジナルのメソッド

本家にはないメソッドも若干あります。

- getProfileWithEventSource(eventSource: Line.EventSource): Line.Profile;  
`getProfile`/`getGroupMemberProfile`/`getRoomMemberProfile` の使い分けをせずとも、 `EventSource` を渡せば、対応する Profile を返すようにしたものです。
- leaveWithEventSource(eventSource: Line.EventSource): void;  
`leaveGroup`/`leaveRoom` の使い分けをせずとも、 `EventSource` を渡せば、退出できるようにしたものです。
