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
proto.api = require('./geo_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.GeoServiceClient =
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
proto.api.GeoServicePromiseClient =
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
 *   !proto.api.CountryListRequest,
 *   !proto.api.CountryListResponse>}
 */
const methodDescriptor_GeoService_ListCountry = new grpc.web.MethodDescriptor(
  '/api.GeoService/ListCountry',
  grpc.web.MethodType.UNARY,
  proto.api.CountryListRequest,
  proto.api.CountryListResponse,
  /**
   * @param {!proto.api.CountryListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CountryListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.CountryListRequest,
 *   !proto.api.CountryListResponse>}
 */
const methodInfo_GeoService_ListCountry = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CountryListResponse,
  /**
   * @param {!proto.api.CountryListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CountryListResponse.deserializeBinary
);


/**
 * @param {!proto.api.CountryListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CountryListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CountryListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.GeoServiceClient.prototype.listCountry =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.GeoService/ListCountry',
      request,
      metadata || {},
      methodDescriptor_GeoService_ListCountry,
      callback);
};


/**
 * @param {!proto.api.CountryListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CountryListResponse>}
 *     Promise that resolves to the response
 */
proto.api.GeoServicePromiseClient.prototype.listCountry =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.GeoService/ListCountry',
      request,
      metadata || {},
      methodDescriptor_GeoService_ListCountry);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.RegionListRequest,
 *   !proto.api.RegionListResponse>}
 */
const methodDescriptor_GeoService_ListRegion = new grpc.web.MethodDescriptor(
  '/api.GeoService/ListRegion',
  grpc.web.MethodType.UNARY,
  proto.api.RegionListRequest,
  proto.api.RegionListResponse,
  /**
   * @param {!proto.api.RegionListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.RegionListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.RegionListRequest,
 *   !proto.api.RegionListResponse>}
 */
const methodInfo_GeoService_ListRegion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.RegionListResponse,
  /**
   * @param {!proto.api.RegionListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.RegionListResponse.deserializeBinary
);


/**
 * @param {!proto.api.RegionListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.RegionListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.RegionListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.GeoServiceClient.prototype.listRegion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.GeoService/ListRegion',
      request,
      metadata || {},
      methodDescriptor_GeoService_ListRegion,
      callback);
};


/**
 * @param {!proto.api.RegionListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.RegionListResponse>}
 *     Promise that resolves to the response
 */
proto.api.GeoServicePromiseClient.prototype.listRegion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.GeoService/ListRegion',
      request,
      metadata || {},
      methodDescriptor_GeoService_ListRegion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.CityListRequest,
 *   !proto.api.CityListResponse>}
 */
const methodDescriptor_GeoService_ListCity = new grpc.web.MethodDescriptor(
  '/api.GeoService/ListCity',
  grpc.web.MethodType.UNARY,
  proto.api.CityListRequest,
  proto.api.CityListResponse,
  /**
   * @param {!proto.api.CityListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CityListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.CityListRequest,
 *   !proto.api.CityListResponse>}
 */
const methodInfo_GeoService_ListCity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.CityListResponse,
  /**
   * @param {!proto.api.CityListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CityListResponse.deserializeBinary
);


/**
 * @param {!proto.api.CityListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.CityListResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CityListResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.GeoServiceClient.prototype.listCity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.GeoService/ListCity',
      request,
      metadata || {},
      methodDescriptor_GeoService_ListCity,
      callback);
};


/**
 * @param {!proto.api.CityListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CityListResponse>}
 *     Promise that resolves to the response
 */
proto.api.GeoServicePromiseClient.prototype.listCity =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.GeoService/ListCity',
      request,
      metadata || {},
      methodDescriptor_GeoService_ListCity);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetCityRequest,
 *   !proto.api.City>}
 */
const methodDescriptor_GeoService_GetCity = new grpc.web.MethodDescriptor(
  '/api.GeoService/GetCity',
  grpc.web.MethodType.UNARY,
  proto.api.GetCityRequest,
  proto.api.City,
  /**
   * @param {!proto.api.GetCityRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.City.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetCityRequest,
 *   !proto.api.City>}
 */
const methodInfo_GeoService_GetCity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.City,
  /**
   * @param {!proto.api.GetCityRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.City.deserializeBinary
);


/**
 * @param {!proto.api.GetCityRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.City)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.City>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.GeoServiceClient.prototype.getCity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.GeoService/GetCity',
      request,
      metadata || {},
      methodDescriptor_GeoService_GetCity,
      callback);
};


/**
 * @param {!proto.api.GetCityRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.City>}
 *     Promise that resolves to the response
 */
proto.api.GeoServicePromiseClient.prototype.getCity =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.GeoService/GetCity',
      request,
      metadata || {},
      methodDescriptor_GeoService_GetCity);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetCountryRequest,
 *   !proto.api.Country>}
 */
const methodDescriptor_GeoService_GetCountry = new grpc.web.MethodDescriptor(
  '/api.GeoService/GetCountry',
  grpc.web.MethodType.UNARY,
  proto.api.GetCountryRequest,
  proto.api.Country,
  /**
   * @param {!proto.api.GetCountryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.Country.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetCountryRequest,
 *   !proto.api.Country>}
 */
const methodInfo_GeoService_GetCountry = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.Country,
  /**
   * @param {!proto.api.GetCountryRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.Country.deserializeBinary
);


/**
 * @param {!proto.api.GetCountryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.Country)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.Country>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.GeoServiceClient.prototype.getCountry =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.GeoService/GetCountry',
      request,
      metadata || {},
      methodDescriptor_GeoService_GetCountry,
      callback);
};


/**
 * @param {!proto.api.GetCountryRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.Country>}
 *     Promise that resolves to the response
 */
proto.api.GeoServicePromiseClient.prototype.getCountry =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.GeoService/GetCountry',
      request,
      metadata || {},
      methodDescriptor_GeoService_GetCountry);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetRegionRequest,
 *   !proto.api.Region>}
 */
const methodDescriptor_GeoService_GetRegion = new grpc.web.MethodDescriptor(
  '/api.GeoService/GetRegion',
  grpc.web.MethodType.UNARY,
  proto.api.GetRegionRequest,
  proto.api.Region,
  /**
   * @param {!proto.api.GetRegionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.Region.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.GetRegionRequest,
 *   !proto.api.Region>}
 */
const methodInfo_GeoService_GetRegion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.Region,
  /**
   * @param {!proto.api.GetRegionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.Region.deserializeBinary
);


/**
 * @param {!proto.api.GetRegionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.Region)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.Region>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.GeoServiceClient.prototype.getRegion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.GeoService/GetRegion',
      request,
      metadata || {},
      methodDescriptor_GeoService_GetRegion,
      callback);
};


/**
 * @param {!proto.api.GetRegionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.Region>}
 *     Promise that resolves to the response
 */
proto.api.GeoServicePromiseClient.prototype.getRegion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.GeoService/GetRegion',
      request,
      metadata || {},
      methodDescriptor_GeoService_GetRegion);
};


module.exports = proto.api;

