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

const proto = {};
proto.api = require('./references_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.ReferenceServiceClient =
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
proto.api.ReferenceServicePromiseClient =
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
 *   !proto.api.StatRequest,
 *   !proto.api.StatResponse>}
 */
const methodDescriptor_ReferenceService_Stat = new grpc.web.MethodDescriptor(
  '/api.ReferenceService/Stat',
  grpc.web.MethodType.UNARY,
  proto.api.StatRequest,
  proto.api.StatResponse,
  /**
   * @param {!proto.api.StatRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.StatResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.StatRequest,
 *   !proto.api.StatResponse>}
 */
const methodInfo_ReferenceService_Stat = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.StatResponse,
  /**
   * @param {!proto.api.StatRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.StatResponse.deserializeBinary
);


/**
 * @param {!proto.api.StatRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.StatResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.StatResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ReferenceServiceClient.prototype.stat =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.ReferenceService/Stat',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_Stat,
      callback);
};


/**
 * @param {!proto.api.StatRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.StatResponse>}
 *     Promise that resolves to the response
 */
proto.api.ReferenceServicePromiseClient.prototype.stat =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.ReferenceService/Stat',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_Stat);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ReferenceRequest,
 *   !proto.api.Reference>}
 */
const methodDescriptor_ReferenceService_Get = new grpc.web.MethodDescriptor(
  '/api.ReferenceService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.ReferenceRequest,
  proto.api.Reference,
  /**
   * @param {!proto.api.ReferenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.Reference.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ReferenceRequest,
 *   !proto.api.Reference>}
 */
const methodInfo_ReferenceService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.Reference,
  /**
   * @param {!proto.api.ReferenceRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.Reference.deserializeBinary
);


/**
 * @param {!proto.api.ReferenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.Reference)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.Reference>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ReferenceServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.ReferenceService/Get',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_Get,
      callback);
};


/**
 * @param {!proto.api.ReferenceRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.Reference>}
 *     Promise that resolves to the response
 */
proto.api.ReferenceServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.ReferenceService/Get',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ReferenceListRequest,
 *   !proto.api.ReferenceListResponse>}
 */
const methodDescriptor_ReferenceService_Find = new grpc.web.MethodDescriptor(
  '/api.ReferenceService/Find',
  grpc.web.MethodType.UNARY,
  proto.api.ReferenceListRequest,
  proto.api.ReferenceListResponse,
  /**
   * @param {!proto.api.ReferenceListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ReferenceListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.ReferenceListRequest,
 *   !proto.api.ReferenceListResponse>}
 */
const methodInfo_ReferenceService_Find = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.ReferenceListResponse,
  /**
   * @param {!proto.api.ReferenceListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ReferenceListResponse.deserializeBinary
);


/**
 * @param {!proto.api.ReferenceListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.ReferenceListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ReferenceListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ReferenceServiceClient.prototype.find =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.ReferenceService/Find',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_Find,
      callback);
};


/**
 * @param {!proto.api.ReferenceListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ReferenceListResponse>}
 *     Promise that resolves to the response
 */
proto.api.ReferenceServicePromiseClient.prototype.find =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.ReferenceService/Find',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_Find);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.Like,
 *   !proto.api.LikeResponse>}
 */
const methodDescriptor_ReferenceService_AddLike = new grpc.web.MethodDescriptor(
  '/api.ReferenceService/AddLike',
  grpc.web.MethodType.UNARY,
  proto.api.Like,
  proto.api.LikeResponse,
  /**
   * @param {!proto.api.Like} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.LikeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.Like,
 *   !proto.api.LikeResponse>}
 */
const methodInfo_ReferenceService_AddLike = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.LikeResponse,
  /**
   * @param {!proto.api.Like} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.LikeResponse.deserializeBinary
);


/**
 * @param {!proto.api.Like} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.LikeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.LikeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ReferenceServiceClient.prototype.addLike =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.ReferenceService/AddLike',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_AddLike,
      callback);
};


/**
 * @param {!proto.api.Like} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.LikeResponse>}
 *     Promise that resolves to the response
 */
proto.api.ReferenceServicePromiseClient.prototype.addLike =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.ReferenceService/AddLike',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_AddLike);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.LikeRequest,
 *   !proto.api.LikeResponse>}
 */
const methodDescriptor_ReferenceService_GetLikes = new grpc.web.MethodDescriptor(
  '/api.ReferenceService/GetLikes',
  grpc.web.MethodType.UNARY,
  proto.api.LikeRequest,
  proto.api.LikeResponse,
  /**
   * @param {!proto.api.LikeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.LikeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.LikeRequest,
 *   !proto.api.LikeResponse>}
 */
const methodInfo_ReferenceService_GetLikes = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.LikeResponse,
  /**
   * @param {!proto.api.LikeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.LikeResponse.deserializeBinary
);


/**
 * @param {!proto.api.LikeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.LikeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.LikeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.ReferenceServiceClient.prototype.getLikes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.ReferenceService/GetLikes',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_GetLikes,
      callback);
};


/**
 * @param {!proto.api.LikeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.LikeResponse>}
 *     Promise that resolves to the response
 */
proto.api.ReferenceServicePromiseClient.prototype.getLikes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.ReferenceService/GetLikes',
      request,
      metadata || {},
      methodDescriptor_ReferenceService_GetLikes);
};


module.exports = proto.api;

