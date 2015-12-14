<!DOCTYPE html>
<html>
 <head>
  <meta charset="UTF-8"/>
  <style type="text/css">
  	body{background-color: #ddd;text-align: center; font-family: "IranSans", "B Nazanin", Tahoma}
  	h1,h2{margin:50px 20px 20px;}
  	form{margin:20px 10px;}
  	input{padding:10px 30px;background-color:#ddd;}
    img{max-height:300px;display:block; margin:0 auto;}
    code{font-family:monospace,monospace;font-size:0.7em;margin: 10px 5%;}
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
      switch (substr($_GET['addr'], -4))
      {
        case '.png':
        case '.jpg':
        case 'jpeg':
        case '.gif':
          echo "<img src='". $_GET['addr']. "' />";
          break;

        case '.txt':
        case '.xml':
        case 'html':

        default:
          break;
      }
    }
    ?>
  
  <form method="post" name="analyse">
   <input type="submit" name="analyse" value="Analyse">
   <input type="hidden" name="result" value="<?php echo $_GET['app']; ?>">

   <input type="hidden" name="tag1" value="location">
   <input type="hidden" name="value1" value="sea">

   <input type="hidden" name="tag2" value="app">
   <input type="hidden" name="value2" value="<?php echo $_GET['app']; ?>">
  </form>


  <form method="get" name="analyse" action="http://files.<?php echo $_SERVER['HTTP_HOST']; ?>/$/result">  
   <input type="hidden" name="tag1" value="location">
   <input type="hidden" name="value1" value="sea">

   <input type="hidden" name="tag2" value="app">
   <input type="hidden" name="value2" value="<?php echo $_GET['app']; ?>">

   <input type="hidden" name="result" value="return custom result! this text is ... به فارسی هم میتواند پاسخ دهد!">
   <input type="submit" name="return">
  </form>

  <h2><?php if(isset($_POST['result'])) echo '<hr />'.$_POST['result'];?></h2>
  <h3>Tag1 [
   <?php if(isset($_POST['tag1'])) echo $_POST['tag1'] .': ';?> 
   <?php if(isset($_POST['value1'])) echo $_POST['value1'];?>
   ]
  </h3>

  <h3>Tag2 [
   <?php if(isset($_POST['tag2'])) echo $_POST['tag2'] .': ';?> 
   <?php if(isset($_POST['value2'])) echo $_POST['value2'];?>
   ]
  </h3>


 </body>
</html>
