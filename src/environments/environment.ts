// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  BASE_URL_AUTH: 'http://42.96.44.215:10204/cmv-cs-api-auth-composite',
  BASE_URL_NOTARIZE:
    'http://42.96.44.215:10204/cmv-cs-api-notarization-composite',
  BASE_URL_SECURE:
    'http://42.96.44.215:10204/cmv-cs-api-secure-transaction-composite',
  BASE_URL_FILE: 'http://42.96.44.215:10204/cmv-cs-api-file',
  BASE_URL_USER: 'http://42.96.44.215:10204/cmv-cs-api-user-composite',
  BASE_URL_VEHICLE:
    'http://42.96.44.215:10204/cmv-cs-api-vehicle-registration-composite',
  BASE_URL_ASSET_LENDING: 'http://42.96.44.215:10204',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
