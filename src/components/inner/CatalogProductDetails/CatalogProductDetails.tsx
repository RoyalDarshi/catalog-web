import React, {FC, useState} from 'react';
import styles from './CatalogProductDetails.module.scss';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Button, FormLabel, Input, Link } from '@mui/material';
import {useNavigate} from "react-router-dom";
import HelpIcon from '@mui/icons-material/Help';
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import APIServices from "../../../services/APIServices"
import { useLocation } from "react-router-dom";
import ProductModel from '../../../services/models/product-model'
import {
    CatalogDetailsPayLoadDTO,
    CatalogCrudRequestParam,
    CatalogCrudRequestParamCatalogTypeEnum
} from "../../../services/models/payload-details";
import {showError} from "../../../services/alert-service";


const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));
interface ChildComponentProps {
    openModal: () => void;
    openMedModal:()=>void;
    getCatlogId:(catlogid:string)=>void;
}
const itemData: any[] = [];
const CatalogProductDetails:FC<ChildComponentProps>=({openModal,openMedModal,getCatlogId})=> {
    const nevigate=useNavigate();
    const apiServices = new APIServices();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [productDetails, setProductDetails] = React.useState<CatalogDetailsPayLoadDTO>();
    const [itemName, setItemName] = React.useState<string>();
    const [materialCode,setMaterialCode]=useState("");
    const [glCode,setGlCode]=useState("");
    const [hsnCode,setHsnCode]=useState("");
    const [catalogType,setCagtalogType]=useState(CatalogCrudRequestParamCatalogTypeEnum.Goods);
    var queryParam:string|null=searchParams?.get('Item')

    const fetchProductDetails = async (catlogId: string) => {
        try {
            var productList = await apiServices.getProductDetailsByCatlogId(catlogId)

            setProductDetails(productList.data.catalogDetailsPayLoadDTO);
            fetchMaterialGLHsnCode(productList.data.catalogDetailsPayLoadDTO.itemName);
            setCagtalogType(productList.data.catalogType);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const setCatlogopenPopup = async () => {
        try {
            if(queryParam)
                getCatlogId(queryParam);
            openModal();
        } catch (error) {
            console.error('Error fetching data:', error);        }
    };
    const fetchMaterialGLHsnCode= async (item: string | undefined)=>{
        try {
            const response = await fetch(
                process.env.REACT_APP_API_BASE_URL + `masters/catalog/item/codes/${item}`,
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
    React.useEffect(() => {
        if(queryParam)
        {
            setItemName(queryParam?queryParam:"");
            getCatlogId(queryParam);
            fetchProductDetails(queryParam);
        }
        }, []);
    return(
        <Box className={styles.CatalogProductDetails}>
            <Box className={styles.Header}>
                <Typography className={styles.HeaderTitle}>{productDetails?.itemName}</Typography>
            </Box>
            <Box className={styles.BodySection}>
                <Box>
                    {itemData.length>0?
                        <>
                            <ImageList className={styles.ImageList}  cols={1} rowHeight={187}>
                                {itemData.map((item) => (
                                    <ImageListItem
                                        className={styles.TextSize}>Image Name
                                    </ImageListItem>
                                ))}

                            </ImageList>
                            <Link onClick={openMedModal} className={styles.ImageLink}>View all images</Link>
                        </>
                        :<Box className={styles.ContentCenter}>
                            <Typography>No images available !</Typography>
                        </Box>
                    }

                </Box>{/*Image List Close */}

                <Box >
                    <Box className={styles.DisplayFlex}>
                        <Box><Divider orientation={"vertical"} className={styles.Divider} /></Box>
                        <Box className={styles.GridContainer}>
                            <Grid container >
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Catalog ID </Typography>
                                        <Typography className={`${styles.Title} ${styles.MarginBottom}`}>{productDetails?.buyerMainCatalogId}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Category Name</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.categoryName}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}>Project</Typography>
                                        <Typography className={styles.TextSize}>  {productDetails?.projects?productDetails.projects.map(
                                            (item)=> item.name).join(', ') : 'No project available'}
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Price Per</Typography>
                                        <FormLabel className={styles.Label}>Per unit</FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4}  className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Catalog Type</Typography>
                                        <Typography className={styles.TextSize}>{catalogType}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Item Keywords</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.keyword}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4}  className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Description</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.description}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4}  className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Supplier Company</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.supplierCompanyName}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Supplier Part No.</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.supplierPartNo}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4}  className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Shipping Mode</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.shipMode}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Business Unit</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.buPriceTemplateStructureDTOS?.map((item)=>
                                            item.businessUnitName).join(', ')}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={4.8} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Inco Terms</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.incoTerm}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4}  className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Delivery Terms</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.deliveryTerm}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={4.8} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Payment Terms</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.paymentTerm}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4}  className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Validity Start Date</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.startDate}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Validity End Date</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.endDate}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4}  className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Catalogued for Location</Typography>
                                        <Typography className={styles.TextSize}>  {productDetails?.locations?productDetails?.locations.map(
                                            (item)=>item.name).join(', ') : 'No location available'}
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4}  className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Minimum Quantity</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.minimumQuantity}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4}  className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Contact Reference No.</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.contractReferenceNo}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Delivery Lead Time</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.deliveryLeadTime}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}>Supplier Location</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.supplierLocationName}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}>Material Code</Typography>
                                        <Typography className={styles.TextSize}>{materialCode}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>GL Code</Typography>
                                        <FormLabel className={styles.Label}>{glCode}</FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}>HSN Code</Typography>
                                        <FormLabel className={styles.Label}>{hsnCode}</FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Units</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.unit}</Typography>
                                    </Item>
                                </Grid>
                                <Grid  xs={2.4} className={styles.GridMargin} >
                                    <Item >
                                        <Typography className={styles.Title}>Contract</Typography>
                                        <Box className={styles.Overflow}>
                                            <Link download="Contract.pdf" href={"Contract.pdf"} className={styles.ProductLink}>Contract</Link>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Net Price with Tax</Typography>
                                        <Typography className={styles.Label}>{productDetails?.buPriceTemplateStructureDTOS?.map(
                                            (item)=>item.totalPrice
                                        ).join(', ')}
                                            <IconButton onClick={openModal} aria-label="help" size="small">
                                                <HelpIcon fontSize={"small"}/>
                                            </IconButton></Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}>Savings Amount</Typography>
                                        <Typography className={styles.Label}>{productDetails?.savingAmount}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}>Additional Catalog Documents </Typography>
                                        <Typography className={styles.TextSize}>NA</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}>Added to Catalog on</Typography>
                                        <Typography className={styles.TextSize}>{productDetails?.createdDate}</Typography>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin}>
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                                <Grid xs={2.4} className={styles.GridMargin} >
                                    <Item>
                                        <Typography className={styles.Title}></Typography>
                                        <FormLabel className={styles.Label}></FormLabel>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>


                    <Box className={styles.Footer}>
                        <Box className={styles.InputContainer}>
                            <Typography className={styles.Qty}>Quantity</Typography>
                            <Input
                                size="small"
                                className={styles.Input}
                                inputProps={{
                                    step: 1,
                                    min: 1,
                                    max: 999,
                                    type: "number",
                                    defaultValue: 1
                                }}
                            />
                        </Box>
                        <Box id="button">
                            <Button className="Btn" disabled={false} variant="outlined">Add to Cart</Button>
                        </Box>
                    </Box>{/* Footers Close */}

                </Box>{/* Grid Close */}
            </Box>

        </Box>
    );
}



export default CatalogProductDetails;