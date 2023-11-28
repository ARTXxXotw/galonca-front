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


var src_protos_user_pb = require('../../src/protos/user_pb.js')

var src_protos_cargo_pb = require('../../src/protos/cargo_pb.js')

var src_protos_transport_pb = require('../../src/protos/transport_pb.js')

var src_protos_truck_pb = require('../../src/protos/truck_pb.js')

var src_protos_roadside_service_pb = require('../../src/protos/roadside_service_pb.js')

var src_protos_service_station_pb = require('../../src/protos/service_station_pb.js')

var src_protos_spare_parts_pb = require('../../src/protos/spare_parts_pb.js')
const proto = {};
proto.api = require('./user_profile_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.CompanyServiceClient =
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
proto.api.CompanyServicePromiseClient =
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
 *   !proto.api.GetCompanyRequest,
 *   !proto.api.FindCompanyResponse>}
 */
const methodDescriptor_CompanyService_Get = new grpc.web.MethodDescriptor(
  '/api.CompanyService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.GetCompanyRequest,
  proto.api.FindCompanyResponse,
  /**
   * @param {!proto.api.GetCompanyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindCompanyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetCompanyRequest,
 *   !proto.api.FindCompanyResponse>}
 */
const methodInfo_CompanyService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindCompanyResponse,
  /**
   * @param {!proto.api.GetCompanyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindCompanyResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetCompanyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindCompanyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindCompanyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CompanyServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CompanyService/Get',
      request,
      metadata || {},
      methodDescriptor_CompanyService_Get,
      callback);
};


/**
 * @param {!proto.api.GetCompanyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindCompanyResponse>}
 *     Promise that resolves to the response
 */
proto.api.CompanyServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CompanyService/Get',
      request,
      metadata || {},
      methodDescriptor_CompanyService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetCompanyByUserRequest,
 *   !proto.api.FindCompanyResponse>}
 */
const methodDescriptor_CompanyService_GetByUser = new grpc.web.MethodDescriptor(
  '/api.CompanyService/GetByUser',
  grpc.web.MethodType.UNARY,
  proto.api.GetCompanyByUserRequest,
  proto.api.FindCompanyResponse,
  /**
   * @param {!proto.api.GetCompanyByUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindCompanyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetCompanyByUserRequest,
 *   !proto.api.FindCompanyResponse>}
 */
const methodInfo_CompanyService_GetByUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindCompanyResponse,
  /**
   * @param {!proto.api.GetCompanyByUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindCompanyResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetCompanyByUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindCompanyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindCompanyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CompanyServiceClient.prototype.getByUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CompanyService/GetByUser',
      request,
      metadata || {},
      methodDescriptor_CompanyService_GetByUser,
      callback);
};


/**
 * @param {!proto.api.GetCompanyByUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindCompanyResponse>}
 *     Promise that resolves to the response
 */
proto.api.CompanyServicePromiseClient.prototype.getByUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CompanyService/GetByUser',
      request,
      metadata || {},
      methodDescriptor_CompanyService_GetByUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Company,
 *   !proto.api.CreateCompanyResponse>}
 */
const methodDescriptor_CompanyService_Create = new grpc.web.MethodDescriptor(
  '/api.CompanyService/Create',
  grpc.web.MethodType.UNARY,
  proto.api.Company,
  proto.api.CreateCompanyResponse,
  /**
   * @param {!proto.api.Company} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CreateCompanyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Company,
 *   !proto.api.CreateCompanyResponse>}
 */
const methodInfo_CompanyService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CreateCompanyResponse,
  /**
   * @param {!proto.api.Company} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CreateCompanyResponse.deserializeBinary
);


/**
 * @param {!proto.api.Company} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CreateCompanyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CreateCompanyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CompanyServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CompanyService/Create',
      request,
      metadata || {},
      methodDescriptor_CompanyService_Create,
      callback);
};


/**
 * @param {!proto.api.Company} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CreateCompanyResponse>}
 *     Promise that resolves to the response
 */
proto.api.CompanyServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CompanyService/Create',
      request,
      metadata || {},
      methodDescriptor_CompanyService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.DeleteCompanyRequest,
 *   !proto.api.CommonCompanyResponse>}
 */
