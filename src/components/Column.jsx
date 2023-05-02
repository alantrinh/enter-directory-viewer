import Folder from './Folder';
import map from 'lodash/fp/map'

const Column = ({ folders, path, onCreateFolder, onDeleteFolder, setCurrentFolder }) => {
    return (
        <div className="column">
            {map(folder => (
                <Folder
                    key={folder.name}
                    name={folder.name}
                    path={path}
                    onCreateFolder={onCreateFolder}
                    onDeleteFolder={onDeleteFolder}
                    setCurrentFolder={setCurrentFolder}
                />
            ))(folders)}
        </div>
    );
}

export default Column;