import ProjectWidgetsDisplay from "../components/ProjectWidgetsDisplay";
import { myinfo } from "../data/myinfo.json";

export function Home() {
    return (<>
    <section>
        <img src="" alt={myinfo.about.name + " photo"}/>
        <p>{myinfo.about.name}</p>
        <p>{myinfo.about.jobTitle}</p>
        <p>
          <span className="material-icons">place</span>
          {myinfo.about.loc}
        </p>
    </section>
    <section>
        <h1>Selected Work</h1>
        {/* Maps contents of Projects array as ProjectWidgets + Displays */}
        {<ProjectWidgetsDisplay tag="selected"/>}
    </section>
    <section>
        <h1>Work Snapshots</h1>
        <ProjectWidgetsDisplay tag="snapshot" />
    </section>
    </>);
}