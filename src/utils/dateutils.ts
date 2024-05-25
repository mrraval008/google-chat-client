const Utils = {
    getTime: (date:Date)=>{
        let hours:number = date.getHours();
        let minutes:string | number = date.getMinutes();
        const ampm:string = hours >= 12 ? 'pm' : 'am';
        hours = Number(hours % 12);
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return (hours + ':' + minutes + ' ' + ampm);
    }
}

export default Utils;
