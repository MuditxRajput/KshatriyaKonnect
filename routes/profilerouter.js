import express from 'express'
import { auth_middleware } from '../middleware/auth.middleware.js';
import { profileValidation } from '../utils/zod-validation.js';
import { Profile } from '../database/profile.model.js';
import { uploadImages } from '../utils/cloudinary.js';
import { upload } from '../utils/multer.js';
import { success } from 'zod';
const profileRouter = express.Router();

profileRouter.post('/new', auth_middleware, upload.array('photo', 5), async (req, res) => {
  try {
    const id = req.user._id;
    const existed_user_profile = await Profile.findOne({ user_id: id });
    if (existed_user_profile) return res.status(400).json({ success: false, msg: 'User profile is already there' })
    const parsed = profileValidation.parse(req.body);
    if (!parsed) throw new Error('Invalid data');
    parsed["longitude"] = req.body.longitude;
    parsed["latitude"] = req.body.latitude;
    const { firstname, lastname, age, interestedIn, education, gender, height, longitude, latitude } = parsed;
    // before created user profile we have to save the user profile in the s3 and get the link
    const photo = req.files.map((file) => file.path);
    console.log("photo", photo);

    const cloudinary_image_url = await uploadImages(photo);
    const profile = new Profile({
      firstname,
      lastname,
      age,
      interestedIn,
      education,
      gender,
      height,
      longitude,
      latitude,
      photo: cloudinary_image_url,
      user_id: req.user._id
    })
    const profile_data = await profile.save();
    if (!profile_data) throw new Error('something went wrong');
    return res.status(200).json({ success: true, profile_data });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: error
      })
    }
    else {
      return res.status(400).json({
        success: false,
        message: error
      })
    }

  }
})
profileRouter.patch('/update', auth_middleware, upload.array('photo', 5), async (req, res) => {
  try {
    const id = req.user._id;
    const existed_user_profile = await Profile.findOne({ user_id: id });


    if (!existed_user_profile) return res.status(400).json({ success: false, msg: 'User profile is already there' });

    const updates = req.body;
    const photos = req.files.map((file) => file.path);
    const replaceIds = updates.replaceIds ? JSON.parse(updates.replaceIds) : [];

    const allowedfield = ['interestedIn', 'education', 'photo'];
    allowedfield?.map((fields) => {
      if (updates[fields] !== "undefined" && fields !== "photo") {
        existed_user_profile[fields] = updates[fields];
      }
    })
    if (photos && photos.length > 0) {
      //upload in cloudinary
      const images_url = await uploadImages(photos);
      console.log("new image", images_url);

      const previous_images = existed_user_profile.photo;
      if (replaceIds.length > 0) {
        images_url.forEach((url, idx) => {
          const replacedIndex = previous_images.findIndex(img => img.public_id === replaceIds[idx]);
          console.log(replacedIndex);

          if (replacedIndex !== -1) {
            previous_images[replacedIndex] = url;
          }
          else {
            previous_images.push(url);
          }

        })
      }

    }
    await existed_user_profile.save();
    res.status(200).json({ success: true, msg: "Profile updated", data: existed_user_profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server error", error: error.message });
  }
})
export default profileRouter;