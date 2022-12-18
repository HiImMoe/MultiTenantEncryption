import { BadRequestException, INestApplication, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

const logger = new Logger('Validation');
export function getValidationPipe() {
  return new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true,
    validateCustomDecorators: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      logger.error(validationErrors);
      return new BadRequestException(validationErrors);
    },
  });
}

export function setupValidation(app: INestApplication) {
  app.useGlobalPipes(getValidationPipe());
}

export const ApiValidationErrorResponse = () =>
  ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestException,
  });
