<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
 require_once "./core/Router.php";
$router = new Router();
$router->route();
 

 