import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/core/model/account.model';
import { Paging, PagingMode, PagingOptions } from 'src/app/core/model/pagination';
import { TableConfig } from 'src/app/core/model/table.config';

@Component({
  selector: 'app-data-common-table',
  templateUrl: './data-common-table.component.html',
  styleUrls: ['./data-common-table.component.scss']
})
export class DataCommonTableComponent {
  @Input() dataSource!: MatTableDataSource<Account>;
  @Input() tableConfiguration!: TableConfig;
  @Input() total!: number;
  @Input() isLoading!: boolean;
  @Input() pagingMode!: PagingMode;
  @Input() pagingConfig!: PagingOptions;
  @Output() isLoaded = new EventEmitter<PageEvent>();
  @Output() edit = new EventEmitter<Account>();
  @Output() delete = new EventEmitter<Account>();

  constructor() { }

}
