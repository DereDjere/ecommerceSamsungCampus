<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Shipping;

class ShippingController extends Controller
{
    //

    public function showAll()
    {

        $shipping = Shipping::all();
        
        
        return json_encode($shipping);
    }

    public function updateShipping(request $request, $id)
    {
        $shipping = Shipping::find($id);


        foreach ($request->toArray() as $key => $value) {
            
                $shipping->$key = $value;
             
        }
        $shipping->save();

        
        return json_encode($shipping);
    }

    public function getShip(request $country)
    {
        // return json_encode($country->name);
        $country = $country->name;

        $shipping = Shipping::where('name', $country)->get('shipping_charges');
        
        
        return json_encode($shipping[0]);
    }
    
}
