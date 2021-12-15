-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2021 at 11:28 AM
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
  `id` varchar(255) NOT NULL,
  `userId` varchar(100) NOT NULL,
  `dateBooking` date NOT NULL,
  `timeBooking` time NOT NULL,
  `movieId` int(11) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `totalTicket` int(11) NOT NULL,
  `totalPayment` int(11) NOT NULL,
  `paymentMethod` varchar(100) NOT NULL,
  `statusPayment` varchar(100) NOT NULL,
  `urlRedirect` varchar(100) NOT NULL,
  `statusTicket` enum('inProcess','Active','notActive') NOT NULL DEFAULT 'inProcess',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `userId`, `dateBooking`, `timeBooking`, `movieId`, `scheduleId`, `totalTicket`, `totalPayment`, `paymentMethod`, `statusPayment`, `urlRedirect`, `statusTicket`, `createdAt`, `updatedAt`) VALUES
('29f5a524-886b-422e-b854-f68200d9aec0', '270034aa-20fa-40f8-99de-6d4e6c9502ab', '2021-12-14', '12:30:00', 42, 58, 3, 104997, '', 'pending', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/e2ef2d26-509f-4bf4-8d04-f37345a7a5f5', 'inProcess', '2021-12-14 05:01:22', NULL),
('3aa0f2d7-7571-4e96-aeec-96b9318b3160', '270034aa-20fa-40f8-99de-6d4e6c9502ab', '2021-12-17', '10:30:00', 43, 50, 3, 105000, '', 'pending', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/e13fe9f6-2f8f-4831-a340-4496ec753060', 'Active', '2021-12-14 05:03:19', NULL),
('6c07aecd-a5c4-4ea2-97c2-7015d9da6fef', '47b95f70-0c95-4a6d-8ce2-6ed532a79edd', '2021-12-15', '12:30:00', 42, 50, 3, 105000, '', 'pending', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/23a8b50f-e873-4231-a3a0-6d9da63322a0', 'notActive', '2021-12-15 08:56:54', NULL),
('7444e93c-3285-47ae-9680-bdf630008a6e', '47b95f70-0c95-4a6d-8ce2-6ed532a79edd', '2021-12-15', '16:30:00', 35, 56, 3, 105000, '', 'pending', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/b44b6e98-a14f-4ea8-9cb5-2a6ea0316a7a', 'Active', '2021-12-15 09:20:06', NULL),
('9e74eb13-9986-40e2-8b8f-4a26096bea2f', '270034aa-20fa-40f8-99de-6d4e6c9502ab', '2021-12-14', '14:30:00', 42, 58, 3, 104997, '', 'pending', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/06d45483-cb5e-49a8-9787-edb5d9aba080', 'inProcess', '2021-12-14 05:04:16', NULL),
('a4a1d900-c100-4ae4-bfc3-64fc019c4faa', '270034aa-20fa-40f8-99de-6d4e6c9502ab', '2021-12-15', '16:30:00', 32, 52, 3, 135000, '', 'pending', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/e6438e7a-c07b-4a6a-8424-de131097b262', 'inProcess', '2021-12-14 05:09:04', NULL),
('f8f6945d-2718-4430-a67d-62c459f42797', '47b95f70-0c95-4a6d-8ce2-6ed532a79edd', '2021-12-15', '10:30:00', 36, 58, 3, 104997, '', 'pending', 'https://app.sandbox.midtrans.com/snap/v2/vtweb/7ca67521-852d-46c3-8104-9af747156e80', 'inProcess', '2021-12-15 08:52:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bookingseat`
--

CREATE TABLE `bookingseat` (
  `id` int(11) NOT NULL,
  `bookingId` varchar(255) NOT NULL,
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
(191, '29f5a524-886b-422e-b854-f68200d9aec0', 58, 42, '2021-12-14', '12:30:00', 'A1', '2021-12-14 05:01:22', NULL),
(192, '29f5a524-886b-422e-b854-f68200d9aec0', 58, 42, '2021-12-14', '12:30:00', 'A2', '2021-12-14 05:01:22', NULL),
(193, '29f5a524-886b-422e-b854-f68200d9aec0', 58, 42, '2021-12-14', '12:30:00', 'A3', '2021-12-14 05:01:22', NULL),
(194, '3aa0f2d7-7571-4e96-aeec-96b9318b3160', 50, 43, '2021-12-17', '10:30:00', 'A1', '2021-12-14 05:03:19', NULL),
(195, '3aa0f2d7-7571-4e96-aeec-96b9318b3160', 50, 43, '2021-12-17', '10:30:00', 'A2', '2021-12-14 05:03:19', NULL),
(196, '3aa0f2d7-7571-4e96-aeec-96b9318b3160', 50, 43, '2021-12-17', '10:30:00', 'A3', '2021-12-14 05:03:19', NULL),
(197, '9e74eb13-9986-40e2-8b8f-4a26096bea2f', 58, 42, '2021-12-14', '14:30:00', 'A1', '2021-12-14 05:04:16', NULL),
(198, '9e74eb13-9986-40e2-8b8f-4a26096bea2f', 58, 42, '2021-12-14', '14:30:00', 'A2', '2021-12-14 05:04:16', NULL),
(199, '9e74eb13-9986-40e2-8b8f-4a26096bea2f', 58, 42, '2021-12-14', '14:30:00', 'A3', '2021-12-14 05:04:16', NULL),
(200, 'a4a1d900-c100-4ae4-bfc3-64fc019c4faa', 52, 32, '2021-12-15', '16:30:00', 'A1', '2021-12-14 05:09:04', NULL),
(201, 'a4a1d900-c100-4ae4-bfc3-64fc019c4faa', 52, 32, '2021-12-15', '16:30:00', 'A2', '2021-12-14 05:09:04', NULL),
(202, 'a4a1d900-c100-4ae4-bfc3-64fc019c4faa', 52, 32, '2021-12-15', '16:30:00', 'A3', '2021-12-14 05:09:04', NULL),
(203, 'f8f6945d-2718-4430-a67d-62c459f42797', 58, 36, '2021-12-15', '10:30:00', 'A1', '2021-12-15 08:52:45', NULL),
(204, 'f8f6945d-2718-4430-a67d-62c459f42797', 58, 36, '2021-12-15', '10:30:00', 'A2', '2021-12-15 08:52:45', NULL),
(205, 'f8f6945d-2718-4430-a67d-62c459f42797', 58, 36, '2021-12-15', '10:30:00', 'A3', '2021-12-15 08:52:45', NULL),
(206, '6c07aecd-a5c4-4ea2-97c2-7015d9da6fef', 50, 42, '2021-12-15', '12:30:00', 'B1', '2021-12-15 08:56:54', NULL),
(207, '6c07aecd-a5c4-4ea2-97c2-7015d9da6fef', 50, 42, '2021-12-15', '12:30:00', 'B2', '2021-12-15 08:56:54', NULL),
(208, '6c07aecd-a5c4-4ea2-97c2-7015d9da6fef', 50, 42, '2021-12-15', '12:30:00', 'B3', '2021-12-15 08:56:54', NULL),
(209, '7444e93c-3285-47ae-9680-bdf630008a6e', 56, 35, '2021-12-15', '16:30:00', 'B1', '2021-12-15 09:20:06', NULL),
(210, '7444e93c-3285-47ae-9680-bdf630008a6e', 56, 35, '2021-12-15', '16:30:00', 'C1', '2021-12-15 09:20:06', NULL),
(211, '7444e93c-3285-47ae-9680-bdf630008a6e', 56, 35, '2021-12-15', '16:30:00', 'C2', '2021-12-15 09:20:06', NULL);

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
(39, 'Venom: Let There Be Carnage', 'Science Fiction,Action,Comedy', '2021-09-29T12-29-08.266Zvenom.jpg', '2021-09-30', 'Tom Hardy,Michelle Williams,Woody Harrelson,Reid Scott,Naomie Harris,Stephen Graham', 'Andy Serkis', '1 hours 37 minutes', 'Sequel to the box-office hit film Venom.', '2021-09-29 12:29:08', NULL),
(40, 'Old', 'Mystery,Thriller,Horror', '2021-09-29T12-34-11.817ZOld.jpg', '2021-07-21', 'Gael García Bernal,Vicky Krieps,Rufus Sewell,Alex Wolff,Thomasin McKenzie,Abbey Lee', 'M. Night Shyamalan', '1 hours 48 minutes', 'A group of families on a tropical holiday discover that the secluded beach where they are staying is somehow causing them to age rapidly – reducing their entire lives into a single day.', '2021-09-29 12:34:11', NULL),
(41, 'Fast & Forious 9', 'Action,Crime,Thriller', '2021-09-29T12-38-58.768ZF9.jpg', '2021-05-19', 'Vin Diesel,Michelle Rodriguez,Tyrese Gibson,Ludacris,John Cena,Nathalie Emmanuel', 'Justin Lin', '2 hours 23 minutes', 'Dominic Toretto and his crew battle the most skilled assassin and high-performance driver they\'ve ever encountered: his forsaken brother.', '2021-09-29 12:38:58', '2021-09-30 16:02:55'),
(42, 'Birds of Paradise', 'Drama', '2021-09-29T12-44-52.339ZBirds Of Paradise.jpg', '2021-09-23', 'Diana Silvers,Kristine Froseth,Eva Lomby,Jacqueline Bisset,Solomon Golding,Daniel Camargo', 'Sarah Adina Smith', '1 hours 53 minutes', 'Two dancers at an elite ballet academy in Paris must compete for a contract to join the highly coveted Opéra National de Paris as they confront their competitive nature, sexual awakenings and how far they would go to win.', '2021-09-29 12:44:52', NULL),
(43, 'Black Widow', 'Action,Adventure,Thriller,Science Fiction', '2021-09-29T12-50-01.104ZBlack Widow.jpg', '2021-07-07', 'Scarlett Johansson,Florence Pugh,Rachel Weisz,David Harbour,Ray Winstone,Olga Kurylenko', 'Cate Shortland', '2 hours 14 minutes', 'Natasha Romanoff, also known as Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and', '2021-09-29 12:50:01', '2021-09-29 14:20:01'),
(48, 'The Tomorrow War', 'Action,Adventure,Science Fiction', '2021-09-29T14-18-35.130ZThe Tomrrow War.jpg', '2021-07-02', 'Chris Pratt, Yvonne Strahovski,J.K. Simmons,Betty Gilpin,Sam Richardson,Edwin Hodge', 'Chris McKay', '2 hours 18 minutes', 'The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians', '2021-09-29 14:18:35', NULL);

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
(50, 35, 'CineOne21', 35000, 'Aceh', '2021-12-08 00:00:00', '2021-12-12 00:00:00', '08:30,10:30,12:30', '2021-12-12 04:58:04', '2021-12-14 07:24:36'),
(51, 43, 'hiflix Cinema', 40000, 'Sumatera Barat', '2021-12-13 00:00:00', '2021-12-15 00:00:00', '08:30,10:30', '2021-12-12 04:59:04', '2021-12-13 09:15:58'),
(52, 32, 'ebv.id', 45000, 'Dki Jakarta', '2021-12-16 00:00:00', '2021-12-20 00:00:00', '16:30', '2021-12-12 04:59:44', NULL),
(53, 36, 'hiflix Cinema', 35000, 'Sulawesi Tenggara', '2021-12-11 00:00:00', '2021-12-13 00:00:00', '10:30,12:30', '2021-12-12 05:00:35', '2021-12-13 09:12:55'),
(54, 35, 'hiflix Cinema', 50000, 'Kepulauan Riau', '2021-12-13 00:00:00', '2021-12-15 00:00:00', '08:30', '2021-12-12 05:02:53', NULL),
(55, 37, 'ebv.id', 45000, 'Kepulauan Bangka Belitung', '2021-12-14 00:00:00', '2021-12-18 00:00:00', '10:30', '2021-12-12 05:03:31', NULL),
(56, 40, 'hiflix Cinema', 35000, 'Di Yogyakarta', '2021-12-13 00:00:00', '2021-12-14 00:00:00', '12:30,16:30', '2021-12-12 05:04:17', '2021-12-13 08:26:24'),
(57, 39, 'ebv.id', 45000, 'Bali', '2021-12-14 00:00:00', '2021-12-15 00:00:00', '16:30', '2021-12-13 07:56:49', NULL),
(58, 48, 'hiflix Cinema', 34999, 'Bengkulu', '2021-12-10 00:00:00', '2021-12-14 00:00:00', '08:30,10:30,12:30', '2021-12-13 07:59:08', '2021-12-14 07:14:21'),
(59, 42, 'ebv.id', 50000, 'Banten', '2021-12-14 00:00:00', '2021-12-16 00:00:00', '10:30,12:30', '2021-12-13 09:15:08', NULL);

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
  `statusUser` enum('Active','notActive') NOT NULL DEFAULT 'notActive',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `phoneNumber`, `avatar`, `role`, `statusUser`, `createdAt`, `updatedAt`) VALUES
('270034aa-20fa-40f8-99de-6d4e6c9502ab', 'fajri putra', 'admin', 'tugasmikrotik@gmail.com', '$2b$12$7Uw8DafiBlV6voeL6/sclug9wTDJMqIUODLNfi1d9/nTIJL8w68WO', '123456789', '2021-12-10T10-07-36.976Zpotoku.jpg', 'admin', 'Active', '2021-10-25 05:02:11', '2021-12-10 10:07:36'),
('47b95f70-0c95-4a6d-8ce2-6ed532a79edd', 'fajri user', 'ganteng', 'fajriwn27@gmail.com', '$2b$12$9et80vKwRvmd2XD9L7Ux8OMOGNRjzYSJaipF87aYNzMttTkeZ1uP.', '3334442234', '2021-12-10T10-09-58.418Zpotoku.jpg', 'user', 'Active', '2021-11-04 05:37:15', '2021-12-14 09:05:23');

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
-- AUTO_INCREMENT for table `bookingseat`
--
ALTER TABLE `bookingseat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
