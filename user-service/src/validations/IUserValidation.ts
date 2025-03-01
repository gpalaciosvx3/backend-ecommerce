export interface IUserValidation {
  setNext(handler: IUserValidation): IUserValidation;
  validate(data: any): Promise<void>;
}
