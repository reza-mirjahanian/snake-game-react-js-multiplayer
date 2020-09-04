import React from 'react';


export default class Cell extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.bgColor !== nextProps.bgColor
    }

    render() {
        return (
            <div className=" board-cell " style={{backgroundColor: this.props.bgColor}} />
        );
    }
}
