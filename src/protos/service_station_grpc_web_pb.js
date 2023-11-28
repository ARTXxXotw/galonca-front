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
proto.api = require('./service_station_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.ServiceStationServiceClient =
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
proto.api.ServiceStationServicePromiseClient =
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
 *   !proto.api.ServiceStationRequest,
 *   !proto.api.FindServiceStationResult>}
 */
const methodDescriptor_ServiceStationService_Get = new grpc.web.MethodDescriptor(
  '/api.ServiceStationService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.ServiceStationRequest,
  proto.api.FindServiceStationResult,
  /**
   * @param {!proto.api.ServiceStationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindServiceStationResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ServiceStationRequest,
 *   !proto.api.FindServiceStationResult>}
 */
const methodInfo_ServiceStationService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindServiceStationResult,
  /**
   * @param {!proto.api.ServiceStationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindServiceStationResult.deserializeBinary
);


/**
 * @param {!proto.api.ServiceStationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindServiceStationResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindServiceStationResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ServiceStationServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.ServiceStationService/Get',
      request,
      metadata || {},
      methodDescriptor_ServiceStationService_Get,
      callback);
};


/**
 * @param {!proto.api.ServiceStationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindServiceStationResult>}
 *     Promise that resolves to the response
 */
proto.api.ServiceStationServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.ServiceStationService/Get',
      request,
      metadata || {},
      methodDescriptor_ServiceStationService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.FindServiceStationRequest,
 *   !proto.api.FindServiceStationResponse>}
 */
const methodDescriptor_ServiceStationService_Find = new grpc.web.MethodDescriptor(
  '/api.ServiceStationService/Find',
  grpc.web.MethodType.UNARY,
  proto.api.FindServiceStationRequest,
  proto.api.FindServiceStationResponse,
  /**
   * @param {!proto.api.FindServiceStationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindServiceStationResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.FindServiceStationRequest,
 *   !proto.api.FindServiceStationResponse>}
 */
const methodInfo_ServiceStationService_Find = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindServiceStationResponse,
  /**
   * @param {!proto.api.FindServiceStationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindServiceStationResponse.deserializeBinary
);


/**
 * @param {!proto.api.FindServiceStationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindServiceStationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindServiceStationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ServiceStationServiceClient.prototype.find =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.ServiceStationService/Find',
      request,
      metadata || {},
      methodDescriptor_ServiceStationService_Find,
      callback);
};


/**
 * @param {!proto.api.FindServiceStationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindServiceStationResponse>}
 *     Promise that resolves to the response
 */
proto.api.ServiceStationServicePromiseClient.prototype.find =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.ServiceStationService/Find',
      request,
      metadata || {},
      methodDescriptor_ServiceStationService_Find);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ServiceStation,
 *   !proto.api.ServiceStationResponse>}
 */
const methodDescriptor_ServiceStationService_Create = new grpc.web.MethodDescriptor(
  '/api.ServiceStationService/Create',
  grpc.web.MethodType.UNARY,
  proto.api.ServiceStation,
  proto.api.ServiceStationResponse,
  /**
   * @param {!proto.api.ServiceStation} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ServiceStationResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ServiceStation,
 *   !proto.api.ServiceStationResponse>}
 */
const methodInfo_ServiceStationService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.ServiceStationResponse,
  /**
   * @param {!proto.api.ServiceStation} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ServiceStationResponse.deserializeBinary
);


/**
 * @param {!proto.api.ServiceStation} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.ServiceStationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ServiceStationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ServiceStationServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.ServiceStationService/Create',
      request,
      metadata || {},
      methodDescriptor_ServiceStationService_Create,
      callback);
};


/**
 * @param {!proto.api.ServiceStation} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ServiceStationResponse>}
 *     Promise that resolves to the response
 */
proto.api.ServiceStationServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.ServiceStationService/Create',
      request,
      metadata || {},
      methodDescriptor_ServiceStationService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ServiceStation,
 *   !proto.api.ServiceStationResponse>}
 */
const methodDescriptor_ServiceStationService_Update = new grpc.web.MethodDescriptor(
  '/api.ServiceStationService/Update',
  grpc.web.MethodType.UNARY,
  proto.api.ServiceStation,
  proto.api.ServiceStationResponse,
  /**
   * @param {!proto.api.ServiceStation} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ServiceStationResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ServiceStation,
 *   !proto.api.ServiceStationResponse>}
 */
const methodInfo_ServiceStationService_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.ServiceStationResponse,
  /**
   * @param {!proto.api.ServiceStation} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ServiceStationResponse.deserializeBinary
);


/**
 * @param {!proto.api.ServiceStation} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.ServiceStationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ServiceStationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ServiceStationServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.ServiceStationService/Update',
      request,
      metadata || {},
      methodDescriptor_ServiceStationService_Update,
      callback);
};


/**
 * @param {!proto.api.ServiceStation} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ServiceStationResponse>}
 *     Promise that resolves to the response
 */
proto.api.ServiceStationServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.ServiceStationService/Update',
      request,
      metadata || {},
      methodDescriptor_ServiceStationService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ServiceStationRequest,
 *   !proto.api.ServiceStationResponse>}
 */
const methodDescriptor_ServiceStationService_Delete = new grpc.web.MethodDescriptor(
  '/api.ServiceStationService/Delete',
  grpc.web.MethodType.UNARY,
  proto.api.ServiceStationRequest,
  proto.api.ServiceStationResponse,
  /**
   * @param {!proto.api.ServiceStationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ServiceStationResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ServiceStationRequest,
 *   !proto.api.ServiceStationResponse>}
 */
const methodInfo_ServiceStationService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.ServiceStationResponse,
  /**
   * @param {!proto.api.ServiceStationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ServiceStationResponse.deserializeBinary
);


/**
 * @param {!proto.api.ServiceStationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.ServiceStationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ServiceStationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ServiceStationServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.ServiceStationService/Delete',
      request,
      metadata || {},
      methodDescriptor_ServiceStationService_Delete,
      callback);
};


/**
 * @param {!proto.api.ServiceStationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ServiceStationResponse>}
 *     Promise that resolves to the response
 */
proto.api.ServiceStationServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.ServiceStationService/Delete',
      request,
      metadata || {},
      methodDescriptor_ServiceStationService_Delete);
};


module.exports = proto.api;

