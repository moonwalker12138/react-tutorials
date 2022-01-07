import React, { useEffect, useRef, useState } from "react";
import { PageWrapper } from "../../Shared/PageWrapper";
import { useUpdateRefs } from "../../Utils";

export const UseRefDemo = () => {
    return (
        <PageWrapper>
            <div className="container">
                <div className="row row-cols-1 gy-5">
                    <div className="col">
                        <ReferToValue />
                    </div>
                    <div className="col">
                        <ReferToDOM />
                    </div>
                    <div className="col">
                        <TextAreaWithUseRef />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const ReferToValue = () => {
    const countRef = useRef<number>(0);
    const [input, setInput] = useState("");

    useEffect(() => {
        countRef.current = countRef.current + 1;
    });

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value);
    };

    return (
        <div className="container border border-5 p-5 bg-success bg-opacity-75">
            <div className="row row-cols-2 align-items-center gy-3">
                <div className="col-8">
                    <h1>{"Refer to a value"}</h1>
                </div>
                <div className="col-8">
                    <input
                        type="text"
                        className="form-control"
                        onChange={onChange}
                    />
                </div>
                <div className="col-8">
                    <h3>{`This component rendered ${countRef.current} times`}</h3>
                </div>
            </div>
        </div>
    );
};

const ReferToDOM = () => {
    const domRef = useRef<HTMLInputElement>(null);

    const focus = () => {
        if (domRef.current) {
            domRef.current.focus();
        }
    };

    return (
        <div className="container border border-5 p-5 bg-success bg-opacity-75">
            <div className="row row-cols-2 align-items-center gy-3">
                <div className="col-8">
                    <h1>{"Refer to a DOM"}</h1>
                </div>
                <div className="col-7">
                    <input type="text" className="form-control" ref={domRef} />
                </div>
                <div className="col-2">
                    <button className="btn btn-primary" onClick={focus}>
                        {"Focus"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const TextAreaWithUseRef = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const dbRef = useRef<HTMLTextAreaElement>(null);
    useUpdateRefs();

    const clear = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const submitAll = () => {
        if (inputRef.current && dbRef.current) {
            dbRef.current.value =
                dbRef.current.value + inputRef.current.value.trim() + "\n";
        }
        clear();
    };

    const submitSelection = () => {
        if (inputRef.current && dbRef.current) {
            const start = inputRef.current.selectionStart;
            const end = inputRef.current.selectionEnd;
            dbRef.current.value =
                dbRef.current.value +
                inputRef.current.value.substring(start, end).trim() +
                "\n";
        }
    };

    const reset = () => {
        if (dbRef.current) {
            dbRef.current.value = "";
        }
    };

    console.log("YF re-render");

    return (
        <div className="container border border-5 p-5 bg-danger bg-opacity-75">
            <div className="row row-cols-2 gy-3">
                <div className="col-8">
                    <h1>{"Bad use case"}</h1>
                </div>
                <div className="col">
                    <h3>{"Input:"}</h3>
                    <textarea
                        ref={inputRef}
                        className="form-control col mb-3"
                        cols={30}
                        rows={10}
                    ></textarea>
                    <div className="row justify-content-between">
                        <div className="col-6"></div>
                        <button
                            className="btn btn-primary col-2"
                            onClick={clear}
                        >
                            {"Clear"}
                        </button>
                        {/* <button className="btn btn-primary col-4" onClick={submitAll}>{"Submit Selection"}</button> */}
                        <button
                            className="btn btn-primary col-2"
                            onClick={submitAll}
                        >
                            {"Submit"}
                        </button>
                    </div>
                </div>

                <div className="col">
                    <h3>{"Database:"}</h3>
                    <textarea
                        readOnly
                        ref={dbRef}
                        className="form-control col mb-3"
                        cols={30}
                        rows={10}
                    ></textarea>
                    <div className="row justify-content-between">
                        <div className="col-9"></div>
                        <button
                            className="btn btn-primary col-2"
                            onClick={reset}
                        >
                            {"Reset"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TextAreaWithUseState = () => {
    const [input, setInput] = useState("");
    const [db, setDB] = useState("");

    const clear = () => {
        setInput("");
    };

    const submit = () => {
        setDB(db + input.trim() + "\n");
        clear();
    };

    const reset = () => {
        setDB("");
    };

    const onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setInput(e.currentTarget.value);
    };

    console.log("YF re-render");

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>{"Input:"}</h1>
                    <textarea
                        className="form-control col mb-3"
                        cols={30}
                        rows={10}
                        value={input}
                        onChange={onChange}
                    ></textarea>
                    <div className="row justify-content-between">
                        <div className="col-7"></div>
                        <button
                            className="btn btn-primary col-2"
                            onClick={clear}
                        >
                            {"Clear"}
                        </button>
                        <button
                            className="btn btn-primary col-2"
                            onClick={submit}
                        >
                            {"Submit"}
                        </button>
                    </div>
                </div>

                <div className="col">
                    <h1>{"Database:"}</h1>
                    <textarea
                        readOnly
                        className="form-control col mb-3"
                        cols={30}
                        rows={10}
                        value={db}
                    ></textarea>
                    <div className="row justify-content-between">
                        <div className="col-9"></div>
                        <button
                            className="btn btn-primary col-2"
                            onClick={reset}
                        >
                            {"Reset"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
