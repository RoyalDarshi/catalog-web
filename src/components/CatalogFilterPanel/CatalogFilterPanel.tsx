import React, {useState} from 'react';
import styles from './CatalogFilterPanel.module.scss';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PanelBadgeComponent from "../inner/PanelBadgeComponent/PanelBadgeComponent";
import { RadioProps } from '@mui/material/Radio';
import MasterDataService from "../../services/MasterDataService"
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Accordion, AccordionDetails, AccordionSummary,
    BpCheckedIcon,
    BpIcon,
    CatalogFilterPanelProps,
    FilterObject,
    ProjectOption
} from "./FilerPanelHelper";
import {nanoid} from "nanoid";


function BpRadio(props: RadioProps) {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}


const CatalogFilterPanel: React.FC<CatalogFilterPanelProps> = ({ onDataPassed,onClearFilters }) => {

    const masterDataService = new MasterDataService();
    const [expanded, setExpanded] = React.useState<string | true>(true);
    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : true);
    };
    const [filterObject, setFilterObject] = React.useState<FilterObject>();
    //dropdown
    const [project, setProject] = React.useState('');
    const [projectData, setProjectsData] = React.useState<ProjectOption[]>([]);
    const [CategoryData, setCategoriesData] = React.useState<ProjectOption[]>([]);
    const [LocationData, setLocationsData] = React.useState<ProjectOption[]>([]);
    const [SupplierData, setSuppliersData] = React.useState<ProjectOption[]>([]);
    const [UnitData, setUnitsData] = React.useState<ProjectOption[]>([]);

    const projectHandleChanges = (event: SelectChangeEvent) => {
        setProject(event.target.value);

    };
    const fetchProjects = async () => {
        try {

            var projectoptions = await masterDataService.getProjects()
            if (projectoptions) {
                if (projectoptions.data) {
                    const projects: ProjectOption[] = projectoptions.data.masterDataDtoList;

                    setProjectsData(projects);
                }

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [category, setCategory] = React.useState('');

    const categoryHandleChanges = (event: SelectChangeEvent) => {
        setCategory(event.target.value);

    };
    const fetchCategories = async () => {
        try {

            var categoryOptions = await masterDataService.getCategories()
            if (categoryOptions) {
                if (categoryOptions.data) {
                    const categories: ProjectOption[] = categoryOptions.data.masterDataDtoList;
                    setCategoriesData(categories);
                }

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [location, setLocation] = React.useState('');

    const locationHandleChanges = (event: SelectChangeEvent) => {
        setLocation(event.target.value);

    };
    const fetchLocations = async () => {
        try {

            let locationOptions = await masterDataService.getLocations()
            if (locationOptions) {
                if (locationOptions.data) {
                    const locations: ProjectOption[] = locationOptions.data.masterDataDtoList;
                    setLocationsData(locations);
                }

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [supplier, setSupplier] = React.useState('');

    const supplierHandleChanges = (event: SelectChangeEvent) => {
        setSupplier(event.target.value);

    };
    const fetchSuppliers = async () => {
        try {

            var supplierOptions = await masterDataService.getSuppliers()
            if (supplierOptions) {
                if (supplierOptions.data) {
                    const suppliers: ProjectOption[] = supplierOptions.data.masterDataDtoList;
                    setSuppliersData(suppliers);
                }

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [unit, setUnit] = React.useState('');

    const unitHandleChanges = (event: SelectChangeEvent) => {
        setUnit(event.target.value);

    };
    const fetchUnits = async () => {
        try {

            var unitOptions = await masterDataService.getBusinessUnits()
            if (unitOptions) {
                if (unitOptions.data) {
                    const units: ProjectOption[] = unitOptions.data.masterDataDtoList;
                    setUnitsData(units);
                }

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const clearFilter = () => {
        handleClearBtnClick()
        onClearFilters(); // Pass the filtered data to the parent component
      };
    const handleApplyFilter = () => {
       // onDataPassed(filterObject);
if(project!==""||category!==""||location!==""||supplier!==""||unit!=="")
{
    handleApplyBtnClick();
    var filters = {
        project: project,
        category: category,
        location: location,
        supplier: supplier,
        businessunit: unit,
      };
      setFilterObject(filters);
      onDataPassed(filters); // Pass the filtered data to the parent component
}
else{

    toast.error('Please select atleast one filter!', {
        position: 'top-right',
        autoClose: 5000, // Duration in milliseconds
    });    
}
        
      };
    
    React.useEffect(() => {
        fetchProjects();
        fetchCategories();
        fetchLocations();
        fetchSuppliers();
         fetchUnits();

    }, []);
    const [isClearBtnVisible, setClearBtnVisible] = useState(false);
    const [isBadgeVisible,setBadgeVisible]=useState(false);

    const handleApplyBtnClick = () => {
        setClearBtnVisible(true);
        setBadgeVisible(true);

    };

    const handleClearBtnClick = () => {
        let filters = {
            project: '',
            category: '',
            location: '',
            supplier: '',
            businessunit: ''
          };
        onDataPassed(filters);
        setProject("");
        setCategory("");
        setLocation("");
        setSupplier("");
        setUnit("");
        setClearBtnVisible(false);
        setBadgeVisible(false);
    };


    // @ts-ignore
    return (


        <Box className={styles.CatalogFilterPanel} >

            <Accordion onChange={handleChange('panel1')} className={styles.AccordionColor}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Box className={styles.AccordionSummaryEle}>
                        <Box className={styles.BadgeComp}>
                            <div>
                            <Typography className={styles.AccordionHeader}>Filter Criteria&nbsp; </Typography>
                            </div>
                            {isBadgeVisible &&<Box><PanelBadgeComponent /></Box>}
                        </Box>
                        {isClearBtnVisible &&<Box>
                            <Button className="Btn" disabled={false} variant="contained" onClick={clearFilter}>Clear Filter</Button>
                        </Box>
                        }
                    </Box>
                </AccordionSummary>
                <AccordionDetails className={styles.AccordionColor}>
                    <Typography>
                        <FormControl>
                            <FormLabel id="item-type-group-label" className={styles.RadioTitle}>Item Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="item-type-buttons-group-label"
                                name="item-type-buttons-group"
                                defaultValue={"Goods"}
                                className={styles.RadioItem}
                            >
                                <FormControlLabel id={"goods-radio"} value="Goods" control={<BpRadio />}
                                    label={<Typography className={styles.RadioItem}>Goods</Typography>} />
                                <FormControlLabel id={"services-radio"} value="Services" control={<BpRadio />}
                                    label={<Typography className={styles.RadioItem}>Services</Typography>} />

                            </RadioGroup>
                        </FormControl>
                        <Box className={styles.ItemMainContainer}>

                            <Box className={styles.RowDisplay}>
                                <div>
                                <Typography className={styles.ItemTitle}>Project</Typography>
                                </div>
                                <Box className={styles.BoxWidth}>
                                    <FormControl className={styles.FormControl} size="small">

                                        <Select
                                            labelId="project-simple-select-label"
                                            id="project-select"
                                            //defaultValue={"none"}
                                            key={nanoid()}
                                            value={project}
                                            displayEmpty={true}
                                            onChange={projectHandleChanges}
                                            className={styles.Input}

                                        >
                                            <MenuItem  key={nanoid()} selected={true} value={""}>
                                                <Typography className={styles.MenuItem}>Select Project</Typography></MenuItem >
                                            {projectData.map((item) => (
                                                <MenuItem className={styles.SelectText}  key={nanoid()} value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box className={styles.RowDisplay}>
                                <div>
                                <Typography className={styles.ItemTitle}>Category</Typography>
                                </div>
                                <Box className={styles.BoxWidth}>
                                    <FormControl className={styles.FormControl} size="small">
                                        <Select
                                            labelId="category-simple-select-label"
                                            id="category-select"
                                            value={category}
                                            key={nanoid()}
                                            //defaultValue={"none"}
                                            onChange={categoryHandleChanges}
                                            displayEmpty={true}
                                            className={styles.Input}
                                        >
                                            <MenuItem  key={nanoid()} value={""} >
                                                <Typography className={styles.MenuItem}>Select Category</Typography></MenuItem>
                                            {CategoryData.map((item) => (
                                                // @ts-ignore
                                                <MenuItem key={nanoid()} className={styles.SelectText} value={item.id}>{item.categoryName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box className={styles.RowDisplay}>
                                <div>
                                <Typography className={styles.ItemTitle}>Location</Typography>
                                </div>
                                <Box className={styles.BoxWidth}>
                                    <FormControl className={styles.FormControl} size="small">
                                        <Select
                                            labelId="location-simple-select-label"
                                            id="location-simple-select"
                                            key={nanoid()}
                                            value={location}
                                            //defaultValue={"none"}
                                            onChange={locationHandleChanges}
                                            className={styles.Input}
                                            displayEmpty={true}
                                        >
                                            <MenuItem  key={nanoid()} value={""}  selected={true}>
                                                <Typography className={styles.MenuItem}>Select Location</Typography></MenuItem>
                                            {LocationData.map((item) => (
                                                <MenuItem  key={nanoid()} className={styles.SelectText} value={item.id}>{item.name}</MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box className={styles.RowDisplay}>
                                <div>
                                <Typography className={styles.ItemTitle}>Supplier</Typography>
                                </div>
                                <Box className={styles.BoxWidth}>
                                    <FormControl className={styles.FormControl} size="small">
                                        <Select
                                            key={nanoid()}
                                            labelId="supplier-simple-select-label"
                                            id="supplier-select"
                                            value={supplier}
                                            //defaultValue={"none"}
                                            displayEmpty={true}
                                            onChange={supplierHandleChanges}
                                            className={styles.Input}
                                        >
                                            <MenuItem  key={nanoid()} value={""}  selected={true}>
                                                <Typography className={styles.MenuItem}>Select Supplier</Typography></MenuItem>
                                            {SupplierData.map((item) => (
                                                // @ts-ignore
                                                <MenuItem  key={nanoid()} className={styles.SelectText} value={item.id}>{item.name}</MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box className={styles.RowDisplay}>
                                <div>
                                <Typography className={styles.ItemTitle}>Business Unit</Typography>
                                </div>
                                <Box className={styles.BoxWidth}>
                                    <FormControl className={styles.FormControl} size="small">
                                        <Select
                                            key={nanoid()}
                                            labelId="business-unit-simple-select-label"
                                            id="business-unit-select"
                                            value={unit}
                                            //defaultValue={"none"}
                                            displayEmpty={true}
                                            onChange={unitHandleChanges}
                                            className={styles.Input}
                                        >
                                            <MenuItem  key={nanoid()} value={""} selected={true}>
                                                <Typography className={styles.MenuItem}>Select Business Unit</Typography></MenuItem>
                                            {UnitData.map((item) => (
                                                <MenuItem  key={nanoid()} className={styles.SelectText} value={item.id}>{item.name}</MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>

                        <Stack direction="row" className={styles.MarginTop}>
                        <Button variant="outlined" disabled={false} className="Btn" onClick={handleApplyFilter}>
                    Apply Filter
                </Button>
                <ToastContainer />
                        </Stack>

                    </Typography>
                </AccordionDetails>
            </Accordion >
        </Box>
        
    );
}
export default CatalogFilterPanel;
