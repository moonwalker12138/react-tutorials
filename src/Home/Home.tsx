import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Card } from "./Card";
import { UrlInfo } from "../Constants/UrlInfo";
import Grid from "./Grid";
import { MORANDI_COLORS } from "../Constants/Colors";

const Home: React.FC<{}> = () => {
    const cards = [
        // Group
        <Card
            title="useState"
            link={UrlInfo.UseState}
            style={{ backgroundColor: MORANDI_COLORS.Blue }}
        />,
        <Card
            title="useReducer"
            link={UrlInfo.UseReducer}
            style={{ backgroundColor: MORANDI_COLORS.Blue2 }}
        />,
        // Group
        <Card
            title="useEffect"
            link={UrlInfo.UseEffect}
            style={{ backgroundColor: MORANDI_COLORS.Green }}
        />,
        <Card
            title="useLayoutEffect"
            link={UrlInfo.UseLayoutEffect}
            style={{ backgroundColor: MORANDI_COLORS.Green2 }}
        />,
        // Group
        <Card
            title="useContext"
            link={UrlInfo.UseContext}
            style={{ backgroundColor: MORANDI_COLORS.Orange }}
        />,
        <Card
            title="useContext"
            link={UrlInfo.UseContext}
            style={{ backgroundColor: MORANDI_COLORS.Orange, display: "none" }}
        />,
        // Group
        <Card
            title="useRef"
            link={UrlInfo.UseRef}
            style={{ backgroundColor: MORANDI_COLORS.Purple }}
        />,
        <Card
            title="useImperativeHandle"
            link={UrlInfo.UseImperativeHandle}
            style={{ backgroundColor: MORANDI_COLORS.Purple2 }}
        />,
        // Group
        <Card
            title="useMemo"
            link={UrlInfo.UseMemo}
            style={{ backgroundColor: MORANDI_COLORS.Grey }}
        />,
        <Card
            title="useCallback"
            link={UrlInfo.UseCallback}
            style={{ backgroundColor: MORANDI_COLORS.Grey2 }}
        />,
        // Group
        <Card
            title="custom hooks"
            link={UrlInfo.CustomHooks}
            style={{ backgroundColor: MORANDI_COLORS.Yellow }}
        />,
        <Card
            title="useDebugValue"
            link={UrlInfo.UseDebugValue}
            style={{ backgroundColor: MORANDI_COLORS.Yellow2 }}
        />,
    ];

    return <Grid cards={cards} columns={2} />;
};

export default Home;