const methodDescriptor_CompanyService_Delete = new grpc.web.MethodDescriptor(
  '/api.CompanyService/Delete',
  grpc.web.MethodType.UNARY,
  proto.api.DeleteCompanyRequest,
  proto.api.CommonCompanyResponse,
  /**
   * @param {!proto.api.DeleteCompanyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonCompanyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.DeleteCompanyRequest,
 *   !proto.api.CommonCompanyResponse>}
 */
const methodInfo_CompanyService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CommonCompanyResponse,
  /**
   * @param {!proto.api.DeleteCompanyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonCompanyResponse.deserializeBinary
);


/**
 * @param {!proto.api.DeleteCompanyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CommonCompanyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CommonCompanyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CompanyServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CompanyService/Delete',
      request,
      metadata || {},
      methodDescriptor_CompanyService_Delete,
      callback);
};


/**
 * @param {!proto.api.DeleteCompanyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CommonCompanyResponse>}
 *     Promise that resolves to the response
 */
proto.api.CompanyServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CompanyService/Delete',
      request,
      metadata || {},
      methodDescriptor_CompanyService_Delete);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Review,
 *   !proto.api.CommonCompanyResponse>}
 */
const methodDescriptor_CompanyService_CreateReview = new grpc.web.MethodDescriptor(
  '/api.CompanyService/CreateReview',
  grpc.web.MethodType.UNARY,
  proto.api.Review,
  proto.api.CommonCompanyResponse,
  /**
   * @param {!proto.api.Review} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonCompanyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Review,
 *   !proto.api.CommonCompanyResponse>}
 */
const methodInfo_CompanyService_CreateReview = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CommonCompanyResponse,
  /**
   * @param {!proto.api.Review} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CommonCompanyResponse.deserializeBinary
);


/**
 * @param {!proto.api.Review} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CommonCompanyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CommonCompanyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CompanyServiceClient.prototype.createReview =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CompanyService/CreateReview',
      request,
      metadata || {},
      methodDescriptor_CompanyService_CreateReview,
      callback);
};


/**
 * @param {!proto.api.Review} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CommonCompanyResponse>}
 *     Promise that resolves to the response
 */
proto.api.CompanyServicePromiseClient.prototype.createReview =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CompanyService/CreateReview',
      request,
      metadata || {},
      methodDescriptor_CompanyService_CreateReview);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ReviewRequest,
 *   !proto.api.ReviewResponse>}
 */
const methodDescriptor_CompanyService_ListReview = new grpc.web.MethodDescriptor(
  '/api.CompanyService/ListReview',
  grpc.web.MethodType.UNARY,
  proto.api.ReviewRequest,
  proto.api.ReviewResponse,
  /**
   * @param {!proto.api.ReviewRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ReviewResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ReviewRequest,
 *   !proto.api.ReviewResponse>}
 */
const methodInfo_CompanyService_ListReview = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.ReviewResponse,
  /**
   * @param {!proto.api.ReviewRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ReviewResponse.deserializeBinary
);


/**
 * @param {!proto.api.ReviewRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.ReviewResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ReviewResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CompanyServiceClient.prototype.listReview =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CompanyService/ListReview',
      request,
      metadata || {},
      methodDescriptor_CompanyService_ListReview,
      callback);
};


/**
 * @param {!proto.api.ReviewRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ReviewResponse>}
 *     Promise that resolves to the response
 */
proto.api.CompanyServicePromiseClient.prototype.listReview =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CompanyService/ListReview',
      request,
      metadata || {},
      methodDescriptor_CompanyService_ListReview);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.CreateUserRequest,
 *   !proto.api.CreateUserResponse>}
 */
