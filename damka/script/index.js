var board = [];
var turnCounter = 1;
numBlack = 12;
numWhite = 12;
var fClickInfo = {
    color: 'none',
    id: '0'
};
var fClick = true;
for (let i = 1; i <= 8; i++) {
    board[i] = [];
}

function empty(id, color) {
    this.id = id;
    this.color = color;

}

function ifBig(num1, num2) {
    // console.log(`i: ${num1}, k:${num2}`);

    if (num1 > 0 && num1 == 1) {
        var absK = AbsValue(num2);
        if (absK == 1) {
            if (num2 > 0) {
                var arr = [true, true];
            } else {
                var arr = [true, false];

            }
            return arr;


        }

    }
}


function AbsValue(num) {
    if (num < 0) {
        num *= -1;
    }
    return num;
}

function player(id, color) {
    this.id = id;
    this.color = color;
    this.options = [];
    this.eatOptions = [];
    this.isQueen = false;

    this.queenOptions = function () {

        //checking Options


        //אלכסון פינה שמאלית למטה
        var k = Number(String(this.id)[1]) - 1;

        for (let i = Number(String(this.id)[0]) - 1; i >= 1; i--) {
            if (k < 1) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color == 'none') {
                    this.options.push("" + i + k);


                } else {
                    try {
                        if (board[i - 1][k - 1].color == 'none') {
                            this.eatOptions.push(["" + (i - 1) + (k - 1), "" + i + k]);
                        }

                    } catch (error) {

                    }

                    break;
                }
            }

            k--;

        }
        // debugger;
        // אלכסון פינה ימנית למעלה
        k = Number(String(this.id)[1]) + 1;
        for (let i = Number(String(this.id)[0]) + 1; i <= 8; i++) {
            if (k > 8) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color == 'none') {
                    this.options.push("" + i + k);

                } else {
                    try {
                        if (board[i + 1][k + 1].color == 'none') {
                            this.eatOptions.push(["" + (i + 1) + (k + 1), "" + i + k]);
                        }

                    } catch (error) {

                    }
                    break;

                }
            }

            k++;


        }


        //אלכסון פינה שמאלית למעלה
        k = Number(String(this.id)[1]) - 1;
        for (let i = Number(String(this.id)[0]) + 1; i <= 8; i++) {
            if (k < 1) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color == 'none') {
                    this.options.push("" + i + k);

                } else {
                    try {

                        if (board[i + 1][k - 1].color == 'none') {
                            this.eatOptions.push(["" + (i + 1) + (k - 1), "" + i + k]);
                        }
                    } catch (error) {

                    }
                    break;

                }
            }
            k--;


        }


        // אלכסון פינה ימנית למטה
        k = Number(String(this.id)[1]) + 1;
        for (let i = Number(String(this.id)[0]) - 1; i >= 1; i--) {
            if (k > 8) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color == 'none') {
                    this.options.push("" + i + k);

                } else {
                    try {
                        if (board[i - 1][k + 1].color == 'none') {
                            this.eatOptions.push(["" + (i - 1) + (k + 1), "" + i + k]);
                        }
                        //["" + dblLine + (col + 2), "" + line + (col + 1)]
                        // [to,eat]
                    } catch (error) {

                    }
                    break;
                }

            }
            k++;

        }
    }
    this.checkMoveOptions = function (line, dblLine, col, pos) {
        // debugger;
        line = line
        if (col != 1) {
            if (board[line][col - 1].color == this.color) {

            } else if (board[line][col - 1].color == 'none') {
                this.options.push("" + line + (col - 1));
            } else {
                try {
                    if (board[dblLine][col - 2] != undefined) {
                        if (board[dblLine][col - 2].color == 'none') {
                            this.eatOptions.push(["" + dblLine + (col - 2), "" + line + (col - 1)]);

                        }

                    }

                } catch (error) {

                }
            }


        }
        if (col != 8) {
            if (board[line][col + 1].color == this.color) {

            } else if (board[line][col + 1].color == 'none') {
                this.options.push("" + line + (col + 1));
            } else {
                try {
                    if (board[dblLine][col + 2] != undefined) {
                        if (board[dblLine][col + 2].color == 'none') {
                            this.eatOptions.push(["" + dblLine + (col + 2), "" + line + (col + 1)]);

                        }

                    }

                } catch (error) {

                }
            }

        }
    }
    this.firstMovment = function () {
        console.log('Select');
        var idToRight, idToLeft;
        var NumThisId = Number(this.id);
        this.options = [];
        this.eatOptions = [];
        //Checking Options
        if (this.isQueen == false) {
            var line = String(this.id)[0] * 1;
            var col = String(this.id)[1] * 1;

            if (this.color == 'black') {
                this.checkMoveOptions(line - 1, line - 2, col, this.id);
            } else {
                this.checkMoveOptions(line + 1, line + 2, col, this.id);

            }
        } else {
            this.queenOptions();
        }


        colorOptions(this.options, this.id, this.eatOptions);
        fClickInfo.color = this.color;
        fClickInfo.id = this.id;
    }


    this.move = function (toId) {
        toQueenFlag = false
        if (this.isQueen == true) {
            toQueenFlag = true;
        }
        console.log('move');
        if (this.color == 'black') {
            if (toQueenFlag) {
                $('#' + toId).addClass('BlackQueen');
                $('#' + this.id).removeClass('BlackQueen');

            } else {
                $('#' + toId).addClass('BlackPlayers');
                $('#' + this.id).removeClass('BlackPlayers');
            }
            $('#' + this.id).removeClass('BlackPlayers');
            board[toId[0]][toId[1]] = {};
            board[toId[0]][toId[1]] = new player(toId, 'black');
            board[String(this.id)[0]][String(this.id)[1]] = {};
            board[String(this.id)[0]][String(this.id)[1]] = new empty(toId, 'none');
        } else {
            if (toQueenFlag) {
                $('#' + toId).addClass('WhiteQueen');
                $('#' + this.id).removeClass('WhiteQueen');

            } else {
                $('#' + toId).addClass('WhitePlayers');
                $('#' + this.id).removeClass('WhitePlayers');
            }
            $('#' + this.id).removeClass('WhitePlayers');
            board[toId[0]][toId[1]] = {};
            board[toId[0]][toId[1]] = new player(toId, 'white');
            board[String(this.id)[0]][String(this.id)[1]] = {};
            board[String(this.id)[0]][String(this.id)[1]] = new empty(toId, 'none');
        }
        if (toQueenFlag == true) {
            board[toId[0]][toId[1]].isQueen = true;
        }
        board[toId[0]][toId[1]].checkQueen();
    }

    this.eat = function (toId, index) {
        console.log('eat');
        toQueenFlag = false
        if (this.isQueen == true) {
            toQueenFlag = true;
        }
        if (this.color == 'black') {
            if (toQueenFlag) {
                $('#' + toId).addClass('BlackQueen');
                $('#' + this.id).removeClass('BlackQueen');

            } else {
                $('#' + toId).addClass('BlackPlayers');
                $('#' + this.id).removeClass('BlackPlayers');
            }
            $('#' + this.eatOptions[index][1]).removeClass('WhitePlayers');
            board[toId[0]][toId[1]] = new player(toId, 'black');
            numBlack--

        } else {
            if (toQueenFlag) {
                $('#' + toId).addClass('WhiteQueen');
                $('#' + this.id).removeClass('WhiteQueen');

            } else {
                $('#' + toId).addClass('WhitePlayers');
                $('#' + this.id).removeClass('WhitePlayers');
            }
            $('#' + this.eatOptions[index][1]).removeClass('BlackPlayers');
            board[toId[0]][toId[1]] = new player(toId, 'white');
            numWhite--

        }
        if(numWhite == 0){
            Win('white')
        }else if (numBlack == 0) {
            Win('black')
        }

        board[String(this.id)[0]][String(this.id)[1]] = {};
        board[String(this.id)[0]][String(this.id)[1]] = new empty(toId, 'none');
        board[String(this.eatOptions[index][1])[0]][String(this.eatOptions[index][1])[1]] = {};
        board[String(this.eatOptions[index][1])[0]][String(this.eatOptions[index][1])[1]] = new empty(this.eatOptions[index][1], 'none');
        if (toQueenFlag == true) {
            board[toId[0]][toId[1]].isQueen = true;
        }
        board[toId[0]][toId[1]].checkQueen();
    }

    this.checkQueen = function () {

        if (this.color == 'black') {
            if (this.id[0] == 1) {
                $('#' + this.id).addClass('BlackQueen')
                board[this.id[0]][this.id[1]].isQueen = true;

            }
        } else {
            if (this.id[0] == 8) {
                $('#' + this.id).addClass('WhiteQueen')
                board[this.id[0]][this.id[1]].isQueen = true;

            }
        }
    }

}



