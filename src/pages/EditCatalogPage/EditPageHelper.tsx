import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import MuiInput from "@mui/material/Input";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const Item = styled(Box)(() => ({
    textAlign: 'left',
    marginBottom: '16px',
}));
export const NumberInput = styled(TextField)(({ theme }) => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}));
styled(MuiInput)(({ theme }) => ({
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}));
styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#EFF7FE',
        color: '#2E3133',

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        fontWeight: 400,
    },
}));
styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));