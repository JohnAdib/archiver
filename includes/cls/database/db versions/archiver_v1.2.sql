-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2015 at 09:24 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

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
  `attachment_size` float(12,0) DEFAULT NULL,
  `attachment_parent` bigint(20) unsigned DEFAULT NULL,
  `attachment_order` smallint(5) DEFAULT NULL,
  `attachment_status` enum('normal','trash','deleted','inprogress') NOT NULL DEFAULT 'normal',
  `attachment_date` datetime DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `errorlogs`
--

CREATE TABLE IF NOT EXISTS `errorlogs` (
`id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `errorlog_id` smallint(5) unsigned NOT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `errors`
--

CREATE TABLE IF NOT EXISTS `errors` (
  `id` smallint(5) unsigned NOT NULL,
  `error_title` varchar(100) NOT NULL,
  `error_solution` varchar(999) DEFAULT NULL,
  `error_priority` enum('critical','high','medium','low') NOT NULL DEFAULT 'medium',
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
  `file_status` enum('inprogress','ready','temp','delete') NOT NULL,
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
  `notification_url` varchar(100) DEFAULT NULL,
  `notification_status` enum('read','unread','expire') NOT NULL DEFAULT 'unread',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE IF NOT EXISTS `options` (
`id` smallint(5) unsigned NOT NULL,
  `option_cat` varchar(50) NOT NULL,
  `option_key` varchar(50) NOT NULL,
  `option_value` varchar(200) DEFAULT NULL,
  `option_extra` varchar(400) DEFAULT NULL,
  `option_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `option_cat`, `option_key`, `option_value`, `option_extra`, `option_status`, `date_modified`) VALUES
(1, 'global', 'language', 'fa', NULL, '', '2014-05-01 08:18:41'),
(2, 'global', 'language', 'en', NULL, '', '2014-05-01 08:18:42'),
(3, 'global', 'title', 'Jibres', NULL, '', '2014-11-07 17:29:37'),
(4, 'global', 'desc', 'Jibres for all', NULL, '', '2014-11-07 17:29:46'),
(5, 'global', 'keyword', 'Jibres, store, online store', NULL, '', '2014-11-07 17:30:07'),
(6, 'global', 'url', 'http://jibres.ir', NULL, '', '2014-11-07 17:30:18'),
(7, 'global', 'email', 'info@jibres.ir', NULL, '', '2014-11-07 17:30:22'),
(8, 'global', 'auto_mail', 'no-reply@jibres.ir', NULL, '', '2014-11-07 17:30:27'),
(9, 'users', 'user_degree', 'under diploma', NULL, '', '0000-00-00 00:00:00'),
(10, 'users', 'user_degree', 'diploma', NULL, '', '0000-00-00 00:00:00'),
(11, 'users', 'user_degree', '2-year collage', NULL, '', '0000-00-00 00:00:00'),
(12, 'users', 'user_degree', 'bachelor', NULL, '', '0000-00-00 00:00:00'),
(13, 'users', 'user_degree', 'master', NULL, '', '0000-00-00 00:00:00'),
(14, 'users', 'user_degree', 'doctorate', NULL, '', '0000-00-00 00:00:00'),
(15, 'users', 'user_degree', 'religious', NULL, '', '0000-00-00 00:00:00'),
(16, 'users', 'user_activity', 'employee', NULL, '', '0000-00-00 00:00:00'),
(17, 'users', 'user_activity', 'housekeeper ', NULL, '', '0000-00-00 00:00:00'),
(18, 'users', 'user_activity', 'free lance', NULL, '', '0000-00-00 00:00:00'),
(19, 'users', 'user_activity', 'retired', NULL, '', '0000-00-00 00:00:00'),
(20, 'users', 'user_activity', 'student', NULL, '', '0000-00-00 00:00:00'),
(21, 'users', 'user_activity', 'unemployed', NULL, '', '0000-00-00 00:00:00'),
(22, 'users', 'user_activity', 'seminary student', NULL, '', '0000-00-00 00:00:00'),
(23, 'permissions', 'permission_name', 'admin', NULL, '', '2014-11-07 17:30:55'),
(24, 'permissions', 'permission_name', 'reseller', NULL, '', '2014-11-07 17:30:56'),
(26, 'ships', 'post', '1', NULL, '', '2014-11-07 17:30:56'),
(27, 'ships', 'tipax', '2', NULL, '', '2014-11-07 17:30:57'),
(28, 'units', 'money_unit', 'toman', NULL, '', '2014-11-07 17:31:08'),
(29, 'units', 'product_unit', 'adad', NULL, '', '2014-11-07 17:31:29'),
(30, 'permissions', 'permission_name', 'viewer', NULL, '', '2014-05-17 21:28:51');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` smallint(5) unsigned NOT NULL,
  `permission_title` varchar(50) NOT NULL,
  `permission_object` varchar(100) NOT NULL,
  `permission_read` bit(1) DEFAULT NULL,
  `permission_add` bit(1) DEFAULT NULL,
  `permission_edit` bit(1) DEFAULT NULL,
  `permission_delete` bit(1) DEFAULT NULL,
  `permission_type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `term_desc` text,
  `term_url` varchar(200) NOT NULL,
  `term_parent` int(10) unsigned DEFAULT NULL,
  `term_count` smallint(5) unsigned DEFAULT NULL,
  `term_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `user_id` int(10) unsigned DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `termusages`
--

CREATE TABLE IF NOT EXISTS `termusages` (
  `term_id` int(10) unsigned NOT NULL,
  `attachment_id` bigint(20) unsigned NOT NULL,
  `termusage_order` smallint(5) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userlogs`
