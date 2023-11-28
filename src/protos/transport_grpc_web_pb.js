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
proto.api = require('./transport_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.TransportServiceClient =
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
proto.api.TransportServicePromiseClient =
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
 *   !proto.api.TransportRequest,
 *   !proto.api.FindTransportResult>}
 */
const methodDescriptor_TransportService_Get = new grpc.web.MethodDescriptor(
  '/api.TransportService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.TransportRequest,
  proto.api.FindTransportResult,
  /**
   * @param {!proto.api.TransportRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindTransportResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.TransportRequest,
 *   !proto.api.FindTransportResult>}
 */
const methodInfo_TransportService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindTransportResult,
  /**
   * @param {!proto.api.TransportRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindTransportResult.deserializeBinary
);


/**
 * @param {!proto.api.TransportRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindTransportResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindTransportResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.TransportServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.TransportService/Get',
      request,
      metadata || {},
      methodDescriptor_TransportService_Get,
      callback);
};


/**
 * @param {!proto.api.TransportRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindTransportResult>}
 *     Promise that resolves to the response
 */
proto.api.TransportServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.TransportService/Get',
      request,
      metadata || {},
      methodDescriptor_TransportService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.FindTransportRequest,
 *   !proto.api.FindTransportResponse>}
 */
const methodDescriptor_TransportService_Find = new grpc.web.MethodDescriptor(
  '/api.TransportService/Find',
  grpc.web.MethodType.UNARY,
  proto.api.FindTransportRequest,
  proto.api.FindTransportResponse,
  /**
   * @param {!proto.api.FindTransportRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindTransportResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.FindTransportRequest,
 *   !proto.api.FindTransportResponse>}
 */
const methodInfo_TransportService_Find = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindTransportResponse,
  /**
   * @param {!proto.api.FindTransportRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindTransportResponse.deserializeBinary
);


/**
 * @param {!proto.api.FindTransportRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindTransportResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindTransportResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.TransportServiceClient.prototype.find =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.TransportService/Find',
      request,
      metadata || {},
      methodDescriptor_TransportService_Find,
      callback);
};


/**
 * @param {!proto.api.FindTransportRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindTransportResponse>}
 *     Promise that resolves to the response
 */
proto.api.TransportServicePromiseClient.prototype.find =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.TransportService/Find',
      request,
      metadata || {},
      methodDescriptor_TransportService_Find);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Transport,
 *   !proto.api.TransportResponse>}
 */
const methodDescriptor_TransportService_Create = new grpc.web.MethodDescriptor(
  '/api.TransportService/Create',
  grpc.web.MethodType.UNARY,
  proto.api.Transport,
  proto.api.TransportResponse,
  /**
   * @param {!proto.api.Transport} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TransportResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Transport,
 *   !proto.api.TransportResponse>}
 */
const methodInfo_TransportService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.TransportResponse,
  /**
   * @param {!proto.api.Transport} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TransportResponse.deserializeBinary
);


/**
 * @param {!proto.api.Transport} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.TransportResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.TransportResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.TransportServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.TransportService/Create',
      request,
      metadata || {},
      methodDescriptor_TransportService_Create,
      callback);
};


/**
 * @param {!proto.api.Transport} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.TransportResponse>}
 *     Promise that resolves to the response
 */
proto.api.TransportServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.TransportService/Create',
      request,
      metadata || {},
      methodDescriptor_TransportService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Transport,
 *   !proto.api.TransportResponse>}
 */
const methodDescriptor_TransportService_Update = new grpc.web.MethodDescriptor(
  '/api.TransportService/Update',
  grpc.web.MethodType.UNARY,
  proto.api.Transport,
  proto.api.TransportResponse,
  /**
   * @param {!proto.api.Transport} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TransportResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Transport,
 *   !proto.api.TransportResponse>}
 */
const methodInfo_TransportService_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.TransportResponse,
  /**
   * @param {!proto.api.Transport} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TransportResponse.deserializeBinary
);


/**
 * @param {!proto.api.Transport} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.TransportResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.TransportResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.TransportServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.TransportService/Update',
      request,
      metadata || {},
      methodDescriptor_TransportService_Update,
      callback);
};


/**
 * @param {!proto.api.Transport} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.TransportResponse>}
 *     Promise that resolves to the response
 */
proto.api.TransportServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.TransportService/Update',
      request,
      metadata || {},
      methodDescriptor_TransportService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.TransportRequest,
 *   !proto.api.TransportResponse>}
 */
const methodDescriptor_TransportService_Delete = new grpc.web.MethodDescriptor(
  '/api.TransportService/Delete',
  grpc.web.MethodType.UNARY,
  proto.api.TransportRequest,
  proto.api.TransportResponse,
  /**
   * @param {!proto.api.TransportRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TransportResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.TransportRequest,
 *   !proto.api.TransportResponse>}
 */
const methodInfo_TransportService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.TransportResponse,
  /**
   * @param {!proto.api.TransportRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.TransportResponse.deserializeBinary
);


/**
 * @param {!proto.api.TransportRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.TransportResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.TransportResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.TransportServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.TransportService/Delete',
      request,
      metadata || {},
      methodDescriptor_TransportService_Delete,
      callback);
};


/**
 * @param {!proto.api.TransportRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.TransportResponse>}
 *     Promise that resolves to the response
 */
proto.api.TransportServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.TransportService/Delete',
      request,
      metadata || {},
      methodDescriptor_TransportService_Delete);
};


module.exports = proto.api;

