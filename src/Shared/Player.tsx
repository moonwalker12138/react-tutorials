import React, {  useEffect, useRef } from 'react'
import { PlayerEntity, PlayerType } from '../Model/Player';
import {  useLog,  } from '../Utils';
import { RecordRegion } from '../PageWrapper/Billboard';

interface IPlayerProps extends PlayerEntity {}

export const Player: React.FC<IPlayerProps> = ({name, character, greeting, type}) => {
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
