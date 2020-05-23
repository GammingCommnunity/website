import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "registor",
		component: RegisterComponent,
	},
	{
		path: "test",
		component: TestComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ComponentRoutingModule { }
