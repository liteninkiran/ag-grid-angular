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
        { headerName: "ID", field: "id", sortable: true, resizable: true, filter: true, checkboxSelection: true },
        { headerName: "Title", field: "title", sortable: true, resizable: true, filter: true },
        { headerName: "Description", field: "description", sortable: true, resizable: true, filter: true },
        { headerName: "Price", field: "price", sortable: true, resizable: true, filter: true },
        { headerName: "Discount Percentage", field: "discountPercentage", sortable: true, resizable: true, filter: true },
        { headerName: "Rating", field: "rating", sortable: true, resizable: true, filter: true },
        { headerName: "Stock", field: "stock", sortable: true, resizable: true, filter: true },
        { headerName: "Brand", field: "brand", sortable: true, resizable: true, filter: true },
        { headerName: "Category", field: "category", sortable: true, resizable: true, filter: true },
        { headerName: "Thumbnail", field: "thumbnail", sortable: true, resizable: true, filter: true },
    ];

    rowData: any;
    subscription!: Subscription;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.subscription = this.http.get("https://dummyjson.com/products").subscribe((data: any) => {
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
            .join("\n");
        alert(`Selected Rows:\n\n${selectedDataString}`);
    }
}
