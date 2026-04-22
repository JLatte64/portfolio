import { myinfo } from "../assets/data/myinfo.json";

export const Banner = () => {

    return (      
    <section>
        <img src="" alt={myinfo.about.name + " photo"}/>
        <p>{myinfo.about.name}</p>
        <p>{myinfo.about.jobTitle}</p>
        <p>
          <span className="material-icons">place</span>
          {myinfo.about.loc}
        </p>
    </section>);
}