import React, { useCallback, useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

import { getDataAverageSessionsById } from "../../../services/API/user";

import style from './averageSessionsGraph.module.css';

interface Props {
    id: string,
}

export const AverageSessionsGraph: React.FC<Props> = ({ id }) => {
    const [data, setData] = useState<IUserActivity>();
    const [percGradient, setPercGradient] = useState(0);

    const widthContainer = 258;

    const getLetterOfDay = useCallback((number: number) => {
        switch (number) {
            case 1: return 'L';
            case 2: return 'M';
            case 3: return 'M';
            case 4: return 'J';
            case 5: return 'V';
            case 6: return 'S';
            case 7: return 'D';
        }
        return 'Error';
    }, [])

    const onMouseMove = useCallback((hoveredData: any) => {
        if (hoveredData && hoveredData.activeLabel && data) {
            const percentage = ((data.sessions.length - hoveredData.activeTooltipIndex - 1) * 100) / (data.sessions.length - 1);
            setPercGradient(100 - percentage);
            const rectangle = document.getElementById("rectangle") as HTMLElement;
            rectangle.style.width = `${widthContainer * (percentage / 100)}px`;
        }
    }, [data])

    const onMouseLeave = useCallback(() => {
        setPercGradient(0);
        const rectangle = document.getElementById("rectangle") as HTMLElement;
        rectangle.style.width = '0px';
    }, [])

    useEffect(() => {
        if (id) {
            getDataAverageSessionsById(id).then((result) => {
                setData(result.data);
            }).catch(() => console.error('API ERROR'));
        }
    }, [id])
    if (data) {
        return (
            <>
                <div className={style.averageSessionsGraph}>
                    <div id="rectangle" className={style.rectangle}></div>
                    <p className={style.title}>Durée moyenne des sessions</p>
                    <LineChart
                        width={253}
                        height={240}
                        data={data.sessions}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        margin={{ top: 77, right: 0, bottom: 0, left: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
                                <stop offset="0%" stopColor="rgba(255, 255, 255, .4)" />
                                <stop offset={`${percGradient}%`} stopColor="rgba(255, 255, 255, .4)" />
                                <stop offset={`${percGradient}%`} stopColor="rgba(255, 255, 255, 1)" />
                                <stop offset={'100%'} stopColor="rgba(255, 255, 255, 1)" />
                            </linearGradient>
                        </defs>
                        <Line
                            type="natural"
                            dataKey="sessionLength"
                            strokeWidth={3}
                            stroke="url(#colorUv)"
                            dot={false}
                            activeDot={{ stroke: 'rgba(255, 255, 255, 0.198345)', strokeWidth: 10, r: 5 }}
                        />
                        <XAxis
                            tickFormatter={getLetterOfDay}
                            tickLine={false}
                            axisLine={false}
                            dataKey="day"
                            stroke="rgba(255, 255, 255, .5)"
                            fontSize={12}
                            tickMargin={15}
                        />
                        <YAxis
                            hide={true}
                            domain={['dataMin-5', 'dataMax + 5']}
                        />
                        <Tooltip
                            wrapperStyle={{ backgroundColor: "red" }}
                            labelStyle={{ display: "none" }}
                            itemStyle={{ color: "black", fontSize: "12px" }}
                            formatter={(value: number) => ["", `${value} min`]}
                            separator=""
                        />


                    </LineChart>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1>ERROR</h1>
            </>
        )
    }
}