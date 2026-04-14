export interface SubModule {
  id: string;
  hexId?: string;
  address: number;
  part: number;
  name: string;
  type?: number;
  cat: string[];
  status: ModuleStatus;
  room?: string;
  zone?: string[];
}

export interface ModuleStatus {
  current?: any;
  currentClosedPosition?: number;
  pressed?: boolean;
  // Energy fields
  index?: number;
  power?: number;
  timestamp?: number;
  // Electricity (TeleInfo) fields
  indexHC?: number;
  indexConso?: number;
  powerMax?: number;
  powerMaxDate?: string;
  message?: string;
  Urms?: string;
  Umoy?: string;
  dateRefresh?: string;
}

export type ModuleCategory = 'blind' | 'relay' | 'dimmer' | 'button' | 'temp' | 'energy';
