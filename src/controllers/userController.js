import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
    const { name, email, username, password1, password2, location } = req.body;
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (password1 !== password2) {
        return res.render("join", { pageTitle: "Join", errorMessage: "Password Verification failed.. Try again" });
    }
    if (exists) {
        return res.render("join", { pageTitle: "Join", errorMessage: "This username/email is already taken." });
    }
    await User.create({
        name, email, username, password1, location,
    });
    return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User Profile");