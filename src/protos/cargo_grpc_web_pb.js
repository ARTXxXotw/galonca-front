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
proto.api = require('./cargo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.CargoServiceClient =
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
proto.api.CargoServicePromiseClient =
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
 *   !proto.api.CargoRequest,
 *   !proto.api.FindCargoResult>}
 */
const methodDescriptor_CargoService_Get = new grpc.web.MethodDescriptor(
  '/api.CargoService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.CargoRequest,
  proto.api.FindCargoResult,
  /**
   * @param {!proto.api.CargoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindCargoResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.CargoRequest,
 *   !proto.api.FindCargoResult>}
 */
const methodInfo_CargoService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindCargoResult,
  /**
   * @param {!proto.api.CargoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindCargoResult.deserializeBinary
);


/**
 * @param {!proto.api.CargoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindCargoResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindCargoResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CargoServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CargoService/Get',
      request,
      metadata || {},
      methodDescriptor_CargoService_Get,
      callback);
};


/**
 * @param {!proto.api.CargoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindCargoResult>}
 *     Promise that resolves to the response
 */
proto.api.CargoServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CargoService/Get',
      request,
      metadata || {},
      methodDescriptor_CargoService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.FindCargoRequest,
 *   !proto.api.FindCargoResponse>}
 */
const methodDescriptor_CargoService_Find = new grpc.web.MethodDescriptor(
  '/api.CargoService/Find',
  grpc.web.MethodType.UNARY,
  proto.api.FindCargoRequest,
  proto.api.FindCargoResponse,
  /**
   * @param {!proto.api.FindCargoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindCargoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.FindCargoRequest,
 *   !proto.api.FindCargoResponse>}
 */
const methodInfo_CargoService_Find = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindCargoResponse,
  /**
   * @param {!proto.api.FindCargoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindCargoResponse.deserializeBinary
);


/**
 * @param {!proto.api.FindCargoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindCargoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindCargoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CargoServiceClient.prototype.find =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CargoService/Find',
      request,
      metadata || {},
      methodDescriptor_CargoService_Find,
      callback);
};


/**
 * @param {!proto.api.FindCargoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindCargoResponse>}
 *     Promise that resolves to the response
 */
proto.api.CargoServicePromiseClient.prototype.find =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CargoService/Find',
      request,
      metadata || {},
      methodDescriptor_CargoService_Find);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Cargo,
 *   !proto.api.CargoResponse>}
 */
const methodDescriptor_CargoService_Create = new grpc.web.MethodDescriptor(
  '/api.CargoService/Create',
  grpc.web.MethodType.UNARY,
  proto.api.Cargo,
  proto.api.CargoResponse,
  /**
   * @param {!proto.api.Cargo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CargoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Cargo,
 *   !proto.api.CargoResponse>}
 */
const methodInfo_CargoService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CargoResponse,
  /**
   * @param {!proto.api.Cargo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CargoResponse.deserializeBinary
);


/**
 * @param {!proto.api.Cargo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CargoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CargoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CargoServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CargoService/Create',
      request,
      metadata || {},
      methodDescriptor_CargoService_Create,
      callback);
};


/**
 * @param {!proto.api.Cargo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CargoResponse>}
 *     Promise that resolves to the response
 */
proto.api.CargoServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CargoService/Create',
      request,
      metadata || {},
      methodDescriptor_CargoService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Cargo,
 *   !proto.api.CargoResponse>}
 */
const methodDescriptor_CargoService_Update = new grpc.web.MethodDescriptor(
  '/api.CargoService/Update',
  grpc.web.MethodType.UNARY,
  proto.api.Cargo,
  proto.api.CargoResponse,
  /**
   * @param {!proto.api.Cargo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CargoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Cargo,
 *   !proto.api.CargoResponse>}
 */
const methodInfo_CargoService_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CargoResponse,
  /**
   * @param {!proto.api.Cargo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CargoResponse.deserializeBinary
);


/**
 * @param {!proto.api.Cargo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CargoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CargoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CargoServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CargoService/Update',
      request,
      metadata || {},
      methodDescriptor_CargoService_Update,
      callback);
};


/**
 * @param {!proto.api.Cargo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CargoResponse>}
 *     Promise that resolves to the response
 */
proto.api.CargoServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CargoService/Update',
      request,
      metadata || {},
      methodDescriptor_CargoService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.CargoRequest,
 *   !proto.api.CargoResponse>}
 */
const methodDescriptor_CargoService_Delete = new grpc.web.MethodDescriptor(
  '/api.CargoService/Delete',
  grpc.web.MethodType.UNARY,
  proto.api.CargoRequest,
  proto.api.CargoResponse,
  /**
   * @param {!proto.api.CargoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CargoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.CargoRequest,
 *   !proto.api.CargoResponse>}
 */
const methodInfo_CargoService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CargoResponse,
  /**
   * @param {!proto.api.CargoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CargoResponse.deserializeBinary
);


/**
 * @param {!proto.api.CargoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CargoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CargoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.CargoServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.CargoService/Delete',
      request,
      metadata || {},
      methodDescriptor_CargoService_Delete,
      callback);
};


/**
 * @param {!proto.api.CargoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CargoResponse>}
 *     Promise that resolves to the response
 */
proto.api.CargoServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.CargoService/Delete',
      request,
      metadata || {},
      methodDescriptor_CargoService_Delete);
};


module.exports = proto.api;

