<?php

/* ----------- Custom Post Type -------------- */

$cp_config['cpt']['gallery'] = array(
	'settings' => array(
		'active' => true,
		'name' => 'gallery',
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => true,
		'query_var' => true,
		'capability_type' => 'page',
		'hierarchial' => true,
		'rewrite' => array( 'slug' => 'galerie' ),
		'orderby' => 'date',
		'order' => 'DESC',
		'menu_icon' => '',
		'menu_icon_id' => '232',
	),
	'labels' => array(
		'name' => __cp( 'Galleries', 'gallery' ),
		'singular_name' => __cp( 'Gallery', 'gallery' ),
		'add_new' => __cp( 'Add New', 'gallery' ),
		'add_new_item' => __cp( 'Add New Gallery', 'gallery' ),
		'edit_item' => __cp( 'Edit Gallery', 'gallery' ),
		'new_item' => __cp( 'New Gallery', 'gallery' ),
		'view_item' => __cp( 'Show Gallery', 'gallery' ),
		'search_items' => __cp( 'Search Gallery', 'gallery' ),
		'not_found' => __cp( 'Not Found', 'admin' ),
		'not_found_in_trash' => __cp( 'Not Found in Trash', 'admin' ),
		'parent_item_colon' => '',
	),
	'support' => array(
		'title' => true,
		'editor' => true,
		'author' => false,
		'thumbnail' => true,
		'excerpt' => false,
		'trackbacks' => false,
		'custom-fields' => false,
		'comments' => false,
		'revisions' => false,
		'page-attributes' => true,
		'post-formats' => false,
	),
);

/* ----------- Meta Boxes -------------- */

$cp_config['mb']['gallery_mb_1'] = array(
	'active' => true,
	'name' => __cp( 'Galerie', 'gallery' ),
	'post_type' => 'gallery',
	'context' => 'normal',
	'priority' => 'high',
	'fields' => array(
		'images' => array(
			'name' => 'Photo',
			'type' => 'upload',
			'multiple' => true,
			'filetype' => 'image', // image, file, video
			'attributes' => array(
				'autofocus' => false,
				'disabled' => false,
				'required' => false,
				'size' => '1',
			),
			'labels' => array(
				'button' => __cp( 'Add Photos', 'gallery' ),
				'button_window' => __cp( 'Add Photos', 'gallery' ),
				'title_window' => __cp( 'Upload or Choose Images', 'gallery' ),
			),
		),
	),
);

/* ----------- Admin List Views -------------- */

$cp_config['alv'][] = array(
	'settings' => array(
		'active' => true,
		'post_type' => 'gallery',
		'orderby' => 'date',
		'order' => 'DESC',
	),
	'fields' => array(
		'featured_image',
		'title',
		'taxonomy:gallery_cat',
	),
);

/* ----------- Loops -------------- */

$cp_config['loop'][] = array(
	'name' => 'gallery_home',
	'args' => array(
		'post_type' => 'gallery',
		'posts_per_page' => 3,
		'orderby' => 'date',
		'order' => 'DESC',
	),
);

$cp_config['loop'][] = array(
	'name' => 'gallery',
	'args' => array(
		'post_type' => 'gallery',
		'posts_per_page' => -1,
		'orderby' => 'date',
		'order' => 'DESC',
	),
);

/* ----------- Templates -------------- */

$cp_config['template']['gallery'] = array(
	'active' => 'true',
	'post_type' => 'page',
	'name' => __cp( 'Galleries', 'gallery' ),
	'file' => 'gallery.html',
);
