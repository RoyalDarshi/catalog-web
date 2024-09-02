import React, { FC, useState } from 'react';
import styles from './UploadImage.module.scss';
import {Box, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface UploadImageProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onFilesSelected: (files: File[]) => void;
}



const UploadImage: FC<UploadImageProps> = ({ isOpen, onRequestClose,onFilesSelected }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []) as File[];
        if (files) {
            setSelectedFiles(files);
            setShowPopup(true);

        }
    };
    const formatSize = (bytes: number): string => {
        const megabytes = bytes / (1024 * 1024);
        return megabytes.toFixed(2) + ' MB';
    };

    const closePopup = () => {
        setSelectedFiles([]);
        setShowPopup(false);
        onRequestClose();

    };
    const upload=()=>{
        onFilesSelected(selectedFiles);
        onRequestClose();
        setSelectedFiles([]);

    }
    const removeFile = (fileToRemove: File) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
    };
    return(

        <Box className={styles.UploadImage}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={closePopup}
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
                                Uploaded images
                            </Typography>
                            <Button onClick={closePopup}>
                                <CloseIcon />
                            </Button>
                        </Box>
                        <Box className={styles.NoteBox}>
                            <Typography className={styles.UploadNote}>
                                Note: Please Upload .xls | .xlsx | .doc | .docx | .pdf | .jpeg | .jpg |.png files only
                            </Typography>
                        </Box>
                        {selectedFiles.length<1 && <Box className={`${styles.UploadBox} ${styles.Height}`}>
                            <Box>
                                <Button
                                    component="label"
                                    className={"UploadBtn"}

                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="14"
                                        viewBox="0 0 13 14"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.4444 9.01761C1.4444 8.61882 1.12104 8.29546 0.722349 8.29546C0.323462 8.29546 0 8.61882 0 9.01761V12.4119C0 12.8108 0.323363 13.1343 0.722349 13.1343H12.2777C12.6765 13.1343 13 12.8109 13 12.4119V9.01761C13 8.61882 12.6766 8.29546 12.2777 8.29546C11.8788 8.29546 11.5556 8.61882 11.5556 9.01761L11.5557 11.6896H1.4445L1.4444 9.01761ZM8.00155 4.11058L7.22242 3.33125V9.55387C7.22242 9.95266 6.89906 10.2759 6.50007 10.2759C6.10119 10.2759 5.77772 9.95266 5.77772 9.55387V3.33125L4.9986 4.11058C4.71664 4.39254 4.25924 4.39254 3.97737 4.11058C3.69541 3.82862 3.69541 3.37132 3.97737 3.08936L5.98946 1.07727C6.27162 0.795207 6.72882 0.795207 7.01068 1.07727L9.02297 3.08936C9.30493 3.37142 9.30493 3.82872 9.02297 4.11058C8.74064 4.39244 8.28351 4.39244 8.00155 4.11058Z"
                                            fill="#0748AE"
                                        />
                                    </svg>
                                    &nbsp;Upload the file
                                    <input
                                        accept=".xls,.xlsx,.doc,.docx,.pdf,.jpeg,.jpg,.png"
                                        hidden
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple={true}
                                    />
                                </Button>
                            </Box>
                        </Box>}
                        <Box className={`${styles.Margin}`}>
                            {showPopup && selectedFiles.length > 0 && (
                               <Box className={`${styles.DisplayFlex} ${styles.Scroll} ${styles.MedHeight}`}> {
                                    selectedFiles.map((file: File) => (
                                        <Box className={styles.PopupContainer}>
                                            <Box className={styles.Popup}>
                                                <Box className={styles.AlignItem}>
                                                    <Typography className={`${styles.PopupTitle} ${styles.FileName}`}>{file.name}</Typography>
                                                    <Typography className={styles.PopupTitle}>&nbsp;({formatSize(file.size)})</Typography>
                                                </Box>
                                                <CloseIcon className={styles.CloseIcon} onClick={()=>removeFile(file)} />
                                            </Box>
                                            <Box className={styles.ImgCenter}>
                                                <img className={styles.UploadedImage} src={URL.createObjectURL(file)} alt="Uploaded" />
                                            </Box>
                                        </Box>
                                    ))
                                }
                                </Box>
                            )}
                        </Box>
                        {selectedFiles.length>0&&<Box className={styles.Footer}>
                            <Stack direction={"row"} spacing={2}>
                                <Button variant={"outlined"} disabled={false} className="Btn" onClick={closePopup}>Cancel</Button>
                                <Button variant={"contained"} disabled={false} className="Btn" onClick={upload}>Upload</Button>
                            </Stack>
                        </Box>}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}
export default UploadImage;
