import {UserServicePromiseClient} from "../protos/user_grpc_web_pb"
import {CreateUserRequest, GetUserByEmailRequest, WhoIsRequest, ChangePasswordRequest, GetUserRequest, DeleteUserRequest} from "../protos/user_pb"
import {LoginRequest} from "../protos/auth_pb"
import {AuthServicePromiseClient} from "../protos/auth_grpc_web_pb"
import {CityListRequest, GetCityRequest} from "../protos/geo_service_pb"
import {GeoServicePromiseClient} from "../protos/geo_service_grpc_web_pb"
import {CargoRequest, FindCargoRequest, Geo, Cargo } from "../protos/cargo_pb"
import { CargoServicePromiseClient } from "../protos/cargo_grpc_web_pb"
import {TruckRequest, FindTruckRequest, Truck } from "../protos/truck_pb"
import { TruckServicePromiseClient } from "../protos/truck_grpc_web_pb"

import {SparePartRequest, FindSparePartRequest, SparePart } from "../protos/spare_parts_pb"
import { SparePartServicePromiseClient } from "../protos/spare_parts_grpc_web_pb"

import {ServiceStationRequest, FindServiceStationRequest, ServiceStation } from "../protos/service_station_pb"
import { ServiceStationServicePromiseClient } from "../protos/service_station_grpc_web_pb"

import {TransportRequest, FindTransportRequest, Transport, SalesType } from "../protos/transport_pb"
import { TransportServicePromiseClient } from "../protos/transport_grpc_web_pb"

import {RoadsideServiceRequest, FindRoadsideServiceRequest, RoadsideService } from "../protos/roadside_service_pb"
import { RoadsideServiceServicePromiseClient } from "../protos/roadside_service_grpc_web_pb"

import {ReferenceRequest, ReferenceListRequest, Reference, StatRequest, LikeRequest, LikeResponse, Like } from "../protos/references_pb"
import { ReferenceServicePromiseClient } from "../protos/references_grpc_web_pb"
import * as timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'

import {CompanyServicePromiseClient, ProfilePromiseClient} from "../protos/user_profile_grpc_web_pb"
import {GetCompanyByUserRequest, GetCompanyRequest, Company, DeleteCompanyRequest, Favorite, FavoritesRequest, MyRequest}  from "../protos/user_profile_pb"
import {join} from "crypto-browserify/example/bundle";




export class Tsl_api {
    userService
    loginService
    cityService
    cargoService
    truckService
    serviceStationService
    sparePartService
    referenceService
    transportService
    roadsideServiceService
    companyService
    profileService
    constructor(url) {
        this.userService = new UserServicePromiseClient(url, null, null)
        this.loginService = new AuthServicePromiseClient(url, null, null)
        this.cityService = new GeoServicePromiseClient(url, null, null)
        this.cargoService = new CargoServicePromiseClient(url, null, null)
        this.truckService = new TruckServicePromiseClient(url, null, null)
        this.serviceStationService = new ServiceStationServicePromiseClient(url, null, null)
        this.sparePartService = new SparePartServicePromiseClient(url, null, null)
        this.transportService = new TransportServicePromiseClient(url, null, null)
        this.roadsideServiceService = new RoadsideServiceServicePromiseClient(url, null, null)
        this.referenceService = new ReferenceServicePromiseClient(url, null, null)
        this.companyService = new CompanyServicePromiseClient(url, null, null)
        this.profileService = new ProfilePromiseClient(url, null, null)
        const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
        enableDevTools([
            this.userService
        ]);
    }

    getTimestamp(myDate) {
        myDate = myDate.split(".");
        let newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
        return newDate.getTime()/1000;
    }

