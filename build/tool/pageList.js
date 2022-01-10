const promptList = [{
    type: "checkbox",
    message: "请选择您要加载的模块:",
    name: "question",
    choices: [{
            key: "about",
            name: "关于(about)",
            value: "about"
        },
        {
            key: "home",
            name: "我的(home)",
            value: "home"
        },
    ]
}];
module.exports = {
    promptList
}