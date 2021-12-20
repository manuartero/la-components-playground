export const toHHMMSS = (seconds: number) => {
    let ss = seconds;
    const hh = Math.floor(ss / 3600);
    ss %= 3600;
    const mm = Math.floor(ss / 60);
    ss = ss % 60;
    return {
        hh,
        mm,
        ss,
    };
};
