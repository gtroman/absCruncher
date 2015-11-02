//Run plugin on relative container
$.fn.absCruncher = function() {

	//Calulate Positions
	function calcOffsets(obj,e){
        var offset = obj.offset();

        e.preventDefault(); 

        leftpos =  e.pageX - offset.left;
        toppos = e.pageY - offset.top;

        var height = obj.innerHeight();
        var width = obj.width();

        var offsetLeft = (leftpos / width * 100).toFixed(1);
        var offsetTop = (toppos / height * 100).toFixed(1);

        return {l:offsetLeft,t:offsetTop}
	};

	//Prevent click function
	$('a' , this).on('click',function(e){
        e.preventDefault(); 
	});

	//Calculate first point
    this.mousedown(function(e){
        var calcOutput = calcOffsets($(this),e)
        console.log(event.type)
        $(this).attr({'data-top':calcOutput.t,'data-left':calcOutput.l})
    });

    //Calculate second point, determine width and height, and 
    this.mouseup(function(e){
        var calcOutput = calcOffsets($(this),e)

        //Calculate First Point
        var originalTop = $(this).attr('data-top');
        var originalLeft = $(this).attr('data-left');

        //Calculate Second Point by comparing with first point
        var cssWidth = (calcOutput.l - originalLeft).toFixed(1);
        var cssHeight = (calcOutput.t - originalTop).toFixed(1);

        //Make Box
        $(this).append('<a class="setPos" style="top: '+originalTop+'%; left: '+originalLeft+'%; width:' +cssWidth+ '%; height:' +cssHeight+ '%;"></a>')
    });

    //Click on a box to get position info to copy paste
	$(document).on('click','.setPos', function(e){
        e.preventDefault(); 
        window.prompt("Copy to clipboard: Ctrl+C, Enter", $(this).attr('style'));
	});
};