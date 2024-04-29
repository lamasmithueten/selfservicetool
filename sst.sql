-- MariaDB dump 10.19  Distrib 10.11.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: sst
-- ------------------------------------------------------
-- Server version	10.11.3-MariaDB-1:10.11.3+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `sst`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sst` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `sst`;

--
-- Table structure for table `existing_environment`
--

DROP TABLE IF EXISTS `existing_environment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `existing_environment` (
  `ID` uuid NOT NULL,
  `ID_USER` uuid NOT NULL,
  `IP_address` int(11) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_USER` (`ID_USER`),
  CONSTRAINT `existing_environment_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `existing_environment`
--

LOCK TABLES `existing_environment` WRITE;
/*!40000 ALTER TABLE `existing_environment` DISABLE KEYS */;
/*!40000 ALTER TABLE `existing_environment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hardware`
--

DROP TABLE IF EXISTS `hardware`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hardware` (
  `ID` uuid NOT NULL,
  `ID_ENV` uuid DEFAULT NULL,
  `ID_PROV_REQ` uuid DEFAULT NULL,
  `ram` int(11) unsigned NOT NULL,
  `storage` int(11) unsigned NOT NULL,
  `cpu` int(11) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_ENV` (`ID_ENV`),
  KEY `ID_PROV_REQ` (`ID_PROV_REQ`),
  CONSTRAINT `hardware_ibfk_1` FOREIGN KEY (`ID_ENV`) REFERENCES `existing_environment` (`ID`),
  CONSTRAINT `hardware_ibfk_2` FOREIGN KEY (`ID_PROV_REQ`) REFERENCES `provisioning_request` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hardware`
--

LOCK TABLES `hardware` WRITE;
/*!40000 ALTER TABLE `hardware` DISABLE KEYS */;
/*!40000 ALTER TABLE `hardware` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `number_of_vacation_days`
--

DROP TABLE IF EXISTS `number_of_vacation_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `number_of_vacation_days` (
  `ID` uuid NOT NULL,
  `ID_User` uuid NOT NULL,
  `days` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_User` (`ID_User`),
  CONSTRAINT `number_of_vacation_days_ibfk_1` FOREIGN KEY (`ID_User`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `number_of_vacation_days`
--

LOCK TABLES `number_of_vacation_days` WRITE;
/*!40000 ALTER TABLE `number_of_vacation_days` DISABLE KEYS */;
/*!40000 ALTER TABLE `number_of_vacation_days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provisioning_request`
--

DROP TABLE IF EXISTS `provisioning_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provisioning_request` (
  `ID` uuid NOT NULL,
  `ID_USER` uuid NOT NULL,
  `virtual_environment` varchar(255) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_USER` (`ID_USER`),
  CONSTRAINT `provisioning_request_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provisioning_request`
--

LOCK TABLES `provisioning_request` WRITE;
/*!40000 ALTER TABLE `provisioning_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `provisioning_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ID` uuid NOT NULL,
  `ID_supervisor` uuid NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `number_of_vacations` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation_request`
--

DROP TABLE IF EXISTS `vacation_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacation_request` (
  `ID` uuid NOT NULL,
  `ID_user` uuid NOT NULL,
  `first_day` date NOT NULL,
  `number_of_days` int(11) NOT NULL,
  `state` varchar(255) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_user` (`ID_user`),
  CONSTRAINT `vacation_request_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation_request`
--

LOCK TABLES `vacation_request` WRITE;
/*!40000 ALTER TABLE `vacation_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacation_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-13 15:19:18