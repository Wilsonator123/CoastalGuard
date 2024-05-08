import React, {useMemo, useState} from 'react';
import {Basic} from './components/base';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext
} from '@dnd-kit/sortable';

import WeatherWidgit from "@/app/cases/[case]/(overview)/components/weatherWidgit";

const Page = ({ data }) => {

    const [editing, setEditing] = useState(false);
    const [items, setItems] = useState([
        <Basic data={data} key="basic" id="basic" edit={editing} remove={remove}/>,
        <WeatherWidgit key="weather" id="weather" edit={editing} remove={remove}/>,
        <WeatherWidgit key="weater" id="weater" edit={editing} remove={remove}/>
    ]);
    const [reset, setReset] = useState(null);
    const [key, setKey] = useState(0);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    function remove(id) {
        setItems((items) => {
            return items.filter((item) => item.id !== id);
        });
    }

    const toggleEdit = (value) => {
        setEditing(value);
        const temp = items.map((item) => {
            return React.cloneElement(item, {edit: !editing});
        });
        setItems(temp);
        if (value) setReset(temp);
        else setReset(null)
    }

    const resetItems = () => {
        setItems(reset);
    }

    return (
        <div className="border flex flex-col rounded-lg w-full overflow-hidden mx-2">
            <div className="ml-5 flex my-3 justify-between">
                <p className="text-5xl font-bold underline">Overview: {data.gin}</p>
                {editing ?
                    <div>
                        <button onClick={resetItems}
                                className="h-[45px] w-[100px] bg-background border border-text text-text text-xl font-semibold rounded mr-5">Reset
                        </button>
                        <button onClick={() => toggleEdit(false)}
                                className="h-[45px] w-[100px] bg-primary text-white text-xl font-semibold rounded mr-5">Save
                        </button>
                    </div> :
                    <div>
                        <button onClick={() => toggleEdit(true)}
                                className="w-[100px] h-[45px] bg-primary text-white text-xl font-semibold rounded mr-5">Edit
                        </button>
                    </div>
                }
            </div>
            <div className={`flex flex-row h-full gap-2 p-2 ${editing ? 'border border-error' : ''}`}>
                <DndContext
                    sensors={sensors}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                >
                    <SortableContext items={items.map(item => item.key)} key={key}
                                     className="flex border border-error ">
                        {items.map((item) => (
                            <>
                                {item}
                            </>
                        ))}
                    </SortableContext>
                </DndContext>
            </div>

        </div>
    );

    function onDragEnd(event) {
        const {active, over} = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        setItems((items) => {
            const activeColumnIndex = items.findIndex((item) => item.id === activeId);

            const overColumnIndex = items.findIndex((item) => item.id === overId);

            return arrayMove(items, activeColumnIndex, overColumnIndex);
        });
    }

    function onDragOver(event) {
        const {active, over} = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;
        setItems((items) => {
            const activeIndex = items.findIndex((i) => i.id === activeId);
            const overIndex = items.findIndex((i) => i.id === overId);

            return arrayMove(items, activeIndex, overIndex - 1);
        });
    }
}

export default Page;