<?php

require( __DIR__ . '/vendor/autoload.php' );
$dotenv = new Dotenv\Dotenv( __DIR__ );
$dotenv->load();

// ===================================================
// Load database info and local development parameters
// ===================================================
define( 'DB_NAME', getenv( 'DB_DATABASE' ) );
define( 'DB_USER', getenv( 'DB_USERNAME' ) );
define( 'DB_PASSWORD', getenv( 'DB_PASSWORD' ) );
define( 'DB_HOST', getenv( 'DB_HOST' ) );

// ==============================================================
// Table prefix
// Change this if you have multiple installs in the same database
// ==============================================================
$table_prefix  = getenv( 'DB_PREFIX' );

// ========================
// Custom Content Directory
// ========================
$protocol = 'on' == $_SERVER['HTTPS'] ? 'https://' : 'http://';

define( 'WP_CONTENT_DIR', __DIR__ . '/public/content' );
define( 'WP_CONTENT_URL', $protocol . $_SERVER['HTTP_HOST'] . '/content' );

// ================================================
// You almost certainly do not want to change these
// ================================================
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// ==============================================================
// Salts, for security
// Grab these from: https://api.wordpress.org/secret-key/1.1/salt
// ==============================================================
define( 'AUTH_KEY', '<%= authKey %>' );
define( 'SECURE_AUTH_KEY', '<%= secureAuthKey %>' );
define( 'LOGGED_IN_KEY', '<%= loggedInKey %>' );
define( 'NONCE_KEY', '<%= nonceKey %>' );
define( 'AUTH_SALT', '<%= authSalt %>' );
define( 'SECURE_AUTH_SALT', '<%= secureAuthSalt %>' );
define( 'LOGGED_IN_SALT', '<%= loggedInSalt %>' );
define( 'NONCE_SALT', '<%= nonceSalt %>' );

// ================================
// Language
// Leave blank for American English
// ================================
define( 'WPLANG', '' );

// ===========
// Hide errors
// ===========

if ( getenv( 'DEBUG' ) ) {
	define( 'WP_DEBUG_DISPLAY', true );
	define( 'WP_DEBUG', true );
	define( 'CP_DEBUG', true );
	define( 'SCRIPT_DEBUG', true );
} else {
	ini_set( 'display_errors', 0 );
	define( 'WP_DEBUG_DISPLAY', false );
	define( 'WP_DEBUG', false );
	define( 'CP_DEBUG', false );
	define( 'SCRIPT_DEBUG', false );
}
