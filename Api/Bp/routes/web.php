<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdministateurController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');


//// REGISTER LOGIN

Route::post('/register', 'UserController@register');
Route::post('/login/socials', 'UserController@registersocials');
Route::post('/login', 'UserController@login');
Route::get('/index', 'UserController@authCheck');
Route::get('auth/facebook', 'Auth\LoginController@redirectToProvider');
Route::get('auth/facebook/callback', 'Auth\LoginController@handleProviderCallback');

////// FRONT
Route::get('/article/{id}', 'ArticleController@show');
Route::get('/home', 'HomeController@showAll');
Route::get('/home/1', 'HomeController@showByVisiteOne');
Route::get('/home/2', 'HomeController@showByVisiteTwo');
Route::get('/article/all', 'ArticleController@showAll');
Route::get('/home/designs', 'HomeController@showDesign');
Route::get('/designs', 'DesignController@showAll');
Route::get('/design/{id}', 'DesignController@showDesignOne');
Route::get('/filter/categorie', 'ArticleController@FilterCategorie');
Route::post('/article/search', 'ArticleController@showFilter');
//// COMPTEUR DE VISITE//////
Route::post('/article/visite/{id}', 'ArticleController@visiteArticle');


///// FILTER
Route::post('/filter', 'ArticleController@showByFilter');

//// SPRITE
Route::post('/customs/search', 'DesignController@showDesignByFilter');
Route::post('/sprite/create', 'SpriteController@FusionAction');

////// ADMINS //////////////////////////////////////////////////

/// GESTION ARTICLE
Route::put('/admins/article/{id}', 'AdminstrateurController@updateArticle');
Route::post('/admins/create', 'AdminstrateurController@createArticle');
Route::post('/admins/article/image/{id}', 'AdminstrateurController@updateImageArticle');
Route::delete('/admins/delete/{id}', 'AdminstrateurController@deleteArticle');
Route::get('/admins/login', 'AdminController@login');
Route::post('/admins/register', 'AdminController@register');

/// GESTION DESIGN
Route::get('/admins/design/request', 'AdminstrateurController@RequestDesign');
Route::get('/admins/design/{id}/valid', 'AdminstrateurController@ValidationDesign');
Route::get('/admins/design/{id}/invalid', 'AdminstrateurController@RefuseDesign');
Route::get('/catalogue/design/all', 'DesignController@showAll');
Route::get('/catalogue/design/theme', 'DesignController@getThemes');
Route::post('/catalogue/design/filter', 'DesignController@searchTheme');
/// GESTION CATEGORIE

Route::post('/admins/create/categorie', 'AdminstrateurController@AddCategorie');
Route::delete('/admins/delete/categorie/{id}', 'AdminstrateurController@DeleteCategorie');
Route::get('/admins/categories', 'AdminstrateurController@ShowCategorie');

/// GESTION THEME ADMIN

Route::post('/admins/create/theme', 'AdminstrateurController@AddTheme');
Route::delete('/admins/delete/theme/{id}', 'AdminstrateurController@DeleteTheme');
Route::get('/admins/theme', 'AdminstrateurController@ShowTheme');

/// GESTION FRAIS DE PORT

Route::get('/admins/shipping', 'ShippingController@showAll');
Route::post('/admins/shipping/update/{id}', 'ShippingController@updateShipping');
Route::post('/shipping', 'ShippingController@getShip');

/// GESTION PROMOTION

Route::get('/admins/promotions', 'AdminstrateurController@getPromotion');


//// ABONNEMENT USER

Route::get('/user/abonnement/{tokensub}', 'AbonnementController@subscrib');
Route::get('/check/abonnement/{tokensub}', 'AbonnementController@checkSubscrib');

//// ABONNEMENT USER

Route::post('/admins/update/stock/{id}', 'AdminstrateurController@updateStock');
/// GESTION PAYEMENT
Route::post('/payement/save', 'PayementController@AdressSave');

// Route::post('/admins/create/categorie', 'PayementController@AddCategorie');
Route::post('/commandes/users', 'CommandesController@envoieUsers');
Route::post('/commandes/isChecked', 'CommandesController@isChecked');
Route::post('/mycommandes', 'CommandesController@ListCommands');
Route::post('/mycommandes/facture/price', 'CommandesController@FacturePriceCommands');
Route::post('/mycommandes/facture/articles', 'CommandesController@FactureArticleCommands');
Route::post('/mycommandes/facture/designs', 'CommandesController@FactureDesignCommands');
Route::post('/mycommandes/search', 'CommandesController@SearchCommands');

Route::post('/prepayement', 'CommandesController@envoie');

/// GESTION DE COMMANDE EXCEL STAT

Route::get('/admin/statistique', 'CommandesController@commande');
Route::get('/admin/statistique/stock', 'CommandesController@statistiqueStock');

/// GESTION DE COMMANDE STATUS

Route::get('/admin/commande/status/prepa', 'CommandesController@getCommandePrepa');
Route::get('/admin/commande/status/livraison', 'CommandesController@getCommandeLivraison');
Route::get('/admin/commande/status/livre', 'CommandesController@getCommandeLivrée');
Route::get('/admin/commande/status/terminer', 'CommandesController@DeleteCommandeLivré');
Route::get('/admin/commande/status/update/livraison/{id}', 'CommandesController@updateCommandeLivraison');
Route::get('/admin/commande/status/update/livraison/livre/{id}', 'CommandesController@updateCommandeLivre');
Route::get('/admin/commande/status/terminer/{id}', 'CommandesController@DeleteCommandeLivré');

/// GESTION STRIPE

Route::post('/stripe/pay','StripeController@pay');
Route::post('/savecard','UserController@savecard');
Route::post('/checksavecard','UserController@checksavecard');

///GESTION USERS

Route::post('/users/report','UserController@UsersReport');  
/// GESTION ADMINS REPORT

Route::get('/admins/report','AdminstrateurController@ShowReport');
Route::delete('/admins/delete/report/{id}','AdminstrateurController@DeleteReport');

/// GESTION ARTISTS


Route::get('/artist/{id}', 'ArtistsController@InfoArtists');
Route::post('/artist/update/{id}', 'ArtistsController@EditProfil');
Route::post('/artist/add/{id}', 'ArtistsController@AddDesign');
Route::post('/artist/add/url/{id}', 'ArtistsController@AddUrlDesign');
Route::get('/artist/design/theme', 'ArtistsController@ShowTheme');
Route::post('/artist/verif/log/{id}', 'ArtistsController@verifArtisLog');
Route::post('/artist/get/id', 'ArtistsController@getId');
Route::post('/artist/profileimg/{id}', 'ArtistsController@AddPhotoProfil');
Route::get('/artist/design/{id}', 'ArtistsController@getDesignArtiste');

