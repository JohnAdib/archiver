<!DOCTYPE html>
<html>
 <head>
  <meta charset="UTF-8"/>
  <style type="text/css">
  	body{background-color: #eee;text-align: center;}
  	h1,h2{margin:100px 20px 20px;}
  	form{margin:20px 10px;}
  	input{padding:10px 30px;background-color:#ddd;}
  </style>
 </head>

 <body>
  <h1>App 1 - Image Proccessing</h1>
  <h2><?php if(isset($_GET['data'])) { echo "Data: ". $_GET['data'];}?></h2>

  <form method="post" name="analyse">
   <input type="submit" name="analyse" value="Analyse">
   <input type="hidden" name="result" value="app1 return custom result!">
  </form>


  <form method="get" name="analyse" action="http://files.<?php echo $_SERVER['HTTP_HOST']; ?>/$/result">  
   <input type="hidden" name="result" value="app1 return custom result!">
   <input type="submit" name="return" value="Return">
  </form>

  <h2><?php if(isset($_POST['result'])) echo $_POST['result'];?></h2>

 </body>

</html>
