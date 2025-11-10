<?php
session_start();

// Настройки
$length = 5;
$characters = 'ABCDEFGHJKLMNPRSTUVWXYZ23456789';
$code = substr(str_shuffle($characters), 0, $length);

// Сохраняем код в сессию
$_SESSION['captcha_code'] = $code;

// Создаём изображение
$width = 130;
$height = 50;
$image = imagecreatetruecolor($width, $height);

// Цвета
$bg = imagecolorallocate($image, 255, 255, 255);
$fg = imagecolorallocate($image, 30, 30, 30);
$noise = imagecolorallocate($image, 200, 200, 200);

imagefilledrectangle($image, 0, 0, $width, $height, $bg);

// Добавим немного шумовых точек
for ($i = 0; $i < 200; $i++) {
    imagesetpixel($image, rand(0, $width), rand(0, $height), $noise);
}

// Текст капчи
$font_size = 5;
$x = 15;
$y = 18;
imagestring($image, $font_size, $x, $y, $code, $fg);

// Выводим картинку
header('Content-Type: image/png');
imagepng($image);
imagedestroy($image);