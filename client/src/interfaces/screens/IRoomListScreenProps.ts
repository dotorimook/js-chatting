import IComponentProps from "interfaces/IComponentProps";
import RoomList from "store/models/screens/RoomList";

export default interface IRoomListScreenProps extends IComponentProps {
  screenRoomList?: RoomList;
}