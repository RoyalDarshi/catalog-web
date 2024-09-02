/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 
 * @export
 * @interface MasterDataDto
 */
export interface MasterDataDto {
    /**
     * 
     * @type {string}
     * @memberof MasterDataDto
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof MasterDataDto
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof MasterDataDto
     */
    masterType?: MasterDataDtoMasterTypeEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum MasterDataDtoMasterTypeEnum {
    CATEGORY = 'CATEGORY',
    PROJECT = 'PROJECT',
    SUPPLIER = 'SUPPLIER',
    BUSINESSUNIT = 'BUSINESSUNIT',
    LOCATION = 'LOCATION',
    SUBCATEGORIES = 'SUBCATEGORIES',
    L3_CATEGORIES = 'L3_CATEGORIES',
    SHIPPING_MODE = 'SHIPPING_MODE',
    INCO_TERM = 'INCO_TERM',
    DELIVERY_TERM = 'DELIVERY_TERM',
    PAYMENT_TERM = 'PAYMENT_TERM',
    MINOR_UOM = 'MINOR_UOM',
    CALCULATION_TYPE = 'CALCULATION_TYPE',
    SUPPLIER_LOCATION = 'SUPPLIER_LOCATION'




}

