import React, {FC, useState} from 'react';
import styles from './UploadedFile.module.scss';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Close} from "@mui/icons-material";
import MediaUpload from "../MediaUpload/MediaUpload";

interface UploadedFileProps {
    isEyeVisible:boolean;
    popupFileData:string;
}

const UploadedFile: FC<UploadedFileProps> = ({isEyeVisible,popupFileData}) => {
    const [medOpen, setMedOpen] = useState(false);

    const medHandleOpen=()=>{
        setMedOpen(true)
    }
    const medHandleClose = () => {
        setMedOpen(false);
    };
    const[showPopup,setShowPopup]=useState(true);
    const handleShowPopup=()=>{
        setShowPopup(false);
    }
    return(
        <>
        {showPopup&&<Box className={styles.UploadedFile}>
            <Box className={`${styles.Popup}`}>
                <Box className={styles.CatalogHeader}>
                    <Typography className={`${styles.PopupTitle} ${styles.FileName}`}>{popupFileData}</Typography>
                </Box>
                <Box className={styles.AlignItems}>
                    {isEyeVisible&&<VisibilityIcon onClick={medHandleOpen} className={`${styles.CloseIcon} ${styles.IconGap}`}/>}
                    <Close className={styles.CloseIcon} onClick={handleShowPopup} />
                </Box>
            </Box>
            <Box>
                <MediaUpload  isOpen={medOpen} onRequestClose={medHandleClose} onRequestOpen={medHandleOpen} />
            </Box>
        </Box>}
        </>
    );
}
export default UploadedFile;
