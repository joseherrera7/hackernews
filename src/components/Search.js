import React from 'react';

class Search extends React.Component {
    render() {
        const { value, onChange, children, onSubmit } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
                <button type="submit">
                    {children}
                </button>
            </form>
        );
    }
}

export default Search