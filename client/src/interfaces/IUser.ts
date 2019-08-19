export default interface IUser {
  id: number;
  username: string;
  password?: string;
  name: string;
  registerTime?: string;
  deleted?: boolean;
}