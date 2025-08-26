<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait HandlesImages
{
    /**
     * Ellenőrzi, hogy létezik-e a fájl a public disk-en
     *
     * @param string|null $imagePath
     * @return bool
     */
    private function imageExists(?string $imagePath): bool
    {
        return $imagePath && Storage::disk('public')->exists($imagePath);
    }

    /**
     * Storage disk lekérése (DRY elv)
     *
     * @return \Illuminate\Contracts\Filesystem\Filesystem
     */
    private function getPublicDisk()
    {
        return Storage::disk('public');
    }
    /**
     * Kép feltöltése a megadott mappába
     *
     * @param UploadedFile $file
     * @param string $directory (pl: 'recipes', 'categories')
     * @param string|null $oldPath - régi kép törléshez
     * @param string|null $baseName - SEO-barát alap név (pl: 'gulyasleves')
     * @return string - az új kép elérési útvonala
     */
    public function uploadImage(UploadedFile $file, string $directory, ?string $oldPath = null, ?string $baseName = null): string
    {
        // Régi kép törlése, ha van
        if ($this->imageExists($oldPath)) {
            $this->getPublicDisk()->delete($oldPath);
        }

        // SEO-barát fájlnév generálása
        if ($baseName) {
            // Beszédes név + timestamp az egyediségért
            $cleanName = Str::slug($baseName); // URL-barát formátum
            $fileName = $cleanName . '_' . time() . '.' . $file->getClientOriginalExtension();
        } else {
            // Fallback az eredeti módszerre
            $fileName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
        }

        // Kép mentése
        $path = $file->storeAs($directory, $fileName, 'public');

        return $path;
    }

    /**
     * Kép törlése
     *
     * @param string|null $imagePath
     * @return bool
     */
    public function deleteImage(?string $imagePath): bool
    {
        if ($this->imageExists($imagePath)) {
            return $this->getPublicDisk()->delete($imagePath);
        }

        return false;
    }

    /**
     * Kép URL lekérése
     *
     * @param string|null $imagePath
     * @return string|null
     */
    public function getImageUrl(?string $imagePath): ?string
    {
        if ($this->imageExists($imagePath)) {
            return asset('storage/' . $imagePath);
        }

        return null;
    }

    /**
     * Validáció képekhez
     *
     * @return array
     */
    public function getImageValidationRules(): array
    {
        return [
            'image' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif,webp',
                'max:2048' // 2MB max
            ]
        ];
    }
}
