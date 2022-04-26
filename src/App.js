import React, { useState, useEffect } from 'react';

import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';


function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(()=>{
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data => {
      setImages(data.hits);
      setIsLoading(false);
    })
    .catch(err => console.log(err))
  }, [term]);

  return (
    <>
    <ImageSearch searchText={(text)=>setTerm(text)}/>

    {!isLoading && images.length ==0 && <h1 className="text-6xl text-center mx-auto mt-32">No Image Found Go back to <a class="underline decoration-sky-500" href="/">Home</a> </h1>}

      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading . . .</h1>:
            images.map(image=>(
              <ImageCard key={image.id} image={image}/>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default App;
