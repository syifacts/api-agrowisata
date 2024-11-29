import { nanoid } from 'nanoid';


const agrowisataData = {
    '1': {
        id: '1',
        name: 'Agrowisata Rawa Kepiting',
        location: 'Jakarta Timur, DKI Jakarta',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Pantai_Rawa_Kepiting.jpg',
        description: 'Destinasi wisata alam dengan keindahan rawa dan pepohonan rindang di Jakarta Timur.',
        mapsLink: 'https://goo.gl/maps/XYq6hYxGsEqg9R9f7', 
    },
    '2': {
        id: '2',
        name: 'Agrowisata Taman Mini Indonesia Indah',
        location: 'Jakarta Timur, DKI Jakarta',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Taman_Mini_Indonesia_Indah.jpg',
        description: 'Taman Mini Indonesia Indah menampilkan miniatur kebudayaan Indonesia dari seluruh provinsi.',
        mapsLink: 'https://goo.gl/maps/TrTY66eq6A8t1g5Q7', 
    },
    '3': {
        id: '3',
        name: 'Agrowisata Setu Babakan',
        location: 'Jakarta Selatan, DKI Jakarta',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Setu_Babakan.jpg',
        description: 'Desa budaya Betawi di Setu Babakan dengan berbagai aktivitas tradisional Betawi.',
        mapsLink: 'https://goo.gl/maps/H6xd6VgH2bzPru3b9', 
    },
};

export const addAgrowisataHandler = (request, h) => {
    const { name, location, photo, description, mapsLink } = request.payload;

    const newAgrowisata = {
        id: nanoid(), 
        name,
        location,
        photo,
        description,
        mapsLink, 
    };

    agrowisataData[newAgrowisata.id] = newAgrowisata; // Menyimpan dalam objek

    return {
        status: 'success',
        message: 'Agrowisata berhasil ditambahkan',
        data: newAgrowisata,
    };
};

// Handler untuk mendapatkan semua data agrowisata
export const getAllAgrowisataHandler = (request, h) => {
    return {
        status: 'success',
        data: Object.values(agrowisataData), // Mengambil semua nilai dari objek
    };
};

// Handler untuk mendapatkan data agrowisata berdasarkan ID
export const getAgrowisataByIdHandler = (request, h) => {
    const { id } = request.params;
    const agrowisata = agrowisataData[id];

    if (!agrowisata) {
        return h.response({
            status: 'fail',
            message: `Agrowisata dengan id ${id} tidak ditemukan`,
        }).code(404);
    }

    return {
        status: 'success',
        data: agrowisata,
    };
};

// Handler untuk memperbarui data agrowisata berdasarkan ID
export const updateAgrowisataByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, location, photo, description, mapsLink } = request.payload;

    const agrowisata = agrowisataData[id];

    if (!agrowisata) {
        return h.response({
            status: 'fail',
            message: `Agrowisata dengan id ${id} tidak ditemukan`,
        }).code(404);
    }

    // Memperbarui data agrowisata
    agrowisataData[id] = {
        ...agrowisata,
        name: name || agrowisata.name,
        location: location || agrowisata.location,
        photo: photo || agrowisata.photo,
        description: description || agrowisata.description,
        mapsLink: mapsLink || agrowisata.mapsLink, // Memperbarui mapsLink
    };

    return {
        status: 'success',
        message: `Agrowisata dengan id ${id} berhasil diperbarui`,
        data: agrowisataData[id],
    };
};

// Handler untuk menghapus data agrowisata berdasarkan ID
export const deleteAgrowisataByIdHandler = (request, h) => {
    const { id } = request.params;

    if (!agrowisataData[id]) {
        return h.response({
            status: 'fail',
            message: `Agrowisata dengan id ${id} tidak ditemukan`,
        }).code(404);
    }

    delete agrowisataData[id]; 

    return {
        status: 'success',
        message: `Agrowisata dengan id ${id} berhasil dihapus`,
    };
};
