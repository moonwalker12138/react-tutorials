import React, { CSSProperties, useImperativeHandle, useState } from 'react';
import { useToggle } from '../CustomHooks';
import { CodeBlock } from './CodeBlock';


const dialogStyle: CSSProperties = {
	position: 'fixed',
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)",
	zIndex: 1055,
	display: 'none',
	width: "100%",
	height: "100%",
	overflowX: "hidden",
	overflowY: "auto"
}

export const Code = React.forwardRef((props, ref) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => setIsDialogOpen(false);

	return (
		<>
			<i className="bi bi-file-earmark-code m-3" style={{fontSize: "3rem"}} onClick={openDialog}></i>
			<div id={"dialog"} style={{...dialogStyle, display: isDialogOpen ? "block" : "none", width: "60%"}}>
				<div>
					<div id={"dialogHeader"} className='d-flex align-items-center' style={{backgroundColor: "#292c33"}}>
						<span style={{color: "white", textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", flex: 1}}>{"Code"}</span>
						<button type="button" className="btn-close me-3" onClick={closeDialog} style={{backgroundColor: "white"}}></button>
					</div>
					<div id={"dialogBody"}>
						<CodeBlock code={code} />
					</div>
				</div>
			</div>
			{/* <div className="modal " tabIndex={-1} style={{display: isDialogOpen ? "block" : "none"}}>
				<div className="modal-dialog">
					<div style={{width: "500px", height: "1000px"}}>
						<CodeBlock  code={code} />
					</div>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Modal title</h5>
							<button type="button" className="btn-close" onClick={closeDialog} aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<CodeBlock  code={code} />
						</div>
					</div> 
				</div>
			</div> */}
		</>
	) 
});

const code = `
import React, { useImperativeHandle, useState } from 'react';
import { useToggle } from '../CustomHooks';
import { CodeBlock } from './CodeBlock';

export const Code = React.forwardRef((props, ref) => {
	const [showDialog, toggleShowDialog] = useToggle(false);

	return (
		<>
			<i className="bi bi-file-earmark-code m-3" style={{fontSize: "3rem"}} onClick={toggleShowDialog}></i>
			<div className="modal " tabIndex={-1} style={{display: showDialog ? "block" : "none"}}>
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Modal title</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<CodeBlock  code={code} />
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" className="btn btn-primary">Save changes</button>
					</div>
					</div>
				</div>
			</div>
		</>
	) 
});
`;