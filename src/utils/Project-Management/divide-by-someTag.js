export function divide_by_someTag(tag, data) {
    const chooseMap = new Map();
    for (let item of data) {
        if ( !chooseMap.has(item[tag]) ) {
            chooseMap.set(item[tag], 1)
        }else {
            chooseMap.set(item[tag], chooseMap.get(item[tag]) + 1);
        }
    }

    return chooseMap;
}
