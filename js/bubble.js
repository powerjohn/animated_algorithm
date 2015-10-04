(function(){ //self invoking function keeps all variables local

    var ASLEEP = "asleep";
    var AWAKE = "awake";//signifies all loaded ready for new search
    var ACTIVE = "active";
    var phase = ASLEEP;

    var text = "";//description of comparisons to be displayed
    var ctx;  // graphic context for drawing on the canvas.
    var width, height;  // width and height of the canvas.

    var boxWidth;
    var xOffset,yOffset1, yOffset2, textFirstRow_y, textSecondRow_y;

    var myArray = new Array(11);

    var movingElementPosition = {x: -1, y: -1};
    var movingElement, boxPosition;
    var selection;
    var size;
    var arrayLength;

    var timeout;
    var speed;
    var interval;
    var interval2;
    var i, j;

    var finished = false;
    var confirmed = false;
    var animationStack = new Array();
    
    ///////////////////////////// FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    function setPhase(newPhase) {
       phase = newPhase;
       $("#startBubbleBtn").attr("disabled", phase == ACTIVE || phase == ASLEEP );
       $("#bubbleSelection").attr("disabled", phase == ACTIVE || phase == ASLEEP);
       $("#sizeSelection").attr("disabled", phase == ACTIVE || phase == ASLEEP);
       $("#speed").attr("disabled", phase == ACTIVE || phase == ASLEEP);
       $("#newBubbleBtn").attr("disabled", phase == ACTIVE);
    }//end setPhase
    //
    //function that displays description of comparisons
    function showComparisons(text) {
       $("#bubbleText2").html(text);
    }//end of showComparisons

    //function that displays description of final max value
    function showFinalResult(text) {
        $("#bubbleText1").html(text);
    }//end of showFinalResult
    //
    //function that positions a box around item being currently compared
    function positionComparisonBox(a) {
        boxPosition = a;
    }//end of positionComparisonBox

    //function that displays a new bubble sort
    function newBubbleSort(){
        confirmed = false;
        movingElement=-1;
        boxPosition=-1;
        myArray[0]='';
        var i;
        for(i=1; i<myArray.length; i++){
            myArray[i]=Math.ceil(Math.random()*50);
         }//end for
         setPhase(AWAKE);
         draw();
    }// end of 

    //function that returns true if element a is greater than element b
    function isMax(a, b){
        positionComparisonBox(a);
        return myArray[a] > myArray[b];
    }//end isMax()

    //function that returns true if element a is smaller than element b
    function isMin(a, b){
	positionComparisonBox(a);
	return myArray[a] < myArray[b];
    }//end isMin()

    //function that draws individual elements of array 
    //including elements from index 1 to index arrayLength -1
    function setIndividualElement(i) {
        var x,y;
        if (i>0 && i <= arrayLength) {
            x = xOffset + (i-1)*60;//added
            y = textFirstRow_y ;
         }//end if
            ctx.fillText(myArray[i], x, y);
     }//end of setIndividualElement
     
     //function that draws the tempValue as element at index 0
     function setTempValue(){
         var x,y;
         x = 278;
         y = textSecondRow_y;
         ctx.fillText(myArray[0], x, y);
     }//end setTempValue

     //function that draws the moving element based on its x and y coordinated of its position
     function drawMovingElement() {
            ctx.fillText(movingElement, movingElementPosition.x, movingElementPosition.y);
     }//end drawMovingElement()

     //function that draws a box around the 2 consecutive elements being compared
     function drawComparisonBox(boxPos){
         var x,y;
         if(boxPos < arrayLength) {
	     x = xOffset + (boxPos-1)*60;
             y = yOffset1;
          }//end if
          ctx.strokeStyle = 'green';
          ctx.strokeRect(x-7, 25, 120, 70);
      }//end of drawComparisonBox
      
      //function that draws a box around each element 
     function drawElementBox(i) {
         var x,y;
         x = xOffset + (i-1)*60-2;
         y = yOffset1 - 75;
         ctx.strokeStyle = 'black';
         ctx.strokeRect(x, y, boxWidth, boxWidth);
      }//end of drawElementBox
     
     //function that invokes all the other functions to display/redisplay elements
     //after the canvas has been cleared
     function draw() {
         var i;
         ctx.clearRect(0, 0, width, height);
         for( i= 0; i < arrayLength; i++){//added
             setIndividualElement(i);
             drawElementBox(i);
         }//end for

         //redraw the temp value, its box and its description
         ctx.fillStyle = "black";
         setTempValue();
         ctx.strokeRect(xOffset + 250,yOffset2 -75,60,60);
         ctx.fillText("TempValue",xOffset-10 + 255, yOffset2+5);

         if(movingElement>-1){
             drawMovingElement();
         }//end if

         if(boxPosition > 0){//added
             drawComparisonBox(boxPosition);
         }//end if
      }//end of draw

    //function that defines the actions to be placced in the stack
    //the x and y start and finish coordinates are attributes of actions
    //defined as objects
    function elementSelect(destination, source) {
        var xStart, yStart, xFinished, yFinished;

        if(source == 0){
            xStart = xOffset + 270;
            yStart = yOffset2 - 50;
        }else if(source>0 && source <= arrayLength){
            xStart = xOffset + (source-1)*60;
            yStart = yOffset1 - 50;
        }//end if
        if(destination == 0){
            xFinished = xOffset + 270;
            yFinished = yOffset2 - 50;
        } else if(destination > 0 && destination <=arrayLength){
             xFinished = xOffset + (destination-1)*60;
             yFinished = yOffset1 - 50;
        }//end if

         //put actions on the stack
         animationStack.push({operation: "select",
                              src: source, x: xStart, y:yStart,
                              delay: 100});

	 var i;
         for( i= 0; i < 30; i++) {
            animationStack.push({operation: "move",
                                 x: xStart + Math.round(((xFinished-xStart)*i)/30),
            			 y: yStart + Math.round(((yFinished-yStart)*i)/30),
            			 delay: interval2});
          }//end for

          animationStack.push({operation: "deselect",
                               dest: destination,
                               delay: 100});
          //console.log("dest: " + destination + " ");
     }//end of elementSelect

     //function that displays text and animation as it ocurrs
     //given the coordinates defined in the action
    function display(){       
        selection = $("#bubbleSelection").val();
        if(selection == "1"){//ascending
           if(i==j){//when the inner loop terminates on each iteration of the outer loop
                positionComparisonBox(1);
                if(j==2){//the outer loop has completed
                    finished = true;
                    text = "Sorting is finished and the Array is in Ascending order";
                    showFinalResult(text);
                     showComparisons(" ");
                 }//end of if
                 else{//if it hasn't reset i =0 and decrement j
                      i = 0;
                      j--;
                      showComparisons(" ");
                      showFinalResult("");
                 }//end else
            }//end if
            else if(isMax(i, i+1)){
                  text = " ";
                  text = text + "<br>"+myArray[i] +
			" is greater than " + myArray[i+1] + "<br> so " +
                        myArray[i] + " is copied to the tempValue,<br> " +
                        myArray[i+1] + " is copied to myArray[i] <br>and " +
                        myArray[i] + " is copied to myArray[i+1].";
                  showComparisons(text);
                  showFinalResult("");
                  elementSelect(0, i);
                  elementSelect(i, i+1);
                  elementSelect(i+1, 0);
             }//end if
             i++;
        }//end of outer most if
        
        //descending
        else if(selection == "2"){
            if(i==j){//when the inner loop terminates on each iteration of the outer loop
                positionComparisonBox(1);
                //console.log("i==j");
                if(j==2){//the outer loop has completed
                    //console.log("j==2");
                    finished = true;
                    text = "Sorting is finished and the Array is in Descending order";
                    showFinalResult(text);
                }//end of if
                else {//if it hasn't reset i =0 and decrement j
                    i = 0;
                    j--;
                    showComparisons(" ");
                    showFinalResult("");
                }//end else
            }//end if
            else if(isMin(i, i+1)) {
                text = " ";
                text = text + "<br>"+myArray[i] +
			" is smaller than " + myArray[i+1] + "<br> so " +
                          myArray[i] + " is copied to the tempValue,<br> " +
                          myArray[i+1] + " is copied to myArray[i] <br>and " +
                          myArray[i] + " is copied to myArray[i+1].";
                showComparisons(text);
                showFinalResult("");
                elementSelect(0, i);
                //console.log(tempValue);
                elementSelect(i, i+1);
                //console.log(myArray[i]);
                elementSelect(i+1, 0);
                //console.log(myArray[i+1]);
            }//end else
            i++;
        }//end of outer most else if*/
    }// end display
    
    //function that performs the actual select, move and deselect based on their
    //coordinates as attributes
    function perform(action){
        switch (action.operation) {
            case "select":
                   movingElement = myArray[action.src];
                    //console.log("selected: " + myArray[action.src]);
                    //myArray[action.src] = -1;
                    movingElementPosition.x = action.x;
                    movingElementPosition.y = action.y;
                    break;
             case "move":
                    movingElementPosition.x = action.x;
                    movingElementPosition.y = action.y;
                    break;
             case "deselect":
                    //myArray[action.dest] = movingElement;
                     myArray[action.dest] = movingElement;
                    //console.log(" movingElement is now: "+myArray[action.dest]);
                    movingElement =-1;
                    break;
        }//end of switch
    }//end of perform

    //function that creates animation by redrawing the canvas at given intervals
    //while actions are removed from the stack
    function animate() {  // do one frame of the animation
        timeout = null;
        if (animationStack.length > 0) {
            var action;
            //while there are actions in the stack remove them and perform them
            do {
                action = animationStack.shift();
                perform(action);
            } while (animationStack.length > 0 && action.delay == 0);
            //set the timeout interval to that specified by the operation
            timeout = setTimeout(animate, action.delay);
        }//end of if
        else{
            if (!confirmed){
                i = 0;
                j= arrayLength-1;
                confirmed = true;
                finished = false;
                if (phase == ACTIVE){
                    timeout = setTimeout(animate,  interval);                   
                }//end of inner most if
            }//end of inner if
            else {
                display();
                if (!finished && phase == ACTIVE){
                    timeout = setTimeout(animate,  interval);
                }//end of if
            }//end of else
            // if finished, set phase to ASLEEP
            if (finished){
                setPhase(ASLEEP);
            }//end of if
        }//end of outer most else
        //when there are no more actions to be performed phase becomes ASLEEP
        if (finished && animationStack.length == 0){
            setPhase(ASLEEP);
        }//end of if*/
        draw();
    }//end of animate

    //function that handles events when "Start" button is pressed
    function start() {
        selection = $("#bubbleSelection").val();        
	if(selection == "1"){
            myArray[0]=0;
	}//end if
	else if(selection == "2"){
            myArray[0] = 51;
        }//end if
        size = $("#sizeSelection").val();
        if(size == "1"){
            arrayLength = 11;
	}//end if
	else if(size == "2"){
            arrayLength = 6;
        }//end if
        speed = $("#speed").val();
        if(speed == "1"){
            interval = 1500;
            interval2 = 30;
	}//end if
	else if(speed == "2"){
            interval = 1000;
            interval2 = 20;
        }//end if
	else if(speed == "3"){
            interval = 500;
            interval2 = 10;
        }//end if
       	setPhase(ACTIVE);
       	animate();
    }//end of start

    //function that handles events when "New" button is pressed
    function newFind() {
       newBubbleSort();
    }//end of newFind

    //function that initialises variables using jQuery
    $(document).ready(function() {
        var canvas = document.getElementById("sortBubbleCanvas"); // A reference to the canvas element.
        ctx = canvas.getContext("2d");
        ctx.font = "bold 15pt georgia";
        width = canvas.width;
        height = canvas.height;

        boxWidth =  50;
        xOffset = 8;
        yOffset1 = 110;
        yOffset2 = 234;
        textFirstRow_y = 60;
        textSecondRow_y = 184;       
        
        $("#startBubbleBtn").on('click',start);
        $("#newBubbleBtn").on('click',newFind);
        
        newBubbleSort();
    });
})();