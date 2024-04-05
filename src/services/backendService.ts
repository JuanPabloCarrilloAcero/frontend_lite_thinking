import axios, {AxiosResponse} from "axios";
import getToken from "../methods/localStorage/Token/getToken";

function nonVerifiedInstance() {

    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL, headers: {
            'Content-Type': 'application/json',
        }
    });

}

function verifiedInstance() {

    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL, headers: {
            'Content-Type': 'application/json',
            'Authorization ': 'Bearer ' + getToken()
        }
    });

}

export async function backendService(request: string, url: string, body: any, verifyToken: boolean) {

    const instance = verifyToken ? verifiedInstance() : nonVerifiedInstance();

    try {

        let response: AxiosResponse<any, any>;

        if (request === "GET") {
            response = await instance.get(url);
        } else if (request === "POST") {
            response = await instance.post(url, body);
        } else if (request === "DELETE") {
            response = await instance.delete(url);
        } else {
            throw new Error("Invalid request type");
        }

        return response.data;

    } catch (error: any) {

        if (error?.response?.status !== 200) {
            throw new Error("Error: " + (error.response?.status || "Unknown status") + " " + (error.response?.statusText || "Unknown status text"));
        }


        throw new Error(error.message);
    }

}