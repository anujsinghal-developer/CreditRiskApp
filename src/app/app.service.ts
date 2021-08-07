import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { BankCreditLimit } from "./BankCreditLimit";
import { Observable } from "rxjs";

@Injectable()
export class AppService{
     constructor(private http: HttpClient) {    }

     getBankCreditLimits(): Observable < BankCreditLimit[] > {  
        return this.http.get < BankCreditLimit[] > ('https://localhost:44306/CreditLimit');  
    }  
}