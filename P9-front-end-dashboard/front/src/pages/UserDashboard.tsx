import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dashboard } from "../components/dashboard/Dashboard";
import { getDataUserById } from "../services/API/user";

// css 
import style from './userDashboard.module.css';

type callAPIParams = {
    id: string;
}

export const UserDashboard: React.FC = () => {
    const [data, setData] = useState<IUser>();
    const { id } = useParams<callAPIParams>();

    useEffect(() => {
        if (id) {
            getDataUserById(id).then((result) => {
                setData(result.data);
            }).catch(() => console.error('APPEL API ERROR'));
        }
    }, [id]);

    if (!data) {
        return (
            <>
                <h1>ERROR</h1>
            </>
        );
    }
    return (
        <>
            <div className={style.userDashboard}>
                <Dashboard data={data} />
            </div>
        </>
    );
}