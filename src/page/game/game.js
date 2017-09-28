import React, {Component} from 'react';
import './game.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                line: lines[i]
            }
        }
    }
    return {winner: null, line: []};
}

function Square(props) {
    if (props.highlight) {
        return (
            <button className="square" style={{color: 'red'}} onClick={props.onClick}>
                {props.value}
            </button>
        );
    }
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends Component {

    renderSquare(i) {
        return (
            <Square
                key={i}
                highlight={this.props.winnerLine.includes(i)}
                onClick={() => this.props.onClick(i)}
                value={this.props.squares[i]}
            />
        );
    }

    render() {
        var rows = [];
        for (var i = 0; i < 3; i++) {
            var row = [];
            for (var j = 3 * i; j < 3 * i + 3; j++) {
                row.push(this.renderSquare(j));
            }
            rows.push(<div className="board-row" key={i}>{row}</div>);
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares).winner;
        if (winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares).winner;
        const winnerLine = calculateWinner(current.squares).line;

        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            if (move === this.state.stepNumber) {
                return (
                    <li key={move}>
                        <a href="#" onClick={() => this.jumpTo(move)}>
                            <strong>{desc}</strong>
                        </a>
                    </li>
                );
            }
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winnerLine={winnerLine}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;