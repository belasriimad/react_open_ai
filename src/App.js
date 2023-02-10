import { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState("http://via.placeholder.com/640x360");
  const [imageInput, setImageInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  //open ai config
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "YOUR API KEY",
  });
  const openai = new OpenAIApi(configuration);


  const fetchImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await openai.createImage({
        prompt: imageInput,
        n: 1,
        size: "1024x1024",
      });
      setImage(response.data.data[0].url);
      setImageInput("");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchText = async (e) => {
    e.preventDefault();
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: textInput,
        max_tokens: 1000,
        temperature: 0.2,
      });
      setText(response.data.choices[0].text);
      setTextInput("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <div>
                Generate Image
              </div>
            </div>
            <div className="card-body">
              <div className='my-3'>
                  {
                    loading ?
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    : 
                    <img src={image} className='img-fluid' alt="" srcset="" />
                  }
              </div>
              <form onSubmit={(e) => fetchImage(e)}>
                <div className="form-group mb-3">
                  <input type="text" 
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    className='form-control' placeholder='Search...'/>
                </div>
                <div className="form-group mb-3">
                  {
                    loading ?
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    : 
                      <button type="submit" className="btn btn-sm btn-primary">
                        submit
                      </button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <div className="card">
          <div className="card-header text-center">
            <div>
              Generate Text
            </div>
          </div>
          <div className="card-body">
            <div className='my-3'>
                <p className="fw-bold">
                  {text}
                </p>
            </div>
            <form onSubmit={(e) => fetchText(e)}>
              <div className="form-group mb-3">
                <textarea rows="5" cols="30"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className='form-control' placeholder='Start typing...'></textarea>
              </div>
              <div className="form-group mb-3">
                <button type="submit" className="btn btn-sm btn-primary">
                  submit
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
