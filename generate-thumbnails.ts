import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

const sourceDir = '.\\public\\gallery';
const targetDir = path.join(sourceDir, 'thumbnails');

async function createThumbnails() {
    try {
        // Ensure the target directory exists
        await fs.ensureDir(targetDir);

        // Read all files in the source directory
        const files = await fs.readdir(sourceDir);

        // Filter out JPEG files
        const imageFiles = files.filter(file => path.extname(file).toLowerCase() === '.jpg');

        // Process each image file
        for (const file of imageFiles) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);

            // Use sharp to resize the image
            await sharp(sourcePath)
                .resize(200) // Resize to 200 pixels wide, maintaining aspect ratio
                .toFile(targetPath);

            console.log(`Thumbnail created for ${file}`);
        }

        console.log('All thumbnails have been created successfully.');
    } catch (error) {
        console.error('Error creating thumbnails:', error);
    }
}

createThumbnails();