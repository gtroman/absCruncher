//Run plugin on relative container
$.fn.absCruncher = function() {

    //Copy Function
    function copyToClipboard(e) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(e).select();
        document.execCommand("copy");
        $temp.remove();
    }

    function copySuccess(e){
        e.append('<span style="font-size:20px;margin:30% auto 0 auto;color:white;display:block;letter-spacing:1px;">COPIED</span>');
        e.css('background-color', 'rgba(255,255,0,.5)');
        e.animate({opacity:0} , 300,function(){
            e.remove();
        })
    }

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
        e.stopPropagation();
        $(this).attr({'data-top':calcOutput.t,'data-left':calcOutput.l})
    });

    //Calculate second point, determine width and height, and 
    this.mouseup(function(e){
        var calcOutput = calcOffsets($(this),e)
        e.stopPropagation();

        //Calculate First Point
        var originalTop = $(this).attr('data-top');
        var originalLeft = $(this).attr('data-left');

        //Calculate Second Point by comparing with first point
        var cssWidth = (calcOutput.l - originalLeft).toFixed(1);
        var cssHeight = (calcOutput.t - originalTop).toFixed(1);


        if(!(cssWidth == 0)){
            //Make Box
            $(this).append('<a class="setPos" style="top: '+originalTop+'%; left: '+originalLeft+'%; width:' +cssWidth+ '%; height:' +cssHeight+ '%;"></a>');
    
        }
    });

    //Click on a box to get position info to copy paste
    $(document).on('click','.setPos', function(e){
        e.preventDefault(); 
        copyToClipboard($(this).attr('style'))
        copySuccess($(this))
        //window.prompt("Copy to clipboard: Ctrl+C, Enter", $(this).attr('style'));
    });
};