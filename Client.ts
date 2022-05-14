import * as Line from '@line/bot-sdk';

export class Client {
  private static messagingUrl = 'https://api.line.me/v2/bot/';
  private static dataUrl = 'https://api-data.line.me/v2/bot/';

  constructor(private config: Line.ClientConfig) {}

  public pushMessage(
    to: string,
    messages: Line.Message | Line.Message[]
  ): Line.MessageAPIResponseBase {
    return this.httpPost(this.pushUrl(), {
      messages: this.toArray(messages),
      to,
    });
  }

  public replyMessage(
    replyToken: string,
    messages: Line.Message | Line.Message[]
  ): Line.MessageAPIResponseBase {
    return this.httpPost(this.replyUrl(), {
      messages: this.toArray(messages),
      replyToken,
    });
  }

  public multicast(
    to: string[],
    messages: Line.Message | Line.Message[]
  ): Line.MessageAPIResponseBase {
    return this.httpPost(this.multicastUrl(), {
      messages: this.toArray(messages),
      to,
    });
  }

  public getProfile(userId: string): Line.Profile {
    return this.httpGet(this.userProfileUrl(userId));
  }

  public getGroupMemberProfile(groupId: string, userId: string): Line.Profile {
    return this.httpGet(this.groupMemberProfileUrl(groupId, userId));
  }

  public getRoomMemberProfile(roomId: string, userId: string): Line.Profile {
    return this.httpGet(this.roomMemberProfileUrl(roomId, userId));
  }

  public getProfileWithEventSource(eventSource: Line.EventSource): Line.Profile {
    return this.httpGet(this.profileUrl(eventSource));
  }

  public getGroupMemberIds(groupId: string): string[] {
    return this.httpGet(this.groupMemberIdsUrl(groupId)).memberIds;
  }

  public getRoomMemberIds(roomId: string): string[] {
    return this.httpGet(this.roomMemberIdsUrl(roomId)).memberIds;
  }

  public getMessageContent(messageId: string): GoogleAppsScript.Base.Blob {
    return this.httpGetStream(this.contentUrl(messageId));
  }

  public leaveGroup(groupId: string): unknown {
    return this.httpPost(this.leaveGroupUrl(groupId));
  }

  public leaveRoom(roomId: string): unknown {
    return this.httpPost(this.leaveRoomUrl(roomId));
  }

  public leaveWithEventSource(eventSource: Line.EventSource): unknown {
    return this.httpPost(this.leaveUrl(eventSource));
  }

  public getRichMenu(richMenuId: string): Line.RichMenuResponse {
    return this.httpGet(this.richMenuUrl(richMenuId));
  }

  public createRichMenu(richMenu: Line.RichMenu): string {
    return this.httpPost(this.richMenuUrl(), richMenu).richMenuId;
  }

  public deleteRichMenu(richMenuId: string): unknown {
    return this.httpDelete(this.richMenuUrl(richMenuId));
  }

  public getRichMenuIdOfUser(userId: string): string {
    return this.httpGet(this.userRichMenuUrl(userId)).richMenuId;
  }

  public linkRichMenuToUser(userId: string, richMenuId: string): unknown {
    return this.httpPost(this.userRichMenuUrl(userId, richMenuId));
  }

  public unlinkRichMenuFromUser(userId: string): unknown {
    return this.httpDelete(this.userRichMenuUrl(userId));
  }

  public getRichMenuImage(richMenuId: string): GoogleAppsScript.Base.Blob {
    return this.httpGetStream(this.richMenuContentUrl(richMenuId));
  }

  public setRichMenuImage(
    richMenuId: string,
    data: GoogleAppsScript.Base.Blob,
    contentType?: string
  ): unknown {
    return this.httpPostBinary(this.richMenuContentUrl(richMenuId), data, contentType);
  }

  public getRichMenuList(): Line.RichMenuResponse[] {
    return this.httpGet(this.richMenuListUrl()).richmenus;
  }

  public setDefaultRichMenu(richMenuId: string): Record<string, unknown> {
    return this.httpPost(this.defaultRichMenuUrl(richMenuId));
  }

  public getDefaultRichMenuId(): string {
    return this.httpGet(this.defaultRichMenuUrl()).richMenuId;
  }

  public deleteDefaultRichMenu(): Record<string, unknown> {
    return this.httpDelete(this.defaultRichMenuUrl());
  }

