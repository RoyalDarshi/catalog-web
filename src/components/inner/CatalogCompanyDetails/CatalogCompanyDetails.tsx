import React, {FC, useEffect, useState} from 'react';
import styles from './CatalogCompanyDetails.module.scss';
import {Box, Popover, Tooltip, tooltipClasses, TooltipProps} from "@mui/material";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {showInfo} from "../../../services/alert-service";

interface CatalogCompanyDetailsProps {
    anchorEl:null | Element;
    catalogDetails:any;
}


const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: '#f5f5f9',
        fontSize: '16px',
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        minWidth:440,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const Item = styled(Box)(({ theme }) => ({
    textAlign: 'left',
}));

const StyledPopover = styled(Popover)(({ theme }) => ({
    boxShadow: 'none', // Remove the box shadow
}));


const CatalogCompanyDetails: FC<CatalogCompanyDetailsProps> = ({anchorEl},catalogDetails) => {

    const[currentCatalog,setCurrentCatalog] = useState<any>();

    useEffect(() => {
        setCurrentCatalog(catalogDetails)
      
    }, []);


    // @ts-ignore
    return(
        <Box  className={styles.CatalogCompanyDetails}
             >
            <HtmlTooltip
                PopperProps={{
                    anchorEl,
                    placement: 'bottom',
                }}
                className={styles.Popper}
                open={Boolean(anchorEl)}
                title={
                    <React.Fragment>

                <Box className={styles.GridContainer}  display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box className={styles.MarginBottom} gridColumn="span 12">
                        <Item>
                            <Typography className={styles.Title}>Company Name</Typography>
                            <Typography className={styles.Label}>""</Typography>
                        </Item>
                    </Box>
                    <Box className={styles.MarginBottom} gridColumn="span 12">
                        <Item>
                            <Typography className={styles.Title}>Company GST Registered</Typography>
                            <Typography className={styles.Label}>No</Typography>
                        </Item>
                    </Box>
                    <Box className={styles.MarginBottom} gridColumn="span 4">
                        <Item>
                            <Typography className={styles.Title}>Admin User name</Typography>
                            <Typography className={styles.Label}>Jagan Kumar</Typography>
                        </Item>
                    </Box>
                    <Box className={styles.MarginBottom} gridColumn="span 4">
                        <Item>
                            <Typography className={styles.Title}>Designation</Typography>
                            <Typography className={styles.Label}>Manager</Typography>
                        </Item>
                    </Box>
                    <Box className={styles.MarginBottom} gridColumn="span 4">
                        <Item>
                            <Typography className={styles.Title}>Mobile No.</Typography>
                            <Typography className={styles.Label}>8937281947</Typography>
                        </Item>
                    </Box>
                    <Box className={styles.MarginBottom} gridColumn="span 5">
                        <Item>
                            <Typography className={styles.Title}>Email ID</Typography>
                            <Typography className={styles.Label}>jagan@dropjar.com</Typography>
                        </Item>
                    </Box>
                    <Box gridColumn="span 4">
                        <Item>
                            <Typography className={styles.Title}>Location</Typography>
                            <Typography className={styles.Label}>Ameerpet</Typography>
                        </Item>
                    </Box>

                </Box>

                    </React.Fragment>
                }
                 >
                <Box></Box>
            </HtmlTooltip>

            </Box>
    );
}

export default CatalogCompanyDetails;
