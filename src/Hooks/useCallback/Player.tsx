import React, { useContext, useEffect, useRef } from 'react'
import { PlayerEntity } from '../../Model/Player';
import { RefContext } from '../../Shared/PageWrapper';
import { sleep } from '../../Utils';

export const Player: React.FC<PlayerEntity> = ({name, character, greeting, type, getStep}) => {
	const {loggerRef} = useContext(RefContext);
	const prevNameRef = useRef<string>();

	useEffect(() => {
		loggerRef?.current?.append({sender: character, message: greeting});
	}, [name]);

    useEffect(() => {
		// console.log(`YF hook prev: ${prevNameRef.current}, curr: ${name}`);
		if (name === prevNameRef.current) {
			loggerRef?.current?.append({sender: character, message: `I was rendered again -_-`});
		}
		prevNameRef.current = name;
    });

    if (name === "Bunny") {
        loggerRef?.current?.append({sender: character, message: "Creating..."});
        console.log("YF ", "Creating...");
        sleep(1000);
        loggerRef?.current?.append({sender: character, message: "Done"});
        console.log("YF ", "Done");
    }

	return (
		<img src={character} alt="" style={{opacity: 0.7, height: "6rem"}}/>
	)
};
