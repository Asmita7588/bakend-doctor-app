import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Doctor App API',
    description: 'Hospital Management System'
  },
  host: 'localhost:3000',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your bearer token in the format: Bearer <token>'
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const outputFile = './swagger.json';
const routes = ['./index.js'];


swaggerAutogen()(outputFile, routes, doc)