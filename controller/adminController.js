import { admin } from "../models/admin.js";

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // const adminCreated = await admin.create({ username, password });

        const adminCreated = await admin.findOne({ username, password });

        if (!adminCreated) {
            return res.status(403).json({ message: 'admin username or password wrong.' });
        }
        return res.status(200).json({ message: 'admin login.' });

    } catch (error) {
        return res.status(403).json({ message: 'admin access denied.' });
    }
}