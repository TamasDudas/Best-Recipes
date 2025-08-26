-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Aug 26. 16:32
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `recipes`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:10:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:17:\"manage-categories\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:18:\"manage-all-recipes\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:13:\"create-recipe\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:3;a:4:{s:1:\"a\";i:4;s:1:\"b\";s:15:\"edit-own-recipe\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:4;a:4:{s:1:\"a\";i:5;s:1:\"b\";s:17:\"delete-own-recipe\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:5;a:4:{s:1:\"a\";i:6;s:1:\"b\";s:18:\"comment-on-recipes\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:6;a:4:{s:1:\"a\";i:7;s:1:\"b\";s:14:\"publish-recipe\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:7;a:4:{s:1:\"a\";i:8;s:1:\"b\";s:15:\"create-category\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:8;a:4:{s:1:\"a\";i:9;s:1:\"b\";s:15:\"delete-category\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:9;a:4:{s:1:\"a\";i:10;s:1:\"b\";s:13:\"edit-category\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}}s:5:\"roles\";a:3:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:6:\"author\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:4:\"user\";s:1:\"c\";s:3:\"web\";}}}', 1755954277);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL DEFAULT '#6B7280',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `featured_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `color`, `created_at`, `updated_at`, `is_featured`, `featured_image`) VALUES
(1, 'Főételek', 'foetelek', '#45bfb7', '2025-07-26 13:27:53', '2025-08-16 13:06:24', 1, '1755356740_oVWSOavqQv.jpg'),
(2, 'Levesek', 'levesek', '#4c61cd', '2025-07-26 13:27:53', '2025-08-08 12:32:37', 0, 'levesek.jpg'),
(3, 'Desszertek', 'desszertek', '#FFE66D', '2025-07-26 13:27:53', '2025-07-26 13:27:53', 1, 'desszertek.jpg'),
(4, 'Saláták', 'salatak', '#A8E6CF', '2025-07-26 13:27:53', '2025-07-26 13:27:53', 1, 'salatok.jpg'),
(5, 'Reggelik', 'reggeli', '#FFB347', '2025-07-26 13:27:53', '2025-07-26 13:27:53', 0, 'reggelik.jpg'),
(6, 'Snackek', 'snackek', '#B19CD9', '2025-07-26 13:27:53', '2025-07-26 13:27:53', 0, 'snackek.jpg'),
(7, 'Előételek', 'eloetelek', '#81c5af', '2025-08-08 12:03:50', '2025-08-08 12:03:50', 1, '1754661830_9PRpiVtqUn.jpg'),
(8, 'Ínyenceknek', 'inyenceknek', '#b71071', '2025-08-16 13:07:18', '2025-08-16 13:07:18', 1, '1755356838_Ruz2eBHGic.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `category_recipe`
--

CREATE TABLE `category_recipe` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `recipe_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `category_recipe`
--

INSERT INTO `category_recipe` (`id`, `category_id`, `recipe_id`, `created_at`, `updated_at`) VALUES
(4, 2, 9, NULL, NULL),
(5, 1, 9, NULL, NULL),
(6, 1, 10, NULL, NULL),
(7, 3, 11, NULL, NULL),
(8, 1, 12, NULL, NULL),
(15, 5, 19, NULL, NULL),
(16, 1, 19, NULL, NULL),
(17, 8, 11, NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `recipe_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `content` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `rejected_reason` text DEFAULT NULL,
  `moderated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `comments`
--

INSERT INTO `comments` (`id`, `recipe_id`, `user_id`, `parent_id`, `content`, `status`, `rejected_reason`, `moderated_by`, `approved_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 9, 1, NULL, 'Automatikus teszt komment - pending', 'rejected', 'dsgs', 5, NULL, '2025-08-22 12:55:28', '2025-08-22 13:43:46', NULL),
(2, 9, 1, NULL, 'Automatikus teszt komment - pending', 'approved', NULL, 5, '2025-08-22 13:43:25', '2025-08-22 13:00:50', '2025-08-22 13:43:25', NULL),
(3, 9, 5, NULL, 'gsdgsgsgsdgsd', 'rejected', 'fdsdfhds', 5, NULL, '2025-08-22 13:14:41', '2025-08-22 13:43:39', NULL),
(4, 9, 5, NULL, 'sdgsgsgsgs', 'approved', NULL, 5, '2025-08-22 13:28:37', '2025-08-22 13:24:54', '2025-08-22 13:28:37', NULL),
(5, 9, 5, NULL, 'sdgdsgdsgssds', 'approved', NULL, 5, '2025-08-22 13:43:03', '2025-08-22 13:29:37', '2025-08-22 13:43:03', NULL),
(6, 10, 5, NULL, 'dfgsgsgsgsgsgsgsgs', 'approved', NULL, 5, '2025-08-22 13:52:55', '2025-08-22 13:52:41', '2025-08-22 13:52:55', NULL),
(7, 10, 5, NULL, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'approved', NULL, 5, '2025-08-22 13:54:51', '2025-08-22 13:54:41', '2025-08-22 13:54:51', NULL),
(8, 9, 5, NULL, 'asfafafafa', 'approved', NULL, 5, '2025-08-22 14:03:12', '2025-08-22 14:03:04', '2025-08-22 14:03:12', NULL),
(9, 10, 5, NULL, 'aaaaadddddddddggggggggggggg', 'approved', NULL, 5, '2025-08-22 14:07:21', '2025-08-22 14:07:10', '2025-08-22 14:07:21', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `replied_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `created_at`, `updated_at`, `name`, `email`, `subject`, `message`, `is_read`, `replied_at`) VALUES
(4, '2025-08-17 06:19:12', '2025-08-17 06:19:12', 'Mezővári Roxána', 'ddstms@gmail.com', 'aafaa', 'afasdfafssafsdaf', 0, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_07_02_145658_create_categories_table', 1),
(5, '2025_07_02_153349_create_recipes_table', 1),
(6, '2025_07_24_072159_create_category_recipe_pivot_table', 1),
(7, '2025_07_24_073146_remove_category_id_from_recipes_table', 1),
(8, '2025_07_26_074207_add_is_featured_to_categories_table', 1),
(9, '2025_07_26_130057_add_featured_image_to_categories_table', 1),
(10, '2025_08_09_142719_update_recipes_table_for_ingredients_and_instructions', 2),
(11, '2025_08_16_163637_create_contact_messages_table', 3),
(12, '2025_08_16_164012_add_fields_to_contact_messages_table', 4),
(13, '2025_08_20_133141_create_permission_tables', 5),
(14, '2025_08_22_120000_create_comments_table', 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 6),
(3, 'App\\Models\\User', 7);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'manage-categories', 'web', '2025-08-20 11:33:49', '2025-08-20 11:33:49'),
(2, 'manage-all-recipes', 'web', '2025-08-20 11:33:49', '2025-08-20 11:33:49'),
(3, 'create-recipe', 'web', '2025-08-20 11:33:49', '2025-08-20 11:33:49'),
(4, 'edit-own-recipe', 'web', '2025-08-20 11:33:49', '2025-08-20 11:33:49'),
(5, 'delete-own-recipe', 'web', '2025-08-20 11:33:49', '2025-08-20 11:33:49'),
(6, 'comment-on-recipes', 'web', '2025-08-20 11:33:49', '2025-08-20 11:33:49'),
(7, 'publish-recipe', 'web', '2025-08-21 15:16:01', '2025-08-21 15:16:01'),
(8, 'create-category', 'web', '2025-08-21 15:16:01', '2025-08-21 15:16:01'),
(9, 'delete-category', 'web', '2025-08-21 15:16:01', '2025-08-21 15:16:01'),
(10, 'edit-category', 'web', '2025-08-21 15:16:01', '2025-08-21 15:16:01');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipes`
--

CREATE TABLE `recipes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `ingredients` text NOT NULL,
  `instructions` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `recipes`
--

INSERT INTO `recipes` (`id`, `name`, `slug`, `description`, `ingredients`, `instructions`, `image`, `user_id`, `created_at`, `updated_at`) VALUES
(9, 'Gulyásleves', 'gulyasleves', 'Hagyományos magyar gulyásleves.', '[\"H\\u00fas\",\" burgonya\",\" paprika\",\" hagyma\",\" f\\u0171szerek\"]', '[\"F\\u0151zd meg a h\\u00fast, add hozz\\u00e1 a z\\u00f6lds\\u00e9geket \\u00e9s f\\u0171szereket.\"]', 'gulyasleves.jpg', 1, '2025-08-06 06:44:23', '2025-08-09 12:29:13'),
(10, 'Túrós csusza', 'turos-csusza', 'Finom túrós tészta étel.', '[\"T\\u00e9szta\",\" t\\u00far\\u00f3\",\" szalonna\",\" tejf\\u00f6l\"]', '[\"F\\u0151zd meg a t\\u00e9szt\\u00e1t, keverd \\u00f6ssze a t\\u00far\\u00f3val \\u00e9s a szalonn\\u00e1val.\"]', 'turos_csusza.jpg', 2, '2025-08-06 06:44:23', '2025-08-09 12:29:13'),
(11, 'Palacsinta', 'palacsinta', 'Édes desszert, amit mindenki szeret.', '[\"Liszt\",\"toj\\u00e1s\",\"tej\",\"cukor\",\"olaj\"]', '[\"Keverd \\u00f6ssze az alapanyagokat, s\\u00fcsd ki serpeny\\u0151ben.\"]', 'palacsinta.jpg', 1, '2025-08-06 06:44:23', '2025-08-16 13:08:02'),
(12, 'Lecsó', 'lecso', 'Hagyományos magyar étel, paprika és paradicsom alapú.', '[\"Paprika\",\" paradicsom\",\" hagyma\",\" szalonna\"]', '[\"Pir\\u00edtsd meg a szalonn\\u00e1t, add hozz\\u00e1 a z\\u00f6lds\\u00e9geket \\u00e9s p\\u00e1rold meg.\"]', 'lecso.jpg', 2, '2025-08-06 06:44:23', '2025-08-09 12:29:13'),
(19, 'Angol reggeli', 'angol-reggeli', 'Az angol reggeli az egyik legismertebb étel, amivel a ködös Albionban találkozhatunk, azonban a saját konyhánkban is könnyedén elkészíthetjük. Alap alkotóeleme a tükörtojás, a grillkolbász, a bacon és a paradicsomos bab, amit kedvünk szerint turbózhatunk tovább gombával, paradicsommal vagy akár véres hurkával (ami hasonló az angol black puddinghoz). Pár szelet pirítóssal és tejes teával tálaljuk, és estig meg sem fogunk éhezni, az tuti!', '[\"2 k\\u00f6zepes db paradicsom\",\"4 kis db gomba\",\"2 ek vaj\",\"4 szelet bacon\",\"25 dkg f\\u0151z\\u0151kolb\\u00e1sz (4 kisebb grillkolb\\u00e1sz)\",\"s\\u00f3 \\u00edzl\\u00e9s szerint\",\"bors \\u00edzl\\u00e9s szerint\",\"2 db toj\\u00e1s\",\"30 dkg paradicsomos babkonzerv\",\"8 szelet toast keny\\u00e9r\"]', '[\"F\\u00e9lb\\u00e1v\\u00e1gjuk a paradicsomokat \\u00e9s a gomb\\u00e1kat, majd sz\\u00e1raz grillserpeny\\u0151ben mindk\\u00e9t oldalukat odapir\\u00edtjuk. F\\u00e9lretessz\\u00fck.\",\"Pici vajat dobunk a serpeny\\u0151be \\u00e9s megpir\\u00edtjuk rajta a szalonnaszeleteket, valamint a grillkolb\\u00e1szk\\u00e1kat. S\\u00f3zzuk-borsozzuk \\u00e9s alaposan meggrillezz\\u00fck \\u0151ket.\",\"Sima alj\\u00fa serpeny\\u0151re v\\u00e1ltunk, picike vajat olvasztunk benne, majd megs\\u00fctj\\u00fck a t\\u00fck\\u00f6rtoj\\u00e1sokat. A k\\u00e9sz toj\\u00e1sokat t\\u00e1ny\\u00e9rra szedj\\u00fck, majd a paradicsomos babot is felmeleg\\u00edtj\\u00fck a serpeny\\u0151ben.\",\"A keny\\u00e9rszeleteket megpir\\u00edtjuk \\u00e9s h\\u00e1romsz\\u00f6g alak\\u00fara v\\u00e1gjuk (\\u00e1tl\\u00f3san kett\\u00e9v\\u00e1gjuk). Egy nagy t\\u00e1ny\\u00e9rra halmozzuk a reggeli minden alkot\\u00f3elem\\u00e9t \\u00e9s egy nagy b\\u00f6gre tejes tea t\\u00e1rsas\\u00e1g\\u00e1ban fogyasztjuk.\"]', 'recipes/angol-reggeli_1755355810.jpg', 1, '2025-08-09 14:41:21', '2025-08-16 12:52:54');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-08-20 11:33:49', '2025-08-20 11:33:49'),
(2, 'author', 'web', '2025-08-20 11:33:49', '2025-08-20 11:33:49'),
(3, 'user', 'web', '2025-08-20 11:33:49', '2025-08-20 11:33:49');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(5, 1),
(5, 2),
(6, 1),
(6, 2),
(6, 3),
(7, 1),
(7, 2),
(8, 1),
(9, 1),
(10, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('sd24jSO6zdTG2arA4T29vpaxid43tMHM9Tggc9k0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoieDE3bUJ4aFYxcm9OTUdVTVlLVHBTWXNtRDhUMWhidkI0WUZEeHhlZCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1755879638);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', '2025-07-26 13:27:53', '$2y$12$MtuzyKuIAiUaFEto52nLR.ylwYCGBVNhQhHodF8yHj7/alDqtecu2', 'UWngQxtXeV', '2025-07-26 13:27:53', '2025-07-26 13:27:53'),
(2, 'Nagy Péter', 'peter@example.com', '2025-07-26 13:27:53', '$2y$12$MtuzyKuIAiUaFEto52nLR.ylwYCGBVNhQhHodF8yHj7/alDqtecu2', 'Ng2s55cmSe', '2025-07-26 13:27:53', '2025-07-26 13:27:53'),
(3, 'Kovács Anna', 'anna@example.com', '2025-07-26 13:27:53', '$2y$12$MtuzyKuIAiUaFEto52nLR.ylwYCGBVNhQhHodF8yHj7/alDqtecu2', 'XpvwbnMwvg', '2025-07-26 13:27:53', '2025-07-26 13:27:53'),
(4, 'Szabó Márton', 'marton@example.com', '2025-07-26 13:27:53', '$2y$12$MtuzyKuIAiUaFEto52nLR.ylwYCGBVNhQhHodF8yHj7/alDqtecu2', 'NBo71lD1PC', '2025-07-26 13:27:53', '2025-07-26 13:27:53'),
(5, 'Admin', 'admin@example.com', NULL, '$2y$12$8i5BqPz2xBgil9vyCWxKpucxc3vB6FqtSbk0d9QsSiBsQCuXkkaxO', NULL, '2025-08-20 11:34:25', '2025-08-20 11:34:25'),
(6, 'Test Author', 'author@example.com', NULL, '$2y$12$7CEa1weMk/ddu.MRm8ui2O8vF2dhsz0lpArnlfIqFmX0SP9mwbxzK', NULL, '2025-08-20 11:34:25', '2025-08-20 11:34:25'),
(7, 'Test User', 'user@example.com', NULL, '$2y$12$Pqz1kzzIfFnMH7udvk5qU.h3lK8PKPIxtNqaifY3stuBOqQSwdRKG', NULL, '2025-08-20 11:34:26', '2025-08-20 11:34:26');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_unique` (`name`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- A tábla indexei `category_recipe`
--
ALTER TABLE `category_recipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_recipe_category_id_foreign` (`category_id`),
  ADD KEY `category_recipe_recipe_id_foreign` (`recipe_id`);

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_recipe_id_foreign` (`recipe_id`),
  ADD KEY `comments_user_id_foreign` (`user_id`),
  ADD KEY `comments_parent_id_foreign` (`parent_id`),
  ADD KEY `comments_moderated_by_foreign` (`moderated_by`),
  ADD KEY `comments_status_index` (`status`),
  ADD KEY `comments_approved_at_index` (`approved_at`);

--
-- A tábla indexei `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- A tábla indexei `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- A tábla indexei `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- A tábla indexei `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- A tábla indexei `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- A tábla indexei `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `recipes_slug_unique` (`slug`),
  ADD KEY `recipes_user_id_foreign` (`user_id`);

--
-- A tábla indexei `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- A tábla indexei `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `category_recipe`
--
ALTER TABLE `category_recipe`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `category_recipe`
--
ALTER TABLE `category_recipe`
  ADD CONSTRAINT `category_recipe_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `category_recipe_recipe_id_foreign` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_moderated_by_foreign` FOREIGN KEY (`moderated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `comments_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `comments_recipe_id_foreign` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
