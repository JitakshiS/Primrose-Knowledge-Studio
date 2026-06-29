/*
 * Constants that need to be importable from both Edge (middleware) and Node
 * (server actions / route handlers). Keep this file free of any Node-only
 * imports (firebase-admin, next/headers, etc.).
 */

export const SESSION_COOKIE_NAME = "pks_session";

/** 5 days. Firebase Auth session cookies max out at 14 days; 5 balances
 * freshness with members not getting kicked weekly. */
export const SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 5;
