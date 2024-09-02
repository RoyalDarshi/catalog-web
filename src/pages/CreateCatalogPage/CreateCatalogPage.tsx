import React, { useState } from "react";
import CatalogItem from "../../components/inner/CatalogItem/CatalogItem";
import styles from "./CreateCatalogPage.module.scss";
import CatalogContent from "../../components/inner/CatalogContent/CatalogContent";
import CatalogPriceDetails from "../../components/inner/CatalogPriceDetails/CatalogPriceDetails";
import CatalogSupplier from "../../components/inner/CatalogSupplier/CatalogSupplier";
import Box from "@mui/material/Box";
import BuPriceDetails from "../../components/inner/BuPriceDetails/BuPriceDetails";
import AddBusinessUnit from "../../components/inner/AddBusinessUnit/AddBusinessUnit";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UploadImage from "../../components/inner/UploadImage/UploadImage";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import APIServices from "../../services/APIServices";
import {
  CatalogCrudRequestParam,
  CatalogCrudRequestParamCatalogTypeEnum,
  CatalogCrudRequestParamPriceListingTypeEnum,
  CatalogDetailsPayLoadDTO,
  OptionDto,
  BuPriceTemplateStructureDTO,
  TermsDto,
} from "../../services/models/payload-details";
import { CatalogStatusEnum } from "../../services/models/workflow-data-model";
import { toast } from "react-toastify";
import Popup from "../../components/inner/Popup/Popup";
import { showError, showSuccess } from "../../services/alert-service";
import { BuyerMainCatalogDetailsDTO } from "../../services/models/BuyerMainCatalogDetailsDTO";

interface ChildComponentProps {
  popOpenModal: () => void;
}

interface ItemData {
  selectedProjects: [];
  selectedCategory: TermsDto;
  selectedSubCategory: TermsDto;
  selectedL3Category: OptionDto;
  selectedItemService: OptionDto;
  description: "";
  keyword: "";
  itemType: "";
}

interface SupplierData {
  selectedSupplier: OptionDto;
  selectedShippingMode: OptionDto;
  selectedIncoTerm: TermsDto;
  selectedDeliveryTerm: TermsDto;
  selectedPaymentTerm: TermsDto;
  selectedLocations: [];
  selectedCurrency: OptionDto;
  selectedUnits: OptionDto;
  selectedMinorUom: OptionDto;
  selectedSupLocation: OptionDto;
  supplierPart: "";
  negotiatedQuantity: "";
  minimumQuantity: number;
  contactRefNo: "";
  priceType: "";
  deliveryLeadTime: number;
  uomQuantity: number;
  startDate: "";
  endDate: "";
  savingsAmount: "";
  clientId: "";
}

interface BusinessData {
  buPriceTemplateStructureDTOS: [];
}

