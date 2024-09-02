import React, { FC } from 'react';
import styles from './InfoReqDialog.module.scss';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

interface InfoReqDialogProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const InfoReqDialog: FC<InfoReqDialogProps> = ({isOpen,onRequestClose}) => (
    <div className={styles.InfoReqDialog}>
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
                    <Box className={styles.ModalHeader}>
                        <Typography id="modal-title" className={styles.ModalTitle} >
                            Info Request Comments
                        </Typography>
                        <Button onClick={onRequestClose}>
                            <CloseIcon />
                        </Button>
                    </Box>
                    <Box className={styles.ListMargin}>
                    </Box>
                    <Box className={styles.TextField}>
                        <TextField fullWidth={true} multiline={true} rows={3} />
                    </Box>
                    <Stack
                        spacing={2}
                        direction="row"
                        className={styles.Footer}
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            className="Btn"
                            disabled={false}
                            onClick={onRequestClose}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            className="Btn"
                            size="small"
                            disabled={false}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    </div>
);

export default InfoReqDialog;
