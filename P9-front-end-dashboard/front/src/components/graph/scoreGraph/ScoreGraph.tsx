import React from "react";

import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

import style from './scoreGraph.module.css';

interface Props {
    score: number,
}

export const ScoreGraph: React.FC<Props> = ({ score }) => {
    const data = [{ score: score*100 }];
    const widthContainer = 258;
    const heightContainer = 263;

    if (score) {
        return (
            <>
                <div className={style.scoreGraph}>
                    <p className={style.title}>Score</p>
                    <RadialBarChart
                    startAngle={90}
                    endAngle={470}
                        innerRadius="70%"
                        outerRadius="70%"
                        barSize={10}
                        data={data}
                        width={widthContainer - 20}
                        height={heightContainer - 24}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, 100]}
                            tick={false}
                        />
                        <RadialBar
                            dataKey="score"
                            fill="#FF0000"
                        >
                        </RadialBar>
                    </RadialBarChart>
                    <div className={style.label}>
                        <p>{data[0].score}%</p>
                        <p>De votre objectif</p>
                    </div>
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