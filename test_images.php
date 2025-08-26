<?php

require_once 'bootstrap/app.php';

use App\Models\Category;
use App\Traits\HandlesImages;

class TestClass
{
    use HandlesImages;
}

$test = new TestClass();

echo "Testing image URLs:\n";

$categories = Category::where('is_featured', true)->get();

foreach ($categories as $category) {
    echo "Category: {$category->name}\n";
    echo "Featured image: {$category->featured_image}\n";
    echo "Generated URL: " . $test->getImageUrl($category->featured_image) . "\n";
    echo "File exists: " . (file_exists(storage_path('app/public/categories/' . $category->featured_image)) ? 'YES' : 'NO') . "\n";
    echo "---\n";
}
