import AuthenticatedSessionController from './AuthenticatedSessionController'
import RegisteredUserController from './RegisteredUserController'
const Auth = {
    AuthenticatedSessionController: Object.assign(AuthenticatedSessionController, AuthenticatedSessionController),
RegisteredUserController: Object.assign(RegisteredUserController, RegisteredUserController),
}

export default Auth