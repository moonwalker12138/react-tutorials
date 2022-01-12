import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { PlayerEntity } from '../../Model/Player';
import { RefContext } from '../../Shared/PageWrapper';
import { sleep } from '../../Utils';
import SystemImg from "../../Images/System.png";

export const Player: React.FC<PlayerEntity> = ({name, character, greeting, type, getStep}) => {
	const {loggerRef} = useContext(RefContext);
	const prevNameRef = useRef<string>();
	const isTimeConsuming = (name === "Bunny" || name === "Donatello");

	useEffect(() => {
		if (isTimeConsuming) {
			loggerRef?.current?.append({sender: SystemImg, message: `Creating ${name}...`});
		}
		loggerRef?.current?.append({sender: character, message: greeting});
	}, [name]);

    useEffect(() => {
		// console.log(`YF hook prev: ${prevNameRef.current}, curr: ${name}`);
		if (name === prevNameRef.current) {
			loggerRef?.current?.append({sender: character, message: `I was rendered again -_-`});
		}
		prevNameRef.current = name;
    });

    if (isTimeConsuming) {
        sleep(1000);
    }

	return (
		<img src={character} alt="" style={{opacity: 0.7, height: "6rem"}}/>
	)
};
