import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, VERSION} from '@angular/core';
import {AccountService} from './core/services/account.service';
import {of, Subject} from 'rxjs';
import {Account, AccountsResponse, createAccount, createParamSearch} from './core/model/account.model';
import {distinctUntilChanged, mergeMap, takeUntil, tap} from 'rxjs/operators';
import {Accounts} from './core/data/account';
import * as faker from 'faker';
import { TableConfig } from './core/model/table.config';
import { TABLE_COLUMNS } from './core/data/table-config';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { OverlayLoadingService } from './commons/share-modules/overlay-loading/overlay-loading.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountFormCommonComponent } from './commons/share-modules/account-form-common/account-form-common.component';
import { DEFAULT_PAGING, PagingOptions } from './core/model/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';
  tableConfig: TableConfig = TABLE_COLUMNS;
  isLoading!: boolean;
  accountsData!: MatTableDataSource<Account>;
  currentPaging: PagingOptions = DEFAULT_PAGING;



  constructor(private accountService: AccountService,
              private loader: OverlayLoadingService,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog) {
    // read data from file to localStorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }

  ngOnInit(): void {
    this.getLoadingResource();
    this.getAccounts();
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }

  private getLoadingResource(): void {
    this.loader.loading.pipe(
      distinctUntilChanged(),
      takeUntil(this.unSubscribeAll)
    ).subscribe(loading => {
      this.isLoading = loading;
    });
  }

  getAccounts(paging: Partial<PagingOptions> = DEFAULT_PAGING): void {
    this.accountService.getAccounts(createParamSearch({
      last_name: this.searchStr,
      start: (paging.pageIndex as number)*(paging.pageSize as number),
      limit: paging.pageSize
    }))
      .pipe(
        tap((resp: AccountsResponse) => {
          this.currentPaging = {...this.currentPaging, length: resp.total}
        }),
        takeUntil(this.unSubscribeAll))
      .subscribe((resp: AccountsResponse) => {
        this.accountsData = new MatTableDataSource(resp.rows);
        this.cdr.markForCheck();
      }, (err: Error) => {
        this.accountsData = new MatTableDataSource();
      });
  }

  openAddAccount(): void {
    const dialogRef = this.dialog.open(AccountFormCommonComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed()
    .pipe(
      mergeMap((res) => {
        return this.accountService.addAccount(res);
      }),
      takeUntil(this.unSubscribeAll)
    )
    .subscribe((res) => {
      console.log(res);
      
      this.getAccounts(this.currentPaging);
    })
  }

  openEdit(acc: Account): void {
    this.selectedAccount = acc;
    this.isOpenEditAccount = true;
    const dialogRef = this.dialog.open(AccountFormCommonComponent, {
      width: 'auto',
      data: JSON.parse(JSON.stringify(acc))
    });

    dialogRef.afterClosed()
    .pipe(
      mergeMap((result) => {
        if (result) {
          const dataForEdit: Account = this.convertDataForEdit(acc, result);
          return  this.accountService.editAccount(dataForEdit)
        }
        return of(null);
      }),
      tap(() => {
        this.cdr.markForCheck();
      }),
      takeUntil(this.unSubscribeAll)
    )
    .subscribe();
  }

  //Convert data for edit
  private convertDataForEdit(originAcc: Account, account: any): Account {
    return {
      _id: originAcc?._id,
      account_number: account?.accountNumber,
      balance: account?.balance,
      firstname: account?.firstName,
      lastname: account?.lastName,
      age: account?.age,
      gender: account?.gender,
      address: account?.address,
      employer: account?.employer,
      email: account?.email,
      city: account?.city,
      state: account?.state
    }
  }

  saveNew(): void {
    const newAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: 25,
      lastname: faker.name.lastName(),
      firstname: faker.name.lastName(),
      city: faker.address.city(),
      account_number: faker.finance.account(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      employer: faker.name.lastName(),
      gender: 'F',
      state: faker.address.stateAbbr()
    });

    this.accountService.addAccount(newAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.getAccounts();
        this.isOpenAddAccount = false;
      }, (err: Error) => {
        this.accountsData = new MatTableDataSource();
      });
  }

  search(): void {
    this.getAccounts();
  }

  checkIsLoaded(event: PageEvent): void {
    this.currentPaging = {...this.currentPaging ,pageIndex: event.pageIndex, pageSize: event.pageSize}
    this.getAccounts(this.currentPaging);
  }

  deleteAccount(account: Account): void {
    this.accountService.deleteAccount(account)
    .pipe(
      takeUntil(this.unSubscribeAll))
    .subscribe(() => {
      this.getAccounts(this.currentPaging);
    });
  }
}