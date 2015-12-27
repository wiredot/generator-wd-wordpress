<?php

/* ----------- wp theme support ----------- */

$cp_config['theme_support']['menu'] = true;
$cp_config['theme_support']['post_thumbnail'] = true;
$cp_config['theme_support']['automatic_feed_links'] = false;

/* ----------- cleanup -------------- */

$cp_config['cleanup']['meta']['generator'] = false; // Display the XHTML generator that is generated on the wp_head hook, WP version
$cp_config['cleanup']['meta']['rsd'] = false; // Display the link to the Really Simple Discovery service endpoint, EditURI link
$cp_config['cleanup']['meta']['wlwmanifest'] = false; // // Display the link to the Windows Live Writer manifest file.
$cp_config['cleanup']['meta']['index_rel'] = false; // index link
$cp_config['cleanup']['meta']['feed_links_extra'] = false; // Display the links to the extra feeds such as category feeds
$cp_config['cleanup']['meta']['feed_links'] = false; // Display the links to the general feeds: Post and Comment Feed
$cp_config['cleanup']['meta']['parent_post_rel'] = false; // prev link
$cp_config['cleanup']['meta']['start_post_rel'] = false; // start link
$cp_config['cleanup']['meta']['adjacent_posts_rel'] = false; // Display relational links for the posts adjacent to the current post.

$cp_config['cleanup']['js']['l10n'] = false; 
$cp_config['cleanup']['admin']['bar'] = false;


/* ----------- css files -------------- */

$cp_config['css'][] = array(
	'name' => 'style',
	'url' => '',
	'filename' => 'static/css/style.css',
	'media' => 'all',
	'front' => true,
	'admin' => false,
	'dependencies' => array(),
	'condition' => false, // lt IE 9
	'version' => ''
);


/* ----------- js files -------------- */

$cp_config['js'][] = array(
	'name' => 'jquery',
	'url' => 'http://ajax.googleapis.com/ajax/libs',
	'filename' => 'jquery/1.10.2/jquery.min.js',
	'footer' => true,
	'front' => true,
	'admin' => false,
	'dependencies' => array(),
	'version' => false
);

$cp_config['js'][] = array(
	'name' => 'script',
	'url' => '',
	'filename' => 'static/js/script.js',
	'footer' => true,
	'front' => true,
	'admin' => false,
	'dependencies' => array('jquery'),
	'version' => '0.1.0'
);


/* ----------- Languages -------------- */

$cp_config['language'][] = array(
	'name' => 'english',
	'short_name' => 'en',
	'status' => 1,
	'code' => 'en',
	'iso' => 'en_US',
	'postmeta_suffix' => '',
	'default' => 1
);
