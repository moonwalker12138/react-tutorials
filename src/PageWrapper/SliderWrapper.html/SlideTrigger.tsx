import React from 'react'
import { Dialog } from '../Dialog/Dialog';
import { Images } from "./Images";
import { SlideWrapper } from './SlideWrapper';


export const SlideTrigger = () => {
	const trigger = <i className="bi bi-file-earmark-slides m-3" style={{fontSize: "3rem"}}></i>

	return (
		<Dialog trigger={trigger}>
			<SlideWrapper slides={Images} />
		</Dialog>
	) ;
}
