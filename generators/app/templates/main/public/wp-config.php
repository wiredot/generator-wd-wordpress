<?php

if ( !defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/wp/' );
}

/** Location of your WordPress configuration. */
require_once(dirname( __DIR__ ) . '/wp-config.php');

// ===================
// Bootstrap WordPress
// ===================
require_once( ABSPATH . 'wp-settings.php' );