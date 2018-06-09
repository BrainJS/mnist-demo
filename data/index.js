// lofi data loader
(function() {
  var data = [];
  var batches = [0, 20];
  var loadedCount = 0;
  var images = [];

  function get() {
    for (var i = 0; i < batches.length; i++) {
      var image = new Image();
      var index = i;
      image.onload = onload;
      image.index = i;
      image.src = 'data/mnist_batch_' + batches[i] + '.png';
      images.push(image);
    }
  }

  function onload() {
    loadedCount++;
    console.log(loadedCount);
    if (loadedCount === batches.length) {
      finished();
    }
  }

  function finished() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      data[i] = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
    var event = new CustomEvent('data-loaded');
    event.data = data;
    document.dispatchEvent(event);
  }

  get();
})();