import React, { useImperativeHandle } from "react";
import { useSyncState } from "../Utils";
import SystemImg from "../Images/System.png";

export enum RecordRegion {
    Chat = "Chat",
    HarePlayer = "HarePlayer",
    TortoisePlayer = "TortoisePlayer",
    HareRaceTrack = "HareRaceTrack",
    TortoiseRaceTrack = "TortoiseRaceTrack",
}

export interface IRecord {
    sender: string;
    message: string | JSX.Element;
    region: RecordRegion;
}

export interface IBillboardRef {
    append: (records: IRecord[]) => void;
}

type IBillboardState = Map<RecordRegion, IRecord[]>;

export const Billboard = React.forwardRef((props, ref) => {
    // TODO: Why `contentRef.current` may be null?
    // const [chatsRef, setChats] = useSyncState<IRecord[]>([]);
    // const [harePlayerLogsRef, setHarePlayerLogs] = useSyncState<IRecord[]>([]);
    // const [tortoisePlayerLogsRef, setTortoisePlayerLogs] = useSyncState<IRecord[]>([]);
    // const [hareRaceTrackLogsRef, setHareRaceTrackLogs] = useSyncState<IRecord[]>([]);
    // const [tortoiseRaceTrackLogsRef, setTortoiseRaceTrackLogs] = useSyncState<IRecord[]>([]);
    // const [logsRef, setLogs] = useSyncState<IRecord[]>([]);

    const [recordsRef, setRecords] = useSyncState<IBillboardState>(new Map({
        [RecordRegion.Chat]: [],
        [RecordRegion.HarePlayer]: [],
        [RecordRegion.TortoisePlayer]: [],
        [RecordRegion.HareRaceTrack]: [],
        [RecordRegion.TortoiseRaceTrack]: [],
    }));

    const clearChats = () => setRecords({...recordsRef.current, [RecordRegion.Chat]: []});

    // const clearChats = () => setChats([]);
    // const clearLogs = () => {
    //     setHarePlayerLogs([]);
    //     setTortoisePlayerLogs([]);
    //     setHareRaceTrackLogs([]);
    //     setTortoiseRaceTrackLogs([]);
    // };

    useImperativeHandle(ref, () => ({
        append: (records: IRecord[]) => {
            records.forEach((record) => {
                if (record.message === "" || record.message === <></> || record.message === undefined) return;
                switch (record.region) {
                    case RecordRegion.Chat:
                        if (chatsRef.current) {
                            setChats([...chatsRef.current, record]);
                        }
                        return;
                    case RecordRegion.HarePlayer:
                        if (harePlayerLogsRef.current) {
                            setHarePlayerLogs([...harePlayerLogsRef.current, record]);
                        }
                        return;
                    case RecordRegion.TortoisePlayer:
                        if (tortoisePlayerLogsRef.current) {
                            setHarePlayerLogs([...tortoisePlayerLogsRef.current, record]);
                        }
                        return;
                    case RecordRegion.HareRaceTrack:
                        if (hareRaceTrackLogsRef.current) {
                            setHareRaceTrackLogs([...hareRaceTrackLogsRef.current, record]);
                        }
                    default:
                        return;
                }
            });

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
                <span style={{textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", flex: 1}}>{name}</span>
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
            {typeof message === "string" ?  <span>{"" + message}</span> : message}
        </div>
    );
};
