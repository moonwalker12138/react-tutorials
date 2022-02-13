import React, { useState } from 'react'
import styles from "./SlideWrapper.module.css";

interface IProps {
	slides: string[];
}

export const SlideWrapper:React.FC<IProps> = ({slides}) => {
	const [index, setIndex] = useState(0);
	const onForward = () => {
		if(index >= slides.length - 1) return;
		setIndex(index + 1);
	};

	const onBackward = () => {
		if (index === 0) return;
		setIndex(index - 1);
	};

	return (
		<div className={styles.container}>
			<i className="bi bi-caret-left" style={{fontSize: "3rem"}} onClick={onBackward}/>
			<img src={slides[index]} alt="" />
			<i className="bi bi-caret-right" style={{fontSize: "3rem"}} onClick={onForward}/>
		</div>	
	)
}
