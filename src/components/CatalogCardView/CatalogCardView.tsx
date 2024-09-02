import React, {useEffect, useState} from 'react';
import styles from './CatalogCardView.module.scss';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiInput from '@mui/material/Input';
import ErrorIcon from '@mui/icons-material/Error';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import {BuyerCatalogCartDetailsDTO} from "../../services/models/BuyerCatalogCartDetailsDTO";
import {CatalogStatusEnum} from "../../services/models/workflow-data-model";
import Popup from "../inner/Popup/Popup";
import {CatalogSummaryDTO} from "../../services/models/CatalogSummaryDTO";
import IconPopup from "../inner/IconPopup/IconPopup";
import Stack from "@mui/material/Stack";
import {showError, showSuccess} from "../../services/alert-service";
import catalogItem from "../inner/CatalogItem/CatalogItem";
import RejectDialog from "../inner/RejectDialog/RejectDialog";
import InfoReqDialog from "../inner/InfoReqDialog/InfoReqDialog";
import IconButton from "@mui/material/IconButton";
import Approve from '../../../public/Approve.png';
import Reject from '../../../public/Reject.png';
import  Info_Req from '../../../public/Info_Req.png';
import APIServices from "../../services/APIServices";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
interface ChildProps {
    catlogitem: CatalogSummaryDTO;
    handleMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>,catalogItem:any) => void;
    handleMouseLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    cartItem : BuyerCatalogCartDetailsDTO;
}

