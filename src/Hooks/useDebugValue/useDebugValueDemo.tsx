import React, { useState } from "react";
import { PageWrapper } from "../../Shared/PageWrapper";
import { useForceUpdate } from "../../Utils";

export const UseDebugValueDemo = () => {
    const [count, setCount] = useState(0);

    const forceUpdate = useForceUpdate();

    return (
        <PageWrapper>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <button
                                className="btn btn-primary"
                                onClick={() => setCount(count + 1)}
                            >{`Count: ${count}`}</button>
                        </div>
                        <div className="col">
                            <button
                                className="btn btn-primary"
                                onClick={forceUpdate}
                            >
                                {"Force Update"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
