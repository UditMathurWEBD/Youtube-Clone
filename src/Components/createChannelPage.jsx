import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

export default function CreateChannelModal({ open, onClose }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg w-full max-w-2xl p-6">
          <DialogTitle className="text-xl font-bold text-gray-900 mb-4">
            How You Will Appear
          </DialogTitle>

          <div className="flex flex-col items-center gap-4">
            {/* Image preview */}
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Upload input */}
            <label className="text-sm text-blue-600 cursor-pointer hover:underline">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Name inputs */}
            <input
              className="px-4 py-2 lg:w-lg rounded-lg border border-gray-300"
              type="text"
              placeholder="Enter your channel name"
            />
            <input
              className="px-4 py-2 lg:w-lg rounded-lg border border-gray-300"
              type="text"
              placeholder="Enter your description"
            />

            {/* Submit button */}

  <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Create Channel
            </button>
    
          
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
