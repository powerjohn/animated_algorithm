<?php
    session_start();

    //the array and its max values
    $myArray = $_SESSION["myArray"];
    $maxValue = 0;
    $maxValuesArray = array();
        for($i=0; $i<sizeof($myArray); $i++){
            if($myArray[$i] > $maxValue){
	 	$maxValue = $myArray[$i];
		$maxValuesArray[] = $maxValue;
            }//end of if
	}//end of for
        //print_r($maxValuesArray);
    //store max val and the array of max values into superglobal SESSION
    $_SESSION["maxValue"] = $maxValue;
    $_SESSION["maxValuesArray"] = $maxValuesArray;

    //process user entered variables from REQUEST superglobal
    //use trim to remove any spaces at the end and beginning
    $values = trim($_REQUEST["values"]);
    //split the array along the given pattern (spaces or commas)
    $userArray = preg_split("/[\s,]+/", $values);
    //store the array into superglobal SESSION
    $_SESSION["userArray"] = $userArray;
    $message_max = '';
    //print_r($userArray);

    //display appropriate messages if user array matches the one in the program
    if($userArray == $maxValuesArray){
        $message_max = 'Well done, you entered the correct numbers!!!<br>';
        $message_max .= "You can now try to find the <a href='skill_test_min.php'>Minimum values</a>.";
    }//if
    //display appropriate messages and correct answer if user array does not match the one in the program
    else{
        $message_max = 'Better luck next time; the values should have been: ';
        for($i=0; $i<sizeof($maxValuesArray); $i++){
            $message_max = $message_max.$maxValuesArray[$i].' ';
        }//end of for
    }//end of else
    //store message into superglobal SESSION
    $_SESSION["message_max"] = $message_max;
    //redirect to skill page
    header("location: skill_test_max.php");
?>

