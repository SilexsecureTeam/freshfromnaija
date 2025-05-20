import Header from "../components/header";
import Footer from "../components/footer";
import WelcomeComponent from "../components/welcome";

function Welcome() {
    return (
        <div>
            <Header />
            <WelcomeComponent /> 
            {/* <Footer /> */}
        </div>
    );
}
export default Welcome;