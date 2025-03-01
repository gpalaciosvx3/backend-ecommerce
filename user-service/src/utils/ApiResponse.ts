export class ApiResponse {
  public success: boolean;
  public message: string;
  public data?: any;

  constructor(success: boolean, message: string, data?: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success(message: string, data?: any) {
    return new ApiResponse(true, message, data);
  }

  static error(message: string) {
    return new ApiResponse(false, message);
  }
}
