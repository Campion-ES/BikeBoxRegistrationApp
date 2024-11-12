export interface VerificationData{
  userId:string;
  phone:string;
}

export type VerificationRequest = Omit<VerificationData,'userId'>;

export interface VerifyBySmsRequest{
  user:string;
  pass:string;
}
