// import { LumaEvent } from "@/types/interfaces";
// import axios from "axios";

// export const getLumaEvent = async (
//     {
//         event_id
//     }: {
//         event_id: string
//     }) => {

//     const options = {
//         method: 'GET',
//         url: `https://api.lu.ma/public/v1/event/get?api_id=${event_id}`,
//         headers: {
//             accept: 'application/json',
//             'x-luma-api-key': process.env.LUMA_API_KEY
//         }
//     };

//     const lumaEvent = await axios.request(options)
//     return lumaEvent.data as LumaEvent;
// }