import Box from '@mui/joy/Box';
import {Grid, IconButton, Tooltip, tooltipClasses, TooltipProps} from '@mui/material';
import React, {FC, useState} from 'react';
import styles from './CatalogGridView.module.scss';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MuiInput from "@mui/material/Input";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";
import {styled} from "@mui/material/styles";
import {CatalogStatusEnum} from "../../services/models/workflow-data-model";
import {CatalogSummaryDTO} from "../../services/models/CatalogSummaryDTO";
import IconPopup from "../inner/IconPopup/IconPopup";
import Popup from "../inner/Popup/Popup";
import {showError, showSuccess} from "../../services/alert-service";
import Stack from "@mui/material/Stack";
import Approve from "../../../public/Approve.png";
import Reject from "../../../public/Reject.png";
import Info_Req from "../../../public/Info_Req.png";
import RejectDialog from "../inner/RejectDialog/RejectDialog";
import InfoReqDialog from "../inner/InfoReqDialog/InfoReqDialog";
import AutorenewIcon from '@mui/icons-material/Autorenew';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
interface ChildProps {
    catlogitem: CatalogSummaryDTO;
    handleGridMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleMouseLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Item = styled(Box)(() => ({
    textAlign: 'left',
}));
const CatalogGridView: React.FC<ChildProps> = ({handleGridMouseEnter,handleMouseLeave, catlogitem }) => {
    const nevigate=useNavigate();
    const openNavigate=()=>{
        if(catlogitem.status===CatalogStatusEnum.DRAFT){
            nevigate("/EditCatalog");
        }
        else{
            nevigate(`/ProductDetails?Item=${catlogitem.buyerMainCatalogId}`);
        }
    }
    const [sucpopupOpen, setSucPopupOpen] = useState(false);
    const sucPopupHandleClose = () => {
        setSucPopupOpen(false);
    };
    const[popupData,setPopupData]=useState("");
    const [anchorElIcon, setAnchorElIcon] = React.useState<null | HTMLElement>(null);
    const handleIconMouseEnter = (event: { currentTarget: React.SetStateAction<HTMLElement | null>; }) => {
        setAnchorElIcon(event.currentTarget);
    };

    const handleIconMouseLeave = () => {
        setAnchorElIcon(null);
    };
    const [isChecked, setIsChecked] = useState(false);
    const [defaultChecked,setDefaultChecked]=useState(true);
    const favouriteHandleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setDefaultChecked(false);
        setIsChecked(event.target.checked);
        //addToFavourite()
    };
    const [openReject, setOpenReject] = useState(false);
    const rejectHandleChange=()=>{
        setOpenReject(false);
    }
    const [openInfoReq, setOpenInfoReq] = useState(false);
    const infoReqHandleChange=()=>{
        setOpenInfoReq(false);
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
                //setSucPopupOpen(true);
                // You can add additional handling here if needed
            } else {
                // Handle the case where the POST request fails
                console.error('Failed to add item to cart.');
                showError('Failed to add item to cart.');
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error while adding item to cart:', error);
            showError('Error while adding item to cart: '+error);
        }
    };
    const addToFavourite = async () => {
        if(catlogitem.favourite===0)
            try {
                const requestBody = {
                    buyerMainCatalogId: catlogitem.buyerMainCatalogId,
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
                    console.log('tem added to favourites')
                    setPopupData("Item added to favourite successfully.");
                    showSuccess("Item added to favourite successfully.");
                    catlogitem.favourite=1;
                    // You can add additional handling here if needed
                } else {
                    // Handle the case where the POST request fails
                    console.error('Failed to add item to favourites.');
                    showError('Failed to add item to favourites.');
                }
            } catch (error) {
                // Handle any network or other errors
                console.error('Error while adding item to favourites:', error);
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
                    console.log('item deleted from favourites')
                    showSuccess("Item deleted from favourite successfully.");
                    catlogitem.favourite=0;
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
    return(
        <Box className={styles.CatalogGridView}>
            <Card>
                <Box className={styles.CardHeader}>
                        <Link className={styles.HeaderLink} onClick={openNavigate}>
                        {catlogitem.itemName+"("+catlogitem.materialCode +")"}
                        </Link>
                       <Box className={styles.IconContainer}>
                        {(catlogitem.status===CatalogStatusEnum.APPROVED||catlogitem.status===CatalogStatusEnum.FAVOURITES) && <Checkbox
                            {...label}
                            checked={defaultChecked?catlogitem.favourite===1:isChecked}
                            onClick={addToFavourite}
                            onChange={favouriteHandleChange}
                            icon={<FavoriteBorder className={styles.UnCheckedIcon} />}
                            checkedIcon={<Favorite className={styles.CheckedIcon} />}
                            className={styles.Checks}
                        />}
                        {catlogitem.status===CatalogStatusEnum.REJECTED && <Box onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave}>
                            <CancelIcon onMouseEnter={()=>setIconPopupData("Rejected")}  className={styles.CancelIcon} />
                        </Box>}
                        {catlogitem.status===CatalogStatusEnum.PENDING && <Box onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave}>
                            <ErrorIcon onMouseEnter={()=>setIconPopupData("Expiring Soon")} className={styles.ErrorIcon} />
                        </Box>}
                           {catlogitem.status===CatalogStatusEnum.PENDING&&<Stack direction={"row"}>
                               <IconButton><img src={Approve} className={styles.ImgIcon}  alt={"Approve Icon"}/></IconButton>
                               <IconButton onClick={()=>setOpenReject(true)}><img src={Reject} className={styles.ImgIcon}  alt={"Reject Icon"}/></IconButton>
                               <IconButton onClick={()=>setOpenInfoReq(true)}><img src={Info_Req} className={styles.ImgIcon}  alt={"Info Req Icon"}/></IconButton>
                           </Stack>}
                       </Box>
                </Box>
                    <Box className={styles.DisplayFlex}>
                        <Box className={styles.ImageLayout}>
                            <Box className={styles.ImageContainer}>
                                <img
                                    src="https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg"
                                    alt="green iguana"
                                    className={styles.Image}
                                />
                            </Box>
                            <Box>
                                <Box className={styles.ProdMarginBottom}>
                                    <Grid container columnSpacing={"16px"}>
                                        <Grid item xs={4}>
                                            <Item onMouseEnter={handleGridMouseEnter}
                                                  onMouseLeave={handleMouseLeave}>
                                                <Typography className={styles.TitleText}>From</Typography>
                                                <Typography className={`${styles.LabelText} ${styles.Ellipsis}`}>
                                                    {catlogitem.supplierCompanyName}
                                                </Typography>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Item>
                                                <Typography className={styles.TitleText}>Supplier Location</Typography>
                                                <Typography className={`${styles.LabelText} ${styles.Ellipsis}`}>
                                                    {catlogitem.supplierLocationName}
                                                </Typography>
                                            </Item>
                                        </Grid>
                                    </Grid>

                                </Box>
                                    {/*<Box className={`${styles.DisplayFlex} ${styles.ProdMarginTop} ${styles.ProdMarginBottom}`}>
                                        <Box className={styles.FromWidth}>
                                            <Typography className={styles.TitleText}>From</Typography>
                                            <Typography className={styles.LableText}>Company5</Typography>
                                        </Box>
                                        <Box>
                                            <Typography className={styles.TitleText}>Supplier Location</Typography>
                                            <Typography className={styles.LableText}>Bengaluru</Typography>
                                        </Box>
                                    </Box>*/}
                                    <Box className={styles.ContMarginBottom}>
                                        <Typography className={`${styles.TitleText} ${styles.ThemeColor}`}>Contract</Typography>
                                        <Link download={catlogitem.contractDoc} href={"none"} className={`${styles.ContractLink} ${styles.Ellipsis}`}>{catlogitem.contractDoc}</Link>
                                    </Box>

                            </Box>
                        </Box>
                    </Box>
                    <Box className={styles.Footer}>
                        <Box className={styles.AlignItem}>
                            <Box className={styles.UnitMrgnRight}>
                                <Typography className={`${styles.TitleText} ${styles.ThemeColor}`}>Units</Typography>
                                <Typography className={`${styles.TitleText} ${styles.ThemeColor}`}>{catlogitem.quantity + "(" + catlogitem.unit + ")"}</Typography>
                            </Box>
                            <Box>
                                <Typography className={`${styles.TitleText} ${styles.ThemeColor}`}>{catlogitem.currency}</Typography>
                                <Typography className={`${styles.TitleText} ${styles.ThemeColor}`}>{catlogitem.basePrice}</Typography>
                            </Box>
                        </Box>
                        {(catlogitem.status===CatalogStatusEnum.APPROVED||catlogitem.status===CatalogStatusEnum.FAVOURITES)&&<Box className={styles.AlignItem}>
                            <Box className={styles.AlignItem}>
                                <Typography className={`${styles.TitleText} ${styles.ThemeColor}`}>Qty</Typography>
                                <MuiInput
                                    size="small"
                                    className={`${styles.Input} ${styles.BtnMrgnRight} ${styles.InputLeft}`}
                                    inputProps={{
                                        step: 1,
                                        min: 1,
                                        max: 99,
                                        type: 'number',
                                        defaultValue: 1,
                                    }}
                                />
                            </Box>
                            <IconButton size={"small"} onClick={addToCart} className={styles.BtnBorder} aria-label="add to shopping cart">
                                <AddShoppingCartIcon fontSize={"small"} className={styles.ThemeColor}/>
                            </IconButton>
                        </Box>}
                        {catlogitem.status===CatalogStatusEnum.EXPIRED&&<IconButton onClick={()=>nevigate(`/ReNewPage?Item=${catlogitem.buyerMainCatalogId}`)}>
                            <AutorenewIcon className={styles.ThemeColor} /></IconButton>}
                    </Box>

            </Card>
            <Box>
                <Popup isOpen={sucpopupOpen} onRequestClose={sucPopupHandleClose} dataDisplay={popupData} />
            </Box>
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
export default CatalogGridView;