import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Student } from '../model/student';
import { catchError, retry } from 'rxjs'; // ->rxjs/operators/

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  //Student endpoint -> un endpoint se refiere a la direccion URL
  basePath = 'http://localhost:3000/api/v1/students';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //API Error Handling -> handling es manejo. (Manejo de errores de la API)
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Default error handling
      console.log(`An error ocurred: ${error.error.message}`);
    } else {
      //Unsuccesful Response Error Code return
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    /*  return throwError(
      'Something happened with request, please try again later'
    );*/

    //Return Observable with Error Message to Client
    return throwError(
      //As{i este deprecado lo dejamos ahí
      'Something happened with request, please try again later'
    );
  }

  //Create Student
  create(item: any): Observable<Student> {
    //stringify doy forma a lo que llegue en formato JSON
    //El unico tipo q pasa es un json con el httpOptions
    return this.http
      .post<Student>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get Student by Id
  getById(id: any): Observable<Student> {
    return this.http
      .get<Student>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Get All Students
  getAll(): Observable<Student> {
    return this.http
      .get<Student>(this.basePath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Update Student
  update(id: any, item: any): Observable<Student> {
    return this.http
      .put<Student>(
        `${this.basePath}/${id}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  //Delete Student
  delete(id: any) {
    return this.http
      .delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
