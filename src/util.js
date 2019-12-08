import fs from 'react-native-fs';

class FsService {
  prepareLibraryDirectoryPath = (...args) => {
    return [fs.LibraryDirectoryPath, ...args].join('/');
  };

  createDirectoryInLibrary = (dirname) => {
    return fs.mkdir(dirname);
  };

  readJsonFile = async (filename) => {
    const filenameInLibrary = this.prepareLibraryDirectoryPath(filename);
    try {
      const isFileExists = await fs.exists(filenameInLibrary);

      if (!isFileExists) return;

      const fileContent = await fs.readFile(filenameInLibrary);
      const fileContentObject = JSON.parse(fileContent);

      return fileContentObject.fileContent;
    } catch (error) {
      return error;
    }
  };

  writeJsonFile = async (filename, fileContent) => {
    const directoryInLibrary = this.prepareLibraryDirectoryPath();
    try {
      this.createDirectoryInLibrary(directoryInLibrary);

      const filenameInLibrary = this.prepareLibraryDirectoryPath(filename);
      const fileContentString = JSON.stringify({ fileContent });

      return fs.writeFile(filenameInLibrary, fileContentString);
    } catch (error) {
      ExceptionService.captureException(error);
      return error;
    }
  };
}

export default new FsService();