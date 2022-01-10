import React, { useImperativeHandle, useRef } from "react";

export interface ILoggerRef {
    logging: (content: string) => void;
}

const DefaultValue = "Log:\n\n";
const ColumnCount = 30;
const RowCount = 40;
const Divider = "-".repeat(10);

export const Logger = React.forwardRef((props, ref) => {
    const textRef = useRef<HTMLTextAreaElement>(null);

    const onClear = () => {
        if (textRef.current) {
            textRef.current.value = DefaultValue;
        }
    };

    const onDivide = () => {
        if (textRef.current) {
            textRef.current.value = textRef.current.value + Divider + "\n";
        }
    };

    useImperativeHandle(ref, () => ({
        logging: (content: string) => {
            if (textRef.current) {
                textRef.current.value =
                    textRef.current.value + content.trim() + "\n";
            }
        },
    }));

    return (
        <div style={{ position: "relative" }}>
            <textarea
                ref={textRef}
                className="form-control col mb-3 bg-light"
                cols={ColumnCount}
                rows={RowCount}
                defaultValue={DefaultValue}
                spellCheck={false}
            ></textarea>
            <h2>
                <i
                    className="bi bi-hr"
                    style={{
                        position: "absolute",
                        left: "10px",
                        bottom: "10px",
                    }}
                    onClick={onDivide}
                ></i>
                <i
                    className="bi bi-trash"
                    style={{
                        position: "absolute",
                        right: "10px",
                        bottom: "10px",
                    }}
                    onClick={onClear}
                ></i>
            </h2>
        </div>
    );
});
