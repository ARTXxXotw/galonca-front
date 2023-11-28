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

var src_protos_cargo_pb = require('../../src/protos/cargo_pb.js')
const proto = {};
proto.api = require('./truck_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.TruckServiceClient =
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
proto.api.TruckServicePromiseClient =
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
 *   !proto.api.TruckRequest,
 *   !proto.api.FindTruckResult>}
 */
const methodDescriptor_TruckService_Get = new grpc.web.MethodDescriptor(
  '/api.TruckService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.TruckRequest,
  proto.api.FindTruckResult,
  /**
   * @param {!proto.api.TruckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindTruckResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.TruckRequest,
 *   !proto.api.FindTruckResult>}
 */
const methodInfo_TruckService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindTruckResult,
  /**
   * @param {!proto.api.TruckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindTruckResult.deserializeBinary
);


/**
 * @param {!proto.api.TruckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindTruckResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindTruckResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.TruckServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.TruckService/Get',
      request,
      metadata || {},
      methodDescriptor_TruckService_Get,
      callback);
};


/**
 * @param {!proto.api.TruckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindTruckResult>}
 *     Promise that resolves to the response
 */
proto.api.TruckServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.TruckService/Get',
      request,
      metadata || {},
      methodDescriptor_TruckService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.FindTruckRequest,
 *   !proto.api.FindTruckResponse>}
 */
const methodDescriptor_TruckService_Find = new grpc.web.MethodDescriptor(
  '/api.TruckService/Find',
  grpc.web.MethodType.UNARY,
  proto.api.FindTruckRequest,
  proto.api.FindTruckResponse,
  /**
   * @param {!proto.api.FindTruckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindTruckResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.FindTruckRequest,
 *   !proto.api.FindTruckResponse>}
 */
const methodInfo_TruckService_Find = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindTruckResponse,
  /**
   * @param {!proto.api.FindTruckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindTruckResponse.deserializeBinary
);


/**
 * @param {!proto.api.FindTruckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindTruckResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindTruckResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.TruckServiceClient.prototype.find =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.TruckService/Find',
      request,
      metadata || {},
      methodDescriptor_TruckService_Find,
      callback);
};


/**
 * @param {!proto.api.FindTruckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindTruckResponse>}
 *     Promise that resolves to the response
 */
proto.api.TruckServicePromiseClient.prototype.find =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.TruckService/Find',
      request,
      metadata || {},
      methodDescriptor_TruckService_Find);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Truck,
 *   !proto.api.TruckResponse>}
 */
const methodDescriptor_TruckService_Create = new grpc.web.MethodDescriptor(
  '/api.TruckService/Create',
  grpc.web.MethodType.UNARY,
  proto.api.Truck,
  proto.api.TruckResponse,
  /**
   * @param {!proto.api.Truck} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TruckResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Truck,
 *   !proto.api.TruckResponse>}
 */
const methodInfo_TruckService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.TruckResponse,
  /**
   * @param {!proto.api.Truck} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TruckResponse.deserializeBinary
);


/**
 * @param {!proto.api.Truck} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.TruckResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.TruckResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.TruckServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.TruckService/Create',
      request,
      metadata || {},
      methodDescriptor_TruckService_Create,
      callback);
};


/**
 * @param {!proto.api.Truck} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.TruckResponse>}
 *     Promise that resolves to the response
 */
proto.api.TruckServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.TruckService/Create',
      request,
      metadata || {},
      methodDescriptor_TruckService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Truck,
 *   !proto.api.TruckResponse>}
 */
const methodDescriptor_TruckService_Update = new grpc.web.MethodDescriptor(
  '/api.TruckService/Update',
  grpc.web.MethodType.UNARY,
  proto.api.Truck,
  proto.api.TruckResponse,
  /**
   * @param {!proto.api.Truck} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TruckResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Truck,
 *   !proto.api.TruckResponse>}
 */
const methodInfo_TruckService_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.TruckResponse,
  /**
   * @param {!proto.api.Truck} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TruckResponse.deserializeBinary
);


/**
 * @param {!proto.api.Truck} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.TruckResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.TruckResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.TruckServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.TruckService/Update',
      request,
      metadata || {},
      methodDescriptor_TruckService_Update,
      callback);
};


/**
 * @param {!proto.api.Truck} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.TruckResponse>}
 *     Promise that resolves to the response
 */
proto.api.TruckServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.TruckService/Update',
      request,
      metadata || {},
      methodDescriptor_TruckService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.TruckRequest,
 *   !proto.api.TruckResponse>}
 */
const methodDescriptor_TruckService_Delete = new grpc.web.MethodDescriptor(
  '/api.TruckService/Delete',
  grpc.web.MethodType.UNARY,
  proto.api.TruckRequest,
  proto.api.TruckResponse,
  /**
   * @param {!proto.api.TruckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TruckResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.TruckRequest,
 *   !proto.api.TruckResponse>}
 */
const methodInfo_TruckService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.TruckResponse,
  /**
   * @param {!proto.api.TruckRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TruckResponse.deserializeBinary
);


/**
 * @param {!proto.api.TruckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.TruckResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.TruckResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.TruckServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.TruckService/Delete',
      request,
      metadata || {},
      methodDescriptor_TruckService_Delete,
      callback);
};


/**
 * @param {!proto.api.TruckRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.TruckResponse>}
 *     Promise that resolves to the response
 */
proto.api.TruckServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.TruckService/Delete',
      request,
      metadata || {},
      methodDescriptor_TruckService_Delete);
};


module.exports = proto.api;

