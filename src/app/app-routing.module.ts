import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthenticationComponent} from './authentication/authentication.component';
import {LoginComponent} from './authentication/login/login.component';
import {SignupComponent} from './authentication/signup/signup.component';
import {AuthenticationGuard} from './authentication/authentication.guard';


import {HomeComponent} from './home/home.component';

import {CustomerComponent} from './home/customer/customer.component';
import {CeoComponent} from './home/ceo/ceo.component';
import {DeveloperComponent} from './home/developer/developer.component';
import {ProjectManagerComponent} from './home/projectManager/project-manager.component';

import {AdminComponent} from './home/admin/admin.component';
import {DashboardComponent} from './home/admin/dashboard/dashboard.component';
import {ComplaintsComponent} from './home/admin/complaints/complaints.component';
import {UsersComponent} from './home/admin/users/users.component';
import {FeedbacksComponent} from './home/admin/feedbacks/feedbacks.component';
import {ProductsComponent} from './home/admin/products/products.component';
import {RegisterProductComponent} from './home/admin/products/register-product/register-product.component';


import {AccountCoordinatorComponent} from './home/accountCoordinator/account-coordinator.component';
import {AccoorcomplaintsComponent} from './home/accountCoordinator/accoorcomplaints/accoorcomplaints.component';
import {TasksComponent} from './home/accountCoordinator/tasks/tasks.component';
import {AddComplaintComponent} from './home/accountCoordinator/accoorcomplaints/add-complaint/add-complaint.component';
import {CreateTaskComponent} from './home/accountCoordinator/tasks/create-task/create-task.component';
import {AllocationComponent} from './home/accountCoordinator/allocation/allocation.component';
import {MailComponent} from './home/accountCoordinator/mail/mail.component';
import {AccoortestComponent} from './home/accountCoordinator/accoortest/accoortest.component';
import {DevtasksComponent} from './home/developer/devtasks/devtasks.component';


import {LateComplaintInformationComponent} from './home/projectManager/late-complaint-information/late-complaint-information.component';
import {ViewReportsComponent} from './home/projectManager/view-reports/view-reports.component';
import {ProfileComponent} from './home/projectManager/profile/profile.component';
import {ActionComponent} from './home/projectManager/late-complaint-information/action/action.component';

import {TestComponent} from './home/admin/test/test.component';
import {TestSortingComponent} from './home/admin/test-sorting/test-sorting.component';
import {UserProfileComponent} from './home/shared/user-profile/user-profile.component';
import {DevcomplaintsComponent} from './home/developer/devcomplaints/devcomplaints.component';
import {DevproductsComponent} from './home/developer/devproducts/devproducts.component';
import {TaskProfileComponent} from './home/accountCoordinator/tasks/task-profile/task-profile.component';

const routes: Routes = [
    {
      path: '',
      component: AuthenticationComponent,
      children: [
        {
          path: '',
          component: LoginComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'signup',
          component: SignupComponent
        },
      ]
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthenticationGuard],
      children: [
        {
          path: 'customer',
          component: CustomerComponent,
          canActivate: [AuthenticationGuard]
        },
        {
          path: 'account-coordinator',
          component: AccountCoordinatorComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: '',
              component: AccoorcomplaintsComponent,
              children: [
                {
                  path: 'add-complaint',
                  component: AddComplaintComponent
                }
              ]
            },
            {
              path: 'accoorcomplaints',
              component: AccoorcomplaintsComponent
            },
            {
              path: 'tasks',
              component: TasksComponent,
              children: [
                {
                  path: 'create-task',
                  component: CreateTaskComponent
                },
                {
                  path: 'task-profile',
                  component: TaskProfileComponent
                }
              ]
            },
            {
              path: 'allocation',
              component: AllocationComponent
            },
            {
              path: 'mail',
              component: MailComponent
            },
            {
              path: 'accoortest',
              component: AccoortestComponent
            }
            ]
        },
        {
          path: 'admin',
          component: AdminComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: '',
              component: DashboardComponent
            },
            {
              path: 'dashboard',
              component: DashboardComponent
            },
            {
              path: 'complaints',
              component: ComplaintsComponent
            },
            {
              path: 'users',
              component: UsersComponent,
              children: [
                {
                  path: 'user-profile',
                  component: UserProfileComponent
                }
              ]
            },
            {
              path: 'products',
              component: ProductsComponent,
              children: [
                {
                  path: 'register-product',
                  component: RegisterProductComponent
                }
              ]
            },
            {
              path: 'feedbacks',
              component: FeedbacksComponent
            },
            {
              path: 'test',
              component: TestComponent
            },
            {
              path: 'test-sorting',
              component: TestSortingComponent
            }
          ]
        },
        {
          path: 'ceo',
          component: CeoComponent,
          canActivate: [AuthenticationGuard]
        },
        {
          path: 'developer',
          component: DeveloperComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: 'devtasks',
              component: DevtasksComponent,
            },
            {
              path: 'devcomplaints',
              component: DevcomplaintsComponent,
            },
            {
              path: 'devproducts',
              component: DevproductsComponent,
            },
          ]
        },
        {
          path: 'project-manager',
          component: ProjectManagerComponent,
          canActivate: [AuthenticationGuard],
          children: [
            {
              path: 'late-complaint-information',
              component: LateComplaintInformationComponent,
              children: [
                {
                  path: 'action',
                  component: ActionComponent
                },
              ]
            },
            {
              path: 'view-reports',
              component: ViewReportsComponent
            },
            {
              path: 'profile',
              component: ProfileComponent
            },
          ]
        },
      ]
    },
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

