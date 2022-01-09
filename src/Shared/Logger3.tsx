import React, { useImperativeHandle, useRef, useState } from "react";
import Hare from "../Images/Hare.png";

interface IChat {
	sender: string;
	message: string;
}

export interface ILoggerRef {
    say: (sender: string, message: string) => void;
}

export const Logger = React.forwardRef((props, ref) => {
	const chatsRef = useRef<HTMLDivElement>(null);

	const addChat = (sender: string, message: string) => {
		if (chatsRef.current) {
			chatsRef.current?.append("<div>hello</div>");
		}
	}

	const clearChats = () => {
		// chatsRef.current
	};

    useImperativeHandle(ref, () => ({
        say: (sender: string, message: string) => {
			console.log("YF say: ", message);
			addChat(sender, message);
        },
    }));

    return (
		<div style={{border: "solid", height: "80vh", overflow: "scroll"}}>
			<div className="d-flex justify-content-end px-1" >
				<i className="bi bi-trash" style={{width: "1rem"}} onClick={clearChats}></i>
				<i className="bi bi-hr" style={{width: "1rem"}} onClick={() => addChat(Hare, "hello everybody. Nice to see you! I am the WINNER! You lose hhhhhhh")}></i>
			</div>
			<div className="d-flex flex-column" ref={chatsRef}>
				{/* {chatsRef.current.map(({sender, message}) => (
					<Chat sender={sender} message={message} />
				))} */}
			</div>
		</div>
    );
});

const Chat: React.FC<IChat> = ({sender, message}) => {
	return (
		<div className="d-flex p-1" style={{alignItems: "flex-start"}}>
			<img src={sender} alt="" className="m-1" style={{width: "1rem"}} ></img>
			<span>{"" + message}</span>
		</div>
	);
};