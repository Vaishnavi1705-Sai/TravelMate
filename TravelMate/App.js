import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [images, setImages] = useState([]);
  const [blogContent, setBlogContent] = useState('');

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    const response = await axios.post('http://localhost:5000/upload', formData);
    setBlogContent(response.data);
  };

  return (
    <div>
      <h1>Travel Blog Creator</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Generate Blog</button>

      <h2>Generated Blog:</h2>
      <textarea value={blogContent} rows="15" cols="70" readOnly></textarea>
    </div>
  );
};

export default App;
