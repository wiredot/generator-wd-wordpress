<?php

define( 'SVG_URL', get_stylesheet_directory_uri() . '/assets/svg/svg.svg' );

$config['theme']['textdomain'] = array(
	'domain' => '<%= themeLangDomain %>',
	'path' => get_template_directory() . '/languages',
);

$config['theme']['support'] = array(
	'automatic-feed-links' => true,
	'title-tag' => true,
	'post-thumbnails' => true,
	'html5' => array(
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	),
	'custom-header' => array(
		'width' => 1960,
		'height' => 800,
		'flex-height' => true,
	),
	'custom-logo' => array(
		'width'       => 250,
		'height'      => 250,
		'flex-width'  => true,
	),
	'gutenberg' => array(
		'wide-images' => true,
		'colors' => array(
			'#ffffff',
			'#000000',
			'#cccccc',
		),
	),
);
