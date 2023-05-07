// Muestra el indicador de carga
function showLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
  }

  // Oculta el indicador de carga
  function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'none';
  }

  // Captura el evento de envío del formulario
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Extrae los valores del formulario
    const topic = document.getElementById('topic').value;
    const duration = document.getElementById('duration').value;
    const file_type = document.getElementById('file_type').value;
    const education_level = document.getElementById('education_level').value;
    const keywords = document.getElementById('keywords').value;

    // Crea un objeto FormData con los valores del formulario
    const formData = new FormData();
    formData.append('topic', topic);
    formData.append('duration', duration);
    formData.append('file_type', file_type);
    formData.append('education_level', education_level);
    formData.append('keywords', keywords);

    // Llamada AJAX para generar la presentación
    fetch('/generate', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        // Oculta el indicador de carga cuando se recibe la respuesta
        hideLoadingIndicator();

        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Error al generar la presentación');
        }
      })
      .then((blob) => {
        // Crea un enlace para descargar el archivo generado
        const downloadUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = `${topic}_presentation.${file_type}`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .catch((error) => {
        // Oculta el indicador de carga en caso de error
        hideLoadingIndicator();
        console.error(error);
      });

    // Muestra el indicador de carga antes de iniciar la llamada AJAX
    showLoadingIndicator();
  });