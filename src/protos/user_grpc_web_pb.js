/**
 * @fileoverview gRPC-Web generated client stub for api
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.api = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.UserServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.UserServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetUserByEmailRequest,
 *   !proto.api.CommonUserResponse>}
 */
const methodDescriptor_UserService_ResetPasswordEmail = new grpc.web.MethodDescriptor(
  '/api.UserService/ResetPasswordEmail',
  grpc.web.MethodType.UNARY,
  proto.api.GetUserByEmailRequest,
  proto.api.CommonUserResponse,
  /**
   * @param {!proto.api.GetUserByEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetUserByEmailRequest,
 *   !proto.api.CommonUserResponse>}
 */
const methodInfo_UserService_ResetPasswordEmail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CommonUserResponse,
  /**
   * @param {!proto.api.GetUserByEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonUserResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetUserByEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CommonUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CommonUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.UserServiceClient.prototype.resetPasswordEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.UserService/ResetPasswordEmail',
      request,
      metadata || {},
      methodDescriptor_UserService_ResetPasswordEmail,
      callback);
};


/**
 * @param {!proto.api.GetUserByEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CommonUserResponse>}
 *     Promise that resolves to the response
 */
proto.api.UserServicePromiseClient.prototype.resetPasswordEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.UserService/ResetPasswordEmail',
      request,
      metadata || {},
      methodDescriptor_UserService_ResetPasswordEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.WhoIsRequest,
 *   !proto.api.CommonUserResponse>}
 */
const methodDescriptor_UserService_CheckResetPasswordToken = new grpc.web.MethodDescriptor(
  '/api.UserService/CheckResetPasswordToken',
  grpc.web.MethodType.UNARY,
  proto.api.WhoIsRequest,
  proto.api.CommonUserResponse,
  /**
   * @param {!proto.api.WhoIsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.WhoIsRequest,
 *   !proto.api.CommonUserResponse>}
 */
const methodInfo_UserService_CheckResetPasswordToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CommonUserResponse,
  /**
   * @param {!proto.api.WhoIsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonUserResponse.deserializeBinary
);


/**
 * @param {!proto.api.WhoIsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CommonUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CommonUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.UserServiceClient.prototype.checkResetPasswordToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.UserService/CheckResetPasswordToken',
      request,
      metadata || {},
      methodDescriptor_UserService_CheckResetPasswordToken,
      callback);
};


/**
 * @param {!proto.api.WhoIsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CommonUserResponse>}
 *     Promise that resolves to the response
 */
proto.api.UserServicePromiseClient.prototype.checkResetPasswordToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.UserService/CheckResetPasswordToken',
      request,
      metadata || {},
      methodDescriptor_UserService_CheckResetPasswordToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.WhoIsRequest,
 *   !proto.api.TslUser>}
 */
const methodDescriptor_UserService_WhoIs = new grpc.web.MethodDescriptor(
  '/api.UserService/WhoIs',
  grpc.web.MethodType.UNARY,
  proto.api.WhoIsRequest,
  proto.api.TslUser,
  /**
   * @param {!proto.api.WhoIsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TslUser.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.WhoIsRequest,
 *   !proto.api.TslUser>}
 */
const methodInfo_UserService_WhoIs = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.TslUser,
  /**
   * @param {!proto.api.WhoIsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TslUser.deserializeBinary
);


/**
 * @param {!proto.api.WhoIsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.TslUser)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.TslUser>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.UserServiceClient.prototype.whoIs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.UserService/WhoIs',
      request,
      metadata || {},
      methodDescriptor_UserService_WhoIs,
      callback);
};


/**
 * @param {!proto.api.WhoIsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.TslUser>}
 *     Promise that resolves to the response
 */
proto.api.UserServicePromiseClient.prototype.whoIs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.UserService/WhoIs',
      request,
      metadata || {},
      methodDescriptor_UserService_WhoIs);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetUserRequest,
 *   !proto.api.TslUser>}
 */
const methodDescriptor_UserService_Get = new grpc.web.MethodDescriptor(
  '/api.UserService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.GetUserRequest,
  proto.api.TslUser,
  /**
   * @param {!proto.api.GetUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TslUser.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetUserRequest,
 *   !proto.api.TslUser>}
 */
const methodInfo_UserService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.TslUser,
  /**
   * @param {!proto.api.GetUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TslUser.deserializeBinary
);


/**
 * @param {!proto.api.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.TslUser)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.TslUser>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.UserServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.UserService/Get',
      request,
      metadata || {},
      methodDescriptor_UserService_Get,
      callback);
};


/**
 * @param {!proto.api.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.TslUser>}
 *     Promise that resolves to the response
 */
proto.api.UserServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.UserService/Get',
      request,
      metadata || {},
      methodDescriptor_UserService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetUserByEmailRequest,
 *   !proto.api.TslUser>}
 */
