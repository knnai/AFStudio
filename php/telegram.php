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
$fileName = $_POST['design'];
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


if ($fileName != 'design-default.jpg'){
    $src = $_SERVER['DOCUMENT_ROOT'] . '/img/gallery/'.$fileName;
    $dest = $_SERVER['DOCUMENT_ROOT'] . '/img/tmp/'.$fileName;
    if (!@copy($src, $dest)) {
        $msgs['err'] = 'Что-то пошло не так. Файл не отправлен!';
        echo json_encode($msgs);
    } else {
      $bot_url = "https://api.telegram.org/bot{$token}/";
      $urlForPhoto = $bot_url . "sendPhoto?chat_id=" . $chat_id;
      
      // Дизайн(фото)
      $post_fields = array('chat_id' => $chat_id, 'photo' => new CURLFile(realpath($dest)) );
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_HTTPHEADER, array( "Content-Type:multipart/form-data" ));
      curl_setopt($ch, CURLOPT_URL, $urlForPhoto);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
      $output = curl_exec($ch);
      unlink($dest);
    };
};

//Сбор сообщения
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> <i>".$value."</i>%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {  
  header('Location:/services.html');
} else {
  echo "Error";  
}
?>
