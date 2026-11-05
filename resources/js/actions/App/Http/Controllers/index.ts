import UserController from './UserController'
import Auth from './Auth'
const Controllers = {
    UserController: Object.assign(UserController, UserController),
Auth: Object.assign(Auth, Auth),
}

export default Controllers