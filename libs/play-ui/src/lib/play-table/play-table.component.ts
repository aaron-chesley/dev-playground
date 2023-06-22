import { Component, Input, OnInit } from '@angular/core';
import { PlayTableColumn, PlayTableRow } from './play-table.interface';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { PlayTableExpandedDetailsComponent } from './play-table-expanded-details.component';

export class PlayTableDataSource extends DataSource<any> {
  data = new BehaviorSubject<PlayTableRow[]>([]);
  connect(): Observable<PlayTableRow[]> {
    return this.data;
  }

  disconnect() {}
}

@Component({
  selector: 'play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./common-columns.scss', './play-table.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    CdkTableModule,
    PlayTableExpandedDetailsComponent,
  ],
})
export class PlayTableComponent implements OnInit {
  expandedRow: PlayTableRow | null;
  dataSource = new PlayTableDataSource();
  level = 0;
  @Input() columns: PlayTableColumn[] = [];
  @Input() rows: PlayTableRow[] = [];

  get displayedColumns(): string[] {
    return this.columns.map((c) => c.key);
  }

  onRowClick(row: PlayTableRow) {
    if (!row.rows.length) {
      return;
    }
    if (this.expandedRow === row) {
      this.expandedRow = null;
    } else {
      this.expandedRow = row;
    }
  }

  ngOnInit() {
    this.dataSource.data.next(this.rows);
  }
}
