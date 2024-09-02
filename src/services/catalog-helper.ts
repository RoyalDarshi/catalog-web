import MasterDataService from "./MasterDataService";
import {CatalogDetailsPayLoadDTO, OptionDto} from "./models/payload-details";
import {showError} from "./alert-service";
import APIServices from "./APIServices";



export class CatalogHelper{

    public async getProjects(): Promise<OptionDto[] | any> {
        let apiService = new MasterDataService();
        let projects:OptionDto[] | any =  await apiService.getProjects()
        return projects.data;
    }

    getCategories(): OptionDto[] | any {
        let apiService = new MasterDataService();
        apiService.getCategories().then(response=>{
            let categories:OptionDto[] | any = [];
            categories = response.data;
            return categories;
        },error=>{
            return [];
        })
    }
    public async getCatalogById(id:string): Promise<CatalogDetailsPayLoadDTO | any>{
        const apiServices = new APIServices();
        return apiServices.getEditedCatalogDetailsByCatlogId(id).then(response=>{
            const catalogData: CatalogDetailsPayLoadDTO | any = response.data.catalogDetailsPayLoadDTO;
            return catalogData;
        },error=>{
            showError("Error processing request ! " + error)

        });
    }

    getSubCategories(): OptionDto[] | any {

    }
}