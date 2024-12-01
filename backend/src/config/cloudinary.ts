import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (localFilePath: string, filename: string) => {
    try {
        var folder = "KlowHub-api";
        var filePathOnCloudinary = folder + "/" + path.parse(filename).name;
        const result = await cloudinary.uploader.upload(
            localFilePath,
            { "public_id": filePathOnCloudinary }
        )
        return result;
    } catch (error) {
        console.log(error);
        return { message: "Error al subir a Cloudinary" };
    } finally {
        fs.unlinkSync(localFilePath)
    }
}

const deleteFromCloudinary = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);
        return { message: "Error al eliminar de Cloudinary" }
    }
}

export default {
    uploadToCloudinary,
    deleteFromCloudinary
};