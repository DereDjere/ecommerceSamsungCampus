import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from './components/Home/HomePage';

// ADMIN
import AdminPage from './components/Admin/AdminPage';
import AdminLogin from './components/Admin/Login_4DM1N';
import ValidationPage from './components/Admin/ValidationDesignPage';
import CataloguePage from './components/Catalogue/CataloguePage';
import ListUpdadePage from './components/Admin/ListUpdatePage';
import CategoriesPage from './components/Admin/CategoriePage';
import ThemePage from './components/Admin/ThemePage';
import ReportPage from './components/Admin/ReportPage';
import Ship from './components/Admin/Ship';
import Fournisseurs from './components/Admin/Fournisseurs';
import StatutCommande from './components/Admin/StatutCommande';
import StastiqueExcel from './components/Admin/Statistique';

import Fullregister from './components/Register/Fullregister';
import Fulllogin from './components/Login/Fulllogin';
import FullProducts from './components/ProductPage/FullProducts';
import FullPanier from './components/PanierPage/FullPanier';
import FullPrepayement from './components/PrePayement/FullPrepayement';
import FullPayement from './components/PayementPage/FullPayement'
import FullCustoms from './components/Custom/CustomPage';
import PrepayementUsers from './components/PrePayement/PrepayementUsers';
import MyCommandsPage from './components/UsersPage/MyCommandsPage';
import FullDesigns from './components/CatalogueDesigns/CataloguePage'
import RegisterGuest from './components/Guest/Fulllogin'; 
import Fullprofileupdate from './components/UserUpdate/profileupdate'; 
import Emailupdate from './components/UserUpdate/email/emailupdate';
import UsernameUpdate from './components/UserUpdate/username/usernameupdate';
import FirstnameUpdate from './components/UserUpdate/firstname/firstnameupdate';
import LastnameUpdate from './components/UserUpdate/lastname/lastnameupdate';

import Passwordupdate from './components/UserUpdate/password/passwordupdate';
import AddressInfo from './components/UserUpdate/addresse/addressinfo';
import AddressUpdate from './components/UserUpdate/addresse/addresseupdate';

import CpUpdate from './components/UserUpdate/addresse/cpupdate';
import CityUpdate from './components/UserUpdate/addresse/cityupdate';
import CountryUpdate from './components/UserUpdate/addresse/countryupdate';


import ArtisteProfil from './components/Artiste/ArtisteProfil'; 


// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';

import Fullregisterart from './components/RegisterArtist/Fullregisterart';
// import Fullprofileupdate from './components/UserUpdate/Fullregister';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons';
import Fulluserinterface from './components/UsersInterface/Fulluserinterface';
import Fulluserhelp from './components/UsersHelp/Fulluserhelp';
import Fullinfo from './components/UserUpdate/Fullinfo';
// import CataloguePage from './components/Catalogue/CataloguePage';


function App() {
  return (
    <Router>
      
        <Route path="/" exact component={HomePage} />
        <Route path="/catalogue" exact component={CataloguePage} />

        <Route path="/admin/create" exact component={AdminPage} />
        <Route path="/34343564" exact component={AdminLogin} />
        <Route path="/admin/validation" exact component={ValidationPage} />
        <Route path="/admin/article" exact component={ListUpdadePage} />
        <Route path="/admin/categorie" exact component={CategoriesPage} />
        <Route path="/admin/theme" exact component={ThemePage} />
        <Route path="/admin/report" exact component={ReportPage} />
        {/* <Route path="/admin/ship" exact component={Ship} /> */}
        <Route path="/admin/statistique" exact component={StastiqueExcel} />
        <Route path="/admin/1413914" exact component={AdminLogin} />
        <Route path="/admin/ship" exact component={Ship} />
        <Route path="/admin/fournisseurs" exact component={Fournisseurs} />
        <Route path="/admin/commande" exact component={StatutCommande} />
        <Route path="/register" exact component={Fullregister} />
        <Route path="/registerart" exact component={Fullregisterart} />
        <Route path="/login" exact component={Fulllogin} />
        <Route path="/article/:id" exact component={FullProducts} />
        {/* <Route path="/panier" exact component={FullPanier} /> */}
        {/* <Route path="/payement" exact component={FullPayement} /> */}
        <Route path="/designs" exact component={FullDesigns} />
        <Route path="/paniers" exact component={FullPanier} />
        <Route path="/customs/:id" exact component={FullCustoms} />
        <Route path="/mycommands" exact component={MyCommandsPage} />

        <Route path="/payement" exact component={FullPayement} />
        <Route path="/prepayement" exact component={FullPrepayement} />
        <Route path="/RegisterGuest" exact component={RegisterGuest} />
        <Route path="/profile/update" exact component={Fullprofileupdate} />
        <Route path="/userinterface" exact component={Fulluserinterface} />
        <Route path="/help" exact component={Fulluserhelp} />
        <Route path="/emailupdate" exact component={Emailupdate} />
        <Route path="/passwordupdate" exact component={Passwordupdate} />
        <Route path="/usernameupdate" exact component={UsernameUpdate} />
        <Route path="/addressinfo" exact component={AddressInfo} />
        <Route path="/addressupdate" exact component={AddressUpdate} />
        <Route path="/firstnameupdate" exact component={FirstnameUpdate} />
        <Route path="/lastnameupdate" exact component={LastnameUpdate} />

        <Route path="/cityupdate" exact component={CityUpdate} />
        <Route path="/cpupdate" exact component={CpUpdate} />
        <Route path="/countryupdate" exact component={CountryUpdate} />

        <Route path="/prepayement/info" exact component={FullPrepayement} />
        {/* <Route path="/RegisterGuest" exact component={RegisterGuest} /> */}
        <Route path="/artiste/:id" exact component={ArtisteProfil} />

      </Router>
      
  );
}

export default App;