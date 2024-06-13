import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IUser } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {

    private urlUsers: string = 'http://localhost:3000/Users';

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
    addNewUser(user: IUser): Observable<IUser> {
        return this.http.post<IUser>(`${this.urlUsers}`, user).pipe(
            catchError(this.handleError),
            tap(
                data => console.log('Se ha guardado correctamente.')
            )
        )
    }

    // Read
    getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${this.urlUsers}`)
    }

    getUserById(userName: string): Observable<IUser> {
        return this.http.get<IUser>(`${this.urlUsers}/${userName}`)
    }

    // Update
    updateUser(id: string, data: any): Observable<string> {
        return this.http.patch<string>(`${this.urlUsers}/${id}`, data).pipe(
            catchError(this.handleError),
            tap(
                data => console.log('Se ha actualizado correctamente.')
            )
        );
    }

    // Delete
    deleteUser(id: string): Observable<string> {
        return this.http.delete<string>(`${this.urlUsers}/${id}`).pipe(
            catchError(this.handleError),
            tap(
                data => console.log('Se ha eliminado correctamente.')
            )
        );
    }

}