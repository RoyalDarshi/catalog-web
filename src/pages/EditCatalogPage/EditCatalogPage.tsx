import React, {Suspense, useEffect, useRef, useState} from 'react';
import styles from './EditCatalogPage.module.scss';
import {Box} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import FormControls from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {ChevronRight} from '@mui/icons-material';
import TableContainer from '@mui/material/TableContainer';
import Stack from '@mui/material/Stack';
import {useLocation, useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import APIServices from '../../services/APIServices';
import {
    BuPriceTemplateStructureDTO,
    CatalogCrudRequestParam,
    CatalogCrudRequestParamCatalogTypeEnum,
    CatalogCrudRequestParamPriceListingTypeEnum,
    CatalogDetailsPayLoadDTO,
    OptionDto,
    TermsDto
} from '../../services/models/payload-details';
import MasterDataService, {MasterData} from '../../services/MasterDataService';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import {showError, showSuccess} from '../../services/alert-service';
import EditCatalogPriceDetails from '../../components/inner/EditCatalogPriceDetails/EditCatalogPriceDetails';
import {CatalogStatusEnum} from "../../services/models/workflow-data-model";
import {useImmer} from "use-immer";
import dayjs, {Dayjs} from "dayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Item, NumberInput} from './EditPageHelper';

interface ChildComponentProps {
    getCatlogId:(catlogid:string)=>void;
}
const EditCatalogPage: React.FC<ChildComponentProps>=({getCatlogId})=>  {

    const nevigate=useNavigate();

    const location = useLocation();
    const [editedCatlogDetails, setEditedCatlogDetails] = useState<CatalogDetailsPayLoadDTO>();
    const [projectData, setProjectsData] = useState<OptionDto[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<OptionDto[]>([]);
    const [CategoryData, setCategoriesData] = useState<TermsDto[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<TermsDto>();
    const [SubCategoryData, setSubCategoriesData] = useState<TermsDto[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<TermsDto>();
    const [L3CategoryData, setL3CategoriesData] = useState<OptionDto[]>([]);
    const [selectedL3Category, setSelectedL3Category] = useState<OptionDto>();
    const [locationData, setLocationData] = useState<OptionDto[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<OptionDto[]>([]);
    const [supLocationData, setSupLocationData] = useState<OptionDto[]>([]);
    const [selectedSupLocation, setSelectedSupLocation] = useState<OptionDto>();
    const [shippingModeData, setShippingModesData] = useState<OptionDto[]>([]);
    const [selectedShippingMode, setSelectedShippingMode] = useState<OptionDto>();
    const [incoTermData, setIncoTermsData] = useState<TermsDto[]>([]);
    const [selectedIncoTerm, setSelectedIncoTerm] = useState<TermsDto>();
    const [deliveryTermData, setDeliveryTermsData] = useState<TermsDto[]>([]);
    const [selectedDeliveryTerm, setSelectedDeliveryTerm] = useState<TermsDto>();
    const [paymentTermData, setPaymentTermsData] = useState<TermsDto[]>([]);
    const [selectedPaymentTerm, setSelectedPaymentTerm] = useState<TermsDto>();
    const [minorUomData, setMinorUomData] = useState<OptionDto[]>([]);
    const [selectedMinorUom, setSelectedMinorUom] = useState<OptionDto>();
    const searchParams = new URLSearchParams(location.search);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemDesc, setItemDesc] = useState<string>('');
    const [keyWords, setKeyWords] = useState<string>('');
    const [itemName, setItemName] = useState<string>('');
    const [startDate, setStartDate] = React.useState<Dayjs>();
    const [endDate, setEndDate] = React.useState<Dayjs>();
    const queryParam: string = searchParams?.get('Item') ?? ''; // Provide a default empty string
    const [businessUnits,setBusinessUnits] = useImmer<BuPriceTemplateStructureDTO[] | any>([])
    const [supPartNo,setSupPartNo]=useState(editedCatlogDetails?.supplierPartNo);
    const [negotiateQty,setNegotiateQty]=useState(editedCatlogDetails?.quantity);
    const [minQty,setMinQty]=useState(editedCatlogDetails?.minimumQuantity);
    const [conRefNo,setConRefNo]=useState(editedCatlogDetails?.contractReferenceNo);
    const [delLeadTime,setDelLeadTime]=useState(editedCatlogDetails?.deliveryLeadTime);
    const [uomQty,setUomQty]=useState(editedCatlogDetails?.uomquantity);
    const [savingAmt,setSavingAmt]=useState(editedCatlogDetails?.savingAmount);
    const [showFieldDefaultVal,setShowFieldDefaultVal]=useState(true);
    const [isRenew,setIsRenew] = useState(true);
    const [itemType,setItemType]=useState(CatalogCrudRequestParamCatalogTypeEnum.Goods);
    const [priceType,setPriceType]=useState(CatalogCrudRequestParamPriceListingTypeEnum.Totalprice);
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

                masterData.then((data: MasterData | any) => {
                        masterDataList = data;

                        if (queryParam) // Check if catalogId exists
                        {
                            setItemName(queryParam ? queryParam : "");
                            getCatlogId(queryParam);
                            try {
                                apiServices.getEditedCatalogDetailsByCatlogId(queryParam).then((response: { data: { catalogDetailsPayLoadDTO: any,catalogType:any,priceListingType:any }; }) => {
                                    const catalogData: any = response.data.catalogDetailsPayLoadDTO;
                                    const catalogType: any = response.data.catalogType;
                                    const priceListingType: any = response.data.priceListingType;
                                    setEditedCatlogDetails(catalogData);
                                    setBusinessUnits(catalogData.buPriceTemplateStructureDTOS)
                                    // @ts-ignore
                                    setProjectsData(masterDataList?.projects)
                                    const selectedProjectsArray = catalogData.projects.map((item: any) => ({id: item.id, name: item.name})); // Set the selected projects in the state
                                    setSelectedProjects(selectedProjectsArray);
                                    // @ts-ignore
                                    setCategoriesData(masterDataList?.categories)
                                    const selectedCat = {id: catalogData.categoryId, name: catalogData.categoryName}
                                    setSelectedCategory(selectedCat);
                                    // @ts-ignore
                                    setSubCategoriesData(masterDataList?.subCategories)
                                    const selectedSubCat = {id: catalogData.subCategoryId, name: catalogData.subCategoryName}
                                    setSelectedSubCategory(selectedSubCat);
                                    // @ts-ignore
                                    setL3CategoriesData(masterDataList?.l3Categories)
                                    const selectedL3Cat =  {id: catalogData.l3CategoryId, name: catalogData.l3CategoryName}
                                    setSelectedL3Category(selectedL3Cat);


                                    // @ts-ignore
                                    setLocationData(masterDataList?.locations)
                                    const selectedLocationsArray = catalogData.locations.map((item: any) => ({id: item.id, name: item.name})); // Set the selected projects in the state
                                    setSelectedLocations(selectedLocationsArray);
                                    // @ts-ignore
                                    setSupLocationData(masterDataList?.locations)
                                    const selectedSupplierLoc = {id: catalogData.supplierLocation, name: catalogData.supplierLocationName}
                                    setSelectedSupLocation(selectedSupplierLoc);
                                    // @ts-ignore
                                    setShippingModesData(masterDataList?.shipmentModes)
                                    const selectedShipMode = {id: catalogData.shipModeId, name: catalogData.shipMode}
                                    setSelectedShippingMode(selectedShipMode);
                                    // @ts-ignore
                                    setIncoTermsData(masterDataList?.incoTerms)
                                    const selectedITerm = {incoTermId: catalogData.incoTermId, incoType: catalogData.incoTerm}
                                    setSelectedIncoTerm(selectedITerm);
                                    // @ts-ignore
                                    setDeliveryTermsData(masterDataList?.deliveryTerms)
                                    const selectedDTerm = {deliveryTermId: catalogData.deliveryTermId, deliveryType: catalogData.deliveryTerm}
                                    setSelectedDeliveryTerm(selectedDTerm);
                                    // @ts-ignore
                                    setPaymentTermsData(masterDataList?.paymentTerms)
                                    const selectedPTerm = {paymentTermId: catalogData.paymentTermId, paymentType: catalogData.paymentTerm}
                                    setSelectedPaymentTerm(selectedPTerm);
                                    // @ts-ignore
                                    setMinorUomData(masterDataList?.minorUom)
                                    const selectedMUom = {id: catalogData.minorUOMId, name: catalogData.minorUOM}
                                    setSelectedMinorUom(selectedMUom);
                                    setItemDesc(catalogData.description);
                                    setKeyWords(catalogData.keyword);
                                    setSupPartNo(catalogData.supplierPartNo);
                                    setNegotiateQty(catalogData.quantity);
                                    setMinQty(catalogData.minimumQuantity);
                                    setConRefNo(catalogData.contractReferenceNo);
                                    setDelLeadTime(catalogData.deliveryLeadTime);
                                    setUomQty(catalogData.uomQuantity);
                                    setSavingAmt(catalogData.savingAmount);
                                    setItemType(catalogType);
                                    setPriceType(priceListingType);
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
    const handleTextChange = (event: any, from: string) => {

        switch (from) {
            case "item-desc":
                setItemDesc(event);
                break;
            case "keywords":
                setKeyWords(event);
                break;
            case "Supplier Part No":
                setSupPartNo(event);
                break;
            case "Negotiated Quantity":
                setNegotiateQty(event);
                break;
            case "Minimum Quantity":
                setMinQty(event);
                break;
            case "Con Ref No":
                setConRefNo(event);
                break;
            case "Del Lead Time":
                setDelLeadTime(event);
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
            case "Item Type":
                setItemType(event);
                break;
            case "Price Type":
                setPriceType(event);
                break;
            default:
                // Handle unknown "from" values or other cases as needed
                break;
        }
    };

    const handleChange = (event: any, from: string) => {
        setShowFieldDefaultVal(false);
        switch (from) {
            case "Projects":
                const selectedOption = event.target.value;
                setSelectedProjects((prevSelected) => {
                    const index = prevSelected.findIndex((item) => item.id === selectedOption.id);
                    if (index === -1) {
                        return [...prevSelected, selectedOption];
                    } else {
                        prevSelected.splice(index, 1);
                        return [...prevSelected];
                    }
                });

                break;
            case "Category":
                setSelectedCategory((prevSelected) => ({
                    ...prevSelected,
                    id: event.id,
                    categoryName:event.categoryName// Assuming event is the new selected value's ID
                }));                break;
            case "Sub Category":
                setSelectedSubCategory((prevSelected) => ({
                    ...prevSelected,
                    subCategoryId: event.subCategoryId,
                    subCategoryName:event.subCategoryName// Assuming event is the new selected value's ID
                }));
                break;
            case "L3 Category":
                setSelectedL3Category((prevSelected) => ({
                    ...prevSelected,
                    id: event.id,
                    name:event.name// Assuming event is the new selected value's ID
                }));
                break;
            case "Inco Terms":
                setSelectedIncoTerm((prevSelected) => ({
                    ...prevSelected,
                    incoTermId:event.incoTermId,
                    incoType:event.incoType// Assuming event is the new selected value's ID
                }));
                break;
            case "Delivery Terms":
                setSelectedDeliveryTerm((prevSelected) => ({
                    ...prevSelected,
                    deliveryTermId: event.deliveryTermId,
                    deliveryType: event.deliveryType// Assuming event is the new selected value's ID
                }));
                break;
            case "Payment Terms":
                setSelectedPaymentTerm((prevSelected) => ({
                    ...prevSelected,
                    paymentTermId: event.paymentTermId,
                    paymentType: event.paymentType// Assuming event is the new selected value's ID
                }));
                break;
            case "Catalouged Location":
                const selectedOptions = event.target.value;
                selectedOptions.isSelected = !selectedOptions.isSelected; // Toggle isSelected
                setSelectedLocations((prevSelected) => {
                    const index = prevSelected.findIndex((item) => item.id === selectedOptions.id);
                    if (index === -1) {
                        return [...prevSelected, selectedOptions];
                    } else {
                        prevSelected.splice(index, 1);
                        return [...prevSelected];
                    }
                });
                break;
            case "Supplier Location":
                setSelectedSupLocation((prevSelected) => ({
                    ...prevSelected,
                    id: event.id,
                    name: event.name// Assuming event is the new selected value's ID
                }));
                break;
            case "Minor Uom":
                setSelectedMinorUom((prevSelected) => ({
                    ...prevSelected,
                    id: event.id,
                    name:event.name// Assuming event is the new selected value's ID
                }));
                break;
            case "Shipping Mode":
                setSelectedShippingMode((prevSelected)=>({
                    ...prevSelected,
                    id:event.id,
                    name:event.name
                }));
                break;
            default:
                // Handle unknown "from" values or other cases as needed
                break;
        }
    };
    const handleUpdateBusinessUnits= (data:any) => {
        setBusinessUnits(data)
    }
    const handleSubmitDraft = () => {
        const payload = {
            ...getPayloadForEdit(CatalogStatusEnum.DRAFT),
            buyerMainCatalogId: queryParam, // Include buyerMainCatalogId
        };

        apiServices.editCatalog(JSON.stringify(payload)).then(() => {
            nevigate("/");
            showSuccess("Item/Service is saved as draft successfully.");
        },error=>{
            showError(JSON.stringify(error))
        });
    }


    const handleSubmit = () => {
        const payload = {
            ...getPayloadForEdit(CatalogStatusEnum.PENDING),
            buyerMainCatalogId: queryParam, // Include buyerMainCatalogId
        };

        apiServices.editCatalog(JSON.stringify(payload)).then(() => {
            nevigate("/");
            showSuccess("Item/Service is created successfully.");
        },error=>{
            showError(JSON.stringify(error))
        });
    }

    const getPayloadForEdit = (status: number) => {

        let catalogRequestParamDto = new CatalogCrudRequestParam();
        let catalogDetailsPayloadDto = new CatalogDetailsPayLoadDTO();
        catalogDetailsPayloadDto.buyerMainCatalogId = queryParam || ''; // Use an empty string as a fallback
        catalogRequestParamDto.catalogType = itemType;
        catalogRequestParamDto.priceListingType = priceType;
        catalogRequestParamDto.catalogDetailsPayLoadDTO = catalogDetailsPayloadDto;
        catalogDetailsPayloadDto.projects = selectedProjects.map(project => ({ id: project.id, name: project.name }));
        catalogDetailsPayloadDto.categoryId = selectedCategory?.id||editedCatlogDetails?.categoryId;
        catalogDetailsPayloadDto.categoryName = selectedCategory?.categoryName||editedCatlogDetails?.categoryName;
        catalogDetailsPayloadDto.subcategoryId = selectedSubCategory?.subCategoryId||editedCatlogDetails?.subcategoryId;
        catalogDetailsPayloadDto.subcategoryName = selectedSubCategory?.subCategoryName||editedCatlogDetails?.subcategoryName;
        catalogDetailsPayloadDto.l3CategoryName = selectedL3Category?.name || '';
        catalogDetailsPayloadDto.l3CategoryId = selectedL3Category?.id || '';
        catalogDetailsPayloadDto.supplierCompanyId=editedCatlogDetails?.supplierCompanyId;
        catalogDetailsPayloadDto.supplierCompanyName=editedCatlogDetails?.supplierCompanyName;
        catalogDetailsPayloadDto.locations = selectedLocations.map(location => ({ id: location.id, name: location.name }));
        catalogDetailsPayloadDto.supplierLocationName = selectedSupLocation?.name || '';
        catalogDetailsPayloadDto.supplierLocation = selectedSupLocation?.id || '';
        catalogDetailsPayloadDto.shipMode = selectedShippingMode?.name || '';
        catalogDetailsPayloadDto.incoTerm = selectedIncoTerm?.incoType || '';
        catalogDetailsPayloadDto.shipModeId = selectedShippingMode?.id || '';
        catalogDetailsPayloadDto.incoTermId = selectedIncoTerm?.incoTermId || '';
        catalogDetailsPayloadDto.deliveryTerm = selectedDeliveryTerm?.deliveryType || '';
        catalogDetailsPayloadDto.paymentTerm = selectedPaymentTerm?.paymentType || '';
        catalogDetailsPayloadDto.deliveryTermId = selectedDeliveryTerm?.deliveryTermId || '';
        catalogDetailsPayloadDto.paymentTermId = selectedPaymentTerm?.paymentTermId || '';
        catalogDetailsPayloadDto.minorUOM = selectedMinorUom?.name || '';
        catalogDetailsPayloadDto.minorUOMId = selectedMinorUom?.id || '';
        catalogDetailsPayloadDto.description=itemDesc;
        catalogDetailsPayloadDto.keyword=keyWords;
        catalogDetailsPayloadDto.supplierPartNo=supPartNo;
        catalogDetailsPayloadDto.startDate=startDate?.toString()||editedCatlogDetails?.startDate;
        catalogDetailsPayloadDto.endDate=endDate?.toString()||editedCatlogDetails?.endDate;
        catalogDetailsPayloadDto.contractReferenceNo=conRefNo;
        catalogDetailsPayloadDto.deliveryLeadTime=delLeadTime;
        catalogDetailsPayloadDto.quantity=negotiateQty;
        catalogDetailsPayloadDto.uomquantity=uomQty||editedCatlogDetails?.uomquantity;
        catalogDetailsPayloadDto.minimumQuantity=minQty;
        catalogDetailsPayloadDto.savingAmount=savingAmt;
        catalogDetailsPayloadDto.itemName=editedCatlogDetails?.itemName;
        catalogDetailsPayloadDto.itemId=editedCatlogDetails?.itemId;
        catalogDetailsPayloadDto.unit=editedCatlogDetails?.unit;
        catalogDetailsPayloadDto.currency=editedCatlogDetails?.currency;
        catalogDetailsPayloadDto.currencyId=editedCatlogDetails?.currencyId;



        catalogDetailsPayloadDto.status = status;
        // check for null before sending
        catalogDetailsPayloadDto.buPriceTemplateStructureDTOS = businessUnits
        return catalogRequestParamDto;
    }
    const [isReadOnly,setIsReadOnly]=useState(true);

    return(
        <Box className={styles.EditCatalogPage} data-testid="EditCatalogPage">
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
                                        multiple
                                        labelId="project-select-label"
                                        id="project-select"
                                        className="SelectText"
                                        onChange={(event) => handleChange(event, "Projects")}
                                        variant="outlined"
                                        displayEmpty={true}
                                        value={selectedProjects}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <Typography className="MenuItem">Select Project</Typography>;
                                            }
                                            return selected.map((item) => item.name).join(",");
                                        }}
                                    >
                                        {projectData.map((item) => (
                                            // @ts-ignore
                                            <MenuItem
                                                className="SelectText"
                                                key={item.id}
                                                value={item}
                                                onClick={() => handleChange({ target: { value: item } }, "Projects")}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox checked={selectedProjects.some((selectedItem) => {
                                                        return selectedItem.id === item.id;
                                                    })} />
                                                </ListItemIcon>
                                                <ListItemText primary={item.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box>
                            <FormControls>
                                <FormLabel className={styles.FormLabel} id="item-type-label">
                                    Item Type&nbsp;<Typography className={styles.Span}>*</Typography>
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="goods-label"
                                    name="goods-radio"
                                    value={itemType}
                                    onChange={(event)=>handleTextChange(event.target.value,"Item Type")}

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
                                        onChange={(e) => handleChange(e.target.value, 'Category')}
                                        displayEmpty={true}
                                        value={selectedCategory}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <Typography className="SelectText">{editedCatlogDetails?.categoryName}</Typography>;
                                            }
                                            return selected.categoryName;
                                        }}
                                    >
                                        {CategoryData.map((item) => (
                                            // @ts-ignore
                                            <MenuItem
                                                className="SelectText"
                                                value={item}
                                                key={item.id}
                                                name={item.categoryName}
                                            >
                                                {item.categoryName}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.InputItem}>
                            <FormLabel className={styles.FormLabel} >Sub Category&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormCtrl}
                                    size="small"
                                >

                                    <Select
                                        labelId="sub-category-select-label"
                                        id="sub-category-select"
                                        required={true}
                                        className="SelectText"
                                        onChange={(e) => handleChange(e.target.value, 'Sub Category')}
                                        displayEmpty={true}
                                        value={selectedSubCategory}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <Typography className="SelectText">{editedCatlogDetails?.subcategoryName}</Typography>;
                                            }
                                            return selected.subCategoryName;
                                        }}
                                    >
                                        {SubCategoryData.map((item) => (
                                            // @ts-ignore
                                            <MenuItem
                                                className="SelectText"
                                                value={item}
                                                key={item.subCategoryId}
                                                name={item.subCategoryName}
                                            >
                                                {item.subCategoryName}
                                            </MenuItem>
                                        ))}
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
                            <Box>
                                <FormControls className={styles.FormCtrl} size="small">
                                    <Select
                                        labelId="L3-category-select-label"
                                        id="L3-category-select"
                                        required={true}
                                        className="SelectText"
                                        onChange={(e) => handleChange(e.target.value, "L3 Category")}
                                        displayEmpty={true}
                                        value={selectedL3Category}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <Typography className="SelectText">{editedCatlogDetails?.l3CategoryName}</Typography>;
                                            }
                                            return selected.name;
                                        }}
                                    >
                                        {L3CategoryData.map((item) => (
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
                        <Box className={styles.InputItem}>
                            <FormLabel className={styles.FormLabel} htmlFor="Items/Services">Items/Services&nbsp;<span className={styles.Span}>*</span></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormCtrl}
                                    size="small"
                                >

                                    <Select
                                        labelId="item-select-label"
                                        id="item-select"
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
                                    <TextField required={true} fullWidth={true} multiline={true} rows={3}
                                               defaultValue={itemDesc}
                                               onChange={(event:any)=>handleTextChange(event.target.value,"item-desc")}
                                    />
                                </Box>
                            </Box>
                            <Box className={styles.TextAreaWidth}>
                                <FormLabel className={styles.FormLabel} htmlFor="keywords">Keywords&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                                <Box className={styles.SecTextArea}>
                                    <TextField required={true} fullWidth={true} multiline={true} rows={3}
                                               defaultValue={keyWords}
                                               onChange={(event:any)=>handleTextChange(event.target.value,"keywords")}
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
                                               value={supPartNo}
                                               onChange={(event:any)=>handleTextChange(event.target.value,"Supplier Part No")}
                                    >
                                    </TextField>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Shipping Mode">Shipping Mode (mandatory if products)&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        labelId="shipping mode-select-label"
                                        id="shipping mode-select"
                                        required={true}
                                        className="SelectText"
                                        onChange={(e) => handleChange(e.target.value, 'Shipping Mode')}
                                        displayEmpty={true}
                                        value={selectedShippingMode}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <Typography className="SelectText">{editedCatlogDetails?.shipMode}</Typography>;
                                            }
                                            return selected.name;
                                        }}
                                    >
                                        {shippingModeData.map((item) => (
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
                            <FormLabel className={styles.FormLabel} htmlFor="Inco Terms">Inco Terms&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        labelId="inco-terms-select-label"
                                        id="inco-terms-select"
                                        required={true}
                                        className="SelectText"
                                        onChange={(e) => handleChange(e.target.value, 'Inco Terms')}
                                        displayEmpty={true}
                                        value={selectedIncoTerm}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <Typography className="SelectText">{editedCatlogDetails?.incoTerm}</Typography>;
                                            }
                                            return selected.incoType;
                                        }}
                                    >
                                        {incoTermData.map((item) => (
                                            // @ts-ignore
                                            <MenuItem
                                                className="SelectText"
                                                value={item}
                                                key={item.incoTermId}
                                                name={item.incoType}
                                            >
                                                {item.incoType}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Delivery Terms">Delivery Terms&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        labelId="delivery-terms-select-label"
                                        id="delivery-terms-select"
                                        required={true}
                                        className="SelectText"
                                        onChange={(e) => handleChange(e.target.value, 'Delivery Terms')}
                                        displayEmpty={true}
                                        value={selectedDeliveryTerm}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <Typography className="SelectText">{editedCatlogDetails?.deliveryTerm}</Typography>;
                                            }
                                            return selected.deliveryType;
                                        }}
                                    >
                                        {deliveryTermData.map((item) => (
                                            // @ts-ignore
                                            <MenuItem
                                                className="SelectText"
                                                value={item}
                                                key={item.deliveryTermId}
                                                name={item.deliveryType}
                                            >
                                                {item.deliveryType}
                                            </MenuItem>
                                        ))}
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
                                    <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{ textField: { size: 'small' } }}
                                            onChange={(newValue) => setStartDate(dayjs(newValue))}
                                            value={startDate===undefined?dayjs(editedCatlogDetails?.startDate):startDate}
                                        />
                                    </LocalizationProvider>
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
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <Select
                                        multiple
                                        labelId="catalog-loc-select-label"
                                        id=" catelog-loc-select"
                                        variant="outlined"
                                        displayEmpty={true}
                                        className="SelectText"
                                        // @ts-ignore
                                        onChange={(e) => handleChange(e, "Catalouged Location")}
                                        value={selectedLocations}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <Typography className="MenuItem">Select</Typography>;
                                            }
                                            return selected.map(item => item.name).join(",");
                                        }}
                                    >
                                        {locationData.map((item) => (
                                            // @ts-ignore
                                            <MenuItem
                                                className="SelectText"
                                                key={item.id}
                                                value={item}
                                                onClick={() => handleChange({ target: { value: item } }, "Catalouged Location")}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox checked={selectedLocations.some((selectedItem) => {
                                                        return selectedItem.id === item.id;
                                                    })} />
                                                </ListItemIcon>
                                                <ListItemText primary={item.name} />
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
                                    <NumberInput type={"number"}
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
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <TextField
                                        size="small"
                                        required={true}
                                        value={conRefNo}
                                        onChange={(event:any)=>handleTextChange(event.target.value,"Contact Reference No")}
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
                                               value={delLeadTime}
                                               onChange={(event:any)=>handleTextChange(event.target.value,"Del Lead Time")}
                                    >
                                    </TextField>
                                </FormControls>
                            </Box>
                        </Box>
                        <Box className={styles.FormInput}>
                            <FormLabel className={styles.FormLabel} htmlFor="Supplier Location">Supplier Location&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >

                                    <Select
                                        labelId="sup-loc-select-label"
                                        id="sup-loc-category-select"
                                        required={true}
                                        className="SelectText"
                                        onChange={(e) => handleChange(e.target.value, 'Supplier Location')}
                                        displayEmpty={true}
                                        value={selectedSupLocation}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <Typography className="SelectText">{editedCatlogDetails?.supplierLocationName}</Typography>;
                                            }
                                            return selected.name;
                                        }}
                                    >
                                        {supLocationData.map((item) => (
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
                            <FormLabel className={styles.FormLabel} htmlFor="Units">Units&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
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
                            <FormLabel className={styles.FormLabel} >UOM Quantity&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box >
                                <FormControls
                                    className={styles.FormControl}
                                    size="small"
                                >
                                    <NumberInput type={"number"}
                                                 size="small"
                                                 required={true}
                                                 value={uomQty===undefined?editedCatlogDetails?.uomquantity:uomQty}
                                                 onChange={(event:any)=>handleTextChange(event.target.value,"UOM Quantity")}
                                    >
                                    </NumberInput>
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


                            <FormControls className={`${styles.DisplayFlex} ${styles.MarginBottom}`}>
                                <FormLabel className={`${styles.FormLabel}`} id="demo-row-radio-buttons-group-label">
                                    UOM Quantity&nbsp;<Typography className={styles.Span}>*</Typography>
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="uom-qty-group-label"
                                    name="uom-qty-buttons-group"
                                    value={priceType}
                                    onChange={(event)=>handleTextChange(event.target.value,"Price Type")}
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
            </Box>
            <Box>
                <Box className={styles.MarginTop}>
                    <Box className={styles.Table}>
                        <TableContainer component={Box}>
                            <Box>
                                <Suspense fallback={"<div>Error loading....</div>"}>
                                    <EditCatalogPriceDetails buyerPriceTemplates={editedCatlogDetails?.buPriceTemplateStructureDTOS
                                        ?editedCatlogDetails?.buPriceTemplateStructureDTOS:[]}
                                                             updateBusinessUnitData={handleUpdateBusinessUnits} isRenew={false}/>
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
export default EditCatalogPage;
