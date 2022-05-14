/// <reference types="google-apps-script" />
import * as Line from '@line/bot-sdk';
export declare class Client {
  private config;
  private static messagingUrl;
  private static dataUrl;
  constructor(config: Line.ClientConfig);
  pushMessage(
    to: string,
    messages: Line.Message | Line.Message[],
    notificationDisabled?: boolean
  ): Line.MessageAPIResponseBase;
  replyMessage(
    replyToken: string,
    messages: Line.Message | Line.Message[],
    notificationDisabled?: boolean
  ): Line.MessageAPIResponseBase;
  multicast(
    to: string[],
    messages: Line.Message | Line.Message[],
    notificationDisabled?: boolean
  ): Line.MessageAPIResponseBase;
  getProfile(userId: string): Line.Profile;
  getGroupMemberProfile(groupId: string, userId: string): Line.Profile;
  getRoomMemberProfile(roomId: string, userId: string): Line.Profile;
  getProfileWithEventSource(eventSource: Line.EventSource): Line.Profile;
  getGroupMemberIds(groupId: string): string[];
  getRoomMemberIds(roomId: string): string[];
  getMessageContent(messageId: string): GoogleAppsScript.Base.Blob;
  leaveGroup(groupId: string): unknown;
  leaveRoom(roomId: string): unknown;
  leaveWithEventSource(eventSource: Line.EventSource): unknown;
  getRichMenu(richMenuId: string): Line.RichMenuResponse;
  createRichMenu(richMenu: Line.RichMenu): string;
  deleteRichMenu(richMenuId: string): unknown;
  getRichMenuIdOfUser(userId: string): string;
  linkRichMenuToUser(userId: string, richMenuId: string): unknown;
  unlinkRichMenuFromUser(userId: string): unknown;
  getRichMenuImage(richMenuId: string): GoogleAppsScript.Base.Blob;
  setRichMenuImage(
    richMenuId: string,
    data: GoogleAppsScript.Base.Blob,
    contentType?: string
  ): unknown;
  getRichMenuList(): Line.RichMenuResponse[];
  setDefaultRichMenu(richMenuId: string): Record<string, unknown>;
  getDefaultRichMenuId(): string;
  deleteDefaultRichMenu(): Record<string, unknown>;
  private messagingApiUrl;
  private dataApiUrl;
  private pushUrl;
  private replyUrl;
  private multicastUrl;
  private contentUrl;
  private userProfileUrl;
  private roomMemberProfileUrl;
  private groupMemberProfileUrl;
  private profileUrl;
  private groupMemberIdsUrl;
  private roomMemberIdsUrl;
  private leaveGroupUrl;
  private leaveRoomUrl;
  private leaveUrl;
  private richMenuUrl;
  private richMenuListUrl;
  private userRichMenuUrl;
  private richMenuContentUrl;
  private defaultRichMenuUrl;
  private authHeader;
  private httpGet;
  private httpGetStream;
  private httpPost;
  private parseHTTPResponse;
  private httpPostBinary;
  private httpDelete;
  private toArray;
}