function colorOptions(options, id, eat) {
    // debugger;
    for (let i = 1; i <= 8; i++) {
        for (let k = 1; k <= 8; k++) {
            for (let j = 0; j < options.length; j++) {
                if (options[j] == "" + i + k) {

                    $('#' + i + k).addClass('opt');
                }
            }

            for (let a = 0; a < eat.length; a++) {

                if (eat[a][0] == "" + i + k) {
                    $('#' + i + k).addClass('opt');

                }
            }
        }
    }
    $('#' + id).addClass('pOpt');
}
function Win(color) {
    alert(color + "Won!") 
}
function startNewGame() {

    location.reload();

}
function rColor() {
    for (let i = 1; i <= 8; i++) {
        for (let k = 1; k <= 8; k++) {
            if ($('#' + i + k).hasClass('opt')) {
                $('#' + i + k).removeClass('opt');
            }
            if ($('#' + i + k).hasClass('pOpt')) {
                $('#' + i + k).removeClass('pOpt');
            }
        }
    }
}


$(document).ready(function () {


    //Create Board
    CreateBoard();




    $('button').click(function () {
        // console.log(this.id);
        var idStr = this.id + "";
        var idF = idStr[0];
        var idS = idStr[1];
        if (fClick) {
            //first
            rColor();

            if (turnCounter % 2 == 0) {
                //white
                if (board[this.id[0]][this.id[1]].color == 'white') {
                    board[this.id[0]][this.id[1]].firstMovment();
                    fClick = false;
                } else {
                    alert('White Turn');
                }

            } else {
                //black
                if (board[this.id[0]][this.id[1]].color == 'black') {
                    board[this.id[0]][this.id[1]].firstMovment();
                    fClick = false;

                } else {
                    alert('Black Turn');
                }
            }
        } else {
            //Second
            var fIdf = String(fClickInfo.id)[0];
            var fIds = String(fClickInfo.id)[1];

            if (board[idF][idS].color == fClickInfo.color) {
                //change selection
                rColor();
                board[idF][idS].firstMovment();
                fClick = false;

            } else if (board[idF][idS] instanceof empty) {
                if (board[Number(fIdf)][Number(fIds)].options.length) {
                    for (let j = 0; j < board[Number(fIdf)][Number(fIds)].options.length; j++) {
                        if (this.id == board[fIdf][fIds].options[j]) {
                            //move
                            rColor();
                            board[fIdf][fIds].move(this.id);
                            fClick = true;
                            break;
                        }
                    }
                }
                if (board[Number(fIdf)][Number(fIds)].eatOptions) {
                    console.log(board[Number(fIdf)][Number(fIds)].eatOptions);

                    for (let j = 0; j < board[Number(fIdf)][Number(fIds)].eatOptions.length; j++) {
                        if (this.id == board[Number(fIdf)][Number(fIds)].eatOptions[j][0]) {
                            rColor();
                            board[fIdf][fIds].eat(this.id, j);
                            fClick = true;
                            break;
                        }
                    }
                }



                turnCounter++;
            }
        }




    })



});


