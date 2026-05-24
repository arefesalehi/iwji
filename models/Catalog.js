import mongoose from 'mongoose';

const CatalogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
});

export default mongoose.models.Catalog || mongoose.model('Catalog', CatalogSchema);
