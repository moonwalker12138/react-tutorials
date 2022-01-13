import React, { useImperativeHandle } from "react";
import { useSyncState } from "../Utils";
import SystemImg from "../Images/System.png";

export interface IRecord {
    sender: string;
    message: string;
}

export interface IBillboardRef {
    append: (records: IRecord | IRecord[]) => void;
}

export const Billboard = React.forwardRef((props, ref) => {
    // TODO: Why `contentRef.current` may be null?
    const [chatsRef, setChats] = useSyncState<IRecord[]>([]);
    const [logsRef, setLogs] = useSyncState<IRecord[]>([]);

    const clearChats = () => setChats([]);
    const clearLogs = () => setLogs([]);

    useImperativeHandle(ref, () => ({
        append: (records: IRecord | IRecord[]) => {
            let validRecords = (Array.isArray(records) ? records : [records]).filter(
                (chat) => chat.message !== ""
            );

            if (chatsRef.current !== null) {
                const chats = validRecords.filter((record) => record.sender !== SystemImg);
                setChats([...chatsRef.current, ...chats]);
            }

            if (logsRef.current !== null) {
                const logs = validRecords.filter((record) => record.sender === SystemImg);
                setLogs([...logsRef.current, ...logs]);
            }
        },
    }));

    return (
        <div style={{ border: "solid", height: "80vh"}}>
            <div style={{height: "30%", overflow: "auto"}}>
                <Container name={"Chat"} records={chatsRef.current ?? []} onClear={clearChats} />
            </div>
            <div style={{height: "70%", overflow: "auto", borderTop: "solid black"}}>
                <Container name={"System"} records={logsRef.current ?? []} onClear={clearLogs} />
            </div>
        </div>
    );
});

interface IContainerProps {
    name: string;
    records: IRecord[];
    onClear: () => void;
}

const Container: React.FC<IContainerProps> = ({records, onClear, name}) => {
    return (
        <div className="p-2">
            <div className="d-flex justify-content-end px-1">
                <span style={{textAlign: "center", flex: 1}}>{`---${name}---`}</span>
                <i
                    className="bi bi-trash"
                    style={{ width: "1rem" }}
                    onClick={onClear}
                ></i>
            </div>
            <div className="d-flex flex-column">
                {records.map(({ sender, message }, index) => (
                    <Chat sender={sender} message={message} key={index}/>
                ))}
            </div>
        </div>
    );
}

const Chat: React.FC<IRecord> = ({ sender, message }) => {
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
