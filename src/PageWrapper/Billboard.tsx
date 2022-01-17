import React, { useImperativeHandle } from "react";
import { useSyncState } from "../Utils";

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

type IRecordProps = Omit<IRecord, "region">;
interface IRecordListProps {
    records: IRecordProps[];
} 

interface IHeaderProps {
    title: string;
    onClear: () => void;
}

export interface IBillboardRef {
    append: (record: IRecord) => void;
}

type IBillboardState = Map<RecordRegion, IRecord[]>;

export const Billboard = React.forwardRef((props, ref) => {
    // TODO: Why `contentRef.current` may be null?
    const [recordsRef, setRecords] = useSyncState<IBillboardState>(new Map([
        [RecordRegion.Chat, []],
        [RecordRegion.HarePlayer, []],
        [RecordRegion.TortoisePlayer, []],
        [RecordRegion.HareRaceTrack, []],
        [RecordRegion.TortoiseRaceTrack, []],
    ]));

    const clearChats = () => {
        if (recordsRef.current) {
            setRecords(recordsRef.current.set(RecordRegion.Chat, []));
        }
    };

    const clearPlayerLogs = () => {
        if (recordsRef.current) {
            setRecords(recordsRef.current.set(RecordRegion.HarePlayer, []).set(RecordRegion.TortoisePlayer, []));
        }
    }

    const clearRaceTrackLogs = () => {
        if (recordsRef.current) {
            setRecords(recordsRef.current.set(RecordRegion.HareRaceTrack, []).set(RecordRegion.TortoiseRaceTrack, []));
        }
    }

    const getRecords = (region: RecordRegion) => {
        return recordsRef.current?.get(region) ?? [];
    };

    const appendRecord = (record: IRecord) => {
        const {sender, message, region} = record;
        if (!recordsRef.current) return;
        if (message === "" || message === <></> || message === undefined) return;
        const newRecords = [...getRecords(region), {
            sender: sender,
            message: message,
            region: region,
        }];
        setRecords(recordsRef.current.set(region, newRecords));
    }

    useImperativeHandle(ref, () => ({
        append: appendRecord,
    }));

    return (
        <div className="p-2" style={{ border: "solid", height: "80vh"}}>
            <div style={{height: "30%", overflow: "auto"}}>
                <Header title={"Chat"} onClear={clearChats} />
                <div className="d-flex justify-content-between" style={{height: "80%", overflow: "auto"}}>
                    <div style={{flex: 1}}><RecordList records={getRecords(RecordRegion.Chat)} /></div>
                </div>
            </div>
            <div style={{height: "35%", borderTop: "solid"}}>
                <Header title={"Player"} onClear={clearPlayerLogs} />
                <div className="d-flex justify-content-between" style={{height: "80%", overflow: "auto"}}>
                    <div style={{flex: 1}}><RecordList records={getRecords(RecordRegion.HarePlayer)} /></div>
                    <div style={{flex: 1}}><RecordList records={getRecords(RecordRegion.TortoisePlayer)} /></div>
                </div>
            </div>
            <div style={{height: "35%", borderTop: "solid"}}>
                <Header title={"Race Track"} onClear={clearRaceTrackLogs} />
                <div className="d-flex justify-content-between" style={{height: "80%", overflow: "auto"}}>
                    <div style={{flex: 1}}><RecordList records={getRecords(RecordRegion.HareRaceTrack)} /></div>
                    <div style={{flex: 1}}><RecordList records={getRecords(RecordRegion.TortoiseRaceTrack)} /></div>
                </div>
            </div>
        </div>
    );
});

export const Header: React.FC<IHeaderProps> = ({title, onClear}) => {
    return (
        <div className="d-flex justify-content-end align-items-center px-1">
            <span style={{textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", flex: 1}}>{title}</span>
            <i
                className="bi bi-trash"
                style={{ width: "1rem" }}
                onClick={onClear}
            ></i>
        </div>
    );
};

export const RecordList: React.FC<IRecordListProps> = ({records}) => {
    return (
        <div className="d-flex flex-column">
            {records.map(({ sender, message }, index) => (
                <Record sender={sender} message={message} key={index}/>
            ))}
        </div>
    );
};

const Record: React.FC<IRecordProps> = ({ sender, message }) => {
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
