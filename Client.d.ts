/// <reference types="google-apps-script" />
import * as Line from '@line/bot-sdk';
export declare class Client {
  private config;
  private static baseUrl;
  constructor(config: Line.ClientConfig);
  pushMessage(to: string, messages: Line.Message | Line.Message[]): void;
  replyMessage(replyToken: string, messages: Line.Message | Line.Message[]): void;
  multicast(to: string[], messages: Line.Message | Line.Message[]): void;
  getProfile(userId: string): Line.Profile;
  getGroupMemberProfile(groupId: string, userId: string): Line.Profile;
  getRoomMemberProfile(roomId: string, userId: string): Line.Profile;
  getProfileWithEventSource(eventSource: Line.EventSource): Line.Profile;
  getGroupMemberIds(groupId: string): string[];
  getRoomMemberIds(roomId: string): string[];
  getMessageContent(messageId: string): GoogleAppsScript.Base.Blob;
  leaveGroup(groupId: string): void;
  leaveRoom(roomId: string): void;
  leaveWithEventSource(eventSource: Line.EventSource): void;
  getRichMenu(richMenuId: string): Line.RichMenuResponse;
  createRichMenu(richMenu: Line.RichMenu): string;
  deleteRichMenu(richMenuId: string): void;
  getRichMenuIdOfUser(userId: string): string;
  linkRichMenuToUser(userId: string, richMenuId: string): void;
  unlinkRichMenuFromUser(userId: string): void;
  getRichMenuImage(richMenuId: string): GoogleAppsScript.Base.Blob;
  setRichMenuImage(
    richMenuId: string,
    data: GoogleAppsScript.Base.Blob,
    contentType?: string
  ): void;
  getRichMenuList(): Line.RichMenuResponse[];
  setDefaultRichMenu(richMenuId: string): void;
  getDefaultRichMenuId(): string;
  deleteDefaultRichMenu(): void;
  private apiUrl;
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
}
