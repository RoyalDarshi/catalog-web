import React, {useEffect, useState} from 'react';
import styles from './CatalogContent.module.scss';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import { Close } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import VisibilityIcon from "@mui/icons-material/Visibility";
import MediaUpload from "../MediaUpload/MediaUpload";

interface ChildComponentProps {
    openModal: () => void;
    selectedFilesFromPopup: File[];
    onContractFileChange: (file: File) => void;
    selectedContractFile: File | null; // New prop to accept selectedContractFile

}
const Item = styled(Box)(() => ({
    textAlign: 'left',
    marginBottom: '16px',
}));

const CatalogContent: React.FC<ChildComponentProps> = ({ openModal,selectedFilesFromPopup,onContractFileChange ,selectedContractFile}) => {
    const [contractFile, setContractFile] = useState<File | null>(null);
    const [showContractPopup, setShowContractPopup] = useState(false);
    const handleContractFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setContractFile(file);
            setShowContractPopup(true);
            onContractFileChange(file); // Notify the parent component about the selected contract file
        }


    };

    const [addFiles, setAddFiles] = useState<File[]>([]);
    const [showAddPopup, setShowAddPopup] = useState(false);

    const handleAddFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []) as File[];
        if (files) {
            setAddFiles(files);
            setShowAddPopup(true);

        }
    };

    const formatSize = (bytes: number): string => {
        const megabytes = bytes / (1024 * 1024);
        return megabytes.toFixed(2) + ' MB';
    };
    let [imgFile, setImgFile] = useState<File[]>([]);
    useEffect(() => {
        setImgFile(selectedFilesFromPopup);
    }, [selectedFilesFromPopup,selectedContractFile]);
    const removeFile = (fileToRemove: File,from:string) => {
        switch (from) {
            case "Image":
                setImgFile(prevFiles => prevFiles.filter(file => file !== fileToRemove));
                break;
            case "Add":
                setAddFiles(prevFiles=>prevFiles.filter(file=>file!==fileToRemove));
                break;
            case "Contract":
                setContractFile(null);
        }
    };
    const closeContractPopup = () => {
        setShowContractPopup(false);
        setContractFile(null);
    };
    const [medOpen, setMedOpen] = useState(false);

    const medHandleOpen=()=>{
        setMedOpen(true)
    }
    const medHandleClose = () => {
        setMedOpen(false);
    };
    return (

        <Box className={styles.CatalogContent}>

            <Box>
                <Grid >
                    <Box className={styles.CatalogHeader}>
                        <Grid item className={`${styles.CatalogHeader}`}>
                            <Item className={styles.CatalogHeader}>
                                <Typography className={styles.FormLabel}>
                                    Contract Document Upload&nbsp;
                                    <Typography className={styles.Span}>*</Typography>
                                </Typography>

                            </Item>
                        </Grid>
                        <Grid item  className={styles.CatalogHeader}>
                            <Item>
                                {!showContractPopup && <Button
                                    component="label"
                                    className={styles.UploadBtn}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="14"
                                        viewBox="0 0 13 14"
                                        fill="none"
                                        className={styles.MarginRight}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.4444 9.01761C1.4444 8.61882 1.12104 8.29546 0.722349 8.29546C0.323462 8.29546 0 8.61882 0 9.01761V12.4119C0 12.8108 0.323363 13.1343 0.722349 13.1343H12.2777C12.6765 13.1343 13 12.8109 13 12.4119V9.01761C13 8.61882 12.6766 8.29546 12.2777 8.29546C11.8788 8.29546 11.5556 8.61882 11.5556 9.01761L11.5557 11.6896H1.4445L1.4444 9.01761ZM8.00155 4.11058L7.22242 3.33125V9.55387C7.22242 9.95266 6.89906 10.2759 6.50007 10.2759C6.10119 10.2759 5.77772 9.95266 5.77772 9.55387V3.33125L4.9986 4.11058C4.71664 4.39254 4.25924 4.39254 3.97737 4.11058C3.69541 3.82862 3.69541 3.37132 3.97737 3.08936L5.98946 1.07727C6.27162 0.795207 6.72882 0.795207 7.01068 1.07727L9.02297 3.08936C9.30493 3.37142 9.30493 3.82872 9.02297 4.11058C8.74064 4.39244 8.28351 4.39244 8.00155 4.11058Z"
                                            fill="#0748AE"
                                        />
                                    </svg>
                                    Upload
                                    <input
                                        accept=".xls,.xlsx,.doc,.docx,.pdf,.jpeg,.jpg,.png"
                                        hidden
                                        type="file"
                                        onChange={handleContractFileChange}
                                    />
                                </Button>}
                                {showContractPopup && contractFile && (
                                    <Box className={styles.Popup}>
                                        <Box className={styles.CatalogHeader}>
                                            <Typography className={`${styles.PopupTitle} ${styles.FileName}`}>{contractFile.name}</Typography>
                                            <Typography className={styles.PopupTitle}>&nbsp;({formatSize(contractFile.size)})</Typography>
                                        </Box>
                                        <Close className={styles.CloseIcon} onClick={closeContractPopup} />
                                    </Box>
                                )}
                            </Item>
                        </Grid>
                    </Box>
                    <Box className={styles.CatalogHeader}>
                        <Grid item className={styles.CatalogHeader}>
                            <Item>
                                <FormLabel className={styles.FormLabel} htmlFor="addDoc">Additional Documents</FormLabel>
                            </Item>
                        </Grid>
                        <Grid item className={styles.CatalogHeader}>
                            <Item>
                                {addFiles.length<1 && (
                                    <Button
                                        component="label"
                                        className={styles.UploadBtn}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13"
                                            height="14"
                                            viewBox="0 0 13 14"
                                            fill="none"
                                            className={styles.MarginRight}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M1.4444 9.01761C1.4444 8.61882 1.12104 8.29546 0.722349 8.29546C0.323462 8.29546 0 8.61882 0 9.01761V12.4119C0 12.8108 0.323363 13.1343 0.722349 13.1343H12.2777C12.6765 13.1343 13 12.8109 13 12.4119V9.01761C13 8.61882 12.6766 8.29546 12.2777 8.29546C11.8788 8.29546 11.5556 8.61882 11.5556 9.01761L11.5557 11.6896H1.4445L1.4444 9.01761ZM8.00155 4.11058L7.22242 3.33125V9.55387C7.22242 9.95266 6.89906 10.2759 6.50007 10.2759C6.10119 10.2759 5.77772 9.95266 5.77772 9.55387V3.33125L4.9986 4.11058C4.71664 4.39254 4.25924 4.39254 3.97737 4.11058C3.69541 3.82862 3.69541 3.37132 3.97737 3.08936L5.98946 1.07727C6.27162 0.795207 6.72882 0.795207 7.01068 1.07727L9.02297 3.08936C9.30493 3.37142 9.30493 3.82872 9.02297 4.11058C8.74064 4.39244 8.28351 4.39244 8.00155 4.11058Z"
                                                fill="#0748AE"
                                            />
                                        </svg>
                                        Upload
                                        <input
                                            accept=".xls,.xlsx,.doc,.docx,.pdf,.jpeg,.jpg,.png"
                                            hidden
                                            type="file"
                                            multiple={true} // Allow multiple file selection
                                            onChange={handleAddFileChange}
                                        />
                                    </Button>
                                )}
                                {showAddPopup && addFiles && (
                                    <Box className={styles.AlignItems}>
                                        {addFiles.map((file: File) => (
                                            <Box className={`${styles.Popup} ${styles.MarginBottom}`}>
                                                <Box className={styles.CatalogHeader}>
                                                    <Typography className={`${styles.PopupTitle} ${styles.FileName}`}>{file.name}</Typography>
                                                    <Typography className={styles.PopupTitle}>&nbsp;({formatSize(file.size)})</Typography>
                                                </Box>
                                                <Box className={styles.AlignItems}>
                                                    <VisibilityIcon onClick={medHandleOpen} className={`${styles.CloseIcon} ${styles.IconGap}`} />
                                                    <Close className={styles.CloseIcon} onClick={()=>removeFile(file,"Add")} />
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Item>
                        </Grid>
                    </Box>
                    <Box className={styles.CatalogHeader}>
                        <Grid item className={styles.CatalogHeader}>
                            <Item>
                                <FormLabel className={styles.FormLabel} htmlFor="catImg">Catalogue Image</FormLabel>
                            </Item>
                        </Grid>
                        <Grid item className={styles.CatalogHeader}>
                            <Item >
                                {imgFile.length<1&&<Button
                                    component="label"
                                    className={styles.UploadBtn}
                                    onClick={openModal}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="14"
                                        viewBox="0 0 13 14"
                                        fill="none"
                                        className={styles.MarginRight}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.4444 9.01761C1.4444 8.61882 1.12104 8.29546 0.722349 8.29546C0.323462 8.29546 0 8.61882 0 9.01761V12.4119C0 12.8108 0.323363 13.1343 0.722349 13.1343H12.2777C12.6765 13.1343 13 12.8109 13 12.4119V9.01761C13 8.61882 12.6766 8.29546 12.2777 8.29546C11.8788 8.29546 11.5556 8.61882 11.5556 9.01761L11.5557 11.6896H1.4445L1.4444 9.01761ZM8.00155 4.11058L7.22242 3.33125V9.55387C7.22242 9.95266 6.89906 10.2759 6.50007 10.2759C6.10119 10.2759 5.77772 9.95266 5.77772 9.55387V3.33125L4.9986 4.11058C4.71664 4.39254 4.25924 4.39254 3.97737 4.11058C3.69541 3.82862 3.69541 3.37132 3.97737 3.08936L5.98946 1.07727C6.27162 0.795207 6.72882 0.795207 7.01068 1.07727L9.02297 3.08936C9.30493 3.37142 9.30493 3.82872 9.02297 4.11058C8.74064 4.39244 8.28351 4.39244 8.00155 4.11058Z"
                                            fill="#0748AE"
                                        />
                                    </svg>
                                    Upload
                                </Button>}

                                { imgFile && (
                                    <Box className={styles.AlignItems}>
                                        {imgFile.map((file: File) => (
                                            <Box className={`${styles.Popup} ${styles.MarginBottom}`}>
                                                <Box className={styles.CatalogHeader}>
                                                    <Typography className={`${styles.PopupTitle} ${styles.FileName}`}>{file.name}</Typography>
                                                    <Typography className={styles.PopupTitle}>&nbsp;({formatSize(file.size)})</Typography>
                                                </Box>
                                                <Box className={styles.AlignItems}>
                                                    <VisibilityIcon onClick={medHandleOpen} className={`${styles.CloseIcon} ${styles.IconGap}`} />
                                                    <Close className={styles.CloseIcon} onClick={()=>removeFile(file,"Image")} />
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                )}

                            </Item>
                        </Grid>
                    </Box>
                </Grid>
            </Box>



            <Typography
                className={styles.UploadNote}
            >
                Note: Please Upload .xls | .xlsx | .doc | .docx | .pdf | .jpeg | .jpg
                |.png files only
            </Typography>
            <Box>
                <MediaUpload  isOpen={medOpen} onRequestClose={medHandleClose} onRequestOpen={medHandleOpen} />
            </Box>
        </Box>



    );
}
export default CatalogContent;