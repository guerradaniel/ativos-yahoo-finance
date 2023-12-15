import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, take, throwError } from 'rxjs';
import { AssetGroup } from './models/asset-group.model';
import { getUnixTime } from 'date-fns';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private URL_API = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAssetsByPeriod(
    id: string, 
    start: Date, 
    end: Date, 
    interval: string = '1d'): Observable<any> {
    const queryParams = new HttpParams()
      .set('interval1', interval)
      .set('period1', getUnixTime(start))
      .set('period2', getUnixTime(end));

    return this.http.get<any>(`${this.URL_API}/chart/${id}.SA`, { params: queryParams }).pipe(
      map((data: any) => data.chart.result[0]),
      catchError(() => throwError(() => new Error(
        'Erro ao buscar os ativos. Por favor, tente novamente.'
      )))
    );
  }

  getAssetsOptions(): Observable<AssetGroup[]> {
    return this.http.get<AssetGroup[]>('assets/assets-options.json').pipe(
      take(1),
      catchError(() => throwError(() => new Error('Erro ao buscar os ativos. Por favor, tente novamente.')))
    );
  }
}