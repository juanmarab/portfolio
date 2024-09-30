// Gráfico de habilidades técnicas
var ctx = document.getElementById('skillsChart').getContext('2d');
var skillsChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['JavaScript', 'Angular', 'C#', '.NET Core', 'SQL'],
        datasets: [{
            data: [25, 30, 20, 15, 10],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    }
});
