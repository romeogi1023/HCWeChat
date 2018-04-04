import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { TenantComponent } from './tenant/tenant.component';
import { AuthSettingComponent } from './weichat-setting/auth-setting/auth-setting.component';
import { MessagesComponent } from './weichat-setting/messages/messages.component';
import { ActivityFormComponent } from './marketing/activity-form/activity-form.component';
import { EmployeesComponent } from './markeeting-serve/employees/employees.component';
import { ActivityComponent } from './markeeting-serve/activity/activity.component';
import { ActivityFormDetailComponent } from './marketing/activity-form-detail/activity-form-detail.component';
import { ActivityListComponent } from './markeeting-serve/activity/activity-list.component';
import { RetailCustomerComponent } from './customer-service/retail-customer/retail-customer.component';
import { WechatUserComponent } from './wechat-manager/wechat-user/wechat-user.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent, data: { translate: 'users', permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
      { path: 'roles', component: RolesComponent, data: { translate: 'roles', permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
      { path: 'tenant', component: TenantComponent, data: { translate: 'tenant', permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
      { path: 'authsetting', component: AuthSettingComponent, data: { translate: 'authsetting', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'message', component: MessagesComponent, data: { translate: 'message', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'employee', component: EmployeesComponent, data: { translate: 'employee', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'activity', component: ActivityComponent, data: { translate: 'activity', permission: 'Pages' ,title:'新增活动'}, canActivate: [AppRouteGuard] },
      { path: 'activity-form', component: ActivityFormComponent, data: { translate: 'activity-form', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'activity-form-detail/:id', component: ActivityFormDetailComponent, data: { translate: 'activity-form-detail', permission: 'Pages', title: '申请单明细' }, canActivate: [AppRouteGuard] },
      { path: 'activity-list', component: ActivityListComponent, data: { translate: 'activity-list', permission: 'Pages' }, canActivate: [AppRouteGuard] },
      { path: 'activity/:id', component: ActivityComponent, data: { translate: 'activity', permission: 'Pages' ,title:'活动详情'}, canActivate: [AppRouteGuard] },
      { path: 'retail-customer', component: RetailCustomerComponent, data: { translate: 'retail-customer', permission: 'Pages'}, canActivate: [AppRouteGuard] },
      { path: 'wechat-user', component: WechatUserComponent, data: { translate: 'wechat-user', permission: 'Pages'}, canActivate: [AppRouteGuard] },
      { path: 'retail-detail', component: WechatUserComponent, data: { translate: 'retail-detail', permission: 'Pages'}, canActivate: [AppRouteGuard] },
      { path: 'retail-detail/:id', component: WechatUserComponent, data: { translate: 'retail-detail', permission: 'Pages'}, canActivate: [AppRouteGuard] },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
