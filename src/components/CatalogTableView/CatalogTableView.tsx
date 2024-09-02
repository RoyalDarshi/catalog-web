import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import {DataGrid, GridColDef, GridColumnHeaderParams,} from "@mui/x-data-grid";
import styles from './CatalogTableView.module.scss'
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {Tooltip, tooltipClasses, TooltipProps} from "@mui/material";
import MuiInput from "@mui/material/Input";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";
import {CatalogStatusEnum} from "../../services/models/workflow-data-model";
import {CatalogSummaryDTO} from "../../services/models/CatalogSummaryDTO";
import {useState} from "react";
import IconPopup from "../inner/IconPopup/IconPopup";
import Popup from "../inner/Popup/Popup";
import {showError, showSuccess} from "../../services/alert-service";
import Stack from "@mui/material/Stack";
import Approve from "../../../public/Approve.png";
import Reject from "../../../public/Reject.png";
import Info_Req from "../../../public/Info_Req.png";
import RejectDialog from "../inner/RejectDialog/RejectDialog";
import InfoReqDialog from "../inner/InfoReqDialog/InfoReqDialog";
import AutorenewIcon from "@mui/icons-material/Autorenew";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
interface ChildTableProps {
    catalogListItems: CatalogSummaryDTO[];
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    '.MuiDataGrid-columnHeaderTitle': {
        fontWeight: 600},
    '.MuiDataGrid-row:nth-child(even)':{
        backgroundColor: '#F5F5F5'
    }
}));
const CatalogTableView: React.FC<ChildTableProps> = ({ catalogListItems }) => {
    const navigate = useNavigate();
    const openNavigate=(row:any)=>{
        if(row.status===CatalogStatusEnum.DRAFT){
            navigate("/EditCatalog");
        }
        else{
            navigate(`/ProductDetails?Item=${row.buyerMainCatalogId}`);
        }
    }
    const [sucpopupOpen, setSucPopupOpen] = useState(false);
    const sucPopupHandleClose = () => {
        setSucPopupOpen(false);
    };
    const[popupData,setPopupData]=useState("");
    const [anchorElIcon, setAnchorElIcon] = React.useState<null | HTMLElement>(null);

    const [openReject, setOpenReject] = useState(false);
    const rejectHandleChange=()=>{
        setOpenReject(false);
    }
    const [openInfoReq, setOpenInfoReq] = useState(false);
    const infoReqHandleChange=()=>{
        setOpenInfoReq(false);
    }
    const handleIconMouseEnter = (event: { currentTarget: React.SetStateAction<HTMLElement | null>; }) => {
        setAnchorElIcon(event.currentTarget);
    };

    const handleIconMouseLeave = () => {
        setAnchorElIcon(null);
    };
    const [iconPopupData,setIconPopupData]=useState("no value");
    const addToCart = async (row:any) => {
        try {
            // Create a request payload based on your API's requirements
            const requestBody = {
                // Include the necessary data from catlogitem
                buyerMainCatalogId: row.buyerMainCatalogId,
                itemName: row.itemName,
                imageName: row.imageName,
                contractDoc: row.contractDoc,
                unit: row.unit,
                quantity: row.quantity,
                status: row.status,
                minimumQuantity: row.minimumQuantity,
                businessUnit: row.businessUnit,
                description: row.description,
                categoryId: row.categoryId,
                category: row.category,
                supplierLocation: row.supplierLocation,
                supplierLocationName: row.supplierLocationName,
                supplierCompanyId: row.supplierCompanyId,
                supplierCompanyName: row.supplierCompanyName,
                paymentTerm: row.paymentTerm,
                locationId: row.locationId,
                location: row.location,
                projectId: row.projectId,
                projectName: row.projectName,
                basePrice: row.basePrice,
                currency: row.currency,
                clientId: row.clientId,
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
    const addToFavourite = async (row:any) => {
        //setSucPopupOpen(true);
        if(row.favourite===0)
            try {
                const requestBody = {
                    buyerMainCatalogId: row.buyerMainCatalogId,
                };


                // Send a POST request to your API endpoint for adding to the cart
                const response = await fetch(process.env.REACT_APP_API_BASE_URL + `catalog-management/add-favorite/${row.buyerMainCatalogId}`,
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
                    showSuccess("Item added to favourite successfully.");
                    row.favourite=1;
                    // You can add additional handling here if needed
                } else {
                    // Handle the case where the POST request fails
                    console.error('Failed to add item to favourites.');
                    showError('Failed to add item to favourites.');
                }
            } catch (error) {
                // Handle any network or other errors
                showError('Error while adding item to favourites: '+error);
                console.error('Error while adding item to favourites:', error);
            }

        else {
            try{
                const response = await fetch( process.env.REACT_APP_API_BASE_URL +`catalog-management/remove-favorite/${row.buyerMainCatalogId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                if (response.ok) {
                    // Item added to the cart successfully
                    console.log('item deleted from favourites')
                    //setPopupData("Item deleted from favourite successfully.");
                    showSuccess("Item deleted from favourite successfully.");
                    row.favourite=0;
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
    const gridColumns: GridColDef[] = [

        {
            field: 'itemName', flex: 1.5, headerName: 'Product Name',
            renderCell: (params) => {
                return <Link className={styles.LinkStyle} onClick={()=>openNavigate(params.row)}>{params.value}</Link>
            }, headerClassName: `${styles.Header}`
        },
        { field: 'buyerMainCatalogId', flex: 1.5, headerName: 'Catalog Id', headerClassName: `${styles.Header}` },
        { field: 'supplierCompanyName', flex: 1.5, headerName: 'Supplier', headerClassName: `${styles.Header}` },
        { field: 'location', headerName: 'Location', flex: 1.5, headerClassName: `${styles.Header}` },
        { field: 'projectName', headerName: 'Project', flex: 1.5, headerClassName: `${styles.Header}`},
        { field: 'minimumQuantity',
            renderHeader: (params: GridColumnHeaderParams) => (
                <Typography className={`${styles.Header} ${styles.AlignCenter}`}>
                    MOQ
                    <Box className={styles.MOQ}>
                        <Box onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave}>
                            <svg onMouseEnter={()=>setIconPopupData("Minimum Order Quantity")} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 0C4.40868 0 2.88259 0.632138 1.75739 1.75739C0.632138 2.88255 0 4.40873 0 6C0 7.59127 0.632138 9.11741 1.75739 10.2426C2.88255 11.3679 4.40873 12 6 12C7.59127 12 9.11741 11.3679 10.2426 10.2426C11.3679 9.11745 12 7.59127 12 6C12 4.94684 11.7228 3.91214 11.1962 3.00002C10.6695 2.0879 9.91214 1.33053 8.99998 0.803823C8.08786 0.277241 7.05316 0 6 0V0ZM6.66002 8.99994C6.66002 9.23573 6.53421 9.45362 6.32998 9.57147C6.12582 9.68941 5.87419 9.68941 5.67004 9.57147C5.46581 9.45362 5.34 9.23573 5.34 8.99994V5.35196C5.34 5.11616 5.46581 4.89828 5.67004 4.78034C5.8742 4.66248 6.12583 4.66248 6.32998 4.78034C6.53421 4.89828 6.66002 5.11616 6.66002 5.35196V8.99994ZM6 3.59997C5.78362 3.59997 5.57604 3.51401 5.42302 3.361C5.27 3.208 5.18405 3.00041 5.18405 2.78402C5.18405 2.56755 5.27001 2.35998 5.42302 2.20696C5.57603 2.05394 5.78362 1.96799 6 1.96799C6.21638 1.96799 6.42396 2.05395 6.57698 2.20696C6.72999 2.35997 6.81595 2.56755 6.81595 2.78402C6.81595 3.00041 6.72999 3.20798 6.57698 3.361C6.42398 3.51402 6.21638 3.59997 6 3.59997Z" fill="#2E3133"/>
                            </svg>
                        </Box>
                    </Box>
                </Typography>
            )
        , flex: 1.5,headerClassName: `${styles.Header}`},
        { field: 'basePrice', headerName: 'Unit Price', flex: 1.5, headerClassName: `${styles.Header}` },
        { field: 'qty', headerName: 'Quantity', flex: 1.5, headerClassName: `${styles.Header} ${styles.QtyMargin}`, renderCell: (params) => {
                return (
                    <>
                    {(params.row.status===CatalogStatusEnum.APPROVED)&&<MuiInput
                        size="small"
                        className={styles.Input}
                        inputProps={{
                            step: 1,
                            min: 1,
                            max: 99999,
                            type: 'number',
                            defaultValue: 1
                        }}
                    />}
                    </>
                ) }},
        {
            field: 'action', headerName: 'Action', flex: 1.5, renderCell: (params) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [isChecked, setIsChecked] = useState(false);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [defaultChecked,setDefaultChecked]=useState(true);
                const favouriteHandleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
                    setDefaultChecked(false);
                    setIsChecked(event.target.checked);
                    //addToFavourite()
                };
                return (<Box className={styles.AlignCenter}>

                    {(params.row.status===CatalogStatusEnum.APPROVED||params.row.status===CatalogStatusEnum.FAVOURITES)&&<IconButton onClick={()=>addToCart(params.row)} className={styles.ThemeColor}><AddShoppingCartIcon /></IconButton>}
                    {(params.row.status===CatalogStatusEnum.APPROVED||params.row.status===CatalogStatusEnum.FAVOURITES)&&<Checkbox className={styles.Checks} checked={defaultChecked?params.row.favourite===1:isChecked} onClick={()=>addToFavourite(params.row)} onChange={favouriteHandleChange}  {...label}  icon={<FavoriteBorder className={styles.ThemeColor} />} checkedIcon={<Favorite className={styles.RedColor} />} />}
                    {params.row.status===CatalogStatusEnum.REJECTED && <Box onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave} >
                        <CancelIcon onMouseEnter={()=>setIconPopupData("Rejected")} className={styles.CancelIcon} />

                    </Box>}
                    {params.row.status===CatalogStatusEnum.PENDING && <Box onMouseEnter={handleIconMouseEnter} onMouseLeave={handleIconMouseLeave}>

                        <ErrorIcon onMouseEnter={()=>setIconPopupData("Expiring Soon")} className={styles.ErrorIcon} />

                    </Box>}
                    {params.row.status===CatalogStatusEnum.PENDING&&<Stack direction={"row"}>
                        <IconButton><img src={Approve} className={styles.ImgIcon}  alt={"Approve Icon"}/></IconButton>
                        <IconButton onClick={()=>setOpenReject(true)}><img src={Reject} className={styles.ImgIcon}  alt={"Reject Icon"}/></IconButton>
                        <IconButton onClick={()=>setOpenInfoReq(true)}><img src={Info_Req} className={styles.ImgIcon}  alt={"Info Req Icon"}/></IconButton>
                    </Stack>}
                    {params.row.status===CatalogStatusEnum.EXPIRED&&<IconButton onClick={()=>navigate(`/ReNewPage?Item=${params.row.buyerMainCatalogId}`)}>
                        <AutorenewIcon className={styles.ThemeColor} /></IconButton>}
                </Box>)
            }, headerClassName: `${styles.Header} ${styles.MarginLeft}`
        }
    ]


    return (
        <Box>

                <StripedDataGrid  editMode={"cell"}
                          disableRowSelectionOnClick={true}
                 className={styles.DataGrid} columns={gridColumns} rows={catalogListItems}
                    getRowId={(row) => catalogListItems?.indexOf(row)}

                />
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

export default CatalogTableView

