// swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CPF Challenge',
      version: '1.0.0',
      description: 'CPF Challenge API'
    }
  },
  apis: ['./src/application/controllers/**/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
