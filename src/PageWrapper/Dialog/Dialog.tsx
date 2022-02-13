import React, { useState } from 'react'
import styles from "./Dialog.module.css";

interface IProps {
	trigger: JSX.Element;
}

export const Dialog:React.FC<IProps> = ({trigger, children}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => setIsDialogOpen(false);

	return (
		<>
			<div onClick={openDialog}>
				{trigger}
			</div>
			<div className={styles.container} style={{display: isDialogOpen ? "block" : "none"}}>
				<div className={styles.backdrop} onClick={closeDialog} />
				<dialog className={styles.dialog} open>
					{children}
				</dialog>
			</div>
		</>
	)
}