const methodDescriptor_UserService_GetByEmail = new grpc.web.MethodDescriptor(
  '/api.UserService/GetByEmail',
  grpc.web.MethodType.UNARY,
  proto.api.GetUserByEmailRequest,
  proto.api.TslUser,
  /**
   * @param {!proto.api.GetUserByEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TslUser.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetUserByEmailRequest,
 *   !proto.api.TslUser>}
 */
const methodInfo_UserService_GetByEmail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.TslUser,
  /**
   * @param {!proto.api.GetUserByEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TslUser.deserializeBinary
);


/**
 * @param {!proto.api.GetUserByEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.TslUser)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.TslUser>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.UserServiceClient.prototype.getByEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.UserService/GetByEmail',
      request,
      metadata || {},
      methodDescriptor_UserService_GetByEmail,
      callback);
};


/**
 * @param {!proto.api.GetUserByEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.TslUser>}
 *     Promise that resolves to the response
 */
proto.api.UserServicePromiseClient.prototype.getByEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.UserService/GetByEmail',
      request,
      metadata || {},
      methodDescriptor_UserService_GetByEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.CreateUserRequest,
 *   !proto.api.CreateUserResponse>}
 */
const methodDescriptor_UserService_Create = new grpc.web.MethodDescriptor(
  '/api.UserService/Create',
  grpc.web.MethodType.UNARY,
  proto.api.CreateUserRequest,
  proto.api.CreateUserResponse,
  /**
   * @param {!proto.api.CreateUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CreateUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.CreateUserRequest,
 *   !proto.api.CreateUserResponse>}
 */
const methodInfo_UserService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CreateUserResponse,
  /**
   * @param {!proto.api.CreateUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CreateUserResponse.deserializeBinary
);


/**
 * @param {!proto.api.CreateUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CreateUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CreateUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.UserServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.UserService/Create',
      request,
      metadata || {},
      methodDescriptor_UserService_Create,
      callback);
};


/**
 * @param {!proto.api.CreateUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CreateUserResponse>}
 *     Promise that resolves to the response
 */
proto.api.UserServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.UserService/Create',
      request,
      metadata || {},
      methodDescriptor_UserService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.DeleteUserRequest,
 *   !proto.api.CommonUserResponse>}
 */
const methodDescriptor_UserService_Delete = new grpc.web.MethodDescriptor(
  '/api.UserService/Delete',
  grpc.web.MethodType.UNARY,
  proto.api.DeleteUserRequest,
  proto.api.CommonUserResponse,
  /**
   * @param {!proto.api.DeleteUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.DeleteUserRequest,
 *   !proto.api.CommonUserResponse>}
 */
const methodInfo_UserService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CommonUserResponse,
  /**
   * @param {!proto.api.DeleteUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonUserResponse.deserializeBinary
);


/**
 * @param {!proto.api.DeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CommonUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CommonUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.UserServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.UserService/Delete',
      request,
      metadata || {},
      methodDescriptor_UserService_Delete,
      callback);
};


/**
 * @param {!proto.api.DeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CommonUserResponse>}
 *     Promise that resolves to the response
 */
proto.api.UserServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.UserService/Delete',
      request,
      metadata || {},
      methodDescriptor_UserService_Delete);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ChangePasswordRequest,
 *   !proto.api.CommonUserResponse>}
 */
const methodDescriptor_UserService_ChangePassword = new grpc.web.MethodDescriptor(
  '/api.UserService/ChangePassword',
  grpc.web.MethodType.UNARY,
  proto.api.ChangePasswordRequest,
  proto.api.CommonUserResponse,
  /**
   * @param {!proto.api.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ChangePasswordRequest,
 *   !proto.api.CommonUserResponse>}
 */
const methodInfo_UserService_ChangePassword = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CommonUserResponse,
  /**
   * @param {!proto.api.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonUserResponse.deserializeBinary
);


/**
 * @param {!proto.api.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CommonUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CommonUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.UserServiceClient.prototype.changePassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.UserService/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_UserService_ChangePassword,
      callback);
};


/**
 * @param {!proto.api.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CommonUserResponse>}
 *     Promise that resolves to the response
 */
proto.api.UserServicePromiseClient.prototype.changePassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.UserService/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_UserService_ChangePassword);
};


module.exports = proto.api;

