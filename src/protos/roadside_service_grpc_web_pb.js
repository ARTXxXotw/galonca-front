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


var src_protos_cargo_pb = require('../../src/protos/cargo_pb.js')
const proto = {};
proto.api = require('./roadside_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.RoadsideServiceServiceClient =
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
proto.api.RoadsideServiceServicePromiseClient =
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
 *   !proto.api.RoadsideServiceRequest,
 *   !proto.api.FindRoadsideServiceResult>}
 */
const methodDescriptor_RoadsideServiceService_Get = new grpc.web.MethodDescriptor(
  '/api.RoadsideServiceService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.RoadsideServiceRequest,
  proto.api.FindRoadsideServiceResult,
  /**
   * @param {!proto.api.RoadsideServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindRoadsideServiceResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.RoadsideServiceRequest,
 *   !proto.api.FindRoadsideServiceResult>}
 */
const methodInfo_RoadsideServiceService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindRoadsideServiceResult,
  /**
   * @param {!proto.api.RoadsideServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindRoadsideServiceResult.deserializeBinary
);


/**
 * @param {!proto.api.RoadsideServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindRoadsideServiceResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindRoadsideServiceResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.RoadsideServiceServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.RoadsideServiceService/Get',
      request,
      metadata || {},
      methodDescriptor_RoadsideServiceService_Get,
      callback);
};


/**
 * @param {!proto.api.RoadsideServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindRoadsideServiceResult>}
 *     Promise that resolves to the response
 */
proto.api.RoadsideServiceServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.RoadsideServiceService/Get',
      request,
      metadata || {},
      methodDescriptor_RoadsideServiceService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.FindRoadsideServiceRequest,
 *   !proto.api.FindRoadsideServiceResponse>}
 */
const methodDescriptor_RoadsideServiceService_Find = new grpc.web.MethodDescriptor(
  '/api.RoadsideServiceService/Find',
  grpc.web.MethodType.UNARY,
  proto.api.FindRoadsideServiceRequest,
  proto.api.FindRoadsideServiceResponse,
  /**
   * @param {!proto.api.FindRoadsideServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindRoadsideServiceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.FindRoadsideServiceRequest,
 *   !proto.api.FindRoadsideServiceResponse>}
 */
const methodInfo_RoadsideServiceService_Find = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindRoadsideServiceResponse,
  /**
   * @param {!proto.api.FindRoadsideServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindRoadsideServiceResponse.deserializeBinary
);


/**
 * @param {!proto.api.FindRoadsideServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindRoadsideServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindRoadsideServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.RoadsideServiceServiceClient.prototype.find =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.RoadsideServiceService/Find',
      request,
      metadata || {},
      methodDescriptor_RoadsideServiceService_Find,
      callback);
};


/**
 * @param {!proto.api.FindRoadsideServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindRoadsideServiceResponse>}
 *     Promise that resolves to the response
 */
proto.api.RoadsideServiceServicePromiseClient.prototype.find =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.RoadsideServiceService/Find',
      request,
      metadata || {},
      methodDescriptor_RoadsideServiceService_Find);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.RoadsideService,
 *   !proto.api.RoadsideServiceResponse>}
 */
const methodDescriptor_RoadsideServiceService_Create = new grpc.web.MethodDescriptor(
  '/api.RoadsideServiceService/Create',
  grpc.web.MethodType.UNARY,
  proto.api.RoadsideService,
  proto.api.RoadsideServiceResponse,
  /**
   * @param {!proto.api.RoadsideService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.RoadsideServiceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.RoadsideService,
 *   !proto.api.RoadsideServiceResponse>}
 */
const methodInfo_RoadsideServiceService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.RoadsideServiceResponse,
  /**
   * @param {!proto.api.RoadsideService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.RoadsideServiceResponse.deserializeBinary
);


/**
 * @param {!proto.api.RoadsideService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.RoadsideServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.RoadsideServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.RoadsideServiceServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.RoadsideServiceService/Create',
      request,
      metadata || {},
      methodDescriptor_RoadsideServiceService_Create,
      callback);
};


/**
 * @param {!proto.api.RoadsideService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.RoadsideServiceResponse>}
 *     Promise that resolves to the response
 */
proto.api.RoadsideServiceServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.RoadsideServiceService/Create',
      request,
      metadata || {},
      methodDescriptor_RoadsideServiceService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.RoadsideService,
 *   !proto.api.RoadsideServiceResponse>}
 */
const methodDescriptor_RoadsideServiceService_Update = new grpc.web.MethodDescriptor(
  '/api.RoadsideServiceService/Update',
  grpc.web.MethodType.UNARY,
  proto.api.RoadsideService,
  proto.api.RoadsideServiceResponse,
  /**
   * @param {!proto.api.RoadsideService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.RoadsideServiceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.RoadsideService,
 *   !proto.api.RoadsideServiceResponse>}
 */
const methodInfo_RoadsideServiceService_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.RoadsideServiceResponse,
  /**
   * @param {!proto.api.RoadsideService} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.RoadsideServiceResponse.deserializeBinary
);


/**
 * @param {!proto.api.RoadsideService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.RoadsideServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.RoadsideServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.RoadsideServiceServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.RoadsideServiceService/Update',
      request,
      metadata || {},
      methodDescriptor_RoadsideServiceService_Update,
      callback);
};


/**
 * @param {!proto.api.RoadsideService} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.RoadsideServiceResponse>}
 *     Promise that resolves to the response
 */
proto.api.RoadsideServiceServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.RoadsideServiceService/Update',
      request,
      metadata || {},
      methodDescriptor_RoadsideServiceService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.RoadsideServiceRequest,
 *   !proto.api.RoadsideServiceResponse>}
 */
const methodDescriptor_RoadsideServiceService_Delete = new grpc.web.MethodDescriptor(
  '/api.RoadsideServiceService/Delete',
  grpc.web.MethodType.UNARY,
  proto.api.RoadsideServiceRequest,
  proto.api.RoadsideServiceResponse,
  /**
   * @param {!proto.api.RoadsideServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.RoadsideServiceResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.RoadsideServiceRequest,
 *   !proto.api.RoadsideServiceResponse>}
 */
const methodInfo_RoadsideServiceService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.RoadsideServiceResponse,
  /**
   * @param {!proto.api.RoadsideServiceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.RoadsideServiceResponse.deserializeBinary
);


/**
 * @param {!proto.api.RoadsideServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.RoadsideServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.RoadsideServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.RoadsideServiceServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.RoadsideServiceService/Delete',
      request,
      metadata || {},
      methodDescriptor_RoadsideServiceService_Delete,
      callback);
};


/**
 * @param {!proto.api.RoadsideServiceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.RoadsideServiceResponse>}
 *     Promise that resolves to the response
 */
proto.api.RoadsideServiceServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.RoadsideServiceService/Delete',
      request,
      metadata || {},
      methodDescriptor_RoadsideServiceService_Delete);
};


module.exports = proto.api;

