import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const enviroments = {
  dev: '.env',
  test: '.test.env',
  prod: '.prod.env',
};

export const config = registerAs('config', () => {
  return {
    pg: {
      name: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      pass: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
      host: process.env.POSTGRES_HOST,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expireIn: process.env.JWT_EXPIRE_IN,
    },
    apiKey: process.env.API_KEY,
    superadminRole: process.env.SUPERADMIN_ROLE,
    superadminEmail: process.env.SUPERADMIN_EMAIL,
    rbacInsert: process.env.RBAC_INSERT,
  };
});

export const configSchema = Joi.object({
  API_KEY: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE_IN: Joi.string().required(),
  SUPERADMIN_ROLE: Joi.string().required(),
  SUPERADMIN_EMAIL: Joi.string().required().email(),
  RBAC_INSERT: Joi.boolean(),
});
