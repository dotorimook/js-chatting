import { observable, action } from "mobx";
import IRegisterFormValues from "interfaces/form/IRegisterFormValues";
import URIs from "const/URIs";
import request from "utils/request";

export default class Login {
  @observable registerDialogVisible:boolean = false;

  @action
  register = async (values:IRegisterFormValues) => {
    try {
      await request({
        method:'post',
        url: URIs.post_register,
        data: {
          ...values,
          password: '', //TODO: password 지원
        }
      });
    } catch (e) {
      throw e;
    }
  }
}