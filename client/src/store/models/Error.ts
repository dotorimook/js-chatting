import { observable, action } from "mobx";

interface IError {
  visible?: boolean;
  code?: string;
  msg?: string;
}

export default class Error {
  @observable visible?: boolean;
  @observable code?: string;
  @observable msg?: string;

  constructor(
    {visible = false, code='UNDEFINED', msg='알 수 없는 에러'}:IError
  ) {
    this.visible = visible;
    this.code = code;
    this.msg = msg;
  }

  @action
  toggle = () => {
    this.visible = !this.visible;
  }

  @action
  setError({visible = true, code, msg}:IError) {
    this.visible = visible;
    this.code = code;
    this.msg = msg;
  }
}