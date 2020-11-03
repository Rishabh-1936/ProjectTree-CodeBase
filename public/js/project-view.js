$(document).ready(()=>{
    let data=``;
    let ZZfetch=fetch("<%= project[0]['projectDescUrl'] %>")
                .then(res=>res.text())
                .then(data=>{data=data});
    console.log(data);
});