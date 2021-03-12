<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Design;
use Illuminate\Support\Facades\DB;

class DesignController extends Controller
{
    //
    function showAll(){

        $design = Design::where('validation', '=', 1)->get();
        
        return json_encode($design);

    }

    function showDesignOne($id){
       
        $design = Design::find($id);
        // return $design->validation;
        if($design->validation !== 1){

            return json_encode('ce design na pas encore éte validé');
            // return redirect('/');
            
        }
        
        return json_encode($design);

    }

    function showDesignByFilter(Request $request)
    {
        $filter = $request->filter;

        $design = DB::table('designs')
        ->leftJoin('themes', 'designs.theme_id', '=', 'themes.id')
        ->leftJoin('artists','artists.id', '=', 'designs.user_artist_id')
        ->select('designs.id', 'designs.name_design', 'designs.url', 'designs.prix', 'artists.username')
        ->where('designs.name_design', 'LIKE', "%$filter%")->orWhere('artists.username', 'LIKE', "%$filter%")->orWhere('themes.nameTheme', 'LIKE', "%$filter%")->get();

        return json_encode($design);
        
    }
    public function research(Request $request)
    {

        $titre = Design::where("name_design", "LIKE", $request->name_design . "%")->get();

            return json_encode($titre);
    }
    public function getThemes(Request $request)
    {
        $theme = DB::select('select * from themes');

        return json_encode($theme);
    }
    public function searchTheme(Request $request)
    {
        $result = DB::select('select * from designs LEFT JOIN themes ON designs.theme_id = themes.id where themes.nameTheme = ?', [$request->nameTheme]);

        return json_encode($result);
    }
}
