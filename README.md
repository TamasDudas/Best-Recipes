# Best Recipes - Recept Megosztó Platform

Egy modern, teljes stack webalkalmazás receptek megosztására és kezelésére, Laravel backend és React frontend technológiákkal építve.

## 🚀 Főbb Funkciók

### Felhasználói Funkciók

-   **Recept böngészés**: Kategóriák szerint szűrés és keresés
-   **Részletes recept nézet**: Hozzávalók, elkészítési útmutató, képek
-   **Kommentrendszer**: Moderált hozzászólások receptekhez
-   **Felhasználói regisztráció/bejelentkezés**: Biztonságos autentikáció

### Szerzői Funkciók (Bejelentkezett felhasználók)

-   **Recept létrehozása**: Saját receptek feltöltése képekkel
-   **Saját receptek szerkesztése**: Csak a saját receptek módosítása
-   **Kép feltöltés**: Automatikus képkezelés és optimalizálás

### Admin Funkciók

-   **Kategória kezelés**: Kategóriák létrehozása, szerkesztése, törlése
-   **Komment moderáció**: Hozzászólások jóváhagyása/elutasítása
-   **Teljes recept kezelés**: Minden recept szerkesztése/törlése
-   **Felhasználó jogosultság kezelés**: Szerepkörök és engedélyek

## 🛠️ Technológiai Stack

### Backend

-   **Laravel 11**: PHP web framework
-   **Spatie Permission**: Szerepkör és jogosultság kezelés
-   **Inertia.js**: SPA-szerű élmény hagyományos server-side renderinggel
-   **SQLite**: Könnyű, file-alapú adatbázis

### Frontend

-   **React 18**: Modern UI komponens könyvtár
-   **Inertia React Adapter**: Seamless Laravel-React integráció
-   **Tailwind CSS**: Utility-first CSS framework
-   **Vite**: Gyors frontend build tool

## 📋 Telepítési Útmutató

### Előfeltételek

-   PHP 8.2+
-   Composer
-   Node.js 18+
-   npm vagy yarn

### 1. Projekt klónozása és függőségek telepítése

```bash
git clone <repository-url>
cd Best-Recipes
composer install
npm install
```

### 2. Környezeti változók beállítása

```bash
cp .env.example .env
php artisan key:generate
```

### 3. Adatbázis beállítása

**Módszer A: Migrációk és seedek (Ajánlott)**

```bash
php artisan migrate
php artisan db:seed
```

**Módszer B: SQL dump importálása (Opcióális)**

```bash
# MySQL adatbázis létrehozása
mysql -u root -p -e "CREATE DATABASE recipes"

# SQL fájl importálása (ha van kész adatbázis)
mysql -u root -p recipes < database.sql
```

**Adatbázis konfigurálása a .env fájlban:**

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=recipes
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 4. Storage linkek létrehozása

```bash
php artisan storage:link
```

### 5. Frontend build

```bash
npm run build
# vagy fejlesztéshez:
npm run dev
```

### 6. Szerver indítása

```bash
php artisan serve
```

Az alkalmazás elérhető lesz a `http://localhost:8000` címen.

## 🧪 Tesztelési Adatok

### Admin Felhasználó

-   **Email**: `admin@example.com`
-   **Jelszó**: `password`
-   **Jogosultságok**: Teljes adminisztrátori hozzáférés

### Szerző Felhasználó

-   **Email**: `author@example.com`
-   **Jelszó**: `password`
-   **Jogosultságok**: Recept létrehozás, saját receptek kezelése

### Alap Felhasználó

-   **Email**: `user@example.com`
-   **Jelszó**: `password`
-   **Jogosultságok**: Böngészés, kommentelés

## 🏗️ Projekt Struktúra

