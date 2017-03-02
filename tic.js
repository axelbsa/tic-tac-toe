var current_player = 0;
var x_vals = new Array(9);
var o_vals = new Array(9);

var mate = false;

mate_index = [
    /* Rows */
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    /* Files */
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    /* Diagonal */
    [0, 4, 8],
    [2, 4, 6]
];

$( document ).ready(function() {
    for (i = 0; i < 9; i++) 
    {
        x_vals[i] = 0;
        o_vals[i] = 0;
    }
}); 

function check_mate() {
    // Create array of stupid html shit
    for (let i = 0; i < 9; i++) 
    {
        let value = $('#' + i);
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

    for (let i in mate_index)
    {
        let x_win = true;
        let o_win = true;

        for (let k in mate_index[i])
        {
            let row_value = mate_index[i][k];
            if (x_vals[row_value] == 0)
            {
                x_win = false;
            }
        }

        for (let k in mate_index[i])
        {
            let row_value = mate_index[i][k];
            if (o_vals[row_value] == 0)
            {
                o_win = false;
            }
        }

        if (x_win === true || o_win === true)
        {
            return true;
        }

    }

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
    mate = check_mate();
    current_player++;
});
