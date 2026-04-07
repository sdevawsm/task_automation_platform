<?php
  define('HOME', '/public');
  define('LEVEL', '');  // -> vazio ou ../ dependendo da pasta principal
  require_once("vendor/autoload.php");


  use App\Routes;


  //echo parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH) ;
  $route = new Routes;

 ?>
	


  
	
