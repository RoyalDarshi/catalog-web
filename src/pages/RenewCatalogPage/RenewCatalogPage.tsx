import React, {Suspense, useEffect, useRef, useState} from 'react';
import styles from './RenewCatalogPage.module.scss';
import {Box} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControls from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {ChevronRight} from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {styled} from "@mui/material/styles";
import {useLocation, useNavigate} from "react-router-dom";
import Link from "@mui/material/Link";
import DownloadIcon from '@mui/icons-material/Download';
import MuiInput from "@mui/material/Input";
import APIServices from "../../services/APIServices";
import {
    BuPriceTemplateStructureDTO,
    CatalogCrudRequestParam,
    CatalogCrudRequestParamCatalogTypeEnum, CatalogCrudRequestParamPriceListingTypeEnum,
    CatalogDetailsPayLoadDTO,
    OptionDto, TermsDto,
    UpdateCatalogDetailsPayloadDTO
} from "../../services/models/payload-details";
import MasterDataService, {MasterData} from "../../services/MasterDataService";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

import {showError, showInfo, showSuccess} from "../../services/alert-service";
import EditCatalogPriceDetails from '../../components/inner/EditCatalogPriceDetails/EditCatalogPriceDetails';
import {CatalogHelper} from "../../services/catalog-helper";
import {CatalogStatusEnum} from "../../services/models/workflow-data-model";
import {useImmer} from "use-immer";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs, {Dayjs} from "dayjs";


