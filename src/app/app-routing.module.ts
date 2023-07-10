import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: '',
    loadChildren: () =>  import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'quick-start',
    loadChildren: () =>  import('./quickstart/quickstart.module').then(m => m.QuickstartModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
  
}
