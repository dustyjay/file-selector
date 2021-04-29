export const fetchFolders = async () => {
  try {
    const res = await fetch('https://api-dev.reo.so/api/folderStructure');
    const result = await res.json();
    return formatStructure(result);
  } catch (err) {
    throw new Error(err);
  }
};

const formatStructure = obj => {
  const { folders = [], files = [] } = obj;
  let finalObj = {};
  if (folders.length > 0) {
    for (let index = 0; index < folders.length; index++) {
      const { id, ...other } = folders[index];
      const { name } = other;
      finalObj[id] = { name, type: 'folder', children: formatStructure(other) };
    }
  }
  if (files.length > 0) {
    const allFiles = formatFiles(files);
    finalObj = { ...finalObj, ...allFiles };
  }
  return finalObj;
};

const formatFiles = files => {
  const allFiles = {};
  for (let index = 0; index < files.length; index++) {
    const { id, name, url: image } = files[index];
    allFiles[id] = { name, image, type: 'file' };
  }
  return allFiles;
};
