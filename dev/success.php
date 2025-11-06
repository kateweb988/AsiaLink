<?php
header("Content-Type: text/html; charset=utf-8");

// Получаем данные из форм, если они есть
$name   = isset($_POST['name'])   ? htmlspecialchars(trim($_POST['name']))   : '';
$tel    = isset($_POST['tel'])    ? htmlspecialchars(trim($_POST['tel']))    : '';
$email  = isset($_POST['email'])  ? htmlspecialchars(trim($_POST['email']))  : '';
$weight = isset($_POST['weight']) ? htmlspecialchars(trim($_POST['weight'])) : '';
$local  = isset($_POST['local'])  ? htmlspecialchars(trim($_POST['local']))  : '';
$loca   = isset($_POST['loca'])   ? htmlspecialchars(trim($_POST['loca']))   : '';
$nums   = isset($_POST['nums'])   ? htmlspecialchars(trim($_POST['nums']))   : '';
$text   = isset($_POST['text'])   ? htmlspecialchars(trim($_POST['text']))   : '';

$refferer = getenv('HTTP_REFERER');
$date = date("d.m.y");
$time = date("H:i");

$myemail = "request@asi-log.com";
$tema = "Новая заявка с сайта";

// Формируем тело письма
$message_to_myemail = "<html><body>";
$message_to_myemail .= "<h2>Новая заявка с сайта</h2>";
$message_to_myemail .= "<p><b>Дата:</b> $date $time</p>";

if (!empty($name))   $message_to_myemail .= "<p><b>Имя:</b> $name</p>";
if (!empty($tel))    $message_to_myemail .= "<p><b>Телефон:</b> $tel</p>";
if (!empty($email))  $message_to_myemail .= "<p><b>Email:</b> $email</p>";
if (!empty($local))  $message_to_myemail .= "<p><b>Откуда:</b> $local</p>";
if (!empty($loca))   $message_to_myemail .= "<p><b>Куда:</b> $loca</p>";
if (!empty($weight)) $message_to_myemail .= "<p><b>Вес (кг):</b> $weight</p>";
if (!empty($nums))   $message_to_myemail .= "<p><b>Количество мест:</b> $nums</p>";
if (!empty($text))   $message_to_myemail .= "<p><b>Комментарий:</b> $text</p>";

$message_to_myemail .= "<hr>";
$message_to_myemail .= "<p><b>Источник (страница):</b> $refferer</p>";
$message_to_myemail .= "</body></html>";

// Отправляем письмо
$headers  = "From: ASIA <admin@kateweb.ru>\r\n";
$headers .= "Reply-To: admin@kateweb.ru\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";

mail($myemail, $tema, $message_to_myemail, $headers);

// (необязательно) можно вернуть JSON-ответ для AJAX
echo json_encode(["status" => "success"]);
exit;
?>