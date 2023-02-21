import React, { useCallback, useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip } from 'recharts';

import { getDataPerformanceById } from "../../../services/API/user";

import style from './performanceGraph.module.css';

interface Props {
    id: string,
}

export const PerformanceGraph: React.FC<Props> = ({ id }) => {
    const [data, setData] = useState<IUserPerformance>();

    /**
     * @param {number} value Number Value representing the text to display
     * @return {string} Text to display
     */
    const getXAxis = useCallback((value: number) => {
        switch (value) {
            case 1: return 'Cardio';
            case 2: return 'Energie';
            case 3: return 'Endurance';
            case 4: return 'Force';
            case 5: return 'Vitesse';
            case 6: return 'Intensité';
        }
        return 'Error';
    }, [])

    useEffect(() => {
        if (id) {
            getDataPerformanceById(id).then((result) => {
                setData(result.data);
            }).catch(() => console.error('API ERROR'));
        }
    }, [id])

    if (data) {
        return (
            <>
                <div className={style.performanceGraph}>
                    <RadarChart
                        width={250}
                        height={180}
                        data={data.data}
                    >
                        <PolarGrid
                            radialLines={false}
                        />
                        <PolarAngleAxis
                            tickFormatter={getXAxis}
                            dataKey="kind"
                            tickLine={false}
                            stroke='white'
                            strokeWidth={1}
                            tickCount={0}
                            fontSize={12}
                            
                        />
                        <Radar
                            dataKey="value"
                            stroke="#FF0101B2"
                            fill="#FF0101B2"
                            fillOpacity={0.7}
                        />
                        <Tooltip />
                    </RadarChart>
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