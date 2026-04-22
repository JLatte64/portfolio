import ProjectWidgetsDisplay from "../components/ProjectWidgetsDisplay";

export const SelectedWork = () => {
    return (
    <section>
        <h1>Selected Work</h1>
        {/* Maps contents of Projects array as ProjectWidgets + Displays */}
        {<ProjectWidgetsDisplay tag="selected"/>}
    </section>);
}