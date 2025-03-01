export class ApiResponse<T = any> {
  public status: boolean;
  public statusCode: number;
  public message: string;
  private data?: T;
  private detail?: T;

  constructor(status: boolean, statusCode: number, message: string, data?: T, detail?: T) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.detail = detail;
  }

  static success<T = any>(message: string, data?: T) {
    return new ApiResponse<T>(true, 200, message, data);
  }

  static error<T = any>(message: string, statusCode: number, detail?: T) {
    return new ApiResponse<T>(false, statusCode, message, undefined, detail);
  }

  toJSON() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
      ...(this.status ? { data: this.data } : { detail: this.detail })
    };
  }
}
