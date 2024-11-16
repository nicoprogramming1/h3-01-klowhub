/**
 * An Array ofroutes that are public and should not be protected by authentication
 * @type {string[]}
 */
// export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An Array of routes that are protected by authentication
 * these routes will be redirected to the login page if the user is not authenticated
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for authentication purposes
 * @type {string[]}
 */
// export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after successful login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
