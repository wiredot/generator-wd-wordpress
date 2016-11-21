<?php 

/* ----------- js files -------------- */

$cp_config['js']['jquery'] = array(
	'footer' => true,
	'front' => true,
	'admin' => false,
	'dependencies' => array(),
	'url' => 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js'
);

$cp_config['js']['scripts'] = array(
	'footer' => true,
	'front' => true,
	'admin' => false,
	'dependencies' => array('jquery'),
	'scripts' => array(
		'wdForms' => 'assets/wd-scripts/js/jquery.wd-forms.js',
		'wdAlert' => 'assets/wd-scripts/js/jquery.wd-alerts.js',
		'script' => 'assets/js/script.js'
	)
);