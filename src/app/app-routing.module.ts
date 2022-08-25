import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FilesViewComponent } from './files-view/files-view.component';
import { TransactionsViewComponent } from './transactions-view/transactions-view.component';
import { DetailsViewComponent } from './details-view/details-view.component';

const routes: Routes = [
  { path: "files", component: FilesViewComponent },
  { path: "transactions", component: TransactionsViewComponent },
  { path: "details", component: DetailsViewComponent },
  { path: "", component: FilesViewComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