--

CREATE TABLE IF NOT EXISTS `userlogs` (
`id` bigint(20) unsigned NOT NULL,
  `userlog_title` varchar(50) DEFAULT NULL,
  `userlog_desc` varchar(999) DEFAULT NULL,
  `userlog_priority` enum('high','medium','low') NOT NULL DEFAULT 'medium',
  `userlog_type` enum('forgetpassword') DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usermetas`
--

CREATE TABLE IF NOT EXISTS `usermetas` (
`id` bigint(20) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `usermeta_cat` varchar(50) NOT NULL,
  `usermeta_key` varchar(100) NOT NULL,
  `usermeta_value` varchar(500) DEFAULT NULL,
  `usermeta_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `user_status` enum('active','awaiting','deactive','removed','filter') DEFAULT 'awaiting',
  `user_permission` smallint(5) unsigned DEFAULT NULL,
  `user_createdate` datetime NOT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `permission_id` smallint(5) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_mobile`, `user_email`, `user_pass`, `user_displayname`, `user_status`, `user_permission`, `user_createdate`, `date_modified`, `permission_id`) VALUES
(1, '989357269759', NULL, '$2y$07$9wj8/jDeQKyY0t0IcUf.xOEy98uf6BaSS7Tg28swrKUDxdKzUVfsy', 'Javad Evazzadeh', 'active', 1, '2015-01-25 04:52:07', NULL, NULL),
(11, '989120001111', NULL, '$2y$07$QUTZcP7LhWtVfHGINrwSy.VjV2WQN518Z.v16cRb7xEX.kwKj0l06', 'Test1', 'awaiting', 1, '2015-02-25 02:08:40', NULL, NULL),
(12, '989120002222', NULL, '$2y$07$QT5xKQWR8LxTSgDSmK2Wg.b7pK/6slmmFTTqTPq3GGKlj1OpY4gOC', 'Test2', 'awaiting', 2, '2015-02-25 02:13:26', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `verifications`
--

CREATE TABLE IF NOT EXISTS `verifications` (
`id` smallint(5) unsigned NOT NULL,
  `verification_type` enum('emailsignup','emailchangepass','emailrecovery','mobilesignup','mobilechangepass','mobilerecovery') NOT NULL,
  `verification_value` varchar(50) NOT NULL,
  `verification_code` varchar(32) NOT NULL,
  `verification_url` varchar(100) DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `verification_verified` enum('yes','no') NOT NULL DEFAULT 'no',
  `verification_status` enum('enable','disable','expire') NOT NULL DEFAULT 'enable',
  `verification_createdate` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Triggers `verifications`
--
DELIMITER //
CREATE TRIGGER `verification_AU_outline_update` AFTER UPDATE ON `verifications`
 FOR EACH ROW IF NEW.verification_verified <> OLD.verification_verified THEN
   if new.verification_verified = 'yes' then
       UPDATE users SET user_status = 'active' WHERE id = New.user_id;
   END IF;
END IF
//
DELIMITER ;

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
 ADD PRIMARY KEY (`id`), ADD KEY `attachmentmetas_attachments_id` (`attachment_id`);

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
 ADD PRIMARY KEY (`id`), ADD KEY `attachments_files_id` (`file_id`), ADD KEY `attachments_users_id` (`user_id`);

--
-- Indexes for table `errorlogs`
--
ALTER TABLE `errorlogs`
 ADD PRIMARY KEY (`id`), ADD KEY `errorlogs_users_id` (`user_id`) USING BTREE, ADD KEY `errorlogs_errors_id` (`errorlog_id`) USING BTREE;

--
-- Indexes for table `errors`
--
ALTER TABLE `errors`
 ADD PRIMARY KEY (`id`), ADD KEY `priotity_index` (`error_priority`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `unique_code` (`file_code`) USING BTREE, ADD KEY `index_folder` (`file_folder`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
 ADD PRIMARY KEY (`id`), ADD KEY `status_index` (`notification_status`), ADD KEY `notifications_users_idsender` (`user_idsender`) USING BTREE, ADD KEY `notifications_users_id` (`user_id`) USING BTREE;

--
-- Indexes for table `options`
--
ALTER TABLE `options`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `cat+name+value` (`option_cat`,`option_key`,`option_value`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `slug_unique` (`term_slug`) USING BTREE, ADD UNIQUE KEY `termurl_unique` (`term_url`), ADD KEY `terms_users_id` (`user_id`);

--
-- Indexes for table `termusages`
--
ALTER TABLE `termusages`
 ADD UNIQUE KEY `term+type+object_unique` (`term_id`) USING BTREE, ADD KEY `termusages_attachments_id` (`attachment_id`);

--
-- Indexes for table `userlogs`
--
ALTER TABLE `userlogs`
 ADD PRIMARY KEY (`id`), ADD KEY `priority_index` (`userlog_priority`), ADD KEY `type_index` (`userlog_type`), ADD KEY `userlogs_users_id` (`user_id`) USING BTREE;

--
-- Indexes for table `usermetas`
--
ALTER TABLE `usermetas`
 ADD PRIMARY KEY (`id`), ADD KEY `usermeta_users_id` (`user_id`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `mobile_unique` (`user_mobile`) USING BTREE, ADD UNIQUE KEY `email_unique` (`user_email`) USING BTREE, ADD KEY `users_permissions_id` (`permission_id`);

--
-- Indexes for table `verifications`
--
ALTER TABLE `verifications`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `code_unique` (`verification_url`,`verification_value`) USING BTREE, ADD KEY `verifications_users_id` (`user_id`) USING BTREE;

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
 ADD PRIMARY KEY (`id`), ADD KEY `visitors_users_id` (`user_id`);

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
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `errorlogs`
--
ALTER TABLE `errorlogs`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
MODIFY `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `userlogs`
--
ALTER TABLE `userlogs`
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `usermetas`
--
ALTER TABLE `usermetas`
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=194;
--
-- AUTO_INCREMENT for table `verifications`
--
ALTER TABLE `verifications`
MODIFY `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT;
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
-- Constraints for table `errorlogs`
--
ALTER TABLE `errorlogs`
ADD CONSTRAINT `errorlogs_errors_id` FOREIGN KEY (`errorlog_id`) REFERENCES `errors` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `errorlogs_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
ADD CONSTRAINT `notifications_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `terms`
--
ALTER TABLE `terms`
ADD CONSTRAINT `terms_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `termusages`
--
ALTER TABLE `termusages`
ADD CONSTRAINT `termusages_attachments_id` FOREIGN KEY (`attachment_id`) REFERENCES `attachments` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `termusages_terms_id` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userlogs`
--
ALTER TABLE `userlogs`
ADD CONSTRAINT `userlogs_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `usermetas`
--
ALTER TABLE `usermetas`
ADD CONSTRAINT `usermetas_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `users_permissions_id` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `verifications`
--
ALTER TABLE `verifications`
ADD CONSTRAINT `verifications_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `visitors`
--
ALTER TABLE `visitors`
ADD CONSTRAINT `visitors_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
