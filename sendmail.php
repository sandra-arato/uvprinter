<?php

date_default_timezone_set('Etc/UTC');

require 'PHPMailer/PHPMailerAutoload.php';
//Creating PHPMailer object and setting properties
$mail = new PHPMailer();

$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;

$mail->Debugoutput = 'html';
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;

//Email account settings
$mail->Username = "uvprinter.hu@gmail.com";
$mail->Password = "********";
$mail->setFrom('uvprinter.hu@gmail.com', 'Roland LEF-20');

//Email message settings
$mail->CharSet = 'UTF-8';
$mail->addAddress('edit@vinylgrafik.hu', 'Edit Gjurova');
$mail->addCC('gergo.palfi@vinylgrafik.hu', 'Gergo Palfi');
$mail->addCC('ernest@vinylgrafik.hu', 'Erno Szenti');
$mail->Subject = $_POST['name'] . ' üzenetett küldött';

//Message text
$mail->Body = '<h1>Új üzeneted érkezett!</h1>'
	. 'Az üzenet feladója: ' . $_POST['name'] . '<br/>'
	. 'Telefonszám: ' . $_POST['phone'] . '<br/>'
	. 'Email: ' . $_POST['email'] . '<br/>'
	. 'Cégnév: ' . $_POST['company'] . '<br/>'
	. '<h3>' . $_POST['message-text'] . '</h3>'
	. 'A válaszhoz egyszerűen használd az email-fiókod Válasz funkcióját!';
//Alternative text for fallback
$mail->AltBody = 'Új üzenete érkezett!'
	. "\n"
	. 'Az üzenet feladója: ' . $_POST['name']
	. "\n"
	. 'Telefonszám: ' . $_POST['phone']
	. "\n"
	. 'Email: ' . $_POST['email']
	. "\n"
	. 'Cégnév: ' . $_POST['company']
	. "\n"
	. 'Üzenet: ' . $_POST['message-text']
	. "\n"
	. 'A válaszhoz egyszerűen használd az email-fiókod Válasz funkcióját!';

//Set an reply-to address based on sender
$mail->addReplyTo($_POST['email'], $_POST['name']);

//Send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
?>