import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { PlayerEntity } from '../../Model/Player';
import { RefContext } from '../../Shared/PageWrapper';
import { sleep, useLog, useMountEffect } from '../../Utils';
import SystemImg from "../../Images/System.png";

export const Player: React.FC<PlayerEntity> = ({name, character, greeting, type, getStep}) => {
	const log = useLog();
	const prevNameRef = useRef<string>();
	const isTimeConsuming = (name === "Bunny" || name === "Donatello");

	useEffect(() => {
		// if (isTimeConsuming) {
		// 	log({sender: SystemImg, message: `Creating ${name}...`});
		// }
		log({sender: character, message: greeting});
	}, [name]);

    useEffect(() => {
		if (name === prevNameRef.current) {
			const message = (
				<>
					<span className="me-2" style={{backgroundColor: "yellow"}}>{"WARNING"}</span>
					<span className="me-2">{"Redundant rendering of"}</span>
					<span style={{fontWeight: "bold"}}>{`${type}-${name}`}</span>
				</>
			);
			log({sender: SystemImg, message: message});
		}
		prevNameRef.current = name;
    });

    if (isTimeConsuming) {
        // sleep(1000);
    }

	return (
		<img src={character} alt="" style={{opacity: 0.7, height: "6rem"}}/>
	)
};
