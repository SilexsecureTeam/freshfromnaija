import { useState } from "react";
import RiderSidebar from "../components/rider_sideBar";
import DashHeader from "../components/dashHeader";
import RidersDash from "../components/riderDash";
import { Link } from "react-router-dom";


export default function RiderDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row bg-[#ffffff] text-white min-h-screen">
            <RiderSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="flex-1 space-y-6 md:pt-20 md:p-4 lg:pt-1 ml-0 lg:ml-64">
                <DashHeader onHamburgerClick={() => setIsSidebarOpen(open => !open)} />
                <RidersDash />
            </main>
        </div>
    );
}
