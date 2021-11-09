import multer from 'multer';
import path from 'path';
class UploadService {

    uploadSingleFile(){
       var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/')
          },
          filename:(req, file, cb) => {
            cb(null,Date.now().toString()+path.extname(file.originalname))
          }
       });
       var uploadObject = multer({storage:storage});
       return uploadObject;
    }

}

export default new UploadService();