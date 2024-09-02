import React, {useEffect, useState} from 'react';
import styles from './EditCatalogPriceDetails.module.scss';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from "react-router-dom";
import {GridColDef, GridEventListener} from "@mui/x-data-grid";
import {BuPriceTemplateStructureDTO} from "../../../services/models/payload-details";
import EditBuPriceDetails from "../EditBuPriceDetails/EditBuPriceDetails";
import {v4 as uuidv4} from "uuid";
import AddEditBusinessUnit from "../AddEditBusinessUnit/AddEditBusinessUnit";
import {
    addNewBusinessUnit,
    checkIfExists,
    ChildComponentProps, removeBusinessUnit,
    StripedDataGrid,
    updateBusinessUnit,

} from "./EditCatalogPriceDetailsHelper"
import {showError, showSuccess} from "../../../services/alert-service";
import {useImmer} from "use-immer";


const EditCatalogPriceDetails: React.FC<ChildComponentProps> = ({buyerPriceTemplates,isRenew,updateBusinessUnitData}) => {

    const [businesUnitTemplates, setBusinessUnitTemplates] = useImmer<BuPriceTemplateStructureDTO[] | any>([])
    const [openModal, setOpenModal] = useState(false);
    const [editRowData, setEditRowData] = useState<BuPriceTemplateStructureDTO | any>(null); // State to store edited row
    const [selectedBusinesUnit, setSelectedBusinessUnit] = useState<BuPriceTemplateStructureDTO | any>()
    //state variables for the business unit related popup  operations
    const [openBuDialog,setOpenBuDialog] = useState(false)
    const[isNewBu,setIsNewBu] = useState(false)
    // end of business unit related variables

    // methods for business unit related operations

    const modalHandleAddBuClose = () => {
        setOpenBuDialog(false);

    }

    const handleUpdateBusinessUnits = (data:any ) => {

        if(checkIfExists(data,businesUnitTemplates))
        {
            showError("Sorry !! The selected business unit already exists!")
            //setOpenBuDialog(false)
        }
        else{
            let curUnits = [...businesUnitTemplates]
            let updatedUnits = addNewBusinessUnit(data,curUnits)
            setBusinessUnitTemplates(updatedUnits)
            updateBusinessUnitData(businesUnitTemplates) // send to edit page for save
            setOpenBuDialog(false)
            setEditRowData(undefined)
        }

    }

    const handleRefreshBusinessUnits = (data:any ) => {
        let curUnits = [...businesUnitTemplates]
        let updatedList = updateBusinessUnit(data,curUnits)
        setBusinessUnitTemplates(updatedList)
        showSuccess("Business Unit Updated Successfully")
        setEditRowData(undefined)
        updateBusinessUnitData(businesUnitTemplates)
    }
    const rowDelete = (rowData: any) => {

        let curUnits = [...businesUnitTemplates]
        let updatedList = removeBusinessUnit(rowData,curUnits)
        setBusinessUnitTemplates(updatedList)

        setEditRowData(undefined)
        updateBusinessUnitData(businesUnitTemplates)
    }


    const handleSaveBuPriceDetails = (priceDetails: any, businesUnitId: string) => {

        // update particular business unit array
        editRowData.priceStructure = priceDetails?.map((item: any) => {
            return item;
        })
        const currentTemplates = [...businesUnitTemplates]
        let updated =  updateBusinessUnit(editRowData,currentTemplates)
        setBusinessUnitTemplates(updated)
        updateBusinessUnitData(businesUnitTemplates)
        showSuccess("Price Details updated successfully")
    }


    // end of business unit related operations

    useNavigate();

    useEffect(() => {
        if (buyerPriceTemplates) {
            buyerPriceTemplates?.map((bUnit: BuPriceTemplateStructureDTO) => (
                bUnit.priceStructure?.map((ps: any) => {
                    ps.rowUuid = uuidv4()
                    return ps;
                })
            ))

            setBusinessUnitTemplates(buyerPriceTemplates);

        }
    }, [buyerPriceTemplates, setBusinessUnitTemplates]);

    const sendRowData = (rowData: any) => {
        setIsNewBu(true)
        setEditRowData(rowData.priceStructure)
        setSelectedBusinessUnit(rowData)

        setOpenModal(true)
        // openModal(rowData)
    }


    const editRow = (rowData: any) => {
      setIsNewBu(false)
        setEditRowData(rowData); // Set the row data to edit
        setSelectedBusinessUnit(rowData)
        setOpenBuDialog(true)
    };



    const handleEventRowClick: GridEventListener<'rowClick'> = (
        params, // GridRowParams
        event, // MuiEvent<React.MouseEvent<HTMLElement>>
        details, // GridCallbackDetails
    ) => {

        setEditRowData(params.row)

    };

    //check to set empty
    const setCurrentRowEmpty = (currentRow:any) =>{
        setEditRowData(currentRow)
    }

    const modalHandleClose = () => {
        setOpenModal(false)
    }



    const gridColumns: GridColDef[] = [
        {field: 'businessUnitName', flex: 1.5, headerName: 'Business Unit', headerClassName: `${styles.Header}`},
        {field: 'businessUnitId', flex: 1.5, headerName: 'Business Unit Id', headerClassName: `${styles.Header}`},
        {field: 'basePrice', flex: 1.5, headerName: 'Base Price', headerClassName: `${styles.Header}`},
        {field: 'totalPrice', headerName: 'Total Price', flex: 1.5, headerClassName: `${styles.Header}`},
        {
            field: 'action', headerName: 'Action', flex: 1.5, renderCell: (params) => {
                return (<Box>
                    <IconButton className={styles.IconBtn} onClick={() => sendRowData(params.row)} color="primary"
                                arial-label="add item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <circle cx="10" cy="10.5" r="9.5" fill="#0748AE" fillOpacity="0.1" stroke="#0748AE"/>
                            <path
                                d="M10.0231 11.46V10.96H9.52314H7.06543L7.06536 10.96H6.82802C6.62608 10.96 6.5 10.8089 6.5 10.6671C6.5 10.5256 6.62595 10.374 6.8287 10.3733H9.52423H10.0242V9.87329V7.29282C10.0242 7.15127 10.1501 7 10.3522 7C10.5542 7 10.6803 7.15107 10.6803 7.29282V9.87441V10.3744H11.1803H13.8741C14.0757 10.3744 14.2022 10.5261 14.2022 10.6672C14.2022 10.8088 14.0763 10.96 13.8741 10.96H11.1791H10.6791L10.6791 11.4601L10.6792 14.0405C10.6792 14.0405 10.6792 14.0405 10.6792 14.0405C10.6792 14.1821 10.5533 14.3333 10.3512 14.3333C10.1492 14.3333 10.0231 14.1823 10.0231 14.0405V11.46Z"
                                fill="#0748AE" stroke="#0748AE"/>
                        </svg>
                    </IconButton>
                    <IconButton className={styles.IconBtn} onClick={() => editRow(params.row)} color="warning" aria-label="edit item"><EditIcon fontSize="medium" /></IconButton>
                    <IconButton className={styles.IconBtn} color="error" onClick={() => rowDelete(params.row)}
                                aria-label="delete item"><RemoveCircleTwoToneIcon className={styles.RemoveBtn}
                                                                                  fontSize="medium"/></IconButton>
                </Box>)
            }, headerClassName: `${styles.Header} ${styles.MarginLeft}`
        }
    ]
const handleOpenBuDialog = () =>{
    setOpenBuDialog(true)
    setIsNewBu(true)
}



    return (
        <Box>
            <Box className={styles.catalogUnitDetails}>
                <Button className="LinkBtn" onClick={() => handleOpenBuDialog()} variant="text" disabled={isRenew}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7.5" fill={isRenew?"#999":"#0748AE"} fillOpacity="0.1" stroke={isRenew?"#999":"#0748AE"}/>
                        <path
                            d="M7.86507 8.63893V8.13893H7.36507H5.54429L5.54423 8.13886H5.30036C5.22594 8.13886 5.16602 8.07882 5.16602 8.0046C5.16602 7.93072 5.22577 7.86991 5.30113 7.86953H7.3659H7.8659V7.36953V5.30515C7.8659 5.23091 7.92585 5.1709 8.00024 5.1709C8.07466 5.1709 8.13458 5.23094 8.13458 5.30515V7.37042V7.87042H8.63458H10.6983C10.7723 7.87042 10.8327 7.93086 10.8327 8.00468C10.8327 8.07892 10.7727 8.13893 10.6983 8.13893H8.63369H8.13368L8.13369 8.63895L8.13375 10.7033C8.13375 10.7033 8.13375 10.7033 8.13375 10.7033C8.13374 10.7776 8.0738 10.8376 7.99941 10.8376C7.92499 10.8376 7.86507 10.7775 7.86507 10.7033V8.63893Z"
                            fill={isRenew?"#999":"#0748AE"} stroke={isRenew?"#999":"#0748AE"}/>
                    </svg>
                    &nbsp;Add business unit </Button>
            </Box>
            <Box className={styles.Table}>
                <TableContainer component={Box}>
                    <Box>
                        <StripedDataGrid
                            getRowId={(row) => row.businessUnitId}
                            onRowClick={handleEventRowClick}
                            disableRowSelectionOnClick={true}
                            className={styles.DataGrid}
                            columns={gridColumns}
                            rows={businesUnitTemplates ? businesUnitTemplates : []} //["hhh"]
                            columnVisibilityModel={{
                                // Hide columns status and traderName, the other columns will remain visible
                                businessUnitId: false

                            }}


                        />
                    </Box>
                </TableContainer>
            </Box>
            {<Box>
                {<EditBuPriceDetails isOpen={openModal}
                                     onRequestClose={modalHandleClose}
                                     getbusinessUnitRowData={selectedBusinesUnit}
                                     getBasePriceData={handleSaveBuPriceDetails}
                                     buPriceDetailsList={editRowData}/>
                }
            </Box>}
            <Box>
                <AddEditBusinessUnit buOpen={openBuDialog}
                                     onReqClose={modalHandleAddBuClose}
                                     updateBusinessUnits={handleUpdateBusinessUnits}
                                     selectedRowData={editRowData}
                                     refreshBusinessUnits={handleRefreshBusinessUnits}
                              setCurrentRow={setCurrentRowEmpty} setIsNewBu={isNewBu}/>
            </Box>
        </Box>
    );
}


export default EditCatalogPriceDetails;