import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesApiService } from '../../../../core/services/modules-api.service';
import { SubModule, ModuleCategory } from '../../../../core/models/module.model';
import { ModuleTableComponent } from '../../components/module-table/module-table.component';

@Component({
  selector: 'app-modules-dashboard',
  standalone: true,
  imports: [CommonModule, ModuleTableComponent],
  templateUrl: './modules-dashboard.component.html',
  styleUrls: ['./modules-dashboard.component.css']
})
export class ModulesDashboardComponent implements OnInit {
  categories: ModuleCategory[] = ['relay', 'blind', 'dimmer', 'button', 'temp', 'energy'];
  activeCategory: ModuleCategory = 'relay';
  modules: SubModule[] = [];
  loading = true;

  constructor(
    private modulesApi: ModulesApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategory(this.activeCategory);
  }

  setActiveCategory(cat: ModuleCategory): void {
    this.activeCategory = cat;
    this.loadCategory(cat);
  }

  onModuleChanged(): void {
    this.loadCategory(this.activeCategory);
  }

  private loadCategory(cat: ModuleCategory): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.modulesApi.getModules(cat).subscribe({
      next: (modules) => {
        this.modules = modules;
        this.loading = false;
        this.cdr.detectChanges();
        console.log(`${cat}: ${modules.length} module(s)`);
      },
      error: (err) => {
        console.error(`Erreur chargement ${cat}:`, err);
        this.modules = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
