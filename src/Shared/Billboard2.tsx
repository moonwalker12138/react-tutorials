import React, { useImperativeHandle } from "react";
import { useSyncState } from "../Utils";

interface IChat {
    sender: string;
    message: string;
}

export interface ILoggerRef {
    append: (chats: IChat | IChat[]) => void;
}

export const Billboard = React.forwardRef((props, ref) => {
    // TODO: Why `contentRef.current` may be null?
    const [contentRef, setContent] = useSyncState<IChat[]>([]);

    const clearChats = () => {
        setContent([]);
    };

    useImperativeHandle(ref, () => ({
        append: (chats: IChat | IChat[]) => {
            let filteredChats = (Array.isArray(chats) ? chats : [chats]).filter(
                (chat) => chat.message !== ""
            );
            if (contentRef.current !== null) {
                setContent([...contentRef.current, ...filteredChats]);
            }
        },
    }));

    return (
        <div style={{ border: "solid", height: "80vh", overflow: "auto" }}>
            <div className="d-flex justify-content-end px-1">
                <i
                    className="bi bi-trash"
                    style={{ width: "1rem" }}
                    onClick={clearChats}
                ></i>
            </div>
            <div className="d-flex flex-column">
                {contentRef.current !== null &&
                    contentRef.current.map(({ sender, message }) => (
                        <Chat sender={sender} message={message} />
                    ))}
            </div>
        </div>
    );
});

const Chat: React.FC<IChat> = ({ sender, message }) => {
    return (
        <div className="d-flex p-1" style={{ alignItems: "flex-start" }}>
            <img
                src={sender}
                alt=""
                className="m-1"
                style={{ width: "1rem" }}
            ></img>
            <span>{"" + message}</span>
        </div>
    );
};
