-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-02-2025 a las 06:47:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `yes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `id_post` int(11) NOT NULL,
  `comment` text NOT NULL,
  `date_comment` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `username`, `id_post`, `comment`, `date_comment`) VALUES
(1, 'tekken', 1, 'nice', '2025-01-27 05:12:42'),
(2, 'techno', 1, '😀', '2025-01-27 21:57:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `friendships`
--

CREATE TABLE `friendships` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `friendships`
--

INSERT INTO `friendships` (`id`, `user_id`, `friend_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 13, 12, 'accepted', '0000-00-00 00:00:00', NULL),
(2, 14, 12, 'accepted', '0000-00-00 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `timestamp` datetime NOT NULL,
  `read_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `recipient_id`, `content`, `timestamp`, `read_status`) VALUES
(1, 13, 12, 'hola', '2025-01-26 23:05:52', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `username` varchar(1020) NOT NULL,
  `text` text DEFAULT NULL,
  `image_urls` longtext DEFAULT NULL,
  `location` varchar(1020) DEFAULT NULL,
  `likes` int(255) NOT NULL DEFAULT 0,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `username`, `text`, `image_urls`, `location`, `likes`, `comment`, `created_at`) VALUES
(1, 'pc', 'hola ❤️ 🔥', '[\"/posts/1737954546548_descarga.jpg\"]', NULL, 1, NULL, '2025-01-28 03:51:54'),
(2, 'pc', 'hola ', '[]', NULL, 1, NULL, '2025-01-28 19:38:54'),
(3, 'pc', 'new test 58', '[]', NULL, 0, NULL, '2025-01-28 19:31:57'),
(4, 'pc', 'hola', '[\"/posts/1738094845427_1735621179235.png\",\"/posts/1738094845550_descarga.jpg\"]', NULL, 0, NULL, '2025-01-28 20:07:25'),
(5, 'techno', ' 👍 👏🏻 🎉 ✨ 🙂', '[]', NULL, 0, NULL, '2025-01-29 01:21:29'),
(6, 'pc', 'parfum natsu jajaja', '[\"/posts/1738290857408_Leonardo_Phoenix_A_luxurious_advertisement_concept_for_a_mens_1-removebg-preview.png\"]', NULL, 0, NULL, '2025-01-31 02:34:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `saved_posts`
--

CREATE TABLE `saved_posts` (
  `id` int(11) NOT NULL,
  `username` varchar(1020) DEFAULT NULL,
  `id_post` int(11) DEFAULT NULL,
  `save_post` tinyint(1) DEFAULT NULL,
  `like_post` int(11) NOT NULL,
  `date_save` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `saved_posts`
--

INSERT INTO `saved_posts` (`id`, `username`, `id_post`, `save_post`, `like_post`, `date_save`) VALUES
(13, 'techno', 1, 1, 1, '2025-01-28 03:51:54'),
(14, 'techno', 2, 1, 1, '2025-01-28 19:38:54'),
(15, 'techno', 3, 1, 0, '2025-01-28 19:32:05'),
(16, 'techno', 4, 1, 0, '2025-01-28 20:07:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(1020) NOT NULL,
  `email` varchar(1020) NOT NULL,
  `username` varchar(1020) NOT NULL,
  `birthdate` date NOT NULL,
  `registration_date` date DEFAULT NULL,
  `biography` text DEFAULT NULL,
  `profile_photo` varchar(1020) DEFAULT NULL,
  `cover_photo` varchar(1020) DEFAULT NULL,
  `verification_code` varchar(1020) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT NULL,
  `trabajo` varchar(255) NOT NULL DEFAULT '',
  `educacion` varchar(255) NOT NULL DEFAULT '',
  `ciudad` varchar(255) NOT NULL DEFAULT '',
  `relacion` varchar(50) NOT NULL DEFAULT 'Desconocido',
  `descripcion` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `birthdate`, `registration_date`, `biography`, `profile_photo`, `cover_photo`, `verification_code`, `is_verified`, `trabajo`, `educacion`, `ciudad`, `relacion`, `descripcion`) VALUES
(10, 'Raul Mendez perez', 'mendezperezraul580@gmail.com', 'raul', '2005-05-05', NULL, NULL, '/uploads/a65ddb486b1580fe71d4ec07c4158673', '/uploads/d6507a3022b5dd2fdf15ed19adc656e4', '0', 0, '', '', '', 'Desconocido', ''),
(12, 'PC HP', 'pc.hp.sas@gmail.com', 'pc', '1995-09-09', NULL, NULL, '/uploads/c0e7a3bbe6693b440a4dcbc35e27f16d', '/uploads/f7b707df30c5844f402effe3500e1eea', '0', 0, 'Front end', 'universidad', 'Ciudad de México', 'Soltero/a', 'hola soy testes'),
(13, 'Antonio Bernal', 'tekken.web@gmail.com', 'tekken', '2001-04-05', NULL, NULL, '/uploads/da18e19463927470a09bfd3e461a0459', '/uploads/006c7dd0d842e4d077c29aac1a46aea2', NULL, 1, '', '', '', 'Desconocido', ''),
(14, 'Antonio Bernal Toño', 'antonio.webtechnologies@gmail.com', 'techno', '2005-05-05', NULL, NULL, '/uploads/78fe77c95b6f6a8800af58ca203fe288', '/uploads/f57653eddf6108203e860e9cdf1386cf', NULL, 1, '', '', '', 'Desconocido', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_post` (`id_post`);

--
-- Indices de la tabla `friendships`
--
ALTER TABLE `friendships`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_friendship` (`user_id`,`friend_id`),
  ADD KEY `friend_id` (`friend_id`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `recipient_id` (`recipient_id`),
  ADD KEY `timestamp` (`timestamp`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `saved_posts`
--
ALTER TABLE `saved_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `friendships`
--
ALTER TABLE `friendships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `saved_posts`
--
ALTER TABLE `saved_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `posts` (`id`);

--
-- Filtros para la tabla `friendships`
--
ALTER TABLE `friendships`
  ADD CONSTRAINT `friendships_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friendships_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
