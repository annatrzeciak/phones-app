<?php
error_reporting(0);
// @ini_set('display_errors', 0);
header("Access-Control-Allow-Origin: *");
header('Content-type:application/json');

$form=json_decode(file_get_contents("php://input"));
        // $form=json_decode('
        // {"model":"Acer Liquid Jade 2","screen_diagonal":"","RAM":"","memory":"","battery":"","resolution":[]}');
// $form=array('model'=>'', 'screen_diagonal'=> [6.9,7] );
// var_dump($form->model);
// var_dump($form->screen_diagonal);

$solution=array();
$arrayFromCSV=array();
$arrayFromCSV =  array_map('str_getcsv', file('Data for Test - Frontend Developer Pumox GmbH.csv'));
foreach ($arrayFromCSV as $key => $value){
     $array=explode(';',$value[0]);
//      var_dump($form);
    if($form ){
//       if  ($array[1]!=''){
        //       var_dump( $form['screen_diagonal'][0]);
        // if(strpos(strtolower ($array[0]), $form['model'])!== false){
        //         echo $array[0];
        // }
        // if($form['model']='' )
    if( 
            ($form->model=='' || (strpos(strtolower ($array[0]), strtolower( $form->model))!== false)) &&
            ($form->screen_diagonal==''||
            ((floatval($array[2])>=$form->screen_diagonal[0]) && 
            (floatval($array[2])<=$form->screen_diagonal[1])))&&
            ($form->RAM==''||
            ((intval($array[5])>=$form->RAM[0]) && 
            (intval($array[5])<=$form->RAM[1]))) &&
            ($form->memory==''||
            ((intval($array[6])>=$form->memory[0]) && 
            (intval($array[6])<=$form->memory[1])))
            &&
            ($form->battery==''||
            ((intval($array[7])>=$form->battery[0]) && 
            (intval($array[7])<=$form->battery[1])))&&
            ($form->resolution==[]||
            in_array($array[3], $form->resolution))

            ){
   
//     echo $array[0]. ' cal '.$array[2];
    array_push($solution, $array);
// }
    }
}else{
        array_push($solution, $array);

}}
// var_dump($solution);
$return=json_encode($solution,JSON_FORCE_OBJECT);
 echo $return ;
?>