    async WhoIs() {
        let request = new WhoIsRequest()
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.userService.whoIs(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async CreateUser(json, captha) {
        let request = new CreateUserRequest()
        if (json.id !== undefined){
            request.setId(json.id)
        }
        request.setName(json.fio)
        request.setPassword(json.pass)
        request.setEmail(json.email)
        request.setPhone(json.phone)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result =await this.userService.create(request,{'Authorization': tsl_token, 'Captchatoken': captha})
        return result.toObject()
    }

    async GetUser(email) {
        let request = new GetUserByEmailRequest()
        request.setEmail(email)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result =await this.userService.getByEmail(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async DeleteUser(id) {
        let request = new DeleteUserRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result =await this.userService.delete(request,{'Authorization': tsl_token})
        return result.toObject()
    }



    async Login(username, pass) {
        let request = new LoginRequest()
        request.setUsername(username)
        request.setPassword(pass)
        let result = await this.loginService.login(request, {})
        return result.toObject()
    }

    async ChangePass(json, check_old){
        let request = new ChangePasswordRequest()
        request.setId(json.id)
        request.setOldPassword(json.lk_password)
        request.setNewPassword(json.lk_password_new)
        request.setChkPassword(json.lk_password_new_repeat)
        request.setCheckOld(check_old)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result =await this.userService.changePassword(request,{'Authorization': tsl_token})
        return result.toObject()
    }


    async ResetPasswordEmail(email, captha){
        let request = new GetUserByEmailRequest()
        request.setEmail(email)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result =await this.userService.resetPasswordEmail(request,{'Authorization': tsl_token, 'Captchatoken': captha})
        return result.toObject()
    }

    async CheckResetPasswordToken(token) {
        let request = new WhoIsRequest()
        let result =await this.userService.checkResetPasswordToken(request,{'Resetpasswordtoken': token})
        return result.toObject()
    }

    async ListCity(name) {
        let request = new CityListRequest()
        request.setName(name)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.cityService.listCity(request, {'Authorization': tsl_token})
        return result.toObject()
    }

    async GetCity(id) {
        let request = new GetCityRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.cityService.getCity(request, {'Authorization': tsl_token})
        return result.toObject()
    }


    async GetCompany(id) {
        let request = new GetCompanyRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.companyService.get(request, {'Authorization': tsl_token})
        return result.toObject()
    }

    async CreateCompany(json){
        let request = new Company()
        if (json.id !== undefined){
            request.setId(json.id)
        }
        request.setName(json.title)
        request.setPhone(json.phone)
        request.setBin(json.bin)
        request.setEmail(json.email)
        request.setActivitytype(json.activityType)
        request.setImagesList(json.imagesList)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.companyService.create(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async GetCompanyByUser(email){
        let request = new GetCompanyByUserRequest()
        request.setEmail(email)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.companyService.getByUser(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async DeleteCompany(id){
        let request = new DeleteCompanyRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.companyService.delete(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async AddFavorite(type, id){
        let request = new Favorite()
        request.setEntitytype(type)
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.profileService.addFavorite(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async ListFavorites(type, offset=0, limit=0){
        let request = new FavoritesRequest()
        request.setEntitytype(type)
        request.setLimit(limit)
        request.setOffset(offset)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.profileService.listFavorites(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async DeleteFavorite(type, id){
        let request = new Favorite()
        request.setEntitytype(type)
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.profileService.deleteFavorite(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async AddEmployee(json) {
        let request = new CreateUserRequest()
        if (json.id !== undefined){
            request.setId(json.id)
        }
        request.setName(json.fio)
        request.setPassword(json.pass)
        request.setEmail(json.email)
        request.setPhone(json.phone)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result =await this.companyService.addEmployee(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async ListEmployees(id) {
        let request = new GetCompanyRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result =await this.companyService.listEmployees(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async GetUserById(id) {
        let request = new GetUserRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result =await this.userService.get(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async GetStat(bin){
        let request = new StatRequest()
        request.setBin(bin)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result =await this.referenceService.stat(request,{'Authorization': tsl_token})
        return result.toObject()
    }


    /* грузы - proto cargo */
    async CreateCargo(json) {
        let request = new Cargo()
        request.setLoadingpointsList(json.pointLoading)
        request.setUnloadingpointsList(json.pointUnloading)
        const timestampFromDate = new timestamp_pb.Timestamp()
        const timestampTillDate = new timestamp_pb.Timestamp()
        timestampFromDate.setSeconds(this.getTimestamp(json.shipmentdateFrom))
        timestampTillDate.setSeconds(this.getTimestamp(json.shipmentdateUntil))
        request.setFrom(timestampFromDate)
        request.setTill(timestampTillDate)
        request.setWeight(json.weight)
        request.setVolume(json.volume)
        request.setCost(json.sum)
        request.setCurrency(json.currency)
        request.setTransporttypeList(json.transport)
        request.setCargotype(json.cargoType)
        request.setLoadingtypeList(json.typeLoad)
        request.setAdditionList(json.additionally)
        request.setAdditionalmailsList(json.contactEmail)
        request.setAdditionalphonesList(json.contactTel)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.cargoService.create(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async UpdateCargo(json) {
        let request = new Cargo()
        request.setLoadingpointsList(json.pointLoading)
        request.setUnloadingpointsList(json.pointUnloading)
        const timestampFromDate = new timestamp_pb.Timestamp()
        const timestampTillDate = new timestamp_pb.Timestamp()
        timestampFromDate.setSeconds(this.getTimestamp(json.shipmentdateFrom))
        timestampTillDate.setSeconds(this.getTimestamp(json.shipmentdateUntil))
        request.setFrom(timestampFromDate)
        request.setTill(timestampTillDate)
        request.setWeight(json.weight)
        request.setVolume(json.volume)
        request.setCost(json.sum)
        request.setCurrency(json.currency)
        request.setTransporttypeList(json.transport)
        request.setCargotype(json.cargoType)
        request.setLoadingtypeList(json.typeLoad)
        request.setAdditionList(json.additionally)
        request.setAdditionalmailsList(json.contactEmail)
        request.setAdditionalphonesList(json.contactTel)
        request.setId(json.id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.cargoService.update(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async FindCargo(json, loadingType = Geo.geo_type.CITY, unloadingType = Geo.geo_type.CITY) {
        let request = new FindCargoRequest()
        if(Object.keys(json).length !== 0) {

            if(json.pointLoading[0] !== "") {
                json.pointLoading.forEach(function (item) {
                    let geo = new Geo();
                    geo.setGeoId(item);
                    geo.setType(loadingType);
                    request.addGeoFrom(geo);
                })
            }

            if(json.pointUnloading[0] !== "") {
                json.pointUnloading.forEach(function (item) {
                    let geo = new Geo();
                    geo.setGeoId(item);
                    geo.setType(unloadingType);
                    request.addGeoTo(geo);
                })
            }

            if(json.shipmentdateFrom !== "") {
                const timestampFromDate = new timestamp_pb.Timestamp()
                timestampFromDate.setSeconds(this.getTimestamp(json.shipmentdateFrom))
                request.setFrom(timestampFromDate)
            }

            if(json.shipmentdateUntil !== "") {
                const timestampTillDate = new timestamp_pb.Timestamp()
                timestampTillDate.setSeconds(this.getTimestamp(json.shipmentdateUntil))
                request.setTill(timestampTillDate)
            }

            if(json.weightFrom !== "") {
                request.setWeightFrom(json.weightFrom)
            }

            if(json.weightUntil !== "") {
                request.setWeightTo(json.weightUntil)
            }

            if(json.volumeFrom !== "") {
                request.setVolumeFrom(json.volumeFrom)
            }

            if(json.volumeUntil !== "") {
                request.setVolumeTo(json.volumeUntil)
            }

            if(json.typeLoad !== undefined) {
                json.typeLoad.forEach(function (item) {
                    request.addTypeloading(item)
                })
            }

            if(json.cargoType != -1) {
                request.setCargotype(json.cargoType)
            }

        }

        request.setLimit(5)
        if(json.page !== undefined) {
            request.setOffset((json.page-1)*5)
        }


        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.cargoService.find(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async GetCargo(id) {
        let request = new CargoRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.cargoService.get(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async DeleteCargo(id) {
        let request = new CargoRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.cargoService.delete(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async ListMyCargo(limit = 0, offset = 0) {
        let request =  new MyRequest()
        request.setLimit(limit)
        request.setOffset(offset)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.profileService.listMyCargo(request,{'Authorization': tsl_token})
        return result.toObject()
    }
    /* END грузы */

    /* транспорт proto truck */
    async CreateTruck(json) {
        let request = new Truck()
        request.setLoadingpointsList(json.pointLoading)
        request.setUnloadingpointsList(json.pointUnloading)
        const timestampFromDate = new timestamp_pb.Timestamp()
        const timestampTillDate = new timestamp_pb.Timestamp()
        timestampFromDate.setSeconds(this.getTimestamp(json.shipmentdateFrom))
        timestampTillDate.setSeconds(this.getTimestamp(json.shipmentdateUntil))
        request.setFrom(timestampFromDate)
        request.setTill(timestampTillDate)
        request.setWeight(json.weight)
        request.setVolume(json.volume)
        request.setCost(json.sum)
        request.setCurrency(json.currency)
        if (json.transport == 'другое') {
            request.setTransporttypeList(json.transportType)
        } else {
            request.setTransporttypeList(json.transport)
        }
        request.setLoadingtypeList(json.typeLoad)
        request.setAdditionList(json.additionally)
        request.setAdditionalmailsList(json.contactEmail)
        request.setAdditionalphonesList(json.contactTel)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.truckService.create(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async UpdateTruck(json) {
        let request = new Truck()
        request.setLoadingpointsList(json.pointLoading)
        request.setUnloadingpointsList(json.pointUnloading)
        const timestampFromDate = new timestamp_pb.Timestamp()
        const timestampTillDate = new timestamp_pb.Timestamp()
        timestampFromDate.setSeconds(this.getTimestamp(json.shipmentdateFrom))
        timestampTillDate.setSeconds(this.getTimestamp(json.shipmentdateUntil))
        request.setFrom(timestampFromDate)
        request.setTill(timestampTillDate)
        request.setWeight(json.weight)
        request.setVolume(json.volume)
        request.setCost(json.sum)
        request.setCurrency(json.currency)
        if (json.transport == 'другое') {
            request.setTransporttypeList(json.transportType)
        } else {
            request.setTransporttypeList(json.transport)
        }
        request.setLoadingtypeList(json.typeLoad)
        request.setAdditionList(json.additionally)
        request.setAdditionalmailsList(json.contactEmail)
        request.setAdditionalphonesList(json.contactTel)
        request.setId(json.id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.truckService.update(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async FindTruck(json, loadingType = Geo.geo_type.CITY, unloadingType = Geo.geo_type.CITY) {
        let request = new FindTruckRequest()
        if(Object.keys(json).length !== 0) {

            if(json.pointLoading[0] !== "") {
                json.pointLoading.forEach(function (item) {
                    let geo = new Geo();
                    geo.setGeoId(item);
                    geo.setType(loadingType);
                    request.addGeoFrom(geo);
                })
            }

            if(json.pointUnloading[0] !== "") {
                json.pointUnloading.forEach(function (item) {
                    let geo = new Geo();
                    geo.setGeoId(item);
                    geo.setType(unloadingType);
                    request.addGeoTo(geo);
                })
            }

            if(json.shipmentdateFrom !== "") {
                const timestampFromDate = new timestamp_pb.Timestamp()
                timestampFromDate.setSeconds(this.getTimestamp(json.shipmentdateFrom))
                request.setFrom(timestampFromDate)
            }

            if(json.shipmentdateUntil !== "") {
                const timestampTillDate = new timestamp_pb.Timestamp()
                timestampTillDate.setSeconds(this.getTimestamp(json.shipmentdateUntil))
                request.setTill(timestampTillDate)
            }

            if(json.weightFrom !== "") {
                request.setWeightFrom(json.weightFrom)
            }

            if(json.weightUntil !== "") {
                request.setWeightTo(json.weightUntil)
            }

            if(json.volumeFrom !== "") {
                request.setVolumeFrom(json.volumeFrom)
            }

            if(json.volumeUntil !== "") {
                request.setVolumeTo(json.volumeUntil)
            }

            if(json.typeLoad !== undefined) {
                json.typeLoad.forEach(function (item) {
                    request.addTypeloading(item)
                })
            }

        }

        request.setLimit(5)
        if(json.page !== undefined) {
            request.setOffset((json.page-1)*5)
        }


        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.truckService.find(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async GetTruck(id) {
        let request = new TruckRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.truckService.get(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async DeleteTruck(id) {
        let request = new TruckRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.truckService.delete(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async ListMyTruck(limit = 0, offset = 0) {
        let request =  new MyRequest();
        request.setLimit(limit)
        request.setOffset(offset)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.profileService.listMyTruck(request,{'Authorization': tsl_token})
        return result.toObject()
    }
    /* END транспорт */

    /* СТО proto servise_statin */
   async CreateServiceStation(json) {
        let request = new ServiceStation()
        request.setCategoriesList(json.category)
        request.setTitle(json.title)
        request.setDescription(json.description)
        request.setImagesList(json.imagesList)
        request.setAddress(json.address)
        let geo = new Geo();
        geo.setGeoId(json.addressCity[0]);
        geo.setType(Geo.geo_type.CITY);
        request.setLocation(geo);
        request.setLat(json.lat);
        request.setLon(json.lon);
        request.setEmailList(json.email)
        request.setPhoneList(json.phone)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.serviceStationService.create(request,{'Authorization': tsl_token})
        return result.toObject()
    }

   async UpdateServiceStation(json) {
       let request = new ServiceStation()
       request.setCategoriesList(json.category)
       request.setTitle(json.title)
       request.setDescription(json.description)
       request.setImagesList(json.imagesList)
       request.setAddress(json.address)
       let geo = new Geo();
       geo.setGeoId(json.addressCity[0]);
       geo.setType(Geo.geo_type.CITY);
       request.setLocation(geo);
       request.setLat(json.lat);
       request.setLon(json.lon);
       request.setEmailList(json.email)
       request.setPhoneList(json.phone)
       request.setId(json.id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.serviceStationService.update(request,{'Authorization': tsl_token})
        return result.toObject()
    }

   async FindServiceStation(json, limit = 0, offset = 0, addressType = Geo.geo_type.CITY) {

        let request = new FindServiceStationRequest()
        if(Object.keys(json).length !== 0) {

            if(json.addressCity[0] !== "") {
                json.addressCity.forEach(function (item) {
                    let geo = new Geo();
                    geo.setGeoId(item);
                    geo.setType(addressType);
                    request.addLocation(geo);
                })
            }

            if(json.category !== undefined) {
                request.setCategoriesList(json.category);
            }
        }

        request.setLimit(limit)
        if(json.page !== undefined) {
            request.setOffset((json.page-1)*limit)
        } else {
            request.setOffset(offset)
        }


        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.serviceStationService.find(request,{'Authorization': tsl_token})
        return result.toObject()
    }

   async GetServiceStation(id) {
        let request = new ServiceStationRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.serviceStationService.get(request,{'Authorization': tsl_token})
        return result.toObject()
    }

   async DeleteServiceStation(id) {
        let request = new ServiceStationRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.serviceStationService.delete(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async ListMyServiceStation(limit = 0, offset = 0) {
        let request =  new MyRequest();
        request.setLimit(limit)
        request.setOffset(offset)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.profileService.listMyServiceStation(request,{'Authorization': tsl_token})
        return result.toObject()
    }
    /* END СТО  */

    /* запчасти proto spare_parts */
    async CreateSparePart(json) {
        let request = new SparePart()
        request.setCategoriesList(json.category)
        request.setTransporttypesList(json.transport)
        request.setTitle(json.title)
        request.setDescription(json.description)
        request.setImagesList(json.imagesList)
        request.setAddress(json.addressStreet)
        request.setCost(json.sum)
        request.setCurrency(json.currency)
        let geo = new Geo();
        geo.setGeoId(json.addressCity);
        geo.setType(Geo.geo_type.CITY);
        request.setLocation(geo);
        request.setLat(json.lat);
        request.setLon(json.lon);
        request.setEmailList(json.email)
        request.setPhoneList(json.phone)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.sparePartService.create(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async UpdateSparePart(json) {
        let request = new SparePart()
        request.setCategoriesList(json.category)
        request.setTransporttypesList(json.transport)
        request.setTitle(json.title)
        request.setDescription(json.description)
        request.setImagesList(json.imagesList)
        request.setAddress(json.addressStreet)
        request.setCost(json.sum)
        request.setCurrency(json.currency)
        let geo = new Geo();
        geo.setGeoId(json.addressCity);
        geo.setType(Geo.geo_type.CITY);
        request.setLocation(geo);
        request.setLat(json.lat);
        request.setLon(json.lon);
        request.setEmailList(json.email)
        request.setPhoneList(json.phone)
        request.setId(json.id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.sparePartService.update(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async FindSparePart(json,addressType = Geo.geo_type.CITY) {
        let request = new FindSparePartRequest()
        if(Object.keys(json).length !== 0) {

            if(json.addressCity[0] !== "") {
                json.addressCity.forEach(function (item) {
                    let geo = new Geo();
                    geo.setGeoId(item);
                    geo.setType(addressType);
                    request.addLocation(geo);
                })
            }

            if(json.transport !== undefined) {
                    request.setTransporttypesList(json.transport);
            }

            if(json.category !== undefined) {
                    request.setCategoriesList(json.category);
            }
        }

        request.setLimit(5)
        if(json.page !== undefined) {
            request.setOffset((json.page-1)*5)
        }

        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.sparePartService.find(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async GetSparePart(id) {
        let request = new SparePartRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.sparePartService.get(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async DeleteSparePart(id) {
        let request = new SparePartRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.sparePartService.delete(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async ListMySpareParts(limit = 0, offset = 0) {
        let request =  new MyRequest();
        request.setLimit(limit)
        request.setOffset(offset)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.profileService.listMySpareParts(request,{'Authorization': tsl_token})
        return result.toObject()
    }
    /* END запчасти  */


    /* продажа\аренда транпорта proto transport */
    async CreateTransport(json) {
        let request = new Transport()
        request.setBrand(json.brand)
        request.setTransporttype(json.transportType)
        request.setModel(json.model)
        request.setReleaseyear(json.releaseyear)
        request.setType(json.salestype)
        request.setEngine(json.engine)
        request.setTransmission(json.transmission)
        request.setMileage(json.mileage)
        request.setFueltype(json.fuelType)
        request.setAvailability(json.availability)
        request.setCondition(json.condition)
        request.setCost(json.cost)
        request.setCurrency(json.currency)
        request.setImagesList(json.imagesList)
        request.setInformation(json.information)
        request.setNumberpassengers(json.numberpassengers)
        request.setPowder(json.powder)
        let geo = new Geo();
        geo.setGeoId(json.addressCity);
        geo.setType(Geo.geo_type.CITY);
        request.setPlacement(geo);
        request.setEmailsList(json.email)
        request.setPhonesList(json.phone)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.transportService.create(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async UpdateTransport(json) {
        let request = new Transport()
        request.setBrand(json.brand)
        request.setTransporttype(json.transportType)
        request.setModel(json.model)
        request.setReleaseyear(json.releaseyear)
        request.setType(json.salestype)
        request.setEngine(json.engine)
        request.setTransmission(json.transmission)
        request.setMileage(json.mileage)
        request.setFueltype(json.fuelType)
        request.setAvailability(json.availability)
        request.setCondition(json.condition)
        request.setCost(json.cost)
        request.setCurrency(json.currency)
        request.setImagesList(json.imagesList)
        request.setInformation(json.information)
        request.setNumberpassengers(json.numberpassengers)
        request.setPowder(json.powder)
        let geo = new Geo();
        geo.setGeoId(json.addressCity);
        geo.setType(Geo.geo_type.CITY);
        request.setPlacement(geo);
        request.setEmailsList(json.email)
        request.setPhonesList(json.phone)
        request.setId(json.id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.transportService.update(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async FindTransport(json,addressType = Geo.geo_type.CITY) {
        let request = new FindTransportRequest()
        if(Object.keys(json).length !== 0) {
            if(json.addressCity !== '') {
                let geo = new Geo();
                geo.setGeoId(json.addressCity);
                geo.setType(addressType);
                request.setPlacement(geo);

            }

            if(json.salestype !== undefined) {
                request.setType(json.salestype)
            }

            if(json.condition !== undefined) {
                request.setCondition(json.condition)
            }

            if(json.transportType[0] !== "") {
                request.setTransporttypeList(json.transportType)
            }

            if(json.fuelType[0] !== "all") {
                request.setFueltypeList(json.fuelType)
            }

            if(json.brand[0] !== "") {
                request.setBrandList(json.brand)
            }


            if(json.volumeFrom !== "") {
                request.setCostfrom(json.costFrom)
            }

            if(json.volumeUntil !== "") {
                request.setCosttill(json.costTill)
            }

        }


        request.setLimit(8)
        if(json.page !== undefined) {
            request.setOffset((json.page-1)*8)
        }


        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.transportService.find(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async GetTransport(id) {
        let request = new TransportRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.transportService.get(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async DeleteTransport(id) {
        let request = new TransportRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.transportService.delete(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async ListMyTransport(limit = 0, offset = 0) {
        let request =  new MyRequest();
        request.setLimit(limit)
        request.setOffset(offset)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.profileService.listMyTransport(request,{'Authorization': tsl_token})
        return result.toObject()
    }
    /* END продажа\аренда транпорта */

    /* придорожный сервис proto  roadside_service.proto*/
    async CreateRoadsideService(json) {
        let request = new RoadsideService()
        request.setType(json.type)
        request.setTitle(json.title)
        request.setDescription(json.description)
        request.setImagesList(json.imagesList)
        request.setAddress(json.address)
        let geo = new Geo();
        geo.setGeoId(json.addressCity);
        geo.setType(Geo.geo_type.CITY);
        request.setLocation(geo);
        request.setLat(json.lat);
        request.setLon(json.lon);
        request.setEmailList(json.email)
        request.setPhoneList(json.phone)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.roadsideServiceService.create(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async UpdateRoadsideService(json) {
        let request = new RoadsideService()
        request.setType(json.type)
        request.setTitle(json.title)
        request.setDescription(json.description)
        request.setImagesList(json.imagesList)
        request.setAddress(json.address)
        let geo = new Geo();
        geo.setGeoId(json.addressCity);
        geo.setType(Geo.geo_type.CITY);
        request.setLocation(geo);
        request.setLat(json.lat);
        request.setLon(json.lon);
        request.setEmailList(json.email)
        request.setPhoneList(json.phone)
        request.setId(json.id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.roadsideServiceService.update(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async FindRoadsideService(json,addressType = Geo.geo_type.CITY) {
        let request = new FindRoadsideServiceRequest()
        if(Object.keys(json).length !== 0) {
            if(json.addressCity !== '') {
                    let geo = new Geo();
                    geo.setGeoId(json.addressCity);
                    geo.setType(addressType);
                    request.setLocation(geo);

            }
        }

        if (json.category !== undefined){
            request.setType(json.category);
        }else {
            request.setType(10);
        }

        request.setLimit(6)
        if(json.page !== undefined) {
            request.setOffset((json.page-1)*6)
        }

        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.roadsideServiceService.find(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async GetRoadsideService(id) {
        let request = new RoadsideServiceRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.roadsideServiceService.get(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async DeleteRoadsideService(id) {
        let request = new RoadsideServiceRequest()
        request.setId(id)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.roadsideServiceService.delete(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async ListMyRoadsideService(limit = 0, offset = 0) {
        let request =  new MyRequest();
        request.setLimit(limit)
        request.setOffset(offset)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.profileService.listMyRoadsideService(request,{'Authorization': tsl_token})
        return result.toObject()
    }
    /* END придорожный сервис */

    async GetCompanyByUserEmail(email){
        let request = new GetCompanyByUserRequest()
        request.setEmail(email)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.companyService.getByUser(request,{'Authorization': tsl_token})
        return result.toObject()
    }


    /* reference list */
    async FindReference(type, sort = 0) {
        let request = new ReferenceListRequest()

        request.setType(type)
        request.setSort(sort)

        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.referenceService.find(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async GetReference(type, name) {
        let request = new ReferenceRequest()
        request.setType(type)
        request.setName(name)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.referenceService.get(request,{'Authorization': tsl_token})
        return result.toObject()
    }
    /* END reference list */

    /* like */
    async AddLike(type, id, positive) {
        let request =  new Like()
        request.setEntityid(id)
        request.setEntitytype(type)
        request.setPositive(positive)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.referenceService.addLike(request,{'Authorization': tsl_token})
        return result.toObject()
    }

    async GetLikes(type, id) {
        let request =  new LikeRequest()
        request.setEntityid(id)
        request.setEntitytype(type)
        let tsl_token = sessionStorage.getItem('tsl_token')
        let result = await this.referenceService.getLikes(request,{'Authorization': tsl_token})
        return result.toObject()
    }


    /* END like */


}