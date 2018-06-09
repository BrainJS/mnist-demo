document.addEventListener('data-loaded', function(e) {
  var data = e.data;
  console.log(data);
  var net = new brain.FeedForward({
    inputLayer: () => input({height: 28, width: 28}),
    hiddenLayers: [
      input => convolution({width: 5, filters: 8, stride: 1, padding: 2}, input),
      input => relu(input),
      input => pool({width: 2, stride: 2}, input),
      input => convolution({width: 5, filters: 16, stride: 1, padding: 2}, input),
      input => relu(input),
      input => pool({width: 3, stride: 3}, input),
      input => softMax({width: 10}, input)
    ],
    outputLayer: input => output({width: 10}, input)
  });
  net.train();
  net.run();
});