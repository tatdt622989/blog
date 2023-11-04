<?php 
header('Access-Control-Allow-Origin: *');

// read local json file and return it

echo file_get_contents('data.json');