interface ChildComponentProps {
    getCatlogId:(catlogid:string)=>void;
}
const RenewCatalogPage: React.FC<ChildComponentProps>=({getCatlogId})=>  {

    const nevigate=useNavigate();
    const location = useLocation();
    const [projectData, setProjectsData] = useState<OptionDto[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<OptionDto[]>([]);
    const [locationData, setLocationData] = useState<OptionDto[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<OptionDto[]>([]);
    const searchParams = new URLSearchParams(location.search);
    const [editedCatlogDetails, setEditedCatlogDetails] = useState<CatalogDetailsPayLoadDTO>();
    const [itemName, setItemName] = React.useState<string>();
    const [newItemName, setNewItemName] = React.useState<string>();
    const [businessUnits,setBusinessUnits] = useImmer<BuPriceTemplateStructureDTO[] | any>([])
    const [paymentTermData, setPaymentTermsData] = useState<TermsDto[]>([]);
    const [selectedPaymentTerm, setSelectedPaymentTerm] = useState<TermsDto>();
    const [minorUomData, setMinorUomData] = useState<OptionDto[]>([]);
    const [selectedMinorUom, setSelectedMinorUom] = useState<OptionDto>();
    const [endDate, setEndDate] = React.useState<Dayjs>();
    const [showFieldDefaultVal,setShowFieldDefaultVal]=useState(true);
    const [negotiateQty,setNegotiateQty]=useState(editedCatlogDetails?.quantity);
    const [minQty,setMinQty]=useState(editedCatlogDetails?.minimumQuantity);
    const [conRefNo,setConRefNo]=useState(editedCatlogDetails?.contractReferenceNo);
    const [uomQty,setUomQty]=useState(editedCatlogDetails?.uomquantity);
    const [savingAmt,setSavingAmt]=useState(editedCatlogDetails?.savingAmount);
    const [priceType,setPriceType]=useState(CatalogCrudRequestParamPriceListingTypeEnum.Totalprice);
    const [itemType,setItemType]=useState(CatalogCrudRequestParamCatalogTypeEnum.Goods);
    var queryParam:string|null=searchParams?.get('Item');
    var queryParam2:string|null=searchParams?.get('newItem');

    let apiServices: APIServices;
    apiServices = new APIServices();

    const initialized = useRef(false)
    useEffect(() => {
        if(!initialized.current) {
            initialized.current = true
            function fetchData() {

                let masterDataService = new MasterDataService();
                let masterData =  masterDataService.getMasterData()
                let masterDataList:MasterData = new MasterData();

            masterData.then((data: MasterData | any) =>{
                masterDataList = data;

                if(queryParam && queryParam2)
                {
                    setItemName(queryParam?queryParam:"");
                    setNewItemName(queryParam2?queryParam2:"");

                    getCatlogId(queryParam);

                    try {
                    apiServices.getEditedCatalogDetailsByCatlogId(queryParam).then((response:any)=>{
                        const catalogData: any = response.data.catalogDetailsPayLoadDTO;

                        setEditedCatlogDetails(catalogData);
                        setItemType(response.data.catalogType);
                        setPriceType(response.data.priceListingType);
                        const selectedProjectsArray = catalogData.projects.map((item:any) => ({ id: item.id, name: item.name, })); // Set the selected projects in the state
                        setSelectedProjects(selectedProjectsArray);

                        // @ts-ignore
                        setProjectsData(masterDataList?.projects)
                    },(error: string)=>{
                        showError("Error processing request ! " + error)
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                }
            })
                masterData.then((data: MasterData | any) => {
                        masterDataList = data;
                        if (queryParam) // Check if catalogId exists
                        {
                            setItemName(queryParam ? queryParam : "");
                            getCatlogId(queryParam);
                            try {
                                apiServices.getEditedCatalogDetailsByCatlogId(queryParam).then((response: { data: { catalogDetailsPayLoadDTO: any; }; }) => {
                                    const catalogData: any = response.data.catalogDetailsPayLoadDTO;
                                    setEditedCatlogDetails(catalogData);
                                    setBusinessUnits(catalogData.buPriceTemplateStructureDTOS)
                                    // @ts-ignore
                                    setProjectsData(masterDataList?.projects)
                                    const selectedProjectsArray = catalogData.projects.map((item: any) => ({id: item.id, name: item.name})); // Set the selected projects in the state
                                    setSelectedProjects(selectedProjectsArray);
                                    // @ts-ignore
                                    setLocationData(masterDataList?.locations)
                                    const selectedLocationsArray = catalogData.locations.map((item: any) => ({id: item.id, name: item.name})); // Set the selected projects in the state
                                    setSelectedLocations(selectedLocationsArray);

                                    // @ts-ignore
                                    setPaymentTermsData(masterDataList?.paymentTerms)
                                    const selectedPTerm = {paymentTermId: catalogData.paymentTermId, paymentType: catalogData.paymentTerm}
                                    setSelectedPaymentTerm(selectedPTerm);

                                    // @ts-ignore
                                    setMinorUomData(masterDataList?.minorUom)
                                    const selectedMUom = {id: catalogData.minorUOMId, name: catalogData.minorUOM}
                                    setSelectedMinorUom(selectedMUom);
                                    setNegotiateQty(catalogData.quantity);
                                    setMinQty(catalogData.minimumQuantity);
                                    setConRefNo(catalogData.contractReferenceNo);
                                    setUomQty(catalogData.uomQuantity);
                                    setSavingAmt(catalogData.savingAmount);
                                }, (error: string) => {
                                    showError("Error processing request ! " + error)
                                });
                            } catch (error) {
                                console.error('Error fetching data:', error);
                            }
                        }

                    }
                )
            }
            fetchData()
        }
    }, []);
    const handleProjectChange = (event: SelectChangeEvent<typeof selectedProjects>) => {
        const {
            target: {value },
        } = event;
        //setSelectedProjects();
    };
    const handleLocationChange = (event: SelectChangeEvent<typeof selectedLocations>) => {
        const {
            target: {value },
        } = event;
    };
    const handleTextChange = (event: any, from: string) => {

        switch (from) {
            case "Negotiated Quantity":
                setNegotiateQty(event);
                break;
            case "Minimum Quantity":
                setMinQty(event);
                break;
            case "Con Ref No":
                setConRefNo(event);
                break;
            case "UOM Quantity":
                setUomQty(event);
                break;
            case "Savings Amount":
                setSavingAmt(event);
                break;
            case "Contact Reference No":
                setConRefNo(event);
                break;
            default:
                // Handle unknown "from" values or other cases as needed
                break;
        }
    };
    const handleChange = (event: any, from: string) => {
        setShowFieldDefaultVal(false);
        switch (from) {
            case "Payment Terms":
                setSelectedPaymentTerm((prevSelected) => ({
                    ...prevSelected,
                    paymentTermId: event.paymentTermId,
                    paymentType: event.paymentType// Assuming event is the new selected value's ID
                }));
                break;
            case "Minor Uom":
                setSelectedMinorUom((prevSelected) => ({
                    ...prevSelected,
                    id: event.id,
                    name:event.name// Assuming event is the new selected value's ID
                }));
                break;
        }
    };
    const Item = styled(Box)(() => ({
        textAlign: 'left',
        marginBottom: '16px',
    }));
    const NumberInput = styled(TextField)(({ theme }) => ({
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
        },
        "& input[type=number]": {
            MozAppearance: "textfield",
        },
    }));
    const Input = styled(MuiInput)(({ theme }) => ({
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
        },
        "& input[type=number]": {
            MozAppearance: "textfield",
        },
    }));
    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#EFF7FE',
            color: '#2E3133',

        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
            fontWeight: 400,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const handleUpdateBusinessUnits= (data:any) => {
        setBusinessUnits(data)
    }
    const handleSubmitDraft = () => {
        const payload = {
            ...getPayloadForEdit(CatalogStatusEnum.DRAFT),
            buyerMainCatalogId: queryParam2, // Include buyerMainCatalogId
        };

        apiServices.updateCatalog(JSON.stringify(payload)).then(() => {
            nevigate("/");
            showSuccess("Item/Service is saved as draft successfully.");
        },error=>{
            showError(JSON.stringify(error))
        });
    }


    const handleSubmit = () => {
        const payload = {
            ...getPayloadForEdit(CatalogStatusEnum.PENDING),
            buyerMainCatalogId: queryParam2, // Include buyerMainCatalogId
        };

        apiServices.updateCatalog(JSON.stringify(payload)).then(() => {
            nevigate("/");
            showSuccess("Item/Service is created successfully.");
        },error=>{
            showError(JSON.stringify(error))
        });
    }

    const getPayloadForEdit = (status: number) => {

        let updateCatalogDetails = new UpdateCatalogDetailsPayloadDTO();

        updateCatalogDetails.catalogId = queryParam2 || ''; // Use an empty string as a fallback
        updateCatalogDetails.paymentTerm = selectedPaymentTerm?.paymentType|| editedCatlogDetails?.paymentTerm;
        updateCatalogDetails.paymentTermId = selectedPaymentTerm?.paymentTermId||editedCatlogDetails?.paymentTermId || '';
        updateCatalogDetails.minorUom = selectedMinorUom?.name||editedCatlogDetails?.minorUOM;
        updateCatalogDetails.minorUomId = selectedMinorUom?.id||editedCatlogDetails?.minorUOMId;
        updateCatalogDetails.validityEndDate=endDate?.toString()||editedCatlogDetails?.endDate;
        updateCatalogDetails.negotiatedQuantity=negotiateQty
        updateCatalogDetails.uomQuantity=uomQty||editedCatlogDetails?.uomquantity;
        updateCatalogDetails.minimumQuantity=minQty;
        updateCatalogDetails.savingAmount=savingAmt;
        // check for null before sending
        updateCatalogDetails.priceTemplateStructureDTOS = businessUnits
        return updateCatalogDetails;
    }
    const [isReadOnly,setIsReadOnly]=useState(true);
    return(
        <Box className={styles.RenewCatalogPage} data-testid="RenewCatalogPage">
            <Box className={styles.PagePadding}>
                <Typography className="TopPagePath"><Link onClick={() => {
                    nevigate('/')
                }} className="PageLink">My Catalog</Link>&nbsp;<ChevronRight/>&nbsp;Update
                    Items/Services</Typography>
            </Box>
            <Box className={styles.CatalogItem}>
                <Box>
                    <Box className={styles.RowItem}>
                        <Box className={styles.InputItem}>
                            <FormLabel className={styles.FormLabel} htmlFor="Project">Project</FormLabel>
                            <Box className={styles.SelectComp}>
                                <FormControls
                                    className={styles.FormCtrl}
                                    size="small"
                                >

                                    <Select
                                        labelId="project-select-label"
                                        id="project-select"
                                        //label="Select Project"
                                        className="SelectText"
                                        onChange={handleProjectChange}
                                        displayEmpty={true}
                                        value={selectedProjects}
                                        multiple={true}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <Typography className="MenuItem">Select Project</Typography>;
                                            }
                                            return selected.map(item => item.name).join(",");
                                        }}

                                    >

                                        {projectData.map((item) => (
                                            // @ts-ignore
                                            <MenuItem className="SelectText"
                                                      value={item}
                                                      key={item.id}
                                                      name={item.name}>
                                                <ListItemIcon>
                                                    <Checkbox checked={selectedProjects.some((selectedItem) => {
                                                        return selectedItem.id === item.id; })} />                                                </ListItemIcon>
                                                <ListItemText  primary={item.name}/>
                                            </MenuItem>

                                        ))}
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box>
                            <FormControls disabled={isReadOnly}>

                                <FormLabel className={styles.FormLabel} id="item-type-label">
                                    Item Type&nbsp;<Typography className={styles.Span}>*</Typography>
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="goods-label"
                                    name="goods-radio"
                                    value={itemType}

                                >
                                    <FormControlLabel
                                        value={CatalogCrudRequestParamCatalogTypeEnum.Goods}
                                        control={<Radio />}
                                        label={<Typography className="SelectText">Goods</Typography>}
                                    />
                                    <FormControlLabel
                                        value={CatalogCrudRequestParamCatalogTypeEnum.Services}
                                        control={<Radio />}
                                        label={<Typography className="SelectText">Services</Typography>}
                                        className="SelectText"
                                    />
                                </RadioGroup>
                            </FormControls>
                        </Box>
                    </Box>
                    <Box className={styles.RowItem}>
                        <Box className={styles.InputItem}>
                            <FormLabel className={styles.FormLabel} >Category&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    required={true}
                                    className={`${styles.FormCtrl}`}
                                    size="small"
                                    fullWidth
                                >

                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        required={true}
                                        className="SelectText"
                                        displayEmpty={true}
                                        defaultValue={"none"}
                                    >
                                        <MenuItem  value={"none"} disabled={true} >
                                            <Typography className="MenuItem">{editedCatlogDetails?.categoryName}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.InputItem}>
                            <FormLabel className={styles.FormLabel} >Sub Category&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormCtrl}
                                    disabled={isReadOnly}
                                    size="small"
                                >

                                    <Select
                                        labelId="sub-category-select-label"
                                        id="sub-category-select"
                                        className="SelectText"
                                        defaultValue={""}
                                        required={true}
                                        displayEmpty={true}
                                    >
                                        <MenuItem value={""} selected={true} disabled={true}>
                                            <Typography className="MenuItem">{editedCatlogDetails?.subcategoryName}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box>
                            <FormControls disabled={isReadOnly}>

                                <FormLabel className={styles.FormLabel} id="unit-label">
                                    Price Per&nbsp;<Typography className={styles.Span}>*</Typography>
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="unit-radio-label"
                                    name="unit-radio1111"
                                    value={"perUnit"}
                                >
                                    <FormControlLabel
                                        value="perUnit"
                                        control={<Radio /*onClick={()=>setRadioValue("perUnit")}*/ />}
                                        label={<Typography className="SelectText">Per Unit</Typography>}
                                        className="SelectText"
                                    />
                                    {{/*!show*/}&&<FormControlLabel
                                        value="totalUnit"
                                        control={<Radio /*onClick={()=>setRadioValue("totalUnit")}*//>}
                                        label={<Typography className="SelectText">Total Unit</Typography>}
                                        className="SelectText"
                                    />}
                                </RadioGroup>
                            </FormControls>
                        </Box>
                    </Box>
                    <Box className={styles.RowItem}>
                        <Box className={styles.InputItem}>
                            <FormLabel className={styles.FormLabel} htmlFor="L3 Category">L3 Category&nbsp;</FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormCtrl}
                                    size="small"
                                >

                                    <Select
                                        labelId="l3-category-select-label"
                                        id="l3-category-select"
                                        className="SelectText"
                                        defaultValue={""}
                                        displayEmpty={true}
                                    >
                                        <MenuItem value={""}>
                                            <Typography className="MenuItem">{editedCatlogDetails?.l3CategoryName}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.InputItem}>
                            <FormLabel className={styles.FormLabel} htmlFor="Items/Services">Items/Services&nbsp;<span className={styles.Span}>*</span></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormCtrl}
                                    size="small"
                                >

                                    <Select
                                        labelId="item-select-label"
                                        id="item-select"
                                        className="SelectText"
                                        required={true}
                                        defaultValue={""}
                                        displayEmpty={true}
                                    >
                                        <MenuItem value={""} selected={true} disabled={true}>
                                            <Typography className="MenuItem">{editedCatlogDetails?.itemName}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                    </Box>
                    {{/*ItemShow*/}&&<Box className={styles.RowItem}>
                    </Box>}
                    <Box>
                        <Box className={`${styles.RowItem}`}>
                            <Box className={styles.TextAreaWidth}>
                                <FormLabel className={styles.FormLabel} htmlFor="item-desc">Item Description&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                                <Box className={styles.FirstTextArea}>
                                    <TextField disabled={isReadOnly} required={true} fullWidth={true} multiline={true} rows={3}
                                               value={editedCatlogDetails?.description}
                                    />
                                </Box>
                            </Box>
                            <Box className={styles.TextAreaWidth}>
                                <FormLabel className={styles.FormLabel} htmlFor="keywords">Keywords&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                                <Box className={styles.SecTextArea}>
                                    <TextField disabled={isReadOnly} required={true} fullWidth={true} multiline={true} rows={3}
                                               value={editedCatlogDetails?.keyword}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
            <Box className={styles.CatalogSupplier}>
                <Box>
                    <Box className={styles.DisplayFlex}>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Supplier">Supplier&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        className="SelectText"
                                        defaultValue={''}
                                        displayEmpty={true}
                                        required={true}
                                    >
                                        <MenuItem value={""} disabled={true}>
                                            <Typography className="MenuItem">{editedCatlogDetails?.supplierCompanyName}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Supplier Part No">Supplier Part No&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <TextField required={true}
                                               size={"small"}
                                               disabled={isReadOnly}
                                        value={editedCatlogDetails?.supplierPartNo}
                                    >
                                    </TextField>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Shipping Mode">Shipping Mode (mandatory if products)&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        className="SelectText"
                                        //onChange={handleShippingModeChange}
                                        //value={selectedShippingMode}
                                        defaultValue={''}
                                        required={true}
                                        displayEmpty={true}
                                    >
                                        <MenuItem value={""}  disabled={true}>
                                            <Typography className="MenuItem">{editedCatlogDetails?.shipMode}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box className={styles.DisplayFlex}>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Inco Terms">Inco Terms&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        className="SelectText"
                                        defaultValue={''}
                                        displayEmpty={true}
                                        required={true}
                                    >
                                        <MenuItem value={""} disabled={true}>
                                            <Typography className="MenuItem">{editedCatlogDetails?.incoTerm}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Delivery Terms">Delivery Terms&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        className="SelectText"
                                        defaultValue={""}
                                        displayEmpty={true}
                                        required={true}
                                    >
                                        <MenuItem value={""} disabled={true}>
                                            <Typography className="MenuItem">{editedCatlogDetails?.deliveryTerm}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Payment Terms">Payment Terms&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        labelId="payment-terms-select-label"
                                        id="payment-terms-select"
                                        required={true}
                                        className="SelectText"
                                        onChange={(e) => handleChange(e.target.value, 'Payment Terms')}
                                        displayEmpty={true}
                                        value={selectedPaymentTerm}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <Typography className="SelectText">{editedCatlogDetails?.paymentTerm}</Typography>;
                                            }
                                            return selected.paymentType;
                                        }}
                                    >
                                        {paymentTermData.map((item) => (
                                            // @ts-ignore
                                            <MenuItem
                                                className="SelectText"
                                                value={item}
                                                key={item.paymentTermId}
                                                name={item.paymentType}
                                            >
                                                {item.paymentType}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box className={styles.DisplayFlex}>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Start Date">Validity Start Date&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <TextField required={true}
                                               size={"small"}
                                               disabled={isReadOnly}
                                               value={editedCatlogDetails?.startDate}
                                    >
                                    </TextField>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="End Date">Validity End Date&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{ textField: { size: 'small' } }}
                                            onChange={(newValue) => setEndDate(dayjs(newValue))}
                                            value={endDate===undefined?dayjs(editedCatlogDetails?.endDate):endDate}
                                        />
                                    </LocalizationProvider>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Catalogued for Location">Catalogued for Location&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        labelId="location-select-label"
                                        id="location-select"
                                        //label="Select Project"
                                        className="SelectText"
                                        onChange={handleLocationChange}
                                        displayEmpty={true}
                                        value={selectedLocations}
                                        multiple={true}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <Typography className="MenuItem">Select Location</Typography>;
                                            }
                                            return selected.map(item => item.name).join(",");
                                        }}

                                    >

                                        {locationData.map((item) => (
                                            // @ts-ignore
                                            <MenuItem className="SelectText"
                                                      value={item}
                                                      key={item.id}
                                                      name={item.name}>
                                                <ListItemIcon>
                                                    <Checkbox checked={selectedLocations.some((selectedItem) => { const isSelected = selectedItem.id === item.id;
                                                       return isSelected; })} />                                                </ListItemIcon>
                                                <ListItemText  primary={item.name}/>
                                            </MenuItem>

                                        ))}
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box className={styles.DisplayFlex}>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Negotiated Qty">Negotiated Quantity&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <TextField
                                        size="small"
                                        required={true}
                                        value={negotiateQty}
                                        onChange={(event:any)=>handleTextChange(event.target.value,"Negotiated Quantity")}
                                    >
                                    </TextField>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Minimum Qty">Minimum Quantity&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <TextField type={"number"}
                                               size="small"
                                               required={true}
                                                 value={minQty}
                                                 onChange={(event:any)=>handleTextChange(event.target.value,"Minimum Quantity")}
                                    />
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Currency">Currency&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        className="SelectText"
                                        displayEmpty={true}
                                        required={true}
                                        defaultValue={""}
                                    >
                                        <MenuItem value={""} disabled={true}>
                                            <Typography className="MenuItem">{editedCatlogDetails?.currency}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box className={styles.DisplayFlex}>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Contact Reference No">Contact Reference No&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <TextField
                                        size="small"
                                        required={true}
                                        value={conRefNo}
                                        onChange={(event:any)=>handleTextChange(event.target.value,"Con Ref No")}
                                    >
                                    </TextField>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Delivery Lead Time">Delivery Lead Time (days)&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <TextField required={true}
                                               size={"small"}
                                               disabled={isReadOnly}
                                               value={editedCatlogDetails?.deliveryLeadTime}
                                    >
                                    </TextField>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Supplier Location">Supplier Location&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        className="SelectText"
                                        displayEmpty={true}
                                        required={true}
                                        defaultValue={""}
                                    >
                                        <MenuItem value={""} disabled={true}>
                                            <Typography className="MenuItem">{editedCatlogDetails?.supplierLocationName}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box className={styles.DisplayFlex}>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Units">Units&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    disabled={isReadOnly}
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        className="SelectText"
                                        displayEmpty={true}
                                        required={true}
                                        defaultValue={""}
                                    >
                                        <MenuItem value={""} disabled={true}>
                                            <Typography className="MenuItem">{editedCatlogDetails?.unit}</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor={"UOM Quantity"}>UOM Quantity&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <TextField type={"number"}
                                               size="small"
                                               required={true}
                                                 value={uomQty===undefined?editedCatlogDetails?.uomquantity:uomQty}
                                                 onChange={(event:any)=>handleTextChange(event.target.value,"UOM Quantity")}
                                    >
                                    </TextField>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Minor UOM">Minor UOM&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        labelId="minor-uom-select-label"
                                        id="minor-uom-select"
                                        required={true}
                                        className="SelectText"
                                        onChange={(e) => handleChange(e.target.value, 'Minor Uom')}
                                        displayEmpty={true}
                                        value={selectedMinorUom}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <Typography className="SelectText">{editedCatlogDetails?.minorUOM}</Typography>;
                                            }
                                            return selected.name;
                                        }}
                                    >
                                        {minorUomData.map((item) => (
                                            // @ts-ignore
                                            <MenuItem
                                                className="SelectText"
                                                value={item}
                                                key={item.id}
                                                name={item.name}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box className={styles.DisplayFlex}>
                        <Box className={styles.FormInput}>


                            <FormControls disabled={isReadOnly} className={`${styles.DisplayFlex} ${styles.MarginBottom}`}>
                                <FormLabel className={`${styles.FormLabel}`} id="demo-row-radio-buttons-group-label">
                                    UOM Quantity&nbsp;<Typography className={styles.Span}>*</Typography>
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="uom-qty-group-label"
                                    name="uom-qty-buttons-group"
                                    value={priceType}
                                >
                                    <FormControlLabel
                                        value={CatalogCrudRequestParamPriceListingTypeEnum.Totalprice}
                                        control={<Radio/>}
                                        label={<Typography className={styles.RadioText}>Total Price</Typography>}
                                    />
                                    <FormControlLabel
                                        value={CatalogCrudRequestParamPriceListingTypeEnum.Baseprice}
                                        control={<Radio/>}
                                        label={<Typography className={styles.RadioText}>Base Price</Typography>}
                                    />
                                </RadioGroup>
                            </FormControls>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Age">Saving Amount&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <TextField
                                        size="small"
                                        required={true}
                                        value={savingAmt}
                                        onChange={(event:any)=>handleTextChange(event.target.value,"Savings Amount")}
                                    >
                                    </TextField>
                                </FormControls>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={styles.CatalogContent}>

                <Box>
                    <Grid >
                        <Box className={styles.CatalogHeader}>
                            <Grid item className={`${styles.CatalogHeader}`}>
                                <Item className={styles.CatalogHeader}>
                                    <Typography  className={`${styles.FormLabel} ${styles.CatalogWidth}`}>
                                        Contract Document Upload&nbsp;
                                        <Typography className={styles.Span}>*</Typography>
                                    </Typography>


                                </Item>
                            </Grid>
                            <Grid item  className={styles.CatalogHeader}>
                                <Item>
                                    <Link
                                        //component="label"
                                        className={styles.UploadBtn}
                                        //onClick={openModal}
                                        href={""}
                                        download={"File.docx"}

                                    >
                                        2MB Docx File.docx&nbsp;
                                        <DownloadIcon />
                                    </Link>
                                </Item>
                            </Grid>
                        </Box>
                        <Box className={styles.CatalogHeader}>
                            <Grid item className={styles.CatalogHeader}>
                                <Item>
                                    <FormLabel className={`${styles.FormLabel} ${styles.CatalogWidth}`} htmlFor="addDoc">Additional Documents</FormLabel>
                                </Item>
                            </Grid>
                            <Grid item className={styles.CatalogHeader}>
                                <Item >
                                    <Link
                                        //component="label"
                                        className={styles.UploadBtn}
                                        //onClick={openModal}
                                        href={""}
                                        download={"File.docx"}

                                    >
                                        2MB Docx File.docx&nbsp;
                                        <DownloadIcon />
                                    </Link>
                                </Item>
                            </Grid>
                        </Box>
                        <Box className={styles.CatalogHeader}>
                            <Grid item className={styles.CatalogHeader}>
                                <Item>
                                    <FormLabel  className={`${styles.FormLabel} ${styles.CatalogWidth}`} htmlFor="catImg">Catalogue Image</FormLabel>
                                </Item>
                            </Grid>
                            <Grid item className={styles.CatalogHeader}>
                                <Item >
                                    <Link
                                        //component="label"
                                        className={styles.UploadBtn}
                                        //onClick={openModal}
                                        href={""}
                                        download={"File.docx"}

                                    >
                                        2MB Docx File.docx&nbsp;
                                        <DownloadIcon />
                                    </Link>

                                    {/*{ imgFile && (
                                        <Box className={styles.AlignItems}>
                                            {imgFile.map((file: File) => (
                                                <Box className={`${styles.Popup} ${styles.MarginBottom}`}>
                                                    <Box className={styles.CatalogHeader}>
                                                        <Typography className={`${styles.PopupTitle} ${styles.FileName}`}>{file.name}</Typography>
                                                        <Typography className={styles.PopupTitle}>&nbsp;({formatSize(file.size)})</Typography>
                                                    </Box>
                                                    <Box className={styles.AlignItems}>
                                                        <VisibilityIcon onClick={medHandleOpen} className={`${styles.CloseIcon} ${styles.IconGap}`} />
                                                        <Close className={styles.CloseIcon} onClick={()=>removeFile(file)} />
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}*/}

                                </Item>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>



                <Typography
                    className={styles.UploadNote}
                >
                    Note: Please Upload .xls | .xlsx | .doc | .docx | .pdf | .jpeg | .jpg
                    |.png files only
                </Typography>
                {/*<Box>
                    <MediaUpload  isOpen={medOpen} onRequestClose={medHandleClose} onRequestOpen={medHandleOpen} />
                </Box>*/}
            </Box>
            <Box>
                <Box className={styles.MarginTop}>
                    <Box className={styles.Table}>
                        <TableContainer component={Paper}>
                            <Box>
                                <Suspense fallback={"<div>Error loading....</div>"}>
                                    <EditCatalogPriceDetails buyerPriceTemplates={editedCatlogDetails?.buPriceTemplateStructureDTOS
                                        ?editedCatlogDetails?.buPriceTemplateStructureDTOS:[]}
                                                             updateBusinessUnitData={handleUpdateBusinessUnits} isRenew={true}/>
                                </Suspense>

                            </Box>
                        </TableContainer>
                    </Box>
                    <Box className={styles.Footer}>
                        <Box>
                            <Button
                                variant="outlined"
                                size="small"
                                className="Btn"
                                disabled={false}
                                onClick={handleSubmitDraft}
                            >
                                Save as draft
                            </Button>
                        </Box>
                        <Stack
                            spacing={2}
                            direction="row"
                        >
                            <Button
                                variant="outlined"
                                size="small"
                                className="Btn"
                                disabled={false}
                                onClick={() => {
                                    nevigate('/')
                                }}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                className="Btn"
                                size="small"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default RenewCatalogPage;