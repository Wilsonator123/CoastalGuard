import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export default function SortableItem(props) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition
    } = useSortable({
        id: props.id,
        data: props.data,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        border: "1px solid red",
        marginTop: "10px",
    };

    return (
        <div ref={setNodeRef} style={style}  {...attributes} {...listeners}>
            {props.children}
        </div>
    );
}