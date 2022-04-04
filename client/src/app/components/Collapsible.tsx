import React from 'react';
import useCollapse from 'react-collapsed';

export default function Collapsible(props) {
    const config = {
        defaultExpanded: props.defaultExpanded || false,
        collapsedHeight: props.collapsedHeight || 0
        };

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

    return (
        <div className="collapsible">
            <div className="w-1/2" {...getToggleProps()}>
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{props.title}</div>
                <div className="icon">
                    <i className={'fas fa-chevron-circle-' + (isExpanded ? 'up' : 'down')}></i>
                </div>
            </div>
            <div {...getCollapseProps()}>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    );
}