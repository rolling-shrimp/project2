-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 22, 2023 at 06:51 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `merchandise`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `UID` varchar(36) NOT NULL,
  `ID` varchar(20) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Country` varchar(3) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `State` varchar(2) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Zip` varchar(20) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`UID`, `ID`, `Name`, `Country`, `City`, `State`, `Address`, `Zip`, `Status`) VALUES
('1', 'CUST001', 'Scott', 'USA', 'New York', 'NY', '123 Main St', '10001', 1),
('2', 'CUST002', 'James', 'CAN', 'Toronto', 'ON', '456 Elm St', 'M5V 2L7', 0),
('3', 'CUST003', 'Ray', 'UK', 'London', NULL, '789 Oak St', 'SW1A 1AA', 1),
('4', 'CUST004', 'Harry', 'USA', 'Houston', 'Tx', '789 Oak St', '500', 1),
('5', 'CUST005', 'Harry', 'USA', 'Houston', 'Tx', '789 Oak St', '500', 1),
('6', 'CUST006', 'Hack', NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `ID` varchar(20) NOT NULL,
  `Customer_ID` varchar(20) DEFAULT NULL,
  `TotalAmount` decimal(16,2) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  `Order_Date` datetime DEFAULT NULL,
  `Sales_Name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`ID`, `Customer_ID`, `TotalAmount`, `Status`, `Order_Date`, `Sales_Name`) VALUES
('ORD001', 'CUST001', '100.00', 1, '2023-09-01 10:00:00', 'Salesperson A'),
('ORD002', 'CUST001', '75.50', 2, '2023-09-02 11:30:00', 'Salesperson B'),
('ORD003', 'CUST002', '50.25', 1, '2023-09-03 09:15:00', 'Salesperson A'),
('ORD004', 'CUST004', '500.00', 1, '2019-06-11 00:00:00', 'Hayes'),
('ORD005', 'CUST005', '781.00', 2, '2019-06-25 00:00:00', 'Hay'),
('ORD006', 'CUST006', NULL, NULL, NULL, 'Haysw');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Customer_ID` (`Customer_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
