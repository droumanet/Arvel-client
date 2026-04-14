import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SubModule } from '../models/module.model';

@Injectable({ providedIn: 'root' })
export class ModulesApiService {
  private readonly API = '/api';

  constructor(private http: HttpClient) {}

  /**
   * GET /modules         → tous les modules
   * GET /modules?cat=xxx → modules filtrés par catégorie
   */
  getModules(cat?: string): Observable<SubModule[]> {
    let params = new HttpParams();
    if (cat) {
      params = params.set('cat', cat);
    }
    return this.http.get<Record<string, SubModule>>(`${this.API}/modules`, { params }).pipe(
      map(data => {
        return Object.entries(data).map(([key, mod]) => ({
          ...mod,
          id: mod.id || key
        }));
      })
    );
  }

  getModuleStatus(key: string): Observable<any> {
    return this.http.get(`${this.API}/modules/status/${key}`);
  }

  getModuleName(key: string): Observable<any> {
    return this.http.get(`${this.API}/modules/name/${key}`);
  }

  setModuleName(key: string, name: string): Observable<any> {
    return this.http.post(`${this.API}/modules/name/${key}`, { name });
  }

  scanModules(): Observable<any> {
    return this.http.get(`${this.API}/modules/scan`);
  }

  setRelayStatus(key: string, status: number): Observable<any> {
    return this.http.post(`${this.API}/relay/${key}`, { status });
  }

  setBlindStatus(key: string, status: number): Observable<any> {
    return this.http.post(`${this.API}/blind/${key}`, { status });
  }

  setBlindDuration(key: string, duration: number): Observable<any> {
    return this.http.post(`${this.API}/modules/blind/${key}`, { duration });
  }

  setDimmerStatus(key: string, status: number): Observable<any> {
    return this.http.post(`${this.API}/dimmer/${key}`, { status });
  }
}

