import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static forRoot(routes: Routes): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
