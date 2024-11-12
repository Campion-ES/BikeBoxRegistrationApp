import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VerificationData, VerificationRequest, BikeboxResponse, VerifyBySmsRequest, PaymentMethodDetails, RegistrationDetails } from '@app/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  readonly baseUrl = 'http://localhost:3000/api';
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
