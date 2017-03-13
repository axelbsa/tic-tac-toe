var current_player = 0;
var mate = false;
var choices = 5;

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


class Node {

    constructor (d, value) {
        this.value = value;
        this.children = [];
        this.create_children(d);
    }

    create_children(d) {

        if (d < 0) {
            return;
        }

        for (let i = 0; i < choices; i++) {

            // For now, assign a random val if d = 0 otherwise -10000 a lot
            var val = d ? -10000 : Math.floor((Math.random() * 10) + 1);
            var n = new Node(d - 1, val);
            this.children.push(n);
        }
    }
}



// int alphabeta(Node node, int depth, int alpha, int beta, bool maximizing_player)
function alphabeta(node, depth, alpha, beta, maximizing_player)
{
    if ((depth == 0) || (node.children.length < 1))
    {
        //Evaluate() or return value
        return node.value;
    }

    if (maximizing_player)
    {
        var v = -maxsize;
        //for each (let child in node.children)
        for (var i = 0; i < node.children.length; i++)
        {
            var child = node.children[i];
            v = max(v, alphabeta(child, depth - 1, alpha, beta, false));
            alpha = max(alpha, v);
            if (beta <= alpha)
            {
                break;
            }
        }
        return v;
    }
    else
    {
        var v = +maxsize;
        //foreach(Node child; node.children)
        for (var i = 0; i < node.children.length; i++)
        {
            var child = node.children[i];
            v = min(v, alphabeta(child, depth - 1, alpha, beta, true));
            beta = min(beta, v);
            if (beta <= alpha)
            {
                break;
            }
        }
        return v;
    }
}


function move_generator() {

    // Finds all the moves the AI can do
    let values = get_board();
    let board  = new Array(9);

    for (let i = 0; i < values['o_vals'].length; i++) 
    {
        x_val = values['x_vals'][i];
        o_val = values['o_vals'][i];
        board[i] = x_val | o_val;
    }

    console.log(board);

}


function get_board() {
    var x_vals = new Array(9);
    var o_vals = new Array(9);

    for (i = 0; i < 9; i++) 
    {
        x_vals[i] = 0;
        o_vals[i] = 0;
    }

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

    return {
        'check_mate': check_mate(o_vals, x_vals),
        'o_vals': o_vals,
        'x_vals': x_vals
    };
}


function check_mate(o_vals, x_vals) {

    //console.log(x_vals);
    //console.log(o_vals);

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
            console.log("Found a winner");
            return true;
        }

    }

    return false;
}


$(".box").click(function() {
    var _id = this.id
    var cross = '<span class="icon-cross"></span>';
    var circle = '<span class="icon-radio-unchecked"></span>';

    // Checks if square is occupied or game is over
    if (this.children.length > 0 || mate === true)
    {
        if (mate === true) 
        {
            console.log('Game Over');
        }

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
    mate = get_board().check_mate;
    move_generator();
    current_player++;

    // Test Node init
    var fd = new Node(1);
    console.log(fd);
});
