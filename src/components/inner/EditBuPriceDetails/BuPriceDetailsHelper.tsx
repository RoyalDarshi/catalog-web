
// Create a export constant array with "INCREMENT" and "DECREMENT" values
import {styled} from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, {useRef, useState} from "react";
import MasterDataService from "../../../services/MasterDataService";

export const calculationTypeOptions = [
    { id: 0, name: "INCREMENT" },
    { id: 1, name: "DECREMENT" },
];


export interface UnitOption {
    name: string;
    id: string;
}

export interface calculationOnOption {
    name: string;
    id: string;
    type: string;
}

export interface calculationTypeOption {
    calculationType: number;
    clientId: string;
    comDefault: boolean;
    compId: string;
    compName: string;
    compType: number;
    createdBy: string;
    createdDate: number;
    status: number;
    taxable: boolean;
}

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    borderRadius: '4px',
    boxShadow: 24,
};
export const NumberInput = styled(MuiInput)(({ theme }) => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}));
export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#EFF7FE',
        color: '#2E3133',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        fontWeight: 400,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    getbusinessUnitRowData: () => any;
    getBasePriceData: (rows: any,buId:string) => any;
    buPriceDetailsList: any;

}




export function updatePriceDetails(currentBusinessUnit:any,priceDetails:any ,isNew:boolean){

    return currentBusinessUnit;
}
