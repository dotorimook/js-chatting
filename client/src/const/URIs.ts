interface IURIs{
  screen_chatRoom: (roomId:number)=>string;

  post_login: string;
  post_logout: string;

  post_register: string;
  get_user_info: string;
  get_rooms: string;
  get_room_info: (roomId:number)=>string;
  post_insert_room: string;
  get_room_invitable_users: (roomId:number)=>string;
  post_invite_user: (roomId:number, userId:number)=>string;
  
  get_chats: (roomId:number)=>string;
  post_send_message: (roomId:number)=>string;
  post_send_image: (roomId:number)=>string;
};

const URIs:IURIs = {
  screen_chatRoom: (roomId:number)=> `/chat/${roomId}`,
  
  post_login: '/login',
  post_logout: '/logout',
  
  post_register: '/api/v1/user',
  get_user_info: '/api/v1/user',
  get_rooms: '/api/v1/chat/rooms',
  get_room_info: (roomId:number)=>`/api/v1/chat/room/${roomId}/info`,
  post_insert_room: '/api/v1/chat',
  get_room_invitable_users: (roomId:number)=>`/api/v1/chat/room/${roomId}/invitableUsers`,
  post_invite_user: (roomId:number, userId:number)=>`api/v1/chat/room/${roomId}/invite/${userId}`,

  get_chats: (roomId:number) => `/api/v1/chat/room/${roomId}`,
  post_send_message: (roomId:number) => `/api/v1/chat/room/${roomId}/text`,
  post_send_image: (roomId:number) => `/api/v1/chat/room/${roomId}/image`
};

export default URIs;