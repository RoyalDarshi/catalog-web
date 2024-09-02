import {styled} from "@mui/material/styles";
import {DataGrid} from "@mui/x-data-grid";
import {BuPriceTemplateStructureDTO} from "../../../services/models/payload-details";

export const StripedDataGrid = styled(DataGrid)(({theme}) => ({
    '.MuiDataGrid-columnHeaderTitle': {
        fontWeight: 600
    },
    '.MuiDataGrid-row:nth-child(even)': {
        backgroundColor: '#F5F5F5'
    }
}));


export interface ChildComponentProps {
    buyerPriceTemplates: BuPriceTemplateStructureDTO[],
    updateBusinessUnitData: (data:any ) => void;
    isRenew: boolean;
}

export function addNewBusinessUnit(businessUnit:any,currentBusinessUnits:any ){
    let newData = new BuPriceTemplateStructureDTO();
    newData.businessUnitName = businessUnit.businessUnit;
    newData.businessUnitId = businessUnit.businessUnitId;
    newData.basePrice  = businessUnit.basePrice;
    newData.totalPrice = businessUnit.totalPrice;
    newData.priceStructure = [];
    let buUpdatedData = [...currentBusinessUnits]
    buUpdatedData.push(newData)

    return buUpdatedData;
}

export function checkIfExists(businessUnit:any ,currentUnits:any){


    let index = currentUnits.findIndex((item: { businessUnitId: any; }) => item.businessUnitId === businessUnit.businessUnitId)

    return index !== -1;
}

export function updateBusinessUnit(updateBusinessUnit:any,currentBusinessUnits:any ){
    let index = currentBusinessUnits.findIndex((item: { businessUnitId: any; }) => item.businessUnitId === updateBusinessUnit.businessUnitId)

    if(index!==-1)
    {
        currentBusinessUnits[index] = updateBusinessUnit

    }
    return currentBusinessUnits;
}

export function removeBusinessUnit(unitToRemove:any,currentBusinessUnits:any){
    let index = currentBusinessUnits.findIndex((item: { businessUnitId: any; }) => item.businessUnitId === unitToRemove.businessUnitId)
    return currentBusinessUnits.filter((e: any, i: any) => i !== index);
}
