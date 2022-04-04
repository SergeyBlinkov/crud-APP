import React from 'react';

const RandomIdGen = () => {
   const wordsAndNumb = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   let text = ''
   for(let i = 0; i < 24;i++){
      text += wordsAndNumb.charAt(Math.floor(Math.random() * wordsAndNumb.length))
   }
   return text
};

export default RandomIdGen;