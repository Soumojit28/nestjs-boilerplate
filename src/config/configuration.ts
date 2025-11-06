import * as Joi from 'joi';

export interface DatabaseConfig {
  uri: string;
}


export interface AppConfig {
  port: number;
  nodeEnv: string;
  database: DatabaseConfig;
}

export default (): AppConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    uri: process.env.MONGO_URI,
  }
});

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().required(),
});
