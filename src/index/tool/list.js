const modules = (modulesFiles => {
    const exclude = ['index.js']
    let module = [];
    console.log('object :>> ', module);
    modulesFiles.keys().forEach(path => {
        const fileName = path.split('/')[1]
        module.push(fileName);
    });
    return module
})(require.context('../../page', true, /\.js$/));
export default modules