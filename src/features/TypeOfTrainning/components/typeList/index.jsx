import React from 'react';
import PropTypes from 'prop-types';

TypeList.propTypes = {
    typeList: PropTypes.array,
};

TypeList.default = {
    typeList: [],
}

function TypeList({ typeList }) {
    return (
        <div>
            <ul>
                {typeList.map(type => (
                    <li key={type.id} >{type.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TypeList;