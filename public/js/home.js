$(document).ready(() => {

    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

    let like_status=false;
    $('.icon-positioning .fa-heart').on('click',e=>{
        $(e.target).toggleClass('clicked')
        $(e.target).children().text((index,content)=>{
            if(!like_status){
                like_status=true;
                $(e.target).attr('data-original-title', "<div class='tooltip-text'>Unlike</div>");
                return (parseInt(content)+1)
            }else{
                like_status=false;
                $(e.target).attr('data-original-title', "<div class='tooltip-text'>Like</div>");
                return (parseInt(content)-1)
            }
        }); 
    });
});

function openModal(type, data) {
    let modal_title = ``, modal_body = ``;
    modal_title = `${data[0]}`
    switch (type) {
        case 'youtube':
            modal_body = youtube(data[1])
            break;
        case 'getHelp':
            modal_body = getHelp(data);
            break;
        case 'share':
            modal_body = share(data[1])
            break;
        case 'support':
            modal_title = "Project Tree";
            modal_body  = support();
            break;
        case 'submitProject':
            modal_title = "Project Tree";
            modal_body  = submit_project();
            break;
        default:
            modal_title = `Project Tree`,
            modal_body = `A Platform for source code`
            break;
    }
    $('.modal-title')[0].innerHTML = modal_title;
    $('.modal-body')[0].innerHTML = modal_body;
}

// function share(url) {
//     let html = `
//         <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${url}" class="fab fa-facebook-f"></a>
//         <a target="_blank" href="https://twitter.com/home?status=${url}" class="fab fa-twitter"></a>
//         <a target="_blank" href="https://plus.google.com/share?url=${url}" class="fab fa-google-plus-g"></a>
//         <a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url=${url}" class="fab fa-linkedin"></a>
//         <a target="_blank" href="whatsapp://send?text=${url}" class="fab fa-whatsapp"></a>
//         <a target="_blank" href="https://pinterest.com/pin/create/button/?url=${url}" class="fab fa-pinterest-p"></a>
//         <a target="_blank" href="https://telegram.me/share/url?url=${url}" class="fab fa-telegram-plane"></a>
//         <a target="_blank" href="http://www.tumblr.com/share/link?url=${url}" class="fab fa-tumblr"></a>
//         <a target="_blank" href="http://reddit.com/submit?url=${url}" class="fab fa-reddit-alien"></a>
//     `
//     return html;
// }

function share(url) {
    let html=``;
    html=`
        <div>
            <input class="form-control" id="project-share-link" type="text" placeholder="${url}" value="${url}" readonly data-toggle="tooltip" data-placement="top" title="Copied">
            <h4>Share via</h4>
        </div>`
    html += `
    <div class="project-share-icon-container">
        <a href="javascript:void(0);" onclick="copyToClipboard();" class="fas fa-copy"></a>
        <a href="javascript:void(0);" onclick="shareOpen('https://www.facebook.com/sharer/sharer.php?u=${url}', 900, 500);" class="fab fa-facebook-f"></a>
        <a href="javascript:void(0);" onclick="shareOpen('https://twitter.com/intent/tweet?url=${url}',650,420);" class="fab fa-twitter"></a>
        <a href="javascript:void(0);" onclick="shareOpen('https://api.whatsapp.com//send?text=${url}',900,600);" class="fab fa-whatsapp"></a>
        <a href="javascript:void(0);" onclick="shareOpen('https://reddit.com/submit?url=${url}',900,600);" class="fab fa-reddit-alien"></a>
        <a href="javascript:void(0);" onclick="shareOpen('https://www.linkedin.com/shareArticle?mini=true&url=${url}',900,600);" class="fab fa-linkedin-in"></a>
        <a href="javascript:void(0);" onclick="shareOpen('https://telegram.me/share/url?url=${url}',900,600);" class="fab fa-telegram-plane"></a>
        <a href="javascript:void(0);" onclick="shareOpen('http://pinterest.com/pin/create/link/?url=${url}',900,600);" class="fab fa-pinterest-p"></a>
        <a href="javascript:void(0);" onclick="shareOpen('https://plus.google.com/share?url=${url}',900,600);" class="fab fa-google-plus-g"></a>
        <a href="javascript:void(0);" onclick="shareOpen('http://www.tumblr.com/share/link?url=${url}',900,600);" class="fab fa-tumblr"></a>
    </div>
        `
    return html;
}

function shareOpen(url, width, height) {
    window.open(url, "", "toolbar=0, status=0, width=" + width + ", height=" + height + "");
}

