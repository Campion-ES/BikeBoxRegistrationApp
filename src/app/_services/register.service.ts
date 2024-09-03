import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentMethodDetails } from '@app/_models/payment-method-details.model';
import { RegistrationDetails } from '@app/_models/registration-details.model';
import { BikeboxResponse } from '@app/_models/response.model';
import { VerificationData, VerificationRequest, VerifyBySmsRequest } from '@app/_models/verification.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  readonly baseUrl = 'https://bikebox.co.il/crm/api';
 readonly verificationData$ = new BehaviorSubject<VerificationData | undefined>(undefined);

 set verificationData(value:VerificationData | undefined){
  this.verificationData$.next(value);
 }

  //userId = 6296
  constructor(private http: HttpClient) {}

  verifyById(verification: VerificationRequest): Observable<BikeboxResponse> {
    return this.http.post<BikeboxResponse>(`${this.baseUrl}/checkId2`, verification,);
  }

  verifyBySms(loginDetails: VerifyBySmsRequest): Observable<BikeboxResponse> {
    return this.http.post<BikeboxResponse>(`${this.baseUrl}/login`, loginDetails);
  }

  savePaymentMethod(paymentMethodDetails: PaymentMethodDetails): Observable<BikeboxResponse> {
    return this.http.post<BikeboxResponse>(`${this.baseUrl}/savePaymentMethod`, paymentMethodDetails);
  }

  registration(registrationDetails: RegistrationDetails): Observable<BikeboxResponse> {
    return this.http.post<BikeboxResponse>(`${this.baseUrl}/terminalRegistration`, registrationDetails);
  }
}
