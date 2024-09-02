import React, { useState, useEffect } from 'react';
import {Box, CircularProgress, Tab, Tabs, ThemeProvider, Typography} from "@mui/material";
import ResultView from "../inner/ResultView/ResultView";
import styles from "./CatalogTabPanel.module.scss"
import { EffigoColorTheme } from "../../themes/themes";
import APIServices from "../../services/APIServices"
import { WorkFlowDataModelTypeEnum } from '../../services/models/workflow-data-model'
import CatalogFilterPanel from "../CatalogFilterPanel/CatalogFilterPanel";
import {CatalogListViewStates} from "../../services/models/uistates";
import {CatalogSummaryDTO} from "../../services/models/CatalogSummaryDTO";
import Backdrop from "@mui/material/Backdrop";
import {showError} from "../../services/alert-service";
import { Console } from 'console';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
type FilterObject={
    project:any,
    category:string,
    location:string,
    supplier:string,
    businessunit:string

}
interface CatalogTabPanelProps {
    filterString: string;  // New prop to accept filter string
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tab-panel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}

        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tab-panel-${index}`,
    };
}

const CatalogTabPanel: React.FC<CatalogTabPanelProps> = ({filterString}) => {
    // backdrop  component
    const [open, setOpen] = React.useState(false);
    
    const [filteredData, setFilteredData] = useState<CatalogSummaryDTO[]>([]);
    const [value, setValue] = useState(0);
    const [tabListData, setTabListData] = useState<CatalogSummaryDTO[]>([]);
    
    const apiServices = new APIServices();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
     fetchTabDataByWorkFLowStatus(newValue.toString());
    };

    const fetchTabDataByWorkFLowStatus = async (workflowStatus: string) => {
        setOpen(true)
        try {
            let tab="";
            switch (workflowStatus) {
                case "0":
                    tab=  WorkFlowDataModelTypeEnum.APPROVED
                     break;
                     case "1":
                        tab= WorkFlowDataModelTypeEnum.FAVOURITES
                        break;
                    case "2":
                        tab= WorkFlowDataModelTypeEnum.REJECTED
                        break;
                    case "3":
                        tab= WorkFlowDataModelTypeEnum.PENDING
                        break;
                    case "4":
                        tab= WorkFlowDataModelTypeEnum.INFO_REQUEST
                        break;
                    case "5":
                        tab= WorkFlowDataModelTypeEnum.DRAFT
                        break;
                    case "6":
                        tab= WorkFlowDataModelTypeEnum.EXPIRED
                        break;
                }
            // var catlogTabList = await apiServices.getTabsListData(tab)
            var catlogTabList = [
  {
    "buyerMainCatalogId": "12345",
    "itemName": "Sample Item 1",
    "materialCode": "MAT001",
    "imageName": "sample_image_1.png",
    "contractDoc": "contract_1.pdf",
    "unit": "pcs",
    "quantity": "100",
    "status": 1,
    "minimumQuantity": 10,
    "businessUnitId": "BU001",
    "businessUnit": "Sales",
    "description": "This is a sample item description 1.",
    "categoryId": "CAT001",
    "category": "Electronics",
    "supplierLocation": "LOC001",
    "supplierLocationName": "Warehouse A",
    "supplierCompanyId": "SUP001",
    "supplierCompanyName": "Supplier Inc.",
    "paymentTerm": "Net 30",
    "locationId": "LOC002",
    "location": "Main Office",
    "projectId": "PROJ001",
    "projectName": "Project Alpha",
    "basePrice": "100.00",
    "currency": "USD",
    "clientId": "clientId",
    "favourite": 1,
    "priceListingType": 2,
    "finalCost": "120.00",
    "catalogType": 1,
    "cartItemCount": 5
  },
  {
    "buyerMainCatalogId": "12346",
    "itemName": "Sample Item 2",
    "materialCode": "MAT002",
    "imageName": "sample_image_2.png",
    "contractDoc": "contract_2.pdf",
    "unit": "pcs",
    "quantity": "200",
    "status": 2,
    "minimumQuantity": 20,
    "businessUnitId": "BU002",
    "businessUnit": "Marketing",
    "description": "This is a sample item description 2.",
    "categoryId": "CAT002",
    "category": "Furniture",
    "supplierLocation": "LOC002",
    "supplierLocationName": "Warehouse B",
    "supplierCompanyId": "SUP002",
    "supplierCompanyName": "Supplier Co.",
    "paymentTerm": "Net 45",
    "locationId": "LOC003",
    "location": "Branch Office",
    "projectId": "PROJ002",
    "projectName": "Project Beta",
    "basePrice": "200.00",
    "currency": "EUR",
    "clientId": "clientId",
    "favourite": 0,
    "priceListingType": 1,
    "finalCost": "220.00",
    "catalogType": 2,
    "cartItemCount": 10
  },
  {
    "buyerMainCatalogId": "12347",
    "itemName": "Sample Item 3",
    "materialCode": "MAT003",
    "imageName": "sample_image_3.png",
    "contractDoc": "contract_3.pdf",
    "unit": "pcs",
    "quantity": "150",
    "status": 1,
    "minimumQuantity": 15,
    "businessUnitId": "BU003",
    "businessUnit": "HR",
    "description": "This is a sample item description 3.",
    "categoryId": "CAT003",
    "category": "Office Supplies",
    "supplierLocation": "LOC003",
    "supplierLocationName": "Warehouse C",
    "supplierCompanyId": "SUP003",
    "supplierCompanyName": "Supplier LLC",
    "paymentTerm": "Net 60",
    "locationId": "LOC004",
    "location": "Remote Office",
    "projectId": "PROJ003",
    "projectName": "Project Gamma",
    "basePrice": "150.00",
    "currency": "GBP",
    "clientId": "clientId",
    "favourite": 1,
    "priceListingType": 3,
    "finalCost": "170.00",
    "catalogType": 3,
    "cartItemCount": 7
  },
  {
    "buyerMainCatalogId": "12348",
    "itemName": "Sample Item 4",
    "materialCode": "MAT004",
    "imageName": "sample_image_4.png",
    "contractDoc": "contract_4.pdf",
    "unit": "pcs",
    "quantity": "300",
    "status": 2,
    "minimumQuantity": 30,
    "businessUnitId": "BU004",
    "businessUnit": "Finance",
    "description": "This is a sample item description 4.",
    "categoryId": "CAT004",
    "category": "IT Equipment",
    "supplierLocation": "LOC004",
    "supplierLocationName": "Warehouse D",
    "supplierCompanyId": "SUP004",
    "supplierCompanyName": "Supplier Ltd.",
    "paymentTerm": "Net 15",
    "locationId": "LOC005",
    "location": "Headquarters",
    "projectId": "PROJ004",
    "projectName": "Project Delta",
    "basePrice": "300.00",
    "currency": "INR",
    "clientId": "clientId",
    "favourite": 0,
    "priceListingType": 2,
    "finalCost": "330.00",
    "catalogType": 1,
    "cartItemCount": 12
  },
  {
    "buyerMainCatalogId": "12349",
    "itemName": "Sample Item 5",
    "materialCode": "MAT005",
    "imageName": "sample_image_5.png",
    "contractDoc": "contract_5.pdf",
    "unit": "pcs",
    "quantity": "250",
    "status": 1,
    "minimumQuantity": 25,
    "businessUnitId": "BU005",
    "businessUnit": "Operations",
    "description": "This is a sample item description 5.",
    "categoryId": "CAT005",
    "category": "Machinery",
    "supplierLocation": "LOC005",
    "supplierLocationName": "Warehouse E",
    "supplierCompanyId": "SUP005",
    "supplierCompanyName": "Supplier Group",
    "paymentTerm": "Net 30",
    "locationId": "LOC006",
    "location": "Regional Office",
    "projectId": "PROJ005",
    "projectName": "Project Epsilon",
    "basePrice": "250.00",
    "currency": "JPY",
    "clientId": "clientId",
    "favourite": 1,
    "priceListingType": 1,
    "finalCost": "275.00",
    "catalogType": 2,
    "cartItemCount": 8
  },
  {
    "buyerMainCatalogId": "12350",
    "itemName": "Sample Item 6",
    "materialCode": "MAT006",
    "imageName": "sample_image_6.png",
    "contractDoc": "contract_6.pdf",
    "unit": "pcs",
    "quantity": "400",
    "status": 2,
    "minimumQuantity": 40,
    "businessUnitId": "BU006",
    "businessUnit": "Logistics",
    "description": "This is a sample item description 6.",
    "categoryId": "CAT006",
    "category": "Packaging",
    "supplierLocation": "LOC006",
    "supplierLocationName": "Warehouse F",
    "supplierCompanyId": "SUP006",
    "supplierCompanyName": "Supplier Partners",
    "paymentTerm": "Net 45",
    "locationId": "LOC007",
    "location": "Satellite Office",
    "projectId": "PROJ006",
    "projectName": "Project Zeta",
    "basePrice": "400.00",
    "currency": "CNY",
    "clientId": "clientId",
    "favourite": 0,
    "priceListingType": 3,
    "finalCost": "440.00",
    "catalogType": 3,
    "cartItemCount": 15
  },
  {
    "buyerMainCatalogId": "12351",
    "itemName": "Sample Item 7",
    "materialCode": "MAT007",
    "imageName": "sample_image_7.png",
    "contractDoc": "contract_7.pdf",
    "unit": "pcs",
    "quantity": "350",
    "status": 1,
    "minimumQuantity": 35,
    "businessUnitId": "BU007",
    "businessUnit": "Procurement",
    "description": "This is a sample item description 7.",
    "categoryId": "CAT007",
    "category": "Raw Materials",
    "supplierLocation": "LOC007",
    "supplierLocationName": "Warehouse G",
    "supplierCompanyId": "SUP007",
    "supplierCompanyName": "Supplier Network",
    "paymentTerm": "Net 60",
    "locationId": "LOC008",
    "location": "Field Office",
    "projectId": "PROJ007",
    "projectName": "Project Eta",
    "basePrice": "350.00",
    "currency": "KRW",
    "clientId": "clientId",
    "favourite": 1,
    "priceListingType": 2,
    "finalCost": "385.00",
  }]
            if (catlogTabList) {
               let catlogList: CatalogSummaryDTO[] = catlogTabList;
               setTabListData(catlogList);
               setFilteredData(catlogList);
                setOpen(false)

            }
        } catch (error) {

            showError('Error fetching data:' +  error);
            setOpen(false)
        }
    };

    const filterCatlogData = async (filterStringInput: string) => {
        try {
            if (filterStringInput) {
                let data: any = filteredData.filter((item: any) => {
                    // Check if item is not null and has the expected properties
                    if (item && item.itemName && item.supplierCompanyName) {
                        // Implement your filtering logic based on filterStringInput
                        return (
                            item.itemName.toLowerCase().includes(filterStringInput.toLowerCase()) ||
                            item.supplierCompanyName.toLowerCase().includes(filterStringInput.toLowerCase())
                        );
                    }
                    return false;  // Skip null or invalid items
                });
                setFilteredData(data);
            }
        } catch (error) {
            console.error('Error filtering data:', error);
        }
    };
    
    useEffect(() => {

        fetchTabDataByWorkFLowStatus("0").then(success=>{
            filterCatlogData(filterString);
        },error=>{
            showError(error)
        });
    }, [filterString]);
    const handleDataPassed = (data: FilterObject) => {

        let filteredList=tabListData.filter(item => {
            return (
                (data.project === '' || data.project.includes(item.projectId)) &&
                (data.category === '' || item.categoryId === data.category) &&
                (data.location === '' || item.locationId === data.location) &&
                (data.supplier === '' || item.supplierCompanyId === data.supplier) &&
                (data.businessunit === '' || item.businessUnit === data.businessunit)
              );
        });

        setFilteredData(filteredList);
      
    };

   const handleClearFilter=()=>{
    setFilteredData(tabListData);
    };

    function handleClose() {
        setOpen(false)
    }

    return (
        <ThemeProvider theme={EffigoColorTheme}>
            <Box>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Box className={styles.CatalogTabPanel}>
                    <Tabs value={value} className={styles.Tab} variant={"fullWidth"} onChange={handleChange} aria-label="Main Tab Panel">
                        <Tab className={styles.TabClass} label="Approved" {...a11yProps(0)} />
                        <Tab className={styles.TabClass} label="Favourites" {...a11yProps(1)} />
                        <Tab className={styles.TabClass} label="Rejected" {...a11yProps(2)} />
                        <Tab className={styles.TabClass} label="Pending" {...a11yProps(3)} />
                        <Tab className={styles.TabClass} label="Info&nbsp;Request" {...a11yProps(4)} />
                        <Tab className={styles.TabClass} label="Drafted" {...a11yProps(5)} />
                        <Tab className={styles.TabClass} label="Expired" {...a11yProps(6)} />
                    </Tabs>


                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box>
                    <CatalogFilterPanel onDataPassed={handleDataPassed} onClearFilters={handleClearFilter} />
                    </Box>
                    <Box>
                        <ResultView catalogItems={filteredData} catalogCurrentView={CatalogListViewStates.TWO_TILE_VIEW}/>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Box>
                        <CatalogFilterPanel onDataPassed={handleDataPassed} onClearFilters={handleClearFilter} />
                    </Box>
                    <Box>
                        <ResultView  catalogItems={filteredData} catalogCurrentView={CatalogListViewStates.TWO_TILE_VIEW}/>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Box>
                    <CatalogFilterPanel onDataPassed={handleDataPassed} onClearFilters={handleClearFilter}/>
                    </Box>
                    <Box>
                        <ResultView  catalogItems={filteredData} catalogCurrentView={CatalogListViewStates.TWO_TILE_VIEW}/>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <Box>
                    <CatalogFilterPanel onDataPassed={handleDataPassed} onClearFilters={handleClearFilter}/>
                    </Box>
                    <Box>
                        <ResultView  catalogItems={filteredData} catalogCurrentView={CatalogListViewStates.TWO_TILE_VIEW}/>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <Box>
                    <CatalogFilterPanel onDataPassed={handleDataPassed} onClearFilters={handleClearFilter}/>
                    </Box>
                    <Box>
                        <ResultView  catalogItems={filteredData} catalogCurrentView={CatalogListViewStates.TWO_TILE_VIEW}/>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                    <Box>
                    <CatalogFilterPanel onDataPassed={handleDataPassed} onClearFilters={handleClearFilter}/>
                    </Box>
                    <Box>
                        <ResultView  catalogItems={filteredData} catalogCurrentView={CatalogListViewStates.TWO_TILE_VIEW}/>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={6}>
                    <Box>
                    <CatalogFilterPanel onDataPassed={handleDataPassed} onClearFilters={handleClearFilter} />
                    </Box>
                    <Box>
                        <ResultView catalogItems={filteredData} catalogCurrentView={CatalogListViewStates.TWO_TILE_VIEW}/>
                    </Box>
                </CustomTabPanel>

            </Box>
        </ThemeProvider>
    );
}

export default CatalogTabPanel;

