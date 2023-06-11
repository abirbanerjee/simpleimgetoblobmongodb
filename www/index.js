const photo = document.createElement('input');
const id = document.createElement('input');
photo.type = "file";

id.type = "text";


const submit = document.createElement('button');
submit.innerText = 'Upload';
document.body.append('Enter id, choose an image and upload:');
document.body.append(id);
document.body.append(photo);
document.body.append(submit);


submit.addEventListener('click', () => {
    const blob = new Blob([photo.files[0]], { type: "image/jpeg" });
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
        const reply = await axios.post('/photoupload', { id: id.value, image: reader.result });
        if (reply.status === 200) {
            submit.disabled = true;
            document.body.append('Uploaded');
        }
    }

})

// async option
function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}