function CreateBoard() {
    $('#table').append('<table id="t"></table>');

    for (let i = 1; i <= 8; i++) {
        $('#t').append('<tr><tr>');

        for (let k = 1; k <= 8; k++) {
            var id = "" + i + k;
            $('#t').append('<td><button id=k></button></td>');
            $('#k').addClass('btn');
            if (i % 2 == 0 && k % 2 == 0) {
                $('#k').addClass('Black');
            } else if (i % 2 == 0 && k % 2 != 0) {
                $('#k').addClass('White');
            } else if (i % 2 != 0 && k % 2 != 0) {
                $('#k').addClass('Black');
            } else if (i % 2 != 0 && k % 2 == 0) {
                $('#k').addClass('White');
            }

            $('#k').attr('id', id);
           

        }

    }

    function createWhite(get_id) {
        $('#' + get_id).addClass('WhitePlayers');
    }
    function createBlack(get_id) {
        $('#' + get_id).addClass('BlackPlayers');
    }
    for (let i = 1; i <= 3; i++) {
        for (let k = 1; k <= 8; k++) {
            if (k % 2 != 0 && i % 2 != 0) {
                createWhite('' + i + k);
                board[i][k] = new player("" + i + k, 'white')

            } else {
                if (k % 2 == 0 && i % 2 == 0) {
                    createWhite('' + i + k);
                    board[i][k] = new player("" + i + k, 'white')

                }
            }
        }
    }
    for (let i = 8; i >= 6; i--) {
        for (let k = 8; k >= 1; k--) {
            if (k % 2 != 0 && i % 2 != 0) {
                createBlack('' + i + k);
                board[i][k] = new player("" + i + k, 'black')

            } else {
                if (k % 2 == 0 && i % 2 == 0) {
                    createBlack('' + i + k);
                    board[i][k] = new player("" + i + k, 'black')

                }
            }
        }
    }
    for (let i = 1; i < 9; i++) {
        for (let k = 1; k < 9; k++) {
            if (board[i][k] instanceof player) {
            } else {

                board[i][k] = new empty("" + i + k, 'none')
            }
        }
    }
}
