<?php
require_once('email_config.php');
require('phpmailer/PHPMailer/src/PHPMailerAutoload.php');

//Validate POST input
$message = [];
$output = [
    'success' => null,
    'messages' => []
];

//sanitizing name field
$message['name'] = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
if(empty($message['name'])){
    $output['success'] = false;
    $output['messages'][] = 'missing name key';
}

//validate email field
$message['email'] = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
if(empty($message['email'])){
    $output['success'] = false;
    $output['messages'][] = 'invalid email key';
}

//sanitizing message field
$message['message'] = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
if(empty($message['message'])){
    $output['success'] = false;
    $output['messages'][] = 'missing message key';
}

if($output['success'] !== null) {
    http_response_code(422);
    echo json_encode($output);
    exit();
}

$mail = new PHPMailer;
$mail->SMTPDebug = 3;           // Enable verbose debug output. Change to 0 to disable debugging output.

$mail->isSMTP();                // Set mailer to use SMTP.
$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers.
$mail->SMTPAuth = true;         // Enable SMTP authentication


$mail->Username = EMAIL_USER;   // SMTP username
$mail->Password = EMAIL_PASS;   // SMTP password
$mail->SMTPSecure = 'tls';      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
$mail->Port = 587;              // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = EMAIL_USER; 
$mail->FromName = EMAIL_USERNAME;
$mail->addAddress(EMAIL_TO_ADDRESS, EMAIL_USERNAME);

$mail->addReplyTo($message['email'], $message['name']);

$message['subject'] = $message[;name] . " has sent you a Contact Form message";

$mail->isHTML(true);
$message['message'] = nl2br($message['message']); //convert newline chars to line break html tags
$mail->Body    = $message['message'];
$mail->AltBody = htmlentities($message['message']);

//Attempt email send output result to client
if(!$mail->send()) {
    $output['success'] = false;
    $output['messages'][] = $mail->ErrorInfo;
} else {
    $output['success'] = true;
}
echo json_encode($output);

