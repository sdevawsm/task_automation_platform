<?php
  define('HOME', '/public');

  require_once("../vendor/autoload.php");

  use \App\Routes;

  if(isset($_SESSION['user'])){
    echo $_SESSION['user'];
  }

  //echo str_replace("", "", parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH ) );

  $routes =  new Routes;
 ?>
	
	
