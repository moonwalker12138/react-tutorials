import { UrlInfo } from "./Constants/UrlInfo";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import { Error } from "./Error";
import { UseRefDemo } from "./Hooks/useRef/UseRefDemo";
import { UseImperativeHandleDemo } from "./Hooks/useImperativeHandle/UseImperativeHandleDemo";
import { UseContextDemo } from "./Hooks/useContext/UseContextDemo";
import { UseMemoDemo } from "./Hooks/useMemo/UseMemoDemo";
import { UseCallbackDemo } from "./Hooks/useCallback/UseCallbackDemo";
import { UseLayoutEffectDemo } from "./Hooks/useLayoutEffect/UseLayoutEffectDemo";
import { UseReducerDemo } from "./Hooks/useReducer/UseReducerDemo";
import { UseDebugValueDemo } from "./Hooks/useDebugValue/useDebugValueDemo";
import { UseStateDemo } from "./Hooks/useState/UseStateDemo";
import { UseEffectDemo } from "./Hooks/useEffect/UseEffectDemo";
import { Header } from "./PageWrapper/Header";
import React from "react";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={UrlInfo.Home} element={<Home />} />
                    <Route path={UrlInfo.UseRef} element={<UseRefDemo />} />
                    <Route
                        path={UrlInfo.UseImperativeHandle}
                        element={<UseImperativeHandleDemo />}
                    />
                    <Route
                        path={UrlInfo.UseContext}
                        element={<UseContextDemo />}
                    />
                    <Route path={UrlInfo.UseMemo} element={<UseMemoDemo />} />
                    <Route
                        path={UrlInfo.UseCallback}
                        element={<UseCallbackDemo />}
                    />
                    <Route
                        path={UrlInfo.UseLayoutEffect}
                        element={<UseLayoutEffectDemo />}
                    />
                    <Route
                        path={UrlInfo.UseReducer}
                        element={<UseReducerDemo />}
                    />
                    <Route
                        path={UrlInfo.UseDebugValue}
                        element={<UseDebugValueDemo />}
                    />
                    <Route path={UrlInfo.UseState} element={<UseStateDemo />} />
                    <Route
                        path={UrlInfo.UseEffect}
                        element={<UseEffectDemo />}
                    />
                    <Route path={"*"} element={<Error />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
