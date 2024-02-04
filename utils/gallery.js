const fs = require("fs").promises;

const saveFile = (req, res, next) => {
  // console.log("util")
  if (req.files.file) {
    let file = req.files.file;
    const filename = new Date().valueOf() + "_" + file.name;
    file.mv(`./upload/${filename}`);
    // console.log(file);
    req.body["image"] = filename;
    next();
  } else {
    next(new Error("on image found"));
  }
};

const saveFiles = (req, res, next) => {
  const files = req.files.files;
  let filenames = [];
  files.forEach((file) => {
    let filename = new Date().valueOf() + "_" + file.name;
    file.mv(`./upload/${filename}`);
    filenames.push(filename);
  });
  req.body["images"] = filenames.join(",");
  // console.log(req.files.files);
  // res.status(200).json({ msg: "save multiple photo" });
  next();
};

const deleteFile = async (filename) => {
  await fs.unlink(`./upload/${filename}`);
};

module.exports = { saveFile, saveFiles, deleteFile };
