import React, {Suspense, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import CatalogHomePage from "./pages/CatalogHomePage/CatalogHomePage";
import CreateCatalogPage from "./pages/CreateCatalogPage/CreateCatalogPage";
import CartPage from "./pages/CartPage/CartPage";
import CatalogDetailsPage from "./pages/CatalogDetailsPage/CatalogDetailsPage";
import EditCatalogPage from "./pages/EditCatalogPage/EditCatalogPage";
import RenewCatalogPage from "./pages/RenewCatalogPage/RenewCatalogPage";

const AppRouter = () => {
    const [popOpen, setPopOpen] = useState(false);
    const [s_catlogId, setcatlogId] = useState('');
    let catlogid:string=''
    const popHandleOpen=()=>{
        setPopOpen(true)
    }
    const popHandleClose = () => {
        setPopOpen(false);
    };
    const fetchCatlogId = (catlogId: string) => {
        catlogid=catlogId;
        setcatlogId(catlogId);
    };
    return (
        <>
            <Routes>
                <Route path='/' element={<CatalogHomePage/>} />
                <Route path='/CreateCatalog' element={<CreateCatalogPage popOpenModal={popHandleOpen}/>} />
                <Route path='/CartPage' element={<CartPage/>} />
                {/* <Route path='/topics' element={<Topics/>} /> */}
                <Route path='/ProductDetails' element={<CatalogDetailsPage  />} />
                <Route path='/EditCatalog' element={<EditCatalogPage getCatlogId={fetchCatlogId}  />} />
                <Route path='/ReNewPage' element={<RenewCatalogPage getCatlogId={fetchCatlogId}/>}/>
            </Routes>
        </>
    );
}
export default AppRouter;

