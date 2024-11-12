export interface BikeboxResponse {
  code: ResponseCode;
  user: string;
  user_id: string;
  id: string;
  token: string;
  success: string;
  error: string;
}

export enum ResponseCode {
  Ok = 200,
  Success = 20,
  WrongPhoneFormat = 40,
  UserExist = 41,
  UserNotExist = 42,
  PhoneNotExist = 45,
  NoValidRecipients = 50,
  NotMatch = 400,
  WrongRavkavFormat = 6000,
  SuccessUpdatePaymentMethod = 20000,
  WrongPaymentMethod = 30000
}
