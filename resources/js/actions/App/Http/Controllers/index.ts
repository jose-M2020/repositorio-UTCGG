import HomeController from './HomeController'
import UserController from './UserController'
import RoleController from './RoleController'
import CareerController from './CareerController'
import ProjectTypeController from './ProjectTypeController'
import EducationLevelController from './EducationLevelController'
import RepositoryController from './RepositoryController'
import FileController from './FileController'
import AccountSettingsController from './AccountSettingsController'
import RepositoryMemberController from './RepositoryMemberController'
import Auth from './Auth'
const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
UserController: Object.assign(UserController, UserController),
RoleController: Object.assign(RoleController, RoleController),
CareerController: Object.assign(CareerController, CareerController),
ProjectTypeController: Object.assign(ProjectTypeController, ProjectTypeController),
EducationLevelController: Object.assign(EducationLevelController, EducationLevelController),
RepositoryController: Object.assign(RepositoryController, RepositoryController),
FileController: Object.assign(FileController, FileController),
AccountSettingsController: Object.assign(AccountSettingsController, AccountSettingsController),
RepositoryMemberController: Object.assign(RepositoryMemberController, RepositoryMemberController),
Auth: Object.assign(Auth, Auth),
}

export default Controllers