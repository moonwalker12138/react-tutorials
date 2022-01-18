import React, { useImperativeHandle } from "react";
import { Hare, IPlayerEntity, Tortoise } from "../../Model/Player";
import { IRecord, RecordRegion, RecordList } from "../../PageWrapper/Billboard";
import { useSyncState } from "../../Utils";

export interface IBillboardRef {
    append: (record: IRecord) => void;
}

export const Billboard = React.forwardRef((props, ref) => {
    const [recordsRef, setRecords] = useSyncState<IRecord[]>([]);

    const hare = Hare;
    const tortoise = Tortoise;

    const clearRecords = () => {
        setRecords([]);
    };

    const appendRecord = (record: IRecord) => {
        const { message } = record;
        if (!recordsRef.current) return;
        if (message === "" || message === <></> || message === undefined)
            return;
        setRecords([...recordsRef.current, record]);
    };

    const getRecords = () => {
        return recordsRef.current ?? [];
    };

    const greeting = (player: IPlayerEntity) => {
        if (!recordsRef.current) return;
        const record: IRecord = {
            sender: player.character,
            message: player.greeting,
            region: RecordRegion.Chat,
        };
        setRecords([...recordsRef.current, record]);
    };

    useImperativeHandle(ref, () => ({
        append: appendRecord,
    }));

    return (
        <div className="p-2" style={{ border: "solid", height: "80vh" }}>
            <div className="d-flex justify-content-end align-items-center px-1">
                <span
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        flex: 1,
                    }}
                >
                    {"Chat"}
                </span>
                <img
                    src={hare.character}
                    alt=""
                    style={{ width: "1rem" }}
                    className="mx-1"
                    onClick={() => greeting(hare)}
                />
                <img
                    src={tortoise.character}
                    alt=""
                    style={{ width: "1.4rem" }}
                    className="mx-1"
                    onClick={() => greeting(tortoise)}
                />
                <i
                    className="bi bi-trash mx-1"
                    style={{ width: "1rem" }}
                    onClick={clearRecords}
                ></i>
            </div>
            <div
                className="d-flex justify-content-between"
                style={{ height: "80%", overflow: "auto" }}
            >
                <div style={{ flex: 1 }}>
                    <RecordList records={getRecords()} />
                </div>
            </div>
        </div>
    );
});
