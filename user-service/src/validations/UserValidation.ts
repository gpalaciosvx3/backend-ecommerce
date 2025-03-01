import { IUserValidation } from "./IUserValidation";

export abstract class UserValidation implements IUserValidation {
  private nextValidator?: IUserValidation;

  setNext(handler: IUserValidation): IUserValidation {
    this.nextValidator = handler;
    return handler;
  }

  async validate(data: any): Promise<void> {
    if (this.nextValidator) {
      await this.nextValidator.validate(data);
    }
  }
}
