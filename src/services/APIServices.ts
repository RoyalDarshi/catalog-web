import http from '../http-common'
import {AxiosResponse} from 'axios';
import ApiClient from "./api-client";
import {ApiConfiguration, HttpHeaders, RequestConfig} from "./ApiConfiguration";
import secureLocalStorage from "react-secure-storage";


class  HttpHeaderOptions{
   public  bearerToken: string | undefined;
   public tenantId: string | undefined;
}

 class APIServices{

     // eslint-disable-next-line @typescript-eslint/no-useless-constructor
     tenantId:string | any
     accessToken: string | any
    constructor() {
        this.tenantId = secureLocalStorage.getItem("tenantId")
    }

    protected headerOptions: HttpHeaderOptions = new HttpHeaderOptions();

    public setHeaders(token:string ,tenantId:string){
        this.headerOptions.bearerToken = token;
        this.headerOptions.tenantId = tenantId;
    }

   public getTabsListData(workFlowStatus:string){
       return  http.get(process.env.REACT_APP_API_BASE_URL+"workflow-management/catalogs/tabs?workflowStatus="+workFlowStatus);
    }
    public getProductDetailsByCatlogId(catlogId:string){
      return  http.get(process.env.REACT_APP_API_BASE_URL+"workflow-management/catalogs/"+catlogId);
   }

   public getCartItemsByClientID(clientId:string){
      return  http.get(process.env.REACT_APP_API_BASE_URL+"cart/items/"+clientId);
   }
   public getPriceStructureByCatlogId(catlogId:string){
      return  http.get(process.env.REACT_APP_API_BASE_URL+"workflow-management/price-structure/"+catlogId);
   }
   public getEditedCatalogDetailsByCatlogId(catlogId:string){
       return  http.get(process.env.REACT_APP_API_BASE_URL+"workflow-management/catalogs/"+catlogId);
   }
     public getRenewByCatlogId(catlogId:string){

         return  http.get(process.env.REACT_APP_API_BASE_URL+"catalog-management/catalog/renew/"+catlogId);
     }
   public async  createCatalog(formData:  any): Promise<AxiosResponse> {
      const headers = {
         //'Authorization': 'Bearer your_access_token',
             'Content-Type': 'application/json',
          'Accept': 'application/json'
         // Add more headers here as needed
         };
       return await http.post(
              process.env.REACT_APP_API_BASE_URL + "catalog-management/create-catalog-v1",
              formData,
              {headers}
          );
      }
     public async  editCatalog(formData:  any): Promise<AxiosResponse> {
         const headers = {
             'Authorization': 'Bearer your_access_token',
             'Content-Type': 'application/json',
             'Accept': 'application/json',
             // Add more headers here as needed
         };
         const response: AxiosResponse = await http.put(
             process.env.REACT_APP_API_BASE_URL +"catalog-management/catalog/update",
             formData,
             {headers}
         );

         return response;
     }

     public async  updateCatalog(formData:  any): Promise<AxiosResponse> {
         const headers = {
             //'Authorization': 'Bearer your_access_token',
             'Content-Type': 'application/json',
             'Accept': 'application/json'
             // Add more headers here as needed
         };
         const response: AxiosResponse = await http.put(
             process.env.REACT_APP_API_BASE_URL +"catalog-management/catalog/update/renewed",
             formData,
             {headers}
         );

         return response;
     }
     public async uploadFile(data: any, boundary:any): Promise<AxiosResponse> {
         const headers = {
             //'Content-Type': 'multipart/form-data',
             'Content-Type': `multipart/form-data; boundary=${boundary}`
         };

         return await http.post(
             `${process.env.REACT_APP_API_BASE_URL}catalog-management/files`,
             data,
             {headers}
         );
     }



     public uploadFiles(catalogId:string,images:File[],contractDoc:File,additionalDoc:File[]): any{
        let apiConfig:ApiConfiguration = new ApiConfiguration()
         apiConfig.accessToken = secureLocalStorage.getItem("accessToken")? secureLocalStorage.getItem("accessToken"):'';
        let apiClient: ApiClient = new ApiClient(apiConfig);
         const localVarHeaderParameter = {} as any;
         const localVarQueryParameter = {} as any;
         const localVarFormParams = new FormData();

         if (catalogId !== undefined) {
             localVarQueryParameter['catalogId'] = catalogId;
         }

         let uploadUrl:string = process.env.REACT_APP_API_BASE_URL+'catalog-management/files?catalogId='+catalogId
         if (images) {
             images.forEach((element) => {
                 localVarFormParams.append('images', element as any);
             })
         }

         if (additionalDoc) {
             additionalDoc.forEach((element) => {
                 localVarFormParams.append('additionaldoc', element as any);
             })
         }

         if (contractDoc !== undefined) {
             localVarFormParams.append('contractdoc', contractDoc as any);
         }

         localVarHeaderParameter['Content-Type'] = 'multipart/form-data';


         // set the token also here

         let isAuthEnabled = process.env.REACT_APP_IS_AUTH_ENABLED;
         let accessToken = secureLocalStorage.getItem("accessToken")?secureLocalStorage.getItem("accessToken"):'';
         const tenantId:string | any = secureLocalStorage.getItem("tenantId")? secureLocalStorage.getItem("tenantId"):'';

         if(isAuthEnabled === "true"){
             let headers: HttpHeaders = {
                 'Content-Type': "multipart/form-data",
                 'Access-Control-Allow-Origin': "*",
                 'Authorization': "Bearer " + accessToken,
                 "X-Tenant": "nccltd"
             }, requestConfig: RequestConfig = {
                 headers
             };
             apiClient.post(uploadUrl,localVarFormParams,requestConfig).then(result=> {
                 return  result
             },error=>{
                 return error
             })
         }else {
             let headers:HttpHeaders = {
                 'Content-Type' : "multipart/form-data",
                 'Access-Control-Allow-Origin':"*"
             }
             let requestConfig:RequestConfig ={
                 headers
             }
             apiClient.post(uploadUrl,localVarFormParams,requestConfig).then(result=> {
                 return  result
             },error=>{
                 return error
             })
         }
     }


 }

export default APIServices;