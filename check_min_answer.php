 <?php
    session_start();

    //the array and its min values
    $myArray = $_SESSION["myArray"];				
    $minValue = 51;
    $minValuesArray = array();
        for($i=0; $i<sizeof($myArray); $i++){
            if($myArray[$i] < $minValue){
	 	$minValue = $myArray[$i];
		$minValuesArray[] = $minValue;
            }//end of if
	}//end of for
        //print_r($maxValuesArray);
    //store min val and the array of min values into superglobal SESSION   
    $_SESSION["minValue"] = $minValue;
    $_SESSION["minValuesArray"] = $minValuesArray;

    //process user entered variables from REQUEST superglobal
    //use trim to remove any spaces at the end and beginning
    $values = trim($_REQUEST["values"]);
    //split the array along the given pattern (spaces or commas)
    $userArray = preg_split("/[' ']+/", $values);
    //store the array into superglobal SESSION
    $_SESSION["userArray"] = $userArray;
    $message = '';
    //print_r($userArray);      
   
        //display appropriate messages if user array matches the one in the program
        if($userArray == $minValuesArray){
            $message = "Well done, you entered the correct numbers!!!<br>";
            $message .= "You can now try to find the <a href='skill_test_max.php'>Maximum values</a>.";
        }//end of if
        //display appropriate messages if user array does not match the one in the program
        else{
            $message = "Better luck next time; the values should have been: ";
            for($i=0; $i<sizeof($minValuesArray); $i++){
                $message = $message.$minValuesArray[$i].' ';
            }//end of for
        }//end of else
    //store message into superglobal SESSION
    $_SESSION["message"] = $message;
    //redirect to skill page
    header("location: skill_test_min.php");
?>

