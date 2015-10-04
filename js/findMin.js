(function(){ //self invoking function keeps all variables local

    // possible values for the "phase" variable; acting as values to checked against.
    var ASLEEP = "asleep";
    var AWAKE = "awake";//signifies all loaded ready for new search
    var ACTIVE = "active";
    var phase = ASLEEP;

    var text = "";//description of comparisons to be displayed
    var ctx;  // graphic context for drawing on the canvas.
    var width, height;  // width and height of the canvas.

    // measurements used for drawing.
    var boxWidth;
    var xOffset,yOffset1, yOffset2, textFirstRow_y, textSecondRow_y;

    //the array that holds all numerical values;
    //the max value is the first element of the array
    var myArray = new Array();
    var minValue;//added

    //define an object with x and y coordinates as attributes
    var movingElementPosition = { x: -1, y: -1 };
    var boxPosition,movingElement;
    //indicates the passage of time that occurs between each action
    var timeout = null;

    var animationStack = new Array(); //an array holding animation operations
    var finished = false; //when true the whole array has been searched for the max
    var i;//loop variable for controlling repetitions
    var confirmed = false; //allows the comparisons to be performed

///////////////////////////////// FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    //function that displays description of comparisons
    function showComparisons(text) {
        $("#text2").html(text);
    }//end of showComparisons

    //function that displays description of final max value
    function showFinalResult(text) {
        $("#text1").html(text);
    }//end of showFinalResult

    //function that tests whether a number is larger than another in
    function isMin(a) {
        positionComparisonBox(a);
        return (myArray[a] < minValue);
    }//end of isMin

    //function that positions a box around item being currently compared
    function positionComparisonBox(a) {
        boxPosition = a;
    }//end of positionComparisonBox

    //function called whenever the phase needs changing	to set it to a new value
    function setPhase(newPhase) {
        phase = newPhase;

        //if it is ASLEEP or ACTIVE, the start button is disabled
        //-ACTIVE- it is already running
        //--ASLEEP-- not ready to be started

        $("#startBtn").attr("disabled", phase == ACTIVE || phase == ASLEEP );
        $("#newMinBtn").attr("disabled", phase == ACTIVE);
    }//end setPhase

    //refill the array and reset phase so to be ready for a new search for max value.
    function newMinSearch() {
        setPhase(AWAKE);
        confirmed = false;
        boxPosition = -1;
        movingElement = -1;

        for (var i = 0; i < 10; i++){
           myArray[i] = Math.floor(Math.random()*50);
        }//end of for

        //set the min value to zero, which is the first element of the array
        minValue = 51;//added
        text="" ;
        //call draw to display array and perform animation
        draw();
    }//end of newMaxSearch

    //***************************************************************//
    /////// function that draws individual elements of the array///////
    ///**************************************************************//
    ///////////////////////////////////////////////////////////////////
    function setIndividualElement(i) {
        //the x and y coordinates of the individual elements
        var x,y;
        if (i < 10) {
            x = xOffset + (i)*60;
            y = textFirstRow_y ;
         }//end if
         ctx.fillText(myArray[i], x, y);
    }//end of setIndividualElement

    function setMinValue(){
        var x,y;
        x = xOffset + 270;
        y = textSecondRow_y;
        ctx.fillText(minValue, x, y);
    }//end of setMinValue()

    //////////////////////////////////////////////////////////////////////////
    //function to copy the individual element value from the top row which ///
    // is being compared with the max value into the maxValue             ////
    //////////////////////////////////////////////////////////////////////////
    function drawMovingElement() {
        ctx.fillText(movingElement, movingElementPosition.x, movingElementPosition.y);
    }//end of drawMovingElement

    ////////////////////////////////////////////////////////////////////////////
    //function that draws a box around element currently being compared to   ///
    ///max value                                                             ///
    ////////////////////////////////////////////////////////////////////////////
    function drawComparisonBox(boxPos){
       var x,y;
       if (boxPos < 10) {
           x = xOffset + (boxPos)*60;
           y = yOffset1;
       }//end if
       ctx.strokeStyle = 'green';
       ctx.strokeRect(x-7, 25, 60, 70);
    }//end of drawComparisonBox

    //////////////////////////////////////////////////////////////////////////
    //function that draws a box around individual elements of the top row   //
    //////////////////////////////////////////////////////////////////////////
    function drawElementBox(i) {
       var x,y;
       x = xOffset + (i)*60-2;
       y = yOffset1 - 75;
       ctx.strokeStyle = 'black';
       ctx.strokeRect(x, y, boxWidth, boxWidth);
     }//end of drawElementBox

    ///////////////////////////////////////////////////////////////////////////////
    //function that redraws everything on the canvas according to the current /////
    //phase.                                                                  /////
    ///////////////////////////////////////////////////////////////////////////////
    function draw() {
        ctx.clearRect(0, 0, width, height);//first clear the canvas
        for(var i = 0; i < 10; i++){
            setIndividualElement(i);
            drawElementBox(i);
        }//end of for
        ctx.fillStyle = "black";
        setMinValue();
        ctx.strokeRect(xOffset + 250,yOffset2 -75,60,60);
        ctx.fillText("MinValue",xOffset-10 + 255, yOffset2+5);
        if (boxPosition >= 0){
            drawComparisonBox(boxPosition);
        }//end of if

        if (movingElement >= 0){
            drawMovingElement();
        }//end of if
    }//end of draw()

    ///////////////////////////////////////////////////////////////////////////////
    //function that defines the objects to be placed onto the stack              //
    //it defines the coordinates,the operations                                  //
    //and the passage of time between them as the attributes of those objects    //
    ///////////////////////////////////////////////////////////////////////////////
    function elementSelect(destination, source) {
        var xStart, yStart, xFinished, yFinished;
        xFinished = xOffset + 270;
        yFinished = yOffset2 - 50;
        xStart = xOffset + (source)*60;
        yStart = yOffset1 - 50;

        //put actions on the stack
        animationStack.push(  { operation: "select",
                                src: source, x: xStart,
                                y:yStart, delay: 100 });

        for(var i = 30; i >= 0; i--) {
            animationStack.push( { operation: "move",
                                   x: xFinished - ((xFinished-xStart)*i)/30,
                                   y: yFinished - ((yFinished-yStart)*i)/30,
                                   delay: 30} );
        }//end for

        animationStack.push( { operation: "deselect",
                               dest: destination,
                               delay: 200 } );

    }//end of elementSelect

    //function that displays the text and calls the function to place actions on the stack
    function display() {
        if(isMin(i)) {
            text = text + "<br>"+myArray[i] +
                    " is less than the current minValue so minValue takes the value of " +
                     myArray[i] +".";
            showComparisons(text);
            elementSelect(minValue, i);
         }//end of if

        i++;
        if(i==12){
            finished = true;
            text = "Search is finished and the Minimum Value in the array is " + minValue;
            showFinalResult(text);
        }//end of if
    }// end display

    //function to select an operation from the stack to be performed
    function perform(action) {
        switch (action.operation) {
        case "select":
            movingElement = myArray[action.src];
            movingElementPosition.x = action.x;
            movingElementPosition.y = action.y;
            break;
        case "move":
            movingElementPosition.x = action.x;
            movingElementPosition.y = action.y;
            break;
        case "deselect":
            minValue = movingElement;
            movingElement = -1;
            break;
        }//end of switch
    }//end of perform

   //function that performs animation by redrawing  frames at given intervals
   function animate() {  // do one frame of the animation
      timeout = null;
      if(animationStack.length > 0) {
      var action;
      do{
          action = animationStack.shift();
          perform(action);
       } while(animationStack.length > 0 && action.delay == 0);
          timeout = setTimeout(animate, action.delay);
      }//end of if
      else{
        if(!confirmed){
            i = 0;
            confirmed = true;
            finished = false;
            if(phase == ACTIVE){
                timeout = setTimeout(animate,  1000);
            }//end of if(phase active
        }//end of inner if(!confirmed)
        else{
            display();
            if(!finished && phase == ACTIVE){
               timeout = setTimeout(animate,  1000);
            }//end of if
        }//end of else
        //if finished, set phase to ASLEEP
        if(finished){
           setPhase(ASLEEP);
        }//end of if(finished)
     }//end of outer most else
     //when there are no more actions to be performed phase becomes ASLEEP
     if (finished && animationStack.length == 0){
        setPhase(ASLEEP);
     }//end of if(finished && animationStack.length == 0)
     //draw the elements and boxes
     draw();
    }//end of animate

    //function that handles events when "Start" button is pressed
    function start() {
       setPhase(ACTIVE);
       animate();
    }//end of start


    //function that handles events when "New" button is pressed
    function newFind() {
       newMinSearch();
    }//end of newFind

    //function that initialises variables using jQuery
    $(document).ready(function() {
        var canvas = document.getElementById("searchMincanvas"); // A reference to the canvas element.
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
        $("#startMinBtn").on('click',start);
        $("#newMinBtn").on('click',newFind);
        newMinSearch();
    });
})();
