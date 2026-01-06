// Injects a safer rename that falls back to copy + unlink when cross-device links are disallowed.
// This helps in sandboxed environments where fs.rename throws EXDEV.
const fs = require('fs');

const origRenamePromise = fs.promises.rename.bind(fs.promises);
fs.promises.rename = async (from, to) => {
  try {
    return await origRenamePromise(from, to);
  } catch (err) {
    if (err && err.code === 'EXDEV') {
      await fs.promises.copyFile(from, to);
      await fs.promises.unlink(from);
      return;
    }
    throw err;
  }
};

const origRename = fs.rename.bind(fs);
fs.rename = (from, to, cb) => {
  const callback = typeof cb === 'function' ? cb : () => {};
  origRename(from, to, (err) => {
    if (err && err.code === 'EXDEV') {
      fs.copyFile(from, to, (copyErr) => {
        if (copyErr) return callback(copyErr);
        fs.unlink(from, (unlinkErr) => callback(unlinkErr || null));
      });
    } else {
      callback(err || null);
    }
  });
};
