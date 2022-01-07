import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PageWrapper } from "../../Shared/PageWrapper";

export const UseLayoutEffectDemo = () => {
    return (
        <PageWrapper>
            <div className="container">
                <div className="row row-cols-1 gy-5">
                    <div className="col">
                        <UseEffect />
                    </div>
                    <div className="col">
                        <UseLayoutEffect />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const UseEffect = () => {
    const [shouldShowLogo, setShouldShowLogo] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const logoRef = useRef<HTMLHeadingElement>(null);
    const onClick = () => {
        setShouldShowLogo(!shouldShowLogo);
    };

    useEffect(() => {
        if (logoRef.current && buttonRef.current) {
            const { right } = buttonRef.current.getBoundingClientRect();
            logoRef.current.style.left = `${right + 50}px`;
        }
    });

    return (
        <div className="container border border-5 p-5">
            <div className="row row-cols-2 gy-3">
                <h1 className="col-8">{"useEffect"}</h1>
                <div className="col">
                    <button
                        ref={buttonRef}
                        className="btn btn-primary btn-lg"
                        onClick={onClick}
                        style={{ width: "136px" }}
                    >
                        {shouldShowLogo ? "Hide logo" : "Show logo"}
                    </button>
                </div>
                <div className="col">
                    {shouldShowLogo && (
                        <h1 ref={logoRef} style={{ position: "absolute" }}>
                            <i className="bi bi-microsoft"></i>
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
};

const UseLayoutEffect = () => {
    const [shouldShowLogo, setShouldShowLogo] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const logoRef = useRef<HTMLHeadingElement>(null);
    const onClick = () => {
        setShouldShowLogo(!shouldShowLogo);
    };

    useLayoutEffect(() => {
        if (logoRef.current && buttonRef.current) {
            const { right } = buttonRef.current.getBoundingClientRect();
            logoRef.current.style.left = `${right + 50}px`;
        }
    });

    return (
        <div className="container border border-5 p-5">
            <div className="row row-cols-2 gy-3">
                <h1 className="col-8">{"useLayoutEffect"}</h1>
                <div className="col">
                    <button
                        ref={buttonRef}
                        className="btn btn-primary btn-lg"
                        onClick={onClick}
                        style={{ width: "136px" }}
                    >
                        {shouldShowLogo ? "Hide logo" : "Show logo"}
                    </button>
                </div>
                <div className="col">
                    {shouldShowLogo && (
                        <h1 ref={logoRef} style={{ position: "absolute" }}>
                            <i className="bi bi-microsoft"></i>
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
};
