import React from "react";

interface IProps {
    cards: JSX.Element[];
    columns?: number;
}

const Grid: React.FC<IProps> = ({ cards, columns = 4 }) => {
    return (
        <div className="container text-center mb-5">
            <div className={`row row-cols-${columns} g-5`}>
                {cards.map((card) => (
                    <div className="col">{card}</div>
                ))}
            </div>
        </div>
    );
};

export default Grid;