const Item = styled(Box)(() => ({
    textAlign: 'left',
}));
const CatalogCardView: React.FC<ChildProps> = ({ catlogitem, handleMouseEnter, handleMouseLeave}) => {

    const nevigate = useNavigate();

    const [anchorElIcon, setAnchorElIcon] = React.useState<null | HTMLElement>(null);
    const [isChecked, setIsChecked] = useState(catlogitem.favourite===1);
    const [openReject, setOpenReject] = useState(false);
    const [defaultChecked,setDefaultChecked]=useState(true);
    let apiServices: APIServices;
    apiServices = new APIServices();
    const rejectHandleChange=()=>{
        setOpenReject(false);
    }
    const [openInfoReq, setOpenInfoReq] = useState(false);
    const infoReqHandleChange=()=>{
        setOpenInfoReq(false);
    }
    const favouriteHandleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setDefaultChecked(false);
        setIsChecked(event.target.checked);
        //addToFavourite()
    };
    const handleIconMouseEnter = (event: { currentTarget: React.SetStateAction<HTMLElement | null>; }) => {
        setAnchorElIcon(event.currentTarget);
    };

    const handleIconMouseLeave = () => {
        setAnchorElIcon(null);
    };

    const onIconPopupMouseEnter = ( event:any) =>{
        handleMouseEnter(event,catlogitem);
    }

    const [iconPopupData,setIconPopupData]=useState("no value");
    const addToCart = async () => {
        try {
            // Create a request payload based on your API's requirements
            const requestBody = {
                // Include the necessary data from catlogitem
                buyerMainCatalogId: catlogitem.buyerMainCatalogId,
                itemName: catlogitem.itemName,
                materialCode: catlogitem.materialCode,
                imageName: catlogitem.imageName,
                contractDoc: catlogitem.contractDoc,
                unit: catlogitem.unit,
                quantity: catlogitem.quantity,
                status: catlogitem.status,
                minimumQuantity: catlogitem.minimumQuantity,
                businessUnit: catlogitem.businessUnit,
                description: catlogitem.description,
                categoryId: catlogitem.categoryId,
                category: catlogitem.category,
                supplierLocation: catlogitem.supplierLocation,
                supplierLocationName: catlogitem.supplierLocationName,
                supplierCompanyId: catlogitem.supplierCompanyId,
                supplierCompanyName: catlogitem.supplierCompanyName,
                paymentTerm: catlogitem.paymentTerm,
                locationId: catlogitem.locationId,
                location: catlogitem.location,
                projectId: catlogitem.projectId,
                projectName: catlogitem.projectName,
                basePrice: catlogitem.basePrice,
                currency: catlogitem.currency,
                clientId: catlogitem.clientId,
            };


            // Send a POST request to your API endpoint for adding to the cart
            const response = await fetch(process.env.REACT_APP_API_BASE_URL + "cart/add-item",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

            if (response.ok) {
                // Item added to the cart successfully
                showSuccess("Item added to cart successfully.");
                //setPopupOpen(true);
                // You can add additional handling here if needed
            } else {
                // Handle the case where the POST request fails
                console.error('Failed to add item to cart.');
                showError("Failed to add item to cart.");
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error while adding item to cart:', error);
        }
    };

    const addToFavourite = async () => {
        if(catlogitem.favourite===0)
            try {
                // Create a request payload based on your API's requirements
                const requestBody = {
                    // Include the necessary data from catlogitem
                    buyerMainCatalogId: catlogitem.buyerMainCatalogId,
                    // ... (include other relevant properties)
                };


                // Send a POST request to your API endpoint for adding to the cart
                const response = await fetch(process.env.REACT_APP_API_BASE_URL + `catalog-management/add-favorite/${catlogitem.buyerMainCatalogId}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    });

                if (response.ok) {
                    // Item added to the cart successfully

                    showSuccess("Item added to favourite successfully.");
                    catlogitem.favourite=1;
                    //setPopupOpen(true);
                    // You can add additional handling here if needed
                } else {
                    // Handle the case where the POST request fails
                    console.error('Failed to add item to favourites.');
                    showError('Failed to add item to favourites.');
                }
            } catch (error) {
                // Handle any network or other errors
                showError('Error while adding item to favourites: '+error);
            }

        else {
            try{
                const response = await fetch( process.env.REACT_APP_API_BASE_URL +`catalog-management/remove-favorite/${catlogitem.buyerMainCatalogId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                if (response.ok) {
                    // Item added to the cart successfully

                    showSuccess("Item deleted from favourite successfully.");
                    catlogitem.favourite=0;
                    //setPopupOpen(true);
                    // You can add additional handling here if needed
                } else {
                    // Handle the case where the POST request fails
                    console.error('Failed to delete item from favourites.');
                    showError('Failed to delete item from favourites.');
                }
            }catch (error){
                // Handle any network or other errors
                console.error('Error while deleting item from favourites:', error);
                showError('Error while deleting item from favourites: '+error);
            }
        }
    };


    const openNavigate=()=>{
        if(catlogitem.status===CatalogStatusEnum.DRAFT){
            nevigate(`/EditCatalog?Item=${catlogitem.buyerMainCatalogId}`);
        }
        else{
            nevigate(`/ProductDetails?Item=${catlogitem.buyerMainCatalogId}`);
        }
    }
    const handleReNewClick = async () => {
        try {
            // Make an API call to create an ID
            const response = await apiServices.getRenewByCatlogId(catlogitem.buyerMainCatalogId);
            if (response && response.data) {

                nevigate(`/ReNewPage?Item=${catlogitem.buyerMainCatalogId}&newItem=${response.data}`)
                // Handle the response or perform any necessary actions
                console.log('Created ID:', response.data);
            }
        } catch (error) {
            console.error('Error creating ID:', error);
        }
    };

    return (

        <Box>
            <Card className={styles.CatalogCardView} >
                <Box
                    className={styles.CardHeader}
                    component="span"
                >
                    <Box component="span" className={`${styles.HeadingSize} ${styles.CardHeading}`}
                    >
                        <Link className={styles.Link} onClick={openNavigate} underline={'none'} sx={{ color: 'var(--sss, #0748AE)' }}>
                            {catlogitem.itemName + "("+catlogitem.materialCode+")"}
                        </Link>
                    </Box>
                    <Box component="span" className={styles.CardCheckBox}>
                        {(catlogitem.status===CatalogStatusEnum.APPROVED||catlogitem.status===CatalogStatusEnum.FAVOURITES) && <Checkbox
                            {...label}
                            className={styles.Checks}
                            //defaultChecked={catlogitem.favourite===1}
                            checked={defaultChecked?catlogitem.favourite===1:isChecked}
                            onClick={addToFavourite}
                            onChange={favouriteHandleChange}
                            icon={<FavoriteBorder className={styles.HeartUnCheck} />}
                            checkedIcon={<Favorite className={styles.HeartChecked} />}
                        />}
                        {catlogitem.status===CatalogStatusEnum.REJECTED && <Stack  onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave}>
                            <CancelIcon onMouseEnter={()=>setIconPopupData("Rejected")} className={styles.CancelIcon} />
                        </Stack>}
                        {catlogitem.status===CatalogStatusEnum.PENDING && <Stack className={styles.Checks} onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave}>
                            <ErrorIcon onMouseEnter={()=>setIconPopupData("Expiring Soon")} className={styles.ErrorIcon} />
                        </Stack>}
                        {catlogitem.status===CatalogStatusEnum.PENDING&&<Stack direction={"row"}>
                            <IconButton><img src={Approve} className={styles.ImgIcon}  alt={"Approve Icon"}/></IconButton>
                            <IconButton onClick={()=>setOpenReject(true)}><img src={Reject} className={styles.ImgIcon}  alt={"Reject Icon"}/></IconButton>
                            <IconButton onClick={()=>setOpenInfoReq(true)}><img src={Info_Req} className={styles.ImgIcon}  alt={"Info Req Icon"}/></IconButton>
                        </Stack>}
                    </Box>
                </Box>
                <Box className={styles.CardBody}>
                    <Box className={styles.CardActionArea}>
                            <Box className={styles.CardImage}>
                                <img
                                    src="https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg"
                                    alt="green iguana"
                                    className={styles.Image}
                                />
                            </Box>
                        <Box className={styles.GridWidth}>
                            <Grid container columnSpacing={2}>
                                <Grid item xs={7} className={`${styles.MarginBottom}`}>
                                    <Item >
                                        <Typography className={`${styles.HeadingSize}`}>Catalog ID</Typography>
                                        <Typography className={`${styles.HeadingColor} ${styles.HeadingSize}  ${styles.Ellipsis}`}>{catlogitem.buyerMainCatalogId}</Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={5} className={`${styles.MarginBottom}`}>
                                    <Item onMouseEnter={onIconPopupMouseEnter}
                                          onMouseLeave={handleMouseLeave}
                                          >
                                        <Typography className={styles.HeadingSize}>From</Typography>
                                        <Typography className={`${styles.TextSize} ${styles.Ellipsis}`}>
                                            {catlogitem.supplierCompanyName}
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={7}>
                                    <Item>
                                        <Typography className={styles.HeadingSize}>
                                            Payment Terms
                                        </Typography>
                                        <Typography className={`${styles.TextSize} ${styles.Ellipsis}`}>
                                            {catlogitem.paymentTerm}
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={5}>
                                    <Item >
                                        <Typography className={styles.HeadingSize}>
                                            Business Unit
                                        </Typography>
                                        <Typography className={`${styles.TextSize} ${styles.Ellipsis}`}>
                                            {catlogitem.businessUnit}
                                        </Typography>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box className={styles.CardDescription}>
                        <Typography className={styles.HeadingSize}>
                            Description
                        </Typography>
                        <Typography className={styles.TextSize}>
                            {catlogitem.description}
                        </Typography>
                    </Box>
                    <Box
                        className={`${styles.DescFooter} ${styles.MarginBottom}`}

                    >

                            <Grid container columnSpacing={2}>
                                <Grid item xs={4}>
                                    <Item>
                                        <Typography className={styles.HeadingSize}>
                                            Supplier Location
                                        </Typography>
                                        <Typography className={styles.TextSize}>
                                            {catlogitem.supplierLocationName}
                                        </Typography>
                                    </Item>
                                </Grid>
                                <Grid item xs={8}>
                                    <Item>
                                        <Typography className={styles.HeadingSize}>
                                            Catalogued for Location
                                        </Typography>
                                        <Typography className={styles.TextSize}>
                                            {catlogitem.location}
                                        </Typography>
                                    </Item>
                                </Grid>
                            </Grid>

                    </Box>
                    <Box>
                        <Grid container columnSpacing={2}>
                            <Grid item xs={4}>
                                <Item>
                                    <Typography className={styles.HeadingSize}>
                                        Project
                                    </Typography>
                                    <Typography className={`${styles.TextSize} ${styles.Ellipsis}`}>
                                        {catlogitem.projectName}
                                    </Typography>
                                </Item>
                            </Grid>
                            <Grid item xs={2.7}>
                                <Item>
                                    <Typography className={`${styles.HeadingSize} ${styles.DisplayFlex}`}>
                                        MOQ
                                        <Box onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave} >
                                            <ErrorIcon onMouseEnter={()=>setIconPopupData("Minimum Order Quantity")} className={styles.MoqIcon} />
                                        </Box>
                                    </Typography>
                                    <Typography className={styles.TextSize}>{catlogitem.minimumQuantity}</Typography>
                                </Item>
                            </Grid>
                            <Grid item xs={5.3}>
                                <Item>
                                    <Typography className={`${styles.HeadingSize} ${styles.ThemeColor}`}>Contract</Typography>
                                    <Link download={catlogitem.contractDoc} href={catlogitem.contractDoc} className={`${styles.TextSize} ${styles.Ellipsis} ${styles.Link}`} >{catlogitem.contractDoc}</Link>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box
                    className={styles.CardFooter}
                >
                    <Box className={styles.DisplayFlex}>
                        <Box component="span" className={`${styles.FooterPrice} ${styles.Unit}`}>
                            <Typography className={`${styles.HeadingSize} ${styles.ThemeColor}`}>Units</Typography>
                            <Typography className={`${styles.HeadingSize} ${styles.ThemeColor}`}>{catlogitem.quantity + "(" + catlogitem.unit + ")"}</Typography>
                        </Box>
                        <Box component="span">
                            <Typography className={`${styles.HeadingSize} ${styles.ThemeColor}`}>{catlogitem.currency}</Typography>
                            <Typography className={`${styles.HeadingSize} ${styles.ThemeColor}`}>{catlogitem.basePrice}</Typography>
                        </Box>
                    </Box>
                    {(catlogitem.status===CatalogStatusEnum.APPROVED||catlogitem.status===CatalogStatusEnum.FAVOURITES)&&<Box className={styles.DisplayFlex}>
                        <Box component="span" className={`${styles.DisplayFlex} ${styles.Qty}`}>
                            <Typography className={`${styles.HeadingSize} ${styles.ThemeColor}`}>Quantity</Typography>
                            <MuiInput
                                size="small"
                                className={styles.Input}
                                inputProps={{
                                    step: 1,
                                    min: 1,
                                    max: 99999,
                                    type: 'number',
                                    defaultValue: 1
                                }}
                            />
                        </Box>
                        <Box component="span" className={styles.FooterBtn}>
                            <Button
                                variant="outlined"
                                className="Btn"
                                disabled={false}
                                onClick={addToCart} // Call the addToCart function when button is clicked
                            >
                                Add to Cart
                            </Button>

                        </Box>
                    </Box>}
                    {catlogitem.status===CatalogStatusEnum.EXPIRED&&
                        <Button onClick={handleReNewClick} variant={"contained"} className="Btn">ReNew</Button>}
                </Box>
            </Card>
            <Box>
                <IconPopup data={iconPopupData} anchorEl={anchorElIcon} />
            </Box>
            <Box>
                <RejectDialog isOpen={openReject} onRequestClose={rejectHandleChange} />
            </Box>
            <Box>
                <InfoReqDialog isOpen={openInfoReq} onRequestClose={infoReqHandleChange} />
            </Box>
        </Box>

    );

}
export default CatalogCardView;
