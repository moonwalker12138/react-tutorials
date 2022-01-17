import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { PlayerEntity, PlayerType } from '../../Model/Player';
import { RefContext } from '../../PageWrapper/PageWrapper';
import { sleep, useLog, useMountEffect } from '../../Utils';
import SystemImg from "../../Images/System.png";
import { RecordRegion } from '../../PageWrapper/Billboard';

export const Player: React.FC<PlayerEntity> = ({name, character, greeting, type, getStep}) => {
	const log = useLog();
	const prevNameRef = useRef<string>();
	const isTimeConsuming = (name === "Bunny" || name === "Donatello");

	useEffect(() => {
		log({sender: character, message: greeting, region: RecordRegion.Chat});
	}, [name]);

    useEffect(() => {
		if (name === prevNameRef.current) {
			const message = "Redundant rendering";
			const region = type === PlayerType.Hare ? RecordRegion.HarePlayer : RecordRegion.TortoisePlayer;
			log({sender: character, message: message, region: region});
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
