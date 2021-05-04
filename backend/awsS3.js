const AWS = require("aws-sdk");
const NAME_OF_BUCKET = "lyrestone";

const multer = require("multer");

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// --------------------------- Public UPLOAD ------------------------

const singlePublicFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");
    // name of the file in the S3 bucket will be the date in ms plus the extension name
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key,
        Body: buffer,
        ACL: "public-read",
    };
    const result = await s3.upload(uploadParams).promise();

    // save the name of the file in the bucket as the key in the database to retrieve for later
    return result.Location;
};

const multiplePublicFileUpload = async (files) => {
    return await Promise.all(
        files.map((file) => {
            return singlePublicFileUpload(file);
        })
    );
};

// --------------------------- Storage ------------------------

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});

const singleMulterUpload = (nameOfKey) => {
    // console.log('Multer Tests!!!!!!!!!!!!!!!!!!!!!', multer({ storage: storage }).single(nameOfKey))
    return multer({ storage: storage }).single(nameOfKey);
}


const multipleMulterUpload = (nameOfKey) =>
    multer({ storage: storage }).array(nameOfKey);

module.exports = {
    s3,
    singlePublicFileUpload,
    multiplePublicFileUpload,
    singleMulterUpload,
    multipleMulterUpload,
};