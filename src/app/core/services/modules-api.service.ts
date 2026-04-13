import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SubModule } from '../models/module.model';

@Injectable({ providedIn: 'root' })
export class ModulesApiService {

  constructor(private http: HttpClient) {}

  /**
   * GET /modules → Récupère tous les sous-modules
   * L'API renvoie un objet, on le convertit en tableau.
   */
  getModules(): Observable<SubModule[]> {
    return this.http.get<Record<string, SubModule>>('/modules').pipe(
      map(data => Object.values(data))
    );
  }

  /**
   * GET /modules/status/:key
   */
  getModuleStatus(key: string): Observable<any> {
    return this.http.get(`/modules/status/${key}`);
  }

  /**
   * GET /modules/name/:key
   */
  getModuleName(key: string): Observable<any> {
    return this.http.get(`/modules/name/${key}`);
  }

  /**
   * POST /modules/name/:key  { name }
   */
  setModuleName(key: string, name: string): Observable<any> {
    return this.http.post(`/modules/name/${key}`, { name });
  }

  /**
   * GET /modules/scan → Scanner les modules sur le bus
   */
  scanModules(): Observable<any> {
    return this.http.get('/modules/scan');
  }

  // ── Relay ──────────────────────────────────────────────
  /**
   * POST /relay/:key  { status: 0|1 }
   */
  setRelayStatus(key: string, status: number): Observable<any> {
    return this.http.post(`/relay/${key}`, { status });
  }

  // ── Blind ──────────────────────────────────────────────
  /**
   * POST /blind/:key  { status: -1|0|1 }
   */
  setBlindStatus(key: string, status: number): Observable<any> {
    return this.http.post(`/blind/${key}`, { status });
  }

  /**
   * POST /modules/blind/:key  { duration }
   */
  setBlindDuration(key: string, duration: number): Observable<any> {
    return this.http.post(`/modules/blind/${key}`, { duration });
  }

  // ── Dimmer ─────────────────────────────────────────────
  /**
   * POST /dimmer/:key  { status: 0–100 }
   */
  setDimmerStatus(key: string, status: number): Observable<any> {
    return this.http.post(`/dimmer/${key}`, { status });
  }
}
