import React, { FC } from 'react';
import styles from './StatusLog.module.scss';
import {Box, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import {CatalogSummaryDTO} from "../../services/models/CatalogSummaryDTO";
import {styled} from "@mui/material/styles";

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    catalogListItems: CatalogSummaryDTO[];
}
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    '.MuiDataGrid-columnHeaderTitle': {
        fontWeight: 600},
    '.MuiDataGrid-row:nth-child(even)':{
        backgroundColor: '#F5F5F5'
    }
}));

const StatusLog: FC<ModalProps>=({isOpen,onRequestClose,catalogListItems}) => {

    const gridColumns: GridColDef[] = [


        { field: 'buyerMainCatalogId', flex: 2.1, headerName: 'Date', headerClassName: `${styles.Header}` },
        { field: 'supplierCompanyId', flex: 2.1, headerName: 'Name', headerClassName: `${styles.Header}` },
        { field: 'locationId', headerName: 'Designation', flex: 2.1, headerClassName: `${styles.Header}` },
        { field: 'projectId', headerName: 'Actions', flex: 2.1, headerClassName: `${styles.Header}`},
        { field: 'basePrice', headerName: 'Feedback/Messages', flex: 3.6, headerClassName: `${styles.Header}` },
    ]

        return (
            <Box className={styles.StatusLog}>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isOpen}
                    onClose={onRequestClose}
                    closeAfterTransition
                    slots={{backdrop: Backdrop}}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={isOpen}>
                        <Box className={styles.ModalStyle}>
                            <Box className={styles.ModalHeader}>
                                <Typography className={styles.ModalTitle}>
                                    Status Log
                                </Typography>
                                <Button onClick={onRequestClose}>
                                    <CloseIcon/>
                                </Button>
                            </Box>
                           <Box className={styles.Table}>
                                   <Box>
                                       <StripedDataGrid disableRowSelectionOnClick={true} className={styles.DataGrid} columns={gridColumns} rows={["1"]}
                                                 getRowId={(row) => 1}

                                       />
                                   </Box>
                           </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        );
    }

export default StatusLog;
