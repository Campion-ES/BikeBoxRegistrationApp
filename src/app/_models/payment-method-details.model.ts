export interface PaymentMethodDetails{
  fields:{
    card_number:string;
    card_holder:string;
    month:string;
    year:string;
    cv:string;
  }
  user_id:string;
}
