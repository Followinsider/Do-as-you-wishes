function form(method) {
    let res = null;
    switch(method) {
        case "POST":
            res = {message: "OK"};
            break;
        default:
            res = null;
    }
    return res;
}

// COMMONJS规范
module.exports = form;