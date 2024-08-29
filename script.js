const buttons = document.querySelectorAll('.smtmanu button');
const htmlTextarea = document.getElementById('smthtml');
const cssTextarea = document.getElementById('smtcss');
const jsTextarea = document.getElementById('smtjs');
const previewFrame = document.getElementById('preview');
const previewButton = document.querySelector('.preview');

let isPreviewMode = false;

buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        
        htmlTextarea.style.display = 'none';
        cssTextarea.style.display = 'none';
        jsTextarea.style.display = 'none';
        
        if (this.classList.contains('htmlbtn')) {
            htmlTextarea.style.display = 'block';
        } else if (this.classList.contains('cssbtn')) {
            cssTextarea.style.display = 'block';
        } else if (this.classList.contains('jsbtn')) {
            jsTextarea.style.display = 'block';
        }
        
        updatePreview();
    });
});

[htmlTextarea, cssTextarea, jsTextarea].forEach(textarea => {
    textarea.addEventListener('input', updatePreview);
});

previewButton.addEventListener('click', function() {
    isPreviewMode = !isPreviewMode; // Toggle preview mode
    
    if (isPreviewMode) {
        htmlTextarea.style.display = 'none';
        cssTextarea.style.display = 'none';
        jsTextarea.style.display = 'none';
        previewFrame.style.display = 'block';
    } else {
        const selectedButton = document.querySelector('.smtmanu button.selected');
        if (selectedButton.classList.contains('htmlbtn')) {
            htmlTextarea.style.display = 'block';
        } else if (selectedButton.classList.contains('cssbtn')) {
            cssTextarea.style.display = 'block';
        } else if (selectedButton.classList.contains('jsbtn')) {
            jsTextarea.style.display = 'block';
        }
        previewFrame.style.display = 'none';
    }
    
    updatePreview();
});

function updatePreview() {
    const html = htmlTextarea.value;
    const css = `<style>${cssTextarea.value}</style>`;
    const js = `<script>${jsTextarea.value}<\/script>`;
    
    const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
    previewDocument.open();
    previewDocument.write(html + css + js);
    previewDocument.close();
}