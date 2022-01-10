const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { glob } = require("glob");

function generatePageList(env, list) {
    const isDev = env === "development";
    try {
        let pathList = glob.sync("src/page/*");
        let pathArr = [];
        if (list.length > 0) {
            pathArr = pathList.filter((item) => {
                const p = item.split("/");
                return list.includes(p[p.length - 1]);
            });
        } else {
            pathArr = pathList;
        }
        if (pathArr.length) {
            return pathArr.map((item) => {
                const name = item.split("/").pop();
                return new HtmlWebpackPlugin({
                    title: name,
                    template: join(__dirname, `../../src/page/${name}/index.html`),
                    filename: isDev ?
                        `${name}.html` : `page/${name}/index.html`,
                    hash: true,
                    chunks: [`page/${name}`], // 指定引入的chunks文件名称与入口文件对应
                });
            });
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}

function generateEnteryList(list) {
    let entry = {};
    try {
        let pathList = glob.sync("src/page/*");
        let pathArr = [];
        if (list.length > 0) {
            pathArr = pathList.filter((item) => {
                const p = item.split("/");
                return list.includes(p[p.length - 1]);
            });
        } else {
            pathArr = pathList;
        }
        if (pathArr.length) {
            pathArr.forEach((item) => {
                const name = item.split("/").pop();
                entry[`page/${name}`] = join(
                    __dirname,
                    `../../src/page/${name}/${name}.js`
                );
            });
            return entry;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}
const resolve = (dir) => {
    return join(__dirname, '../../',
        dir)
}

module.exports = {
    resolve,
    generatePageList,
    generateEnteryList
}