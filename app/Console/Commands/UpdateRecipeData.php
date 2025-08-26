<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Recipe;

class UpdateRecipeData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-recipe-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Updating recipe data...');

        Recipe::all()->each(function ($recipe) {
            $recipe->ingredients = json_encode(explode(',', $recipe->ingredients));
            $recipe->instructions = json_encode(explode('\n', $recipe->instructions));
            $recipe->save();
        });

        $this->info('Recipe data updated successfully.');
    }
}
