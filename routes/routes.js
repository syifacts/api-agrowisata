import Joi from 'joi';
import AgrowisataModel from '../models/model.js';  

const routes = [
    {
        method: 'GET',
        path: '/agrowisata',
        handler: async (request, h) => {
            try {
                // Mengambil data dengan limit dan offset untuk pagination
                const { limit = 10, offset = 0 } = request.query;
                const agrowisata = await AgrowisataModel.find()
                    .limit(Number(limit))
                    .skip(Number(offset));
                return h.response(agrowisata).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Terjadi kesalahan saat mengambil data' }).code(500);
            }
        },
    },
    {
        method: 'GET',
        path: '/agrowisata/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            try {
                const agrowisata = await AgrowisataModel.findById(id);
                if (!agrowisata) {
                    return h.response({ message: 'Data tidak ditemukan' }).code(404);
                }
                return h.response(agrowisata).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Terjadi kesalahan saat mengambil data' }).code(500);
            }
        },
    },
    {
        method: 'POST',
        path: '/agrowisata',
        handler: async (request, h) => {
            const { name, location, photo, description, mapsLink } = request.payload;
            const newAgrowisata = new AgrowisataModel({ name, location, photo, description, mapsLink });
            try {
                await newAgrowisata.save();
                return h.response(newAgrowisata).code(201);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Terjadi kesalahan saat menyimpan data' }).code(500);
            }
        },
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    location: Joi.string().required(),
                    photo: Joi.string().uri().required(),
                    description: Joi.string().required(),
                    mapsLink: Joi.string().uri().required(),  // Validasi untuk link maps
                }),
            },
        },
    },
    {
        method: 'PUT',
        path: '/agrowisata/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const { name, location, photo, description, mapsLink } = request.payload;

            try {
                const updatedAgrowisata = await AgrowisataModel.findByIdAndUpdate(
                    id,
                    { name, location, photo, description, mapsLink },
                    { new: true }
                );

                if (!updatedAgrowisata) {
                    return h.response({ message: 'Data tidak ditemukan' }).code(404);
                }

                return h.response(updatedAgrowisata).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Terjadi kesalahan saat memperbarui data' }).code(500);
            }
        },
    },
    {
        method: 'DELETE',
        path: '/agrowisata/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            try {
                const deletedAgrowisata = await AgrowisataModel.findByIdAndDelete(id);

                if (!deletedAgrowisata) {
                    return h.response({ message: 'Data tidak ditemukan' }).code(404);
                }

                return h.response({ message: 'Data berhasil dihapus' }).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Terjadi kesalahan saat menghapus data' }).code(500);
            }
        },
    },
];

export default routes;