```
├── app/
│   ├── Http/Controllers/     # Laravel kontrollerek
│   ├── Models/              # Eloquent modellek
│   ├── Enums/               # Jogosultság enumerációk
│   └── Traits/              # Újrafelhasználható funkciók
├── resources/
│   ├── js/
│   │   ├── Components/      # React komponensek
│   │   ├── Pages/          # Inertia oldalak
│   │   └── Layouts/        # Layout komponensek
│   └── css/                # Stilusok
├── database/
│   ├── migrations/         # Adatbázis migrációk
│   └── seeders/           # Teszt adatok
└── public/storage/        # Feltöltött képek
```

## 🔐 Jogosultságok és Szerepkörök

### Szerepkörök

-   **Admin**: Teljes rendszer hozzáférés
-   **Author**: Recept létrehozás és kezelés
-   **User**: Alap felhasználói funkciók

### Engedélyek

-   `create_recipe`: Recept létrehozás
-   `edit_own_recipe`: Saját recept szerkesztés
-   `delete_own_recipe`: Saját recept törlés
-   `manage_all_recipes`: Minden recept kezelése
-   `manage_categories`: Kategória kezelés
-   `moderate_comments`: Komment moderáció

## 🎨 Főbb Komponensek

### Backend Kontrollerek

-   `RecipeController`: Recept CRUD műveletek
-   `CategoryController`: Kategória kezelés
-   `CommentController`: Komment moderáció

### Frontend Komponensek

-   `RecipeCard`: Recept előnézet kártya
-   `CategoryCard`: Kategória megjelenítő kártya
-   `RecipeForm`: Recept létrehozó/szerkesztő form
-   `CommentForm`: Komment írás form

## 🔧 Fejlesztési Parancsok

```bash
# Frontend watch mode
npm run dev

# Adatbázis frissítés
php artisan migrate:fresh --seed

# Cache ürítés
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# Tesztek futtatása
php artisan test

# Adatbázis exportálása (MySQL)
mysqldump -u root -p recipes > database.sql
```

## 💾 Adatbázis Információk

### Adatbázis Export/Import

A projekt tartalmaz egy `database.sql` fájlt, amely a teljes adatbázis struktúrát és teszt adatokat tartalmazza.

**Exportálás (fejlesztőknek):**

```bash
# Windows (XAMPP/WAMP)
C:\xampp\mysql\bin\mysqldump.exe -u root -p recipes > database.sql

# Linux/Mac vagy ha mysqldump a PATH-ban van
mysqldump -u root -p recipes > database.sql

# Vagy phpMyAdmin-ből: Exportálás > SQL formátum
```

**Importálás:**

```bash
mysql -u root -p recipes < database.sql
```

### Adatbázis Séma

-   **users**: Felhasználók (admin, author, user szerepkörökkel)
-   **recipes**: Receptek (user_id foreign key)
-   **categories**: Kategóriák (színekkel és képekkel)
-   **comments**: Kommentek (moderációs állapottal)
-   **category_recipe**: Pivot tábla (many-to-many)
-   **permissions & roles**: Spatie jogosultság táblák

```

## 📱 Reszponzív Design

Az alkalmazás teljesen reszponzív és optimalizált:

-   **Desktop**: Teljes funkcionalitás
-   **Tablet**: Adaptált layout
-   **Mobile**: Touch-friendly navigáció

## 🛡️ Biztonsági Funkciók

-   CSRF védelem minden form esetében
-   SQL injection védelem Eloquent ORM-mel
-   XSS védelem Blade templating motorral
-   Jogosultság alapú hozzáférés kontrolh
-   Képfeltöltés validáció és sanitizálás

## 📊 Teljesítmény Optimalizációk

-   Képek automatikus átméretezése
-   Lazy loading a recept listákban
-   Optimalizált adatbázis lekérdezések
-   Frontend asset bundling és minifikáció

---

**Fejlesztő megjegyzés**: Ez az alkalmazás egy teljes körű bemutató projekt, amely modern web fejlesztési gyakorlatokat és technológiákat demonstrál. Minden funkció production-ready és skálázható architektúrával készült.
```
