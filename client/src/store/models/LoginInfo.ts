import { observable, action } from "mobx";
import request from "utils/request";
import URIs from "const/URIs";

export default class LoginInfo {
  @observable id:number = -1;
  @observable username:string = '';
  @observable name:string = '';
  @observable isLogin: boolean = false;
  isFirstTry:boolean = true;

  @action
  login = async (username:string) => {
    try {
      this.isFirstTry = false;
      await request({
        method:'post',
        url: URIs.post_login,
        data: {
          username
        }
      });
      this.isLogin = true;
      await this.postLogin();
    } catch (e) {
      throw e;
    }
  }

  @action
  autoLogin = async () => {
    try {
      await this.postLogin();
      this.isLogin = true;
    } catch (e) {
      if(!this.isFirstTry)
        return true;
      else
        throw e;
    } finally {
      this.isFirstTry = false;
    }
  }

  @action
  updateUserInfo = async () => {
    try {
      const {userId, username, name} = await request({
        method: 'get',
        url: URIs.get_user_info,
        ignoreError: this.isFirstTry,
      });
      this.id = userId;
      this.username = username;
      this.name = name;
    } catch (e) {
      throw e;
    }
  }
  
  @action
  postLogin = async () => {
    await this.updateUserInfo();
  }

  @action
  logout = async () => {
    try {
      await request({
        method:'post',
        url: URIs.post_logout
      });
    } catch(e) {

    } finally {
      this.isLogin = false;
      this.id = -1;
      this.username = '';
      this.name = '';
    }
  }
  
}