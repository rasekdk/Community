const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const sharp = require('sharp');

const { AVATAR_DIR, POST_IMG_DIR, COM_IMG_DIR } = process.env;

async function editSavePhoto(file, pathName, width, height) {
  try {
    const extension = file.mimetype.split('/')[1];

    const name = `${uuid.v4()}.${extension}`;

    const image = sharp(file.data);

    !width && !height ? image : image.resize(width, height);

    pathName === 'users'
      ? await image.toFile(path.join(AVATAR_DIR, name))
      : pathName === 'posts'
      ? await image.toFile(path.join(POST_IMG_DIR, name))
      : pathName === 'communities'
      ? await image.toFile(path.join(COM_IMG_DIR, name))
      : null;

    const fileName = `/${pathName}/${name}`;

    return fileName;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  editSavePhoto,
};
