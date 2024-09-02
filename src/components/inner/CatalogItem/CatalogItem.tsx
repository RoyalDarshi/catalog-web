import React, {useState, useEffect, ChangeEvent} from 'react';
import styles from './CatalogItem.module.scss';
import FormControls from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import MasterDataService from "../../../services/MasterDataService"
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {CatalogCrudRequestParamCatalogTypeEnum, OptionDto, TermsDto} from "../../../services/models/payload-details";
import {showError, showSuccess} from "../../../services/alert-service";
import { error, log } from 'console';
interface ProjectOption {
    name: string;
    id: string;
}

interface CatalogItemProps{
    onItemDataChange : (itemData: object) => void;
}

const CatalogItem: React.FC<CatalogItemProps> = ({onItemDataChange}) => {

    const [projectData, setProjectsData] = useState<OptionDto[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<OptionDto[]>([]);
    const [CategoryData, setCategoriesData] = useState<TermsDto[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<TermsDto>();
    const [SubCategoryData, setSubCategoriesData] = useState<TermsDto[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<TermsDto>();
    const [L3CategoryData, setL3CategoriesData] = useState<ProjectOption[]>([]);
    const [selectedL3Category, setSelectedL3Category] = useState<OptionDto>();
    const [ItemServiceData, setItemServiceData] = useState<ProjectOption[]>([]);
    const [selectedItemService, setSelectedItemService] = useState<OptionDto>();
    const [description, setDescription] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [materialCode,setMaterialCode]=useState("");
    const [glCode,setGlCode]=useState("");
    const [hsnCode,setHsnCode]=useState("");
    const [itemType,setItemType]=useState(CatalogCrudRequestParamCatalogTypeEnum.Goods);
    const masterDataService = new MasterDataService();
    const [pricePer,setPricePer]=useState("perUnit");
    const[ItemShow,setItemShow]=useState(false);

    useEffect(() => {
        try{
            fetchProjects().then(r =>{

        } ,error=>{
            console.error(error);
        });
        fetchCategories().then(r =>{

        } ,error=>{
            console.error(error);
        });
        fetchSubCategories().then(r =>{

        } ,error=>{
            console.error(error);
        });
        fetchL3Categories().then(r =>{

        } ,error=>{
            console.error(error);
        });
        fetchItemService().then(r =>{

        } ,error=>{
            console.error(error);
        });
        }catch(e){
            console.error(e)
        }
    }, []);

    const fetchProjects = async () => {
        try {

            var projectOptions = await masterDataService.getProjects()
            if (projectOptions) {
            if (projectOptions.data) {
                    const projects: OptionDto[] = projectOptions.data.masterDataDtoList;
                    setProjectsData(projects);
                }

            }
      } catch (error) {
            console.error('Error fetching data:', error);
        }
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
    const fetchSubCategories = async () => {
        try {

            var subCategoryOptions = await masterDataService.getSubCategories()
            if (subCategoryOptions) {
                if (subCategoryOptions.data) {
                    const subCategories: ProjectOption[] = subCategoryOptions.data.masterDataDtoList;
                    setSubCategoriesData(subCategories);
                }

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchL3Categories = async () => {
        try {

            var l3CategoryOptions = await masterDataService.getL3Categories()
            if (l3CategoryOptions) {
                if (l3CategoryOptions.data) {
                    const l3Categories: ProjectOption[] = l3CategoryOptions.data.masterDataDtoList;
                    setL3CategoriesData(l3Categories);
                }

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchItemService = async () => {
        try {

            var itemServiceOptions = await masterDataService.getItemsServices()
            if (itemServiceOptions) {
                if (itemServiceOptions.data) {
                    const itemService: ProjectOption[] = itemServiceOptions.data;
                    setItemServiceData(itemService);
                }

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleItemDataChange  = () =>{
        const itemData = {
            selectedProjects,
            itemType,
            selectedCategory,
            selectedSubCategory,
            selectedL3Category,
            selectedItemService,
            description,
            keyword,
        };
        onItemDataChange(itemData);
    }

   /* const handleProjectChange = (event: SelectChangeEvent) => {
        setSelectedProject([event.target.value] as string[]);
      };*/
      useEffect(() => {
        // This effect will run whenever selectedProject changes
        handleItemDataChange();
    }, [selectedProjects]);

    const handleProjectChange = (event: SelectChangeEvent<typeof selectedProjects>) => {
        const {
            target: {value },
        } = event;
        // if (value[value.length - 1] === "all") {
        //     setSelectedProject(selectedProject.length === projectData.length ? [] : projectData);
        //     return;
        // }
        // @ts-ignore
       // selectedProjects.push(value);
        setSelectedProjects(value);
        // setSelectedProjects(
        //     // On autofill we get a stringified value.
        //    // typeof value === 'string' ? value.split(',') : value,
        // );
    };
    useEffect(() => {
        // This effect will run whenever selectedProject changes
        handleItemDataChange();
    }, [selectedCategory]);
    const handleCategoryChange = (event: SelectChangeEvent<typeof selectedCategory>) => {
        const selectedValue = event.target.value as TermsDto;
            setSelectedCategory(selectedValue);
    };
    useEffect(() => {
        // This effect will run whenever selectedProject changes
        handleItemDataChange();
    }, [selectedSubCategory]);
    const handleSubCategoryChange = (event: SelectChangeEvent<typeof selectedSubCategory>) => {
        const selectedValue = event.target.value as TermsDto;
        setSelectedSubCategory(selectedValue);
    };
    useEffect(() => {
        // This effect will run whenever selectedProject changes
        handleItemDataChange();
    }, [selectedL3Category]);
    const handleL3CategoryChange = (event: SelectChangeEvent<typeof selectedL3Category>) => {
        setSelectedL3Category(event.target.value as OptionDto);
    };
    useEffect(() => {
        // This effect will run whenever selectedProject changes
        handleItemDataChange();
    }, [selectedItemService]);
    const handleItemServiceChange = (event: SelectChangeEvent<typeof selectedItemService>) => {
        setSelectedItemService(event.target.value as OptionDto);
        setItemShow(true);
        fetchMaterialGLHsnCode(event.target.value);
    };

    useEffect(() => {
        // This effect will run whenever selectedProject changes
        handleItemDataChange();
    }, [description]);
    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDescription(event.target.value as string);
    };
    useEffect(() => {
        // This effect will run whenever selectedProject changes
        handleItemDataChange();
    }, [keyword]);
    const handleKeywordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setKeyword(event.target.value as string);
    };
    const [show, setShow] = useState(true);
    const showHandleChanges=(event:any)=>{
        setShow(event.target.value===CatalogCrudRequestParamCatalogTypeEnum.Goods);
        setItemType(event.target.value);
        if(event.target.value===CatalogCrudRequestParamCatalogTypeEnum.Goods){
            setPricePer("perUnit");
        }
    }
    const fetchMaterialGLHsnCode= async (item: any)=>{
        try {
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URL + `masters/catalog/item/codes/${item.name}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                const data = await response.json(); // Parse the JSON data

                // Assuming the data is an object with properties like 'itemName' and 'itemPrice'
                setMaterialCode(data?.materialCode);
                setGlCode(data?.glcode);
                setHsnCode(data?.hsncode);

            } else {
                console.error('Failed to add material code/gl code/hsn code.');
                showError('Failed to add material code/gl code/hsn code.');
            }
        } catch (error) {
            showError('Error while adding material code/gl code/hsn code: ' + error);
        }
    }
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
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
                                                <Checkbox checked={((selectedProjects.indexOf(item) > -1))}/>
                                            </ListItemIcon>
                                            <Typography className="SelectText">{item.name}</Typography>
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
                                onChange={showHandleChanges}

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
                                    //label="Select Category"
                                    className="SelectText"
                                    onChange={handleCategoryChange}
                                    displayEmpty={true}
                                    value={selectedCategory || ""}
                                    //defaultValue={"none"}
                                >
                                    <MenuItem  value={""} disabled={true} >
                                        <Typography className="MenuItem">Select Category</Typography>
                                    </MenuItem>
                                    {CategoryData.map((item) => (
                                        // @ts-ignore
                                        <MenuItem className="SelectText"
                                                  value={item}
                                                  key={item.id}
                                                  name={item.categoryName}>{item.categoryName}</MenuItem>
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
                                    // label="Select Sub Category"
                                    className="SelectText"
                                    onChange={handleSubCategoryChange}
                                    //defaultValue={"none"}
                                    required={true}
                                    value={selectedSubCategory || ""}
                                    displayEmpty={true}
                                >
                                    <MenuItem value={""} selected={true} disabled={true}>
                                        <Typography className="MenuItem">Select Sub Category</Typography>
                                    </MenuItem>
                                    {SubCategoryData.map((item) => (
                                        // @ts-ignore
                                        <MenuItem className="SelectText"
                                                  value={item}
                                                  key={item.subCategoryId}
                                                  name={item.subCategoryName}>{item.subCategoryName}</MenuItem>                                    ))}
                                </Select>
                            </FormControls>
                        </Box>
                    </Box>
                    <Box>
                        <FormControls>
                            <FormLabel className={styles.FormLabel} id="unit-label">
                                Price Per&nbsp;<Typography className={styles.Span}>*</Typography>
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="unit-label"
                                name="unit-radio1111"
                                value={pricePer}
                                onChange={(event)=>setPricePer(event.target.value)}
                            >
                                <FormControlLabel
                                    value="perUnit"
                                    control={<Radio />}
                                    label={<Typography className="SelectText">Per Unit</Typography>}
                                    className="SelectText"
                                />
                                {!show&&<FormControlLabel
                                    value="totalUnit"
                                    control={<Radio />}
                                    label={<Typography className="SelectText">Total Unit</Typography>}
                                    className="SelectText"
                                />}
                            </RadioGroup>
                        </FormControls>
                    </Box>
                </Box>
                <Box className={styles.RowItem}>
                    <Box className={styles.InputItem}>
                        <FormLabel className={styles.FormLabel} htmlFor="Age">L3 Category&nbsp;</FormLabel>
                        <Box >
                            <FormControls
                                className={styles.FormCtrl}
                                size="small"
                            >

                                <Select
                                    labelId="l3-category-select-label"
                                    id="l3-category-select"
                                    className="SelectText"
                                    //label="Select L3 Category"
                                    value={selectedL3Category || ""}
                                    onChange={handleL3CategoryChange}

                                    //defaultValue={"none"}
                                    displayEmpty={true}
                                >
                                    <MenuItem value={""}>
                                        <Typography className="MenuItem">Select Sub Category</Typography>
                                    </MenuItem>
                                    {L3CategoryData.map((item) => (
                                        // @ts-ignore
                                        <MenuItem className="SelectText"
                                                  value={item}
                                                  key={item.id}
                                                  name={item.name}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControls>
                        </Box>
                    </Box>
                    <Box className={styles.InputItem}>
                        <FormLabel className={styles.FormLabel} htmlFor="Age">Items/Services&nbsp;<span className={styles.Span}>*</span></FormLabel>
                        <Box >
                            <FormControls
                                className={styles.FormCtrl}
                                size="small"
                            >

                                <Select
                                    labelId="item-select-label"
                                    id="item-select"
                                    className="SelectText"
                                    //label="Select Item"
                                    onChange={handleItemServiceChange}
                                    value={selectedItemService || ""}
                                    required={true}
                                    //defaultValue={""}
                                    displayEmpty={true}
                                >
                                    <MenuItem value={""} selected={true} disabled={true}>
                                        <Typography className="MenuItem">Select Item</Typography>
                                    </MenuItem>
                                    {ItemServiceData.map((item) => (
                                        // @ts-ignore
                                        <MenuItem className="SelectText"
                                                  value={item}
                                                  key={item.id}
                                                  name={item.name}
                                        >{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControls>
                        </Box>
                    </Box>
                </Box>
                {ItemShow&&<Box className={styles.RowItem}>
                    <Box className={styles.InputItem}>
                        <FormLabel className={styles.FormLabel} >Material Code</FormLabel>
                        <Box>
                            <TextField value={materialCode}  className={styles.FormCtrl} size={"small"}/>
                        </Box>
                    </Box>
                    <Box className={styles.InputItem}>
                        <FormLabel className={styles.FormLabel} >GL Code</FormLabel>
                        <Box>
                            <TextField value={glCode} className={styles.FormCtrl} size={"small"}/>
                        </Box>
                    </Box>
                    <Box className={styles.InputItem}>
                        <FormLabel className={styles.FormLabel} >HSN Code</FormLabel>
                        <Box>
                            <TextField value={hsnCode} className={styles.FormCtrl} size={"small"}/>
                        </Box>
                    </Box>
                </Box>}
                <Box>
                    <Box className={`${styles.RowItem}`}>
                        <Box className={styles.TextAreaWidth}>
                            <FormLabel className={styles.FormLabel} htmlFor="item-desc">Item Description&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box className={styles.FirstTextArea}>
                                <TextField required={true} fullWidth={true} multiline={true} rows={3}
                                           onChange={handleDescriptionChange}
                                           value={description}
                                />
                            </Box>
                        </Box>
                        <Box className={styles.TextAreaWidth}>
                            <FormLabel className={styles.FormLabel} htmlFor="keywords">Keywords&nbsp;<Typography className={styles.Span}>*</Typography></FormLabel>
                            <Box className={styles.SecTextArea}>
                                <TextField required={true} fullWidth={true} multiline={true} rows={3}
                                           onChange={handleKeywordChange}
                                           value={keyword}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
}

export default CatalogItem;
