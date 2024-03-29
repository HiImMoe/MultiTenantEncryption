/* tslint:disable */
/* eslint-disable */
/**
 * MT-Encryption
 * API for the MT-Encryption System
 *
 * The version of the OpenAPI document: 0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { CreateBoniDTO } from '../dto';
/**
 * BoniApi - axios parameter creator
 * @export
 */
export const BoniApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary creates a new boni entry
         * @param {CreateBoniDTO} createBoniDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        boniControllerCreateMissingDay: async (createBoniDTO: CreateBoniDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createBoniDTO' is not null or undefined
            assertParamExists('boniControllerCreateMissingDay', 'createBoniDTO', createBoniDTO)
            const localVarPath = `/boni`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "oauth2", [], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createBoniDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BoniApi - functional programming interface
 * @export
 */
export const BoniApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BoniApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary creates a new boni entry
         * @param {CreateBoniDTO} createBoniDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async boniControllerCreateMissingDay(createBoniDTO: CreateBoniDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.boniControllerCreateMissingDay(createBoniDTO, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * BoniApi - factory interface
 * @export
 */
export const BoniApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BoniApiFp(configuration)
    return {
        /**
         * 
         * @summary creates a new boni entry
         * @param {CreateBoniDTO} createBoniDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        boniControllerCreateMissingDay(createBoniDTO: CreateBoniDTO, options?: any): AxiosPromise<string> {
            return localVarFp.boniControllerCreateMissingDay(createBoniDTO, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for boniControllerCreateMissingDay operation in BoniApi.
 * @export
 * @interface BoniApiBoniControllerCreateMissingDayRequest
 */
export interface BoniApiBoniControllerCreateMissingDayRequest {
    /**
     * 
     * @type {CreateBoniDTO}
     * @memberof BoniApiBoniControllerCreateMissingDay
     */
    readonly createBoniDTO: CreateBoniDTO
}

/**
 * BoniApi - object-oriented interface
 * @export
 * @class BoniApi
 * @extends {BaseAPI}
 */
export class BoniApi extends BaseAPI {
    /**
     * 
     * @summary creates a new boni entry
     * @param {BoniApiBoniControllerCreateMissingDayRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BoniApi
     */
    public boniControllerCreateMissingDay(requestParameters: BoniApiBoniControllerCreateMissingDayRequest, options?: AxiosRequestConfig) {
        return BoniApiFp(this.configuration).boniControllerCreateMissingDay(requestParameters.createBoniDTO, options).then((request) => request(this.axios, this.basePath));
    }
}
