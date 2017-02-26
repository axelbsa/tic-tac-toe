var current_player = 0;
var x_vals = new Array(9);
var o_vals = new Array(9);

var mate = false;

$( document ).ready(function() {
    for (i = 0; i < 9; i++) 
    {
        x_vals[i] = 0;
        o_vals[i] = 0;
    }
}); 

function check_mate() {
    
    // Create array of stupid html shit
    for (i = 0; i < 9; i++) 
    {
        var value = $('#' + i);
        if (value.html())
        {   
            if (value.html().search(/icon-cross/) != -1)
            {
                x_vals[i] = 1;
            }
            else
            {
                o_vals[i] = 1;
            }
        }
    }

    console.log(x_vals);
    console.log(o_vals);

    return false;
}

function render(row) {
    var cross = '<span class="icon-cross"></span>';
    var circle = '<span class="icon-radio-unchecked"></span>';

    var row_id = $('#' + row);
    //console.log(row_id.html());

    if (row_id.html().length > 0 || mate === true)
    {
        return;
    }

    if (~current_player%2)
    {
        // X turn
        row_id.append(cross);
    }
    else
    {
        // O turn
        row_id.append(circle);
    }

    // Check for mate
    mate = check_mate();
    current_player++;
    return;
}
