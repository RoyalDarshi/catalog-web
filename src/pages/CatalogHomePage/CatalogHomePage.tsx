import React, { useState  } from 'react';
import styles from './CatalogHomePage.module.scss';
import CatalogTopbar from "../../components/CatalogTopbar/CatalogTopbar.lazy";
import CatalogTabPanel from "../../components/CatalogTabPanel/CatalogTabPanel";
import CatalogSearchBar from "../../components/CatalogSearchBar/CatalogSearchBar";
import {Box} from "@mui/material";
import AddFromExcel from '../../components/inner/AddFromExcel/AddFromExcel';


export default function CatalogHomePage() {
    const [open, setOpen] = useState(false);
    const [filteredData, setFilteredData] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleFilterChange = (filterString:any) => {
    
    setFilteredData(filterString);

};

  
    return (
        <Box className={styles.CatalogHomePage} data-testid="CatalogHomePage">

                <Box className={styles.TopHeader}>
                    <CatalogTopbar openModal={handleOpen}/>
                </Box>
                <Box>
                    <CatalogSearchBar filterData={handleFilterChange} />
                </Box>
                <Box>
                    <CatalogTabPanel filterString={filteredData}/>
                </Box>
            <Box>
                <AddFromExcel isOpen={open} onRequestClose={handleClose} />
            </Box>
        </Box>
        
    );
}


