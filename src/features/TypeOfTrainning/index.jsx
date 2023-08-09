import React from 'react';
import PropTypes from 'prop-types';
import TypeList from './components/typeList';

TypeFeature.propTypes = {};

function TypeFeature({typeList}) {
    return (
        <div>
            <div>
            <h3>Type List</h3>
            <TypeList typeList={typeList} />
        </div>
        </div>
    );
}

export default TypeFeature;