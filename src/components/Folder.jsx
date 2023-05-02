const Folder = ({ name, path, onCreateFolder, onDeleteFolder, setCurrentFolder }) =>  {
    const handleNavigate = () => {
        console.log('path', path);
        console.log('name', name);
        console.log(path ? `${path}/${name}` : name);
        setCurrentFolder(path ? `${path}/${name}` : name);
    }

    return (
        <div>
            <span onClick={handleNavigate}>
                <img src="./folder_icon.png" width="25" height="25" />
                {` ${name}`}
            </span>
            <button className="ui button" onClick={() => onCreateFolder(path ? `${path}/${name}` : name)}>Create</button>
            {name !== 'root' && <button className="ui negative button" onClick={() => onDeleteFolder(path ? `${path}/${name}` : name)}>Delete</button>}
        </div>
    )
}

export default Folder