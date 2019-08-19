import { observable, action } from "mobx";
import request from "utils/request";
import URIs from "const/URIs";
import IRoom from "interfaces/IRoom";
import IInsertChatRoomFormValues from "interfaces/form/IInsertChatRoomFormValues";

export default class RoomList {
  @observable rooms: IRoom[] = [];
  @observable insertChatRoomVisible:boolean = false;

  @action
  loadRooms = async () => {
    try {
      this.rooms = await request({
        method: 'get',
        url: URIs.get_rooms
      }) as IRoom[];
    } catch (e) {
      throw e;
    }
  }
  
  @action
  insertRoom = async (values:IInsertChatRoomFormValues) => {
    const { title } = values;
    try {
      const newRoom = await request({
        method: 'post',
        url: URIs.post_insert_room,
        data: { title }
      });
      this.rooms.unshift(newRoom);
    } catch (e) {
      throw e;
    }
  }
}