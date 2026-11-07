import HomeController from './HomeController'
import UserController from './UserController'
import RoleController from './RoleController'
import CatalogController from './CatalogController'
import RepositorioController from './RepositorioController'
import FileController from './FileController'
import RepositorioUsuarioController from './RepositorioUsuarioController'
import Auth from './Auth'
const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
UserController: Object.assign(UserController, UserController),
RoleController: Object.assign(RoleController, RoleController),
CatalogController: Object.assign(CatalogController, CatalogController),
RepositorioController: Object.assign(RepositorioController, RepositorioController),
FileController: Object.assign(FileController, FileController),
RepositorioUsuarioController: Object.assign(RepositorioUsuarioController, RepositorioUsuarioController),
Auth: Object.assign(Auth, Auth),
}

export default Controllers