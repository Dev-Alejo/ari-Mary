-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2022 at 03:50 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `SalePrice` float NOT NULL,
  `CostPrice` float NOT NULL,
  `ProviderID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `Name`, `Quantity`, `SalePrice`, `CostPrice`, `ProviderID`) VALUES
(4, 'Choco', 3, 11, 10, 3),
(6, 'a', 1, 629, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `providers`
--

CREATE TABLE `providers` (
  `ProviderID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `providers`
--

INSERT INTO `providers` (`ProviderID`, `Name`, `Phone`, `Email`, `Address`) VALUES
(3, 'Equaldata', '04246079817', 'equaldata@gmail.com', 'Maracaibo, Zulia, Venezuela'),
(5, 'Chimoneria', '0424607981', 'chimoneria@gmail.com', 'Calle El Negro'),
(6, 'A', 'A', 'A', 'a');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `TicketID` int(11) NOT NULL,
  `Code` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Products` text NOT NULL,
  `Total` varchar(255) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`TicketID`, `Code`, `Name`, `Phone`, `Address`, `Products`, `Total`, `Created`) VALUES
(1, '26275576', 'Ronald', '042462052', 'ferf', '[{\"ProductID\":\"4\",\"Quantity\":6,\"SalePrice\":11,\"Total\":66,\"Name\":\"Choco\"}]', '66', '2022-04-07 09:14:57'),
(2, '151521545', 'Ryan', '0424625215', 'A', '[{\"ProductID\":\"4\",\"Quantity\":1,\"SalePrice\":11,\"Total\":11,\"Name\":\"Choco\"},{\"ProductID\":\"6\",\"Quantity\":6,\"SalePrice\":629,\"Total\":3774,\"Name\":\"a\"}]', '3785', '2022-04-07 09:15:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Lastname` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Name`, `Lastname`, `Username`, `Password`, `Rol`) VALUES
(7, 'Jose', 'Rivas', 'rivasjose', '123456', 1),
(11, 'Alejandro', 'Diaz', 'Ale', '123456', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`ProviderID`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`TicketID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `providers`
--
ALTER TABLE `providers`
  MODIFY `ProviderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `TicketID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
