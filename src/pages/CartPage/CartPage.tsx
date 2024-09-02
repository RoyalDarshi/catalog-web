import React, { useEffect } from "react";
import styles from "./CartPage.module.scss";
import { Box, Grid } from "@mui/material";
import CartItems from "../../components/inner/CartItems/CartItems";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import APIServices from "../../services/APIServices";
import CatalogCompanyDetails from "../../components/inner/CatalogCompanyDetails/CatalogCompanyDetails";

interface cartItemModel {
  buyerMainCatalogId: "string";
  itemName: string;
  imageName: string;
  contractDoc: string;
  unit: string;
  quantity: string;
  status: boolean;
  minimumQuantity: string;
  businessUnit: string;
  description: string;
  categoryId: string;
  supplierLocation: string;
  supplierCompanyId: string;
  paymentTerm: string;
  locationId: string;
  projectId: string;
  basePrice: string;
  currency: string;
  clientId: string;
  cartItemCount: BigInt;
}
export default function CartPage() {
  const nevigate = useNavigate();
  const [cartItemsList, setCartItems] = React.useState<cartItemModel[]>([]);
  const apiServices = new APIServices();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMouseEnter = (event: {
    currentTarget: React.SetStateAction<HTMLElement | null>;
  }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  const fetchCartItems = async (clientID: string) => {
    try {
      // var cartList = await apiServices.getCartItemsByClientID(clientID)
      // if (cartList) {
      // if (cartList.data) {
      //     setCartItems(cartList.data);
      //     }

      // }
      var cartList = [
        {
          buyerMainCatalogId: "12345",
          itemName: "Laptop",
          imageName: "laptop.jpg",
          contractDoc: "contract123.pdf",
          unit: "piece",
          quantity: "10",
          status: true,
          minimumQuantity: "1",
          businessUnit: "IT",
          description: "High-end gaming laptop",
          categoryId: "electronics",
          supplierLocation: "Hyderabad",
          supplierCompanyId: "supplier123",
          paymentTerm: "Net 30",
          locationId: "loc001",
          projectId: "proj001",
          basePrice: "1500.00",
          currency: "USD",
          clientId: "client001",
          cartItemCount: 5,
        },
        {
          buyerMainCatalogId: "67890",
          itemName: "Smartphone",
          imageName: "smartphone.jpg",
          contractDoc: "contract456.pdf",
          unit: "piece",
          quantity: "50",
          status: false,
          minimumQuantity: "5",
          businessUnit: "Mobile",
          description: "Latest model smartphone",
          categoryId: "electronics",
          supplierLocation: "Bangalore",
          supplierCompanyId: "supplier456",
          paymentTerm: "Net 45",
          locationId: "loc002",
          projectId: "proj002",
          basePrice: "800.00",
          currency: "USD",
          clientId: "client002",
          cartItemCount: 10,
        },
      ];
      setCartItems(cartList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchCartItems("clientId");
  }, []);
  return (
    <Box data-testid="CartPage">
      <Box className={styles.TopBar}>
        <Typography className="TopPagePath">
          <Link
            onClick={() => {
              nevigate("/");
            }}
            className="PageLink"
          >
            My Catalog
          </Link>
          &nbsp;
          <ChevronRight />
          &nbsp;Cart
        </Typography>
        <Box>
          <Button className="Btn">Create Requisition</Button>
        </Box>
      </Box>
      <Box className={styles.CartPage}>
        <Grid
          item
          xs={12}
          direction={"row"}
          columnSpacing={"24px"}
          container={true}
          justifyItems={"flex-start"}
          alignItems={"flex-start"}
        >
          {cartItemsList?.map((elem: cartItemModel) => (
            <Grid item xs={6} key={cartItemsList?.indexOf(elem)}>
              <CartItems
                handleMouseLeave={handleMouseLeave}
                handleMouseEnter={handleMouseEnter}
                cartItems={elem}
              />
            </Grid>
          ))}
        </Grid>
        <CatalogCompanyDetails anchorEl={anchorEl} />
      </Box>
    </Box>
  );
}
