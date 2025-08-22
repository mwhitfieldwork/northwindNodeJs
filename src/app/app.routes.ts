import { Routes } from '@angular/router';
import {ProductTableComponent} from "./northwind-ui/products/product-table/product-table.component";
import { StockInventoryComponent } from './northwind-ui/products/stock-inventory/stock-inventory.component';
import { DashComponent } from './northwind-ui/dash/dash.component';
import { ProductTableDetailComponent } from './northwind-ui/products/product-table/product-table-detail/product-table-detail.component';
import { LoginComponent } from './northwind-ui/login/login.component';
import { DashboardResolver } from './utilities/resolvers/dashboard-resolver.resolver';
import { CalculateGuard } from './utilities/guards/calculate.guard';
import { CalculatorComponent } from './northwind-ui/calculator/calculator.component';
import { EmployeesComponent } from './northwind-ui/employees/employees.component';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'dashboard',
    component:DashComponent, 
    resolve: { data: DashboardResolver }
    },
    {path:'calc', component:CalculatorComponent, 
        canActivate: [CalculateGuard],
    },
    {path:'work', component:EmployeesComponent},
    {path: 'stock', component: StockInventoryComponent},
    {path: 'products', component: ProductTableComponent,
        children: [
            {path: 'details/new', component: ProductTableDetailComponent},
            {path: 'details/:id', component: ProductTableDetailComponent},
        ]
    },
]
