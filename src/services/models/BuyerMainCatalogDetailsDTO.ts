/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BuyerCatalogAdditionalDocumentsInfo } from './BuyerCatalogAdditionalDocumentsInfo';
import type { BuyerCatalogImages } from './BuyerCatalogImages';
import type { BuyerCatalogInfo } from './BuyerCatalogInfo';
import type { BuyerCatalogPriceTemplateMain } from './BuyerCatalogPriceTemplateMain';
import type { BuyerCatalogSupplierInfo } from './BuyerCatalogSupplierInfo';
import type { BuyerDeliveryTermInfo } from './BuyerDeliveryTermInfo';
import type { BuyerIncoTermInfo } from './BuyerIncoTermInfo';
import type { BuyerPaymentTermInfo } from './BuyerPaymentTermInfo';
import type { CatalogLocation } from './CatalogLocation';
import type { CatalogProjectTab } from './CatalogProjectTab';

export type BuyerMainCatalogDetailsDTO = {
    buyerMainCatalogId?: string;
    userId?: string;
    clientId?: string;
    startDate?: string;
    endDate?: string;
    quantity?: string;
    unit?: string;
    contractDoc?: string;
    contractSize?: string;
    createdDate?: string;
    status: number;
    favourite: number;
    comment?: string;
    catalogUom?: number;
    contractReferenceNo?: string;
    deliveryLeadTime?: number;
    contractItemId?: string;
    priceListingType: number;
    catalogReferenceNo?: string;
    expiredBy?: string;
    expiredDate?: string;
    minimumQuantity?: number;
    uomQty?: number;
    minorUom?: string;
    finalApprovedDate?: string;
    catalogLocation?: Array<CatalogLocation>;
    catalogProjectTabs?: Array<CatalogProjectTab>;
    buyerCatalogInfo?: Array<BuyerCatalogInfo>;
    buyerCatalogSupplierInfo?: Array<BuyerCatalogSupplierInfo>;
    buyerDeliveryTermInfos?: Array<BuyerDeliveryTermInfo>;
    buyerIncoTermInfos?: Array<BuyerIncoTermInfo>;
    buyerPaymentTermInfos?: Array<BuyerPaymentTermInfo>;
    buyerCatalogAdditionalDocumentsInfos?: Array<BuyerCatalogAdditionalDocumentsInfo>;
    buyerCatalogImages?: Array<BuyerCatalogImages>;
    buyerCatalogPriceTemplateMains?: Array<BuyerCatalogPriceTemplateMain>;
};
