<?php
header("Content-Type: text/html; charset=utf-8");
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$email = htmlspecialchars($_POST["email"]);
$weight = htmlspecialchars($_POST["weight"]);
$local1 = htmlspecialchars($_POST["local"]);
$local2 = htmlspecialchars($_POST["loca"]);
$nums = htmlspecialchars($_POST["nums"]);


$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "koweb93@gmail.com";

$tema = "Новая заявка";
$message_to_myemail = "
<br><br>
Почта: $email<br>
Имя: $name<br>
Данные: $tel<br>
Вес: $weight<br>
Количество мест: $nums<br>
Откуда: $local<br>
Куда: $loca<br>


Источник (ссылка): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: ASIA <admin@kateweb.ru> \r\n  \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );



?>
