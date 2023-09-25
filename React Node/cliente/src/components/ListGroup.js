import React, { Component } from "react";


let classes = [
    'Maths',
    'Spanish',
    'History',
    'Geography'
]

const handleClick = (event) => console.log(event.target)

export default class ListGroup extends Component {



    render() {

        return (
            <>
                <h1>Classes</h1>
                {classes.length === 0 && <p>No classes found</p>}
                <ul className="list-group">
                    {classes.map((item, index) => (
                        <li
                            onClick={handleClick}
                            className="list-group-item"
                            key={item}>{item}
                        </li>))}
                </ul>
            </>
        );
    }
}

