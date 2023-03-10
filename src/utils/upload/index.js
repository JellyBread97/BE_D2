import path, { dirname, extname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirectory = path.join(__dirname, "../../../public");

export const parseFile = multer();
export const uploadFile = (req, res, next) => {
  try {
    const { originalname, buffer } = req.file;
    const extension = extname(originalname);
    const fileName = `${req.params.id}${extension}`;
    const pathToFile = path.join(publicDirectory, fileName);
    fs.writeFileSync(pathToFile, buffer);
    const link = `https://localhost:3001/${fileName}`;
    req.file = link;
    next();
  } catch (error) {
    next(error);
  }
};
