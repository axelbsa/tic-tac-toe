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

    for (i = 0; i < 9; i++)
    {
        var file = i / 3;
        var rank = i % 3;

        // Check all rows
        for (j = file; j < j + 3; j++ )
        {
        
        }

    }
    
    // Very naive!!
    /*
    for (i = 0; i < 9; i++)
    {

        if (i === 0)
        {
            var 0_pot_mate = true;
            for (i = 0; i < 3; i++)
            {
                if (i !== 0)
                {
                    0_pot_mate = false;
                }
            }
        }
        else if (i === 1)
        {
            for (i = 0; i < 9; i++)
            {
            }
        }
        else if (i === 2)
        {
            for (i = 0; i < 9; i++)
            {
            }
        }
    }
    */

    console.log(x_vals);
    console.log(o_vals);

    return false;
}

$(".box").click(function() {
    var _id = this.id
    var cross = '<span class="icon-cross"></span>';
    var circle = '<span class="icon-radio-unchecked"></span>';

    if (this.children.length > 0 || mate === true)
    {
        console.log('Its empty');
        return;
    }
    
    if (~current_player%2)
    {
        // X turn
        $(this).append(cross);
    }
    else
    {
        // O turn
        $(this).append(circle);
    }

    // Check for mate
    // mate = check_mate();
    current_player++;

    console.log(this.children);

    return false;
})

function render(row) {

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
