import AuthenticatedSessionController from './AuthenticatedSessionController'
import PasswordResetLinkController from './PasswordResetLinkController'
import SetPasswordController from './SetPasswordController'
import PasswordController from './PasswordController'
const Auth = {
    AuthenticatedSessionController: Object.assign(AuthenticatedSessionController, AuthenticatedSessionController),
PasswordResetLinkController: Object.assign(PasswordResetLinkController, PasswordResetLinkController),
SetPasswordController: Object.assign(SetPasswordController, SetPasswordController),
PasswordController: Object.assign(PasswordController, PasswordController),
}

export default Auth