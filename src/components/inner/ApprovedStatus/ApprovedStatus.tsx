import React from 'react';
import styles from './ApprovedStatus.module.scss';
import {Box} from "@mui/material";
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {
    stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import Link from "@mui/material/Link";
import {ChevronRight} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


interface ChildComponentProps {
    openModal: () => void;
}

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.6085 8.39154C12.4471 8.23033 12.2282 8.13973 12.0001 8.13973C11.7721 8.13973 11.5532 8.23033 11.3918 8.39154L7.23098 12.5524L7.23107 12.5523C7.02633 12.772 6.95091 13.0825 7.032 13.3717C7.11319 13.6609 7.33915 13.8868 7.62825 13.9679C7.91744 14.0491 8.22796 13.9737 8.44767 13.769L12 10.2179L15.5523 13.769C15.7721 13.9737 16.0826 14.0491 16.3718 13.9679C16.6609 13.8868 16.8868 13.6609 16.968 13.3717C17.0491 13.0825 16.9737 12.772 16.7689 12.5523L12.6085 8.39154Z" fill="black"/>
        </svg>}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));



const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 50,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {},
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {},
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: '1px',
        borderRadius: 1,
    },
}));



const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        ...(ownerState.active && {
            color: '#784af4',
        }),
    })
);
function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
    return (
        <QontoStepIconRoot ownerState={{ active }} className={`${className} ${styles.Stepper}`}>
            {completed ? (
                <Box>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        style={{marginLeft: '15px'}}
                    >
                        <path
                            d="M11.1502 5.54343L7.43283 9.06504L5.88944 7.43472C5.72627 7.26383 5.48447 7.19294 5.25489 7.24867C5.02544 7.30455 4.84311 7.47856 4.77669 7.70518C4.71026 7.93195 4.76985 8.17684 4.93287 8.34776L6.93278 10.4346C7.05181 10.5596 7.21676 10.6303 7.38929 10.6303C7.55914 10.6386 7.72469 10.5755 7.8458 10.4563L12.0415 6.47817C12.1638 6.35914 12.2347 6.19686 12.2389 6.02611C12.2429 5.85536 12.1799 5.68982 12.0632 5.56514C11.9472 5.43734 11.7839 5.3626 11.6113 5.35858C11.4388 5.35442 11.272 5.42128 11.1502 5.54343Z"
                            fill="#009C05"
                        />
                        <path
                            d="M8.5 0C6.37836 0 4.34345 0.842874 2.84305 2.34305C1.34287 3.84338 0.5 5.87821 0.5 8C0.5 10.1218 1.34287 12.1565 2.84305 13.6569C4.34338 15.1571 6.37821 16 8.5 16C10.6218 16 12.6565 15.1571 14.1569 13.6569C15.6571 12.1566 16.5 10.1218 16.5 8C16.5 5.87821 15.6571 3.84345 14.1569 2.34305C12.6566 0.842874 10.6218 0 8.5 0ZM8.5 14.6955C6.72417 14.6955 5.02118 13.9901 3.76559 12.7344C2.50987 11.4788 1.80445 9.77579 1.80445 7.99996C1.80445 6.22413 2.50987 4.52115 3.76559 3.26555C5.02115 2.00983 6.72417 1.30441 8.5 1.30441C10.2758 1.30441 11.9788 2.00983 13.2344 3.26555C14.4901 4.52111 15.1956 6.22413 15.1956 7.99996C15.1956 9.77579 14.4901 11.4788 13.2344 12.7344C11.9789 13.9901 10.2758 14.6955 8.5 14.6955Z"
                            fill="#009C05"
                        />
                    </svg>
                    <Typography className={styles.Approved}>Approved</Typography>
                </Box>
            ) : (
               <Box>
                   <svg
                       xmlns="http://www.w3.org/2000/svg"
                       width="16"
                       height="16"
                       viewBox="0 0 16 16"
                       fill="none"
                      className={styles.MarginLeft}
                   >
                       <path
                           d="M8 0.500137H8.04522C9.34612 0.508002 10.6229 0.854099 11.7501 1.50475C12.8901 2.16304 13.837 3.10987 14.4952 4.24992C15.1535 5.39024 15.5 6.68364 15.5 8.00014C15.5 9.98917 14.7098 11.8969 13.3033 13.3035C11.8967 14.71 9.98902 15.5001 8 15.5001C6.01097 15.5001 4.10319 14.71 2.69667 13.3035C1.29014 11.8969 0.5 9.98916 0.5 8.00014C0.5 6.01111 1.29015 4.10334 2.69666 2.69682C4.10326 1.29028 6.01087 0.500137 8 0.500137ZM3.12103 12.8793C4.14988 13.9083 5.47035 14.5787 6.88824 14.8102L6.79867 14.9004H7.99993C9.21109 14.9004 10.401 14.5816 11.4499 13.9759C12.4989 13.3703 13.3699 12.4993 13.9755 11.4503C14.5813 10.4014 14.9001 9.21143 14.9001 8.00027C14.9001 6.17029 14.173 4.41519 12.879 3.12126C11.5851 1.82721 9.82996 1.10021 8 1.10021C6.17001 1.10021 4.41492 1.82723 3.12099 3.1213C1.82693 4.41517 1.09993 6.17032 1.09993 8.00027C1.09993 9.83026 1.82696 11.5854 3.12103 12.8793Z"
                           stroke="#EFC72A"
                       />
                       <path
                           d="M7.78717 3.78797L7.78702 3.78813C7.73082 3.84433 7.69922 3.92059 7.69922 4.00016V8.80023C7.69922 8.90749 7.75641 9.0065 7.84915 9.06004C7.94194 9.11362 8.05642 9.11362 8.14923 9.06004L7.78717 3.78797ZM7.78717 3.78797C7.84326 3.73183 7.91954 3.7002 7.99918 3.7002C8.07884 3.7002 8.1551 3.73183 8.2112 3.78797L8.21135 3.78813M7.78717 3.78797L8.21135 3.78813M8.21135 3.78813C8.26756 3.84433 8.29915 3.92058 8.29915 4.00016V8.80023C8.29915 8.90749 8.24196 9.00649 8.14923 9.06004L8.21135 3.78813Z"
                           stroke="#EFC72A"
                       />
                       <path
                           d="M7.72638 11.8846L7.72299 11.8925C7.70794 11.9277 7.69984 11.9657 7.69922 12.0044C7.69907 12.0832 7.73021 12.1594 7.78631 12.216C7.84274 12.2728 7.9193 12.3046 7.99919 12.3046C8.0791 12.3046 8.15568 12.2727 8.21205 12.216L7.72638 11.8846ZM7.72638 11.8846L7.72949 11.8766M7.72638 11.8846L7.72949 11.8766M7.72949 11.8766C7.74322 11.8411 7.76353 11.8087 7.78931 11.781C7.84538 11.7261 7.92067 11.6953 7.99919 11.6953C8.07767 11.6953 8.15296 11.726 8.20908 11.781C8.23484 11.8087 8.25515 11.8411 8.26889 11.8766L8.272 11.8846M7.72949 11.8766L8.272 11.8846M8.272 11.8846L8.27538 11.8925M8.272 11.8846L8.27538 11.8925M8.27538 11.8925C8.29043 11.9277 8.29854 11.9657 8.29915 12.0044M8.27538 11.8925L8.29915 12.0044M8.29915 12.0044C8.29931 12.0831 8.26821 12.1592 8.21218 12.2158L8.29915 12.0044Z"
                           stroke="#EFC72A"
                       />
                   </svg>
                   <Typography className={styles.Pending}>Pending</Typography>
               </Box>
            )}
        </QontoStepIconRoot>
    );
}



