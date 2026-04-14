import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubModule } from '../../../../core/models/module.model';
import { ModulesApiService } from '../../../../core/services/modules-api.service';

@Component({
  selector: 'app-dimmer-actions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dimmer-controls">
      <input
        type="range"
        min="0" max="100"
        [(ngModel)]="sliderValue"
        (change)="onSliderRelease()"
        class="dimmer-slider">
      <span class="dimmer-value">{{ sliderValue }}%</span>
      <button class="action-btn" (click)="setStatus(0)">OFF</button>
    </div>
  `,
  styles: [`
    .dimmer-controls {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .dimmer-slider {
      width: 100px;
      -webkit-appearance: none;
      appearance: none;
      height: 5px;
      background: #ddd;
      outline: none;
      border-radius: 5px;
    }
    .dimmer-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px; height: 15px;
      background: #4CAF50;
      cursor: pointer;
      border-radius: 50%;
    }
    .dimmer-slider::-moz-range-thumb {
      width: 15px; height: 15px;
      background: #4CAF50;
      cursor: pointer;
      border-radius: 50%;
      border: none;
    }
    .dimmer-value { min-width: 35px; text-align: right; }
    .action-btn { padding: 4px 8px; margin: 0 2px; cursor: pointer; }
  `]
})
export class DimmerActionsComponent implements OnChanges {
  @Input() module!: SubModule;
  @Output() actionDone = new EventEmitter<void>();

  sliderValue = 0;

  constructor(private api: ModulesApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['module']) {
      this.sliderValue = this.module?.status?.current ?? 0;
    }
  }

  private get key(): string {
    return `${this.module.address}-${this.module.part}`;
  }

  onSliderRelease(): void {
    this.setStatus(this.sliderValue);
  }

  setStatus(status: number): void {
    this.sliderValue = status;
    this.api.setDimmerStatus(this.key, status).subscribe({
      next: () => {
        // Mise à jour locale uniquement, pas de rechargement global
        if (this.module.status) {
          this.module.status.current = status;
        }
      },
      error: (err) => alert('Erreur: ' + err.message)
    });
  }
}
