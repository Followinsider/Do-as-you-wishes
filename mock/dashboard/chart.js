function chart(method) {
    let res = null;
    switch(method) {
        case "GET":
            res = [100, 220, 10, 12, 88, 74]
            break;
        default:
            res = null;
    }
    return res;
}

// COMMONJS规范
module.exports = chart;