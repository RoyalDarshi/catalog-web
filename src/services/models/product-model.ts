namespace ProductModel{
export interface catalogLocation
    {
      name: string,
      id: string
    }
export interface catalogProjectTabs
    {
      name: string,
      id: string
    }
export interface buyerCatalogInfo
    {
      buyerCatalogInfoId: string,
      buyerMainCatalogId: string,
      catalogType: string,
      categoryId: string,
      category: string,
      subcategoryId: string,
      subcategory:string,
      l3Category:string,
      itemName: string,
      description: string,
      keyword: string,
      catalogLocation: string,
      createdDate: string,
      status: bigint,
      currency: string,
      finalCost: string,
      savingAmount: string,
      l3CategoryId: string,
      businessUnit: string,
      companyCode: string,
      basePrice: string,
      dateCreated: string,
      lastUpdated: string
    }
export interface buyerCatalogSupplierInfo
    {
      buyerSupplierInfoId: string,
      buyerMainCatalogId: string,
      supplierCompanyId: string,
      supplierPartNo: string,
      shipMode: string,
      createdDate: string,
      status: bigint,
      supplierLocation: string,
      supplierLocationName: string;
      supplierCompanyName: string;
      dateCreated: string,
      lastUpdated: string
    }
    export interface buyerDeliveryTermInfos
    {
      buyerDeliveryId: string,
      buyerMainCatalogId: string,
      deliveryTerm: string,
      createdDate: string,
      status: bigint,
      dateCreated: string,
      lastUpdated: string
    }
 export interface buyerIncoTermInfos
    {
      buyerIncoId: string,
      buyerMainCatalogId: string,
      incoTerm: string,
      createdDate: string,
      status: bigint,
      dateCreated: string,
      lastUpdated: string
    }
export interface buyerPaymentTermInfos
    {
      buyerPaymentId: string,
      buyerMainCatalogId: string,
      paymentTerm: string,
      createdDate: string,
      status: bigint,
      dateCreated: string,
      lastUpdated: string
    }
export interface buyerCatalogAdditionalDocumentsInfos
    {
      buyerAdditionalDocId: string,
      additionalDocName: string,
      additionalDocSize: string,
      buyerMainCatalogId: string,
      createdDate: string,
      createdBy: string,
      dateCreated: string,
      lastUpdated: string
    }
export interface buyerCatalogImages
    {
      buyerCatalogImgId: string,
      imageName: string,
      imageSize: string,
      createdDate: string,
      buyerMainCatalogId: string,
      primaryImage: boolean,
      status: bigint,
      createdBy: string,
      dateCreated: string,
      lastUpdated: string
    }
export interface buyerCatalogPriceTemplateMains
    {
      buyerCatalogPriceTemplateId: string,
      catalogId: string,
      basePrice: string,
      clientId: string,
      createdBy: string,
      createdDate: string,
      totalPrice: string,
      status: bigint,
      buyingBasePrice: string,
      dateCreated: string,
      lastUpdated: string
    }
    export interface buyerCatalogBusinessUnits{
      basePrice: string,
      businessUnit: string,
      businessUnitId:string,
      buyerCatalogBusinessUnitId: string,
      buyerMainCatalogId:string,
      rowUuid:string,
      totalPrice:string
      }
      export interface buyerCatalogPriceTemplateStructure{
        businessUnitId:string,
        buyerCatalogPriceTempStructId:string,
        buyerCatalogPriceTemplateId:string,
        calcOn:string,
        calcType:number,
        catalogId:string,
        compName:string,
        compType:string,
        taxVal:string

      }


  export interface EditedCatalogDetails {
    buyerCatalogAdditionalDocumentsInfos:Array<ProductModel.buyerCatalogAdditionalDocumentsInfos>;
    buyerCatalogImages:Array<ProductModel.buyerCatalogImages>;
    buyerCatalogInfo:Array<ProductModel.buyerCatalogInfo>;
    buyerCatalogPriceTemplateMains:Array<ProductModel.buyerCatalogPriceTemplateMains>;
    buyerCatalogSupplierInfo:Array<ProductModel.buyerCatalogSupplierInfo>;
    buyerDeliveryTermInfos:Array<ProductModel.buyerDeliveryTermInfos>;
    buyerIncoTermInfos:Array<ProductModel.buyerIncoTermInfos>;
    buyerMainCatalogId:string;
    buyerPaymentTermInfos:Array<ProductModel.buyerPaymentTermInfos>;
    catalogLocation:Array<ProductModel.catalogLocation>;
    catalogProjectTabs:Array<ProductModel.catalogProjectTabs>;
    buyerCatalogBusinessUnits:Array<ProductModel.buyerCatalogBusinessUnits>;
    buyerCatalogPriceTemplateStructure:Array<ProductModel.buyerCatalogPriceTemplateStructure>;
    catalogReferenceNo:string;
    catalogUom:string;
    clientId:string;
    comment:string;
    contractDoc:string;
    contractItemId:string;
    contractReferenceNo:string;
    contractSize:string;
    createdDate:string;
    dateCreated:string;
    deliveryLeadTime:string;
    endDate:string;
    expiredBy:string;
    expiredDate:string;
    favourite:string;
    finalApprovedDate:string;
    lastUpdated:string;
    minimumQuantity:string;
    minorUom:string;
    priceListingType:string;
    quantity:string;
    startDate:string;
    status:string;
    unit:string;
    uomQty:string;
    userId:string;
  }

}
export default ProductModel