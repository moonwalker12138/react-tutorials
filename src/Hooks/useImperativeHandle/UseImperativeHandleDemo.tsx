import { useRef } from "react";
import { Hare, PlayerEntity, Tortoise } from "../../Model/Player";
import { Billboard, IBillboardRef } from "../../Shared/Billboard";
import { PageWrapper } from "../../Shared/PageWrapper";
import SystemImg from "../../Images/System.png";

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
        billboardRef.current?.append({sender: player.character, message: player.greeting});
    }

    const logging = () => {
        billboardRef.current?.append({sender: SystemImg, message: "I'm watching YOU!"});
    }

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col">
                    <div className="d-flex flex-column align-items-start justify-content-between">
                        <img src={hare.character} alt="" style={{opacity: "0.7", width: "40%"}} onClick={() => greeting(hare)} />
                        <img src={tortoise.character} alt="" style={{opacity: "0.7", width: "40%"}} onClick={() => greeting(tortoise)}/>
                        <img src={SystemImg} alt="" style={{opacity: "0.7", width: "40%"}} onClick={logging}/>
                    </div>
                </div>
                <div className="col">
                    <Billboard ref={billboardRef} />
                </div>
            </div>
        </div>
    );
};
