import React, {FC} from 'react';
import styles from './CatalogUploadedItem.module.scss';
import {Box, Popper} from "@mui/material";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {bottom} from "@popperjs/core";

interface CatalogUploadedItemProps {
    fileName:string;
    anchorEl: HTMLLabelElement | null;
    open: boolean;
    onClose: () => void;
}

const CatalogUploadedItem: FC<CatalogUploadedItemProps> = ({ fileName, open, onClose, anchorEl }) => {





    return(
        <Box className={styles.CatalogUploadedItem}>
            <Popper anchorEl={anchorEl} open={open} placement={bottom} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box className={styles.TitleContainer}>
                            <Typography className={styles.TitleName}>
                                {fileName}
                            </Typography>
                            <Box className={styles.DisplayFlex}>
                                <Button>
                                    <VisibilityIcon className={styles.IconColor}/>
                                </Button>
                                <Button onClick={onClose}>
                                    <CloseIcon className={styles.IconColor}/>
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                )}
            </Popper>
        </Box>
    );
}
export default CatalogUploadedItem;