const methodDescriptor_CompanyService_AddEmployee = new grpc.web.MethodDescriptor(
  '/api.CompanyService/AddEmployee',
  grpc.web.MethodType.UNARY,
  src_protos_user_pb.CreateUserRequest,
  src_protos_user_pb.CreateUserResponse,
  /**
   * @param {!proto.api.CreateUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  src_protos_user_pb.CreateUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.CreateUserRequest,
 *   !proto.api.CreateUserResponse>}
 */
const methodInfo_CompanyService_AddEmployee = new grpc.web.AbstractClientBase.MethodInfo(
  src_protos_user_pb.CreateUserResponse,
  /**
   * @param {!proto.api.CreateUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  src_protos_user_pb.CreateUserResponse.deserializeBinary
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
proto.api.CompanyServiceClient.prototype.addEmployee =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CompanyService/AddEmployee',
      request,
      metadata || {},
      methodDescriptor_CompanyService_AddEmployee,
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
proto.api.CompanyServicePromiseClient.prototype.addEmployee =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CompanyService/AddEmployee',
      request,
      metadata || {},
      methodDescriptor_CompanyService_AddEmployee);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetCompanyRequest,
 *   !proto.api.EmployeesResponse>}
 */
const methodDescriptor_CompanyService_ListEmployees = new grpc.web.MethodDescriptor(
  '/api.CompanyService/ListEmployees',
  grpc.web.MethodType.UNARY,
  proto.api.GetCompanyRequest,
  proto.api.EmployeesResponse,
  /**
   * @param {!proto.api.GetCompanyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.EmployeesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetCompanyRequest,
 *   !proto.api.EmployeesResponse>}
 */
const methodInfo_CompanyService_ListEmployees = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.EmployeesResponse,
  /**
   * @param {!proto.api.GetCompanyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.EmployeesResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetCompanyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.EmployeesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.EmployeesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CompanyServiceClient.prototype.listEmployees =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CompanyService/ListEmployees',
      request,
      metadata || {},
      methodDescriptor_CompanyService_ListEmployees,
      callback);
};


/**
 * @param {!proto.api.GetCompanyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.EmployeesResponse>}
 *     Promise that resolves to the response
 */
proto.api.CompanyServicePromiseClient.prototype.listEmployees =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CompanyService/ListEmployees',
      request,
      metadata || {},
      methodDescriptor_CompanyService_ListEmployees);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.DeleteUserRequest,
 *   !proto.api.CommonUserResponse>}
 */
const methodDescriptor_CompanyService_RemoveEmployee = new grpc.web.MethodDescriptor(
  '/api.CompanyService/RemoveEmployee',
  grpc.web.MethodType.UNARY,
  src_protos_user_pb.DeleteUserRequest,
  src_protos_user_pb.CommonUserResponse,
  /**
   * @param {!proto.api.DeleteUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  src_protos_user_pb.CommonUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.DeleteUserRequest,
 *   !proto.api.CommonUserResponse>}
 */
const methodInfo_CompanyService_RemoveEmployee = new grpc.web.AbstractClientBase.MethodInfo(
  src_protos_user_pb.CommonUserResponse,
  /**
   * @param {!proto.api.DeleteUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  src_protos_user_pb.CommonUserResponse.deserializeBinary
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
proto.api.CompanyServiceClient.prototype.removeEmployee =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CompanyService/RemoveEmployee',
      request,
      metadata || {},
      methodDescriptor_CompanyService_RemoveEmployee,
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
proto.api.CompanyServicePromiseClient.prototype.removeEmployee =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CompanyService/RemoveEmployee',
      request,
      metadata || {},
      methodDescriptor_CompanyService_RemoveEmployee);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.ProfileClient =
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
proto.api.ProfilePromiseClient =
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
 *   !proto.api.FavoritesRequest,
 *   !proto.api.FavoritesResponse>}
 */
const methodDescriptor_Profile_ListFavorites = new grpc.web.MethodDescriptor(
  '/api.Profile/ListFavorites',
  grpc.web.MethodType.UNARY,
  proto.api.FavoritesRequest,
  proto.api.FavoritesResponse,
  /**
   * @param {!proto.api.FavoritesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FavoritesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.FavoritesRequest,
 *   !proto.api.FavoritesResponse>}
 */
const methodInfo_Profile_ListFavorites = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FavoritesResponse,
  /**
   * @param {!proto.api.FavoritesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FavoritesResponse.deserializeBinary
);


/**
 * @param {!proto.api.FavoritesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FavoritesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FavoritesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ProfileClient.prototype.listFavorites =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Profile/ListFavorites',
      request,
      metadata || {},
      methodDescriptor_Profile_ListFavorites,
      callback);
};


/**
 * @param {!proto.api.FavoritesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FavoritesResponse>}
 *     Promise that resolves to the response
 */
proto.api.ProfilePromiseClient.prototype.listFavorites =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Profile/ListFavorites',
      request,
      metadata || {},
      methodDescriptor_Profile_ListFavorites);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Favorite,
 *   !proto.api.CommonUserResponse>}
 */
const methodDescriptor_Profile_AddFavorite = new grpc.web.MethodDescriptor(
  '/api.Profile/AddFavorite',
  grpc.web.MethodType.UNARY,
  proto.api.Favorite,
  src_protos_user_pb.CommonUserResponse,
  /**
   * @param {!proto.api.Favorite} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  src_protos_user_pb.CommonUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Favorite,
 *   !proto.api.CommonUserResponse>}
 */
const methodInfo_Profile_AddFavorite = new grpc.web.AbstractClientBase.MethodInfo(
  src_protos_user_pb.CommonUserResponse,
  /**
   * @param {!proto.api.Favorite} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  src_protos_user_pb.CommonUserResponse.deserializeBinary
);


/**
 * @param {!proto.api.Favorite} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CommonUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CommonUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ProfileClient.prototype.addFavorite =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Profile/AddFavorite',
      request,
      metadata || {},
      methodDescriptor_Profile_AddFavorite,
      callback);
};


/**
 * @param {!proto.api.Favorite} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CommonUserResponse>}
 *     Promise that resolves to the response
 */
proto.api.ProfilePromiseClient.prototype.addFavorite =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Profile/AddFavorite',
      request,
      metadata || {},
      methodDescriptor_Profile_AddFavorite);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Favorite,
 *   !proto.api.CommonUserResponse>}
 */
const methodDescriptor_Profile_DeleteFavorite = new grpc.web.MethodDescriptor(
  '/api.Profile/DeleteFavorite',
  grpc.web.MethodType.UNARY,
  proto.api.Favorite,
  src_protos_user_pb.CommonUserResponse,
  /**
   * @param {!proto.api.Favorite} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  src_protos_user_pb.CommonUserResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Favorite,
 *   !proto.api.CommonUserResponse>}
 */
const methodInfo_Profile_DeleteFavorite = new grpc.web.AbstractClientBase.MethodInfo(
  src_protos_user_pb.CommonUserResponse,
  /**
   * @param {!proto.api.Favorite} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  src_protos_user_pb.CommonUserResponse.deserializeBinary
);


/**
 * @param {!proto.api.Favorite} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CommonUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CommonUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ProfileClient.prototype.deleteFavorite =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Profile/DeleteFavorite',
      request,
      metadata || {},
      methodDescriptor_Profile_DeleteFavorite,
      callback);
};


/**
 * @param {!proto.api.Favorite} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CommonUserResponse>}
 *     Promise that resolves to the response
 */
proto.api.ProfilePromiseClient.prototype.deleteFavorite =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Profile/DeleteFavorite',
      request,
      metadata || {},
      methodDescriptor_Profile_DeleteFavorite);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodDescriptor_Profile_ListMyCargo = new grpc.web.MethodDescriptor(
  '/api.Profile/ListMyCargo',
  grpc.web.MethodType.UNARY,
  proto.api.MyRequest,
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodInfo_Profile_ListMyCargo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.MyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.MyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ProfileClient.prototype.listMyCargo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Profile/ListMyCargo',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMyCargo,
      callback);
};


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.MyResponse>}
 *     Promise that resolves to the response
 */
proto.api.ProfilePromiseClient.prototype.listMyCargo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Profile/ListMyCargo',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMyCargo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodDescriptor_Profile_ListMyTransport = new grpc.web.MethodDescriptor(
  '/api.Profile/ListMyTransport',
  grpc.web.MethodType.UNARY,
  proto.api.MyRequest,
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodInfo_Profile_ListMyTransport = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.MyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.MyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ProfileClient.prototype.listMyTransport =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Profile/ListMyTransport',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMyTransport,
      callback);
};


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.MyResponse>}
 *     Promise that resolves to the response
 */
