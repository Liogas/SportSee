import { ActivityGraph } from "../graph/barChart/ActivityGraph";
import { AverageSessionsGraph } from "../graph/averageSessionsGraph/averageSessionsGraph";
import { PerformanceGraph } from "../graph/performanceGraph/PerformanceGraph";
import { ScoreGraph } from "../graph/scoreGraph/ScoreGraph";
import { CardData } from "../cardData/CardData";
// css 
import style from './dashboard.module.css';

import caloriesIMG from '../../images/calories.png';
import proteineIMG from '../../images/proteine.png';
import appleIMG from '../../images/apple.png';
import cheeseburgerIMG from '../../images/cheeseburger.png';

interface Props {
    data: IUser,
}

export const Dashboard: React.FC<Props> = ({ data }) => {
    const paramContainerData = [
        { name: 'Calories', image: caloriesIMG, value: data.keyData.calorieCount, unite: 'kCal', color: 'rgba(255, 0, 0, 0.07)' },
        { name: 'Proteines', image: proteineIMG, value: data.keyData.proteinCount, unite: 'g', color: 'rgba(74, 184, 255, 0.1)' },
        { name: 'Glucides', image: appleIMG, value: data.keyData.carbohydrateCount, unite: 'g', color: 'rgba(249, 206, 35, 0.1)' },
        { name: 'Lipides', image: cheeseburgerIMG, value: data.keyData.lipidCount, unite: 'g', color: 'rgba(253, 81, 129, 0.1)' },
        ]
    return (
            <div className={style.dashboard}>
                <div className={style.title}>
                    <h1>Bonjour <span className={style.name}>{data.userInfos.firstName}</span></h1>
                    <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                </div>
                <div className={style.containerGraphAndCard}>
                    <div className={style.graph}>
                        <ActivityGraph id={data.id.toString()} />
                        <div className={style.containerGraph}>
                            <AverageSessionsGraph id={data.id.toString()} />
                            <PerformanceGraph id={data.id.toString()} />
                            {data.todayScore &&
                                <ScoreGraph score={data.todayScore} />
                            }
                            {data.score &&
                                <ScoreGraph score={data.score} />
                            }
                        </div>
                    </div>
                    <div className={style.containerCard}>
                        {paramContainerData.map((param, key) => (
                            <CardData key={key} param={param}/>
                        ))
                        }
                    </div>
                </div>
            </div>
    );
}