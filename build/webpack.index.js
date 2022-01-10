const inquirer = require("inquirer");
const { merge } = require("webpack-merge");
const base = require('./webpack.base')
const dev = require('./webpack.dev')
const prod = require('./webpack.pro')
const { promptList } = require("./tool/pageList");
const { generatePageList, generateEnteryList, resolve } = require("./tool/tool");
module.exports = async(env) => {
    const isProd = env.production === true;
    let res = await inquirer.prompt(promptList);
    const list = res.question;
    base.entry = {
        index: resolve('src/index.js'),
        ...generateEnteryList(list),
    }
    if (isProd) {
        let proConfig = merge(base, prod)
        proConfig.plugins.push(...generatePageList("production", list))
        return proConfig;
    } else {
        let devConfig = merge(base, dev)
        devConfig.plugins.push(...generatePageList("development", list))
        return devConfig
    }
};