proto.api.ProfilePromiseClient.prototype.listMyTransport =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Profile/ListMyTransport',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMyTransport);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodDescriptor_Profile_ListMyRoadsideService = new grpc.web.MethodDescriptor(
  '/api.Profile/ListMyRoadsideService',
  grpc.web.MethodType.UNARY,
  proto.api.MyRequest,
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodInfo_Profile_ListMyRoadsideService = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.MyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.MyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ProfileClient.prototype.listMyRoadsideService =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Profile/ListMyRoadsideService',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMyRoadsideService,
      callback);
};


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.MyResponse>}
 *     Promise that resolves to the response
 */
proto.api.ProfilePromiseClient.prototype.listMyRoadsideService =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Profile/ListMyRoadsideService',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMyRoadsideService);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodDescriptor_Profile_ListMyServiceStation = new grpc.web.MethodDescriptor(
  '/api.Profile/ListMyServiceStation',
  grpc.web.MethodType.UNARY,
  proto.api.MyRequest,
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodInfo_Profile_ListMyServiceStation = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.MyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.MyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ProfileClient.prototype.listMyServiceStation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Profile/ListMyServiceStation',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMyServiceStation,
      callback);
};


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.MyResponse>}
 *     Promise that resolves to the response
 */
proto.api.ProfilePromiseClient.prototype.listMyServiceStation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Profile/ListMyServiceStation',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMyServiceStation);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodDescriptor_Profile_ListMySpareParts = new grpc.web.MethodDescriptor(
  '/api.Profile/ListMySpareParts',
  grpc.web.MethodType.UNARY,
  proto.api.MyRequest,
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodInfo_Profile_ListMySpareParts = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.MyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.MyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ProfileClient.prototype.listMySpareParts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Profile/ListMySpareParts',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMySpareParts,
      callback);
};


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.MyResponse>}
 *     Promise that resolves to the response
 */
proto.api.ProfilePromiseClient.prototype.listMySpareParts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Profile/ListMySpareParts',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMySpareParts);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodDescriptor_Profile_ListMyTruck = new grpc.web.MethodDescriptor(
  '/api.Profile/ListMyTruck',
  grpc.web.MethodType.UNARY,
  proto.api.MyRequest,
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.MyRequest,
 *   !proto.api.MyResponse>}
 */
const methodInfo_Profile_ListMyTruck = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.MyResponse,
  /**
   * @param {!proto.api.MyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.MyResponse.deserializeBinary
);


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.MyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.MyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ProfileClient.prototype.listMyTruck =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Profile/ListMyTruck',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMyTruck,
      callback);
};


/**
 * @param {!proto.api.MyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.MyResponse>}
 *     Promise that resolves to the response
 */
proto.api.ProfilePromiseClient.prototype.listMyTruck =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Profile/ListMyTruck',
      request,
      metadata || {},
      methodDescriptor_Profile_ListMyTruck);
};


module.exports = proto.api;

