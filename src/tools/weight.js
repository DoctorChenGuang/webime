[["一一", "1"], ["一二", "2"], ["一寸光阴", "3"]]

["一", "二", "寸光阴"]

input
result.sort((v1, v2) => {
    return IME.cipin.get(input + v1) - IME.cipin.get(input + v2);
});