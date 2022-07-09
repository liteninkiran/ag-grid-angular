import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'my-app';

    columnDefs = [
        { headerName: "ID", field: "id", sortable: true, resizable: true, filter: true },
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
}
