import React, { useState } from 'react';
import styles from './AddBusinessUnit.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MenuItem } from '@mui/material';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import MasterDataService from "../../../services/MasterDataService"
import {toast} from "react-toastify";
import success = toast.success;
import {showError} from "../../../services/alert-service";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MuiInput from "@mui/material/Input";



const { v4: uuidv4 } = require('uuid');


interface ModalProps {
    buOpen: boolean;
    onReqClose: () => void;
    updateBusinessUnits:  (units:any) => any;
    selectedRowData: any;
    businessUnitsList: any;
    refreshBusinessUnits: (units:any) => any;
    existingBusinessUnitIds: string[];
}
interface UnitOption {
    name: string;
    id: string;
}


const NumberInput = styled(MuiInput)(({ theme }) => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}));
const AddBusinessUnit: React.FC<ModalProps> = ({ buOpen, onReqClose, updateBusinessUnits,selectedRowData ,businessUnitsList,refreshBusinessUnits,existingBusinessUnitIds}) => {

    const [unitValues, setUnitValues] = React.useState({
        id:'',
        businessUnit : '',
        basePrice:'',
        totalPrice:'',
        businessUnitId: ''
    });


    const masterDataService = new MasterDataService();
    const [project, setProject] = React.useState('');
    const [UnitData, setUnitsData] = React.useState<UnitOption[]>([]);
    const [unit, setUnit] = React.useState('');
    const [businessUnits,setBusinessUnits] = useState([])
    const [availableUnits, setAvailableUnits] = useState<UnitOption[]>([]);

    const unitHandleChanges = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;

        // Find the corresponding business unit object based on the selected value
        const selectedBusinessUnit = UnitData.find((unit) => unit.name === selectedValue);

        if (selectedBusinessUnit) {
            // Update the selected option and businessUnitId in the state
            setUnit(selectedValue);
            setUnitValues((prevUnitValues) => ({
                ...prevUnitValues,
                businessUnit: selectedValue,
                businessUnitId: selectedBusinessUnit.id, // Set the ID from the selected business unit
            }));
        }
    };

    const fetchUnits = async () => {
        try {
            var unitOptions = await masterDataService.getBusinessUnits()
            if (unitOptions) {
                if (unitOptions.data) {
                    const units: UnitOption[] = unitOptions.data.masterDataDtoList;
                    setUnitsData(units);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    React.useEffect(() => {
        fetchUnits().then((r) => {
            // Exclude the business unit of the selectedRowData from the availableUnits
            const updatedAvailableUnits = availableUnits.filter((unit) => unit.id !== selectedRowData.businessUnitId);
            setAvailableUnits(updatedAvailableUnits);

            // Populate form fields with existing row's data when editing
            if (selectedRowData) {
                setUnitValues({
                    id: selectedRowData.id,
                    businessUnit: selectedRowData.businessUnit,
                    basePrice: selectedRowData.basePrice,
                    totalPrice: selectedRowData.totalPrice,
                    businessUnitId: selectedRowData.businessUnitId,
                });
            }
        });
    }, [buOpen, selectedRowData]);

    const handleChange = (event:any)=>{
        event.preventDefault();
        const {name,value} = event.target;
        setUnitValues((prevState)=>({...prevState,[name]:value}))

    }

    const handleSaveButtonClick = () => {
        if (!unitValues.businessUnitId) {
            showError( 'Selected business unit already exists')
            return;
        }

        if (selectedRowData) {
            if (selectedRowData.id === unitValues.id) {
                refreshBusinessUnits(unitValues);
            } else {
                const newId = uuidv4();
                const updatedUnitValues = {
                    ...unitValues,
                    id: newId,
                };
                updateBusinessUnits(updatedUnitValues);
                setUnitValues({
                    id: '',
                    businessUnit: '',
                    basePrice: '',
                    totalPrice: '',
                    businessUnitId: '',
                });
                setProject('');
            }
        } else {
            const newId = uuidv4();
            const updatedUnitValues = {
                ...unitValues,
                id: newId,
            };
            updateBusinessUnits(updatedUnitValues);
            setUnitValues({
                id: '',
                businessUnit: '',
                basePrice: '',
                totalPrice: '',
                businessUnitId: '',
            });
            setProject('');
        }

        onReqClose();
    };

    const handleEnter=()=>{
        if(selectedRowData){
            unitValues.id = selectedRowData.id;
            unitValues.businessUnit = selectedRowData.businessUnit
            unitValues.basePrice = selectedRowData.basePrice
            unitValues.totalPrice = selectedRowData.totalPrice
            setBusinessUnits(businessUnitsList);
        }
    }

    const handleExit = () =>{
        selectedRowData = null
    }


    const handleClose=()=>{
        setUnitValues({
            id:'',
            businessUnit : '',
            basePrice:'',
            totalPrice:'',
            businessUnitId: ''
        })
        setProject('');

        onReqClose();
    }


    const gridColumns: GridColDef[] = [
        {
            field: 'action', headerName: 'Business Unit', flex: 3, renderCell: () => {
                return (<Box>
                    <Select
                        labelId="business-unit-simple-select-label"
                        id="business-unit-select"
                        value={unit}
                        displayEmpty={true}
                        onChange={unitHandleChanges}
                        className={`${styles.Input} ${styles.SelectPlaceholder}`}
                    >
                        <MenuItem value={""}>
                            <Typography className={styles.MenuItem}>Select Business Unit</Typography></MenuItem>
                        {UnitData.map((item) => (
                            <MenuItem className={styles.SelectMenu}
                                      value={item.name}
                                      disabled={existingBusinessUnitIds.includes(item.id)}
                            >{item.name}

                            </MenuItem>
                        ))}

                    </Select>

                </Box>)
            }, headerClassName: `${styles.Header} ${styles.MarginLeft}`
        },
        { field: 'businessUnitId', headerName: 'BU ID', flex: 3, headerClassName: `${styles.Header}`, renderCell: () => {
                return (
                    <input className={styles.Input} name="businessUnitId" value={unitValues.businessUnitId} onChange={handleChange}/>
                ) } },
        { field: 'basePrice', headerName: 'Base Price', flex: 3, headerClassName: `${styles.Header}`, renderCell: () => {
                return (
                    <NumberInput type={"number"} className={styles.Input} name="basePrice" value={unitValues.basePrice}  onChange={handleChange} />
                ) }},
        { field: 'totalPrice', headerName: 'Total Price', flex: 3, headerClassName: `${styles.Header}`, renderCell: () => {
                return (
                    <NumberInput type={"number"} className={styles.Input} name="totalPrice" value={unitValues.totalPrice} onChange={handleChange}/>
                ) } }

    ]
    const rows=[{id:1}]


    return (
        <Box className={styles.AddBusinessUnit}>
            <Modal
                onTransitionEnter={handleEnter}
                onTransitionExited={handleExit}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={buOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={buOpen}>
                    <Box className={styles.ModalStyle}>
                        <Box>
                            <Box
                                className={styles.ModalTitle}
                            >
                                <Typography className={styles.ModalHeader}>Business Unit</Typography>
                                <Button onClick={handleClose}>
                                    <CloseIcon className={styles.CloseBtn} />
                                </Button>
                            </Box>
                        </Box>
                        <Box>
                            <Box>
                                <Box className={styles.TableContainer}>
                                    <DataGrid  disableRowSelectionOnClick={true} sx={{'.MuiDataGrid-columnHeaderTitle': {
                                            fontWeight: '600 !important'}}} className={styles.DataGrid} columns={gridColumns} rows={rows}
                                               columnVisibilityModel={{
                                                   // Hide columns status and traderName, the other columns will remain visible
                                                   businessUnitId: false

                                               }}
                                    />

                                </Box>
                                <Box className={styles.Footer}>
                                    <Box>
                                    </Box>
                                    <Stack
                                        spacing={2}
                                        direction="row"
                                    >
                                        <Button
                                            variant="contained"
                                            className="Btn"
                                            disabled={false}
                                            size="small"
                                            onClick={handleSaveButtonClick}
                                        >
                                            Save
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
export default AddBusinessUnit;