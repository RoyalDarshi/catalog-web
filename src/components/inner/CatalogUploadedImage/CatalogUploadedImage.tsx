import React, { FC } from 'react';
import styles from './CatalogUploadedImage.module.scss';
import {Box, Popper} from "@mui/material";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

interface CatalogUploadedImageProps {}

const CatalogUploadedImage: FC<CatalogUploadedImageProps> = () => {
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return(
        <Box className={styles.CatalogUploadedImage}>
            <Popper  id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box>
                            <Box className={styles.TitleContainer}>
                               <Typography className={styles.Title}>RFQ_Doc_V1.docx (1.5 MB)</Typography>
                                <Button onClick={()=>{setOpen(false)}}><CloseIcon /></Button>
                            </Box>
                            <Box className={styles.ImageContainer}>
                                <img className={styles.Image} src={"https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"} />
                            </Box>
                        </Box>
                    </Fade>
                )}
            </Popper>
        </Box>
    );
}
export default CatalogUploadedImage;
