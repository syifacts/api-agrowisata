import mongoose from 'mongoose';

const agrowisataSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nama agrowisata
    location: { type: String, required: true }, // Lokasi agrowisata
    photo: { type: String, required: true }, // URL foto agrowisata
    description: { type: String, required: true }, // Deskripsi agrowisata
    mapsLink: { type: String, required: true }, // Link Maps untuk lokasi
    createdAt: { type: Date, default: Date.now } // Tanggal dibuat
});

const AgrowisataModel = mongoose.model('Agrowisata', agrowisataSchema);

export default AgrowisataModel;
