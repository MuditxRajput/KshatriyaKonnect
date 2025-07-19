import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImages = async (filePaths) => {
  try {
    const uploads = filePaths.map(async (filePath) => {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'user_profiles',
        use_filename: true,
        unique_filename: false,
        overwrite: true
      });

      // Optionally remove local file after upload
      await fs.unlink(filePath);

      return result;
    //   return { asset_id: result.asset_id, url:result.secure_url };
    });

    const secureUrls = await Promise.all(uploads);
   const image_data =  secureUrls?.map((val)=>({public_id : val.asset_id,url : val.secure_url}));
   return image_data;
    
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed');
  }
};
