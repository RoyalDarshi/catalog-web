/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CatalogCrudMaster = {
    id?: string;
    name?: string;
    type?: CatalogCrudMaster.type;
};

export namespace CatalogCrudMaster {

    export enum type {
        ITEM_SERVICE = 'ITEM_SERVICE',
        CURRENCY = 'CURRENCY',
        UNITS = 'UNITS',
        PRICE_LABEL = 'PRICE_LABEL',
        CALCULATION_ON = 'CALCULATION_ON',
    }


}
