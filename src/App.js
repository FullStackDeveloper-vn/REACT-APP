import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function App() {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch initial content from API or database
    // Example: fetchContent().then((data) => setContent(data));
  }, []);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send updated content to API or database
    // Example: saveContent(content);
  };

  return (
    <div className="App">
      <h1>CKEditor 5 with React</h1>
      <form onSubmit={handleSubmit}>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={handleEditorChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;