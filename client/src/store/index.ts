import Error from "./models/Error";
import Loading from "./models/Loading";
import LoginInfo from "./models/LoginInfo";
import RoomList from "./models/screens/RoomList";
import ChatRoom from "./models/screens/ChatRoom";
import Login from "./models/screens/Login";

const store = {
  loginInfo: new LoginInfo(),
  loading: new Loading(),
  error: new Error({}),

  /** screens */
  screenLogin: new Login(),
  screenRoomList: new RoomList(),
  screenChatRoom: new ChatRoom(),
};

export default store;