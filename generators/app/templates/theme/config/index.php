<?php 

if ( ! class_exists('CP')) {
	exit('Copernicus Plugin not activated. Please Install and Activate to continue.');
}

CP::header();

CP::view('header.html');

CP::template();

CP::view('footer.html');

CP::footer();