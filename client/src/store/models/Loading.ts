import {observable, action} from 'mobx';

export default class Loading {
  @observable isLoading: boolean;
  
  constructor() {
    this.isLoading = false;
  }

  @action
  toggleLoading = () => {
    this.isLoading = !this.isLoading;
  }
}