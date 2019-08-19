export default class ErrorWithStatus extends Error {
  constructor(status, message, error) {
    super(error);
    this.status = status;
    this.message = message;
    this.error = error;
  }
}