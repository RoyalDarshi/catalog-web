import React, { FC } from 'react';
import styles from './IconPopup.module.scss';
import {Box, Tooltip, tooltipClasses, TooltipProps} from "@mui/material";
import {styled} from "@mui/material/styles";

interface IconPopupProps {
    data:string;
    anchorEl:null | Element;
}

const IconPopup: FC<IconPopupProps> = ({data,anchorEl}) => {
    const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: 'var(--black, #2E3133)',
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: 'var(--black, #2E3133)',
            padding: '12px 12px 9.78px 12px',
            color: '#FFF',
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '20px', /* 142.857% */
        },
    }));
    return(
        <Box className={styles.IconPopup}>
            <BootstrapTooltip
                open={Boolean(anchorEl)}
                PopperProps={{
                anchorEl,
                placement: 'bottom',
            }} title={`${data}`}><Box></Box></BootstrapTooltip>
        </Box>
    );
}

export default IconPopup;
