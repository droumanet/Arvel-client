export interface SubModule {
  id?: string;
  name?: string;
  address: number;
  part: number;
  cat: string[];
  status?: ModuleStatus;
}

export interface ModuleStatus {
  current?: any;
  currentClosedPosition?: number;
  pressed?: boolean;
}

export type ModuleCategory = 'blind' | 'relay' | 'dimmer' | 'button' | 'temp';
