<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login')->name('login');
Route::post('inscription', 'AdminController@register');

Route::post('commandes', 'CommandesController@envoie');


Route::post('connection', 'AdminController@login');
Route::post('artists', 'ArtistsController@RegisterArtists');
Route::post('artistslogin', 'ArtistsController@LoginArtists');
Route::get('search', 'ArticleController@search');
Route::get('research', 'DesignController@research');
Route::post('commandes', 'CommandesController@envoie');


Route::post('commandes', 'CommandesController@envoie');

Route::post('connection', 'AdminController@login');
Route::post('artists', 'ArtistsController@RegisterArtists');
Route::post('artistslogin', 'ArtistsController@LoginArtists');
Route::get('search', 'ArticleController@search');
Route::get('research', 'DesignController@research');

Route::get('/article/all', 'ArticleController@showAll');
Route::post('/{user}/profile/update', 'UserController@update')->name('user.profile.update')->middleware('can:update,user');


Route::get('/users', 'UserController@show');
Route::post('/showuser', 'UserController@showbyid');
Route::post('/userupdate', 'UserController@updatebyid');

