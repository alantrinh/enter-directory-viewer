import { useState } from 'react';
import './App.css';
import Column from './components/Column';
import map from 'lodash/fp/map';
import find from 'lodash/fp/find';

function App() {
  const [folders, setFolders] = useState([{ name: 'root', subfolders: [] }]); // contains the folder structure
  const [currentFolder, setCurrentFolder] =  useState(''); // keeps track of the currently selected folder

  // Add folder method recursively traverses the folder structure and adds a new folder in place
  const addFolder = (folders, path, newFolderName) => {
    if (path.length === 0 || path.length === 1 && path[0] === '') {
      folders.push({ name: newFolderName, subfolders: [] });
      return;
    }

    const [nextFolderName, ...remainingPath] = path;
    const nextFolders = folders.find(
      folder => folder.name === nextFolderName
    ).subfolders;

    if (!nextFolders) {
      throw new Error(`Folder ${nextFolderName} not found`);
    }

    addFolder(nextFolders, remainingPath, newFolderName);
  }

  // Handles creation of a new folder
  const handleCreateFolder = path => {
    const newName = prompt('Enter folder name');
    if (newName) {
      addFolder(folders, path.split('/'), newName);
      setFolders([...folders]); // this forces a re-render as React doesn't detect changes in nested objects
      setCurrentFolder(path);
    }
  };

  // Remove folder method recursively traverses the folder structure and removes a folder in place
  const removeFolder = (folders, path) => {
    if (path.length === 1) {
      const index = folders.findIndex(folder => folder.name === path[0]);
      
      if (index > -1) {
        folders.splice(index, 1);
      }

      return;
    }

    const [nextFolderName, ...remainingPath] = path;
    const nextFolders = folders.find(
      folder => folder.name === nextFolderName
    ).subfolders;

    if (!nextFolders) {
      throw new Error(`Folder ${nextFolderName} not found`);
    }
    removeFolder(nextFolders, remainingPath);
  }

  // Handles deletion of a folder
  const handleDeleteFolder = path => {
    removeFolder(folders, path.split('/'));
    setFolders([...folders]); // this forces a re-render as React doesn't detect changes in nested objects
    setCurrentFolder(path.split('/').slice(0, -1).join('/'));
  };

  // Renders the columns
  const renderColumns = () => {
    let renderedFolder = folders;
    let path = '';

    return (
      [
        <Column
          key="/"
          folders={folders}
          path={path}
          onCreateFolder={handleCreateFolder}
          onDeleteFolder={handleDeleteFolder}
          setCurrentFolder={setCurrentFolder}
        />,
        map(folderName => {
          renderedFolder = find(['name', folderName])(renderedFolder).subfolders;
          path = path ? `${path}/${folderName}` : folderName;
          return (
            <Column
              key={folderName}
              folders={renderedFolder}
              path={path}
              onCreateFolder={handleCreateFolder}
              onDeleteFolder={handleDeleteFolder}
              setCurrentFolder={setCurrentFolder}
            />
          );
        })(currentFolder && currentFolder.split('/'))
      ]
    );
  }

  return (
    <div>
      <h1>Enter Directory Viewer</h1>
      <div className="ui-grid">
        {renderColumns()}
      </div>
    </div>
  );
}

export default App;
