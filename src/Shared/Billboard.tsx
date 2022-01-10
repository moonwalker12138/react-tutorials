import React, { useImperativeHandle, useState } from "react";

interface IChat {
    sender: string;
    message: string;
}

export interface ILoggerRef {
    append: (chats: IChat | IChat[]) => void;
}

export const Billboard = React.forwardRef((props, ref) => {
    const [content, setContent] = useState<IChat[]>([]);

    const clearChats = () => setContent([]);

    useImperativeHandle(ref, () => ({
        append: (chats: IChat | IChat[]) => {
            let filteredChats = (Array.isArray(chats) ? chats : [chats]).filter(
                (chat) => chat.message !== ""
            );
            setContent([...content, ...filteredChats]);
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
                {content.map(({ sender, message }) => (
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
