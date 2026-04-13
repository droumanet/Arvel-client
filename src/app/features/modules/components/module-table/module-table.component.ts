import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubModule, ModuleCategory } from '../../../../core/models/module.model';
import { RelayActionsComponent } from '../relay-actions/relay-actions.component';
import { BlindActionsComponent } from '../blind-actions/blind-actions.component';
import { DimmerActionsComponent } from '../dimmer-actions/dimmer-actions.component';

@Component({
  selector: 'app-module-table',
  standalone: true,
  imports: [
    CommonModule,
    RelayActionsComponent,
    BlindActionsComponent,
    DimmerActionsComponent
  ],
  templateUrl: './module-table.component.html',
  styleUrls: ['./module-table.component.css']
})
export class ModuleTableComponent {
  @Input() category!: ModuleCategory;
  @Input() modules: SubModule[] = [];
  @Output() moduleChanged = new EventEmitter<void>();

  /** Seuls relay, blind et dimmer ont une colonne Action */
  get hasActions(): boolean {
    return ['relay', 'blind', 'dimmer'].includes(this.category);
  }

  isRelayOn(mod: SubModule): boolean {
    return mod.status?.current === 'on' || mod.status?.current === 'blink';
  }

  onModuleChanged(): void {
    this.moduleChanged.emit();
  }
}
