import React from 'react';
import styles from './Popup.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';






interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    dataDisplay:string;
}


const Popup: React.FC<ModalProps> = ({ isOpen, onRequestClose,dataDisplay }) => {


    return(
        <Box className={styles.Popup}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-desciption"
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
                    <Box className={styles.ModelStyle}>
                        <Typography id="transition-modal-title" >
                            <Box
                                className={styles.ModelHeader}
                            >
                                <Box
                                    className={styles.ModelTitle}
                                >
                                    {dataDisplay}
                                </Box>
                                <Box>

                                        <CloseIcon className={styles.CloseIcon} fontSize={"small"} onClick={onRequestClose}/>

                                </Box>
                            </Box>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

export default Popup;