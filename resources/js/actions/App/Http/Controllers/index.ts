import UserController from './UserController'
import RoleController from './RoleController'
import RepositorioController from './RepositorioController'
import RepositorioUsuarioController from './RepositorioUsuarioController'
import Auth from './Auth'
const Controllers = {
    UserController: Object.assign(UserController, UserController),
RoleController: Object.assign(RoleController, RoleController),
RepositorioController: Object.assign(RepositorioController, RepositorioController),
RepositorioUsuarioController: Object.assign(RepositorioUsuarioController, RepositorioUsuarioController),
Auth: Object.assign(Auth, Auth),
}

export default Controllers