const CreateCatalogPage: React.FC<ChildComponentProps> = ({ popOpenModal }) => {
  const [formState, setFormState] = useState({});  
  const [selectedBuForPriceUnit, setselectedBuForPriceUnit] = useState();
  const [selectedImageFilesFromPopup, setSelectedImageFilesFromPopup] =
    useState<File[]>([]); //
  const [open, setOpen] = useState(false);
  const [buOpen, setBuOpen] = useState(false);
  const [businessUnitDetails, setbusinessUnitDetails] = useState<any[]>([]);
  const [itemSectionData, setItemSectionData] = useState<ItemData>();
  const [supplierSectionData, setSupplierSectionData] =
    useState<SupplierData>();
  const apiServices = new APIServices();
  const [businessUnitRowData, setbusinessUnitRowData] = useState();
  const [BUPriceDetails, setBUPriceDetails] = useState<any[]>([]);
  const [buPriceDetailsfilterdData, setbuPriceDetailsfilterdData] = useState<
    any[]
  >([]);
  const [selectedRow, setSelectedRow] = useState();
  const [deletedRow, setDeletedRow] = useState();
  const [businessSectionData, setBusinessSectionData] =
    useState<BusinessData>();
  const [existingBusinessUnitIds, setExistingBusinessUnitIds] = useState<
    string[]
  >([]);
  const [selectedContractFile, setSelectedContractFile] = useState<File | null>(
    null
  );

  const handleContractFileChange = (file: File) => {
    setSelectedContractFile(file);
  };

  const handleFilesSelected = (files: File[]) => {
    setSelectedImageFilesFromPopup(files);
  };

  const updateExistingBusinessUnits = (businessUnitIds: string[]) => {
    setExistingBusinessUnitIds(businessUnitIds);
  };

  const selectedBuPriceRow = (rowData: any) => {
    setSelectedRow(rowData);
  };

  const handleOpen = (rowData: any) => {
    setOpen(true);
    setbusinessUnitRowData(rowData);
  };

  const getBusinessUnitData = () => {
    return businessUnitRowData;
  };

  const handleClose = () => {
    setOpen(false);
  };
  const buHandleOpen = () => {
    setBuOpen(true);
  };

  const buHandleClose = () => {
    setBuOpen(false);
  };

  const handleData1Change = (newData: ItemData) => {
    setItemSectionData(newData);
  };
  const handleData2Change = (newData: SupplierData) => {
    setSupplierSectionData(newData);
  };
  const handleData3Change = (newData: BusinessData) => {
    setBusinessSectionData(newData);
  };
  const [popupData, setPopupData] = useState("");

  const checkValidation = () => {
    return (
      itemSectionData?.selectedCategory &&
      itemSectionData?.selectedSubCategory &&
      itemSectionData?.selectedItemService &&
      itemSectionData?.description &&
      itemSectionData?.keyword &&
      supplierSectionData?.selectedSupplier &&
      supplierSectionData?.supplierPart &&
      supplierSectionData?.selectedShippingMode &&
      supplierSectionData?.selectedIncoTerm &&
      supplierSectionData?.selectedDeliveryTerm &&
      supplierSectionData?.selectedPaymentTerm &&
      supplierSectionData?.startDate &&
      supplierSectionData?.endDate &&
      supplierSectionData?.selectedLocations &&
      supplierSectionData?.negotiatedQuantity &&
      supplierSectionData?.minimumQuantity &&
      supplierSectionData?.selectedCurrency &&
      supplierSectionData?.contactRefNo &&
      supplierSectionData?.deliveryLeadTime &&
      supplierSectionData?.selectedSupLocation &&
      supplierSectionData?.selectedUnits &&
      supplierSectionData?.uomQuantity &&
      supplierSectionData?.selectedMinorUom &&
      supplierSectionData?.savingsAmount &&
      selectedContractFile
    );
  };

  const handleSubmitDraft = () => {
    if (checkValidation()) {
      apiServices
        .createCatalog(
          JSON.stringify(getPayloadForCrud(CatalogStatusEnum.DRAFT))
        )
        .then(
          (response) => {
            const catalogId = response.data;
            if (selectedContractFile) {
              let fileUploadResult = apiServices.uploadFiles(
                catalogId,
                selectedImageFilesFromPopup,
                selectedContractFile,
                selectedImageFilesFromPopup
              );
              showSuccess(JSON.stringify(fileUploadResult));
            } else {
              showError("Please select contract file..");
            }
            navigate("/");
            showSuccess("Item/service saved as draft successfully.");
            //setPopupOpen(true);
          },
          (error) => {
            toast.error("Errrr! Error occurred" + JSON.stringify(error), {
              position: "top-right",
              autoClose: 2000, // Duration in milliseconds
            });
          }
        );
    } else {
      showError("Please fill all mandatory fields!");
    }
  };

  const handleSubmit = () => {
    if (checkValidation()) {
      apiServices
        .createCatalog(
          JSON.stringify(getPayloadForCrud(CatalogStatusEnum.PENDING))
        )
        .then((createCatalogResponse) => {
          // @ts-ignore
          const catalogId = createCatalogResponse.data;

          if (selectedContractFile) {
            let fileUploadResult = apiServices.uploadFiles(
              catalogId,
              selectedImageFilesFromPopup,
              selectedContractFile,
              selectedImageFilesFromPopup
            );
            showSuccess(JSON.stringify(fileUploadResult));
          } else {
            showError("Please select contract file..");
          }
          navigate("/");
        })
        .catch((error) => {
          showError("Error occurred: " + error.message);
        });
    } else {
      showError("Please fill all mandatory fields!");
    }
  };

  const getPayloadForCrud = (status: number) => {
    let catalogRequestParamDto = new CatalogCrudRequestParam();
    let catalogDetailsPayloadDto = new CatalogDetailsPayLoadDTO();
    catalogRequestParamDto.catalogType =
      CatalogCrudRequestParamCatalogTypeEnum.Goods;
    catalogRequestParamDto.priceListingType =
      CatalogCrudRequestParamPriceListingTypeEnum.Baseprice;
    catalogRequestParamDto.catalogDetailsPayLoadDTO = catalogDetailsPayloadDto;
    catalogDetailsPayloadDto.projects = Array.isArray(
      itemSectionData?.selectedProjects
    )
      ? itemSectionData?.selectedProjects
      : [];
    catalogDetailsPayloadDto.locations = Array.isArray(
      supplierSectionData?.selectedLocations
    )
      ? supplierSectionData?.selectedLocations
      : [];
    catalogRequestParamDto.catalogType = itemSectionData?.itemType
      ? itemSectionData?.itemType
      : CatalogCrudRequestParamCatalogTypeEnum.Goods;
    catalogDetailsPayloadDto.categoryId = itemSectionData?.selectedCategory?.id
      ? itemSectionData.selectedCategory.id
      : "";
    catalogDetailsPayloadDto.categoryName = itemSectionData?.selectedCategory
      ?.categoryName
      ? itemSectionData.selectedCategory.categoryName
      : "";
    catalogDetailsPayloadDto.subcategoryId = itemSectionData
      ?.selectedSubCategory?.subCategoryId
      ? itemSectionData.selectedSubCategory.subCategoryId
      : "";
    catalogDetailsPayloadDto.subcategoryName = itemSectionData
      ?.selectedSubCategory?.subCategoryName
      ? itemSectionData.selectedSubCategory.subCategoryName
      : "";
    catalogDetailsPayloadDto.l3CategoryId = itemSectionData?.selectedL3Category
      ?.id
      ? itemSectionData.selectedL3Category.id
      : "";
    catalogDetailsPayloadDto.l3CategoryName = itemSectionData
      ?.selectedL3Category?.name
      ? itemSectionData.selectedL3Category.name
      : "";
    catalogDetailsPayloadDto.itemId = itemSectionData?.selectedItemService?.id
      ? itemSectionData.selectedItemService.id
      : "";
    catalogDetailsPayloadDto.itemName = itemSectionData?.selectedItemService
      ?.name
      ? itemSectionData.selectedItemService.name
      : "";
    catalogDetailsPayloadDto.supplierCompanyId = supplierSectionData
      ?.selectedSupplier?.id
      ? supplierSectionData.selectedSupplier.id
      : "";
    catalogDetailsPayloadDto.supplierCompanyName = supplierSectionData
      ?.selectedSupplier?.name
      ? supplierSectionData.selectedSupplier.name
      : "";
    catalogDetailsPayloadDto.supplierLocation = supplierSectionData
      ?.selectedSupLocation?.id
      ? supplierSectionData.selectedSupLocation.id
      : "";
    catalogDetailsPayloadDto.supplierLocationName = supplierSectionData
      ?.selectedSupLocation?.name
      ? supplierSectionData.selectedSupLocation.name
      : "";
    catalogDetailsPayloadDto.deliveryTermId = supplierSectionData
      ?.selectedDeliveryTerm?.deliveryTermId
      ? supplierSectionData?.selectedDeliveryTerm?.deliveryTermId
      : "";
    catalogDetailsPayloadDto.deliveryTerm = supplierSectionData
      ? supplierSectionData?.selectedDeliveryTerm?.deliveryType
      : "";
    catalogDetailsPayloadDto.incoTermId = supplierSectionData
      ? supplierSectionData?.selectedIncoTerm?.incoTermId
      : "";
    catalogDetailsPayloadDto.incoTerm = supplierSectionData
      ? supplierSectionData?.selectedIncoTerm?.incoType
      : "";
    catalogDetailsPayloadDto.paymentTermId = supplierSectionData
      ? supplierSectionData?.selectedPaymentTerm?.paymentTermId
      : "";
    catalogDetailsPayloadDto.paymentTerm = supplierSectionData
      ? supplierSectionData?.selectedPaymentTerm?.paymentType
      : "";
    catalogDetailsPayloadDto.currencyId = supplierSectionData?.selectedCurrency
      ?.id
      ? supplierSectionData?.selectedCurrency?.id
      : "";
    catalogDetailsPayloadDto.currency = supplierSectionData?.selectedCurrency
      ?.name
      ? supplierSectionData?.selectedCurrency?.name
      : "";
    catalogDetailsPayloadDto.minorUOMId = supplierSectionData?.selectedMinorUom
      ?.id
      ? supplierSectionData?.selectedMinorUom?.id
      : "";
    catalogDetailsPayloadDto.minorUOM = supplierSectionData?.selectedMinorUom
      ?.name
      ? supplierSectionData?.selectedMinorUom?.name
      : "";
    catalogDetailsPayloadDto.shipModeId = supplierSectionData
      ?.selectedShippingMode?.id
      ? supplierSectionData?.selectedShippingMode?.id
      : "";
    catalogDetailsPayloadDto.shipMode = supplierSectionData
      ?.selectedShippingMode?.name
      ? supplierSectionData?.selectedShippingMode?.name
      : "";
    catalogDetailsPayloadDto.unitId = supplierSectionData?.selectedUnits?.id
      ? supplierSectionData?.selectedUnits?.id
      : "";
    catalogDetailsPayloadDto.unit = supplierSectionData?.selectedUnits?.name
      ? supplierSectionData?.selectedUnits?.name
      : "";
    catalogDetailsPayloadDto.description = itemSectionData
      ? itemSectionData.description
      : "";
    catalogDetailsPayloadDto.keyword = itemSectionData
      ? itemSectionData.keyword
      : "";
    catalogDetailsPayloadDto.supplierPartNo = supplierSectionData
      ? supplierSectionData.supplierPart
      : "";
    catalogDetailsPayloadDto.quantity = supplierSectionData
      ? supplierSectionData.negotiatedQuantity
      : "";
    catalogDetailsPayloadDto.minimumQuantity = supplierSectionData
      ? supplierSectionData.minimumQuantity
      : 0; // Assuming a default value of 0 if supplierSectionData is falsy
    catalogDetailsPayloadDto.contractReferenceNo = supplierSectionData
      ? supplierSectionData.contactRefNo
      : "";
    catalogDetailsPayloadDto.deliveryLeadTime = supplierSectionData
      ? supplierSectionData.deliveryLeadTime
      : 0; // Assuming a default value of 0 if supplierSectionData is falsy
    catalogDetailsPayloadDto.uomquantity = supplierSectionData
      ? supplierSectionData.uomQuantity
      : 0;
    catalogDetailsPayloadDto.startDate = supplierSectionData
      ? supplierSectionData.startDate
      : "";
    catalogDetailsPayloadDto.endDate = supplierSectionData
      ? supplierSectionData.endDate
      : "";
    catalogDetailsPayloadDto.savingAmount = supplierSectionData
      ? supplierSectionData.savingsAmount
      : "";
    catalogDetailsPayloadDto.clientId = supplierSectionData
      ? supplierSectionData.clientId
      : "";
    catalogRequestParamDto.priceListingType = supplierSectionData?.priceType
      ? supplierSectionData?.priceType
      : CatalogCrudRequestParamPriceListingTypeEnum.Totalprice;
    // Assuming you have businessUnitDetails and BUPriceDetails arrays

    // Initialize an empty array to store the transformed data
    const buPriceTemplateStructureDTOS: any = [];

    // Iterate over businessUnitDetails
    businessUnitDetails.forEach((businessUnit) => {
      // Find BUPriceDetails for the current business unit
      const buPriceDetails = BUPriceDetails.filter(
        (priceDetail) => priceDetail.businessUnitId === businessUnit.id
      );

      // Create a new structure for the current business unit
      const buPriceTemplate = {
        businessUnitId: businessUnit.businessUnitId,
        businessUnitName: businessUnit.businessUnit,
        basePrice: businessUnit.basePrice,
        totalPrice: businessUnit.totalPrice,
        priceStructure: buPriceDetails.map((priceDetail) => ({
          compName: priceDetail.PriceLabel,
          compType: 1,
          calcType: 0,
          calcOn: priceDetail.CalculationOn,
          taxVal: priceDetail.Value,
        })),
      };

      // Add the current business unit structure to the result array
      buPriceTemplateStructureDTOS.push(buPriceTemplate);
    });
    catalogDetailsPayloadDto.buPriceTemplateStructureDTOS =
      buPriceTemplateStructureDTOS;

    catalogDetailsPayloadDto.status = status;
    return catalogRequestParamDto;
  };

  const handleSaveBuPriceDetails = (updatedData: any) => {
    setBUPriceDetails((prevBuPriceDetails) => {
      const updatedBUPriceDetails = prevBuPriceDetails.map((prevRow) => {
        const updatedRow = updatedData.find(
          (updatedRow: any) => updatedRow.Id === prevRow.Id
        );

        if (updatedRow) {
          // Update the existing row
          return { ...prevRow, ...updatedRow };
        }

        // If the row doesn't exist in the updated data, keep the existing row
        return prevRow;
      });

      // Add new rows that are not present in the existing data
      updatedData.forEach((updatedRow: any) => {
        if (!updatedBUPriceDetails.some((row) => row.Id === updatedRow.Id)) {
          updatedBUPriceDetails.push(updatedRow);
        }
      });

      return updatedBUPriceDetails;
    });
  };

  const [imgOpen, setImgOpen] = useState(false);
  const imgHandleOpen = () => {
    setImgOpen(true);
  };
  const imgHandleClose = () => {
    setImgOpen(false);
  };
  const [popupOpen, setPopupOpen] = useState(false);
  const popupHandleOpen = () => {
    setPopupOpen(true);
  };
  const popupHandleClose = () => {
    setPopupOpen(false);
  };
  const navigate = useNavigate();
  React.useEffect(() => {
    if (businessUnitRowData !== null) {
      setbusinessUnitRowData(businessUnitRowData);
    }
    if (open && businessUnitRowData) {
      // Filter BUPriceDetails based on businessUnitRowData.id
      const filteredData = BUPriceDetails.filter((item: any) => {
        // @ts-ignore
        return item.businessUnitId === businessUnitRowData?.id;
      });
      setbuPriceDetailsfilterdData(filteredData);
    }
  }, [open, businessUnitRowData, BUPriceDetails, buPriceDetailsfilterdData]);

  const businessunitData = (addbusinessUnits: any) => {
    setbusinessUnitDetails((prevBusinessUnitDetails) => {
      const updatedBusinessUnitDetails = [
        ...prevBusinessUnitDetails,
        addbusinessUnits,
      ];
      const businessUnitIds = updatedBusinessUnitDetails.map(
        (item) => item.businessUnitId
      );
      updateExistingBusinessUnits(businessUnitIds);
      return updatedBusinessUnitDetails;
    });
  };

  const setBusinessData = () => {
    return businessUnitDetails;
  };

  const updateBusinessUnits = (dataToUpdate: any) => {
    let newBusinessUnits = businessUnitDetails.map((updatedItem) => {
      // @ts-ignore
      if (updatedItem.id === dataToUpdate.id) {
        // @ts-ignore
        return {
          ...updatedItem,
          basePrice: dataToUpdate.basePrice,
          totalPrice: dataToUpdate.totalPrice,
        };
      } else {
        return updatedItem;
      }
    });
    setbusinessUnitDetails(newBusinessUnits);
    setSelectedRow(undefined);
  };

  const handleRemoveFromList = (rowData: any) => {
    let updatedList = businessUnitDetails.filter(
      (item) => item.id !== rowData.id
    );
    const businessUnitIds = updatedList.map((item) => item.businessUnitId);
    updateExistingBusinessUnits(businessUnitIds);
    setbusinessUnitDetails(updatedList);
  };
  // @ts-ignore
  return (
    <Box data-testid="CreateCatalogPage">
      <Box className={styles.CreateCatalogPage}>
        <Box className={styles.PaddingLeft}>
          <Typography className="TopPagePath">
            <Link
              onClick={() => {
                navigate("/");
              }}
              className="PageLink"
            >
              My Catalog
            </Link>
            &nbsp;
            <ChevronRight />
            &nbsp;Add Items/Services
          </Typography>
        </Box>
        <Box>
          <CatalogItem onItemDataChange={handleData1Change} />
        </Box>

        <Box>
          <CatalogSupplier onSupplierDataChange={handleData2Change} />
        </Box>

        <Box>
          <CatalogContent
            selectedFilesFromPopup={selectedImageFilesFromPopup}
            openModal={imgHandleOpen}
            onContractFileChange={handleContractFileChange}
            selectedContractFile={selectedContractFile}
          />
        </Box>

        <Box>
          <CatalogPriceDetails
            handleRemoveFromList={handleRemoveFromList}
            openModal={handleOpen}
            buOpenModal={buHandleOpen}
            catalogUnitDetails={setBusinessData}
            selectedUnit={selectedBuPriceRow}
          />
          <Box className={styles.Footer}>
            <Box>
              <Button
                variant="outlined"
                size="small"
                className="Btn"
                onClick={handleSubmitDraft}
              >
                Save as draft
              </Button>
            </Box>
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                size="small"
                className="Btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                className="Btn"
                size="small"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box>
          <BuPriceDetails
            isOpen={open}
            onRequestClose={handleClose}
            getbusinessUnitRowData={getBusinessUnitData}
            getBasePriceData={handleSaveBuPriceDetails}
            buPriceDetailsList={buPriceDetailsfilterdData}
          />
        </Box>
        <Box>
          <AddBusinessUnit
            refreshBusinessUnits={updateBusinessUnits}
            businessUnitsList={businessUnitDetails}
            updateBusinessUnits={businessunitData}
            buOpen={buOpen}
            onReqClose={buHandleClose}
            selectedRowData={selectedRow}
            existingBusinessUnitIds={businessUnitDetails.map(
              (unit) => unit.businessUnitId
            )}
          />
        </Box>

        <Box>
          <UploadImage
            onFilesSelected={handleFilesSelected}
            isOpen={imgOpen}
            onRequestClose={imgHandleClose}
          />
        </Box>
        <Box>
          <Popup
            isOpen={popupOpen}
            onRequestClose={popupHandleClose}
            dataDisplay={popupData}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default CreateCatalogPage;
