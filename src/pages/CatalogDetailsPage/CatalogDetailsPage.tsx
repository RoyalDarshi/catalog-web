import React, {useState} from 'react';
import styles from './CatalogDetailsPage.module.scss';
import {Box, Button} from "@mui/material";
import ApprovedStatus from "../../components/inner/ApprovedStatus/ApprovedStatus";
import CatalogProductDetails from "../../components/inner/CatalogProductDetails/CatalogProductDetails";
import PriceStructure from "../../components/inner/PriceStructure/PriceStructure";
import MediaUpload from "../../components/inner/MediaUpload/MediaUpload";
import StatusLog from "../../components/StatusLog/StatusLog";
import APIServices from '../../services/APIServices';
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {ChevronRight} from "@mui/icons-material";
import {showError} from "../../services/alert-service";


export default function CatalogDetailsPage() {
    const [open, setOpen] = useState(false);    
    
    const [s_catlogId, setcatlogId] = useState('');
    const apiService = new APIServices();
    const [pricestructureData, setPriceData] = React.useState<typeof PriceStructure[]>([]);
    let catlogid:string=''
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchPrice = async (catlogId: string) => {
        try {

            var priceStructures = await apiService.getProductDetailsByCatlogId(catlogId);
            setPriceData(priceStructures.data);
        } catch (error) {
            showError('Error fetching data: \r\n'+JSON.stringify(error));
        }
    };

    const [medOpen, setMedOpen] = useState(false);

    const medHandleOpen=()=>{
        setMedOpen(true)
    }
    const medHandleClose = () => {
        setMedOpen(false);
    };


    const [logOpen, setLogOpen] = useState(false);

    const logHandleOpen=()=>{
        setLogOpen(true)
    }
    const logHandleClose = () => {
        setLogOpen(false);
    };


    const fetchCatlogId = (catlogId: string) => {

        catlogid=catlogId;
        setcatlogId(catlogId);
        fetchPrice(catlogId)

    };
    const nevigate=useNavigate();
    return(
        <>
            <Box className={styles.PagePadding}>
                <Typography className="TopPagePath"><Link onClick={()=>{nevigate('/')}} className="PageLink">My Catalog</Link>&nbsp;<ChevronRight />&nbsp;Product Details</Typography>
            </Box>
            <Box className={styles.CatalogDetailsPage} data-testid="CatalogDetailsPage">

                <Box>
                    <ApprovedStatus openModal={logHandleOpen} />
                </Box>
                <Box>
                    <CatalogProductDetails openModal={handleOpen} openMedModal={medHandleOpen} getCatlogId={fetchCatlogId} />



                </Box>
                <Box>
                    <PriceStructure isOpen={open} onRequestClose={handleClose} priceData={pricestructureData}/>
                </Box>
                <Box>
                    <MediaUpload  isOpen={medOpen} onRequestClose={medHandleClose} onRequestOpen={medHandleOpen} />
                </Box>
                <Box>
                    <StatusLog isOpen={logOpen} onRequestClose={logHandleClose} catalogListItems={[]} />
                </Box>
                <Box className={styles.PageFooter}>

                    <Button
                        variant="outlined"
                        size="small"
                        className="Btn"
                        disabled={false}
                        onClick={()=>{nevigate("/")}}
                    >
                        Back
                    </Button>

                </Box>
            </Box>
        </>
    );
}

