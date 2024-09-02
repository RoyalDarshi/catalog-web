import React from 'react';
import styles from './PanelBadgeComponent.module.scss';
import {Box} from "@mui/material";


export default function PanelBadgeComponent(){
    return (
        <Box className={styles.PanelBadgeComponent}>
            <Box>
               <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.71861 5.15963L1.54128 3.04642C1.17027 2.68389 0.602961 2.51139 0.231951 2.87392C-0.138905 3.2363 -0.0359357 3.70471 0.334921 4.06709L2.95314 6.72821C3.32399 7.0906 3.92548 7.0906 4.29633 6.72821L9.66944 1.47788C10.0403 1.11535 10.136 0.51947 9.76512 0.156938C9.39411 -0.205445 8.73852 0.125195 8.36751 0.487577L3.71861 5.15963Z" fill="white"/>
                </svg>
            </Box>
            <Box>
            &nbsp;Filter Applied
            </Box>
        </Box>
    );
}

