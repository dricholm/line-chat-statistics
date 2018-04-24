import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@app/core/components/home/home.component';
import { NotFoundComponent } from '@app/core/components/not-found/not-found.component';
import { StatsComponent } from '@app/core/components/stats/stats.component';
import { StatGuard } from '@app/core/guards/stat.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stats', component: StatsComponent, canActivate: [StatGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [StatGuard],
})
export class AppRoutingModule {}
