import React, { useState } from 'react';
import styles from './AddFromExcel.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// @ts-ignore
import excelFormat from '../../../../public/catalog_excel (2) (1).xlsx';
import {useNavigate} from "react-router-dom";


interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const AddFromExcel: React.FC<ModalProps> = ({ isOpen, onRequestClose }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setShowPopup(true);
        }
    };
    const formatSize = (bytes: number): string => {
        const megabytes = bytes / (1024 * 1024);
        return megabytes.toFixed(2) + ' MB';
    };

    const closePopup = () => {
        setSelectedFile(null);
        setShowPopup(false);
    };
    const closeModal=()=>{
        closePopup();
        onRequestClose();
    }
    const handleSubmit=()=>{
        closePopup();
        onRequestClose();
    }
    return (
        <Box className={styles.AddFromExcel}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={closeModal}
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

                        <Box className={styles.ModelHeader}>
                            <Box
                                className={styles.ModelTitle}
                            >
                                Add Catalog from Excel
                            </Box>
                            <Button onClick={closeModal}>
                                <CloseIcon />
                            </Button>
                        </Box>
                        <Box className={styles.DividerContainer}>
                            <Divider className={styles.Divider} />
                        </Box>
                        <Box
                            className={styles.ModelSummeryBox}
                        >
                            <Box
                            >
                                <Typography className={styles.ListItemTitle}>
                                    <Link download={"catalog_excel (2) (1).xlsx"} href={excelFormat}
                                        className={styles.DownloadLink}
                                    >
                                        Download the Catalog Excel Template file
                                    </Link>
                                    &nbsp;here and ensure the following:
                                </Typography>
                            </Box>
                            <Box
                                className={styles.ModelListItemContainer}
                            >

                                <Typography className={`${styles.AlignItem} ${styles.ModelListItem}`}>
                                    &nbsp;• Download the Excel file in application as (.xls) or
                                    (.xlsx),
                                    <Typography className={styles.FontWeight}>&nbsp;NOT&nbsp;</Typography> (.XLS) or (.XLSX)
                                </Typography>

                                <Typography className={`${styles.ModelListItem} ${styles.MarginBottom}`}>
                                    &nbsp;• Should not upload different format as [for (.xls) he
                                    should not upload (.xlsx) or vice versa]
                                </Typography>
                                <Typography className={`${styles.ModelListItem} ${styles.MarginBottom}`}>
                                    &nbsp;• Do not change first row heading content and order, write
                                    user details next row
                                </Typography>
                                <Typography className={`${styles.ModelListItem} ${styles.MarginBottom}`}>
                                    &nbsp;• Company Type, Country, State, City, Category content
                                    should match application database{' '}
                                </Typography>
                                <Typography className={`${styles.ModelListItem} ${styles.MarginBottom}`}>
                                    &nbsp;• Category allow multiple value separating by comma(,)
                                </Typography>
                                <Typography className={`${styles.ModelListItem}`}>
                                    &nbsp;• While Uploading the file, DO NOT USE DOUBLE CLICK, USE
                                    SINGLE CLICK on UPLOAD BUTTON.
                                </Typography>

                            </Box>

                        </Box>
                        {!showPopup &&
                            <Box
                                className={`${styles.UploadBox}  ${styles.height}`}
                            >
                                <Box>
                                    <Button
                                        component="label"
                                        className="UploadBtn"

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
                                        />
                                    </Button>
                                </Box>
                            </Box>
                        }
                        {showPopup && selectedFile && (
                            <Box className={styles.Popup}>
                                <Box className={styles.AlignItem}>
                                    <Typography className={`${styles.PopupTitle} ${styles.FileName}`}>{selectedFile.name}</Typography>
                                    <Typography className={styles.PopupTitle}>&nbsp;({formatSize(selectedFile.size)})</Typography>
                                </Box>
                                <CloseIcon className={styles.CloseIcon} onClick={closePopup} />
                            </Box>
                        )}
                        <Box>
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
                                    onClick={closeModal}
                                >
                                    Close
                                </Button>
                                {showPopup&&<Button
                                    variant="contained"
                                    className="Btn"
                                    size="small"
                                    onClick={handleSubmit}
                                    disabled={false}
                                >
                                    Submit
                                </Button>}
                            </Stack>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

        </Box>
    );
}

export default AddFromExcel;