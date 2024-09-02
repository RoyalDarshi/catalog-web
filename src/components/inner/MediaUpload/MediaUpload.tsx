import React, { FC } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Carousel from 'react-material-ui-carousel';
import styles from './MediaUpload.module.scss';
import { Box } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';





const images: any[] = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },

];


interface ChildComponentProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onRequestOpen: () => void
}

const MediaUpload: FC<ChildComponentProps> = ({ isOpen, onRequestClose, onRequestOpen }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);




    return (
        <Box className={styles.MediaUpload}>
            <Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isOpen}
                    onClose={onRequestClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={isOpen}>
                        <Box className={styles.ModalStyle}>

                                <Box className={styles.ListTitleBar}>
                                    <Box className={styles.ListTitle}>
                                        All uploaded images
                                    </Box>
                                    <Button onClick={onRequestClose}>
                                        <CloseIcon className={styles.IconColor} />
                                    </Button>
                                </Box>

                            <Box className={styles.ListBody}>

                                    <Box className={styles.JustifyCenter}>
                                        { images.length>0?(
                                        <ImageList
                                            className={styles.ListImage}
                                            cols={4}
                                            rowHeight={"auto"}
                                        >
                                            {images.map((image) => (
                                                <ImageListItem key={image.img}>
                                                    <img
                                                        src={`${image.img}?w=164&h=164&fit=crop&auto=format`}
                                                        srcSet={`${image.img}?w=164&h=164&fit=crop&auto=format&dpr=2`}
                                                        alt={image.title}
                                                        loading='lazy'
                                                        className={styles.ListImg}
                                                        onClick={() => {
                                                            onRequestClose()
                                                            handleOpen()
                                                        }}

                                                    />
                                                </ImageListItem>
                                            ))}

                                        </ImageList>

                                        ):(
                                            <Box className={styles.JustifyCenter}>
                                            <Typography>No images available !</Typography>
                                            </Box>
                                        )
                                        }
                                    </Box>


                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Box>{/*Image List*/}
            <Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box className={styles.CorosalStyle}>

                                <Box className={styles.ListTitleBar} >
                                    <Box className={styles.ListTitle}>
                                        Image_Name1
                                    </Box>
                                    <Box>
                                        <Button className={styles.ViewImage} onClick={() => {
                                            handleClose();
                                            onRequestOpen();
                                        }}>
                                            <VisibilityIcon />
                                            &nbsp;View all images
                                        </Button>
                                        <Button onClick={handleClose}>
                                            <CloseIcon className={styles.IconColor} />
                                        </Button>
                                    </Box>
                                </Box>

                            <Box className={styles.ListBody}>

                                    <Box >
                                        {images.length>0?
                                        <Carousel animation="slide" navButtonsAlwaysVisible={true} indicators={false}>
                                            {images.map((image) => (
                                                <img
                                                    src={`${image.img}?w=164&h=164&fit=crop&auto=format`}
                                                    srcSet={`${image.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                    className={styles.CourasalImage} alt={image.title} />
                                            ))}
                                        </Carousel>
                                            :<Box className={styles.JustifyCenter}>
                                                <Typography>No images available !</Typography>
                                            </Box>
                                        }
                                    </Box>

                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        </Box>
    );
}

export default MediaUpload;