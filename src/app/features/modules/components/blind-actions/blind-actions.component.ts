import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SubModule } from '../../../../core/models/module.model';
import { ModulesApiService } from '../../../../core/services/modules-api.service';

@Component({
  selector: 'app-blind-actions',
  standalone: true,
  template: `
    <button class="action-btn" (click)="setStatus(1)">UP</button>
    <button class="action-btn" (click)="setStatus(-1)">DOWN</button>
    <button class="action-btn" (click)="setStatus(0)">STOP</button>
    <button class="action-btn" (click)="editName()">✏️</button>
    <button class="action-btn" (click)="editDuration()">⏳️</button>
  `,
  styles: [`
    .action-btn { padding: 4px 8px; margin: 0 2px; cursor: pointer; }
  `]
})
export class BlindActionsComponent {
  @Input() module!: SubModule;
  @Output() actionDone = new EventEmitter<void>();

  constructor(private api: ModulesApiService) {}

  private get key(): string {
    return `${this.module.address}-${this.module.part}`;
  }

  setStatus(status: number): void {
    this.api.setBlindStatus(this.key, status).subscribe({
      next: () => this.actionDone.emit(),
      error: (err) => alert('Erreur: ' + err.message)
    });
  }

  editName(): void {
    const name = prompt(`Nouveau nom pour ${this.key} ?`);
    if (name !== null) {
      this.api.setModuleName(this.key, name).subscribe({
        next: () => this.actionDone.emit(),
        error: (err) => alert('Erreur: ' + err.message)
      });
    }
  }

  editDuration(): void {
    const duration = prompt(`Durée de fermeture pour ${this.key} (en secondes) ?`);
    if (duration !== null && duration !== '') {
      this.api.setBlindDuration(this.key, parseInt(duration, 10)).subscribe({
        next: () => this.actionDone.emit(),
        error: (err) => alert('Erreur: ' + err.message)
      });
    }
  }
}
