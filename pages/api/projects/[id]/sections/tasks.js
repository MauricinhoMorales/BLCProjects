import boom from 'boom';
import authenticated from '../../../../../utils/auth/authenticatedWrapper';
import { errorHandler } from '../../../../../utils/middlewares/errorHandlers';
import scopeValidationHandler from '../../../../../utils/middlewares/scopesValidationHandler';
import ProjectService from '../../../../../services/project';
import {
  sectionSchema,
  projectIdSchema,
} from '../../../../../utils/models/project';
import { validationHandler } from '../../../../../utils/middlewares/validationHandlers';
