const ENV = process.env.ENV;
const env = {
  production: 'production',
  staging: 'staging',
  dev: 'dev',
  remote: 'remote',
  debug: 'debug',
};

// environment flags
const logErrors = [env.debug, env.dev].includes(ENV);
const logInfo = [env.dev, env.debug].includes(ENV);;
const logRouteChanges = [env.debug].includes(ENV);
const isDev = [env.dev, env.remote].includes(ENV);
const isProduction = [env.production].includes(ENV);
// app name
const title = 'React MobX Nimble';

console.log('App mode: ', ENV);

export const appConstants = Object.freeze({
  logErrors,
  logInfo,
  logRouteChanges,
  isProduction,
  isDev,
  title,
});