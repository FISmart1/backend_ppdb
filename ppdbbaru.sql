/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.5.29-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ppdb
-- ------------------------------------------------------
-- Server version	10.5.29-MariaDB-0+deb11u1

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `form_aturan`
--

DROP TABLE IF EXISTS `form_aturan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_aturan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `pernyataan1` enum('ya','tidak') NOT NULL,
  `pernyataan2` enum('ya','tidak') NOT NULL,
  `pernyataan3` enum('ya','tidak') NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_aturan_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `form_berkas`
--

DROP TABLE IF EXISTS `form_berkas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_berkas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `rapor` varchar(255) DEFAULT NULL,
  `sktm` varchar(255) DEFAULT NULL,
  `ss_ig` varchar(255) DEFAULT NULL,
  `kk` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `kip` varchar(255) DEFAULT NULL,
  `bpjs` varchar(255) DEFAULT NULL,
  `rekomendasi_surat` varchar(255) DEFAULT NULL,
  `tagihan_listrik` varchar(255) DEFAULT NULL,
  `reels` varchar(255) DEFAULT NULL,
  `rumah_depan` varchar(255) DEFAULT NULL,
  `rumah_ruangtamu` varchar(255) DEFAULT NULL,
  `rumah_kamar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `form_berkas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `form_kesehatan`
--

DROP TABLE IF EXISTS `form_kesehatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_kesehatan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `tinggiBadan` varchar(10) DEFAULT NULL,
  `beratBadan` varchar(10) DEFAULT NULL,
  `penyakitMenular` varchar(255) DEFAULT NULL,
  `penyakitNonMenular` varchar(255) DEFAULT NULL,
  `golonganDarah` varchar(5) DEFAULT NULL,
  `kesehatanMental` varchar(20) DEFAULT NULL,
  `butaWarna` varchar(20) DEFAULT NULL,
  `perokok` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_kesehatan_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `form_orangtua`
--

DROP TABLE IF EXISTS `form_orangtua`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_orangtua` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ayah_nama` varchar(255) DEFAULT NULL,
  `ayah_alamat` text DEFAULT NULL,
  `ayah_telepon` varchar(20) DEFAULT NULL,
  `ayah_pekerjaan` varchar(255) DEFAULT NULL,
  `ayah_tanggungan` int(11) DEFAULT NULL,
  `ayah_penghasilan` int(11) DEFAULT NULL,
  `ibu_nama` varchar(255) DEFAULT NULL,
  `ibu_alamat` text DEFAULT NULL,
  `ibu_telepon` varchar(20) DEFAULT NULL,
  `ibu_pekerjaan` varchar(255) DEFAULT NULL,
  `ibu_tanggungan` int(11) DEFAULT NULL,
  `ibu_penghasilan` int(11) DEFAULT NULL,
  `wali_nama` varchar(255) DEFAULT NULL,
  `wali_hubungan` varchar(255) DEFAULT NULL,
  `wali_tanggungan` int(11) DEFAULT NULL,
  `wali_pekerjaan` varchar(255) DEFAULT NULL,
  `wali_alamat` text DEFAULT NULL,
  `wali_sumber` varchar(255) DEFAULT NULL,
  `wali_penghasilan` int(11) DEFAULT NULL,
  `info_ppdb` varchar(255) DEFAULT NULL,
  `saudara_beasiswa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `form_orangtua_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `form_prestasi`
--

DROP TABLE IF EXISTS `form_prestasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_prestasi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `math_s3` varchar(5) DEFAULT NULL,
  `math_s4` varchar(5) DEFAULT NULL,
  `math_s5` varchar(5) DEFAULT NULL,
  `indo_s3` varchar(5) DEFAULT NULL,
  `indo_s4` varchar(5) DEFAULT NULL,
  `indo_s5` varchar(5) DEFAULT NULL,
  `english_s3` varchar(5) DEFAULT NULL,
  `english_s4` varchar(5) DEFAULT NULL,
  `english_s5` varchar(5) DEFAULT NULL,
  `ipa_s3` varchar(5) DEFAULT NULL,
  `ipa_s4` varchar(5) DEFAULT NULL,
  `ipa_s5` varchar(5) DEFAULT NULL,
  `pai_s3` varchar(5) DEFAULT NULL,
  `pai_s4` varchar(5) DEFAULT NULL,
  `pai_s5` varchar(5) DEFAULT NULL,
  `foreignLanguage` varchar(255) DEFAULT NULL,
  `hafalan` text DEFAULT NULL,
  `achievement` text DEFAULT NULL,
  `organization` text DEFAULT NULL,
  `dream` varchar(255) DEFAULT NULL,
  `hobby` varchar(255) DEFAULT NULL,
  `special` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `form_prestasi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `form_pribadi`
--

DROP TABLE IF EXISTS `form_pribadi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_pribadi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `nisn` varchar(50) DEFAULT NULL,
  `nik` varchar(50) DEFAULT NULL,
  `birthPlace` varchar(100) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `village` varchar(100) DEFAULT NULL,
  `addressDetail` text DEFAULT NULL,
  `rt` varchar(10) DEFAULT NULL,
  `rw` varchar(10) DEFAULT NULL,
  `postalCode` varchar(20) DEFAULT NULL,
  `schoolOrigin` varchar(255) DEFAULT NULL,
  `graduationYear` varchar(10) DEFAULT NULL,
  `npsn` varchar(50) DEFAULT NULL,
  `childOrder` varchar(10) DEFAULT NULL,
  `parentStatus` varchar(50) DEFAULT NULL,
  `familyStatus` varchar(50) DEFAULT NULL,
  `socialAid` varchar(50) DEFAULT NULL,
  `livingWith` varchar(100) DEFAULT NULL,
  `livingWithCustom` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `socialMedia` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `form_pribadi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `form_rumah`
--

DROP TABLE IF EXISTS `form_rumah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `form_rumah` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `luasTanah` varchar(50) DEFAULT NULL,
  `kualitasRumah` varchar(100) DEFAULT NULL,
  `statusKepemilikanRumah` varchar(100) DEFAULT NULL,
  `kendaraanDimiliki` varchar(100) DEFAULT NULL,
  `statusKendaraan` varchar(150) DEFAULT NULL,
  `hartaTidakBergerak` varchar(100) DEFAULT NULL,
  `statusHarta` varchar(150) DEFAULT NULL,
  `dayaListrik` varchar(50) DEFAULT NULL,
  `sumberAir` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_form_rumah_user` (`user_id`),
  CONSTRAINT `fk_form_rumah_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notifikasi`
--

DROP TABLE IF EXISTS `notifikasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifikasi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_notifikasi_user` (`user_id`),
  CONSTRAINT `fk_notifikasi_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pengumuman_seleksi`
--

DROP TABLE IF EXISTS `pengumuman_seleksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengumuman_seleksi` (
  `user_id` int(11) NOT NULL,
  `seleksi_berkas` enum('ya','tidak','pending') DEFAULT 'pending',
  `tes_akademik` enum('ya','tidak','pending') DEFAULT 'pending',
  `tes_psikotes` enum('ya','tidak','pending') DEFAULT 'pending',
  `wawancara` enum('ya','tidak','pending') DEFAULT 'pending',
  `tes_baca_quran` enum('ya','tidak','pending') DEFAULT 'pending',
  `home_visit` enum('ya','tidak','pending') DEFAULT 'pending',
  `pengumuman_akhir` enum('ya','tidak','pending') DEFAULT 'pending',
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `validasi_pendaftaran` enum('belum','pending','sudah') NOT NULL DEFAULT 'belum',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-17  7:34:34
