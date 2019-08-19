import { observable, action, values } from "mobx";
import IChat from "interfaces/IChat";
import URIs from "const/URIs";
import request from "utils/request";
import ISendChatFormValues from "interfaces/form/ISendChatFormValues";
import IRoom from "interfaces/IRoom";
import IUser from "interfaces/IUser";
import io from 'socket.io-client';
import config from "config";

export default class ChatRoom {
  @observable roomId:number = -1;
  @observable chats:IChat[] = [];
  @observable info:IRoom | null = null;
  @observable invitableUsers:IUser[] = [];
  @observable inviteDialogVisible:boolean = false;
  socket:SocketIOClient.Socket|null = null;

  @action
  load = async ()=>{
    if(this.roomId < 0)
      throw Error('방을 선택해주세요.');

      try {
        
      if(!!this.socket) {
        this.socket.disconnect();
        this.socket.close();
      }
      
      this.socket = io(`${config.host}`, {query: {
        roomId: this.roomId
      }});
      this.socket.on('connect', function(){
      });
      this.socket.on('disconnect', function () {
      });
      this.socket.on('chat', (data:any) => {
        this.chats.push(data as IChat);
      });
      this.socket.connect();
      } catch(e) {
        console.error(e);
      }

      this.info = await request({
        method: 'get',
        url: URIs.get_room_info(this.roomId),
      }) as IRoom;
    
      this.chats = await request({
        method: 'get',
        url: URIs.get_chats(this.roomId),
      }) as IChat[];
      
  }

  @action
  sendMessage = async (values:ISendChatFormValues) => {
    if(this.roomId < 0)
      throw Error('방을 선택해주세요.');
    try {
      await request({
        method:'post',
        url: URIs.post_send_message(this.roomId),
        data: values
      });
    } catch(e) {
      throw e;
    }
  }
  @action
  sendImage = async (image:any) => {
    if(this.roomId < 0)
      throw Error('방을 선택해주세요.');
    try {
      const form = new FormData();
      form.append('image', image);
      await request({
        method:'post',
        url:URIs.post_send_image(this.roomId),
        data: form,
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
    } catch (e) {
      throw e;
    }
  }

  @action
  loadInvitableUser = async () => {
    if(this.roomId < 0)
      throw Error('방을 선택해주세요.');
    try {
      this.invitableUsers = await request({
        method:'get',
        url: URIs.get_room_invitable_users(this.roomId),
        data: values
      });
      console.log(this.invitableUsers);
    } catch(e) {
      throw e;
    }
  }
  
  @action
  inviteUser = async (userId:number) => {
    if(this.roomId < 0)
      throw Error('방을 선택해주세요.');
    try {
      await request({
        method:'post',
        url: URIs.post_invite_user(this.roomId, userId),
      });
    } catch(e) {
      throw e;
    }
  }
}