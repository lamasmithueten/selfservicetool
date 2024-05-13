-- MariaDB dump 10.19-11.3.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: sst
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB-1:11.3.2+maria~ubu2204

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
  `total_days` int(11) NOT NULL,
  `used_days` int(11) NOT NULL,
  `planned_days` int(11) NOT NULL,
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
-- Table structure for table `registration_application`
--

DROP TABLE IF EXISTS `registration_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registration_application` (
  `ID` uuid NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `application_date` date NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_application`
--

LOCK TABLES `registration_application` WRITE;
/*!40000 ALTER TABLE `registration_application` DISABLE KEYS */;
/*!40000 ALTER TABLE `registration_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ID` uuid NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
('d18185f8-3cb8-4f83-89f1-0526cf65b903','employee','test@gmail.com','test','test','test','test'),
('9454808d-9852-4e58-9157-1ac9ca060b2d','employee','test2@gmail.com','test2','test','test','test'),
('3fa85f64-5717-4562-b3fc-2c963f66afa6','admin','test99@gmail.com','test99','CB1C701AA679668A015A4439C3906A9B176342B2C488C4906AB3118CA35A4688:YlbEl4bvwcWZxA==','string','string'),
('1b911df7-5fcf-4283-9d81-3a2793383f25','admin','hallo@gmail.com','hallo','1234','lukas','string'),
('0e5c8d1a-dfe7-43b5-967b-af2983143c1a','management','tag@gmail.com','tag','1234','string','string'),
('8541800b-3aba-4fa4-a7a3-cc8ae593a525','employee','moin@gmail.com','moin','1234','string','string');
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
  `last_day` date NOT NULL,
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
INSERT INTO `vacation_request` VALUES
('850f332a-4ec2-4bff-a9cd-5b0b30bd0f47','3fa85f64-5717-4562-b3fc-2c963f66afa6','2024-05-12',10,'pending',NULL,'0000-00-00');
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

-- Dump completed on 2024-05-13 15:53:04
