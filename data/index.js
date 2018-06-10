// lofi data loader
function loadJSON(path) {
  var xhr = new XMLHttpRequest();
  return new Promise(function(resolve, reject) {
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr);
        }
      }
    };
    xhr.open('GET', path, true);
    xhr.send();
  });
}

function randomImageData(data) {
  var i = (data.length * Math.random()).toFixed();
  return data[i];
}

function toImage(dataItem) {
  var canvas = document.createElement('canvas');
  canvas.style.backgroundColor = 'black';
  canvas.width = 28;
  canvas.height = 28;
  var ctx = canvas.getContext('2d');
  var imageArray = [];
  var length = 28 * 28;
  for (var i = 0; i < length; i++) {
    var color = dataItem.input[i] * 255;
    imageArray.push(color);
    imageArray.push(color);
    imageArray.push(color);
    imageArray.push(color);
  }
  ctx.putImageData(new ImageData(new Uint8ClampedArray(imageArray), 28, 28), 0, 0);
  return canvas;
}