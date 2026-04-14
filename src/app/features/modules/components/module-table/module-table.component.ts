import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubModule, ModuleCategory } from '../../../../core/models/module.model';
import { ModulesApiService } from '../../../../core/services/modules-api.service';
import { RelayActionsComponent } from '../relay-actions/relay-actions.component';
import { BlindActionsComponent } from '../blind-actions/blind-actions.component';
import { DimmerActionsComponent } from '../dimmer-actions/dimmer-actions.component';

@Component({
  selector: 'app-module-table',
  standalone: true,
  imports: [CommonModule, RelayActionsComponent, BlindActionsComponent, DimmerActionsComponent],
  templateUrl: './module-table.component.html',
  styleUrls: ['./module-table.component.css']
})
export class ModuleTableComponent {
  @Input() category!: ModuleCategory;
  @Input() modules: SubModule[] = [];
  @Output() moduleChanged = new EventEmitter<void>();

  constructor(private api: ModulesApiService) {}

  get hasActions(): boolean {
    return ['relay', 'blind', 'dimmer'].includes(this.category);
  }

  get isEnergy(): boolean {
    return this.category === 'energy';
  }

  isRelayOn(mod: SubModule): boolean {
    return mod.status?.current === 'on' || mod.status?.current === 'blink';
  }

  // ✏️ Action commune à TOUS les modules
  editName(mod: SubModule): void {
    const key = mod.id || `${mod.address}-${mod.part}`;
    const name = prompt(`Nouveau nom pour ${key} ?`, mod.name || '');
    if (name !== null) {
      this.api.setModuleName(key, name).subscribe({
        next: () => this.moduleChanged.emit(),
        error: (err) => alert('Erreur: ' + err.message)
      });
    }
  }

  onModuleChanged(): void { this.moduleChanged.emit(); }
}
