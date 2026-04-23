<?php 
header('Access-Control-Allow-Origin: *');

// rea local json file and return it

echo file_get_contents('content.json');