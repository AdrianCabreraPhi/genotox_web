


function saveBlobAsExcel(blob, filename) {
    const url = window.URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
  

  export default saveBlobAsExcel