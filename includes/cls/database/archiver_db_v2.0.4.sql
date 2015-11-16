-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2015 at 07:17 AM
-- Server version: 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `archiver`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachmentmetas`
--

CREATE TABLE IF NOT EXISTS `attachmentmetas` (
  `id` int(10) unsigned NOT NULL,
  `attachment_id` bigint(20) unsigned NOT NULL,
  `attachmentmeta_cat` varchar(50) NOT NULL,
  `attachmentmeta_key` varchar(100) NOT NULL,
  `attachmentmeta_meta` mediumtext,
  `attachmentmeta_value` varchar(200) DEFAULT NULL,
  `attachmentmeta_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE IF NOT EXISTS `attachments` (
  `id` bigint(20) unsigned NOT NULL,
  `file_id` bigint(20) unsigned DEFAULT NULL,
  `attachment_title` varchar(100) DEFAULT NULL,
  `attachment_desc` varchar(500) DEFAULT NULL,
  `attachment_type` enum('system','other','file','folder') NOT NULL,
  `attachment_addr` varchar(1000) DEFAULT NULL,
  `attachment_name` varchar(100) DEFAULT NULL,
  `attachment_ext` varchar(255) DEFAULT NULL,
  `attachment_size` float(12,0) unsigned DEFAULT NULL,
  `attachment_meta` mediumtext,
  `attachment_parent` bigint(20) unsigned DEFAULT NULL,
  `attachment_order` smallint(5) unsigned DEFAULT NULL,
  `attachment_status` enum('normal','trash','deleted','inprogress','unavailable') NOT NULL DEFAULT 'normal',
  `attachment_date` datetime DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`id`, `file_id`, `attachment_title`, `attachment_desc`, `attachment_type`, `attachment_addr`, `attachment_name`, `attachment_ext`, `attachment_size`, `attachment_meta`, `attachment_parent`, `attachment_order`, `attachment_status`, `attachment_date`, `user_id`, `date_modified`) VALUES
