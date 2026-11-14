import HomeController from './HomeController'
import UserController from './UserController'
import RoleController from './RoleController'
import CatalogController from './CatalogController'
import RepositoryController from './RepositoryController'
import FileController from './FileController'
import RepositoryMemberController from './RepositoryMemberController'
import Auth from './Auth'
const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
UserController: Object.assign(UserController, UserController),
RoleController: Object.assign(RoleController, RoleController),
CatalogController: Object.assign(CatalogController, CatalogController),
RepositoryController: Object.assign(RepositoryController, RepositoryController),
FileController: Object.assign(FileController, FileController),
RepositoryMemberController: Object.assign(RepositoryMemberController, RepositoryMemberController),
Auth: Object.assign(Auth, Auth),
}

export default Controllers