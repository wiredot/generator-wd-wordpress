<?php

/* ----------- js files -------------- */

$config['js']['scripts'] = array(
	'footer' => true,
	'front' => true,
	'admin' => false,
	'dependencies' => array( 'jquery' ),
	'localize' => array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
	),
	'files' => array(
		// 'aos' => 'assets/lib/aos/dist/aos.js',
		'flexmenu' => 'assets/lib/flexmenu/flexmenu.js',
		'fancybox' => 'assets/lib/@fancyapps/fancybox/dist/jquery.fancybox.js',
		'fitvids.js' => 'assets/lib/FitVids.js/jquery.fitvids.js',
		'owl.carousel' => 'assets/lib/owl.carousel/dist/owl.carousel.js',
		'spin.js' => 'assets/lib/spin.js/spin.js',
		'svg4everybody' => 'assets/lib/svg4everybody/dist/svg4everybody.js',
		'wdAlert' => 'assets/lib/wd-scripts/dist/jquery.wd-alerts.js',
		'wdForms' => 'assets/lib/wd-scripts/dist/jquery.wd-forms.js',
		'script' => 'assets/js/script.js',
	),
);
