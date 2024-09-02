import React, {useEffect, useRef, useState} from 'react';
import styles from './EditBuPriceDetails.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import MenuItem from "@mui/material/MenuItem";
import MasterDataService from "../../../services/MasterDataService";
import {showError, showInfo} from "../../../services/alert-service";

import {
    ModalProps,
    StyledTableCell,
    StyledTableRow,
    style,
    calculationTypeOptions,
    NumberInput,
    UnitOption, calculationOnOption, calculationTypeOption
} from "./BuPriceDetailsHelper"


const { v4: uuidv4 } = require('uuid');

const EditBuPriceDetails: React.FC<ModalProps> = ({ isOpen, onRequestClose, getbusinessUnitRowData, getBasePriceData, buPriceDetailsList }) => {


    const [priceLabelData, setPriceLabelData] = React.useState<UnitOption[]>([]);
    const [calculationOnData, setcalculationOnData] = React.useState<calculationOnOption[]>([]);
    const [calculationTypeData, setcalculationTypeData] = React.useState<calculationTypeOption[]>([]);
    const [rows,setrows] =React.useState<any[]>([]);
    const masterDataService = new MasterDataService();
    const [businessUnit, setbusinessUnit] = useState<any>({});
    const [loading,setLoading] = useState(false);

    const initialized = useRef(false)

    React.useEffect(() => {
        if(!initialized.current){
            initialized.current=true
            setLoading(true)
            fetchBasePrice();
            fetchCalculationOn();
            fetchCalculationType();

        }
    }, []);


    useEffect(() => {
        // Update rows when buPriceDetailsList changes
     //   showInfo("Inside useEffect")
        try {
            if (buPriceDetailsList) {

                // const formattedData: any[] = buPriceDetailsList?.priceStructure?.map((item: any) => ({
                //     Id: item.rowUuid || uuidv4(),
                //     PriceLabel: item.compName || '',
                //     PriceType: (item.compType === 0 ? "Amount" : "Percentage") || '',
                //     Value: item.taxVal || '',
                //     CalculationOn: item.calcOn || '',
                //     CalculationType: (item.calcType === 0 ? "Increment" : "Decrement") || ''
                // }));
                //setrows(formattedData);
                buPriceDetailsList.priceStructure!==undefined?setrows(buPriceDetailsList?.priceStructure):setrows([])
;
            } else {
                setrows([])
            }
        }catch (err){
            showError(JSON.stringify(err))
        }
    },[isOpen,buPriceDetailsList])



    const fetchBasePrice = async () => {
            masterDataService.getPriceLabel().then((response: { data: { masterDataDtoList: UnitOption[]; }; }) =>{

                if(response.data)
                {
                    const units: UnitOption[] = response.data.masterDataDtoList;
                    setPriceLabelData(units);
                }

            },(error: any)=>{
                showError(JSON.stringify(error));
            });

    };

    const fetchCalculationOn = async () => {

            const calculationOptions = await masterDataService.getCalculationOn();
            if (calculationOptions) {
                if (calculationOptions.data) {
                    const units: calculationOnOption[] = calculationOptions.data;
                    setcalculationOnData(units);
                }
            }

    };

    const fetchCalculationType = async () => {
        try {
            const calculationType = await masterDataService.getCalculationType();
            if (calculationType) {
                if (calculationType.data) {
                    const units: calculationTypeOption[] = calculationType.data.masterDataDtoList;
                    setcalculationTypeData(units);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const priceTypeOptions = [
        { label: 'Amount', value: '0' },
        { label: 'Percentage', value: '1' },
    ];



    const handleRowInputChange = (index: any, fieldName: any, value: any) => {
        const updatedRows = [...rows];
        updatedRows[index][fieldName] = value;
        updatedRows[index]['businessUnitId'] = businessUnit?.id;

        // Set "Price Type" based on "Price Label"
        if (fieldName === 'compName') {
            switch (value) {
                case 'GST':
                case 'Discount':
                case 'Disc':
                case 'IGST':
                case 'SGST':
                case 'CGST':
                    updatedRows[index]['compType'] = 1;
                    break;
                case 'Freight':
                case 'Base Price':
                case 'SUBT':
                    updatedRows[index]['compType'] = 0;
                    break;
                default:
                    updatedRows[index]['compType'] = ''; // Set to default or leave it empty if needed
            }
        }
        if (fieldName === 'calcType') {
            updatedRows[index]['calcType'] = parseInt(value, 10);
        }
        setrows(updatedRows);
    };

    const addRow = () => {
        setrows((prevVal: any) => [...prevVal, {}])
        const newRowId = uuidv4();
        const newRow = {
            'rowUuid': newRowId,
            'compName': '', // Initialize other properties as needed
            'compType': '',
            'taxVal': '',
            'calcOn': '',
            'calcType': '',
        };
        setrows([...rows, newRow]);
       // showInfo(JSON.stringify(rows))
        setbusinessUnit(buPriceDetailsList)
    }

    const handleSave = () => {
        // Call the parent component function with the updated data
        showInfo(JSON.stringify(rows))


        getBasePriceData(rows,businessUnit.businessUnitId)
        setrows([]);
        // Close the modal or perform other actions as needed
        onRequestClose();
    };

    const handleRemove = (index:any) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setrows(updatedRows);
    };


    const handleCloseButton = () => {
        setrows([]);
        // Close the modal or perform other actions as needed
        onRequestClose();
    }
    let inputRows = [];
    if(rows!==undefined)
    {
        inputRows = rows;
    }
    const showTableRow = inputRows.map((rowData: any, index: any) => (
        <StyledTableRow className={styles.Row}>
            <StyledTableCell className={styles.BodyRow} align="left">
                <FormControl className={styles.FormControl} size="small">
                    <Select
                        labelId="price-select-label"
                        id="price-select"
                        className={styles.Select}
                        value={rowData['compName']}
                        displayEmpty={true}
                        onChange={(e) => handleRowInputChange(index, 'compName', e.target.value)}
                    >
                        <MenuItem value={""} selected={true} disabled={true}>
                            <Typography className={styles.MenuItem}>Select</Typography>
                        </MenuItem>
                        {priceLabelData.map((item: any) => (
                            <MenuItem key={item.compId} value={item.compName}>
                                {item.compName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </StyledTableCell>
            <StyledTableCell className={styles.BodyRow} align="left">
                <FormControl className={styles.FormControl} size="small">
                    <Select
                        labelId="priceType-select-label"
                        id="priceType-select"
                        className={styles.Select}
                        value={rowData['compType']}
                        onChange={(e) => handleRowInputChange(index, 'compType', e.target.value)}
                    >
                        {priceTypeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </StyledTableCell>
            <StyledTableCell className={styles.BodyRow} align="left">
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <NumberInput
                        className={styles.TextField}
                        type={"number"}
                        value={rowData['taxVal'] || 'none'}
                        onChange={(e) => handleRowInputChange(index, 'taxVal', e.target.value)}
                    />
                </Box>
            </StyledTableCell>
            <StyledTableCell className={styles.BodyRow} align="left">
                <FormControl
                    className={styles.FormControl}
                    size="small"
                >
                    <Select
                        labelId="calculationOn-select-label"
                        id="calculationOn-select"
                        className={styles.Select}
                        value={rowData['calcOn'] || 'none'}
                        onChange={(e) => handleRowInputChange(index, 'calcOn', e.target.value)}
                    >
                        <MenuItem value={"none"} selected={true} disabled={true}>
                            <Typography className={styles.MenuItem}>Select</Typography>
                        </MenuItem>
                        {calculationOnData.map((item: any) => (
                            <MenuItem key={item.id} value={item.name}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </StyledTableCell>
            <StyledTableCell className={styles.BodyRow} align="left">
                <FormControl
                    className={styles.FormControl}
                    size="small"
                >
                    <Select
                        labelId="calculationType-select-label"
                        id="calculationType-select"
                        className={styles.Select}
                        value={rowData['calcType'] === 0 ? 0 : 1}
                        // @ts-ignore
                        onChange={(e) => handleRowInputChange(index, 'calcType', parseInt(e.target.value, 10))}
                    >
                    <MenuItem value={"none"} selected={true} disabled={true}>
                            <Typography className={styles.MenuItem}>Select</Typography>
                        </MenuItem>
                        {calculationTypeOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </StyledTableCell>
            <StyledTableCell align="left" className={styles.BodyRow}>
                <Button className={styles.RemoveBtn} onClick={() => handleRemove(index)}>
                    <RemoveCircleOutlineOutlinedIcon
                        className={styles.Span} />
                </Button>
            </StyledTableCell>
        </StyledTableRow>
    ));

    return (
        <Box className={styles.BuPriceDetails}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={handleCloseButton}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={isOpen}>
                    <Box sx={style}>
                        <Typography>
                            <Box
                                className={styles.ModalTitle}
                            >
                                <Typography className={styles.ModalHeader}>Header</Typography>
                                <Button onClick={handleCloseButton}>
                                    <CloseIcon sx={{ color: '#090D0D' }} />
                                </Button>
                            </Box>
                        </Typography>
                        <Box>
                            <Box>

                                <Box className={styles.TableContainer}>
                                    <TableContainer component={Box}>
                                        <Table
                                            className={styles.Table}
                                            aria-label="customized table"
                                        >
                                            <TableHead className={styles.TableHead}>
                                                <TableRow>
                                                    <StyledTableCell className={styles.HeadRow}>Price
                                                        Label</StyledTableCell>
                                                    <StyledTableCell className={styles.HeadRow} align="left">
                                                        Price Type (Amount/Percentage)
                                                    </StyledTableCell>
                                                    <StyledTableCell className={styles.HeadRow}
                                                                     align="left">Value</StyledTableCell>
                                                    <StyledTableCell className={styles.HeadRow} align="left">Calculation On</StyledTableCell>
                                                    <StyledTableCell className={styles.HeadRow} align="left">Calculation Type</StyledTableCell>
                                                    <StyledTableCell className={styles.HeadRow}
                                                                     align="left">Add/Remove</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody
                                                className={styles.TableBody}
                                            >
                                                <StyledTableRow className={styles.Row}>
                                                    <StyledTableCell className={styles.BodyRow} component="th"
                                                                     scope="row">
                                                        Base Price
                                                    </StyledTableCell>
                                                    <StyledTableCell className={styles.BodyRow} align="left">
                                                        Amount/Percentage
                                                    </StyledTableCell>
                                                    <StyledTableCell className={`${styles.BodyRow} ${styles.InputWidth}`} align="left">
                                                        Enter Base Price
                                                    </StyledTableCell>
                                                    <StyledTableCell className={styles.BodyRow}
                                                                     align="left">NA</StyledTableCell>
                                                    <StyledTableCell className={styles.BodyRow}
                                                                     align="left">NA</StyledTableCell>
                                                    <StyledTableCell align="left" className={styles.BodyRow}>
                                                        <Button className={styles.AddBtn} onClick={addRow}>
                                                            <AddCircleOutlineIcon />
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                {showTableRow}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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
                                            onClick={handleSave}
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

export default EditBuPriceDetails;
