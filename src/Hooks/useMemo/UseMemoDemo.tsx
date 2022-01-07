import React, { useMemo, useState } from "react";
import { APPLE_RAINBOW_COLORS } from "../../Constants/Colors";
import { PageWrapper } from "../../Shared/PageWrapper";
import { getRandomInt, sleep, useUpdateRefs } from "../../Utils";

export const UseMemoDemo = () => {
    const [index, setIndex] = useState(0);
    const backgroundColor =
        APPLE_RAINBOW_COLORS[index % APPLE_RAINBOW_COLORS.length];

    const onClick = () => setIndex(index + 1);
    // const result = compute();
    const result = useMemo(compute, []);

    useUpdateRefs();

    return (
        <PageWrapper>
            <div>
                <div
                    className="container p-3"
                    style={{
                        backgroundColor: backgroundColor,
                        height: "400px",
                    }}
                >
                    <div className="row">
                        <div className="col">
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={onClick}
                            >
                                {"Render"}
                            </button>
                        </div>
                        <div className="col">
                            <h3>{`Result: ${result}`}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const compute = () => {
    // sleep(2000);
    return 42;
};
