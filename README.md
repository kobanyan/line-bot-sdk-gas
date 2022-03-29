# line-bot-sdk-gas

Google Apps Script SDK for LINE Messaging API

[Node.js用](https://github.com/line/line-bot-sdk-nodejs) と同じインターフェイスで LINE Messaging API を Google Apps Script で利用できるようにしたライブラリです。

## API ID

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
- pushMessage(to: string, messages: Line.Message | Line.Message[]): void
- replyMessage(replyToken: string, messages: Line.Message | Line.Message[]): void
- multicast(to: string[], messages: Line.Message | Line.Message[]): void
- getProfile(userId: string): Line.Profile;
- getGroupMemberProfile(groupId: string, userId: string): Line.Profile;
- getRoomMemberProfile(roomId: string, userId: string): Line.Profile;
- getGroupMemberIds(groupId: string): string[];
- getRoomMemberIds(roomId: string): string[];
- getMessageContent(messageId: string): GoogleAppsScript.Base.Blob;
- leaveGroup(groupId: string): void
- leaveRoom(roomId: string): void
- getRichMenu(richMenuId: string): Line.RichMenuResponse;
- createRichMenu(richMenu: Line.RichMenu): string;
- deleteRichMenu(richMenuId: string): void
- getRichMenuIdOfUser(userId: string): string;
- linkRichMenuToUser(userId: string, richMenuId: string): void
- unlinkRichMenuFromUser(userId: string): void
- getRichMenuImage(richMenuId: string): GoogleAppsScript.Base.Blob;
- setRichMenuImage(richMenuId: string, data: GoogleAppsScript.Base.Blob, contentType?: string): void
- getRichMenuList(): Line.RichMenuResponse[];
- setDefaultRichMenu(richMenuId: string): void;
- getDefaultRichMenuId(): string;
- deleteDefaultRichMenu(): void;

## オリジナルのメソッド

本家にはないメソッドも若干あります。

- getProfileWithEventSource(eventSource: Line.EventSource): Line.Profile;  
`getProfile`/`getGroupMemberProfile`/`getRoomMemberProfile` の使い分けをせずとも、 `EventSource` を渡せば、対応する Profile を返すようにしたものです。
- leaveWithEventSource(eventSource: Line.EventSource): void;  
`leaveGroup`/`leaveRoom` の使い分けをせずとも、 `EventSource` を渡せば、退出できるようにしたものです。
