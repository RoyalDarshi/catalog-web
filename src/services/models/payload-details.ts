/**
 * 
 * @export
 * @interface CatalogCrudRequestParam
 */
export class CatalogCrudRequestParam {
    /**
     * 
     * @type {CatalogDetailsPayLoadDTO}
     * @memberof CatalogCrudRequestParam
     */
    'catalogDetailsPayLoadDTO'?: CatalogDetailsPayLoadDTO;
    /**
     * 
     * @type {string}
     * @memberof CatalogCrudRequestParam
     */
    'priceListingType'?: CatalogCrudRequestParamPriceListingTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof CatalogCrudRequestParam
     */
    'catalogType'?: CatalogCrudRequestParamCatalogTypeEnum;
}

export const CatalogCrudRequestParamPriceListingTypeEnum = {
    Baseprice: 'BASEPRICE',
    Totalprice: 'TOTALPRICE'
} as const;

export type CatalogCrudRequestParamPriceListingTypeEnum = typeof CatalogCrudRequestParamPriceListingTypeEnum[keyof typeof CatalogCrudRequestParamPriceListingTypeEnum];

export const CatalogCrudRequestParamCatalogTypeEnum = {
    Goods: 'GOODS',
    Services: 'SERVICES'
} as const;

export type CatalogCrudRequestParamCatalogTypeEnum = typeof CatalogCrudRequestParamCatalogTypeEnum[keyof typeof CatalogCrudRequestParamCatalogTypeEnum];


/**
 *
 * @export
 * @interface OptionDto
 */
export class OptionDto {
    /**
     *
     * @type {string}
     * @memberof OptionDto
     */
    'name'?: string;
    /**
     *
     * @type {string}
     * @memberof OptionDto
     */
    'id'?: string;

    /**
     *
     * @type {boolean}
     * @memberof OptionDto
     */
    'isSelected'?: boolean;
}
/**
 *
 * @export
 * @interface CatalogDetailsPayLoadDTO
 */
export class CatalogDetailsPayLoadDTO {
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'buyerMainCatalogId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'itemId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'itemName'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'startDate'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'endDate'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'quantity'?: string;
    /**
     *
     * @type {number}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'minimumQuantity'?: number;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'contractReferenceNo'?: string;
    /**
     *
     * @type {number}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'deliveryLeadTime'?: number;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'unitId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'unit'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'categoryId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'categoryName'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'subcategoryId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'subcategoryName'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'l3CategoryId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'l3CategoryName'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'savingAmount'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'keyword'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'description'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'supplierCompanyId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'supplierCompanyName'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'supplierPartNo'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'shipModeId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'shipMode'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'supplierLocation'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'supplierLocationName'?: string;
    /**
     *
     * @type {Array<OptionDto>}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'projects'?: Array<OptionDto>;
    /**
     *
     * @type {Array<OptionDto>}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'locations'?: Array<OptionDto>;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'deliveryTermId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'deliveryTerm'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'incoTermId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'incoTerm'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'paymentTermId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'paymentTerm'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'createdDate'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'currencyId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'currency'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'minorUOMId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'minorUOM'?: string;
    /**
     *
     * @type {number}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'catalogUOM'?: number;
    /**
     *
     * @type {Array<BuPriceTemplateStructureDTO>}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'buPriceTemplateStructureDTOS'?: Array<BuPriceTemplateStructureDTO>;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'createdBy'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'userId'?: string;
    /**
     *
     * @type {string}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'clientId'?: string;
    /**
     *
     * @type {number}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'status'?: number;
    /**
     *
     * @type {number}
     * @memberof CatalogDetailsPayLoadDTO
     */
    'uomquantity'?: number;
    /**
     *
     * @type {number}
     * @memberof CatalogDetailsPayLoadDTO
     */
}

export class PriceTemplateStructureDTO {
}

/**
 *
 * @export
 * @interface BuPriceTemplateStructureDTO
 */
