import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/ban-types
export function setupOpenAPI(app: INestApplication): Object {
  const configBuilder = new DocumentBuilder()
    .setTitle('MT-Encryption')
    .setDescription('API for the MT-Encryption System')
    .setVersion('0.1');

  if (process.env.AUTH_OPEN_ID_CONFIG) {
    configBuilder.addOAuth2({
      openIdConnectUrl: process.env.AUTH_OPEN_ID_CONFIG,
      type: 'openIdConnect',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    });
  }

  if (process.env.AUTH_TOKEN_URL) {
    configBuilder.addOAuth2({
      type: 'oauth2',
      description: 'My oauth flow',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      flows: {
        password: {
          scopes: {
            openid: 'openid',
            profile: 'profile',
            email: 'email',
          },
          tokenUrl: process.env.AUTH_TOKEN_URL,
          refreshUrl: process.env.AUTH_TOKEN_URL,
        },
      },
    });
  }

  const config = configBuilder.build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Mt-Encryption API Dokumentation',
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  return document;
}
