import React from "react";

// css 
import style from './cardData.module.css';

interface Props {
    param : IParamContainerData,
}

export const CardData: React.FC<Props> = ({ param }) => {
    const nfObject = new Intl.NumberFormat('en-US')
    const value = nfObject.format(param.value)
    return (
        <>
            <div className={style.cardData}>
                <div className={style.icon} style={{background: param.color}}>
                    <img alt={param.name} src={param.image} />

                </div>
                <div>
                    <p>{value}{param.unite}</p>
                    <p>{param.name}</p>
                </div>
            </div>
        </>
    );
}