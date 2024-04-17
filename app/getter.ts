import { LumaEvent } from "@/types/interfaces";
import axios from "axios";
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);

export const getLumaEvent = async (
    {
        event_id
    }: {
        event_id: string
    }) => {

    const options = {
        method: 'GET',
        url: `https://api.lu.ma/public/v1/event/get?api_id=${event_id}`,
        headers: {
            accept: 'application/json',
            'x-luma-api-key': process.env.LUMA_API_KEY
        }
    };

    const lumaEvent = await axios.request(options)
    return lumaEvent.data.event as LumaEvent;
}

export const getGalleryPhotos = async () => {
    try {
        const directoryPath = path.join(process.cwd(), 'public', 'gallery', 'small');
        const files = await readdir(directoryPath);
        // Filter out non-image files
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        // Map image files to required format
        const images = imageFiles.map(file => ({
            original: path.join('/gallery/small', file),
            thumbnail: path.join('/gallery/thumbnails', file),
        }));
        return images;
    } catch (err) {
        throw new Error(String(err));
    }
}