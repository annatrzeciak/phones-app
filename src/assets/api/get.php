<?php
// header("Access-Control-Allow-Origin: *");
header('Content-type:application/json');
$solution=[];
$arrayFromCSV=array();
$arrayFromCSV =  array_map('str_getcsv', file('Data for Test - Frontend Developer Pumox GmbH.csv'));
foreach ($arrayFromCSV as $key => $value){
    $array=explode(';',$value[0]);
    array_push($solution, $array);
}
$return=json_encode($solution,JSON_FORCE_OBJECT);
 echo $return ;
?>