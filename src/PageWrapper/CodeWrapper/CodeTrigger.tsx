import React from 'react';
import { CodeWrapper } from './CodeWrapper';
import { Dialog } from '../Dialog/Dialog';

export const CodeTrigger = React.forwardRef((props, ref) => {
	const trigger = <i className="bi bi-file-earmark-code m-3" style={{fontSize: "3rem"}}></i>

	return (
		<Dialog trigger={trigger}>
			<CodeWrapper code={code}/>
		</Dialog>
	) 
});

const code = `import React, { useImperativeHandle, useState } from 'react';
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