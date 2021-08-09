import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TransactionService } from '../core/service/transaction.service';
import { Transaction } from '../core/model/transactions';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {

  /** Columns to be displayed in groups table. */
  displayedColumns: string[] = [
    'receiver',
    'emitter',
    'transaction_status',
    'transaction_type',
    'amount_net',
    'amount_raw',
    'fiat_currency',
    'crypto_amount',
    'crypto_currency',
    'date_creation'
  ];

  /**Transaction status value */
  transaction_status = [
    'pending',
    'confirmed',
    'rejected',
    'all'
  ];
  /**Transaction type value */
  transaction_type = [
    'buy',
    'send',
    'sell',
    'all'
  ];
  /**Default status value */
  status = 'all';
  /**Default type value */
  type = 'all';
  /** Data source for transactions table. */
  transactionDataSource!: MatTableDataSource<Transaction>;
  /**loading variable */
  transactionLoading = false;

  /** Paginator for groups table. */
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /** Sorter for groups table. */
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  mediaSub!: Subscription
  constructor(
    private transactionService: TransactionService,
    private mediaObserver: MediaObserver
  ) { }

  ngOnInit(): void {
    this.applyResponsiness();
    this.getAllTransaction();
  }


  applyResponsiness() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      if (result.mqAlias === "sm" || result.mqAlias === "xs" || result.mqAlias === "sm" || result.mqAlias === "md") {
        this.deleteColunm("crypto_amount");
        this.deleteColunm("crypto_currency");
        this.deleteColunm("emitter");
      } else if (result.mqAlias === "lg") {
        this.displayedColumns = [
          'receiver',
          'emitter',
          'transaction_status',
          'transaction_type',
          'amount_net',
          'amount_raw',
          'fiat_currency',
          'crypto_amount',
          'crypto_currency',
          'date_creation'
        ];
      }
    });
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.transactionDataSource.filter = filterValue.trim().toLowerCase();
  }


  getAllTransaction() {
    this.transactionLoading = true
    this.transactionService.getAllTransaction(this.status, this.type).subscribe((response: any) => {
      this.transactionDataSource = new MatTableDataSource(response.data);
      this.transactionDataSource.paginator = this.paginator;
      this.transactionDataSource.sort = this.sort;
      this.transactionLoading = false;
    }, (error => {
      this.transactionLoading = false;
    }))
  }

  seach() {
    this.getAllTransaction();
  }

  deleteColunm(colunm: string) {
    const index: number = this.displayedColumns.indexOf(colunm);
    if (index !== -1) {
      this.displayedColumns.splice(index, 1);
    }
  }
}

