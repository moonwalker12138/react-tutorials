import React, { useState } from "react";
import { PageWrapper } from "../../Shared/PageWrapper";
import { Container } from "../../Shared/Container";
import { RaceTrack } from "./RaceTrack";
import { Hare, Tortoise } from "../../Model/Player";

/* Create players with state */
export const UseStateDemo = () => {
    return (
        <PageWrapper>
            <Game />
        </PageWrapper>
    );
};

const Game = () => {
    const hare = Hare;
    const tortoise = Tortoise;

    const [hareProgress, setHareProgress] = useState(0);
    const [tortoiseProgress, setTortoiseProgress] = useState(0);

    const onForward = () => {
        if (hareProgress !== 10) {
            setHareProgress(hareProgress + hare.getStep());
        }

        if (tortoiseProgress !== 10) {
            setTortoiseProgress(tortoiseProgress + tortoise.getStep());
        }
    }

    return (
        <Container 
            hareRaceTrack={<RaceTrack character={hare.character} progress={hareProgress}/>}
            tortoiseRaceTrack={<RaceTrack character={tortoise.character} progress={tortoiseProgress}/>}
            onForward={onForward}
        />
    );
};

// const Hare = () => {
//     const [progress, setProgress] = useState(0);
//     const onForward = () => {
//         if (progress === 10) return;
//         const step = getRandomBoolean() ? 2 : 0;
//         setProgress(progress + step);
//     };

//     return (
//         // <CodeWrapper code={codeA} position={CodePosition.TopRight}>
//             <Player character={HareImg} progress={progress} onForward={onForward} />
//         // </CodeWrapper>
//     );
// };


// interface ISate {
//     progress: number;
// }

// class Tortoise extends Component<{}, ISate> {
//     constructor(props: {}) {
//         super(props);
//         this.state = { progress: 0 };
//         this.onForward = this.onForward.bind(this);
//     }

//     public render(): React.ReactNode {
//         return (
//             // <CodeWrapper code={codeB} position={CodePosition.TopRight}>
//                 <Player character={TortoiseImg} progress={this.state.progress} onForward={this.onForward} />
//             // </CodeWrapper>
//         );
//     }

//     private onForward() {
//         if (this.state.progress === 10) return;
//         this.setState({ progress: this.state.progress + 1 });
//     }
// }
