export class ApiResponse<T = any> {
  public success: boolean;
  public message: string;
  public data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T = any>(message: string, data?: T) {
    const formattedData = (typeof data === "object" && data !== null) ? data : { value: data };
    return new ApiResponse<T>(true, message, formattedData as T);
  }

  static error(message: string) {
    return new ApiResponse(false, message);
  }
}
