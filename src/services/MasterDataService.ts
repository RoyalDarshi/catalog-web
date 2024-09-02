import http from '../http-common'
import { MasterDataDtoMasterTypeEnum} from './models/master-data-dto'
import {CatalogCrudMasterTypeEnum} from "./models/catalog-crud-master";
import {OptionDto, TermsDto} from "./models/payload-details";
import axios from "axios";
import {showError} from "./alert-service";
import {CatalogSummaryDTO} from "./models/CatalogSummaryDTO";

export class MasterData{
    projects: Array<OptionDto> | undefined;
    categories: Array<OptionDto> | undefined;
    subCategories: Array<OptionDto> | undefined;
    suppliers: Array<OptionDto> | undefined;
    locations: Array<OptionDto> | undefined;
    businessUnits: Array<OptionDto> | undefined;
    l3Categories: Array<OptionDto> | undefined;
    supplierLocations: Array<OptionDto> | undefined;
    incoTerms: Array<TermsDto> | undefined;
    deliveryTerms: Array<TermsDto> | undefined;
    paymentTerms: Array<TermsDto> | undefined;
    shipmentModes: Array<OptionDto> | undefined;
    calculationTypes: Array<OptionDto> | undefined;
    minorUom: Array<OptionDto> | undefined;
}
class MasterDataService{


    protected masterApiEndpoints = [
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.CATEGORY,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.PROJECT,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.LOCATION,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.SUBCATEGORIES,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.L3_CATEGORIES,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.BUSINESSUNIT,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.SUPPLIER,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.SUPPLIER_LOCATION,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.INCO_TERM,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.DELIVERY_TERM,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.PAYMENT_TERM,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.SHIPPING_MODE,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.CALCULATION_TYPE,
        process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.MINOR_UOM,

    ]


    public  getMasterData(): MasterData| any{

       return  Promise.all(this.masterApiEndpoints.map((endpoint) => axios.get(endpoint))).
        then(([{data: categories},{data: projects},{data: locations}, {data: subcategories}, {data: l3categories},
                    {data: businessunits}, {data: suppliers}, {data: supplierLocations}, {data: incoTerms},{data: deliveryTerms},
          {data: paymentTerms},{data: shipmentModes},{data: calculationTypes},{data: minorUom}] )=> {
            let mData = new MasterData();
           mData.businessUnits  = businessunits.masterDataDtoList;
           mData.categories =   categories.masterDataDtoList;
           mData.l3Categories  =   l3categories.masterDataDtoList;
           mData.locations  =   locations.masterDataDtoList;
           mData.projects  =   projects.masterDataDtoList;
           mData.subCategories  =   subcategories.masterDataDtoList;
           mData.supplierLocations  =   supplierLocations.masterDataDtoList;
           mData.suppliers  =   suppliers.masterDataDtoList;
           mData.incoTerms = incoTerms.masterDataDtoList;
           mData.deliveryTerms = deliveryTerms.masterDataDtoList;
           mData.paymentTerms = paymentTerms.masterDataDtoList;
           mData.shipmentModes = shipmentModes.masterDataDtoList;
           mData.calculationTypes = calculationTypes.masterDataDtoList;
           mData.minorUom = minorUom.masterDataDtoList;
            return mData;
        });

    }



    public getCategories(){
        return  http.get(process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.CATEGORY);
    }

    public getSuppliers(){
        return  http.get(process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType="+ MasterDataDtoMasterTypeEnum.SUPPLIER);
    }

    public getBusinessUnits(){
        return  http.get(process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.BUSINESSUNIT);
    }

    public getLocations(){
        return  http.get(process.env.REACT_APP_API_BASE_URL+"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.LOCATION);
    }

    public getProjects() {
        return http.get(process.env.REACT_APP_API_BASE_URL + "masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.PROJECT);
    }
    public getSubCategories(){

        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.SUBCATEGORIES);
    }
    public getL3Categories(){

        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.L3_CATEGORIES);
    }
    public getItemsServices(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/subsets?subsetType=" + CatalogCrudMasterTypeEnum.ITEM_SERVICE);
    }
    public getShippingMode(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.SHIPPING_MODE);
    }
    public getIncoTerm(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.INCO_TERM);
    }
    public getCalculationType(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.CALCULATION_TYPE);
    }
    public getDeliveryTerms(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.DELIVERY_TERM);
    }
    public getPaymentTerms(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.PAYMENT_TERM);
    }
    public getCurrency(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/subsets?subsetType=" + CatalogCrudMasterTypeEnum.CURRENCY);
    }
    public getUnitsofMeasure(){
        return http.get(process.env.REACT_APP_API_BASE_URL +
            "masters/subsets?subsetType=" + CatalogCrudMasterTypeEnum.UNITS);
    }
    public getMinorUom(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.MINOR_UOM);
    }
    public getSupplierLocation(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.SUPPLIER_LOCATION);
    }
    public getPriceLabel(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/admin-data?masterType=" + MasterDataDtoMasterTypeEnum.CALCULATION_TYPE);
    }
    public getCalculationOn(){
        return http.get(process.env.REACT_APP_API_BASE_URL +"masters/subsets?subsetType=" + CatalogCrudMasterTypeEnum.CALCULATION_ON);
    }
}

export default MasterDataService;