(4, 2, NULL, NULL, 'file', 'image/1/3-ermile.png', 'Ermile', 'png', 285655, '{&quot;mime&quot;:&quot;image/png&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;png&quot;,&quot;url&quot;:&quot;data/1/3-ermile.png&quot;,&quot;thumb&quot;:&quot;data/1/3-ermile-thumb.png&quot;,&quot;normal&quot;:&quot;data/1/3-ermile-normal.png&quot;,&quot;height&quot;:1080,&quot;width&quot;:1920}', NULL, NULL, 'normal', '2015-11-08 18:42:19', 1, NULL),
(5, 2, NULL, NULL, 'file', 'image/1/3-ermile.png', 'Ermile', 'png', 285655, '{&quot;mime&quot;:&quot;image/png&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;png&quot;,&quot;url&quot;:&quot;data/1/3-ermile.png&quot;,&quot;thumb&quot;:&quot;data/1/3-ermile-thumb.png&quot;,&quot;normal&quot;:&quot;data/1/3-ermile-normal.png&quot;,&quot;height&quot;:1080,&quot;width&quot;:1920}', NULL, NULL, 'normal', '2015-11-08 18:42:32', 1, NULL),
(6, 2, NULL, NULL, 'file', 'aa/sada', 'Ermile', 'png', 285655, '{&quot;mime&quot;:&quot;image/png&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;png&quot;,&quot;url&quot;:&quot;data/1/3-ermile.png&quot;,&quot;thumb&quot;:&quot;data/1/3-ermile-thumb.png&quot;,&quot;normal&quot;:&quot;data/1/3-ermile-normal.png&quot;,&quot;height&quot;:1080,&quot;width&quot;:1920}', NULL, NULL, 'normal', '2015-11-08 20:21:11', 1, NULL),
(7, 2, NULL, NULL, 'file', '/', 'Ermile', 'png', 285655, '{&quot;mime&quot;:&quot;image/png&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;png&quot;,&quot;url&quot;:&quot;data/1/3-ermile.png&quot;,&quot;thumb&quot;:&quot;data/1/3-ermile-thumb.png&quot;,&quot;normal&quot;:&quot;data/1/3-ermile-normal.png&quot;,&quot;height&quot;:1080,&quot;width&quot;:1920}', NULL, NULL, 'normal', '2015-11-08 20:22:27', 1, NULL),
(8, 2, NULL, NULL, 'file', '/dasd', 'Ermile', 'png', 285655, '{&quot;mime&quot;:&quot;image/png&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;png&quot;,&quot;url&quot;:&quot;data/1/3-ermile.png&quot;,&quot;thumb&quot;:&quot;data/1/3-ermile-thumb.png&quot;,&quot;normal&quot;:&quot;data/1/3-ermile-normal.png&quot;,&quot;height&quot;:1080,&quot;width&quot;:1920}', NULL, NULL, 'normal', '2015-11-08 20:22:37', 1, NULL),
(9, 2, '', '', 'folder', '/', 'Ermile', 'png', 10, '{&quot;mime&quot;:&quot;image/png&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;png&quot;,&quot;url&quot;:&quot;data/1/3-ermile.png&quot;,&quot;thumb&quot;:&quot;data/1/3-ermile-thumb.png&quot;,&quot;normal&quot;:&quot;data/1/3-ermile-normal.png&quot;,&quot;height&quot;:1080,&quot;width&quot;:1920}', 0, NULL, 'normal', '2015-11-05 20:22:27', 1, '2015-11-09 09:10:03'),
(10, NULL, NULL, NULL, 'file', '/', '1398_1397068192', 'jpg', 33641, '{&quot;mime&quot;:&quot;image/jpeg&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;jpg&quot;,&quot;url&quot;:&quot;data/1/3-1398-1397068192.jpg&quot;,&quot;thumb&quot;:&quot;data/1/3-1398-1397068192-thumb.jpg&quot;,&quot;normal&quot;:&quot;data/1/3-1398-1397068192-normal.jpg&quot;,&quot;height&quot;:429,&quot;width&quot;:350}', NULL, NULL, 'normal', '2015-11-11 09:35:50', 1, NULL),
(11, NULL, NULL, NULL, 'file', '/', 'Brown-Paisley2', 'jpg', 974127, '{&quot;mime&quot;:&quot;image/jpeg&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;jpg&quot;,&quot;url&quot;:&quot;data/1/4-brown-paisley2.jpg&quot;,&quot;thumb&quot;:&quot;data/1/4-brown-paisley2-thumb.jpg&quot;,&quot;normal&quot;:&quot;data/1/4-brown-paisley2-normal.jpg&quot;,&quot;height&quot;:500,&quot;width&quot;:500}', NULL, NULL, 'normal', '2015-11-11 09:36:01', 1, NULL),
(12, NULL, NULL, NULL, 'file', '/', 'WMdecorate-plates13920604537', 'jpg', 32696, '{&quot;mime&quot;:&quot;image/jpeg&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;jpg&quot;,&quot;url&quot;:&quot;data/1/5-wmdecorate-plates13920604537.jpg&quot;,&quot;thumb&quot;:&quot;data/1/5-wmdecorate-plates13920604537-thumb.jpg&quot;,&quot;normal&quot;:&quot;data/1/5-wmdecorate-plates13920604537-normal.jpg&quot;,&quot;height&quot;:300,&quot;width&quot;:300}', NULL, NULL, 'normal', '2015-11-11 09:41:29', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` bigint(20) unsigned NOT NULL,
  `post_id` bigint(20) unsigned DEFAULT NULL,
  `comment_author` varchar(50) DEFAULT NULL,
  `comment_email` varchar(100) DEFAULT NULL,
  `comment_url` varchar(100) DEFAULT NULL,
  `comment_content` mediumtext NOT NULL,
  `comment_meta` mediumtext,
  `comment_status` enum('approved','unapproved','spam','deleted') NOT NULL DEFAULT 'unapproved',
  `comment_parent` smallint(5) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `visitor_id` bigint(20) unsigned DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE IF NOT EXISTS `files` (
  `id` bigint(20) unsigned NOT NULL,
  `file_server` smallint(5) unsigned NOT NULL,
  `file_folder` int(10) unsigned NOT NULL,
  `file_code` varchar(64) NOT NULL,
  `file_size` bigint(20) unsigned NOT NULL,
  `file_meta` mediumtext,
  `file_status` enum('inprogress','ready','temp','delete','unavailable') NOT NULL,
  `file_createdate` datetime NOT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `file_server`, `file_folder`, `file_code`, `file_size`, `file_meta`, `file_status`, `file_createdate`, `date_modified`) VALUES
(1, 1, 1, 'baf77637dee66cfafcd66f11e45b5247', 85570, '{&quot;mime&quot;:&quot;image/jpeg&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;jpg&quot;,&quot;url&quot;:&quot;data/1/1-s1.jpg&quot;,&quot;thumb&quot;:&quot;data/1/1-s1-thumb.jpg&quot;,&quot;normal&quot;:&quot;data/1/1-s1-normal.jpg&quot;,&quot;height&quot;:1666,&quot;width&quot;:1666}', 'ready', '2015-11-08 13:29:17', NULL),
(2, 1, 1, '1e2a44cfbeda5b6968e477c618b6e32f', 285655, '{&quot;mime&quot;:&quot;image/png&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;png&quot;,&quot;url&quot;:&quot;data/1/2-ermile.png&quot;,&quot;thumb&quot;:&quot;data/1/2-ermile-thumb.png&quot;,&quot;normal&quot;:&quot;data/1/2-ermile-normal.png&quot;,&quot;height&quot;:1080,&quot;width&quot;:1920}', 'ready', '2015-11-08 17:16:50', NULL),
(3, 1, 1, '09b494bf384b65d318ee41600eebfd54', 33641, '{&quot;mime&quot;:&quot;image/jpeg&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;jpg&quot;,&quot;url&quot;:&quot;data/1/3-1398-1397068192.jpg&quot;,&quot;thumb&quot;:&quot;data/1/3-1398-1397068192-thumb.jpg&quot;,&quot;normal&quot;:&quot;data/1/3-1398-1397068192-normal.jpg&quot;,&quot;height&quot;:429,&quot;width&quot;:350}', 'ready', '2015-11-11 09:35:50', NULL),
(4, 1, 1, '4f384022e16db106f4b1b80625696943', 974127, '{&quot;mime&quot;:&quot;image/jpeg&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;jpg&quot;,&quot;url&quot;:&quot;data/1/4-brown-paisley2.jpg&quot;,&quot;thumb&quot;:&quot;data/1/4-brown-paisley2-thumb.jpg&quot;,&quot;normal&quot;:&quot;data/1/4-brown-paisley2-normal.jpg&quot;,&quot;height&quot;:500,&quot;width&quot;:500}', 'ready', '2015-11-11 09:36:01', NULL),
(5, 1, 1, '14f397891291d1e4e20b933e12d6d5c6', 32696, '{&quot;mime&quot;:&quot;image/jpeg&quot;,&quot;type&quot;:&quot;image&quot;,&quot;ext&quot;:&quot;jpg&quot;,&quot;url&quot;:&quot;data/1/5-wmdecorate-plates13920604537.jpg&quot;,&quot;thumb&quot;:&quot;data/1/5-wmdecorate-plates13920604537-thumb.jpg&quot;,&quot;normal&quot;:&quot;data/1/5-wmdecorate-plates13920604537-normal.jpg&quot;,&quot;height&quot;:300,&quot;width&quot;:300}', 'ready', '2015-11-11 09:41:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `logitems`
--

CREATE TABLE IF NOT EXISTS `logitems` (
  `id` smallint(5) unsigned NOT NULL,
  `logitem_title` varchar(100) NOT NULL,
  `logitem_desc` varchar(999) DEFAULT NULL,
  `logitem_meta` mediumtext,
  `logitem_priority` enum('critical','high','medium','low') NOT NULL DEFAULT 'medium',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `logitems`
--

INSERT INTO `logitems` (`id`, `logitem_title`, `logitem_desc`, `logitem_meta`, `logitem_priority`, `date_modified`) VALUES
(1, 'low priority', '', '', 'low', '0000-00-00 00:00:00'),
(2, 'mediym priority', '', '', 'medium', '0000-00-00 00:00:00'),
(3, 'high priority', '', '', 'high', '0000-00-00 00:00:00'),
(4, 'critical priority', '', '', 'critical', '0000-00-00 00:00:00'),
(5, 'php/error', '', '', 'critical', '0000-00-00 00:00:00'),
(6, 'db/error', '', '', 'high', '0000-00-00 00:00:00'),
(7, 'account/login', '', '', 'low', '0000-00-00 00:00:00'),
(8, 'account/signup', '', '', 'medium', '0000-00-00 00:00:00'),
(9, 'account/recovery', '', '', 'medium', '0000-00-00 00:00:00'),
(10, 'account/change password', '', '', 'low', '0000-00-00 00:00:00'),
(11, 'account/verification sms', '', '', 'low', '0000-00-00 00:00:00'),
(12, 'account/verification email', '', '', 'medium', '0000-00-00 00:00:00'),
(13, 'Page 400', '', '', 'low', '0000-00-00 00:00:00'),
(14, 'Page 401 ', '', '', 'medium', '0000-00-00 00:00:00'),
(15, 'Page 403', '', '', 'low', '0000-00-00 00:00:00'),
(16, 'Page 404', '', '', 'low', '0000-00-00 00:00:00'),
(17, 'Page 500', '', '', 'low', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE IF NOT EXISTS `logs` (
  `id` bigint(20) unsigned NOT NULL,
  `logitem_id` smallint(5) unsigned NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `log_data` varchar(200) DEFAULT NULL,
  `log_meta` mediumtext,
  `log_status` enum('enable','disable','expire','deliver') DEFAULT NULL,
  `log_createdate` datetime NOT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` bigint(20) unsigned NOT NULL,
  `user_idsender` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `notification_title` varchar(50) NOT NULL,
  `notification_content` varchar(200) DEFAULT NULL,
  `notification_meta` mediumtext,
  `notification_url` varchar(100) DEFAULT NULL,
  `notification_status` enum('read','unread','expire') NOT NULL DEFAULT 'unread',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE IF NOT EXISTS `options` (
  `id` bigint(20) unsigned NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `post_id` bigint(20) unsigned DEFAULT NULL,
  `option_cat` varchar(50) NOT NULL,
  `option_key` varchar(50) NOT NULL,
  `option_value` varchar(255) DEFAULT NULL,
  `option_meta` mediumtext,
  `option_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `user_id`, `post_id`, `option_cat`, `option_key`, `option_value`, `option_meta`, `option_status`, `date_modified`) VALUES
(1, NULL, NULL, 'global', 'email', 'info@saloos.ir', NULL, '', NULL),
(2, NULL, NULL, 'global', 'auto_mail', 'no-reply@saloos.ir', NULL, '', NULL),
(19, NULL, NULL, 'permission_id', '1', 'admin', NULL, '', NULL),
(20, NULL, NULL, 'permission_id', '2', 'editor', NULL, '', NULL),
(21, NULL, NULL, 'permission_id', '3', 'viewer', NULL, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` bigint(20) unsigned NOT NULL,
  `post_language` char(2) DEFAULT NULL,
  `post_title` varchar(100) NOT NULL,
  `post_slug` varchar(100) NOT NULL,
  `post_url` varchar(255) NOT NULL,
  `post_content` mediumtext,
  `post_meta` mediumtext,
  `post_type` varchar(50) NOT NULL DEFAULT 'post',
  `post_comment` enum('open','closed') DEFAULT NULL,
  `post_count` smallint(5) unsigned DEFAULT NULL,
  `post_order` int(10) unsigned DEFAULT NULL,
  `post_status` enum('publish','draft','schedule','deleted','expire') NOT NULL DEFAULT 'draft',
  `post_parent` bigint(20) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `post_publishdate` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `post_language`, `post_title`, `post_slug`, `post_url`, `post_content`, `post_meta`, `post_type`, `post_comment`, `post_count`, `post_order`, `post_status`, `post_parent`, `user_id`, `post_publishdate`, `date_modified`) VALUES
(1, 'fa', 'درباره ما', 'about', 'about', '&amp;lt;p&amp;gt;&amp;lt;span style=&amp;quot;font-size: 1.35rem;&amp;quot;&amp;gt;این صفحه برای معرفی ما طراحی شده است!&amp;lt;/span&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/p&amp;gt;', '{&quot;thumbid&quot;:&quot;&quot;,&quot;slug&quot;:&quot;about&quot;}', 'page', NULL, NULL, NULL, 'publish', NULL, 1, '2015-10-31 18:45:55', NULL),
(2, 'fa', 'سلام:)', 'hi', 'news/hi', '&amp;lt;p&amp;gt;سلام کهکشان!&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;اگر شما بازدید کننده هستید: این سایت تازه راه&zwnj;اندازی شده و به امید خدا به زودی مطالب جدید در اون منتشر خواهد شد.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;اگر مدیر وب&zwnj;سایت هستید: برای انتشار می&zwnj;تونید همین مطلب رو ویرایش کرده و یا یک نوشته جدید منتشر کنید.&amp;lt;/p&amp;gt;', '{&quot;thumbid&quot;:&quot;&quot;,&quot;slug&quot;:&quot;hi&quot;}', 'post', NULL, NULL, NULL, 'publish', NULL, 1, '2015-10-31 20:45:54', NULL),
(3, NULL, 's1', 'baf77637dee66cfafcd66f11e45b5247', 'image/1/1-s1.jpg', NULL, '{&quot;mime&quot;:&quot;image/jpeg&quot;,&quot;type&quot;:&quot;image&quot;,&quot;size&quot;:85570,&quot;ext&quot;:&quot;jpg&quot;,&quot;url&quot;:&quot;files/1/1-s1.jpg&quot;,&quot;thumb&quot;:&quot;files/1/1-s1-thumb.jpg&quot;,&quot;normal&quot;:&quot;files/1/1-s1-normal.jpg&quot;,&quot;height&quot;:1666,&quot;width&quot;:1666}', 'attachment', NULL, NULL, NULL, 'draft', NULL, 1, '2015-11-08 12:40:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE IF NOT EXISTS `terms` (
  `id` int(10) unsigned NOT NULL,
  `term_language` char(2) DEFAULT NULL,
  `term_type` varchar(50) NOT NULL DEFAULT 'tag',
  `term_title` varchar(50) NOT NULL,
  `term_slug` varchar(50) NOT NULL,
  `term_url` varchar(200) NOT NULL,
  `term_desc` mediumtext,
  `term_meta` mediumtext,
  `term_parent` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`id`, `term_language`, `term_type`, `term_title`, `term_slug`, `term_url`, `term_desc`, `term_meta`, `term_parent`, `user_id`, `date_modified`) VALUES
(1, NULL, 'cat', 'اخبار', 'news', 'news', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `termusages`
--

CREATE TABLE IF NOT EXISTS `termusages` (
  `term_id` int(10) unsigned NOT NULL,
  `termusage_id` bigint(20) unsigned NOT NULL,
  `termusage_foreign` enum('posts','products','attachments','files','comments') DEFAULT NULL,
  `termusage_order` smallint(5) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `termusages`
--

INSERT INTO `termusages` (`term_id`, `termusage_id`, `termusage_foreign`, `termusage_order`) VALUES
(1, 1, 'posts', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL,
  `user_mobile` varchar(15) NOT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_pass` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_displayname` varchar(50) DEFAULT NULL,
  `user_meta` mediumtext,
  `user_status` enum('active','awaiting','deactive','removed','filter') DEFAULT 'awaiting',
  `user_permission` smallint(5) unsigned DEFAULT NULL,
  `user_createdate` datetime NOT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_mobile`, `user_email`, `user_pass`, `user_displayname`, `user_meta`, `user_status`, `user_permission`, `user_createdate`, `date_modified`) VALUES
(1, '989357269759', 'J.Evazzadeh@gmail.com', '$2y$07$9wj8/jDeQKyY0t0IcUf.xOEy98uf6BaSS7Tg28swrKUDxdKzUVfsy', 'Javad Evazzadeh', NULL, 'active', 1, '2015-01-01 00:00:00', NULL),
(2, '989356032043', 'itb.baravak@gmail.com', '$2y$07$ZRUphEsEn9bK8inKBfYt.efVoZDgBaoNfZz0uVRqRGvH9.che.Bqq', 'Hasan Salehi', NULL, 'active', 1, '2015-01-02 00:00:00', NULL),
(3, '989190499033', 'ahmadkarimi1991@gmail.com', '$2y$07$bLbhODUiPBFfbTU8V./m5OAYdkH2DP7uCQI2fVLubq7X/LdFQTeH.', 'Ahmad Karimi', NULL, 'active', 1, '2015-01-03 00:00:00', NULL),
(4, '989109610612', 'rm.biqarar@gmail.com', '$2y$07$k.Vi7QCpdym637.6rwbm2.u1tdMi4jyWFUg7YgNv.XnBFOP1.7W/y', 'Reza Mohiti', NULL, 'active', 1, '2015-01-04 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE IF NOT EXISTS `visitors` (
  `id` bigint(20) unsigned NOT NULL,
  `visitor_ip` int(10) unsigned NOT NULL,
  `visitor_url` varchar(255) NOT NULL,
  `visitor_agent` varchar(255) NOT NULL,
  `visitor_referer` varchar(255) DEFAULT NULL,
  `visitor_robot` enum('yes','no') NOT NULL DEFAULT 'no',
  `user_id` int(10) unsigned DEFAULT NULL,
  `visitor_createdate` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachmentmetas`
--
ALTER TABLE `attachmentmetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attachmentmetas_attachments_id` (`attachment_id`);

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attachments_files_id` (`file_id`),
  ADD KEY `attachments_users_id` (`user_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_posts_id` (`post_id`) USING BTREE,
  ADD KEY `comments_users_id` (`user_id`) USING BTREE,
  ADD KEY `comments_visitors_id` (`visitor_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `files_filecode_unique` (`file_code`) USING BTREE,
  ADD KEY `files_folder_index` (`file_folder`) USING BTREE;

--
-- Indexes for table `logitems`
--
ALTER TABLE `logitems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `logs_users_id` (`user_id`) USING BTREE,
  ADD KEY `logs_logitems_id` (`logitem_id`) USING BTREE;

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_users_idsender` (`user_idsender`) USING BTREE,
  ADD KEY `notifications_users_id` (`user_id`) USING BTREE,
  ADD KEY `notificationstatus_index` (`notification_status`) USING BTREE;

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cat+key+value` (`option_cat`,`option_key`,`option_value`) USING BTREE,
  ADD KEY `options_users_id` (`user_id`),
  ADD KEY `options_posts_id` (`post_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url_unique` (`post_url`,`post_language`) USING BTREE,
  ADD KEY `posts_users_id` (`user_id`) USING BTREE;

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `termurl_unique` (`term_url`),
  ADD KEY `terms_users_id` (`user_id`);

--
-- Indexes for table `termusages`
--
ALTER TABLE `termusages`
  ADD UNIQUE KEY `term+type+object_unique` (`term_id`,`termusage_id`,`termusage_foreign`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_unique` (`user_mobile`) USING BTREE,
  ADD UNIQUE KEY `email_unique` (`user_email`) USING BTREE;

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `visitors_users_id` (`user_id`),
  ADD KEY `visitorip_index` (`visitor_ip`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachmentmetas`
--
ALTER TABLE `attachmentmetas`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `logitems`
--
ALTER TABLE `logitems`
  MODIFY `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `attachmentmetas`
--
ALTER TABLE `attachmentmetas`
  ADD CONSTRAINT `attachmentmetas_attachments_id` FOREIGN KEY (`attachment_id`) REFERENCES `attachments` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `attachments`
--
ALTER TABLE `attachments`
  ADD CONSTRAINT `attachments_files_id` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `attachments_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_posts_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_logitems_id` FOREIGN KEY (`logitem_id`) REFERENCES `logitems` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `logs_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_posts_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `terms`
--
ALTER TABLE `terms`
  ADD CONSTRAINT `terms_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `termusages`
--
ALTER TABLE `termusages`
  ADD CONSTRAINT `termusages_terms_id` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
