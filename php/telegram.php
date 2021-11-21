<?php

/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

// переменные из нашей формы
$name = $_POST['name'];
$tel = $_POST['tel'];
$date = $_POST['date'];
$time = $_POST['time'];
$services = $_POST['services'];
$comment = $_POST['comment'];
// токен нашего бота из botFather
$token = "2089622181:AAFk57Y_po0T5VQcqK40KXEmk0amC6exGJA";
// $chat_id = "https://api.telegram.org/bot2089622181:AAFk57Y_po0T5VQcqK40KXEmk0amC6exGJA/getUpdates";
$chat_id = "-760609066";
$arr = array(
  'Имя: ' => $name,
  'Телефон: ' => $tel,
  'Дата: ' => $date,
  'Время: ' => $time,
  'Услуги:' => $services,
  'Комментарий: ' => $comment
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> <i>".$value."</i>%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  /*alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');*/
  header('Location:/services.html');
} else {
  echo "Error";
  /*alert('Что-то пошло не так. Попробуйте отправить форму ещё раз.');*/
}
?>
