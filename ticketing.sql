-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2021 at 04:13 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticketing`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dateBooking` date NOT NULL,
  `timeBooking` time NOT NULL,
  `movieId` int(11) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `totalTicket` int(11) NOT NULL,
  `totalPayment` int(11) NOT NULL,
  `paymentMethod` varchar(100) NOT NULL,
  `statusPayment` varchar(100) NOT NULL,
  `statusTicket` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `userId`, `dateBooking`, `timeBooking`, `movieId`, `scheduleId`, `totalTicket`, `totalPayment`, `paymentMethod`, `statusPayment`, `statusTicket`, `createdAt`, `updatedAt`) VALUES
(23, 1, '2021-10-02', '10:30:00', 32, 28, 3, 90000, 'Google Pay', 'success', 'Ticket used', '2021-09-29 16:25:58', NULL),
(24, 2, '2021-10-03', '12:00:00', 34, 29, 3, 105000, 'Gopay', 'success', 'Ticket used', '2021-09-29 16:30:47', NULL),
(25, 1, '2021-10-04', '08:30:00', 37, 32, 3, 135000, 'Ovoo', 'success', 'Ticket used', '2021-10-01 13:59:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bookingseat`
--

CREATE TABLE `bookingseat` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `dateSchedule` date NOT NULL,
  `timeSchedule` time NOT NULL,
  `seat` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookingseat`
--

INSERT INTO `bookingseat` (`id`, `bookingId`, `scheduleId`, `movieId`, `dateSchedule`, `timeSchedule`, `seat`, `createdAt`, `updatedAt`) VALUES
(46, 23, 28, 32, '2021-10-02', '10:30:00', 'A1', '2021-09-29 16:25:58', NULL),
(47, 23, 28, 32, '2021-10-02', '10:30:00', 'A2', '2021-09-29 16:25:58', NULL),
(48, 23, 28, 32, '2021-10-02', '10:30:00', 'A3', '2021-09-29 16:25:58', NULL),
(49, 24, 29, 34, '2021-10-03', '12:00:00', 'A4', '2021-09-29 16:30:47', NULL),
(50, 24, 29, 34, '2021-10-03', '12:00:00', 'A5', '2021-09-29 16:30:47', NULL),
(51, 24, 29, 34, '2021-10-03', '12:00:00', 'A6', '2021-09-29 16:30:47', NULL),
(52, 25, 32, 37, '2021-10-04', '08:30:00', 'B1', '2021-10-01 13:59:29', NULL),
(53, 25, 32, 37, '2021-10-04', '08:30:00', 'B2', '2021-10-01 13:59:29', NULL),
(54, 25, 32, 37, '2021-10-04', '08:30:00', 'B3', '2021-10-01 13:59:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `releaseDate` date NOT NULL,
  `cast` varchar(255) NOT NULL,
  `director` varchar(100) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `synopsis` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `name`, `category`, `image`, `releaseDate`, `cast`, `director`, `duration`, `synopsis`, `createdAt`, `updatedAt`) VALUES
(32, 'Dune', 'Action,Adventure,Science Fiction,Drama ', '2021-09-29T11-35-42.058ZDune.jpg', '2021-09-16', 'Timothée Chalamet,Rebecca Ferguson,Oscar Isaac,Zendaya,Jason Momoa', 'Denis Villeneuve', '2 hours 35 minutes', 'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over', '2021-09-29 11:35:42', NULL),
(34, 'Squid Game', 'Action,Adventure,Mystery,Drama ', '2021-09-29T12-02-33.770ZSquid Game.jpg', '2021-09-17', 'Lee Jung-jae,Park Hae-soo,Jung Ho-yeon,Wi Ha-jun,Oh Young-soo,Heo Sung-tae', 'Hwang Dong-hyuk', '54 minutes', 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits — with deadly high stakes.', '2021-09-29 12:02:33', NULL),
(35, 'Free Guy', 'Action,Adventure,Comedy,Science Fiction ', '2021-09-29T12-10-42.393Zfree guy.jpg', '2021-08-13', 'Ryan Reynolds,Jodie Comer,Lil Rel Howery,Joe Keery,Taika Waititi,Utkarsh Ambudkar', 'Shawn Levy', '1 hours 55 minutes', 'A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.', '2021-09-29 12:10:42', NULL),
(36, 'Foundation', 'Sci-Fi,Fantasy,Drama ', '2021-09-29T12-16-45.995Zfoundation.jpg', '2021-09-23', 'Jared Harris,Lou Llobell,Lee Pace,Leah Harvey,Laura Birn,Terrence Mann', 'David S. Goyer', '1 hours 9 minutes', 'Follow a band of exiles on their monumental journey to save humanity and rebuild civilization amid the fall of the Galactic Empire.', '2021-09-29 12:16:46', NULL),
(37, 'Midnight Mass', 'Drama,Mystery ', '2021-09-29T12-20-42.670Zmidnight mass.jpg', '2021-09-24', 'Alex Essoe,Zach Gilford,Hamish Linklater,Kate Siegel,Annabeth Gish,Michael Trucco', 'Mike Flanagan', '1 hours 4 minutes', 'An isolated island community experiences miraculous events - and frightening omens - after the arrival of a charismatic, mysterious young priest.', '2021-09-29 12:20:42', NULL),
(38, 'The Starling', 'Drama,Comedy', '2021-09-29T12-24-16.631Zthe starling.jpg', '2021-09-17', 'Melissa McCarthy,Chris O\'Dowd,Kevin Kline,Timothy Olyphant,Daveed Diggs,Skyler Gisondo', 'Theodore Melfi', '1 hours 43 minutes', 'A woman adjusting to life after a loss contends with a feisty bird that\'s taken over her garden — and a husband who\'s struggling to find a way forward.', '2021-09-29 12:24:16', NULL),
(39, 'Venom: Let There Be Carnage', 'Science Fiction,Action,Comedy', '2021-09-29T12-29-08.266Zvenom.jpg', '2021-09-30', 'Tom Hardy,Michelle Williams,Woody Harrelson,Reid Scott,Naomie Harris,Stephen Graham', 'Andy Serkis', '1 hours 37 minutes', 'Sequel to the box-office hit film Venom.', '2021-09-29 12:29:08', NULL),
(40, 'Old', 'Mystery,Thriller,Horror', '2021-09-29T12-34-11.817ZOld.jpg', '2021-07-21', 'Gael García Bernal,Vicky Krieps,Rufus Sewell,Alex Wolff,Thomasin McKenzie,Abbey Lee', 'M. Night Shyamalan', '1 hours 48 minutes', 'A group of families on a tropical holiday discover that the secluded beach where they are staying is somehow causing them to age rapidly – reducing their entire lives into a single day.', '2021-09-29 12:34:11', NULL),
(41, 'Fast & Forious 9', 'Action,Crime,Thriller', '2021-09-29T12-38-58.768ZF9.jpg', '2021-05-19', 'Vin Diesel,Michelle Rodriguez,Tyrese Gibson,Ludacris,John Cena,Nathalie Emmanuel', 'Justin Lin', '2 hours 23 minutes', 'Dominic Toretto and his crew battle the most skilled assassin and high-performance driver they\'ve ever encountered: his forsaken brother.', '2021-09-29 12:38:58', '2021-09-30 16:02:55'),
(42, 'Birds of Paradise', 'Drama', '2021-09-29T12-44-52.339ZBirds Of Paradise.jpg', '2021-09-23', 'Diana Silvers,Kristine Froseth,Eva Lomby,Jacqueline Bisset,Solomon Golding,Daniel Camargo', 'Sarah Adina Smith', '1 hours 53 minutes', 'Two dancers at an elite ballet academy in Paris must compete for a contract to join the highly coveted Opéra National de Paris as they confront their competitive nature, sexual awakenings and how far they would go to win.', '2021-09-29 12:44:52', NULL),
(43, 'Black Widow', 'Action,Adventure,Thriller,Science Fiction', '2021-09-29T12-50-01.104ZBlack Widow.jpg', '2021-07-07', 'Scarlett Johansson,Florence Pugh,Rachel Weisz,David Harbour,Ray Winstone,Olga Kurylenko', 'Cate Shortland', '2 hours 14 minutes', 'Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and', '2021-09-29 12:50:01', '2021-09-29 14:20:01'),
(48, 'The Tomorrow War', 'Action,Adventure,Science Fiction', '2021-09-29T14-18-35.130ZThe Tomrrow War.jpg', '2021-07-02', 'Chris Pratt, Yvonne Strahovski,J.K. Simmons,Betty Gilpin,Sam Richardson,Edwin Hodge', 'Chris McKay', '2 hours 18 minutes', 'The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians', '2021-09-29 14:18:35', NULL),
(77, 'asdcccc', 'asdasd', NULL, '2021-07-02', 'cxcb', 'dvbxcv', '2 hours 18 minutes', 'lorem', '2021-10-03 14:06:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `premier` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `location` varchar(150) NOT NULL,
  `dateStart` datetime NOT NULL,
  `dateEnd` datetime NOT NULL,
  `time` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `movieId`, `premier`, `price`, `location`, `dateStart`, `dateEnd`, `time`, `createdAt`, `updatedAt`) VALUES
(28, 32, 'Dune', 30000, 'Tangerang Selatan', '2021-10-01 08:30:00', '2021-10-01 11:05:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 15:49:13', NULL),
(29, 34, 'Squid Game', 35000, 'Tangerang', '2021-10-02 10:30:00', '2021-10-02 11:34:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 15:51:18', NULL),
(30, 35, 'Free Guy', 40000, 'Jakarta Selatan', '2021-10-03 12:00:00', '2021-10-03 13:55:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 15:54:03', '2021-09-29 15:56:19'),
(31, 36, 'Foundation', 40000, 'Jakarta Barat', '2021-10-04 14:00:00', '2021-10-04 15:09:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 15:58:23', NULL),
(32, 37, 'Midnight Mass', 45000, 'Jakarta Timur', '2021-10-05 16:30:00', '2021-10-05 17:34:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 16:00:43', NULL),
(33, 38, 'The Starling', 50000, 'Jakarta Utara', '2021-10-06 19:00:00', '2021-10-06 20:43:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 16:03:10', NULL),
(34, 39, 'Venom: Let There Be Carnage', 55000, 'Bekasi', '2021-10-07 20:30:00', '2021-10-07 22:07:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 16:04:50', NULL),
(35, 40, 'Old', 60000, 'Jakarta Pusat', '2021-10-08 14:00:00', '2021-10-08 15:48:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 16:08:30', NULL),
(36, 41, 'Fast & Forious 9', 50000, 'Bandung', '2021-10-09 12:00:00', '2021-10-09 14:23:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 16:11:42', NULL),
(37, 42, 'Birds of Paradise', 40000, 'Bogor', '2021-10-10 14:00:00', '2021-10-10 15:53:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 16:14:07', NULL),
(38, 43, 'Black Widow', 40000, 'Jakarta Selatan', '2021-10-11 19:00:00', '2021-10-11 21:14:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 16:16:23', NULL),
(39, 48, 'The Tomorrow War', 50000, 'Jakarta Utara', '2021-10-12 10:30:00', '2021-10-12 12:38:00', '08:30,10:30,12:00,14:00,16:30,19:00,20:30', '2021-09-29 16:17:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(50) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `phoneNumber`, `avatar`, `role`, `createdAt`, `updatedAt`) VALUES
('7cff6ccd-d5e5-4dce-b17f-aa5cf522e67c', 'pratama', 'fajri', 'pratamafajri@gmail.com', '$2b$12$2pSmBlYY7iWu/u./6wH/HOOMwZzNFbvYMvNAiGAmGtbBXH4Sl0dem', '123456789', '2021-10-02T11-07-11.671ZSquid Game.jpg', 'user', '2021-10-02 11:03:51', '2021-10-02 11:07:11'),
('dca3beb5-d8d4-4cce-81ee-76d89bef3f83', 'fajriz', 'putraz', 'fajri@gmail.com', '$2b$12$u2JPUfUgetK3W3/DncA7yeMNzkNslU.GC.9mpkZphKvci899JYJkq', '123456789', NULL, 'user', '2021-10-01 08:01:29', '2021-10-01 08:03:51'),
('e0d218f9-a90f-4a7b-a358-3bd0b40f4d45', 'fajrees', 'putrez', 'admin3@gmail.com', '$2b$12$Rx7A7bnPb5p4qc31jl9/AurW8mKiqCyF5RxFWh92xUNJ1vGGfNfHm', '9876335563', '2021-10-01T12-01-18.736ZBirds Of Paradise.jpg', 'admin', '2021-09-29 14:55:31', '2021-10-01 13:18:48'),
('f825b6d0-f52a-455d-89b1-46f81668966b', 'fajri', 'putra', 'fajriputra@gmail.com', '$2b$12$u.B.vvfbJd5kOL/V8GERXuOZyjAPISMi7K0uNYoD1HHqvK/1tDCtO', '9876627371', '2021-10-01T08-42-03.354Zfree guy.jpg', 'user', '2021-09-29 14:54:26', '2021-10-01 13:56:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookingseat`
--
ALTER TABLE `bookingseat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `bookingseat`
--
ALTER TABLE `bookingseat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
