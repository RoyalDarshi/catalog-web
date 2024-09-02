import styles from './ResultView.module.scss';
import CatalogCardView from "../../CatalogCardView/CatalogCardView";
import CatalogTableView from "../../CatalogTableView/CatalogTableView";
import { Box, FormGroup, Grid, Typography } from "@mui/material";
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListAltOutlined from '@mui/icons-material/ListAltOutlined';
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import Grid4x4OutlinedIcon from '@mui/icons-material/Grid4x4Outlined';
import CatalogGridView from "../../CatalogGridView/CatalogGridView";
import CatalogCompanyDetails from "../CatalogCompanyDetails/CatalogCompanyDetails";
import {CatalogListViewStates} from "../../../services/models/uistates";
import useLocalStorage from "react-use-localstorage";
import { JSX } from 'react/jsx-runtime';
import { useState } from 'react';
import {CatalogSummaryDTO} from "../../../services/models/CatalogSummaryDTO";




const StyledMenu = styled((props: MenuProps) => (
    <Menu
        {...props}
    />
))(() => ({

}));


interface ChildProps {
    catalogItems: CatalogSummaryDTO[];
    catalogCurrentView:CatalogListViewStates.TWO_TILE_VIEW;

}
const ResultView: React.FC<ChildProps> = ({ catalogItems }) => {
    const [currentView, setCurrentView] = useLocalStorage('currentView', (JSON.stringify(CatalogListViewStates.FOUR_TILE_VIEW )));

    const [toggleChecked, setToggleChecked] = React.useState(CatalogListViewStates.FOUR_TILE_VIEW);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorEls, setAnchorEls] = React.useState<null | HTMLElement>(null);

    const[currentCatalogOnCard,setCurrentCatalogOnCad] = useState()

    const [isPreferredView, setIsPreferredView] = useState<boolean>(() => {
        // Initialize the checkbox state based on the value stored in local storage
        const storedValue = localStorage.getItem('isPreferredView');
        return storedValue ? JSON.parse(storedValue) : false;
    });

    // Handle the "Preferred View" checkbox change event
    const handlePreferredViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setIsPreferredView(isChecked);

        // Update the checkbox state in local storage
        localStorage.setItem('isPreferredView', JSON.stringify(isChecked));
    };
    const handleMouseEnter = (event: { currentTarget: React.SetStateAction<HTMLElement | null>; },catalogDetail:any) => {

        setCurrentCatalogOnCad(catalogDetail)
        setAnchorEls(event.currentTarget);
    };

    const handleGridMouseEnter = (event: { currentTarget: React.SetStateAction<HTMLElement | null>; }) => {
        setAnchorEls(event.currentTarget);
    };


    const handleMouseLeave = () => {
        setAnchorEls(null);
    };

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const cardView = () => {
        setToggleChecked(0);
        setCurrentView("0");
        handleClose()
    }
    const gridView=()=>{
        setToggleChecked(1)
        setCurrentView("1");
        handleClose()
    }
    const tableView = () => {
        setToggleChecked(2);
        setCurrentView("2");
        handleClose()
    }
    const data = catalogItems;

    React.useEffect(() => {

        if(null !== localStorage.getItem('currentView') ){
            // @ts-ignore
            setToggleChecked(parseInt(localStorage.getItem('currentView')));
        }

    }, []);
    const options = [
        { label: ' Two tile view', icon: <GridViewOutlined fontSize={"small"} />,state:"0" },
        { label: ' Four tile view', icon: <Grid4x4OutlinedIcon fontSize={"small"} />,state:"1" },
        { label: ' Listing view', icon: <ListAltOutlined fontSize={"small"} /> ,state:"2"},
    ];
    const [selectedOption, setSelectedOption] = useState(currentView);
    const handleOptionClick = (option: { label?: string; icon?: JSX.Element; state: any; }) => {
        if (option === options[0]) {
            cardView();
        }
        else if (option === options[1]) {
            gridView();
        }
        else {
            tableView();
        }
        setSelectedOption(option.state);
        setAnchorEl(null);
    };
    return (
        <Box className={styles.ResultView}>
            <Box>
                <Box className={styles.ViewChangeRow}>
                    <Box className={styles.ChangeViewIcon}>
                        <FormGroup row={true}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label={<Typography className={styles.CheckBoxLabel}>Choose as Preferred View</Typography>}
                                checked={isPreferredView}
                                // @ts-ignore
                                onChange={handlePreferredViewChange}
                            />
                            <Box className={styles.BtnPadding}>
                                <Button
                                    id="demo-customized-button"
                                    aria-controls={open ? 'change-view' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    variant="text"
                                    disableElevation
                                    onClick={handleClick}
                                    disabled={isPreferredView} // Disable the dropdown when "Preferred View" is checked
                                    className={"LinkBtn"}
                                    startIcon={<GridViewOutlined className={styles.ChangeView} />}
                                >
                                    Change View
                                </Button>
                            </Box>
                            <StyledMenu
                                id="change-view-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'change-view',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                {options.map((option) => (
                                    <MenuItem
                                        key={option.label}
                                        className={styles.MenuItem}
                                        onClick={() => handleOptionClick(option)}
                                        style={{ backgroundColor: selectedOption === option.state ? '#EEF4F9' : 'white' }}
                                    >
                                        {option.icon}
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </StyledMenu>
                        </FormGroup>
                    </Box>
                </Box >
                <Box >
                    <Box>
                        {toggleChecked===0 ?
                            <Box>
                                <Grid item xs={12} direction={"row"}
                                      columnSpacing={"24px"}
                                    container={true}
                                    justifyItems={"flex-start"}
                                    alignItems={"flex-start"}

                                >
                                    {
                                        data?.map((elem: any) => (
                                            <Grid item xs={6} key={data?.indexOf(elem)}>
                                                <CatalogCardView  catlogitem={elem} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} cartItem={elem}/>

                                            </Grid>
                                        ))

                                    }

                                </Grid>

                            </Box>
                            :

                            toggleChecked===1?
                                <Box>
                                    <Grid item xs={12} direction={"row"}
                                          columnSpacing={"24px"}
                                          container={true}
                                          justifyItems={"flex-start"}
                                          alignItems={"flex-start"}

                                    >
                                        {
                                            data?.map((elem: any) => (
                                                <Grid item xs={3} key={data?.indexOf(elem)}>
                                                    <CatalogGridView handleGridMouseEnter={handleGridMouseEnter} handleMouseLeave={handleMouseLeave} catlogitem={elem} />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Box>
                                :
                                <Box>
                                    {
                                            <CatalogTableView  catalogListItems={data} />
                                    }
                                </Box>

                        }


                    </Box>
                    <CatalogCompanyDetails anchorEl={anchorEls} catalogDetails={currentCatalogOnCard}/>
                </Box>
            </Box>

        </Box>
    )
}
export default ResultView
