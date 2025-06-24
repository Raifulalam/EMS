import React from "react";
import EventList from "../Events/EventList";
function HomeComponents() {
    return (
        <div className="home_container">
            <div className="homePage">
                <h2>Welcome to </h2>
                <h3>the Event Management System</h3>
            </div>
            <button>Request to add an Event</button>
            <EventList />
        </div>
    );
}

export default HomeComponents;
