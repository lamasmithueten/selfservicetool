-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: database
-- Erstellungszeit: 29. Mai 2024 um 14:18
-- Server-Version: 11.3.2-MariaDB-1:11.3.2+maria~ubu2204
-- PHP-Version: 8.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `sst`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `existing_environment`
--

DROP TABLE IF EXISTS `existing_environment`;
CREATE TABLE `existing_environment` (
  `ID` uuid NOT NULL,
  `ID_user` uuid NOT NULL,
  `virtual_environment` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `IP_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `hardware`
--

DROP TABLE IF EXISTS `hardware`;
CREATE TABLE `hardware` (
  `ID` uuid NOT NULL,
  `ID_ENV` uuid DEFAULT NULL,
  `ID_PROV_REQ` uuid DEFAULT NULL,
  `ram` int(11) UNSIGNED NOT NULL,
  `storage` int(11) UNSIGNED NOT NULL,
  `cpu` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `number_of_vacation_days`
--

DROP TABLE IF EXISTS `number_of_vacation_days`;
CREATE TABLE `number_of_vacation_days` (
  `ID` uuid NOT NULL,
  `ID_User` uuid NOT NULL,
  `days` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `password_reset`
--

DROP TABLE IF EXISTS `password_reset`;
CREATE TABLE `password_reset` (
  `id` uuid NOT NULL,
  `user_id` uuid NOT NULL,
  `reset_token` varchar(255) NOT NULL,
  `expires` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `password_reset`
--

INSERT INTO `password_reset` (`id`, `user_id`, `reset_token`, `expires`) VALUES
('4297e6ee-17ee-4f01-b947-e86c3f02ddf9', '0b9f88eb-f1e3-4bb4-9cee-3c1ead9914a9', '204550', '2024-05-29 05:07:45');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `provisioning_declined`
--

DROP TABLE IF EXISTS `provisioning_declined`;
CREATE TABLE `provisioning_declined` (
  `ID` uuid NOT NULL,
  `ID_user` uuid NOT NULL,
  `virtual_environment` varchar(255) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `provisioning_request`
--

DROP TABLE IF EXISTS `provisioning_request`;
CREATE TABLE `provisioning_request` (
  `ID` uuid NOT NULL,
  `ID_user` uuid NOT NULL,
  `virtual_environment` varchar(255) NOT NULL,
  `purpose` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `registration_application`
--

DROP TABLE IF EXISTS `registration_application`;
CREATE TABLE `registration_application` (
  `ID` uuid NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `application_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `ID` uuid NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`ID`, `role`, `email`, `username`, `password`, `firstname`, `lastname`) VALUES
('0b9f88eb-f1e3-4bb4-9cee-3c1ead9914a9', 'admin', 'seconder56@gmail.com', 'second', 'E3D151DAAC357C84F709A675C914670DE3ED8D246DFA02A7DA9337EE57C7E777:dybVMNowAZqPkA==', 'string', 'string'),
('e5a1e768-9ca5-4736-b893-4b139d22588a', 'employee', 'jan@juan.de', 'juani', '992A11CDAFCFCD5DC8DC889B1BA9475EF6CC12D1A623721A370ED5CFAFC2833E:HYdLqALw3zGP5A==', 'jan', 'juan'),
('a815a061-5050-47d8-99ba-4d0f4fcf76be', 'employee', 'skr@br.de', 'skrbr', 'C07535CBE0EB5CE97673FD2B994239D7AC4D44932AFA449242CF0E87471693E5:pZpRIcZUQUl8Mg==', 'skr', 'br'),
('32f75e2d-2f2a-49d8-99ef-5cd577f6ca12', 'employee', 'test@gmail.com', 'test', '25136016FF9B29FE0C5DD181615CF2D93088AC6C824A95CFEF0B0BE0508FC149:86LA8tM+ickZvQ==', 'test', 'test'),
('e9579ba7-5bc9-4f44-908e-7ebe05842dfd', 'admin', 'admin@gmail.com', 'adin', 'CAA9182D29B63EA537FF60BE04D1C206E069C4A4A0E59D5BBECA3D7AF5377348:z9GYJ3yAuQWhrQ==', 'string', 'string'),
('08dc7fcc-b92b-4d7e-8089-d25ef20dc352', 'admin', 'adi_popa2002@yahoo.com', 'vac', 'F7DC4D5D1EAA2B7A1E7B8AB0CA533986C841676C4A78BF9350870FA8410944BA:Af8klH2wAA/fXg==', 'vac', 'mac');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vacation_days`
--

DROP TABLE IF EXISTS `vacation_days`;
CREATE TABLE `vacation_days` (
  `ID` uuid NOT NULL,
  `ID_user` uuid NOT NULL,
  `total_days` int(11) DEFAULT NULL,
  `used_days` int(11) DEFAULT NULL,
  `planned_days` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `vacation_days`
--

INSERT INTO `vacation_days` (`ID`, `ID_user`, `total_days`, `used_days`, `planned_days`) VALUES
('b3d6399a-cdd3-4603-a73d-2001fba6a0cf', '0b9f88eb-f1e3-4bb4-9cee-3c1ead9914a9', 30, 0, 0),
('f0c6630a-167d-4eea-bafb-510d03ec4095', 'a815a061-5050-47d8-99ba-4d0f4fcf76be', 30, 0, 0),
('f1661f66-8c8b-4e0a-93ed-9951d7ded650', 'e5a1e768-9ca5-4736-b893-4b139d22588a', 30, 0, 0),
('bfb1dc31-c4cd-43fc-9fc6-9c76947db990', 'e9579ba7-5bc9-4f44-908e-7ebe05842dfd', 30, 0, 0),
('d8e99125-62fb-4415-a9c1-a7476f518cdd', '08dc7fcc-b92b-4d7e-8089-d25ef20dc352', 30, 0, 0),
('0aff251e-2dbe-4a10-8e2f-eeeffa87216d', '32f75e2d-2f2a-49d8-99ef-5cd577f6ca12', 30, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vacation_request`
--

