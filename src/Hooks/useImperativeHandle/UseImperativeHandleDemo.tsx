import { useRef } from "react";
import { Hare, PlayerEntity, Tortoise } from "../../Model/Player";
import { IBillboardRef, RecordRegion } from "../../Shared/Billboard";
import { PageWrapper } from "../../Shared/PageWrapper";
import { Billboard } from "./Billboard";

export const UseImperativeHandleDemo = () => {
    return (
        <PageWrapper showBillboard={false}>
            <Demo />
        </PageWrapper>
    );
};

const Demo = () => {
    const hare = Hare;
    const tortoise = Tortoise;

    const billboardRef = useRef<IBillboardRef>(null);

    const greeting = (player: PlayerEntity) => {
        billboardRef.current?.append({sender: player.character, message: player.greeting, region: RecordRegion.Chat});
    }

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col">
                    <div className="d-flex flex-column align-items-start justify-content-around">
                        <img src={hare.character} alt="" style={{opacity: "0.7", width: "40%"}} onClick={() => greeting(hare)} />
                        <img src={tortoise.character} alt="" style={{opacity: "0.7", width: "40%"}} onClick={() => greeting(tortoise)}/>
                    </div>
                </div>
                <div className="col">
                    <Billboard ref={billboardRef} />
                </div>
            </div>
        </div>
    );
};
