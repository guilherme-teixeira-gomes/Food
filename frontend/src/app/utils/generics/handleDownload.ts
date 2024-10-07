import api from "app/services/api";

const handleDownload = (path: string, filename: string = "Arquivo") => {
    api.get(path, { responseType: 'blob' })
        .then(response => {
            // Create a temporary URL object to generate a download link
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary <a> element to initiate the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            // Clean up the temporary elements
            link.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.log('Download error:', error);
        });
}

export default handleDownload;