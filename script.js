const API_KEY = "86c50baf2d8c9e9bfd7a43784972421c";

async function getFlights() {
    const airport = document.getElementById("airportCode").value.toUpperCase();
    const tbody = document.getElementById("flightData");

    if (!airport) {
        alert("Masukkan kode bandara!");
        return;
    }

    tbody.innerHTML = `<tr><td colspan="7">Loading...</td></tr>`;

    const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${airport}&limit=10`;

    try {
        const res = await fetch(url);
        const result = await res.json();

        // ✅ cek error dari API
        if (result.error) {
            tbody.innerHTML = `<tr><td colspan="7">${result.error.message}</td></tr>`;
            return;
        }

        if (!result.data || result.data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7">Data tidak ditemukan</td></tr>`;
            return;
        }

        tbody.innerHTML = "";

        result.data.forEach(flight => {
            const row = `
            <tr>
                <td>${flight.airline?.name || "-"}</td>
                <td>${flight.flight?.iata || "-"}</td>
                <td>${flight.departure?.iata || "-"}</td>
                <td>${flight.arrival?.iata || "-"}</td>
                <td>${flight.departure?.scheduled || "-"}</td>
                <td>${flight.arrival?.scheduled || "-"}</td>
                <td>${flight.flight_status || "-"}</td>
            </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (error) {
        console.error(error);
        tbody.innerHTML = `<tr><td colspan="7">Gagal memuat data</td></tr>`;
    }
}