  private messagingApiUrl = (path: string): string => `${Client.messagingUrl}${path}`;
  private dataApiUrl = (path: string): string => `${Client.dataUrl}${path}`;
  private pushUrl = () => this.messagingApiUrl('message/push');
  private replyUrl = () => this.messagingApiUrl('message/reply');
  private multicastUrl = () => this.messagingApiUrl('message/multicast');
  private contentUrl = (messageId: string) => this.dataApiUrl(`message/${messageId}/content`);
  private userProfileUrl = (userId: string) => this.messagingApiUrl(`profile/${userId}`);
  private roomMemberProfileUrl = (roomId: string, userId = '') =>
    this.messagingApiUrl(`room/${roomId}/member/${userId}`);
  private groupMemberProfileUrl = (groupId: string, userId = '') =>
    this.messagingApiUrl(`group/${groupId}/member/${userId}`);
  private profileUrl = (eventSource: Line.EventSource) => {
    switch (eventSource.type) {
      case 'group':
        return this.groupMemberProfileUrl(eventSource.groupId, eventSource.userId);
      case 'room':
        return this.roomMemberProfileUrl(eventSource.roomId, eventSource.userId);
      default:
        return this.userProfileUrl(eventSource.userId);
    }
  };
  private groupMemberIdsUrl = (groupId: string) =>
    this.messagingApiUrl(`group/${groupId}/members/ids`);
  private roomMemberIdsUrl = (roomId: string) => this.messagingApiUrl(`room/${roomId}/members/ids`);
  private leaveGroupUrl = (groupId: string) => this.messagingApiUrl(`group/${groupId}/leave`);
  private leaveRoomUrl = (roomId: string) => this.messagingApiUrl(`room/${roomId}/leave`);
  private leaveUrl = (eventSource: Line.EventSource) => {
    switch (eventSource.type) {
      case 'group':
        return this.leaveGroupUrl(eventSource.groupId);
      case 'room':
        return this.leaveRoomUrl(eventSource.roomId);
      default:
        throw new Error('Unexpected eventSource.type to get leave url.');
    }
  };
  private richMenuUrl = (richMenuId?: string) =>
    this.messagingApiUrl(`richmenu${richMenuId ? `/${richMenuId}` : ''}`);
  private richMenuListUrl = () => this.messagingApiUrl('richmenu/list');
  private userRichMenuUrl = (userId: string, richMenuId?: string) =>
    this.messagingApiUrl(`user/${userId}/richmenu${richMenuId ? `/${richMenuId}` : ''}`);
  private richMenuContentUrl = (richMenuId: string) =>
    this.dataApiUrl(`richmenu/${richMenuId}/content`);
  private defaultRichMenuUrl = (richMenuId?: string) =>
    this.messagingApiUrl(`user/all/richmenu${richMenuId ? `/${richMenuId}` : ''}`);

  private authHeader = () => {
    return {
      Authorization: `Bearer ${this.config.channelAccessToken}`,
    };
  };

  private httpGet = (url: string) => {
    return JSON.parse(
      UrlFetchApp.fetch(url, {
        headers: this.authHeader(),
      }).getContentText()
    );
  };
  private httpGetStream = (url: string) => {
    return UrlFetchApp.fetch(url, {
      headers: this.authHeader(),
    }).getBlob();
  };
  private httpPost = (url: string, payload?: Record<string, unknown>) => {
    return this.parseHTTPResponse(
      UrlFetchApp.fetch(url, {
        contentType: 'application/json',
        headers: this.authHeader(),
        method: 'post',
        payload: payload && JSON.stringify(payload),
      })
    );
  };
  private parseHTTPResponse = (response: GoogleAppsScript.URL_Fetch.HTTPResponse) => {
    const resHeader = response.getHeaders() as Line.MessageAPIResponseBase;
    const resBody = JSON.parse(response.getContentText());
    return {
      ...resBody,
      'x-line-request-id': resHeader['x-line-request-id'],
    };
  };
  private httpPostBinary = (
    url: string,
    data: GoogleAppsScript.Base.Blob,
    contentType?: string
  ) => {
    return JSON.parse(
      UrlFetchApp.fetch(url, {
        headers: {
          ...this.authHeader(),
          'Content-Type': contentType || data.getContentType(),
          // 'Content-Length': data.getBytes().length,
        },
        method: 'post',
        payload: data,
      }).getContentText()
    );
  };
  private httpDelete = (url: string) => {
    return JSON.parse(
      UrlFetchApp.fetch(url, { headers: this.authHeader(), method: 'delete' }).getContentText()
    );
  };

  private toArray = (messages: Line.Message | Line.Message[]) => {
    return Array.isArray(messages) ? messages : [messages];
  };
}