DROP TABLE IF EXISTS `vacation_request`;
CREATE TABLE `vacation_request` (
  `ID` uuid NOT NULL,
  `ID_user` uuid NOT NULL,
  `first_day` date NOT NULL,
  `number_of_days` int(11) NOT NULL,
  `state` varchar(255) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `last_day` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `vacation_request`
--

INSERT INTO `vacation_request` (`ID`, `ID_user`, `first_day`, `number_of_days`, `state`, `reason`, `last_day`) VALUES
('227adf1c-8a35-45e7-87f5-d50ca1148ead', 'a815a061-5050-47d8-99ba-4d0f4fcf76be', '2024-05-01', 5, 'declined', 'neeee', '2024-05-08');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `virtualenvexamples`
--

DROP TABLE IF EXISTS `virtualenvexamples`;
CREATE TABLE `virtualenvexamples` (
  `ID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `virtualenvexamples`
--

INSERT INTO `virtualenvexamples` (`ID`, `name`) VALUES
(1, 'Microsoft Windows Server 2012'),
(2, 'Microsoft Windows Server 2016'),
(3, 'Microsoft Windows Server 2019'),
(4, 'Microsoft Windows Server 2022'),
(5, 'Red Hat Enterprise Linux (RHEL)'),
(6, 'Ubuntu Server'),
(7, 'CentOS');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `existing_environment`
--
ALTER TABLE `existing_environment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_USER` (`ID_user`);

--
-- Indizes für die Tabelle `hardware`
--
ALTER TABLE `hardware`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_ENV` (`ID_ENV`),
  ADD KEY `ID_PROV_REQ` (`ID_PROV_REQ`);

--
-- Indizes für die Tabelle `number_of_vacation_days`
--
ALTER TABLE `number_of_vacation_days`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_User` (`ID_User`);

--
-- Indizes für die Tabelle `password_reset`
--
ALTER TABLE `password_reset`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `provisioning_declined`
--
ALTER TABLE `provisioning_declined`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `provisioning_request`
--
ALTER TABLE `provisioning_request`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_USER` (`ID_user`);

--
-- Indizes für die Tabelle `registration_application`
--
ALTER TABLE `registration_application`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `vacation_days`
--
ALTER TABLE `vacation_days`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `vacation_request`
--
ALTER TABLE `vacation_request`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_user` (`ID_user`);

--
-- Indizes für die Tabelle `virtualenvexamples`
--
ALTER TABLE `virtualenvexamples`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `virtualenvexamples`
--
ALTER TABLE `virtualenvexamples`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `existing_environment`
--
ALTER TABLE `existing_environment`
  ADD CONSTRAINT `existing_environment_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID`);

--
-- Constraints der Tabelle `hardware`
--
ALTER TABLE `hardware`
  ADD CONSTRAINT `hardware_ibfk_1` FOREIGN KEY (`ID_ENV`) REFERENCES `existing_environment` (`ID`),
  ADD CONSTRAINT `hardware_ibfk_2` FOREIGN KEY (`ID_PROV_REQ`) REFERENCES `provisioning_request` (`ID`);

--
-- Constraints der Tabelle `number_of_vacation_days`
--
ALTER TABLE `number_of_vacation_days`
  ADD CONSTRAINT `number_of_vacation_days_ibfk_1` FOREIGN KEY (`ID_User`) REFERENCES `user` (`ID`);

--
-- Constraints der Tabelle `provisioning_request`
--
ALTER TABLE `provisioning_request`
  ADD CONSTRAINT `provisioning_request_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID`);

--
-- Constraints der Tabelle `vacation_request`
--
ALTER TABLE `vacation_request`
  ADD CONSTRAINT `vacation_request_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
