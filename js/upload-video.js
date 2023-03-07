const uploadVideo = document.getElementById('upload-drop-video');
const submitVideo = document.getElementById('upload-video-file');

const uploadProgress = document.getElementById('upload-video-progress-bar');

uploadVideo.addEventListener('dragover', dragOver);
uploadVideo.addEventListener('dragleave', dragLeave);
uploadVideo.addEventListener('drop', drop);
submitVideo.addEventListener('change', drop);

function dragOver(e) {
    e.preventDefault();
    uploadVideo.classList.add('dragover');
    // children[1] = h4
    uploadVideo.children[1].innerHTML = 'Release file to upload.';
}

function dragLeave() {
    uploadVideo.classList.remove('dragover');
    // children[1] = h4
    uploadVideo.children[1].innerHTML = 'Drag and drop file to upload.';
}

function drop(e) {
    e.preventDefault();

    let file;
    if(e.type == 'change') {
        file = e.target.files[0];
    }
    else {
        file = e.dataTransfer.files[0];
    }

    let fileFormat = file.type;
    let validFormat = ['video/mp4', 'video/ogg', 'video/webm', 'video/mkv'];

    let videoSize = (file.size / (1024 * 1024)).toFixed(6);

    if(validFormat.includes(fileFormat)) {
        if(videoSize > 200) {
            invalidFile('File size was more than 200MB.');
            uploadVideo.classList.remove('dragover');
        }
        else {
            uploadFile(file);
        }
    }
    else {
        invalidFile('Invalid file format. ' + fileFormat.split('/')[1].toUpperCase() + ' is not supported.');
    }
}

function invalidFile(message) {
    uploadVideo.classList.add('invalid');
    uploadVideo.children[1].innerHTML = message;
}

function uploadFile(file) {
    setTimeout(() => {
        uploadVideo.classList.add('valid');
    }, 200)
    uploadVideo.classList.remove('dragover');
    uploadVideo.classList.remove('invalid');

    let fileReader = new FileReader();
    fileReader.onload = () => {
        console.log(fileReader);
        console.log(file);
        setTimeout(() => {
            uploadVideo.classList.add('hide');
            uploadVideo.style.setProperty('--url', 'url(' + fileReader.result + ')');
            localStorage.setItem('fileUploaded', file);
            window.location = "uploadVideoOnePage.html";
        }, 3000);
        // console.log(file);
        // let xhr = new XMLHttpRequest();
        // xhr.open('POST', 'php/uploadVideo.php');
        // xhr.upload.addEventListener('progress', e => {})
    }
    fileReader.readAsDataURL(file);

}