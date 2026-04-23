import { myinfo } from "../assets/data/myinfo.json";

export const Resume = () => {
    return (<>
        <button>Download/View Resume (pdf)</button>
        <iframe src={myinfo.resume} frameBorder="0"></iframe>
    </>);
}