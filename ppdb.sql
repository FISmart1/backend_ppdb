-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 15, 2025 at 04:43 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ppdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `form_aturan`
--

CREATE TABLE `form_aturan` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `pernyataan1` enum('ya','tidak') NOT NULL,
  `pernyataan2` enum('ya','tidak') NOT NULL,
  `pernyataan3` enum('ya','tidak') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `form_berkas`
--

CREATE TABLE `form_berkas` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
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
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `form_kesehatan`
--

CREATE TABLE `form_kesehatan` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `tinggiBadan` varchar(10) DEFAULT NULL,
  `beratBadan` varchar(10) DEFAULT NULL,
  `penyakitMenular` varchar(255) DEFAULT NULL,
  `penyakitNonMenular` varchar(255) DEFAULT NULL,
  `golonganDarah` varchar(5) DEFAULT NULL,
  `kesehatanMental` varchar(20) DEFAULT NULL,
  `butaWarna` varchar(20) DEFAULT NULL,
  `perokok` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `form_orangtua`
--

CREATE TABLE `form_orangtua` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `ayah_nama` varchar(255) DEFAULT NULL,
  `ayah_alamat` text,
  `ayah_telepon` varchar(20) DEFAULT NULL,
  `ayah_pekerjaan` varchar(255) DEFAULT NULL,
  `ayah_tanggungan` int DEFAULT NULL,
  `ayah_penghasilan` int DEFAULT NULL,
  `ibu_nama` varchar(255) DEFAULT NULL,
  `ibu_alamat` text,
  `ibu_telepon` varchar(20) DEFAULT NULL,
  `ibu_pekerjaan` varchar(255) DEFAULT NULL,
  `ibu_tanggungan` int DEFAULT NULL,
  `ibu_penghasilan` int DEFAULT NULL,
  `wali_nama` varchar(255) DEFAULT NULL,
  `wali_hubungan` varchar(255) DEFAULT NULL,
  `wali_tanggungan` int DEFAULT NULL,
  `wali_pekerjaan` varchar(255) DEFAULT NULL,
  `wali_alamat` text,
  `wali_sumber` varchar(255) DEFAULT NULL,
  `wali_penghasilan` int DEFAULT NULL,
  `info_ppdb` varchar(255) DEFAULT NULL,
  `saudara_beasiswa` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `form_prestasi`
--

CREATE TABLE `form_prestasi` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
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
  `hafalan` text,
  `achievement` text,
  `organization` text,
  `dream` varchar(255) DEFAULT NULL,
  `hobby` varchar(255) DEFAULT NULL,
  `special` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `form_pribadi`
--

CREATE TABLE `form_pribadi` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `nisn` varchar(50) DEFAULT NULL,
  `nik` varchar(50) DEFAULT NULL,
  `birthPlace` varchar(100) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `village` varchar(100) DEFAULT NULL,
  `addressDetail` text,
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
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `form_rumah`
--

CREATE TABLE `form_rumah` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `luasTanah` varchar(50) DEFAULT NULL,
  `kualitasRumah` varchar(100) DEFAULT NULL,
  `statusKepemilikanRumah` varchar(100) DEFAULT NULL,
  `kendaraanDimiliki` varchar(100) DEFAULT NULL,
  `statusKendaraan` varchar(150) DEFAULT NULL,
  `hartaTidakBergerak` varchar(100) DEFAULT NULL,
  `statusHarta` varchar(150) DEFAULT NULL,
  `dayaListrik` varchar(50) DEFAULT NULL,
  `sumberAir` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengumuman_seleksi`
--

CREATE TABLE `pengumuman_seleksi` (
  `user_id` int NOT NULL,
  `seleksi_berkas` enum('ya','tidak','pending') DEFAULT 'pending',
  `tes_akademik` enum('ya','tidak','pending') DEFAULT 'pending',
  `tes_psikotes` enum('ya','tidak','pending') DEFAULT 'pending',
  `wawancara` enum('ya','tidak','pending') DEFAULT 'pending',
  `tes_baca_quran` enum('ya','tidak','pending') DEFAULT 'pending',
  `home_visit` enum('ya','tidak','pending') DEFAULT 'pending',
  `pengumuman_akhir` enum('ya','tidak','pending') DEFAULT 'pending',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form_aturan`
--
ALTER TABLE `form_aturan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `form_berkas`
--
ALTER TABLE `form_berkas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `form_kesehatan`
--
ALTER TABLE `form_kesehatan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `form_orangtua`
--
ALTER TABLE `form_orangtua`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `form_prestasi`
--
ALTER TABLE `form_prestasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `form_pribadi`
--
ALTER TABLE `form_pribadi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `form_rumah`
--
ALTER TABLE `form_rumah`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_form_rumah_user` (`user_id`);

--
-- Indexes for table `pengumuman_seleksi`
--
ALTER TABLE `pengumuman_seleksi`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `form_aturan`
--
ALTER TABLE `form_aturan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `form_berkas`
--
ALTER TABLE `form_berkas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `form_kesehatan`
--
ALTER TABLE `form_kesehatan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `form_orangtua`
--
ALTER TABLE `form_orangtua`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `form_prestasi`
--
ALTER TABLE `form_prestasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `form_pribadi`
--
ALTER TABLE `form_pribadi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `form_rumah`
--
ALTER TABLE `form_rumah`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `form_aturan`
--
ALTER TABLE `form_aturan`
  ADD CONSTRAINT `fk_aturan_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `form_berkas`
--
ALTER TABLE `form_berkas`
  ADD CONSTRAINT `form_berkas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `form_kesehatan`
--
ALTER TABLE `form_kesehatan`
  ADD CONSTRAINT `fk_kesehatan_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `form_orangtua`
--
ALTER TABLE `form_orangtua`
  ADD CONSTRAINT `form_orangtua_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `form_prestasi`
--
ALTER TABLE `form_prestasi`
  ADD CONSTRAINT `form_prestasi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `form_pribadi`
--
ALTER TABLE `form_pribadi`
  ADD CONSTRAINT `form_pribadi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `form_rumah`
--
ALTER TABLE `form_rumah`
  ADD CONSTRAINT `fk_form_rumah_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
