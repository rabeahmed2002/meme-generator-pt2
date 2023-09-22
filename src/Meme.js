// import React from "react";

// export default function Meme() {
//     const [meme, setMeme]=React.useState({
//         topText: "",
//         bottomText: "",
//         randomImage: "http://i.imgflip.com/1bij.jpg"
//     })

//     const [allMemeImages, setAllMemeImages]=React.useState()

//     React.useEffect(()=> {
//         fetch("https://api.imgflip.com/get_memes")
//             .then(res=>res.json())
//             .then(data=>setAllMemeImages(data.data.memes))
//     }, [])

//     function createMemeImage() {
//         const memeContainer = document.querySelector('.meme');
//         const canvas = document.createElement('canvas');
//         canvas.width = memeContainer.offsetWidth;
//         canvas.height = memeContainer.offsetHeight;
//         const ctx = canvas.getContext('2d');
      
//         // Draw the meme content onto the canvas
//         const image = new Image();
//         image.src = meme.randomImage;
//         image.onload = () => {
//           ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
//           ctx.font = '30px Arial'; // Customize the font and size as needed
//           ctx.fillStyle = 'white'; // Customize the text color
//           ctx.textAlign = 'center';
//           ctx.textBaseline = 'top';
//           ctx.fillText(meme.topText, canvas.width / 2, 10);
//           ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 40);
      
//           // Trigger download
//           const link = document.createElement('a');
//           link.download = 'meme.png';
//           link.href = canvas.toDataURL('image/png');
//           link.click();
//         };
//       }
      

//     function generateMeme() {
//         let randomTemplate = Math.floor(Math.random() * allMemeImages.length);
//         const url = allMemeImages[randomTemplate].url;
//         setMeme(prevMeme => ({
//           topText: "", // Reset the topText input field
//           bottomText: "", // Reset the bottomText input field
//           randomImage: url
//         }));
//     }

//     function handleChange(event) {
//         const {name, value}=event.target
//         setMeme(prevMeme=> ({
//             ...prevMeme,
//             [name]: value
//         }))
//     }

//     return(
//         <main>
//             <div className="form-el">
//             <input 
//                 type="text" 
//                 className="form-input" 
//                 placeholder="Top text"
//                 name="topText"
//                 value={meme.topText} // Corrected to meme.topText
//                 onChange={handleChange}
//             />

//             <input
//                 type="text"     
//                 className="form-input"
//                 placeholder="Bottom text"
//                 name="bottomText"
//                 value={meme.bottomText} // Corrected to meme.bottomText
//                 onChange={handleChange}
//             />

//                 <button 
//                     onClick={generateMeme}
//                     className="form-btn">Get a new meme template
//                 </button>
//             </div>

//             <div className="meme">
//                 <img src={meme.randomImage} className='meme--image'/>   
//                 <h2 className="meme--text top">{meme.topText}</h2>
//                 <h2 className="meme--text bottom">{meme.bottomText}</h2>
//             </div>

//             <button
//                 onClick={createMemeImage}
//                 className="form-btn"
//                 >
//                 Save to Computer
//             </button>

//         </main>
//     )
// }


import React, { useRef } from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });

  const [allMemeImages, setAllMemeImages] = React.useState([]);
  const memeRef = useRef();

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes));
  }, []);

  function generateMeme() {
    let randomTemplate = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomTemplate].url;
    setMeme((prevMeme) => ({
      topText: "",
      bottomText: "", // Reset the input values to empty strings
      randomImage: url,
    }));
  }
  

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value
    }));
  }

  function createMemeImage() {
    const memeContainer = memeRef.current;
    const image = new Image();
    image.src = meme.randomImage;
    image.crossOrigin = "anonymous"; // Enable cross-origin loading for images
  
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width; // Set canvas width to image width
      canvas.height = image.height; // Set canvas height to image height
      const ctx = canvas.getContext("2d");
  
      ctx.drawImage(image, 0, 0);
  
      ctx.font = "30px Arial"; // Customize the font and size as needed
      ctx.fillStyle = "white"; // Customize the text color
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(meme.topText, canvas.width / 2, 10);
      ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 40);
  
      // Clear input field values
      setMeme((prevMeme) => ({
        ...prevMeme,
        topText: "",
        bottomText: "",
      }));
  
      // Trigger download
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "meme.png"; // Specify the filename
      link.click();
    };
  }
  
  
  
  return (
    <main>
      <div className="form-el">
        <input
          type="text"
          className="form-input"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />

        <input
          type="text"
          className="form-input"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />

        <button onClick={generateMeme} className="form-btn">
          Get a new meme template
        </button>

        <button onClick={createMemeImage} className="form-btn">
          Save to Computer
        </button>
      </div>

      <div className="meme" ref={memeRef}>
        <img src={meme.randomImage} className="meme--image" alt="Meme" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
