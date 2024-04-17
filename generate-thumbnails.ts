import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

const sourceDir = '.\\public\\gallery';
const targetDir = path.join(sourceDir, 'thumbnails');

async function createThumbnails() {
    try {
        // Define directories
        const thumbnailDir = path.join(sourceDir, 'thumbnails');
        const smallDir = path.join(sourceDir, 'small');

        // Ensure the directories exist
        await fs.ensureDir(thumbnailDir);
        await fs.ensureDir(smallDir);

        // Read all files in the source directory
        const files = await fs.readdir(sourceDir);

        // Filter out JPEG files
        const imageFiles = files.filter(file => path.extname(file).toLowerCase() === '.jpg');

        // Process each image file
        for (const file of imageFiles) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(thumbnailDir, file);
            const smallerImagePath = path.join(smallDir, file);

            // Use sharp to resize the image
            await sharp(sourcePath)
                .resize(200) // Resize to 200 pixels wide, maintaining aspect ratio
                .toFile(targetPath);

            // Create smaller image
            await sharp(sourcePath)
                .resize(800) // Resize to 800 pixels wide, maintaining aspect ratio
                .toFile(smallerImagePath);

            console.log(`Thumbnail and smaller image created for ${file}`);
        }

        console.log('All thumbnails and smaller images have been created successfully.');
    } catch (error) {
        console.error('Error creating thumbnails and smaller images:', error);
    }
}

createThumbnails();