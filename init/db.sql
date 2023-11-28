-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost   
-- Database: closeAdvice
-- -------------------------------------------------------- 
--Server version 5.5.5-10.9.4-MariaDB-1:10.9.4+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
`id` int NOT NULL AUTO_INCREMENT,
`label` varchar(50) DEFAULT NULL,
`creationDate` datetime NOT NULL DEFAULT current_timestamp(),
`updateDate` datetime DEFAULT NULL,
`isDeleted` tinyint(1) NOT NULL DEFAULT 0,
`deleteDate` datetime DEFAULT NULL,
PRIMARY KEY (`id`)) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;

/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `refresh-token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
`id` int(20) NOT NULL AUTO_INCREMENT,
`idUser` int(20) NOT NULL,
`refreshToken`varchar(500) NOT NULL,
`creationDate` datetime NOT NULL DEFAULT current_timestamp(),
`updateDate` datetime DEFAULT NULL,
`isDeleted` tinyint(1) NOT NULL DEFAULT 0,
`deleteDate` datetime DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `FK_user_TO_refresh_token`(`idUser`),
CONSTRAINT `FK_user_TO_user_refresh_token` FOREIGN KEY(`idUser`) REFERENCES `user`(`id`)) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;

/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
`id` int(20) NOT NULL AUTO_INCREMENT,
`label` varchar(50) NOT NULL,
`creationDate` datetime NOT NULL DEFAULT current_timestamp(),
`updateDate` datetime DEFAULT NULL,
`isDeleted` tinyint(1) NOT NULL DEFAULT 0,
`deleteDate` datetime DEFAULT NULL,
PRIMARY KEY (`id`)) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;

/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
`id` int(20) NOT NULL AUTO_INCREMENT,
`email` varchar(50) NOT NULL,
`alias` varchar(30) NOT NULL,
`password` varchar(150) NOT NULL,
`creationDate` datetime NOT NULL DEFAULT current_timestamp(),
`updateDate` datetime DEFAULT NULL,
`isDeleted` tinyint(1) NOT NULL DEFAULT 0,
`deleteDate` datetime DEFAULT NULL,
PRIMARY KEY (`id`)) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'marinecorbel@yahoo.fr','admin','52cdb3ac10a831a.f22922bb9db600b240e837a1069a7a11bd62616aafaf42f086ef7834beee4ba0','2023-07-30 09:55:55',NULL,0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
`id` int(20) NOT NULL AUTO_INCREMENT,
`idUser` int(20) NOT NULL,
`idRole` int(20) NOT NULL,

PRIMARY KEY (`id`),
KEY `FK_role_TO_user_role`(`idRole`),
CONSTRAINT `FK_role_TO_user_role` FOREIGN KEY(`idRole`) REFERENCES `role`(`id`),
KEY `FK_user_TO_user_role`(`idUser`),
CONSTRAINT `FK_user_TO_user_role` FOREIGN KEY(`idUser`) REFERENCES `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;

/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `user_team`
--

DROP TABLE IF EXISTS `user_team`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_team` (
`id` int(20) NOT NULL AUTO_INCREMENT,
`idUser` int(20) NOT NULL,
`idTeam` int NOT NULL,

PRIMARY KEY (`id`),
KEY `FK_team_TO_user_team`(`idTeam`),
CONSTRAINT `FK_team_TO_user_team` FOREIGN KEY(`idTeam`) REFERENCES `team`(`id`),
KEY `FK_user_TO_user_team`(`idUser`),
CONSTRAINT `FK_user_TO_user_team` FOREIGN KEY(`idUser`) REFERENCES `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_team`
--

LOCK TABLES `user_team` WRITE;
/*!40000 ALTER TABLE `user_team` DISABLE KEYS */;

/*!40000 ALTER TABLE `user_team` ENABLE KEYS */;
UNLOCK TABLES;




--
-- Dumping routines for database 'closeAdvice'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2023-05-17 16:16:45