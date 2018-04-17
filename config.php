<?php
/**
 @ In the name Of Allah
 * The base configurations of the SAMAC.
 * This file has the configurations of MySQL settings and useful core settings
 */

// ** MySQL settings - You can get this info from your web host ** //
 /** The name of the database */
if(!defined('db_name'))
 define("db_name", '__db__');

 /** MySQL database username */
if(!defined('db_user'))
 define("db_user", '__user__');

 /** MySQL database password */
if(!defined('db_pass'))
 define("db_pass", '__pass__');

/**
 * For developers: debugging mode.
 * Default: False
 *
 *
 *
 *
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that in developement condition use DEBUG in the development environments.
 */
define('DEBUG', true);

?>