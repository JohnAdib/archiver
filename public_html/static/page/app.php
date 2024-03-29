<!DOCTYPE html>
<html>
 <head>
  <meta charset="UTF-8"/>
  <style type="text/css">
   *, *:before, *:after{margin:0;padding:0;outline:none !important;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  	body{background-color: #ddd;text-align: center; font-family: "IranSans", "B Nazanin", sans-serif}
  	h1,h2{margin:50px 20px 20px;}
  	form{margin:20px auto;width:40%}
  	input{padding:7px 20px;background-color:#ddd;min-width: 100px;margin:5px 0}
    input[type="text"]:focus{background-color: #eee}
    input[name="result"]{display:block;width: 100%}
    img{max-height:300px;display:block; margin:0 auto;}
    code{font-family:monospace,monospace;font-size:0.7em;margin: 10px 5%;display:block}
    input.key{width: 30%;}
    input.value{width: 60%;}
  </style>
 </head>

 <body>
  <h1>
  <?php
    if(isset($_GET['app']))
    {
      echo $_GET['app'];
    }
    ?>
  </h1>
  <h3><?php if(isset($_GET['data'])) { echo "Data: ". $_GET['data'];}?></h3>
  <?php
    if(isset($_GET['addr']))
    {
      echo "<code>". $_GET['addr'] .'</code>';
      echo "<code>AuthCode: ". $_GET['authcode'] .'</code>';

      switch ($_GET['ext'])
      {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
          echo "<img src='". $_GET['addr']. "' />";
          break;

        case 'txt':
        case 'xml':
        case 'html':

        default:
          break;
      }
    }
    ?>

  <form method="post" name="analyse">
   <input type="submit" name="analyse" value="Analyse">
   <input type="hidden" name="result" value="<?php echo $_GET['app']; ?>">

   <input type="hidden" name="key1" value="location">
   <input type="hidden" name="value1" value="sea">

   <input type="hidden" name="key2" value="app">
   <input type="hidden" name="value2" value="<?php echo $_GET['app']; ?>">
  </form>


  <form method="get" name="analyse" action="http://files.<?php echo $_SERVER['HTTP_HOST']; ?>/$/result">
   <input type="text" class="key" name="key1" value="location">
   <input type="text" class="value" name="value1" value="sea">

   <input type="text" class="key" name="key2" value="app">
   <input type="text" class="value" name="value2" value="<?php echo $_GET['app']; ?>">

   <input type="text" name="result" value="return custom result! this is text. به فارسی هم میتواند پاسخ دهد!">
   <input type="hidden" name="authcode" value="<?php echo $_GET['authcode']; ?>">
   <input type="submit">
  </form>

  <h2><?php if(isset($_POST['result'])) echo '<hr />'.$_POST['result'];?></h2>
  <h3>Tag1 [
   <?php if(isset($_POST['key1'])) echo $_POST['key1'] .': ';?>
   <?php if(isset($_POST['value1'])) echo $_POST['value1'];?>
   ]
  </h3>

  <h3>Tag2 [
   <?php if(isset($_POST['key2'])) echo $_POST['key2'] .': ';?>
   <?php if(isset($_POST['value2'])) echo $_POST['value2'];?>
   ]
  </h3>


 </body>
</html>
