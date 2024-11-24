export const validate=(email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email);
};

export const getInitials=(name)=>{
    if(!name) return "";
    const words= name.split(" ");
    let initials="";
    for(let i=0;i<Math.min(words.length,3);i++){
        initials+= words[i][0];
    }

    return initials.toUpperCase();
}