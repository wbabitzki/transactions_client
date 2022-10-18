declare let $ENV: any;

export const environment = {
  production: true,
  accessKeyId: $ENV.accessKeyId,
  secretAccessKey: $ENV.secretAccessKey,
  region: $ENV.region
};
