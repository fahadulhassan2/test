import { set, connect } from "mongoose";

set('strictQuery', true);
export const connectionDB = async (url) => {
    try {
        await connect(url);
        console.log('Connected');
    } catch (error) {
        console.log('Error', error);
    }
}