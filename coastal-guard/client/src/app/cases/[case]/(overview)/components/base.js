import React from 'react';
import Map from './Map'
import CaseDetails from './caseDetails'
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";


export const Basic = (props) => {
    const data = props.data;
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition
    } = useSortable({
        id: props.id,
        disabled: !props.edit,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: props.edit ? 'grab' : 'default'
    };

    const lastUpdated = (date) => {
        const currentDate = new Date();
        const timeDifference = currentDate - date;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const weeksDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

        if (weeksDifference > 0) {
            return `${weeksDifference} week${weeksDifference > 1 ? 's' : ''} ago`;
        } else if (daysDifference > 0) {
            return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
        } else if (hoursDifference > 0) {
            return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
        } else {
            return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
        }
    };


    return (
        <div className="min-w-[385px] w-[585px] bg-[#D9D9D9] h-[725px] rounded-lg relative" id="main" key="main" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="w-full h-full ">
                <div className="px-5 mb-5">
                    <div className="flex justify-between my-3">
                        <div>
                            <p className="text-3xl font-bold">Case Details</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">Last Updated: {lastUpdated(new Date(data.last_updated))}</p>
                        </div>
                    </div>

                    <div className="mx-1.5">
                        <CaseDetails data={data}/>
                    </div>
                </div>
                <div className="relative">
                    <Map/>
                </div>
                <div className="flex justify-between absolute bottom-0 w-full p-1.5 items-end">
                    <p className="font-semibold">Created at: 20/02/2004</p>
                    <p className="text-[#0500FF] font-bold underline text-2xl"><a href={data.link}>Original Link</a></p>
                </div>
            </div>
        </div>
    )
}