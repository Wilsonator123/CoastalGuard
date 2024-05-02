
import React, {useState} from 'react';
import {Basic} from './components/base';
import {
    DndContext,
    closestCenter,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import Sortable from '@/components/Sortable';
import WeatherWidgit from "@/app/cases/[case]/(overview)/components/weatherWidgit";

const Page = ({ data }) => {
    const [items, setItems] = useState([<Basic data={data} key="Basic"/>, <WeatherWidgit key="WeatherWidgit"/>]);

    function dragEndEvent(e) {
        const { over, active } = e;
        console.log(over, active)
        setItems((items) => {
            return arrayMove(
                items,
                items.indexOf(active.id),
                items.indexOf(over?.id)
            );
        });
    }

    return (
        <div className="border flex flex-col w-full rounded-lg ml-5">
                <div className="ml-5 flex my-3">
                    <p className="text-5xl font-bold underline">Overview: {data.gin}</p>
                </div>
                <DndContext className="flex w-full h-full" onDragEnd={dragEndEvent}>
                    <SortableContext items={items} >
                        {items.map((item) => (
                            <Sortable key={item.key} id={item.key}>
                                <div>
                                    {item}
                                </div>
                            </Sortable>
                        ))}
                    </SortableContext>
                </DndContext>

        </div>
    );
}

export default Page;