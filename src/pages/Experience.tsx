import { NavBar } from "../components/NavBar";
import { myinfo } from "../data/myinfo.json";

export function Experience() {
    const webResumeText = myinfo.resume.roles.map
                        ((roles) => (<>
                            <h4>{roles.role === "" ? null : roles.role }</h4>
                            <h4>({roles.timeframe === "" ? null : roles.timeframe })</h4>
                            <p>{roles.desc === "" ? null : roles.desc }</p>
                        </>));
    

    return (<>
    <NavBar />
        <button>Click to view Resume PDF</button>
        <div className="web-resume">
            <h3>Experience</h3>
            {webResumeText}
        </div>
    <div className="resumePreview">
        <button>Download Resume (PDF)</button>
        <iframe src={myinfo.resume.media.src} width="250px" height="353px"></iframe>
    </div>
    </>);
}