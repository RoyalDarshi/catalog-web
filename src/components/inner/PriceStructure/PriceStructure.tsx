import React, {FC, useEffect, useState} from 'react';
import styles from './PriceStructure.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {CatalogPriceStructureDTO} from "../../../services/models/CatalogPriceStructureDTO";
import APIServices from "../../../services/APIServices";






const StripedDataGrid = styled(DataGrid)(() => ({
    '.MuiDataGrid-columnHeaderTitle': {
        fontWeight: 600},
    '.MuiDataGrid-row:nth-child(even)':{
        backgroundColor: '#F5F5F5'
    }
}));



interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    priceData: any;
}

const PriceStructure:FC<ModalProps>=({isOpen,onRequestClose,priceData})=> {
    const currency=priceData.catalogDetailsPayLoadDTO?.currency;
    const gridColumns: GridColDef[] = [

        { field: 'compName', flex: 6,renderCell:(params)=>(
            <Box>{params.row.compType===1?params.row.compName+` (${params.row.taxVal}%)`:params.row.compName}</Box>
            ), headerName: 'Price Label', headerClassName: `${styles.Header}` },
        { field: `rowCalcTax+currency`,renderCell: (params) => (
                <div>
                    {params.row.rowCalcTax} {currency}
                </div>
            ), flex: 6, headerName: 'Price Value', headerClassName: `${styles.Header}` },
    ]


    return(
        <Box >
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={onRequestClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
                className={styles.PriceStructure}
            >
                <Fade in={isOpen}>
                    <Box className={styles.ModalStyle}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <Box className={styles.ModalTitle}>
                                <Box
                                    className={styles.Title}
                                >
                                    Price Structure
                                </Box>
                                <Button onClick={onRequestClose}>
                                    <CloseIcon className={styles.TitleColor}/>
                                </Button>
                            </Box>
                        </Typography>
                        <Box className={styles.TableWidth} >
                            <Typography id="transition-modal-description" className={styles.TableMargin}>
                                <TableContainer component={Box}>
                                    <Box className={styles.Scroll}>{
                                        priceData.catalogDetailsPayLoadDTO?.buPriceTemplateStructureDTOS.map(
                                            (item:any)=>{
                                                return <>
                                                    <Typography className={styles.BUName}>{item.businessUnitName}</Typography>
                                                    <StripedDataGrid  editMode={"cell"}
                                                          disableRowSelectionOnClick={true}
                                                                      hideFooter={true}
                                                          className={styles.DataGrid} columns={gridColumns} rows={item.priceStructure}
                                                          getRowId={row => row.rowCalcTax+row.compName}
                                                    />
                                                </>
                                            })}
                                    </Box>
                                </TableContainer>
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

export default PriceStructure;