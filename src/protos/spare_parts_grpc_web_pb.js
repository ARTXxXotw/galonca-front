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
proto.api = require('./spare_parts_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.SparePartServiceClient =
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
proto.api.SparePartServicePromiseClient =
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
 *   !proto.api.SparePartRequest,
 *   !proto.api.FindSparePartResult>}
 */
const methodDescriptor_SparePartService_Get = new grpc.web.MethodDescriptor(
  '/api.SparePartService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.SparePartRequest,
  proto.api.FindSparePartResult,
  /**
   * @param {!proto.api.SparePartRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindSparePartResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.SparePartRequest,
 *   !proto.api.FindSparePartResult>}
 */
const methodInfo_SparePartService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindSparePartResult,
  /**
   * @param {!proto.api.SparePartRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindSparePartResult.deserializeBinary
);


/**
 * @param {!proto.api.SparePartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindSparePartResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindSparePartResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.SparePartServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.SparePartService/Get',
      request,
      metadata || {},
      methodDescriptor_SparePartService_Get,
      callback);
};


/**
 * @param {!proto.api.SparePartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindSparePartResult>}
 *     Promise that resolves to the response
 */
proto.api.SparePartServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.SparePartService/Get',
      request,
      metadata || {},
      methodDescriptor_SparePartService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.FindSparePartRequest,
 *   !proto.api.FindSparePartResponse>}
 */
const methodDescriptor_SparePartService_Find = new grpc.web.MethodDescriptor(
  '/api.SparePartService/Find',
  grpc.web.MethodType.UNARY,
  proto.api.FindSparePartRequest,
  proto.api.FindSparePartResponse,
  /**
   * @param {!proto.api.FindSparePartRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindSparePartResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.FindSparePartRequest,
 *   !proto.api.FindSparePartResponse>}
 */
const methodInfo_SparePartService_Find = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.FindSparePartResponse,
  /**
   * @param {!proto.api.FindSparePartRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.FindSparePartResponse.deserializeBinary
);


/**
 * @param {!proto.api.FindSparePartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.FindSparePartResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.FindSparePartResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.SparePartServiceClient.prototype.find =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.SparePartService/Find',
      request,
      metadata || {},
      methodDescriptor_SparePartService_Find,
      callback);
};


/**
 * @param {!proto.api.FindSparePartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.FindSparePartResponse>}
 *     Promise that resolves to the response
 */
proto.api.SparePartServicePromiseClient.prototype.find =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.SparePartService/Find',
      request,
      metadata || {},
      methodDescriptor_SparePartService_Find);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.SparePart,
 *   !proto.api.SparePartResponse>}
 */
const methodDescriptor_SparePartService_Create = new grpc.web.MethodDescriptor(
  '/api.SparePartService/Create',
  grpc.web.MethodType.UNARY,
  proto.api.SparePart,
  proto.api.SparePartResponse,
  /**
   * @param {!proto.api.SparePart} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.SparePartResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.SparePart,
 *   !proto.api.SparePartResponse>}
 */
const methodInfo_SparePartService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.SparePartResponse,
  /**
   * @param {!proto.api.SparePart} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.SparePartResponse.deserializeBinary
);


/**
 * @param {!proto.api.SparePart} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.SparePartResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.SparePartResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.SparePartServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.SparePartService/Create',
      request,
      metadata || {},
      methodDescriptor_SparePartService_Create,
      callback);
};


/**
 * @param {!proto.api.SparePart} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.SparePartResponse>}
 *     Promise that resolves to the response
 */
proto.api.SparePartServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.SparePartService/Create',
      request,
      metadata || {},
      methodDescriptor_SparePartService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.SparePart,
 *   !proto.api.SparePartResponse>}
 */
const methodDescriptor_SparePartService_Update = new grpc.web.MethodDescriptor(
  '/api.SparePartService/Update',
  grpc.web.MethodType.UNARY,
  proto.api.SparePart,
  proto.api.SparePartResponse,
  /**
   * @param {!proto.api.SparePart} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.SparePartResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.SparePart,
 *   !proto.api.SparePartResponse>}
 */
const methodInfo_SparePartService_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.SparePartResponse,
  /**
   * @param {!proto.api.SparePart} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.SparePartResponse.deserializeBinary
);


/**
 * @param {!proto.api.SparePart} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.SparePartResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.SparePartResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.SparePartServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.SparePartService/Update',
      request,
      metadata || {},
      methodDescriptor_SparePartService_Update,
      callback);
};


/**
 * @param {!proto.api.SparePart} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.SparePartResponse>}
 *     Promise that resolves to the response
 */
proto.api.SparePartServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.SparePartService/Update',
      request,
      metadata || {},
      methodDescriptor_SparePartService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.SparePartRequest,
 *   !proto.api.SparePartResponse>}
 */
const methodDescriptor_SparePartService_Delete = new grpc.web.MethodDescriptor(
  '/api.SparePartService/Delete',
  grpc.web.MethodType.UNARY,
  proto.api.SparePartRequest,
  proto.api.SparePartResponse,
  /**
   * @param {!proto.api.SparePartRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.SparePartResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.SparePartRequest,
 *   !proto.api.SparePartResponse>}
 */
const methodInfo_SparePartService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.SparePartResponse,
  /**
   * @param {!proto.api.SparePartRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.SparePartResponse.deserializeBinary
);


/**
 * @param {!proto.api.SparePartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.SparePartResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.SparePartResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.SparePartServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.SparePartService/Delete',
      request,
      metadata || {},
      methodDescriptor_SparePartService_Delete,
      callback);
};


/**
 * @param {!proto.api.SparePartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.SparePartResponse>}
 *     Promise that resolves to the response
 */
proto.api.SparePartServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.SparePartService/Delete',
      request,
      metadata || {},
      methodDescriptor_SparePartService_Delete);
};


module.exports = proto.api;

