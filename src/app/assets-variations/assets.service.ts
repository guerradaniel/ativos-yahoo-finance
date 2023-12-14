import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, take, throwError } from 'rxjs';
import { AssetGroup } from './models/asset-group.model';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(
    private http: HttpClient
  ) { }

  getAssetsOptions(): Observable<AssetGroup[]> {
    return this.http.get<AssetGroup[]>('assets/assets-options.json').pipe(
      take(1),
      catchError(() => throwError(() => new Error('Erro ao buscar os ativos. Por favor, tente novamente.')))
    )
  }
}