
import React, {useMemo, useState} from 'react';
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
    const [items, setItems] = useState([<Basic data={data} key="basic" id="basic"/>, <WeatherWidgit key="weather" id="weather" />]);
    const itemsId = useMemo(() => items.map((item) => item.key), [items]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );


    return (
        <div className="border flex flex-col w-full rounded-lg ml-5">
            <div className="ml-5 flex my-3">
                <p className="text-5xl font-bold underline">Overview: {data.gin}</p>
            </div>
            <div className="flex flex-row w-full h-full gap-1">
                <DndContext
                    sensors={sensors}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                >
                    <SortableContext items={itemsId} >
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
        const { active, over } = event;
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
        const { active, over } = event;
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