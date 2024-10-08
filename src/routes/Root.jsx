import "../App.css"
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Search from "../components/Search";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function Root() {
    return (
      <>
        <SEO />
        <Header />
        <Nav />
        <Search />
      <div className="App">
        <Outlet />
      </div>
      <Footer/>
      </>
    );
  }
