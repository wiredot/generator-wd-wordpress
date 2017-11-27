<?php

use \DrewM\MailChimp\MailChimp;

class CP_Newsletter {

	public function __construct() {
		add_action( 'wp_ajax_nopriv_wd_newsletter_signup', array( $this, 'newsletter_signup' ) );
		add_action( 'wp_ajax_wd_newsletter_signup', array( $this, 'newsletter_signup' ) );
	}

	public function newsletter_signup() {
		global $wpdb;

		if ( $_POST['fp_form'] ) {
			$container = '.newsletter';
		} else {
			$container = '.newsletter-footer';
		}

		$email = sanitize_email( trim( $_POST['email'] ) );

		$form_errors = array();

		// check if email is not empty and valid
		if ( empty( $email ) || ! is_email( $email ) ) {
			$form_errors['email'] = __cp( 'Enter a valid email addrees', 'newsletter' );
		}

		// if nonce is incorrect stop the script
		if ( ! wp_verify_nonce( $_POST['newsletter_signup'], 'newsletter_signup' ) ) {
			exit;
		}

		if ( empty( $form_errors ) ) {

			$token = md5( uniqid( rand() ) );
			$list_id = getenv( 'MAILCHIMP_LIST' );

			$MailChimp = new MailChimp( getenv( 'MAILCHIMP_API' ) );
			$result = $MailChimp->post(
				"lists/$list_id/members", [
					'email_address' => $email,
					'status'        => 'subscribed',
				]
			);

			$response = array(
				'alert' => array(
					'type' => 'success',
					'title' => __cp( 'Thank you, your email address has been added.', 'newsletter' ),
					'message' => '',
					'container' => $container,
					'animationIn' => 'dissolve',
					'hideAfter' => 4000,
				),
				'reset' => 1,
			);
		} else {
			$response = array(
				'alert' => array(
					'type' => 'error',
					'title' => __cp( 'Oops...', 'newsletter' ),
					'message' => $form_errors['email'],
					'animationIn' => 'dissolve',
					'container' => $container,
					'hideAfter' => 5000,
				),
			);
		}

		$response_json = json_encode( $response );
		header( 'Content-Type: application/json' );
		echo $response_json;
		exit;
	}
}
