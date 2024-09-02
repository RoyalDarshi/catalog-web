import React, {useEffect, useState} from 'react';
import styles from './CartItems.module.scss';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import {Grid, Tooltip, tooltipClasses, TooltipProps, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MuiInput from '@mui/material/Input';
import Link from "@mui/material/Link";
import {useNavigate} from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import {styled} from "@mui/material/styles";
import Popup from "../Popup/Popup";
import IconPopup from "../IconPopup/IconPopup";
import {showError, showSuccess} from "../../../services/alert-service";

interface cartItemModel{
    buyerMainCatalogId: "string",
       itemName: string,
       imageName: string,
       contractDoc: string,
       unit: string,
       quantity: string,
       status: boolean,
       minimumQuantity: string,
       businessUnit: string,
       description: string,
       categoryId: string,
       supplierLocation: string,
       supplierCompanyId: string,
       paymentTerm: string,
       locationId: string,
       projectId: string,
       basePrice: string,
       currency: string,
       clientId: string,
       cartItemCount: BigInt
   }
interface ChildProps{
    cartItems: cartItemModel;
    handleMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleMouseLeave: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Item = styled(Box)(() => ({
    textAlign: 'left',
}));
const CartItems: React.FC<ChildProps> = ({cartItems ,handleMouseEnter,handleMouseLeave}) => {
    const[popupData,setPopupData]=useState("");
   const deleteFromCart=async ()=>{
       try{
           const response = await fetch( process.env.REACT_APP_API_BASE_URL +`cart/remove/item/${cartItems.buyerMainCatalogId}`,
               {
                   method: 'DELETE',
                   headers: {
                       'Content-Type': 'application/json',
                   },
               });
           if (response.ok) {
               // Item added to the cart successfully

               showSuccess("Item deleted from cart successfully.");
               //setPopupOpen(true);
               // You can add additional handling here if needed
           } else {
               // Handle the case where the POST request fails
               console.error('Failed to delete item from cart.');
               showError('Failed to delete item from cart.');
           }
       }catch (error){
           // Handle any network or other errors
           console.error('Error while deleting item from cart:', error);
           showError('Error while deleting item from cart: '+error);
       }
   }
    const nevigate=useNavigate();
    const [anchorElIcon, setAnchorElIcon] = React.useState<null | HTMLElement>(null);
    const handleIconMouseEnter = (event: { currentTarget: React.SetStateAction<HTMLElement | null>; }) => {
        setAnchorElIcon(event.currentTarget);
    };

    const handleIconMouseLeave = () => {
        setAnchorElIcon(null);
    };
    const [iconPopupData,setIconPopupData]=useState("Minimum Order Quantity");
    const data = cartItems;
    const [popupOpen, setPopupOpen] = useState(false);
    const popupHandleOpen = () => {
        setPopupOpen(true)
    }
    const popupHandleClose = () => {
        setPopupOpen(false);

    };

    return (
        <Box >
            <Box>
                <Card className={styles.CartItems}>
                    <Box
                       className={styles.CardHeader}
                    >
                        <Box
                            className={styles.ProdName}
                        >
                            <Link onClick={()=>nevigate("/ProductDetails")} className={`${styles.ProdName} ${styles.ProdNameLink}`}>{cartItems.itemName}</Link>
                        </Box>
                        <Box >
                            <Button disabled={false} variant="outlined" size='small' onClick={deleteFromCart} className={styles.DeleteBtn} >Delete</Button>
                        </Box>
                    </Box>
                    <Box>
                        <Box className={styles.CardBody}>
                            <Box className={styles.CardActionArea}>

                                    <Box className={styles.CartImg}>
                                        <img
                                            src="https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg"
                                            alt="green iguana"
                                            className={styles.Image}
                                        />
                                    </Box>

                                <Box className={styles.GridWidth}>
                                    <Grid container columnSpacing={2}>
                                        <Grid item xs={7} className={`${styles.PriceMargin} ${styles.Ellipsis}`}>
                                            <Item>
                                                <Typography
                                                    className={styles.HeadingSize}>Catalog ID</Typography>
                                                <Typography className={`${styles.CatalogColor} ${styles.HeadingSize}  ${styles.Ellipsis}`}>{cartItems.buyerMainCatalogId}</Typography>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={5} className={`${styles.PriceMargin}`}>
                                            <Item onMouseEnter={handleMouseEnter}
                                                  onMouseLeave={handleMouseLeave}
                                            >
                                                <Typography
                                                    className={styles.HeadingSize}>From</Typography>
                                                <Typography className={`${styles.TextSize}  ${styles.Ellipsis}`}>{cartItems.supplierCompanyId }</Typography>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={7} >
                                            <Item>
                                                <Typography
                                                    className={styles.HeadingSize}>Project</Typography>
                                                <Typography
                                                    className={`${styles.TextSize}  ${styles.Ellipsis}`}>{cartItems.projectId}</Typography>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Item>
                                                <Typography
                                                    className={`${styles.HeadingSize} ${styles.MOQ}`}>MOQ
                                                    <Box onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave}>
                                                        <ErrorIcon onMouseEnter={()=>setIconPopupData("Minimum Order Quantity")} className={styles.ErrIcon} />
                                                    </Box>
                                                </Typography>
                                                <Typography
                                                    className={`${styles.TextSize}`}>{cartItems.minimumQuantity}</Typography>
                                            </Item>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                            <Box className={styles.DescMargin}>
                                <Typography
                                    className={styles.HeadingSize}>Description</Typography>
                                <Typography
                                    className={styles.TextSize}>{cartItems.description}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    className={styles.HeadingSize}>Catalogued for Location </Typography>
                                <Typography
                                    className={styles.TextSize}>{cartItems.locationId}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            className={styles.CartFooter}
                        >
                            <Box className={styles.DisplayFlex}>
                                <Box className={`${styles.Float} ${styles.QtyMargin}`}>
                                    <Typography
                                        className={styles.HeadingSize}>Available Qty</Typography>
                                    <Typography
                                        className={`${styles.HeadingSize}`}>{cartItems.quantity}</Typography>
                                </Box>
                                <Box>

                                    <Typography
                                        className={styles.HeadingSize}>{cartItems.currency}</Typography>
                                    <Typography
                                        className={styles.HeadingSize}>{cartItems.basePrice}</Typography>
                                </Box>
                            </Box>
                           <Box className={styles.DisplayFlex}>
                               <Box className={`${styles.DisplayFlex}`}>
                                   <Typography
                                       className={`${styles.HeadingSize}`}
                                   >Quantity</Typography>
                                   <MuiInput
                                       size="small"
                                       className={styles.Input}
                                       inputProps={{
                                           step: 1,
                                           min: 1,
                                           max: 999,
                                           type: 'number',
                                           defaultValue: 1
                                       }}
                                   />
                               </Box>
                               <Box className={`${styles.HeadingSize} ${styles.TotalPrice} ${styles.PriceColor}`} >
                                   <Box >Total Price</Box>
                                   <Box className={styles.PriceColor}>{cartItems.basePrice}</Box>
                               </Box>
                           </Box>
                        </Box>
                    </Box>
                </Card>
                <Box>
                    <Popup isOpen={popupOpen} onRequestClose={popupHandleClose} dataDisplay={popupData} />
                </Box> <Box>

            </Box>
            </Box>
            <Box>
                <IconPopup data={iconPopupData} anchorEl={anchorElIcon} />
            </Box>
        </Box>
    );
}
export default CartItems;