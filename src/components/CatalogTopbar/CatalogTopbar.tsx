import React from 'react';
import styles from './CatalogTopbar.module.scss';
import {Badge, Box, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {styled} from "@mui/material/styles";

interface ChildComponentProps {
    openModal: () => void;
}
const CustomBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "var(--White, #FFF)",
        border:"0.8px solid #2E3133",
        fontFamily: "SF Pro Text",
        color: "#2E3133",
    }
}));
const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();
const CatalogTopbar: React.FC<ChildComponentProps> = ({ openModal }) => {
    const navigate = useNavigate();
    const redirectToAddItem = (buttonName: any) => {
        switch (buttonName) {
            case "CreateCatalog": {
                navigate('/CreateCatalog');
                break;
            }
            case "CartPage": {
                navigate('/CartPage');
                break;
            }

        }

    };

    return (
        <Box className={styles.CatalogTopBar}>
            <Box>
                <Typography className={styles.Header} id={"page_name"}>Catalog Listing</Typography>
            </Box>
            <Box
                onClick={preventDefault}
                className={styles.TopBarIcon}
            >
                <Box>
                    <Button variant={"text"} className="LinkBtn" onClick={() => redirectToAddItem("CreateCatalog")}>
                        <svg className={styles.Svg} xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <circle cx="8" cy="8.5" r="7.5" fill="#0748AE" fillOpacity="0.1" stroke="#0748AE"/>
                            <path d="M5.6344 9.46804H7.69905V11.5324C7.69905 11.8833 7.98332 12.1667 8.33339 12.1667C8.68428 12.1667 8.96773 11.8824 8.96773 11.5324L8.96767 9.46804H11.0323C11.3832 9.46804 11.6667 9.18381 11.6667 8.83378C11.6667 8.48375 11.3824 8.19952 11.0323 8.19952H8.96857V6.13426C8.96857 5.78341 8.6843 5.5 8.33423 5.5C7.98334 5.5 7.69989 5.78423 7.69989 6.13426V8.19863H5.63434C5.28425 8.19945 5 8.48286 5 8.83371C5 9.18455 5.28427 9.46796 5.63434 9.46796L5.6344 9.46804Z" fill="#0748AE"/>
                        </svg>
                        Add Items/Services</Button>
                </Box>
                <Box>
                    <Button disabled={false} variant={"text"} className="LinkBtn" onClick={openModal}>
                        <svg className={styles.Svg} xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                            <circle cx="8" cy="8.5" r="7.5" fill="#0748AE" fillOpacity="0.1" stroke="#0748AE"/>
                            <path d="M5.6344 9.46804H7.69905V11.5324C7.69905 11.8833 7.98332 12.1667 8.33339 12.1667C8.68428 12.1667 8.96773 11.8824 8.96773 11.5324L8.96767 9.46804H11.0323C11.3832 9.46804 11.6667 9.18381 11.6667 8.83378C11.6667 8.48375 11.3824 8.19952 11.0323 8.19952H8.96857V6.13426C8.96857 5.78341 8.6843 5.5 8.33423 5.5C7.98334 5.5 7.69989 5.78423 7.69989 6.13426V8.19863H5.63434C5.28425 8.19945 5 8.48286 5 8.83371C5 9.18455 5.28427 9.46796 5.63434 9.46796L5.6344 9.46804Z" fill="#0748AE"/>
                        </svg>
                        Add Catalog from excel</Button>
                </Box>
                <Box className={styles.BtnMargin}>
                    <CustomBadge badgeContent={1}

                    >
                    <Button variant="contained" size="small"
                        className="Btn" disabled={false} onClick={() => redirectToAddItem("CartPage")}>
                        Cart
                    </Button>
                    </CustomBadge>
                </Box>
            </Box>
        </Box>
    );
}
export default CatalogTopbar;

