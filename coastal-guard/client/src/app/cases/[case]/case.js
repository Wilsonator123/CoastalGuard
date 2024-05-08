'use client'
import {useEffect, useState} from "react";
import Overview from './(overview)/overview'
import OptionList from './optionList'
export default function Page({fetchData, params}) {
    const [page, setPage] = useState("overview");
    const [data, setData] = useState(null);
    const [gin, setGin] = useState(params.case);
    const [loading, setLoading] = useState(true);

    const showPage = (page, data) => {
        switch (page) {
            case "overview":
                return <Overview data={data}/>
            case "test":
                return <Test/>
            default:
                return <Overview data={data}/>
        }
    }
    const changePage = async (change) => {
        setPage(change);
    }

    const isActive = () => {

    }

    useEffect(() => {
        fetchData(gin).then((data) => {
            setData(data);
            setLoading(false);
        })
    }, [gin])

    return (
        <>
            {loading ? <p>Loading...</p>
                :
                <section className="flex py-5">
                    <OptionList changePage={changePage} active={page}/>
                    {showPage(page, data)}
                </section>
            }
        </>
    );
}