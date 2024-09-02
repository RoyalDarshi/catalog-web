import React from 'react';
import styles from './SearchFilterPanel.module.scss';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {styled} from "@mui/material/styles";
import MuiAccordion, {AccordionProps} from "@mui/material/Accordion";
import MuiAccordionSummary, {AccordionSummaryProps} from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import PanelBadgeComponent from "../inner/PanelBadgeComponent/PanelBadgeComponent";

const CAccordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `none ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const CAccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const CAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    //borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
export default function SearchFilterPanel () {

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };
    //dropdown
    const [project, setProject] = React.useState('');

    const projectHandleChanges = (event: SelectChangeEvent) => {
        setProject(event.target.value);
    };

    const [category, setCategory] = React.useState('');

    const categoryHandleChanges = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    const [location, setLocation] = React.useState('');

    const locationHandleChanges = (event: SelectChangeEvent) => {
        setLocation(event.target.value);

    };
    const [supplier, setSupplier] = React.useState('');

    const handleApplyClick = () =>{
        setExpanded(false);

    }

    const supplierHandleChanges = (event: SelectChangeEvent) => {
        setSupplier(event.target.value);
    };
    const [unit, setUnit] = React.useState('');

    const unitHandleChanges = (event: SelectChangeEvent) => {
        setUnit(event.target.value);
    };
    
    // load data from service here


    return (
        <Box className={styles.SearchFilterPanel}>

            <CAccordion expanded={expanded === false} onChange={handleChange('panel1')} >
                <CAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Filter Criteria&nbsp;</Typography>
                    <Typography><PanelBadgeComponent/></Typography>
                </CAccordionSummary>

                <CAccordionDetails>
                    <Typography>
                        <FormControl>
                            <FormLabel id="item-type-group-label">Item Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="item-type-group-label"
                                name="item-type-radio-buttons-group"
                                defaultValue={"Goods"}
                            >
                                <FormControlLabel value="Goods" control={<Radio />} label="Goods" />
                                <FormControlLabel value="Services" control={<Radio />} label="Services" />

                            </RadioGroup>
                        </FormControl>
                        <Box className={styles.RowStyle}>

                            <Box className={styles.ColStyle}>
                                <Typography >Project</Typography>
                                <Box >
                                    <FormControl className={styles.FormControl} size="small">
                                        <InputLabel id="project-label">Project</InputLabel>
                                        <Select
                                            labelId="project-select-label"
                                            id="demo-simple-select"
                                            value={project}
                                            label="Project"
                                            onChange={projectHandleChanges}
                                        >

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box className={styles.ColStyle}>
                                <Typography >Category</Typography>
                                <Box >
                                    <FormControl className={styles.FormControl} size="small">
                                        <InputLabel id="category-label">Category</InputLabel>
                                        <Select
                                            labelId="category-select-label"
                                            id="category-select"
                                            value={category}
                                            label="Category"
                                            onChange={categoryHandleChanges}
                                        >

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box className={styles.ColStyle}>
                                <Typography >Location</Typography>
                                <Box >
                                    <FormControl className={styles.FormControl} size="small">
                                        <InputLabel id="location-select-label">Location</InputLabel>
                                        <Select
                                            labelId="location-label"
                                            id="location-select"
                                            value={location}
                                            label="Location"
                                            onChange={locationHandleChanges}
                                        >

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box className={styles.ColStyle}>
                                <Typography >Supplier</Typography>
                                <Box >
                                    <FormControl className={styles.FormControl} size="small">
                                        <InputLabel id="supplier-label">Supplier</InputLabel>
                                        <Select
                                            labelId="supplier-select-label"
                                            id="supplier-select"
                                            value={supplier}
                                            label="Supplier"
                                            onChange={supplierHandleChanges}
                                        >

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            <Box className={styles.ColStyle}>
                                <Typography >Business Unit</Typography>
                            <Box >
                                <FormControl className={styles.FormControl} size="small">
                                    <InputLabel id="business-unit-label">Business Unit</InputLabel>
                                    <Select
                                        labelId="business-unit-select-label"
                                        id="business-unit-select"
                                        value={unit}
                                        label="Business Unit"
                                        onChange={unitHandleChanges}
                                    >
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        </Box>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined"
                            onClick={handleApplyClick}
                                    className={styles.Button}
                            >Apply Filter</Button>
                        </Stack>
                    </Typography>
                </CAccordionDetails>
            </CAccordion>
        </Box>

    );
}
