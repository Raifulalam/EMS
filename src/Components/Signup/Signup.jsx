import React, { useState } from "react";

function SignupComponent() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [role, setRole] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Name: ", name)
        console.log("Email: ", email)
        console.log("Password: ", password)
        console.log("Phone: ", phone)
        console.log("Role: ", role)
    }

    return (
        <div className="signup_component">
            <div className="signupPage">
                <h2>Welcome to Event Management System!</h2>
                <p>please fill the details to create the account.</p>
                <div className="signup">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Full Name</label>
                        <input type="text"
                            placeholder="Enter full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                        <input type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                        <input type="number"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignupComponent;