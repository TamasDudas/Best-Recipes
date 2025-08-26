<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    public $fillable = [
          'name',
          'slug',
          'color',
          'is_featured',
          'featured_image',
      ];



    // Amikor egy új Category példányt hozunk létre (creating esemény),
    // ellenőrizzük, hogy a 'slug' mező üres-e.
    // Ha igen, akkor automatikusan generálunk egy slug-ot a 'name' mezőből.
    public static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            if (empty($category->slug)) {
                // A str()->slug() függvény a 'name' mezőből készít URL-barát szöveget.
                $category->slug = str()->slug($category->name);
            }
        });
    }


    public function recipes()
    {
        return $this->belongsToMany(Recipe::class);
    }
}
