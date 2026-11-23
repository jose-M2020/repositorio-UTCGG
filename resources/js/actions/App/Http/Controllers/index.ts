import HomeController from './HomeController'
import UserController from './UserController'
import RoleController from './RoleController'
import CareerController from './CareerController'
import ProjectTypeController from './ProjectTypeController'
import EducationLevelController from './EducationLevelController'
import ProjectPeriodController from './ProjectPeriodController'
import ProjectPeriodParticipantController from './ProjectPeriodParticipantController'
import AdvisorCapacityController from './AdvisorCapacityController'
import RepositoryAdvisorController from './RepositoryAdvisorController'
import BusinessAdvisorConfirmationController from './BusinessAdvisorConfirmationController'
import BusinessAdvisorController from './BusinessAdvisorController'
import CompanyCatalogController from './CompanyCatalogController'
import BusinessAdvisorAffiliationController from './BusinessAdvisorAffiliationController'
import RepositoryBusinessAdvisorController from './RepositoryBusinessAdvisorController'
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
ProjectPeriodController: Object.assign(ProjectPeriodController, ProjectPeriodController),
ProjectPeriodParticipantController: Object.assign(ProjectPeriodParticipantController, ProjectPeriodParticipantController),
AdvisorCapacityController: Object.assign(AdvisorCapacityController, AdvisorCapacityController),
RepositoryAdvisorController: Object.assign(RepositoryAdvisorController, RepositoryAdvisorController),
BusinessAdvisorConfirmationController: Object.assign(BusinessAdvisorConfirmationController, BusinessAdvisorConfirmationController),
BusinessAdvisorController: Object.assign(BusinessAdvisorController, BusinessAdvisorController),
CompanyCatalogController: Object.assign(CompanyCatalogController, CompanyCatalogController),
BusinessAdvisorAffiliationController: Object.assign(BusinessAdvisorAffiliationController, BusinessAdvisorAffiliationController),
RepositoryBusinessAdvisorController: Object.assign(RepositoryBusinessAdvisorController, RepositoryBusinessAdvisorController),
RepositoryController: Object.assign(RepositoryController, RepositoryController),
FileController: Object.assign(FileController, FileController),
AccountSettingsController: Object.assign(AccountSettingsController, AccountSettingsController),
RepositoryMemberController: Object.assign(RepositoryMemberController, RepositoryMemberController),
Auth: Object.assign(Auth, Auth),
}

export default Controllers