export class BuPriceTemplateStructureDTO {
    /**
     *
     * @type {string}
     * @memberof BuPriceTemplateStructureDTO
     */
    'businessUnitId'?: string;
    /**
     *
     * @type {string}
     * @memberof BuPriceTemplateStructureDTO
     */
    'businessUnitName'?: string;
    /**
     *
     * @type {string}
     * @memberof BuPriceTemplateStructureDTO
     */
    'basePrice'?: string;
    /**
     *
     * @type {string}
     * @memberof BuPriceTemplateStructureDTO
     */
    'totalPrice'?: string;
    /**
     *
     * @type {Array<PriceTemplateStructureDTO>}
     * @memberof BuPriceTemplateStructureDTO
     */
    'priceStructure'?: Array<PriceTemplateStructureDTO>;



/**
 *
 * @type {Array<BuPriceTemplateStructureDTO>}
 * @memberof CatalogDetailsPayLoadDTO
 */
'buPriceTemplateStructureDTOS'?: Array<BuPriceTemplateStructureDTO>;
/**
 *
 * @type {string}
 * @memberof CatalogDetailsPayLoadDTO
 */
'createdBy'?: string;
/**
 *
 * @type {string}
 * @memberof CatalogDetailsPayLoadDTO
 */
'userId'?: string;
/**
 *
 * @type {string}
 * @memberof CatalogDetailsPayLoadDTO
 */
'clientId'?: string;
/**
 *
 * @type {number}
 * @memberof CatalogDetailsPayLoadDTO
 */
'status'?: number;
/**
 *
 * @type {number}
 * @memberof CatalogDetailsPayLoadDTO
 */
'uomquantity'?: number;
}

export interface ItemData {
    selectedProjects : [],
    selectedCategory : OptionDto,
    selectedSubCategory: OptionDto,
    selectedL3Category : OptionDto,
    selectedItemService : OptionDto,
    description : "",
    keyword : "",
}

export interface SupplierData {
    selectedSupplier : OptionDto,
    selectedShippingMode : "",
    selectedIncoTerm: "",
    selectedDeliveryTerm : "",
    selectedPaymentTerm : "",
    selectedLocations : [],
    selectedCurrency : "",
    selectedUnits: "",
    selectedMinorUom : "",
    selectedSupLocation : OptionDto,
    supplierPart : "",
    negotiatedQuantity : "",
    minimumQuantity : number,
    contactRefNo : "",
    deliveryLeadTime : number,
    uomQuantity : number,
    startDate : "",
    endDate : "",
    savingsAmount : "",
}
export class TermsDto {
    /**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'deliveryType'?: string;/**
     /**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'id'?: string;/**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'name'?: string;/**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'categoryName'?: string;
    /**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'subCategoryName'?: string;
    /**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'subCategoryId'?: string;
    /**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'deliveryTermId'?: string;/**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'incoType'?: string;
    /**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'incoTermId'?: string;/**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'paymentType'?: string;
    /**
     *
     * @type {string}
     * @memberof TermsDto
     */
    'paymentTermId'?: string;
}



/**
 *
 * @export
 * @interface UpdateCatalogDetailsPayloadDTO
 */
export class UpdateCatalogDetailsPayloadDTO {
    /**
     *
     * @type {string}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'catalogId'?: string;
    /**
     *
     * @type {string}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'paymentTermId'?: string;
    /**
     *
     * @type {string}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'paymentTerm'?: string;
    /**
     *
     * @type {string}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'validityEndDate'?: string;
    /**
     *
     * @type {string}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'negotiatedQuantity'?: string;
    /**
     *
     * @type {number}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'minimumQuantity'?: number;
    /**
     *
     * @type {string}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'minorUomId'?: string;
    /**
     *
     * @type {string}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'minorUom'?: string;
    /**
     *
     * @type {string}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'savingAmount'?: string;
    /**
     *
     * @type {Array<buPriceTemplateStructureDTOS>}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'priceTemplateStructureDTOS'?: Array<BuPriceTemplateStructureDTO>;
    /**
     *
     * @type {number}
     * @memberof UpdateCatalogDetailsPayloadDTO
     */
    'uomQuantity'?: number;
}