const steps = [
    { title: 'Creator', name: 'Saurabh Kumar M' },
    { title: 'Approver 1', name: 'Venkat Mohan Rao' },
    { title: 'Approver 2', name: 'Varma SK' },
];


const ApprovedStatus:React.FC<ChildComponentProps>=({openModal})=> {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');


    const nevigate=useNavigate();


    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    return(
        <Box>
        <Box className={styles.ApprovedStatus}>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Box className={styles.AccordionSummery}>
                        <Typography className={styles.AccordionHeader}>Approval Current Status</Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            className="Btn"
                            disabled={false}
                            onClick={openModal}
                        >
                            Status Log
                        </Button>
                    </Box>
                </AccordionSummary>
                <AccordionDetails className={styles.AccordionDetails}>
                    <Typography>
                        <Stack  spacing={4}>
                            <Stepper
                                alternativeLabel
                                activeStep={1}
                                connector={<QontoConnector />}
                            >
                                {steps.map((label) => (
                                    <Step >
                                        <StepLabel StepIconComponent={QontoStepIcon}>
                                            <Typography className={styles.TitleText}>
                                                {label.title}
                                            </Typography>
                                            <Typography className={styles.TitleLabel}>
                                                {label.name}
                                            </Typography>
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Stack>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
        </Box>
    );
}

export default ApprovedStatus;
