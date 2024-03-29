// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

declare let $ENV: any;

export const environment = {
  production: false,
  accessKeyId: $ENV.accessKeyId,
  secretAccessKey: $ENV.secretAccessKey,
  region: $ENV.region,
  listStoredFilesUrl: 'https://4e5ac39d-5b51-46c9-8b07-6ccc67fdbc7c.mock.pstmn.io/test'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
