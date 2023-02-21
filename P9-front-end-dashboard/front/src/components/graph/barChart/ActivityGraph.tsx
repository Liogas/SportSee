import React, { useCallback, useEffect, useState } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getDataWeightById } from "../../../services/API/user";

// css 
import style from './activityGraph.module.css';
import './style.css'

interface Props {
    id: string,
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className={style.customTooltip}>
                <p className={style.kilogram}>{`${payload[0].value}kg`}</p>
                <p className={style.calories}>{`${payload[1].value}Kcal`}</p>
            </div>
        );
    }

    return null;
};

const renderLegend = (value: string, entry: any) => {
    const { color } = entry;

    if (value === "Poids (kg)") {
        return <span className={style.kiloLegend} style={{ color }}>{value}</span>
    }
    return <span className={style.caloLegend} style={{ color }}>{value}</span>;
};

export const ActivityGraph: React.FC<Props> = ({ id }) => {
    const [data, setData] = useState<IUserActivity>();

    const XAxisFunction = useCallback((name: string) => String(Number(name) + 1), [])

    useEffect(() => {
        if (id) {
            getDataWeightById(id).then((result) => {
                setData(result.data);
            }).catch(() => console.error('APPEL API ERROR'));
        }
    }, [id])
    if (data) {
        return (
            <>
                <div className={style.containerGraph}>
                    <p className={style.title}>Activité quotidienne</p>
                    <BarChart
                        width={777}
                        height={297}
                        data={data.sessions}
                        margin={{
                            top: 90,
                            right: 25,
                            left: 43,
                            bottom: 12, 
                        }}
                        barSize={7}
                        barCategoryGap={26}
                        barGap={8}

                    >
                        <XAxis
                            tickFormatter={XAxisFunction}
                            tickLine={false}
                            tickMargin={16}
                            padding={{
                                left: -40,
                                right: -40
                            }
                            }
                            axisLine={false}
                            scale="auto"

                        />
                        <YAxis
                            yAxisId={0}
                            dataKey="kilogram"
                            tickCount={3}
                            tickLine={false}
                            axisLine={false}
                            orientation="right"
                            tickMargin={45}
                            type="number"
                            domain={['dataMin-1', 'dataMax + 2']}
                        />
                        <YAxis
                            yAxisId={1}
                            dataKey="calories"
                            type="number"
                            domain={[0, 'dataMax']}
                            hide={true}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            wrapperClassName="tooltip"
                        />
                        <Legend
                            className={style.legend}
                            align="right"
                            verticalAlign="top"
                            iconSize={8}
                            iconType="circle"
                            wrapperStyle={{
                                top: '24px',
                                lineHeight: '24px'
                            }}
                            formatter={renderLegend}

                        />
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />
                        <Bar yAxisId={0} name="Poids (kg)" dataKey="kilogram" fill="#282D30" radius={[3, 3, 0, 0]} />
                        <Bar yAxisId={1} name="Calories brûlées (kCal)" dataKey="calories" fill="#E60000" radius={[3, 3, 0, 0]} />
                    </BarChart>
                </div>
            </>
        );
    } else {
        return (
            <>
                <h1>ERROR</h1>
            </>
        )
    }
}