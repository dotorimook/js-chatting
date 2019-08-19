import IComponentProps from "interfaces/IComponentProps";
import ChatRoom from "store/models/screens/ChatRoom";

export default interface IChatRoomScreenProps extends IComponentProps {
  screenChatRoom?: ChatRoom
}