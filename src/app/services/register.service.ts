import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  VerificationData,
  VerificationRequest,
  BikeboxResponse,
  VerifyBySmsRequest,
  PaymentMethodDetails,
  RegistrationDetails,
} from '@app/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private readonly configService = inject(ConfigService);
  private readonly baseUrl = this.configService.getConfig()?.apiUrl;
  public readonly verificationData$ = new BehaviorSubject<
    VerificationData | undefined
  >(undefined);

  set verificationData(value: VerificationData | undefined) {
    this.verificationData$.next(value);
  }

  //userId = 6296
  constructor(private http: HttpClient) {}

  verifyById(verification: VerificationRequest): Observable<BikeboxResponse> {
    return this.http.post<BikeboxResponse>(
      `${this.baseUrl}/checkId2`,
      verification
    );
  }

  verifyBySms(loginDetails: VerifyBySmsRequest): Observable<BikeboxResponse> {
    return this.http.post<BikeboxResponse>(
      `${this.baseUrl}/login`,
      loginDetails
    );
  }

  savePaymentMethod(
    paymentMethodDetails: PaymentMethodDetails
  ): Observable<BikeboxResponse> {
    return this.http.post<BikeboxResponse>(
      `${this.baseUrl}/savePaymentMethod`,
      paymentMethodDetails
    );
  }

  registration(
    registrationDetails: RegistrationDetails
  ): Observable<BikeboxResponse> {
    return this.http.post<BikeboxResponse>(
      `${this.baseUrl}/terminalRegistration`,
      registrationDetails
    );
  }
}
