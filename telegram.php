<?php
// токен нашего бота из botFather
$token = "2089622181:AAFk57Y_po0T5VQcqK40KXEmk0amC6exGJA";
$chat_id = "-760609066";

//Тело сообщения
$body = "";
if (trim(!empty($_POST['formName']))){
  $body .= '<b>'.$_POST['formName'].'</b>%0A';
};

if (trim(!empty($_POST['name']))){
  $body .= "<b>Имя: </b>".$_POST['name']."%0A";
};
if (trim(!empty($_POST['tel']))){
  $body .= "<b>Телефон: </b>".$_POST['tel']."%0A";
};
if (trim(!empty($_POST['date']))){
  $body .= "<b>Дата: </b>".$_POST['date']."%0A";
};
if (trim(!empty($_POST['time']))){
  $body .= "<b>Время: </b>".$_POST['time']."%0A";
};
if (trim(!empty($_POST['services']))){
  $body .= "<b>Услуги: </b>%0A".$_POST['services']."%0A";
};
if (trim(!empty($_POST['comment']))){
  $body .= "<b>Комментарий: </b>".$_POST['comment']."%0A";
};
if (trim(!empty($_POST['question']))){
  $body .= "<b>Вопрос:  </b>".$_POST['question']."%0A";
};
if (trim(!empty($_POST['totalSum']))){
  $body .= "<b>Сумма заказа:</b> от ".$_POST['totalSum']." грн.%0A";
};

//Выбранный дизайн
if (!empty($_POST['design'])){
  $src = $_SERVER['DOCUMENT_ROOT'] . '/img/gallery/'.$_POST['design'];
  $dest = $_SERVER['DOCUMENT_ROOT'] . '/tmp/'.$_POST['design'];

  if (!copy($src, $dest)) {
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

//Дизайн - акция
if (!empty($_FILES['userDesign']['tmp_name'])){
  $dest =__DIR__."/tmp/".$_FILES['userDesign']['name'];  
  if (!copy($_FILES['userDesign']['tmp_name'], $dest)) {
      $msgs['err'] = 'Что-то пошло не так. Файл не отправлен!';      
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

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$body}","r");

if ($sendToTelegram) {  
  header('Location:/');
} else {
  echo "Error";  
}
?>