function copyToClipboard() {

    var copyText = document.getElementById("project-share-link");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    // $('#project-share-link').tooltip('enable')

    // $('#project-share-link').tooltip('disable');

    $('#project-share-link').css({pointerEvents: "all"})
    // document.getElementById('project-share-link').tooltip('show')
    // alert("Copied the text: " + copyText.value);
}    

function youtube(url){
    let html=``;

    html=`
        <div class="project-video-container">
            <div class="project-video">
                <div class="loading-container">
                    <div class="loading">
                    </div>
                </div>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe onload="loadiframe(event)" class="embed-responsive-item" width="560" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <div class="project-video-info">
                <h5>Get Started with Demo</h5>
            </div>
        </div>
    `
    return html;

}

function loadiframe(e){
    document.getElementsByClassName('loading-container')[0].animate(
        [
            {
                opacity:'1'
            },{
                opacity:'0',
                display:'none'
            }
        ],{
            duration: 1000,
            iterations: 1,
            fill: "forwards"
          });
}

function getHelp(data){
    
    let html=``;
    if(data[3]=='false'){
        html+=`
            <div><h5 style="color: #47465d;text-align: center;">No Instructor Available</h5></div>
            <svg id="no-data-for-getHelp-svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="647.63626" height="632.17383" viewBox="0 0 647.63626 632.17383"><path d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z" transform="translate(-276.18187 -133.91309)" fill="#f2f2f2"/><path d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56"/><path d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z" transform="translate(-276.18187 -133.91309)" fill="#00b0ff"/><circle cx="190.15351" cy="24.95465" r="20" fill="#00b0ff"/><circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff"/><path d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z" transform="translate(-276.18187 -133.91309)" fill="#e6e6e6"/><path d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z" transform="translate(-276.18187 -133.91309)" fill="#3f3d56"/><path d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z" transform="translate(-276.18187 -133.91309)" fill="#00b0ff"/><circle cx="433.63626" cy="105.17383" r="20" fill="#00b0ff"/><circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff"/></svg>
        `
    }
    else{
        html+=getCarousel(data);
    }
    return html;
}

function getCarousel(data){
    let html=`` ;
    html+=`
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../public/images/live_interaction.png" class="d-block w-100" alt="Live Interaction">
        <div class="carousel-caption">
          <h5>Live Streaming</h5>
          <p>Get Live Interaction and whole codebase understanding by Professionals.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="../public/images/code_review.png" class="d-block w-100" alt="Code Review">
        <div class="carousel-caption">
          <h5>Redesigning of the CodeBase</h5>
          <p>Make changes to the code and customise the project according to your requirement under the guidance of Professionals.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="../public/images/download_video.png" class="d-block w-100" alt="Download the Content">
        <div class="carousel-caption">
          <h5>Offline Access</h5>
          <p>Get the Code and Video Support for the LifeTime.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="../public/images/instructor_payment.png" class="d-block w-100" alt="Instructor Payment">
        <div class="carousel-caption">
          <h5>Pay the Instructor Fees</h5>
          <p>Just pay the Industry Experts for their valuable time and effort.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="../public/images/message.png" class="d-block w-100" alt="Message the details">
        <div class="carousel-caption">
          <h5>Message the Details</h5>
          <p>Just message the project details with your name and  
            <a href="javascript:void(0);" onclick="shareOpen('https://api.whatsapp.com//send?phone=9810479409&text=Project%20Id:${data[2]}%0BProject%20Name:${data[0]}%0BProject%20Url:${data[1]}%0B%0BText%20Your%20Details',900,600);"
            style="text-decoration: underline;color: #007bff;">contact details.</a>
          </p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
    `
    return html;
}

function support(){
    let html=``;

    html=`
        <div class="project-support-container">
            <div class="flex project-support-donate">
                <img src="./public/images/donate.png" class="d-block w-100" alt="Support by donating money">
                <h6>Support our community by donating money</h6>
                <a class="btn btn-secondary" href="#">Pay</a>
            </div>
            <div class="flex project-support-ads">
                <img src="./public/images/watch_ad.png" class="d-block w-100" alt="Support by Watching the ad">
                <h6>Support our community by wacting the Ad Video.</h6>
                <a class="btn btn-secondary" href="#">Watch a video</a>
            </div>
        </div>
    `
    return html;
}

function submit_project(){
    let html=``;
    html=`
        <div class="submit_project">
            <img src="./public/images/mail_project.png" class="d-block w-100" alt="Submit Your Project">
            <p><a href="https://mail.google.com/mail/?view=cm&fs=1&to=rishabhjain.1936@yahoo.com&su=Want to submit the project&body=Project details and your details" target="_blank" style="text-decoration: underline;color: #007bff;">Mail Us</a> the project details.</p>
        <div>
    `
    return html;
}