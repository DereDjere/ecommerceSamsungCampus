<?php 
namespace Tests\Feature\Http\Controllers;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_update_own_profile()
    {
        $user = factory(Username::class)->create();
        $response = $this->actingAs($user)->post(route('user.profile.update', $user), [
            'username' => 'aziz',
        ]);

        $response->assertSuccessful();
        $user->refresh();
        $this->assertEquals('aziz', $user->username);
    }
}