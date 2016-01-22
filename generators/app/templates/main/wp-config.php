<?php
require( __DIR__ . '/vendor/autoload.php' );
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

// ===================================================
// Load database info and local development parameters
// ===================================================
define( 'DB_NAME', getenv('DB_DATABASE') );
define( 'DB_USER', getenv('DB_USERNAME') );
define( 'DB_PASSWORD', getenv('DB_PASSWORD') );
define( 'DB_HOST', getenv('DB_HOST') );

// ==============================================================
// Table prefix
// Change this if you have multiple installs in the same database
// ==============================================================
$table_prefix  = getenv('DB_PREFIX');

// ========================
// Custom Content Directory
// ========================
define( 'WP_CONTENT_DIR', __DIR__  . '/public/content' );
define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/content' );

// ================================================
// You almost certainly do not want to change these
// ================================================
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// ==============================================================
// Salts, for security
// Grab these from: https://api.wordpress.org/secret-key/1.1/salt
// ==============================================================
define('AUTH_KEY',         'f0`yczX`rIOc~X5/bhv|y/tGEv!MItwEFBp8Rn0##k6|Q&q|h-h~[WH![G}7sC-h');
define('SECURE_AUTH_KEY',  '*+Gwlu0EgoJ;_PL2>[ZCV`b~-kPNMi+<,EDHur[vY@KryWLb96fS,&b#*.9cH|v9');
define('LOGGED_IN_KEY',    'L+}z2GvZxS^^2b#)*rHB :^o,(;h=+Xc}I52Ak`~>Cj(!+$t Q:<hv))he9ek8=k');
define('NONCE_KEY',        'k90$0In?~0d|KXydGKfY.Bj}SM@+|>?sYO-5MduRO paf|Dm)tf6jgeW:&@K.o/-');
define('AUTH_SALT',        'm%Zxz1B:WY4U,pDIpenhXJ3p6637JC]hx#QWesv|k6|&s&6B5K qp5XyxWMhG[VE');
define('SECURE_AUTH_SALT', '!G-#Xs-j=v{Z0)*7,0n$1-%<9+SRNUAj6E#&cE~RHg*kR3{Px s@9unta8Dk[;5M');
define('LOGGED_IN_SALT',   '.cND pCP|@f_VZ+5^B3iN?314mXG_uh#5k;4RkETBw@ngX#fdIUm,E,IxdV+vyDB');
define('NONCE_SALT',       '&2{p<x--vmp={rNkxc4];Jl;8q7vPf3aLfprv7U-a6w~dzSMIxvqrHj]l/5Zux1O');

// ================================
// Language
// Leave blank for American English
// ================================
define( 'WPLANG', '' );

// ===========
// Hide errors
// ===========

if (getenv('DEBUG')) {
	define( 'WP_DEBUG_DISPLAY', true );
	define('WP_DEBUG', true);
	define('CP_DEV', true);
	define('WP_SITEURL', 'http://'.$_SERVER['HTTP_HOST'].'/wp');
	define('WP_HOME', 'http://'.$_SERVER['HTTP_HOST']);
} else {
	ini_set( 'display_errors', 0 );
	define( 'WP_DEBUG_DISPLAY', false );
	define('WP_DEBUG', false);
	define('CP_DEV', false);
}
