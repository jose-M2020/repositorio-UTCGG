import UserController from './UserController'
import RoleController from './RoleController'
import Auth from './Auth'
const Controllers = {
    UserController: Object.assign(UserController, UserController),
RoleController: Object.assign(RoleController, RoleController),
Auth: Object.assign(Auth, Auth),
}

export default Controllers