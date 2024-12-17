import { createLazyFileRoute } from "@tanstack/react-router";
import "../index.css";
import banner from "../assets/img/home-banner.png";
import HomepageTicketSearch from "../components/HomepageTicketSearch";
import HomepageFlightList from "../components/HomepageFlightList";

export const Route = createLazyFileRoute("/")({
    component: Index,
});
function Index() {
    return (
        <div className="flex flex-col items-center">
            {/* banner */}
            <div className="w-full h-fit flex justify-center relative my-16 mb-24 bg-gradient-to-r from-white to-white md:from-darkblue3 md:to-darkblue3 phone:h-32 phone:mb-16">
                <div className="w-full max-w-7xl h-fit flex items-center justify-center absolute -top-14 phone:h-60">
                    <img src={banner} />
                </div>
            </div>

            {/* search */}
            <HomepageTicketSearch />

            {/* list */}
            <HomepageFlightList />
        </div>
    );
}
