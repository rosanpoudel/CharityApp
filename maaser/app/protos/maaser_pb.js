// source: maaser.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.brilltech.maaser.entities.AccountStatus', null, global);
goog.exportSymbol('proto.brilltech.maaser.entities.AccountType', null, global);
goog.exportSymbol('proto.brilltech.maaser.entities.AddressType', null, global);
goog.exportSymbol('proto.brilltech.maaser.entities.CompanyType', null, global);
goog.exportSymbol('proto.brilltech.maaser.entities.ContactType', null, global);
goog.exportSymbol('proto.brilltech.maaser.entities.Gender', null, global);
goog.exportSymbol('proto.brilltech.maaser.entities.MaritalStatus', null, global);
goog.exportSymbol('proto.brilltech.maaser.entities.ProgressStatus', null, global);
goog.exportSymbol('proto.brilltech.maaser.entities.RequestMethod', null, global);
goog.exportSymbol('proto.brilltech.maaser.entities.UserRole', null, global);
/**
 * @enum {number}
 */
proto.brilltech.maaser.entities.AccountStatus = {
  UNKNOWN_ACCOUNT_STATUS: 0,
  ACCOUNT_PENDING: 1,
  ACCOUNT_VERIFIED: 2,
  ACCOUNT_SUSPENDED: 3,
  ACCOUNT_DISABLED: 4,
  ACCOUNT_DELETED: 5
};

/**
 * @enum {number}
 */
proto.brilltech.maaser.entities.AccountType = {
  UNKNOWN_ACCOUNT_TYPE: 0,
  MAASER_USER: 1,
  DONOR_ACCOUNT: 2,
  RECEIVER_ACCOUNT: 3,
  EMPLOYEE_ACCOUNT: 4
};

/**
 * @enum {number}
 */
proto.brilltech.maaser.entities.CompanyType = {
  UNKNOWN_COMPANY_TYPE: 0,
  WHOLESALE_COMPANY: 1,
  RETAIL_COMPANY: 2,
  INSTALLATION_COMPANY: 3
};

/**
 * @enum {number}
 */
proto.brilltech.maaser.entities.UserRole = {
  UNKNOWN_USER_ROLE: 0,
  SUPER_ADMIN: 1,
  ADMIN: 2
};

/**
 * @enum {number}
 */
proto.brilltech.maaser.entities.AddressType = {
  UNKNOWN_ADDRESS_TYPE: 0,
  BILLING_ADDRESS: 1,
  SHIPPING_ADDRESS: 2,
  HOME_ADDRESS: 3,
  MERCHANT_ADDRESS: 4,
  STOCK_ADDRESS: 5,
  OPERATING_ADDRESS: 6,
  COMPANY_ADDRESS: 7
};

/**
 * @enum {number}
 */
proto.brilltech.maaser.entities.ContactType = {
  UNKNOWN_CONTACT_TYPE: 0,
  RELATIVE: 1
};

/**
 * @enum {number}
 */
proto.brilltech.maaser.entities.MaritalStatus = {
  UNKNOWN_MARITAL_STATUS: 0,
  SINGLE: 1,
  MARRIED: 2,
  DIVORCED: 3
};

/**
 * @enum {number}
 */
proto.brilltech.maaser.entities.ProgressStatus = {
  UNKNOWN_STATUS: 0,
  PENDING: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  BLOCKED: 4
};

/**
 * @enum {number}
 */
proto.brilltech.maaser.entities.Gender = {
  UNKNOWN_GENDER: 0,
  MALE: 1,
  FEMALE: 2,
  OTHER: 3
};

/**
 * @enum {number}
 */
proto.brilltech.maaser.entities.RequestMethod = {
  UNKNOWN_METHOD: 0,
  GET: 1,
  POST: 2,
  PUT: 3,
  PATCH: 4,
  DELETE: 5
};

goog.object.extend(exports, proto.brilltech.maaser.entities);
