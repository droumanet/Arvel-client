import { Component, OnInit } from '@angular/core';
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

  categories: ModuleCategory[] = ['relay', 'blind', 'dimmer', 'button', 'temp'];
  activeCategory: ModuleCategory = 'relay';
  modulesByCategory: Record<string, SubModule[]> = {};
  loading = true;

  constructor(private modulesApi: ModulesApiService) {}

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules(): void {
    this.loading = true;
    this.modulesApi.getModules().subscribe({
      next: (modules) => {
        this.modulesByCategory = this.groupByCategory(modules);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement modules:', err);
        this.loading = false;
      }
    });
  }

  setActiveCategory(cat: ModuleCategory): void {
    this.activeCategory = cat;
  }

  onModuleChanged(): void {
    this.loadModules();
  }

  private groupByCategory(modules: SubModule[]): Record<string, SubModule[]> {
    const grouped: Record<string, SubModule[]> = {};
    this.categories.forEach(cat => grouped[cat] = []);

    modules.forEach(mod => {
      if (Array.isArray(mod.cat)) {
        mod.cat.forEach(cat => {
          if (grouped[cat]) {
            grouped[cat].push(mod);
          }
        });
      }
    });
    return grouped;
  }
}
