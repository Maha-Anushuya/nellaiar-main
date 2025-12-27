import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Upload, Save, X } from 'lucide-react';

const AdminDashboard = () => {
  const [pois, setPois] = useState([
    { id: 1, name: 'Nellaiappar Temple', category: 'temple', status: 'active' },
    { id: 2, name: 'Courtallam Waterfalls', category: 'nature', status: 'active' },
    { id: 3, name: 'Papanasam Dam', category: 'nature', status: 'active' },
  ]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPOI, setEditingPOI] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'temple',
    description: '',
    coordinates: '',
    images: '',
    arModel: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPOI) {
      setPois(pois.map(poi => poi.id === editingPOI.id ? { ...poi, ...formData } : poi));
      showNotification('POI updated successfully!');
    } else {
      const newPOI = { id: pois.length + 1, ...formData, status: 'active' };
      setPois([...pois, newPOI]);
      showNotification('POI created successfully!');
    }
    
    setIsFormOpen(false);
    setEditingPOI(null);
    setFormData({ name: '', category: 'temple', description: '', coordinates: '', images: '', arModel: '' });
  };

  const handleEdit = (poi) => {
    setEditingPOI(poi);
    setFormData(poi);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this POI?')) {
      setPois(pois.filter(poi => poi.id !== id));
      showNotification('POI deleted successfully!');
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingPOI(null);
    setFormData({ name: '', category: 'temple', description: '', coordinates: '', images: '', arModel: '' });
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
              <p className="text-white/70">Manage POIs and content</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="btn btn-primary"
            >
              <Plus size={18} />
              Add New POI
            </motion.button>
          </div>
        </motion.div>

        {/* POI Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/70 font-semibold">ID</th>
                  <th className="text-left p-4 text-white/70 font-semibold">Name</th>
                  <th className="text-left p-4 text-white/70 font-semibold">Category</th>
                  <th className="text-left p-4 text-white/70 font-semibold">Status</th>
                  <th className="text-right p-4 text-white/70 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pois.map((poi) => (
                  <motion.tr
                    key={poi.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">{poi.id}</td>
                    <td className="p-4 font-medium">{poi.name}</td>
                    <td className="p-4">
                      <span className="glass px-3 py-1 rounded-full text-sm capitalize">
                        {poi.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-green-400 text-sm">● {poi.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(poi)}
                          className="glass p-2 rounded-lg hover:bg-purple-500/20"
                        >
                          <Edit2 size={16} className="text-purple-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(poi.id)}
                          className="glass p-2 rounded-lg hover:bg-red-500/20"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Add/Edit Form Modal */}
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold gradient-text">
                  {editingPOI ? 'Edit POI' : 'Add New POI'}
                </h2>
                <button onClick={handleCancel} className="text-white/50 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input"
                  >
                    <option value="temple">Temple</option>
                    <option value="nature">Nature</option>
                    <option value="food">Food</option>
                    <option value="history">History</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Coordinates (lng, lat)</label>
                  <input
                    type="text"
                    value={formData.coordinates}
                    onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                    placeholder="77.6874, 8.7139"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Images (URLs, comma-separated)</label>
                  <input
                    type="text"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">AR Model Path</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.arModel}
                      onChange={(e) => setFormData({ ...formData, arModel: e.target.value })}
                      placeholder="/models/model.glb"
                      className="input flex-1"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-outline"
                    >
                      <Upload size={18} />
                      Upload
                    </motion.button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary flex-1"
                  >
                    <Save size={18} />
                    {editingPOI ? 'Update POI' : 'Create POI'}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleCancel}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 glass-card px-6 py-4 glow z-50"
          >
            <p className="font-medium">{toastMessage}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
