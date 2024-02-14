-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2024 a las 14:45:16
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `interpolice`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  `date` date NOT NULL,
  `note` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `history`
--

INSERT INTO `history` (`id`, `description`, `date`, `note`) VALUES
(1, 'Robo a mano armada.', '2024-02-15', 'Asalto a la caja agraria en Cartago un día domingo.'),
(3, 'Estaba donde las chicas en cartago', '2021-02-02', 'Estaba borracho y le pegoa una mujer con una botella en la cabeza');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `people`
--

CREATE TABLE `people` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `lastname` varchar(150) NOT NULL,
  `nickname` varchar(150) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `people`
--

INSERT INTO `people` (`id`, `name`, `lastname`, `nickname`, `email`, `type`) VALUES
(1, 'Loria', 'Hincks', 'Common waterbuck', 'lhincks0@goo.gl', 3),
(2, 'Nikolai', 'Havesides', 'Hottentot teal', 'nhavesides1@surveymonkey.com', 3),
(3, 'Frederigo', 'Baelde', 'White-fronted capuchin', 'fbaelde2@si.edu', 4),
(5, 'Royall', 'Mowday', 'Stanley bustard', 'rmowday4@posterous.com', 2),
(6, 'Ranna', 'Trigg', 'Bare-faced go away bird', 'rtrigg5@biblegateway.com', 3),
(7, 'Catrina', 'Dawdary', 'Caracal', 'cdawdary6@myspace.com', 3),
(8, 'Pat', 'Caulfield', 'Common rhea', 'pcaulfield7@earthlink.net', 2),
(9, 'Emmalynn', 'Lyddyard', 'Heron, green', 'elyddyard8@mediafire.com', 2),
(10, 'Roarke', 'Murby', 'Crowned hawk-eagle', 'rmurby9@sciencedaily.com', 2),
(11, 'Duke', 'Lathleiffure', 'Wallaby, tammar', 'dlathleiffurea@virginia.edu', 4),
(12, 'Omero', 'Pero', 'Hawk-headed parrot', 'operob@linkedin.com', 2),
(13, 'Kahaleel', 'Bigglestone', 'Striated heron', 'kbigglestonec@nytimes.com', 2),
(14, 'Park', 'Cheesworth', 'Legaan, ground', 'pcheesworthd@vinaora.com', 3),
(15, 'Tobit', 'Derell', 'American bison', 'tderelle@craigslist.org', 1),
(16, 'Ezekiel', 'O\'Daly', 'Pacific gull', 'eodalyf@google.cn', 2),
(17, 'Teena', 'Goforth', 'Marine iguana', 'tgoforthg@wikia.com', 2),
(18, 'Anica', 'Vargas', 'Crocodile, nile', 'avargash@apple.com', 3),
(19, 'Ange', 'Scourgie', 'Starling, red-shouldered glossy', 'ascourgiei@multiply.com', 3),
(20, 'Curt', 'Joiris', 'Eurasian beaver', 'cjoirisj@i2i.jp', 3),
(21, 'Ranna', 'Kops', 'Black-backed jackal', 'rkopsk@youtube.com', 4),
(22, 'Kennan', 'Gauntley', 'Oriental white-backed vulture', 'kgauntleyl@mapquest.com', 2),
(23, 'Shermie', 'Gair', 'Bennett\'s wallaby', 'sgairm@hubpages.com', 4),
(24, 'Sandie', 'Hainge', 'Tortoise, burmese brown mountain', 'shaingen@amazon.co.jp', 2),
(25, 'Aggy', 'Glinde', 'Badger, honey', 'aglindeo@artisteer.com', 3),
(26, 'jhon', 'doe', 'Killer', 'killer@gmail.com', 1),
(27, 'NARVAEZ', 'xxxxx', 'Killer', 'killer@gmail.com', 3),
(28, 'sopamonda', 'xxxxx', 'Killer', 'alexnarvaez981@gmail.com', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `people`
--
ALTER TABLE `people`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
