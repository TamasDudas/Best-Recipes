-- Best Recipes Database Export
-- Exportálás dátuma: 2025-08-26
-- MySQL adatbázis: recipes

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Adatbázis létrehozása
CREATE DATABASE IF NOT EXISTS `recipes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `recipes`;

-- --------------------------------------------------------
-- FONTOS: Ez egy minta SQL fájl
-- A valós adatbázis exportálásához használja az alábbi parancsot:
-- 
-- Windows (XAMPP/WAMP):
-- C:\xampp\mysql\bin\mysqldump.exe -u root -p recipes > database.sql
-- 
-- Linux/Mac:
-- mysqldump -u root -p recipes > database.sql
-- 
-- Vagy phpMyAdmin-ből: Exportálás > SQL formátum
-- --------------------------------------------------------

-- Adatbázis importálásához:
-- mysql -u root -p recipes < database.sql

-- MEGJEGYZÉS:
-- 1. A projekt már tartalmazza a Laravel migrációkat és seedereket
-- 2. Futtathatja a `php artisan migrate:fresh --seed` parancsot a tiszta telepítéshez
-- 3. Ez létrehozza az összes táblát és teszt adatokat
-- 
-- Teszt felhasználók (a seederek hozzák létre):
-- Admin: admin@example.com / password
-- Author: author@example.com / password  
-- User: user@example.com / password

COMMIT;
