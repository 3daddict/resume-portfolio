<?php

/* Namespace alias. */
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/* Include the Composer generated autoload.php file. */
require_once('./config/email_config.php');
require './autoload.php';

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

/* Create a new PHPMailer object. Passing TRUE to the constructor enables exceptions. */
$mail = new PHPMailer(TRUE);

/* Open the try/catch block. */
try {

/* SMTP parameters. */
   
   /* Tells PHPMailer to use SMTP. */
   $mail->isSMTP();
   /* SMTP server address. */
   $mail->Host = 'smtp.gmail.com';
   $mail->SMTPAuth = TRUE;
   $mail->SMTPSecure = 'tls';
   $mail->Username = EMAIL_USERNAME;
   $mail->Password = EMAIL_PASS;
   $mail->Port = 587;
   
/* Disable some SSL checks. */
   $mail->SMTPOptions = array(
    'ssl' => array(
    'verify_peer' => false,
    'verify_peer_name' => false,
    'allow_self_signed' => true
    )
 );
   /* Set the mail sender. */
   $mail->setFrom(EMAIL_USER, 'Mail Server');

   /* Add a recipient. */
   $mail->addAddress(EMAIL_TO_ADDRESS, 'Michael Salvati');

   /* Set the mail message body. */
   if ($mail->addReplyTo($_POST['email'], $_POST['name'])) {
      $mail->Subject = 'Contact Form Submission';
      //Keep it simple - don't use HTML
      $mail->isHTML(false);
      //Build a simple message body
      $mail->Body = <<<EOT
         Email: {$_POST['email']}
         Name: {$_POST['name']}
         Message: {$_POST['message']}
EOT;
   //Send the message, check for errors
   if (!$mail->send()) {
      //The reason for failing to send will be in $mail->ErrorInfo
      //but you shouldn't display errors to users - process the error, log it on your server.
      $message = 'Sorry, something went wrong. Please try again later.';
      } else {
         $message = 'Message sent! Thanks for contacting us.';
      }
   } else {
      $message = 'Invalid email address, message ignored.';
   }
}
catch (Exception $e)
{
   /* PHPMailer exception. */
   echo $e->errorMessage();
}
catch (\Exception $e)
{
   /* PHP exception (note the backslash to select the global namespace Exception class). */
   echo $e->getMessage();
}