import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoindetailComponent } from './components/coindetail/coindetail.component';
import { CoinlistComponent } from './components/coinlist/coinlist.component';
import { LoginComponent } from './components/login/login.component';
import { WalletComponent } from './components/wallet/wallet.component';

const routes: Routes = [
  {path:'', redirectTo :'coin-list', pathMatch:'full'},
  {path:'coin-list', component: CoinlistComponent},
  {path:'coin-detail/:id', component: CoindetailComponent},
  {path:'login', component: LoginComponent},
  {path:'wallet', component: WalletComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
