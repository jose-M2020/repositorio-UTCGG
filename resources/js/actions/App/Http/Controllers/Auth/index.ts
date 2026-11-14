import AuthenticatedSessionController from './AuthenticatedSessionController'
import SetPasswordController from './SetPasswordController'
const Auth = {
    AuthenticatedSessionController: Object.assign(AuthenticatedSessionController, AuthenticatedSessionController),
SetPasswordController: Object.assign(SetPasswordController, SetPasswordController),
}

export default Auth