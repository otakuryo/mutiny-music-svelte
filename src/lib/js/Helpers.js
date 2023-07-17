/**
 * Devuelve la duración en formato mm:ss
 * 
 * @param {number | undefined} duration
 */
let getDurationHuman = (duration) => {

    // Si no hay duración, se devuelve 00:00
    if (duration === undefined) return "00:00";

    // Si hay duración, se devuelve en formato mm:ss
    let minutes = Math.floor(duration / 60);
    let seconds = duration - minutes * 60;

    let mmStr = minutes.toString().padStart(2, "0");
    let ssStr = seconds.toString().padStart(2, "0");
    return `${mmStr}:${ssStr}`;
}

export { 
    getDurationHuman 
};