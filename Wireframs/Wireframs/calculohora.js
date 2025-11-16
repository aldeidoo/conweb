function somarHorasExtras() {
    const extras = document.querySelectorAll(".extra");
    let totalMinutos = 0;

    extras.forEach(extra => {
        const [horas, minutos] = extra.textContent.split(":").map(Number);
        totalMinutos += horas * 60 + minutos;
    });

    const totalHoras = Math.floor(totalMinutos / 60);
    const restoMin = totalMinutos % 60;

    // Formatação para sempre mostrar dois dígitos
    const horasFormat = String(totalHoras).padStart(2, "0");
    const minFormat = String(restoMin).padStart(2, "0");

    document.getElementById("totalExtras").textContent = `${horasFormat}:${minFormat}`;
}

// Executa quando a página carregar
window.addEventListener("DOMContentLoaded", somarHorasExtras);