<?php 
namespace App\Http\Middleware;

use App\Admin;
use Closure;
use Illuminate\Support\Facades\Hash;

class AdminMiddleware {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{


        $admin = Admin::where("email", "=", $request->email)->get();
         $pass = Hash::check($request->password,$admin[0]->password);

		if ($pass == false)
		{
			return redirect('home');
		}

		return $next($pass);
	}

}