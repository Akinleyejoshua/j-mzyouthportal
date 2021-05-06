import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Loader from "../components/Loader";
import ListFeed from "../components/ListFeed";
import {useSelector} from "react-redux";

const Home = () => {
    document.title = "Home";

    const loading = useSelector(state => state.profile.loading);
    const mysettings = useSelector(state => state.mysettings);
    const feeds = useSelector(state => state.listfeed);

    return(
        <div id="home" className={mysettings.darkmode === true ? "dark-mode" : undefined}>
            {(loading === true || feeds.loading === true) && <Loader />}
            <Header/>
            <main>
                <ListFeed/>
            </main>
            <BottomNav/>
        </div>
    )
}

export default Home;