import React from 'react';
import Button from './Button';

class Table extends React.Component {
    render() {
        return (
            <div className="table">
                <div className='table-header'>
                    <span style={{ width: '40%' }}>URL</span>
                    <span style={{ width: '30%' }}>Author</span>
                    <span style={{ width: '10%' }}># of Comments</span>
                    <span style={{ width: '10%' }}># of Stars</span>
                    <span style={{ width: '10%' }}>
                        Dismiss?
                    </span>
                </div>

                {this.props.list.map((item) => {
                    return (
                        <div key={item.objectID} className='table-row'>
                            <span style={{ width: '40%' }}><a href={item.url}>{item.title}</a></span>
                            <span style={{ width: '30%' }}> {item.author}</span>
                            <span style={{ width: '10%' }}> {item.num_comments}</span>
                            <span style={{ width: '10%' }}> {item.points} </span>
                            <span style={{ width: '10%' }}>
                                <Button onClick={() => this.props.onDismiss(item.objectID)}
                                    className='button-inline'>
                                    Dismiss
                                    </Button>
                            </span>
                        </div>
                    )
                })}

            </div>
        )
    }
}

export default Table