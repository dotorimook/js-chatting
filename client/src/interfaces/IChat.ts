export default interface IChat {
  id: number;
  type: 'text'|'image';
  userId: number;
  name: string;
  content: string;
  createTime: string;
}