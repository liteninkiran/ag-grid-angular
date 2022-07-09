import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('agGrid', { static: false }) agGrid!: AgGridAngular;
    title = 'my-app';

    columnDefs = [
        {
            headerName: 'Category',
            field: 'category',
            rowGroup: true,
            resizable: true,
        },
        {
            headerName: 'Price',
            field: 'price',
            resizable: true,
        },
    ];

    autoGroupColumnDef = {
        resizable: true,
        headerName: 'Title',
        field: 'title',
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
            checkbox: true,
        },
    };

    rowData: any;
    subscription!: Subscription;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.subscription = this.http.get('https://dummyjson.com/products').subscribe((data: any) => {
            this.rowData = data.products;
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataString = selectedData
            .map(node => node.title)
            .join('\n');
        alert(`Selected Rows:\n\n${selectedDataString}`);
    }
}
