/*
 * The only person pressing squares are human player
 * For now, human player always starts.

   For each time someone presses a square make a tree of all possible game states.
 * Make a list over places to put values V.

function create_children(current_board):
   list_possibilities V =: get_open_squares(current_board)
   For each of values V:
      if check_mate = true:
         if bot_winner = true:
            node.value = 1000000
         if huma_winner = true:
            node.value = -1000000
         return
      new_board =: place_value_on_board(V)
      create_children(new_board)

*/

var current_player = 0;
var mate = false;
var maxsize = 100000
var max_depth = 3;
var total = 0;

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

class Board {

    constructor() {
        this.x_vals = [];
        this.o_vals = [];
        this.board = new Array(9);
        this.mate = false;
        this.zero_board();
    }

    open_positions()
    {
        let _map = [];
        for (let i = 0; i < this.x_vals.length; i++) 
        {
            if ((this.x_vals | this.o_vals) == 0)
            {
                _map.push(i);
            }
        }
        return _map;
    }

    zero_board()
    {
        for (var i = 0; i < this.board.length; i++ )
        {
            this.board[i] = 0;
        }
    }

    get_board_from_dom() 
    {
        let board = get_board();
        this.x_vals = board.x_vals;
        this.o_vals = board.o_vals;
    }

    set_new_position(player, position)
    {
        this.board[position] = player;

        if (player == 'X'){
            this.x_vals[position] = 1
        }
        if (player == 'O') {
            this.o_vals[position] = 1
        }

    }

    print_board()
    {
        for (let i = 0; i < this.board.length; i++)
        {
            if (i % 3 == 0) {
                console.log();
            }
            console.log(this.board[i]);
        }
    }

    check_for_mate() 
    {
        this.mate = check_mate(this.o_vals, this.x_vals);
        return this.mate
    }
}


class Node {

    constructor(current_depth, board) {
        this.value = null;
        this.children = [];
        this.create_children_2(current_depth, board);
    }

    create_children_2(current_depth, current_board) {

        //console.log(current_board);

        if (current_depth < 0) {
            return;
        }
        // XXX useless, better baord handling
        //var index_values = get_open_squares(current_board);
        //second iteration fails in move_gen becuase mangled board data

        // Made up vars
        let check_mate = false;
        let bot_winner = true;
        let huma_winner = false;

        let open_pos = current_board.open_positions();
        console.log(open_pos);

        for (var i = 0; i < open_pos.length; i++) {
            if (check_mate = true)
                if (bot_winner = true)
                    this.value = 1000000
                if (huma_winner = true)
                    this.value = -1000000
                //return

            //make_move(index_values[i]); // Just set the value in the array
            let player = ~current_player%2 ? 'X' : 'O';
            current_board.set_new_position(player, open_pos[i]);
            console.log("Making babies: " + current_depth);
            let n = new Node(current_depth-1, current_board);
            this.children.push(n);
            total += 1
        }
    }

    create_children(d) {

        if (d < 0) {
            return;
        }

        for (let i = 0; i < choices; i++) {

            // For now, assign a random val if d = 0 otherwise -10000 a lot
            var val = d ? -maxsize : Math.floor((Math.random() * 10) + 1);
            var n = new Node(d - 1, val);
            this.children.push(n);
        }
    }
}


function get_open_squares(current_board) {
    var open_squares = [];

    for (var i = 0; i < current_board.length; i++ ) {
        if (current_board[i] == 0)
            open_squares.push(i)
    }

    return open_squares
}

function move_generator(values=false) {

    if (!values) {
        var values = get_board();
    }

    // Finds all the moves the AI can do
    let board  = new Array();

    for (let i = 0; i < values['o_vals'].length; i++) 
    {
        x_val = values['x_vals'][i];
        o_val = values['o_vals'][i];
        if (!(x_val | o_val)) {
            board.push(i);
        }
    }

    return board;
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
            v = Math.max(v, alphabeta(child, depth - 1, alpha, beta, false));
            alpha = Math.max(alpha, v);
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
            v = Math.min(v, alphabeta(child, depth - 1, alpha, beta, true));
            beta = Math.min(beta, v);
            if (beta <= alpha)
            {
                break;
            }
        }
        return v;
    }
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
    var board = new Board();
    board.get_board_from_dom();
    console.log({"Board_class": board});

    mate = board.check_for_mate();
    console.log({"current_board" : get_board()});
    
    var move_tree = [];
    moves = move_generator();
    console.log({"move generator" : moves});
    
    for (var i = 0; i < moves.length; i++) { // Generate tree
        var n = new Node(max_depth, board);
        move_tree.push(n);
    }

    console.log(total);

    //for (var i = 0; i < move_tree.length; i++) { // Run alphabeta
        //console.log({
            //"Value alpha beta":
            //alphabeta(move_tree[i], 5, -maxsize, maxsize, true)
        //});
    //}
    current_player++;
});
