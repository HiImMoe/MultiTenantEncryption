/* tslint:disable */
/* eslint-disable */
/**
 * MT-Encryption
 * API for the RE:Base frontend
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
import { CreateUserDTO } from '../dto';
// @ts-ignore
import { UserDTO } from '../dto';
/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateUserDTO} createUserDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerCreateUser: async (createUserDTO: CreateUserDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createUserDTO' is not null or undefined
            assertParamExists('userControllerCreateUser', 'createUserDTO', createUserDTO)
            const localVarPath = `/user`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createUserDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerGetUserById: async (userId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('userControllerGetUserById', 'userId', userId)
            const localVarPath = `/user/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "oauth2", [], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerGetUsers: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/user`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "oauth2", [], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CreateUserDTO} createUserDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerCreateUser(createUserDTO: CreateUserDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerCreateUser(createUserDTO, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerGetUserById(userId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerGetUserById(userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userControllerGetUsers(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<UserDTO>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userControllerGetUsers(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserApiFp(configuration)
    return {
        /**
         * 
         * @param {CreateUserDTO} createUserDTO 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerCreateUser(createUserDTO: CreateUserDTO, options?: any): AxiosPromise<string> {
            return localVarFp.userControllerCreateUser(createUserDTO, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerGetUserById(userId: string, options?: any): AxiosPromise<void> {
            return localVarFp.userControllerGetUserById(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userControllerGetUsers(options?: any): AxiosPromise<Array<UserDTO>> {
            return localVarFp.userControllerGetUsers(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for userControllerCreateUser operation in UserApi.
 * @export
 * @interface UserApiUserControllerCreateUserRequest
 */
export interface UserApiUserControllerCreateUserRequest {
    /**
     * 
     * @type {CreateUserDTO}
     * @memberof UserApiUserControllerCreateUser
     */
    readonly createUserDTO: CreateUserDTO
}

/**
 * Request parameters for userControllerGetUserById operation in UserApi.
 * @export
 * @interface UserApiUserControllerGetUserByIdRequest
 */
export interface UserApiUserControllerGetUserByIdRequest {
    /**
     * 
     * @type {string}
     * @memberof UserApiUserControllerGetUserById
     */
    readonly userId: string
}

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * 
     * @param {UserApiUserControllerCreateUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userControllerCreateUser(requestParameters: UserApiUserControllerCreateUserRequest, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).userControllerCreateUser(requestParameters.createUserDTO, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {UserApiUserControllerGetUserByIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userControllerGetUserById(requestParameters: UserApiUserControllerGetUserByIdRequest, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).userControllerGetUserById(requestParameters.userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public userControllerGetUsers(options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).userControllerGetUsers(options).then((request) => request(this.axios, this.basePath));
    }
}
