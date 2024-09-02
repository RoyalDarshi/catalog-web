import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./CatalogSupplier.module.scss";
import Box from "@mui/material/Box";
import FormControls from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import MasterDataService from "../../../services/MasterDataService";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  CatalogCrudRequestParamPriceListingTypeEnum,
  OptionDto,
  TermsDto,
} from "../../../services/models/payload-details";
import { styled } from "@mui/material/styles";
import { log } from "console";

interface CatalogSupplierProps {
  name: string;
  id: string;
  incoTermId: string;
  incoType: string;
  deliveryTermId: string;
  deliveryType: string;
  paymentTermId: string;
  paymentType: string;
  onSupplierDataChange: (itemData: object) => void;
}
const value = ["none"];
const NumberInput = styled(TextField)(({ theme }) => ({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));
const CatalogSupplier: React.FC<CatalogSupplierProps> = ({
  onSupplierDataChange,
}) => {
  const masterDataService = new MasterDataService();
  const [supplierData, setSuppliersData] = useState<CatalogSupplierProps[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<OptionDto>();
  const [shippingModeData, setShippingModesData] = useState<
    CatalogSupplierProps[]
  >([]);
  const [selectedShippingMode, setSelectedShippingMode] = useState<OptionDto>();
  const [incoTermData, setIncoTermsData] = useState<CatalogSupplierProps[]>([]);
  const [selectedIncoTerm, setSelectedIncoTerm] = useState<TermsDto>();
  const [deliveryTermData, setDeliveryTermsData] = useState<
    CatalogSupplierProps[]
  >([]);
  const [selectedDeliveryTerm, setSelectedDeliveryTerm] = useState<TermsDto>();
  const [paymentTermData, setPaymentTermsData] = useState<
    CatalogSupplierProps[]
  >([]);
  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState<TermsDto>();
  const [locationData, setLocationData] = useState<OptionDto[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<OptionDto[]>([]);
  const [currencyData, setCurrencyData] = useState<CatalogSupplierProps[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<OptionDto>();
  const [unitsData, setUnitsData] = useState<CatalogSupplierProps[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<OptionDto>();
  const [minorUomData, setMinorUomData] = useState<CatalogSupplierProps[]>([]);
  const [selectedMinorUom, setSelectedMinorUom] = useState<OptionDto>();
  const [supLocationData, setSupLocationData] = useState<
    CatalogSupplierProps[]
  >([]);
  const [selectedSupLocation, setSelectedSupLocation] = useState<OptionDto>();
  const [supplierPart, setSupplierPart] = useState<string>("");
  const [negotiatedQuantity, setNegotiatedQuantity] = useState<string>("");
  const [minimumQuantity, setMinimumQuantity] = useState<number>();
  const [contactRefNo, setContactRefNo] = useState<string>("");
  const [deliveryLeadTime, setDeliveryLeadTime] = useState<number>();
  const [uomQuantity, setUomQuantity] = useState<number>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [savingsAmount, setSavingsAmount] = useState<string>("");
  const [priceType, setPriceType] = useState<string>(
    CatalogCrudRequestParamPriceListingTypeEnum.Totalprice
  );

  useEffect(() => {
    try {
    //   fetchSuppliers();
    //   fetchShippingMode();
    //   fetchIncoTerms();
    //   fetchDeliverTerms();
    //   fetchPaymentTerms();
    //   fetchLocation();
    //   fetchCurrency();
    //   fetchUnits();
    //   fetchMinorUom();
    //   fetchSupplierLocation();
    } catch (e) {
      console.log(e);
    }
  }, []);
  const fetchSuppliers = async () => {
    try {
      var supplierOptions = await masterDataService.getSuppliers();
      if (supplierOptions) {
        if (supplierOptions.data) {
          const suppliers: CatalogSupplierProps[] =
            supplierOptions.data.masterDataDtoList;
          setSuppliersData(suppliers);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchShippingMode = async () => {
    try {
      var shippingModeOptions = await masterDataService.getShippingMode();
      if (shippingModeOptions) {
        if (shippingModeOptions.data) {
          const shippingModes: CatalogSupplierProps[] =
            shippingModeOptions.data.masterDataDtoList;
          setShippingModesData(shippingModes);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchIncoTerms = async () => {
    try {
      var incoTermOptions = await masterDataService.getIncoTerm();
      if (incoTermOptions) {
        if (incoTermOptions.data) {
          const incoTerms: CatalogSupplierProps[] =
            incoTermOptions.data.masterDataDtoList;
          setIncoTermsData(incoTerms);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDeliverTerms = async () => {
    try {
      var deliveryTermOptions = await masterDataService.getDeliveryTerms();
      if (deliveryTermOptions) {
        if (deliveryTermOptions.data) {
          const deliveryTerms: CatalogSupplierProps[] =
            deliveryTermOptions.data.masterDataDtoList;
          setDeliveryTermsData(deliveryTerms);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchPaymentTerms = async () => {
    try {
      var paymentTermOptions = await masterDataService.getPaymentTerms();
      if (paymentTermOptions) {
        if (paymentTermOptions.data) {
          const paymentTerms: CatalogSupplierProps[] =
            paymentTermOptions.data.masterDataDtoList;
          setPaymentTermsData(paymentTerms);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchLocation = async () => {
    try {
      var locationOptions = await masterDataService.getLocations();
      if (locationOptions) {
        if (locationOptions.data) {
          const location: OptionDto[] = locationOptions.data.masterDataDtoList;
          setLocationData(location);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchCurrency = async () => {
    try {
      var currencyOptions = await masterDataService.getCurrency();
      if (currencyOptions) {
        if (currencyOptions.data) {
          const currency: CatalogSupplierProps[] = currencyOptions.data;
          setCurrencyData(currency);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchUnits = async () => {
    try {
      var unitsOptions = await masterDataService.getUnitsofMeasure();
      if (unitsOptions) {
        if (unitsOptions.data) {
          const units: CatalogSupplierProps[] = unitsOptions.data;
          setUnitsData(units);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchMinorUom = async () => {
    try {
      var uomOptions = await masterDataService.getMinorUom();
      if (uomOptions) {
        if (uomOptions.data) {
          const uoms: CatalogSupplierProps[] =
            uomOptions.data.masterDataDtoList;
          setMinorUomData(uoms);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchSupplierLocation = async () => {
    try {
      var supLocationOptions = await masterDataService.getSupplierLocation();
      if (supLocationOptions) {
        if (supLocationOptions.data) {
          const supLocation: CatalogSupplierProps[] =
            supLocationOptions.data.masterDataDtoList;
          setSupLocationData(supLocation);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSupplierDataChange = () => {
    const supplierData = {
      selectedSupplier,
      selectedShippingMode,
      selectedIncoTerm,
      selectedDeliveryTerm,
      selectedPaymentTerm,
      selectedLocations,
      selectedCurrency,
      selectedUnits,
      selectedMinorUom,
      selectedSupLocation,
      supplierPart,
      negotiatedQuantity,
      minimumQuantity,
      contactRefNo,
      deliveryLeadTime,
      uomQuantity,
      startDate,
      endDate,
      savingsAmount,
      priceType,
    };
    onSupplierDataChange(supplierData);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [selectedSupplier]);

  const handleSupplierChange = (
    event: SelectChangeEvent<typeof selectedSupplier>
  ) => {
    setSelectedSupplier(event.target.value as OptionDto);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [selectedShippingMode]);
  const handleShippingModeChange = (
    event: SelectChangeEvent<typeof selectedShippingMode>
  ) => {
    setSelectedShippingMode(event.target.value as OptionDto);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [selectedIncoTerm]);
  const handleIncoTermChange = (
    event: SelectChangeEvent<typeof selectedIncoTerm>
  ) => {
    setSelectedIncoTerm(event.target.value as TermsDto);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [selectedDeliveryTerm]);
  const handleDeliveryTermChange = (
    event: SelectChangeEvent<typeof selectedDeliveryTerm>
  ) => {
    setSelectedDeliveryTerm(event.target.value as TermsDto);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [selectedPaymentTerm]);
  const handlePaymentTermChange = (
    event: SelectChangeEvent<typeof selectedPaymentTerm>
  ) => {
    setSelectedPaymentTerm(event.target.value as TermsDto);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [selectedLocations]);
  const handleLocationChange = (
    event: SelectChangeEvent<typeof selectedLocations>
  ) => {
    const {
      target: { value },
    } = event;
    // @ts-ignore
    setSelectedLocations(value);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [selectedCurrency]);
  const handleCurrencyChange = (
    event: SelectChangeEvent<typeof selectedCurrency>
  ) => {
    setSelectedCurrency(event.target.value as OptionDto);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [selectedUnits]);
  const handleUnitsChange = (
    event: SelectChangeEvent<typeof selectedUnits>
  ) => {
    setSelectedUnits(event.target.value as OptionDto);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [selectedMinorUom]);
  const handleMinorUomChange = (
    event: SelectChangeEvent<typeof selectedMinorUom>
  ) => {
    setSelectedMinorUom(event.target.value as OptionDto);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [selectedSupLocation]);
  const handleSupLocationChange = (
    event: SelectChangeEvent<typeof selectedSupLocation>
  ) => {
    setSelectedSupLocation(event.target.value as OptionDto);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [supplierPart]);
  const handleSupplierPartChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSupplierPart(event.target.value as string);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [negotiatedQuantity]);
  const handleNegotiatedChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNegotiatedQuantity(event.target.value as string);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [minimumQuantity]);
  const handleMinimumQtyChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMinimumQuantity(event.target.value as any);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [contactRefNo]);
  const handleRefNoChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactRefNo(event.target.value as string);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [deliveryLeadTime]);
  const handleDeliveryLeadChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeliveryLeadTime(Number(event.target.value));
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [uomQuantity]);
  const handleUomQuantityChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUomQuantity(event.target.value as any);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [startDate]);
  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [endDate]);
  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };
  useEffect(() => {
    // This effect will run whenever selectedProject changes
    handleSupplierDataChange();
  }, [savingsAmount]);
  const handleSavingsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSavingsAmount(event.target.value as string);
  };

  return (
    <Box className={styles.CatalogSupplier}>
      <Box>
        <Box className={styles.DisplayFlex}>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Supplier">
              Supplier&nbsp;<Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <Select
                  className="SelectText"
                  onChange={handleSupplierChange}
                  value={selectedSupplier || ""}
                  //defaultValue={'none'}
                  displayEmpty={true}
                  required={true}
                >
                  <MenuItem value={""} disabled={true}>
                    <Typography className="MenuItem">
                      Select Supplier
                    </Typography>
                  </MenuItem>
                  {supplierData.map((item) => (
                    // @ts-ignore
                    <MenuItem
                      className="SelectText"
                      value={item}
                      key={item.id}
                      name={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Supplier Part No">
              Supplier Part No&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <TextField
                  required={true}
                  size={"small"}
                  onChange={handleSupplierPartChange}
                  value={supplierPart}
                ></TextField>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Shipping Mode">
              Shipping Mode (mandatory if products)&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <Select
                  className="SelectText"
                  onChange={handleShippingModeChange}
                  value={selectedShippingMode || ""}
                  //defaultValue={'none'}
                  required={true}
                  displayEmpty={true}
                >
                  <MenuItem value={""} disabled={true}>
                    <Typography className="MenuItem">Select Mode</Typography>
                  </MenuItem>
                  {shippingModeData.map((item) => (
                    // @ts-ignore
                    <MenuItem
                      className="SelectText"
                      value={item}
                      key={item.id}
                      name={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControls>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className={styles.DisplayFlex}>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Inco Terms">
              Inco Terms&nbsp;<Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <Select
                  className="SelectText"
                  onChange={handleIncoTermChange}
                  value={selectedIncoTerm || ""}
                  //defaultValue={'none'}
                  displayEmpty={true}
                  required={true}
                >
                  <MenuItem value={""} disabled={true}>
                    <Typography className="MenuItem">Select</Typography>
                  </MenuItem>
                  {incoTermData?.map((item) => (
                    // @ts-ignore
                    <MenuItem
                      className="SelectText"
                      value={item}
                      key={item.incoTermId}
                      name={item.incoType}
                    >
                      {item.incoType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Delivery Terms">
              Delivery Terms&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <Select
                  className="SelectText"
                  onChange={handleDeliveryTermChange}
                  value={selectedDeliveryTerm || ""}
                  //defaultValue={"none"}
                  displayEmpty={true}
                  required={true}
                >
                  <MenuItem value={""} disabled={true}>
                    <Typography className="MenuItem">Select</Typography>
                  </MenuItem>
                  {deliveryTermData.map((item) => (
                    // @ts-ignore
                    <MenuItem
                      className="SelectText"
                      value={item}
                      key={item.deliveryTermId}
                      name={item.deliveryType}
                    >
                      {item.deliveryType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Payment Terms">
              Payment Terms&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <Select
                  className="SelectText"
                  onChange={handlePaymentTermChange}
                  value={selectedPaymentTerm || ""}
                  displayEmpty={true}
                  required={true}
                >
                  <MenuItem value={""} disabled={true}>
                    <Typography className="MenuItem">Select</Typography>
                  </MenuItem>
                  {paymentTermData.map((item) => (
                    // @ts-ignore
                    <MenuItem
                      className="SelectText"
                      value={item}
                      key={item.paymentTermId}
                      name={item.paymentType}
                    >
                      {item.paymentType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControls>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className={styles.DisplayFlex}>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Start Date">
              Validity Start Date&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    onChange={handleStartDateChange}
                    value={startDate}
                  />
                </LocalizationProvider>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="End Date">
              Validity End Date&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { size: "small" } }}
                    onChange={handleEndDateChange}
                    value={endDate}
                  />
                </LocalizationProvider>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel
              className={styles.FormLabel}
              htmlFor="Catalogued for Location"
            >
              Catalogued for Location&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <Select
                  labelId="location-select-label"
                  id="location-select"
                  className="SelectText"
                  onChange={handleLocationChange}
                  displayEmpty={true}
                  value={selectedLocations}
                  multiple={true}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <Typography className="MenuItem">Select</Typography>
                      );
                    }
                    return selected.map((item) => item.name).join(",");
                  }}
                >
                  {locationData.map((item) => (
                    // @ts-ignore

                    <MenuItem
                      className="SelectText"
                      value={item}
                      key={item.id}
                      name={item.name}
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={selectedLocations.indexOf(item) > -1}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControls>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className={styles.DisplayFlex}>
          <Box className={styles.FormInput}>
            <FormLabel
              className={styles.FormLabel}
              htmlFor="Negotiated Quantity"
            >
              Negotiated Quantity&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <TextField
                  size="small"
                  required={true}
                  onChange={handleNegotiatedChange}
                  value={negotiatedQuantity}
                ></TextField>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Minimum Quantity">
              Minimum Quantity&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <NumberInput
                  type={"number"}
                  size="small"
                  required={true}
                  onChange={handleMinimumQtyChange}
                  value={minimumQuantity}
                />
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Currency">
              Currency&nbsp;<Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <Select
                  className="SelectText"
                  onChange={handleCurrencyChange}
                  value={selectedCurrency || ""}
                  displayEmpty={true}
                  required={true}
                >
                  <MenuItem value={""} disabled={true}>
                    <Typography className="MenuItem">Select</Typography>
                  </MenuItem>
                  {currencyData.map((item) => (
                    // @ts-ignore
                    <MenuItem
                      className="SelectText"
                      value={item}
                      key={item.id}
                      name={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControls>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className={styles.DisplayFlex}>
          <Box className={styles.FormInput}>
            <FormLabel
              className={styles.FormLabel}
              htmlFor="Contact Reference No"
            >
              Contact Reference No&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <TextField
                  size="small"
                  required={true}
                  onChange={handleRefNoChange}
                  value={contactRefNo}
                ></TextField>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel
              className={styles.FormLabel}
              htmlFor="Delivery Lead Time"
            >
              Delivery Lead Time (days)&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <NumberInput
                  type={"number"}
                  size="small"
                  required={true}
                  onChange={handleDeliveryLeadChange}
                  value={deliveryLeadTime}
                ></NumberInput>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Supplier Location">
              Supplier Location&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <Select
                  className="SelectText"
                  onChange={handleSupLocationChange}
                  value={selectedSupLocation || ""}
                  displayEmpty={true}
                  required={true}
                >
                  <MenuItem value={""} disabled={true}>
                    <Typography className="MenuItem">Select</Typography>
                  </MenuItem>
                  {supLocationData.map((item) => (
                    // @ts-ignore

                    <MenuItem
                      className="SelectText"
                      value={item}
                      key={item.id}
                      name={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControls>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className={styles.DisplayFlex}>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Units">
              Units&nbsp;<Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <Select
                  className="SelectText"
                  onChange={handleUnitsChange}
                  value={selectedUnits || ""}
                  displayEmpty={true}
                  required={true}
                >
                  <MenuItem value={""} disabled={true}>
                    <Typography className="MenuItem">Select</Typography>
                  </MenuItem>
                  {unitsData.map((item) => (
                    // @ts-ignore
                    <MenuItem
                      className="SelectText"
                      value={item}
                      key={item.id}
                      name={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel}>
              UOM Quantity&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <NumberInput
                  type={"number"}
                  size="small"
                  required={true}
                  onChange={handleUomQuantityChange}
                  value={uomQuantity}
                ></NumberInput>
              </FormControls>
            </Box>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Age">
              Minor UOM&nbsp;<Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <Select
                  className="SelectText"
                  onChange={handleMinorUomChange}
                  value={selectedMinorUom || ""}
                  displayEmpty={true}
                  required={true}
                >
                  <MenuItem value={""} disabled={true}>
                    <Typography className="MenuItem">Select</Typography>
                  </MenuItem>
                  {minorUomData.map((item) => (
                    // @ts-ignore
                    <MenuItem
                      className="SelectText"
                      value={item}
                      key={item.id}
                      name={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControls>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className={styles.DisplayFlex}>
          <Box className={styles.FormInput}>
            <FormControls
              className={`${styles.DisplayFlex} ${styles.MarginBottom}`}
            >
              <FormLabel
                className={`${styles.FormLabel}`}
                id="demo-row-radio-buttons-group-label"
              >
                UOM Quantity&nbsp;
                <Typography className={styles.Span}>*</Typography>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="uom-qty-group-label"
                name="uom-qty-buttons-group"
                value={priceType}
                onChange={(event) => setPriceType(event.target.value)}
              >
                <FormControlLabel
                  value={CatalogCrudRequestParamPriceListingTypeEnum.Totalprice}
                  control={<Radio />}
                  label={
                    <Typography className={styles.RadioText}>
                      Total Price
                    </Typography>
                  }
                />
                <FormControlLabel
                  value={CatalogCrudRequestParamPriceListingTypeEnum.Baseprice}
                  control={<Radio />}
                  label={
                    <Typography className={styles.RadioText}>
                      Base Price
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControls>
          </Box>
          <Box className={styles.FormInput}>
            <FormLabel className={styles.FormLabel} htmlFor="Age">
              Saving Amount&nbsp;
              <Typography className={styles.Span}>*</Typography>
            </FormLabel>
            <Box>
              <FormControls className={styles.FormControl} size="small">
                <TextField
                  size="small"
                  required={true}
                  onChange={handleSavingsChange}
                  value={savingsAmount}
                ></TextField>
              </FormControls>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CatalogSupplier;
