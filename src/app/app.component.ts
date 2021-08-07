import { Component, OnInit } from '@angular/core';
import {  
  ColDef,  
  GridApi,  
  ColumnApi  
} from 'ag-grid-community'; 
import { AppService } from './app.service';
import { BankCreditLimit } from './BankCreditLimit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CreditRiskApp';

  public gridColumnDefs: ColDef[]; 
  public bankCreditLimits: BankCreditLimit[];  
  private api: GridApi;  
  private columnApi: ColumnApi;  

  constructor(private appService: AppService) {  
     this.gridColumnDefs = this.createGridColumns();
  }

  ngOnInit() {  
    this.appService.getBankCreditLimits().subscribe(bankCreditLimits => {  
       console.log(bankCreditLimits);      
        this.bankCreditLimits = bankCreditLimits  
    })  
}  

onGridReady(params): void {  
  this.api = params.api;  
  this.columnApi = params.columnApi;  
  this.api.sizeColumnsToFit();  
}  


  private createGridColumns() {  
    return [{  
        headerName: 'Business Date', 
       
        field: 'businessDate',  
        cellRenderer: (data) => {
          return data.value ? (new Date(data.value)).toLocaleDateString() : '';
          } ,
        filter: true,  
        enableSorting: true,  
        editable: false,  
        sortable: true  
    }, {  
        headerName: 'Bank Name',  
        field: 'bankName',  
        filter: true,  
        editable: false,  
        sortable: true  
    }, {  
        headerName: 'Rating',  
        field: 'rating',  
        filter: true,  
        sortable: true,  
        editable: false,  
       
    }, {  
        headerName: 'Total Assets',  
        field: 'totalAssets',          
        valueFormatter: params => this.currencyFormatter(params.data.totalAssets, '$'),
        filter: true,  
        editable: false,  
        sortable: true  
    }, {  
        headerName: 'Calculated Credit Limit',  
        field: 'calculatedLimit',  
        valueFormatter: params => this.currencyFormatter(params.data.calculatedLimit, '$'),
        filter: true,  
        editable: false ,
        sortable: true   
    }]  
}  

 currencyFormatter(currency, sign) {
   if(currency){    
  var sansDec = currency.toFixed(0);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return sign + `${formatted}`;
   }
}


}
