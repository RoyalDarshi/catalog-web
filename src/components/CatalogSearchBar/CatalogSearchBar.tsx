import React, { useState } from 'react';
import {Box} from "@mui/material";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import styles from './CatalogSearchBar.module.scss';


interface ModalProps {
    filterData: (filterstring:any) => void;  
}

const CatalogSearchBar: React.FC<ModalProps> = ({filterData}) => {
    const [searchString,setSearchString] = useState('');
    const handleFilterData = (event:any) =>{
        setSearchString(event)
        filterData(event);
    }
    const sendFilteredData = () =>{
        //filterData(searchString);
    }
    return (

            <Box
                component="form"
                className={styles.CatalogSearchBar}

            >

                <Box className={styles.SearchInput}>
                    <InputBase fullWidth
                               className={styles.InputBase}
                               id={'search-item'}
                               placeholder="Search by Item / Services / Supplier"
                               value={searchString}
                               inputProps={{'aria-label': 'Search by Item / Services / Supplier'}}
                               onChange={(e)=>{handleFilterData(e.target.value)}}
                    />
                    <IconButton type="button" onClick={sendFilteredData} className={styles.IconBtn} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Box>

            </Box>



    );

}
export default CatalogSearchBar;
