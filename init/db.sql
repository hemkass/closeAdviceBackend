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
-- Table structure for table `genre`
--
DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
`id` int NOT NULL AUTO_INCREMENT,
`label` varchar(50)  NOT NULL ,
`idIMBD`  int NOT NULL,
`creationDate` datetime NOT NULL DEFAULT current_timestamp(),
`updateDate` datetime DEFAULT NULL,
`isDeleted` tinyint(1) NOT NULL DEFAULT 0,
`deleteDate` datetime DEFAULT NULL,
PRIMARY KEY (`id`)
) 

ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;

/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `genre_movie`
--
DROP TABLE IF EXISTS `genre_movie`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_movie` (
`id` int NOT NULL AUTO_INCREMENT,
`idGenre` int NOT NULL,
`idMovie` int NOT NULL,
`creationDate` datetime NOT NULL DEFAULT current_timestamp(),
`updateDate` datetime DEFAULT NULL,
`isDeleted` tinyint(1) NOT NULL DEFAULT 0,
`deleteDate` datetime DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `FK_movie_TO_genre_movie`(`idMovie`),
CONSTRAINT `FK_movie_TO_genre_movie` FOREIGN KEY(`idMovie`) REFERENCES `movie`(`id`),
KEY `FK_genre_TO_genre_movie`(`idGenre`),
CONSTRAINT `FK_user_TO_genre_movie` FOREIGN KEY(`idGenre`) REFERENCES `genre`(`id`)
) 

ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_movie`
--

LOCK TABLES `genre_movie` WRITE;
/*!40000 ALTER TABLE `genre_movie` DISABLE KEYS */;

/*!40000 ALTER TABLE `genre_movie` ENABLE KEYS */;
UNLOCK TABLES;





--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
`id` int NOT NULL AUTO_INCREMENT,
`idIMBD` int  DEFAULT NULL  ,
`originalLanguage` varchar(50)  NOT NULL ,
`originalTitle` varchar(50) DEFAULT NULL,
`overview` varchar(1000) DEFAULT NULL,
`posterPath` varchar(500) DEFAULT NULL,
`releaseDate` datetime DEFAULT NULL,
`viewDate` datetime DEFAULT NULL,
`rating` float DEFAULT NULL,
`creationDate` datetime NOT NULL DEFAULT current_timestamp(),
`updateDate` datetime DEFAULT NULL,
`isDeleted` tinyint(1) NOT NULL DEFAULT 0,
`deleteDate` datetime DEFAULT NULL,
PRIMARY KEY (`id`)) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;

/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;


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
PRIMARY KEY (`id`)
)
 
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
-- Table structure for table `refresh-token`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
`id` int(20) NOT NULL AUTO_INCREMENT,
`idMovie` int(20) ,
`comment`varchar(3000) NOT NULL,
`creationDate` datetime NOT NULL DEFAULT current_timestamp(),
`updateDate` datetime DEFAULT NULL,
`isDeleted` tinyint(1) NOT NULL DEFAULT 0,
`deleteDate` datetime DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `FK_movie_TO_review`(`idMovie`),
CONSTRAINT `FK_movie_TO_movie_review` FOREIGN KEY(`idMovie`) REFERENCES `movie`(`id`)) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;

/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `user_review`
--

DROP TABLE IF EXISTS `user_review`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_review` (
`id` int(20) NOT NULL AUTO_INCREMENT,
`idUser` int(20) NOT NULL,
`idReview` int(20) NOT NULL,

PRIMARY KEY (`id`),
KEY `FK_review_TO_user_review`(`idReview`),
CONSTRAINT `FK_review_TO_user_review` FOREIGN KEY(`idReview`) REFERENCES `review`(`id`),
KEY `FK_user_TO_user_review`(`idUser`),
CONSTRAINT `FK_user_TO_user_review` FOREIGN KEY(`idUser`) REFERENCES `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_review`
--

LOCK TABLES `user_review` WRITE;
/*!40000 ALTER TABLE `user_review` DISABLE KEYS */;

/*!40000 ALTER TABLE `user_review` ENABLE KEYS */;
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