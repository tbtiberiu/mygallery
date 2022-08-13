import NavigationBar from "./NavigationBar/NavigationBar";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
    return (
        <>
            <NavigationBar />
            {children}
            <Footer />
        </>
    )
}

export default Layout;