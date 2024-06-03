import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IProduct } from '../interfaces/products.interface';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({ providedIn: 'root' })
export class TableService {

    private urlProducts: string = 'http://localhost:3000/Products';

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorMessage = `Error: ${error.error.message}`;
            this.alertService.alertDanger(`Error: ${error.error.message}`)
        } else {
            // Backend error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // Optionally, you could log the error to an external server or service
        return throwError(errorMessage);
    }

    constructor(private http: HttpClient,
        private alertService: AlertService
    ) { }

    // Create
    addNewProducts(product: IProduct): Observable<IProduct> {
        return this.http.post<IProduct>(`${this.urlProducts}`, product).pipe(
            catchError(this.handleError),
            tap(
                data => console.log('Se ha guardado correctamente.')
            )
        )
    }

    // Read
    getAllProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(`${this.urlProducts}`)
    }

    getProductById(id: string): Observable<IProduct> {
        return this.http.get<IProduct>(`${this.urlProducts}/${id}`)
    }

    // Update
    updateProduct(id: string, data: any): Observable<string> {
        return this.http.patch<string>(`${this.urlProducts}/${id}`, data).pipe(
            catchError(this.handleError),
            tap(
                data => console.log('Se ha actualizado correctamente.')
            )
        );
    }

    // Delete
    deleteProduct(id: string): Observable<string> {
        return this.http.delete<string>(`${this.urlProducts}/${id}`).pipe(
            catchError(this.handleError),
            tap(
                data => console.log('Se ha eliminado correctamente.')
            )
        );
    }

}